const Capabilities = require('../capabilities');

class FrameworkBase {
  constructor() {
    this.checks = new Map();
    if (this.isApplicable()) {
      this.setup();
    }
  }

  isApplicable() {
    return true;
  }

  supportedCapabilities() {
    return Array.from(this.checks.keys());
  }

  setup() {}

  checkCapability(capabilitySymbol, checkFunction) {
    this.checks.set(capabilitySymbol, checkFunction);
  }

  can(capabilitySymbol) {
    const checkFunction = this.checks.get(capabilitySymbol);
    if (checkFunction) {
      return checkFunction.call(this);
    }
    console.log('hidding default for', capabilitySymbol);
    console.log(Capabilities.defaultsFalse.includes(capabilitySymbol));
    return !Capabilities.defaultsFalse.includes(capabilitySymbol);
  }
}

module.exports = FrameworkBase;
