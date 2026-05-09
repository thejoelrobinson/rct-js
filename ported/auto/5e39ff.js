// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e39ff.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e117d } from "./5e117d.js";
export function FUN_005e39ff(heap) {
  let cVar1 = 0;
  let uVar2 = 0;
  let sVar3 = 0;
  let uVar4 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pcVar5 = 0;
  uVar2 = ((0xffff) >>> 0);
  if ((((heap.u8(0x00991f36) == 5) || (heap.u8(0x00991f36) == 2)) && (heap.u8(0x00991f37) == heap.i8((unaff_ESI + 0x174)))) && ((heap.u8(0x00991f38) == heap.i16((unaff_ESI + 0x30)) && ((heap.u32(0x00991f30) & 1) != 0)))) {
    uVar2 = ((heap.u32(0x00991f3c)) >>> 0);
  }
  sVar3 = ((-1) & 0xffff);
  if ((((heap.u32(0x00991f30) >>> 3 & 1) != 0) && (heap.u8(0x00991f5a) == heap.i8((unaff_ESI + 0x174)))) && (heap.u8(0x00991f58) == heap.i16((unaff_ESI + 0x30)))) {
    sVar3 = ((heap.u8(0x00991f5c)) & 0xffff);
  }
  uVar4 = ((0) >>> 0);
  for (pcVar5 = ((heap.u32((unaff_ESI + 0x1c))) >>> 0); cVar1 = ((heap.i8(pcVar5)) & 0xff), cVar1 != 21; pcVar5 = (((pcVar5 + 0x10) >>> 0)) >>> 0) {
    if ((((cVar1 == 4) || (cVar1 == 2)) && ((heap.u32((pcVar5 + 10)) & 0x80000000) != 0)) && ((((heap.u8((unaff_ESI + 0x14 + (((uVar4) >>> 0) >>> 3))) >>> (uVar4 & 7) & 1) != 0 || (((uVar2) << 16 >> 16) == ((uVar4) << 16 >> 16))) || (sVar3 == ((uVar4) << 16 >> 16))))) {
      (regs.eax = FUN_005e117d(heap));
    }
    uVar4 = ((uVar4 + 1) >>> 0);
  }
  return;
}
