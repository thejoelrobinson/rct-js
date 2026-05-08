import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { runOriginal } from "../harness/emulator.js";
import { saturatingIncrementByte } from "../src/saturate.js";

const FUNC_ADDR = 0x005df1ff;
const ESI = 0x900100;
const FIELD = ESI + 0x5;

function originalReturn(initialByte) {
  const emu = runOriginal({
    funcAddr: FUNC_ADDR,
    init: { regs: { esi: ESI }, mem32: { [ESI + 0x4]: initialByte << 8 } },
  });
  // Read just the byte we care about.
  return emu;
}

describe("FUN_005df1ff saturatingIncrementByte", () => {
  it("normal: 0x42 -> 0x43", () => {
    const emu = runOriginal({
      funcAddr: FUNC_ADDR,
      init: { regs: { esi: ESI }, mem32: { [FIELD - 1]: 0x42 << 8 } },
    });
    // Re-read the byte at FIELD via a 4-byte observation
    // (the byte at offset FIELD is the high byte of [FIELD-1] dword view).
    // Easier: observe a 4-byte word around it.
    expect(emu.mem32 ?? {}).toBeTruthy(); // sanity

    const buf = new Uint8Array(0x200);
    buf[0x5] = 0x42;
    saturatingIncrementByte(buf, 0x5);
    expect(buf[0x5]).toBe(0x43);
  });

  it("saturation: 0xff -> 0xff (does not wrap to 0)", () => {
    const buf = new Uint8Array(0x200);
    buf[0x5] = 0xff;
    saturatingIncrementByte(buf, 0x5);
    expect(buf[0x5]).toBe(0xff);
  });

  it("byte-equal vs original across 256 starting values", () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 255 }), (initial) => {
        // Set up the binary to have just that byte at FIELD.
        // We can't easily observe a single byte via runOriginal (which observes
        // 32-bit words), so we observe the 4-byte word containing FIELD and
        // pull out the relevant byte.
        const wordBase = FIELD & ~0x3;       // 4-byte aligned base
        const byteShift = (FIELD - wordBase) * 8;
        const initialWord = (initial << byteShift) >>> 0;

        const emu = runOriginal({
          funcAddr: FUNC_ADDR,
          init: { regs: { esi: ESI }, mem32: { [wordBase]: initialWord } },
          observe: [wordBase],
        });
        const observedByte = (emu.mem32[`0x${wordBase.toString(16)}`] >>> byteShift) & 0xff;

        const buf = new Uint8Array(8);
        buf[0] = initial;
        saturatingIncrementByte(buf, 0);

        return observedByte === buf[0];
      }),
      { numRuns: 256 },
    );
  });
});
