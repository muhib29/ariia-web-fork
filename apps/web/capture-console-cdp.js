import * as http from 'http';

async function getChromeVersion() {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:9222/json/version', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function visitPageWithCDP() {
  try {
    console.log('Attempting to connect to Chrome via Remote Debugging Protocol...');
    const version = await getChromeVersion();
    console.log('Chrome version info:', version);
  } catch (error) {
    console.error('Could not connect to Chrome remote debugging:', error.message);
    console.log('\nTo use this, start Chrome with:');
    console.log('  chrome --remote-debugging-port=9222 http://localhost:3000');
  }
}

visitPageWithCDP();
