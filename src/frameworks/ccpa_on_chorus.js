const Cookie = require('../lib/cookie');
const FrameworkBase = require('./base');

class CcpaOnChorus extends FrameworkBase {
  name() {
    return 'CcpaOnChorus';
  }

  isApplicable() {
    return !!window && !!window.Chorus;
  }

  supportedCapabilities() {
    return ['canUsePersonalInformationForTargeting', 'hasBeenNotifiedOfRights', 'isLSPACoveredTransaction'];
  }

  canUsePersonalInformationForTargeting() {
    return !Cookie.hasCookie('_chorus_ccpa_consent_donotsell') && !this.chorusDoNotSellPreference();
  }

  chorusDoNotSellPreference() {
    if (!Cookie.hasCookie('chorus_preferences')) return false;
    try {
      const chorusPreferences = JSON.parse(decodeURIComponent(Cookie.getCookie('chorus_preferences')));
      if (typeof chorusPreferences.privacy === 'object') {
        return chorusPreferences.privacy.doNotSell;
      } else {
        return true;
      }
    } catch (e) {
      console.error(`There was an error obtaining Chorus Preferences do not sell cookie: ${e}`);
      return true;
    }
  }

  hasBeenNotifiedOfRights() {
    // see https://voxmedia.slack.com/archives/CPJDM3CCU/p1594741208106400
    return true;
  }

  isLSPACoveredTransaction() {
    return true;
  }
}

module.exports = CcpaOnChorus;
