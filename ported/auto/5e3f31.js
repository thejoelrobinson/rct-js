// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5e3f31.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5bd8 } from "./5e5bd8.js";
export function FUN_005e3f31(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_009a013c = __sp + 0;
  const __addr_stack0x00000000 = __sp + 4;
  try {
  let in_EAX = 0;
  let in_ECX = 0;
  let extraout_ECX = 0;
  let in_EDX = 0;
  let uVar2 = 0;
  let unaff_EBX = 0;
  let unaff_EBP = 0;
  let unaff_EDI = 0;
  let uVar5 = 0;
  uVar5 = CONCAT44(in_EDX, in_EAX);
  while (0x9a1163 < heap.u32(0x009a1164)) {
    for (puVar4 = __addr_DAT_009a013c; (heap.u32((puVar4 + 0x32)) & 0x103) != 0; puVar4 = puVar4 + 0x178) {
    
    }
    uVar5 = FUN_005e5bd8(heap);
    in_ECX = extraout_ECX;
  }
  puVar3 = heap.u32(0x009a1164);
  puVar1 = heap.u32(0x009a1164);
  if ((in_ECX & 0x100) == 0) {
    if ((in_ECX & 0x200) == 0) {
      while (puVar3 != __addr_DAT_009a013c && ((heap.u32((puVar3 + -0x146)) >>> 1 & 1) != 0)) {
        puVar3 = puVar3 + -0x5e;
      }
    }
  } else {
    for (; (puVar3 != __addr_DAT_009a013c && (((heap.u32((puVar3 + -0x146)) >>> 1 & 1) != 0 || ((heap.u32((puVar3 + -0x146)) & 1) == 0)))); puVar3 = puVar3 + -0x5e) {
    
    }
  }
  while (puVar3 != puVar1) {
    heap.u32((puVar1 + 0x177)) = heap.u32((puVar1 + -1));
    puVar1 = (puVar1 + -1);
  }
  heap.u32((puVar3 + 0x5d)) = in_ECX;
  heap.u32((puVar3 + 0x175)) = 0xff;
  heap.u32((puVar3 + 0x32)) = 0;
  heap.u32((puVar3 + 0x32)) = heap.u32((puVar3 + 0x32)) | (in_ECX >>> 8);
  if ((in_ECX & 0x300) == 0) {
    heap.u32((puVar3 + 0x32)) = heap.u32((puVar3 + 0x32)) | 0x600;
    FUN_00452fce(heap);
  }
  uVar2 = (undefined4)(uVar5 >>> 0x20);
  heap.u32((puVar3 + 0xc)) = 0;
  heap.u32(puVar3 + (8) * 4) = uVar5;
  heap.u32(puVar3 + (9) * 4) = unaff_EBX;
  heap.u32(puVar3 + (2) * 4) = 0;
  heap.u32(puVar3 + (1) * 4) = uVar2;
  heap.u32(puVar3) = unaff_EBP;
  heap.u32(puVar3 + (3) * 4) = 0;
  heap.u32(puVar3 + (4) * 4) = 0;
  heap.u32(puVar3 + (5) * 4) = 0;
  heap.u32(puVar3 + (6) * 4) = 0;
  heap.u32((puVar3 + 0x15a)) = 0;
  heap.u32((puVar3 + 0x57)) = 0;
  heap.u32((puVar3 + 0x15e)) = 0;
  heap.u32((puVar3 + 0x58)) = 0;
  heap.u32((puVar3 + 0x162)) = 0;
  heap.u32((puVar3 + 0x59)) = 0;
  heap.u32((puVar3 + 0x166)) = 0;
  heap.u32((puVar3 + 0x5a)) = 0;
  heap.u32((puVar3 + 0x16a)) = 0;
  heap.u32((puVar3 + 0x5b)) = 0;
  (heap.u32(heap.u32(puVar3)))(unaff_EDI, puVar3, unaff_EBP, __addr_stack0x00000000, unaff_EBX, uVar2, in_ECX, uVar5);
  heap.setU32(0x009a1164, (heap.u32(0x009a1164) + 0x5e) >>> 0);
  FUN_005e43de(heap);
  return;
} finally {
    heap.freeFrame(8);
  }
}
