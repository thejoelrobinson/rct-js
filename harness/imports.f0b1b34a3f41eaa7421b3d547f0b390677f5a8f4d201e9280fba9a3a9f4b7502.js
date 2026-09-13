// Parse the PE Import Directory and wire up the Import Address Table (IAT).
//
// Each imported function gets a sentinel address in the range [0xF0000000, ...).
// When the lifted code or interpreter calls into the IAT (e.g. `call [0x5e7100]`),
// the value it reads is one of these sentinels. eip jumps to the sentinel.
// The interpreter recognizes sentinel addresses and dispatches to a JS shim.

import { mem32 as memRead32 } from "../lifter/runtime.js";

const SENTINEL_BASE = 0xF0000000;

export function wireImports(memory, image) {
  // PE Import Directory entry was at PE optional header data directories[1].
  // We re-parse here to find it.
  const dv = (() => {
    // Find the PE header offset in the original image bytes — but we have
    // image.memory, which is the loaded image, not the file. The Import
    // Directory RVA was stored in the optional header at offset peOffset+4+20+128.
    // To avoid re-parsing the file we use the image's section map and
    // walk imports directly via the data directories which are still in memory.
    const peHdrOffset = (memory[image.imageBase + 0x3c]) |
                        (memory[image.imageBase + 0x3d] << 8) |
                        (memory[image.imageBase + 0x3e] << 16) |
                        (memory[image.imageBase + 0x3f] << 24);
    return peHdrOffset >>> 0;
  })();
  const peOff = image.imageBase + dv;
  const optHdrOff = peOff + 4 + 20;
  // PE32 optional-header layout: standard (28 bytes) + windows-specific (68 bytes) = 96 (0x60).
  // Data directories follow: each is 8 bytes; index 1 = Import Directory.
  const importDirRva  = mem32abs(memory, optHdrOff + 0x60 + 8);  // +0x68
  const importDirSize = mem32abs(memory, optHdrOff + 0x60 + 12); // +0x6c

  const importDir = image.imageBase + importDirRva;

  // Walk Import Directory: each entry is 20 bytes. Stop at all-zero entry.
  const shimsByAddr = new Map();   // sentinel addr → { dll, name, ordinal }
  const iatEntries = [];           // for debugging / inspection

  let i = 0;
  let nextSentinel = SENTINEL_BASE;
  while (true) {
    const entryOff = importDir + i * 20;
    const ilt   = mem32abs(memory, entryOff +  0); // Import Lookup Table RVA (or 0 if using IAT)
    const time  = mem32abs(memory, entryOff +  4);
    const fwd   = mem32abs(memory, entryOff +  8);
    const dllNameRva = mem32abs(memory, entryOff + 12);
    const iat   = mem32abs(memory, entryOff + 16); // IAT RVA
    if (ilt === 0 && iat === 0 && dllNameRva === 0) break;

    const dllName = readCString(memory, image.imageBase + dllNameRva);
    const lookupRva = ilt !== 0 ? ilt : iat; // ILT is the source of truth; bound files use IAT directly

    let j = 0;
    while (true) {
      const lookupAddr = image.imageBase + lookupRva + j * 4;
      const entry = mem32abs(memory, lookupAddr);
      if (entry === 0) break;
      let funcName = null, ordinal = null;
      if (entry & 0x80000000) {
        ordinal = entry & 0xffff;
        funcName = `${dllName}!#${ordinal}`;
      } else {
        const hintNameRva = entry & 0x7fffffff;
        // hint (2 bytes) + null-terminated name
        funcName = readCString(memory, image.imageBase + hintNameRva + 2);
      }
      const sentinel = nextSentinel; nextSentinel += 4;
      const iatSlot = image.imageBase + iat + j * 4;
      // Overwrite IAT slot with sentinel
      mem32abs_write(memory, iatSlot, sentinel);
      shimsByAddr.set(sentinel, { dll: dllName, name: funcName, ordinal, iatSlot });
      iatEntries.push({ dll: dllName, name: funcName, ordinal, sentinel, iatSlot });
      j++;
    }

    i++;
  }
  return { shimsByAddr, iatEntries, sentinelBase: SENTINEL_BASE };
}

// In-memory absolute-VA helpers (don't import to avoid circular deps).
function mem32abs(mem, addr) {
  return (mem[addr] | (mem[addr+1] << 8) | (mem[addr+2] << 16) | (mem[addr+3] << 24)) >>> 0;
}
function mem32abs_write(mem, addr, value) {
  mem[addr]   =  value        & 0xff;
  mem[addr+1] = (value >>> 8)  & 0xff;
  mem[addr+2] = (value >>> 16) & 0xff;
  mem[addr+3] = (value >>> 24) & 0xff;
}
function readCString(mem, addr) {
  const bytes = [];
  while (mem[addr] !== 0 && bytes.length < 256) {
    bytes.push(mem[addr]);
    addr++;
  }
  return String.fromCharCode(...bytes);
}
