// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/449904.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_0043642b } from "./43642b.js";
import { FUN_004490cb } from "./4490cb.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_00449904(heap) {
  let in_EAX = 0;
  let extraout_CX = 0;
  let iVar1 = 0;
  let in_EDX = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let unaff_ESI = 0;
  let in_ZF = 0;
  FUN_005e3b2b(heap);
  if (!in_ZF) {
    if (heap.u32(0x00630b21) == 2) {
      FUN_0043642b(heap);
      heap.setU32(0x0099a020, (heap.u32(0x0099a020) | 10) >>> 0);
      heap.u16(0x99a02c) = FUN_004490cb(heap);
      heap.u16(0x99a030) = 0xffff;
      heap.u16(0x99a02e) = extraout_CX;
      FUN_0043642b(heap);
    }
    uVar2 = heap.u32((unaff_ESI + 0x14)) & 0xfff887ff;
    uVar3 = 0;
    if (heap.u32(0x00630b21) < 2) {
      uVar3 = 0x1ffc00;
    } else {
      iVar1 = 0x10;
      if ((heap.u32(0x00630b19) != '\x06') && (iVar1 = 0x11, heap.u32(0x00630b19) != '\0')) {
        iVar1 = 0x12;
      }
      uVar2 = uVar2 | 1 << (heap.u32(0x00630b18) + heap.u32(0x00991f88) & 3) + 0xb | 1 << iVar1;
      if (heap.u32(0x00630b26) != 0xff) {
        uVar3 = ~(1 << (heap.u32(0x00630b26) + heap.u32(0x00991f88) & 3) + 0xb) & 0x7800;
      }
    }
    heap.u32((unaff_ESI + 0x14)) = uVar2;
    heap.u32((unaff_ESI + 0x10)) = uVar3;
    FUN_005e43de(heap);
  }
  return CONCAT44(in_EDX, in_EAX);
}
