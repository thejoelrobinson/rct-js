// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/441dc1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { FUN_0043fdfb } from "./43fdfb.js";
import { FUN_00441ffd } from "./441ffd.js";
export function FUN_00441dc1(heap) {
  const __sp = heap.allocFrame(40);
  const __addr_DAT_00743b98 = __sp + 0;
  const __addr_DAT_00743bc2 = __sp + 4;
  const __addr_DAT_00743bbe = __sp + 8;
  const __addr_DAT_00743ba0 = __sp + 12;
  const __addr_DAT_00743b94 = __sp + 16;
  const __addr_DAT_00629c7e = __sp + 20;
  const __addr_DAT_006294fe = __sp + 24;
  const __addr_DAT_00629502 = __sp + 28;
  const __addr_DAT_0062940e = __sp + 32;
  const __addr_DAT_00629e5e = __sp + 36;
  try {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let cVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let uVar10 = 0;
  let uVar11 = 0;
  let iVar12 = 0;
  let iVar14 = 0;
  let uVar15 = 0;
  uVar9 = heap.u32(0x0062d2ff);
  if ((uVar9 != heap.u32(0x0062d2f6)) || ((heap.u32(0x00629408) == 0 && ((heap.u32(0x006e3b84) & 0xffffff00) != heap.u32(0x00629404))))) {
    heap.setU32(0x00629408, (0x140) >>> 0);
    heap.setU32(0x0062940a, (0) >>> 0);
    heap.setU32(0x00629404, (heap.u32(0x006e3b84) & 0xffffff00) >>> 0);
    heap.setU32(0x0062d2f6, (uVar9) >>> 0);
    for (uVar10 = heap.u32(0x0087c398); uVar11 = heap.u32(0x0087c398), uVar10 != 0xffff; uVar10 = heap.u32((__addr_DAT_00743b98) + (uVar10 * 0x80) * 4)) {
      iVar12 = uVar10 * 0x100;
      if ((heap.u32((__addr_DAT_00743bc2) + (iVar12) * 4) == '\0') && (heap.u32((__addr_DAT_00743bbe) + (iVar12) * 4) == '\0')) {
        heap.u32((__addr_DAT_00743ba0 + iVar12)) = heap.u32((__addr_DAT_00743ba0 + iVar12)) | 0x100;
      }
    }
    for (; uVar5 = heap.u32(0x0062940a), uVar11 != 0xffff; uVar11 = heap.u32((__addr_DAT_00743b98) + (uVar11 * 0x80) * 4)) {
      iVar12 = uVar11 * 0x100;
      puVar13 = __addr_DAT_00743b94 + iVar12;
      if (((heap.u32((__addr_DAT_00743bc2) + (iVar12) * 4) == '\0') && (heap.u32((__addr_DAT_00743bbe) + (iVar12) * 4) == '\0')) && ((heap.u32((__addr_DAT_00743ba0 + iVar12)) & 0x100) != 0)) {
        if (0xef < heap.u32(0x0062940a)) {
          return;
        }
        heap.setU32(0x0062940a, (heap.u32(0x0062940a) + 1) >>> 0);
        heap.u32((__addr_DAT_00629c7e) + (uVar5) * 4) = 1;
        heap.u32((__addr_DAT_00743ba0 + iVar12)) = heap.u32((__addr_DAT_00743ba0 + iVar12)) & 0xfeff;
        FUN_00441ffd(heap);
        heap.setU32(0x0062d2de, (CONCAT22(heap.u32(0x00971e86), uVar9)) >>> 0);
        heap.u32((__addr_DAT_006294fe + uVar5 * 8)) = heap.u32(0x0062d2de);
        heap.setU32(0x0062d2e2, (ram0x00971e88) >>> 0);
        heap.u32((__addr_DAT_00629502 + uVar5 * 8)) = ram0x00971e88;
        cVar6 = uVar5;
        heap.u32((__addr_DAT_0062940e) + (uVar5) * 4) = cVar6;
        FUN_0043fdfb(heap);
        heap.u32((__addr_DAT_00629e5e) + (uVar5 * 0x38) * 4) = cVar6 + ']';
        iVar12 = uVar5 * 0x38 + 1;
        while (heap.u32((puVar13 + 4)) != 0xffff) {
          iVar14 = heap.u32((puVar13 + 4)) * 0x100;
          puVar13 = __addr_DAT_00743b94 + iVar14;
          if (((heap.u32((__addr_DAT_00743bc2) + (iVar14) * 4) == '\0') && (heap.u32((__addr_DAT_00743bbe) + (iVar14) * 4) == '\0')) && ((heap.u32((__addr_DAT_00743ba0 + iVar14)) & 0x100) != 0)) {
            FUN_00441ffd(heap);
            if (((uVar9 == heap.u32(0x0062d2de)) && (heap.u32(0x00971e86) == heap.u16(0x62d2e0))) && (ram0x00971e88 == heap.u32(0x0062d2e2))) {
              heap.u32((__addr_DAT_00629c7e) + (uVar5) * 4) = heap.u32((__addr_DAT_00629c7e) + (uVar5) * 4) + 1;
              heap.u32((__addr_DAT_00743ba0 + iVar14)) = heap.u32((__addr_DAT_00743ba0 + iVar14)) & 0xfeff;
              if (heap.u32((__addr_DAT_00629c7e) + (uVar5) * 4) < 0x38) {
                FUN_0043fdfb(heap);
                heap.u32((__addr_DAT_00629e5e) + (iVar12) * 4) = cVar6 + ']';
                iVar12 = iVar12 + 1;
              }
            }
          }
        }
        if (heap.u32(0x0062d2de) != 0) {
          uVar15 = 0;
          LAB_00441fad: if (uVar15 < uVar5) {
            if (heap.u32((__addr_DAT_00629c7e) + (uVar5) * 4) <= heap.u32((__addr_DAT_00629c7e) + (uVar15) * 4)) {
              /* goto code_r0x00441fbb */ throw new Error("goto code_r0x00441fbb not supported");
            }
            uVar9 = heap.u32((byte)(__addr_DAT_0062940e) + (uVar5) * 4);
            uVar7 = heap.u32((__addr_DAT_006294fe + uVar5 * 8));
            uVar8 = heap.u32((__addr_DAT_00629502 + uVar5 * 8));
            uVar10 = heap.u32((__addr_DAT_00629c7e) + (uVar5) * 4);
            do {
              LOCK();
              uVar2 = heap.u32((__addr_DAT_00629c7e) + (uVar15) * 4);
              heap.u32((__addr_DAT_00629c7e) + (uVar15) * 4) = uVar10;
              UNLOCK();
              LOCK();
              uVar3 = heap.u32((__addr_DAT_006294fe + uVar15 * 8));
              heap.u32((__addr_DAT_006294fe + uVar15 * 8)) = uVar7;
              UNLOCK();
              LOCK();
              uVar4 = heap.u32((__addr_DAT_00629502 + uVar15 * 8));
              heap.u32((__addr_DAT_00629502 + uVar15 * 8)) = uVar8;
              UNLOCK();
              LOCK();
              bVar1 = heap.u32((__addr_DAT_0062940e) + (uVar15) * 4);
              heap.u32((__addr_DAT_0062940e) + (uVar15) * 4) = uVar9;
              uVar9 = bVar1;
              UNLOCK();
              uVar15 = uVar15 + 1;
              uVar7 = uVar3;
              uVar8 = uVar4;
              uVar10 = uVar2;
            } while (uVar15 <= uVar5);
          }
          /* goto LAB_00441ff3 */ throw new Error("goto LAB_00441ff3 not supported");
        }
        heap.setU32(0x0062940a, (heap.u32(0x0062940a) - 1) >>> 0);
      }
      LAB_00441ff3: 
    }
  }
  return;
  code_r0x00441fbb: uVar15 = uVar15 + 1;
  /* goto LAB_00441fad */ throw new Error("goto LAB_00441fad not supported");
} finally {
    heap.freeFrame(40);
  }
}
