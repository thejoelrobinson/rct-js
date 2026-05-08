import { loadPE } from "./harness/loader-node.js";
import { wireImports } from "./harness/imports.js";
const image = loadPE("./binary/rct.exe");
const m = new Uint8Array(image.totalSize + 0x100000);
m.set(image.memory, 0);
const { iatEntries } = wireImports(m, image);
for (const e of iatEntries) {
  if (e.sentinel === 0xf00001b4 || e.sentinel === 0xf00001b0 || e.sentinel === 0xf00001b8) {
    console.log(`0x${e.sentinel.toString(16)}: ${e.dll}!${e.name}`);
  }
}
