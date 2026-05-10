// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d13e2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0043642b } from "./43642b.js";
import { FUN_005cfe66 } from "./5cfe66.js";
import { FUN_005d298a } from "./5d298a.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_005d13e2(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_stack0xffffffe0 = __sp + 0;
  try {
  let bVar1 = 0;
  let sVar2 = 0;
  let pbVar3 = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  let sVar6 = 0;
  let sVar7 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar8 = 0;
  let extraout_CX = 0;
  let sVar9 = 0;
  let extraout_ECX = 0;
  let iVar10 = 0;
  let cVar11 = 0;
  let cVar14 = 0;
  let in_EDX = regs.edx >>> 0;
  let extraout_EDX = 0;
  let iVar12 = 0;
  let uVar13 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let puVar15 = 0;
  let unaff_BP = regs.ebp & 0xffff;
  let sVar16 = 0;
  let sVar17 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar18 = 0;
  let pcVar19 = 0;
  let uVar20 = 0;
  let bVar21 = 0;
  let in_ZF = regs.zf | 0;
  let uVar22 = 0;
  LAB_005d1c4c: {
  (regs.ecx = 0x8d, regs.eax = FUN_005e3b2b(heap), regs.ecx = 0xd, regs.eax);
  if (in_ZF) {
    return 1;
  }
  (regs.eax = FUN_0043642b(heap));
  heap.setU32(0x0099a020, (heap.u32(0x0099a020) | 10) >>> 0);
  if (heap.u8(0x00652288) == 0) {
    LAB_005d1435: uVar8 = ((heap.u32(0x00652290)) >>> 0);
    uVar18 = ((0) >>> 0);
    sVar7 = ((heap.u8(0x0065228a)) & 0xffff);
    sVar9 = ((heap.u8(0x0065228c)) & 0xffff);
  } else {
    bVar21 = ((heap.u8(0x00652288) < 3) & 0xff);
    if (heap.u8(0x00652288) == 3) {
      uVar8 = ((heap.u32(0x00652290)) >>> 0);
      uVar18 = ((heap.u32(0x00652291)) >>> 0);
      sVar7 = ((heap.u8(0x0065228a)) & 0xffff);
      sVar9 = ((heap.u8(0x0065228c)) & 0xffff);
    } else {
      sVar7 = (((regs.eax = FUN_005d298a(heap))) & 0xffff);
      if (bVar21) {
        /* goto LAB_005d1435 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d13e2/LAB_005d1435"); return 0;
      }
      uVar8 = ((unaff_EBX >>> 8 & 0xff) >>> 0);
      uVar18 = ((extraout_EDX >>> 8 & 0xff) >>> 0);
      sVar9 = ((extraout_CX) & 0xffff);
    }
  }
  iVar12 = ((0) >>> 0);
  for (pcVar19 = ((heap.u32((0x00652498) + (uVar18) * 4)) >>> 0); (heap.i8(pcVar19) | 0) != -1; pcVar19 = (((pcVar19 + 10) >>> 0)) >>> 0) {
    if ((heap.i8(pcVar19 + (9)) & 1) == 0) {
      sVar16 = ((heap.i16((pcVar19 + 1))) & 0xffff);
      sVar2 = ((heap.i16((pcVar19 + 3))) & 0xffff);
      sVar17 = ((sVar2) & 0xffff);
      switch (uVar8 & 3) {
        case 1:
          sVar17 = ((-sVar16) & 0xffff);
          sVar16 = ((sVar2) & 0xffff);
          break;
        case 2:
          sVar17 = ((-sVar2) & 0xffff);
          sVar16 = ((-sVar16) & 0xffff);
          break;
        case 3:
          sVar17 = ((sVar16) & 0xffff);
          sVar16 = ((-sVar2) & 0xffff);
      }
      unaff_BP = ((sVar16 + sVar7) & 0xffff);
      heap.setI16((0x0099a02c + iVar12), (unaff_BP) & 0xffff);
      heap.setI16((((0x0099a02c) | 0) + iVar12 * 4 + 2), (sVar17 + sVar9) & 0xffff);
      iVar12 = ((iVar12 + 1) >>> 0);
    }
  }
  heap.setU16((0x0099a02c + iVar12), (0xffff) & 0xffff);
  uVar22 = (((regs.eax = FUN_0043642b(heap))) >>> 0);
  heap.setU32((unaff_ESI + 0x18), (0) & 0xffffffff);
  heap.setU8(0x006522a6, (-1) & 0xff);
  if (heap.u8(0x00652288) == 3) {
    bVar21 = ((false) & 0xff);
    (regs.eax = FUN_005cfe66(heap, CONCAT11(heap.u8(0x00652290), heap.u8(0x00652291)), pcVar19, unaff_ESI, unaff_BP, __addr_stack0xffffffe0, uVar8 & 3, (((((uVar22) >>> 0) >>> 0x20)) | 0), extraout_ECX, ((uVar22) | 0)));
    if (!bVar21) {
      heap.setU8(0x006522a6, (heap.i8(pcVar19 + (4))) & 0xff);
      if (heap.u8(0x006522a6) == 99) {
        heap.setU8(0x006522a4, ((((heap.i8(pcVar19 + (5))) & 0xff) >>> 4) << 1) & 0xff);
      }
      if (heap.u8(0x006522a6) == 100) {
        heap.setU8(0x006522a5, ((((heap.i8(pcVar19 + (5))) & 0xff) >>> 4) << 1) & 0xff);
      }
    }
  }
  heap.setU8(0x006522a9, (0) & 0xff);
  uVar20 = ((heap.u32(((0x00887420) >>> 0) + (heap.u32(0x00652289) * 0x260) * 4)) >>> 0);
  puVar15 = ((0x0065226c) >>> 0);
  uVar8 = ((0) >>> 0);
  heap.setU32(0x0065226a, (0) >>> 0);
  uVar18 = ((0) >>> 0);
  do {
    LAB_005d1637: {
    bVar1 = ((heap.u32((0x006545af) + (uVar18 * 8) * 4)) & 0xff);
    uVar13 = ((((bVar1) >>> 0)) >>> 0);
    if (bVar1 != 0) {
      if (((bVar1) << 24 >> 24) < 0) {
        if ((uVar13 & 0x7f) == uVar20) {
          /* goto LAB_005d1588 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d13e2/LAB_005d1588"); return 0;
        }
      } else {
        if ((heap.u8((((0x0087c41c) | 0) + (((uVar13) | 0) >>> 3) + uVar20 * 4)) >>> (uVar13 & 7) & 1) != 0) {
        LAB_005d1588: if ((heap.u8(0x00652288) == 1) || (heap.u8(0x00652288) == 4)) {
          cVar11 = ((heap.u32((0x006545b3) + (uVar18 * 8) * 4)) & 0xff);
          cVar14 = ((heap.u32((0x006545b5) + (uVar18 * 8) * 4)) & 0xff);
        } else {
          if (heap.u8(0x00652288) != 2) {
            break LAB_005d1637;
          }
          cVar11 = ((heap.u32((0x006545b2) + (uVar18 * 8) * 4)) & 0xff);
          cVar14 = ((heap.u32((0x006545b4) + (uVar18 * 8) * 4)) & 0xff);
        }
        if (((((heap.u32((0x006545af) + (uVar18 * 8) * 4) != 21) && (heap.u32((0x006545af) + (uVar18 * 8) * 4) != 22)) || (cVar14 == heap.u8(0x00652299))) || ((heap.u8(0x00652299) == 0 && (cVar14 == 2)))) && ((cVar14 != 15 || (heap.u8(0x00652299) == 15)))) {
          heap.setU32(puVar15, (((uVar18) << 24 >> 24)) & 0xffffffff);
          puVar15 = ((puVar15 + 1) >>> 0);
          pbVar3 = (((((0x00652284) | 0) + (((uVar8) | 0) >>> 3))) >>> 0);
          heap.setU32(pbVar3, (heap.u8(pbVar3) | 1 << (uVar8 & 7)) & 0xffffffff);
          if (((heap.u8(0x00652290) < 4) && (cVar11 == heap.u8(0x0065229a))) && (cVar14 == heap.u8(0x00652299))) {
            pbVar3 = (((((0x00652284) | 0) + (((uVar8) | 0) >>> 3))) >>> 0);
            heap.setU32(pbVar3, (heap.u8(pbVar3) & ~(1 << (uVar8 & 7))) & 0xffffffff);
            heap.setU32(0x0065226a, (heap.u32(0x0065226a) + 1) >>> 0);
          }
          uVar8 = ((uVar8 + 1) >>> 0);
        }
      }
      }
    }
    }
    uVar18 = ((uVar18 + 1) >>> 0);
  } while (uVar18 < 0xac);
  heap.setU32(0x00652268, (((uVar8) & 0xffff)) >>> 0);
  heap.setU32(0x00651f50, (0xe) >>> 0);
  heap.setU32(0x00651f60, (7) >>> 0);
  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
  if ((heap.u32((0x005f5b78 + uVar20 * 8)) & 0x20000) != 0) {
    heap.setU32(0x00651f50, (0) >>> 0);
    heap.setU32(0x00651f60, (0) >>> 0);
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
  }
  heap.setU32(0x00651e60, (0) >>> 0);
  if (heap.u32(0x0065226a) != 0) {
    heap.setU32(0x00651e60, (7) >>> 0);
  }
  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
  if ((heap.u32(((0x0087c41c) >>> 0) + (uVar20) * 4) >>> 1 & 1) != 0) {
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
  }
  heap.setU32(0x00651f20, (0) >>> 0);
  heap.setU32(0x00651f80, (0) >>> 0);
  if ((heap.u32((0x005f5b78 + uVar20 * 8)) & 0x40000000) != 0) {
    heap.setU32(0x00651f20, (2) >>> 0);
    heap.setU32(0x00651f80, (2) >>> 0);
  }
  heap.setU32(0x00651e10, (0) >>> 0);
  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
  heap.setU32(0x00651e00, (0) >>> 0);
  heap.setU32(0x00651e40, (0) >>> 0);
  heap.setU32(0x00651df0, (0) >>> 0);
  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
  heap.setU32(0x00651e02, (0x1c) >>> 0);
  heap.setU32(0x00651e04, (0x31) >>> 0);
  heap.setU32(0x00651e42, (0x74) >>> 0);
  heap.setU32(0x00651e44, (0x89) >>> 0);
  heap.setU32(0x00651e0a, (0x5e95) >>> 0);
  heap.setU32(0x00651e4a, (0x5e96) >>> 0);
  if ((heap.u32(((0x0087c41c) >>> 0) + (uVar20) * 4) >>> 0x10 & 1) != 0) {
    heap.setU32(0x00651e10, (2) >>> 0);
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
    heap.setU32(0x00651e02, (6) >>> 0);
    heap.setU32(0x00651e04, (0x1b) >>> 0);
    heap.setU32(0x00651e42, (0x8a) >>> 0);
    heap.setU32(0x00651e44, (0x9f) >>> 0);
    heap.setU32(0x00651e0a, (0x5e97) >>> 0);
    heap.setU32(0x00651e4a, (0x5e98) >>> 0);
  }
  if ((heap.u32(((0x0087c41c) >>> 0) + (uVar20) * 4) >>> 0xf & 1) != 0) {
    heap.setU32(0x00651e00, (2) >>> 0);
    heap.setU32(0x00651e40, (2) >>> 0);
  }
  if ((heap.u32(((0x0087c41c) >>> 0) + (uVar20) * 4) >>> 0xe & 1) != 0) {
    heap.setU32(0x00651df0, (2) >>> 0);
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
  }
  heap.setU32(0x00651e70, (0) >>> 0);
  heap.setU32(0x00651e80, (0) >>> 0);
  heap.setU32(0x00651e90, (0) >>> 0);
  heap.setU32(0x00651ea0, (0) >>> 0);
  heap.setU32(0x00651eb0, (0) >>> 0);
  if (uVar20 == 0x2a) {
    heap.setU32(0x00651e90, (2) >>> 0);
    heap.setU32(0x00651ea0, (2) >>> 0);
  }
  if ((heap.u32((0x0087c41c) + (uVar20) * 4) & 0x300) != 0) {
    heap.setU32(0x00651e90, (2) >>> 0);
  }
  if ((heap.u32((0x0087c41c) + (uVar20) * 4) & 0x100) != 0) {
    heap.setU32(0x00651e80, (2) >>> 0);
    heap.setU32(0x00651ea0, (2) >>> 0);
  }
  if ((heap.u32((0x0087c41c) + (uVar20) * 4) & 0x200) != 0) {
    heap.setU32(0x00651e70, (2) >>> 0);
    heap.setU32(0x00651eb0, (2) >>> 0);
  }
  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
  heap.setU32(0x00651e72, (0x17) >>> 0);
  if (((heap.u32(((0x0087c41c) >>> 0) + (uVar20) * 4) >>> 3 & 1) != 0) && (heap.u8(0x00652294) < 0x10)) {
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
    heap.setU32(0x00651e72, (9) >>> 0);
  }
  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
  heap.setU32(0x00651e82, (heap.u32(0x00651e72) + 0x18) >>> 0);
  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
  heap.setU32(0x00651e92, (heap.u32(0x00651e72) + 0x30) >>> 0);
  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
  heap.setU32(0x00651ea2, (heap.u32(0x00651e72) + 0x48) >>> 0);
  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
  heap.setU32(0x00651eb2, (heap.u32(0x00651e72) + 0x60) >>> 0);
  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
  heap.setU32(0x00651eba, (0x5e9f) >>> 0);
  heap.setU32(0x00651ebe, (0x3ae) >>> 0);
  heap.setU32(0x00651e7a, (0x5e9b) >>> 0);
  heap.setU32(0x00651e7e, (0x3aa) >>> 0);
  if ((heap.u32(((0x0087c41c) >>> 0) + (uVar20) * 4) >>> 0x1c & 1) != 0) {
    if ((heap.u8(0x0065229a) == 4) || (sVar7 = ((heap.u32(0x00651e72)) & 0xffff), sVar9 = ((((heap.u32(0x00651e74)) << 16 >> 16)) & 0xffff), sVar16 = ((heap.u32(0x00651e82)) & 0xffff), sVar2 = ((((heap.u32(0x00651e84)) << 16 >> 16)) & 0xffff), sVar17 = ((heap.u32(0x00651e92)) & 0xffff), sVar4 = ((((heap.u32(0x00651e94)) << 16 >> 16)) & 0xffff), sVar5 = ((heap.u32(0x00651ea2)) & 0xffff), sVar6 = ((((heap.u32(0x00651ea4)) << 16 >> 16)) & 0xffff), heap.u8(0x0065229a) == 10)) {
      LOCK();
      UNLOCK();
      LOCK();
      UNLOCK();
      LOCK();
      UNLOCK();
      LOCK();
      UNLOCK();
      LOCK();
      UNLOCK();
      LOCK();
      UNLOCK();
      LOCK();
      UNLOCK();
      LOCK();
      UNLOCK();
      heap.setU32(0x00651e7a, (0x5ea0) >>> 0);
      heap.setU32(0x00651e7e, (0x3af) >>> 0);
      sVar7 = ((heap.u32(0x00651eb2)) & 0xffff);
      sVar9 = ((((heap.u32(0x00651eb4)) << 16 >> 16)) & 0xffff);
      sVar16 = ((heap.u32(0x00651e72)) & 0xffff);
      sVar2 = ((((heap.u32(0x00651e74)) << 16 >> 16)) & 0xffff);
      sVar17 = ((heap.u32(0x00651e82)) & 0xffff);
      sVar4 = ((((heap.u32(0x00651e84)) << 16 >> 16)) & 0xffff);
      sVar5 = ((heap.u32(0x00651e92)) & 0xffff);
      sVar6 = ((((heap.u32(0x00651e94)) << 16 >> 16)) & 0xffff);
      heap.setU32(0x00651eb2, (heap.u32(0x00651ea2)) >>> 0);
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
    }
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
    heap.setU32(0x00651ea2, (sVar5) >>> 0);
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
    heap.setU32(0x00651e92, (sVar17) >>> 0);
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
    heap.setU32(0x00651e82, (sVar16) >>> 0);
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
    heap.setU32(0x00651e72, (sVar7) >>> 0);
    sVar6 = ((((heap.u32(0x00651ea4)) << 16 >> 16)) & 0xffff);
    sVar5 = ((heap.u32(0x00651ea2)) & 0xffff);
    sVar4 = ((((heap.u32(0x00651e94)) << 16 >> 16)) & 0xffff);
    sVar17 = ((heap.u32(0x00651e92)) & 0xffff);
    sVar2 = ((((heap.u32(0x00651e84)) << 16 >> 16)) & 0xffff);
    sVar16 = ((heap.u32(0x00651e82)) & 0xffff);
    sVar9 = ((((heap.u32(0x00651e74)) << 16 >> 16)) & 0xffff);
    sVar7 = ((heap.u32(0x00651e72)) & 0xffff);
    if ((heap.u8(0x0065229a) == 8) || (heap.u8(0x0065229a) == 18)) {
      LOCK();
      heap.setU32(0x00651ea2, (heap.u32(0x00651eb2)) >>> 0);
      UNLOCK();
      LOCK();
      heap.setU32(0x00651e92, (sVar5) >>> 0);
      UNLOCK();
      LOCK();
      heap.setU32(0x00651e82, (sVar17) >>> 0);
      UNLOCK();
      LOCK();
      heap.setU32(0x00651e72, (sVar16) >>> 0);
      UNLOCK();
      heap.setU32(0x00651eb2, (sVar7) >>> 0);
      LOCK();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
      UNLOCK();
      LOCK();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
      UNLOCK();
      LOCK();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
      UNLOCK();
      LOCK();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
      UNLOCK();
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
      heap.setU32(0x00651eba, (0x5ea1) >>> 0);
      heap.setU32(0x00651ebe, (0x3a9) >>> 0);
    }
  }
  heap.setU32(0x00651dea, (0x3a1) >>> 0);
  heap.setU32(0x00651eda, (0x5ea2) >>> 0);
  heap.setU32(0x00651ede, (0x3a2) >>> 0);
  heap.setU32(0x00651ed2, (0x2f) >>> 0);
  heap.setU32(0x00651ed4, (0x46) >>> 0);
  heap.setU32(0x00651ed6, (0x84) >>> 0);
  heap.setU32(0x00651ed8, (0x9b) >>> 0);
  heap.setU32(0x00651eea, (0x5ea3) >>> 0);
  heap.setU32(0x00651eee, (0x3a4) >>> 0);
  heap.setU32(0x00651ee2, (0x47) >>> 0);
  heap.setU32(0x00651ee4, (0x5e) >>> 0);
  heap.setU32(0x00651ee6, (0x84) >>> 0);
  heap.setU32(0x00651ee8, (0x9b) >>> 0);
  heap.setU32(0x00651efa, (0x5ea4) >>> 0);
  heap.setU32(0x00651efe, (0x3a3) >>> 0);
  heap.setU32(0x00651ef2, (0x5f) >>> 0);
  heap.setU32(0x00651ef4, (0x76) >>> 0);
  heap.setU32(0x00651ef6, (0x84) >>> 0);
  heap.setU32(0x00651ef8, (0x9b) >>> 0);
  heap.setU32(0x00651ed0, (0) >>> 0);
  heap.setU32(0x00651ef0, (0) >>> 0);
  heap.setU32(0x00651ee0, (0) >>> 0);
  if ((heap.u32((0x005f5b78 + uVar20 * 8)) & 0x1000) == 0) {
    if (heap.u8(0x006522a6) == 99) {
      LAB_005d1b40: heap.setU32(0x00651dea, (0x653) >>> 0);
      heap.setU8(0x006522a9, (1) & 0xff);
      heap.setU32(0x00651eda, (0x655) >>> 0);
      heap.setU32(0x00651ede, (0x657) >>> 0);
      heap.setU32(0x00651eee, (0x657) >>> 0);
      heap.setU32(0x00651efe, (0x657) >>> 0);
    } else {
      if (heap.u8(0x006522a6) != 100) {
        if (heap.u8(0x00652294) == 0x73) {
          /* goto LAB_005d1b40 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d13e2/LAB_005d1b40"); return 0;
        }
        if (heap.u8(0x00652294) != 0x74) {
          if ((heap.u32(((0x0087c41c) >>> 0) + (uVar20) * 4) >>> 6 & 1) != 0) {
            heap.setU32(0x00651ed0, (2) >>> 0);
            heap.setU32(0x00651ef0, (2) >>> 0);
            heap.setU32(0x00651ee0, (2) >>> 0);
          }
          break LAB_005d1c4c;
        }
      }
      heap.setU32(0x00651dea, (0x654) >>> 0);
      heap.setU8(0x006522a9, (2) & 0xff);
      heap.setU32(0x00651eda, (0x656) >>> 0);
      heap.setU32(0x00651ede, (0x658) >>> 0);
      heap.setU32(0x00651eee, (0x658) >>> 0);
      heap.setU32(0x00651efe, (0x658) >>> 0);
    }
    heap.setU32(0x00651ed0, (10) >>> 0);
    heap.setU32(0x00651ed2, (0x10) >>> 0);
    heap.setU32(0x00651ed4, (0x95) >>> 0);
    heap.setU32(0x00651ed6, (0x8a) >>> 0);
    heap.setU32(0x00651ed8, (0x95) >>> 0);
    heap.setU32(0x00651ee0, (7) >>> 0);
    heap.setU32(0x00651eea, (0x506) >>> 0);
    heap.setU32(0x00651ee2, (0x8a) >>> 0);
    heap.setU32(0x00651ee4, (0x94) >>> 0);
    heap.setU32(0x00651ee6, (0x8b) >>> 0);
    heap.setU32(0x00651ee8, (0x8f) >>> 0);
    heap.setU32(0x00651ef0, (7) >>> 0);
    heap.setU32(0x00651efa, (0x507) >>> 0);
    heap.setU32(0x00651ef2, (0x8a) >>> 0);
    heap.setU32(0x00651ef4, (0x94) >>> 0);
    heap.setU32(0x00651ef6, (0x90) >>> 0);
    heap.setU32(0x00651ef8, (0x94) >>> 0);
    heap.setU32((unaff_ESI + 0x18), (heap.u32((unaff_ESI + 0x18)) | 0x600000) & 0xffffffff);
  } else {
    heap.setU32(0x00651dea, (0x5d2) >>> 0);
    heap.setU32(0x00651eda, (0x5ea5) >>> 0);
    heap.setU32(0x00651efa, (0x5ea6) >>> 0);
    heap.setU32(0x00651ede, (0x5d3) >>> 0);
    heap.setU32(0x00651efe, (0x5d4) >>> 0);
    heap.setU32(0x00651ed0, (2) >>> 0);
    heap.setU32(0x00651ef0, (2) >>> 0);
  }
  }
  uVar8 = ((heap.u32((unaff_ESI + 0x14)) & 0x7d80003f) >>> 0);
  heap.setU32(0x00651f00, (0) >>> 0);
  heap.setU32(0x00651f10, (2) >>> 0);
  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
  heap.setU32(0x00651f30, (2) >>> 0);
  (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
  if ((heap.u32((0x005f5b78 + uVar20 * 8)) & 0x100) != 0) {
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
    heap.setU32(0x00651f30, (0) >>> 0);
  }
  if (heap.u8(0x00652288) == 4) {
    heap.setU32(0x00651f00, (2) >>> 0);
    heap.setU32(0x00651f10, (0) >>> 0);
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
    heap.setU32(0x00651f30, (0) >>> 0);
    (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
    LAB_005d1d15: iVar12 = ((9) >>> 0);
    if (((((heap.u8(0x00652294) != 0) && (iVar12 = ((8) >>> 0), heap.u8(0x00652294) != 1)) && (iVar12 = ((10) >>> 0), heap.u8(0x00652294) != 2)) && (((iVar12 = ((7) >>> 0), heap.u8(0x00652294) != 3 && (iVar12 = ((0xb) >>> 0), heap.u8(0x00652294) != 4)) && ((iVar12 = ((6) >>> 0), heap.u8(0x00652294) != 5 && ((iVar12 = ((0xc) >>> 0), heap.u8(0x00652294) != 6 && (iVar12 = ((0x19) >>> 0), heap.u8(0x00652294) != 7)))))))) && (iVar12 = ((0x1f) >>> 0), heap.u8(0x00652294) != 8)) {
      iVar12 = ((0xd) >>> 0);
    }
    iVar10 = ((0xe) >>> 0);
    if ((((heap.u8(0x00652295) != 8) && (heap.u8(0x00652295) != 10)) && (iVar10 = ((0xf) >>> 0), heap.u8(0x00652295) != 6)) && (((iVar10 = ((0x11) >>> 0), heap.u8(0x00652295) != 2 && (iVar10 = ((0x12) >>> 0), heap.u8(0x00652295) != 4)) && (heap.u8(0x00652295) != 18)))) {
      iVar10 = ((0x10) >>> 0);
    }
    uVar8 = ((uVar8 | 1 << iVar12 | 1 << iVar10) >>> 0);
    if ((heap.u32((0x005f5b78 + uVar20 * 8)) & 0x1000) == 0) {
      if (heap.u8(0x006522a9) == 0) {
        iVar12 = ((0x14) >>> 0);
        if ((heap.u8(0x00652296) != 2) && (iVar12 = ((0x15) >>> 0), heap.u8(0x00652296) != 0)) {
          iVar12 = ((0x16) >>> 0);
        }
        uVar8 = ((uVar8 | 1 << iVar12) >>> 0);
        if ((heap.u8(0x00652297) & 1) != 0) {
          uVar8 = ((uVar8 | 0x80000) >>> 0);
        }
        heap.setU32((unaff_ESI + 0x14), (uVar8) & 0xffffffff);
        (regs.eax = FUN_005e43de(heap));
        return 1;
      }
    } else {
      iVar12 = ((0x14) >>> 0);
      if (heap.u8(0x00652298) != 0) {
        iVar12 = ((0x16) >>> 0);
      }
      LAB_005d1dba: uVar8 = ((uVar8 | 1 << iVar12) >>> 0);
    }
    if ((heap.u8(0x00652297) & 1) != 0) {
      uVar8 = ((uVar8 | 0x80000) >>> 0);
    }
  } else {
    if (heap.u8(0x00652288) == 5) {
      heap.setU32(0x00651f10, (0) >>> 0);
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
      heap.setU32(0x00651f30, (0) >>> 0);
      /* goto LAB_005d1d15 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d13e2/LAB_005d1d15"); return 0;
    }
    if (heap.u8(0x00652288) == 1) {
      heap.setU32(0x00651f00, (2) >>> 0);
      (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_005d13e2"); })();
      /* goto LAB_005d1d15 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d13e2/LAB_005d1d15"); return 0;
    }
    if (heap.u8(0x00652288) == 2) {
      heap.setU32(0x00651f00, (2) >>> 0);
      heap.setU32(0x00651f30, (0) >>> 0);
      /* goto LAB_005d1d15 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d13e2/LAB_005d1d15"); return 0;
    }
  }
  heap.setU32((unaff_ESI + 0x14), (uVar8) & 0xffffffff);
  (regs.eax = FUN_005e43de(heap));
  LAB_005d1dd2: return 1;
} finally {
    heap.freeFrame(4);
  }
}
