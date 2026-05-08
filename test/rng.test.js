import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { runOriginal } from "../harness/emulator.js";
import { prngStep, RNG_S0_ADDR, RNG_S1_ADDR } from "../src/rng.js";

const PRNG_ADDR = 0x005df40c;

describe("FUN_005df40c PRNG", () => {
  it("matches the original on a hand-picked seed", () => {
    const s0 = 0x12345678 >>> 0;
    const s1 = 0xdeadbeef >>> 0;

    // JS port
    const state = new Uint32Array([s0, s1]);
    const portRet = prngStep(state);

    // Emulator (ground truth)
    const emu = runOriginal({
      funcAddr: PRNG_ADDR,
      init: { mem32: { [RNG_S0_ADDR]: s0, [RNG_S1_ADDR]: s1 } },
      observe: [RNG_S0_ADDR, RNG_S1_ADDR],
    });

    expect(emu.regs.eax >>> 0).toBe(portRet >>> 0);
    expect(emu.mem32[`0x${RNG_S0_ADDR.toString(16)}`]).toBe(state[0]);
    expect(emu.mem32[`0x${RNG_S1_ADDR.toString(16)}`]).toBe(state[1]);
  });

  it("byte-equals the original across 1,000 random seed pairs", () => {
    fc.assert(
      fc.property(
        fc.tuple(fc.integer({ min: 0, max: 0xffffffff }), fc.integer({ min: 0, max: 0xffffffff })),
        ([s0_, s1_]) => {
          const s0 = s0_ >>> 0;
          const s1 = s1_ >>> 0;

          const state = new Uint32Array([s0, s1]);
          const portRet = prngStep(state);

          const emu = runOriginal({
            funcAddr: PRNG_ADDR,
            init: { mem32: { [RNG_S0_ADDR]: s0, [RNG_S1_ADDR]: s1 } },
            observe: [RNG_S0_ADDR, RNG_S1_ADDR],
          });

          return (
            (emu.regs.eax >>> 0) === (portRet >>> 0) &&
            emu.mem32[`0x${RNG_S0_ADDR.toString(16)}`] === state[0] &&
            emu.mem32[`0x${RNG_S1_ADDR.toString(16)}`] === state[1]
          );
        },
      ),
      { numRuns: 1000 },
    );
  });

  it("produces a long sequence (chained calls) matching the original", () => {
    let s0 = 0x01234567 >>> 0;
    let s1 = 0x89abcdef >>> 0;
    const port = new Uint32Array([s0, s1]);

    for (let i = 0; i < 100; i++) {
      const portRet = prngStep(port);
      const emu = runOriginal({
        funcAddr: PRNG_ADDR,
        init: { mem32: { [RNG_S0_ADDR]: s0, [RNG_S1_ADDR]: s1 } },
        observe: [RNG_S0_ADDR, RNG_S1_ADDR],
      });
      expect(emu.regs.eax >>> 0, `iter ${i}: eax`).toBe(portRet >>> 0);

      s0 = emu.mem32[`0x${RNG_S0_ADDR.toString(16)}`];
      s1 = emu.mem32[`0x${RNG_S1_ADDR.toString(16)}`];
      expect(port[0], `iter ${i}: s0`).toBe(s0);
      expect(port[1], `iter ${i}: s1`).toBe(s1);
    }
  });
});
