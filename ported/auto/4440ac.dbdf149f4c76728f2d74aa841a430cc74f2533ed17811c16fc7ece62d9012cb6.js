// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4440ac.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042c711 } from "./42c711.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_004440ac(heap) {
  let puVar1 = 0;
  let pcVar2 = 0;
  let uVar3 = 0;
  let bVar4 = 0;
  let uVar5 = 0;
  uVar5 = ((0) >>> 0);
  do {
    if (heap.u32((0x0087d0da) + (uVar5) * 4) != 0) {
      (regs.eax = FUN_005e5301(heap));
      puVar1 = (((0x0087d0da + uVar5)) >>> 0);
      uVar3 = ((heap.u16(puVar1)) & 0xffff);
      heap.setU32(puVar1, (heap.u16(puVar1) & 0xff7f) & 0xffffffff);
      if ((uVar3 >>> 7 & 1) == 0) {
        pcVar2 = ((0x0087d0da + uVar5) >>> 0);
        heap.setU8(pcVar2, (heap.i8(pcVar2) + -1) & 0xffffffff);
        if (heap.i8(pcVar2) == 0) {
          bVar4 = ((heap.u32((0x0087d0ee) + (uVar5) * 4)) & 0xff);
          switch (uVar5) {
            default:
              break;
            case 1:
            case 5:
              heap.setU16((0x00971e86 + 0), (heap.u32((0x00887442) + (((bVar4) >>> 0) * 0x130) * 4)) & 0xffff);
              unique0x00017200 = ((heap.u32((0x00887444) + (((bVar4) >>> 0) * 0x98) * 4)) >>> 0);
              break;
            case 3:
              heap.setU16((0x00971e86 + 0), (bVar4 + 0x709) & 0xffff);
          }
          (regs.eax = FUN_0042c711(heap));
        }
      }
    }
    uVar5 = ((uVar5 + 1) >>> 0);
  } while (uVar5 < 6);
  return;
}
