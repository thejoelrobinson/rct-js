// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/44a3ba.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00440072 } from "./440072.js";
import { FUN_0044b9db } from "./44b9db.js";
import { FUN_0044ba3c } from "./44ba3c.js";
import { FUN_0044c464 } from "./44c464.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e43de } from "./5e43de.js";
import { FUN_005e5fcb } from "./5e5fcb.js";
export function FUN_0044a3ba(heap) {
  let puVar1 = 0;
  let uVar2 = 0;
  let bVar3 = 0;
  let uVar4 = 0;
  let in_EDX = regs.edx >>> 0;
  let puVar5 = 0;
  let extraout_EDX = 0;
  let psVar6 = 0;
  let uVar7 = 0;
  let sVar8 = 0;
  let uVar9 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let bVar10 = 0;
  let uVar11 = 0;
  LAB_0044a489: {
  puVar1 = ((in_EDX) >>> 0);
  do {
    puVar5 = ((puVar1) >>> 0);
    puVar1 = ((0x00743b94 + heap.u32((puVar5 + 0x40)) * 0x100) >>> 0);
  } while ((heap.i16((0x00743bd2 + heap.u32((puVar5 + 0x40)) * 0x100)) | 0) != -1);
  psVar6 = (((0x0088747e + ((((heap.u8(puVar5 + (0x30))) & 0xff)) >>> 0) * 0x260)) >>> 0);
  uVar9 = ((1) >>> 0);
  while (true) {
    bVar10 = ((heap.i16((puVar5 + 10)) == heap.i16(psVar6)) & 0xff);
    sVar8 = ((((uVar9) << 16 >> 16)) & 0xffff);
    if (bVar10) {
      break;
    }
    psVar6 = ((psVar6 + ((1) * 2)) >>> 0);
    uVar9 = ((((sVar8 + 1) >>> 0)) >>> 0);
  }
  heap.setU8(0x00631ca0, (in_EDX) & 0xff);
  uVar2 = (((regs.eax = FUN_005e3b2b(heap))) >>> 0);
  puVar1 = ((heap.u8(0x00631ca0)) >>> 0);
  if (!bVar10) {
    uVar11 = ((false) & 0xff);
    if (sVar8 == heap.i16((((unaff_ESI) >>> 0) + 0x15a))) {
      uVar7 = ((0) >>> 0);
      uVar4 = ((((((heap.u32(heap.u8(0x00631ca0) + (0xb3) * 4)) & 0xff)) >>> 0)) >>> 0);
      do {
        sVar8 = ((((uVar9) << 16 >> 16)) & 0xffff);
        uVar11 = ((true) & 0xff);
        if (((uVar4) << 24 >> 24) == 0) {
          break;
        }
        if ((heap.i16((puVar1 + uVar7 * 2 + 0x52)) | 0) != -1) {
          bVar3 = ((((uVar4) << 24 >> 24) - 1) & 0xff);
          uVar4 = ((((bVar3) >>> 0)) >>> 0);
          bVar10 = ((bVar3 == 0) & 0xff);
          (regs.eax = FUN_005e3b2b(heap, uVar4, uVar9, uVar2));
          sVar8 = ((((uVar9) << 16 >> 16)) & 0xffff);
          if (bVar10) {
            uVar11 = (((extraout_EDX & 0xffff) * 0x100 == -0x743b94) & 0xff);
            (regs.eax = FUN_00440072(heap));
            (regs.eax = FUN_005e3b2b(heap));
            /* goto joined_r0x0044a466 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0044a3ba/joined_r0x0044a466"); return 0;
          }
        }
        sVar8 = ((((uVar9) << 16 >> 16)) & 0xffff);
        uVar7 = ((uVar7 + 1) >>> 0);
        uVar11 = ((uVar7 == 0x20) & 0xff);
      } while (uVar7 < 0x20);
    }
    (regs.eax = FUN_005e5fcb(heap));
    joined_r0x0044a466: if (!uVar11) {
      break LAB_0044a489;
    }
  }
  (regs.eax = FUN_0044b9db(heap));
  heap.setU32((unaff_ESI + (0x57) * 4), (0xffffffff) & 0xffffffff);
  }
  heap.setU16((unaff_ESI + ((0x59) * 4)), (0) & 0xffff);
  heap.setU16((unaff_ESI + ((9) * 4)), (0x100) & 0xffff);
  heap.setU16((((unaff_ESI) >>> 0) + 0x26), (0xc6) & 0xffff);
  (regs.eax = FUN_005e43de(heap));
  heap.setU32((unaff_ESI + (7) * 4), (heap.u32(0x00631bcc)) & 0xffffffff);
  heap.setU32((unaff_ESI + (3) * 4), (heap.u32(0x00631c2c)) & 0xffffffff);
  heap.setU32((unaff_ESI + (6) * 4), (heap.u32(0x00631c4c)) & 0xffffffff);
  heap.setU32(unaff_ESI, (heap.u32(0x00631bec)) & 0xffffffff);
  heap.setU32((unaff_ESI + (1) * 4), (heap.u32(0x00631c0c)) & 0xffffffff);
  heap.setU32((unaff_ESI + (5) * 4), (0) & 0xffffffff);
  (regs.eax = FUN_0044ba3c(heap));
  (regs.eax = FUN_005e412c(heap));
  heap.setI16((((unaff_ESI) >>> 0) + 0x15a), (sVar8) & 0xffff);
  return (regs.eax = FUN_0044c464(heap));
}
