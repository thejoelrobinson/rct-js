// Verification step from the plan: introduce a deliberate bug in a port and
// confirm the diff output points at the wrong register/memory location.

import { describe, it, expect } from "vitest";
import { runOriginal } from "../harness/emulator.js";
import { diffStates } from "../harness/diff.js";
import { RNG_S0_ADDR, RNG_S1_ADDR } from "../src/rng.js";

const PRNG_ADDR = 0x005df40c;

// Deliberately wrong PRNG: rotates by 8 instead of 7. Used to verify the diff
// output is informative when a port disagrees with ground truth.
function buggyPrng(state) {
  const ror = (x, n) => ((x >>> n) | (x << (32 - n))) >>> 0;
  const oldS0 = state[0] >>> 0;
  const mixedS1 = ror(((state[1] ^ 0x1234567f) >>> 0), 8); // BUG: should be 7
  state[0] = (oldS0 + mixedS1) >>> 0;
  state[1] = ror(oldS0, 3);
  return state[1];
}

describe("diff utility", () => {
  it("flags the differing eax+memory when the port has a bug", () => {
    const s0 = 0x12345678 >>> 0;
    const s1 = 0xdeadbeef >>> 0;

    const state = new Uint32Array([s0, s1]);
    const portRet = buggyPrng(state);
    const portState = {
      regs: { eax: portRet },
      mem32: {
        [`0x${RNG_S0_ADDR.toString(16)}`]: state[0],
        [`0x${RNG_S1_ADDR.toString(16)}`]: state[1],
      },
    };

    const orig = runOriginal({
      funcAddr: PRNG_ADDR,
      init: { mem32: { [RNG_S0_ADDR]: s0, [RNG_S1_ADDR]: s1 } },
      observe: [RNG_S0_ADDR, RNG_S1_ADDR],
    });

    const out = diffStates(portState, orig);
    expect(out).toContain("DIFF:");
    // The bug only changes the rotation of mixed_s1, which affects state[0].
    // eax (= ROR(old_s0, 3)) is independent of the bug, so memory is the giveaway.
    expect(out).toContain(`0x${RNG_S0_ADDR.toString(16)}`);
  });

  it("reports match when the correct port runs", async () => {
    const { prngStep } = await import("../src/rng.js");
    const s0 = 0x12345678 >>> 0;
    const s1 = 0xdeadbeef >>> 0;
    const state = new Uint32Array([s0, s1]);
    const portRet = prngStep(state);
    const portState = {
      regs: { eax: portRet },
      mem32: {
        [`0x${RNG_S0_ADDR.toString(16)}`]: state[0],
        [`0x${RNG_S1_ADDR.toString(16)}`]: state[1],
      },
    };
    const orig = runOriginal({
      funcAddr: PRNG_ADDR,
      init: { mem32: { [RNG_S0_ADDR]: s0, [RNG_S1_ADDR]: s1 } },
      observe: [RNG_S0_ADDR, RNG_S1_ADDR],
    });
    expect(diffStates(portState, orig)).toBe("(states match)");
  });
});
