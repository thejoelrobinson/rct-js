// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414f90.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetFileType, GetStartupInfoA, GetStdHandle, SetHandleCount } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004133c0 } from "./4133c0.js";
export function FUN_00414f90(heap) {
  const __sp = heap.allocFrame(128);
  const __addr_local_44 = __sp + 0;
  try {
  let bVar1 = 0;
  let puVar2 = 0;
  let DVar3 = 0;
  let hFile = 0;
  let iVar4 = 0;
  let pbVar5 = 0;
  let piVar6 = 0;
  let uVar7 = 0;
  let pUVar8 = 0;
  let local_48 = 0;
  puVar2 = (((regs.eax = FUN_004133c0(heap, 0x100))) >>> 0);
  if (puVar2 == 0x0) {
    __amsg_exit(0x1b);
  }
  heap.setU32(0x005f3f60, (0x20) >>> 0);
  heap.setU32(0x005f3e60, (puVar2) >>> 0);
  if (puVar2 < puVar2 + ((0x40) * 4)) {
    do {
      heap.setU8((puVar2 + ((1) * 4)), (0) & 0xff);
      heap.setU32(puVar2, (0xffffffff) & 0xffffffff);
      heap.setU8((((puVar2) >>> 0) + 5), (10) & 0xff);
      puVar2 = ((puVar2 + ((2) * 4)) >>> 0);
    } while (puVar2 < heap.u32(0x005f3e60) + 0x40);
  }
  GetStartupInfoA(heap, __addr_local_44);
  if ((heap.u32((__addr_local_44 + 60)) != 0) && (heap.u32((__addr_local_44 + 64)) != 0x0)) {
    local_48 = ((heap.i32(heap.u32((__addr_local_44 + 64)))) >>> 0);
    pUVar8 = (((((heap.u32((__addr_local_44 + 64))) >>> 0) + 4)) >>> 0);
    pbVar5 = (((((pUVar8) >>> 0) + local_48)) >>> 0);
    if (0x7ff < ((local_48) >>> 0)) {
      local_48 = ((0x800) >>> 0);
    }
    if (((heap.u32(0x005f3f60)) >>> 0) < ((local_48) >>> 0)) {
      piVar6 = ((0x005f3e64) >>> 0);
      do {
        puVar2 = (((regs.eax = FUN_004133c0(heap, 0x100))) >>> 0);
        if (puVar2 == 0x0) {
          local_48 = ((heap.u32(0x005f3f60)) >>> 0);
          break;
        }
        heap.setU32(piVar6, (((puVar2) >>> 0)) & 0xffffffff);
        heap.setU32(0x005f3f60, (heap.u32(0x005f3f60) + 0x20) >>> 0);
        if (puVar2 < puVar2 + ((0x40) * 4)) {
          do {
            heap.setU8((puVar2 + ((1) * 4)), (0) & 0xff);
            heap.setU32(puVar2, (0xffffffff) & 0xffffffff);
            heap.setU8((((puVar2) >>> 0) + 5), (10) & 0xff);
            puVar2 = ((puVar2 + ((2) * 4)) >>> 0);
          } while (puVar2 < (heap.i32(piVar6) + 0x100));
        }
        piVar6 = ((piVar6 + ((1) * 4)) >>> 0);
      } while (((heap.u32(0x005f3f60)) >>> 0) < ((local_48) >>> 0));
    }
    uVar7 = ((0) >>> 0);
    if (0 < ((local_48) >>> 0)) {
      do {
        if (((heap.u32(pbVar5) != 0xffffffff) && ((heap.i32(pUVar8) & 1) != 0)) && (((heap.i32(pUVar8) & 8) != 0 || (DVar3 = ((GetFileType(heap, heap.u32(pbVar5))) >>> 0), DVar3 != 0)))) {
          iVar4 = ((((heap.u32((0x005f3e60) + (((uVar7) >>> 0) >>> 5) * 4)) >>> 0)) >>> 0);
          heap.setU32((iVar4 + (uVar7 & 0x1f) * 8), (heap.u32(pbVar5)) & 0xffffffff);
          heap.setU8((iVar4 + (uVar7 & 0x1f) * 8 + 4), (heap.u8(pUVar8)) & 0xff);
        }
        uVar7 = ((uVar7 + 1) >>> 0);
        pUVar8 = (((((pUVar8) >>> 0) + 1)) >>> 0);
        pbVar5 = ((pbVar5 + 4) >>> 0);
      } while (((uVar7) >>> 0) < ((local_48) >>> 0));
    }
  }
  iVar4 = ((0) >>> 0);
  do {
    puVar2 = ((heap.u32(0x005f3e60) + iVar4 * 2) >>> 0);
    if ((heap.u32(heap.u32(0x005f3e60) + (iVar4 * 2) * 4) | 0) == -1) {
      heap.setU8((puVar2 + ((1) * 4)), (0x81) & 0xff);
      if (iVar4 == 0) {
        DVar3 = ((0xfffffff6) >>> 0);
      } else {
        DVar3 = ((0xfffffff5 - (iVar4 != 1)) >>> 0);
      }
      hFile = ((GetStdHandle(heap, DVar3)) >>> 0);
      if ((hFile == 0xffffffff) || (DVar3 = ((GetFileType(heap, hFile)) >>> 0), DVar3 == 0)) {
        bVar1 = ((heap.u8((puVar2 + ((1) * 4))) | 0x40) & 0xff);
        /* goto LAB_0041516b — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00414f90/LAB_0041516b"); return 0;
      }
      heap.setU32(puVar2, (hFile) & 0xffffffff);
      if ((DVar3 & 0xff) == 2) {
        bVar1 = ((heap.u8((puVar2 + ((1) * 4))) | 0x40) & 0xff);
        /* goto LAB_0041516b — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00414f90/LAB_0041516b"); return 0;
      }
      if ((DVar3 & 0xff) == 3) {
        bVar1 = ((heap.u8((puVar2 + ((1) * 4))) | 8) & 0xff);
        /* goto LAB_0041516b — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00414f90/LAB_0041516b"); return 0;
      }
    } else {
      bVar1 = ((heap.u8((puVar2 + ((1) * 4))) | 0x80) & 0xff);
      LAB_0041516b: heap.setU8((puVar2 + ((1) * 4)), (bVar1) & 0xff);
    }
    iVar4 = ((iVar4 + 1) >>> 0);
    if (2 < iVar4) {
      return SetHandleCount(heap, heap.u32(0x005f3f60));
    }
  } while (true);
} finally {
    heap.freeFrame(128);
  }
}
