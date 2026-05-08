// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/412455.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00412455(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(132);
  const __addr_local_20 = __sp + 0;
  const __addr_local_c = __sp + 128;
  try {
  let pHVar1 = 0;
  let LVar2 = 0;
  let MVar3 = 0;
  let local_8 = 0;
  heap.u32(__addr_local_c + (0) * 4) = -1;
  heap.u32(__addr_local_c + (1) * 4) = -1;
  heap.u32(__addr_local_c + (2) * 4) = -1;
  heap.u32(__addr_local_c + (3) * 4) = -1;
  local_8 = 0;
  pHVar1 = mmioOpenA(param_1, 0x0, 0x11002);
  heap.u32(param_2) = pHVar1;
  if (heap.u32(param_2) == 0) {
    local_8 = 0xe104;
  } else {
    heap.u32((param_5 + 8)) = 0x45564157;
    heap.u32((param_5 + 4)) = 0;
    local_8 = mmioCreateChunk(heap.u32(param_2), param_5, 0x20);
    if (local_8 == 0) {
      heap.u32(param_4) = 0x20746d66;
      heap.u32((param_4 + 4)) = 0x10;
      local_8 = mmioCreateChunk(heap.u32(param_2), param_4, 0);
      if (local_8 == 0) {
        if (heap.u32(param_3) == 1) {
          LVar2 = mmioWrite(heap.u32(param_2), param_3, 0x10);
          if (LVar2 != 0x10) {
            return 0xe104;
          }
        } else {
          LVar2 = mmioWrite(heap.u32(param_2), param_3, heap.u32(param_3 + (8) * 4) + 0x12);
          if (LVar2 != heap.u32(param_3 + (8) * 4) + 0x12) {
            return 0xe104;
          }
        }
        local_8 = mmioAscend(heap.u32(param_2), param_4, 0);
        if (local_8 == 0) {
          heap.u32(__addr_local_20) = 0x74636166;
          heap.u32((__addr_local_20 + 4)) = 0;
          local_8 = mmioCreateChunk(heap.u32(param_2), __addr_local_20, 0);
          if (local_8 == 0) {
            LVar2 = mmioWrite(heap.u32(param_2), __addr_local_c, 4);
            if (LVar2 == 4) {
              MVar3 = mmioAscend(heap.u32(param_2), __addr_local_20, 0);
              if (MVar3 == 0) {
                local_8 = 0;
              } else {
                local_8 = 0xe104;
              }
            } else {
              local_8 = 0xe104;
            }
          }
        }
      }
    }
  }
  return local_8;
} finally {
    heap.freeFrame(132);
  }
}
