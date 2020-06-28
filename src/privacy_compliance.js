const frameworks = require('./frameworks');

/**
 * The public Privacy Compliance class, which is exported as a singleton
 *
 * Responsible for managing frameworks and proxying requests to related
 * frameworks.
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * Note:
 * This uses Proxy() to support introspection of method calls
 * to make it look like this class has a lot more functions than it really does
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 */
class PrivacyCompliance {
  constructor() {
    this.frameworks = [];
    this.supportedCapabilities = new Set();
    this.supportedGenerators = new Set();
  }

  useConfig(someConfigs) {
    this.frameworks.forEach(f => f.useConfig(someConfigs));
  }

  // For use with testing only
  reset() {
    this.frameworks = [];
    this.supportedCapabilities = new Set();
    this.supportedGenerators = new Set();
  }

  addFramework(frameworkInstance) {
    this.frameworks.push(frameworkInstance);
    frameworkInstance.supportedCapabilities().forEach(c => this.supportedCapabilities.add(c));
    frameworkInstance.supportedGenerators().forEach(c => this.supportedGenerators.add(c));
  }

  hasFrameworkLoadedToAnswerCapability(capability) {
    return this.supportedCapabilities.has(capability);
  }

  hasFrameworkLoadedToGenerate(ability) {
    return this.supportedGenerators.has(ability);
  }

  applicableFrameworks() {
    return this.frameworks.filter(f => f.isApplicable());
  }

  get Generator() {
    return new Proxy(this, {
      get: (privacyComplianceInstance, property) => {
        return privacyComplianceInstance.proxyToFrameworkGenerators(property);
      },
    });
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
      return areAllTrue(
        this.frameworks
          .filter(f => f.isApplicable())
          .filter(f => f.canAnswerCapability(methodName))
          .map(f => f[methodName].call(f))
      );
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
            .map(f => f[methodName].call(f, callback, privacyComplianceSingleton));
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

/**
 * Returns true of all elements in the collection evaluate to true
 *
 * @param {Array} collection a collection of objects to evaluate
 * @return {Boolean} returns true of all elements in the collection evaluate to true
 */
const areAllTrue = collection => {
  return collection.filter(capability => !capability).length == 0;
};

const areAllTheSame = collection => {
  return (
    collection.reduce((accumulator, currentValue) => {
      if (!accumulator.includes(currentValue)) {
        accumulator.push(currentValue);
      }
      return accumulator;
    }, []).length === 1
  );
};

const privacyComplianceSingleton = new PrivacyCompliance().applyProxy();

// Autoload all of the auto-loaded frameworks
frameworks
  .filter(f => f.isAutoLoaded())
  .forEach(f => {
    privacyComplianceSingleton.addFramework(new f());
  });

module.exports = privacyComplianceSingleton;
