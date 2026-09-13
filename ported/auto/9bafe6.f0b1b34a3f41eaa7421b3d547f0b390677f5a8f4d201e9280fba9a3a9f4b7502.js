// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bafe6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CARRY1, CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_009b4457 } from "./9b4457.js";
export function FUN_009bafe6(heap) {
  let uVar1 = 0;
  let bVar2 = 0;
  let bVar3 = 0;
  let in_AX = regs.eax & 0xffff;
  let bVar6 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let in_CX = regs.ecx & 0xffff;
  let cVar7 = 0;
  let in_DX = regs.edx & 0xffff;
  let sVar8 = 0;
  let unaff_EBP = regs.ebp >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  code_r0x009bb11c: {
  heap.setU32(0x009aa060, (unaff_EBP) >>> 0);
  heap.setU8(0x009aa064, (in_CX) & 0xff);
  heap.setU8(0x009aa066, (in_DX) & 0xff);
  if ((((in_AX) << 24 >> 24) | 0) == -2) {
    /* goto LAB_009bb0c3 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bafe6/LAB_009bb0c3"); return 0;
  }
  if (((((((heap.i16((unaff_EDI + 4)) + heap.i16((unaff_EDI + 8)))) << 16 >> 16) <= in_CX) || ((((in_CX + 0x500)) << 16 >> 16) <= heap.i16((unaff_EDI + 4)))) || ((((heap.i16((unaff_EDI + 6)) + heap.i16((unaff_EDI + 10)))) << 16 >> 16) <= (((in_DX + -0x14)) << 16 >> 16))) || ((((in_DX + 0x3c)) << 16 >> 16) <= heap.i16((unaff_EDI + 6)))) {
    return;
  }
  if ((((in_AX) << 24 >> 24) | 0) == -1) {
    /* goto LAB_009bb0c3 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bafe6/LAB_009bb0c3"); return 0;
  }
  heap.setU8(0x00971ef2, (0) & 0xff);
  uVar5 = ((((in_AX & 0xffdf) >>> 0)) >>> 0);
  if ((in_AX >>> 5 & 1) != 0) {
    heap.setU8(0x00971ef2, (2) & 0xff);
  }
  if ((in_AX & 0x40) == 0) {
    /* goto LAB_009bb08b — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bafe6/LAB_009bb08b"); return 0;
  }
  heap.setU8(0x00971ef2, (heap.u8(0x00971ef2) | 1) & 0xff);
  heap.setU8(0x0099ac89, (((CONCAT11(heap.u8((((0x0099ac8f) | 0) + (uVar5 & 0x1f) * 8 + 2)), heap.u8((0x0099ac8f + (uVar5 & 0x1f) * 2)))) >>> 0)) & 0xff);
  do {
    heap.setU32(0x009a200c, (0x0099ac88) >>> 0);
    LAB_009bb0c3: do {
      LAB_009bb273: {
      if ((((in_DX + 0x27)) << 16 >> 16) <= heap.i16((unaff_EDI + 6))) {
        /* goto LAB_009bb33c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bafe6/LAB_009bb33c"); return 0;
      }
      sVar8 = ((in_DX) & 0xffff);
      if ((((heap.i16((unaff_EDI + 6)) + heap.i16((unaff_EDI + 10)))) << 16 >> 16) <= (((in_DX + -0x14)) << 16 >> 16)) {
        /* goto LAB_009bb33c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bafe6/LAB_009bb33c"); return 0;
      }
      LAB_009bb0ec: bVar2 = ((heap.u8(unaff_ESI)) & 0xff);
      unaff_ESI = ((unaff_ESI + 1) >>> 0);
      in_DX = ((sVar8) & 0xffff);
      while (true) {
        if (bVar2 == 0) {
          return;
        }
        if ((bVar2 < 0x9c) && (0x8d < bVar2)) {
          break;
        }
        bVar3 = ((bVar2 - 0x20) & 0xff);
        sVar8 = ((in_DX) & 0xffff);
        if (bVar2 < 0x20) {
          if (bVar3 == 0xe5) {
            in_CX = ((heap.u8(0x009aa064)) & 0xffff);
            sVar8 = ((in_DX + 10) & 0xffff);
            if ((0xe0 < heap.u32(0x00971e84)) && (sVar8 = ((in_DX + 6) & 0xffff), heap.u32(0x00971e84) != 0x1c0)) {
              sVar8 = ((in_DX + 0x12) & 0xffff);
            }
            /* goto LAB_009bb0ec — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bafe6/LAB_009bb0ec"); return 0;
          }
          if (bVar3 == 0xe6) {
            in_CX = ((heap.u8(0x009aa064)) & 0xffff);
            sVar8 = ((in_DX + 5) & 0xffff);
            if ((0xe0 < heap.u32(0x00971e84)) && (sVar8 = ((in_DX + 3) & 0xffff), heap.u32(0x00971e84) != 0x1c0)) {
              sVar8 = ((in_DX + 9) & 0xffff);
            }
            /* goto LAB_009bb0ec — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bafe6/LAB_009bb0ec"); return 0;
          }
          bVar2 = ((heap.u8(0x009aa064)) & 0xff);
          cVar7 = (((((heap.u16(0x009aa064) >>> 8)) << 24 >> 24)) & 0xff);
          if (bVar3 == 0xe1) {
            bVar3 = ((heap.u8(unaff_ESI)) & 0xff);
            unaff_ESI = ((unaff_ESI + 1) >>> 0);
            in_CX = ((CONCAT11(cVar7 + CARRY1(bVar2, bVar3), bVar2 + bVar3)) & 0xffff);
            /* goto LAB_009bb0ec — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bafe6/LAB_009bb0ec"); return 0;
          }
          if (bVar3 == 0xf1) {
            uVar1 = ((heap.u16(unaff_ESI)) & 0xffff);
            unaff_ESI = ((unaff_ESI + 2) >>> 0);
            bVar3 = ((((uVar1) & 0xff)) & 0xff);
            bVar6 = ((((((uVar1) & 0xffff) >>> 8) & 0xff)) & 0xff);
            in_CX = ((CONCAT11(cVar7 + CARRY1(bVar2, bVar3), bVar2 + bVar3)) & 0xffff);
            sVar8 = ((CONCAT11((((heap.u16(0x009aa066) >>> 8)) << 24 >> 24) + CARRY1(heap.u8(0x009aa066), bVar6), heap.u8(0x009aa066) + bVar6)) & 0xffff);
            /* goto LAB_009bb0ec — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bafe6/LAB_009bb0ec"); return 0;
          }
          if (bVar3 == 0xe7) {
            heap.setU32(0x00971e84, (0x1c0) >>> 0);
            /* goto LAB_009bb0ec — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bafe6/LAB_009bb0ec"); return 0;
          }
          if (bVar3 == 0xe8) {
            heap.setU32(0x00971e84, (0x2a0) >>> 0);
            /* goto LAB_009bb0ec — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bafe6/LAB_009bb0ec"); return 0;
          }
          if (bVar3 == 0xe9) {
            heap.setU32(0x00971e84, (0xe0) >>> 0);
            /* goto LAB_009bb0ec — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bafe6/LAB_009bb0ec"); return 0;
          }
          if (bVar3 == 0xea) {
            heap.setU32(0x00971e84, (0) >>> 0);
            /* goto LAB_009bb0ec — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bafe6/LAB_009bb0ec"); return 0;
          }
          if (bVar3 == 0xeb) {
            heap.setU8(0x00971ef2, (heap.u8(0x00971ef2) | 2) & 0xff);
            /* goto LAB_009bb0ec — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bafe6/LAB_009bb0ec"); return 0;
          }
          if (bVar3 == 0xec) {
            heap.setU8(0x00971ef2, (heap.u8(0x00971ef2) & 0xfffd) & 0xff);
            /* goto LAB_009bb0ec — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bafe6/LAB_009bb0ec"); return 0;
          }
          if (bVar3 != 0xe2) {
            /* goto LAB_009bb0ec — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bafe6/LAB_009bb0ec"); return 0;
          }
          bVar2 = ((heap.u8(unaff_ESI)) & 0xff);
          unaff_ESI = ((unaff_ESI + 1) >>> 0);
          if ((heap.u8(0x00971ef2) & 1) == 0) {
            uVar4 = ((CONCAT11(1, heap.u8((heap.u32((0x008dc0b4) + (heap.i32((0x009aa06c + ((bVar2) >>> 0) * 4)) * 4) * 4) + 0xf9)))) & 0xffff);
            if ((heap.u8(0x00971ef2) & 2) == 0) {
              uVar4 = ((heap.u16((heap.u32((0x008dc0b4) + (heap.i32((0x009aa06c + ((bVar2) >>> 0) * 4)) * 4) * 4) + 0xf9))) & 0xffff);
            }
            heap.setU8(0x0099ac89, (CONCAT22(heap.u16(0x0099ac8b), uVar4)) & 0xff);
            heap.setU32(0x009a200c, (0x0099ac88) >>> 0);
          }
          /* goto LAB_009bb0c3 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bafe6/LAB_009bb0c3"); return 0;
        }
        if (in_CX < (((heap.i16((unaff_EDI + 4)) + heap.i16((unaff_EDI + 8)))) << 16 >> 16)) {
          break code_r0x009bb11c;
        }
        LAB_009bb33c: while (true) {
          bVar2 = ((heap.u8(unaff_ESI)) & 0xff);
          unaff_ESI = ((unaff_ESI + 1) >>> 0);
          if (bVar2 < 0x20) {
            break;
          }
          if ((bVar2 < 0x9c) && (0x8d < bVar2)) {
            break LAB_009bb273;
          }
        }
      }
      }
      uVar5 = ((((bVar2 + 0x72) >>> 0)) >>> 0);
      LAB_009bb08b: ;
    } while ((heap.u8(0x00971ef2) & 1) != 0);
    heap.setU8(0x0099ac89, (heap.u32((heap.u32(0x0093a464) + (uVar5 & 0xff) * 4))) & 0xff);
    if ((heap.u8(0x00971ef2) & 2) == 0) {
      heap.setU8(0x0099ac89, (CONCAT22((((heap.u8(0x0099ac89) >>> 0x10)) << 16 >> 16), ((heap.u8(0x0099ac89)) & 0xffff))) & 0xff);
    }
  } while (true);
  }
  bVar2 = ((((in_CX) & 0xff)) & 0xff);
  cVar7 = (((((((in_CX) & 0xffff) >>> 8)) << 24 >> 24)) & 0xff);
  if ((((in_CX + 0x1a)) << 16 >> 16) < heap.i16((unaff_EDI + 4))) {
    heap.setU32(0x009aa060, (heap.u32(0x009aa060) + 1) >>> 0);
    in_CX = ((CONCAT11(cVar7 + CARRY1(bVar2, heap.u32((0x0099a508) + (((bVar3 + heap.u32(0x00971e84)) & 0xffff)) * 4)), bVar2 + heap.u32((0x0099a508) + (((bVar3 + heap.u32(0x00971e84)) & 0xffff)) * 4))) & 0xffff);
  } else {
    uVar1 = ((heap.u16((0x0099a508 + ((bVar3 + heap.u32(0x00971e84)) & 0xffff)))) & 0xffff);
    heap.setU32(0x009a2000, (0x20000000) >>> 0);
    (regs.eax = FUN_009b4457(heap));
    heap.setU32(0x009aa060, (heap.u32(0x009aa060) + 1) >>> 0);
    in_CX = ((CONCAT11(cVar7 + CARRY1(bVar2, ((uVar1) & 0xff)), bVar2 + ((uVar1) & 0xff))) & 0xffff);
  }
  /* goto LAB_009bb0ec — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009bafe6/LAB_009bb0ec"); return 0;
}
