// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5db817.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CARRY2, CONCAT22 } from "../runtime/ghidra-builtins.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_005dcfee } from "./5dcfee.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_005db817(heap) {
  const __sp = heap.allocFrame(28);
  const __addr_DAT_00887422 = __sp + 0;
  const __addr_DAT_0088755c = __sp + 4;
  const __addr_DAT_0065e6be = __sp + 8;
  const __addr_DAT_0065e6c6 = __sp + 12;
  const __addr_DAT_0065e6c0 = __sp + 16;
  const __addr_DAT_00743c58 = __sp + 20;
  const __addr_DAT_005f7104 = __sp + 24;
  try {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  let iVar5 = 0;
  let extraout_CX = 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let extraout_DL = 0;
  let extraout_DL_00 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let unaff_ESI = 0;
  let bVar8 = 0;
  heap.setU32(0x0065dc40, (0) >>> 0);
  heap.setU32(0x0065dc30, (heap.u32((unaff_ESI + 0x2c)) + heap.u32((unaff_ESI + 0x28))) >>> 0);
  uVar6 = heap.u32((unaff_ESI + 0x30));
  uVar7 = uVar6 * 0x260;
  if (((heap.u32((__addr_DAT_00887422) + (uVar6 * 0x130) * 4) & 0xc0) != 0) && (heap.u32((__addr_DAT_0088755c) + (uVar7) * 4) == '\0')) {
    heap.setU32(0x0065dc30, (0) >>> 0);
  }
  heap.u32((unaff_ESI + 0x28)) = heap.u32(0x0065dc30);
  heap.setU32(0x0065dc34, ((heap.u32(0x0065dc30) >>> 10) * 0x2a) >>> 0);
  heap.setU32(0x0065dc38, (1) >>> 0);
  heap.u32((unaff_ESI + 0x2c)) = 0;
  if (((heap.u32((__addr_DAT_00887422) + (uVar6 * 0x130) * 4) & 0xc0) == 0) || (heap.u32((__addr_DAT_0088755c) + (uVar7) * 4) != '\0')) {
    if (((heap.u32(0x0088741c) & 1) == 0) || (heap.u32((unaff_ESI + 0x34)) == '\0')) {
      uVar2 = FUN_005df40c(heap);
      if (0xb21 < uVar2) {
        /* goto LAB_005db8c7 */ throw new Error("goto LAB_005db8c7 not supported");
      }
      heap.u32((unaff_ESI + 0x1e)) = heap.u32((unaff_ESI + 0x1e)) + '\x02';
      if ((heap.u32((unaff_ESI + 0x35)) & 0x40) != 0) {
        heap.u32((unaff_ESI + 0x1e)) = heap.u32((unaff_ESI + 0x1e)) + -4;
      }
    } else {
      if (heap.u32((unaff_ESI + 0x34)) < '\0') {
      heap.u32((unaff_ESI + 0x34)) = heap.u32((unaff_ESI + 0x34)) + '\x01';
      heap.u32((unaff_ESI + 0x1e)) = heap.u32((unaff_ESI + 0x1e)) + -2;
    } else {
      heap.u32((unaff_ESI + 0x34)) = heap.u32((unaff_ESI + 0x34)) + -1;
      heap.u32((unaff_ESI + 0x1e)) = heap.u32((unaff_ESI + 0x1e)) + '\x02';
    }
    }
    heap.u32((unaff_ESI + 0x1e)) = heap.u32((unaff_ESI + 0x1e)) & 0x1e;
    FUN_005e53ca(heap);
  }
  LAB_005db8c7: if (heap.u32((unaff_ESI + 0xc4)) != '\0') {
    bVar1 = heap.u32((unaff_ESI + 0xc4));
    heap.u32((unaff_ESI + 0xc4)) = 0;
    uVar6 = bVar1 & 0x1e;
    bVar8 = CARRY2(heap.u32((unaff_ESI + 0x10)) + heap.u32((__addr_DAT_0065e6be + uVar6 * 8)), heap.u32((__addr_DAT_0065e6c6 + uVar6 * 8)));
    FUN_005dcfee(heap);
    if (!bVar8) {
      FUN_005e53ca(heap);
      FUN_00444927(heap);
      FUN_005e53ca(heap);
    }
  }
  iVar4 = heap.u32(0x0065dc34) + heap.u32((unaff_ESI + 0x24));
  heap.u32((unaff_ESI + 0x24)) = iVar4;
  if (0x3689 < iVar4) {
    heap.u32((unaff_ESI + 0xb8)) = heap.u32((unaff_ESI + 0xb8)) & 0xfffd;
    heap.setU32(0x0065dc48, (heap.u32((unaff_ESI + 0xe))) >>> 0);
    heap.setU32(0x0065dc4c, (heap.u32((unaff_ESI + 0x12))) >>> 0);
    FUN_005e53ca(heap);
    while (true) {
      heap.u32((unaff_ESI + 0x35)) = heap.u32((unaff_ESI + 0x35)) + '\x01';
      uVar6 = (heap.u32((unaff_ESI + 0x1e)) | heap.u32((unaff_ESI + 0x35)) & 1) & 0x1f;
      bVar8 = CARRY2(heap.u32(0x0065dc4a), heap.u32((__addr_DAT_0065e6be + uVar6 * 8)));
      uVar3 = FUN_005dcfee(heap);
      if (bVar8) {
        break;
      }
      heap.u32((unaff_ESI + 0x24)) = heap.u32((unaff_ESI + 0x24)) - heap.u32((__addr_DAT_0065e6c0 + uVar6 * 8));
      heap.setU32(0x0065dc48, (CONCAT22(extraout_CX, uVar3)) >>> 0);
      if (heap.u32((unaff_ESI + 0x24)) < 0x368a) {
        /* goto LAB_005dba3d */ throw new Error("goto LAB_005dba3d not supported");
      }
      heap.setU32(0x0065dc38, (heap.u32(0x0065dc38) + 1) >>> 0);
    }
    heap.u32((unaff_ESI + 0x24)) = 0;
    heap.u32((unaff_ESI + 0x28)) = 0;
    if (uVar7 == -1) {
      heap.u32((unaff_ESI + 0x34)) = 6;
      uVar6 = FUN_005df40c(heap);
      if ((uVar6 & 0x20000000) != 0) {
        heap.u32((unaff_ESI + 0x34)) = 0xfa;
      }
      if (0x1ffff < extraout_ECX_00) {
        heap.u32((unaff_ESI + 0xc4)) = extraout_DL_00 ^ 0x10;
      }
    } else {
      heap.u32((unaff_ESI + 0x34)) = 1;
      uVar6 = FUN_005df40c(heap);
      if ((uVar6 & 0x400000) != 0) {
        heap.u32((unaff_ESI + 0x34)) = 0xff;
      }
      if (0x1ffff < extraout_ECX) {
        heap.u32((__addr_DAT_00743c58) + ((uVar7 & 0xffff) * 0x100) * 4) = extraout_DL;
        heap.u32((unaff_ESI + 0xc4)) = extraout_DL ^ 0x10;
      }
    }
    LAB_005dba3d: FUN_00444927(heap);
    FUN_005e53ca(heap);
  }
  iVar4 = heap.u32((unaff_ESI + 0x28)) >>> 8;
  iVar4 = iVar4 * iVar4;
  if (heap.u32((unaff_ESI + 0x28)) < 0) {
    iVar4 = -iVar4;
  }
  iVar4 = -(((heap.u32((unaff_ESI + 0x28)) >>> 1) + (iVar4 >>> 5)) / heap.u32((unaff_ESI + 0x46)));
  if ((heap.u32((__addr_DAT_005f7104 + heap.u32((unaff_ESI + 0x31)) * 8)) & 8) != 0) {
    uVar6 = heap.u32((unaff_ESI + 0xc2));
    iVar5 = uVar6 * 0x4000;
    if ((heap.u32((unaff_ESI + 0x48)) & 8) != 0) {
      iVar5 = uVar6 * -0x4000;
    }
    iVar4 = iVar4 + ((iVar5 - heap.u32((unaff_ESI + 0x28))) * heap.u32((unaff_ESI + 0xc3)) * 2) / (uVar6 * heap.u32((unaff_ESI + 0x46)) >>> 2);
  }
  heap.u32((unaff_ESI + 0x2c)) = iVar4;
  return heap.u32(0x0065dc40);
} finally {
    heap.freeFrame(28);
  }
}
