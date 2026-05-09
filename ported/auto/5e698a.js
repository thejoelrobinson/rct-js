// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e698a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00403abb } from "./403abb.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e6a55 } from "./5e6a55.js";
export function FUN_005e698a(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let in_ZF = regs.zf | 0;
  (regs.eax = FUN_00403abb(heap));
  (regs.eax = FUN_005e6a55(heap));
  LOCK();
  heap.setU32(0x009a0128, (0xff) >>> 0);
  UNLOCK();
  (regs.ecx = 0xff, regs.eax = FUN_005e3b2b(heap));
  if (!in_ZF) {
    (regs.eax = callIndirect(heap, heap.u32((unaff_ESI + 4))));
  }
  return 1;
}
