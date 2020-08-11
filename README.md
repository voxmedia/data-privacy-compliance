# Data Privacy and Compliance framework

This library is capable of supporting improved personal data privacy and legal compliance.

Conceptually the code is structed as a series legislative _agnostic_ **capabilties**. This structure allows for capabilities to be queried for permission before taking action, for example:

```js
const PrivacyCompliance = require('PrivacyCompliance');

//...

if (PrivacyCompliance.canUsePersonalInformationForTargeting()) {
  adServer.addTargeting(user.details());
}
```

Internally a series of frameworks have been defined, loaded and are ready to answer requests for permissions. Under the hood, `PrivacyCompliance` will check with all the loaded frameworks to ensure that it is possible to `usePersonalInformationForTargeting` for this user in this context. If any of the applicable frameworks prevent this, the response will be `false`.

## Implementing Legal Frameworks

This library was initially created to support the [CCPA legislation](https://www.oag.ca.gov/privacy/ccpa) on Vox Media's websites. Instead of trying to model the public interface to reference specific legislative acts, it is modeled as capabilities. While the CCPA contains a handful of "rights", the public interface exposes the relevant capabiltiies. For example, on [Chorus](https://getchorus.voxmedia.com) powered pages

## Rough Diagram

_Initial sketch._

```
╔════════════════════════════════════════════════╗
║                 CAPABILITIES                   ║
║                                                ║
║    ┌──────────────────────────────────────┐    ║
║    │       Can we store a user-id?        │    ║
║    └──────────────────────────────────────┘    ║
║    ┌──────────────────────────────────────┐    ║
║    │     Can we personalize content?      │    ║
║    └──────────────────────────────────────┘    ║
║    ┌──────────────────────────────────────┐    ║
║    │       Can we personalize ads?        │    ║
║    └──────────────────────────────────────┘    ║
║                                                ║
╚════════════════════════╦═══════════════════════╝
                         ║
┌────────────────────────▼───────────────────────┐
│          COMMON PRIVACY INTERFACE              │
└───────┬────────────────┬───────────────┬───────┘
        │                │               │
┌───────▼──────┐ ┌───────▼──────┐ ┌──────▼───────┐
│              │ │              │ │              │
│              │ │              │ │Future Privacy│
│     CCPA     │ │     GDPR     │ │  Framework   │
│              │ │              │ │              │
│              │ │              │ │              │
│              │ │              │ │              │
└──────────────┘ └──────────────┘ └──────────────┘

```
