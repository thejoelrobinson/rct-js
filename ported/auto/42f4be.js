// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f4be.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_004298a0 } from "./4298a0.js";
import { FUN_0042c4d3 } from "./42c4d3.js";
import { FUN_0042f96d } from "./42f96d.js";
import { FUN_0042f98e } from "./42f98e.js";
import { FUN_0042fa5f } from "./42fa5f.js";
import { FUN_004314ed } from "./4314ed.js";
import { FUN_00436558 } from "./436558.js";
import { FUN_004447f6 } from "./4447f6.js";
import { FUN_004448fb } from "./4448fb.js";
import { FUN_00444b4a } from "./444b4a.js";
import { FUN_005d3b30 } from "./5d3b30.js";
import { FUN_005ddf20 } from "./5ddf20.js";
import { FUN_005e0d60 } from "./5e0d60.js";
import { FUN_005e16f7 } from "./5e16f7.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e6028 } from "./5e6028.js";
import { FUN_005e68e2 } from "./5e68e2.js";
export function FUN_0042f4be(heap) {
  let uVar1 = 0;
  let sVar2 = 0;
  let iVar3 = 0;
  let bVar4 = 0;
  let bVar5 = 0;
  (regs.eax = FUN_005d3b30(heap));
  heap.setU8(0x005f8d35, (0) & 0xff);
  iVar3 = (((regs.eax = FUN_004083b5(heap, 0x0099aa88))) >>> 0);
  bVar5 = (((iVar3 | 0) != -1) & 0xff);
  if ((iVar3 | 0) != -1) {
    heap.setU32(0x005f88a4, (iVar3) >>> 0);
    (regs.eax = FUN_0042fa5f(heap));
    if (!bVar5) {
      (regs.eax = FUN_0042f96d(heap));
      (regs.eax = FUN_0042f98e(heap));
      (regs.eax = FUN_00408387(heap, heap.u32(0x005f88a4)));
      sVar2 = (((regs.eax = FUN_004314ed(heap))) & 0xffff);
      if ((((-sVar2 == heap.u32(0x0087d7a2)) && ((0x1f < heap.u32(0x008dbed2) || ((heap.u32(((0x0099fb78) & 0xff) + (((heap.u32(0x008dbed2)) | 0) >>> 3) * 4) >>> (heap.u32(0x008dbed2) & 7) & 1) == 0)))) && ((4 < heap.u32(0x006e3b80) || (heap.u32(0x0087c3b4) < 0xf4241)))) && ((((8 < heap.u32(0x006e3b80) || (heap.u32(0x0087c3b4) < 0x4c4b41)) && ((0x10 < heap.u32(0x006e3b80) || (heap.u32(0x0087c3b4) < 0x7270e1)))) && ((0x50 < heap.u32(0x006e3b80) || (heap.u32(0x0087c3b4) < 0x2faf081)))))) {
        (regs.eax = FUN_00436558(heap));
        (regs.eax = FUN_00444b4a(heap));
        if (heap.u32(0x0087c81c) < 0) {
          heap.setU32(0x0087c81c, (0) >>> 0);
        }
        heap.setU32(0x0099a500, (heap.u32(0x0099a500) & 0xfffe) >>> 0);
        (regs.eax = FUN_005e0d60(heap));
        (regs.eax = FUN_004298a0(heap));
        (regs.eax = FUN_005e68e2(heap));
        uVar1 = ((heap.u8(0x008ad1c6)) & 0xffff);
        iVar3 = ((heap.u32(0x006e3b88)) >>> 0);
        heap.setU32(0x006e3cee, (0xffff) >>> 0);
        heap.setU32(0x006e3cf0, (heap.u8(0x008ad1c2)) >>> 0);
        heap.setU32(0x006e3cf2, (heap.u8(0x008ad1c4)) >>> 0);
        bVar4 = ((heap.i8(0x008ad1c6) - heap.i8((heap.u32(0x006e3b88) + 0x10))) & 0xff);
        heap.setI8((heap.u32(0x006e3b88) + 0x10), (heap.i8(0x008ad1c6)) & 0xff);
        heap.setU8((0x00991f88 + 0), (((((uVar1) & 0xffff) >>> 8) & 0xff)) & 0xff);
        if (bVar4 != 0) {
          if (((bVar4) << 24 >> 24) < 0) {
            heap.setI16((iVar3 + 0xc), (heap.i16((iVar3 + 0xc)) >>> (-bVar4 & 0x1f)) & 0xffff);
            heap.setI16((iVar3 + 0xe), (heap.i16((iVar3 + 0xe)) >>> (-bVar4 & 0x1f)) & 0xffff);
          } else {
            heap.setI16((iVar3 + 0xc), (heap.i16((iVar3 + 0xc)) << (bVar4 & 0x1f)) & 0xffff);
            heap.setI16((iVar3 + 0xe), (heap.i16((iVar3 + 0xe)) << (bVar4 & 0x1f)) & 0xffff);
          }
        }
        heap.setU32(0x006e3cf0, (heap.u32(0x006e3cf0) - (heap.u16((iVar3 + 0xc)) >>> 1)) >>> 0);
        heap.setU32(0x006e3cf2, (heap.u32(0x006e3cf2) - (heap.u16((iVar3 + 0xe)) >>> 1)) >>> 0);
        (regs.eax = FUN_005e43de(heap));
        (regs.eax = FUN_005e16f7(heap));
        (regs.eax = FUN_004448fb(heap));
        (regs.eax = FUN_005ddf20(heap));
        heap.setU32(0x0099fe00, (0) >>> 0);
        if (heap.u32(0x0087d79c) == 0) {
          (regs.eax = FUN_004447f6(heap));
        }
        (regs.eax = FUN_005e6028(heap));
        heap.setU32(0x0099a4fe, (0) >>> 0);
        return;
      }
      return (regs.eax = FUN_0042c4d3(heap));
    }
    (regs.eax = FUN_00408387(heap, heap.u32(0x005f88a4)));
  }
  return;
}
