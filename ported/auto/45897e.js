// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45897e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CARRY1, CONCAT11, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0045897e(heap) {
  let bVar1 = 0;
  let uVar2 = 0;
  let puVar3 = 0;
  let bVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let puVar7 = 0;
  let pbVar8 = 0;
  let unaff_DI = regs.edi & 0xffff;
  uVar6 = ((((heap.u32(0x00971e84)) >>> 0)) >>> 0);
  heap.setU32(0x00642fc0, (0) >>> 0);
  do {
    uVar5 = ((0) & 0xffff);
    heap.setU32(0x00642fbc, (0x0) >>> 0);
    LAB_0045899d: do {
      puVar7 = ((unaff_ESI) >>> 0);
      bVar4 = ((heap.u8(puVar7)) & 0xff);
      unaff_ESI = (((((puVar7) >>> 0) + 1)) >>> 0);
      if (bVar4 == 0) {
        return;
      }
      if (bVar4 == 0x20) {
        heap.setU32(0x00642fbc, (unaff_ESI) >>> 0);
      }
      puVar3 = ((unaff_ESI) >>> 0);
      if (bVar4 == 5) {
        /* goto LAB_004589d8 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0045897e/LAB_004589d8"); return 0;
      }
      if (bVar4 < 0x20) {
        if (bVar4 < 5) {
          unaff_ESI = (((((puVar7) >>> 0) + 2)) >>> 0);
          /* goto LAB_0045899d — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0045897e/LAB_0045899d"); return 0;
        }
        if (bVar4 == 7) {
          uVar6 = ((0x1c0) >>> 0);
          /* goto LAB_0045899d — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0045897e/LAB_0045899d"); return 0;
        }
        if (bVar4 == 8) {
          uVar6 = ((0x2a0) >>> 0);
          /* goto LAB_0045899d — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0045897e/LAB_0045899d"); return 0;
        }
        if (bVar4 == 9) {
          uVar6 = ((0xe0) >>> 0);
          /* goto LAB_0045899d — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0045897e/LAB_0045899d"); return 0;
        }
        if (bVar4 == 10) {
          uVar6 = ((0) >>> 0);
          /* goto LAB_0045899d — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0045897e/LAB_0045899d"); return 0;
        }
        if (bVar4 < 0x11) {
          /* goto LAB_0045899d — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0045897e/LAB_0045899d"); return 0;
        }
        if (bVar4 != 0x17) {
          unaff_ESI = (((((puVar7) >>> 0) + 3)) >>> 0);
          if (0x16 < bVar4) {
            unaff_ESI = (((((puVar7) >>> 0) + 5)) >>> 0);
          }
          /* goto LAB_0045899d — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0045897e/LAB_0045899d"); return 0;
        }
        uVar2 = ((heap.u32(unaff_ESI)) >>> 0);
        unaff_ESI = (((((puVar7) >>> 0) + 5)) >>> 0);
        uVar5 = ((uVar5 + heap.i16((0x008dc0b8 + (uVar2 & 0x1ffff) * 0x10))) & 0xffff);
      } else {
        uVar5 = ((CONCAT11((((uVar5 >>> 8)) << 24 >> 24) + CARRY1(((uVar5) & 0xff), heap.u32((0x0099a508) + (((bVar4 - 0x20) & 0xff) + uVar6) * 4)), ((uVar5) & 0xff) + heap.u32((0x0099a508) + (((bVar4 - 0x20) & 0xff) + uVar6) * 4))) & 0xffff);
      }
    } while (uVar5 <= unaff_DI);
    puVar3 = ((heap.u32(0x00642fbc)) >>> 0);
    if (heap.u32(0x00642fbc) == 0x0) {
      pbVar8 = (((((unaff_ESI) >>> 0) + -1)) >>> 0);
      bVar4 = ((0) & 0xff);
      do {
        LOCK();
        bVar1 = ((heap.u8(pbVar8)) & 0xff);
        heap.setU32(pbVar8, (bVar4) & 0xffffffff);
        UNLOCK();
        pbVar8 = ((pbVar8 + 1) >>> 0);
        bVar4 = ((bVar1) & 0xff);
      } while (bVar1 != 0);
      heap.setU32(pbVar8, (0) & 0xffffffff);
      heap.setU32(0x00642fc0, (heap.u32(0x00642fc0) + 1) >>> 0);
    } else {
      LAB_004589d8: unaff_ESI = ((puVar3) >>> 0);
      heap.setU32(0x00642fc0, (heap.u32(0x00642fc0) + 1) >>> 0);
      heap.setU8((((unaff_ESI) >>> 0) + -1), (0) & 0xff);
    }
  } while (true);
}
