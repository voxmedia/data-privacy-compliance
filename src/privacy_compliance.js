const Capabilities = require('./capabilities');

const areAllTrue = collection => {
  return collection.filter(capability => !capability).length == 0;
};

const includesAll = ({ every, within }) => {
  return areAllTrue(every.map(e => within.includes(e)));
};

class PrivacyCompliance {
  constructor() {
    this.frameworks = [];
  }

  reset() {
    this.frameworks = [];
  }

  addFramework(frameworkInstance) {
    this.frameworks.push(frameworkInstance);
  }

  can(capabilitySymbol) {
    return (
      areAllTrue(this.frameworks.map(f => f.can(capabilitySymbol))) &&
      this.requiredDefaultFalseCapabilitiesWereChecked(capabilitySymbol)
    );
  }

  has(capabilitySymbol) {
    return this.can(capabilitySymbol);
  }

  requiredDefaultFalseCapabilitiesWereChecked(capability) {
    if (!Capabilities.defaultsFalse.includes(capability)) return true;

    return includesAll({
      every: Capabilities.defaultsFalse,
      within: this.frameworks.map(f => f.supportedCapabilities()),
    });
  }
}

module.exports = new PrivacyCompliance();
