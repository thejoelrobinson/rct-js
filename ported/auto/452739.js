// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/452739.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004072f0 } from "./4072f0.js";
import { FUN_00407696 } from "./407696.js";
import { FUN_0040771b } from "./40771b.js";
import { FUN_004077b3 } from "./4077b3.js";
import { FUN_0040d301 } from "./40d301.js";
import { FUN_0042f239 } from "./42f239.js";
import { FUN_0042f3a2 } from "./42f3a2.js";
import { FUN_00452835 } from "./452835.js";
export function FUN_00452739(heap) {
  let in_EAX = regs.eax >>> 0;
  let iVar1 = 0;
  let puVar2 = 0;
  let sVar3 = 0;
  let puVar4 = 0;
  let piVar5 = 0;
  let puVar6 = 0;
  let uVar7 = 0;
  let piVar8 = 0;
  (regs.eax = FUN_00452835(heap));
  puVar4 = ((0x00632448) >>> 0);
  sVar3 = ((6) & 0xffff);
  do {
    heap.setU32(puVar4, (0xffff) & 0xffffffff);
    puVar4 = ((puVar4 + ((0x1e) * 2)) >>> 0);
    sVar3 = ((sVar3 + -1) & 0xffff);
  } while (sVar3 != 0);
  puVar4 = ((0x00632608) >>> 0);
  sVar3 = ((6) & 0xffff);
  do {
    heap.setU32(puVar4, (0xffff) & 0xffffffff);
    puVar4 = ((puVar4 + ((0xb) * 2)) >>> 0);
    sVar3 = ((sVar3 + -1) & 0xffff);
  } while (sVar3 != 0);
  iVar1 = (((regs.eax = FUN_004072f0(heap, 0, in_EAX, 2, 0x5622, 0x10))) >>> 0);
  if (iVar1 != 0) {
    (regs.ebx = 0x4, regs.eax = FUN_0042f239(heap));
    iVar1 = (((regs.eax = FUN_0040771b(heap, 2))) >>> 0);
    if (iVar1 != 0) {
      piVar5 = ((0x006326c8) >>> 0);
      while ((heap.i32(piVar5) | 0) != -1) {
        piVar8 = ((piVar5 + ((1) * 4)) >>> 0);
        (regs.eax = FUN_004077b3(heap, heap.i32(piVar5), piVar8, 1, 1));
        piVar5 = ((piVar8 + ((5) * 4)) >>> 0);
      }
      puVar2 = (((in_EAX * 0x210 + heap.u32(0x005ebf10))) >>> 0);
      heap.setU8(0x005f8d49, (heap.u32(puVar2)) & 0xff);
      heap.setU32(0x005f8d4d, (heap.u32(puVar2 + (1) * 4)) >>> 0);
      heap.setU32(0x005f8d51, (heap.u32(puVar2 + (2) * 4)) >>> 0);
      heap.setU32(0x005f8d55, (heap.u32(puVar2 + (3) * 4)) >>> 0);
      heap.setU8(0x005f8d48, (1) & 0xff);
      heap.setU32(0x006323f4, (in_EAX) >>> 0);
      (regs.eax = FUN_0042f3a2(heap));
      iVar1 = (((regs.eax = FUN_0040d301(heap))) >>> 0);
      if (iVar1 != 0) {
        heap.setU32(0x006323f8, (heap.u32(0x006323f8) | 1) >>> 0);
        puVar6 = ((0x006325f0) >>> 0);
        uVar7 = ((0) >>> 0);
        do {
          heap.setU32(puVar6, (0xff) & 0xffffffff);
          puVar6 = ((puVar6 + 8) >>> 0);
          uVar7 = ((uVar7 + 1) >>> 0);
        } while (uVar7 < 2);
      }
      return iVar1;
    }
    (regs.eax = FUN_00407696(heap));
  }
  return in_EAX;
}
