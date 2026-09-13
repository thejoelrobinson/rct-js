// @manual — do not regenerate.
// Source: decompiled/c/438aac.c
//
// Splash/intro state machine. DAT_00628cb9 is the splash phase byte:
//   1..7 = playing intro, 0 = main game, -2 (0xFE) = end-of-intro sentinel.
// Auto-translator emitted three serious bugs that prevented the C semantics:
//
//   1. case '\a' (i.e. 0x07) was lowered to `case NaN:` — JS string-escape
//      rule — so case 7 fell through to default. Hand-port uses `case 7`.
//
//   2. `(int)DAT_00628cb4` comparisons were emitted with `>>> 0` (unsigned)
//      reads, so DAT_00628cb4 = 0xfffffdbc (signed -580) would compare as
//      ~4.29B and trip the `0x1df < ...` check immediately. The C source
//      explicitly casts to int, so we read signed-32.
//
//   3. The -2 sentinel check `if (DAT_00628cb9 == -2)` compared u8() (0..255)
//      against literal -2, so the byte 0xFE (254) never matched. We compare
//      against 0xFE so the end-of-intro cleanup path fires correctly.
//
// All three together caused the splash to skip cases 2/3/4 in two ticks and
// fall into default for case 7, which still ended up resetting the gate to 0
// — but via a path that skipped FUN_009bb766 fade-out and FUN_009b30bc reset.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_004077b3 } from "./4077b3.js";
import { FUN_00407a41 } from "./407a41.js";
import { FUN_00407c42 } from "./407c42.js";
import { FUN_004270f2 } from "./4270f2.js";
import { FUN_005e6028 } from "./5e6028.js";
import { FUN_009b30bc } from "./9b30bc.js";
import { FUN_009b438b } from "./9b438b.js";
import { FUN_009bb717 } from "./9bb717.js";
import { FUN_009bb766 } from "./9bb766.js";

// Read DAT_00628cb4 as signed int32 — Ghidra C source uses `(int)` cast.
function s32(heap, addr) {
  return heap.u32(addr) | 0;
}

export function FUN_00438aac(heap) {
  let iVar1 = 0;
  let bVar2 = 0;
  heap.setU32(0x005e9154, (1) >>> 0);
  // -2 sentinel: byte 0xFE (the C source compares signed char == -2).
  if (heap.u8(0x00628cb9) === 0xFE) {
    (regs.eax = FUN_009b30bc(heap));
    (regs.eax = FUN_009bb766(heap));
    if (heap.u8(0x00628cba) == 1) {
      (regs.eax = FUN_00407a41(heap, 0x00628cbc));
      heap.setU8(0x00628cba, 0);
    }
    // 0xFE + 1 = 0xFF (i.e. -1). Next tick falls into the default arm below.
    heap.setU8(0x00628cb9, (heap.u8(0x00628cb9) + 1) & 0xff);
    heap.setU32(0x00628cb4, 0);
  } else {
    switch (heap.u8(0x00628cb9)) {
      case 0:
        break;
      case 1:
        (regs.eax = FUN_009b30bc(heap));
        (regs.eax = FUN_009bb766(heap));
        heap.setU32(0x00628cb4, (0xfffffdbc) >>> 0);
        heap.setU8(0x00628cba, 0);
        if ((((heap.u32(0x006323f4) | 0) != -1) && (iVar1 = (((regs.eax = FUN_004077b3(heap, 0, 0x00628cbc, 0, 1))) >>> 0), iVar1 != 0)) && (iVar1 = (((regs.eax = FUN_00407c42(heap, 0x00628cbc, 1, 0, 0, 0))) >>> 0), iVar1 != 0)) {
          heap.setU8(0x00628cba, 1);
        }
        heap.setU8(0x00628cb9, (heap.u8(0x00628cb9) + 1) & 0xff);
        break;
      case 2:
        heap.setU32(0x00628cb4, (heap.u32(0x00628cb4) + 5) >>> 0);
        (regs.eax = FUN_009b30bc(heap));
        (regs.eax = FUN_009b438b(heap));
        (regs.eax = FUN_009b438b(heap));
        (regs.eax = FUN_009b438b(heap));
        (regs.eax = FUN_009b438b(heap));
        (regs.eax = FUN_009b438b(heap));
        if (0x1df < s32(heap, 0x00628cb4)) {
          (regs.eax = FUN_009b30bc(heap));
          (regs.eax = FUN_009bb766(heap));
          heap.setU32(0x00628cb4, (0xffffff8c) >>> 0);
          heap.setU8(0x00628cb9, (heap.u8(0x00628cb9) + 1) & 0xff);
        }
        break;
      case 3:
        heap.setU32(0x00628cb4, (heap.u32(0x00628cb4) + 5) >>> 0);
        (regs.eax = FUN_009b30bc(heap));
        (regs.eax = FUN_009b438b(heap));
        (regs.eax = FUN_009b438b(heap));
        (regs.eax = FUN_009b438b(heap));
        if (0x1df < s32(heap, 0x00628cb4)) {
          (regs.eax = FUN_009b30bc(heap));
          (regs.eax = FUN_009bb766(heap));
          heap.setU32(0x00628cb4, (0xffffff8c) >>> 0);
          heap.setU8(0x00628cb9, (heap.u8(0x00628cb9) + 1) & 0xff);
        }
        break;
      case 4:
        heap.setU32(0x00628cb4, (heap.u32(0x00628cb4) + 5) >>> 0);
        (regs.eax = FUN_009b30bc(heap));
        (regs.eax = FUN_009b438b(heap));
        (regs.eax = FUN_009b438b(heap));
        if (heap.u32(0x00628cb4) == 0x103) {
          if (heap.u8(0x00628cba) == 1) {
            (regs.eax = FUN_00407a41(heap, 0x00628cbc));
            heap.setU8(0x00628cba, 0);
          }
          if ((((heap.u32(0x006323f4) | 0) != -1) && (iVar1 = (((regs.eax = FUN_004077b3(heap, 1, 0x00628cbc, 1, 1))) >>> 0), iVar1 != 0)) && (iVar1 = (((regs.eax = FUN_00407c42(heap, 0x00628cbc, 1, 0xfffffce0, 0, 15000))) >>> 0), iVar1 != 0)) {
            heap.setU8(0x00628cba, 1);
          }
        }
        if (0x2a7 < s32(heap, 0x00628cb4)) {
          (regs.eax = FUN_009b30bc(heap));
          (regs.eax = FUN_009b438b(heap));
          (regs.eax = FUN_009b438b(heap));
          (regs.eax = FUN_009b438b(heap));
          (regs.eax = FUN_009b438b(heap));
          (regs.eax = FUN_009b438b(heap));
          (regs.eax = FUN_009b438b(heap));
          (regs.eax = FUN_009bb766(heap));
          if (heap.u8(0x00628cba) == 1) {
            (regs.eax = FUN_00407a41(heap, 0x00628cbc));
            heap.setU8(0x00628cba, 0);
          }
          if ((((heap.u32(0x006323f4) | 0) != -1) && (iVar1 = (((regs.eax = FUN_004077b3(heap, 10, 0x00628cbc, 0, 1))) >>> 0), iVar1 != 0)) && (iVar1 = (((regs.eax = FUN_00407c42(heap, 0x00628cbc, 0, 0, 0, 0))) >>> 0), iVar1 != 0)) {
            heap.setU8(0x00628cba, 1);
          }
          heap.setU8(0x00628cb9, (heap.u8(0x00628cb9) + 1) & 0xff);
          heap.setU32(0x00628cb4, 0);
        }
        break;
      case 5:
        heap.setU32(0x00628cb4, (heap.u32(0x00628cb4) + 0x400) >>> 0);
        if (heap.u32(0x00628cb4) < 0xff01) {
          (regs.eax = FUN_009bb766(heap));
        } else {
          (regs.eax = FUN_009bb766(heap));
          heap.setU8(0x00628cb9, (heap.u8(0x00628cb9) + 1) & 0xff);
          heap.setU32(0x00628cb4, 0);
        }
        break;
      case 6:
        heap.setU32(0x00628cb4, (heap.u32(0x00628cb4) + 1) >>> 0);
        if (0x4f < heap.u32(0x00628cb4)) {
          heap.setU8(0x00628cb9, (heap.u8(0x00628cb9) + 1) & 0xff);
          heap.setU32(0x00628cb4, (0xff00) >>> 0);
        }
        break;
      case 7:
        // Fade-out: decrement counter by 0x400 from 0xff00. When < 0x400, set
        // gate to 0xFE (-2 sentinel) — next tick triggers end-of-intro cleanup.
        bVar2 = (heap.u32(0x00628cb4) < 0x400) ? 1 : 0;
        heap.setU32(0x00628cb4, (heap.u32(0x00628cb4) - 0x400) >>> 0);
        if (bVar2) {
          (regs.eax = FUN_009bb766(heap));
          heap.setU8(0x00628cb9, 0xFE);
        } else {
          (regs.eax = FUN_009bb766(heap));
        }
        break;
      default:
        // Reached when DAT_00628cb9 = 0xFF (after -2 sentinel increment) or any
        // out-of-range value — final cleanup, opens the render gate.
        heap.setU8(0x00628cb9, 0);
        (regs.eax = FUN_009bb717(heap));
        heap.setU32(0x005e9154, 0);
        (regs.eax = FUN_005e6028(heap));
    }
  }
  return (regs.eax = 0x1, regs.eax = FUN_004270f2(heap));
}
