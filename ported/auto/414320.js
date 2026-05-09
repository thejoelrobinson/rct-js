// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414320.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00414320(heap, _Str1, _Str2) {
  let uVar1 = 0;
  let uVar2 = 0;
  let bVar3 = 0;
  let bVar4 = 0;
  let bVar5 = 0;
  LAB_00414364: {
  LAB_00414330: {
  if ((((_Str1) >>> 0) & 3) != 0) {
    if ((((_Str1) >>> 0) & 1) != 0) {
      bVar4 = ((heap.i8(_Str1)) & 0xff);
      _Str1 = ((_Str1 + 1) >>> 0);
      bVar5 = ((bVar4 < heap.u8(_Str2)) & 0xff);
      if (bVar4 != heap.i8(_Str2)) {
        break LAB_00414364;
      }
      _Str2 = ((_Str2 + 1) >>> 0);
      if (bVar4 == 0) {
        return 0;
      }
      if ((((_Str1) >>> 0) & 2) == 0) {
        break LAB_00414330;
      }
    }
    uVar1 = ((heap.u16(_Str1)) & 0xffff);
    _Str1 = ((_Str1 + 2) >>> 0);
    bVar4 = ((((uVar1) & 0xff)) & 0xff);
    bVar5 = ((bVar4 < heap.u8(_Str2)) & 0xff);
    if (bVar4 != heap.i8(_Str2)) {
      break LAB_00414364;
    }
    if (bVar4 == 0) {
      return 0;
    }
    bVar4 = ((((((uVar1) & 0xffff) >>> 8) & 0xff)) & 0xff);
    bVar5 = ((bVar4 < ((heap.i8(_Str2 + (1))) & 0xff)) & 0xff);
    if (bVar4 != heap.i8(_Str2 + (1))) {
      break LAB_00414364;
    }
    if (bVar4 == 0) {
      return 0;
    }
    _Str2 = ((_Str2 + 2) >>> 0);
  }
  }
  while (true) {
    uVar2 = ((heap.u32(_Str1)) >>> 0);
    bVar4 = ((((uVar2) & 0xff)) & 0xff);
    bVar5 = ((bVar4 < heap.u8(_Str2)) & 0xff);
    if (bVar4 != heap.i8(_Str2)) {
      break;
    }
    if (bVar4 == 0) {
      return 0;
    }
    bVar4 = ((((((uVar2) >>> 0) >>> 8) & 0xff)) & 0xff);
    bVar5 = ((bVar4 < ((heap.i8(_Str2 + (1))) & 0xff)) & 0xff);
    if (bVar4 != heap.i8(_Str2 + (1))) {
      break;
    }
    if (bVar4 == 0) {
      return 0;
    }
    bVar4 = ((((((uVar2) >>> 0) >>> 0x10) & 0xff)) & 0xff);
    bVar5 = ((bVar4 < ((heap.i8(_Str2 + (2))) & 0xff)) & 0xff);
    if (bVar4 != heap.i8(_Str2 + (2))) {
      break;
    }
    bVar3 = ((((((uVar2) >>> 0) >>> 0x18) & 0xff)) & 0xff);
    if (bVar4 == 0) {
      return 0;
    }
    bVar5 = ((bVar3 < ((heap.i8(_Str2 + (3))) & 0xff)) & 0xff);
    if (bVar3 != heap.i8(_Str2 + (3))) {
      break;
    }
    _Str2 = ((_Str2 + 4) >>> 0);
    _Str1 = ((_Str1 + 4) >>> 0);
    if (bVar3 == 0) {
      return 0;
    }
  }
  }
  return ((bVar5) >>> 0) * -2 + 1;
}
