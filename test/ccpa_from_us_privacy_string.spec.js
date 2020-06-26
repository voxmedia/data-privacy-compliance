const PrivacyCompliance = require('../src/privacy_compliance');

describe('CCPA From USP String', () => {
  describe('should be able to use a string to set capability', () => {
    it('should allow capability if is not version 1', () => {
      PrivacyCompliance.useConfig({
        usp: '2YY-',
      });

      expect(PrivacyCompliance.canUsePersonalInformationForTargeting()).toBeTruthy();
    });

    it('should know if the user has been shown their rights', () => {
      PrivacyCompliance.useConfig({
        usp: '1N--',
      });

      expect(PrivacyCompliance.hasBeenNotifiedOfRights()).toBeFalsy();

      PrivacyCompliance.useConfig({
        usp: '1---',
      });

      expect(PrivacyCompliance.hasBeenNotifiedOfRights()).toBeFalsy();
    });

    it('should allow personal targeting info if the user has seen the rights and not opted out', () => {
      PrivacyCompliance.useConfig({ usp: '1YN-' });
      expect(PrivacyCompliance.canUsePersonalInformationForTargeting()).toBeTruthy();

      PrivacyCompliance.useConfig({ usp: '1Y--' });
      expect(PrivacyCompliance.canUsePersonalInformationForTargeting()).toBeTruthy();
    });

    it('should not allow personal targeting info if the user has seen the rights and opted out', () => {
      PrivacyCompliance.useConfig({ usp: '1YY-' });
      expect(PrivacyCompliance.canUsePersonalInformationForTargeting()).toBeFalsy();
    });
  });
});
