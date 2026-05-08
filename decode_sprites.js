// Decode sprites from the actual csg1.dat / csg1i.dat files and write a few
// as PNG so we can visually verify the decoder works.
//
// Output: ./sprites/sprite_<N>.png

import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadCsg, decodeSprite, getSpriteHeader, spriteToRGBA, defaultPalette } from "./harness/csg.js";

const csg1  = readFileSync("/tmp/rct_mount/Data/csg1.dat");
const csg1i = readFileSync("/tmp/rct_mount/Data/csg1i.dat");

const csg = loadCsg(csg1, csg1i);
console.log(`Loaded csg1.dat (${csg1.length.toLocaleString()} bytes), csg1i.dat (${csg1i.length.toLocaleString()} bytes), ${csg.indexCount} sprites.`);

// Inspect first 8 entries
console.log("\nFirst 8 sprites (header data):");
for (let i = 0; i < 8; i++) {
  const h = getSpriteHeader(csg, i);
  if (h) console.log(`  #${i}: ${h.width}x${h.height} offset=0x${h.offset.toString(16)} flags=0x${h.flags.toString(16)} (RLE=${(h.flags & 4) ? "yes" : "no"})`);
}

// Decode + write a sample of sprites.
mkdirSync("sprites", { recursive: true });
const palette = defaultPalette();

const samples = [0, 1, 2, 5, 10, 100, 1000, 5000, 25000];
let written = 0;
for (const idx of samples) {
  const sprite = decodeSprite(csg, idx);
  if (!sprite || sprite.width === 0 || sprite.height === 0) {
    console.log(`  #${idx}: skipped (empty/invalid)`);
    continue;
  }
  const rgba = spriteToRGBA(sprite, palette);
  const png = encodePNG(sprite.width, sprite.height, rgba);
  const name = `sprites/sprite_${String(idx).padStart(5, "0")}.png`;
  writeFileSync(name, png);
  console.log(`  ${name}  (${sprite.width}x${sprite.height})`);
  written++;
}
console.log(`\nWrote ${written} PNGs.`);

// ---- Minimal PNG encoder (RGBA, no compression — uses raw deflate stored) ----
import { deflateSync } from "node:zlib";

function encodePNG(width, height, rgba) {
  // PNG signature
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 6;   // color type = RGBA
  ihdr[10] = 0;  // compression
  ihdr[11] = 0;  // filter
  ihdr[12] = 0;  // interlace

  // IDAT: filter byte (0) per row + pixel data
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    Buffer.from(rgba.buffer, rgba.byteOffset + y * stride, stride).copy(raw, y * (stride + 1) + 1);
  }
  const idat = deflateSync(raw);

  return Buffer.concat([
    sig,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", idat),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) {
    c = c ^ b;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  return (c ^ 0xffffffff) >>> 0;
}
