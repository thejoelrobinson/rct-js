// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/404752.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetComputerNameA, GetDC, GetDeviceCaps, GetSystemInfo, GetSystemMetrics, GetUserNameA, GetVersionExA, GlobalMemoryStatus, ReleaseDC } from "../../runtime/win32.js";
import { FUN_00402e3d } from "./402e3d.js";
export function FUN_00404752(heap) {
  const __sp = heap.allocFrame(276);
  const __addr_local_a0 = __sp + 0;
  const __addr_local_e4 = __sp + 128;
  const __addr_DAT_005f1508 = __sp + 256;
  const __addr_local_c = __sp + 260;
  const __addr_DAT_005f1558 = __sp + 264;
  const __addr_local_c4 = __sp + 268;
  try {
  let BVar1 = 0;
  let uVar2 = 0;
  let local_b0 = 0;
  let local_a4 = 0;
  let local_a2 = 0;
  let local_8 = 0;
  heap.u32(__addr_local_a0) = 0x94;
  BVar1 = GetVersionExA(heap, __addr_local_a0);
  if (BVar1 == 0) {
    heap.setU32(0x005f14e0, (0xffffffff) >>> 0);
    heap.setU32(0x005f14e4, (0) >>> 0);
    heap.setU32(0x005f14e8, (0) >>> 0);
    heap.setU32(0x005f14ec, (0) >>> 0);
  } else {
    heap.setU32(0x005f14e0, (heap.u32((__addr_local_a0 + 16))) >>> 0);
    heap.setU32(0x005f14e4, (heap.u32((__addr_local_a0 + 4))) >>> 0);
    heap.setU32(0x005f14e8, (heap.u32((__addr_local_a0 + 8))) >>> 0);
    heap.setU32(0x005f14ec, (heap.u32((__addr_local_a0 + 12))) >>> 0);
  }
  GetSystemInfo(heap, heap.u32(__addr_local_c4 + (0) * 4));
  heap.setU32(0x005f14f0, (heap.u16(heap.u32(heap.u32(__addr_local_c4 + (0) * 4)))) >>> 0);
  heap.setU32(0x005f14f2, (local_a4) >>> 0);
  heap.setU32(0x005f14f4, (local_a2) >>> 0);
  heap.setU32(0x005f14f8, (local_b0) >>> 0);
  GlobalMemoryStatus(heap, __addr_local_e4);
  heap.setU32(0x005f14fc, (heap.u32((__addr_local_e4 + 8))) >>> 0);
  heap.setU32(0x005f1500, (heap.u32((__addr_local_e4 + 16))) >>> 0);
  heap.setU32(0x005f1504, (heap.u32((__addr_local_e4 + 24))) >>> 0);
  heap.setU32(__addr_local_c, (0x50) >>> 0);
  GetUserNameA(heap, __addr_DAT_005f1508, __addr_local_c);
  heap.setU32(__addr_local_c, (0x50) >>> 0);
  GetComputerNameA(heap, __addr_DAT_005f1558, __addr_local_c);
  heap.setU32(0x005f15a8, (GetSystemMetrics(heap, 0)) >>> 0);
  heap.setU32(0x005f15ac, (GetSystemMetrics(heap, 1)) >>> 0);
  local_8 = GetDC(heap, 0x0);
  if (local_8 == 0x0) {
    heap.setU32(0x005f15b0, (0) >>> 0);
    heap.setU32(0x005f15b4, (0) >>> 0);
  } else {
    heap.setU32(0x005f15b0, (GetDeviceCaps(heap, local_8, 0xc)) >>> 0);
    uVar2 = GetDeviceCaps(heap, local_8, 0x26);
    heap.setU32(0x005f15b4, (((uVar2 & 0x100) != 0)) >>> 0);
    ReleaseDC(heap, 0x0, local_8);
  }
  heap.setU32(0x005f15bc, ((7 < heap.u32(0x005f15b0))) >>> 0);
  if ((heap.u32(0x005f14e4) < 4) || (heap.u32(0x005f15b0) < 4)) {
    heap.setU32(0x005f15b8, (0) >>> 0);
  } else {
    heap.setU32(0x005f15b8, (1) >>> 0);
  }
  heap.setU32(0x005f15c0, (FUN_00402e3d(heap)) >>> 0);
  return;
} finally {
    heap.freeFrame(276);
  }
}
