// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dde9c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_005dde9c(heap) {
  let uVar1 = 0;
  let psVar2 = 0;
  let sVar3 = 0;
  let puVar4 = 0;
  let puVar5 = 0;
  let puVar6 = 0;
  let uVar7 = 0;
  uVar7 = ((0) >>> 0);
  do {
    puVar5 = ((heap.u32((0x006e2758) + (uVar7) * 4)) >>> 0);
    puVar4 = ((heap.u32((0x006e2788) + (uVar7) * 4)) >>> 0);
    while (true) {
      uVar1 = ((heap.u16(puVar5)) & 0xffff);
      if (uVar1 == 0xffff) {
        break;
      }
      if ((heap.u8((((uVar1 >>> 5) >>> 0) * 4 + 0x87cba8 + ((((uVar1 & 0x1f)) >>> 0) >>> 3))) >>> (uVar1 & 7) & 1) != 0) {
        heap.setU32(puVar4, (uVar1) & 0xffffffff);
        puVar4 = ((puVar4 + ((1) * 2)) >>> 0);
      }
      puVar5 = ((puVar5 + ((1) * 2)) >>> 0);
    }
    heap.setU32(puVar4, (0xffff) & 0xffffffff);
    uVar7 = ((uVar7 + 1) >>> 0);
  } while (uVar7 < 0xc);
  uVar7 = ((0) >>> 0);
  puVar6 = ((0x006e1d80) >>> 0);
  sVar3 = ((4) & 0xffff);
  do {
    psVar2 = ((heap.u32((0x006e2788) + (uVar7) * 4)) >>> 0);
    heap.setU32(puVar6, (0) & 0xffffffff);
    if ((heap.i16(psVar2) | 0) != -1) {
      heap.setU32(puVar6, (5) & 0xffffffff);
      heap.setI16((puVar6 + 2), (sVar3) & 0xffff);
      heap.setI16((puVar6 + 4), (sVar3 + 0x22) & 0xffff);
      sVar3 = ((sVar3 + 0x23) & 0xffff);
    }
    uVar7 = ((uVar7 + 1) >>> 0);
    puVar6 = ((puVar6 + 0x10) >>> 0);
  } while (uVar7 < 0xc);
  return (regs.eax = 0xff12, regs.ecx = 0x4, regs.edx = 0x6e2a74, regs.ebx = 0x6e0000, regs.esi = 0x6e1e40, regs.edi = 0xc, regs.eax = FUN_005e5301(heap));
}
