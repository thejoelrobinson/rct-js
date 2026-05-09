// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dd8dd.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e53ca } from "./5e53ca.js";
import { FUN_005e6028 } from "./5e6028.js";
export function FUN_005dd8dd(heap) {
  let uVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let iVar2 = 0;
  let extraout_ECX = 0;
  let in_EDX = regs.edx >>> 0;
  let iVar3 = 0;
  let extraout_EDX = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let iVar7 = 0;
  uVar6 = ((in_EDX & 0xff) >>> 0);
  iVar7 = ((uVar6 * 0x260) >>> 0);
  if ((heap.u32((0x00887420) + (iVar7) * 4) == 0x29) || ((heap.u32((0x005f5b78 + heap.u32(((0x00887420) >>> 0) + (iVar7) * 4) * 8)) & 0x10000) != 0)) {
    (regs.eax = FUN_005e6028(heap));
  }
  uVar4 = ((0) >>> 0);
  iVar3 = ((0) >>> 0);
  do {
    uVar5 = ((heap.u16((0x0088747e + uVar4 * 2 + iVar7))) & 0xffff);
    if (uVar5 != 0xffff) {
      iVar2 = ((0) >>> 0);
      do {
        if ((heap.u32((0x00887425) + (iVar7) * 4) & 3) == 0) {
          uVar1 = ((heap.u32((0x00887426) + (uVar6 * 0x130) * 4)) & 0xffff);
        } else {
          if ((heap.u32((0x00887425) + (iVar7) * 4) & 3) == 1) {
          uVar1 = ((heap.u32((0x00887426) + (uVar6 * 0x130 + iVar3) * 4)) & 0xffff);
        } else {
          uVar1 = ((heap.u32((0x00887426) + (uVar6 * 0x130 + iVar2) * 4)) & 0xffff);
        }
        }
        heap.setU16((0x00743bc6 + ((uVar5) >>> 0) * 0x100), (uVar1) & 0xffff);
        (regs.eax = FUN_005e53ca(heap));
        iVar2 = ((extraout_ECX + 1) >>> 0);
        uVar5 = ((heap.u16((0x00743bd2 + ((uVar5) >>> 0) * 0x100))) & 0xffff);
        iVar3 = ((extraout_EDX) >>> 0);
      } while (uVar5 != 0xffff);
      iVar3 = ((extraout_EDX + 1) >>> 0);
    }
    uVar4 = ((uVar4 + 1) >>> 0);
  } while (uVar4 < 0xc);
  return 1;
}
