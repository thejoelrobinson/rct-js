// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e5ca6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_005e5ca6(heap) {
  let bVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let extraout_ECX = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  if (in_EAX != heap.u32((unaff_ESI + 0x10))) {
    LOCK();
    uVar3 = ((heap.u32((unaff_ESI + 0x10))) >>> 0);
    heap.setU32((unaff_ESI + 0x10), (in_EAX) & 0xffffffff);
    UNLOCK();
    bVar1 = ((0) & 0xff);
    do {
      uVar2 = ((CONCAT11(((in_EAX) << 24 >> 24), ((uVar3) << 24 >> 24)) & 0x101) & 0xffff);
      if (((uVar2) << 24 >> 24) != (((uVar2 >>> 8)) << 24 >> 24)) {
        (regs.eax = FUN_005e5301(heap));
        in_EAX = ((extraout_ECX) >>> 0);
      }
      uVar3 = ((uVar3 >>> 1) >>> 0);
      in_EAX = ((in_EAX >>> 1) >>> 0);
      bVar1 = ((bVar1 + 1) & 0xff);
    } while (bVar1 < 0x20);
  }
  return;
}
