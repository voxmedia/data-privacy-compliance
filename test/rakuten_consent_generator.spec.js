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

  usPrivacyString(cb) {
    cb(this.usp);
  }
}

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
    PrivacyCompliance.Generator.addConsentParameterToCommerceLinks(rakutenLinks => (foundLinks = rakutenLinks));
    expect(foundLinks && foundLinks.length).toBe(1);

    // the callback list of links should include the correct string
    expect(foundLinks.every(a => a.href.includes('1YYY'))).toBe(true);

    // lets check the document is updated too
    expect(document.querySelector('a').href).toBe('https://click.linksynergy.com/buy/this/now.php?cnst=c1YYY');
  });

  it('should ignore all the other links', () => {
    document.body.innerHTML = `
      <div>
        <a href="https://click.linksynergy.com/buy/this/now.php">A thing worth buying!</a>
        <a href="https://someothercompany.iowa.us/beard/oil/buy.php">Does any one need beard oil?</a>
      </div>
    `;

    PrivacyCompliance.Generator.addConsentParameterToCommerceLinks();
    expect(document.querySelector('a').href).toBe('https://click.linksynergy.com/buy/this/now.php?cnst=c1YYY');
    expect(document.querySelectorAll('a')[1].href.includes('c1YYY')).toBeFalsy();
  });
});
