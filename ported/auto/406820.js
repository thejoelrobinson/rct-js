// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/406820.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00410780 } from "./410780.js";
import { FUN_004108b9 } from "./4108b9.js";
import { FUN_00410908 } from "./410908.js";
import { FUN_0041091d } from "./41091d.js";
import { FUN_0041095e } from "./41095e.js";
import { FUN_004109c9 } from "./4109c9.js";
import { FUN_004133c0 } from "./4133c0.js";
export function FUN_00406820(heap) {
  let iVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let local_34 = 0;
  let local_28 = 0;
  let local_24 = 0;
  let local_20 = 0;
  let local_1c = 0;
  let local_18 = 0;
  let local_14 = 0;
  iVar1 = FUN_004108b9(heap);
  if (iVar1 == 0) {
    uVar2 = 0;
  } else {
    local_34 = 0;
    heap.setU32(0x005ebed4, (FUN_004133c0(heap, heap.u32(0x005ec120) * 0x1c)) >>> 0);
    if (heap.u32(0x005ebed4) == 0) {
      uVar2 = 0;
    } else {
      FUN_00410908(heap);
      while (iVar1 = FUN_0041091d(heap), iVar1 != 0) {
        iVar3 = FUN_0041095e(heap, iVar1);
        if (iVar3 != 0) {
          iVar3 = FUN_004109c9(heap, iVar1, local_2c);
          if (iVar3 == 0) {
            return 0;
          }
          FUN_00410780(heap);
          heap.u32((heap.u32(0x005ebed4) + local_34 * 0x1c)) = iVar1;
          if ((local_28 & 4) == 0) {
            heap.u32((heap.u32(0x005ebed4) + 4 + local_34 * 0x1c)) = 0;
          } else {
            heap.u32((heap.u32(0x005ebed4) + 4 + local_34 * 0x1c)) = 1;
          }
          heap.u32((heap.u32(0x005ebed4) + 8 + local_34 * 0x1c)) = local_24;
          heap.u32((heap.u32(0x005ebed4) + 0xc + local_34 * 0x1c)) = local_20;
          heap.u32((heap.u32(0x005ebed4) + 0x10 + local_34 * 0x1c)) = local_1c;
          heap.u32((heap.u32(0x005ebed4) + 0x14 + local_34 * 0x1c)) = local_18;
          heap.u32((heap.u32(0x005ebed4) + 0x18 + local_34 * 0x1c)) = local_14;
          local_34 = local_34 + 1;
        }
      }
      heap.setU32(0x005ebed0, (local_34) >>> 0);
      heap.setU32(0x005ec168, (4) >>> 0);
      uVar2 = 1;
    }
  }
  return uVar2;
}
