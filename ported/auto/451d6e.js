// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/451d6e.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT11, CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { FUN_0042c711 } from "./42c711.js";
import { FUN_00451f42 } from "./451f42.js";
export function FUN_00451d6e(heap) {
  const __sp = heap.allocFrame(24);
  const __addr_DAT_00887420 = __sp + 0;
  const __addr_DAT_005f5b78 = __sp + 4;
  const __addr_DAT_00971ef4 = __sp + 8;
  const __addr_DAT_006559d8 = __sp + 12;
  const __addr_DAT_0065247a = __sp + 16;
  const __addr_DAT_00652478 = __sp + 20;
  try {
  let pbVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let pbVar8 = 0;
  let pbVar9 = 0;
  let pbVar10 = 0;
  let bVar11 = 0;
  pbVar8 = __addr_DAT_00887420;
  heap.setU32(0x00631d55, (0) >>> 0);
  LAB_00451d7a: if (heap.u32(pbVar8) != 0xff) {
    if (heap.u32(pbVar8 + (0x15f) * 4) != 0) {
      heap.setU32((pbVar8 + (0x15f) * 4), (heap.u32(pbVar8 + (0x15f) * 4) - 1) >>> 0);
    }
    if ((heap.u32(pbVar8 + (0x21) * 4) == 1) && (heap.u32(pbVar8 + (0x15f) * 4) == 0)) {
      if ((heap.u32((__addr_DAT_005f5b78 + heap.u32(pbVar8) * 8)) & 0x20000) == 0) {
        uVar6 = 0;
        do {
          if ((heap.u32((pbVar8 + uVar6 * 2 + 0x2a)) != -1) && (((bVar11 = heap.u32((pbVar8 + uVar6 * 2 + 0x42)) != -1, heap.u32((pbVar8 + uVar6 * 2 + 0x42)) != -1 && (FUN_00451f42(heap), bVar11)) || ((bVar11 = heap.u32((pbVar8 + uVar6 * 2 + 0x4a)) != -1, heap.u32((pbVar8 + uVar6 * 2 + 0x4a)) != -1 && (FUN_00451f42(heap), bVar11)))))) {
            /* goto LAB_00451f1a */ throw new Error("goto LAB_00451f1a not supported");
          }
          uVar6 = uVar6 + 1;
        } while (uVar6 < 4);
      } else {
        uVar5 = heap.u32((pbVar8 + 0x2a));
        if (uVar5 != 0xffff) {
          uVar3 = (uVar5 & 0xff) * 0x20;
          uVar4 = (uVar5 >>> 8) * 0x20;
          uVar6 = heap.u32(0x00631d55) << 8;
          pbVar9 = heap.u32((__addr_DAT_00971ef4) + ((((uVar5 >>> 8) << 0xc | uVar3) >>> 5 | (uVar4 >>> 9) << 0xb)) * 4);
          do {
            uVar6 = CONCAT31((int3)(uVar6 >>> 8), heap.u32(pbVar9)) & 0xffffff3c;
            if ((uVar6 == '\b') && ((uVar6 >>> 8) == heap.u32(pbVar9 + (7) * 4))) {
              bVar2 = ((heap.u32((__addr_DAT_006559d8) + (heap.u32(pbVar9 + (4) * 4) * 0x10) * 4) & 0xf) << (heap.u32(pbVar9) & 3));
              uVar6 = CONCAT11(bVar2 >>> 4, bVar2) & 0xffffff0f;
              uVar6 = (uVar6 | (uVar6 >>> 8));
              heap.setU32(0x00631d56, ('\0') >>> 0);
              /* goto LAB_00451e85 */ throw new Error("goto LAB_00451e85 not supported");
            }
            pbVar10 = pbVar9 + 1;
            pbVar9 = pbVar9 + 8;
          } while ((heap.u32(pbVar10) & 0x80) == 0);
        }
      }
    }
  }
  /* goto LAB_00451de9 */ throw new Error("goto LAB_00451de9 not supported");
  LAB_00451e85: uVar7 = 0;
  if (uVar6 != 0) {
    for (; (uVar6 >>> uVar7 & 1) == 0; uVar7 = uVar7 + 1) {
    
    }
  }
  if (uVar6 != 0) {
    uVar6 = uVar6 & ~(1 << (uVar7 & 0x1f));
    uVar7 = uVar7 ^ 2;
    uVar5 = uVar4 - heap.u32((__addr_DAT_0065247a) + (uVar7 * 2) * 4);
    uVar5 = uVar5 * 0x80 | uVar5 >>> 9 | uVar3 - heap.u32((__addr_DAT_00652478) + (uVar7 * 2) * 4);
    pbVar10 = heap.u32((__addr_DAT_00971ef4) + ((uVar5 >>> 5 | uVar5 << 0xb)) * 4);
    do {
      if ((heap.u32(pbVar10) & 0x3c) == 4) {
        if ((heap.u32(pbVar10 + (4) * 4) & 4) == 0) {
          bVar2 = heap.u32(pbVar10 + (2) * 4);
        } else {
          if ((heap.u32(pbVar10 + (4) * 4) & 3) == uVar7) {
          bVar2 = heap.u32(pbVar10 + (2) * 4) + 4;
        } else {
          if ((heap.u32(pbVar10 + (4) * 4) & 3 ^ 2) != uVar7) {
            /* goto LAB_00451eec */ throw new Error("goto LAB_00451eec not supported");
          }
          bVar2 = heap.u32(pbVar10 + (2) * 4);
        }
        }
        if (bVar2 == heap.u32(pbVar9 + (2) * 4)) {
          heap.setU32(0x00631d56, (heap.u32(0x00631d56) + '\x01') >>> 0);
          break;
        }
      }
      LAB_00451eec: pbVar1 = pbVar10 + 1;
      pbVar10 = pbVar10 + 8;
    } while ((heap.u32(pbVar1) & 0x80) == 0);
    /* goto LAB_00451e85 */ throw new Error("goto LAB_00451e85 not supported");
  }
  if (heap.u32(0x00631d56) == '\0') {
    LAB_00451f1a: (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_00451d6e"); })();
    unique0x00017200 = heap.u32((pbVar8 + 0x24));
    FUN_0042c711(heap);
    heap.setU32((pbVar8 + (0x15f) * 4), (3) >>> 0);
    return;
  }
  LAB_00451de9: pbVar8 = pbVar8 + 0x260;
  heap.setU32(0x00631d55, (heap.u32(0x00631d55) + 1) >>> 0);
  if (0x8ad1bf < pbVar8) {
    return;
  }
  /* goto LAB_00451d7a */ throw new Error("goto LAB_00451d7a not supported");
} finally {
    heap.freeFrame(24);
  }
}
