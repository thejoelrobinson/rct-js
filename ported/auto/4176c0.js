// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4176c0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004176c0(heap, param_1, param_2, param_3, param_4) {
  let uVar1 = 0;
  let pcVar2 = 0;
  let cVar3 = 0;
  let pcVar4 = 0;
  pcVar2 = ((param_2) >>> 0);
  if (param_4 != 0) {
    heap.setU32(param_2, (45) & 0xffffffff);
    param_2 = ((param_2 + 1) >>> 0);
    param_1 = ((-param_1) >>> 0);
    pcVar2 = ((param_2) >>> 0);
  }
  do {
    pcVar4 = ((pcVar2) >>> 0);
    uVar1 = ((((param_1) >>> 0)) >>> 0);
    param_1 = ((param_1 / param_3) >>> 0);
    cVar3 = (((((uVar1 % ((param_3) >>> 0))) << 24 >> 24)) & 0xff);
    if (((uVar1 % ((param_3) >>> 0)) >>> 0) < 10) {
      cVar3 = ((cVar3 + 48) & 0xff);
    } else {
      cVar3 = ((cVar3 + 87) & 0xff);
    }
    heap.setU32(pcVar4, (cVar3) & 0xffffffff);
    pcVar2 = ((pcVar4 + 1) >>> 0);
  } while (param_1 != 0);
  heap.setI8((pcVar4 + (1)), (0) & 0xff);
  do {
    cVar3 = ((heap.i8(pcVar4)) & 0xff);
    heap.setU8(pcVar4, (heap.i8(param_2)) & 0xffffffff);
    heap.setU32(param_2, (cVar3) & 0xffffffff);
    pcVar4 = ((pcVar4 + -1) >>> 0);
    param_2 = ((param_2 + 1) >>> 0);
  } while (param_2 < pcVar4);
  return;
}
