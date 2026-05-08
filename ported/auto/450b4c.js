// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/450b4c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FUN_005d9220 } from "./5d9220.js";
export function FUN_00450b4c(heap) {
  const __sp = heap.allocFrame(68);
  const __addr_DAT_008ae9c4 = __sp + 0;
  const __addr_DAT_00887422 = __sp + 4;
  const __addr_DAT_008ae9c5 = __sp + 8;
  const __addr_DAT_00887498 = __sp + 12;
  const __addr_DAT_0088747e = __sp + 16;
  const __addr_DAT_00743be4 = __sp + 20;
  const __addr_DAT_008ae9ce = __sp + 24;
  const __addr_DAT_008ae9cf = __sp + 28;
  const __addr_DAT_00743bdf = __sp + 32;
  const __addr_DAT_008ae9cc = __sp + 36;
  const __addr_DAT_008ae9d0 = __sp + 40;
  const __addr_DAT_008afc90 = __sp + 44;
  const __addr_DAT_00743bbc = __sp + 48;
  const __addr_DAT_00743ba6 = __sp + 52;
  const __addr_DAT_008b0f50 = __sp + 56;
  const __addr_DAT_008b2210 = __sp + 60;
  const __addr_DAT_008ae9ca = __sp + 64;
  try {
  let bVar1 = 0;
  let sVar2 = 0;
  let bVar3 = 0;
  let extraout_DX = 0;
  let sVar4 = 0;
  let uVar5 = 0;
  let iVar6 = 0;
  let iVar7 = 0;
  let uVar8 = 0;
  let iVar9 = 0;
  let uVar10 = 0;
  let iVar11 = 0;
  bVar3 = 0;
  do {
    uVar10 = bVar3;
    iVar11 = uVar10 * 0x4b0c;
    bVar1 = heap.u32((__addr_DAT_008ae9c4) + (iVar11) * 4);
    if ((bVar1 != 0xff) && (iVar7 = bVar1 * 0x260, (heap.u32((__addr_DAT_00887422) + (bVar1 * 0x130) * 4) & 1) != 0)) {
      if ((heap.u32((__addr_DAT_008ae9c5) + (iVar11) * 4) & 1) == 0) {
        for (iVar6 = 0; iVar6 < heap.u32((__addr_DAT_00887498) + (iVar7) * 4); iVar6 = iVar6 + 1) {
          if ((heap.u32((__addr_DAT_0088747e + iVar6 * 2 + iVar7)) != 0xffff) && (iVar9 = heap.u32((__addr_DAT_0088747e + iVar6 * 2 + iVar7)) * 0x100, heap.u32((__addr_DAT_00743be4) + (iVar9) * 4) == '\x03')) {
            heap.setU32(((__addr_DAT_008ae9ce) + (iVar11) * 4), (iVar6) >>> 0);
            heap.setU32(((__addr_DAT_008ae9cf) + (iVar11) * 4), (heap.u32((__addr_DAT_00743bdf) + (iVar9) * 4)) >>> 0);
            heap.setU32(((__addr_DAT_008ae9c5) + (iVar11) * 4), (heap.u32((__addr_DAT_008ae9c5) + (iVar11) * 4) | 1) >>> 0);
            heap.setU32(((__addr_DAT_008ae9c5) + (iVar11) * 4), (heap.u32((__addr_DAT_008ae9c5) + (iVar11) * 4) & 0xfd) >>> 0);
            /* goto LAB_00450bd4 */ throw new Error("goto LAB_00450bd4 not supported");
          }
        }
      } else {
        LAB_00450bd4: uVar5 = heap.u32((__addr_DAT_0088747e + heap.u32((__addr_DAT_008ae9ce) + (iVar11) * 4) * 2 + iVar7));
        if (uVar5 != 0xffff) {
          iVar6 = uVar5 * 0x100;
          uVar8 = heap.u32((__addr_DAT_008ae9cc) + (uVar10 * 0x2586) * 4);
          if ((heap.u32((__addr_DAT_008ae9c5) + (iVar11) * 4) & 2) != 0) {
            if (heap.u32((__addr_DAT_00743be4) + (iVar6) * 4) != '\x03') {
              /* goto LAB_00450d74 */ throw new Error("goto LAB_00450d74 not supported");
            }
            heap.setU32(((__addr_DAT_008ae9c5) + (iVar11) * 4), (heap.u32((__addr_DAT_008ae9c5) + (iVar11) * 4) & 0xfd) >>> 0);
            if (heap.u32((__addr_DAT_00743bdf) + (iVar6) * 4) == heap.u32((__addr_DAT_008ae9cf) + (iVar11) * 4)) {
              heap.setU32(((__addr_DAT_008ae9cc) + (uVar10 * 0x2586) * 4), (0) >>> 0);
              uVar8 = 0;
            }
          }
          if (heap.u32((__addr_DAT_00743be4) + (iVar6) * 4) == '\x06') {
            heap.setU32(((__addr_DAT_008ae9c5) + (iVar11) * 4), (heap.u32((__addr_DAT_008ae9c5) + (iVar11) * 4) | 2) >>> 0);
          } else {
            if (uVar8 < 0x12c0) {
              if ((heap.u32((__addr_DAT_008ae9c5) + (iVar11) * 4) & 4) != 0) {
                sVar2 = FUN_005d9220(heap, uVar8, iVar7);
                sVar2 = sVar2 >>> 3;
                sVar4 = extraout_DX >>> 3;
                if (sVar2 < -0x7e) {
                  sVar2 = -0x7f;
                }
                if (0x7e < sVar2) {
                  sVar2 = 0x7f;
                }
                if (sVar4 < -0x7e) {
                  sVar4 = -0x7f;
                }
                if (0x7e < sVar4) {
                  sVar4 = 0x7f;
                }
                if ((heap.u32(0x006e3b84) & 1) == 0) {
                  heap.setU32(((__addr_DAT_008ae9d0) + (iVar11 + uVar8) * 4), (sVar2) >>> 0);
                  heap.setU32(((__addr_DAT_008afc90) + (iVar11 + uVar8) * 4), (sVar4) >>> 0);
                } else {
                  heap.setU32(((__addr_DAT_008ae9d0) + (iVar11 + uVar8) * 4), (((sVar2 + heap.u32((__addr_DAT_008ae9d0) + (iVar11 + uVar8) * 4)) >>> 1)) >>> 0);
                  heap.setU32(((__addr_DAT_008afc90) + (iVar11 + uVar8) * 4), (((sVar4 + heap.u32((__addr_DAT_008afc90) + (iVar11 + uVar8) * 4)) >>> 1)) >>> 0);
                }
              }
              iVar7 = heap.u32((__addr_DAT_00743bbc + iVar6)) * 5 >>> 0x10;
              if (iVar7 < 0) {
                iVar7 = -iVar7;
              }
              uVar5 = heap.u32((__addr_DAT_00743ba6) + (uVar5 * 0x80) * 4) >>> 2;
              if (0xfe < uVar5) {
                uVar5 = 0xff;
              }
              if ((heap.u32(0x006e3b84) & 1) == 0) {
                heap.setU32(((__addr_DAT_008b0f50) + (iVar11 + uVar8) * 4), (iVar7) >>> 0);
                heap.setU32(((__addr_DAT_008b2210) + (iVar11 + uVar8) * 4), (uVar5) >>> 0);
              } else {
                heap.setU32(((__addr_DAT_008b0f50) + (iVar11 + uVar8) * 4), (((iVar7 + heap.u32((__addr_DAT_008b0f50) + (iVar11 + uVar8) * 4)) >>> 1)) >>> 0);
                heap.setU32(((__addr_DAT_008b2210) + (iVar11 + uVar8) * 4), (((uVar5 + heap.u32((__addr_DAT_008b2210) + (iVar11 + uVar8) * 4)) >>> 1)) >>> 0);
              }
              if (((heap.u32(0x006e3b84) & 1) != 0) && (uVar5 = uVar8 + 1, heap.u32((__addr_DAT_008ae9ca) + (uVar10 * 0x2586) * 4) < uVar5)) {
                heap.setU32(((__addr_DAT_008ae9ca) + (uVar10 * 0x2586) * 4), (uVar5) >>> 0);
              }
            }
            if ((heap.u32(0x006e3b84) & 1) != 0) {
              heap.setU32(((__addr_DAT_008ae9cc) + (uVar10 * 0x2586) * 4), (heap.u32((__addr_DAT_008ae9cc) + (uVar10 * 0x2586) * 4) + 1) >>> 0);
            }
          }
        }
      }
    }
    LAB_00450d74: bVar3 = bVar3 + 1;
    if (7 < bVar3) {
      return;
    }
  } while (true);
} finally {
    heap.freeFrame(68);
  }
}
