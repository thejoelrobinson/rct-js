// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4410df.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { uint3 } from "../../runtime/win32.js";
import { CONCAT11, CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0044049c } from "./44049c.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_00444bd4 } from "./444bd4.js";
import { FUN_00444c74 } from "./444c74.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_004410df(heap) {
  let puVar1 = 0;
  let bVar2 = 0;
  let cVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar8 = 0;
  if (399 < heap.u32(0x0087c3a0)) {
    (regs.eax = FUN_00444bd4(heap));
    (regs.eax = FUN_00444c74(heap));
    heap.setU32(unaff_ESI, (1) & 0xffffffff);
    heap.setU8((unaff_ESI + (0x2d)), (0) & 0xff);
    heap.setU8((unaff_ESI + (0x2a)), (1) & 0xff);
    heap.setU8((unaff_ESI + (0x2b)), (0) & 0xff);
    heap.setU8((unaff_ESI + (0x71)), (0xff) & 0xff);
    heap.setU8((unaff_ESI + (0x6d)), (0) & 0xff);
    heap.setU8((unaff_ESI + (0x70)), (0) & 0xff);
    heap.setU8((unaff_ESI + (0xe0)), (0) & 0xff);
    heap.setU8((unaff_ESI + (0x6e)), (0) & 0xff);
    heap.setU16((unaff_ESI + 200), (0) & 0xffff);
    uVar8 = ((((((heap.u8(unaff_ESI + (0x6e))) & 0xff)) >>> 0)) >>> 0);
    puVar1 = ((heap.u32((0x0062d644) + (((((heap.u8(unaff_ESI + (0x2d))) & 0xff)) >>> 0) * 2) * 4)) >>> 0);
    heap.setU8((unaff_ESI + (0x14)), (heap.u8(puVar1 + (uVar8 * 4))) & 0xff);
    heap.setU8((unaff_ESI + (9)), (heap.u8(puVar1 + (uVar8 * 4 + 1))) & 0xff);
    heap.setU8((unaff_ESI + (0x15)), (heap.u8(puVar1 + (uVar8 * 4 + 2))) & 0xff);
    heap.setU8((unaff_ESI + (0x1e)), (0) & 0xff);
    (regs.eax = FUN_00444927(heap));
    (regs.eax = FUN_005e53ca(heap));
    uVar6 = (((regs.eax = FUN_005df40c(heap))) >>> 0);
    uVar8 = ((uVar6 >>> 5) >>> 0);
    uVar7 = ((uVar8 | uVar6 << 0x1b) >>> 0);
    heap.setU8((unaff_ESI + (0x41)), ((((uVar6) & 0xff) & 0x1f) + 0x2d) & 0xff);
    heap.setU8((unaff_ESI + (0xc4)), (0) & 0xff);
    heap.setU8((unaff_ESI + (0x79)), (0xff) & 0xff);
    heap.setU8((unaff_ESI + (0x2e)), (0) & 0xff);
    heap.setU8((unaff_ESI + (0xad)), (0xff) & 0xff);
    heap.setU8((unaff_ESI + (0xb0)), (0xff) & 0xff);
    heap.setU8((unaff_ESI + (0x45)), (0) & 0xff);
    uVar6 = ((uVar7 >>> 3) >>> 0);
    bVar2 = (((((uVar8) & 0xff) & 7) + 3) & 0xff);
    uVar5 = ((CONCAT11(bVar2, bVar2)) & 0xffff);
    if (7 < bVar2) {
      uVar5 = ((CONCAT11(7, bVar2)) & 0xffff);
    }
    bVar2 = ((((uVar5 >>> 8) & 0xff)) & 0xff);
    uVar4 = ((CONCAT11(bVar2 - 3, ((uVar5) << 24 >> 24))) & 0xffff);
    if (bVar2 < 3) {
      uVar4 = ((uVar5 & 0xff) & 0xffff);
    }
    if (6 < ((uVar4) & 0xff)) {
      uVar4 = ((((CONCAT31((regs.eax = callIndirect(heap, (regs.eax = callIndirect(heap, uint3, 0)), uVar4 >>> 8)), 0xf)) & 0xffff)) & 0xffff);
    }
    heap.setU8((unaff_ESI + (0x43)), (((uVar4) << 24 >> 24) << 4 | ((uVar4 >>> 8) & 0xff)) & 0xff);
    heap.setU8((unaff_ESI + (0x44)), (heap.u32((0x0062d630) + ((uVar8 & 0x38) >>> 3) * 4)) & 0xff);
    uVar8 = ((uVar6 & 0xf8f80000 | uVar8 << 0x1d) >>> 0);
    cVar3 = (((((uVar8 >>> 0x13)) << 24 >> 24) + -0xf + heap.u8(0x0087d0c1)) & 0xff);
    if (heap.u8(0x0087d0c1) == 0) {
      cVar3 = ((cVar3 + -0x80) & 0xff);
    }
    heap.setU8((unaff_ESI + (0x3a)), (cVar3) & 0xff);
    heap.setU8((unaff_ESI + (0x3b)), (cVar3) & 0xff);
    heap.setU8((unaff_ESI + (0x3c)), (0) & 0xff);
    heap.setU8((unaff_ESI + (0x3d)), (0) & 0xff);
    heap.setU8((unaff_ESI + (0x3e)), ((((uVar8 >>> 0x1b) & 0xff) - 0xf) + heap.u8(0x0087d0ce)) & 0xff);
    heap.setU8((unaff_ESI + (0x3f)), ((((((uVar6 << 0xd) >>> 0x10) & 0xff) & 0x1f) - 0xf) + heap.u8(0x0087d0cf)) & 0xff);
    heap.setU8((unaff_ESI + (0x40)), (0) & 0xff);
    heap.setU8((unaff_ESI + (0x42)), (0) & 0xff);
    heap.setU32((unaff_ESI + 0x7c), (0) & 0xffffffff);
    heap.setU32((unaff_ESI + 0x80), (0) & 0xffffffff);
    heap.setU32((unaff_ESI + 0x84), (0) & 0xffffffff);
    heap.setU32((unaff_ESI + 0x88), (0) & 0xffffffff);
    heap.setU32((unaff_ESI + 0x8c), (0) & 0xffffffff);
    heap.setU32((unaff_ESI + 0x90), (0) & 0xffffffff);
    heap.setU32((unaff_ESI + 0x94), (0) & 0xffffffff);
    heap.setU32((unaff_ESI + 0x98), (0) & 0xffffffff);
    heap.setU8((unaff_ESI + (0x2f)), (0) & 0xff);
    heap.setU32((unaff_ESI + 0x48), (0) & 0xffffffff);
    heap.setU32((unaff_ESI + 0x4c), (0) & 0xffffffff);
    heap.setU32((unaff_ESI + 0x50), (0) & 0xffffffff);
    heap.setU32((unaff_ESI + 0x54), (0) & 0xffffffff);
    heap.setU32((unaff_ESI + 0x58), (0) & 0xffffffff);
    heap.setU32((unaff_ESI + 0x5c), (0) & 0xffffffff);
    heap.setU32((unaff_ESI + 0x60), (0) & 0xffffffff);
    heap.setU32((unaff_ESI + 100), (0) & 0xffffffff);
    heap.setI32((unaff_ESI + 0x9c), (heap.u32(0x008d4224)) & 0xffffffff);
    heap.setU32(0x008d4224, (heap.u32(0x008d4224) + 1) >>> 0);
    heap.setU16((unaff_ESI + 0x22), (0x2ff) & 0xffff);
    uVar5 = ((((uVar7 >>> 0x1e) & 0xffff) * 100 + -100 + heap.u8(0x0087d0cc)) & 0xffff);
    if (heap.u8(0x0087d0cc) == 0) {
      uVar5 = ((500) & 0xffff);
    }
    if ((heap.u8(0x0087d0cc) | 0) == -1) {
      uVar5 = ((0) & 0xffff);
    }
    heap.setU32((unaff_ESI + 0xa0), (((uVar5) >>> 0)) & 0xffffffff);
    heap.setU32((unaff_ESI + 0xa4), (0) & 0xffffffff);
    heap.setU32((unaff_ESI + 0xa8), (0xffffffff) & 0xffffffff);
    heap.setU32((unaff_ESI + 0xcc), (0xffffffff) & 0xffffffff);
    heap.setU16((unaff_ESI + 0xca), (0) & 0xffff);
    heap.setU8((unaff_ESI + (0xc5)), (0xff) & 0xff);
    heap.setU8((unaff_ESI + (0xe1)), (0) & 0xff);
    heap.setU8((unaff_ESI + (0xe3)), (0) & 0xff);
    heap.setU8((unaff_ESI + (0xef)), (0) & 0xff);
    heap.setU16((unaff_ESI + 0xe4), (0) & 0xffff);
    heap.setU16((unaff_ESI + 0xe6), (0) & 0xffff);
    heap.setU16((unaff_ESI + 0xe8), (0) & 0xffff);
    heap.setU16((unaff_ESI + 0xea), (0) & 0xffff);
    heap.setU8((unaff_ESI + (0xec)), (0) & 0xff);
    heap.setU8((unaff_ESI + (0xed)), (0) & 0xff);
    heap.setU8((unaff_ESI + (0xee)), (0) & 0xff);
    heap.setU8((unaff_ESI + (0xf2)), (0) & 0xff);
    heap.setU8((unaff_ESI + (0xf3)), (0) & 0xff);
    heap.setU8((unaff_ESI + (0xf4)), (0) & 0xff);
    heap.setU8((unaff_ESI + (0x30)), ((((((((((uVar6) & 0xff)) & 0xffff) * 0x1b) & 0xffff) >>> 8)) << 24 >> 24)) & 0xff);
    heap.setU8((unaff_ESI + (0x31)), ((((((((uVar6 >>> 8) & 0xffff) * 0x1b) & 0xffff) >>> 8)) << 24 >> 24)) & 0xff);
    cVar3 = (((((uVar6 >>> 0x10) & 0xff) & 0x3f) + 0x41) & 0xff);
    heap.setU8((unaff_ESI + (0x38)), (cVar3) & 0xff);
    heap.setU8((unaff_ESI + (0x39)), (cVar3) & 0xff);
    (regs.eax = FUN_0044049c(heap));
    heap.setU32(0x0087c81e, (heap.u32(0x0087c81e) + 1) >>> 0);
    return;
  }
  return;
}
