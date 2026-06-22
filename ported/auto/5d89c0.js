// @manual — do not regenerate.
// Peep/vehicle animation-update chain walk. ported/auto/5d89c0.js was a parse-fail
// THROW stub (the translator could not handle decompiled/c/5d89c0.c — a do/while(true)
// chain loop with two cross-branch gotos). Hand-ported from the C (complete + readable)
// and validated with tools/_invoke-diff.mjs (targeted-invocation oracle, ADD.39) against
// the interpreter from a live-sprite entry (esi=0x700ac8): the chain-walk + common anim
// branches MATCH (memMis=0, exit regs match). The cold ride-state branch (DAT_887422 /
// FUN_004518fc) is transcribed faithfully but is not exercised by the default entry.
//
// Register I/O: esi = entity ptr (walked via [esi+0x3e]); reads eax/edx/edi/ebx at entry;
// returns the live eax (the asm leaves whatever the last FUN_005e53ca left, not a fixed
// value — Ghidra's `return in_EAX` is a mis-model). The two gotos are structured as a
// `doA4F` flag (else-branch re-enters the LAB_005d8a4f body) and a `skip` flag (the
// before>0xeb early exit to LAB_005d8b29).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e53ca } from "./5e53ca.js";
import { FUN_004518fc } from "./4518fc.js";

export function FUN_005d89c0(heap) {
  let in_EDX = regs.edx >>> 0;
  const unaff_EDI = regs.edi >>> 0;
  const unaff_EBX = regs.ebx >>> 0;
  let esi = regs.esi >>> 0;
  let iVar5 = 0;
  while (true) {
    heap.setU16((esi + 0x4c) >>> 0, 0);
    heap.setU16((esi + 0x4e) >>> 0, 0);
    heap.setU8((esi + 0x4a) >>> 0, 0);
    let bVar3 = heap.u8((esi + 0x31) >>> 0);
    let doA4F = false;

    if ((heap.u16((0x005f7104 + bVar3 * 8) >>> 0) & 4) === 0) {
      doA4F = true;                                  // fall straight into LAB_005d8a4f
    } else {
      // state-flag bit 2 set: clamp/decay the [esi+0xb6] velocity word
      let v = heap.i16((esi + 0xb6) >>> 0);
      let uVar4 = (v < 0 ? -v : v) & 0xffff;         // (short)<0 ? -uVar4
      bVar3 = uVar4 & 0xff;                           // bVar3 = (byte)uVar4 — carried into LAB_005d8a4f
      if (uVar4 < 0x1f5 && (heap.u8((esi + 0xba) >>> 0) & 0x30) === 0) {
        heap.setU16((esi + 0xb6) >>> 0, 0);
        doA4F = true;                                // goto LAB_005d8a4f
      } else {
        iVar5++;
        v = heap.i16((esi + 0xb6) >>> 0);
        uVar4 = (v < 0 ? -v : v) & 0xffff;
        if (uVar4 < 400) heap.setU16((esi + 0xb6) >>> 0, 400);
        // esi[0xba] += (char)((u16)[esi+0xb6] >> 8)   — LOGICAL shift, signed-byte add
        const hb = heap.u16((esi + 0xb6) >>> 0) >>> 8;
        heap.setU8((esi + 0xba) >>> 0, (heap.u8((esi + 0xba) >>> 0) + ((hb << 24) >> 24)) & 0xff);
        // [esi+0xb6] -= ([esi+0xb6] >> 8)             — ARITHMETIC shift (signed short)
        const sv = heap.i16((esi + 0xb6) >>> 0);
        heap.setI16((esi + 0xb6) >>> 0, (sv - (sv >> 8)) & 0xffff);
        regs.eax = FUN_005e53ca(heap);
        in_EDX = regs.edx >>> 0;
      }
    }

    if (doA4F) {
      // LAB_005d8a4f
      if (bVar3 === 0x22 && heap.u8((esi + 0xc5) >>> 0) !== 0) {
        const uVar4 = heap.u16((esi + 0xc8) >>> 0);
        heap.setU16((esi + 0xc8) >>> 0, (uVar4 + 0x3333) & 0xffff);
        if (uVar4 > 0xcccc) {
          heap.setU8((esi + 0xc5) >>> 0, (heap.u8((esi + 0xc5) >>> 0) + 1) & 7);
          regs.eax = FUN_005e53ca(heap);
          in_EDX = regs.edx >>> 0;
        }
        iVar5++;
      } else {
        const uVar6 = heap.u8((esi + 0x30) >>> 0);
        const iVar7 = uVar6 * 0x260;
        const ds = heap.u8((0x0088755c + iVar7) >>> 0);
        let skip = false;
        if ((heap.u16((esi + 0x48) >>> 0) & 0x100) === 0 ||
            heap.u8((esi + 0xb5) >>> 0) === 0xff ||
            (ds !== 1 && ds !== 3)) {
          const before = heap.u8((esi + 0xb5) >>> 0);
          heap.setU8((esi + 0xb5) >>> 0, (before + 0x14) & 0xff);
          if (before > 0xeb) {
            heap.setU8((esi + 0xb5) >>> 0, 0xff);
            skip = true;                             // goto LAB_005d8b29
          }
        } else if ((heap.u8((0x00887422 + uVar6 * 0x130) >>> 0) & 0x80) === 0) {
          heap.setU8((0x00887422 + uVar6 * 0x130) >>> 0, heap.u8((0x00887422 + uVar6 * 0x130) >>> 0) | 0x80);
          regs.edx = in_EDX; regs.edi = unaff_EDI; regs.ebx = unaff_EBX;
          FUN_004518fc(heap);
          heap.setU8((0x0088751d + iVar7) >>> 0, heap.u8((0x0088751d + iVar7) >>> 0) | 0x1c);
          heap.setU8((0x0088755d + iVar7) >>> 0, 1);
          const idx561 = heap.u8((0x00887561 + iVar7) >>> 0);
          const w = heap.u16((0x0088747e + idx561 * 2 + iVar7) >>> 0);
          heap.setU8((0x00887560 + iVar7) >>> 0, heap.u8((0x00743bdf + w * 0x100) >>> 0));
          heap.setU8((0x00887563 + iVar7) >>> 0, heap.u8((0x0088755c + iVar7) >>> 0));
        }
        if (!skip) {
          regs.eax = FUN_005e53ca(heap);
          iVar5++;
          in_EDX = regs.edx >>> 0;
        }
      }
    }

    // LAB_005d8b29
    if (heap.i16((esi + 0x3e) >>> 0) === -1) return regs.eax >>> 0;
    esi = (0x00743b94 + heap.u16((esi + 0x3e) >>> 0) * 0x100) >>> 0;
  }
}
