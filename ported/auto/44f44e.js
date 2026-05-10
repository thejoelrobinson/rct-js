// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44f44e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0044f44e(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let iVar3 = 0;
  let extraout_ECX = 0;
  let in_EDX = regs.edx >>> 0;
  let pcVar4 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar5 = 0;
  heap.setU8((unaff_ESI + 5), (0) & 0xff);
  pbVar1 = ((heap.u32((0x005f5f4c) + (in_EDX & 0xff) * 4)) >>> 0);
  iVar3 = ((200) >>> 0);
  while (iVar3 != 1) {
    bVar2 = (((regs.eax = FUN_005df40c(heap))) & 0xff);
    uVar5 = (((((((((bVar2) & 0xffff) * (0) * pbVar1) & 0xffff) >>> 8) * 3) >>> 0)) >>> 0);
    pcVar4 = ((0x00887420) >>> 0);
    while (((regs.edx & 0xff) != heap.i8(pcVar4) || (heap.i16((pbVar1 + uVar5 + 1)) != heap.i16((pcVar4 + 0x1e)))) || (iVar3 = ((extraout_ECX) >>> 0), heap.u8(pbVar1 + (uVar5 + 3)) != heap.i8(pcVar4 + (0x20)))) {
      pcVar4 = ((pcVar4 + 0x260) >>> 0);
      if (0x8ad1bf < pcVar4) {
        heap.setU16((unaff_ESI + 0x1e), (heap.u16((pbVar1 + uVar5 + 1))) & 0xffff);
        heap.setU8((unaff_ESI + 0x20), (heap.u8(pbVar1 + (uVar5 + 3))) & 0xff);
        return 1;
      }
    }
  }
  uVar5 = ((0) >>> 0);
  LAB_0044f4a3: heap.setU16((unaff_ESI + 0x1e), (heap.u16((pbVar1 + uVar5 + 1))) & 0xffff);
  heap.setU8((unaff_ESI + 0x20), (heap.u8(pbVar1 + (uVar5 + 3))) & 0xff);
  return 1;
}
