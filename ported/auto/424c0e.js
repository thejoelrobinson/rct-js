// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/424c0e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e3c3c } from "./5e3c3c.js";
import { FUN_005e412c } from "./5e412c.js";
export function FUN_00424c0e(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let bVar1 = 0;
  bVar1 = ((true) & 0xff);
  (regs.ecx = 0x15, regs.eax = FUN_005e3b2b(heap));
  if (bVar1) {
    (regs.ecx = 0x15, regs.edx = 0x424c57, regs.ebx = 0x1840034, regs.ebp = 0x424d32, regs.eax = FUN_005e3c3c(heap));
    heap.setU32((unaff_ESI + 0x1c), (0x005f4000) & 0xffffffff);
    heap.setU32((unaff_ESI + 0xc), (heap.u32((unaff_ESI + 0xc)) | 0xfff4) & 0xffffffff);
    (regs.edx = 0x424c57, regs.ecx = 0x15, regs.eax = FUN_005e412c(heap));
    heap.setU32(0x005f4102, (0xff) >>> 0);
    heap.setU32(0x005f4101, (0xff) >>> 0);
  }
  return 1;
}
