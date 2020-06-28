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

  usPrivacyString(callback = () => {}, privacyComplianceInstance) {
    let usp = '1';
    usp += privacyComplianceInstance.hasBeenNotifiedOfRights() ? 'Y' : 'N';
    usp += privacyComplianceInstance.canUsePersonalInformationForTargeting() ? 'N' : 'Y';
    usp += privacyComplianceInstance.isLSPACoveredTransaction() ? 'Y' : 'N';
    callback(usp);
  }
}

module.exports = UsPrivacyStringGenerator;
