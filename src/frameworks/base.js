class FrameworkBase {
  constructor() {}

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

  canAnswerCapability(capability) {
    return this.supportedCapabilities().includes(capability);
  }
}

module.exports = FrameworkBase;
