// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/433f8b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_00433f8b(heap) {
  let uVar1 = 0;
  let cVar2 = 0;
  let unaff_EBP = regs.ebp >>> 0;
  if (heap.u8(0x0099c164) != 0) {
    cVar2 = ((((heap.u16((unaff_EBP + 0x24))) << 24 >> 24)) & 0xff);
    if (cVar2 == 1) {
      uVar1 = ((heap.u32(0x0062891c) & 1) & 0xffff);
    } else {
      if (cVar2 == 2) {
      uVar1 = ((heap.u32(0x0062891c) & 2) & 0xffff);
    } else {
      if (cVar2 == 3) {
      uVar1 = ((heap.u32(0x0062891c) & 4) & 0xffff);
    } else {
      if (cVar2 == 4) {
      uVar1 = ((heap.u32(0x0062891c) & 8) & 0xffff);
    } else {
      if (cVar2 == 5) {
      uVar1 = ((heap.u32(0x0062891c) & 0x10) & 0xffff);
    } else {
      if (cVar2 == 6) {
      uVar1 = ((heap.u32(0x0062891c) & 0x20) & 0xffff);
    } else {
      if (cVar2 == NaN) {
      uVar1 = ((heap.u32(0x0062891c) & 0x40) & 0xffff);
    } else {
      if (cVar2 == 8) {
      uVar1 = ((heap.u32(0x0062891c) & 0x80) & 0xffff);
    } else {
      if (cVar2 == 9) {
      uVar1 = ((heap.u32(0x0062891c) & 0x100) & 0xffff);
    } else {
      if (cVar2 != 10) {
        return;
      }
      uVar1 = ((heap.u32(0x0062891c) & 0x200) & 0xffff);
    }
    }
    }
    }
    }
    }
    }
    }
    }
    if (uVar1 == 0) {
      heap.setU32(0x00628914, (heap.u32((unaff_EBP + 0x28))) >>> 0);
      heap.setU32(0x00628918, (heap.u32((unaff_EBP + 0x2c))) >>> 0);
      heap.setU32(0x00628910, (heap.u16((unaff_EBP + 0x24))) >>> 0);
    }
  }
  return;
}
