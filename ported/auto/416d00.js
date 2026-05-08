// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/416d00.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { LCMapStringA, LCMapStringW, MultiByteToWideChar, WideCharToMultiByte } from "../runtime/win32.js";
import { FUN_004133c0 } from "./4133c0.js";
import { FUN_00413470 } from "./413470.js";
import { FUN_00416f30 } from "./416f30.js";
export function FUN_00416d00(heap, param_1, param_2, param_3, param_4, param_5, param_6, param_7, param_8) {
  let iVar1 = 0;
  let iVar2 = 0;
  let lpWideCharStr = 0;
  if (heap.u32(0x005f0264) == 0) {
    iVar1 = LCMapStringW(heap, 0, 0x100, L"", 1, 0x0, 0);
    if (iVar1 == 0) {
      iVar1 = LCMapStringA(heap, 0, 0x100, "", 1, 0x0, 0);
      if (iVar1 == 0) {
        return 0;
      }
      heap.setU32(0x005f0264, (2) >>> 0);
    } else {
      heap.setU32(0x005f0264, (1) >>> 0);
    }
  }
  iVar1 = param_4;
  if (0 < param_4) {
    iVar1 = FUN_00416f30(heap, param_3, param_4);
  }
  if (heap.u32(0x005f0264) == 2) {
    iVar1 = LCMapStringA(heap, param_1, param_2, param_3, iVar1, param_5, param_6);
    return iVar1;
  }
  if (heap.u32(0x005f0264) != 1) {
    return heap.u32(0x005f0264);
  }
  param_4 = 0x0;
  if (param_7 == 0) {
    param_7 = heap.u32(0x005f0280);
  }
  iVar2 = MultiByteToWideChar(heap, param_7, (-(param_8 != 0) & 8) + 1, param_3, iVar1, 0x0, 0);
  if (iVar2 == 0) {
    return 0;
  }
  lpWideCharStr = FUN_004133c0(heap, iVar2 * 2);
  if (lpWideCharStr == 0x0) {
    return 0;
  }
  iVar1 = MultiByteToWideChar(heap, param_7, 1, param_3, iVar1, lpWideCharStr, iVar2);
  if ((iVar1 != 0) && (iVar1 = LCMapStringW(heap, param_1, param_2, lpWideCharStr, iVar2, 0x0, 0), iVar1 != 0)) {
    if ((param_2 & 0x400) == 0) {
      param_4 = FUN_004133c0(heap, iVar1 * 2);
      if ((param_4 == 0x0) || (iVar2 = LCMapStringW(heap, param_1, param_2, lpWideCharStr, iVar2, param_4, iVar1), iVar2 == 0)) {
        /* goto LAB_00416f08 */ throw new Error("goto LAB_00416f08 not supported");
      }
      if (param_6 == 0) {
        iVar1 = WideCharToMultiByte(heap, param_7, 0x220, param_4, iVar1, 0x0, 0, 0x0, 0x0);
        iVar2 = iVar1;
      } else {
        iVar1 = WideCharToMultiByte(heap, param_7, 0x220, param_4, iVar1, param_5, param_6, 0x0, 0x0);
        iVar2 = iVar1;
      }
    } else {
      if (param_6 == 0) {
        /* goto LAB_00416e6f */ throw new Error("goto LAB_00416e6f not supported");
      }
      if (param_6 < iVar1) {
        /* goto LAB_00416f08 */ throw new Error("goto LAB_00416f08 not supported");
      }
      iVar2 = LCMapStringW(heap, param_1, param_2, lpWideCharStr, iVar2, param_5, param_6);
    }
    if (iVar2 != 0) {
      LAB_00416e6f: FUN_00413470(heap, lpWideCharStr);
      FUN_00413470(heap, param_4);
      return iVar1;
    }
  }
  LAB_00416f08: FUN_00413470(heap, lpWideCharStr);
  FUN_00413470(heap, param_4);
  return 0;
}
