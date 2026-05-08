// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function _strlen(heap, _Str) {
  let uVar1 = 0;
  puVar2 = _Str;
  do {
    if ((puVar2 & 3) == 0) {
      /* goto LAB_00413360 */ throw new Error("goto LAB_00413360 not supported");
    }
    uVar1 = heap.u32(puVar2);
    puVar2 = (puVar2 + 1);
  } while (uVar1 != '\0');
  LAB_00413393: return (puVar2 + (-1 - _Str));
  LAB_00413360: do {
    do {
      puVar3 = puVar2;
      puVar2 = puVar3 + 1;
    } while (((heap.u32(puVar3) ^ 0xffffffff ^ heap.u32(puVar3) + 0x7efefeff) & 0x81010100) == 0);
    uVar1 = heap.u32(puVar3);
    if (uVar1 == '\0') {
      return puVar3 - _Str;
    }
    if ((uVar1 >>> 8) == '\0') {
      return (puVar3 + (1 - _Str));
    }
    if ((uVar1 & 0xff0000) == 0) {
      return (puVar3 + (2 - _Str));
    }
  } while ((uVar1 & 0xff000000) != 0);
  /* goto LAB_00413393 */ throw new Error("goto LAB_00413393 not supported");
}
