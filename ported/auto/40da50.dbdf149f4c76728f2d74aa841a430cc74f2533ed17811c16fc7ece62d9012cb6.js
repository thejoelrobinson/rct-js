// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40da50.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { _memset } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00413170 } from "./413170.js";
import { FUN_004138d0 } from "./4138d0.js";
export function FUN_0040da50(heap, param_1, param_2, param_3) {
  let _Dst = 0;
  _Dst = (((heap.u32(0x005f0394) * 0x210 + heap.u32(0x005ebf10))) >>> 0);
  if (param_1 == 0) {
    _memset(heap, _Dst, 0, 0x10);
  } else {
    (regs.eax = FUN_004138d0(heap, _Dst, param_1, 0x10));
  }
  (regs.eax = FUN_00413170(heap, ((_Dst) | 0) + 0x10, param_2));
  (regs.eax = FUN_00413170(heap, ((_Dst) | 0) + 0x110, param_3));
  heap.setU32(0x005f0394, (heap.u32(0x005f0394) + 1) >>> 0);
  return 1;
}
