// Boot the FULL hybrid runtime (same as tools/_soakhash.mjs), enter scenario
// play, run TICKS ticks, then dump the live game surface to a real PNG.
import { readFileSync, writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";
const ROOT = "/Users/joelrobinson/rct-js";
let _t = 1700000000000; Date.now = () => ++_t;
if (typeof performance !== "undefined") performance.now = () => Date.now() - 1700000000000;
globalThis._renderTrace = () => {};
const { createRuntime, skipFadeIn, enterScenarioPlay } = await import(ROOT + "/runtime/harness.js");
const { state } = await import(ROOT + "/runtime/win32/context.js");
const { defaultPalette } = await import(ROOT + "/harness/csg.js");
const VFS = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat","css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat","css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
const vfs = new Map();
for (const n of VFS) { try { vfs.set(n.toLowerCase(), readFileSync(ROOT + "/web/assets/" + n)); } catch {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n.toLowerCase(), new Uint8Array(0));
const r = createRuntime({ dataBin: readFileSync(ROOT + "/decompiled/data.bin"), vfs, exeBytes: readFileSync(ROOT + "/binary/rct.exe") });
const heap = r.heap;
try { r.runInit(); } catch (e) { console.log("init:", e.message); }
try { r.runTick(); } catch {}
skipFadeIn(heap); enterScenarioPlay(heap);
const TICKS = parseInt(process.env.TICKS || "40", 10);
const t0 = Date.now();
for (let i = 0; i < TICKS; i++) { try { r.runTick(); } catch (e) { console.log(`tick ${i}: ${e.message.slice(0,60)}`); } }

// pick the densest large surface, exactly like runtime/canvas.js presentFrame
let best = null, bestNz = 0;
for (const s of state.ddrawSurfaces.values()) {
  if (s.width < 320 || s.height < 240) continue;
  let nz = 0; const sz = s.width * s.height, st = Math.max(1, sz >> 8);
  for (let i = 0; i < sz; i += st) if (heap.bytes[s.bytes + i] !== 0) nz++;
  if (nz > bestNz || (best === null && s.isPrimary)) { bestNz = nz; best = s; }
}
if (!best) { console.log("NO SURFACE"); process.exit(1); }
let pal = state.capturedPalette;
let nb = 0; if (pal) for (let i = 0; i < 256; i++) if (pal[i*4]||pal[i*4+1]||pal[i*4+2]) nb++;
const src = (!pal || nb < 32) ? "defaultPalette" : "capturedPalette";
if (!pal || nb < 32) pal = defaultPalette();
console.log(`palette source=${src} nonBlackEntries=${nb} captured=${!!state.capturedPalette}`);
const dp = defaultPalette();
let diff = 0; for (let i = 0; i < 1024; i++) if (dp[i] !== pal[i]) diff++;
console.log(`bytes differing from defaultPalette: ${diff}/1024`);
for (const i of [1, 2, 10, 20, 32, 64, 100, 150]) console.log(`  idx ${i}: rgb(${pal[i*4]},${pal[i*4+1]},${pal[i*4+2]})`);
const W = best.width, H = best.height;
// count distinct palette indices actually used (content sanity)
const used = new Set();
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) used.add(heap.bytes[best.bytes + y*best.pitch + x]);
// RGBA rows with PNG filter byte 0
const raw = Buffer.alloc(H * (W * 4 + 1));
let o = 0;
for (let y = 0; y < H; y++) {
  raw[o++] = 0;
  for (let x = 0; x < W; x++) {
    const idx = heap.bytes[best.bytes + y * best.pitch + x] * 4;
    raw[o++] = pal[idx]; raw[o++] = pal[idx+1]; raw[o++] = pal[idx+2]; raw[o++] = 255;
  }
}
const crcTable = (() => { const t = new Int32Array(256); for (let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;t[n]=c;} return t; })();
const crc = (buf) => { let c = -1; for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ -1) >>> 0; };
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const cr = Buffer.alloc(4); cr.writeUInt32BE(crc(td));
  return Buffer.concat([len, td, cr]);
};
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
const png = Buffer.concat([
  Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]),
  chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0)),
]);
const out = process.env.OUT || "/tmp/rct-live.png";
writeFileSync(out, png);
console.log(`ticks=${TICKS} in ${Date.now()-t0}ms | surface ${W}x${H} pitch=${best.pitch} | distinct palette indices used=${used.size} | wrote ${out}`);
