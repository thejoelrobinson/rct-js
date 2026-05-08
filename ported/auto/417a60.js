// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/417a60.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetLastError, WriteFile } from "../runtime/win32.js";
import { FUN_004179a0 } from "./4179a0.js";
import { FUN_00418d90 } from "./418d90.js";
export function FUN_00417a60(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(1036);
  const __addr_DAT_005f3e60 = __sp + 0;
  const __addr_local_410 = __sp + 4;
  const __addr_local_404 = __sp + 8;
  try {
  let bVar2 = 0;
  let cVar3 = 0;
  let BVar5 = 0;
  let iVar6 = 0;
  let local_41c = 0;
  let local_414 = 0;
  let local_40c = 0;
  if (param_1 < heap.u32(0x005f3f60)) {
    piVar1 = __addr_DAT_005f3e60 + (param_1 >>> 5);
    iVar6 = (param_1 & 0x1f) * 8;
    bVar2 = heap.u32((iVar6 + 4 + heap.u32((__addr_DAT_005f3e60) + (param_1 >>> 5) * 4)));
    if ((bVar2 & 1) != 0) {
      local_41c = 0;
      local_40c = 0;
      if (param_3 == 0) {
        return 0;
      }
      local_408 = piVar1;
      if ((bVar2 & 0x20) != 0) {
        FUN_004179a0(heap, param_1, 0, 2);
      }
      if ((heap.u32(((heap.u32(piVar1) + iVar6) + 1)) & 0x80) == 0) {
        BVar5 = WriteFile(heap, heap.u32((heap.u32(piVar1) + iVar6)), param_2, param_3, __addr_local_410, 0x0);
        if (BVar5 == 0) {
          local_414 = GetLastError(heap);
        } else {
          local_41c = heap.u32(__addr_local_410);
          local_414 = 0;
        }
      } else {
        local_414 = 0;
        pcVar7 = param_2;
        if (param_3 != 0) {
          do {
            pcVar4 = __addr_local_404;
            do {
              if (param_3 <= (pcVar7 - param_2)) {
                break;
              }
              cVar3 = heap.u32(pcVar7);
              pcVar7 = pcVar7 + 1;
              if (cVar3 == '\n') {
                heap.u32(pcVar4) = '\r';
                local_40c = local_40c + 1;
                pcVar4 = pcVar4 + 1;
              }
              heap.u32(pcVar4) = cVar3;
              pcVar4 = pcVar4 + 1;
            } while (pcVar4 - __addr_local_404 < 0x400);
            BVar5 = WriteFile(heap, heap.u32((iVar6 + heap.u32(local_408))), __addr_local_404, pcVar4 - __addr_local_404, __addr_local_410, 0x0);
            if (BVar5 == 0) {
              local_414 = GetLastError(heap);
              break;
            }
            local_41c = local_41c + heap.u32(__addr_local_410);
            if ((heap.u32(__addr_local_410) < pcVar4 - __addr_local_404) || (param_3 <= (pcVar7 - param_2))) {
              break;
            }
          } while (true);
        }
      }
      if (local_41c != 0) {
        return local_41c - local_40c;
      }
      if (local_414 == 0) {
        if (((heap.u32((iVar6 + 4 + heap.u32(local_408))) & 0x40) != 0) && (heap.u32(param_2) == '\x1a')) {
          return 0;
        }
        heap.setU32(0x005efec0, (0x1c) >>> 0);
        heap.setU32(0x005efec4, (0) >>> 0);
        return -1;
      }
      if (local_414 == 5) {
        heap.setU32(0x005efec4, (local_414) >>> 0);
        heap.setU32(0x005efec0, (9) >>> 0);
        return -1;
      }
      FUN_00418d90(heap, local_414);
      return -1;
    }
  }
  heap.setU32(0x005efec0, (9) >>> 0);
  heap.setU32(0x005efec4, (0) >>> 0);
  return -1;
} finally {
    heap.freeFrame(1036);
  }
}
