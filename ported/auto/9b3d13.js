// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b3d13.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_009b3d13(heap) {
  let uVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let bVar4 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let sVar5 = 0;
  let sVar6 = 0;
  let uVar7 = 0;
  let puVar8 = 0;
  let unaff_ESI = regs.esi >>> 0;
  if ((heap.u32(0x009a2000) & 0x20000000) != 0) {
    puVar8 = (((heap.u32((unaff_ESI + ((heap.u32(0x009a2020)) >>> 0) * 2)) + unaff_ESI)) >>> 0);
    do {
      LAB_009b3e0b: {
      uVar1 = ((heap.u16(puVar8)) & 0xffff);
      heap.setU32(0x009aa032, (((uVar1) << 24 >> 24)) >>> 0);
      bVar4 = (((((uVar1 & 0xffffff7f) >>> 8) & 0xff)) & 0xff);
      uVar2 = ((((uVar1 & 0xffffff7f) & 0xffff)) & 0xffff);
      uVar7 = ((((bVar4) >>> 0)) >>> 0);
      puVar8 = (((((puVar8) >>> 0) + uVar2 + 2)) >>> 0);
      if ((uVar1 & 0x100) == 0) {
        LAB_009b3dd4: sVar5 = (((((uVar7 - heap.u32(0x009a2024))) << 16 >> 16)) & 0xffff);
        if (uVar7 - heap.u32(0x009a2024) == 0 || ((uVar7) >>> 0) < heap.u32(0x009a2024)) {
          uVar2 = ((uVar2 + sVar5) & 0xffff);
          if ((((uVar2) << 16 >> 16) < 0) || (uVar2 == 0)) {
            break LAB_009b3e0b;
          }
          sVar5 = ((0) & 0xffff);
        }
        sVar6 = ((sVar5 + uVar2 + -1) & 0xffff);
        uVar3 = ((uVar2) & 0xffff);
        if (((sVar6 == 0 || (((sVar5 + uVar2)) << 16 >> 16) < 1) || (uVar3 = ((uVar2 - sVar6) & 0xffff), uVar3 != 0 && sVar6 <= ((uVar2) << 16 >> 16))) && (((uVar3 + 1) & 0xffff) >>> 1 != 0)) {
          heap.setU8(0x0099c164, (1) & 0xff);
          return 0;
        }
      } else {
        uVar7 = ((((bVar4 + 1) >>> 0)) >>> 0);
        uVar2 = ((uVar2 - 1) & 0xffff);
        if (uVar2 != 0) {
          /* goto LAB_009b3dd4 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b3d13/LAB_009b3dd4"); return 0;
        }
      }
      }
      if ((uVar1 & 0x80) != 0) {
        return 0;
      }
    } while (true);
  }
  if ((heap.u32(0x009a2000) & 0x40000000) != 0) {
    puVar8 = (((heap.u32((unaff_ESI + ((heap.u32(0x009a2020)) >>> 0) * 2)) + unaff_ESI)) >>> 0);
    do {
      LAB_009b3e7d: {
      uVar1 = ((heap.u16(puVar8)) & 0xffff);
      heap.setU32(0x009aa032, (((uVar1) << 24 >> 24)) >>> 0);
      bVar4 = (((((uVar1 & 0xffffff7f) >>> 8) & 0xff)) & 0xff);
      uVar2 = ((((uVar1 & 0xffffff7f) & 0xffff)) & 0xffff);
      uVar7 = ((((bVar4) >>> 0)) >>> 0);
      puVar8 = (((((puVar8) >>> 0) + uVar2 + 2)) >>> 0);
      if ((uVar1 & 0x100) == 0) {
        LAB_009b3e46: sVar5 = (((((uVar7 - heap.u32(0x009a2024))) << 16 >> 16)) & 0xffff);
        if (uVar7 - heap.u32(0x009a2024) == 0 || ((uVar7) >>> 0) < heap.u32(0x009a2024)) {
          uVar2 = ((uVar2 + sVar5) & 0xffff);
          if ((((uVar2) << 16 >> 16) < 0) || (uVar2 == 0)) {
            break LAB_009b3e7d;
          }
          sVar5 = ((0) & 0xffff);
        }
        sVar6 = ((sVar5 + uVar2 + -1) & 0xffff);
        uVar3 = ((uVar2) & 0xffff);
        if (((sVar6 == 0 || (((sVar5 + uVar2)) << 16 >> 16) < 1) || (uVar3 = ((uVar2 - sVar6) & 0xffff), uVar3 != 0 && sVar6 <= ((uVar2) << 16 >> 16))) && (((uVar3 + 1) & 0xffff) >>> 1 != 0)) {
          heap.setU8(0x0099c164, (1) & 0xff);
          return 0;
        }
      } else {
        uVar7 = ((((bVar4 + 1) >>> 0)) >>> 0);
        uVar2 = ((uVar2 - 1) & 0xffff);
        if (uVar2 != 0) {
          /* goto LAB_009b3e46 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b3d13/LAB_009b3e46"); return 0;
        }
      }
      }
      if ((uVar1 & 0x80) != 0) {
        return 0;
      }
    } while (true);
  }
  puVar8 = (((heap.u32((unaff_ESI + ((heap.u32(0x009a2020)) >>> 0) * 2)) + unaff_ESI)) >>> 0);
  do {
    LAB_009b3d99: {
    uVar1 = ((heap.u16(puVar8)) & 0xffff);
    heap.setU32(0x009aa032, (((uVar1) << 24 >> 24)) >>> 0);
    bVar4 = (((((uVar1 & 0xffffff7f) >>> 8) & 0xff)) & 0xff);
    uVar2 = ((((uVar1 & 0xffffff7f) & 0xffff)) & 0xffff);
    uVar7 = ((((bVar4) >>> 0)) >>> 0);
    puVar8 = (((((puVar8) >>> 0) + uVar2 + 2)) >>> 0);
    if ((uVar1 & 0x100) == 0) {
      LAB_009b3d62: sVar5 = (((((uVar7 - heap.u32(0x009a2024))) << 16 >> 16)) & 0xffff);
      if (uVar7 - heap.u32(0x009a2024) == 0 || ((uVar7) >>> 0) < heap.u32(0x009a2024)) {
        uVar2 = ((uVar2 + sVar5) & 0xffff);
        if ((((uVar2) << 16 >> 16) < 0) || (uVar2 == 0)) {
          break LAB_009b3d99;
        }
        sVar5 = ((0) & 0xffff);
      }
      sVar6 = ((sVar5 + uVar2 + -1) & 0xffff);
      uVar3 = ((uVar2) & 0xffff);
      if (((sVar6 == 0 || (((sVar5 + uVar2)) << 16 >> 16) < 1) || (uVar3 = ((uVar2 - sVar6) & 0xffff), uVar3 != 0 && sVar6 <= ((uVar2) << 16 >> 16))) && (((uVar3 + 1) & 0xffff) >>> 1 != 0)) {
        heap.setU8(0x0099c164, (1) & 0xff);
        return in_EAX;
      }
    } else {
      uVar7 = ((((bVar4 + 1) >>> 0)) >>> 0);
      uVar2 = ((uVar2 - 1) & 0xffff);
      if (uVar2 != 0) {
        /* goto LAB_009b3d62 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b3d13/LAB_009b3d62"); return 0;
      }
    }
    }
    if ((uVar1 & 0x80) != 0) {
      return in_EAX;
    }
  } while (true);
}
