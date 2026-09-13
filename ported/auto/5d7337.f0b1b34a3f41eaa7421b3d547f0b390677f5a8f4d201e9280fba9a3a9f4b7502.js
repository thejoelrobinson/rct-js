// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d7337.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT22, CONCAT31, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005d6a1d } from "./5d6a1d.js";
export function FUN_005d7337(heap) {
  let bVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar2 = 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_BX = regs.ebx & 0xffff;
  let uVar3 = 0;
  let pbVar4 = 0;
  uVar3 = ((unaff_BX << 7 | unaff_BX >>> 9 | ((in_EAX) & 0xffff)) & 0xffff);
  pbVar4 = ((heap.u32((0x00971ef4) + (((uVar3 >>> 5 | uVar3 << 0xb) & 0xffff)) * 4)) >>> 0);
  bVar1 = ((heap.u8(pbVar4)) & 0xff);
  while ((bVar1 & 0x3c) != 0) {
    pbVar4 = ((pbVar4 + 8) >>> 0);
    bVar1 = ((heap.u8(pbVar4)) & 0xff);
  }
  uVar2 = ((((heap.u8(pbVar4 + (2))) & 0xffff) * 4) & 0xffff);
  uVar3 = ((uVar2) & 0xffff);
  if (((heap.u8(pbVar4 + (4)) & 0xf) != 0) && (uVar3 = ((uVar2 + 0x10) & 0xffff), (heap.u8(pbVar4 + (4)) & 0x10) != 0)) {
    uVar3 = ((uVar2 + 0x20) & 0xffff);
  }
  if ((heap.u8(pbVar4 + (5)) & 0x1f) != 0) {
    uVar2 = (((heap.u8(pbVar4 + (5)) & 0x1f) << 4) & 0xffff);
    pbVar4 = ((((uVar2) >>> 0)) >>> 0);
    if (uVar3 < uVar2) {
      uVar3 = ((uVar2) & 0xffff);
    }
  }
  (regs.ebx = 0x3, regs.eax = FUN_005d6a1d(heap));
  return CONCAT44(CONCAT22((((((in_EDX) >>> 0) >>> 0x10)) << 16 >> 16), uVar3 + ((CONCAT31((regs.eax = callIndirect(heap, int3, ((pbVar4) >>> 0) >>> 8)), 3)) << 16 >> 16)), in_EAX);
}
