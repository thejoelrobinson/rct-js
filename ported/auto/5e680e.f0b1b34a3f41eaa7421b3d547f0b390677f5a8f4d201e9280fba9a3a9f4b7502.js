// @manual — do not regenerate.
// Source: decompiled/c/5e680e.c
//
// Disassembly at 0x5e687d shows FUN_005e687d is pushal/popal-bracketed
// (5e6887/5e68e0). All registers preserved, so extraout_DX == in_DX
// (caller's incoming DX). Translator-emitted `extraout_DX = 0` zeroed
// the in_DX reload after the call, corrupting the DX value written to
// 0x991f5c. Source extraout_DX from in_DX.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { selectToolExact, runSelectionEntry } from "./extra_ui_selection.js";
import { FUN_005e687d } from "./5e687d.js";
export function FUN_005e680e(heap) {
  if (globalThis.__realStartup || state.executionMode === "pure-js") return runSelectionEntry(heap, 0x5e680e, selectToolExact);
  let in_AL = regs.eax & 0xff;
  let uVar1 = 0;
  let in_DX = regs.edx & 0xffff;
  let extraout_DX = in_DX;
  let unaff_ESI = regs.esi >>> 0;
  if ((heap.u32(0x00991f30) >>> 3 & 1) != 0) {
    if (((heap.i8((unaff_ESI + 0x174)) == heap.u8(0x00991f5a)) && (heap.i16((unaff_ESI + 0x30)) == heap.u8(0x00991f58))) && (in_DX == heap.u8(0x00991f5c))) {
      uVar1 = (((regs.eax = FUN_005e687d(heap))) & 0xffff);
      return uVar1;
    }
    in_AL = (((regs.eax = FUN_005e687d(heap))) & 0xff);
    in_DX = ((extraout_DX) & 0xffff);
  }
  heap.setU32(0x00991f30, (heap.u32(0x00991f30) & 0xffffffbf | 8) >>> 0);
  heap.setU8(0x00991f5b, (in_AL) & 0xff);
  heap.setU8(0x00991f5c, (in_DX) & 0xff);
  heap.setU8(0x00991f5a, (heap.u8((unaff_ESI + 0x174))) & 0xff);
  heap.setU8(0x00991f58, (heap.u16((unaff_ESI + 0x30))) & 0xff);
  return heap.u16((unaff_ESI + 0x30));
}
