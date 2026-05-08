// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4181f0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00418110 } from "./418110.js";
import { FUN_00418180 } from "./418180.js";
export function FUN_004181f0(heap, param_1, param_2) {
  let iVar1 = 0;
  let bVar2 = 0;
  let iVar3 = 0;
  let local_4 = 0;
  local_4 = 0;
  bVar2 = (byte)(param_2 >>> 0x1f);
  bVar2 = 0x1f - (((param_2 ^ bVar2) - bVar2 & 0x1f ^ bVar2) - bVar2);
  iVar3 = (param_2 + (param_2 >>> 0x1f & 0x1fU)) >>> 5;
  if (((heap.u32((param_1 + iVar3 * 4)) & 1 << (bVar2 & 0x1f)) != 0) && (iVar1 = FUN_00418110(heap, param_1, param_2 + 1), iVar1 == 0)) {
    local_4 = FUN_00418180(heap, param_1, param_2 + -1);
  }
  heap.u32((param_1 + iVar3 * 4)) = heap.u32((param_1 + iVar3 * 4)) & -1 << (bVar2 & 0x1f);
  iVar3 = iVar3 + 1;
  if (iVar3 < 3) {
    puVar4 = (param_1 + iVar3 * 4);
    for (iVar1 = 3 - iVar3; iVar1 != 0; iVar1 = iVar1 + -1) {
      heap.u32(puVar4) = 0;
      puVar4 = puVar4 + 1;
    }
  }
  return local_4;
}
