// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/424e0f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00425432 } from "./425432.js";
import { FUN_00426f56 } from "./426f56.js";
import { FUN_0042e48a } from "./42e48a.js";
import { FUN_004314ed } from "./4314ed.js";
import { FUN_005df1ff } from "./5df1ff.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e56d3 } from "./5e56d3.js";
export function FUN_00424e0f(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_00971ef4 = __sp + 0;
  const __addr_DAT_00887420 = __sp + 4;
  const __addr_DAT_008ad1c0 = __sp + 8;
  try {
  let uVar2 = 0;
  let sVar3 = 0;
  let uVar4 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let extraout_CX_01 = 0;
  let bVar5 = 0;
  let uVar6 = 0;
  let bVar7 = 0;
  let iVar8 = 0;
  let bVar12 = 0;
  code_r0x00424e0f: iVar8 = 10;
  LAB_00424e14: uVar6 = ((((((ushort)((heap.u32(0x008d4228) >>> 1 & 1) != 0) << 1 | (ushort)((heap.u32(0x008d4228) >>> 3 & 1) != 0)) << 1 | (ushort)((heap.u32(0x008d4228) >>> 5 & 1) != 0)) << 1 | (ushort)((heap.u32(0x008d4228) >>> 7 & 1) != 0)) << 1 | (ushort)((heap.u32(0x008d4228) >>> 9 & 1) != 0)) << 1 | (ushort)((heap.u32(0x008d4228) >>> 0xb & 1) != 0)) << 1 | (ushort)((heap.u32(0x008d4228) >>> 0xd & 1) != 0);
  uVar2 = (((((((ushort)((heap.u32(0x008d4228) & 1) != 0) << 1 | (ushort)((heap.u32(0x008d4228) >>> 2 & 1) != 0)) << 1 | (ushort)((heap.u32(0x008d4228) >>> 4 & 1) != 0)) << 1 | (ushort)((heap.u32(0x008d4228) >>> 6 & 1) != 0)) << 1 | (ushort)((heap.u32(0x008d4228) >>> 8 & 1) != 0)) << 1 | (ushort)((heap.u32(0x008d4228) >>> 10 & 1) != 0)) << 1 | (ushort)((heap.u32(0x008d4228) >>> 0xc & 1) != 0)) << 5;
  uVar4 = uVar6 << 5;
  pbVar9 = heap.u32((__addr_DAT_00971ef4) + ((ushort)((ushort)(uVar6 << 0xc | uVar2) >>> 5 | (uVar4 >>> 9) << 0xb)) * 4);
  do {
    if ((heap.u32(pbVar9) & 0x3c) == 0) {
      pbVar11 = unaff_EDI;
      if ((heap.u32(pbVar9 + (5) * 4) & 0xe0) != 0) {
        /* goto LAB_00424f60 */ throw new Error("goto LAB_00424f60 not supported");
      }
      bVar5 = (heap.u32(pbVar9 + (5) * 4) & 0x1f) << 2;
      bVar12 = bVar5 < heap.u32(pbVar9 + (2) * 4);
      if (!bVar12 && bVar5 != heap.u32(pbVar9 + (2) * 4)) {
        /* goto LAB_00424f13 */ throw new Error("goto LAB_00424f13 not supported");
      }
      uVar2 = FUN_00425432(heap);
      uVar4 = extraout_CX;
      if (bVar12) {
        /* goto LAB_00424f08 */ throw new Error("goto LAB_00424f08 not supported");
      }
      bVar5 = heap.u32(pbVar9 + (2) * 4);
      bVar7 = bVar5 + 4;
      unaff_EDI = pbVar9;
      if ((heap.u32(pbVar9 + (4) * 4) & 0x10) != 0) {
        bVar7 = bVar5 + 8;
      }
      /* goto LAB_00424eeb */ throw new Error("goto LAB_00424eeb not supported");
    }
    pbVar11 = pbVar9 + 1;
    pbVar9 = pbVar9 + 8;
  } while ((heap.u32(pbVar11) & 0x80) == 0);
  /* goto LAB_00424fb3 */ throw new Error("goto LAB_00424fb3 not supported");
  while ((unaff_EDI = pbVar11 + 8, (heap.u32(unaff_EDI) & 0x3c) == 0x14 || (heap.u32(pbVar11 + (0xb) * 4) <= bVar5)) || (bVar7 < heap.u32(pbVar11 + (10) * 4))) {
    LAB_00424eeb: pbVar11 = unaff_EDI;
    if ((heap.u32(pbVar11 + (1) * 4) & 0x80) != 0) {
      pbVar1 = pbVar9 + 6;
      bVar5 = heap.u32(pbVar1);
      heap.u32(pbVar1) = heap.u32(pbVar1) + 0x10;
      if (bVar5 < 0xf0) {
        /* goto LAB_00424f60 */ throw new Error("goto LAB_00424f60 not supported");
      }
      heap.u32(pbVar9 + (6) * 4) = heap.u32(pbVar9 + (6) * 4) ^ 8;
      if ((heap.u32(pbVar9 + (6) * 4) & 8) != 0) {
        bVar5 = FUN_005df40c(heap);
        heap.u32(pbVar9 + (6) * 4) = heap.u32(pbVar9 + (6) * 4) | bVar5 & 0x70;
        uVar4 = extraout_CX_00;
        /* goto LAB_00424f60 */ throw new Error("goto LAB_00424f60 not supported");
      }
      if ((heap.u32(pbVar9 + (6) * 4) & 7) == 6) {
        /* goto LAB_00424f60 */ throw new Error("goto LAB_00424f60 not supported");
      }
      heap.u32(pbVar9 + (6) * 4) = (heap.u32(pbVar9 + (6) * 4) & 7) + 1;
      /* goto LAB_00424f47 */ throw new Error("goto LAB_00424f47 not supported");
    }
  }
  LAB_00424f08: pbVar11 = unaff_EDI;
  if ((heap.u32(pbVar9 + (6) * 4) & 7) != 1) {
    LAB_00424f13: heap.u32(pbVar9 + (6) * 4) = 1;
    LAB_00424f47: uVar2 = FUN_005e56d3(heap, pbVar9, pbVar11);
    uVar4 = extraout_CX_01;
  }
  LAB_00424f60: uVar2 = uVar4 << 7 | uVar4 >>> 9 | uVar2;
  pbVar9 = heap.u32((__addr_DAT_00971ef4) + ((ushort)(uVar2 >>> 5 | uVar2 << 0xb)) * 4);
  do {
    if ((heap.u32(pbVar9) & 0x3c) == 0xc) {
      FUN_005df1ff(heap);
    } else {
      if (((heap.u32(pbVar9) & 0x3c) == 4) && ((heap.u32(pbVar9 + (5) * 4) & 0xf) == 5)) {
      FUN_0042e48a(heap);
    }
    }
    pbVar1 = pbVar9 + 1;
    pbVar9 = pbVar9 + 8;
    unaff_EDI = pbVar11;
  } while ((heap.u32(pbVar1) & 0x80) == 0);
  LAB_00424fb3: heap.setU32(0x008d4228, (heap.u32(0x008d4228) + 1) >>> 0);
  heap.setU32(0x008d4228, (heap.u32(0x008d4228) & 0x3fff) >>> 0);
  iVar8 = iVar8 + -1;
  if (iVar8 == 0) {
    /* goto code_r0x00424fca */ throw new Error("goto code_r0x00424fca not supported");
  }
  /* goto LAB_00424e14 */ throw new Error("goto LAB_00424e14 not supported");
  code_r0x00424fca: sVar3 = FUN_004314ed(heap);
  if (-sVar3 == heap.u32(0x0087d7a2)) {
    if (((0x70 < heap.u32(0x008dbed2)) && (heap.u32(0x008dbed2) < 0x80)) && ((-sVar3 < -1 || (300000 < heap.u32(0x0087c3b4))))) {
      uVar4 = FUN_005df40c(heap);
      if (uVar4 < 0x42) {
        pcVar10 = __addr_DAT_00887420;
        do {
          if (heap.u32(pcVar10) != -1) {
            FUN_00426f56(heap);
            return;
          }
          pcVar10 = pcVar10 + 0x260;
        } while (pcVar10 < __addr_DAT_008ad1c0);
      }
      return;
    }
    return;
  }
  /* goto code_r0x00424e0f */ throw new Error("goto code_r0x00424e0f not supported");
} finally {
    heap.freeFrame(12);
  }
}
