// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43e304.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT31 } from "../runtime/win32.js";
import { FUN_00440fe3 } from "./440fe3.js";
import { FUN_004413fa } from "./4413fa.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_0043e304(heap) {
  const __sp = heap.allocFrame(80);
  const __addr_DAT_00887441 = __sp + 0;
  const __addr_DAT_00887422 = __sp + 4;
  const __addr_DAT_00887420 = __sp + 8;
  const __addr_DAT_005f5b78 = __sp + 12;
  const __addr_DAT_0088747a = __sp + 16;
  const __addr_DAT_00887472 = __sp + 20;
  const __addr_DAT_00743ba6 = __sp + 24;
  const __addr_DAT_00743ba2 = __sp + 28;
  const __addr_DAT_00743ba4 = __sp + 32;
  const __addr_DAT_00743c0e = __sp + 36;
  const __addr_DAT_00887508 = __sp + 40;
  const __addr_DAT_0088757e = __sp + 44;
  const __addr_DAT_00887510 = __sp + 48;
  const __addr_DAT_00887512 = __sp + 52;
  const __addr_DAT_00887516 = __sp + 56;
  const __addr_DAT_0062d620 = __sp + 60;
  const __addr_DAT_0062d622 = __sp + 64;
  const __addr_DAT_00887514 = __sp + 68;
  const __addr_DAT_008874e4 = __sp + 72;
  const __addr_DAT_005f5e88 = __sp + 76;
  try {
  let uVar1 = 0;
  let in_EAX = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let in_DL = 0;
  let extraout_DL = 0;
  let extraout_DL_00 = 0;
  let extraout_DL_01 = 0;
  let extraout_DL_02 = 0;
  let extraout_DL_03 = 0;
  let extraout_DL_04 = 0;
  let extraout_DL_05 = 0;
  let extraout_DL_06 = 0;
  let extraout_DL_07 = 0;
  let in_DH = 0;
  let unaff_EBX = 0;
  let uVar6 = 0;
  let unaff_BP = 0;
  let unaff_ESI = 0;
  let uVar7 = 0;
  let iVar8 = 0;
  uVar7 = in_DL;
  iVar8 = uVar7 * 0x260;
  uVar2 = in_EAX;
  if (((heap.u32((__addr_DAT_00887441) + (iVar8) * 4) != '\x01') || ((heap.u32((__addr_DAT_00887422) + (uVar7 * 0x130) * 4) & 0x80) != 0)) || ((heap.u32((unaff_ESI + 200)) & 1) != 0)) {
    /* goto LAB_0043e76b */ throw new Error("goto LAB_0043e76b not supported");
  }
  unaff_EBX = heap.u32((uint)(byte)(__addr_DAT_00887420) + (iVar8) * 4);
  if ((heap.u32((__addr_DAT_005f5b78 + unaff_EBX * 8)) & 0x20000) == 0) {
    unaff_EBX = in_DH;
    if ((unaff_BP & 2) == 0) {
      if (heap.u32((__addr_DAT_0088747a) + (iVar8 + unaff_EBX) * 4) != -1) {
        if ((unaff_BP & 1) == 0) {
          if (heap.u32((__addr_DAT_00887472 + unaff_EBX * 2 + iVar8)) != -1) {
            /* goto LAB_0043e743 */ throw new Error("goto LAB_0043e743 not supported");
          }
        } else {
          uVar1 = heap.u32((__addr_DAT_00887472 + unaff_EBX * 2 + iVar8));
          uVar2 = uVar1;
          if (uVar1 != 0xffff) {
            uVar7 = uVar1;
            uVar1 = heap.u32((__addr_DAT_00743ba6) + (uVar7 * 0x80) * 4) - heap.u32((unaff_ESI + 0x12));
            if (uVar1 < 0) {
              uVar1 = -uVar1;
            }
            uVar2 = uVar1;
            if (uVar1 < 7) {
              uVar1 = heap.u32((__addr_DAT_00743ba2) + (uVar7 * 0x80) * 4) - heap.u32((unaff_ESI + 0xe));
              if (uVar1 < 0) {
                uVar1 = -uVar1;
              }
              uVar4 = heap.u32((__addr_DAT_00743ba4) + (uVar7 * 0x80) * 4) - heap.u32((unaff_ESI + 0x10));
              if (uVar4 < 0) {
                uVar4 = -uVar4;
              }
              if (uVar1 < uVar4) {
                uVar1 = uVar4;
              }
              uVar2 = uVar1;
              if ((uVar1 < 0xe) && ((10 < heap.u32((__addr_DAT_00743c0e + uVar7 * 0x100)) || (uVar1 < 8)))) {
                /* goto LAB_0043e743 */ throw new Error("goto LAB_0043e743 not supported");
              }
            }
          }
        }
        /* goto LAB_0043e3f1 */ throw new Error("goto LAB_0043e3f1 not supported");
      }
      LAB_0043e743: heap.u32((__addr_DAT_00887422) + (in_DL * 0x130) * 4) = heap.u32((__addr_DAT_00887422) + (in_DL * 0x130) * 4) | 0x200;
    } else {
      LAB_0043e3f1: if (in_DL == heap.u32((unaff_ESI + 0xad))) {
        /* goto LAB_0043e76b */ throw new Error("goto LAB_0043e76b not supported");
      }
      uVar7 = in_DL;
      iVar8 = uVar7 * 0x260;
      uVar2 = heap.u32((uint)(short)(__addr_DAT_00887508) + (uVar7 * 0x130) * 4);
      if ((uVar2 != 0) && ((((heap.u32((unaff_ESI + 0xca)) >>> 0xe & 1) == 0 || (heap.u32((unaff_ESI + 0xf0)) != '\x01')) || (in_DL != heap.u32((unaff_ESI + 0xf1)))))) {
        if (heap.u32((unaff_ESI + 0xa0)) < 1) {
          LAB_0043e71f: if ((unaff_BP & 4) == 0) {
            uVar2 = FUN_00440fe3(heap);
            in_DL = extraout_DL_06;
          }
          /* goto LAB_0043e755 */ throw new Error("goto LAB_0043e755 not supported");
        }
        if (heap.u32((unaff_ESI + 0xa0)) < uVar2) {
          /* goto LAB_0043e731 */ throw new Error("goto LAB_0043e731 not supported");
        }
      }
      if ((heap.u32((__addr_DAT_0088757e) + (iVar8) * 4) == '\0') || (0xe0 < heap.u32((unaff_ESI + 0x3a)))) {
        if (in_DL == heap.u32((unaff_ESI + 0xc5))) {
          if ((heap.u32((__addr_DAT_00887510) + (uVar7 * 0x130) * 4) == -1) || (heap.u32((__addr_DAT_00887512) + (uVar7 * 0x130) * 4) < 0x3e9)) {
            LAB_0043e52c: uVar1 = heap.u32((__addr_DAT_00887516) + (uVar7 * 0x130) * 4);
            if ((uVar1 == 0xffff) || ((((heap.u32((unaff_ESI + 0xca)) >>> 0xe & 1) != 0 && (heap.u32((unaff_ESI + 0xf0)) == '\x01')) && (in_DL == heap.u32((unaff_ESI + 0xf1)))))) {
              LAB_0043e598: if ((unaff_BP & 4) == 0) {
                uVar3 = FUN_004413fa(heap);
                in_DL = extraout_DL_00;
                if (extraout_DL_00 == heap.u32((unaff_ESI + 0xc5))) {
                  heap.u32((unaff_ESI + 0xc5)) = 0xff;
                  FUN_005e5301(heap, CONCAT31(heap, (int3)(unaff_EBX >>> 8), 1), uVar3);
                  in_DL = extraout_DL_01;
                }
              }
              heap.u32((__addr_DAT_00887422) + (in_DL * 0x130) * 4) = heap.u32((__addr_DAT_00887422) + (in_DL * 0x130) * 4) & 0xfdff;
              return in_EAX;
            }
            if ((heap.u32((unaff_ESI + 200)) & 0x20) != 0) {
              uVar1 = uVar1 >>> 2;
            }
            uVar2 = CONCAT22(heap, (uVar2 >>> 0x10), uVar1);
            uVar6 = (undefined2)(unaff_EBX >>> 0x10);
            unaff_EBX = CONCAT22(heap, uVar6, uVar1 << 1);
            if (heap.u32((ushort)(__addr_DAT_00887508) + (uVar7 * 0x130) * 4) <= (ushort)(uVar1 << 1)) {
              unaff_EBX = CONCAT22(heap, uVar6, uVar1 >>> 1);
              if ((heap.u32((ushort)(__addr_DAT_00887508) + (uVar7 * 0x130) * 4) <= uVar1 >>> 1) && ((unaff_BP & 4) == 0)) {
                FUN_00440fe3(heap, uVar2);
                in_DL = extraout_DL;
              }
              /* goto LAB_0043e598 */ throw new Error("goto LAB_0043e598 not supported");
            }
            if ((unaff_BP & 4) == 0) {
              FUN_00440fe3(heap);
              if (0x3b < heap.u32((unaff_ESI + 0x3b))) {
                heap.u32((unaff_ESI + 0x3b)) = heap.u32((unaff_ESI + 0x3b)) - 0x10;
              }
              unaff_EBX = unaff_EBX & 0xffffff00;
              uVar2 = FUN_004413fa(heap);
              in_DL = extraout_DL_03;
            }
            /* goto LAB_0043e755 */ throw new Error("goto LAB_0043e755 not supported");
          }
        } else {
          if (heap.u32((__addr_DAT_00887510) + (uVar7 * 0x130) * 4) == -1) {
            /* goto LAB_0043e52c */ throw new Error("goto LAB_0043e52c not supported");
          }
          if (heap.u32(0x008d7eb6) == '\0') {
            uVar5 = (uint) * (unaff_ESI + 0x3a);
            uVar2 = (uint)(heap.u32((unaff_ESI + 0x43)) >>> 4) * 100;
            if (1000 < uVar2) {
              uVar2 = 1000;
            }
            unaff_EBX = (heap.u32((unaff_ESI + 0x43)) & 0xf) * 100 - uVar5;
            uVar2 = uVar2 + uVar5;
            if ((unaff_EBX <= heap.u32((__addr_DAT_00887512) + (uVar7 * 0x130) * 4)) && (heap.u32((__addr_DAT_00887512) + (uVar7 * 0x130) * 4) <= uVar2)) {
              uVar2 = heap.u32((unaff_ESI + 0x44)) & 3;
              unaff_EBX = heap.u32((__addr_DAT_0062d620 + uVar2 * 4)) - uVar5;
              uVar2 = heap.u32((__addr_DAT_0062d622 + uVar2 * 4)) + uVar5;
              if (heap.u32((__addr_DAT_00887514 + iVar8)) <= uVar2) {
                if ((0x8b < heap.u32((__addr_DAT_00887514 + iVar8))) && (0xa0 < heap.u32((unaff_ESI + 0x3c)))) {
                  /* goto LAB_0043e76b */ throw new Error("goto LAB_0043e76b not supported");
                }
                /* goto LAB_0043e52c */ throw new Error("goto LAB_0043e52c not supported");
              }
            }
          } else {
            uVar2 = CONCAT31(heap, (int3)(char)(heap.u32((ushort)(__addr_DAT_00887508) + (uVar7 * 0x130) * 4) >>> 8), heap.u32((byte)(__addr_DAT_008874e4) + (iVar8) * 4) >>> 5);
            if (3 < heap.u32((byte)(__addr_DAT_008874e4) + (iVar8) * 4) >>> 5) {
              /* goto LAB_0043e52c */ throw new Error("goto LAB_0043e52c not supported");
            }
          }
        }
      }
      if ((unaff_BP & 4) == 0) {
        FUN_00440fe3(heap);
        if (0x3f < heap.u32((unaff_ESI + 0x3b))) {
          heap.u32((unaff_ESI + 0x3b)) = heap.u32((unaff_ESI + 0x3b)) - 8;
        }
        unaff_EBX = unaff_EBX & 0xffffff00;
        uVar2 = FUN_004413fa(heap);
        in_DL = extraout_DL_05;
      }
    }
  } else {
    if (in_DL == heap.u32((unaff_ESI + 0xad))) {
      /* goto LAB_0043e76b */ throw new Error("goto LAB_0043e76b not supported");
    }
    if (heap.u32((__addr_DAT_005f5e88) + (unaff_EBX * 4) * 4) == -1) {
      if (heap.u32((unaff_ESI + 0x40)) < 0x46) {
        /* goto LAB_0043e76b */ throw new Error("goto LAB_0043e76b not supported");
      }
      uVar1 = heap.u32((__addr_DAT_00887508) + (uVar7 * 0x130) * 4) * 0x28;
      uVar2 = uVar1;
      if (((uVar1 >>> 8) == '\0') && (uVar1 <= heap.u32((unaff_ESI + 0x40)))) {
        /* goto LAB_0043e61a */ throw new Error("goto LAB_0043e61a not supported");
      }
      if ((unaff_BP & 4) == 0) {
        FUN_00440fe3(heap);
        if (0x3b < heap.u32((unaff_ESI + 0x3b))) {
          heap.u32((unaff_ESI + 0x3b)) = heap.u32((unaff_ESI + 0x3b)) - 0x10;
        }
        unaff_EBX = 0;
        uVar2 = FUN_004413fa(heap);
        in_DL = extraout_DL_04;
      }
      /* goto LAB_0043e755 */ throw new Error("goto LAB_0043e755 not supported");
    }
    LAB_0043e61a: uVar2 = heap.u32((uint)(short)(__addr_DAT_00887508) + (uVar7 * 0x130) * 4);
    if (uVar2 == 0) {
      LAB_0043e63e: if (((unaff_BP & 4) == 0) && (uVar3 = FUN_004413fa(heap), extraout_DL_02 == heap.u32((unaff_ESI + 0xc5)))) {
        heap.u32((unaff_ESI + 0xc5)) = 0xff;
        FUN_005e5301(heap, 1, uVar3);
      }
      return in_EAX;
    }
    if (heap.u32((unaff_ESI + 0xa0)) < 1) {
      /* goto LAB_0043e71f */ throw new Error("goto LAB_0043e71f not supported");
    }
    if (uVar2 <= heap.u32((unaff_ESI + 0xa0))) {
      /* goto LAB_0043e63e */ throw new Error("goto LAB_0043e63e not supported");
    }
    LAB_0043e731: if ((unaff_BP & 4) == 0) {
      uVar2 = FUN_00440fe3(heap);
      in_DL = extraout_DL_07;
    }
  }
  LAB_0043e755: if ((unaff_BP & 4) == 0) {
    heap.u32((unaff_ESI + 0xad)) = in_DL;
    heap.u32((unaff_ESI + 0xae)) = 0;
  }
  LAB_0043e76b: if (in_DL == heap.u32((unaff_ESI + 0xc5))) {
    heap.u32((unaff_ESI + 0xc5)) = 0xff;
    FUN_005e5301(heap, unaff_EBX, uVar2);
  }
  return in_EAX;
} finally {
    heap.freeFrame(80);
  }
}
