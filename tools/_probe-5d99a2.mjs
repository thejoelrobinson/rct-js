// Phase-1 scope probe for 0x5d99a2 (sprite-update vtable PTR_LAB_005d97b4 slot 1).
// Hooks the entry, steps the real bytes to the top-level ret while recording:
//   - dh at entry ((edx>>8)&0xff = [esi+0x51] sub-state)
//   - which path landmarks each call crosses
//   - per-call step count (including callee steps; hooked callees count 1)
// Pattern: _probe-rot.mjs boot + the installJsFnEipHook stepThroughNative loop.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
let _t = 1700000000000; Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};
const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../runtime/harness.js");
const { setEipHook, getEipHook, clearEipHook, step } = await import("../harness/x86.js");
const VFS_FILES = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of VFS_FILES) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));
const r = createRuntime({ dataBin: readFileSync(resolve(ROOT, "decompiled/data.bin")), vfs, exeBytes: readFileSync(resolve(ROOT, "binary/rct.exe")) });
try { r.runInit(); } catch {}
try { r.runTick(); } catch {}
skipFadeIn(r.heap); enterScenarioPlay(r.heap);
const heap = r.heap;

const ADDR = 0x5d99a2;
// Landmark EIPs (labels for the control-flow map):
const LANDMARKS = new Map([
  [0x5d99b7, "dh0:call5d89c0"],
  [0x5d99c2, "dh0:cfClear(post5d89c0)"],
  [0x5d99e8, "dh0:claimSlot"],
  [0x5d9a0a, "dh1:entry"],
  [0x5d9a34, "dh1:carSumLoop"],
  [0x5d9ba2, "dh1:setBit4"],
  [0x5d9ba7, "dh1:fullCheck"],
  [0x5d9bd8, "dh1:departGate"],
  [0x5d9c09, "dh1:abortToState6"],
  [0x5d9c27, "dh1:shape32Check"],
  [0x5d9c47, "dh1:depart(sub2)"],
  [0x5d9c5c, "else:call5d88ec"],
  [0x5d9c67, "else:cfClear(post5d88ec)"],
  [0x5db5d7, "call:5db5d7"],
  [0x5db333, "tail:5db333(5e53ca)"],
  [0x5db338, "tail:ret5db338"],
]);
const dhCounts = new Map();
const pathCounts = new Map();
const stepHist = new Map(); // bucketed
const stepsByDh = new Map();
let calls = 0, maxSteps = 0;
const perCallSteps = [];

const prevHook = getEipHook(ADDR);
setEipHook(ADDR, (c) => {
  calls++;
  const dh = (c.regs.edx >>> 8) & 0xff;
  dhCounts.set(dh, (dhCounts.get(dh) || 0) + 1);
  const espEntry = c.regs.esp >>> 0;
  const hit = [];
  const self = getEipHook(ADDR);
  clearEipHook(ADDR);
  c.regs.eip = ADDR >>> 0;
  let n = 0;
  const limit = 5_000_000;
  try {
    while (!((c.regs.esp >>> 0) === espEntry && (c.regs.eip >>> 0) < heap.bytes.length
             && (heap.u8(c.regs.eip >>> 0) === 0xc3 || heap.u8(c.regs.eip >>> 0) === 0xc2))) {
      const lm = LANDMARKS.get(c.regs.eip >>> 0);
      if (lm && (hit.length === 0 || hit[hit.length - 1] !== lm)) hit.push(lm);
      if (!step(c) || ++n > limit) break;
    }
  } finally { setEipHook(ADDR, self); }
  perCallSteps.push(n);
  if (n > maxSteps) maxSteps = n;
  const sb = stepsByDh.get(dh) || { total: 0, n: 0, max: 0, min: Infinity };
  sb.total += n; sb.n++; if (n > sb.max) sb.max = n; if (n < sb.min) sb.min = n;
  stepsByDh.set(dh, sb);
  const key = `dh=${dh} | ` + hit.join(" > ");
  pathCounts.set(key, (pathCounts.get(key) || 0) + 1);
  const bucket = n <= 20 ? "0-20" : n <= 50 ? "21-50" : n <= 100 ? "51-100" : n <= 200 ? "101-200" : n <= 500 ? "201-500" : ">500";
  stepHist.set(bucket, (stepHist.get(bucket) || 0) + 1);
});

const TICKS = parseInt(process.env.TICKS || "30", 10);
for (let i = 0; i < TICKS; i++) { try { r.runTick(); } catch (e) { console.log(`tick ${i} threw: ${(e.message||e).toString().slice(0,80)}`); } }
if (prevHook) setEipHook(ADDR, prevHook); else clearEipHook(ADDR);

console.log(`\n=== 0x5d99a2 probe: ${TICKS} ticks, ${calls} calls ===`);
console.log("dh distribution:", [...dhCounts.entries()].sort((a,b)=>a[0]-b[0]).map(([k,v])=>`dh=${k}:${v}`).join("  "));
console.log("\nsteps by dh:");
for (const [dh, s] of [...stepsByDh.entries()].sort((a,b)=>a[0]-b[0]))
  console.log(`  dh=${dh}: n=${s.n} avg=${(s.total/s.n).toFixed(1)} min=${s.min} max=${s.max} total=${s.total}`);
console.log("\nstep histogram:", [...stepHist.entries()].map(([k,v])=>`${k}:${v}`).join("  "));
console.log(`max steps in one call: ${maxSteps}`);
console.log("\npath signatures:");
for (const [k, v] of [...pathCounts.entries()].sort((a,b)=>b[1]-a[1])) console.log(`  ${v}x  ${k}`);
