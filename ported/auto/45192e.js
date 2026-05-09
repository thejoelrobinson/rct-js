// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45192e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0042c711 } from "./42c711.js";
import { FUN_0044a3ba } from "./44a3ba.js";
export function FUN_0045192e(heap) {
  let puVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  (regs.eax = FUN_0044a3ba(heap));
  if (heap.i32((unaff_ESI + 8)) != 0) {
    puVar1 = (((heap.i32((unaff_ESI + 8)) + 0x12)) >>> 0);
    heap.setU32(puVar1, (heap.u16(puVar1) | 0x800) & 0xffffffff);
  }
  heap.setU16((0x00971e86 + 0), (heap.u32((0x00887442) + ((in_EDX & 0xff) * 0x130) * 4)) & 0xffff);
  unique0x00017200 = ((heap.u32((0x00887444) + ((in_EDX & 0xff) * 0x98) * 4)) >>> 0);
  (regs.eax = FUN_0042c711(heap));
  return 1;
}
