// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4176c0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004176c0(heap, param_1, param_2, param_3, param_4) {
  let uVar1 = 0;
  let pcVar2 = 0;
  let cVar3 = 0;
  let pcVar4 = 0;
  pcVar2 = param_2;
  if (param_4 != 0) {
    heap.setU32(param_2, ('-') >>> 0);
    param_2 = param_2 + 1;
    param_1 = -param_1;
    pcVar2 = param_2;
  }
  do {
    pcVar4 = pcVar2;
    uVar1 = param_1;
    param_1 = param_1 / param_3;
    cVar3 = (uVar1 % param_3);
    if ((uVar1 % param_3) < 10) {
      cVar3 = cVar3 + '0';
    } else {
      cVar3 = cVar3 + 'W';
    }
    heap.setU32(pcVar4, (cVar3) >>> 0);
    pcVar2 = pcVar4 + 1;
  } while (param_1 != 0);
  heap.setU32((pcVar4 + (1) * 4), ('\0') >>> 0);
  do {
    cVar3 = heap.u32(pcVar4);
    heap.setU32(pcVar4, (heap.u32(param_2)) >>> 0);
    heap.setU32(param_2, (cVar3) >>> 0);
    pcVar4 = pcVar4 + -1;
    param_2 = param_2 + 1;
  } while (param_2 < pcVar4);
  return;
}
