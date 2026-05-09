// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43670c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0043657e } from "./43657e.js";
export function FUN_0043670c(heap) {
  let uVar1 = 0;
  let extraout_CX = 0;
  let unaff_BL = regs.ebx & 0xff;
  let unaff_BH = (regs.ebx >>> 8) & 0xff;
  let puVar2 = 0;
  let puVar3 = 0;
  LAB_00436759: {
  uVar1 = (((regs.eax = FUN_0043657e(heap))) & 0xffff);
  uVar1 = ((extraout_CX << 7 | extraout_CX >>> 9 | uVar1) & 0xffff);
  LOCK();
  puVar2 = ((heap.u32((0x00971ef4) + (((uVar1 >>> 5 | uVar1 << 0xb) & 0xffff)) * 4)) >>> 0);
  heap.setU32(((0x00971ef4) + (((uVar1 >>> 5 | uVar1 << 0xb) & 0xffff)) * 4), (heap.u32(0x00981ef4)) & 0xffffffff);
  UNLOCK();
  do {
    puVar3 = ((heap.u32(0x00981ef4)) >>> 0);
    heap.setU32(0x00981ef4, (puVar3) >>> 0);
    if (unaff_BL < heap.u8((((puVar2) >>> 0) + 2))) {
      break LAB_00436759;
    }
    heap.setU32(puVar3, (heap.u32(puVar2)) & 0xffffffff);
    heap.setU32((puVar3 + (1) * 4), (heap.u32(puVar2 + (1) * 4)) & 0xffffffff);
    heap.setU8(puVar2, (0xff) & 0xff);
    heap.setU32(0x00981ef4, (puVar3 + ((2) * 4)) >>> 0);
    puVar2 = ((puVar2 + ((2) * 4)) >>> 0);
  } while ((heap.u8((((puVar3) >>> 0) + 1)) & 0x80) == 0);
  unaff_BH = ((unaff_BH | 0x80) & 0xff);
  heap.setU8((((puVar3) >>> 0) + 1), (heap.u8((((puVar3) >>> 0) + 1)) & 0x7f) & 0xff);
  }
  heap.setU8((((heap.u32(0x00981ef4)) >>> 0) + 2), (unaff_BL) & 0xff);
  heap.setU8((((heap.u32(0x00981ef4)) >>> 0) + 1), (unaff_BH) & 0xff);
  heap.setU8((((heap.u32(0x00981ef4)) >>> 0) + 3), (unaff_BL) & 0xff);
  heap.setU32((heap.u32(0x00981ef4) + (1) * 4), (0) & 0xffffffff);
  while (puVar3 = ((heap.u32(0x00981ef4) + 2) >>> 0), (unaff_BH & 0x80) == 0) {
    heap.setU32(puVar3, (heap.u32(puVar2)) & 0xffffffff);
    heap.setU32((heap.u32(0x00981ef4) + (3) * 4), (heap.u32(puVar2 + (1) * 4)) & 0xffffffff);
    heap.setU8(puVar2, (0xff) & 0xff);
    puVar2 = ((puVar2 + ((2) * 4)) >>> 0);
    unaff_BH = ((heap.u8((((heap.u32(0x00981ef4)) >>> 0) + 9))) & 0xff);
    heap.setU32(0x00981ef4, (puVar3) >>> 0);
  }
  heap.setU32(0x00981ef4, (puVar3) >>> 0);
  return;
}
