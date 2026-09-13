// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42ca0e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004046fc } from "./4046fc.js";
import { FUN_0042cb29 } from "./42cb29.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_0042ca0e(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let sVar3 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  LAB_0042ca6f: {
  (regs.eax = FUN_004046fc(heap));
  // 0x5f1ca4 (day) and 0x5f1394 (month) are 16-bit, and so are the "last seen"
  // copies at 0x99a502 / 0x99a504 — which are only TWO BYTES APART. Ghidra
  // emitted 32-bit reads here and 32-bit stores below, so writing the day at
  // 0x99a502 also clobbered the month at 0x99a504. The date-change gate could
  // then never match, and the 0x2710 charge below fired EVERY TICK instead of
  // once per day: cash fell by 10,000 (£1,000) per tick, reaching -£308,000 in
  // 300 ticks. That is the origin of the reported "-101,900,000" readout —
  // 101,900,000 / 10,000 = 10,190 ticks of play. The binary is unambiguous:
  //   0x42ca20: cmp bx, word ptr [0x99a504]
  //   0x42ca29: cmp ax, word ptr [0x99a502]
  //   0x42ca75: 66 a3 02 a5 99 00  mov WORD ptr [0x99a502], ax
  //   0x42ca81: 66 a3 04 a5 99 00  mov WORD ptr [0x99a504], ax
  if (heap.u16(0x005f1394) == heap.u16(0x0099a504)) {
    if ((heap.u16(0x005f1ca4) == heap.u16(0x0099a502)) || ((((heap.u16(0x005f1ca4) + -1)) & 0xffff) == heap.u16(0x0099a502))) {
      break LAB_0042ca6f;
    }
  } else {
    sVar3 = ((heap.u16(0x005f1394) + -1) & 0xffff);
    if (sVar3 == 0) {
      sVar3 = ((0xc) & 0xffff);
    }
    if ((sVar3 == heap.u16(0x0099a504)) && (heap.u16(0x005f1ca4) == 1)) {
      break LAB_0042ca6f;
    }
  }
  heap.setU32(0x0087c3b4, (heap.u32(0x0087c3b4) + -10000) >>> 0);
  if (-1 < (heap.u32(0x0087c3b4) | 0)) {
    heap.setU32(0x0087c3b4, (-heap.u32(0x0087c3b4)) >>> 0);
  }
  }
  heap.setU16(0x0099a502, (heap.u16(0x005f1ca4)) & 0xffff);
  heap.setU16(0x0099a504, (heap.u16(0x005f1394)) & 0xffff);
  if (heap.u8(0x008d7eb8) != 0) {
    uVar2 = (((regs.eax = FUN_005e5301(heap))) >>> 0);
    heap.setU32(0x008d7ebe, (heap.u32(0x008d7ebe) + 1) >>> 0);
    if ((heap.u32(0x008d7ebe) == 1) && ((heap.u32(0x0099a500) & 1) == 0)) {
      (regs.eax = FUN_00452fce(heap, unaff_EBX & 0xffff0000, uVar2));
    }
    uVar1 = ((0x180) & 0xffff);
    if ((((heap.u8(0x008d7fc4) != 0) && (uVar1 = ((0x140) & 0xffff), heap.u8(0x008d80d0) != 0)) && (heap.u8(0x008d81dc) != 0)) && ((uVar1 = ((0x120) & 0xffff), heap.u8(0x008d82e8) != 0 && (heap.u8(0x008d83f4) != 0)))) {
      uVar1 = ((0x100) & 0xffff);
    }
    if (heap.u32(0x008d7ebe) < uVar1) {
      return;
    }
    (regs.eax = FUN_0042cb29(heap));
  }
  return;
}
