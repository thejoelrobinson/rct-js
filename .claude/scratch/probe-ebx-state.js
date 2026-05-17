#!/usr/bin/env node
// Probe what EBX/sprite-handle value is causing the recursion.
// Hook 9b8491 entry and log EBX + class-flag.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");
const { createRuntime } = await import("../../runtime/harness.js");
const { state } = await import("../../runtime/win32/context.js");
const { regs } = await import("../../runtime/regs.js");
const { dispatch: portedDispatch } = await import("../../ported/auto/_dispatch.js");

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

// Wrap 9b8491 — only log first 5 entries
let calls = 0;
const orig = (await import("../../ported/auto/9b8491.js")).FUN_009b8491;
// Replace in module cache? Easier: monkey-patch via dispatch since 9b8491 has dispatch entry.
const origDisp = state.fnDispatch.get(0x9b8491);
// Actually 9b8491 is called from 9b4457 via direct import, NOT via dispatch.
// To trace it, we need a different mechanism. Hook setI16 of EDI+0xe instead.

const origSetI16 = heap.setI16.bind(heap);
let firstEntry = true;
heap.setI16 = function (addr, v) {
  if (firstEntry && addr === 0x5f96d0 + 0xe && v === 0xffff) {
    firstEntry = false;
    // We're at the first decrement. Snapshot EBX and EDI.
    console.log(`\n=== First zoom-decrement caught ===`);
    console.log(`  regs.ebx = 0x${(regs.ebx >>> 0).toString(16)}`);
    console.log(`  regs.edi = 0x${(regs.edi >>> 0).toString(16)}`);
    console.log(`  regs.ecx = 0x${(regs.ecx >>> 0).toString(16)}`);
    console.log(`  regs.edx = 0x${(regs.edx >>> 0).toString(16)}`);
    console.log(`  regs.ebp = 0x${(regs.ebp >>> 0).toString(16)}`);
    const ebx = regs.ebx >>> 0;
    const u = ebx & 0x1ffff;
    const iVar8 = u * 0x10;
    console.log(`  ebx & 0x1ffff = 0x${u.toString(16)} (sprite index)`);
    console.log(`  class entry @ 0x${(0x008dc0c0 + iVar8).toString(16)} flag word = 0x${heap.u16(0x008dc0c0 + iVar8).toString(16)}`);
    console.log(`  table base bytes @ 0x${(0x8dc0b4 + iVar8).toString(16)} = 0x${heap.u32(0x8dc0b4 + iVar8).toString(16)}`);
    console.log(`  table +0x8 width/height = 0x${heap.u32(0x8dc0b8 + iVar8).toString(16)}`);
    console.log(`  table +0xc xoff/yoff = 0x${heap.u32(0x8dc0bc + iVar8).toString(16)}`);
    console.log(`  the flag bit 0x10 is the recursion trigger: ${(heap.u16(0x008dc0c0 + iVar8) & 0x10) ? "SET" : "clear"}`);
    console.log(`  the flag bit 0x20 is skip: ${(heap.u16(0x008dc0c0 + iVar8) & 0x20) ? "SET" : "clear"}`);
    console.log(`\nstack trace (first 8 frames):`);
    const stack = new Error().stack.split("\n").slice(2, 12).map(s => s.trim());
    for (const s of stack) console.log(`  ${s}`);
  }
  return origSetI16(addr, v);
};

try { r.runTick(); } catch (e) { console.log(`\ntick threw: ${e.message?.slice(0,80)}`); }
