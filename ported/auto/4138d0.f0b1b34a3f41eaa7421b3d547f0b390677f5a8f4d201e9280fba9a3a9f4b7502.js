// @manual — do not regenerate.
// Hand-port replaces auto-translation. See decompiled/c/4138d0.c.
// Source disasm: binary 0x4138d0..0x413a8f (capstone).
//
// FUN_004138d0(dst, src, len) is the CRT memmove: overlap-aware copy
// (backward when dst is inside [src, src+len)), alignment-switched
// unrolled loops, returns dst in eax. Ghidra rendered the unroll jump
// tables as ~30 `goto switchD_*` sites which the translator lowered as
// silent early-returns — so nearly every call copied 0 bytes. Callers
// copy string-table records and UI text buffers with it (e.g.
// FUN_0040d7e5's 0x104-byte string copies), so gameplay text plumbing
// was broken.
//
// TypedArray.copyWithin has exactly memmove's overlap semantics, so
// the whole function is one call. esi/edi are callee-saved by the
// binary; ecx/edx are clobbered (caller-saved) — no reg effects to
// mirror for translated callers.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004138d0(heap, param_1, param_2, param_3) {
  const dst = param_1 >>> 0, src = param_2 >>> 0, len = param_3 >>> 0;
  if (len) heap.bytes.copyWithin(dst, src, src + len);
  return dst;
}
