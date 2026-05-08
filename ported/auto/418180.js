// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418180.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_00418ef0 } from "./418ef0.js";
export function FUN_00418180(heap, param_1, param_2) {
  let bVar1 = 0;
  let iVar2 = 0;
  let iVar3 = 0;
  bVar1 = (byte)(param_2 >>> 0x1f);
  iVar3 = (param_2 + (param_2 >>> 0x1f & 0x1fU)) >>> 5;
  iVar2 = FUN_00418ef0(heap, heap.u32((param_1 + iVar3 * 4)), 1 << (0x1f - (((param_2 ^ bVar1) - bVar1 & 0x1f ^ bVar1) - bVar1) & 0x1f), param_1 + iVar3 * 4);
  iVar3 = iVar3 + -1;
  if (-1 < iVar3) {
    puVar4 = (param_1 + iVar3 * 4);
    do {
      if (iVar2 == 0) {
        return;
      }
      iVar2 = FUN_00418ef0(heap, heap.u32(puVar4), 1, puVar4);
      iVar3 = iVar3 + -1;
      puVar4 = puVar4 + -1;
    } while (-1 < iVar3);
  }
  return;
}
