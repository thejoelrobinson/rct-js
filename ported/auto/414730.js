// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414730.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function FUN_00414730(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(4);
  const __addr_DAT_005f0020 = __sp + 0;
  try {
  let bVar2 = 0;
  let bVar3 = 0;
  let bVar4 = 0;
  let bVar5 = 0;
  let uVar8 = 0;
  piVar6 = param_5;
  heap.u32(param_5) = 0;
  heap.u32(param_4) = 1;
  if (param_2 != 0x0) {
    heap.u32(param_2) = param_3;
    param_2 = param_2 + 1;
  }
  if (heap.u32(param_1) == 0x22) {
    bVar2 = heap.u32(param_1 + (1) * 4);
    while (pbVar7 = param_1 + 1, bVar2 != 0x22 && (bVar2 != 0)) {
      if (((heap.u32((__addr_DAT_005f0020 + bVar2 + 1)) & 4) != 0) && (heap.u32(param_5) = heap.u32(param_5) + 1, param_3 != 0x0)) {
        heap.u32(param_3) = heap.u32(pbVar7);
        param_3 = param_3 + 1;
        pbVar7 = param_1 + 2;
      }
      heap.u32(param_5) = heap.u32(param_5) + 1;
      if (param_3 != 0x0) {
        heap.u32(param_3) = heap.u32(pbVar7);
        param_3 = param_3 + 1;
      }
      param_1 = pbVar7;
      bVar2 = heap.u32(pbVar7 + (1) * 4);
    }
    heap.u32(param_5) = heap.u32(param_5) + 1;
    if (param_3 != 0x0) {
      heap.u32(param_3) = 0;
      param_3 = param_3 + 1;
    }
    if (heap.u32(pbVar7) == 0x22) {
      pbVar7 = param_1 + 2;
    }
  } else {
    do {
      heap.u32(piVar6) = heap.u32(piVar6) + 1;
      if (param_3 != 0x0) {
        heap.u32(param_3) = heap.u32(param_1);
        param_3 = param_3 + 1;
      }
      bVar2 = heap.u32(param_1);
      pbVar7 = param_1 + 1;
      param_5 = bVar2;
      if ((heap.u32((__addr_DAT_005f0020 + param_5 + 1U)) & 4) != 0) {
        heap.u32(piVar6) = heap.u32(piVar6) + 1;
        if (param_3 != 0x0) {
          heap.u32(param_3) = heap.u32(pbVar7);
          param_3 = param_3 + 1;
        }
        pbVar7 = param_1 + 2;
      }
      if (bVar2 == 0x20) {
        break;
      }
      if (bVar2 == 0) {
        /* goto LAB_00414809 */ throw new Error("goto LAB_00414809 not supported");
      }
      param_1 = pbVar7;
    } while (bVar2 != 9);
    if (bVar2 == 0) {
      LAB_00414809: pbVar7 = pbVar7 + -1;
    } else {
      if (param_3 != 0x0) {
      heap.u32(param_3 + (-1) * 4) = 0;
    }
    }
  }
  bVar4 = false;
  bVar5 = false;
  while (heap.u32(pbVar7) != 0) {
    for (; (heap.u32(pbVar7) == 0x20 || (heap.u32(pbVar7) == 9)); pbVar7 = pbVar7 + 1) {
    
    }
    if (heap.u32(pbVar7) == 0) {
      break;
    }
    if (param_2 != 0x0) {
      heap.u32(param_2) = param_3;
      param_2 = param_2 + 1;
    }
    heap.u32(param_4) = heap.u32(param_4) + 1;
    while (true) {
      uVar8 = 0;
      bVar3 = true;
      bVar2 = heap.u32(pbVar7);
      while (bVar2 == 0x5c) {
        pbVar1 = pbVar7 + 1;
        pbVar7 = pbVar7 + 1;
        uVar8 = uVar8 + 1;
        bVar2 = heap.u32(pbVar1);
      }
      if (heap.u32(pbVar7) == 0x22) {
        if ((uVar8 & 1) == 0) {
          if ((bVar4) && (heap.u32(pbVar7 + (1) * 4) == 0x22)) {
            pbVar7 = pbVar7 + 1;
          } else {
            bVar3 = false;
          }
          bVar4 = !bVar5;
          bVar5 = bVar4;
        }
        uVar8 = uVar8 >>> 1;
      }
      for (; uVar8 != 0; uVar8 = uVar8 - 1) {
        if (param_3 != 0x0) {
          heap.u32(param_3) = 0x5c;
          param_3 = param_3 + 1;
        }
        heap.u32(piVar6) = heap.u32(piVar6) + 1;
      }
      bVar2 = heap.u32(pbVar7);
      if ((bVar2 == 0) || ((!bVar4 && ((bVar2 == 0x20 || (bVar2 == 9)))))) {
        break;
      }
      if (bVar3) {
        if (param_3 == 0x0) {
          if ((heap.u32((__addr_DAT_005f0020 + bVar2 + 1)) & 4) != 0) {
            pbVar7 = pbVar7 + 1;
            heap.u32(piVar6) = heap.u32(piVar6) + 1;
          }
          heap.u32(piVar6) = heap.u32(piVar6) + 1;
          /* goto LAB_00414905 */ throw new Error("goto LAB_00414905 not supported");
        }
        if ((heap.u32((__addr_DAT_005f0020 + bVar2 + 1)) & 4) != 0) {
          heap.u32(param_3) = bVar2;
          param_3 = param_3 + 1;
          pbVar7 = pbVar7 + 1;
          heap.u32(piVar6) = heap.u32(piVar6) + 1;
        }
        heap.u32(param_3) = heap.u32(pbVar7);
        param_3 = param_3 + 1;
        heap.u32(piVar6) = heap.u32(piVar6) + 1;
        pbVar7 = pbVar7 + 1;
      } else {
        LAB_00414905: pbVar7 = pbVar7 + 1;
      }
    }
    if (param_3 != 0x0) {
      heap.u32(param_3) = 0;
      param_3 = param_3 + 1;
    }
    heap.u32(piVar6) = heap.u32(piVar6) + 1;
  }
  if (param_2 != 0x0) {
    heap.u32(param_2) = 0;
  }
  heap.u32(param_4) = heap.u32(param_4) + 1;
  return;
} finally {
    heap.freeFrame(4);
  }
}
