// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5db339.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_005db5d7 } from "./5db5d7.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_005db339(heap) {
  const __sp = heap.allocFrame(28);
  const __addr_DAT_0065eada = __sp + 0;
  const __addr_DAT_0065e7dc = __sp + 4;
  const __addr_DAT_0065e8bc = __sp + 8;
  const __addr_DAT_0065ead8 = __sp + 12;
  const __addr_DAT_00743b94 = __sp + 16;
  const __addr_DAT_00743bd6 = __sp + 20;
  const __addr_DAT_00743bd4 = __sp + 24;
  try {
  let sVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  let iVar5 = 0;
  let iVar6 = 0;
  let uVar8 = 0;
  heap.u32(unaff_ESI + (0x50) * 4) = 8;
  FUN_005db5d7(heap);
  iVar6 = heap.u32((unaff_ESI + 0x28)) >>> 10;
  puVar7 = unaff_ESI;
  while (true) {
    heap.u32(puVar7 + (0x51) * 4) = 0;
    sVar1 = heap.u32((__addr_DAT_0065eada + (uint)(heap.u32(puVar7 + (0x1e) * 4) >>> 1) * 4));
    iVar4 = heap.u32((__addr_DAT_0065e7dc + heap.u32(puVar7 + (0x1f) * 4) * 4));
    iVar5 = heap.u32((__addr_DAT_0065e8bc + heap.u32(puVar7 + (0x1f) * 4) * 4));
    heap.u32((puVar7 + 0xb6)) = ((uint)((heap.u32((__addr_DAT_0065ead8 + (uint)(heap.u32(puVar7 + (0x1e) * 4) >>> 1) * 4)) * (iVar4 >>> 0xf) >>> 0x10) * iVar6) >>> 8);
    heap.u32((puVar7 + 0xc0)) = ((uint)((sVar1 * (iVar4 >>> 0xf) >>> 0x10) * iVar6) >>> 8);
    heap.u32((puVar7 + 0x4e)) = ((uint)((iVar5 >>> 0x17) * iVar6) >>> 8);
    uVar8 = FUN_005df40c(heap);
    iVar6 = (uVar8 >>> 0x20);
    heap.u32((puVar7 + 0xb6)) = heap.u32((puVar7 + 0xb6)) + ((uVar8 & 0xf) - 8);
    heap.u32((puVar7 + 0xc0)) = heap.u32((puVar7 + 0xc0)) + (((ushort)(uVar8 >>> 4) & 0xf) - 8);
    heap.u32((puVar7 + 0x4e)) = heap.u32((puVar7 + 0x4e)) + (((ushort)(uVar8 >>> 8) & 0xf) - 8);
    heap.u32((puVar7 + 0x38)) = 0;
    heap.u32((puVar7 + 0x3a)) = 0;
    heap.u32((puVar7 + 0x3c)) = 0;
    if (heap.u32((puVar7 + 0x3e)) == 0xffff) {
      break;
    }
    puVar7 = __addr_DAT_00743b94 + (uint) * (puVar7 + 0x3e) * 0x100;
  }
  uVar2 = heap.u32((unaff_ESI + 0x40));
  uVar3 = heap.u32((puVar7 + 0x42));
  heap.u32((__addr_DAT_00743bd6 + uVar2 * 0x100)) = uVar3;
  heap.u32((__addr_DAT_00743bd4 + uVar3 * 0x100)) = uVar2;
  heap.u32((unaff_ESI + 0x28)) = 0;
  return;
} finally {
    heap.freeFrame(28);
  }
}
