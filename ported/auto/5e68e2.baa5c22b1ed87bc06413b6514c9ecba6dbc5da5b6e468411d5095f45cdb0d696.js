// @manual — do not regenerate.
// Source: decompiled/c/5e68e2.c
//
// Ghidra lost the CARRY-FLAG side-effect of this function. The x86 walks
// the window pool [0x9a013c .. [0x9a1164], stride 0x178) looking for the
// first window whose class byte ([slot+0x174]) is 0 (the main viewport
// window). It returns the caller's AX UNCHANGED in every case, but the
// flag it leaves differs and the caller (FUN_00429aff) branches on it:
//   - found a class-0 window  → 0x5e6902 `and ax,ax; ret` → CF = 0
//   - pool exhausted (none)   → 0x5e6900 `stc; ret`       → CF = 1
//
// FUN_00429aff does `call 5e68e2; jb 0x429b63` — it SKIPS its viewport-rect
// / max-coord setup block when CF=1 (no viewport window). The auto-translated
// port returned in_AX but never wrote regs.cf, so the caller read a stale
// carry and ran the block with the wrong AX (the viewport widget x2/y2 then
// got resolved to -1 instead of width-1/height-1, which broke the cursor
// hit-test 0x5e3874 over the viewport). Confirmed against the disassembly at
// 0x5e68e2-0x5e6905 (capstone): `and ax,ax` (0x6623c0) clears CF on the
// found path; `stc` (0xf9) sets it on the not-found path.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { FUN_005e68e2_frozen } from "./frozen_5e68e2.js";

function compare32(left, right) {
  const result = (left - right) >>> 0;
  regs.cf = (left >>> 0) < (right >>> 0) ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 31;
  regs.of = ((left ^ right) & (left ^ result)) >>> 31;
}

export function FUN_005e68e2_exact(heap) {
  regs.esi = 0x009a013c;
  const end = heap.u32(0x009a1164);
  for (;;) {
    compare32(regs.esi, end);
    if (!regs.cf) {
      regs.cf = 1;
      return regs.eax >>> 0;
    }
    const windowClass = heap.u8(regs.esi + 0x174);
    const classResult = windowClass & 0xff;
    regs.cf = 0;
    regs.zf = classResult === 0 ? 1 : 0;
    regs.sf = classResult >>> 7;
    regs.of = 0;
    if (regs.zf) {
      const ax = regs.eax & 0xffff;
      regs.cf = 0;
      regs.zf = ax === 0 ? 1 : 0;
      regs.sf = ax >>> 15;
      regs.of = 0;
      return regs.eax >>> 0;
    }
    const before = regs.esi >>> 0;
    regs.esi = (before + 0x178) >>> 0;
    regs.cf = regs.esi < before ? 1 : 0;
    regs.zf = regs.esi === 0 ? 1 : 0;
    regs.sf = regs.esi >>> 31;
    regs.of = (~(before ^ 0x178) & (before ^ regs.esi)) >>> 31;
  }
}

export function FUN_005e68e2(heap) {
  if (state.executionMode === "pure-js") return FUN_005e68e2_exact(heap);
  return FUN_005e68e2_frozen(heap);
}
