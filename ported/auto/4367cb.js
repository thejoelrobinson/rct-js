// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4367cb.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004367cb(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_PTR_LAB_004368c8 = __sp + 0;
  const __addr_PTR_LAB_00436a8c = __sp + 4;
  try {
  let in_AX = 0;
  let in_CX = 0;
  if ((((in_AX < 0xfe0) && (in_CX < 0xfe0)) && (0x1f < in_AX)) && (0x1f < in_CX)) {
    heap.setU32(0x00991f04, (0xffff) >>> 0);
    heap.setU32(0x00991f08, (0xffff) >>> 0);
    heap.setU32(0x00991f0c, (0xffff) >>> 0);
    heap.setU32(0x00991f10, (0xffff) >>> 0);
    heap.setU32(0x00991f14, (0xffff) >>> 0);
    heap.setU32(0x00991f18, (0xffff) >>> 0);
    heap.setU32(0x00991f1c, (0xffff) >>> 0);
    heap.setU32(0x00991f20, (0xffff) >>> 0);
    heap.setU32(0x00991f24, (0xffff) >>> 0);
    heap.setU32(0x00991f28, (0xffff) >>> 0);
    heap.setU32(0x00991f2c, (0xffff) >>> 0);
    heap.setU32(0x0099c165, (0) >>> 0);
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004367cb"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004367cb"); })();
    heap.setU32(0x0099a01e, (0xff) >>> 0);
    heap.setU32(0x00991f72, (in_AX) >>> 0);
    heap.setU32(0x00991f76, (in_CX) >>> 0);
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004367cb"); })();
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004367cb"); })();
    (heap.u32(heap.u32((__addr_PTR_LAB_004368c8) + (heap.u32(0x00991f88)) * 4)))();
    return;
  }
  (heap.u32(heap.u32((__addr_PTR_LAB_00436a8c) + (heap.u32(0x00991f88)) * 4)))();
  return;
} finally {
    heap.freeFrame(8);
  }
}
