// Builds the home page's images into public/img from the owner's source files.
//   node scripts/build-images.mjs
// Sources (not committed): the App Store marketing images in ~/Downloads (APEX-63in-1..6.png),
// the logo (~/Downloads/apex-logo-mark.svg) and the stand-in photographs (blob/ + ~/Downloads).
// Every output stays under 300 KB (checked at the end).
import sharp from 'sharp';
import { mkdir, stat, copyFile, readdir } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';

const DL = join(homedir(), 'Downloads');
const BLOB = process.env.BLOB_DIR; // folder holding the downloaded Vercel-blob stand-ins
const OUT = new URL('../public/img/', import.meta.url).pathname;
await mkdir(OUT, { recursive: true });

// The phone screen inside each App Store image (bezel and the baked headline cut away).
const SCREEN = { left: 144, top: 582, width: 918, height: 1926 };
const screens = [
  // Home: cut above "Drives" so the old "AED 49.99/month" banner never shows.
  { src: 'APEX-63in-1.png', name: 'screen-home', crop: { ...SCREEN, height: 1618 } },
  { src: 'APEX-63in-2.png', name: 'screen-fly' },
  { src: 'APEX-63in-3.png', name: 'screen-ridecard' },
  { src: 'APEX-63in-4.png', name: 'screen-market' },
  { src: 'APEX-63in-5.png', name: 'screen-card' },
  { src: 'APEX-63in-6.png', name: 'screen-dealer' },
];
for (const s of screens) {
  for (const w of [360, 720]) {
    await sharp(join(DL, s.src))
      .extract(s.crop ?? SCREEN)
      .resize({ width: w })
      .webp({ quality: 82, effort: 6 })
      .toFile(join(OUT, `${s.name}-${w}.webp`));
  }
}

// Stand-in photographs (NOT APEX's own; listed in the report to replace).
const photos = [
  { src: BLOB && join(BLOB, 'apex-bikes-s4mRdYk7929ut9Y6Jbo1y1yd5ZD5yf.png'), name: 'standin-riders-mountain' },
  { src: BLOB && join(BLOB, 'apex-community.png-nsD35voV06hihiEr439JSAK1Zm5SKi.jpeg'), name: 'standin-night-meet' },
  { src: join(DL, 'apex-offroad-real.jpg'), name: 'standin-offroad-shore' },
];
for (const p of photos) {
  if (!p.src) { console.warn('skip (set BLOB_DIR):', p.name); continue; }
  for (const w of [640, 1280]) {
    await sharp(p.src).rotate().resize({ width: w, height: w, fit: "inside", withoutEnlargement: true }).webp({ quality: 74, effort: 6 }).toFile(join(OUT, `${p.name}-${w}.webp`));
  }
}

// Logo: the vector chrome peak, as shipped.
await copyFile(join(DL, 'apex-logo-mark.svg'), join(OUT, 'apex-logo-mark.svg'));

let over = 0;
for (const f of await readdir(OUT)) {
  const { size } = await stat(join(OUT, f));
  const kb = Math.round(size / 1024);
  if (kb > 300) over++;
  console.log(`${kb.toString().padStart(4)} KB  ${f}`);
}
if (over) { console.error(`${over} file(s) over 300 KB`); process.exit(1); }
