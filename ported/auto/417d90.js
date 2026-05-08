// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CARRY4, CONCAT44 } from "../runtime/ghidra-builtins.js";
export function __aulldiv(heap, param_1, param_2, param_3, param_4) {
  let uVar1 = 0;
  let lVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  uVar3 = param_1;
  uVar8 = param_4;
  uVar6 = param_2;
  uVar9 = param_3;
  if (param_4 == 0) {
    uVar3 = param_2 / param_3;
    iVar4 = ((param_2 % param_3 << 0x20 | param_1) / param_3);
  } else {
    do {
      uVar5 = uVar8 >>> 1;
      uVar9 = uVar9 >>> 1 | ((uVar8 & 1) != 0) << 0x1f;
      uVar7 = uVar6 >>> 1;
      uVar3 = uVar3 >>> 1 | ((uVar6 & 1) != 0) << 0x1f;
      uVar8 = uVar5;
      uVar6 = uVar7;
    } while (uVar5 != 0);
    uVar1 = CONCAT44(uVar7, uVar3) / uVar9;
    iVar4 = uVar1;
    lVar2 = param_3 * (uVar1 & 0xffffffff);
    uVar3 = (lVar2 >>> 0x20);
    uVar8 = uVar3 + iVar4 * param_4;
    if (((CARRY4(uVar3, iVar4 * param_4)) || (param_2 < uVar8)) || ((param_2 <= uVar8 && (param_1 < lVar2)))) {
      iVar4 = iVar4 + -1;
    }
    uVar3 = 0;
  }
  return CONCAT44(uVar3, iVar4);
}
