import { describe, it, expect } from "vitest";
import { runOriginal } from "../harness/emulator.js";
import { clearFieldCC } from "../src/struct_field.js";

const FUNC_ADDR = 0x00441891;

// Pick an "esi" address that lives safely in unused image space.
// 0x900000 is past CodeSeg/DataSeg but still inside the 0x9c4000 image envelope.
const ESI = 0x900000;

describe("FUN_00441891 clearFieldCC", () => {
  it("writes 0xFFFFFFFF to [esi + 0xcc]", () => {
    const emu = runOriginal({
      funcAddr: FUNC_ADDR,
      init: { regs: { esi: ESI } },
      observe: [ESI + 0xcc],
    });
    expect(emu.mem32[`0x${(ESI + 0xcc).toString(16)}`]).toBe(0xffffffff);

    // Mirror in JS port
    const buf = new Uint8Array(0x200);
    clearFieldCC(buf, 0);
    expect(buf[0xcc]).toBe(0xff);
    expect(buf[0xcd]).toBe(0xff);
    expect(buf[0xce]).toBe(0xff);
    expect(buf[0xcf]).toBe(0xff);
  });
});
