// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e6078.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { FUN_00404ba4 } from "./404ba4.js";
import { FUN_005e3874 } from "./5e3874.js";
import { FUN_005e3ace } from "./5e3ace.js";
import { FUN_005e613e } from "./5e613e.js";
import { FUN_005e65cf } from "./5e65cf.js";
export function FUN_005e6078(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_009a1550 = __sp + 0;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let cVar3 = 0;
  let unaff_EBX = 0;
  let unaff_ESI = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let iVar6 = 0;
  heap.setU32(0x005f54f0, (0xffff) >>> 0);
  iVar6 = 0;
  uVar1 = FUN_005e3ace(heap);
  uVar5 = unaff_EBX;
  uVar2 = uVar1;
  if (unaff_ESI != 0) {
    uVar4 = FUN_005e3874(heap);
    uVar1 = uVar4;
    if ((uVar4 >>> 0x20) == -1) {
      /* goto LAB_005e6105 */ throw new Error("goto LAB_005e6105 not supported");
    }
    if (heap.u32(unaff_EDI) == '\f') {
      if ((heap.u32(0x00991f30) >>> 3 & 1) == 0) {
        FUN_005e613e(heap);
        cVar3 = unaff_EBX;
        if (((cVar3 == '\x02') || (cVar3 == '\b')) || (cVar3 == '\x03')) {
          iVar6 = CONCAT31((int3)(iVar6 >>> 8), 3);
        }
      } else {
        iVar6 = CONCAT31((int3)(iVar6 >>> 8), heap.u32(0x00991f5b));
      }
      /* goto LAB_005e6105 */ throw new Error("goto LAB_005e6105 not supported");
    }
  }
  if ((((heap.u32(unaff_EDI) == '\x01') && ((heap.u32((unaff_ESI + 0x32)) & 0x80) != 0)) && ((heap.u32((unaff_ESI + 0x20)) + heap.u32((unaff_ESI + 0x24)) + -0x13) <= uVar1)) && ((heap.u32((unaff_ESI + 0x22)) + heap.u32((unaff_ESI + 0x26)) + -0x13) <= unaff_EBX)) {
    iVar6 = 5;
  }
  LAB_005e6105: FUN_005e65cf(heap, iVar6, uVar5);
  if (heap.u32(0x00991f36) == '\b') {
    iVar6 = 5;
  }
  if (iVar6 != heap.u32(0x00991f34)) {
    heap.setU32(0x00991f34, (iVar6) >>> 0);
    uVar2 = FUN_00404ba4(heap, heap.u32((__addr_DAT_009a1550) + (iVar6) * 4));
  }
  return uVar2;
} finally {
    heap.freeFrame(4);
  }
}
