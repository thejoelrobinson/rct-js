// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/458f0f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00458f0f(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_s_March_006432ac = __sp + 0;
  try {
  let cVar1 = 0;
  let in_EAX = 0;
  let pcVar2 = 0;
  let unaff_EDI = 0;
  pcVar2 = heap.u32((__addr_PTR_s_March_006432ac) + (in_EAX & 7) * 4);
  do {
    cVar1 = heap.u32(pcVar2);
    heap.setU32(unaff_EDI, (cVar1) >>> 0);
    pcVar2 = pcVar2 + 1;
    unaff_EDI = unaff_EDI + 1;
  } while (cVar1 != '\0');
  return;
} finally {
    heap.freeFrame(4);
  }
}
