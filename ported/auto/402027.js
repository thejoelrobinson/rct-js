// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/402027.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00402a00 } from "./402a00.js";
import { FUN_00402aa4 } from "./402aa4.js";
export function FUN_00402027(heap) {
  const __sp = heap.allocFrame(180);
  const __addr_local_b8 = __sp + 0;
  const __addr_local_b2 = __sp + 6;
  const __addr_local_b0 = __sp + 8;
  const __addr_local_a8 = __sp + 16;
  const __addr_local_10 = __sp + 168;
  const __addr_local_c = __sp + 172;
  const __addr_local_8 = __sp + 176;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let puVar5 = 0;
  iVar1 = (((regs.eax = callIndirect(heap, heap.u32(0x005ebe58), __addr_local_b8))) >>> 0);
  if (iVar1 == 0) {
    uVar2 = ((0) >>> 0);
  } else {
    iVar1 = (((regs.eax = callIndirect(heap, heap.u32(0x005ebe5c), __addr_local_b8))) >>> 0);
    if (iVar1 == 0) {
      uVar2 = ((0) >>> 0);
    } else {
      iVar1 = (((regs.eax = FUN_00402a00(heap))) >>> 0);
      if (iVar1 == 0) {
        (regs.eax = callIndirect(heap, heap.u32(0x005ebe60), __addr_local_b8));
        uVar2 = ((0) >>> 0);
      } else {
        heap.setU32(__addr_local_10, (heap.u32(__addr_local_b8)) >>> 0);
        heap.setU32(__addr_local_c, (heap.u32(__addr_local_b0)) >>> 0);
        heap.setU32(__addr_local_8, (heap.u32(0x005f1ff4) - ((heap.u32(__addr_local_b2)) << 16 >> 16)) >>> 0);
        uVar4 = ((((heap.u32(__addr_local_b0)) >>> 0)) >>> 0);
        uVar3 = ((((heap.u32(__addr_local_b2) >>> 2) >>> 0)) >>> 0);
        puVar5 = ((heap.u32(0x005f1fec)) >>> 0);
        do {
          for (; uVar3 != 0; uVar3 = (((uVar3 - 1) >>> 0)) >>> 0) {
            heap.setU32(heap.u32(__addr_local_b8), (heap.u32(puVar5)) & 0xffffffff);
            puVar5 = ((puVar5 + ((1) * 4)) >>> 0);
            heap.setU32(__addr_local_b8, (heap.u32(__addr_local_b8) + ((1) * 4)) >>> 0);
          }
          heap.setU32(__addr_local_b8, ((((heap.u32(__addr_local_b8)) >>> 0) + (heap.u32(__addr_local_a8) - ((heap.u32(__addr_local_b2)) << 16 >> 16)))) >>> 0);
          puVar5 = (((((puVar5) >>> 0) + heap.u32(__addr_local_8))) >>> 0);
          uVar4 = ((uVar4 - 1) >>> 0);
          uVar3 = ((((heap.u32(__addr_local_b2) >>> 2) >>> 0)) >>> 0);
        } while (uVar4 != 0);
        (regs.eax = FUN_00402aa4(heap));
        (regs.eax = callIndirect(heap, heap.u32(0x005ebe60), __addr_local_b8));
        heap.setU32(0x005f1fe0, (1) >>> 0);
        uVar2 = ((1) >>> 0);
      }
    }
  }
  return uVar2;
} finally {
    heap.freeFrame(180);
  }
}
