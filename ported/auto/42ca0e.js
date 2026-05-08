// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42ca0e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_004046fc } from "./4046fc.js";
import { FUN_0042cb29 } from "./42cb29.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_0042ca0e(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let sVar3 = 0;
  let unaff_EBX = 0;
  FUN_004046fc(heap);
  if (heap.u32(0x005f1394) == heap.u32(0x0099a504)) {
    if ((heap.u32(0x005f1ca4) == heap.u32(0x0099a502)) || ((heap.u32(0x005f1ca4) + -1) == heap.u32(0x0099a502))) {
      /* goto LAB_0042ca6f */ throw new Error("goto LAB_0042ca6f not supported");
    }
  } else {
    sVar3 = heap.u32(0x005f1394) + -1;
    if (sVar3 == 0) {
      sVar3 = 0xc;
    }
    if ((sVar3 == heap.u32(0x0099a504)) && (heap.u32(0x005f1ca4) == 1)) {
      /* goto LAB_0042ca6f */ throw new Error("goto LAB_0042ca6f not supported");
    }
  }
  heap.setU32(0x0087c3b4, (heap.u32(0x0087c3b4) + -10000) >>> 0);
  if (-1 < heap.u32(0x0087c3b4)) {
    heap.setU32(0x0087c3b4, (-heap.u32(0x0087c3b4)) >>> 0);
  }
  LAB_0042ca6f: heap.setU32(0x0099a502, (heap.u32(0x005f1ca4)) >>> 0);
  heap.setU32(0x0099a504, (heap.u32(0x005f1394)) >>> 0);
  if (heap.u32(0x008d7eb8) != '\0') {
    uVar2 = FUN_005e5301(heap);
    heap.setU32(0x008d7ebe, (heap.u32(0x008d7ebe) + 1) >>> 0);
    if ((heap.u32(0x008d7ebe) == 1) && ((heap.u32(0x0099a500) & 1) == 0)) {
      FUN_00452fce(heap, unaff_EBX & 0xffff0000, uVar2);
    }
    uVar1 = 0x180;
    if ((((heap.u32(0x008d7fc4) != '\0') && (uVar1 = 0x140, heap.u32(0x008d80d0) != '\0')) && (heap.u32(0x008d81dc) != '\0')) && ((uVar1 = 0x120, heap.u32(0x008d82e8) != '\0' && (heap.u32(0x008d83f4) != '\0')))) {
      uVar1 = 0x100;
    }
    if (heap.u32(0x008d7ebe) < uVar1) {
      return;
    }
    FUN_0042cb29(heap);
  }
  return;
}
