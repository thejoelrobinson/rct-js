// @manual — do not regenerate.
// Source: decompiled/c/402a00.c
//
// Translator bug: `DAT_005f1ff0 = *(undefined2 *)(DAT_005e9100 + 2);` in C
// is pointer arithmetic on `undefined4 *DAT_005e9100` — `+ 2` advances by
// 2 elements = 8 bytes. The auto-translator emits `heap.u32(0x005e9100) + 2`
// (raw +2 bytes), losing pointer-element scaling. Result: DAT_005f1ff0
// (the runtime DDraw display-mode WIDTH) reads the wrong field of the
// IDirectDraw mode struct, and the dims downstream end up swapped — pre-
// populating screen dims at runInit then triggers ~2K pixel regression
// (per Team B Round 2 diagnosis).
//
// Compare: line 19 of the C uses `(int)DAT_005e9100 + 6` (raw +6 bytes,
// because the int-cast erases pointer type) → translator correctly emits
// `heap.i32(0x005e9100) + 6`. Only the bare `DAT_005e9100 + 2` form lost
// scaling.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00402ada } from "./402ada.js";
export function FUN_00402a00(heap) {
  let iVar1 = 0;
  let uVar2 = 0;
  iVar1 = (((regs.eax = callIndirect(heap, heap.u32(0x005ebe5c), heap.u32(0x005e9100)))) >>> 0);
  if (iVar1 == 0) {
    heap.setU32(0x005e9104, (0) >>> 0);
    heap.setU32(0x005e9108, (0) >>> 0);
    uVar2 = ((0) >>> 0);
  } else {
    const _modeBase = heap.u32(0x005e9100) >>> 0;
    heap.setU32(0x005f1fec, heap.u32(_modeBase));               // [0]   = +0
    heap.setU32(0x005f1ff4, heap.u32(_modeBase + 16));          // [4]   = +16 (already correct in auto-port)
    heap.setU32(0x005f2400, heap.u16(_modeBase + 6));           // (int)+6 (byte stride)
    heap.setU32(0x005f1ff0, heap.u16(_modeBase + 8));           // [2]   = +8 (HAND FIX: was +2)
    heap.setU32(0x005e9104, 1);
    heap.setU32(0x005e9108, 1);
    if (heap.u32(0x005e9130) != 0) {
      (regs.eax = FUN_00402ada(heap));
    }
    uVar2 = 1;
  }
  return uVar2;
}
