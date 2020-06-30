const frameworks = require('./frameworks');

/**
 * The public Privacy Compliance class, which is exported as a singleton
 *
 * Responsible for managing frameworks and proxying requests to related
 * frameworks.
 *
 * Note: This uses Proxy() to support introspection of method calls
 * to make it look like this class has a lot more functions
 * than it really does
 */
class PrivacyCompliance {
  constructor() {
    this.frameworks = [];
    this.supportedCapabilities = new Set();
    this.supportedGenerators = new Set();
    this.logEntries = [];
    this.logger = (...args) => {
      this.logEntries.push(args);
    };
  }

  /**
   * useConfig is a convenient way to pass configuration values to all frameworks.
   * When a useConfig is called, every loaded framework will have their own
   * useConfig methods called.
   *
   * The ideal pattern is to use keys to type the configs, for example:
   * PrivacyCompliance.useConfig({
   *   usp: "1TFT"
   * })
   * Which could signal to any listening capabiltiy-frameworks to use the new
   * US Privacy String
   *
   * @param {Object} someConfigs any config to share with all frameworks
   */
  useConfig(someConfigs) {
    this.frameworks.forEach(f => f.useConfig(someConfigs));
  }

  /**
   * Allows this libraries internal logs to be accessible to including libraries.
   * The default is to also insert any missed logs. Because this is setup as a singleton,
   * it is easy to miss the initial setup logs, that happened, before a logger was setup.
   *
   * @param {Function} logFunction to be called everytime a new log entry is generated
   * @param {Boolean} relogMissedEntries when true will relog missed entries from before the logger was wired up
   */
  useLogger(logFunction, relogMissedEntries = true) {
    this.logger = logFunction;
    if (relogMissedEntries) {
      this.logEntries.forEach(entry => this.log(...entry));
    }
  }

  addFramework(frameworkInstance) {
    this.log('Adding new framework: ', frameworkInstance.name);
    frameworkInstance.setPrivacyComplianceInstance(privacyComplianceSingleton);
    this.frameworks.push(frameworkInstance);
    frameworkInstance.supportedCapabilities().forEach(c => this.supportedCapabilities.add(c));
    frameworkInstance.supportedGenerators().forEach(c => this.supportedGenerators.add(c));
  }

  /**
   * Checks if a given Capability (as a string) can be answered by the loaded
   * frameworks.
   *
   * Caution: not all frameworks will be applicable and able to
   * answer this capability for all environments.
   *
   * @param {String} capability the method name of the capability
   * @returns Boolean true if the capability can be answered
   */
  hasFrameworkLoadedToAnswerCapability(capability) {
    return this.supportedCapabilities.has(capability);
  }

  hasFrameworkLoadedToGenerate(ability) {
    return this.supportedGenerators.has(ability);
  }

  /**
   * Returns a list of applicable frameworks for this environment.
   */
  applicableFrameworks() {
    return this.frameworks.filter(f => f.isApplicable());
  }

  log(...args) {
    this.logger(...args);
  }

  get Generator() {
    return new Proxy(this, {
      get: (privacyComplianceInstance, property) => {
        return privacyComplianceInstance.proxyToFrameworkGenerators(property);
      },
    });
  }

  // For use with testing only
  reset() {
    this.frameworks = [];
    this.supportedCapabilities = new Set();
    this.supportedGenerators = new Set();
  }

  /**
   * This method will take a string, translate it into a method and call it
   * on the added frameworks. If all applicable frameworks support this capability
   * then it will return true, if not it will be false.
   *
   * @param {String} methodName the name of methods to call on the base frameworks
   * @return Boolean if all the frameworks permit this
   */
  proxyToFrameworks(methodName) {
    try {
      return this.frameworks
        .filter(f => f.isApplicable())
        .filter(f => f.canAnswerCapability(methodName))
        .map(f => {
          this.log(f.name + ' answering: ' + methodName);
          return f;
        })
        .map(f => f[methodName].call(f))
        .every(result => !!result);
    } catch (e) {
      console.error(`There was an error calling ${methodName} - ${e}`);
    }
  }

  proxyToFrameworkGenerators(methodName) {
    if (this.hasFrameworkLoadedToGenerate(methodName)) {
      return (callback = () => {}) => {
        try {
          this.frameworks
            .filter(f => f.isApplicable())
            .filter(f => f.canGenerate(methodName))
            // this feels a little weird, but by the time this is called, it will be defined
            // from below this class
            .map(f => f[methodName].call(f, callback));
        } catch (e) {
          console.error(`There was an error calling ${methodName} - ${e}`);
        }
      };
    } else {
      this.throwUnsupportedError(methodName);
    }
  }

  throwUnsupportedError(method) {
    throw new TypeError(
      `Can not call '${method}'. It is not found in the loaded frameworks. Supported capabilities: ${Array.from(
        this.supportedCapabilities
      ).join(', ')}`
    );
  }

  /**
   * This uses a modern Proxy() object to support arbitrary missing methods
   * which allows the frameworks to declare their own capability methods without
   * needing to add those to this class.
   */

  applyProxy() {
    return new Proxy(this, {
      get: (privacyComplianceInstance, property) => {
        if (Reflect.has(privacyComplianceInstance, property)) {
          return Reflect.get(privacyComplianceInstance, property);
        } else if (privacyComplianceInstance.hasFrameworkLoadedToAnswerCapability(property)) {
          return () => {
            return privacyComplianceInstance.proxyToFrameworks(property);
          };
        } else {
          privacyComplianceInstance.throwUnsupportedError(property);
        }
      },
    });
  }
}

const privacyComplianceSingleton = new PrivacyCompliance().applyProxy();

// Autoload all of the auto-loaded frameworks
frameworks
  .filter(f => f.isAutoLoaded())
  .forEach(f => {
    privacyComplianceSingleton.addFramework(new f());
  });

module.exports = privacyComplianceSingleton;
