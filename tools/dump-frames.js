#!/usr/bin/env node
// tools/dump-frames.js — node-side end-to-end render dumper.
//
// Boots the native runtime (no x86 interpreter, no browser), runs runInit()
// + N ticks, and dumps each DDraw surface to a PPM file at two checkpoints
// (early ≈ tick 100 and final ≈ tick N). Lets you visually verify what the
// runtime is actually producing without needing the Chrome MCP / DevTools.
//
// Usage:
//   node tools/dump-frames.js                  # default 1000 ticks
//   TICKS=200 node tools/dump-frames.js        # custom tick depth
//
// Output:
//   /tmp/rct-frame-tick<N>-surface<i>-<w>x<h>.ppm   (one per surface × checkpoint)
//
// PPM is intentionally raw + dependency-free: header `P6\n<w> <h>\n255\n`
// then 3-byte RGB triples. Preview / GIMP / ImageMagick all open it.

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { createRuntime } from "../runtime/harness.js";
import { state } from "../runtime/win32/context.js";
import { postWindowMessage } from "../runtime/win32/user32.js";
import { defaultPalette } from "../harness/csg.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

const WM_PAINT = 0x000F;
const WM_TIMER = 0x0113;

const TICKS = parseInt(process.env.TICKS || "1000", 10);
const EARLY_TICK = Math.min(100, Math.max(1, Math.floor(TICKS / 10)));
const OUT_DIR = "/tmp";

// ---- helpers --------------------------------------------------------------

function chooseEffectivePalette() {
  let palette = state.capturedPalette;
  if (palette) {
    let nonBlack = 0;
    for (let i = 0; i < 256; i++) {
      if (palette[i * 4] || palette[i * 4 + 1] || palette[i * 4 + 2]) nonBlack++;
    }
    if (nonBlack < 32) palette = defaultPalette();
  } else {
    palette = defaultPalette();
  }
  return palette;
}

// Convert a single DDraw surface's 8bpp index buffer into a P6 PPM byte
// blob, plus stats (non-zero pixels, distinct colors).
function surfaceToPPM(heap, surface, palette) {
  const { width, height, pitch, bytes } = surface;
  const headerStr = `P6\n${width} ${height}\n255\n`;
  const header = Buffer.from(headerStr, "ascii");
  const pixelBytes = Buffer.alloc(width * height * 3);
  let nonZero = 0;
  const seen = new Set();
  const src = heap.bytes;
  for (let y = 0; y < height; y++) {
    const srcOff = bytes + y * pitch;
    const dstOff = y * width * 3;
    for (let x = 0; x < width; x++) {
      const idx = src[srcOff + x];
      if (idx !== 0) nonZero++;
      seen.add(idx);
      const p = idx * 4;
      pixelBytes[dstOff + x * 3]     = palette[p];
      pixelBytes[dstOff + x * 3 + 1] = palette[p + 1];
      pixelBytes[dstOff + x * 3 + 2] = palette[p + 2];
    }
  }
  return { buffer: Buffer.concat([header, pixelBytes]), nonZero, distinct: seen.size };
}

function dumpAllSurfaces(heap, label) {
  const palette = chooseEffectivePalette();
  // Stable surface ordering across checkpoints — sort by surface address.
  const surfaces = [...state.ddrawSurfaces.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, s]) => s);
  if (surfaces.length === 0) {
    console.log(`[${label}] no DDraw surfaces present yet`);
    return;
  }
  surfaces.forEach((surf, i) => {
    const { buffer, nonZero, distinct } = surfaceToPPM(heap, surf, palette);
    const path = `${OUT_DIR}/rct-frame-${label}-surface${i}-${surf.width}x${surf.height}.ppm`;
    writeFileSync(path, buffer);
    console.log(`wrote ${path} — ${nonZero} non-zero pixels, ${distinct} colors`);
  });
}

// ---- boot -----------------------------------------------------------------

function loadVfs() {
  const vfs = new Map();
  const vfsRoot = resolve(ROOT, "web/assets");
  for (const f of readdirSync(vfsRoot)) {
    const p = join(vfsRoot, f);
    if (!statSync(p).isFile()) continue;
    vfs.set(f.toLowerCase(), new Uint8Array(readFileSync(p)));
  }
  // Match web/main-native.js placeholders for files referenced but not shipped.
  for (const name of ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"]) {
    if (!vfs.has(name)) vfs.set(name, new Uint8Array(0));
  }
  return vfs;
}

async function main() {
  console.log(`dump-frames: TICKS=${TICKS}, EARLY_TICK=${EARLY_TICK}`);
  const t0 = Date.now();
  const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
  const vfs = loadVfs();
  const runtime = createRuntime({ dataBin, vfs });
  console.log(`runtime ready (${Date.now() - t0}ms): heap=${(runtime.heap.bytes.length / 1e6).toFixed(0)}MB, vfs=${vfs.size}`);

  let initOk = false;
  try {
    runtime.runInit();
    initOk = true;
    console.log(`runInit ok: windows=${state.windows.size}, classes=${state.windowClasses.size}, dibs=${state.dibSections.length}, palette=${!!state.capturedPalette}`);
  } catch (e) {
    console.error(`runInit threw: ${e.message}`);
    if (e.stack) console.error(e.stack.split("\n").slice(0, 6).join("\n"));
  }

  if (!initOk) {
    // Nothing to dump if init failed before any surface was created — try
    // anyway in case partial state exists.
    dumpAllSurfaces(runtime.heap, "init-fail");
    process.exit(1);
  }

  let lastEarlyDumped = false;
  let completed = 0;
  let tickErrors = 0;

  try {
    for (let i = 1; i <= TICKS; i++) {
      // Mimic the rAF driver's message pump cadence so the binary exits its
      // boot wait state. Real WM_TIMER cadence is 16ms; faking once per tick
      // is fine for the renderer's purposes. firstHwnd may not exist until
      // a tick or two has populated it (CreateWindowExA fires inside the
      // binary's own init code), so re-read it each iteration.
      const hwnd = state.firstHwnd || 0;
      if (hwnd) {
        postWindowMessage(hwnd, WM_TIMER, 1, 0);
        if ((i & 1) === 0) postWindowMessage(hwnd, WM_PAINT, 0, 0);
      }
      try {
        runtime.runTick(() => {});
      } catch (e) {
        tickErrors++;
        if (tickErrors <= 3) console.error(`tick #${i} threw: ${(e.message || e).slice(0, 200)}`);
        if (tickErrors >= 20) {
          console.error(`aborting after ${tickErrors} tick errors`);
          break;
        }
      }
      completed = i;
      if (!lastEarlyDumped && i >= EARLY_TICK) {
        dumpAllSurfaces(runtime.heap, `tick${i}`);
        lastEarlyDumped = true;
      }
    }
  } catch (e) {
    // Outer safety net — surface any unexpected throw before still dumping.
    console.error(`fatal during tick loop: ${(e.message || e)}`);
    if (e.stack) console.error(e.stack.split("\n").slice(0, 6).join("\n"));
  }

  // Final checkpoint (always attempted, even if tick loop blew up).
  if (!lastEarlyDumped) dumpAllSurfaces(runtime.heap, `tick${completed}-early`);
  dumpAllSurfaces(runtime.heap, `tick${completed}`);

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`done: ${completed}/${TICKS} ticks, ${tickErrors} errors, ${elapsed}s elapsed`);
}

main().catch((e) => {
  console.error(`[fatal] ${e.message}`);
  if (e.stack) console.error(e.stack.split("\n").slice(0, 8).join("\n"));
  process.exit(1);
});
