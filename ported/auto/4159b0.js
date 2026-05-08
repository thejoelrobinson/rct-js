// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4159b0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004159b0(heap, param_1, param_2, param_3) {
  let bVar1 = 0;
  let pbVar2 = 0;
  let pbVar3 = 0;
  let pbVar4 = 0;
  let uVar5 = 0;
  let pbVar6 = 0;
  pbVar2 = heap.u32(param_1);
  if (param_3 <= heap.u32(param_1 + (1) * 4)) {
    heap.setU32(pbVar2, (param_3) >>> 0);
    if (pbVar2 + param_3 < param_1 + 0x3e) {
      heap.setU32(param_1, (heap.u32(param_1) + param_3) >>> 0);
      heap.setU32((param_1 + (1) * 4), (heap.u32(param_1 + (1) * 4) - param_3) >>> 0);
    } else {
      heap.setU32((param_1 + (1) * 4), (0) >>> 0);
      heap.setU32(param_1, ((param_1 + 2)) >>> 0);
    }
    return (pbVar2 + 8) * 0x10 + param_1 * -0xf;
  }
  pbVar6 = pbVar2;
  if (heap.u32(pbVar2 + (heap.u32(param_1 + (1) * 4)) * 4) != 0) {
    pbVar6 = pbVar2 + heap.u32(param_1 + (1) * 4);
  }
  if (pbVar6 + param_3 < param_1 + 0x3e) {
    do {
      if (heap.u32(pbVar6) == 0) {
        pbVar3 = pbVar6 + 1;
        uVar5 = 1;
        bVar1 = heap.u32(pbVar6 + (1) * 4);
        while (bVar1 == 0) {
          pbVar3 = pbVar3 + 1;
          uVar5 = uVar5 + 1;
          bVar1 = heap.u32(pbVar3);
        }
        if (param_3 <= uVar5) {
          if (param_1 + 0x3e <= pbVar6 + param_3) {
            heap.setU32(param_1, ((param_1 + 2)) >>> 0);
            /* goto LAB_00415aff */ throw new Error("goto LAB_00415aff not supported");
          }
          heap.setU32(param_1, ((pbVar6 + param_3)) >>> 0);
          heap.setU32((param_1 + (1) * 4), (uVar5 - param_3) >>> 0);
          /* goto LAB_00415b06 */ throw new Error("goto LAB_00415b06 not supported");
        }
        if (pbVar6 == pbVar2) {
          heap.setU32((param_1 + (1) * 4), (uVar5) >>> 0);
        } else {
          param_2 = param_2 - uVar5;
          if (param_2 < param_3) {
            return 0;
          }
        }
      } else {
        pbVar3 = pbVar6 + heap.u32(pbVar6);
      }
      pbVar6 = pbVar3;
    } while (pbVar3 + param_3 < param_1 + 0x3e);
  }
  pbVar3 = (param_1 + 2);
  pbVar6 = pbVar3;
  if (pbVar3 < pbVar2) {
    while (pbVar6 + param_3 < param_1 + 0x3e) {
      if (heap.u32(pbVar6) == 0) {
        pbVar4 = pbVar6 + 1;
        uVar5 = 1;
        bVar1 = heap.u32(pbVar6 + (1) * 4);
        while (bVar1 == 0) {
          pbVar4 = pbVar4 + 1;
          uVar5 = uVar5 + 1;
          bVar1 = heap.u32(pbVar4);
        }
        if (param_3 <= uVar5) {
          if (pbVar6 + param_3 < param_1 + 0x3e) {
            heap.setU32(param_1, ((pbVar6 + param_3)) >>> 0);
            heap.setU32((param_1 + (1) * 4), (uVar5 - param_3) >>> 0);
          } else {
            heap.setU32(param_1, (pbVar3) >>> 0);
            LAB_00415aff: heap.setU32((param_1 + (1) * 4), (0) >>> 0);
          }
          LAB_00415b06: heap.setU32(pbVar6, (param_3) >>> 0);
          return (pbVar6 + 8) * 0x10 + param_1 * -0xf;
        }
        param_2 = param_2 - uVar5;
        if (param_2 < param_3) {
          return 0;
        }
      } else {
        pbVar4 = pbVar6 + heap.u32(pbVar6);
      }
      pbVar6 = pbVar4;
      if (pbVar2 <= pbVar4) {
        return 0;
      }
    }
  }
  return 0;
}
