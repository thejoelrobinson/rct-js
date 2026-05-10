// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e4400.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e0e07 } from "./5e0e07.js";
import { FUN_009b30f1 } from "./9b30f1.js";
export function FUN_005e4400(heap) {
  // diagnostic — wiped on regen
  if (typeof globalThis._renderTrace === "function") globalThis._renderTrace("FUN_005e4400");
  let sVar1 = 0;
  let pbVar2 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  if (((heap.u16((unaff_ESI + 0x32)) & 0x10) != 0) && ((heap.u16((unaff_ESI + 0x32)) & 0x20) == 0)) {
    (regs.eax = FUN_009b30f1(heap));
  }
  pbVar2 = ((heap.u32((unaff_ESI + 0x1c))) >>> 0);
  heap.setU32(0x0099fe02, (0x34) >>> 0);
  heap.setU32(0x0099fe06, (0) >>> 0);
  heap.setU32(0x009a13e4, (-1) >>> 0);
  if ((((heap.u8(0x00991f36) == 5) || (heap.u8(0x00991f36) == 2)) && (heap.u8(0x00991f37) == heap.i8((unaff_ESI + 0x174)))) && ((heap.u8(0x00991f38) == heap.i16((unaff_ESI + 0x30)) && ((heap.u32(0x00991f30) & 1) != 0)))) {
    heap.setU32(0x009a13e4, (heap.i16(0x00991f3c)) >>> 0);
  }
  heap.setU32(0x009a13e6, (-1) >>> 0);
  if ((((heap.u32(0x00991f30) >>> 3 & 1) != 0) && (heap.u8(0x00991f5a) == heap.i8((unaff_ESI + 0x174)))) && (heap.u8(0x00991f58) == heap.i16((unaff_ESI + 0x30)))) {
    heap.setU32(0x009a13e6, (heap.u8(0x00991f5c)) >>> 0);
  }
  heap.setU32(0x009a13e0, (heap.u32((unaff_ESI + 0x10))) >>> 0);
  heap.setU32(0x009a13e8, (heap.u32((unaff_ESI + 0x14))) >>> 0);
  while ((heap.u16((unaff_ESI + 0x32)) & 0x20) == 0 && ((((sVar1 = ((heap.i16((unaff_EDI + 4)) - heap.i16((unaff_ESI + 0x20))) & 0xffff), heap.i16((pbVar2 + 4)) < sVar1 || ((((sVar1 + heap.i16((unaff_EDI + 8)))) << 16 >> 16) <= heap.i16((pbVar2 + 2)))) || (sVar1 = ((heap.i16((unaff_EDI + 6)) - heap.i16((unaff_ESI + 0x22))) & 0xffff), heap.i16((pbVar2 + 8)) < sVar1)) || ((((sVar1 + heap.i16((unaff_EDI + 10)))) << 16 >> 16) <= heap.i16((pbVar2 + 6)))))) {
    pbVar2 = ((pbVar2 + 0x10) >>> 0);
    heap.setU32(0x009a13e4, (heap.u32(0x009a13e4) + -1) >>> 0);
    heap.setU32(0x009a13e6, (heap.u32(0x009a13e6) + -1) >>> 0);
    heap.setU32(0x009a13e8, (heap.u32(0x009a13e8) >>> 1) >>> 0);
    heap.setU32(0x009a13e0, (heap.u32(0x009a13e0) >>> 1) >>> 0);
    if (heap.u8(pbVar2) == 0x15) {
      if ((heap.u16((unaff_ESI + 0x32)) & 0x600) != 0) {
        (regs.eax = FUN_005e0e07(heap, unaff_ESI));
      }
      return;
    }
  }
  return (regs.eax = callIndirect(heap, heap.u32((0x005e452c) + (heap.u8(pbVar2)) * 4)));
}
