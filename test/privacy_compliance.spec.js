const PrivacyCompliance = require('../src/privacy_compliance');
const Capabilities = require('../src/capabilities');

describe('PrivacyCompliance', () => {
  afterEach(() => {
    PrivacyCompliance.reset();
  });

  describe('basic "can" support', () => {
    it('should be able to reference symbols', () => {
      expect(
        PrivacyCompliance.can(Capabilities.usePersonalInformationForTargeting)
      ).toBeTruthy();
    });

    it("should be able to reference symbols that don't have an implimentation", () => {
      expect(
        PrivacyCompliance.can(Capabilities.canSendThirdPartyMetrics)
      ).toBeTruthy();
    });
  });

  describe('some capabilities default to false', () => {
    it('beenNotifiedOfCcpaRights defaults to false ', () => {
      expect(
        PrivacyCompliance.has(Capabilities.beenNotifiedOfCcpaRights)
      ).toBeFalsy();
    });
  });
});
