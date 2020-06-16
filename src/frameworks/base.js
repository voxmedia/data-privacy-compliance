class FrameworkBase {
  constructor() {
    this.checks = new Map();
    if (this.isApplicable()) {
      this.setup();
    }
  }

  setup() {}

  isApplicable() {
    return true;
  }

  checkCapability(capabilitySymbol, checkFunction) {
    this.checks.set(capabilitySymbol, checkFunction);
  }

  can(capabilitySymbol) {
    const checkFunction = this.checks.get(capabilitySymbol);
    if (checkFunction) {
      return checkFunction.call(this);
    }
    return true;
  }
}

module.exports = FrameworkBase;
