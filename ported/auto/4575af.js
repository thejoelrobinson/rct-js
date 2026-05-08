// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4575af.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/ghidra-builtins.js";
export function FUN_004575af(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_008d422a = __sp + 0;
  const __addr_DAT_00743b98 = __sp + 4;
  const __addr_DAT_00743bc2 = __sp + 8;
  const __addr_DAT_00743bc3 = __sp + 12;
  const __addr_DAT_00743c59 = __sp + 16;
  try {
  let bVar1 = 0;
  let in_EAX = 0;
  let uVar2 = 0;
  let in_EDX = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let iVar6 = 0;
  uVar3 = 0;
  do {
    iVar6 = (uVar3 + 0x74) * 0x80;
    uVar2 = 0;
    do {
      heap.u32((__addr_DAT_008d422a + uVar2 * 4 + iVar6)) = 0;
      uVar2 = uVar2 + 1;
      uVar4 = heap.u32(0x0087c398);
    } while (uVar2 < 0x20);
    for (; uVar4 != 0xffff; uVar4 = heap.u32((__addr_DAT_00743b98) + (uVar4 * 0x80) * 4)) {
      iVar5 = uVar4 * 0x100;
      if ((heap.u32((__addr_DAT_00743bc2) + (iVar5) * 4) == '\x01') && (uVar3 == heap.u32((__addr_DAT_00743bc3) + (iVar5) * 4))) {
        bVar1 = heap.u32((__addr_DAT_00743c59) + (iVar5) * 4);
        uVar2 = 0;
        do {
          heap.u32((__addr_DAT_008d422a + uVar2 * 4 + iVar6)) = heap.u32((__addr_DAT_008d422a + uVar2 * 4 + iVar6)) | heap.u32((__addr_DAT_008d422a + uVar2 * 4 + bVar1 * 0x80));
          uVar2 = uVar2 + 1;
        } while (uVar2 < 0x20);
      }
    }
    uVar3 = uVar3 + 1;
  } while (uVar3 < 4);
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(20);
  }
}
