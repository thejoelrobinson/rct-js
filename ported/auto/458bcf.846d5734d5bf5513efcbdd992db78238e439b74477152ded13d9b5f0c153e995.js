// @manual — do not regenerate.
// Source: transcribed from binary/rct.exe @ 0x458bcf..0x458c0d.
//
// FUN_00458bcf — the entry point of RCT's format_string: it picks where the
// template comes from and then falls through into the format loop at 0x458c14.
//
//   EAX = string id, ECX = argument block, EDI = output buffer.
//
//   id >= 0x9000            -> `jmp [eax*4 + 0x61f2d4]`, a jumptable of special
//                              handlers Ghidra did not recover.
//   0x8000 <= id < 0x9000   -> a user-entered string: copy the 0x20-byte slot
//                              from 0x87f41c, and bump ECX by the two selector
//                              bits packed at 0x0c00.
//   id < 0x8000             -> ESI = [0x640194 + id*4], then FALL THROUGH to
//                              0x458c14, which is a separate Ghidra "function".
//
// This file was a STUB — `export function FUN_00458bcf(heap) { return; }` —
// on the reasoning that "UI string formatting is cosmetic". It is not: it is
// the source of every string the UI draws, so on the all-JS paint path every
// caption, label and readout came out empty. Verified with
// tools/_fmtoracle.mjs, which byte-compares this against the original bytes.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callNative } from "../../runtime/painter-bridge.js";
import { FUN_00458c14 } from "./458c14.js";

export function FUN_00458bcf(heap) {
  const ax = regs.eax & 0xffff;

  if (ax >= 0x9000) {
    // 0x458bdb — the unrecovered handler jumptable. Nothing is mutated yet, so
    // re-entering at the top through the real bytes is exact.
    //
    // The force flag is REQUIRED, not defensive: once 0x458bcf carries a
    // production eip hook, a bare callNative(0x458bcf) sets EIP to the hooked
    // address, re-enters this same JS body, and recurses forever. Raising
    // __forceInterp458bcf makes the hook run stepThroughNative instead, which
    // is the intended "execute the real bytes once" path (ADDENDUM 176).
    const previous = globalThis.__forceInterp458bcf;
    globalThis.__forceInterp458bcf = true;
    try { return callNative(0x00458bcf, []); }
    finally { globalThis.__forceInterp458bcf = previous; }
  }

  if (ax >= 0x8000) {
    // 0x458be2..0x458c0c — user string slot.
    let eax = (regs.eax >>> 0) - 0x8000;
    // 0x458be7 `mov edx, eax` / 0x458be9 `and edx, 0xc00` / 0x458bef `shr edx, 9`
    // — this writes the REAL EDX, leaving it in {0,2,4,6}. Keeping it in a
    // local was invisible while the function was only ever called from JS, and
    // wrong the moment it carried an eip hook: the hook writes every register
    // back to the cpu, so EDX went out as the caller's stale entry value
    // (0x0187_0170) instead of the byte the copy loop below leaves in DL.
    // That single unwritten register was the whole canary divergence
    // (ADDENDUM 176).
    regs.edx = (eax & 0xc00) >>> 9;                   // 0x458be9
    regs.ecx = (regs.ecx + (regs.edx >>> 0)) >>> 0;   // 0x458bf2
    eax = (eax & 0xfffff3ff) >>> 0;                   // 0x458bf4
    let src = (Math.imul(eax, 0x20) + 0x0087f41c) >>> 0;
    let edi = regs.edi >>> 0;
    for (;;) {                                        // 0x458c01
      const dl = heap.u8(src);
      regs.edx = ((regs.edx & 0xffffff00) | dl) >>> 0;  // `mov dl, [eax]`
      heap.setU8(edi, dl);
      src = (src + 1) >>> 0;
      edi = (edi + 1) >>> 0;
      if (dl === 0) break;
    }
    regs.edi = (edi - 1) >>> 0;                       // 0x458c0b
    // EXIT STATE (ADDENDUM 176). The binary leaves EAX as the WALKED POINTER —
    // `inc eax` runs once per byte including the terminator — not the slot
    // index. That matters far outside this branch: a nested user-string expand
    // returns here into the format loop at 0x458c14, whose `mov al, [esi]`
    // overwrites only AL, so those upper 24 bits ride all the way out to the
    // caller of the OUTERMOST format_string. Setting the slot index instead
    // was the whole of the text chain's eaxMis (js 0x0000_0300 against the
    // interpreter's 0x0088_7300).
    regs.eax = src >>> 0;
    // `or dl, dl` on the terminator is the last flag-setting instruction
    // before the ret; DL is already 0 from the loop above.
    regs.zf = 1; regs.cf = 0; regs.sf = 0; regs.of = 0;
    // NOT `return 0`: installJsFnEipHook folds a numeric return into regs.eax,
    // so returning zero here would clobber the pointer just set.
    return undefined;
  }

  // 0x458c0d — template from the string table, then fall into the format loop.
  regs.esi = heap.u32((0x00640194 + (regs.eax >>> 0) * 4) >>> 0) >>> 0;
  return FUN_00458c14(heap);
}
