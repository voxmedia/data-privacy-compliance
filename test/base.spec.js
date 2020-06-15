const PrivacyCompliance = require('../src');
const Capabilities = require('../src/capabilities');

describe('basic ccpa support', () => {
  it('should be able to indicate if the current user can have their advertising targeted with personal data', () => {
    expect(
      PrivacyCompliance.canUsePersonalInformationForTargeting()
    ).toBeTruthy();
  });

  it('should be able to reference symbols', () => {
    expect(
      PrivacyCompliance.can(Capabilities.usePersonalInformationForTargeting)
    ).toBeTruthy();
  });
});
