// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40ab58.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { DestroyWindow } from "../runtime/win32.js";
import { FUN_00413470 } from "./413470.js";
export function FUN_0040ab58(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_local_74 = __sp + 0;
  try {
  let iVar2 = 0;
  let local_70 = 0;
  let local_c = 0;
  local_8 = heap.u32(0x005ebf48);
  _memset(__addr_local_74, 0, 0x6c);
  heap.setU32(__addr_local_74, (0x6c) >>> 0);
  local_70 = 1;
  iVar2 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf34)) + 0x58))))(heap.u32(0x005ebf34), __addr_local_74);
  if ((iVar2 == 0) && ((local_c & 0x10) != 0)) {
    (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x28))))(heap.u32(0x005ebf30));
  }
  while (local_8 != 0x0) {
    puVar1 = heap.u32(local_8 + (2) * 4);
    FUN_00413470(heap, heap.u32(local_8));
    (heap.u32(heap.u32((heap.u32(heap.u32(local_8 + (1) * 4)) + 8))))(heap.u32(local_8 + (1) * 4));
    FUN_00413470(heap, local_8);
    local_8 = puVar1;
  }
  heap.setU32(0x005ebf48, (0x0) >>> 0);
  if (heap.u32(0x005ebf44) != 0x0) {
    (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf44)) + 8))))(heap.u32(0x005ebf44));
    heap.setU32(0x005ebf44, (0x0) >>> 0);
  }
  if (heap.u32(0x005ebf38) != 0) {
    FUN_00413470(heap, heap.u32(0x005ebf38));
    heap.setU32(0x005ebf38, (0) >>> 0);
  }
  if (heap.u32(0x005ebf34) != 0x0) {
    (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf34)) + 8))))(heap.u32(0x005ebf34));
    heap.setU32(0x005ebf34, (0x0) >>> 0);
  }
  if (heap.u32(0x005ebf3c) != 0x0) {
    (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf3c)) + 8))))(heap.u32(0x005ebf3c));
    heap.setU32(0x005ebf3c, (0x0) >>> 0);
  }
  (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x4c))))(heap.u32(0x005ebf30));
  (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x50))))(heap.u32(0x005ebf30), heap.u32(0x005e916c), 8);
  if (heap.u32(0x005e916c) != 0x0) {
    DestroyWindow(heap, heap.u32(0x005e916c));
    heap.setU32(0x005e916c, (0x0) >>> 0);
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
