// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44a2a8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00441596 } from "./441596.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0044a2a8(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let bVar3 = 0;
  let in_EAX = regs.eax >>> 0;
  let iVar4 = 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let iVar5 = 0;
  let bVar6 = 0;
  let bVar7 = 0;
  iVar4 = ((-1) >>> 0);
  while (((iVar4 + 1) & 0xff) < heap.u8((unaff_ESI + 0x78))) {
    iVar5 = ((heap.u32((unaff_ESI + 0x5e + (iVar4 + 1) * 2)) * 0x100) >>> 0);
    heap.setU16((0x00743bdc + iVar5), (heap.u16((0x00743bdc + iVar5)) & 0xffbf) & 0xffff);
    bVar2 = ((heap.u32((0x00743bc5) + (iVar5) * 4)) & 0xff);
    bVar3 = (((regs.eax = FUN_005df40c(heap))) & 0xff);
    heap.setU32(((0x00743c56) + (iVar5) * 4), (((bVar3 & 0xf) - 8) + heap.u32((0x005f7109) + (((bVar2) >>> 0) * 8) * 4)) & 0xffffffff);
    iVar4 = ((extraout_ECX) >>> 0);
    if (heap.u32((0x00743c47) + (iVar5) * 4) != 0) {
      bVar6 = ((0xff8bc46b < heap.u32((0x00743be6 + iVar5)) << 8) & 0xff);
      (regs.eax = FUN_00441596(heap));
      bVar7 = ((false) & 0xff);
      if (bVar6) {
        pbVar1 = ((0x00743c56 + iVar5) >>> 0);
        bVar7 = ((0xdc < heap.u8(pbVar1)) & 0xff);
        heap.setU32(pbVar1, (heap.u8(pbVar1) + 0x23) & 0xffffffff);
      }
      (regs.eax = FUN_00441596(heap));
      bVar6 = ((false) & 0xff);
      if (bVar7) {
        pbVar1 = ((0x00743c56 + iVar5) >>> 0);
        bVar6 = ((0xe6 < heap.u8(pbVar1)) & 0xff);
        heap.setU32(pbVar1, (heap.u8(pbVar1) + 0x19) & 0xffffffff);
      }
      (regs.eax = FUN_00441596(heap));
      bVar7 = ((false) & 0xff);
      if (bVar6) {
        pbVar1 = ((0x00743c56 + iVar5) >>> 0);
        bVar7 = ((200 < heap.u8(pbVar1)) & 0xff);
        heap.setU32(pbVar1, (heap.u8(pbVar1) + 0x37) & 0xffffffff);
      }
      (regs.eax = FUN_00441596(heap));
      bVar6 = ((false) & 0xff);
      if (bVar7) {
        pbVar1 = ((0x00743c56 + iVar5) >>> 0);
        bVar6 = ((0xf1 < heap.u8(pbVar1)) & 0xff);
        heap.setU32(pbVar1, (heap.u8(pbVar1) + 0xe) & 0xffffffff);
      }
      (regs.eax = FUN_00441596(heap));
      iVar4 = ((extraout_ECX_00) >>> 0);
      if (bVar6) {
        heap.setU32(((0x00743c56) + (iVar5) * 4), (9) & 0xffffffff);
      }
    }
  }
  return 1;
}
