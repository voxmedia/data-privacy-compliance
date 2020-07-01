const FrameworkBase = require('./base');

/**
 * Implements usprivacy string framework
 * for more information on the US Privacy string see:
 * https://github.com/InteractiveAdvertisingBureau/USPrivacy/blob/master/CCPA/US%20Privacy%20String.md#us-privacy-string-format
 */
class UsPrivacyStringGenerator extends FrameworkBase {
  supportedGenerators() {
    return ['usPrivacyString'];
  }

  usPrivacyString(callback = () => {}) {
    let usp = '1';
    usp += this.privacyComplianceInstance.hasBeenNotifiedOfRights() ? 'Y' : 'N';
    usp += this.privacyComplianceInstance.canUsePersonalInformationForTargeting() ? 'N' : 'Y';
    usp += this.privacyComplianceInstance.isLSPACoveredTransaction() ? 'Y' : 'N';
    callback(usp, this);
  }
}

module.exports = UsPrivacyStringGenerator;
