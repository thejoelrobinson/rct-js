// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43c6b2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_0043c6b2(heap) {
  let in_EAX = regs.eax >>> 0;
  let in_CX = regs.ecx & 0xffff;
  let in_EDX = regs.edx >>> 0;
  let uVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  let pbVar4 = 0;
  let pbVar5 = 0;
  if ((((in_EAX) & 0xffff) < 0x1000) && (in_CX < 0x1000)) {
    uVar3 = ((in_CX << 7 | in_CX >>> 9 | ((in_EAX) & 0xffff)) & 0xffff);
    pbVar4 = ((heap.u32((0x00971ef4) + (((uVar3 >>> 5 | uVar3 << 0xb) & 0xffff)) * 4)) >>> 0);
    bVar2 = ((heap.u8(pbVar4)) & 0xff);
    while ((bVar2 & 0x3c) != 0) {
      pbVar4 = ((pbVar4 + 8) >>> 0);
      bVar2 = ((heap.u8(pbVar4)) & 0xff);
    }
    if ((((heap.u8(pbVar4 + (5)) & 0x1f) << 2) & 0xff) <= heap.u8(pbVar4 + (2))) {
      bVar2 = ((heap.u8(pbVar4 + (2))) & 0xff);
      uVar1 = ((((CONCAT11(bVar2 + 4, bVar2)) >>> 0)) >>> 0);
      if ((heap.u8(pbVar4 + (4)) & 0x10) != 0) {
        uVar1 = ((((CONCAT11(bVar2 + 8, bVar2)) >>> 0)) >>> 0);
      }
      do {
        pbVar5 = ((pbVar4) >>> 0);
        if ((heap.u8(pbVar5 + (1)) & 0x80) != 0) {
          return 1;
        }
        pbVar4 = ((pbVar5 + 8) >>> 0);
      } while ((((heap.u8(pbVar5 + (0xb)) <= ((uVar1) & 0xff)) || (((uVar1 >>> 8) & 0xff) < heap.u8(pbVar5 + (10)))) || (bVar2 = ((heap.u8(pbVar4) & 0x3c) & 0xff), bVar2 == 4)) || ((bVar2 == 0x14 || ((bVar2 == 0xc && ((heap.u32(((0x006e1ec8) >>> 0) + (((heap.u8(pbVar5 + (0xc))) >>> 0) * 2) * 4) & 1) == 0))))));
    }
  }
  return 1;
}
