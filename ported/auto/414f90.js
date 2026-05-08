// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414f90.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetFileType, GetStartupInfoA, GetStdHandle, SetHandleCount } from "../../runtime/win32.js";
import { FUN_004133c0 } from "./4133c0.js";
export function FUN_00414f90(heap) {
  const __sp = heap.allocFrame(136);
  const __addr_local_44 = __sp + 0;
  const __addr_DAT_005f3e64 = __sp + 128;
  const __addr_DAT_005f3e60 = __sp + 132;
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
  puVar2 = FUN_004133c0(heap, 0x100);
  if (puVar2 == 0x0) {
    __amsg_exit(0x1b);
  }
  heap.setU32(0x005f3f60, (0x20) >>> 0);
  heap.setU32(0x005f3e60, (puVar2) >>> 0);
  if (puVar2 < puVar2 + 0x40) {
    do {
      heap.setU32((puVar2 + 1), (0) >>> 0);
      heap.setU32(puVar2, (0xffffffff) >>> 0);
      heap.setU32((puVar2 + 5), (10) >>> 0);
      puVar2 = puVar2 + 2;
    } while (puVar2 < heap.u32(__addr_DAT_005f3e60) + 0x40);
  }
  GetStartupInfoA(heap, __addr_local_44);
  if ((heap.u32((__addr_local_44 + 60)) != 0) && (heap.u32((__addr_local_44 + 64)) != 0x0)) {
    local_48 = heap.u32(heap.u32((__addr_local_44 + 64)));
    pUVar8 = (heap.u32((__addr_local_44 + 64)) + 4);
    pbVar5 = (pUVar8 + local_48);
    if (0x7ff < local_48) {
      local_48 = 0x800;
    }
    if (heap.u32(0x005f3f60) < local_48) {
      piVar6 = __addr_DAT_005f3e64;
      do {
        puVar2 = FUN_004133c0(heap, 0x100);
        if (puVar2 == 0x0) {
          local_48 = heap.u32(0x005f3f60);
          break;
        }
        heap.setU32(piVar6, (puVar2) >>> 0);
        heap.setU32(0x005f3f60, (heap.u32(0x005f3f60) + 0x20) >>> 0);
        if (puVar2 < puVar2 + 0x40) {
          do {
            heap.setU32((puVar2 + 1), (0) >>> 0);
            heap.setU32(puVar2, (0xffffffff) >>> 0);
            heap.setU32((puVar2 + 5), (10) >>> 0);
            puVar2 = puVar2 + 2;
          } while (puVar2 < (heap.u32(piVar6) + 0x100));
        }
        piVar6 = piVar6 + 1;
      } while (heap.u32(0x005f3f60) < local_48);
    }
    uVar7 = 0;
    if (0 < local_48) {
      do {
        if (((heap.u32(pbVar5) != 0xffffffff) && ((heap.u32(pUVar8) & 1) != 0)) && (((heap.u32(pUVar8) & 8) != 0 || (DVar3 = GetFileType(heap, heap.u32(pbVar5)), DVar3 != 0)))) {
          iVar4 = heap.u32((__addr_DAT_005f3e60) + (uVar7 >>> 5) * 4);
          heap.setU32((iVar4 + (uVar7 & 0x1f) * 8), (heap.u32(pbVar5)) >>> 0);
          heap.setU32((iVar4 + (uVar7 & 0x1f) * 8 + 4), (heap.u32(pUVar8)) >>> 0);
        }
        uVar7 = uVar7 + 1;
        pUVar8 = (pUVar8 + 1);
        pbVar5 = pbVar5 + 4;
      } while (uVar7 < local_48);
    }
  }
  iVar4 = 0;
  do {
    puVar2 = heap.u32(__addr_DAT_005f3e60) + iVar4 * 2;
    if (heap.u32(heap.u32(__addr_DAT_005f3e60) + (iVar4 * 2) * 4) == -1) {
      heap.setU32((puVar2 + 1), (0x81) >>> 0);
      if (iVar4 == 0) {
        DVar3 = 0xfffffff6;
      } else {
        DVar3 = 0xfffffff5 - (iVar4 != 1);
      }
      hFile = GetStdHandle(heap, DVar3);
      if ((hFile == 0xffffffff) || (DVar3 = GetFileType(heap, hFile), DVar3 == 0)) {
        bVar1 = heap.u32((puVar2 + 1)) | 0x40;
        /* goto LAB_0041516b */ throw new Error("goto LAB_0041516b not supported");
      }
      heap.setU32(puVar2, (hFile) >>> 0);
      if ((DVar3 & 0xff) == 2) {
        bVar1 = heap.u32((puVar2 + 1)) | 0x40;
        /* goto LAB_0041516b */ throw new Error("goto LAB_0041516b not supported");
      }
      if ((DVar3 & 0xff) == 3) {
        bVar1 = heap.u32((puVar2 + 1)) | 8;
        /* goto LAB_0041516b */ throw new Error("goto LAB_0041516b not supported");
      }
    } else {
      bVar1 = heap.u32((puVar2 + 1)) | 0x80;
      LAB_0041516b: heap.setU32((puVar2 + 1), (bVar1) >>> 0);
    }
    iVar4 = iVar4 + 1;
    if (2 < iVar4) {
      SetHandleCount(heap, heap.u32(0x005f3f60));
      return;
    }
  } while (true);
} finally {
    heap.freeFrame(136);
  }
}
