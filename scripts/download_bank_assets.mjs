import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../frontend/public/assets');

const files = {
  'bank_sbi.png': 'http://localhost:3845/assets/4983fe27e6682012ebc6e051fedbeda264231f0b.png',
  'bank_hdfc.png': 'http://localhost:3845/assets/a83f855eb164a11cf1490dd52bdd7ff6d6720aef.png',
  'bank_icici.png': 'http://localhost:3845/assets/0191f5873a554ad9f427a53d6fd88dcf7c12fa9b.png',
  'bank_axis.png': 'http://localhost:3845/assets/a98f00667e777f4c0c49c1f9c7c8a4e4a18facbd.png',
  'bank_kotak.png': 'http://localhost:3845/assets/5aefba14b1b6b6c4481ae2b22c7d224ce0b74b96.png'
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
