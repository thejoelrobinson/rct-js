// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e5f51.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_005e5f51(heap) {
  let sVar1 = 0;
  let sVar2 = 0;
  let iVar3 = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  let puVar6 = 0;
  puVar6 = ((0x009a013c) >>> 0);
  sVar5 = ((8) & 0xffff);
  do {
    if (heap.u32(0x009a1164) <= puVar6) {
      return;
    }
    if ((((heap.i16((puVar6 + 0x20)) + 10)) << 16 >> 16) < heap.u32(0x00971ed6)) {
      sVar4 = ((heap.i16((puVar6 + 0x22)) + 10) & 0xffff);
      if ((heap.u16((puVar6 + 0x32)) & 3) != 0) {
        sVar4 = ((heap.i16((puVar6 + 0x22)) + -0x18) & 0xffff);
      }
      if (heap.u32(0x00971ed8) <= sVar4) {
        /* goto LAB_005e5f90 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005e5f51/LAB_005e5f90"); return 0;
      }
    } else {
      LAB_005e5f90: sVar4 = ((heap.i16((puVar6 + 0x20))) & 0xffff);
      sVar1 = ((heap.i16((puVar6 + 0x22))) & 0xffff);
      heap.setI16((puVar6 + 0x20), (sVar5) & 0xffff);
      heap.setI16((puVar6 + 0x22), (sVar5 + 0x1e) & 0xffff);
      sVar5 = ((sVar5 + 8) & 0xffff);
      iVar3 = ((heap.i32((puVar6 + 8))) >>> 0);
      if (iVar3 != 0) {
        sVar2 = ((heap.i16((puVar6 + 0x22))) & 0xffff);
        heap.setI16((iVar3 + 4), (heap.i16((iVar3 + 4)) - (sVar4 - heap.i16((puVar6 + 0x20)))) & 0xffff);
        heap.setI16((iVar3 + 6), (heap.i16((iVar3 + 6)) - (sVar1 - sVar2)) & 0xffff);
      }
    }
    puVar6 = ((puVar6 + 0x178) >>> 0);
  } while (true);
}
