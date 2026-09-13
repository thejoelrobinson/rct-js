// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40b4d8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetDC, GetSystemPaletteEntries, ReleaseDC, _memset } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00405b58 } from "./405b58.js";
import { FUN_0040acfb } from "./40acfb.js";
import { FUN_00413830 } from "./413830.js";
export function FUN_0040b4d8(heap) {
  const __sp = heap.allocFrame(3860);
  const __addr_local_470 = __sp + 0;
  const __addr_local_404 = __sp + 108;
  const __addr_aBStack_3dc = __sp + 44;
  const __addr_local_2c = __sp + 1092;
  const __addr_local_46c = __sp + 4;
  const __addr_local_468 = __sp + 8;
  const __addr_local_464 = __sp + 12;
  const __addr_local_408 = __sp + 104;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  let hdc = 0;
  let local_478 = 0;
  heap.setU32(0x005f0950, (heap.u32(0x005f12b4)) >>> 0);
  heap.setU32(0x005e916c, ((regs.eax = FUN_00405b58(heap))) >>> 0);
  if (heap.u32(0x005e916c) == 0) {
    uVar2 = ((0) >>> 0);
  } else {
    iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x50)), heap.u32(0x005ebf30), heap.u32(0x005e916c), 8))) >>> 0);
    if (iVar1 == 0) {
      _memset(heap, __addr_local_470, 0, 0x6c);
      heap.setU32(__addr_local_470, (0x6c) >>> 0);
      heap.setU32(__addr_local_46c, (1) >>> 0);
      heap.setU32(__addr_local_408, (0x200) >>> 0);
      iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x18)), heap.u32(0x005ebf30), __addr_local_470, 0x005ebf34, 0))) >>> 0);
      if (iVar1 == 0) {
        if ((0 < heap.u32(0x005f12b4)) && (heap.setU32(0x005ebf38, ((regs.eax = FUN_00413830(heap, heap.u32(0x005f12b4), 4))) >>> 0), heap.u32(0x005ebf38) == 0)) {
          (regs.eax = FUN_0040acfb(heap));
          return 0;
        }
        for (local_478 = ((0) >>> 0); local_478 < heap.u32(0x005f12b4); local_478 = (((local_478 + 1) >>> 0)) >>> 0) {
          heap.setU32(__addr_local_46c, (7) >>> 0);
          heap.setU32(__addr_local_408, (0x840) >>> 0);
          heap.setU32(__addr_local_468, (heap.u32(0x005f129c)) >>> 0);
          heap.setU32(__addr_local_464, (heap.u32(0x005f12ac)) >>> 0);
          iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x18)), heap.u32(0x005ebf30), __addr_local_470, local_478 * 4 + heap.u32(0x005ebf38), 0))) >>> 0);
          if (iVar1 != 0) {
            (regs.eax = FUN_0040acfb(heap));
            return 0;
          }
        }
        iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x10)), heap.u32(0x005ebf30), 0, 0x005ebf44, 0))) >>> 0);
        if (iVar1 == 0) {
          iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf44)) + 0x20)), heap.u32(0x005ebf44), 0, heap.u32(0x005e916c)))) >>> 0);
          if (iVar1 == 0) {
            iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf34)) + 0x70)), heap.u32(0x005ebf34), heap.u32(0x005ebf44)))) >>> 0);
            if (iVar1 == 0) {
              if (heap.u32(0x005f1380) == 8) {
                hdc = ((GetDC(heap, ((0x0) | 0))) >>> 0);
                GetSystemPaletteEntries(heap, hdc, 0, 10, __addr_local_404);
                GetSystemPaletteEntries(heap, hdc, 0xf6, 10, (((__addr_aBStack_3dc + 0x3b0)) | 0));
                ReleaseDC(heap, ((0x0) | 0), hdc);
                for (local_478 = ((0) >>> 0); local_478 < 10; local_478 = (((local_478 + 1) >>> 0)) >>> 0) {
                  heap.setU8((heap.u32(__addr_local_404 + (local_478) * 4) + 3), (2) & 0xff);
                  heap.setU8((heap.u32(__addr_local_2c + (local_478) * 4) + 3), (2) & 0xff);
                }
                for (local_478 = ((10) >>> 0); local_478 < 0xf6; local_478 = (((local_478 + 1) >>> 0)) >>> 0) {
                  heap.setU8((heap.u32(__addr_local_404 + (local_478) * 4) + 2), (((local_478) << 24 >> 24) + 0xf7) & 0xff);
                  heap.setU8((heap.u32(__addr_local_404 + (local_478) * 4) + 1), (heap.u8((heap.u32(__addr_local_404 + (local_478) * 4) + 2))) & 0xff);
                  heap.setU8(heap.u32(__addr_local_404 + (local_478) * 4), (heap.u8((heap.u32(__addr_local_404 + (local_478) * 4) + 1))) & 0xff);
                  heap.setU8((heap.u32(__addr_local_404 + (local_478) * 4) + 3), (5) & 0xff);
                }
                iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x14)), heap.u32(0x005ebf30), 0x4c, __addr_local_404, 0x005ebf3c, 0))) >>> 0);
                if (iVar1 != 0) {
                  (regs.eax = FUN_0040acfb(heap));
                  return 0;
                }
                (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf34)) + 0x7c)), heap.u32(0x005ebf34), heap.u32(0x005ebf3c)));
                for (local_478 = ((0) >>> 0); local_478 < 0x100; local_478 = (((local_478 + 1) >>> 0)) >>> 0) {
                  heap.setU32((0x005f0960 + local_478 * 4), (heap.u32(__addr_local_404 + (local_478) * 4)) & 0xffffffff);
                }
              }
              heap.setU32(0x005ebe50, (0x0040acfb) >>> 0);
              uVar2 = ((1) >>> 0);
            } else {
              (regs.eax = FUN_0040acfb(heap));
              uVar2 = ((0) >>> 0);
            }
          } else {
            (regs.eax = FUN_0040acfb(heap));
            uVar2 = ((0) >>> 0);
          }
        } else {
          (regs.eax = FUN_0040acfb(heap));
          uVar2 = ((0) >>> 0);
        }
      } else {
        (regs.eax = FUN_0040acfb(heap));
        uVar2 = ((0) >>> 0);
      }
    } else {
      (regs.eax = FUN_0040acfb(heap));
      uVar2 = ((0) >>> 0);
    }
  }
  return uVar2;
} finally {
    heap.freeFrame(3860);
  }
}
