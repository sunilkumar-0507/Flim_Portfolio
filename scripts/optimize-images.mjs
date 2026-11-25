// Usage: node scripts/optimize-images.mjs "<source image>" <output-name>
// Writes responsive WebP + JPG versions into public/images/portraits/.
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const [src, name = "portrait"] = process.argv.slice(2);
if (!src) {
  console.error('Usage: node scripts/optimize-images.mjs "<source image>" <output-name>');
  process.exit(1);
}
const out = "public/images/portraits";
mkdirSync(out, { recursive: true });

for (const w of [640, 1200]) {
  await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${out}/${name}-${w}.webp`);
}
await sharp(src).resize({ width: 1200, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toFile(`${out}/${name}.jpg`);
console.log("done");
