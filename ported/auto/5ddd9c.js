// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5ddd9c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CARRY1, CONCAT11, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0042c711 } from "./42c711.js";
import { FUN_0044153e } from "./44153e.js";
export function FUN_005ddd9c(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_stack0xffffffdc = __sp + 0;
  try {
  let bVar1 = 0;
  let uVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_ECX = regs.ecx >>> 0;
  let extraout_ECX = 0;
  let in_EDX = regs.edx >>> 0;
  let iVar3 = 0;
  let uVar4 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let puVar5 = 0;
  let uVar6 = 0;
  let iVar7 = 0;
  uVar6 = ((0) >>> 0);
  puVar5 = ((unaff_ESI) >>> 0);
  while (true) {
    uVar2 = ((CONCAT11((((uVar6 >>> 8)) << 24 >> 24) + CARRY1(((uVar6) & 0xff), heap.u8(puVar5 + (0xb3))), ((uVar6) & 0xff) + heap.u8(puVar5 + (0xb3)))) & 0xffff);
    uVar6 = ((((uVar2) >>> 0)) >>> 0);
    if (heap.u16((puVar5 + 0x3e)) == 0xffff) {
      break;
    }
    puVar5 = ((0x00743b94 + heap.u32((puVar5 + 0x3e)) * 0x100) >>> 0);
  }
  uVar6 = ((((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0)) >>> 0);
  uVar4 = ((2) >>> 0);
  if (uVar2 != 0) {
    uVar4 = ((8) >>> 0);
  }
  heap.setU16((0x00971e86 + 0), (uVar2) & 0xffff);
  if (heap.u32(((0x0088757e) & 0xff) + (uVar6 * 0x260) * 4) <= ((uVar4) & 0xff)) {
    heap.setU32(((0x0088757e) + (uVar6 * 0x260) * 4), (((uVar4) & 0xff)) & 0xffffffff);
  }
  if (uVar2 != 0) {
    heap.setU16((0x00971e86 + 2), (heap.u32((0x00887442) + (uVar6 * 0x130) * 4)) & 0xffff);
    heap.setU32(0x00971e8a, (heap.u32((0x00887444) + (uVar6 * 0x98) * 4)) >>> 0);
    uVar4 = ((0x7f2) >>> 0);
    (regs.eax = FUN_0042c711(heap));
    in_ECX = ((extraout_ECX) >>> 0);
  }
  iVar7 = ((((((heap.u8(unaff_ESI + (0x30))) & 0xff)) >>> 0) * 0x260) >>> 0);
  while (true) {
    bVar1 = ((heap.u8(unaff_ESI + (0xb3))) & 0xff);
    if ((bVar1 == heap.u8(unaff_ESI + (0xb4))) && (uVar6 = ((((bVar1) >>> 0)) >>> 0), bVar1 != 0)) {
      iVar3 = ((0) >>> 0);
      do {
        uVar2 = ((heap.u16((unaff_ESI + iVar3 * 2 + 0x52))) & 0xffff);
        if (heap.u32((0x00743bbe) + (((uVar2) >>> 0) * 0x100) * 4) == 0) {
          heap.setU32(0x0087c81c, (heap.u32(0x0087c81c) + -1) >>> 0);
          heap.setU32(0x005f54ec, (heap.u32(0x005f54ec) | 4) >>> 0);
        }
        heap.setU32(((0x0088752b) + (iVar7) * 4), (heap.u32((0x0088752b) + (iVar7) * 4) + -1) & 0xffffffff);
        (regs.eax = FUN_0044153e(heap, iVar7, unaff_ESI, 0x00743b94 + ((uVar2) >>> 0) * 0x100, __addr_stack0xffffffdc, uVar4, iVar3, in_ECX, uVar6));
        iVar3 = ((iVar3 + 1) >>> 0);
      } while (((iVar3) & 0xff) < ((heap.u8(unaff_ESI + (0xb3))) & 0xff));
      heap.setU8((unaff_ESI + (0xb3)), (0) & 0xff);
      heap.setU8((unaff_ESI + (0xb4)), (0) & 0xff);
    }
    if (heap.u16((unaff_ESI + 0x3e)) == 0xffff) {
      break;
    }
    unaff_ESI = ((0x00743b94 + heap.u32((unaff_ESI + 0x3e)) * 0x100) >>> 0);
  }
  return 1;
} finally {
    heap.freeFrame(4);
  }
}
