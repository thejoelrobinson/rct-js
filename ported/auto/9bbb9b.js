// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9bbb9b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22, CONCAT31 } from "../runtime/win32.js";
import { FUN_00408342 } from "./408342.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_004083e1 } from "./4083e1.js";
import { FUN_00458bcf } from "./458bcf.js";
export function FUN_009bbb9b(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_0099a888 = __sp + 0;
  const __addr_DAT_005f8da3 = __sp + 4;
  const __addr_DAT_00981efc = __sp + 8;
  const __addr_DAT_00981efd = __sp + 12;
  const __addr_DAT_005f2000 = __sp + 16;
  try {
  let cVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  let iVar5 = 0;
  let uVar6 = 0;
  let sVar7 = 0;
  let cVar8 = 0;
  let uVar9 = 0;
  sVar2 = 1;
  while (true) {
    pcVar12 = __addr_DAT_0099a888;
    pcVar10 = __addr_DAT_005f8da3;
    heap.u16(0x971e86) = sVar2;
    do {
      cVar1 = heap.u32(pcVar10);
      heap.u32(pcVar12) = cVar1;
      pcVar10 = pcVar10 + 1;
      pcVar12 = pcVar12 + 1;
    } while (cVar1 != '\0');
    FUN_00458bcf(heap);
    iVar4 = FUN_004083b5(heap, __addr_DAT_0099a888);
    if (iVar4 == -1) {
      break;
    }
    FUN_00408387(heap, iVar4);
    sVar2 = sVar2 + 1;
  }
  iVar4 = FUN_004083e1(heap, __addr_DAT_0099a888);
  if (iVar4 != -1) {
    puVar11 = __addr_DAT_00981efc;
    sVar7 = 0x80;
    heap.setU32(0x009a2004, (iVar4) >>> 0);
    do {
      heap.u32(puVar11) = 0;
      puVar11 = puVar11 + 1;
      sVar7 = sVar7 + -1;
    } while (sVar7 != 0);
    heap.setU32(0x00981efc, (0x801050a) >>> 0);
    heap.setU32(0x00981f04, (CONCAT22(heap, heap.u32(0x00971ed8) - 1, heap.u32(0x00971ed6) - 1)) >>> 0);
    heap.setU32(0x00981f08, (0x400040) >>> 0);
    heap.setU32(0x00981f3c, (CONCAT22(heap, heap.u32(0x00971ed6), 0x100)) >>> 0);
    iVar4 = FUN_00408342(heap, heap.u32(0x009a2004), __addr_DAT_00981efc, 0x80);
    if (iVar4 != -1) {
      pcVar12 = __addr_DAT_00981efc;
      uVar9 = heap.u32(0x00971ed6);
      iVar4 = heap.u32(0x00971ed8) * uVar9;
      pcVar10 = heap.u32(0x0099fb7c);
      while (true) {
        if (uVar9 == 0) {
          pcVar10 = pcVar10 + (ushort)((heap.u32(0x0099fb88) - heap.u32(0x00971ed6)) + heap.u32(0x0099fb84));
          uVar9 = heap.u32(0x00971ed6);
        }
        if (iVar4 == 0) {
          break;
        }
        if (0x991e97 < pcVar12) {
          iVar5 = FUN_00408342(heap, heap.u32(0x009a2004), __addr_DAT_00981efc, pcVar12 + -0x981efc);
          if (iVar5 == -1) {
            /* goto LAB_009bbdb0 */ throw new Error("goto LAB_009bbdb0 not supported");
          }
          pcVar12 = __addr_DAT_00981efc;
        }
        cVar1 = heap.u32(pcVar10);
        pcVar10 = pcVar10 + 1;
        iVar4 = iVar4 + -1;
        uVar9 = uVar9 - 1;
        uVar3 = CONCAT11(heap, cVar1, cVar1) & 0xc0ff;
        cVar1 = uVar3;
        if (((uVar3 >>> 8) == -0x40) || ((uVar9 != 0 && (cVar1 == heap.u32(pcVar10))))) {
          cVar8 = -0x3f;
          for (; ((uVar9 != 0 && (cVar8 != -1)) && (cVar1 == heap.u32(pcVar10))); pcVar10 = pcVar10 + 1) {
            iVar4 = iVar4 + -1;
            uVar9 = uVar9 - 1;
            cVar8 = cVar8 + '\x01';
          }
          heap.u32(pcVar12) = cVar8;
          heap.u32(pcVar12 + (1) * 4) = cVar1;
          pcVar12 = pcVar12 + 2;
        } else {
          heap.u32(pcVar12) = cVar1;
          pcVar12 = pcVar12 + 1;
        }
      }
      if (pcVar12 + -0x981efc != 0x0) {
        iVar4 = FUN_00408342(heap, heap.u32(0x009a2004), __addr_DAT_00981efc, pcVar12 + -0x981efc);
        if (iVar4 == -1) {
          /* goto LAB_009bbdb0 */ throw new Error("goto LAB_009bbdb0 not supported");
        }
      }
      heap.setU32(0x00981efc, (CONCAT31(heap, heap.u32(0x00981efd), 0xc)) >>> 0);
      puVar13 = __addr_DAT_00981efd;
      puVar11 = __addr_DAT_005f2000;
      sVar7 = 0x100;
      do {
        heap.u32(puVar13 + (2) * 4) = heap.u32(puVar11);
        heap.u32(puVar13 + (1) * 4) = heap.u32(puVar11 + (1) * 4);
        heap.u32(puVar13) = heap.u32(puVar11 + (2) * 4);
        puVar11 = puVar11 + 4;
        puVar13 = puVar13 + 3;
        sVar7 = sVar7 + -1;
      } while (sVar7 != 0);
      iVar4 = FUN_00408342(heap, heap.u32(0x009a2004), __addr_DAT_00981efc, 0x301);
      if (iVar4 != -1) {
        iVar4 = FUN_00408387(heap, heap.u32(0x009a2004));
        if (iVar4 != -1) {
          uVar6 = (undefined2)(iVar4 >>> 0x10);
          /* goto LAB_009bbdbf */ throw new Error("goto LAB_009bbdbf not supported");
        }
        /* goto LAB_009bbdbe */ throw new Error("goto LAB_009bbdbe not supported");
      }
    }
    LAB_009bbdb0: iVar4 = FUN_00408387(heap, heap.u32(0x009a2004));
  }
  LAB_009bbdbe: uVar6 = (undefined2)(iVar4 >>> 0x10);
  LAB_009bbdbf: return CONCAT22(heap, uVar6, sVar2);
} finally {
    heap.freeFrame(20);
  }
}
