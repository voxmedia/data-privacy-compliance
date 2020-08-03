const PrivacyCompliance = require('../src/privacy_compliance');
const RakutenConsentGenerator = require('../src/frameworks/rakuten_consent_generator');
const FrameworkBase = require('../src/frameworks/base');

class MockUSPrivacyStringGenerator extends FrameworkBase {
  constructor() {
    super();
    this.usp = '1YYY';
  }

  config({ usp }) {
    this.usp = usp;
  }

  name() {
    return 'MockUSPrivacyStringGenerator';
  }

  supportedGenerators() {
    return ['usPrivacyString'];
  }

  usPrivacyString() {
    return this.usp;
  }
}

const TestHelper = require('./test_helpers');

describe('Rakuten Consent Generator', () => {
  beforeEach(() => {
    PrivacyCompliance.reset();
    PrivacyCompliance.addFramework(new RakutenConsentGenerator());
    PrivacyCompliance.addFramework(new MockUSPrivacyStringGenerator());
  });

  it('should find rakuten links', () => {
    document.body.innerHTML = `
      <div>
        <a href="https://click.linksynergy.com/buy/this/now.php">A thing worth buying!</a>
      </div>
    `;

    let foundLinks;
    PrivacyCompliance.Generator.addConsentParameterToRakutenLinks(rakutenLinks => (foundLinks = rakutenLinks));
    expect(foundLinks.length).toBe(1);
  });
});
