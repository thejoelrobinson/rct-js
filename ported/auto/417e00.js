// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CARRY4, CONCAT44 } from "../../runtime/ghidra-builtins.js";
export function __aullrem(heap, param_1, param_2, param_3, param_4) {
  let uVar1 = 0;
  let lVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let iVar6 = 0;
  let iVar7 = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let uVar10 = 0;
  let bVar11 = 0;
  uVar3 = param_1;
  uVar4 = param_4;
  uVar9 = param_2;
  uVar10 = param_3;
  if (param_4 == 0) {
    iVar6 = ((param_2 % param_3 << 0x20 | param_1) % param_3);
    iVar7 = 0;
  } else {
    do {
      uVar5 = uVar4 >>> 1;
      uVar10 = uVar10 >>> 1 | ((uVar4 & 1) != 0) << 0x1f;
      uVar8 = uVar9 >>> 1;
      uVar3 = uVar3 >>> 1 | ((uVar9 & 1) != 0) << 0x1f;
      uVar4 = uVar5;
      uVar9 = uVar8;
    } while (uVar5 != 0);
    uVar1 = CONCAT44(uVar8, uVar3) / uVar10;
    uVar3 = uVar1 * param_4;
    lVar2 = (uVar1 & 0xffffffff) * param_3;
    uVar9 = (lVar2 >>> 0x20);
    uVar4 = lVar2;
    uVar10 = uVar9 + uVar3;
    if (((CARRY4(uVar9, uVar3)) || (param_2 < uVar10)) || ((param_2 <= uVar10 && (param_1 < uVar4)))) {
      bVar11 = uVar4 < param_3;
      uVar4 = uVar4 - param_3;
      uVar10 = (uVar10 - param_4) - bVar11;
    }
    iVar6 = -(uVar4 - param_1);
    iVar7 = -(uVar4 - param_1 != 0) - ((uVar10 - param_2) - (uVar4 < param_1));
  }
  return CONCAT44(iVar7, iVar6);
}
