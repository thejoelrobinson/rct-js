// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418180.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00418ef0 } from "./418ef0.js";
export function FUN_00418180(heap, param_1, param_2) {
  let bVar1 = 0;
  let iVar2 = 0;
  let iVar3 = 0;
  let puVar4 = 0;
  bVar1 = ((((param_2 >>> 0x1f) & 0xff)) & 0xff);
  iVar3 = (((((param_2 + (param_2 >>> 0x1f & 0x1f))) | 0) >>> 5) >>> 0);
  iVar2 = (((regs.eax = FUN_00418ef0(heap, heap.u32((param_1 + iVar3 * 4)), 1 << (0x1f - (((((param_2) & 0xff) ^ bVar1) - bVar1 & 0x1f ^ bVar1) - bVar1) & 0x1f), param_1 + iVar3 * 4))) >>> 0);
  iVar3 = ((iVar3 + -1) >>> 0);
  if (-1 < (iVar3 | 0)) {
    puVar4 = (((param_1 + iVar3 * 4)) >>> 0);
    do {
      if (iVar2 == 0) {
        return;
      }
      iVar2 = (((regs.eax = FUN_00418ef0(heap, heap.u32(puVar4), 1, puVar4))) >>> 0);
      iVar3 = ((iVar3 + -1) >>> 0);
      puVar4 = ((puVar4 + ((-1) * 4)) >>> 0);
    } while (-1 < (iVar3 | 0));
  }
  return;
}
