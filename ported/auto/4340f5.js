// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4340f5.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00423677 } from "./423677.js";
import { FUN_00434231 } from "./434231.js";
import { FUN_0043424f } from "./43424f.js";
import { FUN_00434a94 } from "./434a94.js";
import { FUN_004448fb } from "./4448fb.js";
import { FUN_005e4355 } from "./5e4355.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_004340f5(heap) {
  let iVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let extraout_CX = 0;
  let unaff_ESI = regs.esi >>> 0;
  iVar1 = ((heap.i32((unaff_ESI + 8))) >>> 0);
  if (iVar1 != 0) {
    sVar2 = (((regs.eax = FUN_0043424f(heap))) & 0xffff);
    if (sVar2 == -0x8000) {
      sVar2 = (((heap.i16((iVar1 + 0xe)) >>> 1) + heap.i16((iVar1 + 10))) & 0xffff);
      (regs.eax = FUN_00434a94(heap));
    } else {
      (regs.eax = FUN_00423677(heap));
      sVar2 = ((extraout_CX) & 0xffff);
    }
    heap.setU8(0x00991f88, (heap.u8(0x00991f88) + 1) & 0xff);
    heap.setU8(0x00991f88, (heap.u8(0x00991f88) & 3) & 0xff);
    uVar3 = (((regs.eax = FUN_005e4355(heap))) & 0xffff);
    heap.setU16((unaff_ESI + 0x170), (uVar3) & 0xffff);
    heap.setI16((unaff_ESI + 0x172), (sVar2) & 0xffff);
    heap.setU16((iVar1 + 8), (uVar3) & 0xffff);
    heap.setI16((iVar1 + 10), (sVar2) & 0xffff);
    (regs.eax = FUN_005e43de(heap));
    (regs.eax = FUN_00434231(heap));
    (regs.eax = FUN_004448fb(heap));
  }
  return;
}
