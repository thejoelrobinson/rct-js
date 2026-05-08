// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42deab.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00444bd4 } from "./444bd4.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0042deab(heap) {
  let uVar1 = 0;
  let in_EAX = 0;
  let uVar2 = 0;
  let in_EDX = 0;
  let unaff_BX = 0;
  let in_ZF = 0;
  FUN_00444bd4(heap);
  if (!in_ZF) {
    heap.u32((unaff_ESI + 0x2c)) = unaff_BX;
    heap.u32(unaff_ESI + (0x14) * 4) = 8;
    heap.u32(unaff_ESI + (9) * 4) = 8;
    heap.u32(unaff_ESI + (0x15) * 4) = 8;
    heap.u32(unaff_ESI) = 2;
    FUN_00444927(heap);
    heap.u32(unaff_ESI + (1) * 4) = 2;
    uVar2 = FUN_005df40c(heap);
    uVar1 = uVar2;
    heap.u32((unaff_ESI + 0x26)) = (uVar1 & 0xff) * 0xc;
    heap.u32((unaff_ESI + 0x24)) = (uVar1 & 0x7f) + 0x8c;
    heap.u32((unaff_ESI + 0x2e)) = (((uVar2 >>> 0x17) & 0xff) * 5) >>> 8;
    heap.u32((unaff_ESI + 0x38)) = uVar1 << 2;
    heap.u32((unaff_ESI + 0x3c)) = (uVar2 >>> 0x10) << 2;
    heap.u32((unaff_ESI + 0x40)) = (uVar2 >>> 8 & 0xffff) * 4 + 0x10000;
    heap.u32((unaff_ESI + 0x30)) = 0;
    heap.u32((unaff_ESI + 0x32)) = 0;
    heap.u32((unaff_ESI + 0x34)) = 0;
  }
  return CONCAT44(in_EDX, in_EAX);
}
