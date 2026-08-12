import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../frontend/public/assets');

const files = {
  'imgRectangle97.png': 'http://localhost:3845/assets/599c393b282e8b9ee5dfc563113ac8fa0c4b01e2.png',
  'imgEllipse78.png': 'http://localhost:3845/assets/0102196fe252f3eda4f29f975d508071585967f4.png',
  'imgRectangle98.png': 'http://localhost:3845/assets/a11c136f1f510c11e4b1506473c824e5b4777afa.png',
  'imgRectangle99.png': 'http://localhost:3845/assets/ff5668af596e5cd030e4df08f024caee46c38faf.png'
};

async function downloadFiles() {
  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
  }

  for (const [filename, url] of Object.entries(files)) {
    console.log(`Downloading ${filename}...`);
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to download ${url}: ${res.statusText}`);
      continue;
    }
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(path.join(ASSETS_DIR, filename), buffer);
    console.log(`Saved ${filename}`);
  }
}

downloadFiles();
