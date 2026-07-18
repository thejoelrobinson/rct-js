import { readFileSync } from "node:fs";
import { resolve } from "node:path";
const ROOT = new URL("..", import.meta.url).pathname;
let _t = 1700000000000; Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};
const { createRuntime, skipFadeIn, enterScenarioPlay } = await import(ROOT + "runtime/harness.js");
const { state } = await import(ROOT + "runtime/win32/context.js");
const VFS = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of VFS) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));
const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
try { r.runInit(); } catch {} try { r.runTick(); } catch {}
skipFadeIn(r.heap); enterScenarioPlay(r.heap);
const counts = {};
for (const addr of [0x429560, 0x4295e5, 0x42967d, 0x4296c4, 0x429710, 0x429786, 0x4297cb]) {
  const w = state.fnDispatch.get(addr);
  state.fnDispatch.set(addr, function (h) { counts[addr.toString(16)] = (counts[addr.toString(16)] || 0) + 1; return w ? w(h) : 0; });
}
const w502 = state.fnDispatch.get(0x429502);
let n502 = 0;
state.fnDispatch.set(0x429502, function (h) { n502++; return w502(h); });
const TICKS = parseInt(process.env.TICKS || "8");
for (let i = 0; i < TICKS; i++) { try { r.runTick(); } catch (e) { console.log("tick err", e.message); } }
console.log("429502 calls:", n502);
console.log("award block dispatch counts:", counts);
