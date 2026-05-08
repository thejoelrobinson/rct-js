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
  if ((_Str1 & 3) != 0) {
    if ((_Str1 & 1) != 0) {
      bVar4 = heap.u32(_Str1);
      _Str1 = _Str1 + 1;
      bVar5 = bVar4 < heap.u32(_Str2);
      if (bVar4 != heap.u32(_Str2)) {
        /* goto LAB_00414364 */ throw new Error("goto LAB_00414364 not supported");
      }
      _Str2 = _Str2 + 1;
      if (bVar4 == 0) {
        return 0;
      }
      if ((_Str1 & 2) == 0) {
        /* goto LAB_00414330 */ throw new Error("goto LAB_00414330 not supported");
      }
    }
    uVar1 = heap.u32(_Str1);
    _Str1 = _Str1 + 2;
    bVar4 = uVar1;
    bVar5 = bVar4 < heap.u32(_Str2);
    if (bVar4 != heap.u32(_Str2)) {
      /* goto LAB_00414364 */ throw new Error("goto LAB_00414364 not supported");
    }
    if (bVar4 == 0) {
      return 0;
    }
    bVar4 = (uVar1 >>> 8);
    bVar5 = bVar4 < heap.u32(_Str2 + (1) * 4);
    if (bVar4 != heap.u32(_Str2 + (1) * 4)) {
      /* goto LAB_00414364 */ throw new Error("goto LAB_00414364 not supported");
    }
    if (bVar4 == 0) {
      return 0;
    }
    _Str2 = _Str2 + 2;
  }
  LAB_00414330: while (true) {
    uVar2 = heap.u32(_Str1);
    bVar4 = uVar2;
    bVar5 = bVar4 < heap.u32(_Str2);
    if (bVar4 != heap.u32(_Str2)) {
      break;
    }
    if (bVar4 == 0) {
      return 0;
    }
    bVar4 = (uVar2 >>> 8);
    bVar5 = bVar4 < heap.u32(_Str2 + (1) * 4);
    if (bVar4 != heap.u32(_Str2 + (1) * 4)) {
      break;
    }
    if (bVar4 == 0) {
      return 0;
    }
    bVar4 = (uVar2 >>> 0x10);
    bVar5 = bVar4 < heap.u32(_Str2 + (2) * 4);
    if (bVar4 != heap.u32(_Str2 + (2) * 4)) {
      break;
    }
    bVar3 = (uVar2 >>> 0x18);
    if (bVar4 == 0) {
      return 0;
    }
    bVar5 = bVar3 < heap.u32(_Str2 + (3) * 4);
    if (bVar3 != heap.u32(_Str2 + (3) * 4)) {
      break;
    }
    _Str2 = _Str2 + 4;
    _Str1 = _Str1 + 4;
    if (bVar3 == 0) {
      return 0;
    }
  }
  LAB_00414364: return bVar5 * -2 + 1;
}
