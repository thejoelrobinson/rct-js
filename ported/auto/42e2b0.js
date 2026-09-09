// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42e2b0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0042e276 } from "./42e276.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_0042e2b0(heap) {
  let pbVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let unaff_EBP = regs.ebp >>> 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let puVar10 = 0;
  let uVar11 = 0;
  uVar6 = ((((heap.u8((unaff_ESI + 0x1e)) >>> 3) >>> 0)) >>> 0);
  sVar2 = ((heap.i16((unaff_ESI + 0xe)) + heap.u32((0x00652478) + (uVar6 * 2) * 4)) & 0xffff);
  uVar4 = ((heap.u16((unaff_ESI + 0x12)) >>> 2) & 0xffff);
  uVar8 = ((unaff_EBP & 0xffff0000) >>> 0);
  uVar7 = ((0) >>> 0);
  do {
    uVar3 = ((heap.i16((unaff_ESI + 0x10)) + heap.u32((0x0065247a) + (uVar6 * 2) * 4) + heap.u32((0x005f8076) + (uVar7 * 2) * 4)) & 0xffff);
    uVar3 = ((uVar3 * 0x80 | uVar3 >>> 9 | sVar2 + heap.u32((0x005f8074) + (uVar7 * 2) * 4)) & 0xffff);
    puVar10 = ((heap.u32((0x00971ef4) + (((uVar3 >>> 5 | uVar3 << 0xb) & 0xffff)) * 4)) >>> 0);
    do {
      uVar4 = ((CONCAT11(heap.u8(puVar10), ((uVar4) << 24 >> 24)) & 0x3cff) & 0xffff);
      if ((((((uVar4 >>> 8)) << 24 >> 24) == 4) && (((uVar4) << 24 >> 24) == heap.u8(puVar10 + (2)))) && (uVar4 = ((CONCAT11(heap.u8(puVar10 + (5)), ((uVar4) << 24 >> 24)) & 0xfff) & 0xffff), (((uVar4 >>> 8)) << 24 >> 24) == 5)) {
        uVar8 = ((CONCAT22((((uVar8 >>> 0x10)) << 16 >> 16), ((uVar8) & 0xffff) | 1 << (((uVar7) & 0xffff) & 0xf))) >>> 0);
        break;
      }
      pbVar1 = ((puVar10 + 1) >>> 0);
      puVar10 = ((puVar10 + 8) >>> 0);
    } while ((heap.u8(pbVar1) & 0x80) == 0);
    uVar7 = ((uVar7 + 1) >>> 0);
  } while (uVar7 < 8);
  uVar4 = ((((uVar8) & 0xffff)) & 0xffff);
  if (uVar4 == 0) {
    return sVar2;
  }
  uVar11 = (((regs.eax = FUN_005df40c(heap))) >>> 0);
  uVar5 = ((((((uVar11) >>> 0) >>> 0x20) >>> 0)) >>> 0);
  if ((heap.u8((unaff_ESI + 0x2f)) & 8) != 0) {
    return sVar2;
  }
  if ((heap.u8((unaff_ESI + 0x2f)) & 2) == 0) {
    if ((heap.u8((unaff_ESI + 0x2f)) & 0x10) == 0) {
      if ((heap.u8((unaff_ESI + 0x2f)) & 4) != 0) {
        LAB_0042e38c: if (2 < heap.u16((unaff_ESI + 0x46))) {
          return sVar2;
        }
        uVar3 = (((heap.u8((unaff_ESI + 0x1e)) >>> 3 ^ 2) * 2) & 0xffff);
        uVar9 = ((CONCAT22((((uVar8 >>> 0x10)) << 16 >> 16), uVar4 & ~(1 << (uVar3 & 0xf)) & ~(1 << (uVar3 + 1 & 0xf)))) >>> 0);
        uVar6 = ((0) >>> 0);
        do {
          if ((((uVar9) & 0xffff) >>> (((uVar6) & 0xffff) & 0xf) & 1) != 0) {
            sVar2 = (((regs.eax = FUN_0042e276(heap, uVar9, uVar5))) & 0xffff);
          }
          if ((((uVar9) & 0xffff) >>> (((uVar6) & 0xffff) + 1 & 0xf) & 1) != 0) {
            sVar2 = (((regs.eax = FUN_0042e276(heap, uVar9, uVar5))) & 0xffff);
          }
          uVar6 = ((uVar6 + 2) >>> 0);
        } while (uVar6 < 8);
        return sVar2;
      }
      if (((uVar11) & 0xffff) < 0x2000) {
        return sVar2;
      }
      for (uVar6 = ((((uVar11) >>> 0) & 7) >>> 0); (uVar4 >>> ((uVar6) << 16 >> 16) & 1) == 0; uVar6 = (((((((uVar6) << 16 >> 16) + 1 & 7) >>> 0)) >>> 0)) >>> 0) {
      
      }
    } else {
      heap.setI16((unaff_ESI + 0x46), (heap.i16((unaff_ESI + 0x46)) + 1) & 0xffff);
      if (7 < heap.u16((unaff_ESI + 0x46))) {
        return sVar2;
      }
      uVar3 = ((((heap.u8((unaff_ESI + 0x1e)) >>> 3 ^ 2) & 0xffff) * 2) & 0xffff);
      if (((uVar4 >>> (uVar3 & 0xf) & 1) == 0) && ((uVar4 >>> (uVar3 + 1 & 0xf) & 1) == 0)) {
        return sVar2;
      }
    }
  } else {
    uVar3 = ((((heap.u8((unaff_ESI + 0x1e)) >>> 3) & 0xffff) * 2) & 0xffff);
    if (((uVar4 >>> (uVar3 & 0xf) & 1) == 0) && ((uVar4 >>> (uVar3 + 1 & 0xf) & 1) == 0)) {
      if (((uVar11) & 0xffff) < 0x3333) {
        return sVar2;
      }
      if ((heap.u8((unaff_ESI + 0x2f)) & 4) != 0) {
        /* goto LAB_0042e38c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0042e2b0/LAB_0042e38c"); return 0;
      }
      for (uVar6 = ((((uVar11) >>> 0) & 7) >>> 0); (uVar4 >>> ((uVar6) << 16 >> 16) & 1) == 0; uVar6 = (((((((uVar6) << 16 >> 16) + 1 & 7) >>> 0)) >>> 0)) >>> 0) {
      
      }
    }
  }
  sVar2 = (((regs.eax = FUN_0042e276(heap))) & 0xffff);
  return sVar2;
}
