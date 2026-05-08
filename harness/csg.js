// csg1.dat / csg1i.dat sprite decoder.
//
// Format (from OpenRCT2 source):
//   csg1i.dat: array of 16-byte StoredG1Element entries (no header).
//     +0  uint32 offset       (into csg1.dat)
//     +4  int16  width
//     +6  int16  height
//     +8  int16  xOffset
//     +0xa int16 yOffset
//     +0xc uint16 flags        (bit 0 = transparency, bit 2 = RLE)
//     +0xe uint16 zoomedOffset
//
//   csg1.dat: raw pixel data referenced by index entry's offset field.
//     - Bitmap mode: width*height bytes of palette indices.
//     - RLE mode: per-row offset table (height * uint16) followed by
//       per-row run records: [size:byte][firstX:byte][pixels:size bytes]...
//       repeating until size & 0x80 (end-of-line).

const HAS_TRANSPARENCY = 0x01;
const HAS_RLE          = 0x04;
const ENTRY_SIZE       = 16;

export function loadCsg(csg1Bytes, csg1iBytes) {
  const indexCount = (csg1iBytes.length / ENTRY_SIZE) | 0;
  return { csg1Bytes, csg1iBytes, indexCount };
}

function readEntry(csg1iBytes, idx) {
  const off = idx * ENTRY_SIZE;
  const view = new DataView(csg1iBytes.buffer, csg1iBytes.byteOffset + off, ENTRY_SIZE);
  return {
    offset:       view.getUint32(0, true),
    width:        view.getInt16(4, true),
    height:       view.getInt16(6, true),
    xOffset:      view.getInt16(8, true),
    yOffset:      view.getInt16(10, true),
    flags:        view.getUint16(12, true),
    zoomedOffset: view.getUint16(14, true),
  };
}

export function getSpriteHeader(csg, index) {
  if (index < 0 || index >= csg.indexCount) return null;
  return readEntry(csg.csg1iBytes, index);
}

// Decode a single sprite. Returns { width, height, xOffset, yOffset, pixels }
// where pixels is a width*height Uint8Array of palette indices (0xFF = transparent).
export function decodeSprite(csg, index) {
  const entry = readEntry(csg.csg1iBytes, index);
  if (!entry || entry.width <= 0 || entry.height <= 0) return null;

  const { width, height, xOffset, yOffset, flags, offset } = entry;
  const pixels = new Uint8Array(width * height);
  pixels.fill(0xff); // transparent default

  const data = csg.csg1Bytes;
  if (offset + 1 > data.length) return null;

  if ((flags & HAS_RLE) === 0) {
    // Bitmap: width*height bytes of palette indices, row-major.
    const total = width * height;
    if (offset + total > data.length) return null;
    pixels.set(data.subarray(offset, offset + total));
  } else {
    // RLE: per-row offset table + per-row run records.
    for (let y = 0; y < height; y++) {
      const lineHdr = offset + y * 2;
      if (lineHdr + 2 > data.length) break;
      const lineOff = data[lineHdr] | (data[lineHdr + 1] << 8);
      let src = offset + lineOff;
      let isEOL = false;
      while (!isEOL) {
        if (src + 2 > data.length) break;
        const dataSize = data[src++];
        const firstPixelX = data[src++];
        isEOL = (dataSize & 0x80) !== 0;
        const runLen = dataSize & 0x7f;
        if (src + runLen > data.length) break;
        const dstBase = y * width + firstPixelX;
        for (let i = 0; i < runLen && (firstPixelX + i) < width; i++) {
          pixels[dstBase + i] = data[src + i];
        }
        src += runLen;
      }
    }
  }

  return { width, height, xOffset, yOffset, pixels };
}

// Reference RCT1 8-bit palette — the standard system palette baked into the
// binary's resources. Each entry is RGB. Index 0 is the cursor mask color
// (transparent in tools), 0xff is transparent in sprites. We can populate
// from binary later; for now, a simple approximation that lets us export
// PNGs that look palette-ish.
export function defaultPalette() {
  const palette = new Uint8ClampedArray(256 * 4);
  for (let i = 0; i < 256; i++) {
    palette[i * 4]     = (i * 7) & 0xff;
    palette[i * 4 + 1] = (i * 11) & 0xff;
    palette[i * 4 + 2] = (i * 13) & 0xff;
    palette[i * 4 + 3] = i === 0xff ? 0 : 255;
  }
  return palette;
}

// Render a decoded sprite to RGBA Uint8ClampedArray using the palette.
export function spriteToRGBA(sprite, palette) {
  const out = new Uint8ClampedArray(sprite.width * sprite.height * 4);
  for (let i = 0; i < sprite.pixels.length; i++) {
    const p = sprite.pixels[i];
    out[i * 4]     = palette[p * 4];
    out[i * 4 + 1] = palette[p * 4 + 1];
    out[i * 4 + 2] = palette[p * 4 + 2];
    out[i * 4 + 3] = palette[p * 4 + 3];
  }
  return out;
}
