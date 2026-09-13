// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45aaf8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0045aaf8(heap) {
  // 0x45aaf8: mov WORD [0x6e3b80], 0   — the in-game MONTH
  // 0x45ab01: mov WORD [0x6e3b82], 0   — the in-game DAY-progress counter
  // 0x45ab0a: mov DWORD [0x88741c], 0  — the sim tick counter (correctly 32-bit)
  // The two date fields are adjacent WORDS, so a 32-bit store to 0x6e3b80 also
  // wipes 0x6e3b82, and a 32-bit store to 0x6e3b82 runs into the tick counter
  // at 0x6e3b84. See FUN_0045ab15 for how the pair advances.
  heap.setU16(0x006e3b80, 0);
  heap.setU16(0x006e3b82, 0);
  heap.setU32(0x0088741c, (0) >>> 0);
  return;
}
