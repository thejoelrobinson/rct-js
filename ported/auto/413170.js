// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413170.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00413170(heap, param_1, param_2) {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let puVar4 = 0;
  puVar4 = param_1;
  while ((param_2 & 3) != 0) {
    bVar1 = heap.u32(param_2);
    uVar3 = bVar1;
    param_2 = (param_2 + 1);
    if (bVar1 == 0) {
      /* goto LAB_00413258 */ throw new Error("goto LAB_00413258 not supported");
    }
    heap.setU32(puVar4, (bVar1) >>> 0);
    puVar4 = (puVar4 + 1);
  }
  do {
    uVar2 = heap.u32(param_2);
    uVar3 = heap.u32(param_2);
    param_2 = param_2 + 1;
    if (((uVar2 ^ 0xffffffff ^ uVar2 + 0x7efefeff) & 0x81010100) != 0) {
      if (uVar3 == '\0') {
        LAB_00413258: heap.setU32(puVar4, (uVar3) >>> 0);
        return param_1;
      }
      if ((uVar3 >>> 8) == '\0') {
        heap.setU32(puVar4, (uVar3) >>> 0);
        return param_1;
      }
      if ((uVar3 & 0xff0000) == 0) {
        heap.setU32(puVar4, (uVar3) >>> 0);
        heap.setU32((puVar4 + 2), (0) >>> 0);
        return param_1;
      }
      if ((uVar3 & 0xff000000) == 0) {
        heap.setU32(puVar4, (uVar3) >>> 0);
        return param_1;
      }
    }
    heap.setU32(puVar4, (uVar3) >>> 0);
    puVar4 = puVar4 + 1;
  } while (true);
}
