// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5ced51.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3, undefined3 } from "../../runtime/win32.js";
import { CONCAT11, CONCAT31, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e56d3 } from "./5e56d3.js";
export function FUN_005ced51(heap) {
  let pbVar1 = 0;
  let cVar2 = 0;
  let bVar3 = 0;
  let uVar4 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_CX = regs.ecx & 0xffff;
  let uVar6 = 0;
  let uVar7 = 0;
  let extraout_CX = 0;
  let cVar10 = 0;
  let in_EDX = regs.edx >>> 0;
  let iVar8 = 0;
  let iVar9 = 0;
  let extraout_EDX = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar11 = 0;
  let uVar12 = 0;
  let uVar13 = 0;
  let puVar14 = 0;
  let uVar15 = 0;
  let iVar16 = 0;
  let pbVar17 = 0;
  let uVar5 = 0;
  LAB_005cefb5: {
  LAB_005ceee9: {
  code_r0x005ceeb3: {
  LAB_005cee2b: {
  code_r0x005cedf5: {
  heap.setU32(0x00652466, (((in_EAX) & 0xffff)) >>> 0);
  heap.setU32(0x0065246e, (1) >>> 0);
  uVar13 = ((in_EDX >>> 8 & 0xff) >>> 0);
  uVar15 = ((unaff_EBX >>> 8 & 0xff) >>> 0);
  iVar16 = ((uVar15 * 0x260) >>> 0);
  pbVar17 = ((0x00887420 + iVar16) >>> 0);
  bVar3 = ((((in_EDX) & 0xff)) & 0xff);
  uVar5 = ((in_EAX) >>> 0);
  uVar11 = ((unaff_EBX) >>> 0);
  heap.setU32(0x00652468, (in_CX) >>> 0);
  heap.setU32(0x0065246a, (heap.u32(0x00652466)) >>> 0);
  heap.setU32(0x0065246c, (in_CX) >>> 0);
  if ((heap.u32((0x005f5b78 + heap.u32(pbVar17) * 8)) & 8) == 0) {
    LAB_005ced9f: uVar4 = ((((uVar5) << 16 >> 16) - heap.u32((0x00652478) + (uVar13 * 2) * 4)) & 0xffff);
    uVar5 = ((((uVar4) >>> 0)) >>> 0);
    uVar6 = ((heap.u32(0x00652468) - heap.u32((0x0065247a) + (uVar13 * 2) * 4)) & 0xffff);
    uVar7 = ((uVar6 * 0x80 | uVar6 >>> 9 | uVar4) & 0xffff);
    puVar14 = ((heap.u32((0x00971ef4) + (((uVar7 >>> 5 | uVar7 << 0xb) & 0xffff)) * 4)) >>> 0);
    do {
      cVar10 = (((((in_EDX >>> 8)) << 24 >> 24)) & 0xff);
      if ((((bVar3 == heap.u8(puVar14 + (2))) && (uVar11 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar11 >>> 8)), heap.u8(puVar14)) & 0xffffff3c) >>> 0), ((uVar11) << 24 >> 24) == 8)) && (uVar11 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar11 >>> 8)), heap.u8(puVar14)) & 0xffffff03) >>> 0), ((uVar11) << 24 >> 24) == cVar10)) && ((((uVar11 >>> 8)) << 24 >> 24) == heap.u8(puVar14 + (7)))) {
        cVar2 = ((heap.u8(puVar14 + (4))) & 0xff);
        uVar11 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar11 >>> 8)), cVar2)) >>> 0);
        if ((cVar2 == 2) || (cVar2 == 3)) {
          break LAB_005cee2b;
        }
        if (cVar2 == 1) {
          break code_r0x005cedf5;
        }
      }
      pbVar1 = ((puVar14 + 1) >>> 0);
      puVar14 = ((puVar14 + 8) >>> 0);
    } while ((heap.u8(pbVar1) & 0x80) == 0);
    /* goto LAB_005cee5d — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005ced51/LAB_005cee5d"); return 0;
  }
  heap.setU32(0x00652468, (in_CX) >>> 0);
  if (3 < heap.u32(((0x00887497) & 0xff) + (iVar16) * 4)) {
    LAB_005cf0b8: heap.setU32(0x00991efc, (0x3d4) >>> 0);
    return 1;
  }
  if ((unaff_EBX & 1) != 0) {
    iVar8 = ((-1) >>> 0);
    do {
      iVar9 = ((iVar8) >>> 0);
      iVar8 = ((iVar9 + 1) >>> 0);
    } while ((heap.u32((0x0088744a) + (uVar15 * 0x130 + iVar8) * 4) | 0) != -1);
    heap.setU32(((0x0088744a) + (uVar15 * 0x130 + iVar8) * 4), (CONCAT11((((in_CX >>> 5)) << 24 >> 24), (((heap.u32(0x00652466) >>> 5)) << 24 >> 24))) & 0xffffffff);
    heap.setU8((pbVar17 + (iVar9 + 0x33)), (bVar3) & 0xff);
    heap.setU8((pbVar17 + (iVar9 + 0x3b)), (1) & 0xff);
    heap.setU8((pbVar17 + (iVar9 + 0x37)), (0) & 0xff);
    heap.setU32(((0x00887497) + (iVar16) * 4), (heap.u32((0x00887497) + (iVar16) * 4) + 1) & 0xffffffff);
  }
  LAB_005cf068: return 1;
  }
  if ((unaff_EBX & 1) != 0) {
    iVar8 = ((-1) >>> 0);
    do {
      do {
        iVar9 = ((iVar8) >>> 0);
        iVar8 = ((iVar9 + 1) >>> 0);
      } while (CONCAT11((((uVar6 >>> 5)) << 24 >> 24), (((uVar4 >>> 5)) << 24 >> 24)) != heap.u32((0x0088744a) + (uVar15 * 0x130 + iVar8) * 4));
    } while (bVar3 != heap.u8(pbVar17 + (iVar9 + 0x33)));
    heap.setU32(((0x0088744a) + (uVar15 * 0x130 + iVar8) * 4), (0xffff) & 0xffffffff);
    heap.setU32(((0x00887497) + (iVar16) * 4), (heap.u32((0x00887497) + (iVar16) * 4) + -1) & 0xffffffff);
  }
  }
  heap.setU32(0x0065246e, (heap.u32(0x0065246e) + 1) >>> 0);
  heap.setU32(0x00652466, (uVar4) >>> 0);
  heap.setU32(0x00652468, (uVar6) >>> 0);
  /* goto LAB_005ced9f — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005ced51/LAB_005ced9f"); return 0;
  LAB_005cee5d: uVar4 = ((heap.u32(0x0065246a) + heap.u32((0x00652478) + (uVar13 * 2) * 4)) & 0xffff);
  uVar6 = ((heap.u32(0x0065246c) + heap.u32((0x0065247a) + (uVar13 * 2) * 4)) & 0xffff);
  uVar7 = ((uVar6 * 0x80 | uVar6 >>> 9 | uVar4) & 0xffff);
  puVar14 = ((heap.u32((0x00971ef4) + (((uVar7 >>> 5 | uVar7 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    if (((bVar3 == heap.u8(puVar14 + (2))) && (uVar11 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar11 >>> 8)), heap.u8(puVar14)) & 0xffffff3c) >>> 0), ((uVar11) << 24 >> 24) == 8)) && ((uVar11 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar11 >>> 8)), heap.u8(puVar14)) & 0xffffff03) >>> 0), ((uVar11) << 24 >> 24) == cVar10 && ((((uVar11 >>> 8)) << 24 >> 24) == heap.u8(puVar14 + (7)))))) {
      cVar2 = ((heap.u8(puVar14 + (4))) & 0xff);
      uVar11 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar11 >>> 8)), cVar2)) >>> 0);
      if ((cVar2 == 2) || (cVar2 == 3)) {
        break LAB_005ceee9;
      }
      if (cVar2 == 1) {
        break code_r0x005ceeb3;
      }
    }
    pbVar1 = ((puVar14 + 1) >>> 0);
    puVar14 = ((puVar14 + 8) >>> 0);
  } while ((heap.u8(pbVar1) & 0x80) == 0);
  if (((heap.u32(0x00652466) == heap.u32(0x0065246a)) && (heap.u32(0x00652468) == heap.u32(0x0065246c))) && (3 < heap.u32(((0x00887497) & 0xff) + (iVar16) * 4))) {
    /* goto LAB_005cf0b8 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005ced51/LAB_005cf0b8"); return 0;
  }
  if (0xc < heap.u32(0x0065246e)) {
    heap.setU32(0x00991efc, (0x456) >>> 0);
    return 1;
  }
  uVar5 = ((in_EDX) >>> 0);
  uVar4 = ((heap.u32(0x0065246a)) & 0xffff);
  uVar6 = ((heap.u32(0x0065246c)) & 0xffff);
  if ((unaff_EBX & 1) == 0) {
    /* goto LAB_005cf068 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005ced51/LAB_005cf068"); return 0;
  }
  LAB_005cef5b: uVar7 = ((uVar6 << 7 | uVar6 >>> 9 | uVar4) & 0xffff);
  puVar14 = ((heap.u32((0x00971ef4) + (((uVar7 >>> 5 | uVar7 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    if (((((uVar5) & 0xff) == heap.u8(puVar14 + (2))) && (uVar11 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar11 >>> 8)), heap.u8(puVar14)) & 0xffffff3c) >>> 0), ((uVar11) << 24 >> 24) == 8)) && ((uVar11 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar11 >>> 8)), heap.u8(puVar14)) & 0xffffff03) >>> 0), ((uVar11) << 24 >> 24) == (((uVar5 >>> 8)) << 24 >> 24) && ((((uVar11 >>> 8)) << 24 >> 24) == heap.u8(puVar14 + (7)))))) {
      cVar10 = ((heap.u8(puVar14 + (4))) & 0xff);
      uVar12 = (((regs.eax = callIndirect(heap, undefined3, uVar11 >>> 8))) >>> 0);
      uVar11 = ((CONCAT31(uVar12, cVar10)) >>> 0);
      if (((cVar10 == 2) || (cVar10 == 3)) || (cVar10 == 1)) {
        break LAB_005cefb5;
      }
    }
    puVar14 = ((puVar14 + 8) >>> 0);
  } while (true);
  }
  if ((unaff_EBX & 1) != 0) {
    iVar8 = ((-1) >>> 0);
    do {
      do {
        iVar9 = ((iVar8) >>> 0);
        iVar8 = ((iVar9 + 1) >>> 0);
      } while (CONCAT11((((uVar6 >>> 5)) << 24 >> 24), (((uVar4 >>> 5)) << 24 >> 24)) != heap.u32((0x0088744a) + (uVar15 * 0x130 + iVar8) * 4));
    } while (bVar3 != heap.u8(pbVar17 + (iVar9 + 0x33)));
    heap.setU32(((0x0088744a) + (uVar15 * 0x130 + iVar8) * 4), (0xffff) & 0xffffffff);
    heap.setU32(((0x00887497) + (iVar16) * 4), (heap.u32((0x00887497) + (iVar16) * 4) + -1) & 0xffffffff);
  }
  }
  heap.setU32(0x0065246e, (heap.u32(0x0065246e) + 1) >>> 0);
  heap.setU32(0x0065246a, (uVar4) >>> 0);
  heap.setU32(0x0065246c, (uVar6) >>> 0);
  /* goto LAB_005cee5d — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005ced51/LAB_005cee5d"); return 0;
  }
  if ((uVar4 == heap.u32(0x0065246a)) && (uVar6 == heap.u32(0x0065246c))) {
    iVar8 = ((-1) >>> 0);
    do {
      iVar9 = ((iVar8) >>> 0);
      iVar8 = ((iVar9 + 1) >>> 0);
    } while ((heap.u32((0x0088744a) + (uVar15 * 0x130 + iVar8) * 4) | 0) != -1);
    heap.setU32(((0x0088744a) + (uVar15 * 0x130 + iVar8) * 4), (CONCAT11((((uVar6 >>> 5)) << 24 >> 24), (((uVar4 >>> 5)) << 24 >> 24))) & 0xffffffff);
    heap.setU8((pbVar17 + (iVar9 + 0x33)), (((uVar5) & 0xff)) & 0xff);
    heap.setU8((pbVar17 + (iVar9 + 0x3b)), (1) & 0xff);
    heap.setU8((pbVar17 + (iVar9 + 0x37)), (heap.u32(0x0065246e)) & 0xff);
    heap.setU32(((0x00887497) + (iVar16) * 4), (heap.u32((0x00887497) + (iVar16) * 4) + 1) & 0xffffffff);
    uVar11 = ((CONCAT31(uVar12, 1)) >>> 0);
  } else {
    uVar11 = ((CONCAT31(uVar12, 3)) >>> 0);
    if ((uVar4 == heap.u32(0x00652466)) && (uVar6 == heap.u32(0x00652468))) {
      uVar11 = ((CONCAT31(uVar12, 2)) >>> 0);
    }
  }
  heap.setU8((puVar14 + (4)), (((uVar11) << 24 >> 24)) & 0xff);
  uVar4 = (((regs.eax = FUN_005e56d3(heap, puVar14))) & 0xffff);
  if ((uVar4 == heap.u32(0x00652466)) && (extraout_CX == heap.u32(0x00652468))) {
    /* goto LAB_005cf068 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005ced51/LAB_005cf068"); return 0;
  }
  uVar5 = ((extraout_EDX) >>> 0);
  uVar4 = ((uVar4 - heap.u32((0x00652478) + (uVar13 * 2) * 4)) & 0xffff);
  uVar6 = ((extraout_CX - heap.u32((0x0065247a) + (uVar13 * 2) * 4)) & 0xffff);
  /* goto LAB_005cef5b — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005ced51/LAB_005cef5b"); return 0;
}
