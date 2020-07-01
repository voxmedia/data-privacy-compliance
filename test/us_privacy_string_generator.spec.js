const PrivacyCompliance = require('../src/privacy_compliance');
const UsPrivacyStringGenerator = require('../src/frameworks/us_privacy_string_generator');

const TestHelper = require('./test_helpers');

describe('CCPA String Generator', () => {
  beforeEach(() => {
    PrivacyCompliance.reset();
    PrivacyCompliance.addFramework(new UsPrivacyStringGenerator());
  });

  it('should set the correct string when opted out', () => {
    const notifiedAndPermissive = TestHelper.makeTemporaryFrameworkInstance({
      hasBeenNotifiedOfRights: true,
      canUsePersonalInformationForTargeting: false,
      isLSPACoveredTransaction: true,
    });
    PrivacyCompliance.addFramework(notifiedAndPermissive);
    let usp;
    PrivacyCompliance.Generator.usPrivacyString(v => (usp = v));
    expect(usp).toBe('1YYY');
  });

  it('should set the correct string when not opted out of sale', () => {
    const notifiedAndPermissive = TestHelper.makeTemporaryFrameworkInstance({
      hasBeenNotifiedOfRights: true,
      canUsePersonalInformationForTargeting: true,
      isLSPACoveredTransaction: true,
    });
    PrivacyCompliance.addFramework(notifiedAndPermissive);
    let usp;
    PrivacyCompliance.Generator.usPrivacyString(v => (usp = v));
    expect(usp).toBe('1YNY');
  });
});
