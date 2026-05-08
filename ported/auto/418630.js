// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418630.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00418630(heap, param_1, param_2, param_3) {
  let pcVar1 = 0;
  let cVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let pcVar5 = 0;
  let iVar6 = 0;
  let pcVar7 = 0;
  pcVar5 = heap.u32((param_3 + 0xc));
  pcVar7 = param_1 + 1;
  heap.setU32(param_1, ('0') >>> 0);
  pcVar1 = pcVar7;
  iVar6 = param_2;
  if (0 < param_2) {
    do {
      cVar2 = heap.u32(pcVar5);
      if (cVar2 == '\0') {
        cVar2 = '0';
      } else {
        pcVar5 = pcVar5 + 1;
      }
      heap.setU32(pcVar1, (cVar2) >>> 0);
      pcVar1 = pcVar1 + 1;
      iVar6 = iVar6 + -1;
      param_2 = param_2 + -1;
    } while (param_2 != 0);
  }
  heap.setU32(pcVar1, ('\0') >>> 0);
  if ((-1 < iVar6) && ('4' < heap.u32(pcVar5))) {
    cVar2 = heap.u32(pcVar1 + (-1) * 4);
    while (pcVar5 = pcVar1 + -1, cVar2 == '9') {
      heap.setU32(pcVar5, ('0') >>> 0);
      cVar2 = heap.u32(pcVar1 + (-2) * 4);
      pcVar1 = pcVar5;
    }
    heap.setU32(pcVar5, (heap.u32(pcVar5) + '\x01') >>> 0);
  }
  if (heap.u32(param_1) == '1') {
    heap.setU32((param_3 + 4), (heap.u32((param_3 + 4)) + 1) >>> 0);
    return;
  }
  uVar3 = 0xffffffff;
  do {
    pcVar5 = pcVar7;
    if (uVar3 == 0) {
      break;
    }
    uVar3 = uVar3 - 1;
    pcVar5 = pcVar7 + 1;
    cVar2 = heap.u32(pcVar7);
    pcVar7 = pcVar5;
  } while (cVar2 != '\0');
  uVar3 = ~uVar3;
  pcVar7 = pcVar5 + -uVar3;
  for (uVar4 = uVar3 >>> 2; uVar4 != 0; uVar4 = uVar4 - 1) {
    heap.setU32(param_1, (heap.u32(pcVar7)) >>> 0);
    pcVar7 = pcVar7 + 4;
    param_1 = param_1 + 4;
  }
  for (uVar3 = uVar3 & 3; uVar3 != 0; uVar3 = uVar3 - 1) {
    heap.setU32(param_1, (heap.u32(pcVar7)) >>> 0);
    pcVar7 = pcVar7 + 1;
    param_1 = param_1 + 1;
  }
  return;
}
