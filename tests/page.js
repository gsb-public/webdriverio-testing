const assert = require('assert');

describe('webdriver.io page', () => {
    it('should have the right title', () => {
        browser.url('https://public2-stage2.gsb.stanford.edu/');
        browser.saveDocumentScreenshot('screenshot.png');
        const title = browser.getTitle();
        assert.equal(title, 'Stanford Graduate School of Business | Change lives. Change organizations. Change the world.');
    });
});