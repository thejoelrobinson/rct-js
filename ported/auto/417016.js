// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/417016.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00417016(heap, param_1) {
  let uVar1 = 0;
  let cVar2 = 0;
  let in_EAX = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let cVar6 = 0;
  let uVar7 = 0;
  cVar6 = in_EAX;
  while ((param_1 & 3) != 0) {
    uVar7 = heap.u32(param_1);
    if (uVar7 == cVar6) {
      return param_1;
    }
    param_1 = (param_1 + 1);
    if (uVar7 == '\0') {
      return 0x0;
    }
  }
  uVar7 = in_EAX | in_EAX << 8;
  while (true) {
    while (true) {
      uVar1 = heap.u32(param_1);
      uVar4 = uVar1 ^ (uVar7 << 0x10 | uVar7);
      uVar3 = uVar1 ^ 0xffffffff ^ uVar1 + 0x7efefeff;
      puVar5 = param_1 + 1;
      if (((uVar4 ^ 0xffffffff ^ uVar4 + 0x7efefeff) & 0x81010100) != 0) {
        break;
      }
      param_1 = puVar5;
      if ((uVar3 & 0x81010100) != 0) {
        if ((uVar3 & 0x1010100) != 0) {
          return 0x0;
        }
        if ((uVar1 + 0x7efefeff & 0x80000000) == 0) {
          return 0x0;
        }
      }
    }
    uVar1 = heap.u32(param_1);
    if (uVar1 == cVar6) {
      return param_1;
    }
    if (uVar1 == '\0') {
      return 0x0;
    }
    cVar2 = (uVar1 >>> 8);
    if (cVar2 == cVar6) {
      return (param_1 + 1);
    }
    if (cVar2 == '\0') {
      return 0x0;
    }
    cVar2 = (uVar1 >>> 0x10);
    if (cVar2 == cVar6) {
      return (param_1 + 2);
    }
    if (cVar2 == '\0') {
      break;
    }
    cVar2 = (uVar1 >>> 0x18);
    if (cVar2 == cVar6) {
      return (param_1 + 3);
    }
    param_1 = puVar5;
    if (cVar2 == '\0') {
      return 0x0;
    }
  }
  return 0x0;
}
