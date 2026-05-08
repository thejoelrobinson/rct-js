// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dcd40.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CARRY2, CONCAT44, SBORROW2 } from "../../runtime/ghidra-builtins.js";
export function FUN_005dcd40(heap) {
  const __sp = heap.allocFrame(60);
  const __addr_DAT_005f7104 = __sp + 0;
  const __addr_DAT_0065e7bc = __sp + 4;
  const __addr_DAT_00991f8e = __sp + 8;
  const __addr_DAT_00743b94 = __sp + 12;
  const __addr_DAT_00743ba6 = __sp + 16;
  const __addr_DAT_00743bc5 = __sp + 20;
  const __addr_DAT_00743ba2 = __sp + 24;
  const __addr_DAT_00743ba4 = __sp + 28;
  const __addr_DAT_00743c61 = __sp + 32;
  const __addr_DAT_00743bd8 = __sp + 36;
  const __addr_DAT_00743be4 = __sp + 40;
  const __addr_DAT_00743bb2 = __sp + 44;
  const __addr_DAT_0065eb18 = __sp + 48;
  const __addr_DAT_0065eb1a = __sp + 52;
  const __addr_DAT_00743b96 = __sp + 56;
  try {
  let bVar1 = 0;
  let cVar2 = 0;
  let sVar3 = 0;
  let uVar4 = 0;
  let sVar5 = 0;
  let in_EAX = 0;
  let bVar6 = 0;
  let in_CX = 0;
  let uVar7 = 0;
  let bVar10 = 0;
  let sVar8 = 0;
  let sVar9 = 0;
  let uVar11 = 0;
  let sVar12 = 0;
  let in_EDX = 0;
  let uVar13 = 0;
  let unaff_EBP = 0;
  let piVar14 = 0;
  let unaff_ESI = 0;
  let uVar15 = 0;
  let iVar16 = 0;
  let uVar17 = 0;
  if ((heap.u32((unaff_ESI + 0x48)) & 2) == 0) {
    sVar3 = in_EAX;
    if ((heap.u32((__addr_DAT_005f7104 + heap.u32(unaff_ESI + (0x31) * 4) * 8)) & 0x40) != 0) {
      uVar15 = (((in_EAX & 0xfe0) << 2) | in_CX >>> 5 & 0x7f);
      piVar14 = __addr_DAT_0065e7bc;
      do {
        uVar4 = heap.u32((__addr_DAT_00991f8e) + (uVar15 & 0x3fff) * 4);
        while (uVar4 != 0xffff) {
          uVar17 = uVar4;
          iVar16 = uVar17 * 0x100;
          if ((__addr_DAT_00743b94 + iVar16 != unaff_ESI) && (heap.u32((__addr_DAT_00743b94) + (iVar16) * 4) == '\0')) {
            uVar4 = heap.u32((__addr_DAT_00743ba6) + (uVar17 * 0x80) * 4) - in_EDX;
            if (uVar4 < 0) {
              uVar4 = -uVar4;
            }
            if ((uVar4 < 0x11) && ((heap.u32((__addr_DAT_005f7104 + heap.u32((__addr_DAT_00743bc5) + (iVar16) * 4) * 8)) & 0x40) != 0)) {
              uVar4 = sVar3 - heap.u32((__addr_DAT_00743ba2) + (uVar17 * 0x80) * 4);
              if (!SBORROW2(sVar3, heap.u32((__addr_DAT_00743ba2) + (uVar17 * 0x80) * 4))) {
                if (uVar4 < 0) {
                  uVar4 = -uVar4;
                }
                uVar7 = in_CX - heap.u32((__addr_DAT_00743ba4) + (uVar17 * 0x80) * 4);
                if (!SBORROW2(in_CX, heap.u32((__addr_DAT_00743ba4) + (uVar17 * 0x80) * 4))) {
                  if (uVar7 < 0) {
                    uVar7 = -uVar7;
                  }
                  if (!CARRY2(uVar4, uVar7)) {
                    bVar1 = heap.u32(unaff_ESI + (0xcd) * 4);
                    bVar10 = heap.u32((__addr_DAT_00743c61) + (iVar16) * 4);
                    bVar6 = bVar1;
                    if (bVar10 <= bVar1) {
                      bVar6 = bVar10;
                      bVar10 = bVar1;
                    }
                    if ((((bVar6 == bVar10) || (bVar6 != 5)) || (bVar10 != 6)) && ((uVar4 + uVar7) < (((heap.u32((unaff_ESI + 0x44)) + heap.u32((__addr_DAT_00743bd8 + iVar16))) >>> 1) * 0x1e >>> 8))) {
                      if ((heap.u32((__addr_DAT_005f7104 + heap.u32((__addr_DAT_00743bc5) + (iVar16) * 4) * 8)) & 0x4000) == 0) {
                        LAB_005dcf6f: heap.setU32((unaff_ESI + (0xc4) * 4), (heap.u32(unaff_ESI + (0xc4) * 4) + '\x01') >>> 0);
                        if (199 < heap.u32(unaff_ESI + (0xc4) * 4)) {
                          heap.setU32((unaff_ESI + (0xc4) * 4), (heap.u32(unaff_ESI + (0xc4) * 4) + -1) >>> 0);
                          if (heap.u32(unaff_ESI + (0x50) * 4) == '\0') {
                            cVar2 = heap.u32(unaff_ESI + (0x1e) * 4);
                            if (cVar2 == '\0') {
                              if (heap.u32((unaff_ESI + 0xe)) <= heap.u32((__addr_DAT_00743ba2) + (uVar17 * 0x80) * 4)) {
                                /* goto LAB_005dcf66 */ throw new Error("goto LAB_005dcf66 not supported");
                              }
                            } else {
                              if (cVar2 == '\b') {
                              if (heap.u32((__addr_DAT_00743ba4) + (uVar17 * 0x80) * 4) <= heap.u32((unaff_ESI + 0x10))) {
                                /* goto LAB_005dcf66 */ throw new Error("goto LAB_005dcf66 not supported");
                              }
                            } else {
                              if (cVar2 == '\x10') {
                              if (heap.u32((__addr_DAT_00743ba2) + (uVar17 * 0x80) * 4) <= heap.u32((unaff_ESI + 0xe))) {
                                /* goto LAB_005dcf66 */ throw new Error("goto LAB_005dcf66 not supported");
                              }
                            } else {
                              if ((cVar2 == '\x18') && (heap.u32((unaff_ESI + 0x10)) <= heap.u32((__addr_DAT_00743ba4) + (uVar17 * 0x80) * 4))) {
                              /* goto LAB_005dcf66 */ throw new Error("goto LAB_005dcf66 not supported");
                            }
                            }
                            }
                            }
                          }
                          if ((heap.u32((__addr_DAT_00743be4) + (iVar16) * 4) == '\a') && ((heap.u32(unaff_ESI + (0x50) * 4) != '\x05' && (heap.u32(unaff_ESI + (0x50) * 4) != '\x04')))) {
                            /* goto LAB_005dcf66 */ throw new Error("goto LAB_005dcf66 not supported");
                          }
                        }
                        heap.setU32((unaff_ESI + 0x48), (heap.u32((unaff_ESI + 0x48)) | 0x40) >>> 0);
                        return CONCAT44(in_EDX, in_EAX);
                      }
                      if (0x13 < ((heap.u32((__addr_DAT_00743bb2) + (iVar16) * 4) - heap.u32(unaff_ESI + (0x1e) * 4)) - 6 & 0x1f)) {
                        sVar5 = sVar3 - heap.u32((__addr_DAT_00743ba2) + (uVar17 * 0x80) * 4);
                        if (sVar5 < 0) {
                          sVar5 = -sVar5;
                        }
                        sVar8 = in_CX - heap.u32((__addr_DAT_00743ba4) + (uVar17 * 0x80) * 4);
                        if (sVar8 < 0) {
                          sVar8 = -sVar8;
                        }
                        uVar13 = heap.u32(unaff_ESI + (0x1e) * 4) + 4 >>> 3;
                        sVar12 = (sVar3 + heap.u32((__addr_DAT_0065eb18 + uVar13 * 4))) - heap.u32((__addr_DAT_00743ba2) + (uVar17 * 0x80) * 4);
                        if (sVar12 < 0) {
                          sVar12 = -sVar12;
                        }
                        sVar9 = (in_CX + heap.u32((__addr_DAT_0065eb1a + uVar13 * 4))) - heap.u32((__addr_DAT_00743ba4) + (uVar17 * 0x80) * 4);
                        if (sVar9 < 0) {
                          sVar9 = -sVar9;
                        }
                        if ((sVar12 + sVar9) < (sVar5 + sVar8)) {
                          /* goto LAB_005dcf6f */ throw new Error("goto LAB_005dcf6f not supported");
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          uVar4 = heap.u32((__addr_DAT_00743b96) + (uVar17 * 0x80) * 4);
        }
        uVar15 = (uVar15 & 0x3fff) + heap.u32(piVar14);
        piVar14 = piVar14 + 1;
      } while (piVar14 < 0x65e7dd);
      heap.setU32((unaff_ESI + (0xc4) * 4), ('\0') >>> 0);
      LAB_005dcf66: return CONCAT44(in_EDX, in_EAX);
    }
    heap.setU32((unaff_ESI + (0xc4) * 4), ('\0') >>> 0);
    uVar15 = unaff_EBP & 0xffff;
    iVar16 = uVar15 * 0x100;
    if (__addr_DAT_00743b94 + iVar16 != unaff_ESI) {
      uVar4 = sVar3 - heap.u32((__addr_DAT_00743ba2) + (uVar15 * 0x80) * 4);
      if (!SBORROW2(sVar3, heap.u32((__addr_DAT_00743ba2) + (uVar15 * 0x80) * 4))) {
        if (uVar4 < 0) {
          uVar4 = -uVar4;
        }
        uVar7 = in_CX - heap.u32((__addr_DAT_00743ba4) + (uVar15 * 0x80) * 4);
        if (!SBORROW2(in_CX, heap.u32((__addr_DAT_00743ba4) + (uVar15 * 0x80) * 4))) {
          if (uVar7 < 0) {
            uVar7 = -uVar7;
          }
          if (!CARRY2(uVar4, uVar7)) {
            uVar11 = in_EDX - heap.u32((__addr_DAT_00743ba6) + (uVar15 * 0x80) * 4);
            if (uVar11 < 0) {
              uVar11 = -uVar11;
            }
            if (((!CARRY2(uVar4 + uVar7, uVar11)) && ((uVar4 + uVar7 + uVar11) < (((heap.u32((unaff_ESI + 0x44)) + heap.u32((__addr_DAT_00743bd8 + iVar16))) >>> 1) * 0x1e >>> 8))) && (((heap.u32(unaff_ESI + (0x1e) * 4) - heap.u32((__addr_DAT_00743bb2) + (iVar16) * 4)) + 7 & 0x1f) < 0xf)) {
              return CONCAT44(in_EDX, in_EAX);
            }
          }
        }
      }
    }
  }
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(60);
  }
}
