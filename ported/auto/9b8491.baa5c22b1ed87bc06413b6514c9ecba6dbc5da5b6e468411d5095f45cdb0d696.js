// @manual — do not regenerate.
// Source: decompiled/c/9b8491.c PLUS hand-disassembly of 0x9b8491 in rct.exe.
//
// HAND-FIX (painter-noise root cause): the Ghidra C decompilation of the
// "class & 0x10 recursive halve" branch (lines 27-39 of 9b8491.c) is INCOMPLETE.
// The real asm at 0x9b84b8..0x9b84cb does THREE extra ops that Ghidra's
// optimizer dropped (because the C-level register-promotion model can't see
// register-to-register dataflow across the recursive call):
//
//   0x9b84b8  0f b7 9b c2 c0 8d 00   movzx ebx, word [ebx + 0x8dc0c2]   ; load sub-sprite handle
//   0x9b84bf  66 d1 f9               sar  cx, 1                          ; halve X coord
//   0x9b84c2  66 d1 fa               sar  dx, 1                          ; halve Y coord
//   0x9b84c5  e8 8a bf ff ff         call 0x9b4457
//
// Without these, every recursive descent re-reads the SAME class flag (bit 0x10
// stays set forever), the zoom field at [edi+0xe] underflows from 0 → -1 → -2 →
// ... → -1837 before the JS stack overflows, and the back-buffer fills with
// garbage from partial sprite blits inside the broken recursion.
//
// The C decompile's `unaff_EBX` is treated as a const C param, so Ghidra emits
// `(&DAT_008dc0c0 + unaff_EBX)` for all the table reads — masking the fact that
// the asm rewires EBX mid-function via `movzx ebx, [ebx+0x8dc0c2]`. This is a
// well-known limitation of Ghidra register-promotion. Same pattern affects
// 9b4457.c line 187 (its self-recursion to itself).
//
// EBX-scaling convention: callers (9b438b, 9b4457) pre-scale via
// `and ebx,0x1ffff; shl ebx,4` so EBX inside 9b8491 is `(raw & 0x1ffff) * 0x10`.
// The movzx above loads a fresh RAW sub-handle; 9b4457's prologue rescales it.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_009b4457 } from "./9b4457.js";
import { FUN_009b8705 } from "./9b8705.js";
import { FUN_009b8aa9 } from "./9b8aa9.js";
import { callNative } from "../../runtime/painter-bridge.js";
import { callIndirect, state } from "../../runtime/win32/context.js";
function FUN_009b8491_js(heap) {
  let bVar1 = 0;
  let uVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_CX = regs.ecx & 0xffff;
  let sVar5 = 0;
  let in_DX = regs.edx & 0xffff;
  let uVar6 = 0;
  let sVar7 = 0;
  let sVar8 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let pbVar9 = 0;
  let pbVar10 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let pbVar11 = 0;
  if ((heap.u16((0x008dc0c0 + unaff_EBX)) & 0x20) != 0) {
    return in_EAX;
  }
  if ((heap.u16((0x008dc0c0 + unaff_EBX)) & 0x10) != 0) {
    heap.setI16((unaff_EDI + 0xe), (heap.i16((unaff_EDI + 0xe)) + -1) & 0xffff);
    heap.setI16((unaff_EDI + 4), (heap.i16((unaff_EDI + 4)) >> 1) & 0xffff);
    heap.setI16((unaff_EDI + 6), (heap.i16((unaff_EDI + 6)) >> 1) & 0xffff);
    heap.setI16((unaff_EDI + 8), (heap.i16((unaff_EDI + 8)) >> 1) & 0xffff);
    heap.setI16((unaff_EDI + 10), (heap.i16((unaff_EDI + 10)) >> 1) & 0xffff);
    // HAND-FIX (see header): advance EBX to sub-sprite handle + halve CX/DX
    // before the recursive descent. Ghidra omitted these because they're pure
    // register dataflow with no C-visible variable. Without them the recursion
    // is unbounded.
    regs.ebx = heap.u16(unaff_EBX + 0x008dc0c2) >>> 0;
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
  pbVar9 = ((heap.u32((((0x008dc0b4) | 0) + unaff_EBX))) >>> 0);
  uVar3 = ((heap.u32((0x008dc0b8 + unaff_EBX))) >>> 0);
  heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + unaff_EBX))) >>> 0);
  heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + unaff_EBX))) >>> 0);
  sVar7 = (((((heap.u32(0x009a2018) >>> 0x10)) << 16 >> 16)) & 0xffff);
  heap.setU32(0x009a2014, (((uVar3) << 16 >> 16)) >>> 0);
  heap.setU32(0x009a2016, (((uVar3 >>> 0x10) & 0xffff)) >>> 0);
  heap.setU32(0x009a2010, (pbVar9) >>> 0);
  heap.setU32(0x009a2014, (uVar3) >>> 0);
  if ((heap.u32(0x009a201c) & 4) != 0) {
    // HAND-FIX (the EDI/EBP split). At 0x9b897b the binary does
    // `push edi; mov ebp,edi; mov edi,[ebp]`: from here EBP is the DPI STRUCT
    // (which is what `unaff_EDI` models throughout this file) and EDI is a
    // SEPARATE running DESTINATION pointer, seeded from DPI.bytes and advanced
    // at 0x9b8a17 and 0x9b8a76 before `call 0x9b8aa9` at 0x9b8aa2.
    //
    // Ghidra collapsed both roles into one `unaff_EDI`, so the port never
    // tracked the destination at all and 9b8aa9 blitted relative to the DPI
    // struct's OWN ADDRESS — through the window pool at 0x9a013c, zeroing the
    // pool-end pointer at 0x9a1164, and leaving the bottom toolbar unpainted
    // (18,990 divergent px vs the binary, all in y=448..479).
    let dst = heap.u32(unaff_EDI) >>> 0;              // 0x9b8984
    uVar4 = ((CONCAT22(sVar7, heap.u32(0x009a2016))) >>> 0);
    heap.setU32(0x009a2020, (0) >>> 0);
    if ((uVar3 & 0x10000) != 0) {
      uVar4 = ((CONCAT22(sVar7, heap.u32(0x009a2016) - 1)) >>> 0);
      if (((heap.u32(0x009a2016) - 1) & 0xffff) == 0) {
        heap.setU32(0x009a2020, (0) >>> 0);
        return uVar4;
      }
      heap.setU32(0x009a2020, (1) >>> 0);
    }
    sVar8 = ((((uVar4) << 16 >> 16)) & 0xffff);
    if ((uVar4 & 2) != 0) {
      sVar5 = ((sVar8 + -2) & 0xffff);
      uVar4 = ((CONCAT22((((uVar4 >>> 0x10)) << 16 >> 16), sVar5)) >>> 0);
      if (sVar5 == 0 || sVar8 < 2) {
        return uVar4;
      }
      heap.setU32(0x009a2020, (heap.u32(0x009a2020) + 2) >>> 0);
    }
    heap.setU32(0x009a202c, (((uVar4) & 0xffff)) >>> 0);
    uVar2 = (((in_DX + sVar7 & 0xfffc) - heap.i16((unaff_EDI + 6))) & 0xffff);
    if (((uVar2) << 16 >> 16) < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a202c) + uVar2) >>> 0);
      if (heap.i16(0x009a202c) < 0) {
        return uVar4;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar4;
      }
      heap.setU32(0x009a2020, (heap.u32(0x009a2020) - uVar2) >>> 0);
      uVar2 = ((0) & 0xffff);
    } else {
      // 0x9b89f9..0x9b8a17: eax = movsx((dpi.w>>2)+dpi.pitch) * movsx(dx>>2),
      // then `add edi, eax` — advance the destination by whole rows.
      uVar4 = ((((((((heap.u16((unaff_EDI + 8)) >>> 2) + heap.i16((unaff_EDI + 0xc)))) << 16 >> 16)) | 0) * (((((uVar2 >>> 2)) << 16 >> 16)) | 0)) >>> 0);
      dst = (dst + uVar4) >>> 0;                       // 0x9b8a17
    }
    sVar7 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar8 = (((uVar2 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
    if ((sVar8 == 0 || (((uVar2 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar8) >>> 0), heap.u32(0x009a202c) != 0 && sVar8 <= sVar7)) {
      uVar4 = ((CONCAT22((((uVar4 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
      heap.setU32(0x009a2024, (0) >>> 0);
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      sVar7 = (((in_CX + heap.u32(0x009a2018) & 0xfffc) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar7 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar7) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar4;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar4;
        }
        heap.setU32(0x009a2024, (-((sVar7) | 0)) >>> 0);
        sVar7 = ((0) & 0xffff);
      }
      sVar8 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar5 = (((sVar7 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
      if ((sVar5 == 0 || (((sVar7 + heap.u32(0x009a2028))) << 16 >> 16) < heap.i16((unaff_EDI + 8))) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0), heap.u32(0x009a2028) != 0 && sVar5 <= sVar8)) {
        // 0x9b8a6d..0x9b8a76: `movsx ecx,cx` (cx is >= 0 on every path that
        // reaches here) then `shr cx,2` and `add edi, ecx` — advance the
        // destination by the clipped x offset, in 4-px units.
        dst = (dst + ((sVar7 & 0xffff) >>> 2)) >>> 0;
        // 0x9b8a9c: `mov word ptr [0x9a2030], ax` — a 16-bit store; setU32 here
        // also clobbered 0x9a2032, which is the scratch the 0x9b869d path uses.
        heap.setU16(0x009a2030, ((heap.u16((unaff_EDI + 8)) >>> 2) + heap.i16((unaff_EDI + 0xc))) & 0xffff);
        // 0x9b8aa2: `call 0x9b8aa9` with EDI = the destination pointer.
        regs.edi = dst >>> 0;
        uVar4 = (((regs.eax = FUN_009b8aa9(heap))) >>> 0);
        regs.edi = unaff_EDI >>> 0;   // 0x9b8aa7 `pop edi` restores the caller's
        uVar3 = ((heap.u32(0x009a2014)) >>> 0);
      }
    }
    heap.setU32(0x009a2014, (uVar3) >>> 0);
    return uVar4;
  }
  // Same EDI/EBP split as the branch above, at 0x9b851f:
  // `push edi; mov ebp,edi; mov edi,[ebp]`. `unaff_EDI` is the DPI STRUCT;
  // the destination pointer is a separate running value seeded from
  // DPI.bytes and advanced at 0x9b85ba and 0x9b8631 before `call 0x9b8705`.
  // This is the branch the PLAYABLE configuration takes, and missing it was
  // the whole of the 18,990-px bottom-toolbar divergence.
  let dst2 = heap.u32(unaff_EDI) >>> 0;              // 0x9b8528
  uVar2 = ((heap.u32(0x009a2016)) & 0xffff);
  if ((uVar3 & 0x10000) != 0) {
    uVar2 = ((heap.u32(0x009a2016) - 1) & 0xffff);
  }
  if ((uVar2 & 2) != 0) {
    uVar2 = ((uVar2 - 2) & 0xffff);
  }
  uVar4 = ((CONCAT22(sVar7, uVar2)) >>> 0);
  if (uVar2 != 0) {
    uVar6 = (((in_DX + sVar7 & 0xfffc) - heap.i16((unaff_EDI + 6))) & 0xffff);
    if (((uVar6) << 16 >> 16) < 0) {
      heap.setU32(0x009a202c, (uVar2 + uVar6) >>> 0);
      if (heap.i16(0x009a202c) < 0) {
        return uVar4;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar4;
      }
      uVar4 = (((uVar3 & 0xffff) * ((0) >>> 0) - uVar6 & 0xffff) >>> 0);
      uVar6 = ((0) & 0xffff);
    } else {
      // 0x9b85a3..0x9b85ba: eax = ((movzx(dpi.w) >> 2) + dpi.pitch) * (dx >> 2),
      // then `add edi, eax` — advance the destination by whole rows.
      uVar4 = (((((heap.u16((unaff_EDI + 8)) >>> 2) + heap.i16((unaff_EDI + 0xc))) >>> 0) * ((uVar6 >>> 2) >>> 0)) >>> 0);
      dst2 = (dst2 + uVar4) >>> 0;                   // 0x9b85ba
      heap.setU32(0x009a202c, (uVar2) >>> 0);
    }
    uVar2 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar7 = (((uVar6 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
    if ((sVar7 == 0 || (((uVar6 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar7) >>> 0), heap.u32(0x009a202c) != 0 && sVar7 <= ((uVar2) << 16 >> 16))) {
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a2030, ((heap.u16((unaff_EDI + 8)) >>> 2) + heap.i16((unaff_EDI + 0xc))) >>> 0);
      uVar4 = ((CONCAT22((((uVar4 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2030))) >>> 0);
      heap.setU32(0x009a202e, (0) >>> 0);
      sVar7 = (((in_CX + heap.u32(0x009a2018) & 0xfffc) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar7 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar7) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar4;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar4;
        }
        heap.setU32(0x009a202e, (-sVar7) >>> 0);
        sVar7 = ((0) & 0xffff);
      }
      // 0x9b8628..0x9b8631: `movzx ecx,cx; shr cx,2; add edi,ecx`.
      dst2 = (dst2 + ((sVar7 & 0xffff) >>> 2)) >>> 0;
      sVar8 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar5 = (((sVar7 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
      if (sVar5 != 0 && heap.i16((unaff_EDI + 8)) <= (((sVar7 + heap.u32(0x009a2028))) << 16 >> 16)) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar8 < sVar5) {
          return uVar4;
        }
        heap.setU32(0x009a202e, (heap.u32(0x009a202e) + sVar5) >>> 0);
      }
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar7 = ((heap.u32(0x009a2016) * heap.u32(0x009a2014)) & 0xffff);
        pbVar11 = ((0x009a2032) >>> 0);
        while (sVar7 != 0) {
          bVar1 = ((heap.u8(pbVar9)) & 0xff);
          uVar3 = ((((bVar1) >>> 0)) >>> 0);
          if (((bVar1) << 24 >> 24) < 0) {
            pbVar10 = ((pbVar9 + 1) >>> 0);
            sVar7 = ((sVar7 - ((0) & 0xffff) - (((bVar1) << 24 >> 24) >> 3)) & 0xffff);
            pbVar9 = ((pbVar9 + 2) >>> 0);
            pbVar10 = ((pbVar11 + -((CONCAT11(bVar1, heap.u8(pbVar10)) & 0x7ff) >>> 0)) >>> 0);
            for (uVar3 = ((((0) >>> 0) - (((bVar1) << 24 >> 24) >> 3)) >>> 0); uVar3 != 0; uVar3 = (((uVar3 - 1) >>> 0)) >>> 0) {
              heap.setU8(pbVar11, (heap.u8(pbVar10)) & 0xff);
              pbVar10 = ((pbVar10 + 1) >>> 0);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          } else {
            sVar7 = ((sVar7 - ((bVar1) & 0xffff)) & 0xffff);
            for (; pbVar9 = ((pbVar9 + 1) >>> 0), uVar3 != 0; uVar3 = (((uVar3 - 1) >>> 0)) >>> 0) {
              heap.setU8(pbVar11, (heap.u8(pbVar9)) & 0xff);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          }
        }
        regs.edi = dst2 >>> 0;                       // 0x9b86fe: EDI = destination
        uVar3 = (((regs.eax = FUN_009b8705(heap))) >>> 0);
        regs.edi = unaff_EDI >>> 0;                  // 0x9b8703 `pop edi`
        return uVar3;
      }
      regs.edi = dst2 >>> 0;                         // 0x9b8677: EDI = destination
      uVar4 = (((regs.eax = FUN_009b8705(heap))) >>> 0);
      regs.edi = unaff_EDI >>> 0;                    // 0x9b867c `pop edi`
      uVar3 = ((heap.u32(0x009a2014)) >>> 0);
    }
  }
  heap.setU32(0x009a2014, (uVar3) >>> 0);
  return uVar4;
}

// ---------------------------------------------------------------------------
// LAST INTERPRETER DEPENDENCY IN THE PAINT PATH (ADDENDUM 142).
//
// The JS body above is now correct in structure — both branches track the
// DESTINATION pointer the binary keeps in EDI separately from the DPI STRUCT it
// keeps in EBP (`push edi; mov ebp,edi; mov edi,[ebp]` at 0x9b851f and
// 0x9b897b), which Ghidra had collapsed into a single `unaff_EDI`. That fix is
// what stopped this function blitting through the window pool at 0x9a013c and
// zeroing the pool-end pointer at 0x9a1164, and it is what lets the whole
// window/widget/text layer run as JS at all (see ported/auto/5e13d2.js).
//
// The hand translation below is still not byte-exact. Production instead uses
// the deterministic lifted closure when its reviewed root is installed; the
// interpreter remains only as the hybrid oracle before that installation.
//
// This is a correctness placeholder, NOT a performance choice — the JS paint
// path measures the same as the interpreter in steady state (7ms/tick). The
// remaining work is to diff this body against the interpreter per call
// (tools/_beta2-isolate.js is built for exactly this) and close the last gap.
export function FUN_009b8491(heap) {
  if (globalThis.__js9b8491) return FUN_009b8491_js(heap);
  if (state.promotedLiftedAddresses.has(0x009b8491)) return callIndirect(heap, 0x009b8491);
  return callNative(0x009b8491, []);
}
