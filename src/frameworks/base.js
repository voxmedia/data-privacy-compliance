class FrameworkBase {
  constructor() {
    this.privacyComplianceInstance = null;
  }

  static isAutoLoaded() {
    return true;
  }

  name() {
    return this.constructor.name;
  }

  isApplicable() {
    return true;
  }

  useConfig(someConfigs = {}) {}

  supportedCapabilities() {
    return [];
  }

  supportedGenerators() {
    return [];
  }

  canAnswerCapability(capability) {
    return this.supportedCapabilities().includes(capability);
  }

  canGenerate(ability) {
    return this.supportedGenerators().includes(ability);
  }

  setPrivacyComplianceInstance(pc) {
    this.privacyComplianceInstance = pc;
  }

  log(...args) {
    this.privacyComplianceInstance && this.privacyComplianceInstance.log(`[${this.name()}]`, ...args);
  }
}

module.exports = FrameworkBase;
