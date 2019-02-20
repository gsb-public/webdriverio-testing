const { config } = require('./wdio.shared.conf');

// ============
// Specs
// ============
config.specs = [
    './tests/*.js',
];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
    {
        // The defaults you need to have in your config
        automationName: 'UiAutomator2',
        deviceName:         process.env.DEVICEFARM_DEVICE_NAME,
        platformName:       process.env.DEVICEFARM_DEVICE_PLATFORM_NAME,
        browserName: 'chrome',
        // Add this option to prevent the anoying "Welcome"-message
        chromeOptions: {
            args: [ '--no-first-run' ],
        },
        newCommandTimeout: 240,
    },
];

// ====================
// Appium Configuration
// ====================
// Default port for Appium
config.port = 4723;

exports.config = config;
