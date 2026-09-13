// @manual — do not regenerate.
// Source: decompiled/c/444d07.c — `short sVar1 = DAT_0087c3a0-300+_DAT_0087c3a6;
// if (sVar1 < 0) sVar1 = 0; return sVar1;`. FIX (ADDENDUM 34): the translator masked
// sVar1 with `& 0xffff`, making it UNSIGNED (0..0xffff) so `if (sVar1 < 0)` could
// never fire — the negative-clamp was dead and the fn returned e.g. -300 (0xfed4)
// instead of 0. sVar1 is a signed `short`: keep it signed (`<<16>>16`) so the clamp
// works. (Found by tools/bulk-diff-test.js: mismatch ported=0xfed4 vs interp=0x0.)
// Same translator-bug class as 0x5e53ca (a signed `short` must not be `& 0xffff`-masked).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00444d07(heap) {
  // (u32 reads are harmless here — the low 16 bits of the sum, isolated by <<16>>16,
  // depend only on the low 16 of each addend; carries propagate up, not down.)
  let sVar1 = (((heap.u32(0x0087c3a0) + -300 + heap.u32(0x0087c3a6)) << 16) >> 16);
  if (sVar1 < 0) {
    sVar1 = 0;
  }
  return sVar1 & 0xffff;
}
