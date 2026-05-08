// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e3c3c.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e3b77 } from "./5e3b77.js";
import { FUN_005e3bbf } from "./5e3bbf.js";
import { FUN_005e3f31 } from "./5e3f31.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5bd8 } from "./5e5bd8.js";
export function FUN_005e3c3c(heap) {
  const __sp = heap.allocFrame(12);
  const __addr_DAT_009a013c = __sp + 0;
  const __addr_DAT_009a1164 = __sp + 4;
  const __addr_stack0x00000000 = __sp + 8;
  try {
  let uVar1 = 0;
  let puVar2 = 0;
  let sVar3 = 0;
  let sVar4 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let extraout_CX_01 = 0;
  let extraout_CX_02 = 0;
  let extraout_CX_03 = 0;
  let extraout_CX_04 = 0;
  let in_ECX = 0;
  let extraout_ECX = 0;
  let extraout_DX = 0;
  let extraout_DX_00 = 0;
  let extraout_DX_01 = 0;
  let extraout_DX_02 = 0;
  let extraout_DX_03 = 0;
  let extraout_DX_04 = 0;
  let extraout_DX_05 = 0;
  let extraout_DX_06 = 0;
  let extraout_DX_07 = 0;
  let extraout_DX_08 = 0;
  let extraout_DX_09 = 0;
  let extraout_DX_10 = 0;
  let extraout_DX_11 = 0;
  let extraout_DX_12 = 0;
  let extraout_DX_13 = 0;
  let extraout_DX_14 = 0;
  let in_EDX = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let sVar7 = 0;
  let unaff_EBX = 0;
  let uVar8 = 0;
  let unaff_EBP = 0;
  let unaff_ESI = 0;
  let puVar9 = 0;
  let puVar10 = 0;
  let unaff_EDI = 0;
  let bVar11 = 0;
  let uVar12 = 0;
  uVar6 = unaff_EBX;
  if (in_ECX < '\0') {
    uVar1 = in_ECX & 0x7f;
    in_ECX = in_ECX & 0xffffff7f;
    bVar11 = uVar1 == 0;
    FUN_005e3b2b(heap);
    unaff_EDI = unaff_ESI;
    if ((((!bVar11) && (heap.u32((unaff_ESI + 8)) < (heap.u32(0x00971ed6) - 0x14))) && (-0x3c < heap.u32((unaff_ESI + 8)))) && (heap.u32((unaff_ESI + 0x22)) < (heap.u32(0x00971ed8) - 0x14))) {
      FUN_005e3f31(heap);
      return;
    }
  }
  bVar11 = false;
  sVar3 = FUN_005e3bbf(heap);
  sVar4 = extraout_DX;
  if (bVar11) {
    bVar11 = (heap.u32(0x00971ed8) - 0x24) < extraout_CX;
    sVar3 = FUN_005e3bbf(heap);
    sVar4 = extraout_DX_00;
    if (bVar11) {
      bVar11 = heap.u32(0x00971ed6) < uVar6;
      sVar3 = FUN_005e3bbf(heap);
      sVar4 = extraout_DX_01;
      if (bVar11) {
        bVar11 = (heap.u32(0x00971ed8) - 0x24) < extraout_CX_00;
        sVar3 = FUN_005e3bbf(heap);
        sVar4 = extraout_DX_02;
        if (bVar11) {
          for (unaff_EDI = __addr_DAT_009a013c; unaff_EDI < heap.u32(__addr_DAT_009a1164); unaff_EDI = unaff_EDI + 0x5e) {
            if ((heap.u32((unaff_EDI + 0x32)) & 1) == 0) {
              bVar11 = 0xfffd < (heap.u32((unaff_EDI + 8)) + heap.u32((unaff_EDI + 9)));
              sVar3 = FUN_005e3bbf(heap);
              sVar4 = extraout_DX_03;
              if (!bVar11) {
                /* goto LAB_005e3efb */ throw new Error("goto LAB_005e3efb not supported");
              }
              bVar11 = (heap.u32((unaff_EDI + 8)) - uVar6) < 2;
              sVar3 = FUN_005e3bbf(heap);
              sVar4 = extraout_DX_04;
              if (!bVar11) {
                /* goto LAB_005e3efb */ throw new Error("goto LAB_005e3efb not supported");
              }
              bVar11 = 0xfffd < (heap.u32((unaff_EDI + 0x22)) + heap.u32((unaff_EDI + 0x26)));
              sVar3 = FUN_005e3bbf(heap);
              sVar4 = extraout_DX_05;
              if (!bVar11) {
                /* goto LAB_005e3efb */ throw new Error("goto LAB_005e3efb not supported");
              }
              bVar11 = (heap.u32((unaff_EDI + 0x22)) - extraout_CX_01) < 2;
              sVar3 = FUN_005e3bbf(heap);
              sVar4 = extraout_DX_06;
              if (!bVar11) {
                /* goto LAB_005e3efb */ throw new Error("goto LAB_005e3efb not supported");
              }
              bVar11 = (heap.u32((unaff_EDI + 0x22)) + heap.u32((unaff_EDI + 0x26))) < extraout_CX_02;
              sVar3 = FUN_005e3bbf(heap);
              sVar4 = extraout_DX_07;
              if (!bVar11) {
                /* goto LAB_005e3efb */ throw new Error("goto LAB_005e3efb not supported");
              }
              bVar11 = (heap.u32((unaff_EDI + 0x22)) + heap.u32((unaff_EDI + 0x26))) < extraout_CX_03;
              sVar3 = FUN_005e3bbf(heap);
              sVar4 = extraout_DX_08;
              if (!bVar11) {
                /* goto LAB_005e3efb */ throw new Error("goto LAB_005e3efb not supported");
              }
              bVar11 = (heap.u32((unaff_EDI + 8)) + heap.u32((unaff_EDI + 9))) < uVar6;
              sVar3 = FUN_005e3bbf(heap);
              sVar4 = extraout_DX_09;
              if (!bVar11) {
                /* goto LAB_005e3efb */ throw new Error("goto LAB_005e3efb not supported");
              }
              bVar11 = (heap.u32((unaff_EDI + 8)) + heap.u32((unaff_EDI + 9))) < uVar6;
              sVar3 = FUN_005e3bbf(heap);
              sVar4 = extraout_DX_10;
              if (!bVar11) {
                /* goto LAB_005e3efb */ throw new Error("goto LAB_005e3efb not supported");
              }
            }
          }
          unaff_EDI = __addr_DAT_009a013c;
          do {
            if (heap.u32(__addr_DAT_009a1164) <= unaff_EDI) {
              sVar4 = 0;
              sVar3 = 0x20;
              do {
                unaff_EDI = __addr_DAT_009a013c;
                while (true) {
                  if (heap.u32(__addr_DAT_009a1164) <= unaff_EDI) {
                    /* goto LAB_005e3efb */ throw new Error("goto LAB_005e3efb not supported");
                  }
                  if ((sVar4 == heap.u32((unaff_EDI + 8))) && (sVar3 == heap.u32((unaff_EDI + 0x22)))) {
                    break;
                  }
                  unaff_EDI = unaff_EDI + 0x5e;
                }
                sVar4 = sVar4 + 5;
                sVar3 = sVar3 + 5;
              } while (true);
            }
            if ((heap.u32((unaff_EDI + 0x32)) & 1) == 0) {
              bVar11 = 0xfffd < (heap.u32((unaff_EDI + 8)) + heap.u32((unaff_EDI + 9)));
              sVar3 = FUN_005e3b77(heap);
              sVar4 = extraout_DX_11;
              if (!bVar11) {
                break;
              }
              bVar11 = (heap.u32((unaff_EDI + 8)) - uVar6) < 2;
              sVar3 = FUN_005e3b77(heap);
              sVar4 = extraout_DX_12;
              if (!bVar11) {
                break;
              }
              bVar11 = 0xfffd < (heap.u32((unaff_EDI + 0x22)) + heap.u32((unaff_EDI + 0x26)));
              sVar3 = FUN_005e3b77(heap);
              sVar4 = extraout_DX_13;
              if (!bVar11) {
                break;
              }
              bVar11 = (heap.u32((unaff_EDI + 0x22)) - extraout_CX_04) < 2;
              sVar3 = FUN_005e3b77(heap);
              sVar4 = extraout_DX_14;
              if (!bVar11) {
                break;
              }
            }
            unaff_EDI = unaff_EDI + 0x5e;
          } while (true);
        }
      }
    }
  }
  LAB_005e3efb: sVar7 = unaff_EBX + sVar4;
  if (sVar4 < 0) {
    sVar7 = sVar7 - sVar4;
    sVar4 = 0;
  }
  if (heap.u32(0x00971ed6) < sVar7) {
    sVar4 = sVar4 - (sVar7 - heap.u32(0x00971ed6));
    sVar7 = sVar7 - (sVar7 - heap.u32(0x00971ed6));
  }
  uVar12 = CONCAT44(in_EDX, CONCAT22(sVar3, sVar4));
  uVar8 = CONCAT22((unaff_EBX >>> 0x10), sVar7 - sVar4);
  while (true) {
    if (heap.u32(__addr_DAT_009a1164) < __addr_DAT_009a1164) {
      break;
    }
    for (puVar10 = __addr_DAT_009a013c; (heap.u32((puVar10 + 0x32)) & 0x103) != 0; puVar10 = puVar10 + 0x178) {
    
    }
    uVar12 = FUN_005e5bd8(heap);
    in_ECX = extraout_ECX;
  }
  puVar9 = heap.u32(__addr_DAT_009a1164);
  puVar2 = heap.u32(__addr_DAT_009a1164);
  if ((in_ECX & 0x100) == 0) {
    if ((in_ECX & 0x200) == 0) {
      while (puVar9 != __addr_DAT_009a013c && ((heap.u32((puVar9 + -0x146)) >>> 1 & 1) != 0)) {
        puVar9 = puVar9 + -0x5e;
      }
    }
  } else {
    for (; (puVar9 != __addr_DAT_009a013c && (((heap.u32((puVar9 + -0x146)) >>> 1 & 1) != 0 || ((heap.u32((puVar9 + -0x146)) & 1) == 0)))); puVar9 = puVar9 + -0x5e) {
    
    }
  }
  while (puVar9 != puVar2) {
    heap.setU32((puVar2 + 0x177), (heap.u32((puVar2 + -1))) >>> 0);
    puVar2 = (puVar2 + -1);
  }
  heap.setU32((puVar9 + 0x5d), (in_ECX) >>> 0);
  heap.setU32((puVar9 + 0x175), (0xff) >>> 0);
  heap.setU32((puVar9 + 0x32), (0) >>> 0);
  heap.setU32((puVar9 + 0x32), (heap.u32((puVar9 + 0x32)) | (in_ECX >>> 8)) >>> 0);
  if ((in_ECX & 0x300) == 0) {
    heap.setU32((puVar9 + 0x32), (heap.u32((puVar9 + 0x32)) | 0x600) >>> 0);
    FUN_00452fce(heap, uVar8, uVar12, unaff_EDI, puVar9, unaff_EBP, __addr_stack0x00000000, uVar8, (uVar12 >>> 0x20), in_ECX);
  }
  uVar5 = (uVar12 >>> 0x20);
  heap.setU32((puVar9 + 0xc), (0) >>> 0);
  heap.setU32((puVar9 + (8) * 4), (uVar12) >>> 0);
  heap.setU32((puVar9 + (9) * 4), (uVar8) >>> 0);
  heap.setU32((puVar9 + (2) * 4), (0) >>> 0);
  heap.setU32((puVar9 + (1) * 4), (uVar5) >>> 0);
  heap.setU32(puVar9, (unaff_EBP) >>> 0);
  heap.setU32((puVar9 + (3) * 4), (0) >>> 0);
  heap.setU32((puVar9 + (4) * 4), (0) >>> 0);
  heap.setU32((puVar9 + (5) * 4), (0) >>> 0);
  heap.setU32((puVar9 + (6) * 4), (0) >>> 0);
  heap.setU32((puVar9 + 0x15a), (0) >>> 0);
  heap.setU32((puVar9 + 0x57), (0) >>> 0);
  heap.setU32((puVar9 + 0x15e), (0) >>> 0);
  heap.setU32((puVar9 + 0x58), (0) >>> 0);
  heap.setU32((puVar9 + 0x162), (0) >>> 0);
  heap.setU32((puVar9 + 0x59), (0) >>> 0);
  heap.setU32((puVar9 + 0x166), (0) >>> 0);
  heap.setU32((puVar9 + 0x5a), (0) >>> 0);
  heap.setU32((puVar9 + 0x16a), (0) >>> 0);
  heap.setU32((puVar9 + 0x5b), (0) >>> 0);
  (heap.u32(heap.u32(puVar9)))(unaff_EDI, puVar9, unaff_EBP, __addr_stack0x00000000, uVar8, uVar5, in_ECX, uVar12);
  heap.setU32(0x009a1164, (heap.u32(__addr_DAT_009a1164) + 0x5e) >>> 0);
  FUN_005e43de(heap);
  return;
} finally {
    heap.freeFrame(12);
  }
}
