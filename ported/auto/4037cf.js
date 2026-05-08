// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4037cf.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { DestroyWindow, GetDlgItem, GetDlgItemTextA, SendDlgItemMessageA, SendMessageA, SetDlgItemTextA, SetFocus, SetWindowTextA } from "../../runtime/win32.js";
import { FUN_00401120 } from "./401120.js";
export function FUN_004037cf(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_005e91f0 = __sp + 0;
  const __addr_DAT_005e92f8 = __sp + 4;
  try {
  let sVar1 = 0;
  let hWnd = 0;
  let uVar2 = 0;
  if (param_2 == 0x110) {
    if (heap.u32(0x005e91ec) != 0) {
      SendMessageA(heap, param_1, 0x30, heap.u32(0x005e91ec), 1);
      SendDlgItemMessageA(heap, param_1, 0x3ea, 0x30, heap.u32(0x005e91ec), 1);
      SendDlgItemMessageA(heap, param_1, 1000, 0x30, heap.u32(0x005e91ec), 1);
      SendDlgItemMessageA(heap, param_1, 1, 0x30, heap.u32(0x005e91ec), 1);
      SendDlgItemMessageA(heap, param_1, 2, 0x30, heap.u32(0x005e91ec), 1);
    }
    SetWindowTextA(heap, param_1, heap.u32(0x005f1fd4));
    SetDlgItemTextA(heap, param_1, 0x3ea, heap.u32(0x005f1fc8));
    SetDlgItemTextA(heap, param_1, 1, __addr_DAT_005e91f0);
    SetDlgItemTextA(heap, param_1, 2, __addr_DAT_005e92f8);
    sVar1 = _strlen(heap.u32(0x005f1390));
    if (sVar1 != 0) {
      SetDlgItemTextA(heap, param_1, 1000, heap.u32(0x005f1390));
      SendDlgItemMessageA(heap, param_1, 1000, 0xb1, 0, -1);
    }
    hWnd = GetDlgItem(heap, param_1, 1000);
    SetFocus(heap, hWnd);
    return 0;
  }
  if (param_2 == 0x111) {
    if (param_3 == 1) {
      GetDlgItemTextA(heap, param_1, 1000, heap.u32(0x005f1390), 0x104);
    } else {
      if (param_3 != 2) {
      /* goto LAB_004039ae */ throw new Error("goto LAB_004039ae not supported");
    }
    }
    heap.u32(heap.u32(0x005f1ca8)) = param_3;
    heap.u32(heap.u32(0x005f13b0)) = 1;
    DestroyWindow(heap, param_1);
    heap.setU32(0x005e91e0, (0) >>> 0);
    FUN_00401120(heap, 0);
    uVar2 = 1;
  } else {
    LAB_004039ae: uVar2 = 0;
  }
  return uVar2;
} finally {
    heap.freeFrame(8);
  }
}
