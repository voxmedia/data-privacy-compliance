const Capabilities = {
  usePersonalInformationForTargeting: Symbol(
    'Use personal data to improve the precision of targeting advertising? (CCPA)'
  ),

  canSendThirdPartyMetrics: Symbol(
    'Send behavioral and personal information to 3rd party metrics and analytics providers'
  ),
};

module.exports = Capabilities;
