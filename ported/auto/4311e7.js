// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4311e7.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { func_0x00430934 } from "../../runtime/win32.js";
import { CONCAT44, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_004311e7(heap) {
  let iVar1 = 0;
  let iVar2 = 0;
  let piVar3 = 0;
  let unaff_EBP = regs.ebp >>> 0;
  let piVar4 = 0;
  let piVar5 = 0;
  let uVar6 = 0;
  let bVar7 = 0;
  let uVar8 = 0;
  for (piVar4 = ((0x0087ccd0) >>> 0); (heap.i32(piVar4) | 0) != -2; piVar4 = ((((((piVar4) | 0) + 5)) >>> 0)) >>> 0) {
  
  }
  uVar8 = (((regs.eax = FUN_005df40c(heap))) >>> 0);
  for (piVar4 = (((((piVar4) | 0) + 5)) >>> 0); piVar3 = (((uVar8 >>> 0x20)) >>> 0), (heap.i32(piVar4) | 0) != -3; piVar4 = ((((((piVar4) | 0) + 10)) >>> 0)) >>> 0) {
    bVar7 = (((uVar8 & 1) != 0) & 0xff);
    if (!bVar7) {
      iVar1 = ((heap.i32(piVar4)) >>> 0);
      piVar5 = ((0x0087ccd0) >>> 0);
      do {
        if (iVar1 == heap.i32(piVar5)) {
          piVar3 = ((piVar5) >>> 0);
        }
        if (heap.i32((((piVar4) | 0) + 5)) == heap.i32(piVar5)) {
          unaff_EBP = ((piVar5) >>> 0);
        }
        iVar2 = ((heap.i32(piVar5)) >>> 0);
        piVar5 = (((((piVar5) | 0) + 5)) >>> 0);
      } while ((iVar2 | 0) != -2);
      heap.setU32(piVar3, (heap.i32((((piVar4) | 0) + 5))) & 0xffffffff);
      heap.setU32(unaff_EBP, (iVar1) & 0xffffffff);
      LOCK();
      iVar1 = ((heap.i32(unaff_EBP + (1) * 4)) >>> 0);
      heap.setI8((unaff_EBP + ((1) * 4)), (((heap.i32(piVar3 + (1) * 4)) << 24 >> 24)) & 0xff);
      UNLOCK();
      heap.setI8((piVar3 + ((1) * 4)), (((iVar1) << 24 >> 24)) & 0xff);
    }
    uVar8 = ((CONCAT44(piVar3, ((uVar8) >>> 0) >>> 1 | ((bVar7) >>> 0) << 0x1f)) >>> 0);
  }
  uVar6 = ((0) >>> 0);
  do {
    heap.setU32(((0x0087c3dc) + (uVar6) * 4), (0) & 0xffffffff);
    heap.setU32((0x0087c3fc + uVar6 * 4), (0) & 0xffffffff);
    uVar6 = ((uVar6 + 1) >>> 0);
  } while (uVar6 < 8);
  heap.setU32(0x0087d7a2, (0) >>> 0);
  uVar6 = ((0) >>> 0);
  do {
    heap.setU32(((0x0087c41c) + (uVar6) * 4), (heap.u32((0x005f5594) + (uVar6) * 4)) & 0xffffffff);
    uVar6 = ((uVar6 + 1) >>> 0);
  } while (uVar6 < 0x100);
  uVar6 = ((0) >>> 0);
  do {
    heap.setU32((((0x0087cba5) | 0) + uVar6 * 4 + 3), (0) & 0xffffffff);
    uVar6 = ((uVar6 + 1) >>> 0);
  } while (uVar6 < 0x38);
  for (piVar4 = ((0x0087ccd0) >>> 0); (heap.i32(piVar4) | 0) != -1; piVar4 = ((((((piVar4) | 0) + 5)) >>> 0)) >>> 0) {
    func_0x00430934(heap);
  }
  heap.setU8(0x0087cccc, (0xffffffff) & 0xff);
  heap.setU8(0x0087cccb, (0) & 0xff);
  heap.setU8(0x0087d0bc, (0) & 0xff);
  return;
}
