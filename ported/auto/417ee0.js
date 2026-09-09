// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/417ee0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00417ee0(heap, param_1) {
  let uVar1 = 0;
  let uVar2 = 0;
  uVar1 = ((0) >>> 0);
  if ((param_1 & 1) != 0) {
    uVar1 = ((0x10) >>> 0);
  }
  if ((param_1 & 4) != 0) {
    uVar1 = ((uVar1 | 8) >>> 0);
  }
  if ((param_1 & 8) != 0) {
    uVar1 = ((uVar1 | 4) >>> 0);
  }
  if ((param_1 & 0x10) != 0) {
    uVar1 = ((uVar1 | 2) >>> 0);
  }
  if ((param_1 & 0x20) != 0) {
    uVar1 = ((uVar1 | 1) >>> 0);
  }
  if ((param_1 & 2) != 0) {
    uVar1 = ((uVar1 | 0x80000) >>> 0);
  }
  uVar2 = ((param_1 & 0xc00) >>> 0);
  if (uVar2 < 0x401) {
    if (uVar2 == 0x400) {
      uVar1 = ((uVar1 | 0x100) >>> 0);
    }
  } else {
    if (uVar2 == 0x800) {
    uVar1 = ((uVar1 | 0x200) >>> 0);
  } else {
    if (uVar2 == 0xc00) {
    uVar1 = ((uVar1 | 0x300) >>> 0);
  }
  }
  }
  if ((param_1 & 0x300) == 0) {
    uVar1 = ((uVar1 | 0x20000) >>> 0);
  } else {
    if ((param_1 & 0x300) == 0x200) {
    uVar1 = ((uVar1 | 0x10000) >>> 0);
  }
  }
  if ((param_1 & 0x1000) != 0) {
    uVar1 = ((uVar1 | 0x40000) >>> 0);
  }
  return uVar1;
}
