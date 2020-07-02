"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FrameworkBase = /*#__PURE__*/function () {
  function FrameworkBase() {
    _classCallCheck(this, FrameworkBase);

    this.privacyComplianceInstance = null;
  }

  _createClass(FrameworkBase, [{
    key: "name",
    value: function name() {
      return 'FrameworkBase';
    }
  }, {
    key: "isApplicable",
    value: function isApplicable() {
      return true;
    }
  }, {
    key: "useConfig",
    value: function useConfig() {
      var someConfigs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    }
  }, {
    key: "supportedCapabilities",
    value: function supportedCapabilities() {
      return [];
    }
  }, {
    key: "supportedGenerators",
    value: function supportedGenerators() {
      return [];
    }
  }, {
    key: "canAnswerCapability",
    value: function canAnswerCapability(capability) {
      return this.supportedCapabilities().includes(capability);
    }
  }, {
    key: "canGenerate",
    value: function canGenerate(ability) {
      return this.supportedGenerators().includes(ability);
    }
  }, {
    key: "setPrivacyComplianceInstance",
    value: function setPrivacyComplianceInstance(pc) {
      this.privacyComplianceInstance = pc;
    }
  }, {
    key: "log",
    value: function log() {
      var _this$privacyComplian;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.privacyComplianceInstance && (_this$privacyComplian = this.privacyComplianceInstance).log.apply(_this$privacyComplian, ["[".concat(this.name(), "]")].concat(args));
    }
  }], [{
    key: "isAutoLoaded",
    value: function isAutoLoaded() {
      return true;
    }
  }]);

  return FrameworkBase;
}();

module.exports = FrameworkBase;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var FrameworkBase = require('./base');
/**
 * Implements usprivacy string framework
 * for more information on the US Privacy string see:
 * https://github.com/InteractiveAdvertisingBureau/USPrivacy/blob/master/CCPA/US%20Privacy%20String.md#us-privacy-string-format
 */


var CCPAFromUSPrivacyString = /*#__PURE__*/function (_FrameworkBase) {
  _inherits(CCPAFromUSPrivacyString, _FrameworkBase);

  var _super = _createSuper(CCPAFromUSPrivacyString);

  function CCPAFromUSPrivacyString() {
    var _this;

    _classCallCheck(this, CCPAFromUSPrivacyString);

    _this = _super.call(this);
    _this.usPrivacyString = '';
    return _this;
  }

  _createClass(CCPAFromUSPrivacyString, [{
    key: "name",
    value: function name() {
      return 'CCPAFromUSPrivacyString';
    }
  }, {
    key: "useConfig",
    value: function useConfig(_ref) {
      var usp = _ref.usp;

      if (usp) {
        this.usPrivacyString = ('' + usp).toUpperCase();
      }
    }
  }, {
    key: "isApplicable",
    value: function isApplicable() {
      return !!this.usPrivacyString;
    }
  }, {
    key: "supportedCapabilities",
    value: function supportedCapabilities() {
      return ['canUsePersonalInformationForTargeting', 'hasBeenNotifiedOfRights', 'isLSPACoveredTransaction'];
    }
  }, {
    key: "canUsePersonalInformationForTargeting",
    value: function canUsePersonalInformationForTargeting() {
      return this.consentStringAllowsPersonalDataSale();
    }
  }, {
    key: "hasBeenNotifiedOfRights",
    value: function hasBeenNotifiedOfRights() {
      return this.consentStringAcknowledgesUserHasBeenNotifiedOfRights();
    }
  }, {
    key: "consentStringAllowsPersonalDataSale",
    value: function consentStringAllowsPersonalDataSale() {
      if (!this.supportedUsPrivacyStringVersion()) return true;
      if (!this.consentStringAcknowledgesUserHasBeenNotifiedOfRights()) return true;
      return this.usPrivacyString[2] !== 'Y';
    }
  }, {
    key: "isLSPACoveredTransaction",
    value: function isLSPACoveredTransaction() {
      return this.supportedUsPrivacyStringVersion() && this.usPrivacyString[3] === 'Y';
    }
  }, {
    key: "consentStringAcknowledgesUserHasBeenNotifiedOfRights",
    value: function consentStringAcknowledgesUserHasBeenNotifiedOfRights() {
      return this.supportedUsPrivacyStringVersion() && this.usPrivacyString[1] === 'Y';
    }
  }, {
    key: "supportedUsPrivacyStringVersion",
    value: function supportedUsPrivacyStringVersion() {
      return this.usPrivacyString.length === 4 && this.usPrivacyString[0] === '1';
    }
  }]);

  return CCPAFromUSPrivacyString;
}(FrameworkBase);

module.exports = CCPAFromUSPrivacyString;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Cookie = require('../lib/cookie');

var FrameworkBase = require('./base');

var CcpaOnChorus = /*#__PURE__*/function (_FrameworkBase) {
  _inherits(CcpaOnChorus, _FrameworkBase);

  var _super = _createSuper(CcpaOnChorus);

  function CcpaOnChorus() {
    _classCallCheck(this, CcpaOnChorus);

    return _super.apply(this, arguments);
  }

  _createClass(CcpaOnChorus, [{
    key: "name",
    value: function name() {
      return 'CcpaOnChorus';
    }
  }, {
    key: "isApplicable",
    value: function isApplicable() {
      return !!window && !!window.Chorus;
    }
  }, {
    key: "supportedCapabilities",
    value: function supportedCapabilities() {
      return ['canUsePersonalInformationForTargeting', 'hasBeenNotifiedOfRights', 'isLSPACoveredTransaction'];
    }
  }, {
    key: "canUsePersonalInformationForTargeting",
    value: function canUsePersonalInformationForTargeting() {
      return !Cookie.hasCookie('_chorus_ccpa_consent_donotsell');
    }
  }, {
    key: "hasBeenNotifiedOfRights",
    value: function hasBeenNotifiedOfRights() {
      // see https://github.com/voxmedia/sbn/commit/ce74ab006c89afe799afffa2a31137454d9e5bb3
      return Cookie.hasCookie('_chorus_ccpa_consent');
    }
  }, {
    key: "isLSPACoveredTransaction",
    value: function isLSPACoveredTransaction() {
      return true;
    }
  }]);

  return CcpaOnChorus;
}(FrameworkBase);

module.exports = CcpaOnChorus;
"use strict";

var CcpaOnChorus = require('./ccpa_on_chorus');

var CcpaFromUsPrivacyString = require('./ccpa_from_us_privacy_string');

var UsPrivacyStringAndAPIGenerator = require('./us_privacy_string_and_api_generator');

module.exports = [CcpaOnChorus, CcpaFromUsPrivacyString, UsPrivacyStringAndAPIGenerator];
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var FrameworkBase = require('./base');

var US_PRIVACY_API_VERSION = 1;
/**
 * Implements usprivacy string framework
 * for more information on the US Privacy string see:
 * https://github.com/InteractiveAdvertisingBureau/USPrivacy/blob/master/CCPA/US%20Privacy%20String.md#us-privacy-string-format
 */

var UsPrivacyStringAndAPIGenerator = /*#__PURE__*/function (_FrameworkBase) {
  _inherits(UsPrivacyStringAndAPIGenerator, _FrameworkBase);

  var _super = _createSuper(UsPrivacyStringAndAPIGenerator);

  function UsPrivacyStringAndAPIGenerator() {
    var _this;

    _classCallCheck(this, UsPrivacyStringAndAPIGenerator);

    _this = _super.call(this);
    _this.window = window;
    _this.document = document;
    return _this;
  }

  _createClass(UsPrivacyStringAndAPIGenerator, [{
    key: "name",
    value: function name() {
      return 'UsPrivacyStringAndAPIGenerator';
    }
  }, {
    key: "supportedGenerators",
    value: function supportedGenerators() {
      return ['usPrivacyString', 'installPrivacyAPI'];
    }
  }, {
    key: "useConfig",
    value: function useConfig(_ref) {
      var window = _ref.window,
          document = _ref.document;
      this.window = window;
      this.document = document;
    }
  }, {
    key: "usPrivacyString",
    value: function usPrivacyString() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      callback(this.buildUsPrivacyString(), this);
    }
  }, {
    key: "installPrivacyAPI",
    value: function installPrivacyAPI() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this.window.__uspapi = this.handleUSPrivacyAPI.bind(this);
      this.createUspapiFrame();
      callback(true);
    } // Private methods ---------

  }, {
    key: "buildUsPrivacyString",
    value: function buildUsPrivacyString() {
      var usp = '' + US_PRIVACY_API_VERSION;
      usp += this.privacyComplianceInstance.hasBeenNotifiedOfRights() ? 'Y' : 'N';
      usp += this.privacyComplianceInstance.canUsePersonalInformationForTargeting() ? 'N' : 'Y';
      usp += this.privacyComplianceInstance.isLSPACoveredTransaction() ? 'Y' : 'N';
      return usp;
    }
  }, {
    key: "handleUSPrivacyAPI",
    value: function handleUSPrivacyAPI(command, version, callback) {
      if (typeof callback !== 'function') {
        throw "__uspapi: Expected ".concat(callback, " to be a function, received a ").concat(_typeof(callback));
      }

      var canSuccessfullyAnswer = true;
      var usPrivacyDataString = "".concat(US_PRIVACY_API_VERSION, "---");

      if (version !== US_PRIVACY_API_VERSION) {
        console.error("__uspapi: Only able to handle version 1");
        canSuccessfullyAnswer = false;
      }

      switch (command) {
        case 'getUSPData':
          usPrivacyDataString = this.buildUsPrivacyString();
          break;

        default:
          canSuccessfullyAnswer = false;
          console.error("__uspapi: Unable to handle command '".concat(command, "'"));
      }

      this.log("".concat(canSuccessfullyAnswer ? 'Successfully' : 'Unsuccessfully', " handled CCPA privacy request ").concat(usPrivacyDataString));
      callback({
        uspString: usPrivacyDataString,
        version: US_PRIVACY_API_VERSION
      }, canSuccessfullyAnswer);
    }
    /**
     * Creates a top level iframe used to proxy messages between
     * frames and this implementation of the CCPA Compliance Framework
     *
     * It works by:
     *   1. Creating a specially named iframe
     *   2. Setting up an event listener on this frame
     *   3. This listener will proxy "__uspapiCall" messages to handleUSPrivacyAPI
     *   4. and post the message back to the sending frame.
     */

  }, {
    key: "createUspapiFrame",
    value: function createUspapiFrame() {
      var _this2 = this;

      this.log('Creating __uspapiLocator iframe');
      var frame = this.document.createElement('iframe');
      frame.setAttribute('name', '__uspapiLocator');
      frame.style.display = 'none';

      if (this.document.readyState === 'loading') {
        this.document.addEventListener('DOMContentLoaded', function () {
          _this2.document.body.appendChild(frame);

          _this2.setupIframeMessageProxyOn(frame);
        });
      } else {
        this.document.body.appendChild(frame);
        this.setupIframeMessageProxyOn(frame);
      }
    }
    /**
     * Will setup listener proxy on the iframe which... accomplish 2-4 from above
     *
     *   2. Setting up an event listener on this frame
     *   3. This listener will proxy "__uspapiCall" messages to handleUSPrivacyAPI
     *   4. and post the message back to the sending frame.
     *
     * @param {DOMElement} frame the iframe to setup the listener on
     */

  }, {
    key: "setupIframeMessageProxyOn",
    value: function setupIframeMessageProxyOn(frame) {
      var _this3 = this;

      frame.contentWindow.addEventListener('message', function (event) {
        var messageData = event.data;

        if (messageData && messageData.__uspapiCall) {
          _this3.log('__uspapiLocator responding to message request');

          var uspapiCallParameters = messageData.__uspapiCall;
          var targetSource = event.source || window.top;
          var targetOrigin = event.origin || '*';

          _this3.handleUSPrivacyAPI(uspapiCallParameters.command, uspapiCallParameters.version, function (uspData, wasSuccessful) {
            targetSource.postMessage({
              __uspapiReturn: {
                returnValue: uspData,
                success: wasSuccessful,
                callId: uspapiCallParameters.callId
              }
            }, targetOrigin);
          });
        }
      });
    }
  }]);

  return UsPrivacyStringAndAPIGenerator;
}(FrameworkBase);

module.exports = UsPrivacyStringAndAPIGenerator;
"use strict";

/**
 * Gets all the cookies as a Map
 *
 * @returns Map of cookie values
 */
function getAllCookies() {
  return new Map(document.cookie.split(';').map(function (cookie) {
    return cookie.trim().split('=');
  }));
}
/**
 * Checks if cookie exists
 *
 * @param {String} name name of cookie
 * @return {Boolean} true of cookie is present
 */


function hasCookie(name) {
  return getAllCookies().has(name);
}
/**
 * Gets the cookie value
 *
 * @param {String} name name of cookie
 * @return {String} the value of the cookie
 */


function getCookie(name) {
  return getAllCookies().get(name);
}

module.exports = {
  getAllCookies: getAllCookies,
  hasCookie: hasCookie,
  getCookie: getCookie
};
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var frameworks = require('./frameworks');
/**
 * The public Privacy Compliance class, which is exported as a singleton
 *
 * Responsible for managing frameworks and proxying requests to related
 * frameworks.
 *
 * Note: This uses Proxy() to support introspection of method calls
 * to make it look like this class has a lot more functions
 * than it really does
 */


var PrivacyCompliance = /*#__PURE__*/function () {
  function PrivacyCompliance() {
    var _this = this;

    _classCallCheck(this, PrivacyCompliance);

    this.frameworks = [];
    this.supportedCapabilities = new Set();
    this.supportedGenerators = new Set();
    this.logEntries = [];

    this.logger = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this.logEntries.push(args);
    };
  }
  /**
   * useConfig is a convenient way to pass configuration values to all frameworks.
   * When a useConfig is called, every loaded framework will have their own
   * useConfig methods called.
   *
   * The ideal pattern is to use keys to type the configs, for example:
   * PrivacyCompliance.useConfig({
   *   usp: "1TFT"
   * })
   * Which could signal to any listening capabiltiy-frameworks to use the new
   * US Privacy String
   *
   * @param {Object} someConfigs any config to share with all frameworks
   */


  _createClass(PrivacyCompliance, [{
    key: "useConfig",
    value: function useConfig(someConfigs) {
      this.frameworks.forEach(function (f) {
        return f.useConfig(someConfigs);
      });
    }
    /**
     * Allows this libraries internal logs to be accessible to including libraries.
     * The default is to also insert any missed logs. Because this is setup as a singleton,
     * it is easy to miss the initial setup logs, that happened, before a logger was setup.
     *
     * @param {Function} logFunction to be called everytime a new log entry is generated
     * @param {Boolean} relogMissedEntries when true will relog missed entries from before the logger was wired up
     */

  }, {
    key: "useLogger",
    value: function useLogger(logFunction) {
      var _this2 = this;

      var relogMissedEntries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.logger = logFunction;

      if (relogMissedEntries) {
        this.logEntries.forEach(function (entry) {
          return _this2.log.apply(_this2, _toConsumableArray(entry));
        });
      }
    }
  }, {
    key: "addFramework",
    value: function addFramework(frameworkInstance) {
      var _this3 = this;

      this.log('Adding new framework: ', frameworkInstance.name());
      frameworkInstance.setPrivacyComplianceInstance(privacyComplianceSingleton);
      this.frameworks.push(frameworkInstance);
      frameworkInstance.supportedCapabilities().forEach(function (c) {
        return _this3.supportedCapabilities.add(c);
      });
      frameworkInstance.supportedGenerators().forEach(function (c) {
        return _this3.supportedGenerators.add(c);
      });
    }
    /**
     * Checks if a given Capability (as a string) can be answered by the loaded
     * frameworks.
     *
     * Caution: not all frameworks will be applicable and able to
     * answer this capability for all environments.
     *
     * @param {String} capability the method name of the capability
     * @returns Boolean true if the capability can be answered
     */

  }, {
    key: "hasFrameworkLoadedToAnswerCapability",
    value: function hasFrameworkLoadedToAnswerCapability(capability) {
      return this.supportedCapabilities.has(capability);
    }
  }, {
    key: "canGenerate",
    value: function canGenerate(ability) {
      return this.supportedGenerators.has(ability);
    }
    /**
     * Returns a list of applicable frameworks for this environment.
     */

  }, {
    key: "applicableFrameworks",
    value: function applicableFrameworks() {
      return this.frameworks.filter(function (f) {
        return f.isApplicable();
      });
    }
  }, {
    key: "log",
    value: function log() {
      this.logger.apply(this, arguments);
    }
  }, {
    key: "reset",
    // For use with testing only
    value: function reset() {
      this.frameworks = [];
      this.supportedCapabilities = new Set();
      this.supportedGenerators = new Set();
    }
    /**
     * This method will take a string, translate it into a method and call it
     * on the added frameworks. If all applicable frameworks support this capability
     * then it will return true, if not it will be false.
     *
     * @param {String} methodName the name of methods to call on the base frameworks
     * @return Boolean if all the frameworks permit this
     */

  }, {
    key: "proxyToFrameworks",
    value: function proxyToFrameworks(methodName) {
      var _this4 = this;

      try {
        return this.frameworks.filter(function (f) {
          return f.isApplicable();
        }).filter(function (f) {
          return f.canAnswerCapability(methodName);
        }).map(function (f) {
          _this4.log(f.name() + ' answering: ' + methodName);

          return f;
        }).map(function (f) {
          return f[methodName].call(f);
        }).every(function (result) {
          return !!result;
        });
      } catch (e) {
        console.error("There was an error calling ".concat(methodName, " - ").concat(e));
      }
    }
    /**
     * This method will take a string, translate it into a method and call it
     * on the added frameworks. If all applicable frameworks support this generator
     * then it will be called, with the given passback.
     *
     * Note this is a little more complex than capabilities, because like capabilities
     * multiple frameworks can be called for this generator, and there is no convenient way
     * to collect those responses, so instead it takes a callback that will be executed for
     * every generator run.
     *
     * @param {String} methodName the name of methods to call on the base frameworks
     * @returns {Function} the function to execute, with callback of the generators response
     */

  }, {
    key: "proxyToFrameworkGenerators",
    value: function proxyToFrameworkGenerators(methodName) {
      var _this5 = this;

      if (this.canGenerate(methodName)) {
        return function () {
          var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

          try {
            _this5.frameworks.filter(function (f) {
              return f.isApplicable();
            }).filter(function (f) {
              return f.canGenerate(methodName);
            }).forEach(function (f) {
              return f[methodName].call(f, callback);
            });
          } catch (e) {
            console.error("There was an error calling ".concat(methodName, " - ").concat(e));
          }
        };
      } else {
        this.throwUnsupportedError(methodName);
      }
    }
  }, {
    key: "throwUnsupportedError",
    value: function throwUnsupportedError(method) {
      throw new TypeError("Can not call '".concat(method, "'. It is not found in the loaded frameworks. Supported capabilities: ").concat(Array.from(this.supportedCapabilities).join(', ')));
    }
    /**
     * This uses a modern Proxy() object to support arbitrary missing methods
     * which allows the frameworks to declare their own capability methods without
     * needing to add those to this class.
     */

  }, {
    key: "applyProxy",
    value: function applyProxy() {
      return new Proxy(this, {
        get: function get(privacyComplianceInstance, property) {
          if (Reflect.has(privacyComplianceInstance, property)) {
            return Reflect.get(privacyComplianceInstance, property);
          } else if (privacyComplianceInstance.hasFrameworkLoadedToAnswerCapability(property)) {
            return function () {
              return privacyComplianceInstance.proxyToFrameworks(property);
            };
          } else {
            privacyComplianceInstance.throwUnsupportedError(property);
          }
        }
      });
    }
  }, {
    key: "Generator",
    get: function get() {
      return new Proxy(this, {
        get: function get(privacyComplianceInstance, property) {
          return privacyComplianceInstance.proxyToFrameworkGenerators(property);
        }
      });
    }
  }]);

  return PrivacyCompliance;
}();

var privacyComplianceSingleton = new PrivacyCompliance().applyProxy(); // Autoload all of the auto-loaded frameworks

frameworks.filter(function (f) {
  return f.isAutoLoaded();
}).forEach(function (f) {
  privacyComplianceSingleton.addFramework(new f());
});
module.exports = privacyComplianceSingleton;

//# sourceMappingURL=data-privacy-compliance.js.map