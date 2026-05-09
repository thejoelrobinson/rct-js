// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/439822.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CARRY1 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00439822(heap) {
  let pbVar1 = 0;
  let pcVar2 = 0;
  let bVar3 = 0;
  let cVar4 = 0;
  let bVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let iVar9 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar10 = 0;
  if (heap.i8((unaff_ESI + 0x2e)) != 1) {
    if (((heap.i8((unaff_ESI + 0xad)) | 0) != -1) && (heap.setI16((unaff_ESI + 0xae), (heap.i16((unaff_ESI + 0xae)) + 1) & 0xffff), 0x2cf < heap.u16((unaff_ESI + 0xae)))) {
      heap.setU8((unaff_ESI + 0xad), (0xff) & 0xff);
    }
    uVar6 = ((0) >>> 0);
    iVar8 = ((0) >>> 0);
    uVar10 = ((0xffffffff) >>> 0);
    LAB_00439857: do {
      iVar9 = ((iVar8) >>> 0);
      uVar7 = ((uVar10) >>> 0);
      if ((heap.i8((unaff_ESI + 0xb0 + uVar6 * 4)) | 0) == -1) {
        break;
      }
      cVar4 = ((heap.i8((unaff_ESI + 0xb2 + uVar6 * 4))) & 0xff);
      if (cVar4 == 1) {
        pcVar2 = (((unaff_ESI + 0xb3 + uVar6 * 4)) >>> 0);
        heap.setU32(pcVar2, (heap.i8(pcVar2) + 1) & 0xffffffff);
        iVar9 = ((iVar8 + 1) >>> 0);
        if (0xdb < heap.u8((unaff_ESI + 0xb3 + uVar6 * 4))) {
          heap.setU8((unaff_ESI + 0xb3 + uVar6 * 4), (0) & 0xff);
          pcVar2 = (((unaff_ESI + 0xb2 + uVar6 * 4)) >>> 0);
          heap.setU32(pcVar2, (heap.i8(pcVar2) + 1) & 0xffffffff);
          iVar9 = ((iVar8) >>> 0);
        }
      } else {
        uVar7 = ((uVar6) >>> 0);
        if (cVar4 != 0) {
          pcVar2 = (((unaff_ESI + 0xb3 + uVar6 * 4)) >>> 0);
          cVar4 = ((heap.i8(pcVar2)) & 0xff);
          heap.setU32(pcVar2, (heap.i8(pcVar2) + 1) & 0xffffffff);
          uVar7 = ((uVar10) >>> 0);
          if (((cVar4 | 0) == -1) && (pcVar2 = (((unaff_ESI + 0xb2 + uVar6 * 4)) >>> 0), heap.setU32(pcVar2, (heap.i8(pcVar2) + 1) & 0xffffffff), 0x1b < heap.u8((unaff_ESI + 0xb2 + uVar6 * 4)))) {
            heap.setU8((unaff_ESI + 0x45), (heap.u8((unaff_ESI + 0x45)) | 1) & 0xff);
            for (uVar7 = ((uVar6) >>> 0); uVar7 != 4; uVar7 = (((uVar7 + 1) >>> 0)) >>> 0) {
              heap.setU32((unaff_ESI + 0xb0 + uVar7 * 4), (heap.u32((unaff_ESI + 0xb4 + uVar7 * 4))) & 0xffffffff);
            }
            heap.setU8((unaff_ESI + 0xc0), (0xff) & 0xff);
            /* goto LAB_00439857 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00439822/LAB_00439857"); return 0;
          }
        }
      }
      uVar6 = ((uVar6 + 1) >>> 0);
      iVar8 = ((iVar9) >>> 0);
      uVar10 = ((uVar7) >>> 0);
    } while (uVar6 < 5);
    if ((iVar9 == 0) && (uVar7 != 0xffffffff)) {
      heap.setU8((unaff_ESI + 0xb2 + uVar7 * 4), (1) & 0xff);
      heap.setU8((unaff_ESI + 0x45), (heap.u8((unaff_ESI + 0x45)) | 1) & 0xff);
    }
  }
  bVar5 = ((heap.u8((unaff_ESI + 0x38))) & 0xff);
  if ((heap.u16((unaff_ESI + 200)) & 2) != 0) {
    bVar5 = ((bVar5 >>> 1) & 0xff);
  }
  pbVar1 = (((unaff_ESI + 0x73)) >>> 0);
  bVar3 = ((heap.u8(pbVar1)) & 0xff);
  heap.setU32(pbVar1, (heap.u8(pbVar1) + bVar5) & 0xffffffff);
  if (!CARRY1(bVar3, bVar5)) {
    return;
  }
  return (regs.eax = callIndirect(heap, heap.u32((0x0062d4ac) + (heap.u8((unaff_ESI + 0x2b))) * 4)));
}
