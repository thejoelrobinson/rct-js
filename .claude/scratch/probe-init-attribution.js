#!/usr/bin/env node
// Probe which phase of runInit produces the back-buffer content.
// Snapshot the back-buffer surface bytes after each major init call to
// pinpoint which one is responsible for the noise pattern.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");
const { createRuntime } = await import("../../runtime/harness.js");
const { state } = await import("../../runtime/win32/context.js");
const { dispatch: portedDispatch } = await import("../../ported/auto/_dispatch.js");

const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
const vfsRoot = resolve(ROOT, "web/assets");
const vfs = new Map();
for (const f of readdirSync(vfsRoot)) {
  const p = join(vfsRoot, f);
  if (statSync(p).isFile()) vfs.set(f.toLowerCase(), new Uint8Array(readFileSync(p)));
}

// Hook BEFORE createRuntime, so the wraps are in place before harness reads them.
const snapshotPointsPre = [
  [0x413170, "413170 (string copy)"],
  [0x404752, "404752 (pre-init heap)"],
  [0x404b0e, "404b0e (pre-init globals)"],
  [0x405f2c, "405f2c (RegisterClassA)"],
  [0x406d10, "406d10 (DDraw+palette+fonts)"],
  [0x40d9a0, "40d9a0"],
  [0x40df00, "40df00"],
  [0x4385d8, "4385d8 (pre-load tick)"],
  [0x42f4be, "42f4be (scenario load)"],
  [0x40179d, "40179d (present)"],
];
const r = createRuntime({ dataBin, vfs });
const heap = r.heap;

// We don't have hooks into runInit's substeps directly — but we can wrap
// the dispatch entries for the addresses runInit calls. The harness calls
// these in order:
//   0x413170 (twice for string copies)
//   0x404752  pre-init heap
//   0x404b0e  pre-init globals
//   0x405f2c  RegisterClassA
//   0x406d10  DDraw + palette + fonts + MIDI
//   0x40d9a0
//   0x40df00
//   0x4385d8  pre-load tick (lazy init)
//   0x42f4be  scenario load
//   then synthetic paint pump (per-window wndProc)
//   then 0x40179d (present)

// Hook them all to snapshot back-buffer right after.
const snapshotPoints = [
  [0x413170, "413170 (string copy)"],
  [0x404752, "404752 (pre-init heap)"],
  [0x404b0e, "404b0e (pre-init globals)"],
  [0x405f2c, "405f2c (RegisterClassA)"],
  [0x406d10, "406d10 (DDraw+palette+fonts)"],
  [0x40d9a0, "40d9a0"],
  [0x40df00, "40df00"],
  [0x4385d8, "4385d8 (pre-load tick)"],
  [0x42f4be, "42f4be (scenario load)"],
  [0x40179d, "40179d (present)"],
];

// We don't yet know which back buffer will be allocated. Inject a hook to
// snapshot all surfaces ≥320 wide after each named call.

function snapshotAll(label) {
  const lines = [`[snap] ${label}`];
  for (const [obj, surf] of state.ddrawSurfaces) {
    if (surf.width < 320) continue;
    let nz = 0;
    const h = new Uint32Array(256);
    for (let y = 0; y < surf.height; y++) {
      for (let x = 0; x < surf.width; x++) {
        const v = heap.bytes[surf.bytes + y * surf.pitch + x];
        h[v]++;
        if (v !== 0) nz++;
      }
    }
    let distinct = 0;
    for (let v = 0; v < 256; v++) if (h[v] > 0) distinct++;
    const top = [...h.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
    lines.push(`  obj=0x${obj.toString(16)} ${surf.isPrimary?"PRI":"back"} nz=${nz} distinct=${distinct} top=${top.map(([v,c])=>`0x${v.toString(16)}:${c}`).join(",")}`);
  }
  console.log(lines.join("\n"));
}

for (const [a, name] of snapshotPoints) {
  const orig = portedDispatch.get(a);
  if (!orig) { console.log(`(no dispatch for 0x${a.toString(16)})`); continue; }
  portedDispatch.set(a, function (...args) {
    let res;
    try { res = orig(...args); }
    catch (e) { snapshotAll(`AFTER ${name} (threw: ${e.message?.slice(0, 60)})`); throw e; }
    snapshotAll(`AFTER ${name}`);
    return res;
  });
}

try { r.runInit(); }
catch (e) { console.log(`runInit threw: ${e.message?.slice(0, 100)}`); }

// Now snapshot the final state
console.log(`\n=== POST-runInit ===`);
snapshotAll("final");
