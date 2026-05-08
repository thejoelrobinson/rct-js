// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e5ca6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_005e5ca6(heap) {
  let bVar1 = 0;
  let in_EAX = 0;
  let extraout_ECX = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let unaff_ESI = 0;
  if (in_EAX != heap.u32((unaff_ESI + 0x10))) {
    LOCK();
    uVar3 = heap.u32((unaff_ESI + 0x10));
    heap.setU32((unaff_ESI + 0x10), (in_EAX) >>> 0);
    UNLOCK();
    bVar1 = 0;
    do {
      uVar2 = CONCAT11(in_EAX, uVar3) & 0x101;
      if (uVar2 != (uVar2 >>> 8)) {
        FUN_005e5301(heap);
        in_EAX = extraout_ECX;
      }
      uVar3 = uVar3 >>> 1;
      in_EAX = in_EAX >>> 1;
      bVar1 = bVar1 + 1;
    } while (bVar1 < 0x20);
  }
  return;
}
