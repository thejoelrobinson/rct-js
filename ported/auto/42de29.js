// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42de29.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00444bd4 } from "./444bd4.js";
import { FUN_00458a7c } from "./458a7c.js";
import { FUN_00458bcf } from "./458bcf.js";
export function FUN_0042de29(heap) {
  let in_EAX = regs.eax >>> 0;
  let extraout_CX = 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_EBX = regs.ebx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let in_ZF = regs.zf | 0;
  (regs.eax = FUN_00444bd4(heap));
  if (!in_ZF) {
    heap.setU32((unaff_ESI + 0x28), (unaff_EBX) & 0xffffffff);
    heap.setU8((unaff_ESI + (0x14)), (0x40) & 0xff);
    heap.setU8((unaff_ESI + (9)), (0x14) & 0xff);
    heap.setU8((unaff_ESI + (0x15)), (0x1e) & 0xff);
    heap.setU32(unaff_ESI, (2) & 0xffffffff);
    (regs.eax = FUN_00444927(heap));
    heap.setU8((unaff_ESI + (1)), (1) & 0xff);
    heap.setU16((unaff_ESI + 0x26), (0) & 0xffff);
    heap.setU16((unaff_ESI + 0x24), (0) & 0xffff);
    heap.setU32(0x00971e86, (heap.i32((unaff_ESI + 0x28))) >>> 0);
    if (heap.u32(0x00971e86) < 0) {
      heap.setU32(0x00971e86, (-heap.u32(0x00971e86)) >>> 0);
    }
    (regs.eax = FUN_00458bcf(heap));
    heap.setU32(0x00971e84, (0xe0) >>> 0);
    (regs.eax = FUN_00458a7c(heap));
    heap.setU16((unaff_ESI + 0x44), (-(extraout_CX >>> 1)) & 0xffff);
    heap.setU16((unaff_ESI + 0x46), (0) & 0xffff);
  }
  return 1;
}
