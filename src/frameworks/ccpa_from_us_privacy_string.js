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

    this.checkCapability(
      Capabilities.beenNotifiedOfCcpaRights,
      this.consentStringAcknowledgesUserHasBeenNotifiedOfRights
    );
  }

  consentStringSupportsPersonalDataSale() {
    return (
      this.supportedUsPrivacyStringVersion() &&
      this.consentStringAcknowledgesUserHasBeenNotifiedOfRights() &&
      this.uSprivacyString[2] !== 'Y'
    );
  }

  consentStringAcknowledgesUserHasBeenNotifiedOfRights() {
    return (
      this.supportedUsPrivacyStringVersion() && this.uSprivacyString[1] === 'Y'
    );
  }

  supportedUsPrivacyStringVersion() {
    return this.uSprivacyString.length === 4 && this.uSprivacyString[0] === '1';
  }
};
