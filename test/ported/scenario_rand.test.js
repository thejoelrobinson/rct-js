// Differential test for ported FUN_005df40c (RCT1 scenario PRNG).
//
// This is the FIRST test of the new pipeline (Ghidra C → JS). The ported
// function lives at ported/scenario_rand.js; the interpreter is the oracle.
// We verify byte-equivalence over many random initial states.

import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { diffTest } from "../../tools/diff-test.js";
import { FUN_005df40c, RNG_S0_ADDR, RNG_S1_ADDR } from "../../ported/scenario_rand.js";

const PRNG_ADDR = 0x005df40c;

describe("ported FUN_005df40c (PRNG) — pipeline diff-test", () => {
  it("matches interpreter on a hand-picked seed", () => {
    const result = diffTest({
      funcAddr: PRNG_ADDR,
      observe: [RNG_S0_ADDR, RNG_S1_ADDR],
      mem32: { [RNG_S0_ADDR]: 0x12345678, [RNG_S1_ADDR]: 0xdeadbeef },
      port: (heap) => FUN_005df40c(heap),
    });
    expect(result.matches).toBe(true);
  });

  it("byte-equals across 500 random seeds", () => {
    fc.assert(
      fc.property(
        fc.tuple(fc.integer({ min: 0, max: 0xffffffff }), fc.integer({ min: 0, max: 0xffffffff })),
        ([s0, s1]) => {
          const result = diffTest({
            funcAddr: PRNG_ADDR,
            observe: [RNG_S0_ADDR, RNG_S1_ADDR],
            mem32: { [RNG_S0_ADDR]: s0 >>> 0, [RNG_S1_ADDR]: s1 >>> 0 },
            port: (heap) => FUN_005df40c(heap),
          });
          return result.matches;
        },
      ),
      { numRuns: 500 },
    );
  });
});
