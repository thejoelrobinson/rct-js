// Binary-faithful boot probe (plan: partitioned-churning-flask, option 3).
//
// The harness's runInit() reaches a gameplay state by calling the binary's boot
// init chain through the JS PORTS (which is exactly where the state diverges from
// the binary). This runs the SAME sequence through the x86 INTERPRETER (binary
// code) so the resulting state is byte-faithful to the binary — the only state on
// which the binary's sim functions (e.g. FUN_00424e0f) actually terminate.
//
// Decisive test: after the interp boot, does FUN_00424e0f run via the interpreter
// WITHOUT hitting the step limit? (On the JS-booted state it ran away — it's a
// victim of upstream divergence. On a faithful state it must terminate.)
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
globalThis.__t = 1700000000000;
Date.now = () => ++globalThis.__t;
if (typeof performance !== "undefined") performance.now = () => globalThis.__t - 1700000000000;
globalThis._renderTrace = () => {};

const { createRuntime } = await import(resolve(ROOT, "runtime/harness.js"));
const { state } = await import(resolve(ROOT, "runtime/win32/context.js"));
const { regs } = await import(resolve(ROOT, "runtime/regs.js"));
const { runFunction, setEipHook } = await import(resolve(ROOT, "harness/x86.js"));
const { wireImports } = await import(resolve(ROOT, "harness/imports.js"));
const { bindShims, initHeap: initShimHeap, setVfs } = await import(resolve(ROOT, "harness/shims.js"));

const F = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of F) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));
const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
const h = r.heap, b = h.bytes;
// createRuntime sets the runtime-CONTEXT vfs (JS path); the interp boot calls
// shims.js's CreateFileA which uses shims.js's OWN _vfs — populate it too.
// (setVfs uses Object.entries, so it needs a plain object, NOT a Map.)
setVfs(Object.fromEntries(vfs));

// Wire IAT + timing bypass so binary boot code can call Win32 shims via the interp.
const { iatEntries } = wireImports(b, { imageBase: 0x400000 });
bindShims(iatEntries);
// The interp's HeapAlloc uses shims.js's allocator (separate from the runtime's
// kernel32.js one) — init it to the SAME runtime-heap region [dataBin..+64MB).
initShimHeap(0x009c4000, 0x009c4000 + 64 * 1024 * 1024);
setEipHook(0x0040473c, (cpu) => { cpu.regs.eax = Date.now() >>> 0; });
// FUN_0042fa5f (the .SC4 header read/validate) ends with `stc; ret` (0x42fb20)
// on its failure branch — a copy-protection/signature check that fails for our
// file. FUN_0042f4be then `jb 0x42f693` (0x42f4ea) on that carry, skipping the
// decompress. The JS hand-port of 42f4be removes this gate; do the same for the
// interp by clearing CF on that failure-ret so the decompress runs.
setEipHook(0x0042fb21, (cpu) => { cpu.eflags.CF = 0; });
const cpu = state.__painterCpu;
if (!cpu) { console.log("FATAL: state.__painterCpu not exposed"); process.exit(1); }

const STACK_TOP = b.byteLength, LIMIT = 200_000_000;
function runI(addr, tag) {
  cpu.regs.eax = regs.eax >>> 0; cpu.regs.ecx = regs.ecx >>> 0; cpu.regs.edx = regs.edx >>> 0; cpu.regs.ebx = regs.ebx >>> 0;
  cpu.regs.esi = regs.esi >>> 0; cpu.regs.edi = regs.edi >>> 0; cpu.regs.ebp = regs.ebp >>> 0;
  cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
  cpu.fpuTop = 0; cpu.fpuTags = 0xffff; cpu.fpuSw = 0;
  const ns0 = process.hrtime.bigint();
  let steps = 0, err = null;
  try { steps = runFunction(cpu, addr >>> 0, { stackTop: STACK_TOP, limit: LIMIT }); }
  catch (e) { err = e.message; }
  const ms = Number(process.hrtime.bigint() - ns0) / 1e6;
  console.log(`  runI ${tag} (0x${addr.toString(16)}): steps=${steps} ms=${ms | 0}${err ? " THROW=" + err : ""}`);
  return { steps, err, ms };
}
const sprHash = () => { let x = 0x811c9dc5 >>> 0; for (let i = 0x743b94; i < 0x880000; i++) { x ^= b[i]; x = Math.imul(x, 0x01000193) >>> 0; } return (x >>> 0).toString(16).padStart(8, "0"); };
const sprActive = () => { let c = 0; for (let i = 0; i < 5000; i++) { const s = 0x743b94 + i * 0x100; if (h.u8(s) !== 0 && h.u16(s + 0xa) !== 0xffff) c++; } return c; };

console.log("=== binary-faithful boot via interpreter ===");
console.log(`sprite-hash @start: 0x${sprHash()}  active~${sprActive()}`);

// 402e9b pre-loop essentials (the harness sets these directly in runInit).
h.setU32(0x005f1398, 1);   // hInstance token
h.setU32(0x005e9190, 0);   // lpCmdLine = empty
// (screen dims DAT_005f2400=640 / DAT_005f1ff0=480 pre-populated by createRuntime)
// Display dims that FUN_00403d79 case-4 sets from the WM_SIZE the display-mode
// change posts — headless that message never reaches the WindowProc, so poke the
// values it would set (640x480), satisfying FUN_009bb6af's `0x3f < DAT_005f15c4`
// gate. (Same pattern as the harness pre-poking DAT_005f2400/005f1ff0.)
h.setU32(0x005f15c4, 640); // display width
h.setU32(0x005f1b34, 480); // display height
h.setU32(0x005e917c, 1);   // "display dims valid" flag
h.setU32(0x005e9178, 0);   // not the fullscreen-exclusive sentinel

// Mirror runInit's init chain — but through the interpreter (binary code).
runI(0x404752, "preinit-1");
runI(0x404b0e, "preinit-2");
runI(0x405f2c, "RegisterClass");
runI(0x406d10, "DirectInput");
runI(0x40d9a0, "palette");
runI(0x40df00, "fonts/MIDI");

// Seed the scenario path, then the first-tick lazy-init (sprite pool) + scenario load.
const path = "sc21.sc4\0";
for (let i = 0; i < path.length; i++) h.setU8(0x0099aa88 + i, path.charCodeAt(i));
console.log(`sprite-hash before lazy-init: 0x${sprHash()}  active~${sprActive()}`);
runI(0x4385d8, "lazy-init(first tick)");
console.log(`sprite-hash after 4385d8: 0x${sprHash()}  active~${sprActive()}  cb8=${h.u8(0x628cb8)} cb9=${h.u8(0x628cb9)}`);
console.log(`  display globals: modeCount[0x5f1290]=${h.u32(0x5f1290)}  modeSet[0x5e910c]=${h.u32(0x5e910c)}  DAT_5f15c4=${h.u32(0x5f15c4)}  DAT_5e9178=${h.u32(0x5e9178)}  (9bb6af needs 0x3f<5f15c4 && 5e9178==0)`);
// re-seed the scenario path (the lazy-init may have overwritten 0x0099aa88)
for (let i = 0; i < path.length; i++) h.setU8(0x0099aa88 + i, path.charCodeAt(i));
runI(0x42f4be, "scenario-load");
console.log(`sprite-hash after 42f4be: 0x${sprHash()}  active~${sprActive()}`);
// Snapshot the sprite array NOW (before the 424e0f test, which would mutate it).
const SLO2 = 0x743b94, SHI2 = 0x743b94 + 5000 * 0x100;
const liveSlots = (buf, base) => { let n = 0; for (let s = 0; s < 5000; s++) { const o = base + s * 0x100; if (buf[o] !== 0 && buf[o] !== 0xff) n++; } return n; };
const interpSnap = b.slice(SLO2, SHI2);
const interpLive = liveSlots(b, SLO2);

// DECISIVE TEST: does the victim 424e0f terminate on this (faithful) state?
console.log("\n=== decisive: FUN_00424e0f on the booted state (was a runaway on JS-booted state) ===");
const t = runI(0x424e0f, "424e0f");
console.log(t.err ? `  RESULT: still fails (${t.err})` : `  RESULT: 424e0f TERMINATED in ${t.steps} steps — state is binary-faithful!`);

// === VERIFY scenario sprites actually populated: compare to the JS boot ===
// The JS boot (createRuntime+runInit) loads sc21.sc4 via FUN_0042f4be and has
// walking peeps. If the interp boot loaded the scenario its sprite array should
// resemble the JS boot's; if it's the empty free-list pool they differ wholesale.
console.log("\n=== scenario-population check (interp boot vs JS boot) ===");
const r2 = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs });
try { r2.runInit(); } catch (e) {}
const b2 = r2.heap.bytes;
const jsLive = liveSlots(b2, SLO2);
let dbytes = 0; for (let i = SLO2; i < SHI2; i++) if (interpSnap[i - SLO2] !== b2[i]) dbytes++;
console.log(`  interp-boot: live-sprite-slots=${interpLive} (snapshotted right after 42f4be)`);
console.log(`  JS-boot:     live-sprite-slots=${jsLive}`);
console.log(`  sprite-array interp-vs-JS byte-diff: ${dbytes} of ${SHI2 - SLO2}`);
console.log(`  => ${interpLive > 100 ? "scenario sprites ARE populated" : "interp pool looks EMPTY — scenario did not commit"}`);
