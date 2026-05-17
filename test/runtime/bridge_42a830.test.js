// Bridge test for FUN_0042a830 — the toolbar window's widget-event-handler
// proc. The function lives in CODESEG (zeroed in decompiled/data.bin, present
// only in binary/rct.exe), so it can't be ported through the normal Ghidra/
// translator pipeline. Instead we register it in lifter/extra-entries.json
// and let runtime/painter-bridge.js install an x86-interpreter shim against
// state.fnDispatch.
//
// What this test verifies (end-to-end via the bridge):
//   1. After createRuntime(), state.fnDispatch.has(0x42a830) is true and the
//      entry is a function — i.e. the bridge picked up the extras entry.
//   2. Invoking the bridge with the register-state that FUN_005e3ace's hit-
//      test would set (BP = event-type, DX = widget-index, ESI = slot ptr,
//      EDI = widget ptr) routes through the binary's own dispatch:
//        0x42a830 → jmp 0x42af5a  (BP=1 → 0x42a835)
//        0x42a835 → dx==0 (pause) → 0x42b083
//        0x42b083 → sets ESI=2, EBX=1, calls 0x426f56 (game-cmd dispatch)
//        0x426f56 → PTR_LAB_005f49a0[ESI*4] → 0x427247
//        0x427247 → XOR DAT_0099c169 (pause flag)
//   3. A second click toggles the flag back off — confirming the dispatch
//      is deterministic and not just clobbering memory.
//
// Pre-existing bug worked around: something during the first runTick() zeroes
// PTR_LAB_005f49a0 (the game-cmd jumptable in DATASEG, intact in data.bin
// but wiped by some interpreter shim during the first tick — not caused by
// this bridge). We repair it from the raw data.bin bytes before invoking the
// bridge so the indirect call inside 0x426f56 lands on the right target.
// See .claude/scratch/agent-42a830-findings.md for the chase.

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

describe("FUN_0042a830 bridge (toolbar widget-event-handler proc)", () => {
  let runtime, state, regs, dataBin;

  beforeAll(async () => {
    globalThis._renderTrace = () => {};
    const { createRuntime, skipFadeIn } = await import("../../runtime/harness.js");
    const ctx = await import("../../runtime/win32/context.js");
    state = ctx.state;
    const r = await import("../../runtime/regs.js");
    regs = r.regs;

    dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
    const vfs = new Map();
    for (const n of VFS_FILES) {
      try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); }
      catch (_) { /* placeholder */ }
    }
    for (const n of VFS_PLACEHOLDERS) vfs.set(n.toLowerCase(), new Uint8Array(0));

    runtime = createRuntime({ dataBin, vfs });
    runtime.runInit();
    runtime.runTick();
    skipFadeIn(runtime.heap);
  }, 120_000);

  function ensureToolbarSlot() {
    const POOL_START = 0x009a013c;
    const POOL_END_PTR = 0x009a1164;
    const SLOT_STRIDE = 0x178;
    let poolEnd = runtime.heap.u32(POOL_END_PTR);
    if (poolEnd < POOL_START) poolEnd = POOL_START;
    for (let s = POOL_START; s < poolEnd; s += SLOT_STRIDE) {
      if (runtime.heap.u32(s) === 0x42afb5) return s;
    }
    const slot = poolEnd;
    runtime.heap.setU32(slot, 0x42afb5);
    runtime.heap.setU32(slot + 4, 0x42a830);
    runtime.heap.setU32(slot + 0x1c, 0x005f5124);
    runtime.heap.setI16(slot + 0x20, 0);
    runtime.heap.setI16(slot + 0x22, 0);
    runtime.heap.setI16(slot + 0x24, 640);
    runtime.heap.setI16(slot + 0x26, 30);
    runtime.heap.setU32(POOL_END_PTR, slot + SLOT_STRIDE);
    return slot;
  }

  // Repair PTR_LAB_005f49a0 (the game-cmd jumptable) from data.bin. Some
  // interpreter shim during the first tick zeroes 0x5f49a0..0x5f49e0; the
  // raw bytes in data.bin remain correct. Without this, the indirect call
  // inside 0x426f56 dereferences null and the chain breaks before the
  // per-cmd handler (e.g. 0x427247 / pause) runs.
  function repairGameCmdTable() {
    const dv = new DataView(dataBin.buffer, dataBin.byteOffset, dataBin.byteLength);
    for (let i = 0; i < 16; i++) {
      const v = dv.getUint32(0x005f49a0 + i * 4, true);
      runtime.heap.setU32(0x005f49a0 + i * 4, v);
    }
  }

  // Match the calling convention FUN_005e3ace would use when it dispatches
  // through slot+4: ESI=slot, EDI=widget ptr, EBP=event type, EDX=widget idx.
  function invokeBridge({ slot, widgetIdx, eventType }) {
    regs.eax = 0; regs.ecx = 0;
    regs.edx = widgetIdx;
    regs.ebx = 0;
    regs.esi = slot;
    regs.edi = 0x005f5124 + widgetIdx * 0x10; // widget table base + stride*idx
    regs.ebp = eventType;
    const fn = state.fnDispatch.get(0x42a830);
    return fn(runtime.heap, regs.edi, slot, eventType, 0, 0, 0, 0);
  }

  it("painter-bridge registers 0x42a830 in state.fnDispatch", () => {
    expect(state.fnDispatch.has(0x42a830)).toBe(true);
    expect(typeof state.fnDispatch.get(0x42a830)).toBe("function");
  });

  it("bridge invocation with bp=1 dx=0 advances the game-cmd queue depth", () => {
    // Even without the PTR table repair, the path 0x42a830 → 0x42b083 →
    // 0x426f56 increments DAT_005f4a6a (cmd depth) and latches EBX into
    // DAT_005f4a68 before the (potentially-null) PTR_LAB_005f49a0[ESI]
    // indirect. Verifying these side effects proves the bridge successfully
    // executed binary code through the dispatch chain.
    ensureToolbarSlot();
    const slot = ensureToolbarSlot();
    runtime.heap.setU8(0x005f4a6a, 0);
    runtime.heap.setU16(0x005f4a68, 0);
    invokeBridge({ slot, widgetIdx: 0, eventType: 1 });
    expect(runtime.heap.u8(0x005f4a6a)).toBeGreaterThan(0); // cmd depth advanced
    expect(runtime.heap.u16(0x005f4a68)).toBe(1);           // EBX & 0xffff latched
  }, 60_000);

  it("bridge with bp=1 dx=0 toggles DAT_0099c169 (pause flag) via binary path", () => {
    // Full end-to-end: with the PTR_LAB_005f49a0 table repaired, the call
    // through 0x426f56 reaches 0x427247 which XORs the pause flag.
    const slot = ensureToolbarSlot();
    repairGameCmdTable();
    runtime.heap.setU8(0x0099c169, 0);
    invokeBridge({ slot, widgetIdx: 0, eventType: 1 });
    expect(runtime.heap.u8(0x0099c169) & 1).toBe(1);
  }, 60_000);

  it("second bridge click toggles the pause flag back to 0", () => {
    const slot = ensureToolbarSlot();
    repairGameCmdTable();
    runtime.heap.setU8(0x0099c169, 1);
    invokeBridge({ slot, widgetIdx: 0, eventType: 1 });
    expect(runtime.heap.u8(0x0099c169) & 1).toBe(0);
  }, 60_000);
});
