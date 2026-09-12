// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4575af.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_004575af(heap) {
  let bVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar2 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let iVar6 = 0;
  uVar3 = ((0) >>> 0);
  do {
    iVar6 = (((uVar3 + 0x74) * 0x80) >>> 0);
    uVar2 = ((0) >>> 0);
    do {
      heap.setU32((0x008d422a + uVar2 * 4 + iVar6), (0) & 0xffffffff);
      uVar2 = ((uVar2 + 1) >>> 0);
      uVar4 = ((heap.u32(0x0087c398)) & 0xffff);
    } while (uVar2 < 0x20);
    for (; uVar4 != 0xffff; uVar4 = (((heap.u32((0x00743b98) + (((uVar4) >>> 0) * 0x80) * 4)) & 0xffff)) >>> 0) {
      iVar5 = ((((uVar4) >>> 0) * 0x100) >>> 0);
      if ((heap.u32((0x00743bc2) + (iVar5) * 4) == 1) && (((uVar3) << 24 >> 24) == heap.u32((0x00743bc3) + (iVar5) * 4))) {
        bVar1 = ((heap.u32((0x00743c59) + (iVar5) * 4)) & 0xff);
        uVar2 = ((0) >>> 0);
        do {
          heap.setU32((0x008d422a + uVar2 * 4 + iVar6), (heap.u32((0x008d422a + uVar2 * 4 + iVar6)) | heap.u32((0x008d422a + uVar2 * 4 + ((bVar1) >>> 0) * 0x80))) & 0xffffffff);
          uVar2 = ((uVar2 + 1) >>> 0);
        } while (uVar2 < 0x20);
      }
    }
    uVar3 = ((uVar3 + 1) >>> 0);
  } while (uVar3 < 4);
  return 1;
}
