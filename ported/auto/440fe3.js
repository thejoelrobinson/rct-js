// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/440fe3.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0043c60b } from "./43c60b.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_00440fe3(heap) {
  let puVar1 = 0;
  let uVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let unaff_ESI = regs.esi >>> 0;
  LAB_00441052: {
  if (((heap.u32((0x0062d324) + ((in_EAX & 0xff) * 2) * 4) | 0) != -1) && (0xfd < heap.u8((unaff_ESI + 0x71)))) {
    heap.setU8((unaff_ESI + 0x71), (heap.u32((0x0062d324) + ((in_EAX & 0xff) * 2) * 4)) & 0xff);
    heap.setU8((unaff_ESI + 0x72), (0) & 0xff);
    heap.setU8((unaff_ESI + 0x70), (0) & 0xff);
    (regs.eax = FUN_0043c60b(heap));
    in_EAX = (((regs.eax = FUN_005e53ca(heap))) >>> 0);
  }
  uVar3 = ((0) >>> 0);
  do {
    while (true) {
      if ((heap.i8((unaff_ESI + 0xb0 + uVar3 * 4)) | 0) == -1) {
        break LAB_00441052;
      }
      uVar4 = ((uVar3) >>> 0);
      if (((in_EAX) << 16 >> 16) != heap.i16((unaff_ESI + 0xb0 + uVar3 * 4))) {
        break;
      }
      for (; uVar4 != 4; uVar4 = (((uVar4 + 1) >>> 0)) >>> 0) {
        heap.setU32((unaff_ESI + 0xb0 + uVar4 * 4), (heap.u32((unaff_ESI + 0xb4 + uVar4 * 4))) & 0xffffffff);
      }
      heap.setU8((unaff_ESI + 0xc0), (0xff) & 0xff);
    }
    uVar3 = ((uVar3 + 1) >>> 0);
  } while (uVar3 < 5);
  }
  uVar4 = ((0) >>> 0);
  uVar3 = ((in_EAX & 0xffff) >>> 0);
  do {
    LOCK();
    puVar1 = (((unaff_ESI + 0xb0 + uVar4 * 4)) >>> 0);
    uVar2 = ((heap.u32(puVar1)) >>> 0);
    heap.setU32(puVar1, (uVar3) & 0xffffffff);
    UNLOCK();
    uVar4 = ((uVar4 + 1) >>> 0);
    uVar3 = ((uVar2) >>> 0);
  } while (uVar4 < 5);
  heap.setU8((unaff_ESI + 0x45), (heap.u8((unaff_ESI + 0x45)) | 1) & 0xff);
  return;
}
