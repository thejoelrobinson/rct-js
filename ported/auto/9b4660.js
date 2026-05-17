// @manual — do not regenerate.
// HAND-FIX (Phase R+4, RLE byte-store): translator emitted heap.setU32(ptr, byte & 0xffffffff)
// for C-source `*pbVar = *src;` where pbVar is a byte-pointer in this remap blitter's
// per-pixel loops. Each iteration advances ptr by 1 but the setU32 was writing 4 bytes —
// corrupting the next 3 bytes with zero, only partly overwritten by later iterations.
// Fixed by switching the per-pixel writes to heap.setU8(..., ... & 0xff).
//
// HAND-FIX (Phase R+4, int3 cast): translator mis-emitted Ghidra's `(int3)X` 24-bit cast
// as `callIndirect(heap, int3, X)`. The `int3` symbol here is Ghidra's pseudo-type for
// 3-byte integers, not the `int 3` opcode stub. Replaced with `X & 0xffffff`.
//
// HAND-FIX (Phase R+9c, zero-cols infinite loop): when the slow per-pixel
// path is entered with column-count DAT_009a2028 == 0, the inner loop
//   do { ... if ((short)(sVar5 + -1) == 0) break; ... if ((short)(sVar5 + -4) == 0) break;
//       sVar5 -= 4; } while ((short)(sVar5 + -4) != 0);
// underflows: sVar5 starts at 0, decrements to -1, -2, -3, ... and the
// breakpoints `(short)(sVar5+-N) == 0` only fire when sVar5 wraps back through
// 4 — i.e. after ~16384 iterations. EDI advances by 4 per iteration, so a
// single zero-cols invocation walks ~64KB per row; with height=18 that is
// ~1.2 MB of stray writes past the destination.
//
// Concrete casualty (Phase R+9b, commit 4e84a83): the IDirectSound singleton
// COM object heap-allocated at _heapPtr just after the DDraw primary surface
// (gap ~768 bytes past back-buf end) is stomped with palette-index 0x22 pixel
// data. The vtable pointer at obj+0 is overwritten to 0xf222212 (out of bounds);
// IDS_DuplicateSoundBuffer (slot 0x14) thereafter reads 0 from the corrupted
// vtable and `callIndirect(0)` short-circuits, leaving *0x628cbc = 0 so every
// in-game Play() silently no-ops.
//
// Translator bug class: the C source uses signed `short` comparison on a value
// produced by a CONCAT22 cast; the auto-translator preserves the unsigned wrap
// semantics of `>>> 0` but not the early-exit on a zero entry that the binary's
// caller must have relied on (the asm presumably has a sub-zero check before
// entering the loop). The deepest correct fix is to recover the missing
// caller-side guard in 9b438b / its prelude; the tactical fix here is to bail
// when DAT_009a2028 (column count low-word) is zero before entering the slow
// per-pixel loop. The fast-path (line 91) already special-cases cols==4, so the
// only loop entry that needs the guard is the slow do-while at line 110.
//
// Source: decompiled/c/9b4660.c — sprite remap-copy inner loop.
//
// Translator bug: the outer loop's exit check `if (iVar7 < 0) return;`
// in Ghidra C uses signed comparison on `int iVar7`. The auto-translator
// computed `iVar7 = ((iVar7 + -0x10000) >>> 0)` (unsigned), so the
// subsequent `if (iVar7 < 0)` check never fires — `iVar7 >>> 0` is
// always >= 0. This caused the Phase H→I hang when csg1.dat finally
// had real sprite data (sprite 0x606c = toolbar logo): pre-csg1 the
// outer height counter `bVar3` was 0 → `iVar7 = -0x10000` and inner
// loops fell through immediately; post-csg1, real height values cause
// the loop to run forever.
//
// Fix: compare as signed via `(iVar7 | 0) < 0` (same idiom used
// elsewhere in the codebase for signed-compare of >>> 0 values).
// Both sites (the 0x20000000 branch and the 0x40000000 branch) needed
// the fix.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT22, CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_009b4660(heap) {
  let uVar1 = 0;
  let bVar3 = 0;
  let in_EAX = regs.eax >>> 0;
  let iVar2 = 0;
  let uVar4 = 0;
  let sVar5 = 0;
  let uVar6 = 0;
  let uVar8 = 0;
  let iVar7 = 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_EBX = regs.ebx >>> 0;
  let unaff_EBP = regs.ebp >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let pbVar9 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let pbVar10 = 0;
  uVar1 = ((heap.u32(0x009a2028)) & 0xffff);
  iVar2 = ((heap.u32(0x009a200c)) >>> 0);
  bVar3 = ((((((in_EAX) >>> 0) >>> 8) & 0xff)) & 0xff);
  // R+9c guard: when the column-count low-word is zero, the slow inner per-
  // pixel loop underflows and walks ~64KB per row past the destination — see
  // header for the full bug-class write-up and DSound corruption casualty.
  // Early-return covers both flag branches; cols==0 means "no pixels to draw",
  // which is the binary's caller-side gate intent.
  if (uVar1 === 0) return;
  if ((unaff_EBX & 0x20000000) != 0) {
    if ((heap.u32(0x009a201c) & 1) == 0) {
      return;
    }
    iVar7 = ((((bVar3 - 1) >>> 0) << 0x10) >>> 0);
    if (heap.u32(0x009a2028) == 4) {
      do {
        if (heap.u8((heap.u32(unaff_ESI) + iVar2)) != 0) {
          heap.setU8(unaff_EDI, (heap.u8((heap.u32(unaff_ESI) + iVar2))) & 0xff);
        }
        if (heap.u8((((heap.u8(unaff_ESI + (1))) >>> 0) + iVar2)) != 0) {
          heap.setU8((unaff_EDI + (1)), (heap.u8((((heap.u8(unaff_ESI + (1))) >>> 0) + iVar2))) & 0xff);
        }
        if (heap.u8((((heap.u8(unaff_ESI + (2))) >>> 0) + iVar2)) != 0) {
          heap.setU8((unaff_EDI + (2)), (heap.u8((((heap.u8(unaff_ESI + (2))) >>> 0) + iVar2))) & 0xff);
        }
        if (heap.u8((((heap.u8(unaff_ESI + (3))) >>> 0) + iVar2)) != 0) {
          heap.setU8((unaff_EDI + (3)), (heap.u8((((heap.u8(unaff_ESI + (3))) >>> 0) + iVar2))) & 0xff);
        }
        unaff_EDI = ((unaff_EDI + unaff_EBP + 4) >>> 0);
        unaff_ESI = ((unaff_ESI + in_EDX + 4) >>> 0);
        iVar7 = ((iVar7 + -0x10000) >>> 0);
      } while (-1 < (iVar7 | 0));
      return;
    }
    do {
      iVar7 = ((CONCAT22((((((iVar7) >>> 0) >>> 0x10)) << 16 >> 16), heap.u32(0x009a2028))) >>> 0);
      do {
        if (heap.u8((heap.u32(unaff_ESI) + iVar2)) != 0) {
          heap.setU8(unaff_EDI, (heap.u8((heap.u32(unaff_ESI) + iVar2))) & 0xff);
        }
        sVar5 = ((((iVar7) << 16 >> 16)) & 0xffff);
        uVar8 = ((((((iVar7) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
        iVar7 = ((CONCAT22(uVar8, sVar5 + -1)) >>> 0);
        pbVar9 = ((unaff_ESI + 1) >>> 0);
        pbVar10 = ((unaff_EDI + 1) >>> 0);
        if ((((sVar5 + -1)) << 16 >> 16) == 0) {
          break;
        }
        bVar3 = ((heap.u8((((heap.u8(unaff_ESI + (1))) >>> 0) + iVar2))) & 0xff);
        if (bVar3 != 0) {
          heap.setU8((unaff_EDI + (1)), (bVar3) & 0xff);
        }
        iVar7 = ((CONCAT22(uVar8, sVar5 + -2)) >>> 0);
        pbVar9 = ((unaff_ESI + 2) >>> 0);
        pbVar10 = ((unaff_EDI + 2) >>> 0);
        if ((((sVar5 + -2)) << 16 >> 16) == 0) {
          break;
        }
        pbVar9 = ((unaff_ESI + 3) >>> 0);
        bVar3 = ((heap.u8((((heap.u8(unaff_ESI + (2))) >>> 0) + iVar2))) & 0xff);
        if (bVar3 != 0) {
          heap.setU8((unaff_EDI + (2)), (bVar3) & 0xff);
        }
        iVar7 = ((CONCAT22(uVar8, sVar5 + -3)) >>> 0);
        pbVar10 = ((unaff_EDI + 3) >>> 0);
        if ((((sVar5 + -3)) << 16 >> 16) == 0) {
          break;
        }
        unaff_ESI = ((unaff_ESI + 4) >>> 0);
        bVar3 = ((heap.u8((heap.u32(pbVar9) + iVar2))) & 0xff);
        if (bVar3 != 0) {
          heap.setU8((unaff_EDI + (3)), (bVar3) & 0xff);
        }
        unaff_EDI = ((unaff_EDI + 4) >>> 0);
        iVar7 = ((CONCAT22(uVar8, sVar5 + -4)) >>> 0);
        pbVar9 = ((unaff_ESI) >>> 0);
        pbVar10 = ((unaff_EDI) >>> 0);
      } while ((((sVar5 + -4)) << 16 >> 16) != 0);
      unaff_ESI = ((pbVar9 + in_EDX) >>> 0);
      unaff_EDI = ((pbVar10 + unaff_EBP) >>> 0);
      iVar7 = ((iVar7 + -0x10000) >>> 0);
      if ((iVar7 | 0) < 0) {
        return;
      }
    } while (true);
  }
  if ((unaff_EBX & 0x40000000) == 0) {
    uVar4 = ((uVar1) & 0xffff);
    if ((heap.u32(0x009a201c) & 1) == 0) {
      do {
        for (uVar6 = ((((uVar1) >>> 0)) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
          heap.setU8(unaff_EDI, (heap.u8(unaff_ESI)) & 0xff);
          unaff_ESI = ((unaff_ESI + 1) >>> 0);
          unaff_EDI = ((unaff_EDI + 1) >>> 0);
        }
        unaff_EDI = ((unaff_EDI + unaff_EBP) >>> 0);
        unaff_ESI = ((unaff_ESI + in_EDX) >>> 0);
        bVar3 = (((((((in_EAX) >>> 0) >>> 8)) << 24 >> 24) - 1) & 0xff);
        in_EAX = ((((bVar3) >>> 0) << 8) >>> 0);
      } while (bVar3 != 0);
      return;
    }
    LAB_009b4732: do {
      iVar2 = ((in_EAX) >>> 0);
      if (heap.u8(unaff_ESI) != 0) {
        heap.setU8(unaff_EDI, (heap.u8(unaff_ESI)) & 0xff);
      }
      pbVar9 = ((unaff_ESI + 1) >>> 0);
      pbVar10 = ((unaff_EDI + 1) >>> 0);
      if (uVar4 != 1) {
        bVar3 = ((heap.u8(unaff_ESI + (1))) & 0xff);
        if (bVar3 != 0) {
          heap.setU8((unaff_EDI + (1)), (bVar3) & 0xff);
        }
        pbVar9 = ((unaff_ESI + 2) >>> 0);
        pbVar10 = ((unaff_EDI + 2) >>> 0);
        if (uVar4 != 2) {
          bVar3 = ((heap.u8(unaff_ESI + (2))) & 0xff);
          if (bVar3 != 0) {
            heap.setU8((unaff_EDI + (2)), (bVar3) & 0xff);
          }
          pbVar9 = ((unaff_ESI + 3) >>> 0);
          pbVar10 = ((unaff_EDI + 3) >>> 0);
          if (uVar4 != 3) {
            bVar3 = ((heap.u8(unaff_ESI + (3))) & 0xff);
            unaff_ESI = ((unaff_ESI + 4) >>> 0);
            if (bVar3 != 0) {
              heap.setU8((unaff_EDI + (3)), (bVar3) & 0xff);
            }
            unaff_EDI = ((unaff_EDI + 4) >>> 0);
            uVar4 = ((uVar4 - 4) & 0xffff);
            // HAND-FIX: translator mis-emitted the Ghidra cast `(int3)X` as
            // `callIndirect(heap, int3, X)`. int3 here is a 3-byte truncation
            // cast, not the `int 3` opcode stub. The semantics is just
            // CONCAT31(iVar2 >> 8 masked to 24 bits, bVar3).
            in_EAX = ((CONCAT31((((iVar2) >>> 0) >>> 8) & 0xffffff, bVar3)) >>> 0);
            pbVar9 = ((unaff_ESI) >>> 0);
            pbVar10 = ((unaff_EDI) >>> 0);
            if (uVar4 != 0) {
              /* goto LAB_009b4732 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b4660/LAB_009b4732"); return 0;
            }
          }
        }
      }
      unaff_ESI = ((pbVar9 + in_EDX) >>> 0);
      unaff_EDI = ((pbVar10 + unaff_EBP) >>> 0);
      bVar3 = (((((((iVar2) >>> 0) >>> 8)) << 24 >> 24) - 1) & 0xff);
      in_EAX = ((((bVar3) >>> 0) << 8) >>> 0);
      uVar4 = ((uVar1) & 0xffff);
    } while (bVar3 != 0);
  } else {
    if ((heap.u32(0x009a201c) & 1) != 0) {
    iVar7 = ((((bVar3 - 1) >>> 0) << 0x10) >>> 0);
    do {
      iVar7 = ((CONCAT22((((((iVar7) >>> 0) >>> 0x10)) << 16 >> 16), heap.u32(0x009a2028))) >>> 0);
      do {
        if (heap.u8(unaff_ESI) != 0) {
          heap.setU8(unaff_EDI, (heap.u8((heap.u32(unaff_EDI) + iVar2))) & 0xff);
        }
        pbVar10 = ((unaff_EDI + 1) >>> 0);
        sVar5 = ((((iVar7) << 16 >> 16)) & 0xffff);
        uVar8 = ((((((iVar7) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
        iVar7 = ((CONCAT22(uVar8, sVar5 + -1)) >>> 0);
        pbVar9 = ((unaff_ESI + 1) >>> 0);
        if ((((sVar5 + -1)) << 16 >> 16) == 0) {
          break;
        }
        if (heap.u8(unaff_ESI + (1)) != 0) {
          heap.setU8(pbVar10, (heap.u8((heap.u32(pbVar10) + iVar2))) & 0xff);
        }
        pbVar10 = ((unaff_EDI + 2) >>> 0);
        iVar7 = ((CONCAT22(uVar8, sVar5 + -2)) >>> 0);
        pbVar9 = ((unaff_ESI + 2) >>> 0);
        if ((((sVar5 + -2)) << 16 >> 16) == 0) {
          break;
        }
        pbVar9 = ((unaff_ESI + 3) >>> 0);
        if (heap.u8(unaff_ESI + (2)) != 0) {
          heap.setU8(pbVar10, (heap.u8((heap.u32(pbVar10) + iVar2))) & 0xff);
        }
        pbVar10 = ((unaff_EDI + 3) >>> 0);
        iVar7 = ((CONCAT22(uVar8, sVar5 + -3)) >>> 0);
        if ((((sVar5 + -3)) << 16 >> 16) == 0) {
          break;
        }
        unaff_ESI = ((unaff_ESI + 4) >>> 0);
        if (heap.u8(pbVar9) != 0) {
          heap.setU8(pbVar10, (heap.u8((heap.u32(pbVar10) + iVar2))) & 0xff);
        }
        unaff_EDI = ((unaff_EDI + 4) >>> 0);
        iVar7 = ((CONCAT22(uVar8, sVar5 + -4)) >>> 0);
        pbVar9 = ((unaff_ESI) >>> 0);
        pbVar10 = ((unaff_EDI) >>> 0);
      } while ((((sVar5 + -4)) << 16 >> 16) != 0);
      unaff_ESI = ((pbVar9 + in_EDX) >>> 0);
      unaff_EDI = ((pbVar10 + unaff_EBP) >>> 0);
      iVar7 = ((iVar7 + -0x10000) >>> 0);
      if ((iVar7 | 0) < 0) {
        return;
      }
    } while (true);
  }
  }
  return;
}
