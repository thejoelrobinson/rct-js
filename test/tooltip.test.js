import { describe, it, expect } from "vitest";
import { runOriginal } from "../harness/emulator.js";
import { TOOLTIP_GLOBAL_ADDR, clearTooltipGlobal } from "../src/tooltip.js";

const FUNC_ADDR = 0x004269d0;

describe("FUN_004269d0 clearTooltipGlobal (exercises 0x66 prefix on 0xc7)", () => {
  it("zeros the 16-bit global, regardless of starting value", () => {
    // Word-aligned access. Pre-set the surrounding 4-byte word so we can prove
    // only the low 16 bits get cleared (high 16 bits should be untouched).
    const wordBase = TOOLTIP_GLOBAL_ADDR & ~0x3;            // 0x87c3ac is already 4-byte aligned
    const before = 0xdeadbeef;
    const emu = runOriginal({
      funcAddr: FUNC_ADDR,
      init: { mem32: { [wordBase]: before } },
      observe: [wordBase],
    });
    const after = emu.mem32[`0x${wordBase.toString(16)}`];
    // Low 16 bits cleared, high 16 bits preserved (since wordBase == TOOLTIP addr).
    expect(after).toBe((before & 0xffff0000) >>> 0);

    // JS port matches.
    const buf = new Uint8Array(0x100);
    const fakeBase = TOOLTIP_GLOBAL_ADDR;
    const view = new Uint8Array(0x900000);
    view[fakeBase]     = 0xef;
    view[fakeBase + 1] = 0xbe;
    view[fakeBase + 2] = 0xad;
    view[fakeBase + 3] = 0xde;
    clearTooltipGlobal(view);
    const portWord =
      (view[fakeBase])       |
      (view[fakeBase + 1] << 8) |
      (view[fakeBase + 2] << 16) |
      (view[fakeBase + 3] << 24);
    expect((portWord >>> 0) & 0xffff).toBe(0);
    expect((portWord >>> 0) >>> 16).toBe(0xdead);
  });
});
