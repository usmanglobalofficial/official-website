const fs = require('fs');
const path = require('path');
const https = require('https');

const files = [
  { id: '1nqHaUsc3_MnrXtjerKaG4G_y18P17X_R', filename: 'ug-image-1.jpg', originalName: 'Usman Global Images (1).jpeg' },
  { id: '1HME_ln3kpMZJAyBVrylmNxYdKyZku7Rg', filename: 'ug-image-2.jpg', originalName: 'Usman Global Images (2).jpeg' },
  { id: '1QWm8uPtmjXtrV075m52lwcukNH7GoH89', filename: 'ug-image-3.jpg', originalName: 'Usman Global Images (3).jpeg' },
  { id: '11yVfXfiPr6jgAyI-yMGskrHgn2erpnfe', filename: 'ug-image-4.jpg', originalName: 'Usman Global Images (4).jpeg' },
  { id: '1PjblmDOv6aBZfPDY00RewvncjPxr2LYt', filename: 'ug-image-5.jpg', originalName: 'Usman Global Images (5).jpeg' }
];

const destDir = path.join(__dirname, '..', 'public', 'images', 'products');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log(`Redirecting to: ${res.headers.location}`);
        downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`Failed with status code: ${res.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close(() => {
          const stats = fs.statSync(destPath);
          console.log(`Successfully downloaded ${destPath} (${stats.size} bytes)`);
          resolve(stats.size);
        });
      });

      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const item of files) {
    const destPath = path.join(destDir, item.filename);
    console.log(`Downloading ${item.originalName} (${item.id}) to ${item.filename}...`);
    // Direct download URL for drive
    const downloadUrl = `https://drive.usercontent.google.com/download?id=${item.id}&export=download`;
    try {
      await downloadFile(downloadUrl, destPath);
    } catch (err) {
      console.error(`Error downloading ${item.filename} from primary URL, trying secondary URL:`, err.message);
      try {
        const altUrl = `https://drive.google.com/uc?export=download&id=${item.id}`;
        await downloadFile(altUrl, destPath);
      } catch (err2) {
        console.error(`Failed completely for ${item.filename}:`, err2.message);
      }
    }
  }
  console.log('All downloads finished.');
}

run();
