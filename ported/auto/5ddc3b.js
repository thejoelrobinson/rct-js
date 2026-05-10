// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5ddc3b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_005ddc3b(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let iVar3 = 0;
  let extraout_ECX = 0;
  let in_EDX = regs.edx >>> 0;
  let pcVar4 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar5 = 0;
  pbVar1 = ((heap.u32((0x005f6cb8) + (((heap.i8(unaff_ESI + (1))) & 0xff)) * 4)) >>> 0);
  if (heap.u8(pbVar1) == 0xff) {
    heap.setI8((unaff_ESI + (5)), (1) & 0xff);
    uVar5 = ((0) >>> 0);
    do {
      heap.setU16((unaff_ESI + uVar5 * 2 + 6), (heap.u16((pbVar1 + uVar5 * 2 + 1))) & 0xffff);
      uVar5 = ((uVar5 + 1) >>> 0);
    } while (uVar5 < 0xc);
    return 1;
  }
  heap.setI8((unaff_ESI + (5)), (0) & 0xff);
  iVar3 = ((200) >>> 0);
  while (iVar3 != 1) {
    bVar2 = (((regs.eax = FUN_005df40c(heap))) & 0xff);
    uVar5 = (((((((((bVar2) & 0xffff) * (0) * pbVar1) & 0xffff) >>> 8) * 2) >>> 0)) >>> 0);
    pcVar4 = ((0x00887420) >>> 0);
    while ((((heap.i8(pcVar4) | 0) == -1 || (pcVar4 == unaff_ESI)) || (heap.i8(unaff_ESI + (1)) != heap.i8(pcVar4 + (1)))) || (iVar3 = ((extraout_ECX) >>> 0), heap.i16((pbVar1 + uVar5 + 1)) != heap.i16((pcVar4 + 6)))) {
      pcVar4 = ((pcVar4 + 0x260) >>> 0);
      if (0x8ad1bf < pcVar4) {
        heap.setU16((unaff_ESI + 6), (heap.u16((pbVar1 + uVar5 + 1))) & 0xffff);
        return 1;
      }
    }
  }
  uVar5 = ((0) >>> 0);
  LAB_005ddc9b: heap.setU16((unaff_ESI + 6), (heap.u16((pbVar1 + uVar5 + 1))) & 0xffff);
  return 1;
}
