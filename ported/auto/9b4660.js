// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b4660.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT31 } from "../../runtime/ghidra-builtins.js";
export function FUN_009b4660(heap) {
  let uVar1 = 0;
  let bVar3 = 0;
  let in_EAX = 0;
  let iVar2 = 0;
  let uVar4 = 0;
  let sVar5 = 0;
  let uVar6 = 0;
  let uVar8 = 0;
  let iVar7 = 0;
  let in_EDX = 0;
  let unaff_EBX = 0;
  let unaff_EBP = 0;
  uVar1 = heap.u32(0x009a2028);
  iVar2 = heap.u32(0x009a200c);
  bVar3 = (byte)(in_EAX >>> 8);
  if ((unaff_EBX & 0x20000000) != 0) {
    if ((heap.u32(0x009a201c) & 1) == 0) {
      return;
    }
    iVar7 = (bVar3 - 1) << 0x10;
    if (heap.u32(0x009a2028) == 4) {
      do {
        if (heap.u32((heap.u32(unaff_ESI) + iVar2)) != 0) {
          heap.u32(unaff_EDI) = heap.u32((heap.u32(unaff_ESI) + iVar2));
        }
        if (heap.u32((heap.u32(unaff_ESI + (1) * 4) + iVar2)) != 0) {
          heap.u32(unaff_EDI + (1) * 4) = heap.u32((heap.u32(unaff_ESI + (1) * 4) + iVar2));
        }
        if (heap.u32((heap.u32(unaff_ESI + (2) * 4) + iVar2)) != 0) {
          heap.u32(unaff_EDI + (2) * 4) = heap.u32((heap.u32(unaff_ESI + (2) * 4) + iVar2));
        }
        if (heap.u32((heap.u32(unaff_ESI + (3) * 4) + iVar2)) != 0) {
          heap.u32(unaff_EDI + (3) * 4) = heap.u32((heap.u32(unaff_ESI + (3) * 4) + iVar2));
        }
        unaff_EDI = unaff_EDI + unaff_EBP + 4;
        unaff_ESI = unaff_ESI + in_EDX + 4;
        iVar7 = iVar7 + -0x10000;
      } while (-1 < iVar7);
      return;
    }
    do {
      iVar7 = CONCAT22((iVar7 >>> 0x10), heap.u32(0x009a2028));
      do {
        if (heap.u32((heap.u32(unaff_ESI) + iVar2)) != 0) {
          heap.u32(unaff_EDI) = heap.u32((heap.u32(unaff_ESI) + iVar2));
        }
        sVar5 = iVar7;
        uVar8 = (undefined2)(iVar7 >>> 0x10);
        iVar7 = CONCAT22(uVar8, sVar5 + -1);
        pbVar9 = unaff_ESI + 1;
        pbVar10 = unaff_EDI + 1;
        if ((sVar5 + -1) == 0) {
          break;
        }
        bVar3 = heap.u32((heap.u32(unaff_ESI + (1) * 4) + iVar2));
        if (bVar3 != 0) {
          heap.u32(unaff_EDI + (1) * 4) = bVar3;
        }
        iVar7 = CONCAT22(uVar8, sVar5 + -2);
        pbVar9 = unaff_ESI + 2;
        pbVar10 = unaff_EDI + 2;
        if ((sVar5 + -2) == 0) {
          break;
        }
        pbVar9 = unaff_ESI + 3;
        bVar3 = heap.u32((heap.u32(unaff_ESI + (2) * 4) + iVar2));
        if (bVar3 != 0) {
          heap.u32(unaff_EDI + (2) * 4) = bVar3;
        }
        iVar7 = CONCAT22(uVar8, sVar5 + -3);
        pbVar10 = unaff_EDI + 3;
        if ((sVar5 + -3) == 0) {
          break;
        }
        unaff_ESI = unaff_ESI + 4;
        bVar3 = heap.u32((heap.u32(pbVar9) + iVar2));
        if (bVar3 != 0) {
          heap.u32(unaff_EDI + (3) * 4) = bVar3;
        }
        unaff_EDI = unaff_EDI + 4;
        iVar7 = CONCAT22(uVar8, sVar5 + -4);
        pbVar9 = unaff_ESI;
        pbVar10 = unaff_EDI;
      } while ((sVar5 + -4) != 0);
      unaff_ESI = pbVar9 + in_EDX;
      unaff_EDI = pbVar10 + unaff_EBP;
      iVar7 = iVar7 + -0x10000;
      if (iVar7 < 0) {
        return;
      }
    } while (true);
  }
  if ((unaff_EBX & 0x40000000) == 0) {
    uVar4 = uVar1;
    if ((heap.u32(0x009a201c) & 1) == 0) {
      do {
        for (uVar6 = uVar1; uVar6 != 0; uVar6 = uVar6 - 1) {
          heap.u32(unaff_EDI) = heap.u32(unaff_ESI);
          unaff_ESI = unaff_ESI + 1;
          unaff_EDI = unaff_EDI + 1;
        }
        unaff_EDI = unaff_EDI + unaff_EBP;
        unaff_ESI = unaff_ESI + in_EDX;
        bVar3 = (in_EAX >>> 8) - 1;
        in_EAX = bVar3 << 8;
      } while (bVar3 != 0);
      return;
    }
    LAB_009b4732: do {
      iVar2 = in_EAX;
      if (heap.u32(unaff_ESI) != 0) {
        heap.u32(unaff_EDI) = heap.u32(unaff_ESI);
      }
      pbVar9 = unaff_ESI + 1;
      pbVar10 = unaff_EDI + 1;
      if (uVar4 != 1) {
        bVar3 = heap.u32(unaff_ESI + (1) * 4);
        if (bVar3 != 0) {
          heap.u32(unaff_EDI + (1) * 4) = bVar3;
        }
        pbVar9 = unaff_ESI + 2;
        pbVar10 = unaff_EDI + 2;
        if (uVar4 != 2) {
          bVar3 = heap.u32(unaff_ESI + (2) * 4);
          if (bVar3 != 0) {
            heap.u32(unaff_EDI + (2) * 4) = bVar3;
          }
          pbVar9 = unaff_ESI + 3;
          pbVar10 = unaff_EDI + 3;
          if (uVar4 != 3) {
            bVar3 = heap.u32(unaff_ESI + (3) * 4);
            unaff_ESI = unaff_ESI + 4;
            if (bVar3 != 0) {
              heap.u32(unaff_EDI + (3) * 4) = bVar3;
            }
            unaff_EDI = unaff_EDI + 4;
            uVar4 = uVar4 - 4;
            in_EAX = CONCAT31((int3)(iVar2 >>> 8), bVar3);
            pbVar9 = unaff_ESI;
            pbVar10 = unaff_EDI;
            if (uVar4 != 0) {
              /* goto LAB_009b4732 */ throw new Error("goto LAB_009b4732 not supported");
            }
          }
        }
      }
      unaff_ESI = pbVar9 + in_EDX;
      unaff_EDI = pbVar10 + unaff_EBP;
      bVar3 = (iVar2 >>> 8) - 1;
      in_EAX = bVar3 << 8;
      uVar4 = uVar1;
    } while (bVar3 != 0);
  } else {
    if ((heap.u32(0x009a201c) & 1) != 0) {
    iVar7 = (bVar3 - 1) << 0x10;
    do {
      iVar7 = CONCAT22((iVar7 >>> 0x10), heap.u32(0x009a2028));
      do {
        if (heap.u32(unaff_ESI) != 0) {
          heap.u32(unaff_EDI) = heap.u32((heap.u32(unaff_EDI) + iVar2));
        }
        pbVar10 = unaff_EDI + 1;
        sVar5 = iVar7;
        uVar8 = (undefined2)(iVar7 >>> 0x10);
        iVar7 = CONCAT22(uVar8, sVar5 + -1);
        pbVar9 = unaff_ESI + 1;
        if ((sVar5 + -1) == 0) {
          break;
        }
        if (heap.u32(unaff_ESI + (1) * 4) != 0) {
          heap.u32(pbVar10) = heap.u32((heap.u32(pbVar10) + iVar2));
        }
        pbVar10 = unaff_EDI + 2;
        iVar7 = CONCAT22(uVar8, sVar5 + -2);
        pbVar9 = unaff_ESI + 2;
        if ((sVar5 + -2) == 0) {
          break;
        }
        pbVar9 = unaff_ESI + 3;
        if (heap.u32(unaff_ESI + (2) * 4) != 0) {
          heap.u32(pbVar10) = heap.u32((heap.u32(pbVar10) + iVar2));
        }
        pbVar10 = unaff_EDI + 3;
        iVar7 = CONCAT22(uVar8, sVar5 + -3);
        if ((sVar5 + -3) == 0) {
          break;
        }
        unaff_ESI = unaff_ESI + 4;
        if (heap.u32(pbVar9) != 0) {
          heap.u32(pbVar10) = heap.u32((heap.u32(pbVar10) + iVar2));
        }
        unaff_EDI = unaff_EDI + 4;
        iVar7 = CONCAT22(uVar8, sVar5 + -4);
        pbVar9 = unaff_ESI;
        pbVar10 = unaff_EDI;
      } while ((sVar5 + -4) != 0);
      unaff_ESI = pbVar9 + in_EDX;
      unaff_EDI = pbVar10 + unaff_EBP;
      iVar7 = iVar7 + -0x10000;
      if (iVar7 < 0) {
        return;
      }
    } while (true);
  }
  }
  return;
}
