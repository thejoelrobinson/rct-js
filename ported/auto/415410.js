// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/415410.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { HeapAlloc, HeapFree, VirtualAlloc, VirtualFree } from "../../runtime/win32.js";
export function FUN_00415410(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_PTR_LOOP_005ec500 = __sp + 0;
  try {
  let bVar1 = 0;
  let lpAddress = 0;
  let pvVar2 = 0;
  let iVar3 = 0;
  let ppuVar4 = 0;
  let lpMem = 0;
  let puVar5 = 0;
  if (heap.u32(0x005ec510) == -1) {
    lpMem = __addr_PTR_LOOP_005ec500;
  } else {
    lpMem = HeapAlloc(heap, heap.u32(0x005f3e44), 0, 0x2020);
    if (lpMem == 0x0) {
      return 0x0;
    }
  }
  lpAddress = VirtualAlloc(heap, 0x0, 0x400000, 0x2000, 4);
  if (lpAddress != 0x0) {
    pvVar2 = VirtualAlloc(heap, lpAddress, 0x10000, 0x1000, 4);
    if (pvVar2 != 0x0) {
      if (lpMem == __addr_PTR_LOOP_005ec500) {
        if (heap.u32(__addr_PTR_LOOP_005ec500) == 0x0) {
          heap.setU32(__addr_PTR_LOOP_005ec500, (__addr_PTR_LOOP_005ec500) >>> 0);
        }
        if (heap.u32(0x005ec504) == 0x0) {
          PTR_LOOP_005ec504 = __addr_PTR_LOOP_005ec500;
        }
      } else {
        heap.setU32(lpMem, (__addr_PTR_LOOP_005ec500) >>> 0);
        heap.setU32((lpMem + (1) * 4), (heap.u32(0x005ec504)) >>> 0);
        PTR_LOOP_005ec504 = lpMem;
        heap.setU32(heap.u32(lpMem + (1) * 4), (lpMem) >>> 0);
      }
      heap.setU32((lpMem + (5) * 4), ((lpAddress + 0x100000)) >>> 0);
      heap.setU32((lpMem + (4) * 4), (lpAddress) >>> 0);
      heap.setU32((lpMem + (2) * 4), ((lpMem + 6)) >>> 0);
      heap.setU32((lpMem + (3) * 4), ((lpMem + 0x26)) >>> 0);
      iVar3 = 0;
      ppuVar4 = lpMem + 6;
      do {
        bVar1 = 0xf < iVar3;
        iVar3 = iVar3 + 1;
        heap.setU32(ppuVar4, (((bVar1 - 1 & 0xf1) - 1)) >>> 0);
        heap.setU32((ppuVar4 + (1) * 4), (0xf1) >>> 0);
        ppuVar4 = ppuVar4 + 2;
      } while (iVar3 < 0x400);
      puVar5 = lpAddress;
      for (iVar3 = 0x4000; iVar3 != 0; iVar3 = iVar3 + -1) {
        heap.setU32(puVar5, (0) >>> 0);
        puVar5 = puVar5 + 1;
      }
      if (lpAddress < heap.u32(lpMem + (4) * 4) + 0x10000) {
        do {
          heap.setU32((lpAddress + (1) * 4), (0xf0) >>> 0);
          heap.setU32(lpAddress, (lpAddress + 2) >>> 0);
          heap.setU32((lpAddress + 0x3e), (0xff) >>> 0);
          lpAddress = lpAddress + 0x400;
        } while (lpAddress < heap.u32(lpMem + (4) * 4) + 0x10000);
      }
      return lpMem;
    }
    VirtualFree(heap, lpAddress, 0, 0x8000);
  }
  if (lpMem != __addr_PTR_LOOP_005ec500) {
    HeapFree(heap, heap.u32(0x005f3e44), 0, lpMem);
  }
  return 0x0;
} finally {
    heap.freeFrame(4);
  }
}
