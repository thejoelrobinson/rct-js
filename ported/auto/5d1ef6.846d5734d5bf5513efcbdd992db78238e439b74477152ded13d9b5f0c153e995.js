// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d1ef6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005cfc49 } from "./5cfc49.js";
import { FUN_005cfc50 } from "./5cfc50.js";
import { FUN_005cfe66 } from "./5cfe66.js";
import { FUN_005d13e2 } from "./5d13e2.js";
import { FUN_005d21fa } from "./5d21fa.js";
import { FUN_005d22f8 } from "./5d22f8.js";
export function FUN_005d1ef6(heap) {
  let uVar1 = 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let uVar2 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  let uVar3 = 0;
  let bVar4 = 0;
  let uVar5 = 0;
  if (heap.u8(0x00652288) == 3) {
    (regs.eax = FUN_005d21fa(heap));
    uVar1 = ((heap.u8(0x00652291)) & 0xff);
    uVar3 = ((heap.u8(0x00652290)) & 0xff);
    bVar4 = ((false) & 0xff);
    (regs.eax = FUN_005cfe66(heap));
    if (bVar4) {
      heap.setU8(0x00652288, (0) & 0xff);
      return (regs.eax = FUN_005d13e2(heap));
    }
    uVar5 = (((regs.eax = FUN_005cfc50(heap))) >>> 0);
    heap.setU8(0x0065228e, (((uVar5 >>> 0x20) & 0xffff)) & 0xff);
    uVar2 = ((extraout_ECX_00) >>> 0);
    heap.setU8(0x00652290, (uVar3) & 0xff);
    if (bVar4) {
      heap.setU8(0x00652288, (2) & 0xff);
      heap.setU8(0x0065228a, (((uVar5) & 0xffff)) & 0xff);
      heap.setU8(0x0065228c, (((extraout_ECX_00) & 0xffff)) & 0xff);
      heap.setU8(0x00652290, (uVar1) & 0xff);
      heap.setU8(0x00652291, (heap.u8((unaff_EDI + 4))) & 0xff);
      heap.setU8(0x00652292, (0) & 0xff);
      heap.setU8(0x00652293, (0) & 0xff);
      (regs.eax = FUN_005d22f8(heap));
      return (regs.eax = FUN_005d13e2(heap));
    }
    LAB_005d1f86: heap.setU8(0x0065228e, (((uVar5 >>> 0x20) & 0xffff)) & 0xff);
    heap.setU8(0x0065228a, (((uVar5 >>> 0x10) & 0xffff)) & 0xff);
    heap.setU8(0x0065228c, (((((uVar2) >>> 0) >>> 0x10) & 0xffff)) & 0xff);
    heap.setU8(0x00652291, (heap.u8((unaff_EDI + 4))) & 0xff);
    heap.setU8(0x00652292, (0) & 0xff);
    heap.setU8(0x00652293, (0) & 0xff);
    return (regs.eax = FUN_005d13e2(heap));
  }
  uVar3 = ((heap.u8(0x00652288) == 0) & 0xff);
  if (heap.u8(0x00652288) == 1) {
    (regs.eax = FUN_005d21fa(heap));
    heap.setU32(0x00652470, (heap.u8(0x00652289)) >>> 0);
    uVar5 = (((regs.eax = FUN_005cfc49(heap))) >>> 0);
    if (!uVar3) {
      heap.setU8(0x00652288, (3) & 0xff);
      uVar2 = ((extraout_ECX) >>> 0);
      unaff_EDI = ((unaff_ESI) >>> 0);
      heap.setU8(0x00652290, (0) & 0xff);
      /* goto LAB_005d1f86 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d1ef6/LAB_005d1f86"); return 0;
    }
  }
  return;
}
