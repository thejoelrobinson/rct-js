import { loadPE } from "./harness/loader-node.js";
const image = loadPE("./binary/rct.exe");
const STACK = 0x100000;
const m = new Uint8Array(image.totalSize + STACK);
m.set(image.memory, 0);
const peOff = (m[image.imageBase + 0x3c]) | (m[image.imageBase + 0x3d] << 8) | (m[image.imageBase + 0x3e] << 16) | (m[image.imageBase + 0x3f] << 24);
console.log(`PE header offset (e_lfanew):  0x${peOff.toString(16)}`);
const sig = String.fromCharCode(m[image.imageBase + peOff], m[image.imageBase + peOff + 1]);
console.log(`PE sig at imageBase + e_lfanew: '${sig}'`);
const optHdrOff = image.imageBase + peOff + 4 + 20;
const magic = m[optHdrOff] | (m[optHdrOff + 1] << 8);
console.log(`Optional header magic: 0x${magic.toString(16)}`);
// Dump the data directories
console.log("Data directories (16 entries, 8 bytes each):");
for (let i = 0; i < 16; i++) {
  const off = optHdrOff + 0x70 + i * 8;
  const rva = (m[off] | (m[off+1] << 8) | (m[off+2] << 16) | (m[off+3] << 24)) >>> 0;
  const size = (m[off+4] | (m[off+5] << 8) | (m[off+6] << 16) | (m[off+7] << 24)) >>> 0;
  if (rva || size) console.log(`  ${i}: rva=0x${rva.toString(16)} size=0x${size.toString(16)}`);
}
