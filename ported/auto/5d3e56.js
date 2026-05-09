// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d3e56.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0042635e } from "./42635e.js";
import { FUN_00427108 } from "./427108.js";
import { FUN_005cfe66 } from "./5cfe66.js";
import { FUN_005d13e2 } from "./5d13e2.js";
import { FUN_005d1dd4 } from "./5d1dd4.js";
import { FUN_005d1ef6 } from "./5d1ef6.js";
import { FUN_005d21fa } from "./5d21fa.js";
import { FUN_005d3329 } from "./5d3329.js";
import { FUN_005d3527 } from "./5d3527.js";
import { FUN_005d3b30 } from "./5d3b30.js";
import { FUN_005d41a6 } from "./5d41a6.js";
import { FUN_005d5003 } from "./5d5003.js";
import { FUN_005dd134 } from "./5dd134.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e5301 } from "./5e5301.js";
import { FUN_005e680e } from "./5e680e.js";
export function FUN_005d3e56(heap) {
  let bVar1 = 0;
  let bVar2 = 0;
  let cVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let extraout_CX_01 = 0;
  let in_EDX = regs.edx >>> 0;
  let extraout_EDX = 0;
  let uVar6 = 0;
  let bVar7 = 0;
  let uVar9 = 0;
  let uVar8 = 0;
  let uVar10 = 0;
  let iVar11 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let bVar12 = 0;
  let uVar13 = 0;
  uVar10 = ((((heap.u8(in_EDX + (7))) >>> 0)) >>> 0);
  iVar11 = ((uVar10 * 0x260) >>> 0);
  if (((heap.u32((0x00887422) + (uVar10 * 0x130) * 4) & 0x80) == 0) && (heap.u32((0x00887441) + (iVar11) * 4) == 0)) {
    (regs.eax = FUN_005dd134(heap));
    uVar10 = (((regs.eax = FUN_0042635e(heap))) >>> 0);
    bVar12 = (((heap.u8(in_EDX) & 0x3c) == 0x10) & 0xff);
    if (bVar12) {
      bVar1 = ((heap.u8(in_EDX + (4))) & 0xff);
      if ((bVar1 != 0) && (bVar1 != 1)) {
        return uVar10;
      }
      bVar7 = (((heap.u8(in_EDX + (5)) & 0x70) >>> 4) & 0xff);
      uVar9 = ((0) & 0xff);
      uVar6 = ((bVar7 == 0) & 0xff);
      bVar2 = ((heap.u8(in_EDX + (7))) & 0xff);
      uVar10 = ((((bVar2) >>> 0)) >>> 0);
      (regs.eax = FUN_005e3b2b(heap));
      if ((!uVar6) || (((regs.eax = FUN_005d41a6(heap)), !uVar9 && ((regs.eax = FUN_005e3b2b(heap)), !uVar6)))) {
        (regs.eax = FUN_005d21fa(heap));
        if ((heap.u8(0x00652288) == 5) && (((heap.u32(0x00991f30) >>> 3 & 1) != 0 && (heap.u8(0x00991f5a) == 13)))) {
          heap.setU8(0x00991f5c, (0x1d) & 0xff);
          heap.setU32(0x006522e1, (0) >>> 0);
          if (bVar1 != 0) {
            heap.setU32(0x006522e1, (1) >>> 0);
            heap.setU8(0x00991f5c, (0x1e) & 0xff);
          }
        } else {
          (regs.eax = FUN_005e680e(heap));
          cVar3 = ((heap.u8(0x00652288)) & 0xff);
          heap.setU32(0x00991f30, (heap.u32(0x00991f30) | 0x40) >>> 0);
          LOCK();
          heap.setU8(0x00652288, (5) & 0xff);
          UNLOCK();
          if (cVar3 != 5) {
            heap.setU8(0x006522a3, (cVar3) & 0xff);
          }
          heap.setU32(0x006522e1, (bVar1) >>> 0);
          heap.setU32(0x006522e2, (bVar2) >>> 0);
          heap.setU32(0x006522e3, (bVar7) >>> 0);
          (regs.eax = FUN_005d13e2(heap));
          heap.setU32(0x0099a020, (heap.u32(0x0099a020) & 0xfffd) >>> 0);
        }
        uVar10 = (((regs.eax = FUN_005e5301(heap))) >>> 0);
        return uVar10;
      }
    } else {
      uVar4 = (((regs.eax = FUN_005e3b2b(heap))) & 0xffff);
      if ((bVar12) || (((heap.u8(in_EDX + (7))) & 0xffff) != heap.u16((iVar11 + 0x30)))) {
        uVar4 = (((regs.eax = FUN_005d3b30(heap))) & 0xffff);
        heap.setU8(0x00652289, (heap.u8(extraout_EDX + (7))) & 0xff);
        (regs.eax = FUN_005d3527(heap));
        in_EDX = ((extraout_EDX) >>> 0);
        uVar5 = ((extraout_CX_00) & 0xffff);
      } else {
        heap.setU16((iVar11 + 0x30), (((heap.u8(in_EDX + (7))) & 0xffff)) & 0xffff);
        (regs.eax = FUN_005d21fa(heap));
        uVar5 = ((extraout_CX) & 0xffff);
      }
      if (heap.u32((0x00887420) + (((heap.u8(in_EDX + (7))) >>> 0) * 0x260) * 4) == 0x14) {
        heap.setU8(0x00652289, (heap.u8(in_EDX + (7))) & 0xff);
        heap.setU8(0x00652288, (6) & 0xff);
        heap.setU8(0x0065228e, (((heap.u8(in_EDX + (2))) & 0xffff) << 2) & 0xff);
        heap.setU8(0x00652292, (0) & 0xff);
        heap.setU8(0x00652293, (0) & 0xff);
        heap.setU8(0x0065228a, (uVar4) & 0xff);
        heap.setU8(0x0065228c, (uVar5) & 0xff);
        uVar10 = (((regs.eax = FUN_005d5003(heap))) >>> 0);
        return uVar10;
      }
      if ((heap.u32((0x005f5b78 + heap.u32(((0x00887420) >>> 0) + (((heap.u8(in_EDX + (7))) >>> 0) * 0x260) * 4) * 8)) & 0x100) != 0) {
        (regs.eax = FUN_005d3329(heap));
      }
      uVar8 = ((CONCAT11(heap.u8(in_EDX), heap.u8(in_EDX + (4))) & 0xffff03ff) >>> 0);
      bVar12 = ((false) & 0xff);
      uVar13 = (((regs.eax = FUN_005cfe66(heap))) >>> 0);
      uVar4 = ((((uVar13 >>> 0x20) & 0xffff)) & 0xffff);
      uVar10 = ((((uVar13) >>> 0)) >>> 0);
      if (!bVar12) {
        heap.setU8(0x00652289, (heap.u8((unaff_EDI + 7))) & 0xff);
        heap.setU8(0x00652288, (3) & 0xff);
        uVar5 = ((((uVar13) & 0xffff)) & 0xffff);
        uVar9 = ((((uVar8 >>> 8) & 0xff)) & 0xff);
        uVar6 = ((((uVar8) & 0xff)) & 0xff);
        heap.setU8(0x00652292, (0) & 0xff);
        heap.setU8(0x00652293, (0) & 0xff);
        heap.setU8(0x0065228a, (uVar5) & 0xff);
        heap.setU8(0x0065228c, (extraout_CX_01) & 0xff);
        heap.setU8(0x0065228e, (uVar4) & 0xff);
        heap.setU8(0x00652290, (uVar9) & 0xff);
        heap.setU8(0x00652291, (uVar6) & 0xff);
        if (((heap.u32((0x005f5b78 + heap.u32(((0x00887420) >>> 0) + (((heap.u8(0x00652289)) >>> 0) * 0x260) * 4) * 8)) & 0x8000) == 0) && ((regs.eax = FUN_005d1dd4(heap)), heap.u8(0x00652288) != 1)) {
          heap.setU8(0x00652288, (3) & 0xff);
          heap.setU8(0x00652292, (0) & 0xff);
          heap.setU8(0x00652293, (0) & 0xff);
          heap.setU8(0x0065228a, (uVar5) & 0xff);
          heap.setU8(0x0065228c, (extraout_CX_01) & 0xff);
          heap.setU8(0x0065228e, (uVar4) & 0xff);
          heap.setU8(0x00652290, (uVar9) & 0xff);
          heap.setU8(0x00652291, (uVar6) & 0xff);
          (regs.eax = FUN_005d1ef6(heap));
          if (heap.u8(0x00652288) != 2) {
            heap.setU8(0x00652288, (3) & 0xff);
            heap.setU8(0x00652292, (0) & 0xff);
            heap.setU8(0x00652293, (0) & 0xff);
            heap.setU8(0x0065228a, (uVar5) & 0xff);
            heap.setU8(0x0065228c, (extraout_CX_01) & 0xff);
            heap.setU8(0x0065228e, (uVar4) & 0xff);
            heap.setU8(0x00652290, (uVar9) & 0xff);
            heap.setU8(0x00652291, (uVar6) & 0xff);
          }
        }
        uVar10 = (((regs.eax = FUN_005d13e2(heap))) >>> 0);
        return uVar10;
      }
    }
  } else {
    heap.setU16((0x00971e8a + 2), (heap.u32((0x00887442) + (uVar10 * 0x130) * 4)) & 0xffff);
    heap.setU32(0x00971e8e, (heap.u32((0x00887444) + (uVar10 * 0x98) * 4)) >>> 0);
    uVar10 = (((regs.eax = FUN_00427108(heap))) >>> 0);
  }
  return uVar10;
}
