const PrivacyCompliance = require('../src/privacy_compliance');
const UsPrivacyStringAndAPIGenerator = require('../src/frameworks/us_privacy_string_and_api_generator');

const TestHelper = require('./test_helpers');

describe('CCPA US Privacy String Generator', () => {
  beforeEach(() => {
    PrivacyCompliance.reset();
    PrivacyCompliance.addFramework(new UsPrivacyStringAndAPIGenerator());
  });

  it('should set the correct string when opted out', () => {
    const notifiedAndPermissive = TestHelper.makeTemporaryFrameworkInstance({
      hasBeenNotifiedOfRights: true,
      canUsePersonalInformationForTargeting: false,
      isLSPACoveredTransaction: true,
    });
    PrivacyCompliance.addFramework(notifiedAndPermissive);
    let usp;
    PrivacyCompliance.Generator.usPrivacyString(v => (usp = v));
    expect(usp).toBe('1YYY');
  });

  it('should set the correct string when not opted out of sale', () => {
    const notifiedAndNotPermissive = TestHelper.makeTemporaryFrameworkInstance({
      hasBeenNotifiedOfRights: true,
      canUsePersonalInformationForTargeting: true,
      isLSPACoveredTransaction: true,
    });
    PrivacyCompliance.addFramework(notifiedAndNotPermissive);
    let usp;
    PrivacyCompliance.Generator.usPrivacyString(v => (usp = v));
    expect(usp).toBe('1YNY');
  });
});

describe('USPrivacyAPI', () => {
  let log;

  const addFakeCCPAFramework = () => {
    const notifiedAndPermissive = TestHelper.makeTemporaryFrameworkInstance({
      hasBeenNotifiedOfRights: true,
      canUsePersonalInformationForTargeting: false,
      isLSPACoveredTransaction: true,
    });
    PrivacyCompliance.addFramework(notifiedAndPermissive);
  };

  beforeEach(() => {
    log = [];
    PrivacyCompliance.useLogger(v => {
      log.push(v);
    });
    PrivacyCompliance.reset();
    PrivacyCompliance.addFramework(new UsPrivacyStringAndAPIGenerator());
  });

  it('should exist on the top level window', () => {
    PrivacyCompliance.Generator.installPrivacyAPI();
    expect(typeof window.__uspapi).toBe('function');
  });

  it('should support basic functionality', () => {
    addFakeCCPAFramework();

    let privacyString, success;

    window.__uspapi('getUSPData', 1, (response, wasSuccess) => {
      privacyString = response;
      success = wasSuccess;
    });

    expect(privacyString).toBe('1YYY');
    expect(success).toBe(true);
  });

  it('should respond with not a success if passing a bad version', () => {
    addFakeCCPAFramework();

    let success;
    let consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    window.__uspapi('getUSPData', 2, (_, wasSuccess) => {
      success = wasSuccess;
    });
    expect(consoleError).toHaveBeenCalled();
    expect(success).toBe(false);
  });

  it('should respond with not a success if asking for a bad command', () => {
    addFakeCCPAFramework();
    let success;
    window.__uspapi('notARealCommand', 1, (_, wasSuccess) => {
      success = wasSuccess;
    });
    expect(success).toBe(false);
  });

  it('should throw an error if a passback not given', () => {
    addFakeCCPAFramework();
    expect(() => {
      window.__uspapi('getUSPData', 1, 'yolo');
    }).toThrow(/to be a function/);
  });
});

describe('__uspapiLocator iframe support', () => {
  beforeEach(() => {
    PrivacyCompliance.reset();
    PrivacyCompliance.addFramework(
      TestHelper.makeTemporaryFrameworkInstance({
        hasBeenNotifiedOfRights: true,
        canUsePersonalInformationForTargeting: false,
        isLSPACoveredTransaction: false,
      })
    );
    PrivacyCompliance.addFramework(new UsPrivacyStringAndAPIGenerator());
  });

  it('should create an iframe with the name __uspapiLocator', () => {
    const frame = document.querySelector('iframe[name="__uspapiLocator"]');
    expect(frame).toBeTruthy();
  });

  it('should proxy messages to __uspapi', done => {
    const frame = document.querySelector('iframe[name="__uspapiLocator"]');
    const id = Math.ceil(Math.random() * 100000);

    window.addEventListener('message', event => {
      const papiResponse = event.data.__uspapiReturn;
      expect(papiResponse.callId).toBe(id);
      expect(papiResponse.success).toBe(true);
      expect(papiResponse.returnValue).toBe('1YYN');
      done();
    });

    const simulatedPayload = {
      __uspapiCall: {
        command: 'getUSPData',
        version: 1,
        callId: id,
      },
    };

    frame.contentWindow.postMessage(simulatedPayload, '*');
  });
});
