const CCPA = require('./frameworks/ccpa');

const areAllTrue = (collection) => {
  return collection.filter((capability) => !capability).length == 0;
};

class PrivacyCompliance {
  constructor() {
    this.frameworks = [];
    this.addFramework(new CCPA());
  }

  reset() {
    this.frameworks = [];
  }

  addFramework(frameworkInstance) {
    this.frameworks.push(frameworkInstance);
  }

  can(capabilitySymbol) {
    return areAllTrue(this.frameworks.map((f) => f.can(capabilitySymbol)));
  }
}

module.exports = new PrivacyCompliance();
