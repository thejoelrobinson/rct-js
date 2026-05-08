// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f239.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0042f239(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_005f8648 = __sp + 0;
  const __addr_DAT_005f851c = __sp + 4;
  const __addr_DAT_005f874c = __sp + 8;
  const __addr_DAT_005f831a = __sp + 12;
  const __addr_PTR_s_Data_CSG1_DAT_005f8174 = __sp + 16;
  try {
  let cVar1 = 0;
  let in_EAX = 0;
  let unaff_EBX = 0;
  pcVar3 = __addr_DAT_005f8648;
  if (heap.u32((__addr_DAT_005f851c) + (unaff_EBX) * 4) != '\0') {
    pcVar3 = __addr_DAT_005f874c;
  }
  pcVar2 = __addr_DAT_005f831a;
  do {
    pcVar4 = pcVar2;
    cVar1 = heap.u32(pcVar3);
    heap.u32(pcVar4) = cVar1;
    pcVar3 = pcVar3 + 1;
    pcVar2 = pcVar4 + 1;
  } while (cVar1 != '\0');
  pcVar3 = heap.u32((__addr_PTR_s_Data_CSG1_DAT_005f8174) + (unaff_EBX) * 4);
  if (heap.u32(pcVar4 + (-1) * 4) != '\\') {
    heap.u32(pcVar4) = '\\';
    pcVar4 = pcVar4 + 1;
  }
  do {
    cVar1 = heap.u32(pcVar3);
    heap.u32(pcVar4) = cVar1;
    pcVar3 = pcVar3 + 1;
    pcVar4 = pcVar4 + 1;
  } while (cVar1 != '\0');
  return in_EAX;
} finally {
    heap.freeFrame(20);
  }
}
