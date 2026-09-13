// @manual — do not regenerate.
// Source: decompiled/c/5e39c6.c
// Live refresh passes the current window in ESI and refresh event 2 in BP.
// The translation substituted the literal -0x178 for the window pointer.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect, state } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e39ff } from "./5e39ff.js";
import { FUN_005e40c4 } from "./5e40c4.js";
export function FUN_005e39c6(heap) {
  const liveInput = globalThis.__realStartup || state.executionMode === "pure-js";
  let uVar1 = 0;
  uVar1 = ((heap.u32(0x009a1164)) >>> 0);
  if (heap.u8(0x0099c169) != 0) {
    heap.setU32(0x009a1618, (heap.u32(0x009a1618) + 1) >>> 0);
  }
  while (0x9a013b < uVar1 - 0x178) {
    (regs.esi = liveInput ? (uVar1 - 0x178) >>> 0 : 0xfffffe88, regs.eax = FUN_005e40c4(heap));
    (regs.esi = liveInput ? (uVar1 - 0x178) >>> 0 : 0xfffffe88, regs.eax = FUN_005e39ff(heap));
    if (liveInput) {
      regs.esi = (uVar1 - 0x178) >>> 0;
      regs.ebp = ((regs.ebp & 0xffff0000) | 2) >>> 0;
    }
    (regs.eax = callIndirect(heap, heap.u32((uVar1 - 0x174))));
    if (liveInput) regs.esi = (uVar1 - 0x178) >>> 0;
    uVar1 = ((uVar1 - 0x178) >>> 0);
  }
  if (liveInput) regs.esi = (uVar1 - 0x178) >>> 0;
  return;
}
