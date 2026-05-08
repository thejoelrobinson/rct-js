// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/417860.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetStringTypeA, GetStringTypeW, MultiByteToWideChar } from "../runtime/win32.js";
import { FUN_00413470 } from "./413470.js";
import { FUN_00413830 } from "./413830.js";
export function FUN_00417860(heap, param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  const __sp = heap.allocFrame(4);
  const __addr_local_2 = __sp + 0;
  try {
  let BVar1 = 0;
  let iVar2 = 0;
  let lpWideCharStr = 0;
  lpWideCharStr = 0x0;
  if (heap.u32(0x005f02ac) == 0) {
    BVar1 = GetStringTypeW(heap, 1, L"", 1, __addr_local_2);
    if (BVar1 == 0) {
      BVar1 = GetStringTypeA(heap, 0, 1, "", 1, __addr_local_2);
      if (BVar1 == 0) {
        return 0;
      }
      heap.setU32(0x005f02ac, (2) >>> 0);
    } else {
      heap.setU32(0x005f02ac, (1) >>> 0);
    }
  }
  if (heap.u32(0x005f02ac) == 2) {
    if (param_6 == 0) {
      param_6 = heap.u32(0x005f0270);
    }
    BVar1 = GetStringTypeA(heap, param_6, param_1, param_2, param_3, param_4);
    return BVar1;
  }
  param_6 = heap.u32(0x005f02ac);
  if (heap.u32(0x005f02ac) == 1) {
    param_6 = 0;
    if (param_5 == 0) {
      param_5 = heap.u32(0x005f0280);
    }
    iVar2 = MultiByteToWideChar(heap, param_5, (-(param_7 != 0) & 8) + 1, param_2, param_3, 0x0, 0);
    if (iVar2 != 0) {
      lpWideCharStr = FUN_00413830(heap, 2, iVar2);
      if (lpWideCharStr != 0x0) {
        iVar2 = MultiByteToWideChar(heap, param_5, 1, param_2, param_3, lpWideCharStr, iVar2);
        if (iVar2 != 0) {
          BVar1 = GetStringTypeW(heap, param_1, lpWideCharStr, iVar2, param_4);
          FUN_00413470(heap, lpWideCharStr);
          return BVar1;
        }
      }
    }
    FUN_00413470(heap, lpWideCharStr);
  }
  return param_6;
} finally {
    heap.freeFrame(4);
  }
}
