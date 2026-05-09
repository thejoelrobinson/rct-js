// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/449904.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0043642b } from "./43642b.js";
import { FUN_004490cb } from "./4490cb.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_00449904(heap) {
  let in_EAX = regs.eax >>> 0;
  let extraout_CX = 0;
  let iVar1 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let in_ZF = regs.zf | 0;
  (regs.ecx = 0x94, regs.eax = FUN_005e3b2b(heap));
  if (!in_ZF) {
    if (heap.u8(0x00630b21) == 2) {
      (regs.eax = FUN_0043642b(heap));
      heap.setU32(0x0099a020, (heap.u32(0x0099a020) | 10) >>> 0);
      heap.setU16((0x0099a02c + 0), ((regs.eax = FUN_004490cb(heap))) & 0xffff);
      heap.setU16((0x0099a030 + 0), (0xffff) & 0xffff);
      heap.setU16((0x0099a02c + 2), (extraout_CX) & 0xffff);
      (regs.eax = FUN_0043642b(heap));
    }
    uVar2 = ((heap.u32((unaff_ESI + 0x14)) & 0xfff887ff) >>> 0);
    uVar3 = ((0) >>> 0);
    if (heap.u8(0x00630b21) < 2) {
      uVar3 = ((0x1ffc00) >>> 0);
    } else {
      iVar1 = ((0x10) >>> 0);
      if ((heap.u8(0x00630b19) != 6) && (iVar1 = ((0x11) >>> 0), heap.u8(0x00630b19) != 0)) {
        iVar1 = ((0x12) >>> 0);
      }
      uVar2 = ((uVar2 | 1 << (((heap.u8(0x00630b18)) >>> 0) + heap.u8(0x00991f88) & 3) + 0xb | 1 << iVar1) >>> 0);
      if (heap.u32(0x00630b26) != 0xff) {
        uVar3 = ((~(1 << (((heap.u32(0x00630b26)) >>> 0) + heap.u8(0x00991f88) & 3) + 0xb) & 0x7800) >>> 0);
      }
    }
    heap.setU32((unaff_ESI + 0x14), (uVar2) & 0xffffffff);
    heap.setU32((unaff_ESI + 0x10), (uVar3) & 0xffffffff);
    (regs.eax = FUN_005e43de(heap));
  }
  return 1;
}
