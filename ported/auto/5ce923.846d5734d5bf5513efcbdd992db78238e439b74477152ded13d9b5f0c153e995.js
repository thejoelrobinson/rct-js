// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5ce923.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3, undefined3 } from "../../runtime/win32.js";
import { CONCAT11, CONCAT31, CONCAT44, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e56d3 } from "./5e56d3.js";
export function FUN_005ce923(heap) {
  let pbVar1 = 0;
  let cVar2 = 0;
  let bVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let extraout_CX = 0;
  let in_ECX = regs.ecx >>> 0;
  let cVar12 = 0;
  let in_EDX = regs.edx >>> 0;
  let iVar10 = 0;
  let iVar11 = 0;
  let extraout_EDX = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar13 = 0;
  let uVar14 = 0;
  let uVar15 = 0;
  let puVar16 = 0;
  let uVar17 = 0;
  let iVar18 = 0;
  let pbVar19 = 0;
  LAB_005cec8a: {
  LAB_005cebae: {
  LAB_005ceac6: {
  code_r0x005cea90: {
  LAB_005ce9f8: {
  code_r0x005ce9c2: {
  uVar4 = ((((in_EAX) & 0xffff)) & 0xffff);
  uVar7 = ((((in_ECX) & 0xffff)) & 0xffff);
  heap.setU32(0x0065246e, (0) >>> 0);
  heap.setU32(0x0065246f, (0xff) >>> 0);
  uVar15 = ((in_EDX >>> 8 & 0xff) >>> 0);
  uVar17 = ((unaff_EBX >>> 8 & 0xff) >>> 0);
  iVar18 = ((uVar17 * 0x260) >>> 0);
  pbVar19 = ((0x00887420 + iVar18) >>> 0);
  bVar3 = ((((in_EDX) & 0xff)) & 0xff);
  cVar12 = (((((in_EDX >>> 8)) << 24 >> 24)) & 0xff);
  uVar6 = ((in_EAX) >>> 0);
  uVar13 = ((unaff_EBX) >>> 0);
  heap.setU32(0x00652466, (uVar4) >>> 0);
  heap.setU32(0x00652468, (uVar7) >>> 0);
  heap.setU32(0x0065246a, (uVar4) >>> 0);
  heap.setU32(0x0065246c, (uVar7) >>> 0);
  if ((heap.u32((0x005f5b78 + heap.u32(pbVar19) * 8)) & 8) == 0) {
    LAB_005ce978: uVar9 = ((((in_ECX) & 0xffff)) & 0xffff);
    uVar5 = ((((uVar6) & 0xffff)) & 0xffff);
    uVar8 = ((uVar9 << 7 | uVar9 >>> 9 | uVar5) & 0xffff);
    puVar16 = ((heap.u32((0x00971ef4) + (((uVar8 >>> 5 | uVar8 << 0xb) & 0xffff)) * 4)) >>> 0);
    do {
      if (((bVar3 == heap.u8(puVar16 + (2))) && (uVar13 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar13 >>> 8)), heap.u8(puVar16)) & 0xffffff3c) >>> 0), ((uVar13) << 24 >> 24) == 8)) && ((uVar13 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar13 >>> 8)), heap.u8(puVar16)) & 0xffffff03) >>> 0), ((uVar13) << 24 >> 24) == cVar12 && ((((uVar13 >>> 8)) << 24 >> 24) == heap.u8(puVar16 + (7)))))) {
        cVar2 = ((heap.u8(puVar16 + (4))) & 0xff);
        uVar13 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar13 >>> 8)), cVar2)) >>> 0);
        if ((cVar2 == 2) || (cVar2 == 3)) {
          break LAB_005ce9f8;
        }
        if (cVar2 == 1) {
          break code_r0x005ce9c2;
        }
      }
      pbVar1 = ((puVar16 + 1) >>> 0);
      puVar16 = ((puVar16 + 8) >>> 0);
    } while ((heap.u8(pbVar1) & 0x80) == 0);
    /* goto LAB_005cea3a — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005ce923/LAB_005cea3a"); return 0;
  }
  uVar5 = ((uVar7 << 7 | uVar7 >>> 9 | uVar4) & 0xffff);
  uVar6 = ((unaff_EBX) >>> 0);
  puVar16 = ((heap.u32((0x00971ef4) + (((uVar5 >>> 5 | uVar5 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    if ((((bVar3 == heap.u8(puVar16 + (2))) && (uVar6 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar6 >>> 8)), heap.u8(puVar16)) & 0xffffff3c) >>> 0), ((uVar6) << 24 >> 24) == 8)) && (uVar6 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar6 >>> 8)), heap.u8(puVar16)) & 0xffffff03) >>> 0), ((uVar6) << 24 >> 24) == cVar12)) && ((((uVar6 >>> 8)) << 24 >> 24) == heap.u8(puVar16 + (7)))) {
      if ((unaff_EBX & 1) != 0) {
        iVar10 = ((-1) >>> 0);
        do {
          do {
            iVar11 = ((iVar10) >>> 0);
            iVar10 = ((iVar11 + 1) >>> 0);
          } while (CONCAT11((((uVar7 >>> 5)) << 24 >> 24), (((uVar4 >>> 5)) << 24 >> 24)) != heap.u32((0x0088744a) + (uVar17 * 0x130 + iVar10) * 4));
        } while (bVar3 != heap.u8(pbVar19 + (iVar11 + 0x33)));
        heap.setU32(((0x0088744a) + (uVar17 * 0x130 + iVar10) * 4), (0xffff) & 0xffffffff);
        heap.setU32(((0x00887497) + (iVar18) * 4), (heap.u32((0x00887497) + (iVar18) * 4) + -1) & 0xffffffff);
      }
      break;
    }
    pbVar1 = ((puVar16 + 1) >>> 0);
    puVar16 = ((puVar16 + 8) >>> 0);
  } while ((heap.u8(pbVar1) & 0x80) == 0);
  LAB_005cecb9: return 1;
  }
  if ((unaff_EBX & 1) != 0) {
    iVar10 = ((-1) >>> 0);
    do {
      do {
        iVar11 = ((iVar10) >>> 0);
        iVar10 = ((iVar11 + 1) >>> 0);
      } while (CONCAT11((((in_ECX >>> 5)) << 24 >> 24), (((uVar5 >>> 5)) << 24 >> 24)) != heap.u32((0x0088744a) + (uVar17 * 0x130 + iVar10) * 4));
    } while (bVar3 != heap.u8(pbVar19 + (iVar11 + 0x33)));
    heap.setU32(((0x0088744a) + (uVar17 * 0x130 + iVar10) * 4), (0xffff) & 0xffffffff);
    heap.setU32(((0x00887497) + (iVar18) * 4), (heap.u32((0x00887497) + (iVar18) * 4) + -1) & 0xffffffff);
  }
  }
  heap.setU32(0x0065246f, (heap.u32(0x0065246f) + 1) >>> 0);
  uVar6 = ((((uVar5 - heap.u32((0x00652478) + (uVar15 * 2) * 4)) >>> 0)) >>> 0);
  in_ECX = ((((uVar9 - heap.u32((0x0065247a) + (uVar15 * 2) * 4)) >>> 0)) >>> 0);
  heap.setU32(0x00652466, (uVar5) >>> 0);
  heap.setU32(0x00652468, (uVar9) >>> 0);
  /* goto LAB_005ce978 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005ce923/LAB_005ce978"); return 0;
  LAB_005cea3a: uVar5 = ((heap.u32(0x0065246a) + heap.u32((0x00652478) + (uVar15 * 2) * 4)) & 0xffff);
  uVar9 = ((heap.u32(0x0065246c) + heap.u32((0x0065247a) + (uVar15 * 2) * 4)) & 0xffff);
  uVar8 = ((uVar9 * 0x80 | uVar9 >>> 9 | uVar5) & 0xffff);
  puVar16 = ((heap.u32((0x00971ef4) + (((uVar8 >>> 5 | uVar8 << 0xb) & 0xffff)) * 4)) >>> 0);
  do {
    if ((((bVar3 == heap.u8(puVar16 + (2))) && (uVar13 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar13 >>> 8)), heap.u8(puVar16)) & 0xffffff3c) >>> 0), ((uVar13) << 24 >> 24) == 8)) && (uVar13 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar13 >>> 8)), heap.u8(puVar16)) & 0xffffff03) >>> 0), ((uVar13) << 24 >> 24) == cVar12)) && ((((uVar13 >>> 8)) << 24 >> 24) == heap.u8(puVar16 + (7)))) {
      cVar2 = ((heap.u8(puVar16 + (4))) & 0xff);
      uVar13 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar13 >>> 8)), cVar2)) >>> 0);
      if ((cVar2 == 2) || (cVar2 == 3)) {
        break LAB_005ceac6;
      }
      if (cVar2 == 1) {
        break code_r0x005cea90;
      }
    }
    pbVar1 = ((puVar16 + 1) >>> 0);
    puVar16 = ((puVar16 + 8) >>> 0);
  } while ((heap.u8(pbVar1) & 0x80) == 0);
  if ((((unaff_EBX & 1) == 0) && ((uVar4 != heap.u32(0x00652466) || (uVar7 != heap.u32(0x00652468))))) && (((uVar4 != heap.u32(0x0065246a) || (uVar7 != heap.u32(0x0065246c))) && (3 < heap.u32(((0x00887497) & 0xff) + (iVar18) * 4))))) {
    heap.setU32(0x00991efc, (0x3d4) >>> 0);
    return 1;
  }
  uVar6 = ((in_EDX) >>> 0);
  uVar5 = ((heap.u32(0x0065246a)) & 0xffff);
  uVar9 = ((heap.u32(0x0065246c)) & 0xffff);
  if ((unaff_EBX & 1) == 0) {
    /* goto LAB_005cecb9 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005ce923/LAB_005cecb9"); return 0;
  }
  LAB_005ceb42: if ((uVar5 != uVar4) || (uVar9 != uVar7)) {
    uVar8 = ((uVar9 << 7 | uVar9 >>> 9 | uVar5) & 0xffff);
    puVar16 = ((heap.u32((0x00971ef4) + (((uVar8 >>> 5 | uVar8 << 0xb) & 0xffff)) * 4)) >>> 0);
    do {
      if ((((((uVar6) & 0xff) == heap.u8(puVar16 + (2))) && (uVar13 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar13 >>> 8)), heap.u8(puVar16)) & 0xffffff3c) >>> 0), ((uVar13) << 24 >> 24) == 8)) && (uVar13 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar13 >>> 8)), heap.u8(puVar16)) & 0xffffff03) >>> 0), ((uVar13) << 24 >> 24) == (((uVar6 >>> 8)) << 24 >> 24))) && ((((uVar13 >>> 8)) << 24 >> 24) == heap.u8(puVar16 + (7)))) {
        cVar12 = ((heap.u8(puVar16 + (4))) & 0xff);
        uVar14 = (((regs.eax = callIndirect(heap, undefined3, uVar13 >>> 8))) >>> 0);
        uVar13 = ((CONCAT31(uVar14, cVar12)) >>> 0);
        if (((cVar12 == 2) || (cVar12 == 3)) || (cVar12 == 1)) {
          break LAB_005cebae;
        }
      }
      puVar16 = ((puVar16 + 8) >>> 0);
    } while (true);
  }
  break LAB_005cec8a;
  }
  if ((unaff_EBX & 1) != 0) {
    iVar10 = ((-1) >>> 0);
    do {
      do {
        iVar11 = ((iVar10) >>> 0);
        iVar10 = ((iVar11 + 1) >>> 0);
      } while (CONCAT11((((uVar9 >>> 5)) << 24 >> 24), (((uVar5 >>> 5)) << 24 >> 24)) != heap.u32((0x0088744a) + (uVar17 * 0x130 + iVar10) * 4));
    } while (bVar3 != heap.u8(pbVar19 + (iVar11 + 0x33)));
    heap.setU32(((0x0088744a) + (uVar17 * 0x130 + iVar10) * 4), (0xffff) & 0xffffffff);
    heap.setU32(((0x00887497) + (iVar18) * 4), (heap.u32((0x00887497) + (iVar18) * 4) + -1) & 0xffffffff);
  }
  }
  heap.setU32(0x0065246e, (heap.u32(0x0065246e) + 1) >>> 0);
  heap.setU32(0x0065246a, (uVar5) >>> 0);
  heap.setU32(0x0065246c, (uVar9) >>> 0);
  /* goto LAB_005cea3a — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005ce923/LAB_005cea3a"); return 0;
  }
  if (((uVar5 == heap.u32(0x0065246a)) && (uVar9 == heap.u32(0x0065246c))) || ((((uVar5 + heap.u32((0x00652478) + (uVar15 * 2) * 4)) & 0xffff) == uVar4 && (((uVar9 + heap.u32((0x0065247a) + (uVar15 * 2) * 4)) & 0xffff) == uVar7)))) {
    iVar10 = ((-1) >>> 0);
    do {
      iVar11 = ((iVar10) >>> 0);
      iVar10 = ((iVar11 + 1) >>> 0);
    } while ((heap.u32((0x0088744a) + (uVar17 * 0x130 + iVar10) * 4) | 0) != -1);
    heap.setU32(((0x0088744a) + (uVar17 * 0x130 + iVar10) * 4), (CONCAT11((((uVar9 >>> 5)) << 24 >> 24), (((uVar5 >>> 5)) << 24 >> 24))) & 0xffffffff);
    heap.setU8((pbVar19 + (iVar11 + 0x33)), (((uVar6) & 0xff)) & 0xff);
    heap.setU8((pbVar19 + (iVar11 + 0x3b)), (1) & 0xff);
    bVar3 = ((heap.u32(0x0065246e)) & 0xff);
    LOCK();
    heap.setU32(0x0065246e, (0) >>> 0);
    UNLOCK();
    if (bVar3 == 0) {
      bVar3 = ((heap.u32(0x0065246f)) & 0xff);
    }
    heap.setU8((pbVar19 + (iVar11 + 0x37)), (bVar3) & 0xff);
    heap.setU32(((0x00887497) + (iVar18) * 4), (heap.u32((0x00887497) + (iVar18) * 4) + 1) & 0xffffffff);
    uVar13 = ((CONCAT31(uVar14, 1)) >>> 0);
  } else {
    if (((((uVar5 - heap.u32((0x00652478) + (uVar15 * 2) * 4)) & 0xffff) == uVar4) && (((uVar9 - heap.u32((0x0065247a) + (uVar15 * 2) * 4)) & 0xffff) == uVar7)) || ((uVar13 = ((CONCAT31(uVar14, 3)) >>> 0), uVar5 == heap.u32(0x00652466) && (uVar9 == heap.u32(0x00652468))))) {
    uVar13 = ((CONCAT31((regs.eax = callIndirect(heap, int3, uVar13 >>> 8)), 2)) >>> 0);
  }
  }
  heap.setU8((puVar16 + (4)), (((uVar13) << 24 >> 24)) & 0xff);
  uVar5 = (((regs.eax = FUN_005e56d3(heap, puVar16))) & 0xffff);
  uVar6 = ((extraout_EDX) >>> 0);
  uVar9 = ((extraout_CX) & 0xffff);
  }
  if ((uVar5 == heap.u32(0x00652466)) && (uVar9 == heap.u32(0x00652468))) {
    /* goto LAB_005cecb9 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005ce923/LAB_005cecb9"); return 0;
  }
  uVar5 = ((uVar5 - heap.u32((0x00652478) + (uVar15 * 2) * 4)) & 0xffff);
  uVar9 = ((uVar9 - heap.u32((0x0065247a) + (uVar15 * 2) * 4)) & 0xffff);
  /* goto LAB_005ceb42 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005ce923/LAB_005ceb42"); return 0;
}
