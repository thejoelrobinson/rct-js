// FUN_005df40c — RCT1 scenario PRNG.
//
// Mechanically translated from Ghidra's decompilation at decompiled/c/5df40c.c:
//
//   void FUN_005df40c(void) {
//     uint uVar1 = DAT_006e3b88;
//     DAT_006e3b88 = DAT_006e3b88 +
//       ((DAT_006e3b8c ^ 0x1234567f) >> 7 | (DAT_006e3b8c ^ 0x1234567f) << 0x19);
//     DAT_006e3b8c = uVar1 >> 3 | uVar1 << 0x1d;
//   }
//
// Notes on translation choices:
//   - DAT_006e3b88 / DAT_006e3b8c become heap reads/writes against shared memory.
//   - C's `>>` on a `uint` is a logical shift; we use `>>>` (unsigned).
//   - Each addition / shift is wrapped in `>>> 0` to maintain 32-bit unsigned
//     semantics under JS's double-precision arithmetic.
//   - Function returns void per Ghidra; the binary's caller actually reads `eax`,
//     which holds the new DAT_006e3b88. Ghidra elided the return — we reproduce
//     the side effects faithfully and the diff-test confirms eax matches.

export const RNG_S0_ADDR = 0x006e3b88;
export const RNG_S1_ADDR = 0x006e3b8c;

/**
 * @param {import("../runtime/heap.js").Heap} heap
 */
export function FUN_005df40c(heap) {
  const uVar1 = heap.u32(RNG_S0_ADDR);
  const cur8c = heap.u32(RNG_S1_ADDR);
  const xored = (cur8c ^ 0x1234567f) >>> 0;
  const rotated = ((xored >>> 7) | (xored << 0x19)) >>> 0;
  heap.setU32(RNG_S0_ADDR, (uVar1 + rotated) >>> 0);
  heap.setU32(RNG_S1_ADDR, ((uVar1 >>> 3) | (uVar1 << 0x1d)) >>> 0);
}
