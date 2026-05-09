// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44f92c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0042688b } from "./42688b.js";
import { FUN_005cfc50 } from "./5cfc50.js";
import { FUN_005cfe66 } from "./5cfe66.js";
export function FUN_0044f92c(heap) {
  let pbVar1 = 0;
  let uVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_ECX = regs.ecx >>> 0;
  let in_EDX = regs.edx >>> 0;
  let uVar5 = 0;
  let psVar6 = 0;
  let puVar7 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pcVar8 = 0;
  let pbVar9 = 0;
  let pcVar10 = 0;
  let bVar11 = 0;
  let pcVar12 = 0;
  let pcVar13 = 0;
  let extraout_ECX = 0;
  pcVar10 = ((((in_EDX & 0xff) * 0x260)) >>> 0);
  uVar3 = ((in_EAX) >>> 0);
  if (heap.i8(pcVar10 + (0x887420)) == 8) {
    bVar11 = ((false) & 0xff);
    pcVar8 = ((unaff_ESI) >>> 0);
    pcVar13 = ((pcVar10) >>> 0);
    do {
      uVar4 = ((((in_ECX) & 0xffff)) & 0xffff);
      uVar2 = ((((uVar3) & 0xffff)) & 0xffff);
      pcVar12 = ((pcVar8) >>> 0);
      (regs.eax = FUN_005cfc50(heap));
      if (bVar11) {
        break;
      }
      uVar3 = (((regs.eax = FUN_005cfe66(heap, heap.i8(pcVar8 + (4))))) >>> 0);
      uVar4 = ((((extraout_ECX) & 0xffff)) & 0xffff);
      uVar2 = ((((uVar3) & 0xffff)) & 0xffff);
      bVar11 = ((pcVar10 < unaff_ESI) & 0xff);
      pcVar8 = ((pcVar10) >>> 0);
      pcVar12 = ((pcVar10) >>> 0);
      in_ECX = ((extraout_ECX) >>> 0);
    } while (((pcVar10) >>> 0) - ((unaff_ESI) >>> 0) != 0);
    pcVar10 = ((pcVar13) >>> 0);
    unaff_ESI = ((pcVar12) >>> 0);
    in_ECX = ((((uVar4 >>> 5) >>> 0)) >>> 0);
    uVar2 = ((CONCAT11((((uVar4 >>> 5)) << 24 >> 24), (((uVar2 >>> 5)) << 24 >> 24))) & 0xffff);
    uVar3 = ((((uVar2) >>> 0)) >>> 0);
    heap.setU16((pcVar10 + 0x8874a2), (uVar2) & 0xffff);
    heap.setI8((pcVar10 + (0x8874a1)), (heap.u32((0x00653ef7) + (((((heap.i8(unaff_ESI + (4))) & 0xff)) >>> 0) * 10) * 4) + heap.i8(unaff_ESI) & 3) & 0xff);
  }
  if (heap.i8(pcVar10 + (0x887420)) == 20) {
    uVar5 = ((0) >>> 0);
    psVar6 = ((0x006522f6) >>> 0);
    do {
      if ((heap.i16((pcVar10 + (((0x00887462 + uVar5)) >>> 0))) | 0) != -1) {
        heap.setU32(psVar6, (heap.i16((pcVar10 + (((0x00887462 + uVar5)) >>> 0)))) & 0xffffffff);
        psVar6 = ((psVar6 + ((1) * 2)) >>> 0);
      }
      if ((heap.i16((pcVar10 + (((0x0088746a + uVar5)) >>> 0))) | 0) != -1) {
        heap.setU32(psVar6, (heap.i16((pcVar10 + (((0x0088746a + uVar5)) >>> 0)))) & 0xffffffff);
        psVar6 = ((psVar6 + ((1) * 2)) >>> 0);
      }
      uVar5 = ((uVar5 + 1) >>> 0);
    } while (uVar5 < 4);
    heap.setU32(psVar6, (-1) & 0xffffffff);
    pcVar8 = ((pcVar10) >>> 0);
    for (puVar7 = ((0x006522f6) >>> 0); uVar2 = ((heap.u16(puVar7)) & 0xffff), uVar2 != 0xffff; puVar7 = (((puVar7 + ((1) * 2)) >>> 0)) >>> 0) {
      pbVar9 = ((heap.u32((0x00971ef4) + ((((((uVar2 >>> 8) << 0xc | (uVar2 & 0xff) << 5) & 0xffff) >>> 5 | ((((uVar2 >>> 8) << 5) & 0xffff) >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
      do {
        if ((((heap.u8(pbVar9) & 0x3c) == 0x10) && (heap.u8(pbVar9 + (4)) < 2)) && (heap.u8(pbVar9 + (2)) == heap.i8(pcVar10 + (0x887452)))) {
          (regs.eax = FUN_0042688b(heap, unaff_ESI, pcVar8, in_ECX, uVar3));
        }
        pbVar1 = ((pbVar9 + 1) >>> 0);
        pbVar9 = ((pbVar9 + 8) >>> 0);
      } while ((heap.u8(pbVar1) & 0x80) == 0);
    }
  }
  return 1;
}
