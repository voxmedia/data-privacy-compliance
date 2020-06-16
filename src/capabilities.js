const Capabilities = {
  beenNotifiedOfCcpaRights: Symbol(
    'The user has been notified of their rights under the CCPA legislation'
  ),

  usePersonalInformationForTargeting: Symbol(
    'Use personal data to improve the precision of targeting advertising? (CCPA)'
  ),

  canSendThirdPartyMetrics: Symbol(
    'Send behavioral and personal information to 3rd party metrics and analytics providers'
  ),
};

Capabilities.defaultsFalse = [Capabilities.beenNotifiedOfCcpaRights];

module.exports = Capabilities;
