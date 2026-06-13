// Gold-standard interpreter diff for the 421d2c fallback-recursion fix.
//
// Runs the SAME free-running boot to the same frame index in two modes and
// byte-diffs the 640x480 GAME-BACK surface AT A HITCH FRAME:
//   MODE=js     : the JS-port chain (with the recursion fix applied on disk)
//   MODE=interp : every painter eip-hook CLEARED — the binary's own painters
//                 draw the frame through the x86 interpreter (ground truth).
// The interpreter is correct by construction (it runs rct.exe's real bytes).
// A matching surface at the hitch frame proves the JS fix renders what the
// binary renders on that frame — i.e. the recursion was producing WRONG pixels
// and the fix is MORE correct, not merely different.
//
// Usage: MODE=interp node tools/_oracle-421hitch-interp.mjs   (writes /tmp ref)
//        MODE=js     node tools/_oracle-421hitch-interp.mjs   (diffs vs ref)
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const R = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MODE = process.env.MODE || 'js';
const HITCH_AT = parseInt(process.env.HITCH_AT || '29', 10); // free-run frame index that hitches
const REF = '/tmp/_421hitch_interp_ref.bin';
let cnt = 0;
globalThis._renderTrace = (n) => { if (n === 'FUN_extra_paint_421d2c') cnt++; };
globalThis._gotoWarn = () => {};
const ow = console.warn; console.warn = (...a) => { const s = String(a[0] ?? ''); if (/^\[/.test(s)) return; ow(...a); };
const { createRuntime, skipFadeIn, skipTitleIntro } = await import(R + '/runtime/harness.js');
const { state } = await import(R + '/runtime/win32/context.js');
const { clearEipHook } = await import(R + '/harness/x86.js');
const PAINTER_HOOKS = [
  0x421d2c, 0x431bc8, 0x431d4b, 0x431edc, 0x43206f,
  0x4368d8, 0x4368e0, 0x4368ec, 0x4368ff,
  0x420d9c, 0x420f4c, 0x420502, 0x42094b,
  0x444e08, 0x5ce7f8, 0x4238b4, 0x5dff38,
  0x432214, 0x4323b8, 0x43256d, 0x432727,
  0x432ea0, 0x43300a, 0x433180, 0x4332f8,
];
const vfs = new Map(); const A = R + '/web/assets';
for (const f of readdirSync(A)) { const p = join(A, f); if (statSync(p).isFile()) vfs.set(f.toLowerCase(), new Uint8Array(readFileSync(p))); }
for (const n of ['css10.dat', 'css12.dat', 'css16.dat', 'tutl.dat']) if (!vfs.has(n)) vfs.set(n, new Uint8Array(0));
const r = createRuntime({ dataBin: readFileSync(R + '/decompiled/data.bin'), vfs });
globalThis.__painterStepLimit = 12_000_000;
const clearHooks = () => { if (MODE === 'interp') for (const a of PAINTER_HOOKS) clearEipHook(a >>> 0); };
clearHooks();
r.runInit(); r.runTick(() => {}); skipFadeIn(r.heap); skipTitleIntro(r.heap); clearHooks(); r.runTick(() => {});
clearHooks();
const h = r.heap;
const W = 640, H = 480, N = W * H;
let cands = [];
for (const [, s] of state.ddrawSurfaces || []) if (s.width === W && s.height === H && typeof s.bytes === 'number') cands.push(s.bytes);
const surf = Math.max(...cands);
for (let i = 0; i < 3; i++) { clearHooks(); r.runTick(() => {}); }
// free-run to the hitch frame
let hitchFires = 0;
for (let f = 0; f <= HITCH_AT; f++) { clearHooks(); cnt = 0; r.runTick(() => {}); if (f === HITCH_AT) hitchFires = cnt; }
const raw = Buffer.alloc(N);
for (let i = 0; i < N; i++) raw[i] = h.u8(surf + i);
let fnv = 0x811c9dc5 >>> 0; for (let i = 0; i < N; i++) { fnv ^= raw[i]; fnv = Math.imul(fnv, 0x01000193) >>> 0; }
console.log(`MODE=${MODE} hitchFrame=${HITCH_AT} 421fires=${hitchFires} surfaceFNV=0x${fnv.toString(16).padStart(8,'0')}`);
if (MODE === 'interp') { writeFileSync(REF, raw); console.log(`wrote ref ${REF}`); }
else {
  try {
    const ref = readFileSync(REF);
    let diff = 0; for (let i = 0; i < N; i++) if (raw[i] !== ref[i]) diff++;
    console.log(`diff JS-vs-INTERP at hitch frame: ${diff}/${N} px (${(100*(1-diff/N)).toFixed(2)}% match)`);
  } catch { console.log('no ref — run MODE=interp first'); }
}
