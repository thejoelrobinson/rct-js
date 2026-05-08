// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42e1eb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_00444d1f } from "./444d1f.js";
import { FUN_005e5496 } from "./5e5496.js";
export function FUN_0042e1eb(heap) {
  const __sp = heap.allocFrame(24);
  const __addr_DAT_00991f8e = __sp + 0;
  const __addr_DAT_00743b9c = __sp + 4;
  const __addr_DAT_00743b96 = __sp + 8;
  const __addr_DAT_00743ba6 = __sp + 12;
  const __addr_DAT_00743ba2 = __sp + 16;
  const __addr_DAT_00743ba4 = __sp + 20;
  try {
  let in_EAX = 0;
  let in_ECX = 0;
  let extraout_ECX = 0;
  let in_EDX = 0;
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  uVar3 = CONCAT44(in_EDX, in_EAX);
  uVar1 = heap.u32((__addr_DAT_00991f8e) + ((((in_EAX & 0xfe0) << 2) | in_ECX >>> 5)) * 4);
  do {
    while (true) {
      if (uVar1 == 0xffff) {
        return CONCAT44(in_EDX, in_EAX);
      }
      uVar2 = uVar1;
      if (heap.u32((__addr_DAT_00743b9c) + (uVar2 * 0x100) * 4) == '\b') {
        break;
      }
      LAB_0042e26a: uVar1 = heap.u32((__addr_DAT_00743b96) + (uVar2 * 0x80) * 4);
    }
    uVar1 = heap.u32((__addr_DAT_00743ba6) + (uVar2 * 0x80) * 4) - (uVar3 >>> 0x20);
    if (uVar1 < 0) {
      uVar1 = -uVar1;
    }
    if (0x10 < uVar1) {
      /* goto LAB_0042e26a */ throw new Error("goto LAB_0042e26a not supported");
    }
    uVar1 = heap.u32((__addr_DAT_00743ba2) + (uVar2 * 0x80) * 4) - uVar3;
    if (uVar1 < 0) {
      uVar1 = -uVar1;
    }
    if (8 < uVar1) {
      /* goto LAB_0042e26a */ throw new Error("goto LAB_0042e26a not supported");
    }
    uVar1 = heap.u32((__addr_DAT_00743ba4) + (uVar2 * 0x80) * 4) - in_ECX;
    if (uVar1 < 0) {
      uVar1 = -uVar1;
    }
    if (8 < uVar1) {
      /* goto LAB_0042e26a */ throw new Error("goto LAB_0042e26a not supported");
    }
    uVar1 = heap.u32((__addr_DAT_00743b96) + (uVar2 * 0x80) * 4);
    FUN_005e5496(heap);
    uVar3 = FUN_00444d1f(heap);
    in_ECX = extraout_ECX;
  } while (true);
} finally {
    heap.freeFrame(24);
  }
}
