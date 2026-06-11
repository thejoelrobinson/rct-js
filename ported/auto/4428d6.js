// @manual — do not regenerate.
// Source: binary 0x4428d6..0x442909 (capstone disasm); decompiled/c/4428d6.c
// is mistyped. Hand-port (2026-06-11) replacing the earlier partially-fixed
// translation, which still carried two corruptions (catalogued in
// PORTING-ROADMAP.md ADDENDUM 3):
//   - the guest-count gate `cmp word [0x87d7a0],2` was read as u32 —
//     packing the adjacent word into the compare;
//   - dropped the al=0x10/ah=0xff staging before FUN_00440fe3.
//
// Semantics: park-crowding timer. Only with >= 2 guests in the park:
// inc the per-peep counter [esi+0xf4]; when it wraps to 0xfe, rearm to
// 0xdc and queue the "it's very crowded" thought (440fe3, al=0x10
// ah=0xff) with a 0x1e happiness hit.
//
// Oracle: tools/_lockstep-statrio.mjs (whole-heap per-call compare vs
// the interpreter, interpreter result kept live).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00440fe3 } from "./440fe3.js";

export function FUN_004428d6(heap) {
  const esi = regs.esi >>> 0;
  if (heap.u16(0x87d7a0) < 2) return;                     // cmp WORD [0x87d7a0],2
  const v = (heap.u8(esi + 0xf4) + 1) & 0xff;             // inc BYTE
  heap.setU8(esi + 0xf4, v);
  if (v !== 0xfe) return;
  heap.setU8(esi + 0xf4, 0xdc);
  // al=0x10, ah=0xff — 440fe3 (hand-port) leaves eax = displaced
  // thought-queue dword like the binary, preserves the rest.
  regs.eax = ((regs.eax & 0xffff0000) | 0xff10) >>> 0;
  FUN_00440fe3(heap);
  const h = heap.u8(esi + 0x3b);
  heap.setU8(esi + 0x3b, h < 0x1e ? 0 : h - 0x1e);
}
