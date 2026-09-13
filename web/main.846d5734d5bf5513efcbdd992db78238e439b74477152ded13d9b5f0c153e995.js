// Browser entry point. Fetches rct.exe + csg1.dat + csg1i.dat, sets up the
// interpreter, runs in time-sliced chunks via requestAnimationFrame, and
// blits the binary's render buffer at [0x981efc] onto a canvas.

import { loadPEFromBytes } from "../harness/loader.js";
import { makeCpu, step, setShimInvoker } from "../harness/x86.js";
import { wireImports } from "../harness/imports.js";
import {
  bindShims, invokeShim, isShim, getShim, initHeap, setVfs, getDDrawObj,
  getCapturedPalette, getPaletteSnapshotCount, getLatestDib, readStaticPalette,
  getFirstHwnd, postWindowMessage, getMessageQueueDepth,
} from "../harness/shims.js";
import { loadCsg, decodeSprite, defaultPalette, spriteToRGBA } from "../harness/csg.js";
import { lifted } from "../generated/development-loader.js";
import { setLiftedTable } from "../lifter/runtime.js";

const log = document.getElementById("log");
const statusEl = document.getElementById("status");
const screenCanvas = document.getElementById("screen");
const screenCtx = screenCanvas.getContext("2d");
const spriteCanvas = document.getElementById("sprite");
const spriteCtx = spriteCanvas.getContext("2d");

function logLine(s, cls = "") { log.innerHTML += `<span class="${cls}">${s}</span>\n`; log.scrollTop = log.scrollHeight; }
function status(s) { statusEl.textContent = s; }

async function fetchBytes(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`fetch ${url}: ${r.status}`);
  return new Uint8Array(await r.arrayBuffer());
}

async function main() {
  status("Fetching rct.exe…");
  const exe = await fetchBytes("./assets/rct.exe");
  logLine(`fetched rct.exe (${(exe.length/1e6).toFixed(2)} MB)`, "lk");

  status("Fetching csg1.dat…");
  const csg1Bytes  = await fetchBytes("./assets/csg1.dat");
  const csg1iBytes = await fetchBytes("./assets/csg1i.dat");
  logLine(`fetched csg1.dat (${(csg1Bytes.length/1e6).toFixed(1)} MB), csg1i.dat (${(csg1iBytes.length/1e3).toFixed(0)} KB)`, "lk");

  // Demo: decode one recognisable sprite (palm tree #25000) to confirm the
  // sprite pipeline works in browser.
  const csg = loadCsg(csg1Bytes, csg1iBytes);
  logLine(`csg1 has ${csg.indexCount} sprites`, "ev");
  const palmTree = decodeSprite(csg, 25000);
  if (palmTree) {
    const rgba = spriteToRGBA(palmTree, defaultPalette());
    spriteCanvas.width = palmTree.width;
    spriteCanvas.height = palmTree.height;
    spriteCanvas.style.width = (palmTree.width * 3) + "px";
    spriteCanvas.style.height = (palmTree.height * 3) + "px";
    const img = new ImageData(rgba, palmTree.width, palmTree.height);
    spriteCtx.putImageData(img, 0, 0);
    document.getElementById("spriteInfo").textContent = `sprite #25000 — ${palmTree.width}×${palmTree.height} px (palm tree)`;
  }

  status("Loading PE…");
  const image = loadPEFromBytes(exe);
  logLine(`loaded PE: imageBase=0x${image.imageBase.toString(16)}, sizeOfImage=0x${image.sizeOfImage.toString(16)}`, "lk");

  // Allocate memory: image + 1MB stack + 64MB heap.
  const STACK_SIZE = 0x100000;
  const HEAP_SIZE  = 64 * 1024 * 1024;
  const memory = new Uint8Array(image.totalSize + STACK_SIZE + HEAP_SIZE);
  memory.set(image.memory, 0);

  status("Wiring Win32 imports…");
  const { iatEntries } = wireImports(memory, image);
  bindShims(iatEntries);
  setShimInvoker(invokeShim);
  logLine(`wired ${iatEntries.length} IAT entries`, "lk");

  initHeap(image.totalSize + STACK_SIZE, image.totalSize + STACK_SIZE + HEAP_SIZE);

  // Populate VFS so CreateFileA/ReadFile actually return data.
  // Fetch all files in the manifest in parallel.
  const VFS_FILES = [
    "csg1.dat", "csg1i.dat",
    "css1.dat", "css2.dat", "css3.dat", "css4.dat", "css5.dat",
    "css6.dat", "css7.dat", "css8.dat", "css9.dat",
    "css11.dat", "css13.dat", "css14.dat", "css15.dat", "css17.dat",
    "tutorial.dat", "kanji.dat", "mp.dat",
    "game.cfg",
  ];
  status("Fetching game data files…");
  const vfsEntries = await Promise.all(VFS_FILES.map(async name => {
    try {
      const r = await fetch(`./assets/${name}`);
      if (!r.ok) return null;
      return [name, new Uint8Array(await r.arrayBuffer())];
    } catch { return null; }
  }));
  const vfs = {};
  for (const e of vfsEntries) if (e) vfs[e[0]] = e[1];
  setVfs(vfs);
  logLine(`mounted VFS with ${Object.keys(vfs).length} files`, "lk");

  // Set up CPU and entry state.
  const cpu = makeCpu(memory);
  const stackTop = image.totalSize + STACK_SIZE;
  const RET_SENTINEL = 0xdeadbeef >>> 0;
  cpu.regs.esp = (stackTop - 4) >>> 0;
  memory[cpu.regs.esp]     =  RET_SENTINEL        & 0xff;
  memory[cpu.regs.esp + 1] = (RET_SENTINEL >>> 8) & 0xff;
  memory[cpu.regs.esp + 2] = (RET_SENTINEL >>> 16)& 0xff;
  memory[cpu.regs.esp + 3] = (RET_SENTINEL >>> 24)& 0xff;
  cpu.regs.eip = 0x00401000 >>> 0;

  // Patch + drop lifted version of FUN_0042ef8a (first-run wizard) and
  // FUN_005df472 (Throw helper) — see node-side run.js for analysis.
  memory[0x42ef8a] = 0xc3;
  memory[0x5df472] = 0xc3;
  const liftedFiltered = { ...lifted };
  delete liftedFiltered[0x42ef8a];
  delete liftedFiltered[0x5df472];
  // Lifter has a class of bugs around the 0x66 (operand-size) prefix:
  // register-form ops were lifted as 32-bit (e.g. DEC EDI instead of DEC DI),
  // and EAX-immediate forms read 4 bytes instead of 2 — corrupting subsequent
  // instruction boundaries. Drop any lifted fn containing a 0x66 byte from its
  // entry through the next ~1KB; the interpreter handles 0x66 correctly.
  console.log("[main.js v=4] entering droppedCount loop");
  logLine(`scanning lifted fns for 0x66 lifter bug…`, "ev");
  let droppedCount = 0;
  for (const addrStr of Object.keys({ ...liftedFiltered })) {
    const addr = Number(addrStr);
    for (let i = addr; i < addr + 1024 && i < memory.length; i++) {
      if (memory[i] === 0x66) { delete liftedFiltered[addrStr]; droppedCount++; break; }
    }
  }
  setLiftedTable(liftedFiltered);
  logLine(`dropped ${droppedCount} lifted fns with 0x66-prefix lifter bug; interpreter takes over`, "ev");

  // Pre-wire IDirectDraw* global.
  const ddrawObj = getDDrawObj(cpu);
  const writeU32 = (addr, value) => {
    memory[addr]     =  value        & 0xff;
    memory[addr + 1] = (value >>> 8) & 0xff;
    memory[addr + 2] = (value >>> 16)& 0xff;
    memory[addr + 3] = (value >>> 24)& 0xff;
  };
  writeU32(0x5ebf30, ddrawObj);
  writeU32(0x5ebf2c, 0xE0010000);
  logLine(`pre-wired IDirectDraw* at [0x5ebf30] = 0x${ddrawObj.toString(16)}`, "ev");

  status("Booting binary…");
  logLine("--- starting interpreter loop ---", "ev");

  const seenShims = new Set();
  let stepCount = 0;
  const startTime = performance.now();

  // Run interpreter in chunks of ~500K steps per animation frame so the UI
  // thread doesn't lock. After each chunk, blit the render buffer to canvas.
  const CHUNK_SIZE = 500_000;
  const RENDER_BUF_BASE = 0x981efc;
  const RENDER_BUF_LEN  = 0x8000;
  const palette = defaultPalette();

  // Render BOTH buffers: the procedural title scratchpad (which gets sprite
  // blits during the early loop) and the latest DIB section (where the binary
  // will eventually write its main render once the message pump drives it past
  // the title scratchpad).
  const dibCanvas = document.getElementById("dib");
  const dibCtx = dibCanvas.getContext("2d");

  function blitFrom(canvas, ctx, addr, w, h, stride, pal) {
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    const rgba = new Uint8ClampedArray(w * h * 4);
    for (let y = 0; y < h; y++) {
      const srcRow = addr + y * stride;
      const dstRow = y * w * 4;
      for (let x = 0; x < w; x++) {
        const p = memory[srcRow + x];
        rgba[dstRow + x*4]     = pal[p*4];
        rgba[dstRow + x*4 + 1] = pal[p*4 + 1];
        rgba[dstRow + x*4 + 2] = pal[p*4 + 2];
        rgba[dstRow + x*4 + 3] = 255;
      }
    }
    ctx.putImageData(new ImageData(rgba, w, h), 0, 0);
  }

  // Palette-swatch panel
  const paletteCanvas = document.getElementById("palette");
  const paletteCtx = paletteCanvas.getContext("2d");
  let lastSnapshot = -1;
  function blitPalette(pal) {
    const data = new Uint8ClampedArray(16 * 16 * 4);
    for (let i = 0; i < 256; i++) {
      data[i*4]     = pal[i*4];
      data[i*4 + 1] = pal[i*4 + 1];
      data[i*4 + 2] = pal[i*4 + 2];
      data[i*4 + 3] = 255;
    }
    paletteCtx.putImageData(new ImageData(data, 16, 16), 0, 0);
  }

  function blitRender() {
    // Prefer the static binary palette (at 0x971ef0) — populated by the binary's
    // own data section, way more colorful than the partially-captured GDI one.
    // Fall back to GDI capture, then synthetic.
    let pal;
    try {
      pal = readStaticPalette(memory);
      // sanity: if all zeros, fall back
      let nonZero = 0;
      for (let i = 0; i < 256 * 3; i++) if (pal[i]) { nonZero++; if (nonZero > 32) break; }
      if (nonZero <= 32) pal = getCapturedPalette() || palette;
    } catch { pal = getCapturedPalette() || palette; }
    blitFrom(screenCanvas, screenCtx, RENDER_BUF_BASE, 256, 128, 256, pal);
    const dib = getLatestDib();
    if (dib && dib.bitCount === 8) {
      blitFrom(dibCanvas, dibCtx, dib.bufAddr, dib.width, dib.height, dib.stride, pal);
      document.getElementById("dibStatus").textContent =
        `DIB ${dib.width}×${dib.height} @ 0x${dib.bufAddr.toString(16)}`;
    }
    // Always re-render palette swatch (cheap, helps see live capture).
    blitPalette(pal);
    document.getElementById("paletteStatus").textContent =
      `static @ 0x971ef0 (${pal[4]},${pal[5]},${pal[6]} @ idx 1)`;
  }

  // Window message constants
  const WM_PAINT  = 0x000F;
  const WM_TIMER  = 0x0113;
  let lastTimerPostStep = 0;
  let lastPaintPostStep = 0;

  let stopped = false;
  function tick() {
    if (stopped) return;

    // Once the binary has created its main window, drive the message pump:
    // post WM_TIMER every ~150K steps (forces game tick) and WM_PAINT every
    // ~600K steps (forces redraw into the DIB / surface).
    const hwnd = getFirstHwnd();
    if (hwnd) {
      if (stepCount - lastTimerPostStep > 150_000) {
        postWindowMessage(hwnd, WM_TIMER, 1, 0);
        lastTimerPostStep = stepCount;
      }
      if (stepCount - lastPaintPostStep > 600_000) {
        postWindowMessage(hwnd, WM_PAINT, 0, 0);
        lastPaintPostStep = stepCount;
      }
    }

    const tStart = performance.now();
    let didSteps = 0;
    try {
      while (didSteps < CHUNK_SIZE && (performance.now() - tStart) < 12) {
        const eip = cpu.regs.eip >>> 0;
        if (isShim(eip)) {
          const spec = getShim(eip);
          if (spec && !seenShims.has(spec.name)) {
            seenShims.add(spec.name);
            logLine(`#${stepCount.toLocaleString().padStart(10)}  shim: ${spec.name}`, "ev");
          }
        }
        if (eip === RET_SENTINEL) { logLine("RETURNED to sentinel — clean exit.", "lk"); stopped = true; break; }
        if (cpu.exitRequested !== undefined) { logLine(`ExitProcess(${cpu.exitRequested})`, "lk"); stopped = true; break; }
        step(cpu);
        didSteps++; stepCount++;
      }
    } catch (e) {
      logLine(`THREW @ eip=0x${cpu.regs.eip.toString(16)}: ${e.message}`, "err");
      stopped = true;
    }

    blitRender();
    const elapsed = performance.now() - startTime;
    const rate = stepCount / elapsed;
    const palStatus = getPaletteSnapshotCount() > 0 ? `pal:✓` : `pal:synthetic`;
    const dib = getLatestDib();
    const targetStatus = dib ? `dib:${dib.width}×${dib.height}` : `tgt:procedural`;
    const hwndStatus = getFirstHwnd() ? `hwnd:0x${getFirstHwnd().toString(16)}` : `hwnd:-`;
    const qStatus = `q:${getMessageQueueDepth()}`;
    status(`${stepCount.toLocaleString()} steps · ${rate.toFixed(0)} kHz · ${seenShims.size} shims · ${palStatus} · ${targetStatus} · ${hwndStatus} · ${qStatus} · ${stopped ? "stopped" : "running"}`);

    if (!stopped) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

main().catch(e => { logLine(`FATAL: ${e.stack || e.message}`, "err"); status(`error: ${e.message}`); });
