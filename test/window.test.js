import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { runOriginal } from "../harness/emulator.js";
import { isHandleSet, HANDLE_GLOBAL_ADDR } from "../src/window.js";

const FUNC_ADDR = 0x00403a92;

describe("FUN_00403a92 isHandleSet", () => {
  it("returns 0 when global is 0", () => {
    const emu = runOriginal({
      funcAddr: FUNC_ADDR,
      init: { mem32: { [HANDLE_GLOBAL_ADDR]: 0 } },
    });
    expect(emu.regs.eax).toBe(0);
    expect(isHandleSet(0)).toBe(0);
  });

  it("returns 1 when global is non-zero", () => {
    const emu = runOriginal({
      funcAddr: FUNC_ADDR,
      init: { mem32: { [HANDLE_GLOBAL_ADDR]: 0xdeadbeef } },
    });
    expect(emu.regs.eax).toBe(1);
    expect(isHandleSet(0xdeadbeef)).toBe(1);
  });

  it("matches original across 200 random global values", () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 0xffffffff }), (v_) => {
        const v = v_ >>> 0;
        const emu = runOriginal({
          funcAddr: FUNC_ADDR,
          init: { mem32: { [HANDLE_GLOBAL_ADDR]: v } },
        });
        return emu.regs.eax === isHandleSet(v);
      }),
      { numRuns: 200 },
    );
  });
});
