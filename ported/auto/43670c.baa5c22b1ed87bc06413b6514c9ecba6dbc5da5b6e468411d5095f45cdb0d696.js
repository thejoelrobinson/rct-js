// @manual — do not regenerate.
// Source: decompiled/c/43670c.c
//
// Disassembly at 0x43670c: this function does `push ecx` at entry and
// `pop ecx` at return, so caller's ECX is saved/restored. The callee
// FUN_0043657e also preserves ECX (push/pop ecx wrapping the LOOP). So
// extraout_CX after the call equals the caller's incoming CX. Ghidra
// didn't surface in_CX in the C, so the translator initialised
// extraout_CX to 0 — which makes the `extraout_CX << 7 | extraout_CX >>> 9`
// terrain-index hash always 0 (always indexing the first sprite slot).
// Fix: source extraout_CX from regs.ecx low 16 bits.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0043657e } from "./43657e.js";
export function FUN_0043670c(heap) {
  let uVar1 = 0;
  // Hand-fix: extraout_CX after FUN_0043657e is the caller's incoming
  // CX (preserved across both this function's `push ecx`/`pop ecx` and
  // the callee's own push/pop). Capture it before the call lands.
  const _inCX = regs.ecx & 0xffff;
  let extraout_CX = _inCX;
  let unaff_BL = regs.ebx & 0xff;
  let unaff_BH = (regs.ebx >>> 8) & 0xff;
  let puVar2 = 0;
  let puVar3 = 0;
  uVar1 = (((regs.eax = FUN_0043657e(heap))) & 0xffff);
  uVar1 = ((extraout_CX << 7 | extraout_CX >>> 9 | uVar1) & 0xffff);
  LOCK();
  puVar2 = ((heap.u32((0x00971ef4) + (((uVar1 >>> 5 | uVar1 << 0xb) & 0xffff)) * 4)) >>> 0);
  heap.setU32(((0x00971ef4) + (((uVar1 >>> 5 | uVar1 << 0xb) & 0xffff)) * 4), (heap.u32(0x00981ef4)) & 0xffffffff);
  UNLOCK();
  do {
    puVar3 = ((heap.u32(0x00981ef4)) >>> 0);
    heap.setU32(0x00981ef4, (puVar3) >>> 0);
    if (unaff_BL < heap.u8((((puVar2) | 0) + 2))) {
      heap.setU8((heap.i32(0x00981ef4) + 2), (unaff_BL) & 0xff);
      heap.setU8((heap.i32(0x00981ef4) + 1), (unaff_BH) & 0xff);
      heap.setU8((heap.i32(0x00981ef4) + 3), (unaff_BL) & 0xff);
      heap.setU32((heap.u32(0x00981ef4) + (1) * 4), (0) & 0xffffffff);
      while (puVar3 = ((heap.u32(0x00981ef4) + 2) >>> 0), (unaff_BH & 0x80) == 0) {
        heap.setU32(puVar3, (heap.u32(puVar2)) & 0xffffffff);
        heap.setU32((heap.u32(0x00981ef4) + (3) * 4), (heap.u32(puVar2 + (1) * 4)) & 0xffffffff);
        heap.setU8(puVar2, (0xff) & 0xff);
        puVar2 = ((puVar2 + ((2) * 4)) >>> 0);
        unaff_BH = ((heap.u8((heap.i32(0x00981ef4) + 9))) & 0xff);
        heap.setU32(0x00981ef4, (puVar3) >>> 0);
      }
      heap.setU32(0x00981ef4, (puVar3) >>> 0);
      return;
    }
    heap.setU32(puVar3, (heap.u32(puVar2)) & 0xffffffff);
    heap.setU32((puVar3 + (1) * 4), (heap.u32(puVar2 + (1) * 4)) & 0xffffffff);
    heap.setU8(puVar2, (0xff) & 0xff);
    heap.setU32(0x00981ef4, (puVar3 + ((2) * 4)) >>> 0);
    puVar2 = ((puVar2 + ((2) * 4)) >>> 0);
  } while ((heap.u8((((puVar3) | 0) + 1)) & 0x80) == 0);
  unaff_BH = ((unaff_BH | 0x80) & 0xff);
  heap.setU8((((puVar3) | 0) + 1), (heap.u8((((puVar3) | 0) + 1)) & 0x7f) & 0xff);
  LAB_00436759: heap.setU8((heap.i32(0x00981ef4) + 2), (unaff_BL) & 0xff);
  heap.setU8((heap.i32(0x00981ef4) + 1), (unaff_BH) & 0xff);
  heap.setU8((heap.i32(0x00981ef4) + 3), (unaff_BL) & 0xff);
  heap.setU32((heap.u32(0x00981ef4) + (1) * 4), (0) & 0xffffffff);
  while (puVar3 = ((heap.u32(0x00981ef4) + 2) >>> 0), (unaff_BH & 0x80) == 0) {
    heap.setU32(puVar3, (heap.u32(puVar2)) & 0xffffffff);
    heap.setU32((heap.u32(0x00981ef4) + (3) * 4), (heap.u32(puVar2 + (1) * 4)) & 0xffffffff);
    heap.setU8(puVar2, (0xff) & 0xff);
    puVar2 = ((puVar2 + ((2) * 4)) >>> 0);
    unaff_BH = ((heap.u8((heap.i32(0x00981ef4) + 9))) & 0xff);
    heap.setU32(0x00981ef4, (puVar3) >>> 0);
  }
  heap.setU32(0x00981ef4, (puVar3) >>> 0);
  return;
}
