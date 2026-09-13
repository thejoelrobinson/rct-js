// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/429502.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_00429502(heap) {
  let psVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  if ((heap.u32(0x0087c3bc) & 1) == 0) {
    uVar3 = ((0) >>> 0);
    do {
      if (heap.u32((0x0087d738) + (uVar3 * 2) * 4) != 0) {
        psVar1 = ((0x0087d738 + uVar3 * 2) >>> 0);
        heap.setU32(psVar1, (heap.i16(psVar1) + -1) & 0xffffffff);
        if (heap.i16(psVar1) == 0) {
          (regs.eax = FUN_005e5301(heap));
        }
      }
      uVar3 = ((uVar3 + 1) >>> 0);
    } while (uVar3 < 4);
    return;
  }
  do {
    bVar2 = (((regs.eax = FUN_005df40c(heap))) & 0xff);
    bVar2 = ((((((((bVar2) & 0xffff) * (CONCAT11(7, bVar2) >>> 8)) & 0xffff) >>> 8) & 0xff)) & 0xff);
    uVar3 = ((0) >>> 0);
    while (heap.u32((0x0087d738) + (uVar3 * 2) * 4) == 0 || (((bVar2) & 0xffff) != heap.u32((0x0087d73a) + (uVar3 * 2) * 4))) {
      uVar3 = ((uVar3 + 1) >>> 0);
      if (3 < uVar3) {
        return (regs.eax = callIndirect(heap, heap.u32((0x00429544) + (bVar2) * 4)));
      }
    }
  } while (true);
}
