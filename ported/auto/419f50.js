// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/419f50.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { FUN_00419c90 } from "./419c90.js";
export function FUN_00419f50(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(4);
  const __addr_local_c = __sp + 0;
  try {
  let uVar1 = 0;
  let iVar3 = 0;
  let uStack_a = 0;
  let uStack_6 = 0;
  let local_4 = 0;
  iVar3 = 0x5eeb18;
  if (param_2 != 0) {
    if (param_2 < 0) {
      param_2 = -param_2;
      iVar3 = 0x5eec78;
    }
    if (param_3 == 0) {
      heap.u32(param_1) = 0;
    }
    while (param_2 != 0) {
      iVar3 = iVar3 + 0x54;
      uVar1 = param_2 & 7;
      param_2 = param_2 >>> 3;
      if (uVar1 != 0) {
        puVar2 = (iVar3 + uVar1 * 0xc);
        if (0x7fff < heap.u32((iVar3 + uVar1 * 0xc))) {
          heap.setU32(__addr_local_c, ((undefined2) * puVar2) >>> 0);
          (uStack_a & 0xffff) = (undefined2)(heap.u32(puVar2) >>> 0x10);
          (((uStack_a) >>> 16) & 0xffff) = heap.u32(puVar2 + (1) * 4);
          uStack_6 = (undefined2)(heap.u32(puVar2 + (1) * 4) >>> 0x10);
          local_4 = heap.u32(puVar2 + (2) * 4);
          uStack_a = CONCAT22((((uStack_a) >>> 16) & 0xffff), uStack_a) + -1;
          puVar2 = __addr_local_c;
        }
        FUN_00419c90(heap, param_1, puVar2);
      }
    }
  }
  return;
} finally {
    heap.freeFrame(4);
  }
}
