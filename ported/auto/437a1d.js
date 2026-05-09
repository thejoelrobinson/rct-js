// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/437a1d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00426f56 } from "./426f56.js";
export function FUN_00437a1d(heap) {
  let cVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_CX = regs.ecx & 0xffff;
  let in_EDX = regs.edx >>> 0;
  let cVar2 = 0;
  let bVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let pbVar6 = 0;
  if ((((in_EAX) & 0xffff) < 0x1000) && (in_CX < 0x1000)) {
    pbVar6 = ((heap.u32((0x00971ef4) + ((((((in_CX & 0xfe0) << 7 | ((in_EAX) & 0xffff) & 0xfe0) & 0xffff) >>> 5 | ((in_CX & 0xfe0) >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
    bVar3 = ((heap.u8(pbVar6)) & 0xff);
    while ((bVar3 & 0x3c) != 0) {
      pbVar6 = ((pbVar6 + 8) >>> 0);
      bVar3 = ((heap.u8(pbVar6)) & 0xff);
    }
    uVar4 = ((CONCAT11(heap.u8(pbVar6 + (4)), heap.u8(pbVar6 + (2))) & 0x1fff) & 0xffff);
    if ((heap.u8(pbVar6 + (4)) & 8) != 0) {
      cVar2 = ((((uVar4) << 24 >> 24)) & 0xff);
      cVar1 = (((((uVar4 >>> 8)) << 24 >> 24)) & 0xff);
      uVar4 = ((CONCAT11(cVar1, cVar2 + 4)) & 0xffff);
      if (cVar1 == 29) {
        uVar4 = ((((cVar2 + 8) & 0xffff)) & 0xffff);
      }
    }
    bVar3 = ((((uVar4) & 0xff) - ((in_EDX) & 0xff)) & 0xff);
    if (bVar3 != 0) {
      if (((uVar4) & 0xff) < ((in_EDX) & 0xff)) {
        bVar3 = ((-bVar3) & 0xff);
      }
      if (heap.u32(0x00628ae7) < bVar3) {
        uVar5 = ((((heap.u32(0x00628ae6)) >>> 0)) >>> 0);
        (regs.eax = FUN_00426f56(heap));
        if (uVar5 != 0x80000000) {
          heap.setU32(0x00628ae2, (heap.u32(0x00628ae2) + uVar5) >>> 0);
        }
      }
    }
  }
  return 1;
}
