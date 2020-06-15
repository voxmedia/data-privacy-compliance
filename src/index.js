const Capabilities = require('./capabilities');

class FrameworkBase {
  constructor() {
    this.checks = new Map();
    this.setup();
  }

  setup() {}

  for(capabilitySymbol, checkFunction) {
    this.checks.set(capabilitySymbol, checkFunction);
  }

  canPersonalizeContent() {
    return true;
  }
  canSendMetrics() {
    return true;
  }
  canSendThirdPartyMetrics() {
    return true;
  }
  canPersonalizeTargeting() {
    return true;
  }
  canUsePersonalInformationForTargeting() {
    return true;
  }

  can(capabilitySymbol) {
    console.log('checking if i can', capabilitySymbol);
    const checkFunction = this.checks.get(capabilitySymbol);
    if (checkFunction) {
      return checkFunction.call(this);
    }
    return true;
  }
}

class GDPRFramework extends FrameworkBase {
  canPersonalizeContent() {
    return false;
  }
}

class CCPAFramework extends FrameworkBase {
  setup() {
    this.for(Capabilities.usePersonalInformationForTargeting, () => {
      console.log('checking ccpa usePersonalInformationForTargeting');
      return true;
    });
  }

  canUsePersonalInformationForTargeting() {
    return true;
  }
}

const areAllTrue = (collection) => {
  return collection.filter((capability) => !capability).length == 0;
};

class PrivacyCompliance {
  constructor() {
    this.frameworks = [];
    this.addFramework(new CCPAFramework());
    this.addFramework(new GDPRFramework());
  }

  addFramework(frameworkInstance) {
    this.frameworks.push(frameworkInstance);
  }

  canUsePersonalInformationForTargeting() {
    return areAllTrue(
      this.frameworks.map((f) => f.canUsePersonalInformationForTargeting())
    );
  }

  can(capabilitySymbol) {
    return areAllTrue(this.frameworks.map((f) => f.can(capabilitySymbol)));
  }

  canPersonalizeContent() {}
  canSendMetrics() {}
  canSendThirdPartyMetrics() {}
}

module.exports = new PrivacyCompliance();
