import fs from 'fs';
import path from 'path';
import https from 'http'; // The local server is http

const assets = {
  imgBackground: "http://localhost:3845/assets/aed4e69b292fb162c32bbc09c624da1e7000ed62.png",
  imgRectangle64: "http://localhost:3845/assets/86ff6018b2d12cbee72447173d1e4626ec0c4d28.png",
  imgRectangle65: "http://localhost:3845/assets/6c494e12d235129fc71119ecfc9dbd38795fc5fc.png",
  imgGroup19: "http://localhost:3845/assets/f0f8c0c0600e0611fecb3a748ed4f324dfaeaaac.svg",
  imgGroup20: "http://localhost:3845/assets/f61bc71280a98fb7d4934f82505fddb068491ea2.svg",
  imgEllipse15: "http://localhost:3845/assets/f52ce0b951d53725ee571604bb4c7a8f0216c8d6.svg",
  imgEllipse13: "http://localhost:3845/assets/5b09aa58582bd68094bfb7952c129f75111aae95.svg",
  imgEllipse12: "http://localhost:3845/assets/4d01c73593e831da2d7188a5ce72db0737244d3a.svg",
  imgVector: "http://localhost:3845/assets/da71618a69a385c47361a2d16251ed2ac9d8b5bb.svg",
  imgVector1: "http://localhost:3845/assets/29cd22f31b8b70aa34cee39228f39fe9d863b0bb.svg",
  imgVector2: "http://localhost:3845/assets/440b83834c636a6d13dfa27f8f7e6804a31524d6.svg",
  imgGroup: "http://localhost:3845/assets/19e45340dca763d665ad8c0e3c6c0e6b8bf0fac0.svg",
  imgVector3: "http://localhost:3845/assets/d4d2ab85a756b8272be9e8deee399eefa9e200c6.svg",
  imgGroup22: "http://localhost:3845/assets/c6f98f27e6eb8176b6ecdf81a5f43f2ff488eb26.svg",
  imgSubtract: "http://localhost:3845/assets/c88548dead72ccb6985e80bcf46d0d45f9277fa3.svg",
  imgVector4: "http://localhost:3845/assets/abf3a1feae3cc4341edba766bf2480b5ec047e68.svg",
  imgVector5: "http://localhost:3845/assets/6ba25623d3aeeddfae071e91f8ab73754620feaa.svg",
  imgGroup33: "http://localhost:3845/assets/d3e211e8351e75e43adefee3c3f6868551b49a43.svg",
  imgVector6: "http://localhost:3845/assets/132bbf3646b34ad6bd7cfd0e7997046425072767.svg",
  imgGroup1: "http://localhost:3845/assets/5290bdf3468f89ee5c9e4ef1ba31a0bb3a666f77.svg",
  imgVector7: "http://localhost:3845/assets/5fee7c671c7b2fc6d44dff7543d9ff73bbde9ccf.svg",
  imgEllipse54: "http://localhost:3845/assets/e706c1c6812f4c77ed9a3a21253d03f1f838a1fd.svg",
  imgVector8: "http://localhost:3845/assets/1af60ec422d4279a6d9389d093f4951e8e2b3d59.svg",
  imgVector9: "http://localhost:3845/assets/953ae21df2737badaa4914bdddba7a3089b70017.svg",
  imgEllipse56: "http://localhost:3845/assets/1e639eee8e58154e17e1c8f1a7c12a1e155fa44c.svg",
  imgVector10: "http://localhost:3845/assets/3d2b63275e9c39575bbdb7ae83a39e2887ec06ef.svg",
  imgVector11: "http://localhost:3845/assets/6dfdb4351aefa43a950dae0229e9b3e656b8c1e0.svg",
  imgVector12: "http://localhost:3845/assets/2fbf4a5c8d24313b1837eb799d8d59fa6383e7f5.svg",
  imgVector13: "http://localhost:3845/assets/ffb155cc02798c2976ca989ae341b65b72a75149.svg",
  imgGroup29: "http://localhost:3845/assets/174e0efc0381460018c88985361a703b658b7348.svg",
  imgVector14: "http://localhost:3845/assets/0b5497b97565b6f4a1ac3bf80d5cb73f7483711e.svg",
  imgVector15: "http://localhost:3845/assets/88a6c89225ce3db0190937a4f6d066e0108ffb1c.svg",
  imgVector16: "http://localhost:3845/assets/d44b831fba278b6a5e1e883c7fb735406cd59346.svg",
};

const outputDir = path.join(process.cwd(), 'frontend', 'public', 'assets');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function downloadAsset(name, url) {
  const extension = url.split('.').pop();
  const filename = `${name}.${extension}`;
  const dest = path.join(outputDir, filename);

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  const failed = [];
  for (const [name, url] of Object.entries(assets)) {
    try {
      await downloadAsset(name, url);
      console.log(`Downloaded ${name}`);
    } catch (err) {
      console.error(`Error downloading ${name}: ${err.message}`);
      failed.push(name);
    }
  }
  if (failed.length > 0) {
    console.error("The following assets failed to download: ", failed.join(', '));
  } else {
    console.log("All assets downloaded successfully!");
  }
}

main();
