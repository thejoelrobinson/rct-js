// Viewport click-to-build end-to-end gate (Track C finale).
//
// Proves the full cursor-pick -> build chain: a screen click resolves a real
// owned surface tile via the cursor-pick FUN_00431510, then the LAND set-height
// game command writes that tile's surface base-height. Reuses build_command's
// surfaceElem + scenario_play's boot pattern.
//
// WHICH PICK PATH: the cursor-pick re-paints the world into a 1x1 DPI at the
// cursor; the painters that fill that paint-list are CODESEG-only (0x421d2c /
// 0x431bc8, no JS hand-port) and run on the painter-bridge interpreter
// (state.__painterCpu over heap.bytes) in BOTH the harness and the browser
// boot. We therefore drive FUN_00431510 through that same bridge cpu — the
// faithful, oracle-equal path the runtime uses to paint terrain. The pick
// resolves the clicked tile into 0x628918 (tile-element ptr) + 0x628910.
//
// REMAINING BROWSER GAP (documented, NOT exercised here): the *pure-JS* port of
// FUN_00431510 (web/main-native.js per-tick input path) draws the 1x1 pick
// pixel (the EBP-into-431b6f fix landed) but the JS painter chain drops one
// terrain paint slot under the cold bridge cpu, so 433bae's list-head clobbers
// the surface entry and the JS-only pick resolves no tile. See the project
// memory (project-track-c-viewport-build) for the precise localization.
//
// KNOWN-GOOD: screen (196,92) -> world (896,2048) -> tile (28,64), surface
// element 0x6f4168, owned (byte7 & 0x20), height 84.

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");

const VFS_FILES = [
  "csg1.dat", "csg1i.dat", "game.cfg", "kanji.dat", "tutorial.dat", "mp.dat",
  "css1.dat", "css2.dat", "css3.dat", "css4.dat", "css5.dat", "css6.dat",
  "css7.dat", "css8.dat", "css9.dat", "css11.dat", "css13.dat", "css14.dat",
  "css15.dat", "css17.dat", "sc21.sc4",
];
const VFS_PLACEHOLDERS = ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"];

describe("viewport click-to-build (cursor-pick resolves a tile, then build writes it)", () => {
  let heap, cpu, regs, runFunction;

  beforeAll(async () => {
    globalThis._renderTrace = () => {};
    globalThis._gotoWarn = () => {};
    const origWarn = console.warn;
    console.warn = (...args) => {
      const s = String(args[0] ?? "");
      if (s.startsWith("[painter-bridge]") || s.startsWith("[callIndirect]") ||
          s.startsWith("[harness]") || s.startsWith("[runtime/win32 stub]")) return;
      origWarn(...args);
    };

    const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../../runtime/harness.js");
    const state = (await import("../../runtime/win32/context.js")).state;
    regs = (await import("../../runtime/regs.js")).regs;
    runFunction = (await import("../../harness/x86.js")).runFunction;

    const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
    const vfs = new Map();
    for (const n of VFS_FILES) {
      try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch (_) {}
    }
    for (const n of VFS_PLACEHOLDERS) vfs.set(n.toLowerCase(), new Uint8Array(0));

    const runtime = createRuntime({ dataBin, vfs });
    runtime.runInit();
    runtime.runTick();
    skipFadeIn(runtime.heap);
    enterScenarioPlay(runtime.heap);
    // Repair the 49-dword game-cmd jumptable (PTR_LAB_005f49a0) from data.bin.
    const dv = new DataView(dataBin.buffer, dataBin.byteOffset, dataBin.byteLength);
    for (let i = 0; i < 49; i++) {
      runtime.heap.setU32(0x005f49a0 + i * 4, dv.getUint32(0x005f49a0 + i * 4, true));
    }
    runtime.heap.setU8(0x005f4a6a, 1); // gate the cmd-22/23/24 sound call (avoid bridge underflow)
    heap = runtime.heap;
    cpu = state.__painterCpu;
  }, 120_000);

  // build_command.test.js's tile-element walker.
  function surfaceElem(tx, ty) {
    const head = heap.u32(0x00971ef4 + (tx + ty * 128) * 4);
    if (head < 0x6e3b90 || head > 0x8dc08c) return 0;
    let p = head;
    while ((heap.u8(p + 1) & 0x80) === 0 && (heap.u8(p) & 0x3c) !== 0) p += 8;
    return (heap.u8(p) & 0x3c) === 0 ? p : 0;
  }

  // Drive the cursor-pick FUN_00431510 at a screen position through the painter-
  // bridge cpu (the same interpreter that paints terrain in the harness/browser
  // boot). Returns the resolved tile-element ptr (0x628918) or 0.
  function pickAt(sx, sy) {
    heap.setU8(0x0099c164, 9);      // sentinel: 9 means the 1x1 pick-blit never ran
    heap.setU32(0x00628918, 0);
    heap.setU8(0x00628910, 0);
    for (const k of ["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp"]) {
      cpu.regs[k] = 0; regs[k] = 0;
    }
    cpu.regs.eax = sx >>> 0; cpu.regs.ebx = sy >>> 0;
    cpu.regs.edx = 0xfffe; cpu.regs.esi = 0;
    cpu.eflags.CF = cpu.eflags.ZF = cpu.eflags.SF = cpu.eflags.OF = 0;
    cpu.fpuTop = 0; cpu.fpuTags = 0xffff; cpu.fpuSw = 0;
    runFunction(cpu, 0x431510, { stackTop: heap.bytes.byteLength - 0x1000, limit: 200_000_000 });
    const resolved = heap.u8(0x0099c164) === 1 && heap.u32(0x00628918) !== 0 && heap.u8(0x00628910) !== 0;
    return resolved ? (heap.u32(0x00628918) >>> 0) : 0;
  }

  it("a screen click over an owned tile resolves that surface tile-element, then LAND build writes it (and stays fast)", () => {
    // 1) The known-good click resolves the documented tile.
    const tStart = process.hrtime.bigint();
    const elem = pickAt(196, 92);
    const pickMs = Number(process.hrtime.bigint() - tStart) / 1e6;
    expect(elem).toBeGreaterThan(0);                  // the cursor-pick resolved a tile
    expect((heap.u8(elem) & 0x3c) >>> 2).toBe(0);     // it's a surface element
    expect(heap.u8(elem + 7) & 0x20).toBe(0x20);      // land-owned
    expect(pickMs).toBeLessThan(4000);                // pick is not a runaway

    // The resolved tile must be at the documented location (28,64) / 0x6f4168.
    const surfAt2864 = surfaceElem(28, 64);
    expect(surfAt2864).toBe(elem);

    // 2) Build: lower this tile one step via LAND set-height (cmd 1, atomic).
    const tx = 28, ty = 64;
    const before = heap.u8(elem + 3);                 // surface base height
    expect(before).toBeGreaterThanOrEqual(8);         // room to lower
    const after = before - 4;

    const setup = {
      eax: (tx * 32) & 0xffff, ecx: (ty * 32) & 0xffff,
      edx: after >>> 0, ebx: 1, esi: 1, edi: 0, ebp: 0,
    };
    for (const k of ["eax", "ecx", "edx", "ebx", "esi", "edi", "ebp"]) {
      regs[k] = setup[k] >>> 0; cpu.regs[k] = setup[k] >>> 0;
    }
    cpu.eflags.CF = cpu.eflags.ZF = cpu.eflags.SF = cpu.eflags.OF = 0;
    cpu.fpuTop = 0; cpu.fpuTags = 0xffff; cpu.fpuSw = 0;
    const tBuild = process.hrtime.bigint();
    runFunction(cpu, 0x426f56, { stackTop: heap.bytes.byteLength - 0x1000, limit: 50_000_000 });
    const buildMs = Number(process.hrtime.bigint() - tBuild) / 1e6;

    expect(cpu.regs.ebx >>> 0).toBe(0xc8);            // command success (not 0x80000000)
    expect(heap.u8(elem + 3)).toBe(after);            // the clicked tile's height CHANGED
    expect(buildMs).toBeLessThan(4000);               // build is not a runaway
  }, 60_000);
});
