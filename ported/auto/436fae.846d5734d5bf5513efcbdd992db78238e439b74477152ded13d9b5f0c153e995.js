// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/436fae.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0043725f } from "./43725f.js";
export function FUN_00436fae(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let bVar3 = 0;
  let bVar4 = 0;
  let in_EAX = regs.eax >>> 0;
  let bVar5 = 0;
  let in_CX = regs.ecx & 0xffff;
  let uVar6 = 0;
  let bVar7 = 0;
  let bVar8 = 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_BL = regs.ebx & 0xff;
  let bVar9 = 0;
  let cVar10 = 0;
  let pbVar11 = 0;
  heap.setU32(0x00628af6, (1) >>> 0);
  uVar6 = ((((in_EAX) & 0xffff)) & 0xffff);
  if ((((0xfdf < ((uVar6) << 16 >> 16)) || (0xfdf < ((in_CX) << 16 >> 16))) || (((uVar6) << 16 >> 16) < 0x20)) || (((in_CX) << 16 >> 16) < 0x20)) {
    heap.setU32(0x00991efc, (0x458) >>> 0);
    return 1;
  }
  uVar6 = ((in_CX << 7 | in_CX >>> 9 | uVar6) & 0xffff);
  pbVar11 = ((heap.u32((0x00971ef4) + (((uVar6 >>> 5 | uVar6 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    bVar8 = ((((in_EDX) & 0xff)) & 0xff);
    bVar3 = ((((((in_EDX) >>> 0) >>> 8) & 0xff)) & 0xff);
    bVar9 = ((unaff_BL) & 0xff);
    if ((heap.u8(pbVar11) & 0x3c) == 0) {
      if (((heap.u8(pbVar11 + (5)) & 0x1f) != 0) && (((bVar2 = (((heap.u8(pbVar11 + (5)) & 0x1f) << 2) & 0xff), bVar8 < bVar2 && (heap.u8(pbVar11 + (2)) < bVar3)) && (heap.setU32(0x00628af6, (heap.u32(0x00628af6) | 4) >>> 0), bVar2 < bVar3)))) {
        heap.setU32(0x00991efc, (0x459) >>> 0);
        return 1;
      }
      if ((unaff_BL & 0xf0) != 0xf0) {
        bVar2 = ((heap.u8(pbVar11 + (2))) & 0xff);
        if (bVar2 < bVar3) {
          bVar9 = ((heap.u8(pbVar11 + (4))) & 0xff);
          uVar6 = ((CONCAT11(bVar9, unaff_BL) & 0x1fff) & 0xffff);
          cVar10 = (((((uVar6 >>> 8)) << 24 >> 24)) & 0xff);
          bVar3 = ((bVar2) & 0xff);
          if (((bVar9 & 1) != 0) && (bVar3 = ((bVar2 + 4) & 0xff), cVar10 == 27)) {
            bVar3 = ((bVar2 + 8) & 0xff);
          }
          bVar4 = ((bVar2) & 0xff);
          if (((bVar9 & 2) != 0) && (bVar4 = ((bVar2 + 4) & 0xff), cVar10 == 23)) {
            bVar4 = ((bVar2 + 8) & 0xff);
          }
          bVar5 = ((bVar2) & 0xff);
          if (((bVar9 & 4) != 0) && (bVar5 = ((bVar2 + 4) & 0xff), cVar10 == 30)) {
            bVar5 = ((bVar2 + 8) & 0xff);
          }
          bVar7 = ((bVar2) & 0xff);
          if (((bVar9 & 8) != 0) && (bVar7 = ((bVar2 + 4) & 0xff), cVar10 == 29)) {
            bVar7 = ((bVar2 + 8) & 0xff);
          }
          bVar9 = ((((uVar6) & 0xff)) & 0xff);
          bVar2 = ((bVar8 + 8) & 0xff);
          if ((((unaff_BL & 1) != 0) && ((((unaff_BL & 0x10) == 0 && (bVar8 < bVar3)) || (bVar2 < bVar3)))) || (((((unaff_BL & 2) != 0 && ((((unaff_BL & 0x20) == 0 && (bVar8 < bVar4)) || (bVar2 < bVar4)))) || (((unaff_BL & 4) != 0 && ((((unaff_BL & 0x40) == 0 && (bVar8 < bVar5)) || (bVar2 < bVar5)))))) || (((unaff_BL & 8) != 0 && ((((unaff_BL & 0x80) == 0 && (bVar8 < bVar7)) || (bVar2 < bVar7)))))))) {
            (regs.eax = FUN_0043725f(heap));
          }
          return 1;
        } else {
          heap.setU32(0x00628af6, (heap.u32(0x00628af6) & 0xfe | 2) >>> 0);
        }
      }
    } else {
      if ((((heap.u8(pbVar11) & 0x3c) != 0x3c) && (bVar8 < heap.u8(pbVar11 + (3)))) && ((heap.u8(pbVar11 + (2)) < bVar3 && (((heap.u8(pbVar11 + (1)) & 0x10) == 0 && ((heap.u8(pbVar11 + (1)) & unaff_BL & 0xf) != 0)))))) {
      LAB_0043710e: (regs.eax = FUN_0043725f(heap));
      return 1;
    }
    }
    unaff_BL = ((bVar9) & 0xff);
    pbVar1 = ((pbVar11 + 1) >>> 0);
    pbVar11 = ((pbVar11 + 8) >>> 0);
    if ((heap.u8(pbVar1) & 0x80) != 0) {
      return 1;
    }
  } while (true);
}
