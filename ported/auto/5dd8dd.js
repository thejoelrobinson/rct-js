// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dd8dd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { FUN_005e53ca } from "./5e53ca.js";
import { FUN_005e6028 } from "./5e6028.js";
export function FUN_005dd8dd(heap) {
  const __sp = heap.allocFrame(28);
  const __addr_DAT_00887420 = __sp + 0;
  const __addr_DAT_005f5b78 = __sp + 4;
  const __addr_DAT_0088747e = __sp + 8;
  const __addr_DAT_00887425 = __sp + 12;
  const __addr_DAT_00887426 = __sp + 16;
  const __addr_DAT_00743bc6 = __sp + 20;
  const __addr_DAT_00743bd2 = __sp + 24;
  try {
  let uVar1 = 0;
  let in_EAX = 0;
  let iVar2 = 0;
  let extraout_ECX = 0;
  let in_EDX = 0;
  let iVar3 = 0;
  let extraout_EDX = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let iVar7 = 0;
  uVar6 = in_EDX & 0xff;
  iVar7 = uVar6 * 0x260;
  if ((heap.u32((__addr_DAT_00887420) + (iVar7) * 4) == 0x29) || ((heap.u32((__addr_DAT_005f5b78 + heap.u32((byte)(__addr_DAT_00887420) + (iVar7) * 4) * 8)) & 0x10000) != 0)) {
    FUN_005e6028(heap);
  }
  uVar4 = 0;
  iVar3 = 0;
  do {
    uVar5 = heap.u32((__addr_DAT_0088747e + uVar4 * 2 + iVar7));
    if (uVar5 != 0xffff) {
      iVar2 = 0;
      do {
        if ((heap.u32((__addr_DAT_00887425) + (iVar7) * 4) & 3) == 0) {
          uVar1 = heap.u32((__addr_DAT_00887426) + (uVar6 * 0x130) * 4);
        } else {
          if ((heap.u32((__addr_DAT_00887425) + (iVar7) * 4) & 3) == 1) {
          uVar1 = heap.u32((__addr_DAT_00887426) + (uVar6 * 0x130 + iVar3) * 4);
        } else {
          uVar1 = heap.u32((__addr_DAT_00887426) + (uVar6 * 0x130 + iVar2) * 4);
        }
        }
        heap.u32((__addr_DAT_00743bc6 + uVar5 * 0x100)) = uVar1;
        FUN_005e53ca(heap);
        iVar2 = extraout_ECX + 1;
        uVar5 = heap.u32((__addr_DAT_00743bd2 + uVar5 * 0x100));
        iVar3 = extraout_EDX;
      } while (uVar5 != 0xffff);
      iVar3 = extraout_EDX + 1;
    }
    uVar4 = uVar4 + 1;
  } while (uVar4 < 0xc);
  return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(28);
  }
}
