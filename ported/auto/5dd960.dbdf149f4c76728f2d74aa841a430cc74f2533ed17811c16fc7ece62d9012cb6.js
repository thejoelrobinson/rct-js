// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dd960.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_005dd960(heap) {
  let pbVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  let cVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let bVar7 = 0;
  let pbVar8 = 0;
  let uVar9 = 0;
  let iVar10 = 0;
  let uVar11 = 0;
  let iVar12 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let iVar13 = 0;
  LAB_005ddac9: {
  uVar11 = ((heap.u32(((0x0088744a) & 0xffff) + (heap.u32((unaff_ESI + 0x30)) * 0x130 + heap.u32((unaff_ESI + 0x4b))) * 4) >>> 8) & 0xffff);
  uVar3 = (((heap.u32((0x0088744a) + (heap.u32((unaff_ESI + 0x30)) * 0x130 + heap.u32((unaff_ESI + 0x4b))) * 4) & 0xff) * 0x20) & 0xffff);
  uVar5 = ((uVar11 * 0x20) & 0xffff);
  bVar7 = ((heap.u32((0x00887452) + (heap.u32((unaff_ESI + 0x30)) * 0x260 + heap.u32((unaff_ESI + 0x4b))) * 4)) & 0xff);
  for (pbVar8 = ((heap.u32((0x00971ef4) + (((((uVar11 << 0xc | uVar3) & 0xffff) >>> 5 | (uVar5 >>> 9) << 0xb) & 0xffff)) * 4)) >>> 0); ((heap.u8(pbVar8) & 0x3c) != 8 || (bVar7 != heap.u8(pbVar8 + (2)))); pbVar8 = (((pbVar8 + 8) >>> 0)) >>> 0) {
  
  }
  uVar9 = ((((heap.u8(pbVar8) + 1) & 0xff) & 3) >>> 0);
  uVar3 = ((uVar3 + heap.u32((0x00652478) + (uVar9 * 2) * 4)) & 0xffff);
  uVar5 = ((uVar5 + heap.u32((0x0065247a) + (uVar9 * 2) * 4)) & 0xffff);
  uVar11 = ((uVar5 * 0x80 | uVar5 >>> 9 | uVar3) & 0xffff);
  pbVar8 = ((heap.u32((0x00971ef4) + (((uVar11 >>> 5 | uVar11 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    if (((((heap.u8(pbVar8) & 0x3c) == 8) && (((bVar2 = ((heap.u8(pbVar8 + (2))) & 0xff), bVar7 == bVar2 || (bVar7 == ((bVar2 + 4) & 0xff))) || (bVar7 == ((bVar2 - 4) & 0xff))))) && (((bVar2 = ((heap.u8(pbVar8 + (4))) & 0xff), bVar2 == 1 || (bVar2 == 3)) || (bVar2 == 2)))) && ((heap.u32((0x00887496) + (((heap.u8(pbVar8 + (7))) >>> 0) * 0x260) * 4) & 0x20) != 0)) {
      break LAB_005ddac9;
    }
    pbVar1 = ((pbVar8 + 1) >>> 0);
    pbVar8 = ((pbVar8 + 8) >>> 0);
  } while ((heap.u8(pbVar1) & 0x80) == 0);
  uVar3 = (((uVar3 - heap.u32((0x00652478) + (uVar9 * 2) * 4)) - heap.u32((0x00652478) + (uVar9 * 2) * 4)) & 0xffff);
  uVar11 = (((uVar5 - heap.u32((0x0065247a) + (uVar9 * 2) * 4)) - heap.u32((0x0065247a) + (uVar9 * 2) * 4)) & 0xffff);
  uVar11 = ((uVar11 * 0x80 | uVar11 >>> 9 | uVar3) & 0xffff);
  pbVar8 = ((heap.u32((0x00971ef4) + (((uVar11 >>> 5 | uVar11 << 0xb) & 0xffff)) * 4)) >>> 0);
  while ((heap.u8(pbVar8) & 0x3c) != 8 || ((((bVar2 = ((heap.u8(pbVar8 + (2))) & 0xff), bVar7 != bVar2 && (bVar7 != ((bVar2 + 4) & 0xff))) && (bVar7 != ((bVar2 - 4) & 0xff))) || ((((bVar2 = ((heap.u8(pbVar8 + (4))) & 0xff), bVar2 != 1 && (bVar2 != 3)) && (bVar2 != 2)) || ((heap.u32((0x00887496) + (((heap.u8(pbVar8 + (7))) >>> 0) * 0x260) * 4) & 0x20) == 0)))))) {
    pbVar1 = ((pbVar8 + 1) >>> 0);
    pbVar8 = ((pbVar8 + 8) >>> 0);
    if ((heap.u8(pbVar1) & 0x80) != 0) {
      return uVar3;
    }
  }
  }
  bVar7 = ((heap.u8(pbVar8 + (7))) & 0xff);
  iVar13 = ((((bVar7) >>> 0) * 0x260) >>> 0);
  if ((heap.u32((0x00887422) + (((bVar7) >>> 0) * 0x130) * 4) & 1) == 0) {
    return uVar3;
  }
  for (iVar10 = ((0) >>> 0); ((iVar10) & 0xff) < heap.u32(((0x00887498) & 0xff) + (iVar13) * 4); iVar10 = (((iVar10 + 1) >>> 0)) >>> 0) {
    if (((heap.u16((0x0088747e + iVar10 * 2 + iVar13)) != 0xffff) && (iVar12 = ((heap.u32((0x0088747e + iVar10 * 2 + iVar13)) * 0x100) >>> 0), heap.u32((0x00743be4) + (iVar12) * 4) == 2)) && ((heap.u32((0x00743be5) + (iVar12) * 4) == 0 && (((heap.u16((0x00743bdc + iVar12)) >>> 2 & 1) != 0 && ((heap.u8(pbVar8 + (5)) & 0x70) >>> 4 == heap.u32((0x00743bdf) + (iVar12) * 4))))))) {
      heap.setU16((0x00743bdc + iVar12), (heap.u16((0x00743bdc + iVar12)) & 0xfffb) & 0xffff);
      heap.setU16((unaff_ESI + 0x48), (heap.u16((unaff_ESI + 0x48)) & 0xfffb) & 0xffff);
      return uVar3;
    }
  }
  if (bVar7 != heap.u8((unaff_ESI + 0x30))) {
    if (((heap.u32((0x00887422) + (((bVar7) >>> 0) * 0x130) * 4) & 0x80) == 0) && (heap.u32((0x00887441) + (((bVar7) >>> 0) * 0x260) * 4) != 0)) {
      return uVar3;
    }
    heap.setU16((unaff_ESI + 0x48), (heap.u16((unaff_ESI + 0x48)) & 0xfffb) & 0xffff);
    return uVar3;
  }
  iVar10 = ((((bVar7) >>> 0) * 0x260) >>> 0);
  iVar13 = ((0) >>> 0);
  uVar6 = ((0) & 0xffff);
  while (true) {
    cVar4 = ((((uVar6) << 24 >> 24)) & 0xff);
    bVar7 = ((((((uVar6) & 0xffff) >>> 8) & 0xff)) & 0xff);
    if (heap.u32(((0x00887498) & 0xff) + (iVar10) * 4) <= ((iVar13) & 0xff)) {
      break;
    }
    if (heap.u16((0x0088747e + iVar13 * 2 + iVar10)) != 0xffff) {
      iVar12 = ((heap.u32((0x0088747e + iVar13 * 2 + iVar10)) * 0x100) >>> 0);
      if (heap.u32((0x00743be4) + (iVar12) * 4) == 4) {
        uVar6 = ((CONCAT11(bVar7 + 1, cVar4)) & 0xffff);
      } else {
        if ((heap.i8((unaff_ESI + 0x4b)) == heap.u32((0x00743bdf) + (iVar12) * 4)) && ((heap.u32((0x00743be4) + (iVar12) * 4) == 2 || (heap.u32((0x00743be4) + (iVar12) * 4) == 0)))) {
        uVar6 = ((CONCAT11(bVar7, cVar4 + 1)) & 0xffff);
      }
      }
    }
    iVar13 = ((iVar13 + 1) >>> 0);
  }
  if (((cVar4 + bVar7) & 0xff) != heap.u32((0x00887498) + (iVar10) * 4)) {
    return uVar3;
  }
  if (heap.u32(((0x00887498) & 0xff) + (iVar10) * 4) >>> 1 <= bVar7) {
    return uVar3;
  }
  heap.setU16((unaff_ESI + 0x48), (heap.u16((unaff_ESI + 0x48)) & 0xfffb) & 0xffff);
  return uVar3;
}
