// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e6a55.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_005e6a55(heap) {
  let bVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let pbVar2 = 0;
  let pbVar3 = 0;
  pbVar2 = ((0x009a0018) >>> 0);
  pbVar3 = ((0x009a0018) >>> 0);
  while (true) {
    bVar1 = ((heap.u8(pbVar2)) & 0xff);
    heap.setU32(pbVar3, (bVar1) & 0xffffffff);
    if (bVar1 == 0) {
      break;
    }
    if ((0x1f < bVar1) && ((((bVar1 < 0x7b || (bVar1 == 0xa3)) || (bVar1 == 0xab)) || ((bVar1 == 0xbb || (0xbe < bVar1)))))) {
      pbVar3 = ((pbVar3 + 1) >>> 0);
    }
    pbVar2 = ((pbVar2 + 1) >>> 0);
  }
  return 1;
}
