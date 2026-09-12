// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43725f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0043725f(heap) {
  let bVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  bVar1 = ((heap.u8(unaff_ESI) & 0x3c) & 0xff);
  if (bVar1 == 0) {
    heap.setU32(0x00991efc, (0x3b7) >>> 0);
  } else {
    if (bVar1 == 8) {
    heap.setU16((0x00971e86 + 0), (heap.u32(((0x00887420) & 0xff) + (((heap.u8(unaff_ESI + (7))) >>> 0) * 0x260) * 4) + 0x101) & 0xffff);
    heap.setU32(0x00991efc, (0x5a4) >>> 0);
  } else {
    if (bVar1 == 0xc) {
    heap.setU16((0x00971e86 + 0), (heap.i16((0x006e1ecc + ((heap.u8(unaff_ESI + (4))) >>> 0) * 8))) & 0xffff);
    heap.setU32(0x00991efc, (0x5a4) >>> 0);
  } else {
    if (bVar1 == 4) {
    heap.setU32(0x00991efc, (0x4db) >>> 0);
  } else {
    if (bVar1 == 0x10) {
    bVar1 = ((heap.u8(unaff_ESI + (4))) & 0xff);
    if (bVar1 == 0) {
      heap.setU32(0x00991efc, (0x3b8) >>> 0);
    } else {
      if (bVar1 == 1) {
      heap.setU32(0x00991efc, (0x3b9) >>> 0);
    } else {
      if (bVar1 == 2) {
      heap.setU32(0x00991efc, (0x3ba) >>> 0);
    } else {
      heap.setU32(0x00991efc, (0x38a) >>> 0);
    }
    }
    }
  } else {
    if (bVar1 == 0x18) {
    heap.setU16((0x00971e86 + 0), ((heap.u16((unaff_ESI + 4)) & 0x3ff) + 0x7de) & 0xffff);
    heap.setU32(0x00991efc, (0x5a4) >>> 0);
  } else {
    heap.setU32(0x00991efc, (0x38a) >>> 0);
  }
  }
  }
  }
  }
  }
  return 1;
}
