class FrameworkBase {
  canPersonalizeContent() {
    return true;
  }
  canSendMetrics() {
    return true;
  }
  canSendThirdPartyMetrics() {
    return true;
  }
}

class GDPRFramework extends FrameworkBase {
  canPersonalizeContent() {
    return false;
  }
}

class CCPAFramework extends FrameworkBase {
  canPerformPersonalizedAdvertiserTargeting() {
    return true;
  }
}

const areAllTrue = (collection) => {
  return collection.filter((capability) => !capability).length == 0;
};

class PrivacyCompliance {
  constructor() {
    this.frameworks = [];
    this.frameworks.push(new CCPAFramework());
    this.frameworks.push(new GDPRFramework());
  }

  canPerform(functionalities = []) {
    return areAllTrue(
      this.frameworks.map((f) => f.canPerform(functionalities))
    );
  }

  canPerformPersonalizedAdvertiserTargeting() {
    return areAllTrue(
      this.frameworks.map((f) => f.canPerformPersonalizedAdvertiserTargeting())
    );
  }
  canPersonalizeContent() {}
  canSendMetrics() {}
  canSendThirdPartyMetrics() {}
}

export default new PrivacyCompliance();
