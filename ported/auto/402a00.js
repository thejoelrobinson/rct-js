// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/402a00.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

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
    heap.setU32(0x005f1fec, (heap.u32(heap.u32(0x005e9100))) >>> 0);
    heap.setU32(0x005f1ff4, (heap.u32(heap.u32(0x005e9100) + (4) * 4)) >>> 0);
    heap.setU32(0x005f2400, (heap.u16((heap.i32(0x005e9100) + 6))) >>> 0);
    heap.setU32(0x005f1ff0, (heap.u16((heap.u32(0x005e9100) + 2))) >>> 0);
    heap.setU32(0x005e9104, (1) >>> 0);
    heap.setU32(0x005e9108, (1) >>> 0);
    if (heap.u32(0x005e9130) != 0) {
      (regs.eax = FUN_00402ada(heap));
    }
    uVar2 = ((1) >>> 0);
  }
  return uVar2;
}
