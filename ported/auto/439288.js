// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/439288.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../../runtime/ghidra-builtins.js";
import { FUN_0043c60b } from "./43c60b.js";
import { FUN_0043de68 } from "./43de68.js";
import { FUN_0043e0dd } from "./43e0dd.js";
import { FUN_00440fe3 } from "./440fe3.js";
import { FUN_004420e0 } from "./4420e0.js";
import { FUN_00442290 } from "./442290.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e5301 } from "./5e5301.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_00439288(heap) {
  const __sp = heap.allocFrame(20);
  const __addr_DAT_0062d564 = __sp + 0;
  const __addr_DAT_00887420 = __sp + 4;
  const __addr_DAT_0062927c = __sp + 8;
  const __addr_DAT_0062927d = __sp + 12;
  const __addr_DAT_0062d610 = __sp + 16;
  try {
  let pbVar1 = 0;
  let pcVar2 = 0;
  let bVar3 = 0;
  let in_AL = 0;
  let bVar4 = 0;
  let bVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let in_EDX = 0;
  let extraout_EDX = 0;
  let extraout_EDX_00 = 0;
  let uVar8 = 0;
  let cVar9 = 0;
  let uVar10 = 0;
  let iVar11 = 0;
  let unaff_ESI = 0;
  let puVar12 = 0;
  let bVar13 = 0;
  let in_stack_00000020 = 0;
  if (heap.u32((unaff_ESI + 0x2e)) == '\x01') {
    if (heap.u32((unaff_ESI + 0x2f)) == '\x02') {
      in_AL = 0x14;
      if (heap.u32((unaff_ESI + 0x2b)) != '\n') {
        in_AL = 3;
      }
      if (in_AL != heap.u32((unaff_ESI + 0x2d))) {
        heap.setU32((unaff_ESI + 0x2d), (in_AL) >>> 0);
        heap.setU32((unaff_ESI + 0x70), (0) >>> 0);
        heap.setU32((unaff_ESI + 0xe0), (0) >>> 0);
        if (heap.u32((unaff_ESI + 0x71)) < 0xfe) {
          heap.setU32((unaff_ESI + 0x71), (0xff) >>> 0);
        }
        heap.setU32((unaff_ESI + 200), (heap.u32((unaff_ESI + 200)) & 0xfffd) >>> 0);
        if ((heap.u32((__addr_DAT_0062d564) + (in_AL) * 4) & 1) != 0) {
          heap.setU32((unaff_ESI + 200), (heap.u32((unaff_ESI + 200)) | 2) >>> 0);
        }
        heap.setU32((unaff_ESI + 0x6e), (0xff) >>> 0);
        in_AL = FUN_0043c60b(heap);
      }
    }
    return in_AL;
  }
  if ((in_EDX & 0x1ff) != (heap.u32(0x0088741c) & 0x1ff)) {
    /* goto LAB_004396f1 */ throw new Error("goto LAB_004396f1 not supported");
  }
  if (heap.u32(0x006e2b76) != -0x75416211) {
    return in_stack_00000020;
  }
  if (heap.u32((unaff_ESI + 0xf3)) != '\0') {
    heap.setU32((unaff_ESI + 0xf3), (heap.u32((unaff_ESI + 0xf3)) + -1) >>> 0);
  }
  if ((((heap.u32((unaff_ESI + 0x2b)) == '\b') || (heap.u32((unaff_ESI + 0x2b)) == '\x05')) && (heap.setU32((unaff_ESI + 0xf2), (heap.u32((unaff_ESI + 0xf2)) + '\x01') >>> 0), 0x11 < heap.u32((unaff_ESI + 0xf2)))) && (heap.setU32((unaff_ESI + 0xf2), (0) >>> 0), heap.u32((unaff_ESI + 0xe)) != -0x8000)) {
    FUN_00442290(heap);
  }
  uVar10 = 0;
  FUN_004420e0(heap);
  if ((heap.u32((unaff_ESI + 0x2b)) == '\x03') || (heap.u32((unaff_ESI + 0x2b)) == '\a')) {
    pcVar2 = (unaff_ESI + 0xe2);
    heap.setU32(pcVar2, (heap.u32(pcVar2) + '\x01') >>> 0);
    if (heap.u32(pcVar2) == '\0') {
      heap.setU32((unaff_ESI + 0xe2), (heap.u32((unaff_ESI + 0xe2)) + -1) >>> 0);
    }
    if ((heap.u32((unaff_ESI + 200)) & 0x100) != 0) {
      FUN_00440fe3(heap);
    }
    if (0xe < heap.u32((unaff_ESI + 0xe2))) {
      pbVar1 = (unaff_ESI + 0x3b);
      bVar4 = heap.u32(pbVar1);
      heap.setU32(pbVar1, (heap.u32(pbVar1) - 5) >>> 0);
      if (bVar4 < 5) {
        heap.setU32((unaff_ESI + 0x3b), (0) >>> 0);
      }
      if (0x15 < heap.u32((unaff_ESI + 0xe2))) {
        uVar10 = heap.u32((__addr_DAT_00887420) + (heap.u32((unaff_ESI + 0x68)) * 0x260) * 4);
        FUN_00440fe3(heap);
      }
    }
  }
  if ((((heap.u32((unaff_ESI + 0x2a)) == '\0') && (heap.u32((unaff_ESI + 0x2b)) == '\x05')) && ((heap.u32((unaff_ESI + 0x2f)) == '\0' && ((((heap.u32((unaff_ESI + 200)) & 1) == 0 && (heap.u32((unaff_ESI + 0xc5)) == -1)) && (4 < (heap.u32(0x006e3b84) - heap.u32((unaff_ESI + 0xa8))) >>> 0xb)))))) && (FUN_0043e0dd(heap), heap.u32((unaff_ESI + 0xc5)) == -1)) {
    pbVar1 = (unaff_ESI + 0x3b);
    bVar4 = heap.u32(pbVar1);
    heap.setU32(pbVar1, (heap.u32(pbVar1) + 0x80) >>> 0);
    if (bVar4 < 0x80) {
      heap.setU32((unaff_ESI + 0x3b), (0) >>> 0);
    }
    LAB_004395c4: heap.setU32((unaff_ESI + 0xc5), (0xff) >>> 0);
    if ((heap.u32((unaff_ESI + 200)) & 1) == 0) {
      heap.setU32((unaff_ESI + 0xc6), (0xfe) >>> 0);
      heap.setU32((unaff_ESI + 200), (heap.u32((unaff_ESI + 200)) | 1) >>> 0);
      LAB_004395f0: uVar7 = FUN_00440fe3(heap);
      FUN_005e5301(heap, uVar10, uVar7);
      heap.setU32((unaff_ESI + 0xf4), (0) >>> 0);
    } else {
      if (0x3b < heap.u32((unaff_ESI + 0xc6))) {
      /* goto LAB_004395f0 */ throw new Error("goto LAB_004395f0 not supported");
    }
    }
    LAB_00439611: if (2 < heap.u32((unaff_ESI + 0x3e))) {
      heap.setU32((unaff_ESI + 0x3e), (heap.u32((unaff_ESI + 0x3e)) + -2) >>> 0);
      pbVar1 = (unaff_ESI + 0x39);
      bVar4 = heap.u32(pbVar1);
      heap.setU32(pbVar1, (heap.u32(pbVar1) + 2) >>> 0);
      if (0xfd < bVar4) {
        heap.setU32((unaff_ESI + 0x39), (0xff) >>> 0);
      }
      pcVar2 = (unaff_ESI + 0x40);
      cVar9 = heap.u32(pcVar2);
      heap.setU32(pcVar2, (heap.u32(pcVar2) + '\x01') >>> 0);
      if (cVar9 == -1) {
        heap.setU32((unaff_ESI + 0x40), (0xff) >>> 0);
      }
    }
    LAB_0043965b: bVar4 = heap.u32((unaff_ESI + 0x3b));
    uVar10 = bVar4;
    if (0x7f < bVar4) {
      uVar10 = (bVar4 - 2);
    }
  } else {
    uVar6 = FUN_005df40c(heap);
    uVar8 = extraout_EDX;
    if (uVar6 < 0x3f1) {
      FUN_0043e0dd(heap);
      uVar8 = extraout_EDX_00;
    }
    uVar10 = heap.u32(0x0088741c) & 0x3ff;
    if ((uVar8 & 0x3ff) == uVar10) {
      if (heap.u32((unaff_ESI + 0x2a)) == '\0') {
        if ((heap.u32((unaff_ESI + 0x2b)) == '\x05') || (heap.u32((unaff_ESI + 0x2b)) == '\b')) {
          puVar12 = __addr_DAT_0062927c;
          if ((heap.u32((unaff_ESI + 200)) & 1) == 0) {
            if ((heap.u32((unaff_ESI + 0x38)) < 0x47) && (heap.u32((unaff_ESI + 0x3a)) < 0x80)) {
              heap.setU32(0x0062927c, (0x13) >>> 0);
              puVar12 = __addr_DAT_0062927d;
            }
            if ((heap.u32((unaff_ESI + 0x3e)) < 0xb) && ((heap.u32((unaff_ESI + 0xca)) & 0xa3e0) == 0)) {
              heap.setU32(puVar12, (0x14) >>> 0);
              puVar12 = puVar12 + 1;
            }
            if ((heap.u32((unaff_ESI + 0x3f)) < 0x1a) && ((heap.u32((unaff_ESI + 0xca)) & 0xa3e0) == 0)) {
              heap.setU32(puVar12, (0x15) >>> 0);
              puVar12 = puVar12 + 1;
            }
            if (0x9f < heap.u32((unaff_ESI + 0x40))) {
              heap.setU32(puVar12, (0x16) >>> 0);
              puVar12 = puVar12 + 1;
            }
          } else {
            heap.setU32(0x0062927c, (9) >>> 0);
            puVar12 = __addr_DAT_0062927d;
          }
          if (puVar12 + -0x62927c != 0x0) {
            bVar4 = FUN_005df40c(heap);
            uVar10 = CONCAT11(0xff, heap.u32((__addr_DAT_0062927c) + ((bVar4 * (puVar12 + -0x62927c)) >>> 8) * 4));
            FUN_00440fe3(heap);
            cVar9 = uVar10;
            if (((cVar9 == '\x14') || (cVar9 == '\x15')) || (cVar9 == '\x16')) {
              FUN_0043de68(heap);
            }
          }
        }
      }
    } else {
      if (0x8b < heap.u32((unaff_ESI + 0x3c))) {
      FUN_00440fe3(heap);
    }
    }
    cVar9 = heap.u32((unaff_ESI + 0x2b));
    if (((cVar9 == '\x05') || (cVar9 == '\r')) || (cVar9 == '\x0e')) {
      LAB_00439576: if (0x20 < heap.u32((unaff_ESI + 0x39))) {
        heap.setU32((unaff_ESI + 0x39), (heap.u32((unaff_ESI + 0x39)) + -2) >>> 0);
      }
      if (('\x14' < heap.u32(0x008d7eb0)) && (4 < heap.u32((unaff_ESI + 0x3f)))) {
        heap.setU32((unaff_ESI + 0x3f), (heap.u32((unaff_ESI + 0x3f)) + -1) >>> 0);
      }
      if ((heap.u32((unaff_ESI + 0x2a)) != '\0') || (((heap.u32((unaff_ESI + 200)) & 1) == 0 && ((((0x36 < heap.u32((unaff_ESI + 0x38)) && (0x2c < heap.u32((unaff_ESI + 0x3a)))) && (0x31 < heap.u32((unaff_ESI + 0xa0)))) || (uVar6 = FUN_005df40c(heap), 0xccc < uVar6)))))) {
        /* goto LAB_00439611 */ throw new Error("goto LAB_00439611 not supported");
      }
      /* goto LAB_004395c4 */ throw new Error("goto LAB_004395c4 not supported");
    }
    if (cVar9 != '\b') {
      if (cVar9 == '\x06') {
        if (1999 < heap.u32((unaff_ESI + 0x7a))) {
          pbVar1 = (unaff_ESI + 0x3b);
          bVar4 = heap.u32(pbVar1);
          heap.setU32(pbVar1, (heap.u32(pbVar1) - 4) >>> 0);
          if (bVar4 < 4) {
            heap.setU32((unaff_ESI + 0x3b), (0) >>> 0);
          }
        }
        /* goto LAB_00439611 */ throw new Error("goto LAB_00439611 not supported");
      }
      if (cVar9 == '\a') {
        if ((heap.u32((unaff_ESI + 0x2c)) == '\x11') || (heap.u32((unaff_ESI + 0x2c)) == '\x0f')) {
          /* goto LAB_00439576 */ throw new Error("goto LAB_00439576 not supported");
        }
      }
      /* goto LAB_0043965b */ throw new Error("goto LAB_0043965b not supported");
    }
    if (heap.u32((unaff_ESI + 0x39)) < 0x88) {
      heap.setU32((unaff_ESI + 0x39), (heap.u32((unaff_ESI + 0x39)) + '\x05') >>> 0);
    }
    if (4 < heap.u32((unaff_ESI + 0x3f))) {
      heap.setU32((unaff_ESI + 0x3f), (heap.u32((unaff_ESI + 0x3f)) + -4) >>> 0);
      pbVar1 = (unaff_ESI + 0x40);
      bVar4 = heap.u32(pbVar1);
      heap.setU32(pbVar1, (heap.u32(pbVar1) + 3) >>> 0);
      if (0xfc < bVar4) {
        heap.setU32((unaff_ESI + 0x40), (0xff) >>> 0);
      }
    }
    if (0x31 < heap.u32((unaff_ESI + 0x3d))) {
      heap.setU32((unaff_ESI + 0x3d), (heap.u32((unaff_ESI + 0x3d)) + -6) >>> 0);
      /* goto LAB_00439611 */ throw new Error("goto LAB_00439611 not supported");
    }
  }
  heap.setU32((unaff_ESI + 0x3b), (uVar10 + '\x01') >>> 0);
  cVar9 = heap.u32((unaff_ESI + 0x3d)) - 2;
  if (heap.u32((unaff_ESI + 0x3d)) < 2) {
    cVar9 = '\0';
  }
  heap.setU32((unaff_ESI + 0x3d), (cVar9) >>> 0);
  if (heap.u32((unaff_ESI + 0x38)) < 0x33) {
    pbVar1 = (unaff_ESI + 0x3b);
    bVar4 = heap.u32(pbVar1);
    heap.setU32(pbVar1, (heap.u32(pbVar1) - 2) >>> 0);
    if (bVar4 < 2) {
      heap.setU32((unaff_ESI + 0x3b), (0) >>> 0);
    }
  }
  if (heap.u32((unaff_ESI + 0x3e)) < 0xb) {
    pcVar2 = (unaff_ESI + 0x3b);
    cVar9 = heap.u32(pcVar2);
    heap.setU32(pcVar2, (heap.u32(pcVar2) + -1) >>> 0);
    if (cVar9 == '\0') {
      heap.setU32((unaff_ESI + 0x3b), (0) >>> 0);
    }
  }
  if (heap.u32((unaff_ESI + 0x3f)) < 0xb) {
    pcVar2 = (unaff_ESI + 0x3b);
    cVar9 = heap.u32(pcVar2);
    heap.setU32(pcVar2, (heap.u32(pcVar2) + -1) >>> 0);
    if (cVar9 == '\0') {
      heap.setU32((unaff_ESI + 0x3b), (0) >>> 0);
    }
  }
  if (0xc2 < heap.u32((unaff_ESI + 0x40))) {
    pcVar2 = (unaff_ESI + 0x3b);
    cVar9 = heap.u32(pcVar2);
    heap.setU32(pcVar2, (heap.u32(pcVar2) + -1) >>> 0);
    if (cVar9 == '\0') {
      heap.setU32((unaff_ESI + 0x3b), (0) >>> 0);
    }
  }
  if (((heap.u32((unaff_ESI + 0x2b)) == '\x05') && (0x7f < heap.u32((unaff_ESI + 0x3d)))) && ((bVar4 = FUN_005df40c(heap), bVar4 <= (heap.u32((unaff_ESI + 0x3c)) + 0x80) >>> 1 && (0xfd < heap.u32((unaff_ESI + 0x71)))))) {
    heap.setU32((unaff_ESI + 0x71), (8) >>> 0);
    heap.setU32((unaff_ESI + 0x72), (0) >>> 0);
    heap.setU32((unaff_ESI + 0x70), (0) >>> 0);
    FUN_0043c60b(heap);
    FUN_005e53ca(heap);
  }
  LAB_004396f1: if ((heap.u32((unaff_ESI + 0x42)) != '\0') && (heap.u32((unaff_ESI + 0x2b)) != '\x03')) {
    pbVar1 = (unaff_ESI + 0x42);
    bVar4 = heap.u32(pbVar1);
    heap.setU32(pbVar1, (heap.u32(pbVar1) - 3) >>> 0);
    if (bVar4 < 3) {
      heap.setU32((unaff_ESI + 0x42), (0) >>> 0);
    }
    iVar11 = 0x3e;
    if ((heap.u32((unaff_ESI + 0xca)) & 0xa3c0) == 0) {
      iVar11 = 0x3f;
    }
    pbVar1 = (iVar11 + unaff_ESI);
    bVar4 = heap.u32(pbVar1);
    heap.setU32(pbVar1, (heap.u32(pbVar1) + 7) >>> 0);
    if (0xf8 < bVar4) {
      heap.setU32((iVar11 + unaff_ESI), (0xff) >>> 0);
    }
    if (iVar11 == 0x3e) {
      pbVar1 = (unaff_ESI + 0x3f);
      bVar4 = heap.u32(pbVar1);
      heap.setU32(pbVar1, (heap.u32(pbVar1) - 3) >>> 0);
      if (bVar4 < 3) {
        heap.setU32((unaff_ESI + 0x3f), (0) >>> 0);
      }
      pbVar1 = (unaff_ESI + 0x40);
      bVar4 = heap.u32(pbVar1);
      heap.setU32(pbVar1, (heap.u32(pbVar1) + 2) >>> 0);
      if (0xfd < bVar4) {
        heap.setU32((unaff_ESI + 0x40), (0xff) >>> 0);
      }
    }
    if (heap.u32((unaff_ESI + 0x42)) == '\0') {
      iVar11 = 0;
      bVar13 = (heap.u32((unaff_ESI + 0xca)) & 0xa3e0) != 0;
      if (bVar13) {
        for (; ((heap.u32((unaff_ESI + 0xca)) & 0xa3e0) >>> iVar11 & 1) == 0; iVar11 = iVar11 + 1) {
        
        }
      }
      if (bVar13) {
        pbVar1 = (unaff_ESI + 0xca + (iVar11 >>> 3));
        heap.setU32(pbVar1, (heap.u32(pbVar1) & ~('\x01' << (iVar11 & 7))) >>> 0);
        bVar4 = heap.u32((__addr_DAT_0062d610) + (iVar11) * 4);
        if (bVar4 != 0xff) {
          pbVar1 = (unaff_ESI + 0xca + (bVar4 >>> 3));
          heap.setU32(pbVar1, (heap.u32(pbVar1) | '\x01' << (bVar4 & 7)) >>> 0);
        }
        heap.setU32((unaff_ESI + 0x45), (heap.u32((unaff_ESI + 0x45)) | 8) >>> 0);
        FUN_004420e0(heap);
      }
    }
  }
  bVar4 = heap.u32((unaff_ESI + 0x38));
  bVar3 = heap.u32((unaff_ESI + 0x39));
  if (bVar4 < bVar3) {
    bVar5 = bVar4 + 4;
    if (0xfb < bVar4) {
      bVar5 = 0xff;
    }
    if (bVar3 < bVar5) {
      bVar5 = bVar3;
    }
  } else {
    bVar5 = bVar4 - 2;
    if ((bVar4 - 2) < bVar3) {
      bVar5 = bVar3;
    }
  }
  if (bVar5 < 0x20) {
    bVar5 = 0x20;
  }
  if (0x80 < bVar5) {
    bVar5 = 0x80;
  }
  if (bVar5 != bVar4) {
    heap.setU32((unaff_ESI + 0x38), (bVar5) >>> 0);
    heap.setU32((unaff_ESI + 0x45), (heap.u32((unaff_ESI + 0x45)) | 4) >>> 0);
  }
  bVar4 = heap.u32((unaff_ESI + 0x3a));
  bVar3 = heap.u32((unaff_ESI + 0x3b));
  if (bVar4 < bVar3) {
    bVar5 = bVar4 + 4;
    if (0xfb < bVar4) {
      bVar5 = 0xff;
    }
    if (bVar3 < bVar5) {
      bVar5 = bVar3;
    }
  } else {
    bVar5 = bVar4 - 4;
    if (bVar4 < 4) {
      bVar5 = 0;
    }
    if (bVar5 < bVar3) {
      bVar5 = bVar3;
    }
  }
  if (bVar5 != bVar4) {
    heap.setU32((unaff_ESI + 0x3a), (bVar5) >>> 0);
    heap.setU32((unaff_ESI + 0x45), (heap.u32((unaff_ESI + 0x45)) | 2) >>> 0);
  }
  bVar4 = heap.u32((unaff_ESI + 0x3c));
  bVar3 = heap.u32((unaff_ESI + 0x3d));
  if (bVar4 < bVar3) {
    bVar5 = bVar4 + 4;
    if (0xfb < bVar4) {
      bVar5 = 0xff;
    }
    if (bVar3 < bVar5) {
      bVar5 = bVar3;
    }
  } else {
    bVar5 = bVar4 - 4;
    if (bVar4 < 4) {
      bVar5 = 0;
    }
    if (bVar5 < bVar3) {
      bVar5 = bVar3;
    }
  }
  if (bVar5 != bVar4) {
    heap.setU32((unaff_ESI + 0x3c), (bVar5) >>> 0);
    heap.setU32((unaff_ESI + 0x45), (heap.u32((unaff_ESI + 0x45)) | 2) >>> 0);
  }
  return bVar5;
} finally {
    heap.freeFrame(20);
  }
}
