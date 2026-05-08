// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4410df.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT31 } from "../runtime/win32.js";
import { FUN_0044049c } from "./44049c.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00444bd4 } from "./444bd4.js";
import { FUN_00444c74 } from "./444c74.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_004410df(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_PTR_DAT_0062d644 = __sp + 0;
  const __addr_DAT_0062d630 = __sp + 4;
  try {
  let bVar2 = 0;
  let cVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  if (399 < heap.u32(0x0087c3a0)) {
    FUN_00444bd4(heap);
    FUN_00444c74(heap);
    heap.u32(unaff_ESI) = 1;
    heap.u32(unaff_ESI + (0x2d) * 4) = 0;
    heap.u32(unaff_ESI + (0x2a) * 4) = 1;
    heap.u32(unaff_ESI + (0x2b) * 4) = 0;
    heap.u32(unaff_ESI + (0x71) * 4) = 0xff;
    heap.u32(unaff_ESI + (0x6d) * 4) = 0;
    heap.u32(unaff_ESI + (0x70) * 4) = 0;
    heap.u32(unaff_ESI + (0xe0) * 4) = 0;
    heap.u32(unaff_ESI + (0x6e) * 4) = 0;
    heap.u32((unaff_ESI + 200)) = 0;
    uVar8 = heap.u32(unaff_ESI + (0x6e) * 4);
    puVar1 = heap.u32((__addr_PTR_DAT_0062d644) + (heap.u32(unaff_ESI + (0x2d) * 4) * 2) * 4);
    heap.u32(unaff_ESI + (0x14) * 4) = heap.u32(puVar1 + (uVar8 * 4) * 4);
    heap.u32(unaff_ESI + (9) * 4) = heap.u32(puVar1 + (uVar8 * 4 + 1) * 4);
    heap.u32(unaff_ESI + (0x15) * 4) = heap.u32(puVar1 + (uVar8 * 4 + 2) * 4);
    heap.u32(unaff_ESI + (0x1e) * 4) = 0;
    FUN_00444927(heap);
    FUN_005e53ca(heap);
    uVar6 = FUN_005df40c(heap);
    uVar8 = uVar6 >>> 5;
    uVar7 = uVar8 | uVar6 << 0x1b;
    heap.u32(unaff_ESI + (0x41) * 4) = (uVar6 & 0x1f) + 0x2d;
    heap.u32(unaff_ESI + (0xc4) * 4) = 0;
    heap.u32(unaff_ESI + (0x79) * 4) = 0xff;
    heap.u32(unaff_ESI + (0x2e) * 4) = 0;
    heap.u32(unaff_ESI + (0xad) * 4) = 0xff;
    heap.u32(unaff_ESI + (0xb0) * 4) = 0xff;
    heap.u32(unaff_ESI + (0x45) * 4) = 0;
    uVar6 = uVar7 >>> 3;
    bVar2 = (uVar8 & 7) + 3;
    uVar5 = CONCAT11(heap, bVar2, bVar2);
    if (7 < bVar2) {
      uVar5 = CONCAT11(heap, 7, bVar2);
    }
    bVar2 = (byte)(uVar5 >>> 8);
    uVar4 = CONCAT11(heap, bVar2 - 3, uVar5);
    if (bVar2 < 3) {
      uVar4 = uVar5 & 0xff;
    }
    if (6 < uVar4) {
      uVar4 = CONCAT31(heap, (uint3)(byte)(uVar4 >>> 8), 0xf);
    }
    heap.u32(unaff_ESI + (0x43) * 4) = uVar4 << 4 | (byte)(uVar4 >>> 8);
    heap.u32(unaff_ESI + (0x44) * 4) = heap.u32((__addr_DAT_0062d630) + ((uVar8 & 0x38) >>> 3) * 4);
    uVar8 = uVar6 & 0xf8f80000 | uVar8 << 0x1d;
    cVar3 = (uVar8 >>> 0x13) + -0xf + heap.u32(0x0087d0c1);
    if (heap.u32(0x0087d0c1) == '\0') {
      cVar3 = cVar3 + -0x80;
    }
    heap.u32(unaff_ESI + (0x3a) * 4) = cVar3;
    heap.u32(unaff_ESI + (0x3b) * 4) = cVar3;
    heap.u32(unaff_ESI + (0x3c) * 4) = 0;
    heap.u32(unaff_ESI + (0x3d) * 4) = 0;
    heap.u32(unaff_ESI + (0x3e) * 4) = ((byte)(uVar8 >>> 0x1b) - 0xf) + heap.u32(0x0087d0ce);
    heap.u32(unaff_ESI + (0x3f) * 4) = (((byte)((uVar6 << 0xd) >>> 0x10) & 0x1f) - 0xf) + heap.u32(0x0087d0cf);
    heap.u32(unaff_ESI + (0x40) * 4) = 0;
    heap.u32(unaff_ESI + (0x42) * 4) = 0;
    heap.u32((unaff_ESI + 0x7c)) = 0;
    heap.u32((unaff_ESI + 0x80)) = 0;
    heap.u32((unaff_ESI + 0x84)) = 0;
    heap.u32((unaff_ESI + 0x88)) = 0;
    heap.u32((unaff_ESI + 0x8c)) = 0;
    heap.u32((unaff_ESI + 0x90)) = 0;
    heap.u32((unaff_ESI + 0x94)) = 0;
    heap.u32((unaff_ESI + 0x98)) = 0;
    heap.u32(unaff_ESI + (0x2f) * 4) = 0;
    heap.u32((unaff_ESI + 0x48)) = 0;
    heap.u32((unaff_ESI + 0x4c)) = 0;
    heap.u32((unaff_ESI + 0x50)) = 0;
    heap.u32((unaff_ESI + 0x54)) = 0;
    heap.u32((unaff_ESI + 0x58)) = 0;
    heap.u32((unaff_ESI + 0x5c)) = 0;
    heap.u32((unaff_ESI + 0x60)) = 0;
    heap.u32((unaff_ESI + 100)) = 0;
    heap.u32((unaff_ESI + 0x9c)) = heap.u32(0x008d4224);
    heap.setU32(0x008d4224, (heap.u32(0x008d4224) + 1) >>> 0);
    heap.u32((unaff_ESI + 0x22)) = 0x2ff;
    uVar5 = (ushort)(uVar7 >>> 0x1e) * 100 + -100 + heap.u32(0x0087d0cc);
    if (heap.u32(0x0087d0cc) == 0) {
      uVar5 = 500;
    }
    if (heap.u32(0x0087d0cc) == -1) {
      uVar5 = 0;
    }
    heap.u32((unaff_ESI + 0xa0)) = uVar5;
    heap.u32((unaff_ESI + 0xa4)) = 0;
    heap.u32((unaff_ESI + 0xa8)) = 0xffffffff;
    heap.u32((unaff_ESI + 0xcc)) = 0xffffffff;
    heap.u32((unaff_ESI + 0xca)) = 0;
    heap.u32(unaff_ESI + (0xc5) * 4) = 0xff;
    heap.u32(unaff_ESI + (0xe1) * 4) = 0;
    heap.u32(unaff_ESI + (0xe3) * 4) = 0;
    heap.u32(unaff_ESI + (0xef) * 4) = 0;
    heap.u32((unaff_ESI + 0xe4)) = 0;
    heap.u32((unaff_ESI + 0xe6)) = 0;
    heap.u32((unaff_ESI + 0xe8)) = 0;
    heap.u32((unaff_ESI + 0xea)) = 0;
    heap.u32(unaff_ESI + (0xec) * 4) = 0;
    heap.u32(unaff_ESI + (0xed) * 4) = 0;
    heap.u32(unaff_ESI + (0xee) * 4) = 0;
    heap.u32(unaff_ESI + (0xf2) * 4) = 0;
    heap.u32(unaff_ESI + (0xf3) * 4) = 0;
    heap.u32(unaff_ESI + (0xf4) * 4) = 0;
    heap.u32(unaff_ESI + (0x30) * 4) = ((ushort)(uVar6 * 0x1b) >>> 8);
    heap.u32(unaff_ESI + (0x31) * 4) = ((ushort)((ushort)(byte)(uVar6 >>> 8) * 0x1b) >>> 8);
    cVar3 = ((byte)(uVar6 >>> 0x10) & 0x3f) + 0x41;
    heap.u32(unaff_ESI + (0x38) * 4) = cVar3;
    heap.u32(unaff_ESI + (0x39) * 4) = cVar3;
    FUN_0044049c(heap);
    heap.setU32(0x0087c81e, (heap.u32(0x0087c81e) + 1) >>> 0);
    return;
  }
  return;
} finally {
    heap.freeFrame(8);
  }
}
