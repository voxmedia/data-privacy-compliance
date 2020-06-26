const FrameworkBase = require('./base');

/**
 * Implements usprivacy string framework
 * for more information on the US Privacy string see:
 * https://github.com/InteractiveAdvertisingBureau/USPrivacy/blob/master/CCPA/US%20Privacy%20String.md#us-privacy-string-format
 */
class CCPAFromUSPrivacyString extends FrameworkBase {
  constructor() {
    super();
    this.usPrivacyString = '';
  }

  useConfig({ usp }) {
    if (usp) {
      this.usPrivacyString = ('' + usp).toUpperCase();
    }
  }

  supportedCapabilities() {
    return ['canUsePersonalInformationForTargeting', 'hasBeenNotifiedOfRights'];
  }

  canUsePersonalInformationForTargeting() {
    return this.consentStringAllowsPersonalDataSale();
  }

  hasBeenNotifiedOfRights() {
    return this.consentStringAcknowledgesUserHasBeenNotifiedOfRights();
  }

  consentStringAllowsPersonalDataSale() {
    if (!this.supportedUsPrivacyStringVersion()) return true;
    if (!this.consentStringAcknowledgesUserHasBeenNotifiedOfRights()) return true;
    return this.usPrivacyString[2] !== 'Y';
  }

  consentStringAcknowledgesUserHasBeenNotifiedOfRights() {
    return this.supportedUsPrivacyStringVersion() && this.usPrivacyString[1] === 'Y';
  }

  supportedUsPrivacyStringVersion() {
    return this.usPrivacyString.length === 4 && this.usPrivacyString[0] === '1';
  }
}

module.exports = CCPAFromUSPrivacyString;
