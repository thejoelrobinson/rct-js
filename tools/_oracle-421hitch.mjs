// Interpreter-diff / neutrality oracle for the 421d2c fallback-recursion fix.
//
// ROOT CAUSE (this session): on certain frames the per-tile painter dispatch
// reaches a corrupt tile-element pointer (esi=0x6f0020, garbage). paintBody421d2c
// fails on it and the install421d2cHook fallback calls runBodyFrom(0x421d2c) —
// which goes through runFunction(cpu, 0x421d2c), and since 0x421d2c carries an
// eip-hook, runFunction RE-DISPATCHES THE SAME HOOK (x86.js:2977 fast path).
// That re-enters paintBody421d2c, fails again, recurses ~1500-3700 levels deep —
// the "~5-6s repaint hitch". It is a BUG (recursion), not the binary's periodic
// full repaint. The fix: clear the eip-hook before the fallback runFunction so
// the interpreter decodes the REAL 0x421d2c bytes once (correct binary
// behaviour), then reinstall — exactly the callHelperDirect pattern already in
// this file. Behaviour-preserving: normal tiles return handled=true and never
// reach the fallback; only the garbage tile changes (one interp run vs a
// recursion explosion producing the same pixels).
//
// GATE: hash the 640x480 GAME-BACK surface at every frame through a window that
// INCLUDES hitch frames. Compare two modes by hashing each frame:
//   BEFORE = current code (recursion), AFTER = patched code.
// A neutral fix => identical per-frame hash sequence AND identical fire counts
// for non-hitch frames. Plus: total 421d2c fires on hitch frames drops from
// ~thousands to ~954 (no more recursion).
//
// Usage: node tools/_oracle-421hitch.mjs   (run on BEFORE tree and AFTER tree;
//        compare the printed hash sequence + the hitch-fire summary).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const R = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let cnt = 0;
globalThis._renderTrace = (n) => { if (n === 'FUN_extra_paint_421d2c') cnt++; };
globalThis._gotoWarn = () => {};
const ow = console.warn; console.warn = (...a) => { const s = String(a[0] ?? ''); if (/^\[/.test(s)) return; ow(...a); };
const { createRuntime, skipFadeIn, skipTitleIntro } = await import(R + '/runtime/harness.js');
const { state } = await import(R + '/runtime/win32/context.js');
const vfs = new Map(); const A = R + '/web/assets';
for (const f of readdirSync(A)) { const p = join(A, f); if (statSync(p).isFile()) vfs.set(f.toLowerCase(), new Uint8Array(readFileSync(p))); }
for (const n of ['css10.dat', 'css12.dat', 'css16.dat', 'tutl.dat']) if (!vfs.has(n)) vfs.set(n, new Uint8Array(0));
const r = createRuntime({ dataBin: readFileSync(R + '/decompiled/data.bin'), vfs });
globalThis.__painterStepLimit = 12_000_000;
r.runInit(); r.runTick(() => {}); skipFadeIn(r.heap); skipTitleIntro(r.heap); r.runTick(() => {});
const h = r.heap;
// locate the 640x480 GAME-BACK surface
const W = 640, H = 480, N = W * H;
let cands = [];
for (const [, s] of state.ddrawSurfaces || []) if (s.width === W && s.height === H && typeof s.bytes === 'number') cands.push(s.bytes);
const surf = Math.max(...cands);
function fnv() { let x = 0x811c9dc5 >>> 0; for (let i = 0; i < N; i++) { x ^= h.u8(surf + i); x = Math.imul(x, 0x01000193) >>> 0; } return x >>> 0; }
for (let i = 0; i < 3; i++) r.runTick(() => {});
const hashes = []; const hitchFires = [];
const FRAMES = parseInt(process.env.FRAMES || '60', 10);
for (let f = 0; f < FRAMES; f++) {
  cnt = 0; r.runTick(() => {}); const fires = cnt;
  const hsh = fnv();
  hashes.push(hsh);
  if (fires > 2000) hitchFires.push({ f, fires });
}
// summary line: digest of all per-frame hashes (so two runs compare in one glance)
let digest = 0x811c9dc5 >>> 0;
for (const x of hashes) { for (let k = 0; k < 4; k++) { digest ^= (x >>> (k * 8)) & 0xff; digest = Math.imul(digest, 0x01000193) >>> 0; } }
console.log(`FRAMES=${FRAMES} surfaceHashDigest=0x${digest.toString(16).padStart(8,'0')}`);
console.log(`hitchFrames(>2000 fires)=${hitchFires.length}: ${hitchFires.map(x => `f${x.f}:${x.fires}`).join(' ')}`);
console.log(`perFrameHashes(first8)=${hashes.slice(0,8).map(x=>'0x'+x.toString(16)).join(' ')}`);
