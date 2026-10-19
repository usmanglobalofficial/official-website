const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'drive_folder.html'), 'utf8');

// Look for patterns like [\"id\",\"name\",...] or file ids
// Google drive typically has _DRIVE_DATA_ or window['_DRIVE_DATA_'] or JSON arrays with file IDs
const idRegex = /"([a-zA-Z0-9_-]{28,35})"/g;
const foundIds = new Set();
let match;
while ((match = idRegex.exec(html)) !== null) {
  const id = match[1];
  if (!id.includes('drive') && !id.includes('google') && !id.includes('fonts')) {
    foundIds.add(id);
  }
}

console.log('Found IDs count:', foundIds.size);

// Also look for image file names (.jpg, .jpeg, .png, .webp)
const imgRegex = /["']([^"']+\.(?:jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP))["']/g;
const images = [];
while ((match = imgRegex.exec(html)) !== null) {
  images.push(match[1]);
}
console.log('Found Image Names:', images);

// Look for data structures containing both ID and filename
const entryRegex = /\["([a-zA-Z0-9_-]{28,35})",\["([^"]+\.(?:jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP))"/g;
const pairs = [];
while ((match = entryRegex.exec(html)) !== null) {
  pairs.push({ id: match[1], name: match[2] });
}
console.log('Found Pairs with strict regex:', pairs);

// Alternative search: look around image names for 33-char drive IDs
images.forEach(imgName => {
  const idx = html.indexOf(imgName);
  if (idx !== -1) {
    const chunk = html.substring(Math.max(0, idx - 200), Math.min(html.length, idx + 200));
    console.log(`Context around ${imgName}:`, chunk);
  }
});
