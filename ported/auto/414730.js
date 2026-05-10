// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414730.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00414730(heap, param_1, param_2, param_3, param_4, param_5) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let bVar3 = 0;
  let bVar4 = 0;
  let bVar5 = 0;
  let piVar6 = 0;
  let pbVar7 = 0;
  let uVar8 = 0;
  piVar6 = ((param_5) >>> 0);
  heap.setU32(param_5, (0) & 0xffffffff);
  heap.setU32(param_4, (1) & 0xffffffff);
  if (param_2 != 0x0) {
    heap.setU32(param_2, (param_3) & 0xffffffff);
    param_2 = ((param_2 + ((1) * 4)) >>> 0);
  }
  if (heap.u8(param_1) == 0x22) {
    bVar2 = ((heap.u8(param_1 + (1))) & 0xff);
    while (pbVar7 = ((param_1 + 1) >>> 0), bVar2 != 0x22 && (bVar2 != 0)) {
      if (((heap.u8((((0x005f0020) | 0) + bVar2 + 1)) & 4) != 0) && (heap.setU32(param_5, (heap.i32(param_5) + 1) & 0xffffffff), param_3 != 0x0)) {
        heap.setU32(param_3, (heap.u8(pbVar7)) & 0xffffffff);
        param_3 = ((param_3 + 1) >>> 0);
        pbVar7 = ((param_1 + 2) >>> 0);
      }
      heap.setU32(param_5, (heap.i32(param_5) + 1) & 0xffffffff);
      if (param_3 != 0x0) {
        heap.setU32(param_3, (heap.u8(pbVar7)) & 0xffffffff);
        param_3 = ((param_3 + 1) >>> 0);
      }
      param_1 = ((pbVar7) >>> 0);
      bVar2 = ((heap.u8(pbVar7 + (1))) & 0xff);
    }
    heap.setU32(param_5, (heap.i32(param_5) + 1) & 0xffffffff);
    if (param_3 != 0x0) {
      heap.setU32(param_3, (0) & 0xffffffff);
      param_3 = ((param_3 + 1) >>> 0);
    }
    if (heap.u8(pbVar7) == 0x22) {
      pbVar7 = ((param_1 + 2) >>> 0);
    }
  } else {
    do {
      heap.setU32(piVar6, (heap.i32(piVar6) + 1) & 0xffffffff);
      if (param_3 != 0x0) {
        heap.setU32(param_3, (heap.u8(param_1)) & 0xffffffff);
        param_3 = ((param_3 + 1) >>> 0);
      }
      bVar2 = ((heap.u8(param_1)) & 0xff);
      pbVar7 = ((param_1 + 1) >>> 0);
      param_5 = ((((bVar2) >>> 0)) >>> 0);
      if ((heap.u8((((0x005f0020) | 0) + ((param_5) | 0) + 1)) & 4) != 0) {
        heap.setU32(piVar6, (heap.i32(piVar6) + 1) & 0xffffffff);
        if (param_3 != 0x0) {
          heap.setU32(param_3, (heap.u8(pbVar7)) & 0xffffffff);
          param_3 = ((param_3 + 1) >>> 0);
        }
        pbVar7 = ((param_1 + 2) >>> 0);
      }
      if (bVar2 == 0x20) {
        break;
      }
      if (bVar2 == 0) {
        /* goto LAB_00414809 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00414730/LAB_00414809"); return 0;
      }
      param_1 = ((pbVar7) >>> 0);
    } while (bVar2 != 9);
    if (bVar2 == 0) {
      LAB_00414809: pbVar7 = ((pbVar7 + -1) >>> 0);
    } else {
      if (param_3 != 0x0) {
      heap.setU8((param_3 + (-1)), (0) & 0xff);
    }
    }
  }
  bVar4 = ((false) & 0xff);
  bVar5 = ((false) & 0xff);
  while (heap.u8(pbVar7) != 0) {
    for (; (heap.u8(pbVar7) == 0x20 || (heap.u8(pbVar7) == 9)); pbVar7 = (((pbVar7 + 1) >>> 0)) >>> 0) {
    
    }
    if (heap.u8(pbVar7) == 0) {
      break;
    }
    if (param_2 != 0x0) {
      heap.setU32(param_2, (param_3) & 0xffffffff);
      param_2 = ((param_2 + ((1) * 4)) >>> 0);
    }
    heap.setU32(param_4, (heap.i32(param_4) + 1) & 0xffffffff);
    while (true) {
      uVar8 = ((0) >>> 0);
      bVar3 = ((true) & 0xff);
      bVar2 = ((heap.u8(pbVar7)) & 0xff);
      while (bVar2 == 0x5c) {
        pbVar1 = ((pbVar7 + 1) >>> 0);
        pbVar7 = ((pbVar7 + 1) >>> 0);
        uVar8 = ((uVar8 + 1) >>> 0);
        bVar2 = ((heap.u8(pbVar1)) & 0xff);
      }
      if (heap.u8(pbVar7) == 0x22) {
        if ((uVar8 & 1) == 0) {
          if ((bVar4) && (heap.u8(pbVar7 + (1)) == 0x22)) {
            pbVar7 = ((pbVar7 + 1) >>> 0);
          } else {
            bVar3 = ((false) & 0xff);
          }
          bVar4 = ((!bVar5) & 0xff);
          bVar5 = ((bVar4) & 0xff);
        }
        uVar8 = ((uVar8 >>> 1) >>> 0);
      }
      for (; uVar8 != 0; uVar8 = (((uVar8 - 1) >>> 0)) >>> 0) {
        if (param_3 != 0x0) {
          heap.setU32(param_3, (0x5c) & 0xffffffff);
          param_3 = ((param_3 + 1) >>> 0);
        }
        heap.setU32(piVar6, (heap.i32(piVar6) + 1) & 0xffffffff);
      }
      bVar2 = ((heap.u8(pbVar7)) & 0xff);
      if ((bVar2 == 0) || ((!bVar4 && ((bVar2 == 0x20 || (bVar2 == 9)))))) {
        break;
      }
      if (bVar3) {
        if (param_3 == 0x0) {
          if ((heap.u8((((0x005f0020) | 0) + bVar2 + 1)) & 4) != 0) {
            pbVar7 = ((pbVar7 + 1) >>> 0);
            heap.setU32(piVar6, (heap.i32(piVar6) + 1) & 0xffffffff);
          }
          heap.setU32(piVar6, (heap.i32(piVar6) + 1) & 0xffffffff);
          pbVar7 = ((pbVar7 + 1) >>> 0);
          if (param_3 != 0x0) {
            heap.setU32(param_3, (0) & 0xffffffff);
            param_3 = ((param_3 + 1) >>> 0);
          }
          heap.setU32(piVar6, (heap.i32(piVar6) + 1) & 0xffffffff);
          if (param_2 != 0x0) {
            heap.setU32(param_2, (0) & 0xffffffff);
          }
          heap.setU32(param_4, (heap.i32(param_4) + 1) & 0xffffffff);
          return;
        }
        if ((heap.u8((((0x005f0020) | 0) + bVar2 + 1)) & 4) != 0) {
          heap.setU32(param_3, (bVar2) & 0xffffffff);
          param_3 = ((param_3 + 1) >>> 0);
          pbVar7 = ((pbVar7 + 1) >>> 0);
          heap.setU32(piVar6, (heap.i32(piVar6) + 1) & 0xffffffff);
        }
        heap.setU32(param_3, (heap.u8(pbVar7)) & 0xffffffff);
        param_3 = ((param_3 + 1) >>> 0);
        heap.setU32(piVar6, (heap.i32(piVar6) + 1) & 0xffffffff);
        pbVar7 = ((pbVar7 + 1) >>> 0);
      } else {
        LAB_00414905: pbVar7 = ((pbVar7 + 1) >>> 0);
      }
    }
    if (param_3 != 0x0) {
      heap.setU32(param_3, (0) & 0xffffffff);
      param_3 = ((param_3 + 1) >>> 0);
    }
    heap.setU32(piVar6, (heap.i32(piVar6) + 1) & 0xffffffff);
  }
  if (param_2 != 0x0) {
    heap.setU32(param_2, (0) & 0xffffffff);
  }
  heap.setU32(param_4, (heap.i32(param_4) + 1) & 0xffffffff);
  return;
}
