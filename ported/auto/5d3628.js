// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d3628.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e68e2 } from "./5e68e2.js";
export function FUN_005d3628(heap) {
  let puVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let iVar10 = 0;
  let bVar11 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let in_CF = regs.cf | 0;
  LAB_005d3692: {
  bVar11 = (((regs.eax = FUN_005e68e2(heap))) & 0xff);
  if (in_CF) {
    return;
  }
  iVar10 = ((heap.i32((unaff_ESI + 8))) >>> 0);
  if (bVar11 == 1) {
    puVar1 = (((iVar10 + 0x12)) >>> 0);
    uVar2 = ((heap.u16(puVar1)) & 0xffff);
    heap.setU32(puVar1, (heap.u16(puVar1) | 1) & 0xffffffff);
  } else {
    if (bVar11 < 2) {
      puVar1 = (((iVar10 + 0x12)) >>> 0);
      uVar2 = ((heap.u16(puVar1)) & 0xffff);
      heap.setU32(puVar1, (heap.u16(puVar1) & 0xfffe) & 0xffffffff);
      puVar1 = (((iVar10 + 0x12)) >>> 0);
      uVar3 = ((heap.u16(puVar1)) & 0xffff);
      heap.setU32(puVar1, (heap.u16(puVar1) & 0xfffd) & 0xffffffff);
      puVar1 = (((iVar10 + 0x12)) >>> 0);
      uVar4 = ((heap.u16(puVar1)) & 0xffff);
      heap.setU32(puVar1, (heap.u16(puVar1) & 0xfffb) & 0xffffffff);
      puVar1 = (((iVar10 + 0x12)) >>> 0);
      uVar5 = ((heap.u16(puVar1)) & 0xffff);
      heap.setU32(puVar1, (heap.u16(puVar1) & 0xfff7) & 0xffffffff);
      puVar1 = (((iVar10 + 0x12)) >>> 0);
      uVar6 = ((heap.u16(puVar1)) & 0xffff);
      heap.setU32(puVar1, (heap.u16(puVar1) & 0xefff) & 0xffffffff);
      puVar1 = (((iVar10 + 0x12)) >>> 0);
      uVar7 = ((heap.u16(puVar1)) & 0xffff);
      heap.setU32(puVar1, (heap.u16(puVar1) & 0xffdf) & 0xffffffff);
      puVar1 = (((iVar10 + 0x12)) >>> 0);
      uVar8 = ((heap.u16(puVar1)) & 0xffff);
      heap.setU32(puVar1, (heap.u16(puVar1) & 0xffef) & 0xffffffff);
      puVar1 = (((iVar10 + 0x12)) >>> 0);
      uVar9 = ((heap.u16(puVar1)) & 0xffff);
      heap.setU32(puVar1, (heap.u16(puVar1) & 0xffbf) & 0xffffffff);
      if ((((((((((((uVar2 & 1) != 0) * 2 + ((uVar3 >>> 1 & 1) != 0)) * 2 + ((uVar4 >>> 2 & 1) != 0)) * 2 + ((uVar5 >>> 3 & 1) != 0)) * 2 + ((uVar6 >>> 0xc & 1) != 0)) * 2 + ((uVar7 >>> 5 & 1) != 0)) * 2 + ((uVar8 >>> 4 & 1) != 0)) * 2 + ((uVar9 >>> 6 & 1) != 0))) << 24 >> 24) == 0) {
        return;
      }
      break LAB_005d3692;
    }
    puVar1 = (((iVar10 + 0x12)) >>> 0);
    uVar2 = ((heap.u16(puVar1) >>> 5) & 0xffff);
    heap.setU32(puVar1, (heap.u16(puVar1) | 0x20) & 0xffffffff);
  }
  if ((uVar2 & 1) != 0) {
    return;
  }
  }
  return (regs.eax = FUN_005e43de(heap));
}
