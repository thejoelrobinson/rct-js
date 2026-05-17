// Show all DDraw surfaces.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
const ROOT = "/Users/joelrobinson/rct-js";

const { createRuntime } = await import(resolve(ROOT, "runtime/harness.js"));
const { state } = await import(resolve(ROOT, "runtime/win32/context.js"));

const VFS_FILES = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const VFS_PLACEHOLDERS = ["css10.dat","css12.dat","css16.dat","tutl.dat"];
const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfs = new Map();
for (const name of VFS_FILES) { try { vfs.set(name.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", name))); } catch (e) {} }
for (const name of VFS_PLACEHOLDERS) vfs.set(name.toLowerCase(), new Uint8Array(0));

const r = createRuntime({ dataBin, vfs });
try { r.runInit(); } catch (e) { console.error("init err:", String(e).slice(0,200)); }
try { r.runTick(); } catch (e) { console.error("tick err:", String(e).slice(0,200)); }

console.log(`# surfaces: ${state.ddrawSurfaces.size}`);
for (const s of state.ddrawSurfaces.values()) {
  const palette = new Set();
  const sz = s.pitch * s.height;
  for (let i = 0; i < sz; i++) palette.add(r.heap.bytes[s.bytes + i]);
  console.log(`  ${s.width}x${s.height} pitch=${s.pitch} isPrimary=${s.isPrimary} addr=0x${s.bytes.toString(16)} distinct=${palette.size}`);
}
