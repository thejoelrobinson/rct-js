import { loadPE } from "./harness/loader-node.js";
import { wireImports } from "./harness/imports.js";
const image = loadPE("./binary/rct.exe");
const STACK_SIZE = 0x100000;
const memory = new Uint8Array(image.totalSize + STACK_SIZE);
memory.set(image.memory, 0);
const { iatEntries } = wireImports(memory, image);
console.log(`Parsed ${iatEntries.length} imports.`);
const byDll = {};
for (const e of iatEntries) (byDll[e.dll] = byDll[e.dll] || []).push(e.name);
for (const [dll, names] of Object.entries(byDll)) {
  console.log(`\n=== ${dll} (${names.length}) ===`);
  console.log(names.slice(0, 10).join(", ") + (names.length > 10 ? `, ... (+${names.length - 10})` : ""));
}
