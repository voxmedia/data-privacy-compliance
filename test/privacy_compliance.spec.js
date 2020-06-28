const PrivacyCompliance = require('../src/privacy_compliance');
const FrameworkBase = require('../src/frameworks/base');

const makeFakeFramework = (methodName, result) => {
  let fakeFramework = {
    isApplicable: () => true,
    canAnswerCapability: capability => methodName === capability,
    supportedCapabilities: () => [methodName],
    supportedGenerators: () => [],
    useConfig: () => {},
    name: `FakeFramework - ${methodName}`,
  };
  fakeFramework[methodName] = () => result;
  return fakeFramework;
};

describe('PrivacyCompliance', () => {
  afterEach(() => {
    PrivacyCompliance.reset();
  });

  describe('Simple Interface', () => {
    it('Proxies requests to the frameworks', () => {
      const canFakeFeature = jest.fn();

      PrivacyCompliance.addFramework({
        isApplicable: () => true,
        canAnswerCapability: () => true,
        supportedCapabilities: () => ['canFakeFeature'],
        supportedGenerators: () => [],
        canFakeFeature,
      });

      PrivacyCompliance.canFakeFeature();

      expect(canFakeFeature.mock.calls.length).toBe(1);
    });

    it('Proxies the request to all frameworks regardless of outcome', () => {
      const canFakeFeature = jest.fn(() => false);
      const canFakeFeature2 = jest.fn();

      PrivacyCompliance.addFramework({
        isApplicable: () => true,
        canAnswerCapability: () => true,
        supportedCapabilities: () => ['canFakeFeature'],
        supportedGenerators: () => [],
        canFakeFeature,
      });

      PrivacyCompliance.addFramework({
        isApplicable: () => true,
        canAnswerCapability: () => true,
        supportedCapabilities: () => ['canFakeFeature'],
        supportedGenerators: () => [],
        canFakeFeature: canFakeFeature2,
      });

      PrivacyCompliance.canFakeFeature();

      expect(canFakeFeature.mock.calls.length).toBe(1);
      expect(canFakeFeature2.mock.calls.length).toBe(1);
    });

    it('Privacy request when one is true', () => {
      PrivacyCompliance.addFramework(makeFakeFramework('canObserveMouseClicks', true));
      expect(PrivacyCompliance.canObserveMouseClicks()).toBeTruthy();
    });

    it('Privacy request when two or more are true', () => {
      PrivacyCompliance.addFramework(makeFakeFramework('canObserveMouseClicks', true));
      PrivacyCompliance.addFramework(makeFakeFramework('canObserveMouseClicks', true));
      expect(PrivacyCompliance.canObserveMouseClicks()).toBeTruthy();
    });

    it('Privacy request returns false when any of them are false', () => {
      PrivacyCompliance.addFramework(makeFakeFramework('canObserveMouseClicks', true));
      PrivacyCompliance.addFramework(makeFakeFramework('canObserveMouseClicks', false));

      expect(PrivacyCompliance.canObserveMouseClicks()).toBeFalsy();
    });
  });

  describe('Capability registration', () => {
    it('should raise an error if no frameworks are loaded to handle compliance check', () => {
      expect(() => {
        PrivacyCompliance.canTradeRevenueClicksForBurritos();
      }).toThrow(TypeError);
    });

    it('should list the supported capabilities when it raises an error', () => {
      PrivacyCompliance.addFramework(makeFakeFramework('canObserveMouseClicks', true));

      expect(() => {
        PrivacyCompliance.canTradeRevenueClicksForBurritos();
      }).toThrow(/canObserveMouseClicks/);
    });
  });

  describe('Frameworks will skip non applicable frameworks', () => {
    it('will skip non applicable framework', () => {
      const canObserveMouseClicks = jest.fn();
      const framework = makeFakeFramework('canObserveMouseClicks', true);
      framework.canObserveMouseClicks = canObserveMouseClicks;

      // a little hack to alter this after the first call
      let calls = 0;
      framework.isApplicable = () => {
        return calls++ > 0;
      };

      PrivacyCompliance.addFramework(framework);

      PrivacyCompliance.canObserveMouseClicks();
      expect(canObserveMouseClicks.mock.calls.length).toBe(0);

      PrivacyCompliance.canObserveMouseClicks();
      expect(canObserveMouseClicks.mock.calls.length).toBe(1);
    });
  });

  describe('Support for Generators', () => {
    beforeEach(() => {
      PrivacyCompliance.reset();
      PrivacyCompliance.addFramework(makeTemporaryGeneratorFramework('eatNachos'));
    });

    it('will use callbacks to support generators', () => {
      const callback = jest.fn();
      PrivacyCompliance.Generator.eatNachos(callback);

      expect(callback.mock.calls.length).toBe(1);
    });

    it('will callback as many times as there are generator functions that support this generator', () => {
      PrivacyCompliance.addFramework(makeTemporaryGeneratorFramework('eatNachos'));

      const callback = jest.fn();
      PrivacyCompliance.Generator.eatNachos(callback);

      expect(callback.mock.calls.length).toBe(2);
    });

    it('will skip frameworks that are not applicable', () => {
      const secondNachoFramework = makeTemporaryGeneratorFramework('eatNachos');
      // but mark this as not applicable
      secondNachoFramework.isApplicable = () => false;

      PrivacyCompliance.addFramework(secondNachoFramework);
      const callback = jest.fn();
      PrivacyCompliance.Generator.eatNachos(callback);

      // this should be one, because of the beforeEach function of description test block
      expect(callback.mock.calls.length).toBe(1);
    });
  });
});
