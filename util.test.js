const puppetter = require('puppeteer');
const { generateText, checkAndGenerate }  = require('./util');

// Unit Test
test('should output name and age', () => {
    const text = generateText('Geo', 27);
    expect(text).toBe('Geo (27 years old)');

});

// Integrated test
test('should generate a valid text ouput', () => {
    const text = checkAndGenerate('Geo', 27);
    expect(text).toBe('Geo (27 years old)');
})

// E2E Test
test('should create an element with text and correct class', async ()=> {
    const browser = await puppetter.launch({
        headless: false, 
        slowMo: 60,
        args: ['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:5500/index.html');
    await page.click('input#name');
    await page.type('input#name', 'Geo Hernandez');
    await page.click('input#age');
    await page.type('input#age', '27');
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent)
    expect(finalText).toBe('Geo Hernandez (27 years old)');
}, 10000) ;
