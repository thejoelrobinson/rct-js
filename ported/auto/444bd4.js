// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444bd4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00444c74 } from "./444c74.js";
export function FUN_00444bd4(heap) {
  let uVar1 = 0;
  let unaff_BL = regs.ebx & 0xff;
  let uVar2 = 0;
  let iVar3 = 0;
  if ((unaff_BL & 2) == 0) {
    if (heap.u32(0x0087c3a0) < 1) {
      return;
    }
  } else {
    if (heap.u32(0x0087c3a0) <= (((300 - heap.u32(0x0087c3a6))) << 16 >> 16)) {
    return;
  }
  }
  uVar2 = ((heap.u32(0x0087c394)) >>> 0);
  iVar3 = ((uVar2 * 0x100) >>> 0);
  (regs.eax = FUN_00444c74(heap));
  heap.setU32(((0x00743ba2) + (uVar2 * 0x80) * 4), (0x8000) & 0xffffffff);
  heap.setU32(((0x00743ba4) + (uVar2 * 0x80) * 4), (0x8000) & 0xffffffff);
  heap.setU32(((0x00743ba6) + (uVar2 * 0x80) * 4), (0) & 0xffffffff);
  LOCK();
  UNLOCK();
  uVar1 = ((heap.u32((0x00743b9e) + (uVar2 * 0x80) * 4)) & 0xffff);
  heap.setU32(((0x00743b96) + (uVar2 * 0x80) * 4), (heap.u32(0x00999f8e)) & 0xffffffff);
  heap.setU32(0x00999f8e, (uVar1) >>> 0);
  heap.setU16((0x00743bb6 + iVar3), (0) & 0xffff);
  heap.setU32(((0x00743ba8) + (iVar3) * 4), (0x10) & 0xffffffff);
  heap.setU32(((0x00743b9d) + (iVar3) * 4), (0x14) & 0xffffffff);
  heap.setU32(((0x00743ba9) + (iVar3) * 4), (8) & 0xffffffff);
  heap.setU16((0x00743ba0 + iVar3), (0) & 0xffff);
  heap.setU16((0x00743baa + iVar3), (0x8000) & 0xffff);
  return;
}
