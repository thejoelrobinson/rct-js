// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42e18b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00444d1f } from "./444d1f.js";
import { FUN_005e5496 } from "./5e5496.js";
export function FUN_0042e18b(heap) {
  let uVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_ECX = regs.ecx >>> 0;
  let in_EDX = regs.edx >>> 0;
  let uVar2 = 0;
  let extraout_EDX = 0;
  let uVar3 = 0;
  uVar1 = ((heap.u32((0x00991f8e) + ((((((in_EAX & 0xfe0) << 2) & 0xffff) | ((in_ECX >>> 5) & 0xffff) & 0x7ff) & 0xffff)) * 4)) & 0xffff);
  uVar2 = ((in_EDX) >>> 0);
  do {
    while (true) {
      if (uVar1 == 0xffff) {
        return 1;
      }
      uVar3 = ((((uVar1) >>> 0)) >>> 0);
      if (heap.u32((0x00743b9c) + (uVar3 * 0x100) * 4) == 8) {
        break;
      }
      LAB_0042e1df: uVar1 = ((heap.u32((0x00743b96) + (uVar3 * 0x80) * 4)) & 0xffff);
    }
    uVar1 = ((heap.u32((0x00743ba6) + (uVar3 * 0x80) * 4) - ((uVar2) << 16 >> 16)) & 0xffff);
    if (((uVar1) << 16 >> 16) < 0) {
      uVar1 = ((-uVar1) & 0xffff);
    }
    if (0x20 < uVar1) {
      /* goto LAB_0042e1df — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0042e18b/LAB_0042e1df"); return 0;
    }
    uVar1 = ((heap.u32((0x00743b96) + (uVar3 * 0x80) * 4)) & 0xffff);
    (regs.eax = FUN_005e5496(heap));
    (regs.eax = FUN_00444d1f(heap));
    uVar2 = ((extraout_EDX) >>> 0);
  } while (true);
}
