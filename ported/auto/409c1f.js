// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/409c1f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { ClientToScreen, GetClientRect, LPPOINT } from "../runtime/win32.js";
import { FUN_00408d5d } from "./408d5d.js";
export function FUN_00409c1f(heap, param_1, param_2, param_3, param_4) {
  const __sp = heap.allocFrame(128);
  const __addr_local_28 = __sp + 0;
  try {
  let iVar1 = 0;
  let local_18 = 0;
  let local_14 = 0;
  let local_10 = 0;
  let local_c = 0;
  let local_8 = 0;
  if ((((param_1 != 0) && (param_3 != 0)) && (heap.u32((param_3 + 0x80)) != 0)) && (heap.u32((param_1 + 0x80)) != 0)) {
    if (heap.u32(0x005ebf54) == 0) {
      local_18 = heap.u32(param_4);
      local_14 = heap.u32(param_4 + (1) * 4);
      local_10 = heap.u32(param_4 + (2) * 4);
      local_c = heap.u32(param_4 + (3) * 4);
      GetClientRect(heap, heap.u32(0x005e916c), __addr_local_28);
      ClientToScreen(heap, heap.u32(0x005e916c), (LPPOINT) & heap.u32(__addr_local_28));
      heap.u32(param_4) = heap.u32(param_4) + heap.u32(__addr_local_28);
      heap.u32(param_4 + (1) * 4) = heap.u32(param_4 + (1) * 4) + heap.u32((__addr_local_28 + 4));
      heap.u32(param_4 + (2) * 4) = heap.u32(param_4 + (2) * 4) + heap.u32(__addr_local_28);
      heap.u32(param_4 + (3) * 4) = heap.u32(param_4 + (3) * 4) + heap.u32((__addr_local_28 + 4));
    }
    do {
      local_8 = (heap.u32(heap.u32((heap.u32(heap.u32((param_3 + 0x80))) + 0x14))))(heap.u32((param_3 + 0x80)), param_4, heap.u32((param_1 + 0x80)), param_2, 0x1000000, 0);
      if ((local_8 == -0x7789fe3e) && (iVar1 = FUN_00408d5d(heap), iVar1 == 0)) {
        break;
      }
    } while (local_8 == -0x7789fe3e);
    if (heap.u32(0x005ebf54) == 0) {
      heap.u32(param_4) = local_18;
      heap.u32(param_4 + (1) * 4) = local_14;
      heap.u32(param_4 + (2) * 4) = local_10;
      heap.u32(param_4 + (3) * 4) = local_c;
    }
    if (local_8 == 0) {
      return 1;
    }
    if (local_8 < -0x7fffbffa) {
      if (local_8 == -0x7fffbffb) {
        return 0;
      }
      if (local_8 == -0x7fffbfff) {
        return 0;
      }
    } else {
      if (local_8 < -0x7789ff91) {
      if (local_8 == -0x7789ff92) {
        return 0;
      }
      if (local_8 == -0x7ff8ffa9) {
        return 0;
      }
    } else {
      if (local_8 < -0x7789ff69) {
      if (local_8 == -0x7789ff6a) {
        return 0;
      }
      if (local_8 == -0x7789ff7e) {
        return 0;
      }
    } else {
      if (local_8 < -0x7789ff32) {
      if (local_8 == -0x7789ff33) {
        return 0;
      }
      if (local_8 == -0x7789ff4c) {
        return 0;
      }
    } else {
      if (local_8 < -0x7789fee7) {
      if (local_8 == -0x7789fee8) {
        return 0;
      }
      if (local_8 == -0x7789ff06) {
        return 0;
      }
    } else {
      if (local_8 < -0x7789fec9) {
      if (local_8 == -0x7789feca) {
        return 0;
      }
      if (local_8 == -0x7789fede) {
        return 0;
      }
    } else {
      switch (local_8) {
        case -0x7789feac:
          return 0;
        case -0x7789fe52:
          return 0;
        case -0x7789fe3e:
          return 0;
        case -0x7789fdc1:
          return 0;
        case -0x7789fdc0:
          return 0;
      }
    }
    }
    }
    }
    }
    }
  }
  return 0;
} finally {
    heap.freeFrame(128);
  }
}
