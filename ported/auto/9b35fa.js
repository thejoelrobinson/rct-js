// @manual — do not regenerate.
// HAND-FIX (Phase R+4, RLE byte-store): translator emitted heap.setU32(ptr, byte & 0xffffffff)
// for C-source `*pbVar = *src;` where pbVar is a byte-pointer in RLE-decode/blitter loops.
// Each iteration advances ptr by 1 but the setU32 was writing 4 bytes — corrupting the next
// 3 bytes in the row with zero, then they get overwritten by subsequent iterations EXCEPT
// for the last 3 bytes of each run which stayed zero, and the 3 bytes immediately past the
// run end which also got zeroed. In the RLE-decompress scratchpad at 0x9a2032, downstream
// back-references then copied that corruption into the visible sprite. Fixed by switching
// the per-pixel write to heap.setU8(..., ... & 0xff).
//
// HAND-FIX (Phase Track-C pick-blit, register-init-at-call-site): Ghidra dropped the ESI
// (and EBX) register setup the asm establishes immediately before each leaf-blit call, so
// the JS leaves (9b38bc/9b37b8/9b3d13/9b3bf1) read a stale regs.esi base pointer and the
// BROWSER cursor-pick resolved 0 tiles. The asm sets, just before each call:
//   RLE    9b38bc (zoom0, 0x9b3812):  esi = [0x9a2010]                              (image data ptr)
//   RLE    9b3d13 (zoom1, 0x9b3c4c):  esi = [0x9a2010]
//   BITMAP 9b37b8 (zoom0):  direct  (0x9b372d) esi=clip-adj image ptr, ebx=[0x9a2000];
//                           compressed (0x9b3796) esi = ebp + 0x9a2032 (scratchpad), ebx=[0x9a2000]
//   BITMAP 9b3bf1 (zoom1):  symmetric to 9b37b8
// We reconstruct esi from the same clip math the asm uses (esi starts at [0x9a2010] then
// is advanced by the Y-clip rows*width and retreated by the X-clip cols), matching
// 0x9b3655/0x9b3699(add esi,eax)/0x9b36f0(sub esi,ecx) for the direct-bitmap case.
// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b35fa.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_009b37b8 } from "./9b37b8.js";
import { FUN_009b38bc } from "./9b38bc.js";
import { FUN_009b3bf1 } from "./9b3bf1.js";
import { FUN_009b3d13 } from "./9b3d13.js";
import { FUN_009b3e87 } from "./9b3e87.js";
// 16-bit sign-extend (the asm clip math is all 16-bit signed ops)
function s16v(x) { return ((x & 0xffff) << 16) >> 16; }
export function FUN_009b35fa(heap) {
  let bVar1 = 0;
  let sVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar3 = 0;
  let in_CX = regs.ecx & 0xffff;
  let in_DX = regs.edx & 0xffff;
  let sVar4 = 0;
  let sVar5 = 0;
  let sVar6 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let pbVar9 = 0;
  let pbVar10 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let pbVar11 = 0;
  uVar7 = ((unaff_EBX & 0x1ffff) >>> 0);
  iVar8 = ((uVar7 * 0x10) >>> 0);
  if (heap.i16((unaff_EDI + 0xe)) == 0) {
    pbVar9 = ((heap.u32((0x008dc0b4) + (uVar7 * 4) * 4)) >>> 0);
    uVar7 = ((heap.u32((0x008dc0b8 + iVar8))) >>> 0);
    heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + iVar8))) >>> 0);
    heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + iVar8))) >>> 0);
    sVar5 = (((((heap.u32(0x009a2018) >>> 0x10)) << 16 >> 16)) & 0xffff);
    // @manual (Phase Track-C pick-blit): the C's `DAT_009a2014=(short)uVar7; DAT_009a2016=
    // (short)(uVar7>>16)` are 16-bit stores (asm only does the full `mov [0x9a2014],ebp`).
    // The translator emitted setU32 for the (short) store at 0x9a2016, whose 4-byte write
    // CLOBBERED the low word of the adjacent [0x9a2018] (the X-offset field 9b38bc's X-clip
    // reads) with 0 -> the X-clip computed the wrong pick column and the surface tile never
    // hit. Use setU16 (then the full [0x9a2014]=uVar7 dword store below is unaffected).
    heap.setU16(0x009a2014, ((uVar7) << 16 >> 16) & 0xffff);
    heap.setU16(0x009a2016, (((uVar7 >>> 0x10)) << 16 >> 16) & 0xffff);
    heap.setU32(0x009a2010, (pbVar9) >>> 0);
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    if ((heap.u32(0x009a201c) & 4) != 0) {
      // @manual (Phase Track-C pick-blit): the translator masked the signed 16-bit clip
      // math with `& 0xffff` / read word fields as u32, so `sVar2 < 0`, `[0x9a202c] < 0`
      // etc. were ALWAYS false -> the Y/X clip never tripped and the RLE leaf 9b38bc was
      // never reached for clipped tiles (pick resolved 0). Rewritten faithfully from the
      // asm 0x9b380f..0x9b38b5 (16-bit signed ops; [0x9a202c]/[0x9a2028]/[0x9a2020] are
      // WORDs, [0x9a2024] is a DWORD; esi=[0x9a2010] is the image-data base 9b38bc walks).
      uVar3 = ((CONCAT22(sVar5, heap.u32(0x009a2016))) >>> 0);
      regs.esi = heap.u32(0x009a2010) >>> 0;                 // 0x9b3812 esi = image data
      let dxv = s16v(in_DX + heap.i16(0x009a201a));          // 0x9b3818 add dx, [0x9a201a]
      heap.setU16(0x009a2020, 0);                            // 0x9b3825 word
      heap.setU16(0x009a202c, heap.u16(0x009a2016));         // 0x9b382e word [0x9a202c]=ax([0x9a2016])
      dxv = s16v(dxv - heap.i16(unaff_EDI + 6));             // 0x9b3834 sub dx, [edi+6]
      if (dxv < 0) {                                         // 0x9b3838 jns (skip when >=0)
        heap.setU16(0x009a202c, s16v(heap.i16(0x009a202c) + dxv) & 0xffff); // 0x9b383a
        if (heap.i16(0x009a202c) < 0) { heap.setU16(0x009a2014, uVar7 & 0xffff); return uVar3; } // 0x9b3841 js
        if (heap.i16(0x009a202c) === 0) { heap.setU16(0x009a2014, uVar7 & 0xffff); return uVar3; } // 0x9b3843 je
        heap.setU16(0x009a2020, s16v(heap.i16(0x009a2020) - dxv) & 0xffff); // 0x9b3845 sub [0x9a2020],dx
        dxv = 0;                                             // 0x9b384c xor dx,dx
      }
      dxv = s16v(dxv + heap.i16(0x009a202c));                // 0x9b384f add dx, [0x9a202c]
      dxv = s16v(dxv - 1);                                   // 0x9b3856 sub dx, 1
      if (dxv > 0) {                                         // 0x9b385a jle (skip when <=0)
        heap.setU16(0x009a202c, s16v(heap.i16(0x009a202c) - dxv) & 0xffff); // 0x9b385c
        if (heap.i16(0x009a202c) <= 0) { heap.setU16(0x009a2014, uVar7 & 0xffff); return uVar3; } // 0x9b3863 jle
      }
      // X-clip (0x9b3865)
      uVar3 = ((CONCAT22(sVar5, heap.u32(0x009a2014))) >>> 0);
      heap.setU32(0x009a2024, 0);                            // 0x9b386b DWORD
      heap.setU16(0x009a2028, heap.u16(0x009a2014));         // 0x9b3875 word [0x9a2028]=ax([0x9a2014])
      let cxv = s16v(in_CX + heap.i16(0x009a2018));          // 0x9b387b add cx, word[0x9a2018]
      cxv = s16v(cxv - heap.i16(unaff_EDI + 4));             // 0x9b3882 sub cx, [edi+4]
      if (cxv < 0) {                                         // 0x9b3886 jns
        heap.setU16(0x009a2028, s16v(heap.i16(0x009a2028) + cxv) & 0xffff); // 0x9b3888
        if (heap.i16(0x009a2028) < 0) { heap.setU16(0x009a2014, uVar7 & 0xffff); return uVar3; } // 0x9b388f js
        if (heap.i16(0x009a2028) === 0) { heap.setU16(0x009a2014, uVar7 & 0xffff); return uVar3; } // 0x9b3891 je
        heap.setU32(0x009a2024, (heap.u32(0x009a2024) - (cxv | 0)) >>> 0); // 0x9b3893 movsx ecx,cx; sub dword[0x9a2024],ecx
        cxv = 0;                                             // 0x9b389c xor cx,cx
      }
      cxv = s16v(cxv + heap.i16(0x009a2028));                // 0x9b389f add cx, [0x9a2028]
      cxv = s16v(cxv - 1);                                   // 0x9b38a6 sub cx, 1
      if (cxv > 0) {                                         // 0x9b38aa jle
        heap.setU16(0x009a2028, s16v(heap.i16(0x009a2028) - cxv) & 0xffff); // 0x9b38ac
        if (heap.i16(0x009a2028) <= 0) { heap.setU16(0x009a2014, uVar7 & 0xffff); return uVar3; } // 0x9b38b3 jle
      }
      regs.esi = heap.u32(0x009a2010) >>> 0;                 // (esi unchanged in this path) before call
      uVar3 = (((regs.eax = FUN_009b38bc(heap))) >>> 0);     // 0x9b38b5 call 9b38bc
      uVar7 = ((heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a2014, (uVar7) >>> 0);
      return uVar3;
    }
    uVar3 = ((CONCAT22(sVar5, heap.u32(0x009a2016))) >>> 0);
    heap.setU32(0x009a202c, (heap.u32(0x009a2016)) >>> 0);
    sVar5 = (((in_DX + sVar5) - heap.i16((unaff_EDI + 6))) & 0xffff);
    if (sVar5 < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a2016) + sVar5) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar3;
      }
      uVar3 = (((uVar7 & 0xffff) * ((0) >>> 0) - sVar5 & 0xffff) >>> 0);
      sVar5 = ((0) & 0xffff);
    }
    sVar2 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar6 = ((sVar5 + heap.u32(0x009a202c) + -1) & 0xffff);
    if ((sVar6 == 0 || (((sVar5 + heap.u32(0x009a202c))) << 16 >> 16) < 1) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar6) >>> 0), heap.u32(0x009a202c) != 0 && sVar6 <= sVar2)) {
      uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a202e, (0) >>> 0);
      sVar5 = (((in_CX + heap.u32(0x009a2018)) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar5 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a202e, (-sVar5) >>> 0);
        sVar5 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar6 = ((sVar5 + heap.u32(0x009a2028) + -1) & 0xffff);
      if (sVar6 != 0 && 0 < (((sVar5 + heap.u32(0x009a2028))) << 16 >> 16)) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar2 < sVar6) {
          return uVar3;
        }
        heap.setU32(0x009a202e, (heap.u32(0x009a202e) + sVar6) >>> 0);
      }
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar5 = ((heap.u32(0x009a2016) * heap.u32(0x009a2014)) & 0xffff);
        pbVar11 = ((0x009a2032) >>> 0);
        while (sVar5 != 0) {
          bVar1 = ((heap.u8(pbVar9)) & 0xff);
          uVar7 = ((((bVar1) >>> 0)) >>> 0);
          if (((bVar1) << 24 >> 24) < 0) {
            pbVar10 = ((pbVar9 + 1) >>> 0);
            sVar5 = ((sVar5 - ((0) & 0xffff) - (((bVar1) << 24 >> 24) >>> 3)) & 0xffff);
            pbVar9 = ((pbVar9 + 2) >>> 0);
            pbVar10 = ((pbVar11 + -((CONCAT11(bVar1, heap.u8(pbVar10)) & 0x7ff) >>> 0)) >>> 0);
            for (uVar7 = ((((0) >>> 0) - (((bVar1) << 24 >> 24) >>> 3)) >>> 0); uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU8(pbVar11, (heap.u8(pbVar10)) & 0xff);
              pbVar10 = ((pbVar10 + 1) >>> 0);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          } else {
            sVar5 = ((sVar5 - ((bVar1) & 0xffff)) & 0xffff);
            for (; pbVar9 = ((pbVar9 + 1) >>> 0), uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU8(pbVar11, (heap.u8(pbVar9)) & 0xff);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          }
        }
        uVar7 = (((regs.eax = FUN_009b37b8(heap))) >>> 0);
        return uVar7;
      }
      uVar3 = (((regs.eax = FUN_009b37b8(heap))) >>> 0);
      uVar7 = ((heap.u32(0x009a2014)) >>> 0);
    }
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    return uVar3;
  }
  if (heap.i16((unaff_EDI + 0xe)) != 1) {
    uVar7 = (((regs.eax = FUN_009b3e87(heap))) >>> 0);
    return uVar7;
  }
  if ((heap.u16((0x008dc0c0 + iVar8)) & 0x20) != 0) {
    return in_EAX;
  }
  if ((heap.u16((0x008dc0c0 + iVar8)) & 0x10) != 0) {
    heap.setI16((unaff_EDI + 0xe), (heap.i16((unaff_EDI + 0xe)) + -1) & 0xffff);
    heap.setI16((unaff_EDI + 4), (heap.i16((unaff_EDI + 4)) >>> 1) & 0xffff);
    heap.setI16((unaff_EDI + 6), (heap.i16((unaff_EDI + 6)) >>> 1) & 0xffff);
    uVar7 = (((regs.eax = FUN_009b35fa(heap))) >>> 0);
    heap.setI16((unaff_EDI + 0xe), (heap.i16((unaff_EDI + 0xe)) + 1) & 0xffff);
    heap.setI16((unaff_EDI + 4), (heap.i16((unaff_EDI + 4)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 6), (heap.i16((unaff_EDI + 6)) << 1) & 0xffff);
    return uVar7;
  }
  pbVar9 = ((heap.u32((0x008dc0b4) + (uVar7 * 4) * 4)) >>> 0);
  uVar7 = ((heap.u32((0x008dc0b8 + iVar8))) >>> 0);
  heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + iVar8))) >>> 0);
  heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + iVar8))) >>> 0);
  sVar5 = (((((heap.u32(0x009a2018) >>> 0x10)) << 16 >> 16)) & 0xffff);
  heap.setU32(0x009a2014, (((uVar7) << 16 >> 16)) >>> 0);
  heap.setU32(0x009a2016, ((((uVar7 >>> 0x10)) << 16 >> 16)) >>> 0);
  heap.setU32(0x009a2010, (pbVar9) >>> 0);
  heap.setU32(0x009a2014, (uVar7) >>> 0);
  if ((heap.u32(0x009a201c) & 4) != 0) {
    uVar3 = ((CONCAT22(sVar5, heap.u32(0x009a2016))) >>> 0);
    heap.setU32(0x009a2020, (0) >>> 0);
    if ((uVar7 & 0x10000) != 0) {
      uVar3 = ((CONCAT22(sVar5, heap.u32(0x009a2016) + -1)) >>> 0);
      if ((((heap.u32(0x009a2016) + -1)) << 16 >> 16) == 0) {
        heap.setU32(0x009a2020, (0) >>> 0);
        return uVar3;
      }
      heap.setU32(0x009a2020, (1) >>> 0);
    }
    heap.setU32(0x009a202c, (((uVar3) << 16 >> 16)) >>> 0);
    sVar5 = (((in_DX + sVar5 & 0xfffe) - heap.i16((unaff_EDI + 6))) & 0xffff);
    if (sVar5 < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a202c) + sVar5) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar3;
      }
      heap.setU32(0x009a2020, (heap.u32(0x009a2020) - sVar5) >>> 0);
      sVar5 = ((0) & 0xffff);
    }
    sVar2 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar6 = ((sVar5 + heap.u32(0x009a202c) + -1) & 0xffff);
    if ((sVar6 == 0 || (((sVar5 + heap.u32(0x009a202c))) << 16 >> 16) < 1) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar6) >>> 0), heap.u32(0x009a202c) != 0 && sVar6 <= sVar2)) {
      uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
      heap.setU32(0x009a2024, (0) >>> 0);
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      sVar5 = (((in_CX + heap.u32(0x009a2018) & 0xfffe) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar5 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a2024, (-((sVar5) | 0)) >>> 0);
        sVar5 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar6 = ((sVar5 + heap.u32(0x009a2028) + -1) & 0xffff);
      if ((sVar6 == 0 || (((sVar5 + heap.u32(0x009a2028))) << 16 >> 16) < 1) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0), heap.u32(0x009a2028) != 0 && sVar6 <= sVar2)) {
        uVar3 = (((regs.eax = FUN_009b3d13(heap))) >>> 0);
        uVar7 = ((heap.u32(0x009a2014)) >>> 0);
      }
    }
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    return uVar3;
  }
  sVar2 = ((heap.u32(0x009a2016)) & 0xffff);
  if ((uVar7 & 0x10000) != 0) {
    sVar2 = ((heap.u32(0x009a2016) + -1) & 0xffff);
  }
  uVar3 = ((CONCAT22(sVar5, sVar2)) >>> 0);
  if (sVar2 != 0) {
    sVar5 = (((in_DX + sVar5 & 0xfffe) - heap.i16((unaff_EDI + 6))) & 0xffff);
    heap.setU32(0x009a202c, (sVar2) >>> 0);
    if (sVar5 < 0) {
      heap.setU32(0x009a202c, (sVar2 + sVar5) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar3;
      }
      uVar3 = (((uVar7 & 0xffff) * ((0) >>> 0) - sVar5 & 0xffff) >>> 0);
      sVar5 = ((0) & 0xffff);
    }
    sVar2 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar6 = ((sVar5 + heap.u32(0x009a202c) + -1) & 0xffff);
    if ((sVar6 == 0 || (((sVar5 + heap.u32(0x009a202c))) << 16 >> 16) < 1) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar6) >>> 0), heap.u32(0x009a202c) != 0 && sVar6 <= sVar2)) {
      uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a202e, (0) >>> 0);
      sVar5 = (((in_CX + heap.u32(0x009a2018) & 0xfffe) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar5 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a202e, (-sVar5) >>> 0);
        sVar5 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar6 = ((sVar5 + heap.u32(0x009a2028) + -1) & 0xffff);
      if (sVar6 != 0 && 0 < (((sVar5 + heap.u32(0x009a2028))) << 16 >> 16)) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar2 < sVar6) {
          return uVar3;
        }
        heap.setU32(0x009a202e, (heap.u32(0x009a202e) + sVar6) >>> 0);
      }
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar5 = ((heap.u32(0x009a2016) * heap.u32(0x009a2014)) & 0xffff);
        pbVar11 = ((0x009a2032) >>> 0);
        while (sVar5 != 0) {
          bVar1 = ((heap.u8(pbVar9)) & 0xff);
          uVar7 = ((((bVar1) >>> 0)) >>> 0);
          if (((bVar1) << 24 >> 24) < 0) {
            pbVar10 = ((pbVar9 + 1) >>> 0);
            sVar5 = ((sVar5 - ((0) & 0xffff) - (((bVar1) << 24 >> 24) >>> 3)) & 0xffff);
            pbVar9 = ((pbVar9 + 2) >>> 0);
            pbVar10 = ((pbVar11 + -((CONCAT11(bVar1, heap.u8(pbVar10)) & 0x7ff) >>> 0)) >>> 0);
            for (uVar7 = ((((0) >>> 0) - (((bVar1) << 24 >> 24) >>> 3)) >>> 0); uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU8(pbVar11, (heap.u8(pbVar10)) & 0xff);
              pbVar10 = ((pbVar10 + 1) >>> 0);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          } else {
            sVar5 = ((sVar5 - ((bVar1) & 0xffff)) & 0xffff);
            for (; pbVar9 = ((pbVar9 + 1) >>> 0), uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU8(pbVar11, (heap.u8(pbVar9)) & 0xff);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          }
        }
        uVar7 = (((regs.eax = FUN_009b3bf1(heap))) >>> 0);
        return uVar7;
      }
      uVar3 = (((regs.eax = FUN_009b3bf1(heap))) >>> 0);
      uVar7 = ((heap.u32(0x009a2014)) >>> 0);
    }
  }
  heap.setU32(0x009a2014, (uVar7) >>> 0);
  return uVar3;
}
