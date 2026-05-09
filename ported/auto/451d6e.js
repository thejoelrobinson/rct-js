// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/451d6e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT11, CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0042c711 } from "./42c711.js";
import { FUN_00451f42 } from "./451f42.js";
export function FUN_00451d6e(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let pbVar8 = 0;
  let pbVar9 = 0;
  let pbVar10 = 0;
  let bVar11 = 0;
  pbVar8 = ((0x00887420) >>> 0);
  heap.setU8(0x00631d55, (0) & 0xff);
  LAB_00451d7a: if (heap.u8(pbVar8) != 0xff) {
    if (heap.u8(pbVar8 + (0x15f)) != 0) {
      heap.setU8((pbVar8 + (0x15f)), (heap.u8(pbVar8 + (0x15f)) - 1) & 0xff);
    }
    if ((heap.u8(pbVar8 + (0x21)) == 1) && (heap.u8(pbVar8 + (0x15f)) == 0)) {
      if ((heap.u32((0x005f5b78 + heap.u32(pbVar8) * 8)) & 0x20000) == 0) {
        uVar6 = ((0) >>> 0);
        do {
          if (((heap.i16((pbVar8 + uVar6 * 2 + 0x2a)) | 0) != -1) && (((bVar11 = (((heap.i16((pbVar8 + uVar6 * 2 + 0x42)) | 0) != -1) & 0xff), (heap.i16((pbVar8 + uVar6 * 2 + 0x42)) | 0) != -1 && ((regs.eax = FUN_00451f42(heap)), bVar11)) || ((bVar11 = (((heap.i16((pbVar8 + uVar6 * 2 + 0x4a)) | 0) != -1) & 0xff), (heap.i16((pbVar8 + uVar6 * 2 + 0x4a)) | 0) != -1 && ((regs.eax = FUN_00451f42(heap)), bVar11)))))) {
            heap.setU16((0x00971e86 + 0), (heap.u16((pbVar8 + 0x22))) & 0xffff);
          }
          unique0x00017200 = ((heap.u32((pbVar8 + 0x24))) >>> 0);
          (regs.eax = FUN_0042c711(heap));
          heap.setU8((pbVar8 + (0x15f)), (3) & 0xff);
          return;
          uVar6 = ((uVar6 + 1) >>> 0);
        } while (uVar6 < 4);
      } else {
        uVar5 = ((heap.u16((pbVar8 + 0x2a))) & 0xffff);
        if (uVar5 != 0xffff) {
          uVar3 = (((uVar5 & 0xff) * 0x20) & 0xffff);
          uVar4 = (((uVar5 >>> 8) * 0x20) & 0xffff);
          uVar6 = ((((heap.u8(0x00631d55)) >>> 0) << 8) >>> 0);
          pbVar9 = ((heap.u32((0x00971ef4) + ((((((uVar5 >>> 8) << 0xc | uVar3) & 0xffff) >>> 5 | (uVar4 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
          do {
            uVar6 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar6 >>> 8)), heap.u8(pbVar9)) & 0xffffff3c) >>> 0);
            if ((((uVar6) << 24 >> 24) == 8) && (((uVar6 >>> 8) & 0xff) == heap.u8(pbVar9 + (7)))) {
              bVar2 = (((((heap.u32(((0x006559d8) & 0xff) + (((heap.u8(pbVar9 + (4))) >>> 0) * 0x10) * 4) & 0xf) << (heap.u8(pbVar9) & 3)) & 0xff)) & 0xff);
              uVar6 = ((CONCAT11(bVar2 >>> 4, bVar2) & 0xffffff0f) >>> 0);
              uVar6 = ((((((uVar6) & 0xff) | ((uVar6 >>> 8) & 0xff)) >>> 0)) >>> 0);
              heap.setU8(0x00631d56, (0) & 0xff);
              /* goto LAB_00451e85 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00451d6e/LAB_00451e85"); return 0;
            }
            pbVar10 = ((pbVar9 + 1) >>> 0);
            pbVar9 = ((pbVar9 + 8) >>> 0);
          } while ((heap.u8(pbVar10) & 0x80) == 0);
        }
      }
    }
  }
  pbVar8 = ((pbVar8 + 0x260) >>> 0);
  heap.setU8(0x00631d55, (heap.u8(0x00631d55) + 1) & 0xff);
  if (0x8ad1bf < pbVar8) {
    return;
    LAB_00451e85: uVar7 = ((0) >>> 0);
    if (uVar6 != 0) {
      for (; (uVar6 >>> uVar7 & 1) == 0; uVar7 = (((uVar7 + 1) >>> 0)) >>> 0) {
      
      }
    }
    if (uVar6 != 0) {
      uVar6 = ((uVar6 & ~(1 << (uVar7 & 0x1f))) >>> 0);
      uVar7 = ((uVar7 ^ 2) >>> 0);
      uVar5 = ((uVar4 - heap.u32((0x0065247a) + (uVar7 * 2) * 4)) & 0xffff);
      uVar5 = ((uVar5 * 0x80 | uVar5 >>> 9 | uVar3 - heap.u32((0x00652478) + (uVar7 * 2) * 4)) & 0xffff);
      pbVar10 = ((heap.u32((0x00971ef4) + (((uVar5 >>> 5 | uVar5 << 0xb) & 0xffff)) * 4)) >>> 0);
      do {
        if ((heap.u8(pbVar10) & 0x3c) == 4) {
          if ((heap.u8(pbVar10 + (4)) & 4) == 0) {
            bVar2 = ((heap.u8(pbVar10 + (2))) & 0xff);
          } else {
            if ((heap.u8(pbVar10 + (4)) & 3) == ((uVar7) & 0xff)) {
            bVar2 = ((heap.u8(pbVar10 + (2)) + 4) & 0xff);
          } else {
            if ((heap.u8(pbVar10 + (4)) & 3 ^ 2) != ((uVar7) & 0xff)) {
              /* goto LAB_00451eec — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00451d6e/LAB_00451eec"); return 0;
            }
            bVar2 = ((heap.u8(pbVar10 + (2))) & 0xff);
          }
          }
          if (bVar2 == heap.u8(pbVar9 + (2))) {
            heap.setU8(0x00631d56, (heap.u8(0x00631d56) + 1) & 0xff);
            break;
          }
        }
        LAB_00451eec: pbVar1 = ((pbVar10 + 1) >>> 0);
        pbVar10 = ((pbVar10 + 8) >>> 0);
      } while ((heap.u8(pbVar1) & 0x80) == 0);
      /* goto LAB_00451e85 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00451d6e/LAB_00451e85"); return 0;
    }
    if (heap.u8(0x00631d56) == 0) {
      LAB_00451f1a: heap.setU16((0x00971e86 + 0), (heap.u16((pbVar8 + 0x22))) & 0xffff);
      unique0x00017200 = ((heap.u32((pbVar8 + 0x24))) >>> 0);
      (regs.eax = FUN_0042c711(heap));
      heap.setU8((pbVar8 + (0x15f)), (3) & 0xff);
      return;
    }
    LAB_00451de9: pbVar8 = ((pbVar8 + 0x260) >>> 0);
    heap.setU8(0x00631d55, (heap.u8(0x00631d55) + 1) & 0xff);
    if (0x8ad1bf < pbVar8) {
      return;
    }
    /* goto LAB_00451d7a — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00451d6e/LAB_00451d7a"); return 0;
  }
}
