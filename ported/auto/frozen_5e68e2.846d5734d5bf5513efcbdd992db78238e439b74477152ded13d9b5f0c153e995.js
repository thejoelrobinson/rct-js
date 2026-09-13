// Frozen replay body retained for the byte-exact legacy soak.
// @manual — do not regenerate.
// Source: decompiled/c/5e68e2.c
//
// Ghidra lost the CARRY-FLAG side-effect of this function. The x86 walks
// the window pool [0x9a013c .. [0x9a1164], stride 0x178) looking for the
// first window whose class byte ([slot+0x174]) is 0 (the main viewport
// window). It returns the caller's AX UNCHANGED in every case, but the
// flag it leaves differs and the caller (FUN_00429aff) branches on it:
//   - found a class-0 window  → 0x5e6902 `and ax,ax; ret` → CF = 0
//   - pool exhausted (none)   → 0x5e6900 `stc; ret`       → CF = 1
//
// FUN_00429aff does `call 5e68e2; jb 0x429b63` — it SKIPS its viewport-rect
// / max-coord setup block when CF=1 (no viewport window). The auto-translated
// port returned in_AX but never wrote regs.cf, so the caller read a stale
// carry and ran the block with the wrong AX (the viewport widget x2/y2 then
// got resolved to -1 instead of width-1/height-1, which broke the cursor
// hit-test 0x5e3874 over the viewport). Confirmed against the disassembly at
// 0x5e68e2-0x5e6905 (capstone): `and ax,ax` (0x6623c0) clears CF on the
// found path; `stc` (0xf9) sets it on the not-found path.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_005e68e2_frozen(heap) {
  let in_AX = regs.eax & 0xffff;
  let puVar1 = 0x009a013c >>> 0;
  while (true) {
    if (heap.u32(0x009a1164) <= puVar1) {
      // Pool exhausted — no class-0 (viewport) window. asm: `stc; ret`.
      regs.cf = 1;
      return in_AX;
    }
    if (heap.u8(puVar1 + 0x174) === 0) {
      // Found the viewport window. asm: `and ax,ax; ret` → CF = 0.
      regs.cf = 0;
      return in_AX;
    }
    puVar1 = (puVar1 + 0x178) >>> 0;
  }
}

