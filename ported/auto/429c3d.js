// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/429c3d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00423677 } from "./423677.js";
export function FUN_00429c3d(heap) {
  const __sp = heap.allocFrame(36);
  const __addr_DAT_00887448 = __sp + 0;
  const __addr_DAT_00743ba2 = __sp + 4;
  const __addr_DAT_00743bbf = __sp + 8;
  const __addr_DAT_00887422 = __sp + 12;
  const __addr_DAT_00743bfc = __sp + 16;
  const __addr_DAT_0088747e = __sp + 20;
  const __addr_DAT_00743bfe = __sp + 24;
  const __addr_DAT_00743bff = __sp + 28;
  const __addr_DAT_00743bd2 = __sp + 32;
  try {
  let uVar1 = 0;
  let sVar2 = 0;
  let cVar3 = 0;
  let in_ECX = 0;
  let in_DL = 0;
  let iVar4 = 0;
  if (in_DL == '\x01') {
    if (heap.u32((__addr_DAT_00887448 + in_ECX * 0x260)) != -1) {
      sVar2 = FUN_00423677(heap);
      return sVar2;
    }
  } else {
    if (in_DL == '\x02') {
      iVar4 = (in_ECX & 0xffff) * 0x100;
      sVar2 = heap.u32((__addr_DAT_00743ba2) + ((in_ECX & 0xffff) * 0x80) * 4);
      if (sVar2 == -0x8000) {
        if ((heap.u32((__addr_DAT_00743bbf) + (iVar4) * 4) != '\x03') && (heap.u32((__addr_DAT_00743bbf) + (iVar4) * 4) != '\a')) {
          return -0x8000;
        }
        if ((heap.u32((__addr_DAT_00887422) + (heap.u32((uint)(byte)(__addr_DAT_00743bfc) + (iVar4) * 4) * 0x130) * 4) & 1) == 0) {
          return -0x8000;
        }
        uVar1 = heap.u32((__addr_DAT_0088747e + heap.u32((uint)(byte)(__addr_DAT_00743bfe) + (iVar4) * 4) * 2 + heap.u32((uint)(byte)(__addr_DAT_00743bfc) + (iVar4) * 4) * 0x260));
        cVar3 = heap.u32((__addr_DAT_00743bff) + (iVar4) * 4);
        while (true) {
          if (cVar3 == '\0') {
            break;
          }
          cVar3 = cVar3 + -1;
          uVar1 = heap.u32((__addr_DAT_00743bd2 + uVar1 * 0x100));
        }
        sVar2 = heap.u32((__addr_DAT_00743ba2) + (uVar1 * 0x80) * 4);
      }
      return sVar2;
    }
    if (in_DL == '\x03') {
      return heap.u32((__addr_DAT_00743ba2) + ((in_ECX & 0xffff) * 0x80) * 4);
    }
    if (in_DL == '\x05') {
      sVar2 = FUN_00423677(heap);
      return sVar2;
    }
  }
  return -0x8000;
} finally {
    heap.freeFrame(36);
  }
}
