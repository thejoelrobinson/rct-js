// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5ce923.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3, undefined3 } from "../../runtime/win32.js";
import { CONCAT11, CONCAT31, CONCAT44, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { FUN_005e56d3 } from "./5e56d3.js";
export function FUN_005ce923(heap) {
  const __sp = heap.allocFrame(28);
  const __addr_DAT_00887420 = __sp + 0;
  const __addr_DAT_005f5b78 = __sp + 4;
  const __addr_DAT_00971ef4 = __sp + 8;
  const __addr_DAT_0088744a = __sp + 12;
  const __addr_DAT_00887497 = __sp + 16;
  const __addr_DAT_00652478 = __sp + 20;
  const __addr_DAT_0065247a = __sp + 24;
  try {
  let pbVar1 = 0;
  let cVar2 = 0;
  let bVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let in_EAX = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let extraout_CX = 0;
  let in_ECX = 0;
  let cVar12 = 0;
  let in_EDX = 0;
  let iVar10 = 0;
  let iVar11 = 0;
  let extraout_EDX = 0;
  let unaff_EBX = 0;
  let uVar13 = 0;
  let uVar14 = 0;
  let uVar15 = 0;
  let puVar16 = 0;
  let uVar17 = 0;
  let iVar18 = 0;
  let pbVar19 = 0;
  uVar4 = in_EAX;
  uVar7 = in_ECX;
  heap.setU32(0x0065246e, (0) >>> 0);
  heap.setU32(0x0065246f, (0xff) >>> 0);
  uVar15 = in_EDX >>> 8 & 0xff;
  uVar17 = unaff_EBX >>> 8 & 0xff;
  iVar18 = uVar17 * 0x260;
  pbVar19 = __addr_DAT_00887420 + iVar18;
  bVar3 = in_EDX;
  cVar12 = (in_EDX >>> 8);
  uVar6 = in_EAX;
  uVar13 = unaff_EBX;
  heap.setU32(0x00652466, (uVar4) >>> 0);
  heap.setU32(0x00652468, (uVar7) >>> 0);
  heap.setU32(0x0065246a, (uVar4) >>> 0);
  heap.setU32(0x0065246c, (uVar7) >>> 0);
  if ((heap.u32((__addr_DAT_005f5b78 + heap.u32(pbVar19) * 8)) & 8) == 0) {
    LAB_005ce978: uVar9 = in_ECX;
    uVar5 = uVar6;
    uVar8 = uVar9 << 7 | uVar9 >>> 9 | uVar5;
    puVar16 = heap.u32((__addr_DAT_00971ef4) + ((uVar8 >>> 5 | uVar8 << 0xb)) * 4);
    do {
      if (((bVar3 == heap.u32(puVar16 + (2) * 4)) && (uVar13 = CONCAT31((int3)(uVar13 >>> 8), heap.u32(puVar16)) & 0xffffff3c, uVar13 == '\b')) && ((uVar13 = CONCAT31((int3)(uVar13 >>> 8), heap.u32(puVar16)) & 0xffffff03, uVar13 == cVar12 && ((uVar13 >>> 8) == heap.u32(puVar16 + (7) * 4))))) {
        cVar2 = heap.u32(puVar16 + (4) * 4);
        uVar13 = CONCAT31((int3)(uVar13 >>> 8), cVar2);
        if ((cVar2 == '\x02') || (cVar2 == '\x03')) {
          /* goto LAB_005ce9f8 */ throw new Error("goto LAB_005ce9f8 not supported");
        }
        if (cVar2 == '\x01') {
          /* goto code_r0x005ce9c2 */ throw new Error("goto code_r0x005ce9c2 not supported");
        }
      }
      pbVar1 = puVar16 + 1;
      puVar16 = puVar16 + 8;
    } while ((heap.u32(pbVar1) & 0x80) == 0);
    /* goto LAB_005cea3a */ throw new Error("goto LAB_005cea3a not supported");
  }
  uVar5 = uVar7 << 7 | uVar7 >>> 9 | uVar4;
  uVar6 = unaff_EBX;
  puVar16 = heap.u32((__addr_DAT_00971ef4) + ((uVar5 >>> 5 | uVar5 << 0xb)) * 4);
  do {
    if ((((bVar3 == heap.u32(puVar16 + (2) * 4)) && (uVar6 = CONCAT31((int3)(uVar6 >>> 8), heap.u32(puVar16)) & 0xffffff3c, uVar6 == '\b')) && (uVar6 = CONCAT31((int3)(uVar6 >>> 8), heap.u32(puVar16)) & 0xffffff03, uVar6 == cVar12)) && ((uVar6 >>> 8) == heap.u32(puVar16 + (7) * 4))) {
      if ((unaff_EBX & 1) != 0) {
        iVar10 = -1;
        do {
          do {
            iVar11 = iVar10;
            iVar10 = iVar11 + 1;
          } while (CONCAT11((uVar7 >>> 5), (uVar4 >>> 5)) != heap.u32((__addr_DAT_0088744a) + (uVar17 * 0x130 + iVar10) * 4));
        } while (bVar3 != heap.u32(pbVar19 + (iVar11 + 0x33) * 4));
        heap.setU32(((__addr_DAT_0088744a) + (uVar17 * 0x130 + iVar10) * 4), (0xffff) >>> 0);
        heap.setU32(((__addr_DAT_00887497) + (iVar18) * 4), (heap.u32((__addr_DAT_00887497) + (iVar18) * 4) + -1) >>> 0);
      }
      break;
    }
    pbVar1 = puVar16 + 1;
    puVar16 = puVar16 + 8;
  } while ((heap.u32(pbVar1) & 0x80) == 0);
  LAB_005cecb9: return CONCAT44(in_EDX, in_EAX);
  code_r0x005ce9c2: if ((unaff_EBX & 1) != 0) {
    iVar10 = -1;
    do {
      do {
        iVar11 = iVar10;
        iVar10 = iVar11 + 1;
      } while (CONCAT11((in_ECX >>> 5), (uVar5 >>> 5)) != heap.u32((__addr_DAT_0088744a) + (uVar17 * 0x130 + iVar10) * 4));
    } while (bVar3 != heap.u32(pbVar19 + (iVar11 + 0x33) * 4));
    heap.setU32(((__addr_DAT_0088744a) + (uVar17 * 0x130 + iVar10) * 4), (0xffff) >>> 0);
    heap.setU32(((__addr_DAT_00887497) + (iVar18) * 4), (heap.u32((__addr_DAT_00887497) + (iVar18) * 4) + -1) >>> 0);
  }
  LAB_005ce9f8: heap.setU32(0x0065246f, (heap.u32(0x0065246f) + 1) >>> 0);
  uVar6 = (uVar5 - heap.u32((__addr_DAT_00652478) + (uVar15 * 2) * 4));
  in_ECX = (uVar9 - heap.u32((__addr_DAT_0065247a) + (uVar15 * 2) * 4));
  heap.setU32(0x00652466, (uVar5) >>> 0);
  heap.setU32(0x00652468, (uVar9) >>> 0);
  /* goto LAB_005ce978 */ throw new Error("goto LAB_005ce978 not supported");
  LAB_005cea3a: uVar5 = heap.u32(0x0065246a) + heap.u32((__addr_DAT_00652478) + (uVar15 * 2) * 4);
  uVar9 = heap.u32(0x0065246c) + heap.u32((__addr_DAT_0065247a) + (uVar15 * 2) * 4);
  uVar8 = uVar9 * 0x80 | uVar9 >>> 9 | uVar5;
  puVar16 = heap.u32((__addr_DAT_00971ef4) + ((uVar8 >>> 5 | uVar8 << 0xb)) * 4);
  do {
    if ((((bVar3 == heap.u32(puVar16 + (2) * 4)) && (uVar13 = CONCAT31((int3)(uVar13 >>> 8), heap.u32(puVar16)) & 0xffffff3c, uVar13 == '\b')) && (uVar13 = CONCAT31((int3)(uVar13 >>> 8), heap.u32(puVar16)) & 0xffffff03, uVar13 == cVar12)) && ((uVar13 >>> 8) == heap.u32(puVar16 + (7) * 4))) {
      cVar2 = heap.u32(puVar16 + (4) * 4);
      uVar13 = CONCAT31((int3)(uVar13 >>> 8), cVar2);
      if ((cVar2 == '\x02') || (cVar2 == '\x03')) {
        /* goto LAB_005ceac6 */ throw new Error("goto LAB_005ceac6 not supported");
      }
      if (cVar2 == '\x01') {
        /* goto code_r0x005cea90 */ throw new Error("goto code_r0x005cea90 not supported");
      }
    }
    pbVar1 = puVar16 + 1;
    puVar16 = puVar16 + 8;
  } while ((heap.u32(pbVar1) & 0x80) == 0);
  if ((((unaff_EBX & 1) == 0) && ((uVar4 != heap.u32(0x00652466) || (uVar7 != heap.u32(0x00652468))))) && (((uVar4 != heap.u32(0x0065246a) || (uVar7 != heap.u32(0x0065246c))) && (3 < heap.u32((__addr_DAT_00887497) + (iVar18) * 4))))) {
    heap.setU32(0x00991efc, (0x3d4) >>> 0);
    return CONCAT44(in_EDX, in_EAX);
  }
  uVar6 = in_EDX;
  uVar5 = heap.u32(0x0065246a);
  uVar9 = heap.u32(0x0065246c);
  if ((unaff_EBX & 1) == 0) {
    /* goto LAB_005cecb9 */ throw new Error("goto LAB_005cecb9 not supported");
  }
  LAB_005ceb42: if ((uVar5 != uVar4) || (uVar9 != uVar7)) {
    uVar8 = uVar9 << 7 | uVar9 >>> 9 | uVar5;
    puVar16 = heap.u32((__addr_DAT_00971ef4) + ((uVar8 >>> 5 | uVar8 << 0xb)) * 4);
    do {
      if ((((uVar6 == heap.u32(puVar16 + (2) * 4)) && (uVar13 = CONCAT31((int3)(uVar13 >>> 8), heap.u32(puVar16)) & 0xffffff3c, uVar13 == '\b')) && (uVar13 = CONCAT31((int3)(uVar13 >>> 8), heap.u32(puVar16)) & 0xffffff03, uVar13 == (uVar6 >>> 8))) && ((uVar13 >>> 8) == heap.u32(puVar16 + (7) * 4))) {
        cVar12 = heap.u32(puVar16 + (4) * 4);
        uVar14 = (undefined3)(uVar13 >>> 8);
        uVar13 = CONCAT31(uVar14, cVar12);
        if (((cVar12 == '\x02') || (cVar12 == '\x03')) || (cVar12 == '\x01')) {
          /* goto LAB_005cebae */ throw new Error("goto LAB_005cebae not supported");
        }
      }
      puVar16 = puVar16 + 8;
    } while (true);
  }
  /* goto LAB_005cec8a */ throw new Error("goto LAB_005cec8a not supported");
  code_r0x005cea90: if ((unaff_EBX & 1) != 0) {
    iVar10 = -1;
    do {
      do {
        iVar11 = iVar10;
        iVar10 = iVar11 + 1;
      } while (CONCAT11((uVar9 >>> 5), (uVar5 >>> 5)) != heap.u32((__addr_DAT_0088744a) + (uVar17 * 0x130 + iVar10) * 4));
    } while (bVar3 != heap.u32(pbVar19 + (iVar11 + 0x33) * 4));
    heap.setU32(((__addr_DAT_0088744a) + (uVar17 * 0x130 + iVar10) * 4), (0xffff) >>> 0);
    heap.setU32(((__addr_DAT_00887497) + (iVar18) * 4), (heap.u32((__addr_DAT_00887497) + (iVar18) * 4) + -1) >>> 0);
  }
  LAB_005ceac6: heap.setU32(0x0065246e, (heap.u32(0x0065246e) + 1) >>> 0);
  heap.setU32(0x0065246a, (uVar5) >>> 0);
  heap.setU32(0x0065246c, (uVar9) >>> 0);
  /* goto LAB_005cea3a */ throw new Error("goto LAB_005cea3a not supported");
  LAB_005cebae: if (((uVar5 == heap.u32(0x0065246a)) && (uVar9 == heap.u32(0x0065246c))) || (((uVar5 + heap.u32((__addr_DAT_00652478) + (uVar15 * 2) * 4)) == uVar4 && ((uVar9 + heap.u32((__addr_DAT_0065247a) + (uVar15 * 2) * 4)) == uVar7)))) {
    iVar10 = -1;
    do {
      iVar11 = iVar10;
      iVar10 = iVar11 + 1;
    } while (heap.u32((__addr_DAT_0088744a) + (uVar17 * 0x130 + iVar10) * 4) != -1);
    heap.setU32(((__addr_DAT_0088744a) + (uVar17 * 0x130 + iVar10) * 4), (CONCAT11((uVar9 >>> 5), (uVar5 >>> 5))) >>> 0);
    heap.setU32((pbVar19 + (iVar11 + 0x33) * 4), (uVar6) >>> 0);
    heap.setU32((pbVar19 + (iVar11 + 0x3b) * 4), (1) >>> 0);
    bVar3 = heap.u32(0x0065246e);
    LOCK();
    heap.setU32(0x0065246e, (0) >>> 0);
    UNLOCK();
    if (bVar3 == 0) {
      bVar3 = heap.u32(0x0065246f);
    }
    heap.setU32((pbVar19 + (iVar11 + 0x37) * 4), (bVar3) >>> 0);
    heap.setU32(((__addr_DAT_00887497) + (iVar18) * 4), (heap.u32((__addr_DAT_00887497) + (iVar18) * 4) + '\x01') >>> 0);
    uVar13 = CONCAT31(uVar14, 1);
  } else {
    if ((((uVar5 - heap.u32((__addr_DAT_00652478) + (uVar15 * 2) * 4)) == uVar4) && ((uVar9 - heap.u32((__addr_DAT_0065247a) + (uVar15 * 2) * 4)) == uVar7)) || ((uVar13 = CONCAT31(uVar14, 3), uVar5 == heap.u32(0x00652466) && (uVar9 == heap.u32(0x00652468))))) {
    uVar13 = CONCAT31((int3)(uVar13 >>> 8), 2);
  }
  }
  heap.setU32((puVar16 + (4) * 4), (uVar13) >>> 0);
  uVar5 = FUN_005e56d3(heap, puVar16);
  uVar6 = extraout_EDX;
  uVar9 = extraout_CX;
  LAB_005cec8a: if ((uVar5 == heap.u32(0x00652466)) && (uVar9 == heap.u32(0x00652468))) {
    /* goto LAB_005cecb9 */ throw new Error("goto LAB_005cecb9 not supported");
  }
  uVar5 = uVar5 - heap.u32((__addr_DAT_00652478) + (uVar15 * 2) * 4);
  uVar9 = uVar9 - heap.u32((__addr_DAT_0065247a) + (uVar15 * 2) * 4);
  /* goto LAB_005ceb42 */ throw new Error("goto LAB_005ceb42 not supported");
} finally {
    heap.freeFrame(28);
  }
}
