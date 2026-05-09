// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44c464.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT21, CONCAT22, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00423677 } from "./423677.js";
import { FUN_0044bacd } from "./44bacd.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e6a83 } from "./5e6a83.js";
export function FUN_0044c464(heap) {
  let puVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  let extraout_CX = 0;
  let extraout_ECX = 0;
  let extraout_DX = 0;
  let extraout_EDX = 0;
  let iVar4 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar6 = 0;
  let iVar7 = 0;
  let iVar5 = 0;
  LAB_0044c557: {
  if (heap.i16((unaff_ESI + 0x164)) != 0) {
    return;
  }
  uVar6 = ((heap.u32((unaff_ESI + 0x30))) >>> 0);
  iVar7 = ((uVar6 * 0x260) >>> 0);
  bVar2 = ((((heap.u16((unaff_ESI + 0x15a))) << 24 >> 24) - 1) & 0xff);
  if (-1 < (((bVar2) << 24 >> 24) | 0)) {
    if (bVar2 < heap.u32(((0x00887498) & 0xff) + (iVar7) * 4)) {
      if ((heap.u32((0x00887422) + (uVar6 * 0x130) * 4) & 1) != 0) {
        uVar6 = ((heap.u16((0x0088747e + ((CONCAT11((((heap.u16((unaff_ESI + 0x15a)) >>> 8)) << 24 >> 24), bVar2)) >>> 0) * 2 + iVar7)) | 0xc0000000) >>> 0);
        iVar7 = ((((heap.u8(0x00991f88)) >>> 0) << 8) >>> 0);
        break LAB_0044c557;
      }
      heap.setU16((unaff_ESI + 0x15a), (0) & 0xffff);
    } else {
      bVar2 = ((bVar2 - heap.u32((0x00887498) + (iVar7) * 4)) & 0xff);
      if (bVar2 < heap.u32(((0x00887497) & 0xff) + (iVar7) * 4)) {
        iVar4 = ((-1) >>> 0);
        do {
          do {
            iVar5 = ((iVar4) >>> 0);
            iVar4 = ((iVar5 + 1) >>> 0);
          } while ((heap.u32((0x0088744a) + (uVar6 * 0x130 + iVar4) * 4) | 0) == -1);
          bVar2 = ((bVar2 - 1) & 0xff);
        } while (-1 < (((bVar2) << 24 >> 24) | 0));
        uVar6 = ((CONCAT22((heap.u32(((0x0088744a) & 0xffff) + (uVar6 * 0x130 + iVar4) * 4) >>> 8) << 5, (heap.u32((0x0088744a) + (uVar6 * 0x130 + iVar4) * 4) & 0xff) << 5) | 0x40000000) >>> 0);
        iVar7 = ((((CONCAT21(((((heap.u32(((0x00887453) >>> 0) + (iVar7 + iVar5) * 4) << 0x12) >>> 0x10)) << 16 >> 16), heap.u8(0x00991f88))) >>> 0) << 8) >>> 0);
        break LAB_0044c557;
      }
      heap.setU16((unaff_ESI + 0x15a), (0) & 0xffff);
    }
  }
  uVar3 = (((regs.eax = FUN_00423677(heap))) & 0xffff);
  uVar6 = ((CONCAT22(extraout_CX, uVar3) | 0x40000000) >>> 0);
  iVar7 = ((CONCAT22(extraout_DX, CONCAT11(heap.u8(0x00991f88), 1))) >>> 0);
  }
  if (heap.i32((unaff_ESI + 8)) == 0) {
    uVar3 = ((0) & 0xffff);
    if (heap.u8(0x005f8d5c) == 1) {
      uVar3 = ((0x100) & 0xffff);
    }
  } else {
    if ((uVar6 == heap.u32((unaff_ESI + 0x15c))) && (iVar7 == heap.i32((unaff_ESI + 0x160)))) {
      return;
    }
    LOCK();
    puVar1 = ((heap.u32((unaff_ESI + 8))) >>> 0);
    heap.setU32((unaff_ESI + 8), (0) & 0xffffffff);
    UNLOCK();
    heap.setU32(puVar1, (0) & 0xffffffff);
    uVar3 = (((regs.eax = FUN_005e6a83(heap))) & 0xffff);
    iVar7 = ((extraout_ECX) >>> 0);
    uVar6 = ((extraout_EDX) >>> 0);
  }
  heap.setU32((unaff_ESI + 0x15c), (uVar6) & 0xffffffff);
  heap.setI32((unaff_ESI + 0x160), (iVar7) & 0xffffffff);
  (regs.eax = FUN_0044bacd(heap));
  if (heap.i32((unaff_ESI + 8)) != 0) {
    heap.setU16((heap.i32((unaff_ESI + 8)) + 0x12), (uVar3) & 0xffff);
    (regs.eax = FUN_005e43de(heap));
  }
  return;
}
