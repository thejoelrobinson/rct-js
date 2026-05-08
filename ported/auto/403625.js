// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/403625.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { EndDialog, GetDlgItem, GetDlgItemTextA, SendDlgItemMessageA, SendMessageA, SetDlgItemTextA, SetFocus, SetWindowTextA } from "../../runtime/win32.js";
export function FUN_00403625(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_005e91f0 = __sp + 0;
  const __addr_DAT_005e92f8 = __sp + 4;
  try {
  let sVar1 = 0;
  let hWnd = 0;
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
    }
    hWnd = GetDlgItem(heap, param_1, 1000);
    SetFocus(heap, hWnd);
  } else {
    if (param_2 == 0x111) {
    if (param_3 == 1) {
      GetDlgItemTextA(heap, param_1, 1000, heap.u32(0x005f1390), 0x104);
    } else {
      if (param_3 != 2) {
      return 0;
    }
    }
    EndDialog(heap, param_1, param_3);
  }
  }
  return 0;
} finally {
    heap.freeFrame(8);
  }
}
