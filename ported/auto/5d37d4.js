// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d37d4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { UNLOCK } from "../runtime/win32.js";
import { CONCAT11, CONCAT44, LOCK } from "../runtime/ghidra-builtins.js";
import { FUN_0042693f } from "./42693f.js";
import { FUN_00436795 } from "./436795.js";
import { FUN_00448331 } from "./448331.js";
import { FUN_00448bb1 } from "./448bb1.js";
import { FUN_00448bbc } from "./448bbc.js";
import { FUN_005e5562 } from "./5e5562.js";
export function FUN_005d37d4(heap) {
  const __sp = heap.allocFrame(44);
  const __addr_DAT_00887420 = __sp + 0;
  const __addr_DAT_0088744a = __sp + 4;
  const __addr_DAT_00971ef4 = __sp + 8;
  const __addr_DAT_006559d8 = __sp + 12;
  const __addr_DAT_005f5b78 = __sp + 16;
  const __addr_DAT_00652478 = __sp + 20;
  const __addr_DAT_0065247a = __sp + 24;
  const __addr_PTR_DAT_00652498 = __sp + 28;
  const __addr_DAT_006522f6 = __sp + 32;
  const __addr_DAT_00887462 = __sp + 36;
  const __addr_DAT_0088746a = __sp + 40;
  try {
  let sVar2 = 0;
  let bVar3 = 0;
  let bVar4 = 0;
  let sVar5 = 0;
  let uVar6 = 0;
  let sVar7 = 0;
  let in_EAX = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let sVar10 = 0;
  let uVar11 = 0;
  let in_EDX = 0;
  let uVar13 = 0;
  let uVar14 = 0;
  let uVar18 = 0;
  heap.setU32(0x00652308, (in_EDX) >>> 0);
  uVar18 = in_EDX & 0xff;
  pbVar19 = __addr_DAT_00887420 + uVar18 * 0x260;
  if (heap.u32(pbVar19) != 0x14) {
    uVar13 = 0;
    do {
      uVar8 = heap.u32((__addr_DAT_0088744a) + (uVar18 * 0x130 + uVar13) * 4);
      if (uVar8 != 0xffff) {
        uVar6 = (uVar8 & 0xff) << 5;
        uVar8 = (uVar8 >>> 8) << 5;
        bVar3 = heap.u32(pbVar19 + (uVar13 + 0x32) * 4);
        while (true) {
          uVar9 = uVar8 << 7 | uVar8 >>> 9 | uVar6;
          pbVar12 = heap.u32((__addr_DAT_00971ef4) + ((uVar9 >>> 5 | uVar9 << 0xb)) * 4);
          while (((bVar3 != heap.u32(pbVar12 + (2) * 4) || (bVar4 = heap.u32(pbVar12), (bVar4 & 0x3c) != 8)) || (heap.u32(pbVar12 + (7) * 4) != heap.u32(0x00652308))) || (((heap.u32(pbVar12 + (5) * 4) & 0xf) != 0 || ((heap.u32((__addr_DAT_006559d8) + (heap.u32(pbVar12 + (4) * 4) * 0x10) * 4) & 0x10) == 0)))) {
            pbVar1 = pbVar12 + 1;
            pbVar12 = pbVar12 + 8;
            if ((heap.u32(pbVar1) & 0x80) != 0) {
              /* goto LAB_005d396a */ throw new Error("goto LAB_005d396a not supported");
            }
          }
          uVar9 = CONCAT11(heap.u32(pbVar12 + (5) * 4), uVar13 << 4) & 0x8fff;
          heap.u32(pbVar12 + (5) * 4) = uVar9 | (byte)(uVar9 >>> 8);
          if ((heap.u32((__addr_DAT_005f5b78 + heap.u32(pbVar19) * 8)) & 8) != 0) {
            break;
          }
          uVar14 = bVar4 & 3;
          uVar6 = uVar6 - heap.u32((__addr_DAT_00652478) + (uVar14 * 2) * 4);
          uVar8 = uVar8 - heap.u32((__addr_DAT_0065247a) + (uVar14 * 2) * 4);
        }
        pcVar20 = heap.u32((__addr_PTR_DAT_00652498) + (heap.u32(pbVar12 + (4) * 4)) * 4);
        while (heap.u32(pcVar20 + (10) * 4) != -1) {
          sVar2 = heap.u32((pcVar20 + 0xb));
          sVar5 = heap.u32((pcVar20 + 0xd));
          sVar7 = sVar2;
          sVar10 = sVar5;
          switch (bVar4 & 3) {
            case 1:
              sVar10 = -sVar2;
              sVar7 = sVar5;
              break;
            case 2:
              sVar10 = -sVar5;
              sVar7 = -sVar2;
              break;
            case 3:
              sVar7 = -sVar5;
              sVar10 = sVar2;
          }
          uVar9 = (sVar10 + uVar8) * 0x80 | (sVar10 + uVar8) >>> 9 | sVar7 + uVar6;
          pbVar12 = heap.u32((__addr_DAT_00971ef4) + ((uVar9 >>> 5 | uVar9 << 0xb)) * 4);
          while (((byte)((heap.u32((pcVar20 + 0xf)) >>> 2) + bVar3) != heap.u32(pbVar12 + (2) * 4) || ((heap.u32(pbVar12) & 0x3c) != 8)) || ((heap.u32((__addr_DAT_006559d8) + (heap.u32(pbVar12 + (4) * 4) * 0x10) * 4) & 0x10) == 0)) {
            pbVar1 = pbVar12 + 1;
            pbVar12 = pbVar12 + 8;
            if ((heap.u32(pbVar1) & 0x80) != 0) {
              /* goto LAB_005d396a */ throw new Error("goto LAB_005d396a not supported");
            }
          }
          uVar9 = CONCAT11(heap.u32(pbVar12 + (5) * 4), uVar13 << 4) & 0x8fff;
          heap.u32(pbVar12 + (5) * 4) = uVar9 | (byte)(uVar9 >>> 8);
          pcVar20 = pcVar20 + 10;
        }
      }
      LAB_005d396a: uVar13 = uVar13 + 1;
    } while (uVar13 < 4);
  }
  uVar13 = 0;
  psVar15 = __addr_DAT_006522f6;
  do {
    LOCK();
    sVar2 = heap.u32((__addr_DAT_00887462) + (uVar18 * 0x130 + uVar13) * 4);
    heap.u32((__addr_DAT_00887462) + (uVar18 * 0x130 + uVar13) * 4) = -1;
    UNLOCK(heap);
    if (sVar2 != -1) {
      heap.u32(psVar15) = sVar2;
      psVar15 = psVar15 + 1;
    }
    LOCK();
    sVar2 = heap.u32((__addr_DAT_0088746a) + (uVar18 * 0x130 + uVar13) * 4);
    heap.u32((__addr_DAT_0088746a) + (uVar18 * 0x130 + uVar13) * 4) = -1;
    UNLOCK(heap);
    if (sVar2 != -1) {
      heap.u32(psVar15) = sVar2;
      psVar15 = psVar15 + 1;
    }
    uVar13 = uVar13 + 1;
  } while (uVar13 < 4);
  heap.u32(psVar15) = -1;
  puVar16 = __addr_DAT_006522f6;
  do {
    uVar8 = heap.u32(puVar16);
    puVar17 = puVar16;
    if (uVar8 == 0xffff) {
      return CONCAT44(in_EDX, in_EAX);
    }
    while (puVar17 = puVar17 + 1, heap.u32(puVar17) != 0xffff) {
      if (uVar8 == heap.u32(puVar17)) {
        /* goto LAB_005d3b25 */ throw new Error("goto LAB_005d3b25 not supported");
      }
    }
    uVar6 = (uVar8 & 0xff) * 0x20;
    uVar9 = (uVar8 >>> 8) * 0x20;
    pbVar19 = heap.u32((__addr_DAT_00971ef4) + ((((uVar8 >>> 8) << 0xc | uVar6) >>> 5 | (uVar9 >>> 9) << 0xb)) * 4);
    do {
      if ((((heap.u32(pbVar19) & 0x3c) == 0x10) && (heap.u32(0x00652308) == heap.u32(pbVar19 + (7) * 4))) && (heap.u32(pbVar19 + (4) * 4) < 2)) {
        uVar13 = heap.u32(pbVar19) & 3;
        uVar11 = uVar9 + heap.u32((__addr_DAT_0065247a) + (uVar13 * 2) * 4);
        uVar11 = uVar11 * 0x80 | uVar11 >>> 9 | uVar6 + heap.u32((__addr_DAT_00652478) + (uVar13 * 2) * 4);
        pbVar12 = heap.u32((__addr_DAT_00971ef4) + ((uVar11 >>> 5 | uVar11 << 0xb)) * 4);
        do {
          if ((((heap.u32(pbVar12) & 0x3c) == 8) && (heap.u32(0x00652308) == heap.u32(pbVar12 + (7) * 4))) && ((heap.u32(pbVar19 + (2) * 4) == heap.u32(pbVar12 + (2) * 4) && ((heap.u32((byte)(__addr_DAT_006559d8) + (heap.u32(pbVar12 + (4) * 4) << 4 | heap.u32(pbVar12 + (5) * 4) & 0xf) * 4) >>> ((byte)((uVar13 - heap.u32(pbVar12)) + 2) & 3) & 1) != 0)))) {
            uVar13 = 0;
            if (heap.u32(pbVar12 + (4) * 4) != 0x65) {
              uVar13 = (heap.u32(pbVar12 + (5) * 4) >>> 4);
            }
            uVar13 = uVar13 & 7;
            if (heap.u32(pbVar19 + (4) * 4) == 0) {
              if (heap.u32((__addr_DAT_00887462) + (uVar18 * 0x130 + uVar13) * 4) != -1) {
                break;
              }
              heap.u32((__addr_DAT_00887462) + (uVar18 * 0x130 + uVar13) * 4) = uVar8;
            } else {
              if (heap.u32((__addr_DAT_0088746a) + (uVar18 * 0x130 + uVar13) * 4) != -1) {
                break;
              }
              heap.u32((__addr_DAT_0088746a) + (uVar18 * 0x130 + uVar13) * 4) = uVar8;
            }
            uVar11 = CONCAT11(heap.u32(pbVar19 + (5) * 4), uVar13) & 0x8fff;
            heap.u32(pbVar19 + (5) * 4) = uVar11 << 4 | (byte)(uVar11 >>> 8);
            /* goto LAB_005d3b16 */ throw new Error("goto LAB_005d3b16 not supported");
          }
          pbVar1 = pbVar12 + 1;
          pbVar12 = pbVar12 + 8;
        } while ((heap.u32(pbVar1) & 0x80) == 0);
        FUN_00448bb1(heap);
        FUN_0042693f(heap);
        FUN_00448331(heap);
        FUN_00448bbc(heap);
        FUN_005e5562(heap);
        FUN_00436795(heap);
      } else {
        LAB_005d3b16: pbVar19 = pbVar19 + 8;
      }
    } while ((heap.u32(pbVar19 + (-7) * 4) & 0x80) == 0);
    LAB_005d3b25: puVar16 = puVar16 + 1;
  } while (true);
} finally {
    heap.freeFrame(44);
  }
}
