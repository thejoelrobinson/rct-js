// Use the tripwire installed in 9b4911.js to log every write into [0x5f96e0..ec].
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = "/Users/joelrobinson/rct-js";

globalThis._b4911Trace = [];

const { createRuntime } = await import(resolve(ROOT, "runtime/harness.js"));
const VFS_FILES = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const VFS_PLACEHOLDERS = ["css10.dat","css12.dat","css16.dat","tutl.dat"];
const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfs = new Map();
for (const name of VFS_FILES) { try { vfs.set(name.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", name))); } catch (e) {} }
for (const name of VFS_PLACEHOLDERS) vfs.set(name.toLowerCase(), new Uint8Array(0));

const r = createRuntime({ dataBin, vfs });
try { r.runInit(); } catch (e) { console.error("init err:", String(e).slice(0,200)); }

globalThis._b4911Trace.length = 0;
try { r.runTick(); } catch (e) { console.error("tick err:", String(e).slice(0,200)); }

const t = globalThis._b4911Trace;
console.log(`Total 9b4911 dest-overlap events: ${t.length}`);
console.log(`Final: [e0]=0x${r.heap.u32(0x5f96e0).toString(16).padStart(8,"0")} [e4]=0x${r.heap.u32(0x5f96e4).toString(16).padStart(8,"0")} [e8]=0x${r.heap.u32(0x5f96e8).toString(16).padStart(8,"0")}`);

for (const e of t.slice(0, 12)) {
  console.log(`iter=${e.iter} edi(rowBaseStart)=0x${e.edi_orig.toString(16)} rowBaseCur=0x${e.rowBase.toString(16)} rowStride=0x${e.rowStride.toString(16)} dstX=${e.dstX} dst=0x${e.dst.toString(16)} len=${e.len} src=0x${e.src.toString(16)}`);
  console.log(e.stack);
  console.log("---");
}
if (t.length > 12) console.log(`(skipped ${t.length - 12} more)`);
