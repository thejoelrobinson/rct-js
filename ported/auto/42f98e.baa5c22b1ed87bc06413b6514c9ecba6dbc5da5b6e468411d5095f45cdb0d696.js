// @manual — do not regenerate.
// Source: decompiled/c/42f98e.c
//
// RLE decompress loop. The x86 implementation is a `rep`-style `loop`
// (decrement ECX, jump while non-zero) over the caller-set ECX byte count,
// reading one decompressed byte at a time from FUN_0042f999 and storing
// it at ESI++ (caller-set ESI).
//
// The auto-translator emitted `while (extraout_ECX != 1)` for the loop
// terminator — but `extraout_ECX` is a Ghidra "output ECX register" that
// our translator initializes to 0 and never reassigns, so the loop never
// terminates (infinite hang during scenario load).
//
// Hand-port: explicit ECX countdown over caller-set regs.ecx. Also use
// setU8 (1-byte store) instead of the translator's setU32 (4-byte store
// at a 1-byte stride — relied on overlapping writes for correctness and
// trailed 3 zero bytes past the destination).

import { regs } from "../../runtime/regs.js";
import { FUN_0042f999 } from "./42f999.js";

export function FUN_0042f98e(heap) {
  let ecx = regs.ecx >>> 0;
  let esi = regs.esi >>> 0;
  if (ecx === 0) return;
  do {
    const byte = FUN_0042f999(heap) & 0xff;
    heap.setU8(esi, byte);
    esi = (esi + 1) >>> 0;
    ecx = (ecx - 1) >>> 0;
  } while (ecx !== 0);
  regs.esi = esi;
  regs.ecx = 0;
}
