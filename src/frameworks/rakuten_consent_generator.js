const FrameworkBase = require('./base');
const RAKUTEN_CONSENT_PARAM = 'cnst';

class RakutenConsentGenerator extends FrameworkBase {
  constructor() {
    super();
    this.document = document;
    this.rakutenLinkSelector = 'a[href^="https://click.linksynergy.com"]';
  }

  name() {
    return 'RakutenConsentGenerator';
  }

  isApplicable() {
    // This generator depends on being able to generate a usPrivacyString
    // this is checked when this Generator is being called, so load order isn't important
    // since all the generators are loaded by the time they are being run
    return this.privacyComplianceInstance.canGenerate('usPrivacyString');
  }

  supportedGenerators() {
    return ['addConsentParameterToRakutenLinks'];
  }

  useConfig({ document, rakutenLinkSelector }) {
    if (document) {
      this.document = document;
    }
    if (rakutenLinkSelector) {
      this.rakutenLinkSelector = rakutenLinkSelector;
    }
  }

  addConsentParameterToRakutenLinks(callback = () => {}) {
    const allRakutenLinks = Array.from(this.document.querySelectorAll(this.rakutenLinkSelector));
    const rakutenLinksThatNeedConsentParams = allRakutenLinks.filter(
      link => !link.href?.includes(RAKUTEN_CONSENT_PARAM + '=' + rakutenLinkSelector)
    );
    rakutenLinksThatNeedConsentParams.forEach(link => {
      this.log('Adding rakuten consent parameter to a');
      link.href += `&${RAKUTEN_CONSENT_PARAM}=c${this.privacyComplianceInstance.Generator.usPrivacyString()}`;
    });

    callback(rakutenLinksThatNeedConsentParams, this);
  }
}

module.exports = RakutenConsentGenerator;
