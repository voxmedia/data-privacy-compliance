const Cookie = require('../lib/cookie');
const FrameworkBase = require('./base');

class CcpaOnChorus extends FrameworkBase {
  isApplicable() {
    return !!window && !!window.Chorus;
  }

  supportedCapabilities() {
    return ['canUsePersonalInformationForTargeting', 'hasBeenNotifiedOfRights'];
  }

  canUsePersonalInformationForTargeting() {
    return !Cookie.hasCookie('_chorus_ccpa_consent_donotsell');
  }

  hasBeenNotifiedOfRights() {
    // see https://github.com/voxmedia/sbn/commit/ce74ab006c89afe799afffa2a31137454d9e5bb3
    return Cookie.hasCookie('_chorus_ccpa_consent');
  }
}

module.exports = CcpaOnChorus;
