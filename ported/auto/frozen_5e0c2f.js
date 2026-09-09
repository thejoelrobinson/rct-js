// Frozen replay body retained for the byte-exact legacy soak.
// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e0c2f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e43de_frozen } from "./frozen_5e43de.js";
import { FUN_005e68e2_frozen } from "./frozen_5e68e2.js";
export function FUN_005e0c2f_frozen(heap) {
  let puVar1 = 0;
  let uVar2 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let bVar3 = 0;
  bVar3 = ((false) & 0xff);
  if ((heap.u8(0x0099fde0) == 0) && ((regs.eax = FUN_005e68e2_frozen(heap)), !bVar3)) {
    puVar1 = (((heap.i32((unaff_ESI + 8)) + 0x12)) >>> 0);
    uVar2 = ((heap.u16(puVar1)) & 0xffff);
    heap.setU32(puVar1, (heap.u16(puVar1) | 0x80) & 0xffffffff);
    if ((uVar2 >>> 7 & 1) == 0) {
      (regs.eax = FUN_005e43de_frozen(heap));
    }
  }
  heap.setU8(0x0099fde0, (heap.u8(0x0099fde0) + 1) & 0xff);
  return;
}

