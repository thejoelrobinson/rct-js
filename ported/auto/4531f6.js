// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4531f6.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004531f6(heap) {
  const __sp = heap.allocFrame(8);
  const __addr_DAT_005f72ef = __sp + 0;
  const __addr_DAT_00971ef4 = __sp + 4;
  try {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let bVar5 = 0;
  let iVar6 = 0;
  let puVar7 = 0;
  let uVar8 = 0;
  let sVar9 = 0;
  let sVar10 = 0;
  let sVar11 = 0;
  let uVar12 = 0;
  let pbVar13 = 0;
  let uVar14 = 0;
  let uVar15 = 0;
  let unaff_ESI = 0;
  puVar7 = heap.u32(0x00632408);
  iVar6 = heap.u32(0x006323fc);
  uVar8 = heap.u32(0x006326c4);
  if ((heap.u32((unaff_ESI + 0xbb)) != -1) || (heap.u32((unaff_ESI + 0xbd)) != -1)) {
    uVar3 = heap.u32((unaff_ESI + 0x16));
    uVar4 = heap.u32((unaff_ESI + 0x1a));
    sVar10 = uVar3;
    if (sVar10 != -0x8000) {
      sVar9 = heap.u32((heap.u32(0x006323fc) + 8));
      sVar11 = heap.u32((heap.u32(0x006323fc) + 10));
      uVar15 = heap.u32((heap.u32(0x006323fc) + 0xc)) >>> 2;
      uVar14 = heap.u32((heap.u32(0x006323fc) + 0xc)) >>> 2;
      if (heap.u32((heap.u32(0x00632400) + 0x174)) == '\0') {
        sVar9 = sVar9 - uVar15;
        sVar11 = sVar11 - uVar14;
      }
      heap.setU32(0x006326c4, (uVar4) >>> 0);
      heap.setU32(0x006326c0, (uVar3) >>> 0);
      uVar8 = uVar4;
      if ((sVar9 < heap.u32(0x006326c4)) && (heap.setU32(0x006326c6, ((uVar4 >>> 0x10)) >>> 0), sVar11 < heap.u32(0x006326c6))) {
        sVar9 = sVar9 + heap.u32((heap.u32(0x006323fc) + 0xc));
        sVar11 = sVar11 + heap.u32((heap.u32(0x006323fc) + 0xe));
        if (heap.u32((heap.u32(0x00632400) + 0x174)) == '\0') {
          sVar9 = sVar9 + uVar15 * 2;
          sVar11 = sVar11 + uVar14 * 2;
        }
        if ((sVar10 <= sVar9) && (heap.setU32(0x006326c2, ((uVar3 >>> 0x10)) >>> 0), bVar5 = heap.u32(0x006326c2) <= sVar11, bVar5)) {
          sVar10 = sVar10 + heap.u32(0x006326c4);
          uVar12 = heap.u32(0x00971ed6);
          if (uVar12 < 0x40) {
            uVar12 = 0x40;
          }
          heap.setU32(0x006326c4, (uVar4) >>> 0);
          heap.setU32((heap.u32(0x00632408) + (1) * 4), (((((((sVar10 >>> 1) - heap.u32((heap.u32(0x006323fc) + 8))) >>> (heap.u32((heap.u32(0x006323fc) + 0x10)) & 0x1f)) + heap.u32((heap.u32(0x006323fc) + 4))) << 0x10) / uVar12 + -0x8000 >>> 4)) >>> 0);
          uVar12 = heap.u32(0x00971ed8);
          if (uVar12 < 0x40) {
            uVar12 = 0x40;
          }
          heap.setU32((puVar7 + (2) * 4), ((((((((heap.u32(0x006326c2) + heap.u32(0x006326c6)) >>> 1) - heap.u32((iVar6 + 10))) >>> (heap.u32((iVar6 + 0x10)) & 0x1f)) + heap.u32((iVar6 + 6))) << 0x10) / uVar12 + -0x8000 >>> 4)) >>> 0);
          uVar12 = heap.u32((unaff_ESI + 0x28));
          if ((heap.u32((__addr_DAT_005f72ef) + (heap.u32((unaff_ESI + 0x31)) * 4) * 4) & 1) != 0) {
            uVar12 = uVar12 << 1;
          }
          if (uVar12 < 0) {
            uVar12 = -uVar12;
          }
          uVar2 = heap.u32((unaff_ESI + 10));
          heap.setU32((puVar7 + (3) * 4), (((uVar12 >>> 5) * 0x1588 >>> 0xe) + 0x2b11 + heap.u32((unaff_ESI + 0xbf)) * 0x10) >>> 0);
          heap.setU32(puVar7, (uVar2) >>> 0);
          heap.setU32((puVar7 + 4), (0) >>> 0);
          if (heap.u32((unaff_ESI + 0xe)) != 0x8000) {
            uVar14 = heap.u32((unaff_ESI + 0x10)) >>> 9;
            pbVar13 = heap.u32((__addr_DAT_00971ef4) + ((((heap.u32((unaff_ESI + 0x10)) & 0xffe0) << 7 | uVar14 | heap.u32((unaff_ESI + 0xe)) & 0xffe0) >>> 5 | uVar14 << 0xb)) * 4);
            bVar1 = heap.u32(pbVar13);
            while ((bVar1 & 0x3c) != 0) {
              pbVar13 = pbVar13 + 8;
              bVar1 = heap.u32(pbVar13);
            }
            if (heap.u32((unaff_ESI + 0x12)) < (heap.u32(pbVar13 + (2) * 4) * 4)) {
              heap.setU32((puVar7 + 4), (0x30) >>> 0);
            }
          }
          heap.setU32(0x00632408, (heap.u32(0x00632408) + 5) >>> 0);
          return;
        }
      }
    }
  }
  heap.setU32(0x006326c4, (uVar8) >>> 0);
  return;
} finally {
    heap.freeFrame(8);
  }
}
