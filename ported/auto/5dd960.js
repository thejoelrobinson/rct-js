// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5dd960.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../../runtime/ghidra-builtins.js";
export function FUN_005dd960(heap) {
  const __sp = heap.allocFrame(56);
  const __addr_DAT_0088744a = __sp + 0;
  const __addr_DAT_00887452 = __sp + 4;
  const __addr_DAT_00971ef4 = __sp + 8;
  const __addr_DAT_00652478 = __sp + 12;
  const __addr_DAT_0065247a = __sp + 16;
  const __addr_DAT_00887496 = __sp + 20;
  const __addr_DAT_00887422 = __sp + 24;
  const __addr_DAT_00887498 = __sp + 28;
  const __addr_DAT_0088747e = __sp + 32;
  const __addr_DAT_00743be4 = __sp + 36;
  const __addr_DAT_00743be5 = __sp + 40;
  const __addr_DAT_00743bdc = __sp + 44;
  const __addr_DAT_00743bdf = __sp + 48;
  const __addr_DAT_00887441 = __sp + 52;
  try {
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
  let unaff_ESI = 0;
  let iVar13 = 0;
  uVar11 = heap.u32((__addr_DAT_0088744a) + (heap.u32((unaff_ESI + 0x30)) * 0x130 + heap.u32((unaff_ESI + 0x4b))) * 4) >>> 8;
  uVar3 = (heap.u32((__addr_DAT_0088744a) + (heap.u32((unaff_ESI + 0x30)) * 0x130 + heap.u32((unaff_ESI + 0x4b))) * 4) & 0xff) * 0x20;
  uVar5 = uVar11 * 0x20;
  bVar7 = heap.u32((__addr_DAT_00887452) + (heap.u32((unaff_ESI + 0x30)) * 0x260 + heap.u32((unaff_ESI + 0x4b))) * 4);
  for (pbVar8 = heap.u32((__addr_DAT_00971ef4) + (((uVar11 << 0xc | uVar3) >>> 5 | (uVar5 >>> 9) << 0xb)) * 4); ((heap.u32(pbVar8) & 0x3c) != 8 || (bVar7 != heap.u32(pbVar8 + (2) * 4))); pbVar8 = pbVar8 + 8) {
  
  }
  uVar9 = (heap.u32(pbVar8) + 1) & 3;
  uVar3 = uVar3 + heap.u32((__addr_DAT_00652478) + (uVar9 * 2) * 4);
  uVar5 = uVar5 + heap.u32((__addr_DAT_0065247a) + (uVar9 * 2) * 4);
  uVar11 = uVar5 * 0x80 | uVar5 >>> 9 | uVar3;
  pbVar8 = heap.u32((__addr_DAT_00971ef4) + ((uVar11 >>> 5 | uVar11 << 0xb)) * 4);
  do {
    if (((((heap.u32(pbVar8) & 0x3c) == 8) && (((bVar2 = heap.u32(pbVar8 + (2) * 4), bVar7 == bVar2 || (bVar7 == (bVar2 + 4))) || (bVar7 == (bVar2 - 4))))) && (((bVar2 = heap.u32(pbVar8 + (4) * 4), bVar2 == 1 || (bVar2 == 3)) || (bVar2 == 2)))) && ((heap.u32((__addr_DAT_00887496) + (heap.u32(pbVar8 + (7) * 4) * 0x260) * 4) & 0x20) != 0)) {
      /* goto LAB_005ddac9 */ throw new Error("goto LAB_005ddac9 not supported");
    }
    pbVar1 = pbVar8 + 1;
    pbVar8 = pbVar8 + 8;
  } while ((heap.u32(pbVar1) & 0x80) == 0);
  uVar3 = (uVar3 - heap.u32((__addr_DAT_00652478) + (uVar9 * 2) * 4)) - heap.u32((__addr_DAT_00652478) + (uVar9 * 2) * 4);
  uVar11 = (uVar5 - heap.u32((__addr_DAT_0065247a) + (uVar9 * 2) * 4)) - heap.u32((__addr_DAT_0065247a) + (uVar9 * 2) * 4);
  uVar11 = uVar11 * 0x80 | uVar11 >>> 9 | uVar3;
  pbVar8 = heap.u32((__addr_DAT_00971ef4) + ((uVar11 >>> 5 | uVar11 << 0xb)) * 4);
  while ((heap.u32(pbVar8) & 0x3c) != 8 || ((((bVar2 = heap.u32(pbVar8 + (2) * 4), bVar7 != bVar2 && (bVar7 != (bVar2 + 4))) && (bVar7 != (bVar2 - 4))) || ((((bVar2 = heap.u32(pbVar8 + (4) * 4), bVar2 != 1 && (bVar2 != 3)) && (bVar2 != 2)) || ((heap.u32((__addr_DAT_00887496) + (heap.u32(pbVar8 + (7) * 4) * 0x260) * 4) & 0x20) == 0)))))) {
    pbVar1 = pbVar8 + 1;
    pbVar8 = pbVar8 + 8;
    if ((heap.u32(pbVar1) & 0x80) != 0) {
      return uVar3;
    }
  }
  LAB_005ddac9: bVar7 = heap.u32(pbVar8 + (7) * 4);
  iVar13 = bVar7 * 0x260;
  if ((heap.u32((__addr_DAT_00887422) + (bVar7 * 0x130) * 4) & 1) == 0) {
    return uVar3;
  }
  for (iVar10 = 0; iVar10 < heap.u32((__addr_DAT_00887498) + (iVar13) * 4); iVar10 = iVar10 + 1) {
    if (((heap.u32((__addr_DAT_0088747e + iVar10 * 2 + iVar13)) != 0xffff) && (iVar12 = heap.u32((__addr_DAT_0088747e + iVar10 * 2 + iVar13)) * 0x100, heap.u32((__addr_DAT_00743be4) + (iVar12) * 4) == '\x02')) && ((heap.u32((__addr_DAT_00743be5) + (iVar12) * 4) == '\0' && (((heap.u32((__addr_DAT_00743bdc + iVar12)) >>> 2 & 1) != 0 && ((heap.u32(pbVar8 + (5) * 4) & 0x70) >>> 4 == heap.u32((__addr_DAT_00743bdf) + (iVar12) * 4))))))) {
      heap.setU32((__addr_DAT_00743bdc + iVar12), (heap.u32((__addr_DAT_00743bdc + iVar12)) & 0xfffb) >>> 0);
      heap.setU32((unaff_ESI + 0x48), (heap.u32((unaff_ESI + 0x48)) & 0xfffb) >>> 0);
      return uVar3;
    }
  }
  if (bVar7 != heap.u32((unaff_ESI + 0x30))) {
    if (((heap.u32((__addr_DAT_00887422) + (bVar7 * 0x130) * 4) & 0x80) == 0) && (heap.u32((__addr_DAT_00887441) + (bVar7 * 0x260) * 4) != '\0')) {
      return uVar3;
    }
    heap.setU32((unaff_ESI + 0x48), (heap.u32((unaff_ESI + 0x48)) & 0xfffb) >>> 0);
    return uVar3;
  }
  iVar10 = bVar7 * 0x260;
  iVar13 = 0;
  uVar6 = 0;
  while (true) {
    cVar4 = uVar6;
    bVar7 = (uVar6 >>> 8);
    if (heap.u32((__addr_DAT_00887498) + (iVar10) * 4) <= iVar13) {
      break;
    }
    if (heap.u32((__addr_DAT_0088747e + iVar13 * 2 + iVar10)) != 0xffff) {
      iVar12 = heap.u32((__addr_DAT_0088747e + iVar13 * 2 + iVar10)) * 0x100;
      if (heap.u32((__addr_DAT_00743be4) + (iVar12) * 4) == '\x04') {
        uVar6 = CONCAT11(bVar7 + 1, cVar4);
      } else {
        if ((heap.u32((unaff_ESI + 0x4b)) == heap.u32((__addr_DAT_00743bdf) + (iVar12) * 4)) && ((heap.u32((__addr_DAT_00743be4) + (iVar12) * 4) == '\x02' || (heap.u32((__addr_DAT_00743be4) + (iVar12) * 4) == '\0')))) {
        uVar6 = CONCAT11(bVar7, cVar4 + '\x01');
      }
      }
    }
    iVar13 = iVar13 + 1;
  }
  if ((cVar4 + bVar7) != heap.u32((__addr_DAT_00887498) + (iVar10) * 4)) {
    return uVar3;
  }
  if (heap.u32((__addr_DAT_00887498) + (iVar10) * 4) >>> 1 <= bVar7) {
    return uVar3;
  }
  heap.setU32((unaff_ESI + 0x48), (heap.u32((unaff_ESI + 0x48)) & 0xfffb) >>> 0);
  return uVar3;
} finally {
    heap.freeFrame(56);
  }
}
