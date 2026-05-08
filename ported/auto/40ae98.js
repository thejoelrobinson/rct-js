// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40ae98.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetDC, GetSystemPaletteEntries, ReleaseDC } from "../../runtime/win32.js";
import { FUN_00405b05 } from "./405b05.js";
import { FUN_00408d5d } from "./408d5d.js";
import { FUN_0040ab29 } from "./40ab29.js";
import { FUN_0040ab58 } from "./40ab58.js";
import { FUN_0040acfb } from "./40acfb.js";
import { FUN_004119a0 } from "./4119a0.js";
import { FUN_00413830 } from "./413830.js";
export function FUN_0040ae98(heap) {
  const __sp = heap.allocFrame(1036);
  const __addr_DAT_005f0d80 = __sp + 0;
  const __addr_local_470 = __sp + 4;
  const __addr_DAT_005ebf34 = __sp + 8;
  const __addr_DAT_005ebf44 = __sp + 12;
  const __addr_DAT_005ebf3c = __sp + 16;
  const __addr_DAT_005f0960 = __sp + 20;
  const __addr_DAT_005ebf40 = __sp + 24;
  const __addr_local_4e8 = __sp + 28;
  const __addr_DAT_005f0f04 = __sp + 32;
  const __addr_DAT_005f0f00 = __sp + 36;
  const __addr_DAT_005f0f0c = __sp + 40;
  const __addr_DAT_005f0f08 = __sp + 44;
  const __addr_local_4e0 = __sp + 48;
  const __addr_local_404 = __sp + 68;
  const __addr_aBStack_3dc = __sp + 80;
  const __addr_local_2c = __sp + 1024;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  let local_4e4 = 0;
  let local_490 = 0;
  let local_47c = 0;
  let local_478 = 0;
  let local_474 = 0;
  let local_46c = 0;
  let local_468 = 0;
  let local_464 = 0;
  let local_45c = 0;
  let local_408 = 0;
  heap.setU32(0x005f0950, (heap.u32(0x005f12b4) + 1) >>> 0);
  heap.setU32(0x005e916c, (FUN_00405b05(heap)) >>> 0);
  if (heap.u32(0x005e916c) == 0) {
    uVar1 = 0;
  } else {
    heap.setU32(0x005f0d80, (0x16c) >>> 0);
    (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x2c))))(heap.u32(0x005ebf30), 0, __addr_DAT_005f0d80);
    local_474 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x50))))(heap.u32(0x005ebf30), heap.u32(0x005e916c), 0x13);
    if (local_474 == 0) {
      local_474 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x54))))(heap.u32(0x005ebf30), heap.u32(0x005f12ac), heap.u32(0x005f129c), heap.u32(0x005f1380));
      if (local_474 == 0) {
        if (heap.u32(0x005f12b4) < 1) {
          _memset(__addr_local_470, 0, 0x6c);
          heap.setU32(__addr_local_470, (0x6c) >>> 0);
          local_46c = 1;
          local_408 = 0x200;
          local_474 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x18))))(heap.u32(0x005ebf30), __addr_local_470, __addr_DAT_005ebf34, 0);
          if (local_474 != 0) {
            FUN_0040ab58(heap);
            return 0;
          }
          heap.setU32(0x005ebf38, (0) >>> 0);
        } else {
          _memset(__addr_local_470, 0, 0x6c);
          heap.setU32(__addr_local_470, (0x6c) >>> 0);
          local_46c = 0x21;
          local_408 = 0x218;
          local_45c = heap.u32(0x005f12b4);
          local_474 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x18))))(heap.u32(0x005ebf30), __addr_local_470, __addr_DAT_005ebf34, 0);
          if (local_474 != 0) {
            FUN_0040ab58(heap);
            return 0;
          }
          heap.setU32(0x005ebf38, (FUN_00413830(heap, heap.u32(0x005f12b4), 4)) >>> 0);
          if (heap.u32(0x005ebf38) == 0) {
            FUN_0040ab58(heap);
            return 0;
          }
          heap.setU32(0x005f0ef0, (0) >>> 0);
          local_474 = (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ebf34)) + 0x24))))(heap.u32(__addr_DAT_005ebf34), 0, FUN_0040ab29);
          if (local_474 != 0) {
            FUN_0040ab58(heap);
            return 0;
          }
          if (heap.u32(0x005f0ef0) != heap.u32(0x005f12b4)) {
            FUN_0040ab58(heap);
            return 0;
          }
        }
        local_474 = 0;
        local_474 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x10))))(heap.u32(0x005ebf30), 0, __addr_DAT_005ebf44, 0);
        if (local_474 == 0) {
          local_474 = (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ebf44)) + 0x20))))(heap.u32(__addr_DAT_005ebf44), 0, heap.u32(0x005e916c));
          if (local_474 == 0) {
            iVar2 = 0;
            if (heap.u32(0x005f1380) == 8) {
              local_47c = GetDC(heap, 0x0);
              GetSystemPaletteEntries(heap, local_47c, 0, 10, __addr_local_404);
              for (local_478 = 0; local_478 < 10; local_478 = local_478 + 1) {
                heap.u8((heap.u32(__addr_local_404 + (local_478) * 4) + 3)) = '\x02';
                heap.u8((heap.u32(__addr_local_2c + (local_478) * 4) + 3)) = '\x02';
              }
              GetSystemPaletteEntries(heap, local_47c, 0xf6, 10, (__addr_aBStack_3dc + 0x3b0));
              ReleaseDC(heap, 0x0, local_47c);
              for (local_478 = 10; local_478 < 0xf6; local_478 = local_478 + 1) {
                heap.u8((heap.u32(__addr_local_404 + (local_478) * 4) + 2)) = local_478 + 0xf7;
                heap.u8((heap.u32(__addr_local_404 + (local_478) * 4) + 1)) = heap.u8((heap.u32(__addr_local_404 + (local_478) * 4) + 2));
                heap.u8(heap.u32(__addr_local_404 + (local_478) * 4)) = heap.u8((heap.u32(__addr_local_404 + (local_478) * 4) + 1));
                heap.u8((heap.u32(__addr_local_404 + (local_478) * 4) + 3)) = '\x05';
              }
              local_474 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x14))))(heap.u32(0x005ebf30), 0x4c, __addr_local_404, __addr_DAT_005ebf3c, 0);
              if (local_474 != 0) {
                FUN_0040acfb(heap);
                return 0;
              }
              (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ebf34)) + 0x7c))))(heap.u32(__addr_DAT_005ebf34), heap.u32(__addr_DAT_005ebf3c));
              for (local_478 = 0; iVar2 = local_474, local_478 < 0x100; local_478 = local_478 + 1) {
                heap.u32((__addr_DAT_005f0960 + local_478 * 4)) = heap.u32(__addr_local_404 + (local_478) * 4);
              }
            }
            local_474 = iVar2;
            local_46c = 7;
            local_408 = 0x40;
            local_464 = heap.u32(0x005f0950) * 0x40 + 0x40;
            local_468 = 0x40;
            iVar2 = (heap.u32(heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x18))))(heap.u32(0x005ebf30), __addr_local_470, __addr_DAT_005ebf40, 0);
            if (iVar2 == 0) {
              heap.u32(__addr_local_4e0 + (0) * 4) = 100;
              local_490 = 0;
              local_474 = 0;
              while (iVar2 = (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ebf40)) + 0x14))))(heap.u32(__addr_DAT_005ebf40), 0, 0, 0, 0x1000400, __addr_local_4e0), iVar2 == -0x7789fe3e) {
                FUN_00408d5d(heap);
              }
              FUN_004119a0(heap, heap.u32(__addr_DAT_005ebf40), 0x005ebfc8);
              heap.setU32(__addr_local_4e8, (0) >>> 0);
              local_4e4 = 0;
              (heap.u32(heap.u32((heap.u32(heap.u32(__addr_DAT_005ebf40)) + 0x74))))(heap.u32(__addr_DAT_005ebf40), 8, __addr_local_4e8);
            }
            heap.setU32(0x005f138c, (8) >>> 0);
            heap.setU32(0x005f12a4, (8) >>> 0);
            for (local_478 = 0; local_478 < heap.u32(0x005f12b4); local_478 = local_478 + 1) {
              heap.u32((__addr_DAT_005f0f04) + (local_478 * 4) * 4) = 0;
              heap.u32((__addr_DAT_005f0f00) + (local_478 * 4) * 4) = heap.u32((__addr_DAT_005f0f04) + (local_478 * 4) * 4);
              heap.u32((__addr_DAT_005f0f0c) + (local_478 * 4) * 4) = 0;
              heap.u32((__addr_DAT_005f0f08) + (local_478 * 4) * 4) = heap.u32((__addr_DAT_005f0f0c) + (local_478 * 4) * 4);
            }
            heap.setU32(0x005ebe50, (FUN_0040ab58) >>> 0);
            uVar1 = 1;
          } else {
            FUN_0040ab58(heap);
            uVar1 = 0;
          }
        } else {
          FUN_0040ab58(heap);
          uVar1 = 0;
        }
      } else {
        FUN_0040ab58(heap);
        uVar1 = 0;
      }
    } else {
      FUN_0040ab58(heap);
      uVar1 = 0;
    }
  }
  return uVar1;
} finally {
    heap.freeFrame(1036);
  }
}
