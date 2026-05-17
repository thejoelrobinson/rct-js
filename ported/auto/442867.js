// @manual — do not regenerate.
// Source: decompiled/c/442867.c
// Fix: byte-pointer RMW (`*pbVar = *pbVar <op> N`) was emitted as setU32;
// replaced with setU8 to avoid trailing-byte corruption.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042c711 } from "./42c711.js";
import { FUN_00440fe3 } from "./440fe3.js";
export function FUN_00442867(heap) {
  let pbVar1 = 0;
  let pcVar2 = 0;
  let bVar3 = 0;
  let unaff_ESI = regs.esi >>> 0;
  if ((heap.u16((unaff_ESI + 200)) & 1) != 0) {
    if (((heap.i8((unaff_ESI + 0xc6)) == 1) || (heap.i8((unaff_ESI + 0xc6)) == 30)) || (heap.i8((unaff_ESI + 0xc6)) == 60)) {
      (regs.eax = FUN_00440fe3(heap));
      pbVar1 = (((unaff_ESI + 0x3b)) >>> 0);
      bVar3 = ((heap.u8(pbVar1)) & 0xff);
      heap.setU8(pbVar1, (heap.u8(pbVar1) - 0x1e) & 0xff);
      if (bVar3 < 0x1e) {
        heap.setU8((unaff_ESI + 0x3b), (0) & 0xff);
      }
    }
    pcVar2 = (((unaff_ESI + 0xc6)) >>> 0);
    heap.setU32(pcVar2, (heap.i8(pcVar2) + -1) & 0xffffffff);
    if (heap.i8(pcVar2) == 0) {
      heap.setU8((unaff_ESI + 0xc6), (0x5a) & 0xff);
      heap.setU16((0x00971e86 + 0), (heap.u16((unaff_ESI + 0x22))) & 0xffff);
      unique0x00017200 = ((heap.u32((unaff_ESI + 0x9c))) >>> 0);
      (regs.eax = FUN_0042c711(heap));
    }
  }
  return;
}
