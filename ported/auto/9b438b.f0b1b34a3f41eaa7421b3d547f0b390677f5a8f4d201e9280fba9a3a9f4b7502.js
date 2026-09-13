// @manual — do not regenerate.
//
// CAPTURE WRAPPER for the sprite-blit dispatcher FUN_009b438b. The real
// implementation lives in ./9b438b_impl.js; this file only records each call's
// entry state before delegating, so tools/_beta2-isolate.js can replay any
// single blit through JS and through the x86 interpreter from identical state
// and byte-diff the two sprite outputs.
//
// Why it exists (ADDENDUM 103/105): the playable accuracy gate localised a
// 9600-px divergence (y=104..133, x=0..319 — the binary paints water there, we
// leave background) to exactly one function, 9b4911, reached through this
// dispatcher. Whole-frame diffing cannot say WHICH sprite or WHICH run inside
// that decoder is wrong; the isolation oracle can. The oracle has always
// documented that it "requires the capture wrapper in ported/auto/9b438b.js
// (delegating to 9b438b_impl.js)", but that wrapper was never in the tree, so
// the tool could not run at all.
//
// Contract expected by tools/_beta2-isolate.js:
//   globalThis.__capAll     — when true, record one entry per call
//   globalThis.__capRegs    — [[eax,ebx,ecx,edx,esi,edi,ebp], ...]
//   globalThis.__capScratch — snapshot of the blit parameter block
//                             [0x9a2000, 0x9ab000) as-of BEFORE each call
//   globalThis.__capDpi     — [[edi, bytes at edi], ...]; EDI is the DPI struct
//                             pointer at dispatcher entry (16 bytes)
// The oracle's restoreState(n) replays those to reproduce call n exactly.
//
// Overhead when __capAll is false is one property read per blit, so this is
// safe to leave installed; the gates below were re-run to confirm it.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_009b438b as _impl } from "./9b438b_impl.js";

const SCRATCH_LO = 0x009a2000;
const SCRATCH_HI = 0x009ab000;   // must match SLO/SLEN in tools/_beta2-isolate.js
const DPI_LEN = 16;              // RCT DPI struct: bytes, x, y, w, h, pitch, zoom

export function FUN_009b438b(heap) {
  if (globalThis.__capAll) {
    try {
      const b = heap.bytes;
      (globalThis.__capRegs ||= []).push([
        regs.eax >>> 0, regs.ebx >>> 0, regs.ecx >>> 0, regs.edx >>> 0,
        regs.esi >>> 0, regs.edi >>> 0, regs.ebp >>> 0,
      ]);
      (globalThis.__capScratch ||= []).push(b.slice(SCRATCH_LO, SCRATCH_HI));
      const edi = regs.edi >>> 0;
      const end = Math.min(edi + DPI_LEN, b.length);
      (globalThis.__capDpi ||= []).push([edi, b.slice(edi, end)]);
    } catch (_) { /* capture must never perturb the render */ }
  }
  return _impl(heap);
}
