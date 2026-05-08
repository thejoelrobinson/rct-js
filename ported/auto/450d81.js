// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/450d81.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT11, CONCAT22, CONCAT31, CONCAT44 } from "../../runtime/ghidra-builtins.js";
export function FUN_00450d81(heap) {
  const __sp = heap.allocFrame(40);
  const __addr_DAT_005f5b78 = __sp + 0;
  const __addr_DAT_00887420 = __sp + 4;
  const __addr_DAT_008ae9c4 = __sp + 8;
  const __addr_DAT_008ae9c6 = __sp + 12;
  const __addr_DAT_008874a4 = __sp + 16;
  const __addr_DAT_008ae9c5 = __sp + 20;
  const __addr_DAT_008ae9ca = __sp + 24;
  const __addr_DAT_008ae9cc = __sp + 28;
  const __addr_DAT_005f5802 = __sp + 32;
  const __addr_DAT_005f5806 = __sp + 36;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let in_CL = 0;
  let uVar4 = 0;
  let bVar6 = 0;
  let bVar7 = 0;
  let uVar5 = 0;
  let in_EDX = 0;
  let iVar8 = 0;
  let iVar9 = 0;
  iVar8 = (in_EDX & 0xff) * 0x260;
  if ((heap.u32((__addr_DAT_005f5b78 + heap.u32((__addr_DAT_00887420) + (iVar8) * 4) * 8)) & 0x200) == 0) {
    return CONCAT44(in_EDX, 0x5a5);
  }
  uVar3 = in_EDX & 0xff;
  do {
    iVar9 = (uVar3 >>> 8) * 0x4b0c;
    bVar7 = uVar3;
    if (bVar7 == heap.u32((__addr_DAT_008ae9c4) + (iVar9) * 4)) {
      /* goto LAB_00450e67 */ throw new Error("goto LAB_00450e67 not supported");
    }
    bVar6 = (uVar3 >>> 8) + 1;
    uVar3 = CONCAT11(bVar6, bVar7);
  } while (bVar6 < 8);
  uVar2 = bVar7;
  do {
    uVar5 = uVar2;
    iVar9 = (uVar5 >>> 8) * 0x4b0c;
    if (heap.u32((__addr_DAT_008ae9c4) + (iVar9) * 4) == -1) {
      /* goto LAB_00450e27 */ throw new Error("goto LAB_00450e27 not supported");
    }
    bVar7 = (uVar5 >>> 8) + 1;
    uVar2 = CONCAT11(bVar7, uVar5);
  } while (bVar7 < 8);
  uVar5 = uVar5 & 0xff;
  uVar3 = 0xffffffff;
  do {
    bVar7 = (uVar5 >>> 8);
    if (heap.u32((__addr_DAT_008ae9c6) + ((uVar5 >>> 8) * 0x12c3) * 4) <= uVar3) {
      uVar3 = heap.u32((__addr_DAT_008ae9c6) + ((uVar5 >>> 8) * 0x12c3) * 4);
      in_CL = bVar7;
    }
    uVar4 = uVar5;
    bVar7 = bVar7 + 1;
    uVar5 = CONCAT11(bVar7, uVar4);
  } while (bVar7 < 8);
  uVar5 = CONCAT11(in_CL, uVar4);
  iVar9 = in_CL * 0x4b0c;
  heap.setU32(((__addr_DAT_008874a4) + (heap.u32((__addr_DAT_008ae9c4) + (iVar9) * 4) * 0x260) * 4), (0xff) >>> 0);
  LAB_00450e27: uVar3 = uVar5;
  heap.setU32(((__addr_DAT_008ae9c4) + (iVar9) * 4), (uVar5) >>> 0);
  heap.setU32(((__addr_DAT_008874a4) + (iVar8) * 4), ((uVar5 >>> 8)) >>> 0);
  heap.setU32(((__addr_DAT_008ae9c5) + (iVar9) * 4), (0) >>> 0);
  if ((heap.u32((__addr_DAT_005f5b78 + heap.u32((__addr_DAT_00887420) + (iVar8) * 4) * 8)) & 0x80) != 0) {
    heap.setU32(((__addr_DAT_008ae9c5) + (iVar9) * 4), (heap.u32((__addr_DAT_008ae9c5) + (iVar9) * 4) | 4) >>> 0);
  }
  heap.setU32((__addr_DAT_008ae9ca + iVar9), (0) >>> 0);
  heap.setU32((__addr_DAT_008ae9cc + iVar9), (0) >>> 0);
  LAB_00450e67: uVar1 = heap.u32(0x006e3b84);
  heap.setU32((__addr_DAT_008ae9c6 + iVar9), (heap.u32(0x006e3b84)) >>> 0);
  if ((heap.u32((__addr_DAT_008ae9c5) + (iVar9) * 4) & 1) != 0) {
    return CONCAT44(in_EDX, CONCAT31((int3)(uVar1 >>> 8), (uVar3 >>> 8)));
  }
  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_00450d81"); })();
  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_00450d81"); })();
  return CONCAT44(in_EDX, CONCAT22((uVar1 >>> 0x10), 0x5a6));
} finally {
    heap.freeFrame(40);
  }
}
