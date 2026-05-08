// diff-test — validates a ported JS function against the x86 interpreter on the
// same input. The interpreter is the oracle (it executes the original binary
// bytes); the ported function is what we just translated from Ghidra C.
//
// Usage from a Vitest test:
//   import { diffTest } from "../tools/diff-test.js";
//   diffTest({
//     funcAddr: 0x5df40c,
//     observe: [0x6e3b88, 0x6e3b8c],
//     setup: ({ mem32 }) => { mem32[0x6e3b88] = s0; mem32[0x6e3b8c] = s1; },
//     port: (heap) => FUN_005df40c(heap),
//   })
//
// The helper:
//   1. Loads the binary into memory (via runOriginal's path).
//   2. Applies caller's setup (initial register/memory state).
//   3. Runs the interpreter from funcAddr; captures register + observed memory.
//   4. Re-loads the binary into a fresh Uint8Array, applies the same setup, runs
//      caller's port against a Heap wrapping that buffer.
//   5. Returns { matches, interpreter, ported } so the caller can assert.

import { Heap } from "../runtime/heap.js";
import { runOriginal } from "../harness/emulator.js";
import { loadPE } from "../harness/loader-node.js";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const RCT_EXE = resolve(HERE, "../binary/rct.exe");

let _cachedImage = null;
function getImage() {
  if (!_cachedImage) _cachedImage = loadPE(RCT_EXE);
  return _cachedImage;
}

/**
 * @param {object} opts
 * @param {number} opts.funcAddr           - the binary RVA to invoke
 * @param {number[]} opts.observe          - addresses to read back as 32-bit values
 * @param {object} [opts.regs]             - initial register state
 * @param {object} [opts.mem32]            - initial mem writes (address -> u32)
 * @param {(heap: Heap) => void} opts.port - the ported JS function
 */
export function diffTest(opts) {
  const { funcAddr, observe = [], regs = {}, mem32 = {}, port } = opts;

  // 1. Interpreter side — runOriginal handles the heavy lifting.
  const emu = runOriginal({
    funcAddr,
    init: { regs, mem32 },
    observe,
  });

  // 2. Ported side — fresh PE-loaded buffer, apply same mem writes, run port.
  const image = getImage();
  const stackSize = 0x10000;
  const buf = new Uint8Array(image.totalSize + stackSize);
  buf.set(image.memory, 0);
  const heap = new Heap(buf);
  for (const [addr, value] of Object.entries(mem32)) {
    heap.setU32(Number(addr), value >>> 0);
  }
  port(heap);

  // 3. Compare observed memory.
  const interpreterMem = {};
  const portedMem = {};
  for (const addr of observe) {
    const key = `0x${addr.toString(16)}`;
    interpreterMem[key] = emu.mem32[key];
    portedMem[key] = heap.u32(addr);
  }

  return {
    interpreter: { regs: emu.regs, mem: interpreterMem, steps: emu.steps },
    ported: { mem: portedMem },
    matches: observe.every(addr => {
      const k = `0x${addr.toString(16)}`;
      return interpreterMem[k] === portedMem[k];
    }),
  };
}
