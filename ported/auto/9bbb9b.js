// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bbb9b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00408342 } from "./408342.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_004083e1 } from "./4083e1.js";
import { FUN_00458bcf } from "./458bcf.js";
export function FUN_009bbb9b(heap) {
  let cVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  let iVar5 = 0;
  let uVar6 = 0;
  let sVar7 = 0;
  let cVar8 = 0;
  let uVar9 = 0;
  let pcVar10 = 0;
  let puVar11 = 0;
  let pcVar12 = 0;
  let puVar13 = 0;
  LAB_009bbdbf: {
  LAB_009bbdbe: {
  sVar2 = ((1) & 0xffff);
  while (true) {
    pcVar12 = ((0x0099a888) >>> 0);
    pcVar10 = ((0x005f8da3) >>> 0);
    heap.setU16((0x00971e86 + 0), (sVar2) & 0xffff);
    do {
      cVar1 = ((heap.i8(pcVar10)) & 0xff);
      heap.setU32(pcVar12, (cVar1) & 0xffffffff);
      pcVar10 = ((pcVar10 + 1) >>> 0);
      pcVar12 = ((pcVar12 + 1) >>> 0);
    } while (cVar1 != 0);
    (regs.eax = FUN_00458bcf(heap));
    iVar4 = (((regs.eax = FUN_004083b5(heap, 0x0099a888))) >>> 0);
    if ((iVar4 | 0) == -1) {
      break;
    }
    (regs.eax = FUN_00408387(heap, iVar4));
    sVar2 = ((sVar2 + 1) & 0xffff);
  }
  iVar4 = (((regs.eax = FUN_004083e1(heap, 0x0099a888))) >>> 0);
  if ((iVar4 | 0) != -1) {
    puVar11 = ((0x00981efc) >>> 0);
    sVar7 = ((0x80) & 0xffff);
    heap.setU32(0x009a2004, (iVar4) >>> 0);
    do {
      heap.setU32(puVar11, (0) & 0xffffffff);
      puVar11 = ((puVar11 + 1) >>> 0);
      sVar7 = ((sVar7 + -1) & 0xffff);
    } while (sVar7 != 0);
    heap.setU32(0x00981efc, (0x801050a) >>> 0);
    heap.setU32(0x00981f04, (CONCAT22(heap.u32(0x00971ed8) - 1, heap.u32(0x00971ed6) - 1)) >>> 0);
    heap.setU32(0x00981f08, (0x400040) >>> 0);
    heap.setU32(0x00981f3c, (CONCAT22(heap.u32(0x00971ed6), 0x100)) >>> 0);
    iVar4 = (((regs.eax = FUN_00408342(heap, heap.u32(0x009a2004), 0x00981efc, 0x80))) >>> 0);
    if ((iVar4 | 0) != -1) {
      pcVar12 = ((0x00981efc) >>> 0);
      uVar9 = ((((heap.u32(0x00971ed6)) >>> 0)) >>> 0);
      iVar4 = ((heap.u32(0x00971ed8) * uVar9) >>> 0);
      pcVar10 = ((heap.u32(0x0099fb7c)) >>> 0);
      while (true) {
        if (uVar9 == 0) {
          pcVar10 = ((pcVar10 + (((heap.u32(0x0099fb88) - heap.u32(0x00971ed6)) + heap.u32(0x0099fb84)) & 0xffff)) >>> 0);
          uVar9 = ((((heap.u32(0x00971ed6)) >>> 0)) >>> 0);
        }
        if (iVar4 == 0) {
          break;
        }
        if (0x991e97 < pcVar12) {
          iVar5 = (((regs.eax = FUN_00408342(heap, heap.u32(0x009a2004), 0x00981efc, pcVar12 + -0x981efc))) >>> 0);
          if ((iVar5 | 0) == -1) {
            /* goto LAB_009bbdb0 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bbb9b/LAB_009bbdb0"); return 0;
          }
          pcVar12 = ((0x00981efc) >>> 0);
        }
        cVar1 = ((heap.i8(pcVar10)) & 0xff);
        pcVar10 = ((pcVar10 + 1) >>> 0);
        iVar4 = ((iVar4 + -1) >>> 0);
        uVar9 = ((uVar9 - 1) >>> 0);
        uVar3 = ((CONCAT11(cVar1, cVar1) & 0xc0ff) & 0xffff);
        cVar1 = ((((uVar3) << 24 >> 24)) & 0xff);
        if (((((uVar3 >>> 8)) << 24 >> 24) == -0x40) || ((uVar9 != 0 && (cVar1 == heap.i8(pcVar10))))) {
          cVar8 = ((-0x3f) & 0xff);
          for (; ((uVar9 != 0 && ((cVar8 | 0) != -1)) && (cVar1 == heap.i8(pcVar10))); pcVar10 = (((pcVar10 + 1) >>> 0)) >>> 0) {
            iVar4 = ((iVar4 + -1) >>> 0);
            uVar9 = ((uVar9 - 1) >>> 0);
            cVar8 = ((cVar8 + 1) & 0xff);
          }
          heap.setU32(pcVar12, (cVar8) & 0xffffffff);
          heap.setI8((pcVar12 + (1)), (cVar1) & 0xff);
          pcVar12 = ((pcVar12 + 2) >>> 0);
        } else {
          heap.setU32(pcVar12, (cVar1) & 0xffffffff);
          pcVar12 = ((pcVar12 + 1) >>> 0);
        }
      }
      if (pcVar12 + -0x981efc != 0x0) {
        iVar4 = (((regs.eax = FUN_00408342(heap, heap.u32(0x009a2004), 0x00981efc, pcVar12 + -0x981efc))) >>> 0);
        if ((iVar4 | 0) == -1) {
          /* goto LAB_009bbdb0 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bbb9b/LAB_009bbdb0"); return 0;
        }
      }
      heap.setU32(0x00981efc, (CONCAT31(heap.u32(0x00981efd), 0xc)) >>> 0);
      puVar13 = ((0x00981efd) >>> 0);
      puVar11 = ((0x005f2000) >>> 0);
      sVar7 = ((0x100) & 0xffff);
      do {
        heap.setU8((puVar13 + (2)), (heap.u8(puVar11)) & 0xff);
        heap.setU8((puVar13 + (1)), (heap.u8(puVar11 + (1))) & 0xff);
        heap.setU32(puVar13, (heap.u8(puVar11 + (2))) & 0xffffffff);
        puVar11 = ((puVar11 + 4) >>> 0);
        puVar13 = ((puVar13 + 3) >>> 0);
        sVar7 = ((sVar7 + -1) & 0xffff);
      } while (sVar7 != 0);
      iVar4 = (((regs.eax = FUN_00408342(heap, heap.u32(0x009a2004), 0x00981efc, 0x301))) >>> 0);
      if ((iVar4 | 0) != -1) {
        iVar4 = (((regs.eax = FUN_00408387(heap, heap.u32(0x009a2004)))) >>> 0);
        if ((iVar4 | 0) != -1) {
          uVar6 = ((((((iVar4) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
          break LAB_009bbdbf;
        }
        break LAB_009bbdbe;
      }
    }
    LAB_009bbdb0: iVar4 = (((regs.eax = FUN_00408387(heap, heap.u32(0x009a2004)))) >>> 0);
  }
  }
  uVar6 = ((((((iVar4) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
  }
  return CONCAT22(uVar6, sVar2);
}
