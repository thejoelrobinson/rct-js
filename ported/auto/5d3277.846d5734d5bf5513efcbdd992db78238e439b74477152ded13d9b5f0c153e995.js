// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d3277.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_005d3277(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let puVar6 = 0;
  let puVar7 = 0;
  puVar6 = ((0xffffffff) >>> 0);
  uVar4 = ((0) & 0xffff);
  uVar3 = ((in_EDX & 0x7fffffff) >>> 0);
  bVar2 = ((false) & 0xff);
  do {
    uVar5 = ((0) & 0xffff);
    do {
      puVar7 = ((heap.u32((0x00971ef4) + (((((uVar5 << 7 | uVar5 >>> 9 | uVar4) & 0xffff) >>> 5 | (uVar5 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
      do {
        uVar3 = ((CONCAT11(heap.u8(puVar7), ((uVar3) << 24 >> 24)) & 0xffff3cff) >>> 0);
        if (((((uVar3 >>> 8)) << 24 >> 24) == 8) && (((uVar3) << 24 >> 24) == heap.u8(puVar7 + (7)))) {
          if (puVar6 == 0xffffffff) {
            LAB_005d32fd: puVar6 = ((puVar7) >>> 0);
            if ((heap.u8(puVar7 + (4)) != 2) && (heap.u8(puVar7 + (4)) != 3)) {
              if ((heap.u32((0x006559d8) + (((((heap.u8(puVar7 + (4))) & 0xff)) >>> 0) * 0x10) * 4) & 0x10) != 0) {
                bVar2 = ((true) & 0xff);
              }
            }
          } else {
            if (((!bVar2) && (heap.u8(puVar7 + (4)) != 2)) && (heap.u8(puVar7 + (4)) != 3)) {
            if ((heap.u32((0x006559d8) + (((((heap.u8(puVar7 + (4))) & 0xff)) >>> 0) * 0x10) * 4) & 0x10) != 0) {
              /* goto LAB_005d32fd — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d3277/LAB_005d32fd"); return 0;
            }
          }
          }
        }
        pbVar1 = ((puVar7 + 1) >>> 0);
        puVar7 = ((puVar7 + 8) >>> 0);
      } while ((heap.u8(pbVar1) & 0x80) == 0);
      uVar5 = ((uVar5 + 0x20) & 0xffff);
    } while (uVar5 < 0x1000);
    uVar4 = ((uVar4 + 0x20) & 0xffff);
    if (0xfff < uVar4) {
      return;
    }
  } while (true);
}
