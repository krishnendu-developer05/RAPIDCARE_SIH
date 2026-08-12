import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../frontend/public/assets');

const files = {
  'map_enroute.png': 'http://localhost:3845/assets/52510e322526b1e718cf15b65d1f21e751165271.png',
  'driver_rajesh.png': 'http://localhost:3845/assets/4cd51d509f02aaee8c1dcb26e53b96c9edbc1545.png'
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
