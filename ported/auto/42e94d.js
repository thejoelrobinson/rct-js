// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42e94d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../runtime/ghidra-builtins.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00444bd4 } from "./444bd4.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0042e94d(heap) {
  let sVar1 = 0;
  let in_EAX = 0;
  let uVar2 = 0;
  let extraout_CX = 0;
  let in_EDX = 0;
  let uVar3 = 0;
  let in_ZF = 0;
  sVar1 = FUN_00444bd4(heap);
  if (!in_ZF) {
    heap.u32(unaff_ESI) = 2;
    heap.u32(unaff_ESI + (1) * 4) = 8;
    heap.u32(unaff_ESI + (0x14) * 4) = 9;
    heap.u32(unaff_ESI + (9) * 4) = 0xc;
    heap.u32(unaff_ESI + (0x15) * 4) = 9;
    uVar2 = FUN_005df40c(heap);
    uVar3 = (uVar2 >>> 8) & 0x1e;
    heap.u32((unaff_ESI + 0x30)) = sVar1 + uVar3;
    heap.u32((unaff_ESI + 0x32)) = extraout_CX + uVar3;
    switch (uVar2 & 3) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
    }
    heap.u32(unaff_ESI + (0x1e) * 4) = (uVar2 & 3) << 3;
    FUN_00444927(heap);
    heap.u32(unaff_ESI + (0x48) * 4) = 0;
    heap.u32((unaff_ESI + 0x26)) = 0;
  }
  return CONCAT44(in_EDX, in_EAX);
}
