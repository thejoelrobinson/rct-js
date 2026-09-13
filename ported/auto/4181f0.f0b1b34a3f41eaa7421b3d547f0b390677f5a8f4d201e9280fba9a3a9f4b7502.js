// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4181f0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00418110 } from "./418110.js";
import { FUN_00418180 } from "./418180.js";
export function FUN_004181f0(heap, param_1, param_2) {
  let iVar1 = 0;
  let bVar2 = 0;
  let iVar3 = 0;
  let puVar4 = 0;
  let local_4 = 0;
  local_4 = ((0) >>> 0);
  bVar2 = ((((param_2 >>> 0x1f) & 0xff)) & 0xff);
  bVar2 = ((0x1f - (((((param_2) & 0xff) ^ bVar2) - bVar2 & 0x1f ^ bVar2) - bVar2)) & 0xff);
  iVar3 = (((((param_2 + (param_2 >>> 0x1f & 0x1f))) | 0) >>> 5) >>> 0);
  if (((heap.u32((param_1 + iVar3 * 4)) & 1 << (bVar2 & 0x1f)) != 0) && (iVar1 = (((regs.eax = FUN_00418110(heap, param_1, param_2 + 1))) >>> 0), iVar1 == 0)) {
    local_4 = (((regs.eax = FUN_00418180(heap, param_1, param_2 + -1))) >>> 0);
  }
  heap.setU32((param_1 + iVar3 * 4), (heap.u32((param_1 + iVar3 * 4)) & -1 << (bVar2 & 0x1f)) & 0xffffffff);
  iVar3 = ((iVar3 + 1) >>> 0);
  if (iVar3 < 3) {
    puVar4 = (((param_1 + iVar3 * 4)) >>> 0);
    for (iVar1 = ((3 - iVar3) >>> 0); iVar1 != 0; iVar1 = (((iVar1 + -1) >>> 0)) >>> 0) {
      heap.setU32(puVar4, (0) & 0xffffffff);
      puVar4 = ((puVar4 + ((1) * 4)) >>> 0);
    }
  }
  return local_4;
}
