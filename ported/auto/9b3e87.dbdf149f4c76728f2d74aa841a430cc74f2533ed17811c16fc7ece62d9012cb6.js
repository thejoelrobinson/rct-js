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
// Source: decompiled/c/9b3e87.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

// HAND-FIX (ADDENDUM 104): DEAD SIGNED COMPARISONS.
// sVar6 is computed with a trailing ` & 0xffff`, which makes it UNSIGNED, so
// `sVar6 < 0` could never be true and the whole negative-offset left-clip
// branch was dead code. Same for `heap.u16(0x009a2028) < 0` — a u32 read is
// never negative. (Note lines using heap.i16(0x009a202c) < 0 nearby are already
// signed, which is what the binary does everywhere here.)
// Consequence: when a sprite starts to the LEFT of the clip rect the clip was
// never set up, so the sprite was not drawn and the flat background showed
// through — measured as a 9600-px band (y=104..133, x=0..319) in the playable
// accuracy gate, where the binary paints water 194/195 + sparkle 230/231 and we
// left background 208. Sign-extend the 16-bit values so the comparisons behave
// as the binary's signed ops do.
// HAND-FIX (ADDENDUM 106): 16-BIT FIELDS WRITTEN AS 32-BIT.
// 0x9a2024 / 0x9a2028 / 0x9a202c are each 16-bit fields in the binary — it
// reads them with `sub dx, word ptr [0x9a2028]` (0x9b4975), decrements with
// `dec word ptr [0x9a202c]` (0x9b49a2), and 0x9a202e is a SEPARATE 16-bit
// field it updates with `sub word ptr [0x9a202e], cx` (0x9b3fd8).
// Accessing them as u32 made every write spill into the neighbouring field:
// a store to 0x9a202c clobbered 0x9a202e, and one to 0x9a2028 clobbered
// 0x9a202a. Found by the blit oracle's post-call side-effect diff, which
// reported exactly those two addresses diverging from the binary on 50/1106
// blits while the pixels themselves matched perfectly (ADDENDUM 105).
// This is the `wordstore` class that tools/_scan-all.mjs detects.
/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_009b35fa } from "./9b35fa.js";
import { FUN_009b40aa } from "./9b40aa.js";
import { FUN_009b41e4 } from "./9b41e4.js";
export function FUN_009b3e87(heap) {
  let bVar1 = 0;
  let uVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_CX = regs.ecx & 0xffff;
  let sVar5 = 0;
  let in_DX = regs.edx & 0xffff;
  let sVar6 = 0;
  let sVar7 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let pbVar8 = 0;
  let pbVar9 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let pbVar10 = 0;
  if ((heap.u16((0x008dc0c0 + unaff_EBX)) & 0x20) != 0) {
    return in_EAX;
  }
  if ((heap.u16((0x008dc0c0 + unaff_EBX)) & 0x10) != 0) {
    heap.setI16((unaff_EDI + 0xe), (heap.i16((unaff_EDI + 0xe)) + -1) & 0xffff);
    heap.setI16((unaff_EDI + 4), (heap.i16((unaff_EDI + 4)) >>> 1) & 0xffff);
    heap.setI16((unaff_EDI + 6), (heap.i16((unaff_EDI + 6)) >>> 1) & 0xffff);
    uVar3 = (((regs.eax = FUN_009b35fa(heap))) >>> 0);
    heap.setI16((unaff_EDI + 0xe), (heap.i16((unaff_EDI + 0xe)) + 1) & 0xffff);
    heap.setI16((unaff_EDI + 4), (heap.i16((unaff_EDI + 4)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 6), (heap.i16((unaff_EDI + 6)) << 1) & 0xffff);
    return uVar3;
  }
  pbVar8 = ((heap.u32((((0x008dc0b4) | 0) + unaff_EBX))) >>> 0);
  uVar3 = ((heap.u32((0x008dc0b8 + unaff_EBX))) >>> 0);
  heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + unaff_EBX))) >>> 0);
  heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + unaff_EBX))) >>> 0);
  sVar6 = (((((heap.u32(0x009a2018) >>> 0x10)) << 16 >> 16)) & 0xffff);
  heap.setU32(0x009a2014, (((uVar3) << 16 >> 16)) >>> 0);
  heap.setU16(0x009a2016, (((uVar3 >>> 0x10) & 0xffff)) >>> 0);
  heap.setU32(0x009a2010, (pbVar8) >>> 0);
  heap.setU32(0x009a2014, (uVar3) >>> 0);
  if ((heap.u32(0x009a201c) & 4) != 0) {
    uVar4 = ((CONCAT22(sVar6, heap.u32(0x009a2016))) >>> 0);
    heap.setU32(0x009a2020, (0) >>> 0);
    if ((uVar3 & 0x10000) != 0) {
      uVar4 = ((CONCAT22(sVar6, heap.u32(0x009a2016) - 1)) >>> 0);
      if (((heap.u32(0x009a2016) - 1) & 0xffff) == 0) {
        heap.setU32(0x009a2020, (0) >>> 0);
        return uVar4;
      }
      heap.setU32(0x009a2020, (1) >>> 0);
    }
    sVar7 = ((((uVar4) << 16 >> 16)) & 0xffff);
    if ((uVar4 & 2) != 0) {
      sVar5 = ((sVar7 + -2) & 0xffff);
      uVar4 = ((CONCAT22((((uVar4 >>> 0x10)) << 16 >> 16), sVar5)) >>> 0);
      if (sVar5 == 0 || sVar7 < 2) {
        return uVar4;
      }
      heap.setU32(0x009a2020, (heap.u32(0x009a2020) + 2) >>> 0);
    }
    heap.setU16(0x009a202c, (((uVar4) & 0xffff)) >>> 0);
    sVar6 = (((in_DX + sVar6 & 0xfffc) - heap.i16((unaff_EDI + 6))) & 0xffff);
    if (((sVar6 << 16) >> 16) < 0) {
      heap.setU16(0x009a202c, (heap.u16(0x009a202c) + sVar6) >>> 0);
      if (heap.i16(0x009a202c) < 0) {
        return uVar4;
      }
      if (heap.u16(0x009a202c) == 0) {
        return uVar4;
      }
      heap.setU32(0x009a2020, (heap.u32(0x009a2020) - sVar6) >>> 0);
      sVar6 = ((0) & 0xffff);
    }
    sVar7 = ((heap.u16(0x009a202c)) & 0xffff);
    sVar5 = ((sVar6 + heap.u16(0x009a202c) + -1) & 0xffff);
    if ((sVar5 == 0 || (((sVar6 + heap.u16(0x009a202c))) << 16 >> 16) < 1) || (heap.setU16(0x009a202c, (heap.u16(0x009a202c) - sVar5) >>> 0), heap.u16(0x009a202c) != 0 && sVar5 <= sVar7)) {
      uVar4 = ((CONCAT22((((uVar4 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
      heap.setU16(0x009a2024, (0) >>> 0);
      heap.setU16(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      sVar6 = (((in_CX + heap.u32(0x009a2018) & 0xfffc) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (((sVar6 << 16) >> 16) < 0) {
        heap.setU16(0x009a2028, (heap.u32(0x009a2014) + sVar6) >>> 0);
        if (heap.i16(0x009a2028) < 0) {
          heap.setU16(0x009a2024, (0) >>> 0);
          return uVar4;
        }
        if (heap.u16(0x009a2028) == 0) {
          heap.setU16(0x009a2024, (0) >>> 0);
          return uVar4;
        }
        heap.setU16(0x009a2024, (-((sVar6) | 0)) >>> 0);
        sVar6 = ((0) & 0xffff);
      }
      sVar7 = ((heap.u16(0x009a2028)) & 0xffff);
      sVar5 = ((sVar6 + heap.u16(0x009a2028) + -1) & 0xffff);
      if ((sVar5 == 0 || (((sVar6 + heap.u16(0x009a2028))) << 16 >> 16) < 1) || (heap.setU16(0x009a2028, (heap.u16(0x009a2028) - sVar5) >>> 0), heap.u16(0x009a2028) != 0 && sVar5 <= sVar7)) {
        uVar4 = (((regs.eax = FUN_009b41e4(heap))) >>> 0);
        uVar3 = ((heap.u32(0x009a2014)) >>> 0);
      }
    }
    heap.setU32(0x009a2014, (uVar3) >>> 0);
    return uVar4;
  }
  uVar2 = ((heap.u32(0x009a2016)) & 0xffff);
  if ((uVar3 & 0x10000) != 0) {
    uVar2 = ((heap.u32(0x009a2016) - 1) & 0xffff);
  }
  if ((uVar2 & 2) != 0) {
    uVar2 = ((uVar2 - 2) & 0xffff);
  }
  uVar4 = ((CONCAT22(sVar6, uVar2)) >>> 0);
  if (uVar2 != 0) {
    sVar6 = (((in_DX + sVar6 & 0xfffc) - heap.i16((unaff_EDI + 6))) & 0xffff);
    heap.setU16(0x009a202c, (uVar2) >>> 0);
    if (((sVar6 << 16) >> 16) < 0) {
      heap.setU16(0x009a202c, (uVar2 + sVar6) >>> 0);
      if (heap.i16(0x009a202c) < 0) {
        return uVar4;
      }
      if (heap.u16(0x009a202c) == 0) {
        return uVar4;
      }
      uVar4 = (((uVar3 & 0xffff) * ((0) >>> 0) - sVar6 & 0xffff) >>> 0);
      sVar6 = ((0) & 0xffff);
    }
    uVar2 = ((heap.u16(0x009a202c)) & 0xffff);
    sVar7 = ((sVar6 + heap.u16(0x009a202c) + -1) & 0xffff);
    if ((sVar7 == 0 || (((sVar6 + heap.u16(0x009a202c))) << 16 >> 16) < 1) || (heap.setU16(0x009a202c, (heap.u16(0x009a202c) - sVar7) >>> 0), heap.u16(0x009a202c) != 0 && sVar7 <= ((uVar2) << 16 >> 16))) {
      uVar4 = ((CONCAT22((((uVar4 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
      heap.setU16(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a202e, (0) >>> 0);
      sVar6 = (((in_CX + heap.u32(0x009a2018) & 0xfffc) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (((sVar6 << 16) >> 16) < 0) {
        heap.setU16(0x009a2028, (heap.u32(0x009a2014) + sVar6) >>> 0);
        if (heap.i16(0x009a2028) < 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar4;
        }
        if (heap.u16(0x009a2028) == 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar4;
        }
        heap.setU32(0x009a202e, (-sVar6) >>> 0);
        sVar6 = ((0) & 0xffff);
      }
      sVar7 = ((heap.u16(0x009a2028)) & 0xffff);
      sVar5 = ((sVar6 + heap.u16(0x009a2028) + -1) & 0xffff);
      if (sVar5 != 0 && 0 < (((sVar6 + heap.u16(0x009a2028))) << 16 >> 16)) {
        heap.setU16(0x009a2028, (heap.u16(0x009a2028) - sVar5) >>> 0);
        if (heap.u16(0x009a2028) == 0 || sVar7 < sVar5) {
          return uVar4;
        }
        heap.setU32(0x009a202e, (heap.u32(0x009a202e) + sVar5) >>> 0);
      }
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar6 = ((heap.u32(0x009a2016) * heap.u32(0x009a2014)) & 0xffff);
        pbVar10 = ((0x009a2032) >>> 0);
        while (sVar6 != 0) {
          bVar1 = ((heap.u8(pbVar8)) & 0xff);
          uVar3 = ((((bVar1) >>> 0)) >>> 0);
          if (((bVar1) << 24 >> 24) < 0) {
            pbVar9 = ((pbVar8 + 1) >>> 0);
            sVar6 = ((sVar6 - ((0) & 0xffff) - (((bVar1) << 24 >> 24) >>> 3)) & 0xffff);
            pbVar8 = ((pbVar8 + 2) >>> 0);
            pbVar9 = ((pbVar10 + -((CONCAT11(bVar1, heap.u8(pbVar9)) & 0x7ff) >>> 0)) >>> 0);
            for (uVar3 = ((((0) >>> 0) - (((bVar1) << 24 >> 24) >>> 3)) >>> 0); uVar3 != 0; uVar3 = (((uVar3 - 1) >>> 0)) >>> 0) {
              heap.setU8(pbVar10, (heap.u8(pbVar9)) & 0xff);
              pbVar9 = ((pbVar9 + 1) >>> 0);
              pbVar10 = ((pbVar10 + 1) >>> 0);
            }
          } else {
            sVar6 = ((sVar6 - ((bVar1) & 0xffff)) & 0xffff);
            for (; pbVar8 = ((pbVar8 + 1) >>> 0), uVar3 != 0; uVar3 = (((uVar3 - 1) >>> 0)) >>> 0) {
              heap.setU8(pbVar10, (heap.u8(pbVar8)) & 0xff);
              pbVar10 = ((pbVar10 + 1) >>> 0);
            }
          }
        }
        uVar3 = (((regs.eax = FUN_009b40aa(heap))) >>> 0);
        return uVar3;
      }
      uVar4 = (((regs.eax = FUN_009b40aa(heap))) >>> 0);
      uVar3 = ((heap.u32(0x009a2014)) >>> 0);
    }
  }
  heap.setU32(0x009a2014, (uVar3) >>> 0);
  return uVar4;
}
