#!/usr/bin/env node
// Probe: post a WM_LBUTTONDOWN at various coords, snapshot heap before/after
// the tick that consumes it, and report which u32 globals in the WndProc
// global windows changed. Also probes WM_MOUSEMOVE and WM_KEYDOWN.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
globalThis._renderTrace = () => {};

const { createRuntime } = await import("../runtime/harness.js");
const { state } = await import("../runtime/win32/context.js");
const { postWindowMessage } = await import("../runtime/win32/user32.js");

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfs = new Map();
const VFS = ["csg1.dat","csg1i.dat","game.cfg","kanji.dat","tutorial.dat","mp.dat",
  "css1.dat","css2.dat","css3.dat","css4.dat","css5.dat","css6.dat","css7.dat","css8.dat",
  "css9.dat","css11.dat","css13.dat","css14.dat","css15.dat","css17.dat","sc21.sc4"];
for (const n of VFS) { try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT,"web/assets",n))); } catch (e) {} }
for (const n of ["css10.dat","css12.dat","css16.dat","tutl.dat"]) vfs.set(n, new Uint8Array(0));

const r = createRuntime({ dataBin, vfs });
r.runInit();
r.runTick();

const hwnd = state.firstHwnd;
console.log(`firstHwnd: 0x${hwnd.toString(16)}`);

const WINDOWS = [
  { start: 0x005e9000, end: 0x005e9400 },
  { start: 0x005f1000, end: 0x005f2400 },
  { start: 0x0099c000, end: 0x0099c400 },
];

function snap() {
  const out = new Map();
  for (const w of WINDOWS) {
    const buf = new Uint8Array(w.end - w.start);
    for (let i = 0; i < buf.length; i++) buf[i] = r.heap.bytes[w.start + i];
    out.set(w.start, buf);
  }
  return out;
}
function bytesAt(buf, start, addr) {
  const off = addr - start;
  return (buf[off] | (buf[off+1]<<8) | (buf[off+2]<<16) | (buf[off+3]<<24)) >>> 0;
}
function diff(before, after) {
  const set = new Set();
  for (const w of WINDOWS) {
    const b = before.get(w.start), a = after.get(w.start);
    for (let i = 0; i < b.length; i++) {
      if (b[i] !== a[i]) set.add((w.start + i) & ~3);
    }
  }
  const out = [];
  for (const addr of set) {
    const w = WINDOWS.find(w => addr >= w.start && addr < w.end);
    out.push({ addr, b: bytesAt(before.get(w.start), w.start, addr), a: bytesAt(after.get(w.start), w.start, addr) });
  }
  return out.sort((x, y) => x.addr - y.addr);
}

function run(label, postFn) {
  const before = snap();
  postFn();
  r.runTick();
  const after = snap();
  const diffs = diff(before, after);
  console.log(`\n${label} (${diffs.length} u32 changes):`);
  for (const c of diffs.slice(0, 30)) {
    console.log(`  0x${c.addr.toString(16)}: ${c.b} -> ${c.a}`);
  }
  return diffs;
}

run("WM_MOUSEMOVE(200, 150)", () => {
  postWindowMessage(hwnd, 0x0200, 0, ((150 & 0xffff) << 16) | (200 & 0xffff));
});

run("WM_LBUTTONDOWN(100, 50) + UP", () => {
  postWindowMessage(hwnd, 0x0201, 1, ((50 & 0xffff) << 16) | (100 & 0xffff));
  postWindowMessage(hwnd, 0x0202, 0, ((50 & 0xffff) << 16) | (100 & 0xffff));
});

run("WM_LBUTTONDOWN(300, 200) only", () => {
  postWindowMessage(hwnd, 0x0201, 1, ((200 & 0xffff) << 16) | (300 & 0xffff));
});

run("WM_KEYDOWN(VK_ESCAPE=0x1b)", () => {
  postWindowMessage(hwnd, 0x0100, 0x1b, 1);
  postWindowMessage(hwnd, 0x0101, 0x1b, 1);
});

run("WM_KEYDOWN(VK_F1=0x70)", () => {
  postWindowMessage(hwnd, 0x0100, 0x70, 1);
});

// Final snapshot of the click coord globals to confirm
console.log(`\nFinal:`);
console.log(`  DAT_005f1cb4 (last click x) = ${r.heap.u32(0x005f1cb4)}`);
console.log(`  DAT_005f1cb8 (last click y) = ${r.heap.u32(0x005f1cb8)}`);
console.log(`  DAT_005f1a10 (mousemove x)  = ${r.heap.u32(0x005f1a10)}`);
console.log(`  DAT_005f1a14 (mousemove y)  = ${r.heap.u32(0x005f1a14)}`);
console.log(`  DAT_005e9170 (mouse evt)    = ${r.heap.u32(0x005e9170)}`);
console.log(`  DAT_005ebe40 (mousemove gate) = ${r.heap.u32(0x005ebe40)}`);
