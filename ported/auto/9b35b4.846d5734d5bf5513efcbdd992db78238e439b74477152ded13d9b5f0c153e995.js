// @manual — do not regenerate.
// HAND-FIX (Phase R+4, RLE byte-store): translator emitted heap.setU32(ptr, byte & 0xffffffff)
// for C-source `*pbVar = *src;` where pbVar is a byte-pointer in RLE-decode/blitter loops.
// Each iteration advances ptr by 1 but the setU32 was writing 4 bytes — corrupting the next
// 3 bytes in the row with zero, then they get overwritten by subsequent iterations EXCEPT
// for the last 3 bytes of each run which stayed zero, and the 3 bytes immediately past the
// run end which also got zeroed. In the RLE-decompress scratchpad at 0x9a2032, downstream
// back-references then copied that corruption into the visible sprite. Fixed by switching
// the per-pixel write to heap.setU8(..., ... & 0xff).
// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b35b4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { pickSprite } from "./pick-sprite.js";
import { FUN_009b35fa } from "./9b35fa.js";
import { FUN_009b37b8 } from "./9b37b8.js";
import { FUN_009b38bc } from "./9b38bc.js";
import { FUN_009b3bf1 } from "./9b3bf1.js";
import { FUN_009b3d13 } from "./9b3d13.js";
import { FUN_009b3e87 } from "./9b3e87.js";
// 16-bit sign-extend (the asm clip math is all 16-bit signed ops)
function s16v(x) { return ((x & 0xffff) << 16) >> 16; }
// The binary's 70-byte entry falls through to 9b35fa. Ghidra duplicated
// that entire body here, leaving this copy with dword writes into word clip
// fields. Cursor picking at zoom 1 contaminated 9a202a; the next remapped
// blit subtracted that contaminated dword from its destination each row and
// overwrote the peep array (SC10 rotation 1, zoom 1). Share the corrected body.
export function FUN_009b35b4_exact(heap, body = pickSprite) {
  heap.setU8(0x99c164, 0);
  regs.ebx = (regs.ebx & 0xbfffffff) >>> 0;
  heap.setU32(0x9a2000, 0);
  const remapped = regs.ebx & 0x20000000;
  regs.cf = regs.of = regs.sf = 0; regs.zf = remapped === 0 ? 1 : 0;
  if (remapped) {
    heap.setU32(0x9a2000, 0x20000000);
    const color = regs.ebx >>> 17 & 0x7f;
    regs.eax = heap.u32(0x9aa06c + color * 4);
    const value = regs.eax, scaled = value << 4 >>> 0;
    regs.cf = value >>> 28 & 1; regs.zf = scaled === 0 ? 1 : 0; regs.sf = scaled >>> 31;
    regs.eax = heap.u32((scaled + 0x8dc0b4) >>> 0);
    heap.setU32(0x9a200c, regs.eax);
  }
  return body(heap);
}
export function FUN_009b35b4(heap) {
  // Preserve the old frozen force-load fixture; real startup uses the same
  // corrected boundary as 9b438b -> 9b4457.
  if (globalThis.__realStartup) return FUN_009b35b4_exact(heap);
  return FUN_009b35b4_frozen(heap);
}
function FUN_009b35b4_frozen(heap) {
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
  heap.setU8(0x0099c164, (0) & 0xff);
  heap.setU32(0x009a2000, (0) >>> 0);
  if ((unaff_EBX & 0x20000000) != 0) {
    heap.setU32(0x009a2000, (0x20000000) >>> 0);
    in_EAX = ((heap.u32((0x008dc0b4) + (heap.i32((0x009aa06c + ((unaff_EBX & 0xbfffffff) >>> 0x11 & 0x7f) * 4)) * 4) * 4)) >>> 0);
    heap.setU32(0x009a200c, (in_EAX) >>> 0);
  }
  uVar7 = ((unaff_EBX & 0x1ffff) >>> 0);
  iVar8 = ((uVar7 * 0x10) >>> 0);
  if (heap.i16((unaff_EDI + 0xe)) == 0) {
    pbVar9 = ((heap.u32((0x008dc0b4) + (uVar7 * 4) * 4)) >>> 0);
    uVar7 = ((heap.u32((0x008dc0b8 + iVar8))) >>> 0);
    heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + iVar8))) >>> 0);
    heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + iVar8))) >>> 0);
    sVar5 = (((((heap.u32(0x009a2018) >>> 0x10)) << 16 >> 16)) & 0xffff);
    // @manual (Phase Track-C pick-blit): identical fix to the 9b35fa entry-point body
    // (0x9b35fa is a LABEL inside this same function 0x9b35b4; Ghidra split them). The
    // setU32 at [0x9a2016] (a 16-bit (short) store) clobbered the low word of [0x9a2018]
    // (the X-offset 9b38bc's X-clip reads) -> setU16. See 9b35fa.js for the full rationale.
    heap.setU16(0x009a2014, ((uVar7) << 16 >> 16) & 0xffff);
    heap.setU16(0x009a2016, (((uVar7 >>> 0x10)) << 16 >> 16) & 0xffff);
    heap.setU32(0x009a2010, (pbVar9) >>> 0);
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    if ((heap.u32(0x009a201c) & 4) != 0) {
      // @manual (Phase Track-C pick-blit): signed-16-bit clip rewrite + esi register-init,
      // ported from asm 0x9b380f..0x9b38b5 (shared with 9b35fa). The translator masked the
      // clip math with `& 0xffff` (never-negative) and dropped esi=[0x9a2010] before the
      // RLE leaf call -> the BROWSER pure-JS pick missed every clipped tile.
      uVar3 = ((CONCAT22(sVar5, heap.u32(0x009a2016))) >>> 0);
      regs.esi = heap.u32(0x009a2010) >>> 0;                 // 0x9b3812 esi = image data
      let dxv = s16v(in_DX + heap.i16(0x009a201a));          // 0x9b3818 add dx, [0x9a201a]
      heap.setU16(0x009a2020, 0);                            // 0x9b3825
      heap.setU16(0x009a202c, heap.u16(0x009a2016));         // 0x9b382e
      dxv = s16v(dxv - heap.i16(unaff_EDI + 6));             // 0x9b3834
      if (dxv < 0) {                                         // 0x9b3838 jns
        heap.setU16(0x009a202c, s16v(heap.i16(0x009a202c) + dxv) & 0xffff); // 0x9b383a
        if (heap.i16(0x009a202c) < 0) { heap.setU16(0x009a2014, uVar7 & 0xffff); return uVar3; } // 0x9b3841
        if (heap.i16(0x009a202c) === 0) { heap.setU16(0x009a2014, uVar7 & 0xffff); return uVar3; } // 0x9b3843
        heap.setU16(0x009a2020, s16v(heap.i16(0x009a2020) - dxv) & 0xffff); // 0x9b3845
        dxv = 0;                                             // 0x9b384c
      }
      dxv = s16v(dxv + heap.i16(0x009a202c));                // 0x9b384f
      dxv = s16v(dxv - 1);                                   // 0x9b3856
      if (dxv > 0) {                                         // 0x9b385a jle
        heap.setU16(0x009a202c, s16v(heap.i16(0x009a202c) - dxv) & 0xffff); // 0x9b385c
        if (heap.i16(0x009a202c) <= 0) { heap.setU16(0x009a2014, uVar7 & 0xffff); return uVar3; } // 0x9b3863
      }
      // X-clip (0x9b3865)
      uVar3 = ((CONCAT22(sVar5, heap.u32(0x009a2014))) >>> 0);
      heap.setU32(0x009a2024, 0);                            // 0x9b386b DWORD
      heap.setU16(0x009a2028, heap.u16(0x009a2014));         // 0x9b3875
      let cxv = s16v(in_CX + heap.i16(0x009a2018));          // 0x9b387b add cx, word[0x9a2018]
      cxv = s16v(cxv - heap.i16(unaff_EDI + 4));             // 0x9b3882
      if (cxv < 0) {                                         // 0x9b3886 jns
        heap.setU16(0x009a2028, s16v(heap.i16(0x009a2028) + cxv) & 0xffff); // 0x9b3888
        if (heap.i16(0x009a2028) < 0) { heap.setU16(0x009a2014, uVar7 & 0xffff); return uVar3; } // 0x9b388f
        if (heap.i16(0x009a2028) === 0) { heap.setU16(0x009a2014, uVar7 & 0xffff); return uVar3; } // 0x9b3891
        heap.setU32(0x009a2024, (heap.u32(0x009a2024) - (cxv | 0)) >>> 0); // 0x9b3893 movsx; sub dword
        cxv = 0;                                             // 0x9b389c
      }
      cxv = s16v(cxv + heap.i16(0x009a2028));                // 0x9b389f
      cxv = s16v(cxv - 1);                                   // 0x9b38a6
      if (cxv > 0) {                                         // 0x9b38aa jle
        heap.setU16(0x009a2028, s16v(heap.i16(0x009a2028) - cxv) & 0xffff); // 0x9b38ac
        if (heap.i16(0x009a2028) <= 0) { heap.setU16(0x009a2014, uVar7 & 0xffff); return uVar3; } // 0x9b38b3
      }
      regs.esi = heap.u32(0x009a2010) >>> 0;                 // before call (esi unchanged)
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
        heap.setU8(0x0099c164, (0) & 0xff);
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        heap.setU8(0x0099c164, (0) & 0xff);
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
          heap.setU8(0x0099c164, (0) & 0xff);
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU8(0x0099c164, (0) & 0xff);
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
          heap.setU8(0x0099c164, (0) & 0xff);
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
    heap.setU8(0x0099c164, (0) & 0xff);
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
        heap.setU8(0x0099c164, (0) & 0xff);
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
        heap.setU8(0x0099c164, (0) & 0xff);
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        heap.setU8(0x0099c164, (0) & 0xff);
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
          heap.setU8(0x0099c164, (0) & 0xff);
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU8(0x0099c164, (0) & 0xff);
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
        heap.setU8(0x0099c164, (0) & 0xff);
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        heap.setU8(0x0099c164, (0) & 0xff);
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
          heap.setU8(0x0099c164, (0) & 0xff);
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU8(0x0099c164, (0) & 0xff);
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
          heap.setU8(0x0099c164, (0) & 0xff);
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
