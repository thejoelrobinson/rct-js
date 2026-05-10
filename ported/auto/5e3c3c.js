// @manual — do not regenerate.
// Source: decompiled/c/5e3c3c.c
//
// Translator bug (same root cause as 5e3f31.js): `DAT_009a1164 += 0x5e` in
// the C means "advance the undefined4* pointer by 0x5e elements" → +0x178
// bytes. The auto-translator emits raw `+ 0x5e` (94 bytes) which corrupts
// the viewport-list stride. Verified vs binary @ 0x5e4096:
// `add dword ptr [0x9a1164], 0x178`. Hand-fix the single write at the bottom.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e3b77 } from "./5e3b77.js";
import { FUN_005e3bbf } from "./5e3bbf.js";
import { FUN_005e3f31 } from "./5e3f31.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5bd8 } from "./5e5bd8.js";
export function FUN_005e3c3c(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_stack0x00000000 = __sp + 0;
  try {
  let uVar1 = 0;
  let puVar2 = 0;
  let sVar3 = 0;
  let sVar4 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let extraout_CX_01 = 0;
  let extraout_CX_02 = 0;
  let extraout_CX_03 = 0;
  let extraout_CX_04 = 0;
  let in_ECX = regs.ecx >>> 0;
  let extraout_ECX = 0;
  let extraout_DX = 0;
  let extraout_DX_00 = 0;
  let extraout_DX_01 = 0;
  let extraout_DX_02 = 0;
  let extraout_DX_03 = 0;
  let extraout_DX_04 = 0;
  let extraout_DX_05 = 0;
  let extraout_DX_06 = 0;
  let extraout_DX_07 = 0;
  let extraout_DX_08 = 0;
  let extraout_DX_09 = 0;
  let extraout_DX_10 = 0;
  let extraout_DX_11 = 0;
  let extraout_DX_12 = 0;
  let extraout_DX_13 = 0;
  let extraout_DX_14 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let sVar7 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar8 = 0;
  let unaff_EBP = regs.ebp >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let puVar9 = 0;
  let puVar10 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let bVar11 = 0;
  let uVar12 = 0;
  LAB_005e3efb: {
  uVar6 = ((((unaff_EBX) & 0xffff)) & 0xffff);
  if (((in_ECX) << 24 >> 24) < 0) {
    uVar1 = ((in_ECX & 0x7f) >>> 0);
    in_ECX = ((in_ECX & 0xffffff7f) >>> 0);
    bVar11 = ((uVar1 == 0) & 0xff);
    (regs.eax = FUN_005e3b2b(heap));
    unaff_EDI = ((unaff_ESI) >>> 0);
    if ((((!bVar11) && (heap.i16((unaff_ESI + ((8) * 4))) < (((heap.u32(0x00971ed6) - 0x14)) << 16 >> 16))) && (-0x3c < heap.i16((unaff_ESI + ((8) * 4))))) && (heap.u16((((unaff_ESI) >>> 0) + 0x22)) < ((heap.u32(0x00971ed8) - 0x14) & 0xffff))) {
      return (regs.eax = FUN_005e3f31(heap));
    }
  }
  bVar11 = ((false) & 0xff);
  sVar3 = (((regs.eax = 0x20, regs.eax = FUN_005e3bbf(heap), regs.ecx = 0x184, regs.edx = 0x420000, regs.eax)) & 0xffff);
  sVar4 = ((extraout_DX) & 0xffff);
  if (bVar11) {
    bVar11 = ((((heap.u32(0x00971ed8) - 0x24) & 0xffff) < extraout_CX) & 0xff);
    sVar3 = (((regs.eax = 0x20, regs.eax = FUN_005e3bbf(heap), regs.ecx = 0x184, regs.edx = 0x420000, regs.eax)) & 0xffff);
    sVar4 = ((extraout_DX_00) & 0xffff);
    if (bVar11) {
      bVar11 = ((heap.u32(0x00971ed6) < uVar6) & 0xff);
      sVar3 = (((regs.eax = 0x20, regs.eax = FUN_005e3bbf(heap), regs.ecx = 0x184, regs.edx = 0x420000, regs.eax)) & 0xffff);
      sVar4 = ((extraout_DX_01) & 0xffff);
      if (bVar11) {
        bVar11 = ((((heap.u32(0x00971ed8) - 0x24) & 0xffff) < extraout_CX_00) & 0xff);
        sVar3 = (((regs.eax = 0x20, regs.eax = FUN_005e3bbf(heap), regs.ecx = 0x184, regs.edx = 0x420000, regs.eax)) & 0xffff);
        sVar4 = ((extraout_DX_02) & 0xffff);
        if (bVar11) {
          for (unaff_EDI = ((0x009a013c) >>> 0); unaff_EDI < heap.u32(0x009a1164); unaff_EDI = (((unaff_EDI + ((0x5e) * 4)) >>> 0)) >>> 0) {
            if ((heap.u16((((unaff_EDI) >>> 0) + 0x32)) & 1) == 0) {
              bVar11 = ((0xfffd < ((heap.i16((unaff_EDI + ((8) * 4))) + heap.i16((unaff_EDI + ((9) * 4)))) & 0xffff)) & 0xff);
              sVar3 = (((regs.eax = 0x20, regs.eax = FUN_005e3bbf(heap), regs.ecx = 0x184, regs.edx = 0x420000, regs.eax)) & 0xffff);
              sVar4 = ((extraout_DX_03) & 0xffff);
              if (!bVar11) {
                break LAB_005e3efb;
              }
              bVar11 = ((((heap.i16((unaff_EDI + ((8) * 4))) - uVar6) & 0xffff) < 2) & 0xff);
              sVar3 = (((regs.eax = 0x20, regs.eax = FUN_005e3bbf(heap), regs.ecx = 0x184, regs.edx = 0x420000, regs.eax)) & 0xffff);
              sVar4 = ((extraout_DX_04) & 0xffff);
              if (!bVar11) {
                break LAB_005e3efb;
              }
              bVar11 = ((0xfffd < ((heap.i16((((unaff_EDI) >>> 0) + 0x22)) + heap.i16((((unaff_EDI) >>> 0) + 0x26))) & 0xffff)) & 0xff);
              sVar3 = (((regs.eax = 0x20, regs.eax = FUN_005e3bbf(heap), regs.ecx = 0x184, regs.edx = 0x420000, regs.eax)) & 0xffff);
              sVar4 = ((extraout_DX_05) & 0xffff);
              if (!bVar11) {
                break LAB_005e3efb;
              }
              bVar11 = ((((heap.i16((((unaff_EDI) >>> 0) + 0x22)) - extraout_CX_01) & 0xffff) < 2) & 0xff);
              sVar3 = (((regs.eax = 0x20, regs.eax = FUN_005e3bbf(heap), regs.ecx = 0x184, regs.edx = 0x420000, regs.eax)) & 0xffff);
              sVar4 = ((extraout_DX_06) & 0xffff);
              if (!bVar11) {
                break LAB_005e3efb;
              }
              bVar11 = ((((heap.i16((((unaff_EDI) >>> 0) + 0x22)) + heap.i16((((unaff_EDI) >>> 0) + 0x26))) & 0xffff) < extraout_CX_02) & 0xff);
              sVar3 = (((regs.eax = 0x20, regs.eax = FUN_005e3bbf(heap), regs.ecx = 0x184, regs.edx = 0x420000, regs.eax)) & 0xffff);
              sVar4 = ((extraout_DX_07) & 0xffff);
              if (!bVar11) {
                break LAB_005e3efb;
              }
              bVar11 = ((((heap.i16((((unaff_EDI) >>> 0) + 0x22)) + heap.i16((((unaff_EDI) >>> 0) + 0x26))) & 0xffff) < extraout_CX_03) & 0xff);
              sVar3 = (((regs.eax = 0x20, regs.eax = FUN_005e3bbf(heap), regs.ecx = 0x184, regs.edx = 0x420000, regs.eax)) & 0xffff);
              sVar4 = ((extraout_DX_08) & 0xffff);
              if (!bVar11) {
                break LAB_005e3efb;
              }
              bVar11 = ((((heap.i16((unaff_EDI + ((8) * 4))) + heap.i16((unaff_EDI + ((9) * 4)))) & 0xffff) < uVar6) & 0xff);
              sVar3 = (((regs.eax = 0x20, regs.eax = FUN_005e3bbf(heap), regs.ecx = 0x184, regs.edx = 0x420000, regs.eax)) & 0xffff);
              sVar4 = ((extraout_DX_09) & 0xffff);
              if (!bVar11) {
                break LAB_005e3efb;
              }
              bVar11 = ((((heap.i16((unaff_EDI + ((8) * 4))) + heap.i16((unaff_EDI + ((9) * 4)))) & 0xffff) < uVar6) & 0xff);
              sVar3 = (((regs.eax = 0x20, regs.eax = FUN_005e3bbf(heap), regs.ecx = 0x184, regs.edx = 0x420000, regs.eax)) & 0xffff);
              sVar4 = ((extraout_DX_10) & 0xffff);
              if (!bVar11) {
                break LAB_005e3efb;
              }
            }
          }
          unaff_EDI = ((0x009a013c) >>> 0);
          do {
            if (heap.u32(0x009a1164) <= unaff_EDI) {
              sVar4 = ((0) & 0xffff);
              sVar3 = ((0x20) & 0xffff);
              do {
                unaff_EDI = ((0x009a013c) >>> 0);
                while (true) {
                  if (heap.u32(0x009a1164) <= unaff_EDI) {
                    break LAB_005e3efb;
                  }
                  if ((sVar4 == heap.i16((unaff_EDI + ((8) * 4)))) && (sVar3 == heap.i16((((unaff_EDI) >>> 0) + 0x22)))) {
                    break;
                  }
                  unaff_EDI = ((unaff_EDI + ((0x5e) * 4)) >>> 0);
                }
                sVar4 = ((sVar4 + 5) & 0xffff);
                sVar3 = ((sVar3 + 5) & 0xffff);
              } while (true);
            }
            if ((heap.u16((((unaff_EDI) >>> 0) + 0x32)) & 1) == 0) {
              bVar11 = ((0xfffd < ((heap.i16((unaff_EDI + ((8) * 4))) + heap.i16((unaff_EDI + ((9) * 4)))) & 0xffff)) & 0xff);
              sVar3 = (((regs.eax = FUN_005e3b77(heap))) & 0xffff);
              sVar4 = ((extraout_DX_11) & 0xffff);
              if (!bVar11) {
                break;
              }
              bVar11 = ((((heap.i16((unaff_EDI + ((8) * 4))) - uVar6) & 0xffff) < 2) & 0xff);
              sVar3 = (((regs.eax = FUN_005e3b77(heap))) & 0xffff);
              sVar4 = ((extraout_DX_12) & 0xffff);
              if (!bVar11) {
                break;
              }
              bVar11 = ((0xfffd < ((heap.i16((((unaff_EDI) >>> 0) + 0x22)) + heap.i16((((unaff_EDI) >>> 0) + 0x26))) & 0xffff)) & 0xff);
              sVar3 = (((regs.eax = FUN_005e3b77(heap))) & 0xffff);
              sVar4 = ((extraout_DX_13) & 0xffff);
              if (!bVar11) {
                break;
              }
              bVar11 = ((((heap.i16((((unaff_EDI) >>> 0) + 0x22)) - extraout_CX_04) & 0xffff) < 2) & 0xff);
              sVar3 = (((regs.eax = FUN_005e3b77(heap))) & 0xffff);
              sVar4 = ((extraout_DX_14) & 0xffff);
              if (!bVar11) {
                break;
              }
            }
            unaff_EDI = ((unaff_EDI + ((0x5e) * 4)) >>> 0);
          } while (true);
        }
      }
    }
  }
  }
  sVar7 = ((((unaff_EBX) << 16 >> 16) + sVar4) & 0xffff);
  if (sVar4 < 0) {
    sVar7 = ((sVar7 - sVar4) & 0xffff);
    sVar4 = ((0) & 0xffff);
  }
  if (heap.i16(0x00971ed6) < sVar7) {
    sVar4 = ((sVar4 - (sVar7 - heap.u32(0x00971ed6))) & 0xffff);
    sVar7 = ((sVar7 - (sVar7 - heap.u32(0x00971ed6))) & 0xffff);
  }
  uVar12 = ((CONCAT44(in_EDX, CONCAT22(sVar3, sVar4))) >>> 0);
  uVar8 = ((CONCAT22((((((unaff_EBX) >>> 0) >>> 0x10)) << 16 >> 16), sVar7 - sVar4)) >>> 0);
  while (true) {
    if (heap.u32(0x009a1164) < 0x009a1164) {
      break;
    }
    for (puVar10 = ((0x009a013c) >>> 0); (heap.u16((puVar10 + 0x32)) & 0x103) != 0; puVar10 = (((puVar10 + 0x178) >>> 0)) >>> 0) {
    
    }
    uVar12 = (((regs.eax = FUN_005e5bd8(heap))) >>> 0);
    in_ECX = ((extraout_ECX) >>> 0);
  }
  puVar9 = ((heap.u32(0x009a1164)) >>> 0);
  puVar2 = ((heap.u32(0x009a1164)) >>> 0);
  if ((in_ECX & 0x100) == 0) {
    if ((in_ECX & 0x200) == 0) {
      while (puVar9 != 0x009a013c && ((heap.u16((((puVar9) >>> 0) + -0x146)) >>> 1 & 1) != 0)) {
        puVar9 = ((puVar9 + ((-0x5e) * 4)) >>> 0);
      }
    }
  } else {
    for (; (puVar9 != 0x009a013c && (((heap.u16((((puVar9) >>> 0) + -0x146)) >>> 1 & 1) != 0 || ((heap.u16((((puVar9) >>> 0) + -0x146)) & 1) == 0)))); puVar9 = (((puVar9 + ((-0x5e) * 4)) >>> 0)) >>> 0) {
    
    }
  }
  while (puVar9 != puVar2) {
    heap.setU8((((puVar2) >>> 0) + 0x177), (heap.u8((((puVar2) >>> 0) + -1))) & 0xff);
    puVar2 = (((((puVar2) >>> 0) + -1)) >>> 0);
  }
  heap.setI8((puVar9 + ((0x5d) * 4)), (((in_ECX) << 24 >> 24)) & 0xff);
  heap.setU8((((puVar9) >>> 0) + 0x175), (0xff) & 0xff);
  heap.setU16((((puVar9) >>> 0) + 0x32), (0) & 0xffff);
  heap.setU16((((puVar9) >>> 0) + 0x32), (heap.u16((((puVar9) >>> 0) + 0x32)) | ((in_ECX >>> 8) & 0xffff)) & 0xffff);
  if ((in_ECX & 0x300) == 0) {
    heap.setU16((((puVar9) >>> 0) + 0x32), (heap.u16((((puVar9) >>> 0) + 0x32)) | 0x600) & 0xffff);
    (regs.eax = FUN_00452fce(heap, uVar8, ((uVar12) >>> 0), unaff_EDI, puVar9, unaff_EBP, __addr_stack0x00000000, uVar8, (((((uVar12) >>> 0) >>> 0x20)) >>> 0), in_ECX));
  }
  uVar5 = ((((((uVar12) >>> 0) >>> 0x20) >>> 0)) >>> 0);
  heap.setU16((puVar9 + ((0xc) * 4)), (0) & 0xffff);
  heap.setU32((puVar9 + (8) * 4), (((uVar12) >>> 0)) & 0xffffffff);
  heap.setU32((puVar9 + (9) * 4), (uVar8) & 0xffffffff);
  heap.setU32((puVar9 + (2) * 4), (0) & 0xffffffff);
  heap.setU32((puVar9 + (1) * 4), (uVar5) & 0xffffffff);
  heap.setU32(puVar9, (unaff_EBP) & 0xffffffff);
  heap.setU32((puVar9 + (3) * 4), (0) & 0xffffffff);
  heap.setU32((puVar9 + (4) * 4), (0) & 0xffffffff);
  heap.setU32((puVar9 + (5) * 4), (0) & 0xffffffff);
  heap.setU32((puVar9 + (6) * 4), (0) & 0xffffffff);
  heap.setU16((((puVar9) >>> 0) + 0x15a), (0) & 0xffff);
  heap.setU16((puVar9 + ((0x57) * 4)), (0) & 0xffff);
  heap.setU16((((puVar9) >>> 0) + 0x15e), (0) & 0xffff);
  heap.setU16((puVar9 + ((0x58) * 4)), (0) & 0xffff);
  heap.setU16((((puVar9) >>> 0) + 0x162), (0) & 0xffff);
  heap.setU16((puVar9 + ((0x59) * 4)), (0) & 0xffff);
  heap.setU16((((puVar9) >>> 0) + 0x166), (0) & 0xffff);
  heap.setU16((puVar9 + ((0x5a) * 4)), (0) & 0xffff);
  heap.setU16((((puVar9) >>> 0) + 0x16a), (0) & 0xffff);
  heap.setU16((puVar9 + ((0x5b) * 4)), (0) & 0xffff);
  (regs.eax = callIndirect(heap, heap.u32(puVar9), unaff_EDI, puVar9, unaff_EBP, __addr_stack0x00000000, uVar8, uVar5, in_ECX, ((uVar12) >>> 0)));
  // Hand-fixed: 0x5e undefined4-elements = 0x178 bytes (see header comment).
  heap.setU32(0x009a1164, (heap.u32(0x009a1164) + 0x178) >>> 0);
  // Hand-fix (same as 5e3f31.js): epilogue leaves ESI = new-window pointer
  // so the caller's subsequent ViewportCreate writes window+8 correctly.
  regs.esi = puVar9 >>> 0;
  return (regs.eax = FUN_005e43de(heap));
} finally {
    heap.freeFrame(4);
  }
}
