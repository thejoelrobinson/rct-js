// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b38bc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_009b38bc(heap) {
  let uVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar2 = 0;
  let sVar3 = 0;
  let iVar4 = 0;
  let puVar5 = 0;
  let unaff_ESI = regs.esi >>> 0;
  if ((heap.u32(0x009a2000) & 0x20000000) != 0) {
    puVar5 = (((heap.u32((unaff_ESI + ((heap.u32(0x009a2020)) >>> 0) * 2)) + unaff_ESI)) >>> 0);
    do {
      uVar1 = ((heap.u16(puVar5)) & 0xffff);
      heap.setU32(0x009aa032, (((uVar1) & 0xff)) >>> 0);
      uVar2 = ((((((uVar1) & 0xff) & 0x7f) & 0xffff)) & 0xffff);
      puVar5 = (((((puVar5) >>> 0) + uVar2 + 2)) >>> 0);
      iVar4 = ((((uVar1 >>> 8) >>> 0) - heap.u32(0x009a2024)) >>> 0);
      if (iVar4 == 0 || ((((uVar1 >>> 8) >>> 0)) >>> 0) < heap.u32(0x009a2024)) {
        uVar2 = ((uVar2 + ((iVar4) << 16 >> 16)) & 0xffff);
        if ((-1 < (((uVar2) << 16 >> 16) | 0)) && (uVar2 != 0)) {
          iVar4 = ((0) >>> 0);
          /* goto LAB_009b396a — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b38bc/LAB_009b396a"); return 0;
        }
      } else {
        LAB_009b396a: sVar3 = ((((iVar4) << 16 >> 16) + uVar2) & 0xffff);
        if ((sVar3 < 2) || ((((sVar3 + -1)) << 16 >> 16) < ((uVar2) << 16 >> 16))) {
          heap.setU8(0x0099c164, (1) & 0xff);
          return 0;
        }
      }
      if ((uVar1 & 0x80) != 0) {
        return 0;
      }
    } while (true);
  }
  if ((heap.u32(0x009a2000) & 0x40000000) != 0) {
    puVar5 = (((heap.u32((unaff_ESI + ((heap.u32(0x009a2020)) >>> 0) * 2)) + unaff_ESI)) >>> 0);
    do {
      uVar1 = ((heap.u16(puVar5)) & 0xffff);
      heap.setU32(0x009aa032, (((uVar1) & 0xff)) >>> 0);
      uVar2 = ((((((uVar1) & 0xff) & 0x7f) & 0xffff)) & 0xffff);
      puVar5 = (((((puVar5) >>> 0) + uVar2 + 2)) >>> 0);
      iVar4 = ((((uVar1 >>> 8) >>> 0) - heap.u32(0x009a2024)) >>> 0);
      if (iVar4 == 0 || ((((uVar1 >>> 8) >>> 0)) >>> 0) < heap.u32(0x009a2024)) {
        uVar2 = ((uVar2 + ((iVar4) << 16 >> 16)) & 0xffff);
        if ((-1 < (((uVar2) << 16 >> 16) | 0)) && (uVar2 != 0)) {
          iVar4 = ((0) >>> 0);
          /* goto LAB_009b39c4 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b38bc/LAB_009b39c4"); return 0;
        }
      } else {
        LAB_009b39c4: sVar3 = ((((iVar4) << 16 >> 16) + uVar2) & 0xffff);
        if ((sVar3 < 2) || ((((sVar3 + -1)) << 16 >> 16) < ((uVar2) << 16 >> 16))) {
          heap.setU8(0x0099c164, (1) & 0xff);
          return 0;
        }
      }
      if ((uVar1 & 0x80) != 0) {
        return 0;
      }
    } while (true);
  }
  puVar5 = (((heap.u32((unaff_ESI + ((heap.u32(0x009a2020)) >>> 0) * 2)) + unaff_ESI)) >>> 0);
  do {
    uVar1 = ((heap.u16(puVar5)) & 0xffff);
    heap.setU32(0x009aa032, (((uVar1) & 0xff)) >>> 0);
    uVar2 = ((((((uVar1) & 0xff) & 0x7f) & 0xffff)) & 0xffff);
    puVar5 = (((((puVar5) >>> 0) + uVar2 + 2)) >>> 0);
    iVar4 = ((((uVar1 >>> 8) >>> 0) - heap.u32(0x009a2024)) >>> 0);
    if (iVar4 == 0 || ((((uVar1 >>> 8) >>> 0)) >>> 0) < heap.u32(0x009a2024)) {
      uVar2 = ((uVar2 + ((iVar4) << 16 >> 16)) & 0xffff);
      if ((-1 < (((uVar2) << 16 >> 16) | 0)) && (uVar2 != 0)) {
        iVar4 = ((0) >>> 0);
        /* goto LAB_009b3910 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b38bc/LAB_009b3910"); return 0;
      }
    } else {
      LAB_009b3910: sVar3 = ((((iVar4) << 16 >> 16) + uVar2) & 0xffff);
      if ((sVar3 < 2) || ((((sVar3 + -1)) << 16 >> 16) < ((uVar2) << 16 >> 16))) {
        heap.setU8(0x0099c164, (1) & 0xff);
        return in_EAX;
      }
    }
    if ((uVar1 & 0x80) != 0) {
      return in_EAX;
    }
  } while (true);
}
