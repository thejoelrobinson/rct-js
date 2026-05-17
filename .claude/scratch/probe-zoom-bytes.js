#!/usr/bin/env node
// Track ANY byte change at 0x5f96de (zoom) by polling between every fn call.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");
const { createRuntime } = await import("../../runtime/harness.js");
const { state } = await import("../../runtime/win32/context.js");
const { regs } = await import("../../runtime/regs.js");

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfsRoot = resolve(ROOT, "web/assets");
const vfs = new Map();
for (const f of readdirSync(vfsRoot)) {
  const p = join(vfsRoot, f);
  if (statSync(p).isFile()) vfs.set(f.toLowerCase(), new Uint8Array(readFileSync(p)));
}

const r = createRuntime({ dataBin, vfs });
const heap = r.heap;
r.runInit();

const ZOOM_ADDR = 0x5f96de;
let lastVal = heap.i16(ZOOM_ADDR);
function checkpoint(label) {
  const v = heap.i16(ZOOM_ADDR);
  if (v !== lastVal) {
    console.log(`[checkpoint:${label}] zoom: ${lastVal} → ${v} (raw=${heap.u8(ZOOM_ADDR)},${heap.u8(ZOOM_ADDR+1)})`);
    lastVal = v;
  }
}

// Wrap interesting painter functions
const wrapList = [
  [0x4316f3, "4316f3"],
  [0x431b6f, "431b6f"],
  [0x436b2a, "436b2a"],
  [0x436b50, "436b50"],
  [0x433bae, "433bae"],
  [0x433e1c, "433e1c"],
  [0x4367cb, "4367cb"],
  [0x444820, "444820"],
  [0x4368d8, "4368d8"],
  [0x436a9c, "436a9c"],
  // bridge painters from the rotation jumptable
  [0x4368e0, "4368e0"],
  [0x4368ec, "4368ec"],
  [0x4368ff, "4368ff"],
  [0x436aa4, "436aa4"],
  [0x436ab0, "436ab0"],
  [0x436ac3, "436ac3"],
];

// Hook dispatch table — but 4316f3 is called via direct import. Wrap that
// in module cache... actually easier: just wrap state.fnDispatch where possible.
for (const [a, name] of wrapList) {
  const orig = state.fnDispatch.get(a);
  if (!orig) continue;
  state.fnDispatch.set(a, function (...args) {
    checkpoint(`pre-${name}`);
    const r = orig(...args);
    checkpoint(`post-${name}`);
    return r;
  });
}

// Hook entrance to wndProc 42b079 too
const orig42b079 = state.fnDispatch.get(0x42b079);
state.fnDispatch.set(0x42b079, function (...args) {
  checkpoint("pre-42b079");
  try { const r = orig42b079(...args); checkpoint("post-42b079"); return r; }
  catch (e) { checkpoint(`42b079-threw(${e.message?.slice(0,30)})`); throw e; }
});

try { r.runTick(); } catch (e) { console.log(`\ntick threw: ${e.message?.slice(0,60)}`); }
console.log(`final zoom = ${heap.i16(ZOOM_ADDR)}`);
