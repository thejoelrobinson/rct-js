// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e1fdd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00403b39 } from "./403b39.js";
import { FUN_00403bd8 } from "./403bd8.js";
import { FUN_0042d56c } from "./42d56c.js";
import { FUN_0042d60a } from "./42d60a.js";
import { FUN_0042d637 } from "./42d637.js";
export function FUN_005e1fdd(heap) {
  let sVar1 = 0;
  let puVar2 = 0;
  let uVar3 = 0;
  if ((heap.u32(0x00991f30) >>> 5 & 1) == 0) {
    if (heap.u8(0x0099c16b) == 1) {
      puVar2 = (((regs.eax = FUN_00403bd8(heap))) >>> 0);
      if (puVar2 == 0x0) {
        uVar3 = (((regs.eax = FUN_0042d60a(heap))) >>> 0);
        puVar2 = (((uVar3 & 0xffff)) >>> 0);
      } else {
        (regs.eax = FUN_0042d56c(heap));
      }
    } else {
      puVar2 = (((regs.eax = FUN_00403bd8(heap))) >>> 0);
    }
    if (heap.u8(0x0099c16b) == 2) {
      (regs.eax = FUN_0042d637(heap));
    }
    if (puVar2 == 0x0) {
      uVar3 = ((heap.u32(0x0099fdf4)) >>> 0);
      if (heap.u32(0x0099fdf4) == 0x80000000) {
        return 0;
      }
    } else {
      if (heap.u8(0x0099c16b) == 1) {
      (regs.eax = FUN_0042d60a(heap));
      uVar3 = (((regs.eax = FUN_0042d60a(heap))) >>> 0);
      (regs.eax = FUN_0042d60a(heap));
      uVar3 = ((uVar3 & 0xffff) >>> 0);
    } else {
      uVar3 = ((heap.u32(puVar2)) >>> 0);
      if (heap.u8(0x0099c16b) == 2) {
        (regs.eax = FUN_0042d637(heap));
        uVar3 = (((regs.eax = FUN_0042d637(heap))) >>> 0);
        (regs.eax = FUN_0042d637(heap));
      }
    }
    }
    if (((uVar3) >>> 0) < 0) {
      uVar3 = ((0) >>> 0);
    }
    if (heap.u32(0x00971ed6) <= ((uVar3) & 0xffff)) {
      uVar3 = ((((heap.u32(0x00971ed6) - 1) >>> 0)) >>> 0);
    }
    return uVar3;
  }
  if (heap.u8(0x0099c16b) == 1) {
    sVar1 = (((regs.eax = FUN_0042d60a(heap))) & 0xffff);
    if (sVar1 == 0) {
      /* goto LAB_005e21c0 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005e1fdd/LAB_005e21c0"); return 0;
    }
  } else {
    if (heap.u8(0x0099c16b) == 2) {
      (regs.eax = FUN_0042d637(heap));
    }
    if (heap.u32(0x005ebee4) == 0) {
      /* goto LAB_005e21c0 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005e1fdd/LAB_005e21c0"); return 0;
    }
  }
  if (heap.u8(0x0099c16b) == 1) {
    uVar3 = (((regs.eax = FUN_0042d60a(heap))) >>> 0);
    if ((uVar3 & 0x80) == 0) {
      LAB_005e21c0: (regs.eax = FUN_00403b39(heap));
      heap.setU32(0x00991f30, (heap.u32(0x00991f30) & 0xffffffdf) >>> 0);
      if (heap.u8(0x0099c16b) != 1) {
        uVar3 = ((heap.u32(0x005f128c)) >>> 0);
        if (heap.u8(0x0099c16b) == 2) {
          uVar3 = (((regs.eax = FUN_0042d637(heap))) >>> 0);
          (regs.eax = FUN_0042d637(heap));
        }
        heap.setU32(0x0099fdf4, (0x80000000) >>> 0);
        return uVar3;
      }
      sVar1 = (((regs.eax = FUN_0042d60a(heap))) & 0xffff);
      (regs.eax = FUN_0042d60a(heap));
      heap.setU32(0x0099fdf4, (0x80000000) >>> 0);
      return ((sVar1) >>> 0);
    }
  } else {
    if (heap.u8(0x0099c16b) == 2) {
      (regs.eax = FUN_0042d637(heap));
    }
    if ((heap.u32(0x005f1288) & 0x80) == 0) {
      /* goto LAB_005e21c0 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005e1fdd/LAB_005e21c0"); return 0;
    }
  }
  if (heap.u8(0x0099c16b) != 1) {
    uVar3 = ((heap.u32(0x005f128c)) >>> 0);
    if (heap.u8(0x0099c16b) == 2) {
      uVar3 = (((regs.eax = FUN_0042d637(heap))) >>> 0);
      (regs.eax = FUN_0042d637(heap));
    }
    heap.setU32(0x005f128c, (0) >>> 0);
    heap.setU32(0x005f1280, (0) >>> 0);
    return uVar3;
  }
  sVar1 = (((regs.eax = FUN_0042d60a(heap))) & 0xffff);
  (regs.eax = FUN_0042d60a(heap));
  heap.setU32(0x005f128c, (0) >>> 0);
  heap.setU32(0x005f1280, (0) >>> 0);
  return ((sVar1) >>> 0);
}
