// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44049c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00458bcf } from "./458bcf.js";
export function FUN_0044049c(heap) {
  let uVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let pbVar5 = 0;
  let uVar6 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pbVar7 = 0;
  let uVar8 = 0;
  heap.setU32(0x00642fb8, (0x31) >>> 0);
  uVar6 = ((heap.u16((unaff_ESI + 4))) & 0xffff);
  uVar3 = ((heap.u16((unaff_ESI + 6))) & 0xffff);
  uVar4 = ((uVar6) & 0xffff);
  if (uVar3 != 0xffff) {
    heap.setU32(((0x00743b98) + (((uVar3) >>> 0) * 0x80) * 4), (uVar6) & 0xffffffff);
    uVar4 = ((heap.u32(0x0087c398)) & 0xffff);
  }
  heap.setU32(0x0087c398, (uVar4) >>> 0);
  if (uVar6 != 0xffff) {
    heap.setU32(((0x00743b9a) + (((uVar6) >>> 0) * 0x80) * 4), (uVar3) & 0xffffffff);
  }
  (regs.eax = FUN_00458bcf(heap));
  uVar6 = ((heap.u32(0x0087c398)) & 0xffff);
  do {
    if (uVar6 == 0xffff) {
      uVar6 = ((heap.u32(0x0087c398)) & 0xffff);
      if (heap.u32(0x0087c398) == 0xffff) {
        heap.setU32(0x0087c398, (heap.u16((unaff_ESI + 10))) >>> 0);
        heap.setU16((unaff_ESI + 4), (0xffff) & 0xffff);
        heap.setU16((unaff_ESI + 6), (0xffff) & 0xffff);
        heap.setU32(0x00642fb8, (0x30) >>> 0);
        return 1;
      }
      do {
        uVar8 = ((((uVar6) >>> 0)) >>> 0);
        uVar6 = ((heap.u32((0x00743b98) + (uVar8 * 0x80) * 4)) & 0xffff);
      } while (uVar6 != 0xffff);
      heap.setU32(((0x00743b98) + (uVar8 * 0x80) * 4), (heap.u16((unaff_ESI + 10))) & 0xffffffff);
      heap.setU16((unaff_ESI + 6), (heap.u32((0x00743b9e) + (uVar8 * 0x80) * 4)) & 0xffff);
      heap.setU16((unaff_ESI + 4), (0xffff) & 0xffff);
      heap.setU32(0x00642fb8, (0x30) >>> 0);
      return 1;
    }
    (regs.eax = FUN_00458bcf(heap));
    pbVar7 = ((0x0099a888) >>> 0);
    pbVar5 = ((0x0099aa88) >>> 0);
    while (true) {
      bVar2 = ((heap.u8(pbVar7)) & 0xff);
      if (bVar2 < heap.u8(pbVar5)) {
        LOCK();
        uVar3 = ((heap.u32((0x00743b9a) + (((uVar6) >>> 0) * 0x80) * 4)) & 0xffff);
        heap.setU32(((0x00743b9a) + (((uVar6) >>> 0) * 0x80) * 4), (heap.u16((unaff_ESI + 10))) & 0xffffffff);
        UNLOCK();
        heap.setU16((unaff_ESI + 6), (uVar3) & 0xffff);
        if (uVar3 == 0xffff) {
          LOCK();
          UNLOCK();
          uVar6 = ((heap.u16((unaff_ESI + 10))) & 0xffff);
          heap.setU16((unaff_ESI + 4), (heap.u32(0x0087c398)) & 0xffff);
          heap.setU32(0x0087c398, (uVar6) >>> 0);
        } else {
          LOCK();
          uVar1 = ((heap.u32((0x00743b98) + (((uVar3) >>> 0) * 0x80) * 4)) & 0xffff);
          heap.setU32(((0x00743b98) + (((uVar3) >>> 0) * 0x80) * 4), (heap.u16((unaff_ESI + 10))) & 0xffffffff);
          UNLOCK();
          heap.setU16((unaff_ESI + 4), (uVar1) & 0xffff);
        }
        heap.setU32(0x00642fb8, (0x30) >>> 0);
        return 1;
      }
      if ((bVar2 != heap.u8(pbVar5)) || (bVar2 == 0)) {
        break;
      }
      pbVar7 = ((pbVar7 + 1) >>> 0);
      pbVar5 = ((pbVar5 + 1) >>> 0);
    }
    uVar6 = ((heap.u32((0x00743b98) + (((uVar6) >>> 0) * 0x80) * 4)) & 0xffff);
  } while (true);
}
