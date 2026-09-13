// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45004a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0045004a(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let uVar1 = 0;
  let uVar2 = 0;
  uVar2 = ((in_EDX & 0xff) >>> 0);
  if ((heap.u32((0x005f5b78 + heap.u32(((0x00887420) >>> 0) + (uVar2 * 0x260) * 4) * 8)) & 0x20000) == 0) {
    uVar1 = ((0) >>> 0);
    do {
      if ((heap.u32((0x0088744a) + (uVar2 * 0x130 + uVar1) * 4) | 0) != -1) {
        if ((heap.u32((0x00887462) + (uVar2 * 0x130 + uVar1) * 4) | 0) == -1) {
          heap.setU32(0x00991efc, (0x4af) >>> 0);
          return 1;
        }
        if ((heap.u32((0x0088746a) + (uVar2 * 0x130 + uVar1) * 4) | 0) == -1) {
          heap.setU32(0x00991efc, (0x4b0) >>> 0);
          return 1;
        }
      }
      uVar1 = ((uVar1 + 1) >>> 0);
    } while (uVar1 < 4);
  }
  return 1;
}
