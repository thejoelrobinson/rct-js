#!/usr/bin/env node
// Capture full entry-state scenarios for a set of functions during a real
// gameplay run, so they can be replayed into the x86 interpreter for
// byte-equality (tools/diff-lockstep.js).
//
// This fixes the brittleness of diff-subsystem.js (which only snapshotted
// Ghidra-annotated globals): we snapshot the FULL memory state at each
// target function's entry as a set of pages that differ from a reference
// image (data.bin below its length, zero above). Robust to writes from
// either the ported JS (heap.setU*) or the interpreter (cpu writes), since
// it reads final memory bytes.
//
// Boot uses the gameplay path (skipFadeIn + skipTitleIntro) with a painter
// step cap so ticks return (capped painters render wrong, but their ENTRY
// state — which is what we capture — is real). Targets that fire on the
// gameplay path (the _paintShim painters, WndProc callbacks, indirect
// calls) go through state.fnDispatch and so are wrappable. Direct ESM-import
// calls between ported fns bypass dispatch and are NOT capturable here — but
// the CHUNK 0.3 painter targets all run via _paintShim, so that's fine.
//
// Usage:
//   node tools/capture-lockstep.js --subsystem=render-ingame [--ticks=2] [--cap=8] [--limit=300000] [--out=test/fixtures/lockstep/render-ingame.json]
//   node tools/capture-lockstep.js --addr=0x44e719,0x5d7503 --cap=8

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

const HEAP_LEN = 0x4ac4000;     // runtime heap byte length = painter-bridge STACK_TOP
const PAGE = 0x1000;
const DATA_BIN_LEN = 0x9c4000;  // bytes from data.bin; pages above this are zero in the reference

// --- args ---
let subsystem = null, addrList = null, ticks = 2, cap = 8, stepLimit = 300000, outPath = null;
for (const a of process.argv.slice(2)) {
  if (a.startsWith("--subsystem=")) subsystem = a.slice(12);
  else if (a.startsWith("--addr=")) addrList = a.slice(7).split(",").map((s) => parseInt(s, 16));
  else if (a.startsWith("--ticks=")) ticks = parseInt(a.slice(8), 10);
  else if (a.startsWith("--cap=")) cap = parseInt(a.slice(6), 10);
  else if (a.startsWith("--limit=")) stepLimit = parseInt(a.slice(8), 10);
  else if (a.startsWith("--out=")) outPath = a.slice(6);
}
if (!subsystem && !addrList) { console.error("need --subsystem=<name> or --addr=0x..,0x.."); process.exit(1); }

let targets;
if (addrList) targets = addrList.map((a) => a >>> 0);
else {
  const subs = JSON.parse(readFileSync(resolve(ROOT, "tools/subsystems.json"), "utf8"));
  const rec = subs.subsystems[subsystem];
  if (!rec) { console.error(`unknown subsystem ${subsystem}`); process.exit(1); }
  targets = rec.functions.map((h) => parseInt(h, 16) >>> 0);
}
const targetSet = new Set(targets);
outPath = outPath || `test/fixtures/lockstep/${subsystem || "adhoc"}.json`;

// --- determinism + painter cap (must precede imports) ---
let _t = 1700000000000;
Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};
globalThis.__painterStepLimit = stepLimit;

const { createRuntime, skipFadeIn, skipTitleIntro } = await import("../runtime/harness.js");
const { state } = await import("../runtime/win32/context.js");
const { regs } = await import("../runtime/regs.js");

const VFS_FILES = [
  "csg1.dat", "csg1i.dat", "game.cfg", "kanji.dat", "tutorial.dat", "mp.dat",
  "css1.dat", "css2.dat", "css3.dat", "css4.dat", "css5.dat", "css6.dat",
  "css7.dat", "css8.dat", "css9.dat", "css11.dat", "css13.dat", "css14.dat",
  "css15.dat", "css17.dat", "sc21.sc4",
];
const vfs = new Map();
for (const n of VFS_FILES) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch {} }
for (const n of ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));

// Reference page hashes: data.bin content below DATA_BIN_LEN, zero above.
// A page matching its reference hash is omitted from the scenario (the
// interpreter image already has data.bin + zeros, so we only ship deltas).
const refHash = new Map();
function fnv1aBytes(bytes, off, len) {
  let h = 0x811c9dc5 >>> 0;
  for (let i = 0; i < len; i++) { h ^= bytes[off + i]; h = Math.imul(h, 0x01000193) >>> 0; }
  return h >>> 0;
}
{
  const nPages = Math.ceil(HEAP_LEN / PAGE);
  const zeroHash = fnv1aBytes(new Uint8Array(PAGE), 0, PAGE);
  for (let p = 0; p < nPages; p++) {
    const base = p * PAGE;
    if (base >= DATA_BIN_LEN) { refHash.set(p, zeroHash); continue; }
    const len = Math.min(PAGE, dataBin.length - base);
    let h = fnv1aBytes(dataBin, base, len);
    if (len < PAGE) { // tail page partially zero
      for (let i = len; i < PAGE; i++) { h ^= 0; h = Math.imul(h, 0x01000193) >>> 0; }
    }
    refHash.set(p, h >>> 0);
  }
}

console.error(`[capture] booting gameplay path (painter cap=${stepLimit}); ${targets.length} target fns...`);
const r = createRuntime({ dataBin, vfs });
const heap = r.heap;
const mem = heap.bytes;
try { r.runInit(); } catch (e) { console.error("runInit:", e.message); }
try { r.runTick(); } catch (e) { console.error("warmup:", e.message); }
skipFadeIn(heap);
skipTitleIntro(heap);

// Shared page pool: hash -> base64 bytes. Scenarios reference pages by hash.
const pagePool = new Map();
const scenarios = [];          // { addr, regs, pages:[{page, hash}] }
const perAddrCount = new Map();
const seenScenario = new Set(); // dedup key

function snapshotDirtyPages() {
  const pages = [];
  const nPages = Math.ceil(HEAP_LEN / PAGE);
  for (let p = 0; p < nPages; p++) {
    const base = p * PAGE;
    if (base + PAGE > mem.length) break;
    const h = fnv1aBytes(mem, base, PAGE);
    if (h === refHash.get(p)) continue; // unchanged from reference
    pages.push({ page: p, hash: h });
    if (!pagePool.has(h)) {
      pagePool.set(h, Buffer.from(mem.subarray(base, base + PAGE)).toString("base64"));
    }
  }
  return pages;
}

// Wrap target fnDispatch entries. Capture on ENTRY (before the call mutates).
// Once every present target has hit its cap we throw _captureDone to unwind
// the (otherwise minutes-long) gameplay tick immediately — we only need the
// entry-states, not the rest of the frame.
const presentTargets = targets.filter((a) => state.fnDispatch.has(a));
const active = presentTargets.length;
class CaptureDone extends Error {}
function allCapped() {
  for (const a of presentTargets) if ((perAddrCount.get(a) || 0) < cap) return false;
  return true;
}
for (const addr of targets) {
  const fn = state.fnDispatch.get(addr);
  if (typeof fn !== "function") continue;
  state.fnDispatch.set(addr, function (...args) {
    if ((perAddrCount.get(addr) || 0) < cap) {
      const rsnap = { eax: regs.eax >>> 0, ebx: regs.ebx >>> 0, ecx: regs.ecx >>> 0, edx: regs.edx >>> 0,
                      esi: regs.esi >>> 0, edi: regs.edi >>> 0, ebp: regs.ebp >>> 0 };
      const pages = snapshotDirtyPages();
      const key = `${addr}|${Object.values(rsnap).join(",")}|${pages.length}|${pages.reduce((a, p) => (a ^ p.hash) >>> 0, 0)}`;
      if (!seenScenario.has(key)) {
        seenScenario.add(key);
        scenarios.push({ addr: `0x${addr.toString(16)}`, regs: rsnap, pages });
        perAddrCount.set(addr, (perAddrCount.get(addr) || 0) + 1);
        if (allCapped()) throw new CaptureDone();
      }
    }
    return fn.apply(this, args);
  });
}
console.error(`[capture] wrapped ${active} target fns present in dispatch; running up to ${ticks} tick(s) (early-exit when caps met)...`);

for (let i = 0; i < ticks; i++) {
  try { r.runTick(); }
  catch (e) {
    if (e instanceof CaptureDone) { console.error(`[capture] caps met on tick ${i}; unwound early.`); break; }
    console.error(`tick ${i}:`, e.message);
  }
  if (allCapped()) break;
}

console.error(`[capture] loop done; ${scenarios.length} scenarios, ${pagePool.size} pages in pool — serializing...`);
mkdirSync(resolve(ROOT, dirname(outPath)), { recursive: true });
const out = {
  meta: {
    subsystem: subsystem || null, ticks, cap, stepLimit,
    heapLen: HEAP_LEN, pageSize: PAGE, dataBinLen: DATA_BIN_LEN,
    stackTop: HEAP_LEN, memSize: HEAP_LEN,
    targets: targets.map((a) => `0x${a.toString(16)}`),
  },
  pagePool: Object.fromEntries(pagePool),
  scenarios,
};
writeFileSync(resolve(ROOT, outPath), JSON.stringify(out));
const byAddr = {};
for (const s of scenarios) byAddr[s.addr] = (byAddr[s.addr] || 0) + 1;
console.error(`[capture] wrote ${scenarios.length} scenarios (${pagePool.size} distinct pages) to ${outPath}`);
console.error(`[capture] per-addr: ${Object.entries(byAddr).map(([a, n]) => `${a}:${n}`).join("  ") || "(none captured — targets may not fire on gameplay path)"}`);
