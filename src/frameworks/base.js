class FrameworkBase {
  constructor() {
    this.privacyComplianceInstance = null;
  }

  get name() {
    return this.constructor.name;
  }

  static isAutoLoaded() {
    return true;
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
    this.privacyComplianceInstance && this.privacyComplianceInstance.log(`[${this.name}]`, ...args);
  }
}

module.exports = FrameworkBase;
