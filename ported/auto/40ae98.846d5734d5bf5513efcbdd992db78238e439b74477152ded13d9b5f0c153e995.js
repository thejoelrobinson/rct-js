// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40ae98.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetDC, GetSystemPaletteEntries, ReleaseDC, _memset } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00405b05 } from "./405b05.js";
import { FUN_00408d5d } from "./408d5d.js";
import { FUN_0040ab58 } from "./40ab58.js";
import { FUN_0040acfb } from "./40acfb.js";
import { FUN_004119a0 } from "./4119a0.js";
import { FUN_00413830 } from "./413830.js";
export function FUN_0040ae98(heap) {
  const __sp = heap.allocFrame(3944);
  const __addr_local_470 = __sp + 124;
  const __addr_local_4e8 = __sp + 4;
  const __addr_local_4e0 = __sp + 12;
  const __addr_local_404 = __sp + 232;
  const __addr_aBStack_3dc = __sp + 128;
  const __addr_local_2c = __sp + 1216;
  const __addr_local_4e4 = __sp + 8;
  const __addr_local_490 = __sp + 92;
  const __addr_local_47c = __sp + 112;
  const __addr_local_478 = __sp + 116;
  const __addr_local_474 = __sp + 120;
  const __addr_local_46c = __sp + 128;
  const __addr_local_468 = __sp + 132;
  const __addr_local_464 = __sp + 136;
  const __addr_local_45c = __sp + 144;
  const __addr_local_408 = __sp + 228;
  try {
  let uVar1 = 0;
  let iVar2 = 0;
  heap.setU32(0x005f0950, (heap.u32(0x005f12b4) + 1) >>> 0);
  heap.setU32(0x005e916c, ((regs.eax = FUN_00405b05(heap))) >>> 0);
  if (heap.u32(0x005e916c) == 0) {
    uVar1 = ((0) >>> 0);
  } else {
    heap.setU32(0x005f0d80, (0x16c) >>> 0);
    (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x2c)), heap.u32(0x005ebf30), 0, 0x005f0d80));
    heap.setU32(__addr_local_474, ((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x50)), heap.u32(0x005ebf30), heap.u32(0x005e916c), 0x13))) >>> 0);
    if (heap.u32(__addr_local_474) == 0) {
      heap.setU32(__addr_local_474, ((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x54)), heap.u32(0x005ebf30), heap.u32(0x005f12ac), heap.u32(0x005f129c), heap.u32(0x005f1380)))) >>> 0);
      if (heap.u32(__addr_local_474) == 0) {
        if (heap.u32(0x005f12b4) < 1) {
          _memset(heap, __addr_local_470, 0, 0x6c);
          heap.setU32(__addr_local_470, (0x6c) >>> 0);
          heap.setU32(__addr_local_46c, (1) >>> 0);
          heap.setU32(__addr_local_408, (0x200) >>> 0);
          heap.setU32(__addr_local_474, ((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x18)), heap.u32(0x005ebf30), __addr_local_470, 0x005ebf34, 0))) >>> 0);
          if (heap.u32(__addr_local_474) != 0) {
            (regs.eax = FUN_0040ab58(heap));
            return 0;
          }
          heap.setU32(0x005ebf38, (0) >>> 0);
        } else {
          _memset(heap, __addr_local_470, 0, 0x6c);
          heap.setU32(__addr_local_470, (0x6c) >>> 0);
          heap.setU32(__addr_local_46c, (0x21) >>> 0);
          heap.setU32(__addr_local_408, (0x218) >>> 0);
          heap.setU32(__addr_local_45c, (heap.u32(0x005f12b4)) >>> 0);
          heap.setU32(__addr_local_474, ((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x18)), heap.u32(0x005ebf30), __addr_local_470, 0x005ebf34, 0))) >>> 0);
          if (heap.u32(__addr_local_474) != 0) {
            (regs.eax = FUN_0040ab58(heap));
            return 0;
          }
          heap.setU32(0x005ebf38, ((regs.eax = FUN_00413830(heap, heap.u32(0x005f12b4), 4))) >>> 0);
          if (heap.u32(0x005ebf38) == 0) {
            (regs.eax = FUN_0040ab58(heap));
            return 0;
          }
          heap.setU32(0x005f0ef0, (0) >>> 0);
          heap.setU32(__addr_local_474, ((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf34)) + 0x24)), heap.u32(0x005ebf34), 0, 0x0040ab29))) >>> 0);
          if (heap.u32(__addr_local_474) != 0) {
            (regs.eax = FUN_0040ab58(heap));
            return 0;
          }
          if (heap.u32(0x005f0ef0) != heap.u32(0x005f12b4)) {
            (regs.eax = FUN_0040ab58(heap));
            return 0;
          }
        }
        heap.setU32(__addr_local_474, (0) >>> 0);
        heap.setU32(__addr_local_474, ((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x10)), heap.u32(0x005ebf30), 0, 0x005ebf44, 0))) >>> 0);
        if (heap.u32(__addr_local_474) == 0) {
          heap.setU32(__addr_local_474, ((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf44)) + 0x20)), heap.u32(0x005ebf44), 0, heap.u32(0x005e916c)))) >>> 0);
          if (heap.u32(__addr_local_474) == 0) {
            iVar2 = ((0) >>> 0);
            if (heap.u32(0x005f1380) == 8) {
              heap.setU32(__addr_local_47c, (GetDC(heap, ((0x0) | 0))) >>> 0);
              GetSystemPaletteEntries(heap, heap.u32(__addr_local_47c), 0, 10, __addr_local_404);
              for (heap.setU32(__addr_local_478, (0) >>> 0); heap.u32(__addr_local_478) < 10; heap.setU32(__addr_local_478, (heap.u32(__addr_local_478) + 1) >>> 0)) {
                heap.setU8((heap.u32(__addr_local_404 + (heap.u32(__addr_local_478)) * 4) + 3), (2) & 0xff);
                heap.setU8((heap.u32(__addr_local_2c + (heap.u32(__addr_local_478)) * 4) + 3), (2) & 0xff);
              }
              GetSystemPaletteEntries(heap, heap.u32(__addr_local_47c), 0xf6, 10, (((__addr_aBStack_3dc + 0x3b0)) | 0));
              ReleaseDC(heap, ((0x0) | 0), heap.u32(__addr_local_47c));
              for (heap.setU32(__addr_local_478, (10) >>> 0); heap.u32(__addr_local_478) < 0xf6; heap.setU32(__addr_local_478, (heap.u32(__addr_local_478) + 1) >>> 0)) {
                heap.setU8((heap.u32(__addr_local_404 + (heap.u32(__addr_local_478)) * 4) + 2), (((heap.u32(__addr_local_478)) << 24 >> 24) + 0xf7) & 0xff);
                heap.setU8((heap.u32(__addr_local_404 + (heap.u32(__addr_local_478)) * 4) + 1), (heap.u8((heap.u32(__addr_local_404 + (heap.u32(__addr_local_478)) * 4) + 2))) & 0xff);
                heap.setU8(heap.u32(__addr_local_404 + (heap.u32(__addr_local_478)) * 4), (heap.u8((heap.u32(__addr_local_404 + (heap.u32(__addr_local_478)) * 4) + 1))) & 0xff);
                heap.setU8((heap.u32(__addr_local_404 + (heap.u32(__addr_local_478)) * 4) + 3), (5) & 0xff);
              }
              heap.setU32(__addr_local_474, ((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x14)), heap.u32(0x005ebf30), 0x4c, __addr_local_404, 0x005ebf3c, 0))) >>> 0);
              if (heap.u32(__addr_local_474) != 0) {
                (regs.eax = FUN_0040acfb(heap));
                return 0;
              }
              (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf34)) + 0x7c)), heap.u32(0x005ebf34), heap.u32(0x005ebf3c)));
              for (heap.setU32(__addr_local_478, (0) >>> 0); iVar2 = ((heap.u32(__addr_local_474)) >>> 0), heap.u32(__addr_local_478) < 0x100; heap.setU32(__addr_local_478, (heap.u32(__addr_local_478) + 1) >>> 0)) {
                heap.setU32((0x005f0960 + heap.u32(__addr_local_478) * 4), (heap.u32(__addr_local_404 + (heap.u32(__addr_local_478)) * 4)) & 0xffffffff);
              }
            }
            heap.setU32(__addr_local_474, (iVar2) >>> 0);
            heap.setU32(__addr_local_46c, (7) >>> 0);
            heap.setU32(__addr_local_408, (0x40) >>> 0);
            heap.setU32(__addr_local_464, (heap.u32(0x005f0950) * 0x40 + 0x40) >>> 0);
            heap.setU32(__addr_local_468, (0x40) >>> 0);
            iVar2 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf30)) + 0x18)), heap.u32(0x005ebf30), __addr_local_470, 0x005ebf40, 0))) >>> 0);
            if (iVar2 == 0) {
              heap.setU32((__addr_local_4e0 + (0) * 4), (100) & 0xffffffff);
              heap.setU32(__addr_local_490, (0) >>> 0);
              heap.setU32(__addr_local_474, (0) >>> 0);
              while (iVar2 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf40)) + 0x14)), heap.u32(0x005ebf40), 0, 0, 0, 0x1000400, __addr_local_4e0))) >>> 0), iVar2 == -0x7789fe3e) {
                (regs.eax = FUN_00408d5d(heap));
              }
              (regs.eax = FUN_004119a0(heap, heap.u32(0x005ebf40), 0x005ebfc8));
              heap.setU32(__addr_local_4e8, (0) >>> 0);
              heap.setU32(__addr_local_4e4, (0) >>> 0);
              (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32(0x005ebf40)) + 0x74)), heap.u32(0x005ebf40), 8, __addr_local_4e8));
            }
            heap.setU32(0x005f138c, (8) >>> 0);
            heap.setU32(0x005f12a4, (8) >>> 0);
            for (heap.setU32(__addr_local_478, (0) >>> 0); heap.u32(__addr_local_478) < heap.u32(0x005f12b4); heap.setU32(__addr_local_478, (heap.u32(__addr_local_478) + 1) >>> 0)) {
              heap.setU32(((0x005f0f04) + (heap.u32(__addr_local_478) * 4) * 4), (0) & 0xffffffff);
              heap.setU32(((0x005f0f00) + (heap.u32(__addr_local_478) * 4) * 4), (heap.u32((0x005f0f04) + (heap.u32(__addr_local_478) * 4) * 4)) & 0xffffffff);
              heap.setU32(((0x005f0f0c) + (heap.u32(__addr_local_478) * 4) * 4), (0) & 0xffffffff);
              heap.setU32(((0x005f0f08) + (heap.u32(__addr_local_478) * 4) * 4), (heap.u32((0x005f0f0c) + (heap.u32(__addr_local_478) * 4) * 4)) & 0xffffffff);
            }
            heap.setU32(0x005ebe50, (0x0040ab58) >>> 0);
            uVar1 = ((1) >>> 0);
          } else {
            (regs.eax = FUN_0040ab58(heap));
            uVar1 = ((0) >>> 0);
          }
        } else {
          (regs.eax = FUN_0040ab58(heap));
          uVar1 = ((0) >>> 0);
        }
      } else {
        (regs.eax = FUN_0040ab58(heap));
        uVar1 = ((0) >>> 0);
      }
    } else {
      (regs.eax = FUN_0040ab58(heap));
      uVar1 = ((0) >>> 0);
    }
  }
  return uVar1;
} finally {
    heap.freeFrame(3944);
  }
}
