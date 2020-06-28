const FrameworkBase = require('../src/frameworks/base');

const makeTemporaryGeneratorFrameworkInstance = (generator, value = true) => {
  let TempClass = class TempFramework extends FrameworkBase {
    supportedGenerators() {
      return [generator];
    }
  };
  let temp = new TempClass();
  temp[generator] = cb => {
    cb(value);
  };
  return temp;
};

const makeTemporaryFrameworkInstance = options => {
  let TempClass = class TempFramework extends FrameworkBase {
    supportedCapabilities() {
      return Object.keys(options);
    }
  };
  let temp = new TempClass();
  Object.keys(options).forEach(capability => {
    temp[capability] = () => options[capability];
  });

  return temp;
};

module.exports = {
  makeTemporaryGeneratorFrameworkInstance,
  makeTemporaryFrameworkInstance,
};
