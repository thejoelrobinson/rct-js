// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/417a60.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetLastError, WriteFile } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004179a0 } from "./4179a0.js";
import { FUN_00418d90 } from "./418d90.js";
export function FUN_00417a60(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(1040);
  const __addr_local_410 = __sp + 0;
  const __addr_local_404 = __sp + 12;
  const __addr_local_40c = __sp + 4;
  const __addr_local_408 = __sp + 8;
  try {
  let piVar1 = 0;
  let bVar2 = 0;
  let cVar3 = 0;
  let pcVar4 = 0;
  let BVar5 = 0;
  let iVar6 = 0;
  let pcVar7 = 0;
  let local_41c = 0;
  let local_414 = 0;
  if (param_1 < heap.u32(0x005f3f60)) {
    piVar1 = ((0x005f3e60 + (((param_1) | 0) >>> 5)) >>> 0);
    iVar6 = (((param_1 & 0x1f) * 8) >>> 0);
    bVar2 = ((heap.u8((iVar6 + 4 + heap.u32((0x005f3e60) + (((param_1) | 0) >>> 5) * 4)))) & 0xff);
    if ((bVar2 & 1) != 0) {
      local_41c = ((0) >>> 0);
      heap.setU32(__addr_local_40c, (0) >>> 0);
      if (param_3 == 0) {
        return 0;
      }
      heap.setU32(__addr_local_408, (piVar1) >>> 0);
      if ((bVar2 & 0x20) != 0) {
        (regs.eax = FUN_004179a0(heap, param_1, 0, 2));
      }
      if ((heap.u8(((heap.i32(piVar1) + iVar6) + 1)) & 0x80) == 0) {
        BVar5 = ((WriteFile(heap, heap.u32((heap.i32(piVar1) + iVar6)), param_2, param_3, __addr_local_410, ((0x0) | 0))) >>> 0);
        if (BVar5 == 0) {
          local_414 = ((GetLastError(heap)) >>> 0);
        } else {
          local_41c = ((heap.u32(__addr_local_410)) >>> 0);
          local_414 = ((0) >>> 0);
        }
      } else {
        local_414 = ((0) >>> 0);
        pcVar7 = ((param_2) >>> 0);
        if (param_3 != 0) {
          do {
            pcVar4 = ((__addr_local_404) >>> 0);
            do {
              if (param_3 <= ((((pcVar7) | 0) - ((param_2) | 0)) >>> 0)) {
                break;
              }
              cVar3 = ((heap.i8(pcVar7)) & 0xff);
              pcVar7 = ((pcVar7 + 1) >>> 0);
              if (cVar3 == 10) {
                heap.setU32(pcVar4, (13) & 0xffffffff);
                heap.setU32(__addr_local_40c, (heap.u32(__addr_local_40c) + 1) >>> 0);
                pcVar4 = ((pcVar4 + 1) >>> 0);
              }
              heap.setU32(pcVar4, (cVar3) & 0xffffffff);
              pcVar4 = ((pcVar4 + 1) >>> 0);
            } while (((pcVar4) | 0) - ((__addr_local_404) | 0) < 0x400);
            BVar5 = ((WriteFile(heap, heap.u32((iVar6 + heap.i32(heap.u32(__addr_local_408)))), __addr_local_404, ((pcVar4) | 0) - ((__addr_local_404) | 0), __addr_local_410, ((0x0) | 0))) >>> 0);
            if (BVar5 == 0) {
              local_414 = ((GetLastError(heap)) >>> 0);
              break;
            }
            local_41c = ((local_41c + heap.u32(__addr_local_410)) >>> 0);
            if ((((heap.u32(__addr_local_410)) | 0) < ((pcVar4) | 0) - ((__addr_local_404) | 0)) || (param_3 <= ((((pcVar7) | 0) - ((param_2) | 0)) >>> 0))) {
              break;
            }
          } while (true);
        }
      }
      if (local_41c != 0) {
        return local_41c - heap.u32(__addr_local_40c);
      }
      if (local_414 == 0) {
        if (((heap.u8((iVar6 + 4 + heap.i32(heap.u32(__addr_local_408)))) & 0x40) != 0) && (heap.i8(param_2) == 26)) {
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
      (regs.eax = FUN_00418d90(heap, local_414));
      return -1;
    }
  }
  heap.setU32(0x005efec0, (9) >>> 0);
  heap.setU32(0x005efec4, (0) >>> 0);
  return -1;
} finally {
    heap.freeFrame(1040);
  }
}
