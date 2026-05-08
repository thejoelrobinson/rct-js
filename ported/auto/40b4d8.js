// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40b4d8.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetDC, GetSystemPaletteEntries, LPPALETTEENTRY, ReleaseDC } from "../runtime/win32.js";
import { FUN_00405b58 } from "./405b58.js";
import { FUN_0040acfb } from "./40acfb.js";
import { FUN_00413830 } from "./413830.js";
export function FUN_0040b4d8(heap) {
  const __sp = heap.allocFrame(988);
  const __addr_local_470 = __sp + 0;
  const __addr_DAT_005ebf34 = __sp + 4;
  const __addr_DAT_005ebf44 = __sp + 8;
  const __addr_DAT_005ebf3c = __sp + 12;
  const __addr_DAT_005f0960 = __sp + 16;
  const __addr_local_404 = __sp + 20;
  const __addr_aBStack_3dc = __sp + 32;
  const __addr_local_2c = __sp + 976;
  try {
  let iVar1 = 0;
  let uVar2 = 0;
  let hdc = 0;
  let local_478 = 0;
  let local_46c = 0;
  let local_468 = 0;
  let local_464 = 0;
  let local_408 = 0;
  heap.setU32(0x005f0950, (heap.u32(0x005f12b4)) >>> 0);
  heap.setU32(0x005e916c, (FUN_00405b58(heap)) >>> 0);
  if (heap.u32(0x005e916c) == 0) {
    uVar2 = 0;
  } else {
    iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x50))))(heap.u32(0x005ebf30), heap.u32(0x005e916c), 8);
    if (iVar1 == 0) {
      _memset(__addr_local_470, 0, 0x6c);
      heap.setU32(__addr_local_470, (0x6c) >>> 0);
      local_46c = 1;
      local_408 = 0x200;
      iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x18))))(heap.u32(0x005ebf30), __addr_local_470, __addr_DAT_005ebf34, 0);
      if (iVar1 == 0) {
        if ((0 < heap.u32(0x005f12b4)) && (heap.setU32(0x005ebf38, (FUN_00413830(heap, heap.u32(0x005f12b4), 4)) >>> 0), heap.u32(0x005ebf38) == 0)) {
          FUN_0040acfb(heap);
          return 0;
        }
        for (local_478 = 0; local_478 < heap.u32(0x005f12b4); local_478 = local_478 + 1) {
          local_46c = 7;
          local_408 = 0x840;
          local_468 = heap.u32(0x005f129c);
          local_464 = heap.u32(0x005f12ac);
          iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x18))))(heap.u32(0x005ebf30), __addr_local_470, local_478 * 4 + heap.u32(0x005ebf38), 0);
          if (iVar1 != 0) {
            FUN_0040acfb(heap);
            return 0;
          }
        }
        iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x10))))(heap.u32(0x005ebf30), 0, __addr_DAT_005ebf44, 0);
        if (iVar1 == 0) {
          iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ebf44)) + 0x20))))(heap.u32(__addr_DAT_005ebf44), 0, heap.u32(0x005e916c));
          if (iVar1 == 0) {
            iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ebf34)) + 0x70))))(heap.u32(__addr_DAT_005ebf34), heap.u32(__addr_DAT_005ebf44));
            if (iVar1 == 0) {
              if (heap.u32(0x005f1380) == 8) {
                hdc = GetDC(heap, 0x0);
                GetSystemPaletteEntries(heap, hdc, 0, 10, __addr_local_404);
                GetSystemPaletteEntries(heap, hdc, 0xf6, 10, (LPPALETTEENTRY)(__addr_aBStack_3dc + 0x3b0));
                ReleaseDC(heap, 0x0, hdc);
                for (local_478 = 0; local_478 < 10; local_478 = local_478 + 1) {
                  heap.u8((heap.u32(__addr_local_404 + (local_478) * 4) + 3)) = '\x02';
                  heap.u8((heap.u32(__addr_local_2c + (local_478) * 4) + 3)) = '\x02';
                }
                for (local_478 = 10; local_478 < 0xf6; local_478 = local_478 + 1) {
                  heap.u8((heap.u32(__addr_local_404 + (local_478) * 4) + 2)) = local_478 + 0xf7;
                  heap.u8((heap.u32(__addr_local_404 + (local_478) * 4) + 1)) = heap.u8((heap.u32(__addr_local_404 + (local_478) * 4) + 2));
                  heap.u8(heap.u32(__addr_local_404 + (local_478) * 4)) = heap.u8((heap.u32(__addr_local_404 + (local_478) * 4) + 1));
                  heap.u8((heap.u32(__addr_local_404 + (local_478) * 4) + 3)) = '\x05';
                }
                iVar1 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x14))))(heap.u32(0x005ebf30), 0x4c, __addr_local_404, __addr_DAT_005ebf3c, 0);
                if (iVar1 != 0) {
                  FUN_0040acfb(heap);
                  return 0;
                }
                (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ebf34)) + 0x7c))))(heap.u32(__addr_DAT_005ebf34), heap.u32(__addr_DAT_005ebf3c));
                for (local_478 = 0; local_478 < 0x100; local_478 = local_478 + 1) {
                  heap.u32((__addr_DAT_005f0960 + local_478 * 4)) = heap.u32(__addr_local_404 + (local_478) * 4);
                }
              }
              heap.setU32(0x005ebe50, (FUN_0040acfb) >>> 0);
              uVar2 = 1;
            } else {
              FUN_0040acfb(heap);
              uVar2 = 0;
            }
          } else {
            FUN_0040acfb(heap);
            uVar2 = 0;
          }
        } else {
          FUN_0040acfb(heap);
          uVar2 = 0;
        }
      } else {
        FUN_0040acfb(heap);
        uVar2 = 0;
      }
    } else {
      FUN_0040acfb(heap);
      uVar2 = 0;
    }
  }
  return uVar2;
} finally {
    heap.freeFrame(988);
  }
}
