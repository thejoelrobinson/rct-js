// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45a8a9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_0045a8a9(heap) {
  let cVar1 = 0;
  let in_AX = 0;
  let uVar2 = 0;
  let in_CX = 0;
  let uVar5 = 0;
  pcVar3 = 0x0087f41c;
  uVar5 = 0;
  pcVar6 = 0x0;
  do {
    uVar2 = uVar5;
    pcVar4 = pcVar3;
    pcVar7 = pcVar3;
    pcVar8 = unaff_EDI;
    if (heap.u32(pcVar3) != '\0') {
      while (cVar1 = heap.u32(pcVar8), uVar2 = in_AX, pcVar7 = pcVar6, cVar1 == heap.u32(pcVar4)) {
        pcVar4 = pcVar4 + 1;
        pcVar8 = pcVar8 + 1;
        if (cVar1 == '\0') {
          heap.setU32(0x00991efc, (0x338) >>> 0);
          return 0;
        }
      }
    }
    pcVar3 = pcVar3 + 0x20;
    uVar5 = uVar5 + 1;
    in_AX = uVar2;
    pcVar6 = pcVar7;
  } while (uVar5 < 0x400);
  if (pcVar7 == 0x0) {
    heap.setU32(0x00991efc, (0x339) >>> 0);
    return 0;
  }
  uVar5 = 0;
  do {
    pcVar6 = pcVar7;
    cVar1 = heap.u32(unaff_EDI);
    heap.u32(pcVar6) = cVar1;
    unaff_EDI = unaff_EDI + 1;
    if (cVar1 == '\0') {
      /* goto LAB_0045a920 */ throw new Error("goto LAB_0045a920 not supported");
    }
    uVar5 = uVar5 + 1;
    pcVar7 = pcVar6 + 1;
  } while (uVar5 < 0x20);
  heap.u32(pcVar6) = '\0';
  LAB_0045a920: return (uVar2 | in_CX << 9) + 0x8000;
}
