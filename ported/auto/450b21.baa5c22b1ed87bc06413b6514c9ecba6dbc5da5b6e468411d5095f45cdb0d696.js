// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/450b21.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00450b21(heap) {
  let bVar1 = 0;
  let in_DL = regs.edx & 0xff;
  LOCK();
  bVar1 = ((heap.u32((0x008874a4) + (((in_DL) >>> 0) * 0x260) * 4)) & 0xff);
  heap.setU32(((0x008874a4) + (((in_DL) >>> 0) * 0x260) * 4), (0xff) & 0xffffffff);
  UNLOCK();
  if (bVar1 != 0xff) {
    heap.setU32(((0x008ae9c4) + (((bVar1) >>> 0) * 0x4b0c) * 4), (0xff) & 0xffffffff);
  }
  return;
}
