// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5db339.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005db5d7 } from "./5db5d7.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_005db339(heap) {
  let sVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  let iVar5 = 0;
  let iVar6 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let puVar7 = 0;
  let uVar8 = 0;
  heap.setU8((unaff_ESI + (0x50)), (8) & 0xff);
  (regs.eax = FUN_005db5d7(heap));
  iVar6 = ((heap.i32((unaff_ESI + 0x28)) >>> 10) >>> 0);
  puVar7 = ((unaff_ESI) >>> 0);
  while (true) {
    heap.setU8((puVar7 + (0x51)), (0) & 0xff);
    sVar1 = ((heap.i16((0x0065eada + ((((heap.u8(puVar7 + (0x1e))) & 0xff) >>> 1) >>> 0) * 4))) & 0xffff);
    iVar4 = ((heap.i32((0x0065e7dc + ((((heap.u8(puVar7 + (0x1f))) & 0xff)) >>> 0) * 4))) >>> 0);
    iVar5 = ((heap.i32((0x0065e8bc + ((((heap.u8(puVar7 + (0x1f))) & 0xff)) >>> 0) * 4))) >>> 0);
    heap.setI16((puVar7 + 0xb6), (((((((((heap.i16((0x0065ead8 + ((((heap.u8(puVar7 + (0x1e))) & 0xff) >>> 1) >>> 0) * 4))) >>> 0) * (iVar4 >>> 0xf) >>> 0x10) * iVar6) >>> 0) >>> 8)) << 16 >> 16)) & 0xffff);
    heap.setI16((puVar7 + 0xc0), (((((((((sVar1) >>> 0) * (iVar4 >>> 0xf) >>> 0x10) * iVar6) >>> 0) >>> 8)) << 16 >> 16)) & 0xffff);
    heap.setI16((puVar7 + 0x4e), (((((((iVar5 >>> 0x17) * iVar6) >>> 0) >>> 8)) << 16 >> 16)) & 0xffff);
    uVar8 = (((regs.eax = FUN_005df40c(heap))) >>> 0);
    iVar6 = (((((((uVar8) >>> 0) >>> 0x20)) >>> 0)) >>> 0);
    heap.setU16((puVar7 + 0xb6), (heap.i16((puVar7 + 0xb6)) + ((((uVar8) & 0xffff) & 0xf) - 8)) & 0xffff);
    heap.setU16((puVar7 + 0xc0), (heap.i16((puVar7 + 0xc0)) + ((((((uVar8) >>> 0) >>> 4) & 0xffff) & 0xf) - 8)) & 0xffff);
    heap.setU16((puVar7 + 0x4e), (heap.i16((puVar7 + 0x4e)) + ((((((uVar8) >>> 0) >>> 8) & 0xffff) & 0xf) - 8)) & 0xffff);
    heap.setU16((puVar7 + 0x38), (0) & 0xffff);
    heap.setU16((puVar7 + 0x3a), (0) & 0xffff);
    heap.setU16((puVar7 + 0x3c), (0) & 0xffff);
    if (heap.u16((puVar7 + 0x3e)) == 0xffff) {
      break;
    }
    puVar7 = ((0x00743b94 + heap.u32((puVar7 + 0x3e)) * 0x100) >>> 0);
  }
  uVar2 = ((heap.u16((unaff_ESI + 0x40))) & 0xffff);
  uVar3 = ((heap.u16((puVar7 + 0x42))) & 0xffff);
  heap.setU16((0x00743bd6 + ((uVar2) >>> 0) * 0x100), (uVar3) & 0xffff);
  heap.setU16((0x00743bd4 + ((uVar3) >>> 0) * 0x100), (uVar2) & 0xffff);
  heap.setU32((unaff_ESI + 0x28), (0) & 0xffffffff);
  return;
}
