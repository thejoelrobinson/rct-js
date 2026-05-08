// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b8705.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT22, DAT_009a2028_2 } from "../runtime/win32.js";
export function FUN_009b8705(heap) {
  let bVar1 = 0;
  let iVar2 = 0;
  let bVar3 = 0;
  let in_EAX = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let sVar6 = 0;
  let uVar9 = 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let in_EDX = 0;
  let unaff_EBX = 0;
  let uVar10 = 0;
  let unaff_EBP = 0;
  iVar2 = heap.u32(0x009a200c);
  bVar3 = (byte)(in_EAX >>> 8);
  sVar6 = in_EDX;
  if ((unaff_EBX & 0x20000000) == 0) {
    if ((unaff_EBX & 0x40000000) == 0) {
      if ((heap.u32(0x009a201c) & 1) == 0) {
        return;
      }
      bVar3 = bVar3 >>> 2;
      if (bVar3 != 0) {
        uVar4 = heap.u32(0x009a2028) + sVar6;
        uVar5 = heap.u32(0x009a2028) & 3;
        if (heap.u32(0x009a2028) >>> 2 != 0) {
          uVar10 = (uint)(heap.u32(0x009a2028) >>> 2);
          uVar7 = uVar10;
          LAB_009b8843: do {
            if (heap.u32(unaff_ESI) != 0) {
              heap.u32(unaff_EDI) = heap.u32(unaff_ESI);
            }
            sVar6 = uVar7;
            pbVar11 = unaff_ESI + 4;
            pbVar12 = unaff_EDI + 1;
            if (sVar6 != 1) {
              bVar1 = heap.u32(unaff_ESI + (4) * 4);
              if (bVar1 != 0) {
                heap.u32(unaff_EDI + (1) * 4) = bVar1;
              }
              pbVar11 = unaff_ESI + 8;
              pbVar12 = unaff_EDI + 2;
              if (sVar6 != 2) {
                bVar1 = heap.u32(unaff_ESI + (8) * 4);
                if (bVar1 != 0) {
                  heap.u32(unaff_EDI + (2) * 4) = bVar1;
                }
                pbVar11 = unaff_ESI + 0xc;
                pbVar12 = unaff_EDI + 3;
                if (sVar6 != 3) {
                  bVar1 = heap.u32(unaff_ESI + (0xc) * 4);
                  unaff_ESI = unaff_ESI + 0x10;
                  if (bVar1 != 0) {
                    heap.u32(unaff_EDI + (3) * 4) = bVar1;
                  }
                  unaff_EDI = unaff_EDI + 4;
                  uVar7 = (uint)(ushort)(sVar6 - 4U);
                  pbVar11 = unaff_ESI;
                  pbVar12 = unaff_EDI;
                  if ((ushort)(sVar6 - 4U) != 0) {
                    /* goto LAB_009b8843 */ throw new Error("goto LAB_009b8843 not supported");
                  }
                }
              }
            }
            unaff_ESI = pbVar11 + in_EDX + uVar4 * 3 + uVar5;
            unaff_EDI = pbVar12 + (unaff_EBP - uVar10);
            bVar3 = bVar3 - 1;
            uVar7 = uVar10;
          } while (bVar3 != 0);
        }
      }
    } else {
      if (((heap.u32(0x009a201c) & 1) != 0) && (bVar3 >>> 2 != 0)) {
      uVar4 = heap.u32(0x009a2028) + sVar6;
      uVar5 = heap.u32(0x009a2028) & 3;
      if (heap.u32(0x009a2028) >>> 2 != 0) {
        heap.setU32(0x009a2028, (CONCAT22(heap, DAT_009a2028_2, heap.u32(0x009a2028) >>> 2)) >>> 0);
        iVar8 = (uint)(ushort)((bVar3 >>> 2) - 1) << 0x10;
        do {
          iVar8 = CONCAT22(heap, (iVar8 >>> 0x10), heap.u32(0x009a2028));
          do {
            if (heap.u32(unaff_ESI) != 0) {
              heap.u32(unaff_EDI) = heap.u32(((uint) * unaff_EDI + iVar2));
            }
            pbVar12 = unaff_EDI + 1;
            sVar6 = iVar8;
            uVar9 = (undefined2)(iVar8 >>> 0x10);
            iVar8 = CONCAT22(heap, uVar9, sVar6 + -1);
            pbVar11 = unaff_ESI + 4;
            if ((sVar6 + -1) == 0) {
              break;
            }
            if (heap.u32(unaff_ESI + (4) * 4) != 0) {
              heap.u32(pbVar12) = heap.u32(((uint) * pbVar12 + iVar2));
            }
            pbVar12 = unaff_EDI + 2;
            iVar8 = CONCAT22(heap, uVar9, sVar6 + -2);
            pbVar11 = unaff_ESI + 8;
            if ((sVar6 + -2) == 0) {
              break;
            }
            pbVar11 = unaff_ESI + 0xc;
            if (heap.u32(unaff_ESI + (8) * 4) != 0) {
              heap.u32(pbVar12) = heap.u32(((uint) * pbVar12 + iVar2));
            }
            pbVar12 = unaff_EDI + 3;
            iVar8 = CONCAT22(heap, uVar9, sVar6 + -3);
            if ((sVar6 + -3) == 0) {
              break;
            }
            unaff_ESI = unaff_ESI + 0x10;
            if (heap.u32(pbVar11) != 0) {
              heap.u32(pbVar12) = heap.u32(((uint) * pbVar12 + iVar2));
            }
            unaff_EDI = unaff_EDI + 4;
            iVar8 = CONCAT22(heap, uVar9, sVar6 + -4);
            pbVar11 = unaff_ESI;
            pbVar12 = unaff_EDI;
          } while ((sVar6 + -4) != 0);
          unaff_ESI = pbVar11 + in_EDX + uVar4 * 3 + uVar5;
          unaff_EDI = pbVar12 + (unaff_EBP - heap.u32(0x009a2028));
          iVar8 = iVar8 + -0x10000;
          if (iVar8 < 0) {
            return;
          }
        } while (true);
      }
    }
    }
  } else {
    if ((heap.u32(0x009a201c) & 1) == 0) {
      return;
    }
    if (bVar3 >>> 2 != 0) {
      uVar4 = heap.u32(0x009a2028) + sVar6;
      uVar5 = heap.u32(0x009a2028) & 3;
      if (heap.u32(0x009a2028) >>> 2 != 0) {
        heap.setU32(0x009a2028, (CONCAT22(heap, DAT_009a2028_2, heap.u32(0x009a2028) >>> 2)) >>> 0);
        iVar8 = (uint)(ushort)((bVar3 >>> 2) - 1) << 0x10;
        do {
          iVar8 = CONCAT22(heap, (iVar8 >>> 0x10), heap.u32(0x009a2028));
          do {
            if (heap.u32(((uint) * unaff_ESI + iVar2)) != 0) {
              heap.u32(unaff_EDI) = heap.u32(((uint) * unaff_ESI + iVar2));
            }
            sVar6 = iVar8;
            uVar9 = (undefined2)(iVar8 >>> 0x10);
            iVar8 = CONCAT22(heap, uVar9, sVar6 + -1);
            pbVar11 = unaff_ESI + 4;
            pbVar12 = unaff_EDI + 1;
            if ((sVar6 + -1) == 0) {
              break;
            }
            bVar3 = heap.u32((heap.u32(unaff_ESI + (4) * 4) + iVar2));
            if (bVar3 != 0) {
              heap.u32(unaff_EDI + (1) * 4) = bVar3;
            }
            iVar8 = CONCAT22(heap, uVar9, sVar6 + -2);
            pbVar11 = unaff_ESI + 8;
            pbVar12 = unaff_EDI + 2;
            if ((sVar6 + -2) == 0) {
              break;
            }
            pbVar11 = unaff_ESI + 0xc;
            bVar3 = heap.u32((heap.u32(unaff_ESI + (8) * 4) + iVar2));
            if (bVar3 != 0) {
              heap.u32(unaff_EDI + (2) * 4) = bVar3;
            }
            iVar8 = CONCAT22(heap, uVar9, sVar6 + -3);
            pbVar12 = unaff_EDI + 3;
            if ((sVar6 + -3) == 0) {
              break;
            }
            unaff_ESI = unaff_ESI + 0x10;
            bVar3 = heap.u32(((uint) * pbVar11 + iVar2));
            if (bVar3 != 0) {
              heap.u32(unaff_EDI + (3) * 4) = bVar3;
            }
            unaff_EDI = unaff_EDI + 4;
            iVar8 = CONCAT22(heap, uVar9, sVar6 + -4);
            pbVar11 = unaff_ESI;
            pbVar12 = unaff_EDI;
          } while ((sVar6 + -4) != 0);
          unaff_ESI = pbVar11 + in_EDX + uVar4 * 3 + uVar5;
          unaff_EDI = pbVar12 + (unaff_EBP - heap.u32(0x009a2028));
          iVar8 = iVar8 + -0x10000;
          if (iVar8 < 0) {
            return;
          }
        } while (true);
      }
    }
  }
  return;
}
