// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/412a85.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GlobalAlloc, GlobalFree, GlobalHandle, GlobalLock, GlobalUnlock, mmioAscend, mmioCreateChunk, mmioRead, mmioWrite } from "../../runtime/win32.js";
export function FUN_00412a85(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(128);
  const __addr_local_1c = __sp + 0;
  const __addr_local_8 = __sp + 20;
  try {
  let pvVar1 = 0;
  let uVar2 = 0;
  let MVar3 = 0;
  let FVar4 = 0;
  pvVar1 = ((GlobalAlloc(heap, 0x42, heap.u32(param_3 + (1) * 4))) >>> 0);
  heap.setU32(__addr_local_8, (GlobalLock(heap, pvVar1)) >>> 0);
  if (heap.u32(__addr_local_8) == ((0x0) | 0)) {
    uVar2 = ((0) >>> 0);
  } else {
    heap.setU32(__addr_local_1c, (heap.u32(param_3)) >>> 0);
    heap.setU32((__addr_local_1c + 4), (heap.u32(param_3 + (1) * 4)) >>> 0);
    MVar3 = ((mmioCreateChunk(heap, param_2, __addr_local_1c, 0)) >>> 0);
    if ((((MVar3 == 0) && (FVar4 = ((mmioRead(heap, param_1, heap.u32(__addr_local_8), heap.u32(param_3 + (1) * 4))) >>> 0), FVar4 == heap.u32(param_3 + (1) * 4))) && (FVar4 = ((mmioWrite(heap, param_2, heap.u32(__addr_local_8), heap.u32(param_3 + (1) * 4))) >>> 0), FVar4 == heap.u32(param_3 + (1) * 4))) && (MVar3 = ((mmioAscend(heap, param_2, __addr_local_1c, 0)) >>> 0), MVar3 == 0)) {
      if (heap.u32(__addr_local_8) != ((0x0) | 0)) {
        pvVar1 = ((GlobalHandle(heap, heap.u32(__addr_local_8))) >>> 0);
        GlobalUnlock(heap, pvVar1);
        pvVar1 = ((GlobalHandle(heap, heap.u32(__addr_local_8))) >>> 0);
        GlobalFree(heap, pvVar1);
      }
      uVar2 = ((1) >>> 0);
    } else {
      if (heap.u32(__addr_local_8) != ((0x0) | 0)) {
        pvVar1 = ((GlobalHandle(heap, heap.u32(__addr_local_8))) >>> 0);
        GlobalUnlock(heap, pvVar1);
        pvVar1 = ((GlobalHandle(heap, heap.u32(__addr_local_8))) >>> 0);
        GlobalFree(heap, pvVar1);
      }
      uVar2 = ((0) >>> 0);
    }
  }
  return uVar2;
} finally {
    heap.freeFrame(128);
  }
}
