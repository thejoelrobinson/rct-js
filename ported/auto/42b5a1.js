// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42b5a1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042f3a2 } from "./42f3a2.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e68e2 } from "./5e68e2.js";
export function FUN_0042b5a1(heap) {
  let puVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let in_AX = regs.eax & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  let bVar4 = 0;
  if (in_AX == 0xffff) {
    return;
  }
  bVar4 = ((false) & 0xff);
  if (in_AX == 0) {
    (regs.eax = FUN_005e68e2(heap));
    if (!bVar4) {
      puVar1 = (((heap.i32((unaff_ESI + 8)) + 0x12)) >>> 0);
      heap.setU32(puVar1, (heap.u16(puVar1) ^ 1) & 0xffffffff);
      (regs.eax = FUN_005e43de(heap));
    }
    return;
  }
  bVar4 = ((in_AX < 8) & 0xff);
  if (in_AX == 8) {
    (regs.eax = FUN_005e68e2(heap));
    if (!bVar4) {
      iVar3 = ((heap.i32((unaff_ESI + 8))) >>> 0);
      (regs.eax = FUN_005e43de(heap));
      heap.setU8(0x005f8d5c, (0) & 0xff);
      puVar1 = (((iVar3 + 0x12)) >>> 0);
      uVar2 = ((heap.u16(puVar1)) & 0xffff);
      heap.setU32(puVar1, (heap.u16(puVar1) ^ 0x100) & 0xffffffff);
      if ((uVar2 >>> 8 & 1) == 0) {
        heap.setU8(0x005f8d5c, (1) & 0xff);
      }
      (regs.eax = FUN_0042f3a2(heap));
    }
    return;
  }
  bVar4 = ((in_AX < 3) & 0xff);
  if (in_AX == 3) {
    (regs.eax = FUN_005e68e2(heap));
    if (!bVar4) {
      puVar1 = (((heap.i32((unaff_ESI + 8)) + 0x12)) >>> 0);
      heap.setU32(puVar1, (heap.u16(puVar1) ^ 2) & 0xffffffff);
      (regs.eax = FUN_005e43de(heap));
    }
    return;
  }
  bVar4 = ((in_AX < 4) & 0xff);
  if (in_AX == 4) {
    (regs.eax = FUN_005e68e2(heap));
    if (!bVar4) {
      puVar1 = (((heap.i32((unaff_ESI + 8)) + 0x12)) >>> 0);
      heap.setU32(puVar1, (heap.u16(puVar1) ^ 4) & 0xffffffff);
      (regs.eax = FUN_005e43de(heap));
    }
    return;
  }
  bVar4 = ((in_AX < 5) & 0xff);
  if (in_AX == 5) {
    (regs.eax = FUN_005e68e2(heap));
    if (!bVar4) {
      puVar1 = (((heap.i32((unaff_ESI + 8)) + 0x12)) >>> 0);
      heap.setU32(puVar1, (heap.u16(puVar1) ^ 8) & 0xffffffff);
      (regs.eax = FUN_005e43de(heap));
    }
    return;
  }
  bVar4 = ((in_AX < 6) & 0xff);
  if (in_AX == 6) {
    (regs.eax = FUN_005e68e2(heap));
    if (!bVar4) {
      puVar1 = (((heap.i32((unaff_ESI + 8)) + 0x12)) >>> 0);
      heap.setU32(puVar1, (heap.u16(puVar1) ^ 0x1000) & 0xffffffff);
      (regs.eax = FUN_005e43de(heap));
    }
    return;
  }
  bVar4 = ((in_AX < 9) & 0xff);
  if (in_AX != 9) {
    bVar4 = ((in_AX < 10) & 0xff);
    if (in_AX == 10) {
      (regs.eax = FUN_005e68e2(heap));
      if (!bVar4) {
        puVar1 = (((heap.i32((unaff_ESI + 8)) + 0x12)) >>> 0);
        heap.setU32(puVar1, (heap.u16(puVar1) ^ 0x20) & 0xffffffff);
        (regs.eax = FUN_005e43de(heap));
      }
      return;
    }
    bVar4 = ((in_AX < 0xb) & 0xff);
    if (in_AX != 0xb) {
      bVar4 = ((in_AX == 0) & 0xff);
      if (in_AX != 1) {
        return;
      }
      (regs.eax = FUN_005e68e2(heap));
      if (!bVar4) {
        puVar1 = (((heap.i32((unaff_ESI + 8)) + 0x12)) >>> 0);
        heap.setU32(puVar1, (heap.u16(puVar1) ^ 0x80) & 0xffffffff);
        (regs.eax = FUN_005e43de(heap));
      }
      return;
    }
    (regs.eax = FUN_005e68e2(heap));
    if (!bVar4) {
      puVar1 = (((heap.i32((unaff_ESI + 8)) + 0x12)) >>> 0);
      heap.setU32(puVar1, (heap.u16(puVar1) ^ 0x40) & 0xffffffff);
      (regs.eax = FUN_005e43de(heap));
    }
    return;
  }
  (regs.eax = FUN_005e68e2(heap));
  if (!bVar4) {
    puVar1 = (((heap.i32((unaff_ESI + 8)) + 0x12)) >>> 0);
    heap.setU32(puVar1, (heap.u16(puVar1) ^ 0x10) & 0xffffffff);
    (regs.eax = FUN_005e43de(heap));
  }
  return;
}
