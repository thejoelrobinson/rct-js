// @manual — do not regenerate.
// Source: decompiled/c/4363f1.c
//
// Disassembly at 0x4363f1: rectangle iterator for terrain/clip work.
//   AX = [0x99a022] (start y)
//   CX = [0x99a026] (start x)
//   call FUN_005e5562        ; pushal/popal — preserves AX, CX
//   CX += 0x20
//   cmpw CX, [0x99a028]; jle back  ; inner loop
//   AX += 0x20
//   cmpw AX, [0x99a024]; jle back  ; outer loop
//
// FUN_005e5562 is pushal/popal-bracketed so AX/CX are preserved. The
// translator's emitted `extraout_CX = 0` froze the inner loop condition
// at `0x20 <= [0x99a028]`, which is true for any plausible map width and
// therefore made the inner loop never terminate. Rewrite as the explicit
// 2D scan the binary actually performs, plumbing CX/AX into regs.ecx /
// regs.eax so the callee sees the iteration coords.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e5562 } from "./5e5562.js";

const REGISTER_NAMES = ["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp", "esp"];

function compareWord(left, right) {
  left &= 0xffff; right &= 0xffff;
  const result = (left - right) & 0xffff;
  regs.cf = left < right ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> 15;
  regs.of = ((left ^ right) & (left ^ result)) >>> 15 & 1;
}

export function FUN_004363f1_exact(heap) {
  const saved = REGISTER_NAMES.map(name => regs[name]);
  try {
    const selection = heap.u16(0x0099a020) & 1;
    regs.cf = 0; regs.zf = selection === 0 ? 1 : 0;
    regs.sf = selection >>> 15; regs.of = 0;
    if (!selection) return regs.eax >>> 0;
    const startY = heap.u16(0x0099a022);
    const startX = heap.u16(0x0099a026);
    const endX = heap.u16(0x0099a028);
    const endY = heap.u16(0x0099a024);
    let y = startY;
    do {
      let x = startX;
      do {
        regs.eax = ((regs.eax & 0xffff0000) | y) >>> 0;
        regs.ecx = ((regs.ecx & 0xffff0000) | x) >>> 0;
        FUN_005e5562(heap);
        x = (x + 0x20) & 0xffff;
        compareWord(x, endX);
      } while ((regs.sf ^ regs.of) || regs.zf);
      y = (y + 0x20) & 0xffff;
      compareWord(y, endY);
    } while ((regs.sf ^ regs.of) || regs.zf);
    return saved[0] >>> 0;
  } finally {
    REGISTER_NAMES.forEach((name, index) => { regs[name] = saved[index]; });
  }
}

export function FUN_004363f1(heap) {
  if ((heap.u32(0x0099a020) & 1) == 0) return 1;
  const startY = heap.u16(0x0099a022);
  const startX = heap.u16(0x0099a026);
  const endX   = heap.u16(0x0099a028);
  const endY   = heap.u16(0x0099a024);
  // Safety bound: prevent runaway if map coords are bogus.
  let outerGuard = 0;
  for (let ax = startY; ((ax << 16) >> 16) <= ((endY << 16) >> 16); ax = (ax + 0x20) & 0xffff) {
    if (++outerGuard > 0x10000) break;
    let innerGuard = 0;
    for (let cx = startX; ((cx << 16) >> 16) <= ((endX << 16) >> 16); cx = (cx + 0x20) & 0xffff) {
      if (++innerGuard > 0x10000) break;
      regs.eax = (regs.eax & 0xffff0000) | ax;
      regs.ecx = (regs.ecx & 0xffff0000) | cx;
      FUN_005e5562(heap);
    }
  }
  return 1;
}
