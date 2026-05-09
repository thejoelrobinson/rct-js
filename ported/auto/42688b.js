// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42688b.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e56d3 } from "./5e56d3.js";
export function FUN_0042688b(heap) {
  let pbVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_CX = regs.ecx & 0xffff;
  let in_EDX = regs.edx >>> 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let puVar5 = 0;
  uVar3 = ((heap.u8(unaff_ESI) & 3) >>> 0);
  uVar4 = (((in_CX + heap.u32((0x0065247a) + (uVar3 * 2) * 4)) * 0x80 | ((in_CX + heap.u32((0x0065247a) + (uVar3 * 2) * 4)) & 0xffff) >>> 9 | ((in_EAX) << 16 >> 16) + heap.u32((0x00652478) + (uVar3 * 2) * 4)) & 0xffff);
  puVar5 = ((heap.u32((0x00971ef4) + (((uVar4 >>> 5 | uVar4 << 0xb) & 0xffff)) * 4)) >>> 0);
  while (true) {
    uVar4 = ((CONCAT11(heap.u8(puVar5), ((uVar3) << 24 >> 24)) & 0x3cff) & 0xffff);
    uVar3 = ((((uVar4) >>> 0)) >>> 0);
    if (((((((uVar4 >>> 8)) << 24 >> 24) == 8) && (heap.u8(unaff_ESI + (7)) == heap.u8(puVar5 + (7)))) && (heap.u8(unaff_ESI + (2)) == heap.u8(puVar5 + (2)))) && (heap.u8(puVar5 + (4)) == 101)) {
      break;
    }
    pbVar1 = ((puVar5 + 1) >>> 0);
    puVar5 = ((puVar5 + 8) >>> 0);
    if ((heap.u8(pbVar1) & 0x80) != 0) {
      LAB_0042693d: return 1;
    }
  }
  uVar2 = ((((((uVar4) << 24 >> 24) * 4 + 9) & 0xffff)) & 0xffff);
  uVar4 = ((uVar2 & 0xf) & 0xffff);
  heap.setU8((puVar5 + ((((((uVar4) << 16 >> 16)) >>> 0) >>> 3) + 5)), (heap.u8(puVar5 + ((((((uVar4) << 16 >> 16)) >>> 0) >>> 3) + 5)) & ~(1 << (uVar2 & 7))) & 0xff);
  uVar2 = ((((((uVar4) << 24 >> 24) + 3) & 0xffff)) & 0xffff);
  uVar4 = ((uVar2 & 0xf) & 0xffff);
  heap.setU8((puVar5 + ((((((uVar4) << 16 >> 16)) >>> 0) >>> 3) + 5)), (heap.u8(puVar5 + ((((((uVar4) << 16 >> 16)) >>> 0) >>> 3) + 5)) & ~(1 << (uVar2 & 7))) & 0xff);
  uVar2 = ((((((uVar4) << 24 >> 24) - 2) & 0xffff)) & 0xffff);
  uVar4 = ((uVar2 & 0xf) & 0xffff);
  heap.setU8((puVar5 + ((((((uVar4) << 16 >> 16)) >>> 0) >>> 3) + 5)), (heap.u8(puVar5 + ((((((uVar4) << 16 >> 16)) >>> 0) >>> 3) + 5)) & ~(1 << (uVar2 & 7))) & 0xff);
  uVar2 = ((((((uVar4) << 24 >> 24) + 1) & 0xffff)) & 0xffff);
  uVar4 = ((uVar2 & 0xf) & 0xffff);
  heap.setU8((puVar5 + ((((((uVar4) << 16 >> 16)) >>> 0) >>> 3) + 5)), (heap.u8(puVar5 + ((((((uVar4) << 16 >> 16)) >>> 0) >>> 3) + 5)) & ~(1 << (uVar2 & 7))) & 0xff);
  uVar4 = ((((((uVar4) << 24 >> 24) + 4) & 0xffff)) & 0xffff);
  heap.setU8((puVar5 + (((((((uVar4 & 0xf)) << 16 >> 16)) >>> 0) >>> 3) + 5)), (heap.u8(puVar5 + (((((((uVar4 & 0xf)) << 16 >> 16)) >>> 0) >>> 3) + 5)) & ~(1 << (uVar4 & 7))) & 0xff);
  (regs.eax = FUN_005e56d3(heap, puVar5));
  /* goto LAB_0042693d — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0042688b/LAB_0042693d"); return 0;
}
