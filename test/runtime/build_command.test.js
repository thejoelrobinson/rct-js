// "The build mechanic works" gate — a game command writes the world.
//
// Track C (build & manage): proves the RCT game-command layer actually mutates
// the world tile-element array, isolated from the tool UI. Invokes the LAND
// set-height command directly through the painter-bridge interpreter
// (state.__painterCpu) and asserts the clicked tile's surface element changes.
//
// Dispatcher: FUN_00426f56 (jumptable PTR_LAB_005f49a0[ESI]); ESI = command
// index, EBX bit0 = APPLY. The atomic land write is command 1 (handler
// 0x4247e6): AX=tileX*32, CX=tileY*32, DL=new height [4..0x7c], DH=slope, ESI=1,
// EBX=1. It writes the surface element's byte2/byte3 (base height). Validation
// (0x425432) requires a land-owned tile (surface byte7 bit5) — else EBX returns
// 0x80000000. World addressing: tile-ptr table 0x971ef4, idx = tileX + tileY*128
// (128 columns), chain stride 8, last flag (byte1 & 0x80), surface = (byte0 &
// 0x3c)==0. (Found via a multi-agent investigation; see project memory.)

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

describe("game-command world-write (the build mechanic)", () => {
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

    const { createRuntime, skipFadeIn } = await import("../../runtime/harness.js");
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
    const dv = new DataView(dataBin.buffer, dataBin.byteOffset, dataBin.byteLength);
    for (let i = 0; i < 49; i++) {
      runtime.heap.setU32(0x005f49a0 + i * 4, dv.getUint32(0x005f49a0 + i * 4, true));
    }
    heap = runtime.heap;
    cpu = state.__painterCpu;
  }, 120_000);

  function surfaceElem(tx, ty) {
    const head = heap.u32(0x00971ef4 + (tx + ty * 128) * 4);
    if (head < 0x6e3b90 || head > 0x8dc08c) return 0;
    let p = head;
    while ((heap.u8(p + 1) & 0x80) === 0 && (heap.u8(p) & 0x3c) !== 0) p += 8;
    return (heap.u8(p) & 0x3c) === 0 ? p : 0;
  }

  it("LAND set-height (cmd 1) changes the surface element on an owned tile", () => {
    // Find an owned (byte7&0x20), flat (byte4&0x1f==0) surface tile with room to lower.
    let tx = -1, ty = -1, surf = 0;
    outer:
    for (let y = 0; y < 256; y++) for (let x = 0; x < 128; x++) {
      const p = surfaceElem(x, y);
      if (!p) continue;
      if ((heap.u8(p + 7) & 0x20) === 0) continue;     // not land-owned
      if ((heap.u8(p + 4) & 0x1f) !== 0) continue;     // not flat
      if (heap.u8(p + 3) < 8) continue;                // no room to lower
      tx = x; ty = y; surf = p; break outer;
    }
    expect(surf).toBeGreaterThan(0);

    const before = heap.u8(surf + 3);
    const newHeight = before - 4; // lower one step
    heap.setU8(0x005f4a6a, 0);
    heap.setU8(0x0099c169, 0);
    const setup = {
      eax: (tx * 32) & 0xffff, ecx: (ty * 32) & 0xffff,
      edx: newHeight >>> 0, ebx: 1, esi: 1, edi: 0, ebp: 0,
    };
    for (const k of ["eax", "ecx", "edx", "ebx", "esi", "edi", "ebp"]) {
      regs[k] = setup[k] >>> 0; cpu.regs[k] = setup[k] >>> 0;
    }
    cpu.eflags.CF = cpu.eflags.ZF = cpu.eflags.SF = cpu.eflags.OF = 0;
    cpu.fpuTop = 0; cpu.fpuTags = 0xffff; cpu.fpuSw = 0;
    runFunction(cpu, 0x426f56, { stackTop: heap.bytes.byteLength - 0x1000, limit: 50_000_000 });

    expect(cpu.regs.ebx >>> 0).toBe(0xc8);      // command success (not 0x80000000)
    expect(heap.u8(surf + 3)).toBe(newHeight);  // the world tile-element changed
  }, 60_000);
});
