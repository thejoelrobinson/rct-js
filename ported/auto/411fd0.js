// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/411fd0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GlobalAlloc, GlobalFree, HGLOBAL, HPSTR } from "../runtime/win32.js";
import { FUN_004138d0 } from "./4138d0.js";
export function FUN_00411fd0(heap, param_1, param_2, param_3, param_4) {
  const __sp = heap.allocFrame(132);
  const __addr_local_1c = __sp + 0;
  const __addr_local_30 = __sp + 128;
  try {
  let LVar1 = 0;
  let pvVar2 = 0;
  let uVar3 = 0;
  let local_34 = 0;
  let local_20 = 0;
  let local_8 = 0;
  heap.u32(param_3) = 0;
  local_8 = 0;
  local_20 = 0x0;
  local_20 = mmioOpenA(param_1, 0x0, 0x10000);
  if (local_20 == 0x0) {
    local_8 = 0xe100;
  } else {
    local_8 = mmioDescend(local_20, param_4, 0x0, 0);
    if (local_8 == 0) {
      if ((heap.u32(param_4) == 0x46464952) && (heap.u32((param_4 + 8)) == 0x45564157)) {
        heap.u32(__addr_local_1c) = 0x20746d66;
        local_8 = mmioDescend(local_20, __addr_local_1c, param_4, 0x10);
        if (local_8 == 0) {
          if (heap.u32((__addr_local_1c + 4)) < 0x10) {
            local_8 = 0xe101;
          } else {
            LVar1 = mmioRead(local_20, __addr_local_30, 0x10);
            if (LVar1 == 0x10) {
              if ((heap.u32(__addr_local_30 + (0) * 4) & 0xffff) == 1) {
                local_34 = local_34 & 0xffff0000;
              } else {
                LVar1 = mmioRead(local_20, (HPSTR) & local_34, 2);
                if (LVar1 != 2) {
                  local_8 = 0xe102;
                  /* goto LAB_004121d1 */ throw new Error("goto LAB_004121d1 not supported");
                }
              }
              pvVar2 = GlobalAlloc(heap, 0, (local_34 & 0xffff) + 0x12);
              heap.u32(param_3) = pvVar2;
              if (heap.u32(param_3) == 0) {
                local_8 = 0xe000;
              } else {
                FUN_004138d0(heap, heap.u32(param_3), __addr_local_30, 0x10);
                heap.u32((heap.u32(param_3) + 0x10)) = local_34;
                if (((local_34 & 0xffff) == 0) || (uVar3 = mmioRead(local_20, (HPSTR)(heap.u32(param_3) + 0x12), local_34 & 0xffff), uVar3 == (local_34 & 0xffff))) {
                  local_8 = mmioAscend(local_20, __addr_local_1c, 0);
                  if (local_8 == 0) {
                    /* goto LAB_0041220f */ throw new Error("goto LAB_0041220f not supported");
                  }
                } else {
                  local_8 = 0xe101;
                }
              }
            } else {
              local_8 = 0xe102;
            }
          }
        }
      } else {
        local_8 = 0xe101;
      }
    }
  }
  LAB_004121d1: if (heap.u32(param_3) != 0) {
    GlobalFree(heap, (HGLOBAL) * param_3);
    heap.u32(param_3) = 0;
  }
  if (local_20 != 0x0) {
    mmioClose(local_20, 0);
    local_20 = 0x0;
  }
  LAB_0041220f: heap.u32(param_2) = local_20;
  return local_8;
} finally {
    heap.freeFrame(132);
  }
}
