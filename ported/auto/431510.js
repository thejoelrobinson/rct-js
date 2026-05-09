// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/431510.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00431b6f } from "./431b6f.js";
import { FUN_00433bae } from "./433bae.js";
import { FUN_00433f20 } from "./433f20.js";
import { FUN_00436b2a } from "./436b2a.js";
import { FUN_005e3ace } from "./5e3ace.js";
export function FUN_00431510(heap) {
  let bVar1 = 0;
  let psVar2 = 0;
  let sVar3 = 0;
  let sVar4 = 0;
  let in_DX = regs.edx & 0xffff;
  let uVar5 = 0;
  let unaff_BX = regs.ebx & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  heap.setU32(0x00628910, (0) >>> 0);
  heap.setU32(0x0062891c, (in_DX) >>> 0);
  sVar3 = (((regs.eax = FUN_005e3ace(heap))) & 0xffff);
  if ((unaff_ESI != 0) && (psVar2 = ((heap.u32((unaff_ESI + 8))) >>> 0), psVar2 != 0x0)) {
    sVar4 = ((sVar3 - heap.i16(psVar2 + (2) * 2)) & 0xffff);
    heap.setU32(0x00628904, (sVar3) >>> 0);
    heap.setU32(0x00628906, (unaff_BX) >>> 0);
    if ((heap.i16(psVar2 + (2) * 2) <= sVar3) && (((sVar4 < heap.i16(psVar2) && (sVar3 = ((unaff_BX - heap.i16(psVar2 + (3) * 2)) & 0xffff), heap.i16(psVar2 + (3) * 2) <= unaff_BX)) && (sVar3 < heap.i16(psVar2 + (1) * 2))))) {
      bVar1 = ((heap.u8((psVar2 + ((8) * 2)))) & 0xff);
      heap.setU8(0x005f96ce, (((bVar1) & 0xffff)) & 0xff);
      uVar5 = ((-1 << (bVar1 & 0x1f)) & 0xffff);
      heap.setU8(0x005f96c4, ((sVar4 << (bVar1 & 0x1f)) + heap.i16(psVar2 + (4) * 2) & uVar5) & 0xff);
      heap.setU8(0x005f96c6, ((sVar3 << (bVar1 & 0x1f)) + heap.i16(psVar2 + (5) * 2) & uVar5) & 0xff);
      heap.setU32(0x005f96da, (1) >>> 0);
      heap.setU32(0x005f96d8, (1) >>> 0);
      heap.setU32(0x005f96e0, (0x006284ac) >>> 0);
      heap.setU32(0x00981ef8, (0x005f96d0) >>> 0);
      heap.setU32(0x005f96d4, (heap.u8(0x005f96c4)) >>> 0);
      heap.setU32(0x005f96d6, (heap.u8(0x005f96c6)) >>> 0);
      heap.setU32(0x005f96de, (heap.u8(0x005f96ce)) >>> 0);
      (regs.eax = FUN_00431b6f(heap, psVar2));
      (regs.eax = FUN_00436b2a(heap));
      (regs.eax = FUN_00433bae(heap));
      (regs.eax = FUN_00433f20(heap));
    }
  }
  return heap.u32(0x00628914);
}
