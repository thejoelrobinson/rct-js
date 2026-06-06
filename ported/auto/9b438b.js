// @manual — do not regenerate.
// Source: decompiled/c/9b438b.c — sprite blit dispatcher. Same
// translator bug as 9b4457.js: `(char)bVar1 >> 3` rendered as `>>> 3`
// (unsigned) in RLE-decode loops. See 9b4457.js header for details.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_009b4457 } from "./9b4457.js";
import { FUN_009b4660 } from "./9b4660.js";
import { FUN_009b4911 } from "./9b4911.js";
import { FUN_009b64ea } from "./9b64ea.js";
import { FUN_009b6863 } from "./9b6863.js";
import { FUN_009b8491 } from "./9b8491.js";
export function FUN_009b438b(heap) {
  let bVar1 = 0;
  let sVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_CX = regs.ecx & 0xffff;
  let sVar5 = 0;
  let sVar6 = 0;
  let in_DX = regs.edx & 0xffff;
  let uVar7 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let iVar8 = 0;
  let pbVar9 = 0;
  let pbVar10 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let pbVar11 = 0;
  heap.setU32(0x009a2000, (unaff_EBX & 0x60000000) >>> 0);
  if (heap.u32(0x009a2000) != 0) {
    if ((unaff_EBX & 0x80000000) == 0) {
      uVar3 = ((unaff_EBX >>> 0x11 & 0x7f) >>> 0);
    } else {
      uVar3 = ((unaff_EBX >>> 0x11 & 0x7f) >>> 0);
      if (uVar3 != 0x27) {
        iVar8 = ((heap.u32((0x008dc0b4) + (heap.i32((0x009aa06c + uVar3 * 4)) * 4) * 4)) >>> 0);
        heap.setU32(0x009aa237, (heap.u32((iVar8 + 0xf3))) >>> 0);
        heap.setU32(0x009aa23b, (heap.u32((iVar8 + 0xf7))) >>> 0);
        heap.setU32(0x009aa23f, (heap.u32((iVar8 + 0xfb))) >>> 0);
        iVar8 = ((heap.u32((0x008dc0b4) + (heap.i32((0x009aa06c + (unaff_EBX >>> 0x18 & 0x1f) * 4)) * 4) * 4)) >>> 0);
        heap.setU32(0x009aa20e, (heap.u32((iVar8 + 0xf3))) >>> 0);
        heap.setU32(0x009aa212, (heap.u32((iVar8 + 0xf7))) >>> 0);
        heap.setU32(0x009aa216, (heap.u32((iVar8 + 0xfb))) >>> 0);
        heap.setU32(0x009a200c, (0x009aa144) >>> 0);
        uVar3 = (((regs.eax = FUN_009b4457(heap))) >>> 0);
        return uVar3;
      }
    }
    in_EAX = ((heap.u32((0x008dc0b4) + (heap.i32((0x009aa06c + uVar3 * 4)) * 4) * 4)) >>> 0);
    heap.setU32(0x009a200c, (in_EAX) >>> 0);
  }
  uVar3 = ((unaff_EBX & 0x1ffff) >>> 0);
  iVar8 = ((uVar3 * 0x10) >>> 0);
  // HAND-FIX (painter-noise root cause): asm at 0x9b4458 (the shared common
  // body 9b438b reaches via fall-through) does `and ebx,0x1ffff; shl ebx,4`
  // which scales EBX in place. The tail-call `jmp 9b8491` at offset 0xe3
  // hands the SCALED EBX to 9b8491, which uses it as `[ebx + 0x8dc0c0]`.
  // Without this, 9b8491 reads the wrong class entry — see 9b8491.js header.
  regs.ebx = iVar8 >>> 0;
  if (heap.i16((unaff_EDI + 0xe)) == 0) {
    pbVar9 = ((heap.u32((0x008dc0b4) + (uVar3 * 4) * 4)) >>> 0);
    uVar3 = ((heap.u32((0x008dc0b8 + iVar8))) >>> 0);
    heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + iVar8))) >>> 0);
    heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + iVar8))) >>> 0);
    sVar5 = (((((heap.u32(0x009a2018) >>> 0x10)) << 16 >> 16)) & 0xffff);
    heap.setU32(0x009a2014, (((uVar3) << 16 >> 16)) >>> 0);
    heap.setU16(0x009a2016, ((((uVar3 >>> 0x10)) << 16 >> 16)) & 0xffff);
    heap.setU32(0x009a2010, (pbVar9) >>> 0);
    heap.setU32(0x009a2014, (uVar3) >>> 0);
    if ((heap.u32(0x009a201c) & 4) != 0) {
      // HAND-FIX (β2, dst-Y truncation): full 32-bit dst row-offset in bytes,
      // captured before line ~97's CONCAT22 truncates uVar4 to 16 bits. The asm
      // does `add edi, eax` with the full 32-bit y-offset; the C/translator
      // packed uVar4's high half into the return value, losing it for the dst
      // pointer. Without this, tiles with topDelta>102 (640*td > 0xffff)
      // collapsed to screen-top — the whole lower landscape. Verified vs the
      // x86 interpreter (blit#0 now lands at rows 321-336, matching the binary).
      let _dstYBytes = 0;
      uVar4 = ((CONCAT22(sVar5, heap.u32(0x009a2016))) >>> 0);
      heap.setU32(0x009a2020, (0) >>> 0);
      heap.setU32(0x009a202c, (heap.u32(0x009a2016)) >>> 0);
      sVar5 = (((in_DX + sVar5) - heap.i16((unaff_EDI + 6))) << 16 >> 16);
      if (sVar5 < 0) {
        heap.setU32(0x009a202c, (heap.u32(0x009a2016) + sVar5) >>> 0);
        if (heap.u32(0x009a202c) < 0) {
          heap.setU32(0x009a2020, (0) >>> 0);
          return uVar4;
        }
        if (heap.u32(0x009a202c) == 0) {
          heap.setU32(0x009a2020, (0) >>> 0);
          return uVar4;
        }
        heap.setU32(0x009a2020, (-sVar5) >>> 0);
        sVar5 = ((0) & 0xffff);
      } else {
        uVar4 = (((((((heap.i16((unaff_EDI + 8)) + heap.i16((unaff_EDI + 0xc)))) << 16 >> 16)) | 0) * ((sVar5) | 0)) >>> 0);
        _dstYBytes = uVar4 >>> 0;
      }
      sVar2 = ((heap.u32(0x009a202c)) & 0xffff);
      sVar6 = (((sVar5 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
      if ((sVar6 == 0 || (((sVar5 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar6) >>> 0), heap.u32(0x009a202c) != 0 && sVar6 <= sVar2)) {
        uVar4 = ((CONCAT22((((uVar4 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
        heap.setU32(0x009a2024, (0) >>> 0);
        heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
        sVar5 = (((in_CX + heap.u32(0x009a2018)) - heap.i16((unaff_EDI + 4))) << 16 >> 16);
        if (sVar5 < 0) {
          heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
          if (heap.u32(0x009a2028) < 0) {
            heap.setU32(0x009a2024, (0) >>> 0);
            return uVar4;
          }
          if (heap.u32(0x009a2028) == 0) {
            heap.setU32(0x009a2024, (0) >>> 0);
            return uVar4;
          }
          heap.setU32(0x009a2024, (-((sVar5) | 0)) >>> 0);
          sVar5 = ((0) & 0xffff);
        }
        sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
        sVar6 = (((sVar5 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
        if ((sVar6 == 0 || (((sVar5 + heap.u32(0x009a2028))) << 16 >> 16) < heap.i16((unaff_EDI + 8))) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0), heap.u32(0x009a2028) != 0 && sVar6 <= sVar2)) {
          heap.setU32(0x009a2030, (heap.i16((unaff_EDI + 8)) + heap.i16((unaff_EDI + 0xc))) >>> 0);
          // HAND-FIX (paint-ring wild-write): asm at 0x9b482d-0x9b48e4 does
          //   push edi; mov ebp, edi; mov esi, [0x9a2010]; mov edi, [ebp]
          //   ...clip math computing eax (= rowStride*rowOff) and ecx (= colOff)...
          //   add edi, eax        ; edi += y_offset_bytes
          //   add edi, ecx        ; edi += x_offset_bytes
          //   call 0x9b4911
          // The C decompile drops all of this (Ghidra register-promotion can't track
          // EDI being rewritten mid-function), so 9b4911 was receiving EDI=DPI-struct
          // (0x5f96d0) and treating the DPI struct itself as the destination row,
          // smearing pixels across [0x5f96d0..ec] — the paint-ring globals at +0x10.
          //
          // _dstYBytes holds the FULL 32-bit y_offset_bytes from line ~92
          // (= topDelta * (clipW+pitchExtra)); uVar4 was truncated by the
          // CONCAT22 at line ~97 (it carries the packed return value). sVar5 is
          // the x-offset (0 if x-clipped, else positive). Matches the asm's
          // `add edi, eax (full y-offset); add edi, ecx (x-offset)`.
          regs.ebp = unaff_EDI >>> 0;
          regs.esi = heap.u32(0x009a2010) >>> 0;
          regs.edi = (heap.u32(unaff_EDI) + _dstYBytes + (sVar5 << 16 >> 16)) >>> 0;
          uVar4 = (((regs.eax = FUN_009b4911(heap))) >>> 0);
          // Restore regs.edi for the surrounding code's `unaff_EDI` references.
          regs.edi = unaff_EDI >>> 0;
          uVar3 = ((heap.u32(0x009a2014)) >>> 0);
        }
      }
      heap.setU32(0x009a2014, (uVar3) >>> 0);
      return uVar4;
    }
    uVar4 = ((CONCAT22(sVar5, heap.u32(0x009a2016))) >>> 0);
    heap.setU32(0x009a202c, (heap.u32(0x009a2016)) >>> 0);
    uVar7 = (((in_DX + sVar5) - heap.i16((unaff_EDI + 6))) & 0xffff);
    // HAND-FIX (painter-noise / blitter-wild-write, same root cause as the
    // 9b4911 fix above): asm at 0x9b44b0-0x9b4659 sets up EDI=*DPI+y+x and
    // ESI=srcBase+y-x for the call to 9b4660. Ghidra's C decompile drops
    // this pure register dataflow. Track the same offsets in JS locals so we
    // can set regs.edi/regs.esi at the call site.
    let _dstYOff = 0; // dst row-offset bytes (added to *DPI)
    let _srcYOff = 0; // src row-offset bytes (added to srcBase, top-clip path)
    let _srcXSkip = 0; // src x-skip bytes (subtracted from src on left-clip)
    if (((uVar7) << 16 >> 16) < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a2016) + uVar7) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar4;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar4;
      }
      // Phase S+E-prep: JS operator-precedence fix. C source 9b438b.c:125
      // reads `(uVar3 & 0xffff) * (uint)(ushort)-uVar7 & 0xffff`, which in
      // C binds as `((W & 0xffff) * ((-uVar7) & 0xffff)) & 0xffff` because
      // `*` has higher precedence than `&`. The translator emitted
      // `(W & 0xffff) * (0 >>> 0) - uVar7 & 0xffff`, which in JS parses
      // as `((W * 0) - uVar7) & 0xffff` = `-uVar7 & 0xffff` — the `* W`
      // factor silently dropped. Affects zoom-0 bitmap path for sprites
      // clipped above the viewport top (uVar7 sign-extends negative);
      // the value is the source-byte-row skip (W * top-clip-rows).
      uVar4 = ((((uVar3 & 0xffff) * (((((0) >>> 0) - uVar7) & 0xffff) >>> 0)) & 0xffff) >>> 0);
      // asm 0x9b44e8-0x9b44fa: neg dx; ax = [0x9a2014]; mul dx; movzx eax,ax; add esi,eax
      _srcYOff = (((heap.u32(0x009a2014) & 0xffff) * ((-((uVar7 << 16) >> 16)) & 0xffff)) & 0xffff) >>> 0;
      uVar7 = ((0) & 0xffff);
    } else {
      uVar4 = ((((heap.i16((unaff_EDI + 8)) + heap.i16((unaff_EDI + 0xc))) >>> 0) * ((uVar7) >>> 0)) >>> 0);
      // asm 0x9b4511: add edi, eax (= uVar4 = (width+pitch_extra) * dy)
      // HAND-FIX (β2, dst-Y truncation): keep the FULL 32-bit y-offset; the
      // `& 0xffff` dropped the high bits, collapsing tiles with offset>0xffff
      // to screen-top (same bug as the RLE path). Verified vs the interpreter.
      _dstYOff = uVar4 >>> 0;
    }
    sVar5 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar2 = (((uVar7 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
    if ((sVar2 == 0 || (((uVar7 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar5)) {
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      // HAND-FIX (β2, u16-as-u32): the binary loads sprite WIDTH as a 16-bit
      // word here (`mov/movzx ax,[0x9a2014]`); the translator read the full
      // dword (W | H<<16), so ROW_STRIDE = dpi_w − (H<<16|W) + pitchExtra
      // underflowed to garbage (low16 ≈ 32 vs the binary's 639), collapsing
      // bitmap sprites vertically. Mask to 16-bit W. Verified vs the interpreter.
      heap.setU32(0x009a2030, ((heap.i16((unaff_EDI + 8)) - (heap.u32(0x009a2014) & 0xffff)) + heap.i16((unaff_EDI + 0xc))) >>> 0);
      uVar4 = ((CONCAT22((((uVar4 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2030))) >>> 0);
      // HAND-FIX (β2, COL_SKIP_B clobber): binary writes COL_SKIP_B as a
      // 16-bit word; setU32 overwrote the adjacent ROW_STRIDE (0x9a2030) with
      // 0 right after it was set, collapsing bitmap sprites into streaks.
      heap.setU16(0x009a202e, (0) >>> 0);
      sVar5 = (((in_CX + heap.u32(0x009a2018)) - heap.i16((unaff_EDI + 4))) << 16 >> 16);
      if (sVar5 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU16(0x009a202e, (0) >>> 0);
          return uVar4;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU16(0x009a202e, (0) >>> 0);
          return uVar4;
        }
        heap.setU16(0x009a202e, (-sVar5) >>> 0);
        heap.setU32(0x009a2030, (heap.u32(0x009a2030) - sVar5) >>> 0);
        // asm 0x9b4578: sub esi, ecx (with ecx<0 → esi += |ecx|)
        _srcXSkip = (-((sVar5 << 16) >> 16)) & 0xffff;
        sVar5 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar6 = (((sVar5 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
      if (sVar6 != 0 && heap.i16((unaff_EDI + 8)) <= (((sVar5 + heap.u32(0x009a2028))) << 16 >> 16)) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar2 < sVar6) {
          return uVar4;
        }
        heap.setU16(0x009a202e, (heap.u32(0x009a202e) + sVar6) >>> 0);
        heap.setU32(0x009a2030, (heap.u32(0x009a2030) + sVar6) >>> 0);
      }
      // HAND-FIX: precompute regs setup for 9b4660 calls (asm 0x9b45cc area).
      // edi = *DPI + dst_y_off_bytes + dst_x_off
      // esi = srcBase + src_y_off_bytes - src_x_skip
      // (For the RLE-decode branch, esi gets repointed to scratch buffer
      //  0x9a2032 + same offset.)
      const _dpiPtr = (heap.u32(unaff_EDI) + _dstYOff + (sVar5 & 0xffff)) >>> 0;
      const _srcOff = ((_srcYOff + _srcXSkip) | 0) & 0xffffffff;  // HAND-FIX (β2): binary does `sub esi,ecx` (ecx=leftDelta<0) = advance esi PAST the clipped source cols; was `- _srcXSkip` (retreat) → read garbage/swapped source.
      const _srcPtr = (heap.u32(0x009a2010) + _srcOff) >>> 0;
      const _setupRegs = () => {
        regs.ebp = (heap.i16(0x009a2030)) >>> 0; // movsx ebp, [0x9a2030]
        regs.edx = (heap.i16(0x009a202e)) >>> 0; // movsx edx, [0x9a202e]
        regs.eax = ((heap.u8(0x009a202c) << 8) & 0xff00) >>> 0; // mov ah, [0x9a202c]; al=0
        regs.ebx = heap.u32(0x009a2000) >>> 0;
        regs.edi = _dpiPtr;
      };
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar5 = ((heap.u32(0x009a2016) * heap.u32(0x009a2014)) & 0xffff);
        pbVar11 = ((0x009a2032) >>> 0);
        while (sVar5 != 0) {
          bVar1 = ((heap.u8(pbVar9)) & 0xff);
          uVar3 = ((((bVar1) >>> 0)) >>> 0);
          if (((bVar1) << 24 >> 24) < 0) {
            pbVar10 = ((pbVar9 + 1) >>> 0);
            sVar5 = ((sVar5 - ((0) & 0xffff) - (((bVar1) << 24 >> 24) >> 3)) & 0xffff);
            pbVar9 = ((pbVar9 + 2) >>> 0);
            pbVar10 = ((pbVar11 + -((CONCAT11(bVar1, heap.u8(pbVar10)) & 0x7ff) >>> 0)) >>> 0);
            for (uVar3 = ((((0) >>> 0) - (((bVar1) << 24 >> 24) >> 3)) >>> 0); uVar3 != 0; uVar3 = (((uVar3 - 1) >>> 0)) >>> 0) {
              heap.setU8(pbVar11, (heap.u8(pbVar10)) & 0xff);
              pbVar10 = ((pbVar10 + 1) >>> 0);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          } else {
            sVar5 = ((sVar5 - ((bVar1) & 0xffff)) & 0xffff);
            for (; pbVar9 = ((pbVar9 + 1) >>> 0), uVar3 != 0; uVar3 = (((uVar3 - 1) >>> 0)) >>> 0) {
              heap.setU8(pbVar11, (heap.u8(pbVar9)) & 0xff);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          }
        }
        _setupRegs();
        regs.esi = (0x009a2032 + _srcOff) >>> 0;
        uVar3 = (((regs.eax = FUN_009b4660(heap))) >>> 0);
        regs.edi = unaff_EDI >>> 0;
        return uVar3;
      }
      _setupRegs();
      regs.esi = _srcPtr;
      uVar4 = (((regs.eax = FUN_009b4660(heap))) >>> 0);
      regs.edi = unaff_EDI >>> 0;
      uVar3 = ((heap.u32(0x009a2014)) >>> 0);
    }
    heap.setU32(0x009a2014, (uVar3) >>> 0);
    return uVar4;
  }
  if (heap.i16((unaff_EDI + 0xe)) != 1) {
    uVar3 = (((regs.eax = FUN_009b8491(heap))) >>> 0);
    return uVar3;
  }
  if ((heap.u16((0x008dc0c0 + iVar8)) & 0x20) != 0) {
    return in_EAX;
  }
  if ((heap.u16((0x008dc0c0 + iVar8)) & 0x10) != 0) {
    heap.setI16((unaff_EDI + 0xe), (heap.i16((unaff_EDI + 0xe)) + -1) & 0xffff);
    heap.setI16((unaff_EDI + 4), (heap.i16((unaff_EDI + 4)) >> 1) & 0xffff);
    heap.setI16((unaff_EDI + 6), (heap.i16((unaff_EDI + 6)) >> 1) & 0xffff);
    heap.setI16((unaff_EDI + 8), (heap.i16((unaff_EDI + 8)) >> 1) & 0xffff);
    heap.setI16((unaff_EDI + 10), (heap.i16((unaff_EDI + 10)) >> 1) & 0xffff);
    // HAND-FIX (painter-noise root cause, same as 9b8491/9b4457):
    // advance EBX to sub-sprite handle + halve CX/DX before recursive call.
    regs.ebx = heap.u16(iVar8 + 0x008dc0c2) >>> 0;
    regs.ecx = ((((regs.ecx << 16) >> 16) >> 1)) & 0xffff;
    regs.edx = ((((regs.edx << 16) >> 16) >> 1)) & 0xffff;
    uVar3 = (((regs.eax = FUN_009b4457(heap))) >>> 0);
    heap.setI16((unaff_EDI + 0xe), (heap.i16((unaff_EDI + 0xe)) + 1) & 0xffff);
    heap.setI16((unaff_EDI + 4), (heap.i16((unaff_EDI + 4)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 6), (heap.i16((unaff_EDI + 6)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 8), (heap.i16((unaff_EDI + 8)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 10), (heap.i16((unaff_EDI + 10)) << 1) & 0xffff);
    return uVar3;
  }
  pbVar9 = ((heap.u32((0x008dc0b4) + (uVar3 * 4) * 4)) >>> 0);
  uVar3 = ((heap.u32((0x008dc0b8 + iVar8))) >>> 0);
  heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + iVar8))) >>> 0);
  heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + iVar8))) >>> 0);
  sVar5 = (((((heap.u32(0x009a2018) >>> 0x10)) << 16 >> 16)) & 0xffff);
  heap.setU32(0x009a2014, (((uVar3) << 16 >> 16)) >>> 0);
  heap.setU16(0x009a2016, ((((uVar3 >>> 0x10)) << 16 >> 16)) & 0xffff);
  heap.setU32(0x009a2010, (pbVar9) >>> 0);
  heap.setU32(0x009a2014, (uVar3) >>> 0);
  if ((heap.u32(0x009a201c) & 4) != 0) {
    uVar4 = ((CONCAT22(sVar5, heap.u32(0x009a2016))) >>> 0);
    heap.setU32(0x009a2020, (0) >>> 0);
    if ((uVar3 & 0x10000) != 0) {
      uVar4 = ((CONCAT22(sVar5, heap.u32(0x009a2016) + -1)) >>> 0);
      if ((((heap.u32(0x009a2016) + -1)) << 16 >> 16) == 0) {
        heap.setU32(0x009a2020, (0) >>> 0);
        return uVar4;
      }
      heap.setU32(0x009a2020, (1) >>> 0);
    }
    heap.setU32(0x009a202c, (((uVar4) << 16 >> 16)) >>> 0);
    uVar7 = (((in_DX + sVar5 & 0xfffe) - heap.i16((unaff_EDI + 6))) & 0xffff);
    // HAND-FIX (painter-noise / blitter-wild-write — path C, flag-4 set,
    // zoom-1, calls 9b6863): asm 0x9b6751-0x9b685c sets up EDI=*DPI+y+x/2
    // and leaves ESI=srcBase (no x-skip in path C). Mirror the dst-offset
    // tracking; no src adjustments since asm doesn't touch ESI here.
    let _dstYOff_C = 0;
    if (((uVar7) << 16 >> 16) < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a202c) + uVar7) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar4;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar4;
      }
      heap.setU32(0x009a2020, (heap.u32(0x009a2020) - uVar7) >>> 0);
      uVar7 = ((0) & 0xffff);
    } else {
      uVar4 = ((((((((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc)))) << 16 >> 16)) | 0) * (((((uVar7 >>> 1)) << 16 >> 16)) | 0)) >>> 0);
      // asm 0x9b67d3: add edi, eax (= (width/2 + pitch_extra) * (dy/2))
      _dstYOff_C = uVar4 & 0xffff;
    }
    sVar5 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar2 = (((uVar7 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
    if ((sVar2 == 0 || (((uVar7 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar5)) {
      uVar4 = ((CONCAT22((((uVar4 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
      heap.setU32(0x009a2024, (0) >>> 0);
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      sVar5 = (((in_CX + heap.u32(0x009a2018) & 0xfffe) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar5 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar4;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar4;
        }
        heap.setU32(0x009a2024, (-((sVar5) | 0)) >>> 0);
        sVar5 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar6 = (((sVar5 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
      if ((sVar6 == 0 || (((sVar5 + heap.u32(0x009a2028))) << 16 >> 16) < heap.i16((unaff_EDI + 8))) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0), heap.u32(0x009a2028) != 0 && sVar6 <= sVar2)) {
        heap.setU32(0x009a2030, ((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc))) >>> 0);
        // HAND-FIX: setup regs for 9b6863 call. asm 0x9b6831: add edi, cx>>1.
        // (cx was zeroed at 0x9b6826 if left-clipped, so sVar5 holds the
        // post-clip value already.)
        const _dstXOff_C = ((sVar5 & 0xffff) >>> 1);
        regs.ebx = heap.u32(0x009a2000) >>> 0;
        regs.esi = heap.u32(0x009a2010) >>> 0;
        regs.ebp = unaff_EDI >>> 0; // 0x9b6752: mov ebp, edi (DPI ptr)
        regs.edi = (heap.u32(unaff_EDI) + _dstYOff_C + _dstXOff_C) >>> 0;
        uVar4 = (((regs.eax = FUN_009b6863(heap))) >>> 0);
        regs.edi = unaff_EDI >>> 0;
        uVar3 = ((heap.u32(0x009a2014)) >>> 0);
      }
    }
    heap.setU32(0x009a2014, (uVar3) >>> 0);
    return uVar4;
  }
  sVar2 = ((heap.u32(0x009a2016)) & 0xffff);
  // HAND-FIX (painter-noise / blitter-wild-write — path D, flag-4 not set,
  // zoom-1, calls 9b64ea): asm 0x9b631d-0x9b645c sets up EDI=*DPI+y+x/2 and
  // ESI=srcBase+interlace+y-x. Mirror the offsets so we can set regs at the
  // call site.
  let _srcInterlace_D = 0;
  if ((uVar3 & 0x10000) != 0) {
    sVar2 = ((heap.u32(0x009a2016) + -1) & 0xffff);
    // asm 0x9b6345: add esi, ebx (= stride_src) when interlace bit set
    _srcInterlace_D = heap.u32(0x009a2014) & 0xffff;
  }
  uVar4 = ((CONCAT22(sVar5, sVar2)) >>> 0);
  if (sVar2 != 0) {
    uVar7 = (((in_DX + sVar5 & 0xfffe) - heap.i16((unaff_EDI + 6))) & 0xffff);
    let _dstYOff_D = 0;
    let _srcYOff_D = 0;
    let _srcXSkip_D = 0;
    if (((uVar7) << 16 >> 16) < 0) {
      heap.setU32(0x009a202c, (sVar2 + uVar7) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar4;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar4;
      }
      // Phase S+E-prep: JS operator-precedence fix. C source 9b438b.c:304
      // mirrors the line 125 expression for the zoom-1 bitmap path. Same
      // bug class: `(W & 0xffff) * (0 >>> 0) - uVar7 & 0xffff` in JS is
      // `(W*0) - (uVar7 & 0xffff)`, missing the `* W` multiply that the
      // C intends — `((W & 0xffff) * ((-uVar7) & 0xffff)) & 0xffff`.
      uVar4 = ((((uVar3 & 0xffff) * (((((0) >>> 0) - uVar7) & 0xffff) >>> 0)) & 0xffff) >>> 0);
      // asm 0x9b6373-0x9b6385: neg dx; ax = [0x9a2014]; mul dx; movzx eax,ax; add esi, eax
      _srcYOff_D = (((heap.u32(0x009a2014) & 0xffff) * ((-((uVar7 << 16) >> 16)) & 0xffff)) & 0xffff) >>> 0;
      uVar7 = ((0) & 0xffff);
    } else {
      uVar4 = (((((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc))) >>> 0) * ((uVar7 >>> 1) >>> 0)) >>> 0);
      heap.setU32(0x009a202c, (sVar2) >>> 0);
      // asm 0x9b63a1: add edi, eax (= (width/2 + pitch_extra) * (dy/2))
      _dstYOff_D = uVar4 & 0xffff;
    }
    sVar5 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar2 = (((uVar7 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
    if ((sVar2 == 0 || (((uVar7 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar5)) {
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a2030, ((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc))) >>> 0);
      uVar4 = ((CONCAT22((((uVar4 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2030))) >>> 0);
      heap.setU16(0x009a202e, (0) >>> 0);
      sVar5 = (((in_CX + heap.u32(0x009a2018) & 0xfffe) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar5 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU16(0x009a202e, (0) >>> 0);
          return uVar4;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU16(0x009a202e, (0) >>> 0);
          return uVar4;
        }
        heap.setU16(0x009a202e, (-sVar5) >>> 0);
        // asm 0x9b6409: sub esi, ecx (ecx<0 → esi += |ecx|)
        _srcXSkip_D = (-((sVar5 << 16) >> 16)) & 0xffff;
        sVar5 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar6 = (((sVar5 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
      if (sVar6 != 0 && heap.i16((unaff_EDI + 8)) <= (((sVar5 + heap.u32(0x009a2028))) << 16 >> 16)) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar2 < sVar6) {
          return uVar4;
        }
        heap.setU16(0x009a202e, (heap.u32(0x009a202e) + sVar6) >>> 0);
      }
      // HAND-FIX: precompute regs setup for 9b64ea calls.
      //   edi = *DPI + dst_y + (dst_x>>1)
      //   esi = srcBase + interlace + src_y - src_x_skip   (non-RLE call)
      //   esi = 0x9a2032 + interlace + src_y - src_x_skip  (RLE call)
      const _dstXOff_D = ((sVar5 & 0xffff) >>> 1);
      const _dpiPtr_D = (heap.u32(unaff_EDI) + _dstYOff_D + _dstXOff_D) >>> 0;
      const _srcOff_D = ((_srcInterlace_D + _srcYOff_D - _srcXSkip_D) | 0) & 0xffffffff;
      const _srcPtr_D = (heap.u32(0x009a2010) + _srcOff_D) >>> 0;
      const _setupRegs_D = () => {
        regs.ebp = (heap.i16(0x009a2030)) >>> 0;
        regs.edx = (heap.i16(0x009a202e)) >>> 0;
        regs.eax = ((heap.u8(0x009a202c) << 8) & 0xff00) >>> 0;
        regs.ebx = heap.u32(0x009a2000) >>> 0;
        regs.edi = _dpiPtr_D;
      };
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar5 = ((heap.u32(0x009a2016) * heap.u32(0x009a2014)) & 0xffff);
        pbVar11 = ((0x009a2032) >>> 0);
        while (sVar5 != 0) {
          bVar1 = ((heap.u8(pbVar9)) & 0xff);
          uVar3 = ((((bVar1) >>> 0)) >>> 0);
          if (((bVar1) << 24 >> 24) < 0) {
            pbVar10 = ((pbVar9 + 1) >>> 0);
            sVar5 = ((sVar5 - ((0) & 0xffff) - (((bVar1) << 24 >> 24) >> 3)) & 0xffff);
            pbVar9 = ((pbVar9 + 2) >>> 0);
            pbVar10 = ((pbVar11 + -((CONCAT11(bVar1, heap.u8(pbVar10)) & 0x7ff) >>> 0)) >>> 0);
            for (uVar3 = ((((0) >>> 0) - (((bVar1) << 24 >> 24) >> 3)) >>> 0); uVar3 != 0; uVar3 = (((uVar3 - 1) >>> 0)) >>> 0) {
              heap.setU8(pbVar11, (heap.u8(pbVar10)) & 0xff);
              pbVar10 = ((pbVar10 + 1) >>> 0);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          } else {
            sVar5 = ((sVar5 - ((bVar1) & 0xffff)) & 0xffff);
            for (; pbVar9 = ((pbVar9 + 1) >>> 0), uVar3 != 0; uVar3 = (((uVar3 - 1) >>> 0)) >>> 0) {
              heap.setU8(pbVar11, (heap.u8(pbVar9)) & 0xff);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          }
        }
        _setupRegs_D();
        regs.esi = (0x009a2032 + _srcOff_D) >>> 0;
        uVar3 = (((regs.eax = FUN_009b64ea(heap))) >>> 0);
        regs.edi = unaff_EDI >>> 0;
        return uVar3;
      }
      _setupRegs_D();
      regs.esi = _srcPtr_D;
      uVar4 = (((regs.eax = FUN_009b64ea(heap))) >>> 0);
      regs.edi = unaff_EDI >>> 0;
      uVar3 = ((heap.u32(0x009a2014)) >>> 0);
    }
  }
  heap.setU32(0x009a2014, (uVar3) >>> 0);
  return uVar4;
}
