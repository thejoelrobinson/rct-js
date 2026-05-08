// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5ced51.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT31, CONCAT44 } from "../runtime/win32.js";
import { FUN_005e56d3 } from "./5e56d3.js";
export function FUN_005ced51(heap) {
  let cVar2 = 0;
  let bVar3 = 0;
  let uVar4 = 0;
  let in_EAX = 0;
  let in_CX = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let extraout_CX = 0;
  let cVar10 = 0;
  let in_EDX = 0;
  let iVar8 = 0;
  let iVar9 = 0;
  let extraout_EDX = 0;
  let unaff_EBX = 0;
  let uVar11 = 0;
  let uVar12 = 0;
  let uVar13 = 0;
  let uVar15 = 0;
  let iVar16 = 0;
  let uVar5 = 0;
  heap.setU32(0x00652466, (in_EAX) >>> 0);
  heap.setU32(0x0065246e, (1) >>> 0);
  uVar13 = in_EDX >>> 8 & 0xff;
  uVar15 = unaff_EBX >>> 8 & 0xff;
  iVar16 = uVar15 * 0x260;
  pbVar17 = 0x00887420 + iVar16;
  bVar3 = in_EDX;
  uVar5 = in_EAX;
  uVar11 = unaff_EBX;
  heap.setU32(0x00652468, (in_CX) >>> 0);
  heap.setU32(0x0065246a, (heap.u32(0x00652466)) >>> 0);
  heap.setU32(0x0065246c, (in_CX) >>> 0);
  if ((heap.u32((0x005f5b78 + (uint) * pbVar17 * 8)) & 8) == 0) {
    LAB_005ced9f: uVar4 = uVar5 - heap.u32((0x00652478) + (uVar13 * 2) * 4);
    uVar5 = uVar4;
    uVar6 = heap.u32(0x00652468) - heap.u32((0x0065247a) + (uVar13 * 2) * 4);
    uVar7 = uVar6 * 0x80 | uVar6 >>> 9 | uVar4;
    puVar14 = heap.u32((0x00971ef4) + ((ushort)(uVar7 >>> 5 | uVar7 << 0xb)) * 4);
    do {
      cVar10 = (in_EDX >>> 8);
      if ((((bVar3 == heap.u32(puVar14 + (2) * 4)) && (uVar11 = CONCAT31(heap, (int3)(uVar11 >>> 8), heap.u32(puVar14)) & 0xffffff3c, uVar11 == '\b')) && (uVar11 = CONCAT31(heap, (int3)(uVar11 >>> 8), heap.u32(puVar14)) & 0xffffff03, uVar11 == cVar10)) && ((uVar11 >>> 8) == heap.u32(puVar14 + (7) * 4))) {
        cVar2 = heap.u32(puVar14 + (4) * 4);
        uVar11 = CONCAT31(heap, (int3)(uVar11 >>> 8), cVar2);
        if ((cVar2 == '\x02') || (cVar2 == '\x03')) {
          /* goto LAB_005cee2b */ throw new Error("goto LAB_005cee2b not supported");
        }
        if (cVar2 == '\x01') {
          /* goto code_r0x005cedf5 */ throw new Error("goto code_r0x005cedf5 not supported");
        }
      }
      pbVar1 = puVar14 + 1;
      puVar14 = puVar14 + 8;
    } while ((heap.u32(pbVar1) & 0x80) == 0);
    /* goto LAB_005cee5d */ throw new Error("goto LAB_005cee5d not supported");
  }
  heap.setU32(0x00652468, (in_CX) >>> 0);
  if (3 < heap.u32((byte)(0x00887497) + (iVar16) * 4)) {
    LAB_005cf0b8: heap.setU32(0x00991efc, (0x3d4) >>> 0);
    return CONCAT44(heap, in_EDX, in_EAX);
  }
  if ((unaff_EBX & 1) != 0) {
    iVar8 = -1;
    do {
      iVar9 = iVar8;
      iVar8 = iVar9 + 1;
    } while (heap.u32((0x0088744a) + (uVar15 * 0x130 + iVar8) * 4) != -1);
    heap.u32((0x0088744a) + (uVar15 * 0x130 + iVar8) * 4) = CONCAT11(heap, (in_CX >>> 5), (heap.u32(0x00652466) >>> 5));
    heap.u32(pbVar17 + (iVar9 + 0x33) * 4) = bVar3;
    heap.u32(pbVar17 + (iVar9 + 0x3b) * 4) = 1;
    heap.u32(pbVar17 + (iVar9 + 0x37) * 4) = 0;
    heap.u32((0x00887497) + (iVar16) * 4) = heap.u32((0x00887497) + (iVar16) * 4) + '\x01';
  }
  LAB_005cf068: return CONCAT44(heap, in_EDX, in_EAX);
  code_r0x005cedf5: if ((unaff_EBX & 1) != 0) {
    iVar8 = -1;
    do {
      do {
        iVar9 = iVar8;
        iVar8 = iVar9 + 1;
      } while (CONCAT11(heap, (uVar6 >>> 5), (uVar4 >>> 5)) != heap.u32((0x0088744a) + (uVar15 * 0x130 + iVar8) * 4));
    } while (bVar3 != heap.u32(pbVar17 + (iVar9 + 0x33) * 4));
    heap.u32((0x0088744a) + (uVar15 * 0x130 + iVar8) * 4) = 0xffff;
    heap.u32((0x00887497) + (iVar16) * 4) = heap.u32((0x00887497) + (iVar16) * 4) + -1;
  }
  LAB_005cee2b: heap.setU32(0x0065246e, (heap.u32(0x0065246e) + 1) >>> 0);
  heap.setU32(0x00652466, (uVar4) >>> 0);
  heap.setU32(0x00652468, (uVar6) >>> 0);
  /* goto LAB_005ced9f */ throw new Error("goto LAB_005ced9f not supported");
  LAB_005cee5d: uVar4 = heap.u32(0x0065246a) + heap.u32((0x00652478) + (uVar13 * 2) * 4);
  uVar6 = heap.u32(0x0065246c) + heap.u32((0x0065247a) + (uVar13 * 2) * 4);
  uVar7 = uVar6 * 0x80 | uVar6 >>> 9 | uVar4;
  puVar14 = heap.u32((0x00971ef4) + ((ushort)(uVar7 >>> 5 | uVar7 << 0xb)) * 4);
  do {
    if (((bVar3 == heap.u32(puVar14 + (2) * 4)) && (uVar11 = CONCAT31(heap, (int3)(uVar11 >>> 8), heap.u32(puVar14)) & 0xffffff3c, uVar11 == '\b')) && ((uVar11 = CONCAT31(heap, (int3)(uVar11 >>> 8), heap.u32(puVar14)) & 0xffffff03, uVar11 == cVar10 && ((uVar11 >>> 8) == heap.u32(puVar14 + (7) * 4))))) {
      cVar2 = heap.u32(puVar14 + (4) * 4);
      uVar11 = CONCAT31(heap, (int3)(uVar11 >>> 8), cVar2);
      if ((cVar2 == '\x02') || (cVar2 == '\x03')) {
        /* goto LAB_005ceee9 */ throw new Error("goto LAB_005ceee9 not supported");
      }
      if (cVar2 == '\x01') {
        /* goto code_r0x005ceeb3 */ throw new Error("goto code_r0x005ceeb3 not supported");
      }
    }
    pbVar1 = puVar14 + 1;
    puVar14 = puVar14 + 8;
  } while ((heap.u32(pbVar1) & 0x80) == 0);
  if (((heap.u32(0x00652466) == heap.u32(0x0065246a)) && (heap.u32(0x00652468) == heap.u32(0x0065246c))) && (3 < heap.u32((byte)(0x00887497) + (iVar16) * 4))) {
    /* goto LAB_005cf0b8 */ throw new Error("goto LAB_005cf0b8 not supported");
  }
  if (0xc < heap.u32(0x0065246e)) {
    heap.setU32(0x00991efc, (0x456) >>> 0);
    return CONCAT44(heap, in_EDX, in_EAX);
  }
  uVar5 = in_EDX;
  uVar4 = heap.u32(0x0065246a);
  uVar6 = heap.u32(0x0065246c);
  if ((unaff_EBX & 1) == 0) {
    /* goto LAB_005cf068 */ throw new Error("goto LAB_005cf068 not supported");
  }
  LAB_005cef5b: uVar7 = uVar6 << 7 | uVar6 >>> 9 | uVar4;
  puVar14 = heap.u32((0x00971ef4) + ((ushort)(uVar7 >>> 5 | uVar7 << 0xb)) * 4);
  do {
    if (((uVar5 == heap.u32(puVar14 + (2) * 4)) && (uVar11 = CONCAT31(heap, (int3)(uVar11 >>> 8), heap.u32(puVar14)) & 0xffffff3c, uVar11 == '\b')) && ((uVar11 = CONCAT31(heap, (int3)(uVar11 >>> 8), heap.u32(puVar14)) & 0xffffff03, uVar11 == (uVar5 >>> 8) && ((uVar11 >>> 8) == heap.u32(puVar14 + (7) * 4))))) {
      cVar10 = heap.u32(puVar14 + (4) * 4);
      uVar12 = (undefined3)(uVar11 >>> 8);
      uVar11 = CONCAT31(heap, uVar12, cVar10);
      if (((cVar10 == '\x02') || (cVar10 == '\x03')) || (cVar10 == '\x01')) {
        /* goto LAB_005cefb5 */ throw new Error("goto LAB_005cefb5 not supported");
      }
    }
    puVar14 = puVar14 + 8;
  } while (true);
  code_r0x005ceeb3: if ((unaff_EBX & 1) != 0) {
    iVar8 = -1;
    do {
      do {
        iVar9 = iVar8;
        iVar8 = iVar9 + 1;
      } while (CONCAT11(heap, (uVar6 >>> 5), (uVar4 >>> 5)) != heap.u32((0x0088744a) + (uVar15 * 0x130 + iVar8) * 4));
    } while (bVar3 != heap.u32(pbVar17 + (iVar9 + 0x33) * 4));
    heap.u32((0x0088744a) + (uVar15 * 0x130 + iVar8) * 4) = 0xffff;
    heap.u32((0x00887497) + (iVar16) * 4) = heap.u32((0x00887497) + (iVar16) * 4) + -1;
  }
  LAB_005ceee9: heap.setU32(0x0065246e, (heap.u32(0x0065246e) + 1) >>> 0);
  heap.setU32(0x0065246a, (uVar4) >>> 0);
  heap.setU32(0x0065246c, (uVar6) >>> 0);
  /* goto LAB_005cee5d */ throw new Error("goto LAB_005cee5d not supported");
  LAB_005cefb5: if ((uVar4 == heap.u32(0x0065246a)) && (uVar6 == heap.u32(0x0065246c))) {
    iVar8 = -1;
    do {
      iVar9 = iVar8;
      iVar8 = iVar9 + 1;
    } while (heap.u32((0x0088744a) + (uVar15 * 0x130 + iVar8) * 4) != -1);
    heap.u32((0x0088744a) + (uVar15 * 0x130 + iVar8) * 4) = CONCAT11(heap, (uVar6 >>> 5), (uVar4 >>> 5));
    heap.u32(pbVar17 + (iVar9 + 0x33) * 4) = uVar5;
    heap.u32(pbVar17 + (iVar9 + 0x3b) * 4) = 1;
    heap.u32(pbVar17 + (iVar9 + 0x37) * 4) = heap.u32(0x0065246e);
    heap.u32((0x00887497) + (iVar16) * 4) = heap.u32((0x00887497) + (iVar16) * 4) + '\x01';
    uVar11 = CONCAT31(heap, uVar12, 1);
  } else {
    uVar11 = CONCAT31(heap, uVar12, 3);
    if ((uVar4 == heap.u32(0x00652466)) && (uVar6 == heap.u32(0x00652468))) {
      uVar11 = CONCAT31(heap, uVar12, 2);
    }
  }
  heap.u32(puVar14 + (4) * 4) = uVar11;
  uVar4 = FUN_005e56d3(heap, puVar14);
  if ((uVar4 == heap.u32(0x00652466)) && (extraout_CX == heap.u32(0x00652468))) {
    /* goto LAB_005cf068 */ throw new Error("goto LAB_005cf068 not supported");
  }
  uVar5 = extraout_EDX;
  uVar4 = uVar4 - heap.u32((0x00652478) + (uVar13 * 2) * 4);
  uVar6 = extraout_CX - heap.u32((0x0065247a) + (uVar13 * 2) * 4);
  /* goto LAB_005cef5b */ throw new Error("goto LAB_005cef5b not supported");
}
