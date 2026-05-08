// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4519c9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0042c711 } from "./42c711.js";
import { FUN_004518fc } from "./4518fc.js";
export function FUN_004519c9(heap) {
  const __sp = heap.allocFrame(32);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_0088757d = __sp + 4;
  const __addr_DAT_0088755d = __sp + 8;
  const __addr_DAT_00887442 = __sp + 12;
  const __addr_DAT_00887444 = __sp + 16;
  const __addr_DAT_0088755c = __sp + 20;
  const __addr_DAT_0088751d = __sp + 24;
  const __addr_DAT_00887563 = __sp + 28;
  try {
  let cVar2 = 0;
  let in_EDX = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  uVar3 = in_EDX & 0xff;
  iVar4 = uVar3 * 0x260;
  if ((heap.u32((__addr_DAT_00887422) + (uVar3 * 0x130) * 4) & 0x80) != 0) {
    pcVar1 = __addr_DAT_0088757d + iVar4;
    heap.u32(pcVar1) = heap.u32(pcVar1) + '\x01';
    if (heap.u32(pcVar1) == '\0') {
      heap.u32((__addr_DAT_0088757d) + (iVar4) * 4) = heap.u32((__addr_DAT_0088757d) + (iVar4) * 4) + -0x10;
    }
    if ((((heap.u32((__addr_DAT_0088757d) + (iVar4) * 4) & 0xf) == 0) && (heap.u32((__addr_DAT_0088755d) + (iVar4) * 4) != '\x03')) && (heap.u32((__addr_DAT_0088755d) + (iVar4) * 4) != '\x04')) {
      heap.u16(0x971e86) = heap.u32((__addr_DAT_00887442) + (uVar3 * 0x130) * 4);
      unique0x00017200 = heap.u32((__addr_DAT_00887444) + (uVar3 * 0x98) * 4);
      FUN_0042c711(heap);
    }
  }
  cVar2 = heap.u32((__addr_DAT_0088755c) + (iVar4) * 4);
  if (((cVar2 == '\0') || (cVar2 == '\a')) || (cVar2 == '\x06')) {
    heap.u32((__addr_DAT_00887422) + (uVar3 * 0x130) * 4) = heap.u32((__addr_DAT_00887422) + (uVar3 * 0x130) * 4) | 0x80;
    heap.u32((__addr_DAT_0088751d) + (iVar4) * 4) = heap.u32((__addr_DAT_0088751d) + (iVar4) * 4) | 0x1c;
    heap.u32((__addr_DAT_0088755d) + (iVar4) * 4) = 1;
    heap.u32((__addr_DAT_00887563) + (iVar4) * 4) = cVar2;
    FUN_004518fc(heap);
  }
  return;
} finally {
    heap.freeFrame(32);
  }
}
