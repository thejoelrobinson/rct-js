// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44a3ba.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_00440072 } from "./440072.js";
import { FUN_0044b9db } from "./44b9db.js";
import { FUN_0044ba3c } from "./44ba3c.js";
import { FUN_0044c464 } from "./44c464.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_0044a3ba(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_00743b94 = __sp + 0;
  const __addr_DAT_00743bd2 = __sp + 4;
  const __addr_DAT_0088747e = __sp + 8;
  try {
  let uVar2 = 0;
  let bVar3 = 0;
  let uVar4 = 0;
  let extraout_EDX = 0;
  let uVar7 = 0;
  let sVar8 = 0;
  let uVar9 = 0;
  let bVar10 = 0;
  let uVar11 = 0;
  puVar1 = in_EDX;
  do {
    puVar5 = puVar1;
    puVar1 = __addr_DAT_00743b94 + (uint) * (puVar5 + 0x40) * 0x100;
  } while (heap.u32((__addr_DAT_00743bd2 + (uint) * (puVar5 + 0x40) * 0x100)) != -1);
  psVar6 = (__addr_DAT_0088747e + heap.u32(puVar5 + (0x30) * 4) * 0x260);
  uVar9 = 1;
  while (true) {
    bVar10 = heap.u32((puVar5 + 10)) == heap.u32(psVar6);
    sVar8 = uVar9;
    if (bVar10) {
      break;
    }
    psVar6 = psVar6 + 1;
    uVar9 = (uint)(ushort)(sVar8 + 1);
  }
  heap.setU32(0x00631ca0, (in_EDX) >>> 0);
  uVar2 = FUN_005e3b2b(heap);
  puVar1 = heap.u32(0x00631ca0);
  if (!bVar10) {
    uVar11 = false;
    if (sVar8 == heap.u32((unaff_ESI + 0x15a))) {
      uVar7 = 0;
      uVar4 = heap.u32(heap.u32(0x00631ca0) + (0xb3) * 4);
      do {
        sVar8 = uVar9;
        uVar11 = true;
        if (uVar4 == '\0') {
          break;
        }
        if (heap.u32((puVar1 + uVar7 * 2 + 0x52)) != -1) {
          bVar3 = uVar4 - 1;
          uVar4 = bVar3;
          bVar10 = bVar3 == 0;
          FUN_005e3b2b(heap, uVar4, uVar9, uVar2);
          sVar8 = uVar9;
          if (bVar10) {
            uVar11 = (extraout_EDX & 0xffff) * 0x100 == -0x743b94;
            FUN_00440072(heap);
            FUN_005e3b2b(heap);
            /* goto joined_r0x0044a466 */ throw new Error("goto joined_r0x0044a466 not supported");
          }
        }
        sVar8 = uVar9;
        uVar7 = uVar7 + 1;
        uVar11 = uVar7 == 0x20;
      } while (uVar7 < 0x20);
    }
    FUN_005e5fcb(heap);
    joined_r0x0044a466: if (!uVar11) {
      /* goto LAB_0044a489 */ throw new Error("goto LAB_0044a489 not supported");
    }
  }
  FUN_0044b9db(heap);
  heap.u32(unaff_ESI + (0x57) * 4) = 0xffffffff;
  LAB_0044a489: heap.u32((unaff_ESI + 0x59)) = 0;
  heap.u32((unaff_ESI + 9)) = 0x100;
  heap.u32((unaff_ESI + 0x26)) = 0xc6;
  FUN_005e43de(heap);
  heap.u32(unaff_ESI + (7) * 4) = heap.u32(0x00631bcc);
  heap.u32(unaff_ESI + (3) * 4) = heap.u32(0x00631c2c);
  heap.u32(unaff_ESI + (6) * 4) = heap.u32(0x00631c4c);
  heap.u32(unaff_ESI) = heap.u32(0x00631bec);
  heap.u32(unaff_ESI + (1) * 4) = heap.u32(0x00631c0c);
  heap.u32(unaff_ESI + (5) * 4) = 0;
  FUN_0044ba3c(heap);
  FUN_005e412c(heap);
  heap.u32((unaff_ESI + 0x15a)) = sVar8;
  FUN_0044c464(heap);
  return;
} finally {
    heap.freeFrame(12);
  }
}
