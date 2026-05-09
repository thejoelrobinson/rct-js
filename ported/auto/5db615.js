// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5db615.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_005db615(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let cVar3 = 0;
  let uVar4 = 0;
  let cVar5 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_DX = regs.edx & 0xffff;
  let unaff_BX = regs.ebx & 0xffff;
  let uVar6 = 0;
  let pbVar7 = 0;
  let unaff_ESI = regs.esi >>> 0;
  uVar4 = ((heap.u16((unaff_ESI + 0x3c)) >>> 2) & 0xffff);
  uVar6 = ((in_DX << 7 | in_DX >>> 9 | unaff_BX) & 0xffff);
  pbVar7 = ((heap.u32((0x00971ef4) + (((uVar6 >>> 5 | uVar6 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    bVar2 = ((((uVar4) & 0xff)) & 0xff);
    if ((heap.u8(pbVar7) & 0x3c) == 0) {
      uVar4 = ((CONCAT11(heap.u8(pbVar7 + (5)), bVar2) & 0x1fff) & 0xffff);
      cVar3 = ((((uVar4) << 24 >> 24)) & 0xff);
      cVar5 = (((((uVar4 >>> 8)) << 24 >> 24) * 4) & 0xff);
      uVar4 = ((CONCAT11(cVar5, cVar3)) & 0xffff);
      if (cVar3 != cVar5) {
        return in_EAX;
      }
    } else {
      uVar4 = ((CONCAT11(heap.u8(pbVar7 + (2)) - 4, bVar2)) & 0xffff);
      if ((((heap.u8(pbVar7 + (2)) - 4) & 0xff) < bVar2) && (uVar4 = ((CONCAT11(heap.u8(pbVar7 + (3)) + 4, bVar2)) & 0xffff), bVar2 < ((heap.u8(pbVar7 + (3)) + 4) & 0xff))) {
        return in_EAX;
      }
    }
    pbVar1 = ((pbVar7 + 1) >>> 0);
    pbVar7 = ((pbVar7 + 8) >>> 0);
    if ((heap.u8(pbVar1) & 0x80) != 0) {
      return in_EAX;
    }
  } while (true);
}
