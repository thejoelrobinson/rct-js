// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444c74.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { UNLOCK } from "../runtime/win32.js";
import { LOCK } from "../runtime/ghidra-builtins.js";
export function FUN_00444c74(heap) {
  const __sp = heap.allocFrame(16);
  const __addr_DAT_0087c394 = __sp + 0;
  const __addr_DAT_00743b98 = __sp + 4;
  const __addr_DAT_00743b9a = __sp + 8;
  const __addr_DAT_0087c3a0 = __sp + 12;
  try {
  let bVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_ECX = 0;
  let unaff_ESI = 0;
  if (in_ECX != heap.u32((unaff_ESI + 8))) {
    bVar2 = heap.u32((unaff_ESI + 8));
    uVar3 = heap.u32((unaff_ESI + 4));
    uVar4 = heap.u32((unaff_ESI + 6));
    if (uVar4 == 0xffff) {
      heap.u32((__addr_DAT_0087c394 + bVar2)) = uVar3;
    } else {
      heap.u32((__addr_DAT_00743b98) + (uVar4 * 0x80) * 4) = uVar3;
    }
    if (uVar3 != 0xffff) {
      heap.u32((__addr_DAT_00743b9a) + (uVar3 * 0x80) * 4) = uVar4;
    }
    heap.u32((unaff_ESI + 6)) = 0xffff;
    heap.u32((unaff_ESI + 8)) = in_ECX;
    LOCK();
    uVar3 = heap.u32((__addr_DAT_0087c394 + in_ECX));
    heap.u32((__addr_DAT_0087c394 + in_ECX)) = heap.u32((unaff_ESI + 10));
    UNLOCK(heap);
    heap.u32((unaff_ESI + 4)) = uVar3;
    if (uVar3 != 0xffff) {
      heap.u32((__addr_DAT_00743b9a) + (uVar3 * 0x80) * 4) = heap.u32((unaff_ESI + 10));
    }
    psVar1 = (__addr_DAT_0087c3a0 + bVar2);
    heap.u32(psVar1) = heap.u32(psVar1) + -1;
    heap.u32((__addr_DAT_0087c3a0 + in_ECX)) = heap.u32((__addr_DAT_0087c3a0 + in_ECX)) + 1;
  }
  return;
} finally {
    heap.freeFrame(16);
  }
}
