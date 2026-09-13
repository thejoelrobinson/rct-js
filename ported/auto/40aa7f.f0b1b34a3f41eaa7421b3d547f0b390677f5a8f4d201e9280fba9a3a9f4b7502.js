// @manual — do not regenerate.
//
// Source: decompiled/c/40aa7f.c — DDraw "begin scene" wrapper.
//
// Why hand-ported: Ghidra surfaced this as `void` because the binary's
// `mov eax, X; ret` epilogue is not visible at the C level. The CALLER
// (FUN_0040264b → also 4018ec) reads EAX and treats `iVar1 == 0` as
// "skip paint", so a void return → `regs.eax = SetClipper-result(=0)`
// → caller bails and no DDraw drawing happens. Returning 1 (success)
// makes the caller proceed to invoke the actual paint operations.
//
// The function still does its real work: if a clipper is registered,
// SetClipper attaches it to either the primary surface (when there's a
// single back-buffer) or the first back-buffer of the chain.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";

export function FUN_0040aa7f(heap) {
  if (heap.u32(0x005ebf44) !== 0) {
    let surf;
    if (heap.u32(0x005f0950) === 1) {
      surf = heap.u32(0x005ebf34);                 // primary
    } else {
      surf = heap.u32(heap.u32(0x005ebf38));       // first back-buffer in chain
    }
    callIndirect(heap, heap.u32(heap.i32(surf) + 0x70), surf, heap.u32(0x005ebf44));
  }
  regs.eax = 1;
  return 1;
}
