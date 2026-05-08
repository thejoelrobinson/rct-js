// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444d1f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00444c74 } from "./444c74.js";
import { FUN_0045a930 } from "./45a930.js";
export function FUN_00444d1f(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_00991f8e = __sp + 0;
  const __addr_DAT_00743b94 = __sp + 4;
  const __addr_DAT_00743b96 = __sp + 8;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  uVar1 = FUN_00444c74(heap);
  FUN_0045a930(heap);
  heap.u32(unaff_ESI) = 0xff;
  if (heap.u32((unaff_ESI + 0xe)) == 0x8000) {
    uVar2 = 0x4000;
  } else {
    uVar2 = (uint)(ushort)((heap.u32((unaff_ESI + 0xe)) & 0xfe0) << 2 | heap.u32((unaff_ESI + 0x10)) >>> 5);
  }
  puVar3 = __addr_DAT_00991f8e + uVar2;
  while (__addr_DAT_00743b94 + (uint) * puVar3 * 0x100 != unaff_ESI) {
    puVar3 = __addr_DAT_00743b96 + (uint) * puVar3 * 0x80;
  }
  heap.u32(puVar3) = heap.u32((unaff_ESI + 2));
  return uVar1;
} finally {
    heap.freeFrame(12);
  }
}
