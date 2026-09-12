// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/406820.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00410780 } from "./410780.js";
import { FUN_004108b9 } from "./4108b9.js";
import { FUN_00410908 } from "./410908.js";
import { FUN_0041091d } from "./41091d.js";
import { FUN_0041095e } from "./41095e.js";
import { FUN_004109c9 } from "./4109c9.js";
import { FUN_004133c0 } from "./4133c0.js";
export function FUN_00406820(heap) {
  const __sp = heap.allocFrame(28);
  const __addr_local_2c = __sp + 0;
  const __addr_local_28 = __sp + 4;
  const __addr_local_24 = __sp + 8;
  const __addr_local_20 = __sp + 12;
  const __addr_local_1c = __sp + 16;
  const __addr_local_18 = __sp + 20;
  const __addr_local_14 = __sp + 24;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let local_34 = 0;
  iVar1 = (((regs.eax = FUN_004108b9(heap))) >>> 0);
  if (iVar1 == 0) {
    uVar2 = ((0) >>> 0);
  } else {
    local_34 = ((0) >>> 0);
    heap.setU32(0x005ebed4, ((regs.eax = FUN_004133c0(heap, heap.u32(0x005ec120) * 0x1c))) >>> 0);
    if (heap.u32(0x005ebed4) == 0) {
      uVar2 = ((0) >>> 0);
    } else {
      (regs.eax = FUN_00410908(heap));
      while (iVar1 = (((regs.eax = FUN_0041091d(heap))) >>> 0), iVar1 != 0) {
        iVar3 = (((regs.eax = FUN_0041095e(heap, iVar1))) >>> 0);
        if (iVar3 != 0) {
          iVar3 = (((regs.eax = FUN_004109c9(heap, iVar1, __addr_local_2c))) >>> 0);
          if (iVar3 == 0) {
            return 0;
          }
          (regs.eax = FUN_00410780(heap));
          heap.setI32((heap.u32(0x005ebed4) + local_34 * 0x1c), (iVar1) & 0xffffffff);
          if ((heap.u32(__addr_local_28) & 4) == 0) {
            heap.setU32((heap.u32(0x005ebed4) + 4 + local_34 * 0x1c), (0) & 0xffffffff);
          } else {
            heap.setU32((heap.u32(0x005ebed4) + 4 + local_34 * 0x1c), (1) & 0xffffffff);
          }
          heap.setU32((heap.u32(0x005ebed4) + 8 + local_34 * 0x1c), (heap.u32(__addr_local_24)) & 0xffffffff);
          heap.setU32((heap.u32(0x005ebed4) + 0xc + local_34 * 0x1c), (heap.u32(__addr_local_20)) & 0xffffffff);
          heap.setU32((heap.u32(0x005ebed4) + 0x10 + local_34 * 0x1c), (heap.u32(__addr_local_1c)) & 0xffffffff);
          heap.setU32((heap.u32(0x005ebed4) + 0x14 + local_34 * 0x1c), (heap.u32(__addr_local_18)) & 0xffffffff);
          heap.setU32((heap.u32(0x005ebed4) + 0x18 + local_34 * 0x1c), (heap.u32(__addr_local_14)) & 0xffffffff);
          local_34 = ((local_34 + 1) >>> 0);
        }
      }
      heap.setU32(0x005ebed0, (local_34) >>> 0);
      heap.setU32(0x005ec168, (4) >>> 0);
      uVar2 = ((1) >>> 0);
    }
  }
  return uVar2;
} finally {
    heap.freeFrame(28);
  }
}
