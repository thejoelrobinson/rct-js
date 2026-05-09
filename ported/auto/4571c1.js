// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4571c1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
export function FUN_004571c1(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar5 = 0;
  let iVar6 = 0;
  uVar4 = ((heap.u32(0x0087c398)) & 0xffff);
  while (uVar4 != 0xffff) {
    uVar5 = ((((uVar4) >>> 0)) >>> 0);
    iVar6 = ((uVar5 * 0x100) >>> 0);
    if ((heap.u32((0x00743bc2) + (iVar6) * 4) == 0) && (heap.u32((0x00743ba2) + (uVar5 * 0x80) * 4) != -0x8000)) {
      uVar4 = ((heap.u32((0x00743ba6) + (uVar5 * 0x80) * 4) - heap.i16((unaff_ESI + 0x12))) & 0xffff);
      if (((uVar4) << 16 >> 16) < 0) {
        uVar4 = ((-uVar4) & 0xffff);
      }
      if (uVar4 < 0x31) {
        uVar4 = ((heap.u32((0x00743ba2) + (uVar5 * 0x80) * 4) - heap.i16((unaff_ESI + 0xe))) & 0xffff);
        if (((uVar4) << 16 >> 16) < 0) {
          uVar4 = ((-uVar4) & 0xffff);
        }
        uVar3 = ((heap.u32((0x00743ba4) + (uVar5 * 0x80) * 4) - heap.i16((unaff_ESI + 0x10))) & 0xffff);
        if (((uVar3) << 16 >> 16) < 0) {
          uVar3 = ((-uVar3) & 0xffff);
        }
        if ((uVar4 < 0x61) && (uVar3 < 0x61)) {
          if (heap.u32((0x00743bbf) + (iVar6) * 4) == 5) {
            pbVar1 = ((0x00743bcf + iVar6) >>> 0);
            bVar2 = ((heap.u8(pbVar1)) & 0xff);
            heap.setU32(pbVar1, (heap.u8(pbVar1) + 4) & 0xffffffff);
            if (0xfb < bVar2) {
              heap.setU32(((0x00743bcf) + (iVar6) * 4), (0xff) & 0xffffffff);
            }
          } else {
            if (heap.u32((0x00743bbf) + (iVar6) * 4) == 6) {
            heap.setI16((0x00743c0e + iVar6), (heap.i16((0x00743c0e + iVar6)) + -200) & 0xffff);
            pbVar1 = ((0x00743bcf + iVar6) >>> 0);
            bVar2 = ((heap.u8(pbVar1)) & 0xff);
            heap.setU32(pbVar1, (heap.u8(pbVar1) + 3) & 0xffffffff);
            if (0xfc < bVar2) {
              heap.setU32(((0x00743bcf) + (iVar6) * 4), (0xff) & 0xffffffff);
            }
          }
          }
        }
      }
    }
    uVar4 = ((heap.u32((0x00743b98) + (uVar5 * 0x80) * 4)) & 0xffff);
  }
  return;
}
