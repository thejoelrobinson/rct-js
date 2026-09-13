// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f2de.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0040871f } from "./40871f.js";
import { FUN_004528a0 } from "./4528a0.js";
import { FUN_004528c4 } from "./4528c4.js";
import { FUN_00458bcf } from "./458bcf.js";
export function FUN_0042f2de(heap) {
  let cVar1 = 0;
  let pcVar2 = 0;
  let pcVar3 = 0;
  (regs.eax = FUN_00458bcf(heap));
  pcVar2 = ((0x005f91d9) >>> 0);
  pcVar3 = ((0x0099aa88) >>> 0);
  do {
    cVar1 = ((heap.i8(pcVar2)) & 0xff);
    heap.setU32(pcVar3, (cVar1) & 0xffffffff);
    pcVar2 = ((pcVar2 + 1) >>> 0);
    pcVar3 = ((pcVar3 + 1) >>> 0);
  } while (cVar1 != 0);
  (regs.eax = FUN_00458bcf(heap));
  (regs.eax = FUN_004528a0(heap));
  (regs.eax = FUN_0040871f(heap, 2, 0x0099a888, 0x0099aa88, 0x005f92da, 0x0099a988));
  return (regs.eax = FUN_004528c4(heap));
}
