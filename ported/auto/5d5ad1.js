// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d5ad1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005cfac7 } from "./5cfac7.js";
import { FUN_005cfc50 } from "./5cfc50.js";
import { FUN_005cfe66 } from "./5cfe66.js";
import { FUN_005d3277 } from "./5d3277.js";
export function FUN_005d5ad1(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let iVar3 = 0;
  let uVar4 = 0;
  let sVar5 = 0;
  let uVar6 = 0;
  let bVar7 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar8 = 0;
  let puVar9 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let puVar10 = 0;
  let pbVar11 = 0;
  let bVar12 = 0;
  let local_24 = 0;
  LAB_005d5ff4: {
  puVar10 = ((((in_EDX & 0xff) * 0x260)) >>> 0);
  heap.setU8(0x00656b34, (heap.u8(puVar10 + (0x887420))) & 0xff);
  heap.setU8(0x00656b35, (heap.u8(puVar10 + (0x887421))) & 0xff);
  heap.setU32(0x00656b3a, (heap.u8(puVar10 + (0x887424))) >>> 0);
  heap.setU32(0x00656b3b, (heap.u8(puVar10 + (0x887425)) & 3) >>> 0);
  uVar8 = ((0) >>> 0);
  do {
    heap.setU16((0x00656b3c + uVar8 * 2), (heap.u16((puVar10 + (((0x00887426 + uVar8)) >>> 0)))) & 0xffff);
    uVar8 = ((uVar8 + 1) >>> 0);
  } while (uVar8 < 0xc);
  heap.setU32(0x00656b54, (heap.u8(puVar10 + (0x88743e))) >>> 0);
  heap.setU8(0x00656b55, (heap.u8(puVar10 + (0x88743f))) & 0xff);
  heap.setU8(0x00656b56, (heap.u8(puVar10 + (0x887440))) & 0xff);
  heap.setU8(0x00656b57, (heap.u8(puVar10 + (0x887496))) & 0xff);
  heap.setU8(0x00656b58, (heap.u8(puVar10 + (0x887498))) & 0xff);
  heap.setU8(0x00656b59, (heap.u8(puVar10 + (0x887499))) & 0xff);
  heap.setU8(0x00656b5a, (heap.u8(puVar10 + (0x88749e))) & 0xff);
  heap.setU8(0x00656b5b, (heap.u8(puVar10 + (0x88749f))) & 0xff);
  heap.setU8(0x00656b5c, (heap.u8(puVar10 + (0x8874a0))) & 0xff);
  heap.setU8(0x00656b5d, (((heap.u32((puVar10 + 0x8874a8)) >>> 0x10) & 0xff)) & 0xff);
  heap.setU8(0x00656b5e, (((heap.u32((puVar10 + 0x8874ac)) >>> 0x10) & 0xff)) & 0xff);
  uVar8 = ((0) >>> 0);
  iVar3 = ((0) >>> 0);
  do {
    iVar3 = ((iVar3 + heap.i32((puVar10 + (((0x008874b4 + uVar8 * 4)) >>> 0)))) >>> 0);
    uVar8 = ((uVar8 + 1) >>> 0);
  } while (uVar8 < 4);
  heap.setU8(0x00656b5f, (((((iVar3) >>> 0) >>> 0x10) & 0xffff)) & 0xff);
  heap.setU8(0x00656b61, (((heap.i16((puVar10 + 0x8874cc)) >>> 5) & 0xff)) & 0xff);
  heap.setU8(0x00656b62, (((heap.i16((puVar10 + 0x8874ce)) >>> 5) & 0xff)) & 0xff);
  heap.setU8(0x00656b63, (((heap.i16((puVar10 + 0x8874d0)) >>> 5) & 0xff)) & 0xff);
  heap.setU8(0x00656b64, (heap.u8(puVar10 + (0x8874e4))) & 0xff);
  heap.setU8(0x00656b65, (heap.u8(puVar10 + (0x8874e5))) & 0xff);
  heap.setU8(0x00656b66, (heap.u8(puVar10 + (0x8874e7))) & 0xff);
  heap.setU8(0x00656b67, (((heap.u16((puVar10 + 0x887510)) / 10) & 0xff)) & 0xff);
  heap.setU8(0x00656b68, (((heap.u16((puVar10 + 0x887512)) / 10) & 0xff)) & 0xff);
  heap.setU8(0x00656b69, (((heap.u16((puVar10 + 0x887514)) / 10) & 0xff)) & 0xff);
  heap.setU8(0x00656b6a, (heap.u16((puVar10 + 0x887552))) & 0xff);
  heap.setU8(0x00656b36, (0) & 0xff);
  puVar9 = ((0x00656b6c) >>> 0);
  do {
    heap.setU32(puVar9, (0) & 0xffffffff);
    puVar9 = ((puVar9 + 1) >>> 0);
  } while (puVar9 < 0x00658aae);
  if (heap.u8(0x00656b34) == 20) {
    local_24 = ((((in_EDX) & 0xff)) & 0xff);
    uVar6 = ((((local_24) & 0xffff)) & 0xffff);
    uVar2 = ((0) & 0xffff);
    uVar4 = ((0) & 0xffff);
    do {
      do {
        puVar10 = ((heap.u32((0x00971ef4) + (((((uVar4 << 7 | uVar4 >>> 9 | uVar2) & 0xffff) >>> 5 | (uVar4 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
        do {
          uVar6 = ((CONCAT11(heap.u8(puVar10), ((uVar6) << 24 >> 24)) & 0x3cff) & 0xffff);
          if (((((uVar6 >>> 8)) << 24 >> 24) == 8) && (((uVar6) << 24 >> 24) == heap.u8(puVar10 + (7)))) {
            puVar10 = ((0x00656b6c) >>> 0);
            heap.setU32(0x006522c9, (uVar2) >>> 0);
            heap.setU32(0x006522cb, (uVar4) >>> 0);
            /* goto LAB_005d5e6e — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d5ad1/LAB_005d5e6e"); return 0;
          }
          pbVar11 = ((puVar10 + 1) >>> 0);
          puVar10 = ((puVar10 + 8) >>> 0);
        } while ((heap.u8(pbVar11) & 0x80) == 0);
        uVar2 = ((uVar2 + 0x20) & 0xffff);
      } while (uVar2 < 0x1000);
      uVar2 = ((0) & 0xffff);
      uVar4 = ((uVar4 + 0x20) & 0xffff);
    } while (uVar4 < 0x1000);
  } else {
    (regs.eax = FUN_005d3277(heap));
    bVar12 = (((unaff_ESI | 0) != -1) & 0xff);
    if ((unaff_ESI | 0) != -1) {
      (regs.eax = FUN_005cfc50(heap));
      if (!bVar12) {
        (regs.eax = FUN_005cfc50(heap));
      }
      bVar12 = ((false) & 0xff);
      (regs.eax = FUN_005cfe66(heap));
      if (!bVar12) {
        heap.setU8(0x00656b6c, (heap.u8(puVar10 + (4))) & 0xff);
        if (heap.u8(0x00656b6c) == 40) {
          heap.setU8(0x00656b36, (heap.u8(0x00656b36) | 0x80) & 0xff);
        }
        if (heap.u8(0x00656b6c) == 41) {
          heap.setU8(0x00656b36, (heap.u8(0x00656b36) | 0x80) & 0xff);
        }
        if (heap.u8(0x00656b6c) == 52) {
          heap.setU8(0x00656b36, (heap.u8(0x00656b36) | 0x20000) & 0xff);
        }
        if (heap.u8(0x00656b6c) == 53) {
          heap.setU8(0x00656b36, (heap.u8(0x00656b36) | 0x20000) & 0xff);
        }
        if (heap.u8(0x00656b6c) == 54) {
          heap.setU8(0x00656b36, (heap.u8(0x00656b36) | 0x20000) & 0xff);
        }
        if (heap.u8(0x00656b6c) == 55) {
          heap.setU8(0x00656b36, (heap.u8(0x00656b36) | 0x20000) & 0xff);
        }
        if (heap.u8(0x00656b6c) == 56) {
          heap.setU8(0x00656b36, (heap.u8(0x00656b36) | 0x40000) & 0xff);
        }
        if (heap.u8(0x00656b6c) == 57) {
          heap.setU8(0x00656b36, (heap.u8(0x00656b36) | 0x40000) & 0xff);
        }
        if (heap.u8(0x00656b6c) == 58) {
          heap.setU8(0x00656b36, (heap.u8(0x00656b36) | 0x80000) & 0xff);
        }
        if (heap.u8(0x00656b6c) == 59) {
          heap.setU8(0x00656b36, (heap.u8(0x00656b36) | 0x80000) & 0xff);
        }
        if (heap.u8(0x00656b6c) == 60) {
          heap.setU8(0x00656b36, (heap.u8(0x00656b36) | 0x80000) & 0xff);
        }
        if (heap.u8(0x00656b6c) == 61) {
          heap.setU8(0x00656b36, (heap.u8(0x00656b36) | 0x80000) & 0xff);
        }
        if (heap.u8(0x00656b6c) == 117) {
          heap.setU8(0x00656b36, (heap.u8(0x00656b36) | 0x8000000) & 0xff);
        }
        uVar2 = ((CONCAT11(((heap.u8(puVar10 + (5))) & 0xff) >>> 4, heap.u8(puVar10)) & 0xff80) & 0xffff);
        heap.setU8(0x00656b6d, (((uVar2) & 0xff) | ((uVar2 >>> 8) & 0xff)) & 0xff);
        bVar12 = ((false) & 0xff);
        (regs.eax = FUN_005cfac7(heap));
        if (!bVar12) {
          (regs.eax = FUN_005cfe66(heap));
        }
        heap.setU8(0x00656b6e, (0xff) & 0xff);
        return 1;
      }
    }
  }
  return 1;
  while (true) {
    uVar2 = ((0) & 0xffff);
    uVar4 = ((uVar4 + 0x20) & 0xffff);
    if (0xfff < uVar4) {
      break;
    }
    LAB_005d5e6e: do {
      puVar9 = ((heap.u32((0x00971ef4) + (((((uVar4 << 7 | uVar4 >>> 9 | uVar2) & 0xffff) >>> 5 | (uVar4 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
      do {
        uVar6 = ((CONCAT11(heap.u8(puVar9), ((uVar6) << 24 >> 24)) & 0x3cff) & 0xffff);
        bVar7 = ((((uVar6) & 0xff)) & 0xff);
        if (((((uVar6 >>> 8)) << 24 >> 24) == 8) && (bVar7 == heap.u8(puVar9 + (7)))) {
          uVar1 = ((heap.u16((puVar9 + 5))) & 0xffff);
          sVar5 = ((uVar4 - heap.u32(0x006522cb)) & 0xffff);
          heap.setU32(puVar10, (((((((uVar2 - heap.u32(0x006522c9))) << 16 >> 16) >>> 5)) << 24 >> 24)) & 0xffffffff);
          heap.setU8((puVar10 + (1)), ((((sVar5 >>> 5)) << 24 >> 24)) & 0xff);
          heap.setU16((puVar10 + 2), (uVar1) & 0xffff);
          puVar10 = ((puVar10 + 4) >>> 0);
          if (0x658aa1 < puVar10) {
            break LAB_005d5ff4;
          }
        }
        pbVar11 = ((puVar9 + 1) >>> 0);
        puVar9 = ((puVar9 + 8) >>> 0);
      } while ((heap.u8(pbVar11) & 0x80) == 0);
      uVar2 = ((uVar2 + 0x20) & 0xffff);
    } while (uVar2 < 0x1000);
  }
  uVar2 = ((heap.u32((0x00887462) + (((bVar7) >>> 0) * 0x130) * 4)) & 0xffff);
  if (uVar2 != 0xffff) {
    uVar4 = (((uVar2 & 0xff) * 0x20) & 0xffff);
    uVar6 = (((uVar2 >>> 8) * 0x20) & 0xffff);
    for (pbVar11 = ((heap.u32((0x00971ef4) + ((((((uVar2 >>> 8) << 0xc | uVar4) & 0xffff) >>> 5 | (uVar6 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0); (((heap.u8(pbVar11) & 0x3c) != 0x10 || (heap.u8(pbVar11 + (4)) != 0)) || (bVar7 != heap.u8(pbVar11 + (7)))); pbVar11 = (((pbVar11 + 8) >>> 0)) >>> 0) {
    
    }
    heap.setU8((puVar10 + (2)), (heap.u8(pbVar11) & 3) & 0xff);
    heap.setU8((puVar10 + (3)), (8) & 0xff);
    sVar5 = ((uVar6 - heap.u32(0x006522cb)) & 0xffff);
    heap.setU32(puVar10, (((((((uVar4 - heap.u32(0x006522c9))) << 16 >> 16) >>> 5)) << 24 >> 24)) & 0xffffffff);
    heap.setU8((puVar10 + (1)), ((((sVar5 >>> 5)) << 24 >> 24)) & 0xff);
    uVar2 = ((heap.u32((0x0088746a) + (((bVar7) >>> 0) * 0x130) * 4)) & 0xffff);
    if (uVar2 != 0xffff) {
      uVar4 = (((uVar2 & 0xff) * 0x20) & 0xffff);
      uVar6 = (((uVar2 >>> 8) * 0x20) & 0xffff);
      for (pbVar11 = ((heap.u32((0x00971ef4) + ((((((uVar2 >>> 8) << 0xc | uVar4) & 0xffff) >>> 5 | (uVar6 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0); (((heap.u8(pbVar11) & 0x3c) != 0x10 || (heap.u8(pbVar11 + (4)) != 1)) || (bVar7 != heap.u8(pbVar11 + (7)))); pbVar11 = (((pbVar11 + 8) >>> 0)) >>> 0) {
      
      }
      heap.setU8((puVar10 + (6)), (heap.u8(pbVar11) & 3) & 0xff);
      heap.setU8((puVar10 + (7)), (0x80) & 0xff);
      sVar5 = ((uVar6 - heap.u32(0x006522cb)) & 0xffff);
      heap.setU8((puVar10 + (4)), (((((((uVar4 - heap.u32(0x006522c9))) << 16 >> 16) >>> 5)) << 24 >> 24)) & 0xff);
      heap.setU8((puVar10 + (5)), ((((sVar5 >>> 5)) << 24 >> 24)) & 0xff);
      heap.setU32((puVar10 + 8), (0) & 0xffffffff);
      return 1;
    }
  }
  }
  return 1;
}
