// @manual — do not regenerate.
// Source: decompiled/c/9b4457.c — remap-palette sprite blit (called from
// FUN_009b438b's remap branch and from the toolbar-paint chain).
//
// Translator bug: the C expression `(byte)-((char)bVar1 >> 3)` (an RLE
// length 1..16 packed in the top byte of a sprite RLE marker) uses a
// SIGNED right-shift of the sign-extended byte. Ghidra's C uses `>>`
// (signed); the auto-translator emitted `>>> 3` (unsigned) — which for
// a negative input gives ~0x1FFFFFFF instead of -16..-1. With the
// negation and `(byte)` cast, the negative-shift case was fine in the
// pre-csg1 baseline (data section was full of zero, so the loops never
// ran), but with csg1.dat loaded the RLE bytes have real values and
// the inner `for (uVar7 = -((char)bVar1 >> 3); uVar7; ...)` loop ran
// ~530M times — the Phase H→I hang we tracked from MainOpen's top
// toolbar paint chain (42afb5 → 9b438b → 9b4457).
//
// Fix: change `>>> 3` to `>> 3` on all 4 sites (sVar4 decrement and
// for-loop init, in both the zoom-0 and zoom-1 branches). Same class
// of bug as the Phase F RLE-decompress fix in 42f999.js.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_009b4660 } from "./9b4660.js";
import { FUN_009b4911 } from "./9b4911.js";
import { FUN_009b64ea } from "./9b64ea.js";
import { FUN_009b6863 } from "./9b6863.js";
import { FUN_009b8491 } from "./9b8491.js";
export function FUN_009b4457(heap) {
  let bVar1 = 0;
  let sVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar3 = 0;
  let in_CX = regs.ecx & 0xffff;
  let sVar4 = 0;
  let sVar5 = 0;
  let in_DX = regs.edx & 0xffff;
  let uVar6 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let pbVar9 = 0;
  let pbVar10 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let pbVar11 = 0;
  uVar7 = ((unaff_EBX & 0x1ffff) >>> 0);
  iVar8 = ((uVar7 * 0x10) >>> 0);
  // HAND-FIX (painter-noise root cause): the asm prologue at 0x9b4457 is
  //   81 e3 ff ff 01 00     and ebx, 0x1ffff
  //   c1 e3 04              shl ebx, 4
  // which leaves EBX = iVar8 (the scaled sprite-class offset) for the rest
  // of the function AND for any callee. The C decompile hides this because
  // Ghidra promotes the scaled value into `iVar8` and treats `unaff_EBX` as
  // const. But the tail-call `jmp 9b8491` at offset 0x40 (via the `if zoom !=
  // 1` branch translated as `e9 1f 40 00 00 jmp +0x401f`) hands EBX off to
  // 9b8491, which then uses it as `[ebx + 0x8dc0c0]`. Without this update,
  // 9b8491 would read the WRONG class entry (offset by raw EBX instead of
  // iVar8). Update regs.ebx so the JS port matches the binary's register
  // state at every callee boundary.
  regs.ebx = iVar8 >>> 0;
  if (heap.i16((unaff_EDI + 0xe)) == 0) {
    pbVar9 = ((heap.u32((0x008dc0b4) + (uVar7 * 4) * 4)) >>> 0);
    uVar7 = ((heap.u32((0x008dc0b8 + iVar8))) >>> 0);
    heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + iVar8))) >>> 0);
    heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + iVar8))) >>> 0);
    sVar4 = (((((heap.u32(0x009a2018) >>> 0x10)) << 16 >> 16)) & 0xffff);
    heap.setU32(0x009a2014, (((uVar7) << 16 >> 16)) >>> 0);
    heap.setU32(0x009a2016, ((((uVar7 >>> 0x10)) << 16 >> 16)) >>> 0);
    heap.setU32(0x009a2010, (pbVar9) >>> 0);
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    if ((heap.u32(0x009a201c) & 4) != 0) {
      uVar3 = ((CONCAT22(sVar4, heap.u32(0x009a2016))) >>> 0);
      heap.setU32(0x009a2020, (0) >>> 0);
      heap.setU32(0x009a202c, (heap.u32(0x009a2016)) >>> 0);
      sVar4 = (((in_DX + sVar4) - heap.i16((unaff_EDI + 6))) & 0xffff);
      if (sVar4 < 0) {
        heap.setU32(0x009a202c, (heap.u32(0x009a2016) + sVar4) >>> 0);
        if (heap.u32(0x009a202c) < 0) {
          heap.setU32(0x009a2020, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a202c) == 0) {
          heap.setU32(0x009a2020, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a2020, (-sVar4) >>> 0);
        sVar4 = ((0) & 0xffff);
      } else {
        uVar3 = (((((((heap.i16((unaff_EDI + 8)) + heap.i16((unaff_EDI + 0xc)))) << 16 >> 16)) | 0) * ((sVar4) | 0)) >>> 0);
      }
      sVar2 = ((heap.u32(0x009a202c)) & 0xffff);
      sVar5 = (((sVar4 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
      if ((sVar5 == 0 || (((sVar4 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar5) >>> 0), heap.u32(0x009a202c) != 0 && sVar5 <= sVar2)) {
        uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
        heap.setU32(0x009a2024, (0) >>> 0);
        heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
        sVar4 = (((in_CX + heap.u32(0x009a2018)) - heap.i16((unaff_EDI + 4))) & 0xffff);
        if (sVar4 < 0) {
          heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar4) >>> 0);
          if (heap.u32(0x009a2028) < 0) {
            heap.setU32(0x009a2024, (0) >>> 0);
            return uVar3;
          }
          if (heap.u32(0x009a2028) == 0) {
            heap.setU32(0x009a2024, (0) >>> 0);
            return uVar3;
          }
          heap.setU32(0x009a2024, (-((sVar4) | 0)) >>> 0);
          sVar4 = ((0) & 0xffff);
        }
        sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
        sVar5 = (((sVar4 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
        if ((sVar5 == 0 || (((sVar4 + heap.u32(0x009a2028))) << 16 >> 16) < heap.i16((unaff_EDI + 8))) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0), heap.u32(0x009a2028) != 0 && sVar5 <= sVar2)) {
          heap.setU32(0x009a2030, (heap.i16((unaff_EDI + 8)) + heap.i16((unaff_EDI + 0xc))) >>> 0);
          // HAND-FIX (paint-ring wild-write — same as 9b438b path A): set EDI
          // to dst pixel ptr = *DPI + y_offset_bytes + x_offset.
          // (uVar3 holds y_offset_bytes from line 90 above; sVar4 = x_offset
          //  after possible zeroing at line 110.)
          regs.ebp = unaff_EDI >>> 0;
          regs.esi = heap.u32(0x009a2010) >>> 0;
          regs.edi = (heap.u32(unaff_EDI) + uVar3 + (sVar4 << 16 >> 16)) >>> 0;
          uVar3 = (((regs.eax = FUN_009b4911(heap))) >>> 0);
          regs.edi = unaff_EDI >>> 0;
          uVar7 = ((heap.u32(0x009a2014)) >>> 0);
        }
      }
      heap.setU32(0x009a2014, (uVar7) >>> 0);
      return uVar3;
    }
    uVar3 = ((CONCAT22(sVar4, heap.u32(0x009a2016))) >>> 0);
    heap.setU32(0x009a202c, (heap.u32(0x009a2016)) >>> 0);
    uVar6 = (((in_DX + sVar4) - heap.i16((unaff_EDI + 6))) & 0xffff);
    // HAND-FIX (painter-noise / blitter-wild-write — path B, calls 9b4660):
    // mirror 9b438b.js path-B fix. Track dst-EDI offsets and src-ESI
    // offsets that asm 0x9b44b0-0x9b4659 computes but Ghidra's C drops.
    let _dstYOff = 0;
    let _srcYOff = 0;
    let _srcXSkip = 0;
    if (((uVar6) << 16 >> 16) < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a2016) + uVar6) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar3;
      }
      uVar3 = (((uVar7 & 0xffff) * ((0) >>> 0) - uVar6 & 0xffff) >>> 0);
      _srcYOff = (((heap.u32(0x009a2014) & 0xffff) * ((-((uVar6 << 16) >> 16)) & 0xffff)) & 0xffff) >>> 0;
      uVar6 = ((0) & 0xffff);
    } else {
      uVar3 = ((((heap.i16((unaff_EDI + 8)) + heap.i16((unaff_EDI + 0xc))) >>> 0) * ((uVar6) >>> 0)) >>> 0);
      _dstYOff = uVar3 & 0xffff;
    }
    sVar4 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar2 = (((uVar6 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
    if ((sVar2 == 0 || (((uVar6 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar4)) {
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a2030, ((heap.i16((unaff_EDI + 8)) - heap.u32(0x009a2014)) + heap.i16((unaff_EDI + 0xc))) >>> 0);
      uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2030))) >>> 0);
      heap.setU32(0x009a202e, (0) >>> 0);
      sVar4 = (((in_CX + heap.u32(0x009a2018)) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar4 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar4) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a202e, (-sVar4) >>> 0);
        heap.setU32(0x009a2030, (heap.u32(0x009a2030) - sVar4) >>> 0);
        _srcXSkip = (-((sVar4 << 16) >> 16)) & 0xffff;
        sVar4 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar5 = (((sVar4 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
      if (sVar5 != 0 && heap.i16((unaff_EDI + 8)) <= (((sVar4 + heap.u32(0x009a2028))) << 16 >> 16)) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar2 < sVar5) {
          return uVar3;
        }
        heap.setU32(0x009a202e, (heap.u32(0x009a202e) + sVar5) >>> 0);
        heap.setU32(0x009a2030, (heap.u32(0x009a2030) + sVar5) >>> 0);
      }
      const _dpiPtr = (heap.u32(unaff_EDI) + _dstYOff + (sVar4 & 0xffff)) >>> 0;
      const _srcOff = ((_srcYOff - _srcXSkip) | 0) & 0xffffffff;
      const _srcPtr = (heap.u32(0x009a2010) + _srcOff) >>> 0;
      const _setupRegs = () => {
        regs.ebp = (heap.i16(0x009a2030)) >>> 0;
        regs.edx = (heap.i16(0x009a202e)) >>> 0;
        regs.eax = ((heap.u8(0x009a202c) << 8) & 0xff00) >>> 0;
        regs.ebx = heap.u32(0x009a2000) >>> 0;
        regs.edi = _dpiPtr;
      };
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar4 = ((heap.u32(0x009a2016) * heap.u32(0x009a2014)) & 0xffff);
        pbVar11 = ((0x009a2032) >>> 0);
        while (sVar4 != 0) {
          bVar1 = ((heap.u8(pbVar9)) & 0xff);
          uVar7 = ((((bVar1) >>> 0)) >>> 0);
          if (((bVar1) << 24 >> 24) < 0) {
            pbVar10 = ((pbVar9 + 1) >>> 0);
            sVar4 = ((sVar4 - ((0) & 0xffff) - (((bVar1) << 24 >> 24) >> 3)) & 0xffff);
            pbVar9 = ((pbVar9 + 2) >>> 0);
            pbVar10 = ((pbVar11 + -((CONCAT11(bVar1, heap.u8(pbVar10)) & 0x7ff) >>> 0)) >>> 0);
            for (uVar7 = ((((0) >>> 0) - (((bVar1) << 24 >> 24) >> 3)) >>> 0); uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU32(pbVar11, (heap.u8(pbVar10)) & 0xffffffff);
              pbVar10 = ((pbVar10 + 1) >>> 0);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          } else {
            sVar4 = ((sVar4 - ((bVar1) & 0xffff)) & 0xffff);
            for (; pbVar9 = ((pbVar9 + 1) >>> 0), uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU32(pbVar11, (heap.u8(pbVar9)) & 0xffffffff);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          }
        }
        _setupRegs();
        regs.esi = (0x009a2032 + _srcOff) >>> 0;
        uVar7 = (((regs.eax = FUN_009b4660(heap))) >>> 0);
        regs.edi = unaff_EDI >>> 0;
        return uVar7;
      }
      _setupRegs();
      regs.esi = _srcPtr;
      uVar3 = (((regs.eax = FUN_009b4660(heap))) >>> 0);
      regs.edi = unaff_EDI >>> 0;
      uVar7 = ((heap.u32(0x009a2014)) >>> 0);
    }
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    return uVar3;
  }
  if (heap.i16((unaff_EDI + 0xe)) != 1) {
    uVar7 = (((regs.eax = FUN_009b8491(heap))) >>> 0);
    return uVar7;
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
    // HAND-FIX (painter-noise root cause, same pattern as 9b8491): advance
    // EBX to sub-sprite handle from class[+2], then halve CX/DX. These are
    // dropped by Ghidra C decompile (pure register dataflow). Without them
    // the recursion (calling itself) never advances past the original sprite
    // and the zoom field underflows unboundedly.
    regs.ebx = heap.u16(iVar8 + 0x008dc0c2) >>> 0;
    regs.ecx = ((((regs.ecx << 16) >> 16) >> 1)) & 0xffff;
    regs.edx = ((((regs.edx << 16) >> 16) >> 1)) & 0xffff;
    uVar7 = (((regs.eax = FUN_009b4457(heap))) >>> 0);
    heap.setI16((unaff_EDI + 0xe), (heap.i16((unaff_EDI + 0xe)) + 1) & 0xffff);
    heap.setI16((unaff_EDI + 4), (heap.i16((unaff_EDI + 4)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 6), (heap.i16((unaff_EDI + 6)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 8), (heap.i16((unaff_EDI + 8)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 10), (heap.i16((unaff_EDI + 10)) << 1) & 0xffff);
    return uVar7;
  }
  pbVar9 = ((heap.u32((0x008dc0b4) + (uVar7 * 4) * 4)) >>> 0);
  uVar7 = ((heap.u32((0x008dc0b8 + iVar8))) >>> 0);
  heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + iVar8))) >>> 0);
  heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + iVar8))) >>> 0);
  sVar4 = (((((heap.u32(0x009a2018) >>> 0x10)) << 16 >> 16)) & 0xffff);
  heap.setU32(0x009a2014, (((uVar7) << 16 >> 16)) >>> 0);
  heap.setU32(0x009a2016, ((((uVar7 >>> 0x10)) << 16 >> 16)) >>> 0);
  heap.setU32(0x009a2010, (pbVar9) >>> 0);
  heap.setU32(0x009a2014, (uVar7) >>> 0);
  if ((heap.u32(0x009a201c) & 4) != 0) {
    uVar3 = ((CONCAT22(sVar4, heap.u32(0x009a2016))) >>> 0);
    heap.setU32(0x009a2020, (0) >>> 0);
    if ((uVar7 & 0x10000) != 0) {
      uVar3 = ((CONCAT22(sVar4, heap.u32(0x009a2016) + -1)) >>> 0);
      if ((((heap.u32(0x009a2016) + -1)) << 16 >> 16) == 0) {
        heap.setU32(0x009a2020, (0) >>> 0);
        return uVar3;
      }
      heap.setU32(0x009a2020, (1) >>> 0);
    }
    heap.setU32(0x009a202c, (((uVar3) << 16 >> 16)) >>> 0);
    uVar6 = (((in_DX + sVar4 & 0xfffe) - heap.i16((unaff_EDI + 6))) & 0xffff);
    // HAND-FIX (painter-noise / blitter-wild-write — path C, calls 9b6863):
    // mirror 9b438b.js path-C fix.
    let _dstYOff_C = 0;
    if (((uVar6) << 16 >> 16) < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a202c) + uVar6) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar3;
      }
      heap.setU32(0x009a2020, (heap.u32(0x009a2020) - uVar6) >>> 0);
      uVar6 = ((0) & 0xffff);
    } else {
      uVar3 = ((((((((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc)))) << 16 >> 16)) | 0) * (((((uVar6 >>> 1)) << 16 >> 16)) | 0)) >>> 0);
      _dstYOff_C = uVar3 & 0xffff;
    }
    sVar4 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar2 = (((uVar6 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
    if ((sVar2 == 0 || (((uVar6 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar4)) {
      uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
      heap.setU32(0x009a2024, (0) >>> 0);
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      sVar4 = (((in_CX + heap.u32(0x009a2018) & 0xfffe) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar4 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar4) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a2024, (-((sVar4) | 0)) >>> 0);
        sVar4 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar5 = (((sVar4 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
      if ((sVar5 == 0 || (((sVar4 + heap.u32(0x009a2028))) << 16 >> 16) < heap.i16((unaff_EDI + 8))) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0), heap.u32(0x009a2028) != 0 && sVar5 <= sVar2)) {
        heap.setU32(0x009a2030, ((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc))) >>> 0);
        const _dstXOff_C = ((sVar4 & 0xffff) >>> 1);
        regs.ebx = heap.u32(0x009a2000) >>> 0;
        regs.esi = heap.u32(0x009a2010) >>> 0;
        regs.ebp = unaff_EDI >>> 0;
        regs.edi = (heap.u32(unaff_EDI) + _dstYOff_C + _dstXOff_C) >>> 0;
        uVar3 = (((regs.eax = FUN_009b6863(heap))) >>> 0);
        regs.edi = unaff_EDI >>> 0;
        uVar7 = ((heap.u32(0x009a2014)) >>> 0);
      }
    }
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    return uVar3;
  }
  sVar2 = ((heap.u32(0x009a2016)) & 0xffff);
  // HAND-FIX (painter-noise / blitter-wild-write — path D, calls 9b64ea):
  // mirror 9b438b.js path-D fix.
  let _srcInterlace_D = 0;
  if ((uVar7 & 0x10000) != 0) {
    sVar2 = ((heap.u32(0x009a2016) + -1) & 0xffff);
    _srcInterlace_D = heap.u32(0x009a2014) & 0xffff;
  }
  uVar3 = ((CONCAT22(sVar4, sVar2)) >>> 0);
  if (sVar2 != 0) {
    uVar6 = (((in_DX + sVar4 & 0xfffe) - heap.i16((unaff_EDI + 6))) & 0xffff);
    let _dstYOff_D = 0;
    let _srcYOff_D = 0;
    let _srcXSkip_D = 0;
    if (((uVar6) << 16 >> 16) < 0) {
      heap.setU32(0x009a202c, (sVar2 + uVar6) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar3;
      }
      uVar3 = (((uVar7 & 0xffff) * ((0) >>> 0) - uVar6 & 0xffff) >>> 0);
      _srcYOff_D = (((heap.u32(0x009a2014) & 0xffff) * ((-((uVar6 << 16) >> 16)) & 0xffff)) & 0xffff) >>> 0;
      uVar6 = ((0) & 0xffff);
    } else {
      uVar3 = (((((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc))) >>> 0) * ((uVar6 >>> 1) >>> 0)) >>> 0);
      heap.setU32(0x009a202c, (sVar2) >>> 0);
      _dstYOff_D = uVar3 & 0xffff;
    }
    sVar4 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar2 = (((uVar6 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
    if ((sVar2 == 0 || (((uVar6 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar4)) {
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a2030, ((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc))) >>> 0);
      uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2030))) >>> 0);
      heap.setU32(0x009a202e, (0) >>> 0);
      sVar4 = (((in_CX + heap.u32(0x009a2018) & 0xfffe) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar4 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar4) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a202e, (-sVar4) >>> 0);
        _srcXSkip_D = (-((sVar4 << 16) >> 16)) & 0xffff;
        sVar4 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar5 = (((sVar4 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
      if (sVar5 != 0 && heap.i16((unaff_EDI + 8)) <= (((sVar4 + heap.u32(0x009a2028))) << 16 >> 16)) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar2 < sVar5) {
          return uVar3;
        }
        heap.setU32(0x009a202e, (heap.u32(0x009a202e) + sVar5) >>> 0);
      }
      const _dstXOff_D = ((sVar4 & 0xffff) >>> 1);
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
        sVar4 = ((heap.u32(0x009a2016) * heap.u32(0x009a2014)) & 0xffff);
        pbVar11 = ((0x009a2032) >>> 0);
        while (sVar4 != 0) {
          bVar1 = ((heap.u8(pbVar9)) & 0xff);
          uVar7 = ((((bVar1) >>> 0)) >>> 0);
          if (((bVar1) << 24 >> 24) < 0) {
            pbVar10 = ((pbVar9 + 1) >>> 0);
            sVar4 = ((sVar4 - ((0) & 0xffff) - (((bVar1) << 24 >> 24) >> 3)) & 0xffff);
            pbVar9 = ((pbVar9 + 2) >>> 0);
            pbVar10 = ((pbVar11 + -((CONCAT11(bVar1, heap.u8(pbVar10)) & 0x7ff) >>> 0)) >>> 0);
            for (uVar7 = ((((0) >>> 0) - (((bVar1) << 24 >> 24) >> 3)) >>> 0); uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU32(pbVar11, (heap.u8(pbVar10)) & 0xffffffff);
              pbVar10 = ((pbVar10 + 1) >>> 0);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          } else {
            sVar4 = ((sVar4 - ((bVar1) & 0xffff)) & 0xffff);
            for (; pbVar9 = ((pbVar9 + 1) >>> 0), uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU32(pbVar11, (heap.u8(pbVar9)) & 0xffffffff);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          }
        }
        _setupRegs_D();
        regs.esi = (0x009a2032 + _srcOff_D) >>> 0;
        uVar7 = (((regs.eax = FUN_009b64ea(heap))) >>> 0);
        regs.edi = unaff_EDI >>> 0;
        return uVar7;
      }
      _setupRegs_D();
      regs.esi = _srcPtr_D;
      uVar3 = (((regs.eax = FUN_009b64ea(heap))) >>> 0);
      regs.edi = unaff_EDI >>> 0;
      uVar7 = ((heap.u32(0x009a2014)) >>> 0);
    }
  }
  heap.setU32(0x009a2014, (uVar7) >>> 0);
  return uVar3;
}
