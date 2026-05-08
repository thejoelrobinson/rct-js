// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/405653.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CreateFontIndirectA, RegCloseKey, RegOpenKeyA, RegQueryValueExA } from "../runtime/win32.js";
import { FUN_00413170 } from "./413170.js";
import { FUN_00413180 } from "./413180.js";
export function FUN_00405653(heap, param_1, param_2) {
  const __sp = heap.allocFrame(416);
  const __addr_local_10 = __sp + 0;
  const __addr_DAT_005ebd8c = __sp + 4;
  const __addr_local_158 = __sp + 8;
  const __addr_local_118 = __sp + 136;
  const __addr_DAT_005e91f0 = __sp + 140;
  const __addr_DAT_005e92f8 = __sp + 144;
  const __addr_local_11c = __sp + 148;
  const __addr_local_114 = __sp + 152;
  const __addr_local_c = __sp + 412;
  try {
  let LVar1 = 0;
  FUN_00413170(heap, __addr_local_114, 0x005ebd64);
  FUN_00413180(heap, __addr_local_114, param_2);
  LVar1 = RegOpenKeyA(heap, 0x80000002, __addr_local_114, __addr_local_10);
  if (LVar1 == 0) {
    heap.u32(__addr_local_c + (1) * 4) = 0x104;
    RegQueryValueExA(heap, heap.u32(__addr_local_10), 0x005ebd84, 0x0, __addr_local_c, param_1 + 4, __addr_local_c + 1);
    heap.u32(__addr_local_c + (1) * 4) = 0x104;
    RegQueryValueExA(heap, heap.u32(__addr_local_10), __addr_DAT_005ebd8c, 0x0, __addr_local_c, param_1 + 0x108, __addr_local_c + 1);
    heap.u32(__addr_local_c + (1) * 4) = 0x104;
    RegQueryValueExA(heap, heap.u32(__addr_local_10), 0x005ebd94, 0x0, __addr_local_c, param_1 + 0x20c, __addr_local_c + 1);
    heap.u32(__addr_local_c + (1) * 4) = 4;
    RegQueryValueExA(heap, heap.u32(__addr_local_10), 0x005ebda0, 0x0, __addr_local_c, param_1, __addr_local_c + 1);
    _memset(__addr_local_158, 0, 0x3c);
    heap.u32(__addr_local_c + (1) * 4) = 4;
    RegQueryValueExA(heap, heap.u32(__addr_local_10), 0x005ebdb0, 0x0, __addr_local_c, __addr_local_118, __addr_local_c + 1);
    heap.u32(__addr_local_c + (1) * 4) = 0x20;
    RegQueryValueExA(heap, heap.u32(__addr_local_10), 0x005ebdc0, 0x0, __addr_local_c, heap.u8((__addr_local_158 + 28)), __addr_local_c + 1);
    heap.u32(__addr_local_c + (1) * 4) = 4;
    RegQueryValueExA(heap, heap.u32(__addr_local_10), 0x005ebdd0, 0x0, __addr_local_c, __addr_local_11c, __addr_local_c + 1);
    heap.u32(__addr_local_158) = heap.u32(__addr_local_118);
    heap.u32((__addr_local_158 + 16)) = 400;
    heap.u8((__addr_local_158 + 23)) = heap.u32(__addr_local_11c + (0) * 4);
    heap.setU32(0x005e91ec, (CreateFontIndirectA(heap, __addr_local_158)) >>> 0);
    heap.u32(__addr_local_c + (1) * 4) = 0x104;
    RegQueryValueExA(heap, heap.u32(__addr_local_10), 0x005ebdd8, 0x0, __addr_local_c, __addr_DAT_005e91f0, __addr_local_c + 1);
    heap.u32(__addr_local_c + (1) * 4) = 0x104;
    RegQueryValueExA(heap, heap.u32(__addr_local_10), 0x005ebde4, 0x0, __addr_local_c, __addr_DAT_005e92f8, __addr_local_c + 1);
    RegCloseKey(heap, heap.u32(__addr_local_10));
  }
  return LVar1 == 0;
} finally {
    heap.freeFrame(416);
  }
}
