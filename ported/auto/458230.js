// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/458230.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_009b438b } from "./9b438b.js";
export function FUN_00458230(heap) {
  const __sp = heap.allocFrame(82);
  const __addr_local_50 = __sp + 0;
  const __addr_local_10 = __sp + 64;
  const __addr_local_c = __sp + 68;
  const __addr_local_a = __sp + 70;
  const __addr_local_8 = __sp + 72;
  const __addr_local_6 = __sp + 74;
  const __addr_local_4 = __sp + 76;
  const __addr_local_2 = __sp + 78;
  try {
  let cVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let puVar8 = 0;
  let pcVar9 = 0;
  let puVar10 = 0;
  pcVar9 = ((0x0099a508) >>> 0);
  uVar6 = ((0x5a1e) >>> 0);
  do {
    cVar1 = ((((heap.u16((0x008dc0b8 + uVar6 * 0x10))) << 24 >> 24)) & 0xff);
    uVar5 = ((((uVar6) & 0xffff)) & 0xffff);
    if ((0x5a78 < uVar5) && (uVar5 < 0x5a9d)) {
      cVar1 = ((0) & 0xff);
    }
    heap.setU32(pcVar9, (cVar1) & 0xffffffff);
    pcVar9 = ((pcVar9 + 1) >>> 0);
    uVar6 = ((((uVar5 + 1) >>> 0)) >>> 0);
  } while (((uVar5 + 1) & 0xffff) < 0x5afe);
  uVar6 = ((0x5afe) >>> 0);
  do {
    cVar1 = ((((heap.u16((0x008dc0b8 + uVar6 * 0x10))) << 24 >> 24)) & 0xff);
    uVar5 = ((((uVar6) & 0xffff)) & 0xffff);
    if ((0x5b58 < uVar5) && (uVar5 < 0x5b7d)) {
      cVar1 = ((0) & 0xff);
    }
    heap.setU32(pcVar9, (cVar1) & 0xffffffff);
    pcVar9 = ((pcVar9 + 1) >>> 0);
    uVar6 = ((((uVar5 + 1) >>> 0)) >>> 0);
  } while (((uVar5 + 1) & 0xffff) < 0x5bde);
  uVar6 = ((0x5bde) >>> 0);
  do {
    cVar1 = ((((heap.u16((0x008dc0b8 + uVar6 * 0x10))) << 24 >> 24) + 1) & 0xff);
    uVar5 = ((((uVar6) & 0xffff)) & 0xffff);
    if ((0x5c38 < uVar5) && (uVar5 < 0x5c5d)) {
      cVar1 = ((0) & 0xff);
    }
    heap.setU32(pcVar9, (cVar1) & 0xffffffff);
    pcVar9 = ((pcVar9 + 1) >>> 0);
    uVar6 = ((((uVar5 + 1) >>> 0)) >>> 0);
  } while (((uVar5 + 1) & 0xffff) < 0x5cbe);
  uVar6 = ((0x5cbe) >>> 0);
  do {
    cVar1 = ((((heap.u16((0x008dc0b8 + uVar6 * 0x10))) << 24 >> 24) + 1) & 0xff);
    uVar5 = ((((uVar6) & 0xffff)) & 0xffff);
    if ((0x5d18 < uVar5) && (uVar5 < 0x5d3d)) {
      cVar1 = ((0) & 0xff);
    }
    heap.setU32(pcVar9, (cVar1) & 0xffffffff);
    pcVar9 = ((pcVar9 + 1) >>> 0);
    uVar6 = ((((uVar5 + 1) >>> 0)) >>> 0);
  } while (((uVar5 + 1) & 0xffff) < 0x5d9e);
  heap.setU32(__addr_local_10, (__addr_local_50) >>> 0);
  heap.setU32(__addr_local_c, (0) >>> 0);
  heap.setU32(__addr_local_a, (0) >>> 0);
  heap.setU32(__addr_local_8, (8) >>> 0);
  heap.setU32(__addr_local_6, (8) >>> 0);
  heap.setU32(__addr_local_4, (0) >>> 0);
  heap.setU32(__addr_local_2, (0) >>> 0);
  uVar6 = ((0) >>> 0);
  do {
    puVar8 = ((heap.u32(__addr_local_10)) >>> 0);
    for (iVar4 = ((0x10) >>> 0); iVar4 != 0; iVar4 = (((iVar4 + -1) >>> 0)) >>> 0) {
      heap.setU32(puVar8, (0) & 0xffffffff);
      puVar8 = ((puVar8 + ((1) * 4)) >>> 0);
    }
    (regs.ebx = 0x5bde, regs.edi = 0x9d3fec, regs.eax = FUN_009b438b(heap));
    uVar7 = ((0) >>> 0);
    do {
      pcVar9 = (((((heap.u32(__addr_local_10)) >>> 0) + uVar7)) >>> 0);
      iVar4 = ((8) >>> 0);
      uVar3 = ((0) >>> 0);
      do {
        bVar2 = ((((uVar3) << 24 >> 24) + heap.i8(pcVar9)) & 0xff);
        uVar3 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar3 >>> 8)), bVar2) >>> 1 | (((bVar2 & 1) != 0) >>> 0) << 0x1f) >>> 0);
        pcVar9 = ((pcVar9 + 8) >>> 0);
        iVar4 = ((iVar4 + -1) >>> 0);
      } while (iVar4 != 0);
      heap.setU32(((0x006432d8) + (uVar6 * 8 + uVar7) * 4), ((((uVar3 >>> 0x18)) << 24 >> 24)) & 0xffffffff);
      uVar7 = ((uVar7 + 1) >>> 0);
    } while (uVar7 < 8);
    uVar6 = ((uVar6 + 1) >>> 0);
  } while (uVar6 < 0xe0);
  puVar8 = ((0x008dffb4) >>> 0);
  puVar10 = ((0x006439ea) >>> 0);
  iVar4 = ((0x10) >>> 0);
  do {
    heap.setU32(puVar8, (puVar10) & 0xffffffff);
    heap.setU16((puVar8 + ((1) * 4)), (0x40) & 0xffff);
    heap.setU16((((puVar8) >>> 0) + 6), (0x20) & 0xffff);
    heap.setU32(puVar10, (0xffff) & 0xffffffff);
    heap.setU32((puVar10 + ((7) * 2)), (0) & 0xffffffff);
    puVar8 = ((puVar8 + ((4) * 4)) >>> 0);
    puVar10 = ((puVar10 + ((0x409) * 2)) >>> 0);
    iVar4 = ((iVar4 + -1) >>> 0);
  } while (iVar4 != 0);
  return;
} finally {
    heap.freeFrame(82);
  }
}
