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
  }

  useConfig(someConfigs) {
    this.frameworks.forEach(f => f.useConfig(someConfigs));
  }

  // For use with testing only
  reset() {
    this.frameworks = [];
    this.supportedCapabilities = new Set();
  }

  addFramework(frameworkInstance) {
    this.frameworks.push(frameworkInstance);
    frameworkInstance.supportedCapabilities().forEach(c => this.supportedCapabilities.add(c));
  }

  hasFrameworkLoadedToAnswerCapability(capability) {
    return this.supportedCapabilities.has(capability);
  }

  applicableFrameworks() {
    return this.frameworks.filter(f => f.isApplicable());
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

  /**
   * This uses a modern Proxy() object to support arbitrary missing methods
   * which allows the frameworks to declare their own capability methods without
   * needing to add those to this class.
   */

  applyProxy() {
    return new Proxy(this, {
      get: (object, property) => {
        if (Reflect.has(object, property)) {
          return Reflect.get(object, property);
        } else if (object.hasFrameworkLoadedToAnswerCapability(property)) {
          return () => {
            return object.proxyToFrameworks(property);
          };
        } else {
          throw new TypeError(
            `Can not call ${property}(). It is not found in the loaded frameworks. Supported capabilities: ${Array.from(
              object.supportedCapabilities
            ).join(', ')}`
          );
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

const privacyComplianceSingleton = new PrivacyCompliance().applyProxy();

// Autoload all of the auto-loaded frameworks
frameworks
  .filter(f => f.isAutoLoaded())
  .forEach(f => {
    privacyComplianceSingleton.addFramework(new f());
  });

module.exports = privacyComplianceSingleton;
