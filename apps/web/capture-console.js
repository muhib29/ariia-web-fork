import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-first-run', '--no-default-browser-check'],
  });

  const page = await browser.newPage();

  // Capture all console messages
  page.on('console', async (msg) => {
    const args = await Promise.all(
      msg.args().map((arg) => arg.jsonValue().catch(() => 'Error'))
    );
    console.log(`[${msg.type().toUpperCase()}] ${msg.text()}`);
    if (args.length > 0) {
      console.log('  Args:', JSON.stringify(args, null, 2));
    }
  });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle2',
    timeout: 60000,
  });

  console.log('\n--- Waiting 5 seconds for Spline loading...');
  await page.waitForTimeout(5000);

  console.log('\n--- Checking for [Spline: logs ---');
  const logs = await page.evaluate(() => {
    return window.__consoleLogs || 'No __consoleLogs found';
  });

  console.log('Page evaluation result:', logs);

  await browser.close();
})();
