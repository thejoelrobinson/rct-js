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
  pcVar5 = ((heap.u32((param_3 + 0xc))) >>> 0);
  pcVar7 = ((param_1 + 1) >>> 0);
  heap.setU32(param_1, (48) & 0xffffffff);
  pcVar1 = ((pcVar7) >>> 0);
  iVar6 = ((param_2) >>> 0);
  if (0 < param_2) {
    do {
      cVar2 = ((heap.i8(pcVar5)) & 0xff);
      if (cVar2 == 0) {
        cVar2 = ((48) & 0xff);
      } else {
        pcVar5 = ((pcVar5 + 1) >>> 0);
      }
      heap.setU32(pcVar1, (cVar2) & 0xffffffff);
      pcVar1 = ((pcVar1 + 1) >>> 0);
      iVar6 = ((iVar6 + -1) >>> 0);
      param_2 = ((param_2 + -1) >>> 0);
    } while (param_2 != 0);
  }
  heap.setU32(pcVar1, (0) & 0xffffffff);
  if ((-1 < (iVar6 | 0)) && (52 < heap.i8(pcVar5))) {
    cVar2 = ((heap.i8(pcVar1 + (-1))) & 0xff);
    while (pcVar5 = ((pcVar1 + -1) >>> 0), cVar2 == 57) {
      heap.setU32(pcVar5, (48) & 0xffffffff);
      cVar2 = ((heap.i8(pcVar1 + (-2))) & 0xff);
      pcVar1 = ((pcVar5) >>> 0);
    }
    heap.setU32(pcVar5, (heap.i8(pcVar5) + 1) & 0xffffffff);
  }
  if (heap.i8(param_1) == 49) {
    heap.setI32((param_3 + 4), (heap.i32((param_3 + 4)) + 1) & 0xffffffff);
    return;
  }
  uVar3 = ((0xffffffff) >>> 0);
  do {
    pcVar5 = ((pcVar7) >>> 0);
    if (uVar3 == 0) {
      break;
    }
    uVar3 = ((uVar3 - 1) >>> 0);
    pcVar5 = ((pcVar7 + 1) >>> 0);
    cVar2 = ((heap.i8(pcVar7)) & 0xff);
    pcVar7 = ((pcVar5) >>> 0);
  } while (cVar2 != 0);
  uVar3 = ((~uVar3) >>> 0);
  pcVar7 = ((pcVar5 + -uVar3) >>> 0);
  for (uVar4 = ((uVar3 >>> 2) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
    heap.setU32(param_1, (heap.u32(pcVar7)) & 0xffffffff);
    pcVar7 = ((pcVar7 + 4) >>> 0);
    param_1 = ((param_1 + 4) >>> 0);
  }
  for (uVar3 = ((uVar3 & 3) >>> 0); uVar3 != 0; uVar3 = (((uVar3 - 1) >>> 0)) >>> 0) {
    heap.setU32(param_1, (heap.i8(pcVar7)) & 0xffffffff);
    pcVar7 = ((pcVar7 + 1) >>> 0);
    param_1 = ((param_1 + 1) >>> 0);
  }
  return;
}
