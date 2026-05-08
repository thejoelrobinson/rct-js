// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414690.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetModuleFileNameA } from "../runtime/win32.js";
import { FUN_004133c0 } from "./4133c0.js";
import { FUN_00414730 } from "./414730.js";
export function FUN_00414690(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_005eff10 = __sp + 0;
  const __addr_local_8 = __sp + 4;
  const __addr_local_4 = __sp + 8;
  try {
  let iVar1 = 0;
  GetModuleFileNameA(heap, 0x0, __addr_DAT_005eff10, 0x104);
  heap.setU32(0x005efef8, (__addr_DAT_005eff10) >>> 0);
  pcVar2 = heap.u32(0x005f3f70);
  if (heap.u32(heap.u32(0x005f3f70)) == '\0') {
    pcVar2 = __addr_DAT_005eff10;
  }
  FUN_00414730(heap, pcVar2, 0, 0, __addr_local_8, __addr_local_4);
  iVar1 = FUN_004133c0(heap, heap.u32(__addr_local_4) + heap.u32(__addr_local_8) * 4);
  if (iVar1 == 0) {
    __amsg_exit(8);
  }
  FUN_00414730(heap, pcVar2, iVar1, iVar1 + heap.u32(__addr_local_8) * 4, __addr_local_8, __addr_local_4);
  heap.setU32(0x005efee0, (iVar1) >>> 0);
  heap.setU32(0x005efedc, (heap.u32(__addr_local_8) + -1) >>> 0);
  return;
} finally {
    heap.freeFrame(12);
  }
}
