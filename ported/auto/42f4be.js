// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42f4be.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

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
  const __sp = heap.allocFrame(8);
  const __addr_DAT_0099aa88 = __sp + 0;
  const __addr_DAT_0099fb78 = __sp + 4;
  try {
  let uVar1 = 0;
  let sVar2 = 0;
  let iVar3 = 0;
  let bVar4 = 0;
  let bVar5 = 0;
  FUN_005d3b30(heap);
  heap.setU32(0x005f8d35, (0) >>> 0);
  iVar3 = FUN_004083b5(heap, __addr_DAT_0099aa88);
  bVar5 = iVar3 != -1;
  if (iVar3 != -1) {
    heap.setU32(0x005f88a4, (iVar3) >>> 0);
    FUN_0042fa5f(heap);
    if (!bVar5) {
      FUN_0042f96d(heap);
      FUN_0042f98e(heap);
      FUN_00408387(heap, heap.u32(0x005f88a4));
      sVar2 = FUN_004314ed(heap);
      if ((((-sVar2 == heap.u32(0x0087d7a2)) && ((0x1f < heap.u32(0x008dbed2) || ((heap.u32((byte)(__addr_DAT_0099fb78) + (heap.u32(0x008dbed2) >>> 3) * 4) >>> (heap.u32(0x008dbed2) & 7) & 1) == 0)))) && ((4 < heap.u32(0x006e3b80) || (heap.u32(0x0087c3b4) < 0xf4241)))) && ((((8 < heap.u32(0x006e3b80) || (heap.u32(0x0087c3b4) < 0x4c4b41)) && ((0x10 < heap.u32(0x006e3b80) || (heap.u32(0x0087c3b4) < 0x7270e1)))) && ((0x50 < heap.u32(0x006e3b80) || (heap.u32(0x0087c3b4) < 0x2faf081)))))) {
        FUN_00436558(heap);
        FUN_00444b4a(heap);
        if (heap.u32(0x0087c81c) < 0) {
          heap.setU32(0x0087c81c, (0) >>> 0);
        }
        heap.setU32(0x0099a500, (heap.u32(0x0099a500) & 0xfffe) >>> 0);
        FUN_005e0d60(heap);
        FUN_004298a0(heap);
        FUN_005e68e2(heap);
        uVar1 = heap.u32(0x008ad1c6);
        iVar3 = heap.u32(0x006e3b88);
        heap.setU32(0x006e3cee, (0xffff) >>> 0);
        heap.setU32(0x006e3cf0, (heap.u32(0x008ad1c2)) >>> 0);
        heap.setU32(0x006e3cf2, (heap.u32(0x008ad1c4)) >>> 0);
        bVar4 = heap.u32(0x008ad1c6) - heap.u32((heap.u32(0x006e3b88) + 0x10));
        heap.u32((heap.u32(0x006e3b88) + 0x10)) = heap.u32(0x008ad1c6);
        heap.u8(0x991f88) = (undefined1)(uVar1 >>> 8);
        if (bVar4 != 0) {
          if (bVar4 < '\0') {
            heap.u32((iVar3 + 0xc)) = heap.u32((iVar3 + 0xc)) >>> (-bVar4 & 0x1f);
            heap.u32((iVar3 + 0xe)) = heap.u32((iVar3 + 0xe)) >>> (-bVar4 & 0x1f);
          } else {
            heap.u32((iVar3 + 0xc)) = heap.u32((iVar3 + 0xc)) << (bVar4 & 0x1f);
            heap.u32((iVar3 + 0xe)) = heap.u32((iVar3 + 0xe)) << (bVar4 & 0x1f);
          }
        }
        heap.setU32(0x006e3cf0, (heap.u32(0x006e3cf0) - (heap.u32((iVar3 + 0xc)) >>> 1)) >>> 0);
        heap.setU32(0x006e3cf2, (heap.u32(0x006e3cf2) - (heap.u32((iVar3 + 0xe)) >>> 1)) >>> 0);
        FUN_005e43de(heap);
        FUN_005e16f7(heap);
        FUN_004448fb(heap);
        FUN_005ddf20(heap);
        heap.setU32(0x0099fe00, (0) >>> 0);
        if (heap.u32(0x0087d79c) == 0) {
          FUN_004447f6(heap);
        }
        FUN_005e6028(heap);
        heap.setU32(0x0099a4fe, (0) >>> 0);
        return;
      }
      FUN_0042c4d3(heap);
      return;
    }
    FUN_00408387(heap, heap.u32(0x005f88a4));
  }
  return;
} finally {
    heap.freeFrame(8);
  }
}
