// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/448bbc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00448a45 } from "./448a45.js";
export function FUN_00448bbc(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let bVar3 = 0;
  let uVar4 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_EDX = regs.edx >>> 0;
  let uVar5 = 0;
  let pbVar6 = 0;
  let pbVar7 = 0;
  let iVar8 = 0;
  for (pbVar6 = ((0x00630be0) >>> 0); pbVar6 < heap.u32(0x00630bdc); pbVar6 = (((pbVar6 + 1) >>> 0)) >>> 0) {
    bVar2 = ((heap.u8(pbVar6)) & 0xff);
    iVar8 = ((((bVar2) >>> 0) * 0x260) >>> 0);
    if ((heap.u32((0x00887420) + (iVar8) * 4) | 0) != -1) {
      uVar5 = ((0) >>> 0);
      do {
        uVar4 = ((heap.u32((0x00887462) + (((bVar2) >>> 0) * 0x130 + uVar5) * 4)) & 0xffff);
        if (uVar4 != 0xffff) {
          bVar3 = ((heap.u32((0x00887452) + (iVar8 + uVar5) * 4)) & 0xff);
          pbVar7 = ((heap.u32((0x00971ef4) + ((((((uVar4 >>> 8) << 0xc | (uVar4 & 0xff) << 5) & 0xffff) >>> 5 | ((((uVar4 >>> 8) << 5) & 0xffff) >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
          do {
            if ((((heap.u8(pbVar7) & 0x3c) == 0x10) && (bVar3 == heap.u8(pbVar7 + (2)))) && (heap.u8(pbVar7 + (4)) == 0)) {
              (regs.eax = FUN_00448a45(heap));
            }
            pbVar1 = ((pbVar7 + 1) >>> 0);
            pbVar7 = ((pbVar7 + 8) >>> 0);
          } while ((heap.u8(pbVar1) & 0x80) == 0);
        }
        uVar5 = ((uVar5 + 1) >>> 0);
      } while (uVar5 < 4);
    }
  }
  return 1;
}
