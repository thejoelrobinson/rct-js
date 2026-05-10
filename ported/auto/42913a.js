// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42913a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00428ec0 } from "./428ec0.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_0042913a(heap) {
  let bVar1 = 0;
  let iVar2 = 0;
  let uVar3 = 0;
  let sVar4 = 0;
  let uVar5 = 0;
  let iVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  sVar4 = ((heap.u32(0x0087cba0)) & 0xffff);
  heap.setU32(0x0087cba0, (heap.u32(0x0087c81c)) >>> 0);
  heap.setU32(0x005f54ec, (heap.u32(0x005f54ec) | 4) >>> 0);
  heap.setU32(0x0087c3d6, (1) >>> 0);
  if ((-0x14 < (((heap.u32(0x0087c81c) - sVar4)) << 16 >> 16)) && (heap.setU32(0x0087c3d6, (2) >>> 0), (((heap.u32(0x0087c81c) - sVar4)) << 16 >> 16) < 0x14)) {
    heap.setU32(0x0087c3d6, (0) >>> 0);
  }
  uVar5 = (((regs.eax = FUN_00428ec0(heap))) & 0xffff);
  uVar5 = ((uVar5 >>> 2) & 0xffff);
  uVar8 = ((0) >>> 0);
  do {
    LOCK();
    bVar1 = ((heap.u32((0x0087cc8a) + (uVar8) * 4)) & 0xff);
    heap.setU32(((0x0087cc8a) + (uVar8) * 4), (((uVar5) & 0xff)) & 0xffffffff);
    uVar5 = ((((bVar1) & 0xffff)) & 0xffff);
    UNLOCK();
    uVar8 = ((uVar8 + 1) >>> 0);
  } while (uVar8 < 0x20);
  (regs.eax = 0x1b, regs.edi = 0x20, regs.eax = FUN_005e5301(heap));
  uVar5 = ((heap.u32(0x0087c81c)) & 0xffff);
  if (0x9c4 < heap.u32(0x0087c81c)) {
    uVar5 = ((0x9c4) & 0xffff);
  }
  uVar8 = ((uVar5 / 10) >>> 0);
  uVar9 = ((0) >>> 0);
  do {
    LOCK();
    bVar1 = ((heap.u32((0x0087ccaa) + (uVar9) * 4)) & 0xff);
    heap.setU32(((0x0087ccaa) + (uVar9) * 4), (((uVar8) & 0xff)) & 0xffffffff);
    uVar8 = ((((bVar1) >>> 0)) >>> 0);
    UNLOCK();
    uVar9 = ((uVar9 + 1) >>> 0);
  } while (uVar9 < 0x20);
  (regs.eax = 0x1b, regs.edi = 0x20, regs.eax = FUN_005e5301(heap));
  uVar8 = ((0) >>> 0);
  iVar6 = ((heap.u32(0x0087c3b4) - heap.u32(0x0087c3b8)) >>> 0);
  do {
    LOCK();
    iVar2 = ((heap.u32((0x0087d104) + (uVar8) * 4)) >>> 0);
    heap.setU32(((0x0087d104) + (uVar8) * 4), (iVar6) & 0xffffffff);
    UNLOCK();
    uVar8 = ((uVar8 + 1) >>> 0);
    iVar6 = ((iVar2) >>> 0);
  } while (uVar8 < 0x80);
  (regs.eax = 0x1b, regs.edi = 0x20, regs.eax = FUN_005e5301(heap));
  if (1 < heap.u32(0x0087d310)) {
    heap.setU32(0x0087d30c, (heap.u32(0x0087d30c) / ((heap.u32(0x0087d310)) | 0)) >>> 0);
  }
  uVar8 = ((0) >>> 0);
  do {
    LOCK();
    iVar6 = ((heap.u32((0x0087d314) + (uVar8) * 4)) >>> 0);
    heap.setU32(((0x0087d314) + (uVar8) * 4), (heap.u32(0x0087d30c)) & 0xffffffff);
    UNLOCK();
    uVar8 = ((uVar8 + 1) >>> 0);
    heap.setU32(0x0087d30c, (iVar6) >>> 0);
  } while (uVar8 < 0x80);
  heap.setU32(0x0087d30c, (0) >>> 0);
  heap.setU32(0x0087d310, (0) >>> 0);
  (regs.eax = 0x1b, regs.edi = 0x20, regs.eax = FUN_005e5301(heap));
  uVar8 = ((0) >>> 0);
  uVar7 = ((heap.u32(0x0087d514)) >>> 0);
  do {
    LOCK();
    uVar3 = ((heap.u32((0x0087d518) + (uVar8) * 4)) >>> 0);
    heap.setU32(((0x0087d518) + (uVar8) * 4), (uVar7) & 0xffffffff);
    UNLOCK();
    uVar8 = ((uVar8 + 1) >>> 0);
    uVar7 = ((uVar3) >>> 0);
  } while (uVar8 < 0x80);
  return;
}
