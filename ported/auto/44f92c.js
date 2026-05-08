// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44f92c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_0042688b } from "./42688b.js";
import { FUN_005cfc50 } from "./5cfc50.js";
import { FUN_005cfe66 } from "./5cfe66.js";
export function FUN_0044f92c(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_00653ef7 = __sp + 0;
  const __addr_DAT_006522f6 = __sp + 4;
  const __addr_DAT_00887462 = __sp + 8;
  const __addr_DAT_0088746a = __sp + 12;
  const __addr_DAT_00971ef4 = __sp + 16;
  try {
  let pbVar1 = 0;
  let uVar2 = 0;
  let in_EAX = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_ECX = 0;
  let in_EDX = 0;
  let uVar5 = 0;
  let psVar6 = 0;
  let puVar7 = 0;
  let unaff_ESI = 0;
  let pcVar8 = 0;
  let pbVar9 = 0;
  let pcVar10 = 0;
  let bVar11 = 0;
  let pcVar12 = 0;
  let pcVar13 = 0;
  let extraout_ECX = 0;
  pcVar10 = ((in_EDX & 0xff) * 0x260);
  uVar3 = in_EAX;
  if (heap.u32(pcVar10 + (0x887420) * 4) == '\b') {
    bVar11 = false;
    pcVar8 = unaff_ESI;
    pcVar13 = pcVar10;
    do {
      uVar4 = in_ECX;
      uVar2 = uVar3;
      pcVar12 = pcVar8;
      FUN_005cfc50(heap);
      if (bVar11) {
        break;
      }
      uVar3 = FUN_005cfe66(heap, heap.u32(pcVar8 + (4) * 4));
      uVar4 = extraout_ECX;
      uVar2 = uVar3;
      bVar11 = pcVar10 < unaff_ESI;
      pcVar8 = pcVar10;
      pcVar12 = pcVar10;
      in_ECX = extraout_ECX;
    } while (pcVar10 - unaff_ESI != 0);
    pcVar10 = pcVar13;
    unaff_ESI = pcVar12;
    in_ECX = (uVar4 >>> 5);
    uVar2 = CONCAT11((uVar4 >>> 5), (uVar2 >>> 5));
    uVar3 = uVar2;
    heap.setU32((pcVar10 + 0x8874a2), (uVar2) >>> 0);
    heap.setU32((pcVar10 + (0x8874a1) * 4), (heap.u32((__addr_DAT_00653ef7) + (heap.u32(unaff_ESI + (4) * 4) * 10) * 4) + heap.u32(unaff_ESI) & 3) >>> 0);
  }
  if (heap.u32(pcVar10 + (0x887420) * 4) == '\x14') {
    uVar5 = 0;
    psVar6 = __addr_DAT_006522f6;
    do {
      if (heap.u32((pcVar10 + (__addr_DAT_00887462 + uVar5))) != -1) {
        heap.setU32(psVar6, (heap.u32((pcVar10 + (__addr_DAT_00887462 + uVar5)))) >>> 0);
        psVar6 = psVar6 + 1;
      }
      if (heap.u32((pcVar10 + (__addr_DAT_0088746a + uVar5))) != -1) {
        heap.setU32(psVar6, (heap.u32((pcVar10 + (__addr_DAT_0088746a + uVar5)))) >>> 0);
        psVar6 = psVar6 + 1;
      }
      uVar5 = uVar5 + 1;
    } while (uVar5 < 4);
    heap.setU32(psVar6, (-1) >>> 0);
    pcVar8 = pcVar10;
    for (puVar7 = __addr_DAT_006522f6; uVar2 = heap.u32(puVar7), uVar2 != 0xffff; puVar7 = puVar7 + 1) {
      pbVar9 = heap.u32((__addr_DAT_00971ef4) + ((((uVar2 >>> 8) << 0xc | (uVar2 & 0xff) << 5) >>> 5 | (((uVar2 >>> 8) << 5) >>> 9) << 0xb)) * 4);
      do {
        if ((((heap.u32(pbVar9) & 0x3c) == 0x10) && (heap.u32(pbVar9 + (4) * 4) < 2)) && (heap.u32(pbVar9 + (2) * 4) == heap.u32(pcVar10 + (0x887452) * 4))) {
          FUN_0042688b(heap, unaff_ESI, pcVar8, in_ECX, uVar3);
        }
        pbVar1 = pbVar9 + 1;
        pbVar9 = pbVar9 + 8;
      } while ((heap.u32(pbVar1) & 0x80) == 0);
    }
  }
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(20);
  }
}
