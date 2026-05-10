// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e5bd8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT22, CONCAT31, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e6a83 } from "./5e6a83.js";
export function FUN_005e5bd8(heap) {
  let in_ECX = regs.ecx >>> 0;
  let uVar1 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let puVar2 = 0;
  if (unaff_ESI != 0x0) {
    (regs.eax = callIndirect(heap, heap.u32((unaff_ESI + ((2) * 2))), CONCAT22(((CONCAT31((regs.eax = callIndirect(heap, int3, ((in_ECX) >>> 0) >>> 8)), heap.u8((unaff_ESI + ((0xba) * 2))))) << 16 >> 16), heap.u16(unaff_ESI + (0x18) * 2))));
    (regs.eax = FUN_005e3b2b(heap));
    LOCK();
    puVar2 = ((heap.u32((unaff_ESI + ((4) * 2)))) >>> 0);
    heap.setU32((unaff_ESI + ((4) * 2)), (0) & 0xffffffff);
    UNLOCK();
    if (puVar2 != 0x0) {
      heap.setU32(puVar2, (0) & 0xffffffff);
    }
    (regs.eax = FUN_005e43de(heap));
    heap.setU32(0x009a1164, (heap.u32(0x009a1164) + -0x178) >>> 0);
    if (heap.u32(0x009a1164) - ((unaff_ESI) | 0) != 0 && ((unaff_ESI) | 0) <= heap.u32(0x009a1164)) {
      uVar1 = ((((heap.u32(0x009a1164) - ((unaff_ESI) | 0)) >>> 0) >>> 1) >>> 0);
      puVar2 = ((unaff_ESI + ((0xbc) * 2)) >>> 0);
      for (; uVar1 != 0; uVar1 = (((uVar1 - 1) >>> 0)) >>> 0) {
        heap.setU32(unaff_ESI, (heap.u16(puVar2)) & 0xffffffff);
        puVar2 = ((puVar2 + ((1) * 2)) >>> 0);
        unaff_ESI = ((unaff_ESI + ((1) * 2)) >>> 0);
      }
    }
    (regs.eax = FUN_005e6a83(heap));
  }
  return;
}
