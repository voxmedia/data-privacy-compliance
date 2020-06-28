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

  supportedGenerators() {
    return [];
  }

  canAnswerCapability(capability) {
    return this.supportedCapabilities().includes(capability);
  }

  canGenerate(ability) {
    return this.supportedGenerators().includes(ability);
  }
}

class GDPRFramework extends FrameworkBase {
  constructor() {
    super();

    this.applies = false;
  }
  isApplicable() {
    return this.applies;
  }

  useConfig({ gdprConsentData, gdprApplies }) {
    this.applies = gdprApplies;
  }
}

module.exports = FrameworkBase;
