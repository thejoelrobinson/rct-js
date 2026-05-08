// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444820.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00444820(heap) {
  const __sp = heap.allocFrame(40);
  const __addr_DAT_00991f8e = __sp + 0;
  const __addr_DAT_00743b94 = __sp + 4;
  const __addr_DAT_00743bac = __sp + 8;
  const __addr_DAT_00743bb0 = __sp + 12;
  const __addr_DAT_00743baa = __sp + 16;
  const __addr_DAT_00743bae = __sp + 20;
  const __addr_DAT_00743ba2 = __sp + 24;
  const __addr_DAT_00743ba4 = __sp + 28;
  const __addr_PTR_LAB_006309a0 = __sp + 32;
  const __addr_DAT_00743b96 = __sp + 36;
  try {
  let uVar1 = 0;
  let in_AX = 0;
  let in_CX = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  if (((heap.u32((heap.u32(0x00981ef8) + 0xe)) < 2) && (in_AX < 0x1000)) && (in_CX < 0x1000)) {
    uVar1 = heap.u32((__addr_DAT_00991f8e) + (((in_AX & 0xfe0) << 2 | in_CX >>> 5)) * 4);
    pbVar2 = heap.u32(0x00991f80);
    while (heap.setU32(0x00991f80, (pbVar2) >>> 0), uVar1 != 0xffff) {
      uVar3 = uVar1;
      iVar4 = uVar3 * 0x100;
      heap.setU32(0x00991f80, (__addr_DAT_00743b94 + iVar4) >>> 0);
      heap.u8(0x991f78) = 2;
      if (((heap.u32((__addr_DAT_00743bac + iVar4)) < (heap.u32((heap.u32(0x00981ef8) + 6)) + heap.u32((heap.u32(0x00981ef8) + 10)))) && (heap.u32((heap.u32(0x00981ef8) + 6)) < heap.u32((__addr_DAT_00743bb0 + iVar4)))) && ((heap.u32((__addr_DAT_00743baa + iVar4)) < (heap.u32((heap.u32(0x00981ef8) + 4)) + heap.u32((heap.u32(0x00981ef8) + 8))) && (heap.u32((heap.u32(0x00981ef8) + 4)) < heap.u32((__addr_DAT_00743bae + iVar4)))))) {
        heap.setU32(0x00991f70, (heap.u32((__addr_DAT_00743ba2) + (uVar3 * 0x80) * 4)) >>> 0);
        heap.setU32(0x00991f74, (heap.u32((__addr_DAT_00743ba4) + (uVar3 * 0x80) * 4)) >>> 0);
        (heap.u32(heap.u32((__addr_PTR_LAB_006309a0) + (heap.u32(heap.u32(0x00991f80))) * 4)))();
        pbVar2 = heap.u32(0x00991f80);
      }
      heap.setU32(0x00991f80, (pbVar2) >>> 0);
      pbVar2 = heap.u32(0x00991f80);
      uVar1 = heap.u32((__addr_DAT_00743b96) + (uVar3 * 0x80) * 4);
    }
  }
  return;
} finally {
    heap.freeFrame(40);
  }
}
