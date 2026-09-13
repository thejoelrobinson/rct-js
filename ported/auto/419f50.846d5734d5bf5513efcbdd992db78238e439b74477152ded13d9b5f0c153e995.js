// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/419f50.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00419c90 } from "./419c90.js";
export function FUN_00419f50(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(12);
  const __addr_local_c = __sp + 0;
  const __addr_local_4 = __sp + 8;
  try {
  let uVar1 = 0;
  let puVar2 = 0;
  let iVar3 = 0;
  let uStack_a = 0;
  let uStack_6 = 0;
  iVar3 = ((0x5eeb18) >>> 0);
  if (param_2 != 0) {
    if (((param_2) | 0) < 0) {
      param_2 = ((-param_2) >>> 0);
      iVar3 = ((0x5eec78) >>> 0);
    }
    if (param_3 == 0) {
      heap.setU32(param_1, (0) & 0xffffffff);
    }
    while (param_2 != 0) {
      iVar3 = ((iVar3 + 0x54) >>> 0);
      uVar1 = ((param_2 & 7) >>> 0);
      param_2 = ((((param_2) | 0) >>> 3) >>> 0);
      if (uVar1 != 0) {
        puVar2 = (((iVar3 + uVar1 * 0xc)) >>> 0);
        if (0x7fff < heap.u16((iVar3 + uVar1 * 0xc))) {
          heap.setU32(__addr_local_c, (heap.u16(puVar2)) >>> 0);
          (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_00419f50"); })();
          (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_00419f50"); })();
          uStack_6 = ((((((heap.u32(puVar2 + (1) * 4)) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
          heap.setU32(__addr_local_4, (heap.u32(puVar2 + (2) * 4)) >>> 0);
          uStack_a = ((CONCAT22((((uStack_a) >>> 16) & 0xffff), ((uStack_a) & 0xffff)) + -1) >>> 0);
          puVar2 = ((__addr_local_c) >>> 0);
        }
        (regs.eax = FUN_00419c90(heap, param_1, puVar2));
      }
    }
  }
  return;
} finally {
    heap.freeFrame(12);
  }
}
