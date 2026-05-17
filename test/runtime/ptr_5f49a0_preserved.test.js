// PTR_LAB_005f49a0 — verifies the 16-entry game-command jumptable in
// DATASEG is preserved across `runtime.runTick()`.
//
// Background (full investigation in .claude/scratch/agent-ptr5f49a0-findings.md):
//
// The table at 0x5f49a0..0x5f49e0 holds 16 function pointers (game-command
// handlers — pause, place-track, sell-item, etc). FUN_00426f56 (the
// generic game-command submit) calls into it via
//
//     PTR_LAB_005f49a0[ESI] (heap.u32 indirect)
//
// where ESI is the cmd index. If any entry is null the toolbar widget
// click chain (e.g. pause via 0x42a830 → 0x42b083 → 0x426f56 → 0x427247)
// dereferences null and the cmd is dropped silently.
//
// The table is intact in `decompiled/data.bin` at boot, but the first
// runTick() previously zeroed it via two independent bugs:
//
//   1. `ported/auto/40179d.js` — translator stride bug. The dirty-flag
//      table clear loop emitted `setU32(0x5f2420 + i*4, 0)` for the C
//      `(&DAT_005f2420)[i] = 0`, but the binary uses a BYTE store
//      (`MOV BYTE PTR [eax + 0x5f2420], 0`). With 0xa00 iterations the
//      u32 stride wrote 4× too many bytes, zeroing 0x5f2e20..0x5f4e20
//      and clobbering PTR_LAB_005f49a0 along the way.
//
//   2. `runtime/harness.js` — over-fill in the synthetic presenter pump.
//      The full-screen dirty-mark loop filled 0x5000 bytes from
//      0x005f2420 (mistakenly assuming a 20kB bitmap), overrunning the
//      actual 0xa00-byte dirty-flag table and overwriting 0x5f2e20..
//      0x5f7420 — also covering PTR_LAB_005f49a0.
//
// Both are now fixed. This test snapshots the table from data.bin, runs
// one tick, and asserts every byte still matches.

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");

const PTR_BASE = 0x005f49a0;
const PTR_BYTES = 16 * 4; // 16 dwords

const VFS_FILES = [
  "csg1.dat", "csg1i.dat", "game.cfg", "kanji.dat", "tutorial.dat", "mp.dat",
  "css1.dat", "css2.dat", "css3.dat", "css4.dat", "css5.dat", "css6.dat",
  "css7.dat", "css8.dat", "css9.dat", "css11.dat", "css13.dat", "css14.dat",
  "css15.dat", "css17.dat", "sc21.sc4",
];
const VFS_PLACEHOLDERS = ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"];

describe("PTR_LAB_005f49a0 (game-cmd jumptable) preservation", () => {
  let runtime, dataBin;

  beforeAll(async () => {
    globalThis._renderTrace = () => {};
    const { createRuntime } = await import("../../runtime/harness.js");
    dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
    const vfs = new Map();
    for (const n of VFS_FILES) {
      try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); }
      catch (_) { /* placeholder */ }
    }
    for (const n of VFS_PLACEHOLDERS) vfs.set(n.toLowerCase(), new Uint8Array(0));

    runtime = createRuntime({ dataBin, vfs });
    runtime.runInit();
  }, 120_000);

  it("table is loaded from data.bin at boot (sanity)", () => {
    const dv = new DataView(dataBin.buffer, dataBin.byteOffset, dataBin.byteLength);
    for (let i = 0; i < 16; i++) {
      const expected = dv.getUint32(PTR_BASE + i * 4, true);
      const got = runtime.heap.u32(PTR_BASE + i * 4);
      expect(got).toBe(expected);
    }
    // slot 0 = 0x44e623, slot 2 = 0x427247 (pause-toggle). Spot-check
    // a couple of known-good values from the agent-42a830 probe trace.
    expect(runtime.heap.u32(PTR_BASE + 0)).toBe(0x44e623);
    expect(runtime.heap.u32(PTR_BASE + 8)).toBe(0x427247);
  });

  it("table survives one runTick() — every byte matches data.bin", () => {
    const before = dataBin.slice(PTR_BASE, PTR_BASE + PTR_BYTES);
    runtime.runTick();
    const after = runtime.heap.bytes.slice(PTR_BASE, PTR_BASE + PTR_BYTES);
    // Compare byte-by-byte to give a useful failure message on regression.
    const beforeHex = Array.from(before).map(b => b.toString(16).padStart(2, "0")).join("");
    const afterHex  = Array.from(after ).map(b => b.toString(16).padStart(2, "0")).join("");
    expect(afterHex).toBe(beforeHex);
  }, 60_000);

  it("table still survives a SECOND runTick() (no per-tick drift)", () => {
    const before = dataBin.slice(PTR_BASE, PTR_BASE + PTR_BYTES);
    runtime.runTick();
    const after = runtime.heap.bytes.slice(PTR_BASE, PTR_BASE + PTR_BYTES);
    const beforeHex = Array.from(before).map(b => b.toString(16).padStart(2, "0")).join("");
    const afterHex  = Array.from(after ).map(b => b.toString(16).padStart(2, "0")).join("");
    expect(afterHex).toBe(beforeHex);
  }, 60_000);
});
