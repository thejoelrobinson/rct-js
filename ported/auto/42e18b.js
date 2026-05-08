// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42e18b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/win32.js";
import { FUN_00444d1f } from "./444d1f.js";
import { FUN_005e5496 } from "./5e5496.js";
export function FUN_0042e18b(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_00991f8e = __sp + 0;
  const __addr_DAT_00743b9c = __sp + 4;
  const __addr_DAT_00743b96 = __sp + 8;
  const __addr_DAT_00743ba6 = __sp + 12;
  try {
  let uVar1 = 0;
  let in_EAX = 0;
  let in_ECX = 0;
  let in_EDX = 0;
  let uVar2 = 0;
  let extraout_EDX = 0;
  let uVar3 = 0;
  uVar1 = heap.u32((__addr_DAT_00991f8e) + ((ushort)((ushort)((in_EAX & 0xfe0) << 2) | (ushort)(in_ECX >>> 5) & 0x7ff)) * 4);
  uVar2 = in_EDX;
  do {
    while (true) {
      if (uVar1 == 0xffff) {
        return CONCAT44(heap, in_EDX, in_EAX);
      }
      uVar3 = uVar1;
      if (heap.u32((__addr_DAT_00743b9c) + (uVar3 * 0x100) * 4) == '\b') {
        break;
      }
      LAB_0042e1df: uVar1 = heap.u32((__addr_DAT_00743b96) + (uVar3 * 0x80) * 4);
    }
    uVar1 = heap.u32((__addr_DAT_00743ba6) + (uVar3 * 0x80) * 4) - uVar2;
    if (uVar1 < 0) {
      uVar1 = -uVar1;
    }
    if (0x20 < uVar1) {
      /* goto LAB_0042e1df */ throw new Error("goto LAB_0042e1df not supported");
    }
    uVar1 = heap.u32((__addr_DAT_00743b96) + (uVar3 * 0x80) * 4);
    FUN_005e5496(heap);
    FUN_00444d1f(heap);
    uVar2 = extraout_EDX;
  } while (true);
} finally {
    heap.freeFrame(16);
  }
}
