// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42df47.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00444bd4 } from "./444bd4.js";
export function FUN_0042df47(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let in_ZF = regs.zf | 0;
  (regs.ebx = 0x2, regs.eax = FUN_00444bd4(heap));
  if (!in_ZF) {
    heap.setU8((unaff_ESI + (0x14)), (0x2c) & 0xff);
    heap.setU8((unaff_ESI + (9)), (0x20) & 0xff);
    heap.setU8((unaff_ESI + (0x15)), (0x22) & 0xff);
    heap.setU32(unaff_ESI, (2) & 0xffffffff);
    (regs.edx = 0x4, regs.eax = FUN_00444927(heap));
    heap.setU8((unaff_ESI + (1)), (3) & 0xff);
    heap.setU16((unaff_ESI + 0x26), (0) & 0xffff);
  }
  return 1;
}
