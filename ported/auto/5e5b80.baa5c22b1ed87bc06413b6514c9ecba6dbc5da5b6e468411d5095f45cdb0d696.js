// @manual — do not regenerate.
// Source: decompiled/c/5e5b80.c
//
// Disassembly at 0x5e5b80: function entry clears bit 7 of CX
// (`btrw $7, cx`), then the bit7-set loop at 5e5bb4 calls FUN_005e5bd8
// (which is pushal/popal-bracketed at 5e5bdc/5e5c34 — preserves every
// register). So extraout_CX after the call equals the pre-call CX which
// is `uVar1` (= in_CX & 0xff7f). Translator left extraout_CX as 0, which
// caused the loop to compare against 0 every iteration and skip every
// real match. Fix: set extraout_CX = uVar1.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e5bd8 } from "./5e5bd8.js";
import { compare, word, resumeUiNative } from "./extra_ui_state.js";

export function FUN_005e5b80_exact(heap, invoke = resumeUiNative) {
  const saved = regs.esi;
  const all = (regs.ecx & 0x80) !== 0;
  word("ecx", regs.ecx & ~0x80);
  regs.cf = all ? 1 : 0;
  regs.esi = 0x9a013c;
  try {
    while (true) {
      compare(regs.esi, heap.u32(0x9a1164), 32);
      if (!regs.cf) return;
      compare(regs.ecx & 255, heap.u8(regs.esi + 0x174), 8);
      if (regs.zf) {
        if (!all) compare(regs.edx & 0xffff, heap.u16(regs.esi + 0x30));
        if (all || regs.zf) {
          invoke(heap, 0x5e5bd8);
          if (!all) return;
          regs.esi = 0x9a013c;
          continue;
        }
      }
      regs.esi = (regs.esi + 0x178) >>> 0;
    }
  } finally { regs.esi = saved; }
}

export function FUN_005e5b80(heap) {
  let in_CX = regs.ecx & 0xffff;
  let uVar1 = 0;
  let extraout_CX = 0;
  let in_DX = regs.edx & 0xffff;
  let puVar2 = 0;
  puVar2 = ((0x009a013c) >>> 0);
  uVar1 = ((in_CX & 0xff7f) & 0xffff);
  if ((in_CX >>> 7 & 1) == 0) {
    for (; puVar2 < heap.u32(0x009a1164); puVar2 = (((puVar2 + 0x178) >>> 0)) >>> 0) {
      if ((((uVar1) << 24 >> 24) == heap.u8(puVar2 + (0x174))) && (in_DX == heap.i16((puVar2 + 0x30)))) {
        return (regs.eax = FUN_005e5bd8(heap));
      }
    }
  } else {
    while (puVar2 < heap.u32(0x009a1164)) {
      if (((uVar1) << 24 >> 24) == heap.u8(puVar2 + (0x174))) {
        (regs.eax = FUN_005e5bd8(heap));
        puVar2 = ((0x009a013c) >>> 0);
        // FUN_005e5bd8 is pushal/popal-bracketed: CX preserved.
        extraout_CX = uVar1 & 0xffff;
        uVar1 = ((extraout_CX) & 0xffff);
      } else {
        puVar2 = ((puVar2 + 0x178) >>> 0);
      }
    }
  }
  return;
}
