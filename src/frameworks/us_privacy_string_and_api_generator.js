const FrameworkBase = require('./base');

/**
 * Implements usprivacy string framework
 * for more information on the US Privacy string see:
 * https://github.com/InteractiveAdvertisingBureau/USPrivacy/blob/master/CCPA/US%20Privacy%20String.md#us-privacy-string-format
 */
class UsPrivacyStringAndAPIGenerator extends FrameworkBase {
  constructor() {
    super();
    this.window = window;
    this.document = document;
  }
  supportedGenerators() {
    return ['usPrivacyString', 'installPrivacyAPI'];
  }

  useConfig({ window, document }) {
    this.window = window;
    this.document = document;
  }

  usPrivacyString(callback = () => {}) {
    callback(this.buildUsPrivacyString(), this);
  }

  installPrivacyAPI(callback = () => {}) {
    this.window.__uspapi = this.handleUSPrivacyAPI.bind(this);
    this.createUspapiFrame();
    callback(true);
  }

  // Private methods ---------
  buildUsPrivacyString() {
    let usp = '1';
    usp += this.privacyComplianceInstance.hasBeenNotifiedOfRights() ? 'Y' : 'N';
    usp += this.privacyComplianceInstance.canUsePersonalInformationForTargeting() ? 'N' : 'Y';
    usp += this.privacyComplianceInstance.isLSPACoveredTransaction() ? 'Y' : 'N';
    return usp;
  }

  handleUSPrivacyAPI(command, version, callback) {
    if (typeof callback !== 'function') {
      throw `__uspapi: Expected ${callback} to be a function, received a ${typeof callback}`;
    }

    let canSuccessfullyAnswer = true;
    let usPrivacyDataString = '1---';

    if (version !== 1) {
      console.error(`__uspapi: Only able to handle version 1`);
      canSuccessfullyAnswer = false;
    }

    switch (command) {
      case 'getUSPData':
        usPrivacyDataString = this.buildUsPrivacyString();
        break;
      default:
        canSuccessfullyAnswer = false;
        console.error(`__uspapi: Unable to handle command '${command}'`);
    }

    this.log(
      `${canSuccessfullyAnswer ? 'Successfully' : 'Unsuccessfully'} handled CCPA privacy request ${usPrivacyDataString}`
    );
    callback(usPrivacyDataString, canSuccessfullyAnswer);
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
  createUspapiFrame() {
    this.log('Creating __uspapiLocator iframe');

    const frame = this.document.createElement('iframe');
    frame.setAttribute('name', '__uspapiLocator');
    frame.style.display = 'none';

    if (this.document.readyState === 'loading') {
      this.document.addEventListener('DOMContentLoaded', () => {
        this.document.body.appendChild(frame);
        this.setupIframeMessageProxyOn(frame);
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
  setupIframeMessageProxyOn(frame) {
    frame.contentWindow.addEventListener('message', event => {
      const messageData = event.data;

      if (messageData && messageData.__uspapiCall) {
        this.log('__uspapiLocator responding to message request');

        const uspapiCallParameters = messageData.__uspapiCall;
        const targetSource = event.source || window.top;
        const targetOrigin = event.origin || '*';

        this.handleUSPrivacyAPI(
          uspapiCallParameters.command,
          uspapiCallParameters.version,
          (usPrivacyDataString, wasSuccessful) => {
            targetSource.postMessage(
              {
                __uspapiReturn: {
                  returnValue: usPrivacyDataString,
                  success: wasSuccessful,
                  callId: uspapiCallParameters.callId,
                },
              },
              targetOrigin
            );
          }
        );
      }
    });
  }
}

module.exports = UsPrivacyStringAndAPIGenerator;
