const FrameworkBase = require('./base');
const Capabilities = require('../capabilities');

class CCPA extends FrameworkBase {
  isApplicable() {}

  setup() {
    this.checkCapability(
      Capabilities.usePersonalInformationForTargeting,
      this.checkChorusCookies
    );
  }

  checkChorusCookies() {
    console.log('checking chorus cookies');
    return true;
  }
}

module.exports = CCPA;
