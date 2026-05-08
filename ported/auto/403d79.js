// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/403d79.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DefWindowProcA, DragQueryFileA, FlashWindow, GetDC, GetDeviceCaps, GetUpdateRect, ReleaseCapture, ReleaseDC, SetCapture, SetCursor, ValidateRect } from "../../runtime/win32.js";
import { FUN_00401120 } from "./401120.js";
import { FUN_00401200 } from "./401200.js";
import { FUN_004015f0 } from "./4015f0.js";
import { FUN_00403337 } from "./403337.js";
import { FUN_00403370 } from "./403370.js";
import { FUN_004033fa } from "./4033fa.js";
import { FUN_00403454 } from "./403454.js";
import { FUN_004059dd } from "./4059dd.js";
import { FUN_00406fb5 } from "./406fb5.js";
import { FUN_00407b0c } from "./407b0c.js";
export function FUN_00403d79(heap, param_1, param_2, param_3, param_4) {
  const __sp = heap.allocFrame(12);
  const __addr_local_14 = __sp + 0;
  const __addr_DAT_005f15e4 = __sp + 4;
  const __addr_DAT_005f1900 = __sp + 8;
  try {
  let sVar1 = 0;
  let sVar2 = 0;
  let hdc = 0;
  let uVar3 = 0;
  let pHVar4 = 0;
  if (heap.u32(0x005e9168) != 0) {
    FUN_004059dd(heap, param_2, param_3, param_4);
  }
  sVar1 = param_4;
  sVar2 = (param_4 >>> 0x10);
  if (param_2 < 0x10) {
    if (param_2 == 0xf) {
      GetUpdateRect(heap, heap.u32(0x005e916c), __addr_local_14, 0);
      FUN_00401120(heap, __addr_local_14);
      ValidateRect(heap, heap.u32(0x005e916c), 0x0);
      return 0x1;
    }
    pHVar4 = (param_2 - 1);
    switch (pHVar4) {
      case 0x0:
        break;
      default:
        /* goto switchD_004044fd_caseD_1 */ throw new Error("goto switchD_004044fd_caseD_1 not supported");
      case 0x2:
        heap.setU32(0x005f1cac, (sVar1) >>> 0);
        heap.setU32(0x005f1cb0, (sVar2) >>> 0);
        heap.setU32(0x005e9180, (1) >>> 0);
        pHVar4 = 0x0;
        break;
      case 0x4:
        heap.setU32(0x005f15c4, (sVar1) >>> 0);
        heap.setU32(0x005f1b34, (sVar2) >>> 0);
        heap.setU32(0x005e917c, (1) >>> 0);
        heap.setU32(0x005e9178, ((param_3 == 0x1)) >>> 0);
        pHVar4 = 0x0;
        break;
      case 0x5:
    }
  } else {
    if (param_2 < 0x15) {
      if (param_2 == 0x14) {
        return 0x1;
      }
      if (param_2 == 0x10) {
        heap.setU32(0x005e9188, (1) >>> 0);
        return 0x10;
      }
    } else {
      if (param_2 < 0x1d) {
      if (param_2 == 0x1c) {
        heap.setU32(0x005e9174, (param_3) >>> 0);
        if (param_3 == 0x0) {
          return 0x0;
        }
        FUN_00406fb5(heap);
        FUN_00407b0c(heap);
        pHVar4 = FUN_004015f0(heap, 0, 0, heap.u32(0x005f12ac), heap.u32(0x005f129c));
        return pHVar4;
      }
      if (param_2 == 0x16) {
        heap.setU32(0x005e918c, (1) >>> 0);
        FUN_00401200(heap);
        return 0x0;
      }
    } else {
      if (param_2 < 0x25) {
      if (param_2 == 0x24) {
        heap.setU32((param_4 + 0x18), (heap.u32(0x005f1a04)) >>> 0);
        heap.setU32((param_4 + 0x1c), (heap.u32(0x005f139c)) >>> 0);
        heap.setU32((param_4 + 0x20), (heap.u32(0x005f1fc0)) >>> 0);
        heap.setU32((param_4 + 0x24), (heap.u32(0x005f1b28)) >>> 0);
        return 0x0;
      }
      if (param_2 == 0x20) {
        switch (param_4 & 0xffff) {
          case 1:
            /* goto switchD_004041f1_caseD_1 */ throw new Error("goto switchD_004041f1_caseD_1 not supported");
          case 2:
          case 3:
          case 10:
          case 0xb:
          case 0xc:
          case 0xd:
          case 0xe:
          case 0xf:
          case 0x10:
          case 0x11:
            pHVar4 = DefWindowProcA(heap, param_1, 0x20, param_3, param_4);
            return pHVar4;
          default:
            pHVar4 = DefWindowProcA(heap, param_1, 0x20, param_3, param_4);
            return pHVar4;
        }
      }
    } else {
      if (param_2 < 0x101) {
      if (param_2 == 0x100) {
        FUN_00403337(heap, param_3);
        heap.setU32(0x005f1b30, (param_3) >>> 0);
        FUN_004033fa(heap, param_3);
        return 0x0;
      }
      if (param_2 == 0x7e) {
        heap.setU32(0x005f15a8, (param_4 & 0xffff) >>> 0);
        heap.setU32(0x005f15ac, (param_4 >>> 0x10) >>> 0);
        heap.setU32(0x005f15b0, (param_3) >>> 0);
        hdc = GetDC(heap, 0x0);
        if (hdc == 0x0) {
          heap.setU32(0x005f15b4, (0) >>> 0);
        } else {
          uVar3 = GetDeviceCaps(heap, hdc, 0x26);
          heap.setU32(0x005f15b4, (((uVar3 & 0x100) != 0)) >>> 0);
          ReleaseDC(heap, 0x0, hdc);
        }
        heap.setU32(0x005e9184, (1) >>> 0);
        return 0x0;
      }
    } else {
      if (param_2 < 0x114) {
      if (param_2 == 0x113) {
        if (param_3 == 0x3e8) {
          FlashWindow(heap, heap.u32(0x005e916c), 1);
        }
        return 0x0;
      }
      switch (param_2) {
        case 0x101:
          FUN_00403370(heap, param_3);
          heap.setU32(0x005f1a0c, (param_3) >>> 0);
          return 0x0;
        case 0x102:
          heap.setU32(0x005f1fdc, (param_3) >>> 0);
          heap.setU32((__addr_DAT_005f15e4 + heap.u32(0x005e91d8) * 8), (param_3) >>> 0);
          return 0x0;
        case 0x104:
          if (param_3 == 0x0) {
            return 0x0;
          }
          if (param_3 != 0x73) {
            if (param_3 != 0x79) {
              return 0x0;
            }
            FUN_00403337(heap, 0x79);
            heap.setU32(0x005f1b30, (param_3) >>> 0);
            FUN_004033fa(heap, 0x79);
            return 0x0;
          }
          pHVar4 = DefWindowProcA(heap, param_1, param_2, 0x73, param_4);
          return pHVar4;
        case 0x105:
          if (param_3 == 0x0) {
            return 0x0;
          }
          if (param_3 != 0x79) {
            pHVar4 = DefWindowProcA(heap, param_1, param_2, param_3, param_4);
            return pHVar4;
          }
          FUN_00403370(heap, 0x79);
          heap.setU32(0x005f1a0c, (param_3) >>> 0);
          return 0x0;
      }
    } else {
      if (param_2 < 0x234) {
      if (param_2 == 0x233) {
        heap.setU32(0x005f1fcc, (1) >>> 0);
        DragQueryFileA(heap, param_3, 0, __addr_DAT_005f1900, 0x104);
        return 0x0;
      }
      switch ((param_2 - 0x200)) {
        case 0x0:
          if (heap.u32(0x005ebe40) == 0) {
            return (param_2 - 0x200);
          }
          pHVar4 = sVar2;
          heap.setU32(0x005f1b20, (pHVar4 - heap.u32(0x005f1a14)) >>> 0);
          heap.setU32(0x005f14c4, (sVar1 - heap.u32(0x005f1a10)) >>> 0);
          heap.setU32(0x005f1a10, (sVar1) >>> 0);
          heap.setU32(0x005f1a14, (pHVar4) >>> 0);
          return pHVar4;
        case 0x1:
          heap.setU32(0x005e9170, (1) >>> 0);
          heap.setU32(0x005f1b80, (1) >>> 0);
          heap.setU32(0x005f1cb4, (sVar1) >>> 0);
          heap.setU32(0x005f1cb8, (sVar2) >>> 0);
          SetCapture(heap, heap.u32(0x005e916c));
          heap.setU32(0x005e91c4, (1) >>> 0);
          FUN_00403454(heap, 1);
          return 0x0;
        case 0x2:
          heap.setU32(0x005e9170, (1) >>> 0);
          heap.setU32(0x005f1b80, (0) >>> 0);
          heap.setU32(0x005f1cb4, (sVar1) >>> 0);
          heap.setU32(0x005f1cb8, (sVar2) >>> 0);
          ReleaseCapture(heap);
          heap.setU32(0x005e91c4, (0) >>> 0);
          FUN_00403454(heap, 3);
          return 0x0;
        case 0x4:
          heap.setU32(0x005e9170, (1) >>> 0);
          heap.setU32(0x005f13a0, (1) >>> 0);
          heap.setU32(0x005f1cb4, (sVar1) >>> 0);
          heap.setU32(0x005f1cb8, (sVar2) >>> 0);
          SetCapture(heap, heap.u32(0x005e916c));
          heap.setU32(0x005e91c4, (1) >>> 0);
          FUN_00403454(heap, 2);
          return 0x0;
        case 0x5:
          heap.setU32(0x005e9170, (1) >>> 0);
          heap.setU32(0x005f13a0, (0) >>> 0);
          heap.setU32(0x005f1cb4, (sVar1) >>> 0);
          heap.setU32(0x005f1cb8, (sVar2) >>> 0);
          ReleaseCapture(heap);
          heap.setU32(0x005e91c4, (0) >>> 0);
          FUN_00403454(heap, 4);
          return 0x0;
      }
    } else {
      if (param_2 == 0x30f) {
        LAB_00404234: if (heap.u32(0x005e91cc) != 0x0) {
          (heap.u32(heap.u32(0x005e91cc)))();
        }
        FUN_00401120(heap, 0);
        return 0x1;
      }
      if (param_2 == 0x311) {
        if (param_3 == param_1) {
          return param_1;
        }
        /* goto LAB_00404234 */ throw new Error("goto LAB_00404234 not supported");
      }
      if (param_2 == 0x400) {
        switch (param_4) {
          case 0x201:
            heap.setU32(0x005e9400, (1) >>> 0);
            heap.setU32(0x005f13a8, (1) >>> 0);
            break;
          case 0x203:
            heap.setU32(0x005e9400, (1) >>> 0);
            heap.setU32(0x005f13a8, (5) >>> 0);
            break;
          case 0x204:
            heap.setU32(0x005e9400, (1) >>> 0);
            heap.setU32(0x005f13a8, (2) >>> 0);
            break;
          case 0x206:
            heap.setU32(0x005e9400, (1) >>> 0);
            heap.setU32(0x005f13a8, (6) >>> 0);
        }
        return 0x0;
      }
    }
    }
    }
    }
    }
    }
    switchD_004044fd_caseD_1: pHVar4 = DefWindowProcA(heap, param_1, param_2, param_3, param_4);
  }
  return pHVar4;
  switchD_004041f1_caseD_1: if (heap.u32(0x005ebe40) == 0) {
    SetCursor(heap, 0x0);
  } else {
    SetCursor(heap, heap.u32(0x005e91c8));
  }
  return 0x1;
} finally {
    heap.freeFrame(12);
  }
}
