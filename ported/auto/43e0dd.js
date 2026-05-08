// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43e0dd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { FUN_0043e304 } from "./43e304.js";
import { FUN_00441891 } from "./441891.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_0043e0dd(heap) {
  const __sp = heap.allocFrame(32);
  const __addr_DAT_00971ef4 = __sp + 0;
  const __addr_DAT_00629288 = __sp + 4;
  const __addr_DAT_00887420 = __sp + 8;
  const __addr_DAT_006292ac = __sp + 12;
  const __addr_DAT_00887422 = __sp + 16;
  const __addr_DAT_005f5b78 = __sp + 20;
  const __addr_DAT_00887510 = __sp + 24;
  const __addr_DAT_00887512 = __sp + 28;
  try {
  let pbVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let iVar6 = 0;
  let extraout_ECX = 0;
  let bVar7 = 0;
  let in_EDX = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let pbVar10 = 0;
  let puVar11 = 0;
  let unaff_ESI = 0;
  let pcVar12 = 0;
  let bVar13 = 0;
  if ((((heap.u32((unaff_ESI + 0x2b)) == '\x05') && (heap.u32((unaff_ESI + 0xc5)) == -1)) && ((heap.u32((unaff_ESI + 200)) & 1) == 0)) && (((heap.u32((unaff_ESI + 0xca)) & 0xa3e0) == 0 && (heap.u32((unaff_ESI + 0xe)) != -0x8000)))) {
    heap.setU32(0x00629288, (0) >>> 0);
    heap.setU32(0x0062928c, (0) >>> 0);
    heap.setU32(0x00629290, (0) >>> 0);
    heap.setU32(0x00629294, (0) >>> 0);
    heap.setU32(0x00629298, (0) >>> 0);
    heap.setU32(0x0062929c, (0) >>> 0);
    heap.setU32(0x006292a0, (0) >>> 0);
    heap.setU32(0x006292a4, (0) >>> 0);
    if ((heap.u32((unaff_ESI + 0xca)) & 2) == 0) {
      uVar4 = (heap.u32((unaff_ESI + 0x10)) & 0xffe0) - 0x140;
      in_EDX = 0;
      uVar5 = (heap.u32((unaff_ESI + 0xe)) & 0xffe0) - 0x140;
      do {
        do {
          uVar2 = uVar5;
          uVar8 = in_EDX;
          if ((uVar2 < 0xfff) && (uVar4 < 0xfff)) {
            pbVar10 = heap.u32((__addr_DAT_00971ef4) + (((uVar4 << 7 | uVar4 >>> 9 | uVar2) >>> 5 | (uVar4 >>> 9) << 0xb)) * 4);
            do {
              if ((heap.u32(pbVar10) & 0x3c) == 8) {
                bVar7 = heap.u32(pbVar10 + (7) * 4);
                heap.setU32(((__addr_DAT_00629288) + (((bVar7 & 0x1f) >>> 3) + (bVar7 >>> 5) * 4) * 4), (heap.u32((__addr_DAT_00629288) + (((bVar7 & 0x1f) >>> 3) + (bVar7 >>> 5) * 4) * 4) | '\x01' << (bVar7 & 7)) >>> 0);
              }
              pbVar1 = pbVar10 + 1;
              pbVar10 = pbVar10 + 8;
            } while ((heap.u32(pbVar1) & 0x80) == 0);
          }
          bVar7 = uVar8 + 1;
          in_EDX = CONCAT31((int3)(uVar8 >>> 8), bVar7);
          uVar5 = uVar2 + 0x20;
        } while (bVar7 < 0x15);
        uVar4 = uVar4 + 0x20;
        bVar7 = (uVar8 >>> 8) + 1;
        in_EDX = bVar7 << 8;
        uVar5 = uVar2 - 0x280;
      } while (bVar7 < 0x15);
    } else {
      uVar8 = 0;
      pcVar12 = __addr_DAT_00887420;
      do {
        if (heap.u32(pcVar12) != -1) {
          heap.setU32(((__addr_DAT_00629288) + (((uVar8 & 0x1f) >>> 3) + (uVar8 >>> 5) * 4) * 4), (heap.u32((__addr_DAT_00629288) + (((uVar8 & 0x1f) >>> 3) + (uVar8 >>> 5) * 4) * 4) | '\x01' << (uVar8 & 7)) >>> 0);
        }
        uVar8 = uVar8 + 1;
        pcVar12 = pcVar12 + 0x260;
      } while (uVar8 < 0xff);
    }
    puVar11 = __addr_DAT_006292ac;
    uVar9 = 0;
    uVar8 = 0;
    iVar6 = 0;
    do {
      if (((((heap.u32((__addr_DAT_00629288) + ((uVar8 >>> 3) + iVar6 * 4) * 4) >>> (uVar8 & 7) & 1) != 0) && ((heap.u32((unaff_ESI + 0x7c + iVar6 * 4 + (uVar8 >>> 3))) >>> (uVar8 & 7) & 1) == 0)) && ((heap.u32((__addr_DAT_00887422) + (uVar9 * 0x130) * 4) & 0x200) == 0)) && ((heap.u32((__addr_DAT_005f5b78 + heap.u32((__addr_DAT_00887420) + (uVar9 * 0x260) * 4) * 8)) & 0x20000) == 0)) {
        bVar13 = false;
        uVar8 = FUN_0043e304(heap);
        iVar6 = extraout_ECX;
        if (bVar13) {
          heap.setU32(puVar11, (uVar9) >>> 0);
          puVar11 = puVar11 + 1;
        }
      }
      uVar9 = uVar9 + 1;
      uVar8 = uVar8 + 1;
      if (0x1f < uVar8) {
        uVar8 = 0;
        iVar6 = iVar6 + 1;
      }
    } while (uVar9 < 0xff);
    puVar11 = puVar11 + -0x6292ac;
    if (puVar11 != 0x0) {
      pbVar10 = __addr_DAT_006292ac;
      uVar5 = 0;
      do {
        uVar8 = heap.u32(pbVar10);
        if ((heap.u32((__addr_DAT_00887510) + (uVar8 * 0x130) * 4) != -1) && (uVar5 <= heap.u32((__addr_DAT_00887512) + (uVar8 * 0x130) * 4))) {
          uVar5 = heap.u32((__addr_DAT_00887512) + (uVar8 * 0x130) * 4);
          in_EDX = heap.u32(pbVar10);
        }
        pbVar10 = pbVar10 + 1;
        puVar11 = puVar11 + -1;
      } while (puVar11 != 0x0);
      if (uVar5 != 0) {
        heap.setU32((unaff_ESI + 0xc5), (in_EDX) >>> 0);
        heap.setU32((unaff_ESI + 0xc6), (200) >>> 0);
        uVar3 = FUN_00441891(heap);
        FUN_005e5301(heap, pbVar10, uVar3);
        heap.setU32((unaff_ESI + 0xf4), (0) >>> 0);
      }
    }
  }
  return;
} finally {
    heap.freeFrame(32);
  }
}
