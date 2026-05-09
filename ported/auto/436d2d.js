// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/436d2d.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00436e2b } from "./436e2b.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_00436d2d(heap) {
  let sVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let cVar4 = 0;
  let uVar5 = 0;
  let sVar6 = 0;
  let bVar8 = 0;
  let iVar7 = 0;
  let uVar9 = 0;
  let bVar11 = 0;
  let iVar10 = 0;
  let puVar12 = 0;
  let iVar13 = 0;
  let cVar14 = 0;
  puVar12 = ((0x00981efc) >>> 0);
  for (iVar7 = ((0x2000) >>> 0); iVar7 != 0; iVar7 = (((iVar7 + -1) >>> 0)) >>> 0) {
    heap.setU32(puVar12, (0x5050505) & 0xffffffff);
    puVar12 = ((puVar12 + ((1) * 4)) >>> 0);
  }
  uVar5 = (((regs.eax = FUN_005df40c(heap))) & 0xffff);
  uVar3 = ((heap.u32(0x006e3b8c)) >>> 0);
  uVar2 = ((heap.u32(0x006e3b88)) >>> 0);
  sVar6 = (((uVar5 & 0x1ff) + 0x28) & 0xffff);
  heap.setU32(0x00628aea, (0) >>> 0);
  do {
    (regs.eax = FUN_00436e2b(heap));
    sVar6 = ((sVar6 + -1) & 0xffff);
  } while (sVar6 != 0);
  iVar10 = ((0x101) >>> 0);
  iVar7 = ((0x81) >>> 0);
  heap.setU32(0x006e3b88, (uVar2) >>> 0);
  heap.setU32(0x006e3b8c, (uVar3) >>> 0);
  do {
    do {
      iVar13 = ((iVar7) >>> 0);
      sVar6 = ((heap.i16((iVar10 + 0x981dfb))) & 0xffff);
      sVar1 = ((heap.i16((((0x00981ef8) >>> 0) + iVar10 + 3))) & 0xffff);
      bVar8 = ((((((sVar1) & 0xffff) >>> 8) & 0xff)) & 0xff);
      bVar11 = ((((sVar1) & 0xff)) & 0xff);
      if (bVar8 <= ((sVar1) & 0xff)) {
        bVar11 = ((bVar8) & 0xff);
      }
      if (((sVar6) & 0xff) <= bVar11) {
        bVar11 = ((((sVar6) & 0xff)) & 0xff);
      }
      bVar8 = ((((((sVar6) & 0xffff) >>> 8) & 0xff)) & 0xff);
      if (bVar8 <= bVar11) {
        bVar11 = ((bVar8) & 0xff);
      }
      uVar5 = ((sVar1 - CONCAT11(bVar11, bVar11)) & 0xffff);
      uVar9 = ((sVar6 - CONCAT11(bVar11, bVar11)) & 0xffff);
      cVar14 = ((((uVar5) << 24 >> 24) == 2) & 0xff);
      if (cVar14) {
        uVar5 = ((CONCAT11((((uVar5 >>> 8)) << 24 >> 24), 1)) & 0xffff);
      }
      if ((((uVar5 >>> 8)) << 24 >> 24) == 2) {
        uVar5 = ((CONCAT11(1, ((uVar5) << 24 >> 24))) & 0xffff);
        cVar14 = ((cVar14 + 1) & 0xff);
      }
      if (((uVar9) << 24 >> 24) == 2) {
        uVar9 = ((CONCAT11((((uVar9 >>> 8)) << 24 >> 24), 1)) & 0xffff);
        cVar14 = ((cVar14 + 1) & 0xff);
      }
      if ((((uVar9 >>> 8)) << 24 >> 24) == 2) {
        uVar9 = ((CONCAT11(1, ((uVar9) << 24 >> 24))) & 0xffff);
        cVar14 = ((cVar14 + 1) & 0xff);
      }
      cVar4 = ((bVar11 * 4) & 0xff);
      iVar7 = ((heap.u32((0x00971ef4) + (iVar13) * 4)) >>> 0);
      heap.setI8((iVar7 + 2), (cVar4) & 0xff);
      if ((((uVar5 & 1) != 0 || (uVar9 & 1) != 0) || (uVar9 & 0x100) != 0) || (uVar5 & 0x100) != 0) {
        cVar4 = ((cVar4 + 4) & 0xff);
      }
      if ((cVar14 << 1 & 2) != 0) {
        cVar4 = ((cVar4 + 4) & 0xff);
      }
      heap.setI8((iVar7 + 3), (cVar4) & 0xff);
      heap.setU8((iVar7 + 4), ((((cVar14 << 1 | ((uVar5) & 0xff) & 1) << 1 | ((uVar9) & 0xff) & 1) << 1 | ((uVar9 >>> 8) & 0xff) & 1) << 1 | ((uVar5 >>> 8) & 0xff) & 1) & 0xff);
      iVar10 = ((iVar10 + 1) >>> 0);
      iVar7 = ((iVar13 + 1) >>> 0);
    } while (((iVar10) & 0xff) < 0x7f);
    bVar11 = (((((((iVar10) >>> 0) >>> 8)) << 24 >> 24) + 1) & 0xff);
    iVar10 = ((CONCAT22((((((iVar10) >>> 0) >>> 0x10)) << 16 >> 16), CONCAT11(bVar11, 1))) >>> 0);
    iVar7 = ((iVar13 + 3) >>> 0);
  } while (bVar11 < 0x7f);
  return;
}
