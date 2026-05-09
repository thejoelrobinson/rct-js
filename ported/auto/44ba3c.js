// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44ba3c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_0044ba3c(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let unaff_ESI = regs.esi >>> 0;
  uVar1 = ((0) >>> 0);
  uVar2 = ((heap.u32(((0x00887420) >>> 0) + (heap.u32((unaff_ESI + 0x30)) * 0x260) * 4)) >>> 0);
  if ((heap.u32((0x005f5b78 + uVar2 * 8)) & 0x200) == 0) {
    uVar1 = ((0x200) >>> 0);
  }
  if ((heap.u32((0x005f5b78 + uVar2 * 8)) & 0x2000) != 0) {
    uVar1 = ((uVar1 | 0x20) >>> 0);
  }
  if ((heap.u32((0x005f5b78 + uVar2 * 8)) & 0x4000007) == 0) {
    uVar1 = ((uVar1 | 0x80) >>> 0);
  }
  if ((heap.u32((0x005f5b78 + uVar2 * 8)) & 0x20000) != 0) {
    uVar1 = ((uVar1 | 0x140) >>> 0);
  }
  heap.setU32((unaff_ESI + 0x10), (uVar1) & 0xffffffff);
  return;
}
