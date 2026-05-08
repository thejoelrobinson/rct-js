// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dbad0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CARRY2, CONCAT11, CONCAT22, CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_005d849e } from "./5d849e.js";
import { FUN_005db615 } from "./5db615.js";
import { FUN_005db66f } from "./5db66f.js";
import { FUN_005dcd40 } from "./5dcd40.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_005dbad0(heap) {
  const __sp = heap.allocFrame(24);
  const __addr_DAT_005f7104 = __sp + 0;
  const __addr_DAT_0065e6be = __sp + 4;
  const __addr_DAT_008874a2 = __sp + 8;
  const __addr_DAT_008874a1 = __sp + 12;
  const __addr_DAT_00971ef4 = __sp + 16;
  const __addr_DAT_0065e6c0 = __sp + 20;
  try {
  let cVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let iVar7 = 0;
  let iVar8 = 0;
  let sVar9 = 0;
  let uVar10 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let extraout_CX_01 = 0;
  let extraout_CX_02 = 0;
  let bVar11 = 0;
  let extraout_DX = 0;
  let uVar12 = 0;
  let pbVar13 = 0;
  let unaff_ESI = 0;
  let uVar14 = 0;
  let bVar15 = 0;
  heap.setU32(0x0065dc40, (0) >>> 0);
  heap.setU32(0x0065dc30, (heap.u32((unaff_ESI + 0x2c)) + heap.u32((unaff_ESI + 0x28))) >>> 0);
  heap.setU32((unaff_ESI + 0x28), (heap.u32(0x0065dc30)) >>> 0);
  heap.setU32(0x0065dc34, ((heap.u32(0x0065dc30) >>> 10) * 0x2a) >>> 0);
  if ((heap.u32((__addr_DAT_005f7104 + heap.u32((unaff_ESI + 0x31)) * 8)) & 0x180) != 0) {
    FUN_005d849e(heap);
  }
  heap.setU32(0x0065dc38, (1) >>> 0);
  heap.setU32((unaff_ESI + 0x2c), (0) >>> 0);
  iVar7 = heap.u32(0x0065dc34) + heap.u32((unaff_ESI + 0x24));
  heap.setU32((unaff_ESI + 0x24), (iVar7) >>> 0);
  if (0x3689 < iVar7) {
    heap.setU32((unaff_ESI + 0xb8), (heap.u32((unaff_ESI + 0xb8)) & 0xfffd) >>> 0);
    heap.setU32(0x0065dc48, (heap.u32((unaff_ESI + 0xe))) >>> 0);
    heap.setU32(0x0065dc4c, (heap.u32((unaff_ESI + 0x12))) >>> 0);
    FUN_005e53ca(heap);
    LAB_005dbb4f: heap.setU32((unaff_ESI + 0x35), (heap.u32((unaff_ESI + 0x35)) + '\x01') >>> 0);
    sVar9 = (heap.u32((unaff_ESI + 0x36)) >>> 8) * 0x20 + 0x10;
    uVar3 = ((heap.u32((unaff_ESI + 0x36)) & 0xff) * 0x20 + 0x10) - heap.u32((unaff_ESI + 0xe));
    if (uVar3 < 0) {
      uVar10 = sVar9 - heap.u32((unaff_ESI + 0x10));
      if (uVar10 < 0) {
        uVar4 = -uVar3;
        uVar5 = -uVar10;
        uVar12 = 0x18;
        if ((uVar5 <= (uVar3 * -4)) && (uVar12 = 0, uVar4 <= (uVar10 * -4))) {
          uVar12 = 0x1c;
        }
      } else {
        uVar4 = -uVar3;
        uVar12 = 8;
        uVar5 = uVar10;
        if ((uVar10 <= (uVar3 * -4)) && (uVar12 = 0, uVar4 <= (uVar10 * 4))) {
          uVar12 = 4;
        }
      }
    } else {
      uVar10 = sVar9 - heap.u32((unaff_ESI + 0x10));
      uVar4 = uVar3;
      if (uVar10 < 0) {
        uVar5 = -uVar10;
        uVar12 = 0x18;
        if ((uVar5 <= (uVar3 * 4)) && (uVar12 = 0x10, uVar3 <= (uVar10 * -4))) {
          uVar12 = 0x14;
        }
      } else {
        uVar12 = 8;
        uVar5 = uVar10;
        if ((uVar10 <= (uVar3 * 4)) && (uVar12 = 0x10, uVar3 <= (uVar10 * 4))) {
          uVar12 = 0xc;
        }
      }
    }
    heap.setU32((unaff_ESI + 0x34), (uVar12) >>> 0);
    if ((uVar4 + uVar5) < 0xd) {
      FUN_005db66f(heap);
    }
    if ((heap.u32((unaff_ESI + 0x35)) & 1) == 0) {
      cVar1 = heap.u32((unaff_ESI + 0x1e));
      if (cVar1 != heap.u32((unaff_ESI + 0x34))) {
        bVar11 = (heap.u32((unaff_ESI + 0x34)) + '\x10') - cVar1 & 0x1e;
        if (bVar11 < 0x10) {
          bVar2 = cVar1 - 2;
          if (bVar11 < 8) {
            heap.setU32((unaff_ESI + 0x35), (heap.u32((unaff_ESI + 0x35)) + -1) >>> 0);
          }
        } else {
          bVar2 = cVar1 + 2;
          if (0x18 < bVar11) {
            heap.setU32((unaff_ESI + 0x35), (heap.u32((unaff_ESI + 0x35)) + -1) >>> 0);
          }
        }
        heap.setU32((unaff_ESI + 0x1e), (bVar2 & 0x1e) >>> 0);
      }
    }
    uVar14 = (heap.u32((unaff_ESI + 0x1e)) | heap.u32((unaff_ESI + 0x35)) & 1) & 0x1f;
    bVar15 = CARRY2(heap.u32((unaff_ESI + 0x10)), heap.u32((__addr_DAT_0065e6be + uVar14 * 8)));
    uVar3 = FUN_005dcd40(heap);
    if (bVar15) {
      heap.setU32((unaff_ESI + 0x24), (0) >>> 0);
      if (heap.u32((unaff_ESI + 0x1e)) == heap.u32((unaff_ESI + 0x34))) {
        heap.setU32((unaff_ESI + 0x1e), (heap.u32((unaff_ESI + 0x1e)) ^ 0x10) >>> 0);
        FUN_005db66f(heap);
        heap.setU32((unaff_ESI + 0x1e), (heap.u32((unaff_ESI + 0x1e)) ^ 0x10) >>> 0);
      }
      /* goto LAB_005dbe58 */ throw new Error("goto LAB_005dbe58 not supported");
    }
    uVar10 = uVar3 & 0xffe0;
    bVar15 = uVar10 < heap.u32((unaff_ESI + 0x38));
    if ((uVar10 != heap.u32((unaff_ESI + 0x38))) || (bVar15 = (extraout_CX & 0xffe0) < heap.u32((unaff_ESI + 0x3a)), uVar5 = uVar3, uVar4 = extraout_CX, (extraout_CX & 0xffe0) != heap.u32((unaff_ESI + 0x3a)))) {
      uVar5 = FUN_005db615(heap);
      if (bVar15) {
        if ((heap.u32((unaff_ESI + 0x51)) == '\x01') && (iVar7 = heap.u32((unaff_ESI + 0x30)) * 0x260, CONCAT11((extraout_DX >>> 5), (uVar3 >>> 5)) == heap.u32((__addr_DAT_008874a2 + iVar7)))) {
          if ((heap.u32((__addr_DAT_008874a1) + (iVar7) * 4) & 1) == 0) {
            uVar5 = extraout_CX_00;
          }
          bVar15 = (uVar5 & 0x1f) < 0x10;
          if ((uVar5 & 0x1f) == 0x10) {
            heap.setU32((unaff_ESI + 0x24), (0) >>> 0);
            uVar6 = FUN_005dcd40(heap);
            if (!bVar15) {
              heap.setU32((unaff_ESI + 0x38), (uVar10) >>> 0);
              heap.setU32((unaff_ESI + 0x3a), (extraout_DX) >>> 0);
              for (pbVar13 = heap.u32((__addr_DAT_00971ef4) + (((extraout_DX << 7 | extraout_DX >>> 9 | uVar10) >>> 5 | (extraout_DX >>> 9) << 0xb)) * 4); ((heap.u32(pbVar13) & 0x3c) != 8 || ((heap.u32((unaff_ESI + 0x3c)) >>> 2) != heap.u32(pbVar13 + (2) * 4))); pbVar13 = pbVar13 + 8) {
              
              }
              heap.setU32((unaff_ESI + 0x36), (CONCAT31((int3)((heap.u32(pbVar13 + (4) * 4) << 2) >>> 8), (heap.u32(pbVar13 + (4) * 4) << 2) | heap.u32((__addr_DAT_008874a1) + (iVar7) * 4) & 3)) >>> 0);
              heap.setU32((unaff_ESI + 0x34), (0) >>> 0);
              heap.setU32((unaff_ESI + 0x50), (4) >>> 0);
              heap.setU32(0x0065dc48, (CONCAT22(extraout_CX_02, uVar6)) >>> 0);
            }
          } else {
            heap.setU32((unaff_ESI + 0x24), (0) >>> 0);
            uVar6 = FUN_005dcd40(heap);
            if (!bVar15) {
              heap.setU32(0x0065dc48, (CONCAT22(extraout_CX_01, uVar6)) >>> 0);
            }
          }
        } else {
          heap.setU32((unaff_ESI + 0x24), (0) >>> 0);
          if (heap.u32((unaff_ESI + 0x1e)) == heap.u32((unaff_ESI + 0x34))) {
            FUN_005db66f(heap);
          }
        }
        LAB_005dbe58: FUN_00444927(heap);
        FUN_005e53ca(heap);
        /* goto LAB_005dbe76 */ throw new Error("goto LAB_005dbe76 not supported");
      }
      heap.setU32((unaff_ESI + 0x38), (uVar10) >>> 0);
      heap.setU32((unaff_ESI + 0x3a), (extraout_DX) >>> 0);
      uVar4 = extraout_CX_00;
    }
    heap.setU32((unaff_ESI + 0x24), (heap.u32((unaff_ESI + 0x24)) - heap.u32((__addr_DAT_0065e6c0 + uVar14 * 8))) >>> 0);
    heap.setU32(0x0065dc48, (CONCAT22(uVar4, uVar5)) >>> 0);
    if (heap.u32((unaff_ESI + 0x24)) < 0x368a) {
      /* goto LAB_005dbe58 */ throw new Error("goto LAB_005dbe58 not supported");
    }
    heap.setU32(0x0065dc38, (heap.u32(0x0065dc38) + 1) >>> 0);
    /* goto LAB_005dbb4f */ throw new Error("goto LAB_005dbb4f not supported");
  }
  LAB_005dbe76: iVar7 = heap.u32((unaff_ESI + 0x28)) >>> 8;
  iVar7 = iVar7 * iVar7;
  if (heap.u32((unaff_ESI + 0x28)) < 0) {
    iVar7 = -iVar7;
  }
  iVar7 = -(((heap.u32((unaff_ESI + 0x28)) >>> 1) + (iVar7 >>> 5)) / heap.u32((unaff_ESI + 0x46)));
  if ((heap.u32((__addr_DAT_005f7104 + heap.u32((unaff_ESI + 0x31)) * 8)) & 8) != 0) {
    uVar14 = heap.u32((unaff_ESI + 0xc2));
    iVar8 = uVar14 * 0x4000;
    if ((heap.u32((unaff_ESI + 0x48)) & 8) != 0) {
      iVar8 = uVar14 * -0x4000;
    }
    iVar7 = iVar7 + ((iVar8 - heap.u32((unaff_ESI + 0x28))) * heap.u32((unaff_ESI + 0xc3)) * 2) / (uVar14 * heap.u32((unaff_ESI + 0x46)) >>> 2);
  }
  heap.setU32((unaff_ESI + 0x2c), (iVar7) >>> 0);
  return heap.u32(0x0065dc40);
} finally {
    heap.freeFrame(24);
  }
}
