// @manual — do not regenerate.
// Source: hand-disassembled from binary/rct.exe @ 0x433e1c..0x433f1f.
//
// FUN_00433e1c — the sprite-blit consumer that walks the z-sorted paint chain
// produced by FUN_00433bae and dispatches each slot to FUN_009b438b (the
// sprite blitter dispatcher).
//
// The translator's auto-output used iVar1/iVar2 to walk the chain but lost
// all of the register setup that the binary does *inside each iteration*:
//   cx  = slot[0x10]  (x coord)
//   dx  = slot[0x12]  (y coord)
//   ebx = slot[0x00]  (sprite handle)
//   edi = [0x981ef8]  (viewport context — loaded once at entry, carried through)
// It also dropped the two "mask" branches that tweak EBX based on
// [0x991f8c]'s flag bits and the slot's type byte at +0x24.
//
// Without those, FUN_009b438b received stale (zero) registers and silently
// no-op'd on every slot — the back buffer stayed as just the sky-color base
// fill from FUN_009b30f1, with no terrain on top.
//
// Two interleaved walks:
//   • Main outer: ebp = [0x5f96e4]; for each ebp = [ebp+0x20], walk an
//     inner chain via [ebp+0x1c]. Call 9b438b once per slot.
//   • Secondary: when the inner chain hits null, check the last inner
//     slot's [+0x18] for a "child" list chained via [child+0x08]. Each
//     child's local coords (+0x04 / +0x06) are ADDED to the last inner
//     slot's screen coords.
//
// Both walks apply the same mask logic before calling 9b438b. When global
// flag word [0x991f8c] has bit 1 set AND slot[0x24] == 3 AND EBX's
// 0x40000000 bit is clear → rewrite EBX as (ebx & 0x0001ffff) | 0x40540000.
// Same for bit 2 + slot[0x24] in {5,9,10} (main) or == 5 (secondary).
// These are the construction-overlay and edge-highlight rendering modes.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_009b438b } from "./9b438b.js";

export function FUN_00433e1c(heap) {
  if (typeof globalThis._renderTrace === "function") globalThis._renderTrace("FUN_00433e1c");

  // EDI = viewport context pointer (unaff_EDI in 9b438b). Set once.
  regs.edi = heap.u32(0x00981ef8) >>> 0;

  let outer = heap.u32(0x005f96e4) >>> 0;
  while (true) {
    outer = heap.u32(outer + 0x20) >>> 0;
    if (outer === 0) return;

    // --- inner chain via [slot+0x1c] ---
    let slot = outer;
    while (true) {
      const flag = heap.u16(0x00991f8c);
      const f24 = heap.u8(slot + 0x24);
      let ebx = heap.u32(slot + 0x00) >>> 0;
      // mask 1
      if ((flag & 2) && f24 === 3 && (ebx & 0x40000000) === 0) {
        ebx = ((ebx & 0x0001ffff) | 0x40540000) >>> 0;
      }
      // mask 2 (main: f24 in {5,9,10})
      if ((flag & 4) && (f24 === 5 || f24 === 9 || f24 === 10) && (ebx & 0x40000000) === 0) {
        ebx = ((ebx & 0x0001ffff) | 0x40540000) >>> 0;
      }
      regs.ebp = slot >>> 0;
      regs.ebx = ebx;
      regs.ecx = heap.u16(slot + 0x10);
      regs.edx = heap.u16(slot + 0x12);
      regs.eax = FUN_009b438b(heap);

      const next = heap.u32(slot + 0x1c) >>> 0;
      if (next === 0) break;
      slot = next;
    }

    // --- secondary chain via [last_inner+0x18], walked via [child+0x08] ---
    // slot is now the last inner slot. Mask reads ITS f24, not the child's.
    const lastInner = slot;
    let child = heap.u32(lastInner + 0x18) >>> 0;
    while (child !== 0) {
      const flag = heap.u16(0x00991f8c);
      const f24 = heap.u8(lastInner + 0x24);
      let ebx = heap.u32(child + 0x00) >>> 0;
      // mask 1 (same as main)
      if ((flag & 2) && f24 === 3 && (ebx & 0x40000000) === 0) {
        ebx = ((ebx & 0x0001ffff) | 0x40540000) >>> 0;
      }
      // secondary mask 2: ONLY f24 == 5 (not {5,9,10})
      if ((flag & 4) && f24 === 5 && (ebx & 0x40000000) === 0) {
        ebx = ((ebx & 0x0001ffff) | 0x40540000) >>> 0;
      }
      regs.ebp = lastInner >>> 0;
      regs.ebx = ebx;
      regs.ecx = (heap.u16(lastInner + 0x10) + heap.u16(child + 0x04)) & 0xffff;
      regs.edx = (heap.u16(lastInner + 0x12) + heap.u16(child + 0x06)) & 0xffff;
      regs.eax = FUN_009b438b(heap);

      child = heap.u32(child + 0x08) >>> 0;
    }
  }
}
