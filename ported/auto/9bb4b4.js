// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bb4b4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00401220 } from "./401220.js";
import { FUN_0042f3a2 } from "./42f3a2.js";
export function FUN_009bb4b4(heap) {
  let in_AL = regs.eax & 0xff;
  let cVar1 = 0;
  if (in_AL == 1) {
    LAB_009bb511: heap.setU8(0x005f8d5b, (1) & 0xff);
    cVar1 = (((regs.eax = FUN_00401220(heap, 3))) & 0xff);
    if (cVar1 != 0) {
      return (regs.eax = FUN_0042f3a2(heap));
    }
  } else {
    if (in_AL == 2) {
      LAB_009bb4fc: heap.setU8(0x005f8d5b, (2) & 0xff);
      cVar1 = (((regs.eax = FUN_00401220(heap, 4))) & 0xff);
      if (cVar1 != 0) {
        return (regs.eax = FUN_0042f3a2(heap));
      }
      /* goto LAB_009bb511 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bb4b4/LAB_009bb511"); return 0;
    }
    if (in_AL == 3) {
      heap.setU8(0x005f8d5b, (3) & 0xff);
      cVar1 = (((regs.eax = FUN_00401220(heap, 5))) & 0xff);
      if (cVar1 != 0) {
        return (regs.eax = FUN_0042f3a2(heap));
      }
      /* goto LAB_009bb4fc — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bb4b4/LAB_009bb4fc"); return 0;
    }
  }
  heap.setU8(0x005f8d5b, (0) & 0xff);
  cVar1 = (((regs.eax = FUN_00401220(heap, 1))) & 0xff);
  if (cVar1 == 0) {
    heap.setU8(0x005f8d5b, (1) & 0xff);
    return (regs.eax = FUN_00401220(heap, 3));
  }
  LAB_009bb526: return (regs.eax = FUN_0042f3a2(heap));
}
