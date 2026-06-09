// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/429aff.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e68e2 } from "./5e68e2.js";
export function FUN_00429aff(heap) {
  let psVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let in_CF = regs.cf | 0;
  let bVar6 = 0;
  // @manual fix — the translator dropped the function prologue's register
  // setup. The binary (disasm 0x429aff-0x429b11) does:
  //   mov ax, [0x971ed6]   ; AX = display width
  //   mov bx, [0x971ed8]   ; BX = display height
  //   call 0x5e68e2        ; finds the viewport window; returns AX unchanged,
  //                        ; CF=0 if found / CF=1 (stc) if none → `jb` skips block
  // Ghidra's C lost the `ax = width` init (5e68e2 is `undefined2 ...(void)`),
  // so sVar2 came from 5e68e2 reading a STALE regs.eax (low16=0) → sVar2=0 →
  // the viewport widget x2 (_DAT_005f5114) was resolved to -1 instead of
  // width-1, which made the cursor hit-test 0x5e3874 reject every viewport
  // click (x2=-1 fails the signed bbox compare). Set AX=width/BX=height first,
  // then read in_CF from 5e68e2's carry result (5e68e2.js now writes regs.cf).
  regs.eax = heap.u16(0x00971ed6);
  regs.ebx = heap.u16(0x00971ed8);
  sVar4 = ((heap.u32(0x00971ed8)) & 0xffff);
  sVar2 = (((regs.eax = FUN_005e68e2(heap))) & 0xffff);
  in_CF = regs.cf | 0;  // CF is the 5e68e2 result (asm: `jb 0x429b63`).
  if (!in_CF) {
    psVar1 = ((heap.u32((unaff_ESI + 8))) >>> 0);
    heap.setI16((unaff_ESI + 0x24), (sVar2) & 0xffff);
    sVar5 = ((sVar4) & 0xffff);
    if ((heap.u32(0x0099a500) & 1) == 0) {
      sVar5 = ((sVar4 + -0x40) & 0xffff);
    }
    heap.setI16((unaff_ESI + 0x26), (sVar5) & 0xffff);
    // @manual fix — these are 16-bit `mov word ptr` stores in the binary
    // (disasm 0x429b38 / 0x429b44). _DAT_005f5114 / _DAT_005f5118 are `short`
    // globals that OVERLAP the viewport widget-table fields at 0x5f5114
    // (widget0 x2) and 0x5f5118 (widget0 y2 area). The auto setU32 corrupted
    // the adjacent 16 bits (widget0 y1 / +0xa), so even with the right value
    // the widget bbox stayed malformed. Use setU16 to match the binary.
    heap.setU16(0x005f5114, (sVar2 + -1) & 0xffff);
    heap.setU16(0x005f5118, (sVar5 + -1) & 0xffff);
    heap.setU32(psVar1, (sVar2) & 0xffffffff);
    heap.setI16((psVar1 + (1) * 2), (sVar5) & 0xffff);
    heap.setI16((psVar1 + (6) * 2), (sVar2 << (heap.u8((psVar1 + ((8) * 2))) & 0x1f)) & 0xffff);
    heap.setI16((psVar1 + (7) * 2), (sVar5 << (heap.u8((psVar1 + ((8) * 2))) & 0x1f)) & 0xffff);
  }
  bVar6 = ((true) & 0xff);
  uVar3 = (((regs.ecx = 0xff01, regs.eax = FUN_005e3b2b(heap), regs.ecx = 0x1, regs.eax)) & 0xffff);
  if (!bVar6) {
    if (uVar3 < 0x280) {
      uVar3 = ((0x280) & 0xffff);
    }
    heap.setU16((unaff_ESI + 0x24), (uVar3) & 0xffff);
  }
  bVar6 = ((true) & 0xff);
  uVar3 = (((regs.ecx = 0xff01, regs.eax = FUN_005e3b2b(heap), regs.ecx = 0x1, regs.eax)) & 0xffff);
  if (!bVar6) {
    heap.setI16((unaff_ESI + 0x22), (sVar4 + -0x22) & 0xffff);
    if (uVar3 < 0x280) {
      uVar3 = ((0x280) & 0xffff);
    }
    heap.setU16((unaff_ESI + 0x24), (uVar3) & 0xffff);
    heap.setU32(0x005f52fc, (uVar3 - 1) >>> 0);
    heap.setU32(0x005f530c, (uVar3 - 3) >>> 0);
    heap.setU32(0x005f530a, (uVar3 - 0x76) >>> 0);
    heap.setU32(0x005f52fa, (uVar3 - 0x78) >>> 0);
    heap.setU32(0x005f52bc, (uVar3 - 0x79) >>> 0);
    heap.setU32(0x005f52cc, (uVar3 - 0x7b) >>> 0);
    heap.setU32(0x005f52ec, (uVar3 - 0x7e) >>> 0);
    heap.setU32(0x005f52ea, (uVar3 - 0x95) >>> 0);
  }
  bVar6 = ((true) & 0xff);
  uVar3 = (((regs.ecx = 0xff01, regs.eax = FUN_005e3b2b(heap), regs.ecx = 0x1, regs.eax)) & 0xffff);
  if (!bVar6) {
    heap.setU16((unaff_ESI + 0x20), ((uVar3 >>> 1) - 0xa4) & 0xffff);
    heap.setI16((unaff_ESI + 0x22), (sVar4 + -0x66) & 0xffff);
  }
  bVar6 = ((true) & 0xff);
  sVar4 = (((regs.ecx = 0xff01, regs.eax = FUN_005e3b2b(heap), regs.ecx = 0x1, regs.eax)) & 0xffff);
  if (!bVar6) {
    heap.setI16((unaff_ESI + 0x20), (sVar4 + -200) & 0xffff);
  }
  return;
}
