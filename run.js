// Boot the binary. Trace its first ~10000 instructions, watching for shim calls
// and crashes. The goal: see how far we get past the C runtime startup.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { loadPE } from "./harness/loader-node.js";
import { makeCpu, step, setShimInvoker } from "./harness/x86.js";
import { wireImports } from "./harness/imports.js";
import { bindShims, invokeShim, isShim, getShim, initHeap, setVfs, getDDrawObj, getFirstHwnd, postWindowMessage, getMessageQueueDepth, getLatestDib } from "./harness/shims.js";

const RCT = "./binary/rct.exe";
const image = loadPE(RCT);

const STACK_SIZE = 0x100000;
const HEAP_SIZE  = 64 * 1024 * 1024; // 64 MB user heap
const memory = new Uint8Array(image.totalSize + STACK_SIZE + HEAP_SIZE);
memory.set(image.memory, 0);

const { iatEntries } = wireImports(memory, image);
console.log(`Wired ${iatEntries.length} IAT entries.`);
bindShims(iatEntries);
setShimInvoker(invokeShim);

// Heap occupies memory[image.totalSize + STACK_SIZE .. end].
initHeap(image.totalSize + STACK_SIZE, image.totalSize + STACK_SIZE + HEAP_SIZE);

// Mount the game's data files. Reads everything under /tmp/rct_mount/ that
// looks like a data file. Lookup is case-insensitive by basename.
function mountVfs() {
  const vfs = {};
  const roots = ["/tmp/rct_mount/Data", "/tmp/rct_mount/Scenarios", "/tmp/rct_mount/Saved Games", "/tmp/rct_mount/Tracks", "/tmp/rct_mount/English"];
  for (const root of roots) {
    let entries;
    try { entries = readdirSync(root); } catch { continue; }
    for (const e of entries) {
      const p = join(root, e);
      try {
        const st = statSync(p);
        if (st.isFile()) vfs[e] = readFileSync(p);
      } catch { /* skip */ }
    }
  }
  return vfs;
}
const vfs = mountVfs();
setVfs(vfs);
console.log(`Mounted ${Object.keys(vfs).length} data files (csg1.dat, css*.dat, scenarios, etc.)`);

const cpu = makeCpu(memory);
const stackTop = image.totalSize + STACK_SIZE;
const RET_SENTINEL = 0xdeadbeef >>> 0;

cpu.regs.esp = (stackTop - 4) >>> 0;
memory[cpu.regs.esp]     = RET_SENTINEL & 0xff;
memory[cpu.regs.esp + 1] = (RET_SENTINEL >>> 8) & 0xff;
memory[cpu.regs.esp + 2] = (RET_SENTINEL >>> 16) & 0xff;
memory[cpu.regs.esp + 3] = (RET_SENTINEL >>> 24) & 0xff;
cpu.regs.eip = 0x00401000 >>> 0;

// Patch out FUN_0042ef8a — a "first-run setup wizard" loop that would
// require dialog-box user interaction to escape. Replace its first instruction
// with `ret` (0xc3) so the function returns immediately. Identified via static
// analysis: the function loops calling DialogBoxParam-equivalent until user
// dismisses, then sets a re-entry flag at [0x5f8533] that throws on second pass.
memory[0x42ef8a] = 0xc3;
console.log(`Patched FUN_0042ef8a entry @ 0x42ef8a → ret (skip first-run wizard)`);

// Drop the lifted version so calls fall through to the interpreter, which
// will see our memory patch and return immediately. Without this, the
// pre-compiled lifted JS body runs the unpatched logic.
import { lifted } from "./generated/all.js";
import { setLiftedTable as _setLiftedTable } from "./lifter/runtime.js";
const liftedFiltered = { ...lifted };
delete liftedFiltered[0x42ef8a];
_setLiftedTable(liftedFiltered);
console.log(`Dropped lifted fn_0042ef8a so the patched bytes take effect.`);
console.log(`memory[0x42ef8a] = 0x${memory[0x42ef8a].toString(16)} (should be 0xc3)`);
console.log(`lifted[0x42ef8a] now: ${typeof liftedFiltered[0x42ef8a]} (should be undefined)`);
// Also patch FUN_005df472 itself — even if something else jumps there, just make
// it ret immediately (skip the throw entirely). Last-resort safety net.
memory[0x5df472] = 0xc3;
delete liftedFiltered[0x5df472];
_setLiftedTable(liftedFiltered);
console.log(`Belt-and-suspenders: patched 0x5df472 (Throw) entry to ret.`);

// The lifter has a class of bugs around the 0x66 (operand-size) prefix:
//   - register opcodes like 0x4f (DEC DI) were lifted as 32-bit (DEC EDI)
//   - eax-immediate forms with 16-bit imm read 4 bytes instead of 2
// This produces wrong loop counts and corrupts subsequent instruction boundaries.
// Scan the binary for any function that *contains* a 0x66 prefix byte in its
// decoded range and drop it from the lifted table — interpreter handles 0x66
// correctly (the relevant cases were added).
{
  const dropped = [];
  for (const [addrStr, fn] of Object.entries({...liftedFiltered})) {
    const addr = Number(addrStr);
    // We don't have function size in lifted, but the manifest does. For a quick
    // heuristic: scan up to 1024 bytes from each function start for byte 0x66.
    // (False-positive drops are fine — interpreter still runs.)
    for (let i = addr; i < addr + 1024 && i < memory.length; i++) {
      if (memory[i] === 0x66) {
        dropped.push(addrStr);
        delete liftedFiltered[addrStr];
        break;
      }
    }
  }
  _setLiftedTable(liftedFiltered);
  console.log(`Dropped ${dropped.length} lifted fns containing 0x66 prefix bytes (lifter mis-decodes); interpreter handles them.`);
}

// Pre-populate DirectDraw state. The binary's CRT init normally calls a
// DDRAW.DLL LoadLibrary + GetProcAddress chain to populate these globals
// (the function pointers at 0x5f0eec/0x5f0d60/0x5f0958 and the DLL handle
// at 0x5ebf2c). We skip the CRT, so we wire them directly.
{
  const ddrawObj = getDDrawObj(cpu);
  const writeU32 = (addr, value) => {
    memory[addr]     =  value        & 0xff;
    memory[addr + 1] = (value >>> 8)  & 0xff;
    memory[addr + 2] = (value >>> 16) & 0xff;
    memory[addr + 3] = (value >>> 24) & 0xff;
  };
  writeU32(0x5ebf30, ddrawObj);  // IDirectDraw*
  writeU32(0x5ebf2c, 0xE0010000); // fake DDRAW.DLL handle (any non-zero)
  console.log(`Pre-wired IDirectDraw* at [0x5ebf30] = 0x${ddrawObj.toString(16)}`);
}

const seenShims = new Set();
const shimCounts = new Map(); // name -> count
const start = Date.now();
let stepCount = 0;
let lastInImageEip = cpu.regs.eip;
const recentEips = []; // ring buffer of last 200 eip values

// Message pump driver: once a window exists, post WM_TIMER every 150K
// steps and WM_PAINT every 600K steps. Goal: WindowProc fires, advances
// game state, eventually triggers the binary's render path.
let lastTimerStep = 0, lastPaintStep = 0, sawHwnd = false;
const WM_PAINT = 0x000F, WM_TIMER = 0x0113;

try {
  for (stepCount = 0; stepCount < 200_000_000; stepCount++) {
    const hwnd = getFirstHwnd();
    if (hwnd) {
      if (!sawHwnd) { console.log(`#${stepCount}  hwnd registered: 0x${hwnd.toString(16)}`); sawHwnd = true; }
      if (stepCount - lastTimerStep > 150_000) { postWindowMessage(hwnd, WM_TIMER, 1, 0); lastTimerStep = stepCount; }
      if (stepCount - lastPaintStep > 600_000) { postWindowMessage(hwnd, WM_PAINT, 0, 0); lastPaintStep = stepCount; }
    }
    const eip = cpu.regs.eip >>> 0;
    if (isShim(eip)) {
      const spec = getShim(eip);
      if (spec) {
        shimCounts.set(spec.name, (shimCounts.get(spec.name) ?? 0) + 1);
        if (!seenShims.has(spec.name)) {
          seenShims.add(spec.name);
          console.log(`#${stepCount.toString().padStart(7)}  shim:  ${spec.name}`);
        }
      }
    }
    if ((eip < image.imageBase || eip >= memory.length) && !isShim(eip)) {
      console.log(`#${stepCount}  CRASH: bad eip=0x${eip.toString(16)}`);
      console.log(`         last in-image: 0x${lastInImageEip.toString(16)}, esp=0x${cpu.regs.esp.toString(16)}, callDepth=${cpu.callDepth}`);
      // Show current stack contents
      const espOK = cpu.regs.esp + 16 <= memory.length;
      if (espOK) {
        console.log(`         stack@esp: 0x${(memory[cpu.regs.esp] | (memory[cpu.regs.esp+1]<<8) | (memory[cpu.regs.esp+2]<<16) | (memory[cpu.regs.esp+3]<<24)>>>0).toString(16)} 0x${(memory[cpu.regs.esp+4] | (memory[cpu.regs.esp+5]<<8) | (memory[cpu.regs.esp+6]<<16) | (memory[cpu.regs.esp+7]<<24)>>>0).toString(16)}`);
      }
      console.log(`         recent eips: ${recentEips.slice(-15).map(e => "0x" + e.toString(16)).join(", ")}`);
      break;
    }
    if (!isShim(eip) && eip < 0xF0000000) lastInImageEip = eip;
    recentEips.push(eip);
    if (recentEips.length > 1000) recentEips.shift();
    // Trace eax when we reach 0x436d5e (the outer-loop push) — that's the loop counter.
    if (eip === 0x436d5e) {
      // eslint-disable-next-line
      if ((cpu._d5eHits = (cpu._d5eHits||0) + 1) % 100 === 1)
        console.log(`#${stepCount.toLocaleString().padStart(11)}  eip=0x436d5e  eax=${(cpu.regs.eax>>>0).toString(16)}  hit#${cpu._d5eHits}`);
    }
    // Trace fn_005e117d outer loop entry — log BP / DI / EBX at top of inner loop.
    if (eip === 0x5e11fd) {
      const di = cpu.regs.edi & 0xffff, bp = cpu.regs.ebp & 0xffff;
      cpu._5e11fdHits = (cpu._5e11fdHits||0) + 1;
      if (cpu._5e11fdHits % 100 === 1)
        console.log(`#${stepCount.toLocaleString().padStart(11)}  0x5e11fd  bp=${bp.toString(16)} di=${di.toString(16)} ebx=${(cpu.regs.ebx>>>0).toString(16)} ecx=${(cpu.regs.ecx>>>0).toString(16)}  hit#${cpu._5e11fdHits}`);
    }
    if (eip === 0x5e117d) {
      console.log(`#${stepCount.toLocaleString().padStart(11)}  ENTER fn_005e117d  ax=${(cpu.regs.eax&0xffff).toString(16)} bx=${(cpu.regs.ebx&0xffff).toString(16)} cx=${(cpu.regs.ecx&0xffff).toString(16)} dx=${(cpu.regs.edx&0xffff).toString(16)} bp=${(cpu.regs.ebp&0xffff).toString(16)}`);
    }
    // Sample eip at every 5M steps — after init, see where the binary is spinning.
    if (stepCount > 400_000 && stepCount % 5_000_000 === 0) {
      const sp = cpu.regs.esp >>> 0;
      const stk = [];
      for (let i = 0; i < 16; i++) {
        const v = (memory[sp + i*4] | (memory[sp + i*4 + 1] << 8) | (memory[sp + i*4 + 2] << 16) | (memory[sp + i*4 + 3] << 24)) >>> 0;
        if (v >= 0x401000 && v < 0x600000) stk.push("0x" + v.toString(16));
      }
      console.log(`#${stepCount.toLocaleString().padStart(11)}  eip=0x${(cpu.regs.eip>>>0).toString(16)}  esp=0x${sp.toString(16)} q=${getMessageQueueDepth()}`);
      console.log(`         stack-like: ${stk.slice(0, 8).join(", ")}`);
    }
    if (eip === RET_SENTINEL) {
      console.log(`#${stepCount}  RETURNED to sentinel — clean exit.`);
      break;
    }
    if (cpu.exitRequested !== undefined) {
      console.log(`#${stepCount}  ExitProcess(${cpu.exitRequested})`);
      console.log(`         recent eips: ${recentEips.slice(-25).map(e => "0x" + e.toString(16)).join(", ")}`);
      break;
    }
    step(cpu);
  }
} catch (e) {
  console.log(`#${stepCount}  THREW at eip=0x${cpu.regs.eip.toString(16)} (last in-image: 0x${lastInImageEip.toString(16)}): ${e.message}`);
  console.log(`         recent eips: ${recentEips.slice(-30).map(e => "0x" + e.toString(16)).join(", ")}`);
  console.log(`         regs: eax=0x${cpu.regs.eax.toString(16)} ebx=0x${cpu.regs.ebx.toString(16)} ecx=0x${cpu.regs.ecx.toString(16)} edx=0x${cpu.regs.edx.toString(16)}`);
  console.log(`               esi=0x${cpu.regs.esi.toString(16)} edi=0x${cpu.regs.edi.toString(16)} ebp=0x${cpu.regs.ebp.toString(16)} esp=0x${cpu.regs.esp.toString(16)}`);
  // Print bytes around the failing eip
  const eip = cpu.regs.eip >>> 0;
  if (eip < memory.length - 16) {
    let s = "";
    for (let i = -8; i < 8; i++) {
      const b = memory[eip + i] || 0;
      s += b.toString(16).padStart(2, '0') + (i === -1 ? "|" : " ");
    }
    console.log(`         bytes around eip: ${s}`);
  }
}

const elapsed = Date.now() - start;
console.log(`\n${stepCount.toLocaleString()} steps in ${elapsed}ms (${(stepCount/elapsed).toFixed(0)} kHz effective)`);

import { writeFileSync, mkdirSync } from "node:fs";
import { deflateSync } from "node:zlib";
import { defaultPalette } from "./harness/csg.js";

// Snapshot the binary's render buffer at [0x981efc, 0x989efc) — 32 KB the
// binary clears at the start of each render pass and fills with sprite blits.
{
  mkdirSync("./frames", { recursive: true });
  const palette = defaultPalette();
  const bufStart = 0x981efc;
  const bufLen = 0x8000;
  const buf = memory.slice(bufStart, bufStart + bufLen);
  for (const [w, h] of [[256, 128], [128, 256], [512, 64], [200, 164]]) {
    if (w * h > buf.length) continue;
    const rgba = new Uint8ClampedArray(w * h * 4);
    for (let i = 0; i < w * h; i++) {
      const p = buf[i];
      rgba[i*4]   = palette[p*4];
      rgba[i*4+1] = palette[p*4+1];
      rgba[i*4+2] = palette[p*4+2];
      rgba[i*4+3] = 255;
    }
    writeFileSync(`frames/render_${w}x${h}.png`, encodePNG(w, h, rgba));
  }
  writeFileSync("frames/render_buffer.bin", buf);
  console.log(`\nSnapshot frames/render_*.png ; raw at frames/render_buffer.bin (${bufLen} bytes)`);
  const hist = new Array(256).fill(0);
  for (const b of buf) hist[b]++;
  let nonZero = 0; for (const c of hist) if (c) nonZero++;
  const top = hist.map((c, i) => ({c, i})).sort((a,b) => b.c - a.c).slice(0, 5);
  console.log(`  ${nonZero} distinct byte values, top: ${top.map(x => `0x${x.i.toString(16)}=${x.c}`).join(", ")}`);
}

function encodePNG(width, height, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    Buffer.from(rgba.buffer, rgba.byteOffset + y * stride, stride).copy(raw, y * (stride + 1) + 1);
  }
  const idat = deflateSync(raw);
  return Buffer.concat([sig, pngChunk("IHDR", ihdr), pngChunk("IDAT", idat), pngChunk("IEND", Buffer.alloc(0))]);
}
function pngChunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}
function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) {
    c = c ^ b;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  return (c ^ 0xffffffff) >>> 0;
}
console.log(`Distinct shims called: ${seenShims.size}`);
console.log(`\nTop shim call counts:`);
const sorted = [...shimCounts.entries()].sort(([,a],[,b]) => b - a).slice(0, 15);
for (const [name, count] of sorted) console.log(`  ${count.toString().padStart(8)}  ${name}`);
