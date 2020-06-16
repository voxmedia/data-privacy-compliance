const FrameworkBase = require('./base');
const Capabilities = require('../capabilities');

module.exports = class CCPAFromUSPrivacyString extends FrameworkBase {
  constructor() {
    super();
    this.uSprivacyString = '';
  }

  setPrivacyString(privacyString) {
    this.uSprivacyString = privacyString.toString().toUpperCase();
  }

  setup() {
    this.checkCapability(
      Capabilities.usePersonalInformationForTargeting,
      this.consentStringSupportsPersonalDataSale
    );
  }

  consentStringSupportsPersonalDataSale() {
    return (
      this.uSprivacyString.length === 4 &&
      this.uSprivacyString[0] === '1' &&
      this.uSprivacyString[1] === 'Y' &&
      this.uSprivacyString[2] !== 'Y'
    );
  }
};
