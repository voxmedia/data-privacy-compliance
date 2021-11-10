const PrivacyCompliance = require('../src/privacy_compliance');
const CcpaOnChorus = require('../src/frameworks/ccpa_on_chorus');

describe('CCPA for Chorus Support', () => {
  beforeEach(() => {
    PrivacyCompliance.reset();
    PrivacyCompliance.addFramework(new CcpaOnChorus());
  });

  describe('Only active if running on Chorus', () => {
    it('should be inactive be default', () => {
      expect(PrivacyCompliance.applicableFrameworks().length).toBe(0);
    });

    it('should be active when the Chorus is detected', () => {
      window.Chorus = "something here it doesn't matter";
      expect(PrivacyCompliance.applicableFrameworks().length).toBe(1);
    });
  });

  describe('Default permission', () => {
    beforeEach(() => {
      // Need to set this variable to enable this
      window.Chorus = { fakeData: 'fine' };
    });

    it('should permit personal info targeting', () => {
      expect(PrivacyCompliance.canUsePersonalInformationForTargeting()).toBeTruthy();
    });

    it('should default to not notified of rights on chorus', () => {
      expect(PrivacyCompliance.hasBeenNotifiedOfRights()).toBeTruthy();
    });
  });

  describe('it should respect Chorus cookies', () => {
    beforeEach(() => {
      window.Chorus = { fakeData: 'fine' };
    });

    afterEach(() => {
      document.cookie = '';
    });

    it('should restrict personal info targeting, when the chorus preferences do not sell cookie is set', () => {
      document.cookie = 'chorus_preferences={"v":1,"privacy":{"cookies":"essential","doNotSell":true}}';
      expect(PrivacyCompliance.canUsePersonalInformationForTargeting()).toBeFalsy();
    });

    it('should restrict personal info targeting, when opt out of sale cookie is set', () => {
      document.cookie = '_chorus_ccpa_consent_donotsell=abcd1234';
      expect(PrivacyCompliance.canUsePersonalInformationForTargeting()).toBeFalsy();
    });
  });
});
