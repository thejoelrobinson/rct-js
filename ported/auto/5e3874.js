// @manual — do not regenerate.
//
// Source: decompiled/c/5e3874.c — walks a linked list at unaff_ESI looking
// for sentinel byte 0x15. With ESI uninitialised the loop walks garbage
// memory forever. Bail when ESI is 0; cap the search to 1M bytes otherwise.

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";

export function FUN_005e3874(heap) {
  const esi = regs.esi >>> 0;
  if (esi === 0) return;
  const fn = heap.u32(esi);
  if (fn) regs.eax = callIndirect(heap, fn);
  let pcVar1 = heap.u32(esi + 28) >>> 0;
  if (pcVar1 === 0) return;
  let safety = 1_000_000;
  while (heap.i8(pcVar1) !== 21) {
    pcVar1 = (pcVar1 + 0x10) >>> 0;
    if (--safety <= 0) return;
  }
}
