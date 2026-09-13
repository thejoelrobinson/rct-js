// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/412455.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { mmioAscend, mmioCreateChunk, mmioOpenA, mmioWrite } from "../../runtime/win32.js";
export function FUN_00412455(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(132);
  const __addr_local_20 = __sp + 0;
  const __addr_local_c = __sp + 20;
  const __addr_local_8 = __sp + 24;
  try {
  let pHVar1 = 0;
  let LVar2 = 0;
  let MVar3 = 0;
  heap.setU32((__addr_local_c + (0) * 4), (-1) & 0xffffffff);
  heap.setU32((__addr_local_c + (1) * 4), (-1) & 0xffffffff);
  heap.setU32((__addr_local_c + (2) * 4), (-1) & 0xffffffff);
  heap.setU32((__addr_local_c + (3) * 4), (-1) & 0xffffffff);
  heap.setU32(__addr_local_8, (0) >>> 0);
  pHVar1 = ((mmioOpenA(heap, param_1, 0x0, 0x11002)) >>> 0);
  heap.setU32(param_2, (((pHVar1) | 0)) & 0xffffffff);
  if (heap.i32(param_2) == 0) {
    heap.setU32(__addr_local_8, (0xe104) >>> 0);
  } else {
    heap.setU32((param_5 + 8), (0x45564157) >>> 0);
    heap.setU32((param_5 + 4), (0) >>> 0);
    heap.setU32(__addr_local_8, (mmioCreateChunk(heap, ((heap.i32(param_2)) | 0), param_5, 0x20)) >>> 0);
    if (heap.u32(__addr_local_8) == 0) {
      heap.setU32(param_4, (0x20746d66) >>> 0);
      heap.setU32((param_4 + 4), (0x10) >>> 0);
      heap.setU32(__addr_local_8, (mmioCreateChunk(heap, ((heap.i32(param_2)) | 0), param_4, 0)) >>> 0);
      if (heap.u32(__addr_local_8) == 0) {
        if (heap.i16(param_3) == 1) {
          LVar2 = ((mmioWrite(heap, ((heap.i32(param_2)) | 0), param_3, 0x10)) >>> 0);
          if (LVar2 != 0x10) {
            return 0xe104;
          }
        } else {
          LVar2 = ((mmioWrite(heap, ((heap.i32(param_2)) | 0), param_3, ((heap.i16(param_3 + (8) * 2)) & 0xffff) + 0x12)) >>> 0);
          if (LVar2 != ((heap.i16(param_3 + (8) * 2)) & 0xffff) + 0x12) {
            return 0xe104;
          }
        }
        heap.setU32(__addr_local_8, (mmioAscend(heap, ((heap.i32(param_2)) | 0), param_4, 0)) >>> 0);
        if (heap.u32(__addr_local_8) == 0) {
          heap.setU32(__addr_local_20, (0x74636166) >>> 0);
          heap.setU32((__addr_local_20 + 4), (0) >>> 0);
          heap.setU32(__addr_local_8, (mmioCreateChunk(heap, ((heap.i32(param_2)) | 0), __addr_local_20, 0)) >>> 0);
          if (heap.u32(__addr_local_8) == 0) {
            LVar2 = ((mmioWrite(heap, ((heap.i32(param_2)) | 0), __addr_local_c, 4)) >>> 0);
            if (LVar2 == 4) {
              MVar3 = ((mmioAscend(heap, ((heap.i32(param_2)) | 0), __addr_local_20, 0)) >>> 0);
              if (MVar3 == 0) {
                heap.setU32(__addr_local_8, (0) >>> 0);
              } else {
                heap.setU32(__addr_local_8, (0xe104) >>> 0);
              }
            } else {
              heap.setU32(__addr_local_8, (0xe104) >>> 0);
            }
          }
        }
      }
    }
  }
  return heap.u32(__addr_local_8);
} finally {
    heap.freeFrame(132);
  }
}
