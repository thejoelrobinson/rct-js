// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dcd40.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CARRY2, CONCAT44, SBORROW2 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_005dcd40(heap) {
  let bVar1 = 0;
  let cVar2 = 0;
  let sVar3 = 0;
  let uVar4 = 0;
  let sVar5 = 0;
  let in_EAX = regs.eax >>> 0;
  let bVar6 = 0;
  let in_CX = regs.ecx & 0xffff;
  let uVar7 = 0;
  let bVar10 = 0;
  let sVar8 = 0;
  let sVar9 = 0;
  let uVar11 = 0;
  let sVar12 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar13 = 0;
  let unaff_EBP = regs.ebp >>> 0;
  let piVar14 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar15 = 0;
  let iVar16 = 0;
  let uVar17 = 0;
  if ((heap.u16((unaff_ESI + 0x48)) & 2) == 0) {
    sVar3 = ((((in_EAX) << 16 >> 16)) & 0xffff);
    if ((heap.u16((0x005f7104 + ((((heap.i8(unaff_ESI + (0x31))) & 0xff)) >>> 0) * 8)) & 0x40) != 0) {
      uVar15 = (((((((in_EAX & 0xfe0) << 2) & 0xffff) | in_CX >>> 5 & 0x7f) >>> 0)) >>> 0);
      piVar14 = ((0x0065e7bc) >>> 0);
      do {
        uVar4 = ((heap.u32((0x00991f8e) + (uVar15 & 0x3fff) * 4)) & 0xffff);
        while (uVar4 != 0xffff) {
          uVar17 = ((((uVar4) >>> 0)) >>> 0);
          iVar16 = ((uVar17 * 0x100) >>> 0);
          if ((0x00743b94 + iVar16 != unaff_ESI) && (heap.u32((0x00743b94) + (iVar16) * 4) == 0)) {
            uVar4 = ((heap.u32((0x00743ba6) + (uVar17 * 0x80) * 4) - ((in_EDX) << 16 >> 16)) & 0xffff);
            if (((uVar4) << 16 >> 16) < 0) {
              uVar4 = ((-uVar4) & 0xffff);
            }
            if ((uVar4 < 0x11) && ((heap.u16((0x005f7104 + heap.u32(((0x00743bc5) >>> 0) + (iVar16) * 4) * 8)) & 0x40) != 0)) {
              uVar4 = ((sVar3 - heap.u32((0x00743ba2) + (uVar17 * 0x80) * 4)) & 0xffff);
              if (!SBORROW2(sVar3, heap.u32((0x00743ba2) + (uVar17 * 0x80) * 4))) {
                if (((uVar4) << 16 >> 16) < 0) {
                  uVar4 = ((-uVar4) & 0xffff);
                }
                uVar7 = ((in_CX - heap.u32((0x00743ba4) + (uVar17 * 0x80) * 4)) & 0xffff);
                if (!SBORROW2(in_CX, heap.u32((0x00743ba4) + (uVar17 * 0x80) * 4))) {
                  if (((uVar7) << 16 >> 16) < 0) {
                    uVar7 = ((-uVar7) & 0xffff);
                  }
                  if (!CARRY2(uVar4, uVar7)) {
                    bVar1 = ((heap.i8(unaff_ESI + (0xcd))) & 0xff);
                    bVar10 = ((heap.u32((0x00743c61) + (iVar16) * 4)) & 0xff);
                    bVar6 = ((bVar1) & 0xff);
                    if (bVar10 <= bVar1) {
                      bVar6 = ((bVar10) & 0xff);
                      bVar10 = ((bVar1) & 0xff);
                    }
                    if ((((bVar6 == bVar10) || (bVar6 != 5)) || (bVar10 != 6)) && (((uVar4 + uVar7) & 0xffff) < ((((((heap.i16((unaff_ESI + 0x44)) + heap.i16((0x00743bd8 + iVar16))) & 0xffff) >>> 1) >>> 0) * 0x1e >>> 8) & 0xffff))) {
                      if ((heap.u16((0x005f7104 + heap.u32(((0x00743bc5) >>> 0) + (iVar16) * 4) * 8)) & 0x4000) == 0) {
                        LAB_005dcf6f: heap.setI8((unaff_ESI + (0xc4)), (heap.i8(unaff_ESI + (0xc4)) + 1) & 0xff);
                        if (199 < ((heap.i8(unaff_ESI + (0xc4))) & 0xff)) {
                          heap.setI8((unaff_ESI + (0xc4)), (heap.i8(unaff_ESI + (0xc4)) + -1) & 0xff);
                          if (heap.i8(unaff_ESI + (0x50)) == 0) {
                            cVar2 = ((heap.i8(unaff_ESI + (0x1e))) & 0xff);
                            if (cVar2 == 0) {
                              if (heap.i16((unaff_ESI + 0xe)) <= ((heap.u32((0x00743ba2) + (uVar17 * 0x80) * 4)) << 16 >> 16)) {
                                /* goto LAB_005dcf66 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dcd40/LAB_005dcf66"); return 0;
                              }
                            } else {
                              if (cVar2 == 8) {
                              if (((heap.u32((0x00743ba4) + (uVar17 * 0x80) * 4)) << 16 >> 16) <= heap.i16((unaff_ESI + 0x10))) {
                                /* goto LAB_005dcf66 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dcd40/LAB_005dcf66"); return 0;
                              }
                            } else {
                              if (cVar2 == 16) {
                              if (((heap.u32((0x00743ba2) + (uVar17 * 0x80) * 4)) << 16 >> 16) <= heap.i16((unaff_ESI + 0xe))) {
                                /* goto LAB_005dcf66 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dcd40/LAB_005dcf66"); return 0;
                              }
                            } else {
                              if ((cVar2 == 24) && (heap.i16((unaff_ESI + 0x10)) <= ((heap.u32((0x00743ba4) + (uVar17 * 0x80) * 4)) << 16 >> 16))) {
                              /* goto LAB_005dcf66 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dcd40/LAB_005dcf66"); return 0;
                            }
                            }
                            }
                            }
                          }
                          if ((heap.u32((0x00743be4) + (iVar16) * 4) == NaN) && ((heap.i8(unaff_ESI + (0x50)) != 5 && (heap.i8(unaff_ESI + (0x50)) != 4)))) {
                            return 1;
                          }
                        }
                        heap.setU16((unaff_ESI + 0x48), (heap.u16((unaff_ESI + 0x48)) | 0x40) & 0xffff);
                        return 1;
                      }
                      if (0x13 < ((heap.u32((0x00743bb2) + (iVar16) * 4) - heap.i8(unaff_ESI + (0x1e))) - 6 & 0x1f)) {
                        sVar5 = ((sVar3 - heap.u32((0x00743ba2) + (uVar17 * 0x80) * 4)) & 0xffff);
                        if (sVar5 < 0) {
                          sVar5 = ((-sVar5) & 0xffff);
                        }
                        sVar8 = ((in_CX - heap.u32((0x00743ba4) + (uVar17 * 0x80) * 4)) & 0xffff);
                        if (sVar8 < 0) {
                          sVar8 = ((-sVar8) & 0xffff);
                        }
                        uVar13 = ((((heap.i8(unaff_ESI + (0x1e))) & 0xff) + 4 >>> 3) >>> 0);
                        sVar12 = (((sVar3 + heap.i16((0x0065eb18 + uVar13 * 4))) - heap.u32((0x00743ba2) + (uVar17 * 0x80) * 4)) & 0xffff);
                        if (sVar12 < 0) {
                          sVar12 = ((-sVar12) & 0xffff);
                        }
                        sVar9 = (((in_CX + heap.i16((0x0065eb1a + uVar13 * 4))) - heap.u32((0x00743ba4) + (uVar17 * 0x80) * 4)) & 0xffff);
                        if (sVar9 < 0) {
                          sVar9 = ((-sVar9) & 0xffff);
                        }
                        if (((sVar12 + sVar9) & 0xffff) < ((sVar5 + sVar8) & 0xffff)) {
                          /* goto LAB_005dcf6f — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dcd40/LAB_005dcf6f"); return 0;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          uVar4 = ((heap.u32((0x00743b96) + (uVar17 * 0x80) * 4)) & 0xffff);
        }
        uVar15 = (((uVar15 & 0x3fff) + heap.i32(piVar14)) >>> 0);
        piVar14 = ((piVar14 + ((1) * 4)) >>> 0);
      } while (piVar14 < 0x65e7dd);
      heap.setI8((unaff_ESI + (0xc4)), (0) & 0xff);
      LAB_005dcf66: return 1;
    }
    heap.setI8((unaff_ESI + (0xc4)), (0) & 0xff);
    uVar15 = ((unaff_EBP & 0xffff) >>> 0);
    iVar16 = ((uVar15 * 0x100) >>> 0);
    if (0x00743b94 + iVar16 != unaff_ESI) {
      uVar4 = ((sVar3 - heap.u32((0x00743ba2) + (uVar15 * 0x80) * 4)) & 0xffff);
      if (!SBORROW2(sVar3, heap.u32((0x00743ba2) + (uVar15 * 0x80) * 4))) {
        if (((uVar4) << 16 >> 16) < 0) {
          uVar4 = ((-uVar4) & 0xffff);
        }
        uVar7 = ((in_CX - heap.u32((0x00743ba4) + (uVar15 * 0x80) * 4)) & 0xffff);
        if (!SBORROW2(in_CX, heap.u32((0x00743ba4) + (uVar15 * 0x80) * 4))) {
          if (((uVar7) << 16 >> 16) < 0) {
            uVar7 = ((-uVar7) & 0xffff);
          }
          if (!CARRY2(uVar4, uVar7)) {
            uVar11 = ((((in_EDX) << 16 >> 16) - heap.u32((0x00743ba6) + (uVar15 * 0x80) * 4)) & 0xffff);
            if (((uVar11) << 16 >> 16) < 0) {
              uVar11 = ((-uVar11) & 0xffff);
            }
            if (((!CARRY2(uVar4 + uVar7, uVar11)) && (((uVar4 + uVar7 + uVar11) & 0xffff) < ((((((heap.i16((unaff_ESI + 0x44)) + heap.i16((0x00743bd8 + iVar16))) & 0xffff) >>> 1) >>> 0) * 0x1e >>> 8) & 0xffff))) && (((heap.i8(unaff_ESI + (0x1e)) - heap.u32((0x00743bb2) + (iVar16) * 4)) + 7 & 0x1f) < 0xf)) {
              return 1;
            }
          }
        }
      }
    }
  }
  return 1;
}
