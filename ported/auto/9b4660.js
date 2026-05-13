// @manual — do not regenerate.
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
  if ((unaff_EBX & 0x20000000) != 0) {
    if ((heap.u32(0x009a201c) & 1) == 0) {
      return;
    }
    iVar7 = ((((bVar3 - 1) >>> 0) << 0x10) >>> 0);
    if (heap.u32(0x009a2028) == 4) {
      do {
        if (heap.u8((heap.u32(unaff_ESI) + iVar2)) != 0) {
          heap.setU32(unaff_EDI, (heap.u8((heap.u32(unaff_ESI) + iVar2))) & 0xffffffff);
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
          heap.setU32(unaff_EDI, (heap.u8((heap.u32(unaff_ESI) + iVar2))) & 0xffffffff);
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
          heap.setU32(unaff_EDI, (heap.u8(unaff_ESI)) & 0xffffffff);
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
        heap.setU32(unaff_EDI, (heap.u8(unaff_ESI)) & 0xffffffff);
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
            in_EAX = ((CONCAT31((regs.eax = callIndirect(heap, int3, ((iVar2) >>> 0) >>> 8)), bVar3)) >>> 0);
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
          heap.setU32(unaff_EDI, (heap.u8((heap.u32(unaff_EDI) + iVar2))) & 0xffffffff);
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
          heap.setU32(pbVar10, (heap.u8((heap.u32(pbVar10) + iVar2))) & 0xffffffff);
        }
        pbVar10 = ((unaff_EDI + 2) >>> 0);
        iVar7 = ((CONCAT22(uVar8, sVar5 + -2)) >>> 0);
        pbVar9 = ((unaff_ESI + 2) >>> 0);
        if ((((sVar5 + -2)) << 16 >> 16) == 0) {
          break;
        }
        pbVar9 = ((unaff_ESI + 3) >>> 0);
        if (heap.u8(unaff_ESI + (2)) != 0) {
          heap.setU32(pbVar10, (heap.u8((heap.u32(pbVar10) + iVar2))) & 0xffffffff);
        }
        pbVar10 = ((unaff_EDI + 3) >>> 0);
        iVar7 = ((CONCAT22(uVar8, sVar5 + -3)) >>> 0);
        if ((((sVar5 + -3)) << 16 >> 16) == 0) {
          break;
        }
        unaff_ESI = ((unaff_ESI + 4) >>> 0);
        if (heap.u8(pbVar9) != 0) {
          heap.setU32(pbVar10, (heap.u8((heap.u32(pbVar10) + iVar2))) & 0xffffffff);
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
