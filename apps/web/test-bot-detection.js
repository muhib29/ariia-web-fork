// Test bot detection conditions
const testCases = [
  {
    name: 'Modern Lighthouse',
    ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.55 Safari/537.36',
    webdriver: false,
    windowDims: { width: 1350, height: 900 }
  },
  {
    name: 'Headless Chrome',
    ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/126.0.6478.55 Safari/537.36',
    webdriver: false,
    windowDims: { width: 1350, height: 900 }
  },
  {
    name: 'Chrome with Lighthouse UA',
    ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.55 Safari/537.36',
    webdriver: false,
    windowDims: { width: 1350, height: 900 }
  },
  {
    name: 'Lighthouse with webdriver flag',
    ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.55 Safari/537.36',
    webdriver: true,
    windowDims: { width: 1350, height: 900 }
  },
  {
    name: 'Headless with 0x0 window',
    ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
    webdriver: false,
    windowDims: { width: 0, height: 0 }
  }
];

testCases.forEach((test) => {
  // Simulate the bot detection logic
  const uaMatch = /HeadlessChrome|Lighthouse|GTmetrix|Pingdom|PageSpeed|SpeedCurve/i.test(test.ua);
  const webdriverFlag = test.webdriver;
  const headlessCheck = test.windowDims.width === 0 && test.windowDims.height === 0;
  const isBot = uaMatch || webdriverFlag || headlessCheck;

  console.log(`\n▼ ${test.name}`);
  console.log(`  User Agent: ${test.ua}`);
  console.log(`  UA Regex Match: ${uaMatch}`);
  console.log(`  WebDriver Flag: ${webdriverFlag}`);
  console.log(`  Window Headless Check (0x0): ${headlessCheck}`);
  console.log(`  Window Dimensions: ${test.windowDims.width}x${test.windowDims.height}`);
  console.log(`  ➜ Result: isBot = ${isBot} ${isBot ? '✅ SKIP Spline' : '❌ LOAD Spline'}`);
});

console.log('\n\n📊 SUMMARY');
console.log('The bot detection regex looks for: HeadlessChrome|Lighthouse|GTmetrix|Pingdom|PageSpeed|SpeedCurve');
console.log('Modern Lighthouse might not include these keywords in the UA string by default.\n');
