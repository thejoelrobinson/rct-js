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
// Sourced from OpenRCT2's resources/palettes/sprites.json — the canonical
// 256-entry RCT1/RCT2 sprite palette. Stored as base64-encoded RGB triples
// (768 bytes; 0/0/0 entries reflect unused indices like 0..9 reserved for
// system colors).
//
// Index 0 is transparent; indices 0xFE/0xFF are typically white/black.
const _RCT_PALETTE_RGB_BASE64 =
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFyMjIzMzL0NDP1NTS2NjW3NzN5uXJ4+HG4N7D3dvB2tjB2tjB2tjB2tjB2tjB2tjB2tjB2tjD3dvG4N7J4+Hu79zF393D3NrB2tjAF9XAFdPAFdPAFdPAFdPAFdPAFdPAFdPAFdPAF9XB2dfD3NrXysAB2tjAGNbAFtTAFNLAEtDAEtDAEtDAEtDAEtDAEtDAEtDAEtDAFNLAFtTAGNbjycnozs7s09Px2dn139/65+f/7+/GzMTIz8XL08fO18nR28rV38zY487c5tDg6tLk7tTx///m+Pjc8vLU7OvN5uXN5uXN5uXN5uXN5uXN5uXN5uXN5uXU7Ovc8vLm+PjE1MAq+fne8vLU7OvL5eTF393F393F393F393F393F393F393F393L5eTU6+ve8vLu3NTg8/PV7OzN5uXG4N7B2tjB2tjB2tjB2tjB2tjB2tjB2tjB2tjG4N7M5uXV7Ozt7ff09Pv7+//ABtvACeXBzOnD0O7G1PLK2ffQ4fjW6Pnd7vvj9Pzr+f71/f/CysPDzcXLy8vLy8vV0cvO3NLT4dfY5t3e6+Lk8enr9vDz/PfPwBfSwdzUw9/Xx+Payubez+rJycrJycrQzcjv5vn18Pz8+v/PwAAVwAAcwAAjwAAqwAAxwAA4wcA/wcA/09D/3tzHyMnHyMnPy8bbzMAkz8At0cA208A/1MA/28X/4sz/6NP/7dr/8uH/9ujADMvAD83AEtDAFdPB2tjF393K5OPR6ejY7u7g8/Pq+fnz///PwAbZwAzews/jxdPox9ftydv2zuP71ur83e795fL+7ff/9fvJxMANx8HRy8PWz8fa1Mze2dLj39ro5N/u6uTz8Or59vD//PfN0tL/7cA/9sA//8AB2tjD3dvG4N7J4+HN5uXN5uXU7Ovc8vLm+Pjx///Q1tbU2trY3t7AABfGyuLJzuXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

// Standard RCT defaults for the "animated cycle" palette slots that the
// baked base64 leaves as zero. These slots get overwritten at runtime by
// the binary's palette-cycling code (sky/water animation, primary remap),
// but rendering BEFORE the first cycle runs would otherwise show pure
// black for ~96% of the screen (the unpainted void).
//
// Values match the OpenRCT2 g1.dat first-frame state of each cycle:
//   1-9  : SPR_G1_PALETTE_DEFAULT animated slots — sky-cycle blues that the
//          title-screen sky-gradient code overwrites at boot. The off-state
//          colors are a dark blue ramp similar to a clear-night sky, derived
//          from the OpenRCT2 sky animation tables.
//   230-239 : water-wave + sparkle cycle colors (initial frame).
//   240-242 : track-rail static colors (silver/grey).
//   243-245 : primary-remap cycle (initial frame, blue).
//   246-254 : extended-remap / GDI system-reserved slots — left at their
//             RCT-default light grey ramp so any sprite that uses them
//             renders with a neutral tone.
//   255 : explicit white (RCT relies on this for path/menu rendering;
//         OpenRCT2 force-sets it every UpdatePalette call).
//
// These values cause 96% of the unpainted void pixels (palette index 1) to
// render as a recognizable sky-blue rather than the (25,25,25) dark grey
// the binary's GDI-system-palette fallback produces.
const _ANIMATED_SLOT_DEFAULTS = {
  // sky-cycle slots — dark to slightly lighter blue gradient
  1:  [10,  14,  30],   // void / deep night sky
  2:  [14,  22,  46],
  3:  [22,  30,  62],
  4:  [30,  42,  78],
  5:  [42,  54,  94],
  6:  [54,  66, 110],
  7:  [66,  78, 122],   // mid sky
  8:  [78,  94, 138],
  9:  [94, 110, 154],   // upper sky
  // water-wave animation (RCT default first-frame from OpenRCT2 g1.dat)
  230: [  7, 107,  99],
  231: [ 15, 119, 111],
  232: [ 27, 131, 123],
  233: [ 39, 143, 135],
  234: [ 55, 155, 151],
  // water-sparkle animation (first-frame highlights)
  235: [ 55, 155, 151],
  236: [ 83, 179, 175],
  237: [115, 203, 203],
  238: [155, 227, 227],
  239: [199, 255, 255],
  // track-rail static colors
  240: [ 67,  91,  91],
  241: [ 83, 107, 107],
  242: [ 99, 123, 123],
  // primary-remap cycle (first-frame: a saturated blue)
  243: [ 11,  23, 119],
  244: [ 19,  43, 147],
  245: [ 27,  59, 175],
  // extended remap / system-reserved highlight slots — light grey ramp
  246: [192, 192, 192],
  247: [200, 200, 200],
  248: [208, 208, 208],
  249: [216, 216, 216],
  250: [224, 224, 224],
  251: [232, 232, 232],
  252: [240, 240, 240],
  253: [248, 248, 248],
  254: [251, 251, 251],
  255: [255, 255, 255],  // explicit white (RCT path/menu rendering relies on this)
};

let _cachedPalette = null;
export function defaultPalette() {
  if (_cachedPalette) return _cachedPalette;
  const bin = (typeof atob !== "undefined")
    ? atob(_RCT_PALETTE_RGB_BASE64)
    : Buffer.from(_RCT_PALETTE_RGB_BASE64, "base64").toString("binary");
  const palette = new Uint8ClampedArray(256 * 4);
  for (let i = 0; i < 256; i++) {
    palette[i * 4 + 0] = bin.charCodeAt(i * 3 + 0);
    palette[i * 4 + 1] = bin.charCodeAt(i * 3 + 1);
    palette[i * 4 + 2] = bin.charCodeAt(i * 3 + 2);
    palette[i * 4 + 3] = i === 0 ? 0 : 255;     // 0 = transparent
  }
  // Patch in sensible defaults for the animated/system-reserved slots that
  // the OpenRCT2-baked base64 leaves as (0,0,0). Without these, palette
  // index 1 — which covers ~96% of the title-screen void — renders as
  // pure black instead of a recognizable sky color.
  for (const [idxStr, rgb] of Object.entries(_ANIMATED_SLOT_DEFAULTS)) {
    const i = +idxStr;
    palette[i * 4 + 0] = rgb[0];
    palette[i * 4 + 1] = rgb[1];
    palette[i * 4 + 2] = rgb[2];
    palette[i * 4 + 3] = 255;
  }
  _cachedPalette = palette;
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
