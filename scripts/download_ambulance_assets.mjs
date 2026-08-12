import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../frontend/public/assets');

const files = {
  'imgRectangle74.png': 'http://localhost:3845/assets/e526471ad2677d0251ad46df4c2b23df7bb1fa8e.png',
  'imgRectangle80.png': 'http://localhost:3845/assets/5b789557970a027d5d41b74b7b27ba78bcd24359.png',
  'imgRectangle78.png': 'http://localhost:3845/assets/f25829f0da864a9e659517dc277b84ef35ad77cb.png',
  'imgRectangle76.png': 'http://localhost:3845/assets/8049466032c9f52e52f26c4ee138639e86c24e61.png',
  'imgEllipse57.svg': 'http://localhost:3845/assets/583a5f55c39806111330f3e758dbacbacb9cf886.svg',
  'imgVector9.svg': 'http://localhost:3845/assets/4c917878cee85824f958ccdbc098f79d5987f8b1.svg',
  'imgEllipse58.svg': 'http://localhost:3845/assets/1e41f3a9ce9d713d834cc9ad539ef991421f4b91.svg',
  'imgEllipse60.svg': 'http://localhost:3845/assets/1c944859f310d62b55d85e4d3479f5e6c9eca660.svg',
  'imgEllipse59.svg': 'http://localhost:3845/assets/87abb42b612a95c1b31c4cb19dd81a839beee62f.svg',
  'imgEllipse61.svg': 'http://localhost:3845/assets/642d44542860477bba9bada723c67448c1435a17.svg',
  'imgEllipse73.svg': 'http://localhost:3845/assets/7b57bbfeb4e4d4f3c86a50984358fa469cc8d461.svg'
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
