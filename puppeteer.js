const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.google.com');

    await page.type('input[name=q]', 'Puppeteer');
    await page.keyboard.press('Enter');

    await page.waitForSelector('#search');

    const results = await page.evaluate(() => {
        let items = document.querySelectorAll('h3');
        let links = [];
        items.forEach((item) => {
            links.push({
                title: item.innerText,
                link: item.parentElement.href
            });
        });
        return links;
    });

    console.log(results);

    await browser.close();
})();
