// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45163c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT11, CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e4198 } from "./5e4198.js";
export function FUN_0045163c(heap) {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let extraout_CX = 0;
  let uVar6 = 0;
  let sVar7 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let cStack_10 = 0;
  LAB_004516ad: {
  (regs.eax = callIndirect(heap, heap.u32((unaff_ESI + 4))));
  sVar7 = ((0) & 0xffff);
  uVar5 = ((0xff00) >>> 0);
  do {
    bVar1 = ((heap.u32((0x005f5560) + (uVar5 & 0xff) * 4)) & 0xff);
    uVar4 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar5 >>> 8)), bVar1)) >>> 0);
    uVar2 = ((((bVar1) >>> 0)) >>> 0);
    if ((heap.u32(0x00631d0c) == heap.u32((0x005f5d05) + (uVar2 * 8) * 4)) && ((heap.u8((((0x0087c3dc) >>> 0) + ((((uVar2 & 0x1f)) >>> 0) >>> 3) + ((bVar1 >>> 5) >>> 0) * 4)) >>> (uVar2 & 7) & 1) != 0)) {
      if (((((uVar5 >>> 8)) << 24 >> 24) | 0) == -1) {
        uVar4 = ((((CONCAT11(bVar1, bVar1)) >>> 0)) >>> 0);
      }
      if (((uVar4) << 24 >> 24) == heap.u32((0x00631d0d) + (heap.u32(0x00631d0c)) * 4)) {
        break LAB_004516ad;
      }
      sVar7 = ((sVar7 + 1) & 0xffff);
    }
    cStack_10 = ((((uVar5) << 24 >> 24)) & 0xff);
    uVar5 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar4 >>> 8)), cStack_10 + 1)) >>> 0);
  } while (((cStack_10 + 1) & 0xff) < 0x31);
  heap.setU32(((0x00631d0d) + (heap.u32(0x00631d0c)) * 4), ((((uVar4 >>> 8)) << 24 >> 24)) & 0xffffffff);
  sVar7 = ((0) & 0xffff);
  }
  uVar3 = (((heap.u32(0x00631bac) - heap.u32(0x00631baa)) - 1) & 0xffff);
  uVar6 = ((extraout_CX - uVar3) & 0xffff);
  if (extraout_CX < uVar3) {
    uVar6 = ((0) & 0xffff);
  }
  uVar3 = ((sVar7 * 0x7a) & 0xffff);
  if (uVar6 < ((sVar7 * 0x7a) & 0xffff)) {
    uVar3 = ((uVar6) & 0xffff);
  }
  heap.setU16((unaff_ESI + 0x36), (uVar3) & 0xffff);
  return (regs.eax = 0xfffa, regs.edi = 0x631ba8, regs.eax = FUN_005e4198(heap));
}
