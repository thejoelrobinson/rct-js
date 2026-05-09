// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/417d90.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CARRY4, CONCAT44 } from "../../runtime/ghidra-builtins.js";
export function FUN_00417d90(heap, param_1, param_2, param_3, param_4) {
  let uVar1 = 0;
  let lVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  uVar3 = ((param_1) >>> 0);
  uVar8 = ((param_4) >>> 0);
  uVar6 = ((param_2) >>> 0);
  uVar9 = ((param_3) >>> 0);
  if (param_4 == 0) {
    uVar3 = ((param_2 / param_3) >>> 0);
    iVar4 = ((((((((param_2) >>> 0) % ((param_3) >>> 0) << 0x20 | ((param_1) >>> 0)) / ((param_3) >>> 0))) >>> 0)) >>> 0);
  } else {
    do {
      uVar5 = ((uVar8 >>> 1) >>> 0);
      uVar9 = ((uVar9 >>> 1 | (((uVar8 & 1) != 0) >>> 0) << 0x1f) >>> 0);
      uVar7 = ((uVar6 >>> 1) >>> 0);
      uVar3 = ((uVar3 >>> 1 | (((uVar6 & 1) != 0) >>> 0) << 0x1f) >>> 0);
      uVar8 = ((uVar5) >>> 0);
      uVar6 = ((uVar7) >>> 0);
    } while (uVar5 != 0);
    uVar1 = ((CONCAT44(uVar7, uVar3) / ((uVar9) >>> 0)) >>> 0);
    iVar4 = ((((uVar1) >>> 0)) >>> 0);
    lVar2 = ((((param_3) >>> 0) * (uVar1 & 0xffffffff)) >>> 0);
    uVar3 = ((((((lVar2) >>> 0) >>> 0x20) >>> 0)) >>> 0);
    uVar8 = ((uVar3 + iVar4 * param_4) >>> 0);
    if (((CARRY4(uVar3, iVar4 * param_4)) || (param_2 < uVar8)) || ((param_2 <= uVar8 && (param_1 < ((lVar2) >>> 0))))) {
      iVar4 = ((iVar4 + -1) >>> 0);
    }
    uVar3 = ((0) >>> 0);
  }
  return CONCAT44(uVar3, iVar4);
}
