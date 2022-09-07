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
    return !Cookie.hasCookie('_chorus_ccpa_consent_donotsell');
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
