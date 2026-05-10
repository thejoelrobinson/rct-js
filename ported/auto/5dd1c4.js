// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dd1c4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005ddbe1 } from "./5ddbe1.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_005dd1c4(heap) {
  let bVar1 = 0;
  let bVar2 = 0;
  let cVar3 = 0;
  let sVar4 = 0;
  let bVar5 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let in_EDX = regs.edx >>> 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let iVar10 = 0;
  let pbVar11 = 0;
  let local_22 = 0;
  let local_21 = 0;
  iVar10 = (((in_EDX & 0xff) * 0x260) >>> 0);
  pbVar11 = ((0x00887420 + iVar10) >>> 0);
  local_22 = ((heap.u32((0x0088749b) + (iVar10) * 4)) & 0xff);
  local_21 = ((heap.u32((0x0088749a) + (iVar10) * 4)) & 0xff);
  uVar6 = ((heap.u32(((0x00887421) >>> 0) + (iVar10) * 4)) >>> 0);
  bVar5 = ((heap.u32((0x005f6be6) + (uVar6 * 4) * 4)) & 0xff);
  if (bVar5 == 0xff) {
    uVar6 = ((0) >>> 0);
    uVar8 = ((0xff) >>> 0);
    do {
      if (((heap.u32((0x0088744a) + ((in_EDX & 0xff) * 0x130 + uVar6) * 4) | 0) != -1) && (heap.u8(pbVar11 + (uVar6 + 0x36)) < ((uVar8) & 0xff))) {
        uVar8 = ((((heap.u8(pbVar11 + (uVar6 + 0x36))) >>> 0)) >>> 0);
      }
      uVar6 = ((uVar6 + 1) >>> 0);
    } while (uVar6 < 4);
    if ((((uVar8) << 24 >> 24) | 0) == -1) {
      return 1;
    }
    bVar5 = ((heap.u32((0x005f6be5) + (heap.u32(((0x00887421) >>> 0) + (iVar10) * 4) * 4) * 4)) & 0xff);
    bVar1 = ((heap.u32((0x005f5d03) + (heap.u32(pbVar11) * 8) * 4)) & 0xff);
    do {
      (regs.eax = 0x800, regs.eax = FUN_005ddbe1(heap));
      uVar6 = ((0) >>> 0);
      uVar9 = ((0) & 0xffff);
      for (pbVar11 = ((0x0065ea78) >>> 0); bVar2 = ((heap.u8(pbVar11)) & 0xff), bVar2 != 0xff; pbVar11 = (((pbVar11 + 1) >>> 0)) >>> 0) {
        uVar6 = ((uVar6 + heap.i32((0x005f6f1c + ((bVar2) >>> 0) * 8))) >>> 0);
        uVar9 = ((uVar9 + heap.i16((0x005f6f20 + ((bVar2) >>> 0) * 8))) & 0xffff);
      }
      if ((uVar6 <= uVar8 * 0x44180) && (uVar9 <= ((((bVar1) & 0xffff) * 0x100) & 0xffff))) {
        /* goto LAB_005dd294 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005dd1c4/LAB_005dd294"); return 0;
      }
      bVar5 = ((bVar5 - 1) & 0xff);
    } while (bVar5 != 0);
    bVar5 = ((1) & 0xff);
    LAB_005dd294: bVar1 = ((heap.u32((0x005f6be4) + (heap.u32(((0x00887421) >>> 0) + (iVar10) * 4) * 4) * 4)) & 0xff);
    if (local_22 < bVar1) {
      local_22 = ((bVar1) & 0xff);
    }
    if (bVar5 < bVar1) {
      bVar5 = ((bVar1) & 0xff);
    }
    if (bVar5 <= local_22) {
      local_22 = ((bVar5) & 0xff);
    }
    heap.setU32(((0x0088749d) + (iVar10) * 4), (bVar5 | bVar1 << 4) & 0xffffffff);
    (regs.eax = 0x800, regs.eax = FUN_005ddbe1(heap));
    uVar6 = ((0) >>> 0);
    for (pbVar11 = ((0x0065ea78) >>> 0); heap.u8(pbVar11) != 0xff; pbVar11 = (((pbVar11 + 1) >>> 0)) >>> 0) {
      uVar6 = ((uVar6 + heap.i32((0x005f6f1c + heap.u32(pbVar11) * 8))) >>> 0);
    }
    uVar7 = ((uVar6 >>> 1) >>> 0);
    if (local_22 != 1) {
      uVar7 = ((uVar6 >>> 2) >>> 0);
    }
    bVar5 = ((0) & 0xff);
    do {
      bVar5 = ((bVar5 + 1) & 0xff);
      uVar7 = ((uVar7 + uVar6) >>> 0);
    } while (uVar7 <= uVar8 * 0x44180);
    if (0xc < bVar5) {
      bVar5 = ((0xc) & 0xff);
    }
    cVar3 = ((heap.u32((0x00887424) + (iVar10) * 4)) & 0xff);
    if ((((cVar3 == 4) || (cVar3 == 2)) || (cVar3 == 3)) || (cVar3 == 23)) {
      bVar5 = ((1) & 0xff);
    }
    heap.setU32(((0x0088749c) + (iVar10) * 4), (bVar5) & 0xffffffff);
    if (bVar5 <= local_21) {
      local_21 = ((bVar5) & 0xff);
    }
    sVar4 = ((CONCAT11(local_21, local_22)) & 0xffff);
  } else {
    heap.setU32(((0x0088749c) + (iVar10) * 4), (bVar5) & 0xffffffff);
    bVar1 = ((heap.u32((0x005f6be5) + (uVar6 * 4) * 4)) & 0xff);
    heap.setU32(((0x0088749d) + (iVar10) * 4), (heap.u32((0x005f6be4) + (uVar6 * 4) * 4) << 4 | bVar1) & 0xffffffff);
    if (bVar5 < local_21) {
      local_21 = ((bVar5) & 0xff);
    }
    sVar4 = ((CONCAT11(local_21, bVar1)) & 0xffff);
  }
  if (sVar4 != CONCAT11(heap.u32((0x00887498) + (iVar10) * 4), heap.u32((0x00887499) + (iVar10) * 4))) {
    heap.setU32(((0x00887499) + (iVar10) * 4), (((sVar4) << 24 >> 24)) & 0xffffffff);
    heap.setU32(((0x00887498) + (iVar10) * 4), ((((((sVar4) & 0xffff) >>> 8)) << 24 >> 24)) & 0xffffffff);
    (regs.eax = 0xb, regs.ecx = 0xdd0000, regs.edx = 0xff, regs.ebx = 0xff, regs.esi = 0x65ea8b, regs.edi = 0x887420, regs.eax = FUN_005e5301(heap), regs.ecx = 0x90000, regs.eax);
  }
  return 1;
}
