// @manual — do not regenerate.
// Source: decompiled/c/5e1210.c — TRANSCRIBED FROM THE BINARY (0x5e1210..0x5e12ea).
//
// FUN_005e1210 is the dirty-block iterator at the head of the binary's real
// per-frame paint dispatcher (4385d8 -> 5e1653 -> HERE -> 5e12eb -> 5e13d2).
// 0x99ad63 is a grid of one byte per screen block, [0x971ee6] columns wide by
// [0x971eea] rows (10 x 60 at 640x480, blocks of [0x971ee2] x [0x971ee4] =
// 64 x 8 px). For each dirty cell it grows a vertical run, clears it, converts
// the run to a pixel rect and repaints everything under it.
//
// Two translator bugs, both of which made this a no-op paint:
//
//  1. DROPPED REGISTER ARGUMENTS (the catalogued class). 0x5e1265..0x5e12be
//     computes the pixel rect into AX/BX/DX/BP (left/top/right/bottom) and
//     calls 0x5e12eb with it in registers. Ghidra typed FUN_005e12eb as
//     `void(void)` and dropped the whole setup, so 5e12eb read a stale
//     regs.eax/ebx/edx/ebp, its window-intersection test rejected every
//     window, and 5e13d2 (the actual per-window draw) was never reached —
//     measured: 5e12eb entered 10x on the title, 5e13d2 entered 0x.
//     The clamping of the rect to [0x971eda]/[0x971edc] at 0x5e129e/0x5e12ae
//     went missing with it.
//  2. WRONG OPERAND WIDTH. The block size ([0x971ee2]/[0x971ee4]) and the
//     clip extent ([0x971eda]/[0x971edc]) are read with `imul ax, word ptr`
//     and `cmp ax, word ptr` — u16, and each sits 2 bytes from its partner,
//     so a u32 read packs both fields into one number. (The grid geometry at
//     [0x971ee6]/[0x971eea] genuinely IS dword — `add edi, dword ptr` — which
//     is why the earlier hand-fix's u32 reads there are correct and stay.)
//
// The prior hand-fix's byte-stride correction for the `(&DAT_0099ad63)[i]`
// char-array subscript (Ghidra widened it to u32 with `*4` scaling, which
// made the run-growing loop non-terminating) is preserved below.

import { regs } from "../../runtime/regs.js";
import { FUN_005e12eb } from "./5e12eb.js";

const GRID = 0x0099ad63 >>> 0;

function drawDirtyBlocks(heap) {
  const stride = heap.u32(0x00971ee6) >>> 0;   // columns (dword — 0x5e122b)
  const rows   = heap.u32(0x00971eea) >>> 0;   // rows    (dword — 0x5e1231)

  // Defensive: a zero stride makes `uVar3 += stride` stand still and the outer
  // loop spin forever. Treat as no-op.
  if (stride === 0 || rows === 0) return;

  let eax = 0;   // column index
  let ebx = 0;   // row index
  let ecx = 0;   // row * stride (byte offset of the row)

  for (;;) {
    // 0x5e1216
    if (heap.u8(GRID + ((ecx + eax) >>> 0)) !== 0) {
      // 0x5e1224: grow the dirty run downwards in this column.
      const edx = eax;
      let ebp = ebx, edi = ecx;
      do {
        ebp = (ebp + 1) >>> 0;
        edi = (edi + stride) >>> 0;
        if (ebp >= rows) break;
      } while (heap.u8(GRID + ((edi + edx) >>> 0)) !== 0);
      ebp = (ebp - 1) >>> 0;                      // 0x5e1243
      edi = (edi - stride) >>> 0;

      // 0x5e124a: clear columns eax..edx over rows ecx..edi.
      const savedEcx = ecx;
      do {
        const savedEax = eax;
        do {
          heap.setU8(GRID + ((ecx + eax) >>> 0), 0);
          eax = (eax + 1) >>> 0;
        } while (eax <= edx);
        eax = savedEax;
        ecx = (ecx + stride) >>> 0;
      } while (ecx <= edi);
      ecx = savedEcx;

      // 0x5e1265: convert the cell run to a pixel rect in AX/BX/DX/BP.
      // `imul ax, word` is a 16-bit multiply — keep everything at u16.
      const blkW = heap.u16(0x00971ee2), blkH = heap.u16(0x00971ee4);
      const maxX = heap.u16(0x00971eda), maxY = heap.u16(0x00971edc);
      const left   = (eax * blkW) & 0xffff;
      const top    = (ebx * blkH) & 0xffff;
      let   right  = (((edx + 1) & 0xffff) * blkW) & 0xffff;
      let   bottom = (((ebp + 1) & 0xffff) * blkH) & 0xffff;
      // 0x5e128c / 0x5e1295 — `jae`, i.e. unsigned.
      if (left < maxX && top < maxY) {
        if (right > maxX) right = maxX;           // 0x5e129e
        if (bottom > maxY) bottom = maxY;         // 0x5e12ae
        // 0x5e12be: call 0x5e12eb(ax=left, bx=top, dx=right, bp=bottom).
        regs.eax = (regs.eax & 0xffff0000) | left;
        regs.ebx = (regs.ebx & 0xffff0000) | top;
        regs.edx = (regs.edx & 0xffff0000) | right;
        regs.ebp = (regs.ebp & 0xffff0000) | bottom;
        FUN_005e12eb(heap);
      }
      // 0x5e12c3: pop ecx/ebx/eax — eax/ebx/ecx are untouched JS locals here.
    }
    // 0x5e12c6
    ebx = (ebx + 1) >>> 0;
    ecx = (ecx + stride) >>> 0;
    if (ebx < rows) continue;
    ebx = 0; ecx = 0;
    eax = (eax + 1) >>> 0;
    if (eax >= stride) return;                    // 0x5e12ea
  }
}


// ---------------------------------------------------------------------------
// GATE (the pattern in CLAUDE.md "when a correct fix breaks the frozen gate";
// the other live examples are extra_sim_424e0f.js and 42fdf4.js).
//
// Staging the rect is what turns the binary's real paint dispatcher from a
// no-op into the thing that draws every window, so it necessarily changes
// pixels. The frozen sc21 soak baseline (5b79d5b5 / canary 7b14266) was
// captured with the dispatcher inert — everything visible came from
// runtime/harness.js's synthetic pump instead — so the fixed version cannot be
// hash-neutral there, and the gate cannot tell "more correct" from "broken".
//
// The frozen copy below is the pre-fix body kept VERBATIM, including its own
// bugs (dropped rect, u32 reads of the u16 block geometry, and the
// `regs.eax = FUN_005e12eb(...)` that assigns undefined). It exists only to
// hold that baseline byte-for-byte; do not "tidy" it.
//
// Retire it together with a deliberate re-baseline backed by interpreter
// evidence, per the two-step rule — ideally once the UI gate ADDENDUM 138 asks
// for exists, so the frozen path stops being blind to this entire class.
export function FUN_005e1210(heap) {
  return globalThis.__realStartup ? drawDirtyBlocks(heap) : drawDirtyBlocksFrozen(heap);
}

function drawDirtyBlocksFrozen(heap) {
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
