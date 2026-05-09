// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d1dd4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005cfac0 } from "./5cfac0.js";
import { FUN_005cfac7 } from "./5cfac7.js";
import { FUN_005cfe66 } from "./5cfe66.js";
import { FUN_005d13e2 } from "./5d13e2.js";
import { FUN_005d21fa } from "./5d21fa.js";
import { FUN_005d22f8 } from "./5d22f8.js";
export function FUN_005d1dd4(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let extraout_DX = 0;
  let extraout_DX_00 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  let bVar3 = 0;
  if (heap.u8(0x00652288) == 3) {
    (regs.eax = FUN_005d21fa(heap));
    uVar1 = ((heap.u8(0x00652291)) & 0xff);
    bVar3 = ((false) & 0xff);
    (regs.eax = FUN_005cfe66(heap));
    if (bVar3) {
      heap.setU8(0x00652288, (0) & 0xff);
      return (regs.eax = FUN_005d13e2(heap));
    }
    uVar2 = (((regs.eax = FUN_005cfac7(heap))) & 0xffff);
    heap.setU8(0x0065228c, (extraout_CX_00) & 0xff);
    heap.setU8(0x0065228e, (extraout_DX_00) & 0xff);
    if (bVar3) {
      heap.setU8(0x00652288, (1) & 0xff);
      heap.setU8(0x00652290, (uVar1) & 0xff);
      heap.setU8(0x00652291, (heap.u8(unaff_EDI + (4))) & 0xff);
      heap.setU8(0x00652292, (0) & 0xff);
      heap.setU8(0x00652293, (0) & 0xff);
      heap.setU8(0x0065228a, (uVar2) & 0xff);
      (regs.eax = FUN_005d22f8(heap));
      return (regs.eax = FUN_005d13e2(heap));
    }
    LAB_005d1e67: heap.setU8(0x00652290, (heap.u8(unaff_EDI) & 3) & 0xff);
    heap.setU8(0x00652291, (heap.u8(unaff_EDI + (4))) & 0xff);
    heap.setU8(0x00652292, (0) & 0xff);
    heap.setU8(0x00652293, (0) & 0xff);
    heap.setU8(0x0065228a, (uVar2) & 0xff);
    return (regs.eax = FUN_005d13e2(heap));
  }
  if (heap.u8(0x00652288) == 2) {
    (regs.eax = FUN_005d21fa(heap));
    heap.setU32(0x00652470, (heap.u8(0x00652289)) >>> 0);
    bVar3 = ((false) & 0xff);
    uVar2 = (((regs.eax = FUN_005cfac0(heap))) & 0xffff);
    if (!bVar3) {
      heap.setU8(0x00652288, (3) & 0xff);
      heap.setU8(0x0065228c, (extraout_CX) & 0xff);
      heap.setU8(0x0065228e, (extraout_DX) & 0xff);
      unaff_EDI = ((unaff_ESI) >>> 0);
      /* goto LAB_005d1e67 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d1dd4/LAB_005d1e67"); return 0;
    }
  }
  return;
}
