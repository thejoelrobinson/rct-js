// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4518fc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0042c711 } from "./42c711.js";
export function FUN_004518fc(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  heap.setU16((0x00971e86 + 0), (heap.u32((0x00887442) + ((in_EDX & 0xff) * 0x130) * 4)) & 0xffff);
  unique0x00017200 = ((heap.u32((0x00887444) + ((in_EDX & 0xff) * 0x98) * 4)) >>> 0);
  (regs.eax = FUN_0042c711(heap));
  return 1;
}
