// Minimal PE32 loader. Maps every section into a flat Uint8Array indexed by
// absolute virtual address, plus the PE headers at imageBase.
//
// Two entry points:
//   - loadPEFromBytes(Uint8Array) — pure, browser-friendly
//   - loadPE(path)                — node-only convenience wrapper

export function loadPEFromBytes(file) {
  // Accept node Buffer or browser Uint8Array equally.
  if (!(file instanceof Uint8Array)) file = new Uint8Array(file);
  const dv = new DataView(file.buffer, file.byteOffset, file.byteLength);

  // DOS header: e_lfanew at offset 0x3c points to the PE header.
  const peOffset = dv.getUint32(0x3c, true);
  if (file[peOffset] !== 0x50 || file[peOffset + 1] !== 0x45) {
    throw new Error("Not a PE file (missing 'PE' signature)");
  }

  // COFF header starts at peOffset+4. NumberOfSections at +6, SizeOfOptionalHeader at +20.
  const numSections = dv.getUint16(peOffset + 4 + 2, true);
  const sizeOfOptionalHeader = dv.getUint16(peOffset + 4 + 16, true);

  // Optional header (PE32): magic 0x10b at +0, ImageBase at +28.
  const optionalHeaderOffset = peOffset + 4 + 20;
  const magic = dv.getUint16(optionalHeaderOffset, true);
  if (magic !== 0x10b) throw new Error(`Expected PE32 (magic 0x10b), got 0x${magic.toString(16)}`);
  const imageBase = dv.getUint32(optionalHeaderOffset + 28, true);
  const sizeOfImage = dv.getUint32(optionalHeaderOffset + 56, true);

  // Section table follows the optional header.
  const sectionTableOffset = optionalHeaderOffset + sizeOfOptionalHeader;
  const sections = [];
  for (let i = 0; i < numSections; i++) {
    const base = sectionTableOffset + i * 40;
    const name = String.fromCharCode(...file.slice(base, base + 8)).replace(/\0+$/, "");
    sections.push({
      name,
      virtualSize:    dv.getUint32(base +  8, true),
      virtualAddress: dv.getUint32(base + 12, true),
      sizeOfRawData:  dv.getUint32(base + 16, true),
      pointerToRawData: dv.getUint32(base + 20, true),
      characteristics: dv.getUint32(base + 36, true),
    });
  }

  // Flat memory addressable by absolute VA.
  const memory = new Uint8Array(imageBase + sizeOfImage);

  // PE headers mapped at imageBase (Windows does this; the IAT-wiring code
  // reads the import directory from there).
  const sizeOfHeaders = dv.getUint32(optionalHeaderOffset + 60, true);
  memory.set(file.subarray(0, Math.min(sizeOfHeaders, file.length)), imageBase);

  for (const s of sections) {
    const copyLen = Math.min(s.sizeOfRawData, s.virtualSize);
    if (copyLen === 0) continue;
    const src = file.subarray(s.pointerToRawData, s.pointerToRawData + copyLen);
    memory.set(src, imageBase + s.virtualAddress);
  }

  return { memory, sections, imageBase, sizeOfImage, totalSize: imageBase + sizeOfImage };
}

// Node-side `loadPE(path)` lives in loader-node.js to keep this file
// browser-pure. Node code: `import { loadPE } from "./harness/loader-node.js";`
