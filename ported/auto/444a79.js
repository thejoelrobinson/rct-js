// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444a79.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00444b4a } from "./444b4a.js";
export function FUN_00444a79(heap) {
  let puVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let uVar4 = 0;
  let puVar5 = 0;
  let puVar6 = 0;
  let puVar7 = 0;
  heap.setU8(0x008ad1c0, (0) & 0xff);
  puVar6 = ((0x00743b94) >>> 0);
  for (iVar3 = ((320000) >>> 0); iVar3 != 0; iVar3 = (((iVar3 + -1) >>> 0)) >>> 0) {
    heap.setU32(puVar6, (0) & 0xffffffff);
    puVar6 = ((puVar6 + ((1) * 4)) >>> 0);
  }
  uVar4 = ((0) >>> 0);
  do {
    heap.setU16((((0x0087c394) >>> 0) + uVar4), (0xffff) & 0xffff);
    heap.setU16((((0x0087c3a0) >>> 0) + uVar4), (0) & 0xffff);
    uVar4 = ((uVar4 + 2) >>> 0);
  } while (uVar4 < 0xc);
  uVar2 = ((0) & 0xffff);
  puVar1 = ((0x00743b94) >>> 0);
  puVar7 = ((0xffffffff) >>> 0);
  do {
    puVar5 = ((puVar1) >>> 0);
    heap.setU32(puVar5, (0xff) & 0xffffffff);
    heap.setU16((puVar5 + 10), (uVar2) & 0xffff);
    heap.setU16((puVar5 + 4), (0xffff) & 0xffff);
    heap.setU8((puVar5 + (8)), (0) & 0xff);
    if (puVar7 == 0xffffffff) {
      heap.setU16((puVar5 + 6), (0xffff) & 0xffff);
      heap.setU32(0x0087c394, (uVar2) >>> 0);
    } else {
      heap.setU16((puVar5 + 6), (heap.u16((puVar7 + 10))) & 0xffff);
      heap.setU16((puVar7 + 4), (uVar2) & 0xffff);
    }
    uVar2 = ((uVar2 + 1) & 0xffff);
    puVar1 = ((puVar5 + 0x100) >>> 0);
    puVar7 = ((puVar5) >>> 0);
  } while (uVar2 < 5000);
  heap.setU32(0x0087c3a0, (5000) >>> 0);
  return (regs.eax = FUN_00444b4a(heap));
}
