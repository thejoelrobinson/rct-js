// @manual — do not regenerate.
// Source: decompiled/c/5e1210.c
//
// Translator bug: Ghidra's `(&DAT_0099ad63)[i]` is a char-array subscript
// (compared against `'\0'`), but the translator widened it to u32 with
// `(...)*4` scaling. With u32 reads, the inner `do {} while (DAT[i] != 0)`
// loop reads stale memory and never terminates — caught by the runaway-ops
// budget in tools/native-tick-probe.js. Hand-port restores the byte stride.
//
// FUN_005e1210 is called via FUN_005e1653 from FUN_004385d8 right after the
// LAB_0043896a block; it scans a tile-occupancy bitmap (DAT_0099ad63), one
// byte per cell, and clears occupied runs.

import { regs } from "../../runtime/regs.js";
import { FUN_005e12eb } from "./5e12eb.js";

export function FUN_005e1210(heap) {
  let uVar1 = 0;  // outer column index (byte units)
  let uVar2 = 0;
  let uVar3 = 0;  // outer row * stride
  let uVar4 = 0;
  let uVar5 = 0;  // outer row index
  let uVar6 = 0;

  const stride = heap.u32(0x00971ee6) >>> 0;  // byte stride (cells per row)
  const rows   = heap.u32(0x00971eea) >>> 0;  // row count

  // Defensive: if stride is 0, the inner-loop progression `uVar3 += stride`
  // never moves and the outer loop spins forever. Treat as no-op.
  if (stride === 0 || rows === 0) return;

  do {
    uVar2 = uVar5 >>> 0;
    uVar6 = uVar3 >>> 0;
    if (heap.u8(0x0099ad63 + ((uVar1 + uVar3) >>> 0)) !== 0) {
      // Walk forward in the row until we hit a 0 byte or the row ends.
      do {
        uVar6 = (uVar6 + stride) >>> 0;
        if (rows <= uVar2 + 1) break;
        uVar2 = (uVar2 + 1) >>> 0;
      } while (heap.u8(0x0099ad63 + ((uVar1 + uVar6) >>> 0)) !== 0);
      uVar6 = (uVar6 - stride) >>> 0;
      uVar2 = uVar1 >>> 0;
      uVar4 = uVar3 >>> 0;
      // Clear the rectangle of occupied cells.
      do {
        do {
          heap.setU8(0x0099ad63 + ((uVar2 + uVar4) >>> 0), 0);
          uVar2 = (uVar2 + 1) >>> 0;
        } while (uVar2 <= uVar1);
        uVar4 = (uVar4 + stride) >>> 0;
        uVar2 = uVar1 >>> 0;
      } while (uVar4 <= uVar6);
      // The cosmetic-flicker check uses signed-short arithmetic on uVar1/uVar5.
      const xPx = (((uVar1 << 16) >> 16) * heap.u32(0x00971ee2)) & 0xffff;
      const yPx = (((uVar5 << 16) >> 16) * heap.u32(0x00971ee4)) & 0xffff;
      if (xPx < heap.u32(0x00971eda) && yPx < heap.u32(0x00971edc)) {
        regs.eax = FUN_005e12eb(heap);
      }
    }
    uVar5 = (uVar5 + 1) >>> 0;
    uVar3 = (uVar3 + stride) >>> 0;
    if (rows <= uVar5) {
      uVar5 = 0;
      uVar3 = 0;
      uVar1 = (uVar1 + 1) >>> 0;
      if (stride <= uVar1) return;
    }
  } while (true);
}
