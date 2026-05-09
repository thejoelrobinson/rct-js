// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4202b2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00423677 } from "./423677.js";
export function FUN_004202b2(heap) {
  let pbVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let extraout_CX = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let bVar7 = 0;
  let extraout_DX = 0;
  let iVar8 = 0;
  let iVar9 = 0;
  let unaff_EDI = regs.edi >>> 0;
  uVar6 = ((0) >>> 0);
  do {
    if ((heap.i16((unaff_EDI + uVar6 * 2 + 0x2a)) | 0) != -1) {
      bVar7 = ((heap.u8((unaff_EDI + uVar6 * 2 + 0x32))) & 0xff);
      sVar2 = (((regs.eax = FUN_00423677(heap))) & 0xffff);
      if (((((bVar7) & 0xffff) << 2) & 0xffff) < extraout_DX) {
        return;
      }
      uVar4 = ((extraout_CX - 0xa0) & 0xffff);
      iVar9 = ((0) >>> 0);
      uVar5 = ((sVar2 - 0xa0) & 0xffff);
      do {
        do {
          uVar3 = ((uVar5) & 0xffff);
          iVar8 = ((iVar9) >>> 0);
          if ((uVar3 < 0xfff) && (uVar4 < 0xfff)) {
            uVar5 = ((uVar4 << 7 | uVar4 >>> 9 | uVar3) & 0xffff);
            iVar9 = ((heap.u32((0x00971ef4) + (((uVar5 >>> 5 | uVar5 << 0xb) & 0xffff)) * 4)) >>> 0);
            do {
              pbVar1 = (((iVar9 + 1)) >>> 0);
              iVar9 = ((iVar9 + 8) >>> 0);
            } while ((heap.u8(pbVar1) & 0x80) == 0);
          }
          bVar7 = ((((iVar8) << 24 >> 24) + 1) & 0xff);
          iVar9 = ((CONCAT31((regs.eax = callIndirect(heap, int3, ((iVar8) >>> 0) >>> 8)), bVar7)) >>> 0);
          uVar5 = ((uVar3 + 0x20) & 0xffff);
        } while (bVar7 < 0xb);
        uVar4 = ((uVar4 + 0x20) & 0xffff);
        bVar7 = (((((((iVar8) >>> 0) >>> 8)) << 24 >> 24) + 1) & 0xff);
        iVar9 = ((((bVar7) >>> 0) << 8) >>> 0);
        uVar5 = ((uVar3 - 0x140) & 0xffff);
      } while (bVar7 < 0xb);
      return;
    }
    uVar6 = ((uVar6 + 1) >>> 0);
  } while (uVar6 < 4);
  return;
}
