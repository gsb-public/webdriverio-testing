const assert = require('assert');

describe('load home page', () => {
    it('get photo in portrait', () => {
        browser.url('https://public2-stage2.gsb.stanford.edu/');
        browser.saveDocumentScreenshot(process.env.DEVICEFARM_SCREENSHOT_PATH + '/homepage-portrait.png');
        const title = browser.getTitle();
        assert.equal(title, 'Stanford Graduate School of Business | Change lives. Change organizations. Change the world.');
    });
    it('get photo in landscape', () => {
        browser.orientation('LANDSCAPE');
        browser.url('https://public2-stage2.gsb.stanford.edu/');
        browser.saveDocumentScreenshot(process.env.DEVICEFARM_SCREENSHOT_PATH + '/homepage-landscape.png');
        const title = browser.getTitle();
        assert.equal(title, 'Stanford Graduate School of Business | Change lives. Change organizations. Change the world.');
    });
    it('get photo in portrait', () => {
        browser.orientation('PORTRAIT');
        browser.url('https://public2-stage2.gsb.stanford.edu/programs/mba/student-life/voices/owen-wurzbacher');
        browser.saveDocumentScreenshot(process.env.DEVICEFARM_SCREENSHOT_PATH + '/voice-portrait.png');
        const title = browser.getTitle();
        assert.equal(title, 'Owen Wurzbacher | Stanford Graduate School of Business');
    });
    it('get photo in landscape', () => {
        browser.orientation('LANDSCAPE');
        browser.url('https://public2-stage2.gsb.stanford.edu/programs/mba/student-life/voices/owen-wurzbacher');
        browser.saveDocumentScreenshot(process.env.DEVICEFARM_SCREENSHOT_PATH + '/voice-landscape.png');
        const title = browser.getTitle();
        assert.equal(title, 'Owen Wurzbacher | Stanford Graduate School of Business');
    });
    it('get photo in portrait', () => {
        browser.orientation('PORTRAIT');
        browser.url('https://public2-stage2.gsb.stanford.edu/programs/mba/student-life/voices');
        browser.saveDocumentScreenshot(process.env.DEVICEFARM_SCREENSHOT_PATH + '/mba-voice-portrait.png');
        const title = browser.getTitle();
        assert.equal(title, ' MBA Student Voices | Stanford Graduate School of Business');
    });
    it('get photo in landscape', () => {
        browser.orientation('LANDSCAPE');
        browser.url('https://public2-stage2.gsb.stanford.edu/programs/mba/student-life/voices');
        browser.saveDocumentScreenshot(process.env.DEVICEFARM_SCREENSHOT_PATH + '/mba-voice-landscape.png');
        const title = browser.getTitle();
        assert.equal(title, ' MBA Student Voices | Stanford Graduate School of Business');
    });


});
