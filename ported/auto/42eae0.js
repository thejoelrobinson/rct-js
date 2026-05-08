// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42eae0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT31 } from "../runtime/win32.js";
import { FUN_0040844b } from "./40844b.js";
import { FUN_00408490 } from "./408490.js";
import { FUN_00427108 } from "./427108.js";
import { FUN_0042edaa } from "./42edaa.js";
import { FUN_0042f4be } from "./42f4be.js";
import { FUN_0042fd81 } from "./42fd81.js";
import { FUN_0042fdf4 } from "./42fdf4.js";
import { FUN_00438a1f } from "./438a1f.js";
export function FUN_0042eae0(heap) {
  const __sp = heap.allocFrame(36);
  const __addr_DAT_005f841b = __sp + 0;
  const __addr_DAT_005f92e7 = __sp + 4;
  const __addr_DAT_005f9313 = __sp + 8;
  const __addr_DAT_005f841c = __sp + 12;
  const __addr_DAT_0099aa88 = __sp + 16;
  const __addr_DAT_005f91d9 = __sp + 20;
  const __addr_DAT_005f8fb3 = __sp + 24;
  const __addr_DAT_0099a888 = __sp + 28;
  const __addr_DAT_005f90c5 = __sp + 32;
  try {
  let cVar2 = 0;
  let uVar3 = 0;
  let bVar5 = 0;
  let iVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let bVar18 = 0;
  pcVar10 = heap.u32(0x00628cb0);
  if (heap.u32(0x00628cb0) == 0xffffffff) {
    if (((heap.u32(0x0099a500) & 1) != 0) && (heap.u32(0x005f8897) != '\0')) {
      heap.setU32(0x005f8897, (0) >>> 0);
      FUN_0042fdf4(heap);
      FUN_00438a1f(heap);
      return;
    }
    return;
  }
  heap.setU32(0x00628cb0, (0xffffffff) >>> 0);
  pcVar13 = __addr_DAT_005f841b;
  while (true) {
    if (heap.u32(pcVar10) == '\0') {
      heap.setU32(0x00628cb0, (0xffffffff) >>> 0);
      return;
    }
    if (heap.u32(pcVar10) != ' ') {
      break;
    }
    pcVar10 = pcVar10 + 1;
  }
  do {
    cVar2 = heap.u32(pcVar10);
    heap.u32(pcVar13) = cVar2;
    pcVar10 = pcVar10 + 1;
    pcVar13 = pcVar13 + 1;
  } while (cVar2 != '\0');
  iVar6 = FUN_0040844b(heap, __addr_DAT_005f841b, __addr_DAT_005f92e7);
  if (iVar6 != -1) {
    pcVar10 = __addr_DAT_005f841b;
    do {
      pcVar10 = pcVar10 + 1;
    } while (heap.u32(pcVar10) != '\0');
    do {
      pcVar13 = pcVar10 + -1;
      if (pcVar13 == __addr_DAT_005f841b) {
        break;
      }
      pcVar1 = pcVar10 + -2;
      pcVar10 = pcVar13;
    } while (heap.u32(pcVar1) != '\\');
    pcVar10 = __addr_DAT_005f9313;
    do {
      cVar2 = heap.u32(pcVar10);
      heap.u32(pcVar13) = cVar2;
      pcVar10 = pcVar10 + 1;
      pcVar13 = pcVar13 + 1;
    } while (cVar2 != '\0');
    FUN_00408490(heap, iVar6);
  }
  pbVar11 = __addr_DAT_005f841b;
  puVar16 = __addr_DAT_005f841b;
  do {
    puVar14 = (puVar16 + 1);
    uVar8 = heap.u32(puVar16);
    puVar16 = puVar14;
  } while (uVar8 != '\0');
  do {
    puVar14 = (puVar14 + -1);
    if (puVar14 < __addr_DAT_005f841c) {
      return;
    }
  } while (heap.u32(puVar14) != '.');
  uVar8 = heap.u32(puVar14);
  bVar5 = uVar8;
  if ((0x60 < bVar5) && (bVar5 < 0x7b)) {
    uVar8 = CONCAT31(heap, (int3)(uVar8 >>> 8), bVar5 - 0x20);
  }
  uVar7 = uVar8 >>> 8 | uVar8 << 0x18;
  bVar5 = (byte)(uVar8 >>> 8);
  if ((0x60 < bVar5) && (bVar5 < 0x7b)) {
    uVar7 = CONCAT31(heap, (int3)(uVar7 >>> 8), bVar5 - 0x20);
  }
  uVar8 = uVar7 >>> 8 | uVar7 << 0x18;
  bVar5 = (byte)(uVar7 >>> 8);
  if ((0x60 < bVar5) && (bVar5 < 0x7b)) {
    uVar8 = CONCAT31(heap, (int3)(uVar8 >>> 8), bVar5 - 0x20);
  }
  uVar7 = uVar8 >>> 8 | uVar8 << 0x18;
  bVar5 = (byte)(uVar8 >>> 8);
  if ((0x60 < bVar5) && (bVar5 < 0x7b)) {
    uVar7 = CONCAT31(heap, (int3)(uVar7 >>> 8), bVar5 - 0x20);
  }
  uVar8 = uVar7 >>> 8 | uVar7 << 0x18;
  if (uVar8 == heap.u32(0x005f92db)) {
    heap.setU32(0x00628cb9, (0) >>> 0);
    pbVar12 = __addr_DAT_0099aa88;
    pbVar15 = __addr_DAT_005f91d9;
    do {
      bVar5 = heap.u32(pbVar11);
      heap.u32(pbVar12) = bVar5;
      heap.u32(pbVar15) = bVar5;
      pbVar11 = pbVar11 + 1;
      pbVar12 = pbVar12 + 1;
      pbVar15 = pbVar15 + 1;
    } while (bVar5 != 0);
    FUN_0042f4be(heap);
  } else {
    if (uVar8 == (((0x005f90b4) >>> 96) & 0xffffffff)) {
      heap.setU32(0x00628cb9, (0) >>> 0);
      pbVar15 = __addr_DAT_0099aa88;
      do {
        bVar5 = heap.u32(pbVar11);
        heap.u32(pbVar15) = bVar5;
        pbVar11 = pbVar11 + 1;
        pbVar15 = pbVar15 + 1;
      } while (bVar5 != 0);
      do {
        pbVar15 = pbVar15 + -1;
        if (pbVar15 < __addr_DAT_0099aa88) {
          /* goto LAB_0042ec7e */ throw new Error("goto LAB_0042ec7e not supported");
        }
      } while (heap.u32(pbVar15) != 0x5c);
      pbVar12 = __addr_DAT_005f8fb3;
      pbVar11 = __addr_DAT_0099a888;
      do {
        pbVar9 = pbVar11;
        bVar5 = heap.u32(pbVar12);
        heap.u32(pbVar9) = bVar5;
        pbVar12 = pbVar12 + 1;
        pbVar11 = pbVar9 + 1;
      } while (bVar5 != 0x2a);
      do {
        pbVar15 = pbVar15 + 1;
        bVar5 = heap.u32(pbVar15);
        heap.u32(pbVar9) = bVar5;
        pbVar9 = pbVar9 + 1;
        bVar18 = false;
      } while (bVar5 != 0);
      FUN_0042fd81(heap);
      if (bVar18) {
        FUN_00438a1f(heap);
        return;
      }
      FUN_0042edaa(heap);
      if (!bVar18) {
        FUN_0042fdf4(heap);
        FUN_00438a1f(heap);
        FUN_00427108(heap);
        return;
      }
      LAB_0042ec7e: FUN_00438a1f(heap);
      FUN_00427108(heap);
      return;
    }
    if ((uVar8 == (((0x005f91c6) >>> 72) & 0xffffffff)) || (uVar8 == heap.u32(0x005f91d4))) {
      heap.setU32(0x00628cb9, (0) >>> 0);
      pbVar15 = __addr_DAT_0099aa88;
      do {
        bVar5 = heap.u32(pbVar11);
        heap.u32(pbVar15) = bVar5;
        pbVar11 = pbVar11 + 1;
        pbVar15 = pbVar15 + 1;
      } while (bVar5 != 0);
      do {
        pbVar11 = pbVar15;
        pbVar15 = pbVar11 + -1;
        if (pbVar15 < __addr_DAT_0099aa88) {
          /* goto LAB_0042ed71 */ throw new Error("goto LAB_0042ed71 not supported");
        }
      } while (heap.u32(pbVar15) != 0x5c);
      pbVar12 = __addr_DAT_005f90c5;
      pbVar15 = __addr_DAT_0099a888;
      do {
        bVar5 = heap.u32(pbVar12);
        heap.u32(pbVar15) = bVar5;
        pbVar12 = pbVar12 + 1;
        pbVar9 = pbVar15;
        pbVar15 = pbVar15 + 1;
      } while (bVar5 != 0x2a);
      do {
        pbVar12 = pbVar11;
        pbVar15 = pbVar9;
        bVar5 = heap.u32(pbVar12);
        heap.u32(pbVar15) = bVar5;
        uVar3 = (((0x005f91c6) >>> 72) & 0xffffffff);
        bVar18 = bVar5 < 0x2e;
        if (bVar5 == 0x2e) {
          break;
        }
        bVar18 = false;
        pbVar9 = pbVar15 + 1;
        pbVar11 = pbVar12 + 1;
      } while (bVar5 != 0);
      heap.u32(pbVar15) = (((0x005f91c6) >>> 72) & 0xffffffff);
      heap.u32(pbVar12) = uVar3;
      heap.u32(pbVar15 + (4) * 4) = 0;
      heap.u32(pbVar12 + (4) * 4) = 0;
      FUN_0042edaa(heap);
      if (bVar18) {
        LAB_0042ed71: FUN_00427108(heap);
        return;
      }
      puVar16 = __addr_DAT_0099aa88;
      do {
        uVar8 = heap.u32(puVar16);
        puVar14 = (puVar16 + 1);
        puVar16 = (puVar16 + 1);
      } while (uVar8 != '\0');
      do {
        puVar16 = puVar14;
        puVar14 = (puVar16 + -1);
        if (puVar14 < __addr_DAT_0099aa88) {
          /* goto LAB_0042ed71 */ throw new Error("goto LAB_0042ed71 not supported");
        }
      } while (heap.u32(puVar14) != '\\');
      pcVar10 = __addr_DAT_005f90c5;
      puVar14 = __addr_DAT_0099a888;
      do {
        cVar2 = heap.u32(pcVar10);
        heap.u32(puVar14) = cVar2;
        pcVar10 = pcVar10 + 1;
        puVar4 = puVar14;
        puVar14 = (puVar14 + 1);
      } while (cVar2 != '*');
      do {
        puVar17 = puVar16;
        puVar14 = puVar4;
        cVar2 = heap.u32(puVar17);
        heap.u32(puVar14) = cVar2;
        uVar8 = heap.u32(0x005f91d4);
        if (cVar2 == '.') {
          break;
        }
        puVar4 = (puVar14 + 1);
        puVar16 = (puVar17 + 1);
      } while (cVar2 != '\0');
      heap.u32(puVar14) = heap.u32(0x005f91d4);
      heap.u32(puVar17) = uVar8;
      heap.u32((puVar14 + 1)) = '\0';
      heap.u32((puVar17 + 1)) = '\0';
      FUN_0042edaa(heap);
      FUN_00427108(heap);
      return;
    }
  }
  return;
} finally {
    heap.freeFrame(36);
  }
}
