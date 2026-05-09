// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42e1eb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00444d1f } from "./444d1f.js";
import { FUN_005e5496 } from "./5e5496.js";
export function FUN_0042e1eb(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_ECX = regs.ecx >>> 0;
  let extraout_ECX = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  uVar3 = ((CONCAT44(in_EDX, in_EAX)) >>> 0);
  uVar1 = ((heap.u32((0x00991f8e) + ((((((in_EAX & 0xfe0) << 2) & 0xffff) | ((in_ECX) & 0xffff) >>> 5) & 0xffff)) * 4)) & 0xffff);
  do {
    while (true) {
      if (uVar1 == 0xffff) {
        return 1;
      }
      uVar2 = ((((uVar1) >>> 0)) >>> 0);
      if (heap.u32((0x00743b9c) + (uVar2 * 0x100) * 4) == 8) {
        break;
      }
      LAB_0042e26a: uVar1 = ((heap.u32((0x00743b96) + (uVar2 * 0x80) * 4)) & 0xffff);
    }
    uVar1 = ((heap.u32((0x00743ba6) + (uVar2 * 0x80) * 4) - (((((uVar3) >>> 0) >>> 0x20)) << 16 >> 16)) & 0xffff);
    if (((uVar1) << 16 >> 16) < 0) {
      uVar1 = ((-uVar1) & 0xffff);
    }
    if (0x10 < uVar1) {
      /* goto LAB_0042e26a — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0042e1eb/LAB_0042e26a"); return 0;
    }
    uVar1 = ((heap.u32((0x00743ba2) + (uVar2 * 0x80) * 4) - ((uVar3) << 16 >> 16)) & 0xffff);
    if (((uVar1) << 16 >> 16) < 0) {
      uVar1 = ((-uVar1) & 0xffff);
    }
    if (8 < uVar1) {
      /* goto LAB_0042e26a — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0042e1eb/LAB_0042e26a"); return 0;
    }
    uVar1 = ((heap.u32((0x00743ba4) + (uVar2 * 0x80) * 4) - ((in_ECX) << 16 >> 16)) & 0xffff);
    if (((uVar1) << 16 >> 16) < 0) {
      uVar1 = ((-uVar1) & 0xffff);
    }
    if (8 < uVar1) {
      /* goto LAB_0042e26a — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0042e1eb/LAB_0042e26a"); return 0;
    }
    uVar1 = ((heap.u32((0x00743b96) + (uVar2 * 0x80) * 4)) & 0xffff);
    (regs.eax = FUN_005e5496(heap));
    uVar3 = (((regs.eax = FUN_00444d1f(heap))) >>> 0);
    in_ECX = ((extraout_ECX) >>> 0);
  } while (true);
}
