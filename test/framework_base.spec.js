const PrivacyCompliance = require('../src/privacy_compliance');
const FrameworkBase = require('../src/frameworks/base');

describe('Basic Framework support', () => {
  it('should get a link to the privacy compliance framework once added', () => {
    let base = new FrameworkBase();
    PrivacyCompliance.addFramework(base);
    expect(base.privacyComplianceInstance).toBe(PrivacyCompliance);
  });

  it('should send logs back to the main privacy instance', () => {
    let logEntries = [];
    PrivacyCompliance.useLogger((...args) => {
      logEntries.push(args.join(' '));
    });

    let base = new FrameworkBase();
    PrivacyCompliance.addFramework(base);
    base.log('hello from a framework');
    expect(logEntries.includes('[FrameworkBase] hello from a framework')).toBeTruthy();
  });
});
