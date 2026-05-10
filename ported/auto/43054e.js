// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43054e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0040473c } from "./40473c.js";
import { FUN_004274a9 } from "./4274a9.js";
import { FUN_00428ec0 } from "./428ec0.js";
import { FUN_004292b0 } from "./4292b0.js";
import { FUN_0042934f } from "./42934f.js";
import { FUN_004298a0 } from "./4298a0.js";
import { FUN_0042c6f3 } from "./42c6f3.js";
import { FUN_0042f199 } from "./42f199.js";
import { FUN_0042fd81 } from "./42fd81.js";
import { FUN_004311e7 } from "./4311e7.js";
import { FUN_00436558 } from "./436558.js";
import { FUN_004448fb } from "./4448fb.js";
import { FUN_00444b4a } from "./444b4a.js";
import { FUN_005d3b30 } from "./5d3b30.js";
import { FUN_005ddf20 } from "./5ddf20.js";
import { FUN_005e0d60 } from "./5e0d60.js";
import { FUN_005e16f7 } from "./5e16f7.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e6028 } from "./5e6028.js";
import { FUN_005e68e2 } from "./5e68e2.js";
export function FUN_0043054e(heap) {
  let cVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let pcVar4 = 0;
  let pcVar5 = 0;
  let in_AX = regs.eax & 0xffff;
  let uVar6 = 0;
  let bVar7 = 0;
  let pcVar8 = 0;
  let pcVar9 = 0;
  let pcVar10 = 0;
  let bVar11 = 0;
  uVar6 = (((regs.eax = FUN_0040473c(heap))) >>> 0);
  heap.setU8(0x005f8534, (uVar6 ^ heap.u32(0x006e3b88)) & 0xff);
  heap.setU32(0x005f8538, (heap.u32(0x006e3b8c)) >>> 0);
  (regs.eax = FUN_005d3b30(heap));
  pcVar8 = ((0x0099c16c + ((in_AX) >>> 0) * 0x10) >>> 0);
  pcVar4 = ((0x005f8fb3) >>> 0);
  pcVar5 = ((0x0099aa88) >>> 0);
  do {
    pcVar10 = ((pcVar5) >>> 0);
    pcVar9 = ((pcVar4) >>> 0);
    cVar1 = ((heap.i8(pcVar9)) & 0xff);
    heap.setU32(pcVar10, (cVar1) & 0xffffffff);
    pcVar4 = ((pcVar9 + 1) >>> 0);
    pcVar5 = ((pcVar10 + 1) >>> 0);
  } while (cVar1 != 42);
  do {
    cVar1 = ((heap.i8(pcVar8)) & 0xff);
    heap.setU32(pcVar10, (cVar1) & 0xffffffff);
    pcVar8 = ((pcVar8 + 1) >>> 0);
    pcVar10 = ((pcVar10 + 1) >>> 0);
    bVar11 = ((false) & 0xff);
  } while (cVar1 != 0);
  (regs.eax = FUN_0042fd81(heap));
  if ((!bVar11) && (in_AX == heap.u32(0x008dbed2))) {
    (regs.eax = FUN_00436558(heap));
    (regs.eax = FUN_00444b4a(heap));
    heap.setU32(0x0099a500, (heap.u32(0x0099a500) & 0xfffe) >>> 0);
    (regs.eax = FUN_005e0d60(heap));
    (regs.esi = 0x5f90c0, regs.edi = 0x99ab95, regs.eax = FUN_004298a0(heap));
    (regs.eax = FUN_005e68e2(heap));
    iVar3 = ((heap.i32((pcVar9 + 9))) >>> 0);
    heap.setI8((pcVar9 + (0x16f)), (-1) & 0xff);
    heap.setI8((pcVar9 + (0x170)), (-1) & 0xff);
    heap.setU16((pcVar9 + 0x171), (heap.u8(0x008ad1c2)) & 0xffff);
    heap.setU16((pcVar9 + 0x173), (heap.u8(0x008ad1c4)) & 0xffff);
    heap.setU8((0x00991f88 + 0), (((heap.u16(0x008ad1c6) >>> 8) & 0xff)) & 0xff);
    bVar7 = ((heap.i8(0x008ad1c6) - heap.i8((iVar3 + 0x10))) & 0xff);
    heap.setI8((iVar3 + 0x10), (heap.i8(0x008ad1c6)) & 0xff);
    if (bVar7 != 0) {
      if (((bVar7) << 24 >> 24) < 0) {
        heap.setI16((iVar3 + 0xc), (heap.i16((iVar3 + 0xc)) >>> (-bVar7 & 0x1f)) & 0xffff);
        heap.setI16((iVar3 + 0xe), (heap.i16((iVar3 + 0xe)) >>> (-bVar7 & 0x1f)) & 0xffff);
      } else {
        heap.setI16((iVar3 + 0xc), (heap.i16((iVar3 + 0xc)) << (bVar7 & 0x1f)) & 0xffff);
        heap.setI16((iVar3 + 0xe), (heap.i16((iVar3 + 0xe)) << (bVar7 & 0x1f)) & 0xffff);
      }
    }
    uVar2 = ((heap.u16((iVar3 + 0xe))) & 0xffff);
    heap.setU16((pcVar9 + 0x171), (heap.i16((pcVar9 + 0x171)) - (heap.u16((iVar3 + 0xc)) >>> 1)) & 0xffff);
    heap.setU16((pcVar9 + 0x173), (heap.i16((pcVar9 + 0x173)) - (uVar2 >>> 1)) & 0xffff);
    (regs.esi = 0x5f90c0, regs.eax = FUN_005e43de(heap));
    (regs.esi = 0x5f90c0, regs.eax = FUN_005e16f7(heap));
    (regs.eax = FUN_004448fb(heap));
    (regs.eax = FUN_005ddf20(heap));
    (regs.eax = FUN_0042f199(heap));
    heap.setU32(0x006e3b88, (heap.u8(0x005f8534)) >>> 0);
    heap.setU32(0x006e3b8c, (heap.u32(0x005f8538)) >>> 0);
    (regs.eax = FUN_004311e7(heap));
    (regs.eax = FUN_0042c6f3(heap));
    if (heap.u8(0x0087d0d0) != 0) {
      (regs.eax = FUN_004274a9(heap));
    }
    heap.setU32(0x0087cc88, ((regs.eax = FUN_00428ec0(heap))) >>> 0);
    heap.setU32(0x0087d514, ((regs.eax = FUN_004292b0(heap))) >>> 0);
    heap.setU32(0x0087d724, ((regs.eax = FUN_0042934f(heap))) >>> 0);
    (regs.eax = FUN_005e6028(heap));
    heap.setU32(0x0099a4fe, (0) >>> 0);
    heap.setU32(0x0099a4f4, (62000) >>> 0);
    return;
  }
  return;
}
