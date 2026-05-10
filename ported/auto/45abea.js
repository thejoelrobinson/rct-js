// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45abea.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0045ac19 } from "./45ac19.js";
import { FUN_0045ac6f } from "./45ac6f.js";
export function FUN_0045abea(heap) {
  let in_AL = regs.eax & 0xff;
  let unaff_BL = regs.ebx & 0xff;
  let unaff_BH = (regs.ebx >>> 8) & 0xff;
  heap.setU8(0x008d7eaa, (in_AL) & 0xff);
  heap.setU8(0x008d7eae, ((regs.eax = FUN_0045ac6f(heap))) & 0xff);
  heap.setU8(0x008d7eb0, (unaff_BL) & 0xff);
  heap.setU8(0x008d7eb2, (unaff_BH) & 0xff);
  heap.setU8(0x008d7eb4, ((regs.ecx & 0xff)) & 0xff);
  heap.setU8(0x008d7eb6, (((regs.ecx >>> 8) & 0xff)) & 0xff);
  return (regs.eax = FUN_0045ac19(heap), regs.ecx = 0x640000, regs.eax);
}
