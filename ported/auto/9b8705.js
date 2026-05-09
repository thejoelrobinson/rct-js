// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b8705.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_009b8705(heap) {
  let bVar1 = 0;
  let iVar2 = 0;
  let bVar3 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let sVar6 = 0;
  let uVar9 = 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar10 = 0;
  let unaff_EBP = regs.ebp >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let pbVar11 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let pbVar12 = 0;
  iVar2 = ((heap.u32(0x009a200c)) >>> 0);
  bVar3 = ((((((in_EAX) >>> 0) >>> 8) & 0xff)) & 0xff);
  sVar6 = ((((in_EDX) << 16 >> 16)) & 0xffff);
  if ((unaff_EBX & 0x20000000) == 0) {
    if ((unaff_EBX & 0x40000000) == 0) {
      if ((heap.u32(0x009a201c) & 1) == 0) {
        return;
      }
      bVar3 = ((bVar3 >>> 2) & 0xff);
      if (bVar3 != 0) {
        uVar4 = ((heap.u32(0x009a2028) + sVar6) & 0xffff);
        uVar5 = ((heap.u32(0x009a2028) & 3) & 0xffff);
        if (heap.u32(0x009a2028) >>> 2 != 0) {
          uVar10 = ((((heap.u32(0x009a2028) >>> 2) >>> 0)) >>> 0);
          uVar7 = ((uVar10) >>> 0);
          LAB_009b8843: do {
            if (heap.u8(unaff_ESI) != 0) {
              heap.setU32(unaff_EDI, (heap.u8(unaff_ESI)) & 0xffffffff);
            }
            sVar6 = ((((uVar7) << 16 >> 16)) & 0xffff);
            pbVar11 = ((unaff_ESI + 4) >>> 0);
            pbVar12 = ((unaff_EDI + 1) >>> 0);
            if (sVar6 != 1) {
              bVar1 = ((heap.u8(unaff_ESI + (4))) & 0xff);
              if (bVar1 != 0) {
                heap.setU8((unaff_EDI + (1)), (bVar1) & 0xff);
              }
              pbVar11 = ((unaff_ESI + 8) >>> 0);
              pbVar12 = ((unaff_EDI + 2) >>> 0);
              if (sVar6 != 2) {
                bVar1 = ((heap.u8(unaff_ESI + (8))) & 0xff);
                if (bVar1 != 0) {
                  heap.setU8((unaff_EDI + (2)), (bVar1) & 0xff);
                }
                pbVar11 = ((unaff_ESI + 0xc) >>> 0);
                pbVar12 = ((unaff_EDI + 3) >>> 0);
                if (sVar6 != 3) {
                  bVar1 = ((heap.u8(unaff_ESI + (0xc))) & 0xff);
                  unaff_ESI = ((unaff_ESI + 0x10) >>> 0);
                  if (bVar1 != 0) {
                    heap.setU8((unaff_EDI + (3)), (bVar1) & 0xff);
                  }
                  unaff_EDI = ((unaff_EDI + 4) >>> 0);
                  uVar7 = ((((sVar6 - 4) >>> 0)) >>> 0);
                  pbVar11 = ((unaff_ESI) >>> 0);
                  pbVar12 = ((unaff_EDI) >>> 0);
                  if (((sVar6 - 4) & 0xffff) != 0) {
                    /* goto LAB_009b8843 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b8705/LAB_009b8843"); return 0;
                  }
                }
              }
            }
            unaff_ESI = ((pbVar11 + in_EDX + ((uVar4) >>> 0) * 3 + ((uVar5) >>> 0)) >>> 0);
            unaff_EDI = ((pbVar12 + (unaff_EBP - uVar10)) >>> 0);
            bVar3 = ((bVar3 - 1) & 0xff);
            uVar7 = ((uVar10) >>> 0);
          } while (bVar3 != 0);
        }
      }
    } else {
      if (((heap.u32(0x009a201c) & 1) != 0) && (bVar3 >>> 2 != 0)) {
      uVar4 = ((heap.u32(0x009a2028) + sVar6) & 0xffff);
      uVar5 = ((heap.u32(0x009a2028) & 3) & 0xffff);
      if (heap.u32(0x009a2028) >>> 2 != 0) {
        heap.setU32(0x009a2028, (CONCAT22(heap.u16(0x009a2028), heap.u32(0x009a2028) >>> 2)) >>> 0);
        iVar8 = (((((bVar3 >>> 2) - 1) >>> 0) << 0x10) >>> 0);
        do {
          iVar8 = ((CONCAT22((((((iVar8) >>> 0) >>> 0x10)) << 16 >> 16), heap.u32(0x009a2028))) >>> 0);
          do {
            if (heap.u8(unaff_ESI) != 0) {
              heap.setU32(unaff_EDI, (heap.u8((heap.u32(unaff_EDI) + iVar2))) & 0xffffffff);
            }
            pbVar12 = ((unaff_EDI + 1) >>> 0);
            sVar6 = ((((iVar8) << 16 >> 16)) & 0xffff);
            uVar9 = ((((((iVar8) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
            iVar8 = ((CONCAT22(uVar9, sVar6 + -1)) >>> 0);
            pbVar11 = ((unaff_ESI + 4) >>> 0);
            if ((((sVar6 + -1)) << 16 >> 16) == 0) {
              break;
            }
            if (heap.u8(unaff_ESI + (4)) != 0) {
              heap.setU32(pbVar12, (heap.u8((heap.u32(pbVar12) + iVar2))) & 0xffffffff);
            }
            pbVar12 = ((unaff_EDI + 2) >>> 0);
            iVar8 = ((CONCAT22(uVar9, sVar6 + -2)) >>> 0);
            pbVar11 = ((unaff_ESI + 8) >>> 0);
            if ((((sVar6 + -2)) << 16 >> 16) == 0) {
              break;
            }
            pbVar11 = ((unaff_ESI + 0xc) >>> 0);
            if (heap.u8(unaff_ESI + (8)) != 0) {
              heap.setU32(pbVar12, (heap.u8((heap.u32(pbVar12) + iVar2))) & 0xffffffff);
            }
            pbVar12 = ((unaff_EDI + 3) >>> 0);
            iVar8 = ((CONCAT22(uVar9, sVar6 + -3)) >>> 0);
            if ((((sVar6 + -3)) << 16 >> 16) == 0) {
              break;
            }
            unaff_ESI = ((unaff_ESI + 0x10) >>> 0);
            if (heap.u8(pbVar11) != 0) {
              heap.setU32(pbVar12, (heap.u8((heap.u32(pbVar12) + iVar2))) & 0xffffffff);
            }
            unaff_EDI = ((unaff_EDI + 4) >>> 0);
            iVar8 = ((CONCAT22(uVar9, sVar6 + -4)) >>> 0);
            pbVar11 = ((unaff_ESI) >>> 0);
            pbVar12 = ((unaff_EDI) >>> 0);
          } while ((((sVar6 + -4)) << 16 >> 16) != 0);
          unaff_ESI = ((pbVar11 + in_EDX + ((uVar4) >>> 0) * 3 + ((uVar5) >>> 0)) >>> 0);
          unaff_EDI = ((pbVar12 + (unaff_EBP - heap.u32(0x009a2028))) >>> 0);
          iVar8 = ((iVar8 + -0x10000) >>> 0);
          if (iVar8 < 0) {
            return;
          }
        } while (true);
      }
    }
    }
  } else {
    if ((heap.u32(0x009a201c) & 1) == 0) {
      return;
    }
    if (bVar3 >>> 2 != 0) {
      uVar4 = ((heap.u32(0x009a2028) + sVar6) & 0xffff);
      uVar5 = ((heap.u32(0x009a2028) & 3) & 0xffff);
      if (heap.u32(0x009a2028) >>> 2 != 0) {
        heap.setU32(0x009a2028, (CONCAT22(heap.u16(0x009a2028), heap.u32(0x009a2028) >>> 2)) >>> 0);
        iVar8 = (((((bVar3 >>> 2) - 1) >>> 0) << 0x10) >>> 0);
        do {
          iVar8 = ((CONCAT22((((((iVar8) >>> 0) >>> 0x10)) << 16 >> 16), heap.u32(0x009a2028))) >>> 0);
          do {
            if (heap.u8((heap.u32(unaff_ESI) + iVar2)) != 0) {
              heap.setU32(unaff_EDI, (heap.u8((heap.u32(unaff_ESI) + iVar2))) & 0xffffffff);
            }
            sVar6 = ((((iVar8) << 16 >> 16)) & 0xffff);
            uVar9 = ((((((iVar8) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
            iVar8 = ((CONCAT22(uVar9, sVar6 + -1)) >>> 0);
            pbVar11 = ((unaff_ESI + 4) >>> 0);
            pbVar12 = ((unaff_EDI + 1) >>> 0);
            if ((((sVar6 + -1)) << 16 >> 16) == 0) {
              break;
            }
            bVar3 = ((heap.u8((((heap.u8(unaff_ESI + (4))) >>> 0) + iVar2))) & 0xff);
            if (bVar3 != 0) {
              heap.setU8((unaff_EDI + (1)), (bVar3) & 0xff);
            }
            iVar8 = ((CONCAT22(uVar9, sVar6 + -2)) >>> 0);
            pbVar11 = ((unaff_ESI + 8) >>> 0);
            pbVar12 = ((unaff_EDI + 2) >>> 0);
            if ((((sVar6 + -2)) << 16 >> 16) == 0) {
              break;
            }
            pbVar11 = ((unaff_ESI + 0xc) >>> 0);
            bVar3 = ((heap.u8((((heap.u8(unaff_ESI + (8))) >>> 0) + iVar2))) & 0xff);
            if (bVar3 != 0) {
              heap.setU8((unaff_EDI + (2)), (bVar3) & 0xff);
            }
            iVar8 = ((CONCAT22(uVar9, sVar6 + -3)) >>> 0);
            pbVar12 = ((unaff_EDI + 3) >>> 0);
            if ((((sVar6 + -3)) << 16 >> 16) == 0) {
              break;
            }
            unaff_ESI = ((unaff_ESI + 0x10) >>> 0);
            bVar3 = ((heap.u8((heap.u32(pbVar11) + iVar2))) & 0xff);
            if (bVar3 != 0) {
              heap.setU8((unaff_EDI + (3)), (bVar3) & 0xff);
            }
            unaff_EDI = ((unaff_EDI + 4) >>> 0);
            iVar8 = ((CONCAT22(uVar9, sVar6 + -4)) >>> 0);
            pbVar11 = ((unaff_ESI) >>> 0);
            pbVar12 = ((unaff_EDI) >>> 0);
          } while ((((sVar6 + -4)) << 16 >> 16) != 0);
          unaff_ESI = ((pbVar11 + in_EDX + ((uVar4) >>> 0) * 3 + ((uVar5) >>> 0)) >>> 0);
          unaff_EDI = ((pbVar12 + (unaff_EBP - heap.u32(0x009a2028))) >>> 0);
          iVar8 = ((iVar8 + -0x10000) >>> 0);
          if (iVar8 < 0) {
            return;
          }
        } while (true);
      }
    }
  }
  return;
}
