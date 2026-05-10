// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/450b4c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005d9220 } from "./5d9220.js";
export function FUN_00450b4c(heap) {
  let bVar1 = 0;
  let sVar2 = 0;
  let bVar3 = 0;
  let extraout_DX = 0;
  let sVar4 = 0;
  let uVar5 = 0;
  let iVar6 = 0;
  let iVar7 = 0;
  let uVar8 = 0;
  let iVar9 = 0;
  let uVar10 = 0;
  let iVar11 = 0;
  bVar3 = ((0) & 0xff);
  do {
    LAB_00450d74: {
    uVar10 = ((((bVar3) >>> 0)) >>> 0);
    iVar11 = ((uVar10 * 0x4b0c) >>> 0);
    bVar1 = ((heap.u32((0x008ae9c4) + (iVar11) * 4)) & 0xff);
    if ((bVar1 != 0xff) && (iVar7 = ((((bVar1) >>> 0) * 0x260) >>> 0), (heap.u32((0x00887422) + (((bVar1) >>> 0) * 0x130) * 4) & 1) != 0)) {
      if ((heap.u32((0x008ae9c5) + (iVar11) * 4) & 1) == 0) {
        for (iVar6 = ((0) >>> 0); ((iVar6) & 0xff) < heap.u32(((0x00887498) & 0xff) + (iVar7) * 4); iVar6 = (((iVar6 + 1) >>> 0)) >>> 0) {
          if ((heap.u16((0x0088747e + iVar6 * 2 + iVar7)) != 0xffff) && (iVar9 = ((heap.u32((0x0088747e + iVar6 * 2 + iVar7)) * 0x100) >>> 0), heap.u32((0x00743be4) + (iVar9) * 4) == 3)) {
            heap.setU32(((0x008ae9ce) + (iVar11) * 4), (((iVar6) & 0xff)) & 0xffffffff);
            heap.setU32(((0x008ae9cf) + (iVar11) * 4), (heap.u32((0x00743bdf) + (iVar9) * 4)) & 0xffffffff);
            heap.setU32(((0x008ae9c5) + (iVar11) * 4), (heap.u32((0x008ae9c5) + (iVar11) * 4) | 1) & 0xffffffff);
            heap.setU32(((0x008ae9c5) + (iVar11) * 4), (heap.u32((0x008ae9c5) + (iVar11) * 4) & 0xfd) & 0xffffffff);
            /* goto LAB_00450bd4 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00450b4c/LAB_00450bd4"); return 0;
          }
        }
      } else {
        LAB_00450bd4: uVar5 = ((heap.u16((0x0088747e + heap.u32(((0x008ae9ce) >>> 0) + (iVar11) * 4) * 2 + iVar7))) & 0xffff);
        if (uVar5 != 0xffff) {
          iVar6 = ((((uVar5) >>> 0) * 0x100) >>> 0);
          uVar8 = ((heap.u32(((0x008ae9cc) >>> 0) + (uVar10 * 0x2586) * 4)) >>> 0);
          if ((heap.u32((0x008ae9c5) + (iVar11) * 4) & 2) != 0) {
            if (heap.u32((0x00743be4) + (iVar6) * 4) != 3) {
              break LAB_00450d74;
            }
            heap.setU32(((0x008ae9c5) + (iVar11) * 4), (heap.u32((0x008ae9c5) + (iVar11) * 4) & 0xfd) & 0xffffffff);
            if (heap.u32((0x00743bdf) + (iVar6) * 4) == heap.u32((0x008ae9cf) + (iVar11) * 4)) {
              heap.setU32(((0x008ae9cc) + (uVar10 * 0x2586) * 4), (0) & 0xffffffff);
              uVar8 = ((0) >>> 0);
            }
          }
          if (heap.u32((0x00743be4) + (iVar6) * 4) == 6) {
            heap.setU32(((0x008ae9c5) + (iVar11) * 4), (heap.u32((0x008ae9c5) + (iVar11) * 4) | 2) & 0xffffffff);
          } else {
            if (uVar8 < 0x12c0) {
              if ((heap.u32((0x008ae9c5) + (iVar11) * 4) & 4) != 0) {
                sVar2 = (((regs.eax = FUN_005d9220(heap, uVar8, iVar7))) & 0xffff);
                sVar2 = ((sVar2 >>> 3) & 0xffff);
                sVar4 = ((extraout_DX >>> 3) & 0xffff);
                if (sVar2 < -0x7e) {
                  sVar2 = ((-0x7f) & 0xffff);
                }
                if (0x7e < sVar2) {
                  sVar2 = ((0x7f) & 0xffff);
                }
                if (sVar4 < -0x7e) {
                  sVar4 = ((-0x7f) & 0xffff);
                }
                if (0x7e < sVar4) {
                  sVar4 = ((0x7f) & 0xffff);
                }
                if ((heap.u32(0x006e3b84) & 1) == 0) {
                  heap.setU32(((0x008ae9d0) + (iVar11 + uVar8) * 4), (((sVar2) << 24 >> 24)) & 0xffffffff);
                  heap.setU32(((0x008afc90) + (iVar11 + uVar8) * 4), (((sVar4) << 24 >> 24)) & 0xffffffff);
                } else {
                  heap.setU32(((0x008ae9d0) + (iVar11 + uVar8) * 4), (((((((sVar2 + ((heap.u32((0x008ae9d0) + (iVar11 + uVar8) * 4)) << 24 >> 24))) << 16 >> 16) >>> 1)) << 24 >> 24)) & 0xffffffff);
                  heap.setU32(((0x008afc90) + (iVar11 + uVar8) * 4), (((((((sVar4 + ((heap.u32((0x008afc90) + (iVar11 + uVar8) * 4)) << 24 >> 24))) << 16 >> 16) >>> 1)) << 24 >> 24)) & 0xffffffff);
                }
              }
              iVar7 = ((heap.i32((0x00743bbc + iVar6)) * 5 >>> 0x10) >>> 0);
              if (iVar7 < 0) {
                iVar7 = ((-iVar7) >>> 0);
              }
              uVar5 = ((((heap.u32((0x00743ba6) + (((uVar5) >>> 0) * 0x80) * 4)) << 16 >> 16) >>> 2) & 0xffff);
              if (0xfe < uVar5) {
                uVar5 = ((0xff) & 0xffff);
              }
              if ((heap.u32(0x006e3b84) & 1) == 0) {
                heap.setU32(((0x008b0f50) + (iVar11 + uVar8) * 4), (((iVar7) << 24 >> 24)) & 0xffffffff);
                heap.setU32(((0x008b2210) + (iVar11 + uVar8) * 4), (((uVar5) << 24 >> 24)) & 0xffffffff);
              } else {
                heap.setU32(((0x008b0f50) + (iVar11 + uVar8) * 4), ((((((((iVar7) << 16 >> 16) + heap.u32(((0x008b0f50) & 0xffff) + (iVar11 + uVar8) * 4)) & 0xffff) >>> 1)) << 24 >> 24)) & 0xffffffff);
                heap.setU32(((0x008b2210) + (iVar11 + uVar8) * 4), ((((((uVar5 + heap.u32(((0x008b2210) & 0xff) + (iVar11 + uVar8) * 4)) & 0xffff) >>> 1)) << 24 >> 24)) & 0xffffffff);
              }
              if (((heap.u32(0x006e3b84) & 1) != 0) && (uVar5 = ((((uVar8) << 16 >> 16) + 1) & 0xffff), heap.u32(((0x008ae9ca) & 0xffff) + (uVar10 * 0x2586) * 4) < uVar5)) {
                heap.setU32(((0x008ae9ca) + (uVar10 * 0x2586) * 4), (uVar5) & 0xffffffff);
              }
            }
            if ((heap.u32(0x006e3b84) & 1) != 0) {
              heap.setU32(((0x008ae9cc) + (uVar10 * 0x2586) * 4), (heap.u32((0x008ae9cc) + (uVar10 * 0x2586) * 4) + 1) & 0xffffffff);
            }
          }
        }
      }
    }
    }
    bVar3 = ((bVar3 + 1) & 0xff);
    if (7 < bVar3) {
      return;
    }
  } while (true);
}
