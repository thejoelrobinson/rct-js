// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e5301.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../runtime/win32.js";
import { FUN_005e117d } from "./5e117d.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_005e5301(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_009a013c = __sp + 0;
  const __addr_uStack_6 = __sp + 4;
  try {
  let in_EAX = 0;
  let uVar1 = 0;
  let in_ECX = 0;
  let in_EDX = 0;
  let unaff_EBX = 0;
  let unaff_EBP = 0;
  let unaff_ESI = 0;
  let unaff_EDI = 0;
  let uStack_4 = 0;
  let uStack_2 = 0;
  uStack_4 = unaff_ESI;
  uStack_2 = (undefined2)(unaff_ESI >>> 0x10);
  if (in_EAX < '\0') {
    uVar1 = in_EAX & 0xffffff7f;
    heap.setU32(__addr_uStack_6, (uStack_4) >>> 0);
    uStack_4 = uStack_2;
    uStack_2 = in_EAX;
    for (puVar2 = __addr_DAT_009a013c; puVar2 < heap.u32(0x009a1164); puVar2 = puVar2 + 0x178) {
      if (((uVar1 == heap.u32(puVar2 + (0x174) * 4)) && (unaff_EBX == heap.u32((puVar2 + 0x30)))) && (heap.u32((heap.u32((puVar2 + 0x1c)) + (uint)(ushort)((ushort)(byte)(uVar1 >>> 8) * 0x10) + 2)) != -2)) {
        FUN_005e117d(heap, unaff_EDI, puVar2, unaff_EBP, __addr_uStack_6, unaff_EBX, in_EDX, in_ECX);
      }
    }
    return CONCAT22(heap, (uVar1 >>> 0x10), uStack_2);
  }
  if ((in_EAX & 0x40) != 0) {
    uVar1 = in_EAX & 0xffffffbf;
    for (puVar2 = __addr_DAT_009a013c; puVar2 < heap.u32(0x009a1164); puVar2 = puVar2 + 0x178) {
      if (uVar1 == heap.u32(puVar2 + (0x174) * 4)) {
        heap.setU32(__addr_uStack_6, (0x5e) >>> 0);
        uVar1 = FUN_005e43de(heap);
      }
    }
    return uVar1;
  }
  for (puVar2 = __addr_DAT_009a013c; puVar2 < heap.u32(0x009a1164); puVar2 = puVar2 + 0x178) {
    if ((in_EAX == heap.u32(puVar2 + (0x174) * 4)) && (unaff_EBX == heap.u32((puVar2 + 0x30)))) {
      heap.setU32(__addr_uStack_6, (0x5e) >>> 0);
      in_EAX = FUN_005e43de(heap);
    }
  }
  return in_EAX;
} finally {
    heap.freeFrame(8);
  }
}
