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
  pbVar2 = ((heap.i32(param_1)) >>> 0);
  if (param_3 <= ((heap.i32(param_1 + (1) * 4)) >>> 0)) {
    heap.setU32(pbVar2, (((param_3) & 0xff)) & 0xffffffff);
    if (pbVar2 + param_3 < param_1 + ((0x3e) * 4)) {
      heap.setU32(param_1, (heap.i32(param_1) + param_3) & 0xffffffff);
      heap.setI32((param_1 + (1) * 4), (heap.i32(param_1 + (1) * 4) - param_3) & 0xffffffff);
    } else {
      heap.setI32((param_1 + (1) * 4), (0) & 0xffffffff);
      heap.setU32(param_1, ((((param_1 + ((2) * 4))) | 0)) & 0xffffffff);
    }
    return (((pbVar2 + 8)) | 0) * 0x10 + ((param_1) | 0) * -0xf;
  }
  pbVar6 = ((pbVar2) >>> 0);
  if (heap.u8(pbVar2 + (heap.i32(param_1 + (1) * 4))) != 0) {
    pbVar6 = ((pbVar2 + heap.i32(param_1 + (1) * 4)) >>> 0);
  }
  if (pbVar6 + param_3 < param_1 + ((0x3e) * 4)) {
    do {
      if (heap.u8(pbVar6) == 0) {
        pbVar3 = ((pbVar6 + 1) >>> 0);
        uVar5 = ((1) >>> 0);
        bVar1 = ((heap.u8(pbVar6 + (1))) & 0xff);
        while (bVar1 == 0) {
          pbVar3 = ((pbVar3 + 1) >>> 0);
          uVar5 = ((uVar5 + 1) >>> 0);
          bVar1 = ((heap.u8(pbVar3)) & 0xff);
        }
        if (param_3 <= uVar5) {
          if (param_1 + ((0x3e) * 4) <= pbVar6 + param_3) {
            heap.setU32(param_1, ((((param_1 + ((2) * 4))) | 0)) & 0xffffffff);
            heap.setI32((param_1 + (1) * 4), (0) & 0xffffffff);
            heap.setU32(pbVar6, (((param_3) & 0xff)) & 0xffffffff);
            return (((pbVar6 + 8)) | 0) * 0x10 + ((param_1) | 0) * -0xf;
          }
          heap.setU32(param_1, ((((pbVar6 + param_3)) | 0)) & 0xffffffff);
          heap.setI32((param_1 + (1) * 4), (uVar5 - param_3) & 0xffffffff);
          heap.setU32(pbVar6, (((param_3) & 0xff)) & 0xffffffff);
          return (((pbVar6 + 8)) | 0) * 0x10 + ((param_1) | 0) * -0xf;
        }
        if (pbVar6 == pbVar2) {
          heap.setI32((param_1 + (1) * 4), (uVar5) & 0xffffffff);
        } else {
          param_2 = ((param_2 - uVar5) >>> 0);
          if (param_2 < param_3) {
            return 0;
          }
        }
      } else {
        pbVar3 = ((pbVar6 + heap.u8(pbVar6)) >>> 0);
      }
      pbVar6 = ((pbVar3) >>> 0);
    } while (pbVar3 + param_3 < param_1 + ((0x3e) * 4));
  }
  pbVar3 = (((param_1 + ((2) * 4))) >>> 0);
  pbVar6 = ((pbVar3) >>> 0);
  if (pbVar3 < pbVar2) {
    while (pbVar6 + param_3 < param_1 + ((0x3e) * 4)) {
      if (heap.u8(pbVar6) == 0) {
        pbVar4 = ((pbVar6 + 1) >>> 0);
        uVar5 = ((1) >>> 0);
        bVar1 = ((heap.u8(pbVar6 + (1))) & 0xff);
        while (bVar1 == 0) {
          pbVar4 = ((pbVar4 + 1) >>> 0);
          uVar5 = ((uVar5 + 1) >>> 0);
          bVar1 = ((heap.u8(pbVar4)) & 0xff);
        }
        if (param_3 <= uVar5) {
          if (pbVar6 + param_3 < param_1 + ((0x3e) * 4)) {
            heap.setU32(param_1, ((((pbVar6 + param_3)) | 0)) & 0xffffffff);
            heap.setI32((param_1 + (1) * 4), (uVar5 - param_3) & 0xffffffff);
          } else {
            heap.setU32(param_1, (((pbVar3) | 0)) & 0xffffffff);
            LAB_00415aff: heap.setI32((param_1 + (1) * 4), (0) & 0xffffffff);
          }
          LAB_00415b06: heap.setU32(pbVar6, (((param_3) & 0xff)) & 0xffffffff);
          return (((pbVar6 + 8)) | 0) * 0x10 + ((param_1) | 0) * -0xf;
        }
        param_2 = ((param_2 - uVar5) >>> 0);
        if (param_2 < param_3) {
          return 0;
        }
      } else {
        pbVar4 = ((pbVar6 + heap.u8(pbVar6)) >>> 0);
      }
      pbVar6 = ((pbVar4) >>> 0);
      if (pbVar2 <= pbVar4) {
        return 0;
      }
    }
  }
  return 0;
}
