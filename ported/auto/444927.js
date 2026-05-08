// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444927.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
export function FUN_00444927(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_00991f8e = __sp + 0;
  const __addr_DAT_00743b94 = __sp + 4;
  const __addr_DAT_00743b96 = __sp + 8;
  const __addr_PTR_LAB_004449c4 = __sp + 12;
  try {
  let uVar1 = 0;
  let in_AX = 0;
  let uVar2 = 0;
  let in_ECX = 0;
  let in_DX = 0;
  let uVar3 = 0;
  if (in_AX == 0x8000) {
    uVar2 = 0x4000;
  } else {
    uVar2 = ((in_AX & 0xfe0) << 2 | (in_ECX >>> 5) & 0x7ff);
  }
  if (heap.u32((unaff_ESI + 0xe)) == 0x8000) {
    uVar3 = 0x4000;
  } else {
    uVar3 = ((heap.u32((unaff_ESI + 0xe)) & 0xfe0) << 2 | heap.u32((unaff_ESI + 0x10)) >>> 5);
  }
  if (uVar2 != uVar3) {
    puVar4 = __addr_DAT_00991f8e + uVar3;
    while (__addr_DAT_00743b94 + heap.u32(puVar4) * 0x100 != unaff_ESI) {
      puVar4 = __addr_DAT_00743b96 + heap.u32(puVar4) * 0x80;
    }
    heap.u32(puVar4) = heap.u32((unaff_ESI + 2));
    LOCK();
    uVar1 = heap.u32((__addr_DAT_00991f8e) + (uVar2) * 4);
    heap.u32((__addr_DAT_00991f8e) + (uVar2) * 4) = heap.u32((unaff_ESI + 10));
    UNLOCK();
    heap.u32((unaff_ESI + 2)) = uVar1;
  }
  if (in_AX != 0x8000) {
    (heap.u32(heap.u32((__addr_PTR_LAB_004449c4) + (heap.u32(0x00991f88)) * 4)))();
    return;
  }
  heap.u32((unaff_ESI + 0x16)) = 0x8000;
  heap.u32((unaff_ESI + 0xe)) = 0x8000;
  heap.u32((unaff_ESI + 0x10)) = in_ECX;
  heap.u32((unaff_ESI + 0x12)) = in_DX;
  return;
} finally {
    heap.freeFrame(16);
  }
}
