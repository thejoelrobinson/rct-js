// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413340.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00413340(heap, _Str) {
  let uVar1 = 0;
  let puVar2 = 0;
  let puVar3 = 0;
  LAB_00413360: {
  puVar2 = ((_Str) >>> 0);
  do {
    if ((((puVar2) >>> 0) & 3) == 0) {
      break LAB_00413360;
    }
    uVar1 = ((heap.u32(puVar2)) >>> 0);
    puVar2 = (((((puVar2) >>> 0) + 1)) >>> 0);
  } while (((uVar1) << 24 >> 24) != 0);
  LAB_00413393: return (((((puVar2) >>> 0) + (-1 - ((_Str) >>> 0)))) >>> 0);
  }
  do {
    do {
      puVar3 = ((puVar2) >>> 0);
      puVar2 = ((puVar3 + ((1) * 4)) >>> 0);
    } while (((heap.u32(puVar3) ^ 0xffffffff ^ heap.u32(puVar3) + 0x7efefeff) & 0x81010100) == 0);
    uVar1 = ((heap.u32(puVar3)) >>> 0);
    if (((uVar1) << 24 >> 24) == 0) {
      return ((puVar3) >>> 0) - ((_Str) >>> 0);
    }
    if ((((uVar1 >>> 8)) << 24 >> 24) == 0) {
      return (((((puVar3) >>> 0) + (1 - ((_Str) >>> 0)))) >>> 0);
    }
    if ((uVar1 & 0xff0000) == 0) {
      return (((((puVar3) >>> 0) + (2 - ((_Str) >>> 0)))) >>> 0);
    }
  } while ((uVar1 & 0xff000000) != 0);
  /* goto LAB_00413393 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00413340/LAB_00413393"); return 0;
}
