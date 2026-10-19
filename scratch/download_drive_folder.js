const https = require('https');
const fs = require('fs');
const path = require('path');

const folderId = '1Sf_0-RfqJjZLrQEjnd_DL0a7oDFzlpcc';
const url = `https://drive.google.com/drive/folders/${folderId}`;

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const html = await fetch(url);
  console.log('HTML Length:', html.length);
  fs.writeFileSync(path.join(__dirname, 'drive_folder.html'), html);
  console.log('Saved drive_folder.html');
}

main().catch(console.error);
