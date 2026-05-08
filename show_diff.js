// Manual demo: show what the diff output looks like when a port has a bug.
import { runOriginal } from "./harness/emulator.js";
import { diffStates } from "./harness/diff.js";
import { RNG_S0_ADDR, RNG_S1_ADDR } from "./src/rng.js";

const ror = (x, n) => ((x >>> n) | (x << (32 - n))) >>> 0;

// Buggy port: rotates by 8 instead of 7
function buggyPrng(state) {
  const oldS0 = state[0] >>> 0;
  const mixedS1 = ror(((state[1] ^ 0x1234567f) >>> 0), 8);
  state[0] = (oldS0 + mixedS1) >>> 0;
  state[1] = ror(oldS0, 3);
  return state[1];
}

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
  funcAddr: 0x005df40c,
  init: { mem32: { [RNG_S0_ADDR]: s0, [RNG_S1_ADDR]: s1 } },
  observe: [RNG_S0_ADDR, RNG_S1_ADDR],
});

console.log(diffStates(portState, orig));
