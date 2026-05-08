// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f239.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0042f239(heap) {
  let cVar1 = 0;
  let in_EAX = 0;
  let unaff_EBX = 0;
  pcVar3 = 0x005f8648;
  if (heap.u32((0x005f851c) + (unaff_EBX) * 4) != '\0') {
    pcVar3 = 0x005f874c;
  }
  pcVar2 = 0x005f831a;
  do {
    pcVar4 = pcVar2;
    cVar1 = heap.u32(pcVar3);
    heap.u32(pcVar4) = cVar1;
    pcVar3 = pcVar3 + 1;
    pcVar2 = pcVar4 + 1;
  } while (cVar1 != '\0');
  pcVar3 = heap.u32((0x005f8174) + (unaff_EBX) * 4);
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
}
