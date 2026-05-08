// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42e48a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_0042e276 } from "./42e276.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0042e48a(heap) {
  let in_EAX = 0;
  let uVar1 = 0;
  let uVar2 = 0;
  let in_ECX = 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let in_EDX = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  uVar5 = heap.u32(0x0088741c) >>> 0xb & 7;
  if (uVar5 == 0) {
    uVar5 = 0;
    uVar6 = 0;
    uVar1 = in_EAX;
    do {
      FUN_0042e276(heap, uVar6, in_EDX, in_ECX, uVar5, uVar1);
      uVar5 = uVar5 + 1;
    } while (uVar5 < 4);
    return in_EAX;
  }
  if (uVar5 != 2) {
    if (uVar5 != 4) {
      FUN_005df40c(heap);
      FUN_0042e276(heap);
      return in_EAX;
    }
    uVar1 = in_EAX;
    uVar7 = FUN_005df40c(heap);
    uVar2 = (undefined4)(uVar7 >>> 0x20);
    uVar4 = uVar7 & 3;
    uVar6 = extraout_ECX_00;
    FUN_0042e276(heap, 4, uVar2, extraout_ECX_00, uVar4, uVar1);
    FUN_0042e276(heap, uVar5, uVar2, uVar6, uVar4 + 4, uVar1);
    return in_EAX;
  }
  uVar2 = in_EAX;
  uVar7 = FUN_005df40c(heap);
  uVar3 = (undefined4)(uVar7 >>> 0x20);
  uVar5 = uVar7 & 1;
  uVar6 = 2;
  uVar1 = extraout_ECX;
  do {
    FUN_0042e276(heap, uVar6, uVar3, uVar1, uVar5, uVar2);
    uVar5 = uVar5 + 2;
  } while (uVar5 < 4);
  return in_EAX;
}
