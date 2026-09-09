// @manual — do not regenerate.
// Source: decompiled/c/5e412c.c
//
// Same widget-resize pattern as 5e40c4: per widget, call [esi+4] (the
// handler), then store CX into [esi+0x38] and DX into [esi+0x40]. Ghidra
// captures these as extraout_CX / extraout_DX; translator emits zeros.
// Read regs.ecx / regs.edx after the callIndirect.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e4198, FUN_005e4198_exact } from "./5e4198.js";
import { FUN_00430326 } from "./430326.js";
import { compare, logic, word, resumeUiNative } from "./extra_ui_state.js";

function invokeScrollEvent(heap, address) {
  if (address === 0x430326) return FUN_00430326(heap);
  return resumeUiNative(heap, address);
}

export function FUN_005e412c_exact(heap, invoke = invokeScrollEvent) {
  const names = ["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp", "esp"];
  const saved = names.map(name => regs[name]);
  try {
    regs.edi = heap.u32(regs.esi + 0x1c);
    regs.eax = regs.ebx = 0;
    logic(0, 32);
    while (true) {
      compare(heap.u8(regs.edi), 0x15, 8);
      if (regs.zf) return;
      compare(heap.u8(regs.edi), 0x11, 8);
      if (regs.zf) {
        heap.setU16(regs.ebx + regs.esi + 0x34, 0);
        const local = [regs.eax, regs.ebx, regs.edi];
        word("ebp", 12);
        try { invoke(heap, heap.u32(regs.esi + 4)); }
        finally { [regs.eax, regs.ebx, regs.edi] = local; }
        const scroll = (regs.ebx + regs.esi + 0x34) >>> 0;
        heap.setU16(scroll + 2, 0);
        heap.setU16(scroll + 4, regs.ecx);
        heap.setU16(scroll + 10, 0);
        heap.setU16(scroll + 12, regs.edx);
        const options = heap.u32(regs.edi + 10);
        if (options & 1) heap.setU16(scroll, heap.u16(scroll) | 1);
        if (options & 2) heap.setU16(scroll, heap.u16(scroll) | 0x10);
        FUN_005e4198_exact(heap);
        regs.eax = (regs.eax + 1) >>> 0;
        regs.ebx = (regs.ebx + 18) >>> 0;
      }
      regs.edi = (regs.edi + 16) >>> 0;
    }
  } finally { names.forEach((name, index) => { regs[name] = saved[index]; }); }
}

export function FUN_005e412c(heap) {
  let puVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let iVar2 = 0;
  let extraout_CX = 0;
  let extraout_DX = 0;
  let in_EDX = regs.edx >>> 0;
  let iVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pcVar4 = 0;
  iVar2 = ((0) >>> 0);
  iVar3 = ((0) >>> 0);
  for (pcVar4 = ((heap.u32((unaff_ESI + 0x1c))) >>> 0); heap.i8(pcVar4) != 21; pcVar4 = (((pcVar4 + 0x10) >>> 0)) >>> 0) {
    if (heap.i8(pcVar4) == 17) {
      heap.setU16((iVar3 + 0x34 + unaff_ESI), (0) & 0xffff);
      (regs.eax = callIndirect(heap, heap.u32((unaff_ESI + 4)), pcVar4, iVar3, iVar2));
      // Hand-fix: widget handler reports its laid-out (x,y) in CX,DX. Read
      // from regs so the stored offsets reflect the actual placement.
      extraout_CX = regs.ecx & 0xffff;
      extraout_DX = regs.edx & 0xffff;
      heap.setU16((iVar3 + 0x36 + unaff_ESI), (0) & 0xffff);
      heap.setU16((iVar3 + 0x38 + unaff_ESI), (extraout_CX) & 0xffff);
      heap.setU16((iVar3 + 0x3e + unaff_ESI), (0) & 0xffff);
      heap.setU16((iVar3 + 0x40 + unaff_ESI), (extraout_DX) & 0xffff);
      if ((heap.u32((pcVar4 + 10)) & 1) != 0) {
        puVar1 = (((iVar3 + 0x34 + unaff_ESI)) >>> 0);
        heap.setU32(puVar1, (heap.u16(puVar1) | 1) & 0xffffffff);
      }
      if ((heap.u32((pcVar4 + 10)) & 2) != 0) {
        puVar1 = (((iVar3 + 0x34 + unaff_ESI)) >>> 0);
        heap.setU32(puVar1, (heap.u16(puVar1) | 0x10) & 0xffffffff);
      }
      iVar2 = (((regs.edi = 0x5f8160, regs.eax = FUN_005e4198(heap))) >>> 0);
      iVar2 = ((iVar2 + 1) >>> 0);
      iVar3 = ((iVar3 + 0x12) >>> 0);
    }
  }
  return 1;
}
