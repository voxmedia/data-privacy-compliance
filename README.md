# Vox Media's Shared Privacy and Compliance Framework

This code is responsible for supporting the legislation and implementing the frameworks concerning user privacy.


# Deploying

To deploy updates, make changes to your branch and then run `yarn build` to make sure those updates are reflected in the `dist` files. The changes will automatically be deployed when you merge the PR. For the changes to be reflected in Concert Ads, run `yarn upgrade data-privacy-compliance`.


## Rough Diagram

_Initial sketch._

```
╔════════════════════════════════════════════════╗
║                 CAPABILITIES                   ║
║                                                ║
║    ┌──────────────────────────────────────┐    ║
║    │         Can we drop cookies?         │    ║
║    └──────────────────────────────────────┘    ║
║    ┌──────────────────────────────────────┐    ║
║    │       Can we store a user-id?        │    ║
║    └──────────────────────────────────────┘    ║
║    ┌──────────────────────────────────────┐    ║
║    │     Can we personalize content?      │    ║
║    └──────────────────────────────────────┘    ║
║    ┌──────────────────────────────────────┐    ║
║    │       Can we personalize ads?        │    ║
║    └──────────────────────────────────────┘    ║
║    ┌──────────────────────────────────────┐    ║
║    │     Can we use (e.g.) Permutive?     │    ║
║    └──────────────────────────────────────┘    ║
║                                                ║
╚════════════════════════╦═══════════════════════╝
                        ║
┌────────────────────────▼───────────────────────┐
│    <COMMON "CONCERT ADS PRIVACY" INTERFACE>    │
└───────┬────────────────┬───────────────┬───────┘
        │                │               │
┌───────▼──────┐ ┌───────▼──────┐ ┌──────▼───────┐
│              │ │              │ │              │
│              │ │              │ │Future Privacy│
│     CCPA     │ │     GDPR     │ │  Framework   │
│              │ │              │ │              │
│              │ │              │ │              │
│              │ │              │ │              │
└───────┬──────┘ └───────┬──────┘ └──────┬───────┘
        │                │               │
        │                │               │
┌───────▼──────┐ ┌───────▼──────┐ ┌──────▼───────┐
│              │ │              │ │              │
│Implementation│ │Implementation│ │Implementation│
│   Details    │ │   Details    │ │   Details    │
│              │ │              │ │              │
│              │ │              │ │              │
└──────────────┘ └──────────────┘ └──────────────┘
```
