// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/424e0f.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00425432 } from "./425432.js";
import { FUN_00426f56 } from "./426f56.js";
import { FUN_0042e48a } from "./42e48a.js";
import { FUN_004314ed } from "./4314ed.js";
import { FUN_005df1ff } from "./5df1ff.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e56d3 } from "./5e56d3.js";
export function FUN_00424e0f(heap) {
  let pbVar1 = 0;
  let uVar2 = 0;
  let sVar3 = 0;
  let uVar4 = 0;
  let extraout_CX = 0;
  let extraout_CX_00 = 0;
  let extraout_CX_01 = 0;
  let bVar5 = 0;
  let uVar6 = 0;
  let bVar7 = 0;
  let iVar8 = 0;
  let pbVar9 = 0;
  let pcVar10 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let pbVar11 = 0;
  let bVar12 = 0;
  code_r0x00424fca: {
  LAB_00424fb3: {
  LAB_00424f60: {
  LAB_00424f08: {
  code_r0x00424e0f: iVar8 = ((10) >>> 0);
  LAB_00424e14: uVar6 = ((((((((((heap.u32(0x008d4228) >>> 1 & 1) != 0) & 0xffff) << 1 | (((heap.u32(0x008d4228) >>> 3 & 1) != 0) & 0xffff)) << 1 | (((heap.u32(0x008d4228) >>> 5 & 1) != 0) & 0xffff)) << 1 | (((heap.u32(0x008d4228) >>> 7 & 1) != 0) & 0xffff)) << 1 | (((heap.u32(0x008d4228) >>> 9 & 1) != 0) & 0xffff)) << 1 | (((heap.u32(0x008d4228) >>> 0xb & 1) != 0) & 0xffff)) << 1 | (((heap.u32(0x008d4228) >>> 0xd & 1) != 0) & 0xffff)) & 0xffff);
  uVar2 = (((((((((((heap.u32(0x008d4228) & 1) != 0) & 0xffff) << 1 | (((heap.u32(0x008d4228) >>> 2 & 1) != 0) & 0xffff)) << 1 | (((heap.u32(0x008d4228) >>> 4 & 1) != 0) & 0xffff)) << 1 | (((heap.u32(0x008d4228) >>> 6 & 1) != 0) & 0xffff)) << 1 | (((heap.u32(0x008d4228) >>> 8 & 1) != 0) & 0xffff)) << 1 | (((heap.u32(0x008d4228) >>> 10 & 1) != 0) & 0xffff)) << 1 | (((heap.u32(0x008d4228) >>> 0xc & 1) != 0) & 0xffff)) << 5) & 0xffff);
  uVar4 = ((uVar6 << 5) & 0xffff);
  pbVar9 = ((heap.u32((0x00971ef4) + (((((uVar6 << 0xc | uVar2) & 0xffff) >>> 5 | (uVar4 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    if ((heap.u8(pbVar9) & 0x3c) == 0) {
      pbVar11 = ((unaff_EDI) >>> 0);
      if ((heap.u8(pbVar9 + (5)) & 0xe0) != 0) {
        break LAB_00424f60;
      }
      bVar5 = (((heap.u8(pbVar9 + (5)) & 0x1f) << 2) & 0xff);
      bVar12 = ((bVar5 < heap.u8(pbVar9 + (2))) & 0xff);
      if (!bVar12 && bVar5 != heap.u8(pbVar9 + (2))) {
        /* goto LAB_00424f13 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00424e0f/LAB_00424f13"); return 0;
      }
      uVar2 = (((regs.eax = FUN_00425432(heap))) & 0xffff);
      uVar4 = ((extraout_CX) & 0xffff);
      if (bVar12) {
        break LAB_00424f08;
      }
      bVar5 = ((heap.u8(pbVar9 + (2))) & 0xff);
      bVar7 = ((bVar5 + 4) & 0xff);
      unaff_EDI = ((pbVar9) >>> 0);
      if ((heap.u8(pbVar9 + (4)) & 0x10) != 0) {
        bVar7 = ((bVar5 + 8) & 0xff);
      }
      /* goto LAB_00424eeb — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00424e0f/LAB_00424eeb"); return 0;
    }
    pbVar11 = ((pbVar9 + 1) >>> 0);
    pbVar9 = ((pbVar9 + 8) >>> 0);
  } while ((heap.u8(pbVar11) & 0x80) == 0);
  break LAB_00424fb3;
  while ((unaff_EDI = ((pbVar11 + 8) >>> 0), (heap.u8(unaff_EDI) & 0x3c) == 0x14 || (heap.u8(pbVar11 + (0xb)) <= bVar5)) || (bVar7 < heap.u8(pbVar11 + (10)))) {
    LAB_00424eeb: pbVar11 = ((unaff_EDI) >>> 0);
    if ((heap.u8(pbVar11 + (1)) & 0x80) != 0) {
      pbVar1 = ((pbVar9 + 6) >>> 0);
      bVar5 = ((heap.u8(pbVar1)) & 0xff);
      heap.setU32(pbVar1, (heap.u8(pbVar1) + 0x10) & 0xffffffff);
      if (bVar5 < 0xf0) {
        break LAB_00424f60;
      }
      heap.setU8((pbVar9 + (6)), (heap.u8(pbVar9 + (6)) ^ 8) & 0xff);
      if ((heap.u8(pbVar9 + (6)) & 8) != 0) {
        bVar5 = (((regs.eax = FUN_005df40c(heap))) & 0xff);
        heap.setU8((pbVar9 + (6)), (heap.u8(pbVar9 + (6)) | bVar5 & 0x70) & 0xff);
        uVar4 = ((extraout_CX_00) & 0xffff);
        break LAB_00424f60;
      }
      if ((heap.u8(pbVar9 + (6)) & 7) == 6) {
        break LAB_00424f60;
      }
      heap.setU8((pbVar9 + (6)), ((heap.u8(pbVar9 + (6)) & 7) + 1) & 0xff);
      /* goto LAB_00424f47 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00424e0f/LAB_00424f47"); return 0;
    }
  }
  }
  pbVar11 = ((unaff_EDI) >>> 0);
  if ((heap.u8(pbVar9 + (6)) & 7) != 1) {
    LAB_00424f13: heap.setU8((pbVar9 + (6)), (1) & 0xff);
    LAB_00424f47: uVar2 = (((regs.eax = FUN_005e56d3(heap, pbVar9, pbVar11))) & 0xffff);
    uVar4 = ((extraout_CX_01) & 0xffff);
  }
  }
  uVar2 = ((uVar4 << 7 | uVar4 >>> 9 | uVar2) & 0xffff);
  pbVar9 = ((heap.u32((0x00971ef4) + (((uVar2 >>> 5 | uVar2 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    if ((heap.u8(pbVar9) & 0x3c) == 0xc) {
      (regs.eax = FUN_005df1ff(heap));
    } else {
      if (((heap.u8(pbVar9) & 0x3c) == 4) && ((heap.u8(pbVar9 + (5)) & 0xf) == 5)) {
      (regs.eax = FUN_0042e48a(heap));
    }
    }
    pbVar1 = ((pbVar9 + 1) >>> 0);
    pbVar9 = ((pbVar9 + 8) >>> 0);
    unaff_EDI = ((pbVar11) >>> 0);
  } while ((heap.u8(pbVar1) & 0x80) == 0);
  }
  heap.setU32(0x008d4228, (heap.u32(0x008d4228) + 1) >>> 0);
  heap.setU32(0x008d4228, (heap.u32(0x008d4228) & 0x3fff) >>> 0);
  iVar8 = ((iVar8 + -1) >>> 0);
  if (iVar8 == 0) {
    break code_r0x00424fca;
  }
  /* goto LAB_00424e14 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00424e0f/LAB_00424e14"); return 0;
  }
  sVar3 = (((regs.eax = FUN_004314ed(heap))) & 0xffff);
  if (-sVar3 == heap.u32(0x0087d7a2)) {
    if (((0x70 < heap.u32(0x008dbed2)) && (heap.u32(0x008dbed2) < 0x80)) && (((-sVar3 | 0) < -1 || (300000 < heap.u32(0x0087c3b4))))) {
      uVar4 = (((regs.eax = FUN_005df40c(heap))) & 0xffff);
      if (uVar4 < 0x42) {
        pcVar10 = ((0x00887420) >>> 0);
        do {
          if ((heap.i8(pcVar10) | 0) != -1) {
            return (regs.eax = FUN_00426f56(heap));
          }
          pcVar10 = ((pcVar10 + 0x260) >>> 0);
        } while (pcVar10 < 0x008ad1c0);
      }
      return;
    }
    return;
  }
  /* goto code_r0x00424e0f — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00424e0f/code_r0x00424e0f"); return 0;
}
