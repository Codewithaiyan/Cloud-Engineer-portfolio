const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const consoleMessages = [];
    const consoleErrors = [];

    page.on('console', msg => {
        consoleMessages.push({ type: msg.type(), text: msg.text() });
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
        }
    });

    page.on('pageerror', error => {
        consoleErrors.push(error.message);
    });

    try {
        const filePath = 'file:///workspace/architecture-firm/index.html';
        await page.goto(filePath, { waitUntil: 'networkidle' });

        console.log('Portfolio page loaded successfully!');
        console.log(`Page title: ${await page.title()}`);

        // Verify key elements
        const header = await page.$('.header');
        console.log(`Header exists: ${!!header}`);

        const hero = await page.$('.hero');
        console.log(`Hero section exists: ${!!hero}`);

        const skills = await page.$('.skills');
        console.log(`Skills section exists: ${!!skills}`);

        const projects = await page.$('.projects');
        console.log(`Projects section exists: ${!!projects}`);

        const credentials = await page.$('.credentials');
        console.log(`Credentials section exists: ${!!credentials}`);

        const contact = await page.$('.contact');
        console.log(`Contact section exists: ${!!contact}`);

        const footer = await page.$('.footer');
        console.log(`Footer exists: ${!!footer}`);

        // Check skill items
        const skillItems = await page.$$('.skill-item');
        console.log(`Skill items count: ${skillItems.length}`);

        // Check project cards
        const projectCards = await page.$$('.project-card');
        console.log(`Project cards count: ${projectCards.length}`);

        // Check certificate items
        const certItems = await page.$$('.cert-item');
        console.log(`Certificate items count: ${certItems.length}`);

        // Test form
        const formInputs = await page.$$('.form-input');
        console.log(`Form inputs count: ${formInputs.length}`);

        // Check for console errors
        if (consoleErrors.length > 0) {
            console.log('\n--- Console Errors ---');
            consoleErrors.forEach(err => console.log(`ERROR: ${err}`));
            process.exit(1);
        } else {
            console.log('\nNo console errors detected!');
        }

        console.log('\n=== All tests passed! ===');

    } catch (error) {
        console.error('Test failed:', error.message);
        process.exit(1);
    } finally {
        await browser.close();
    }
})();
