const PrivacyCompliance = require('../src/privacy_compliance');
const Capabilities = require('../src/capabilities');
const CCPAFromUSPrivacyString = require('../src/frameworks/ccpa_from_us_privacy_string');

describe('basic "can" support', () => {
  afterEach(() => {
    PrivacyCompliance.reset();
  });

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

describe('Bidirectional CCPA support', () => {
  afterEach(() => {
    PrivacyCompliance.reset();
  });

  describe('should be able to read from a string to set capability', () => {
    it('should not allow capability if is not version 1', () => {
      const ccpaFromPrivacyString = new CCPAFromUSPrivacyString();
      ccpaFromPrivacyString.setPrivacyString('2---');
      PrivacyCompliance.addFramework(ccpaFromPrivacyString);

      expect(
        PrivacyCompliance.can(Capabilities.usePersonalInformationForTargeting)
      ).toBeFalsy();
    });

    it('should allow personal targeting info if the user has seen the rights and not opted out', () => {
      const ccpaFromPrivacyString = new CCPAFromUSPrivacyString();
      ccpaFromPrivacyString.setPrivacyString('1YN-');
      PrivacyCompliance.addFramework(ccpaFromPrivacyString);

      expect(
        PrivacyCompliance.can(Capabilities.usePersonalInformationForTargeting)
      ).toBeTruthy();
    });

    it('should not allow personal targeting info if the user has not seen the rights regardless of their opt in/out', () => {
      const ccpaFromPrivacyString = new CCPAFromUSPrivacyString();
      ccpaFromPrivacyString.setPrivacyString('1NN-');
      PrivacyCompliance.addFramework(ccpaFromPrivacyString);

      expect(
        PrivacyCompliance.can(Capabilities.usePersonalInformationForTargeting)
      ).toBeFalsy();

      PrivacyCompliance.reset();

      ccpaFromPrivacyString.setPrivacyString('1NY-');
      PrivacyCompliance.addFramework(ccpaFromPrivacyString);
      expect(
        PrivacyCompliance.can(Capabilities.usePersonalInformationForTargeting)
      ).toBeFalsy();
    });
  });
});
