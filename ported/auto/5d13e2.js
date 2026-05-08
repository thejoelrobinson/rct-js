// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d13e2.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT44, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { FUN_0043642b } from "./43642b.js";
import { FUN_005cfe66 } from "./5cfe66.js";
import { FUN_005d298a } from "./5d298a.js";
import { FUN_005e3b2b } from "./5e3b2b.js";
import { FUN_005e43de } from "./5e43de.js";
export function FUN_005d13e2(heap) {
  const __sp = heap.allocFrame(52);
  const __addr_PTR_DAT_00652498 = __sp + 0;
  const __addr_DAT_0099a02c = __sp + 4;
  const __addr_stack0xffffffe0 = __sp + 8;
  const __addr_DAT_00887420 = __sp + 12;
  const __addr_DAT_0065226c = __sp + 16;
  const __addr_DAT_006545af = __sp + 20;
  const __addr_DAT_0087c41c = __sp + 24;
  const __addr_DAT_006545b3 = __sp + 28;
  const __addr_DAT_006545b5 = __sp + 32;
  const __addr_DAT_006545b2 = __sp + 36;
  const __addr_DAT_006545b4 = __sp + 40;
  const __addr_DAT_00652284 = __sp + 44;
  const __addr_DAT_005f5b78 = __sp + 48;
  try {
  let bVar1 = 0;
  let sVar2 = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  let sVar6 = 0;
  let sVar7 = 0;
  let in_EAX = 0;
  let uVar8 = 0;
  let extraout_CX = 0;
  let sVar9 = 0;
  let extraout_ECX = 0;
  let iVar10 = 0;
  let cVar11 = 0;
  let cVar14 = 0;
  let in_EDX = 0;
  let extraout_EDX = 0;
  let iVar12 = 0;
  let uVar13 = 0;
  let unaff_EBX = 0;
  let unaff_BP = 0;
  let sVar16 = 0;
  let sVar17 = 0;
  let unaff_ESI = 0;
  let uVar18 = 0;
  let uVar20 = 0;
  let bVar21 = 0;
  let in_ZF = 0;
  let uVar22 = 0;
  FUN_005e3b2b(heap);
  if (in_ZF) {
    /* goto LAB_005d1dd2 */ throw new Error("goto LAB_005d1dd2 not supported");
  }
  FUN_0043642b(heap);
  heap.setU32(0x0099a020, (heap.u32(0x0099a020) | 10) >>> 0);
  if (heap.u32(0x00652288) == 0) {
    LAB_005d1435: uVar8 = heap.u32(0x00652290);
    uVar18 = 0;
    sVar7 = heap.u32(0x0065228a);
    sVar9 = heap.u32(0x0065228c);
  } else {
    bVar21 = heap.u32(0x00652288) < 3;
    if (heap.u32(0x00652288) == 3) {
      uVar8 = heap.u32(0x00652290);
      uVar18 = heap.u32(0x00652291);
      sVar7 = heap.u32(0x0065228a);
      sVar9 = heap.u32(0x0065228c);
    } else {
      sVar7 = FUN_005d298a(heap);
      if (bVar21) {
        /* goto LAB_005d1435 */ throw new Error("goto LAB_005d1435 not supported");
      }
      uVar8 = unaff_EBX >>> 8 & 0xff;
      uVar18 = extraout_EDX >>> 8 & 0xff;
      sVar9 = extraout_CX;
    }
  }
  iVar12 = 0;
  for (pcVar19 = heap.u32((__addr_PTR_DAT_00652498) + (uVar18) * 4); heap.u32(pcVar19) != -1; pcVar19 = pcVar19 + 10) {
    if ((heap.u32(pcVar19 + (9) * 4) & 1U) == 0) {
      sVar16 = heap.u32((pcVar19 + 1));
      sVar2 = heap.u32((pcVar19 + 3));
      sVar17 = sVar2;
      switch (uVar8 & 3) {
        case 1:
          sVar17 = -sVar16;
          sVar16 = sVar2;
          break;
        case 2:
          sVar17 = -sVar2;
          sVar16 = -sVar16;
          break;
        case 3:
          sVar17 = sVar16;
          sVar16 = -sVar2;
      }
      unaff_BP = sVar16 + sVar7;
      heap.u32((__addr_DAT_0099a02c + iVar12)) = unaff_BP;
      heap.u32((__addr_DAT_0099a02c + iVar12 * 4 + 2)) = sVar17 + sVar9;
      iVar12 = iVar12 + 1;
    }
  }
  heap.u32((__addr_DAT_0099a02c + iVar12)) = 0xffff;
  uVar22 = FUN_0043642b(heap);
  heap.u32((unaff_ESI + 0x18)) = 0;
  heap.setU32(0x006522a6, (-1) >>> 0);
  if (heap.u32(0x00652288) == 3) {
    bVar21 = false;
    FUN_005cfe66(heap, CONCAT11(heap.u32(0x00652290), heap.u32(0x00652291)), pcVar19, unaff_ESI, unaff_BP, __addr_stack0xffffffe0, uVar8 & 3, (uVar22 >>> 0x20), extraout_ECX, uVar22);
    if (!bVar21) {
      heap.setU32(0x006522a6, (heap.u32(pcVar19 + (4) * 4)) >>> 0);
      if (heap.u32(0x006522a6) == 'c') {
        heap.setU32(0x006522a4, ((heap.u32(pcVar19 + (5) * 4) >>> 4) << 1) >>> 0);
      }
      if (heap.u32(0x006522a6) == 'd') {
        heap.setU32(0x006522a5, ((heap.u32(pcVar19 + (5) * 4) >>> 4) << 1) >>> 0);
      }
    }
  }
  heap.setU32(0x006522a9, ('\0') >>> 0);
  uVar20 = heap.u32((byte)(__addr_DAT_00887420) + (heap.u32(0x00652289) * 0x260) * 4);
  puVar15 = __addr_DAT_0065226c;
  uVar8 = 0;
  heap.setU32(0x0065226a, (0) >>> 0);
  uVar18 = 0;
  do {
    bVar1 = heap.u32((__addr_DAT_006545af) + (uVar18 * 8) * 4);
    uVar13 = bVar1;
    if (bVar1 != 0) {
      if (bVar1 < '\0') {
        if ((uVar13 & 0x7f) == uVar20) {
          /* goto LAB_005d1588 */ throw new Error("goto LAB_005d1588 not supported");
        }
      } else {
        if ((heap.u32((__addr_DAT_0087c41c + (uVar13 >>> 3) + uVar20 * 4)) >>> (uVar13 & 7) & 1) != 0) {
        LAB_005d1588: if ((heap.u32(0x00652288) == 1) || (heap.u32(0x00652288) == 4)) {
          cVar11 = heap.u32((__addr_DAT_006545b3) + (uVar18 * 8) * 4);
          cVar14 = heap.u32((__addr_DAT_006545b5) + (uVar18 * 8) * 4);
        } else {
          if (heap.u32(0x00652288) != 2) {
            /* goto LAB_005d1637 */ throw new Error("goto LAB_005d1637 not supported");
          }
          cVar11 = heap.u32((__addr_DAT_006545b2) + (uVar18 * 8) * 4);
          cVar14 = heap.u32((__addr_DAT_006545b4) + (uVar18 * 8) * 4);
        }
        if (((((heap.u32((__addr_DAT_006545af) + (uVar18 * 8) * 4) != '\x15') && (heap.u32((__addr_DAT_006545af) + (uVar18 * 8) * 4) != '\x16')) || (cVar14 == heap.u32(0x00652299))) || ((heap.u32(0x00652299) == '\0' && (cVar14 == '\x02')))) && ((cVar14 != '\x0f' || (heap.u32(0x00652299) == '\x0f')))) {
          heap.u32(puVar15) = uVar18;
          puVar15 = puVar15 + 1;
          pbVar3 = (__addr_DAT_00652284 + (uVar8 >>> 3));
          heap.u32(pbVar3) = heap.u32(pbVar3) | '\x01' << (uVar8 & 7);
          if (((heap.u32(0x00652290) < 4) && (cVar11 == heap.u32(0x0065229a))) && (cVar14 == heap.u32(0x00652299))) {
            pbVar3 = (__addr_DAT_00652284 + (uVar8 >>> 3));
            heap.u32(pbVar3) = heap.u32(pbVar3) & ~('\x01' << (uVar8 & 7));
            heap.setU32(0x0065226a, (heap.u32(0x0065226a) + 1) >>> 0);
          }
          uVar8 = uVar8 + 1;
        }
      }
      }
    }
    LAB_005d1637: uVar18 = uVar18 + 1;
  } while (uVar18 < 0xac);
  heap.setU32(0x00652268, (uVar8) >>> 0);
  heap.setU32(0x00651f50, (0xe) >>> 0);
  heap.setU32(0x00651f60, (7) >>> 0);
  (heap.u32(0x00651f70) & 0xff) = 7;
  if ((heap.u32((__addr_DAT_005f5b78 + uVar20 * 8)) & 0x20000) != 0) {
    heap.setU32(0x00651f50, (0) >>> 0);
    heap.setU32(0x00651f60, (0) >>> 0);
    (heap.u32(0x00651f70) & 0xff) = 0;
  }
  heap.setU32(0x00651e60, (0) >>> 0);
  if (heap.u32(0x0065226a) != 0) {
    heap.setU32(0x00651e60, (7) >>> 0);
  }
  (heap.u32(0x00651e20) & 0xff) = 0;
  if ((heap.u32((__addr_DAT_0087c41c) + (uVar20) * 4) >>> 1 & 1) != 0) {
    (heap.u32(0x00651e20) & 0xff) = 2;
  }
  heap.setU32(0x00651f20, (0) >>> 0);
  heap.setU32(0x00651f80, (0) >>> 0);
  if ((heap.u32((__addr_DAT_005f5b78 + uVar20 * 8)) & 0x40000000) != 0) {
    heap.setU32(0x00651f20, (2) >>> 0);
    heap.setU32(0x00651f80, (2) >>> 0);
  }
  heap.setU32(0x00651e10, (0) >>> 0);
  (heap.u32(0x00651e30) & 0xff) = 0;
  heap.setU32(0x00651e00, (0) >>> 0);
  heap.setU32(0x00651e40, (0) >>> 0);
  heap.setU32(0x00651df0, (0) >>> 0);
  (heap.u32(0x00651e50) & 0xff) = 0;
  heap.setU32(0x00651e02, (0x1c) >>> 0);
  heap.setU32(0x00651e04, (0x31) >>> 0);
  heap.setU32(0x00651e42, (0x74) >>> 0);
  heap.setU32(0x00651e44, (0x89) >>> 0);
  heap.setU32(0x00651e0a, (0x5e95) >>> 0);
  heap.setU32(0x00651e4a, (0x5e96) >>> 0);
  if ((heap.u32((__addr_DAT_0087c41c) + (uVar20) * 4) >>> 0x10 & 1) != 0) {
    heap.setU32(0x00651e10, (2) >>> 0);
    (heap.u32(0x00651e30) & 0xff) = 2;
    heap.setU32(0x00651e02, (6) >>> 0);
    heap.setU32(0x00651e04, (0x1b) >>> 0);
    heap.setU32(0x00651e42, (0x8a) >>> 0);
    heap.setU32(0x00651e44, (0x9f) >>> 0);
    heap.setU32(0x00651e0a, (0x5e97) >>> 0);
    heap.setU32(0x00651e4a, (0x5e98) >>> 0);
  }
  if ((heap.u32((__addr_DAT_0087c41c) + (uVar20) * 4) >>> 0xf & 1) != 0) {
    heap.setU32(0x00651e00, (2) >>> 0);
    heap.setU32(0x00651e40, (2) >>> 0);
  }
  if ((heap.u32((__addr_DAT_0087c41c) + (uVar20) * 4) >>> 0xe & 1) != 0) {
    heap.setU32(0x00651df0, (2) >>> 0);
    (heap.u32(0x00651e50) & 0xff) = 2;
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
  if ((heap.u32((__addr_DAT_0087c41c) + (uVar20) * 4) & 0x300) != 0) {
    heap.setU32(0x00651e90, (2) >>> 0);
  }
  if ((heap.u32((__addr_DAT_0087c41c) + (uVar20) * 4) & 0x100) != 0) {
    heap.setU32(0x00651e80, (2) >>> 0);
    heap.setU32(0x00651ea0, (2) >>> 0);
  }
  if ((heap.u32((__addr_DAT_0087c41c) + (uVar20) * 4) & 0x200) != 0) {
    heap.setU32(0x00651e70, (2) >>> 0);
    heap.setU32(0x00651eb0, (2) >>> 0);
  }
  (heap.u32(0x00651ec0) & 0xff) = 0;
  heap.setU32(0x00651e72, (0x17) >>> 0);
  if (((heap.u32((__addr_DAT_0087c41c) + (uVar20) * 4) >>> 3 & 1) != 0) && (heap.u32(0x00652294) < 0x10)) {
    (heap.u32(0x00651ec0) & 0xff) = 2;
    heap.setU32(0x00651e72, (9) >>> 0);
  }
  (heap.u32(0x00651e74) & 0xffff) = heap.u32(0x00651e72) + 0x17;
  heap.setU32(0x00651e82, (heap.u32(0x00651e72) + 0x18) >>> 0);
  (heap.u32(0x00651e84) & 0xffff) = heap.u32(0x00651e72) + 0x2f;
  heap.setU32(0x00651e92, (heap.u32(0x00651e72) + 0x30) >>> 0);
  (heap.u32(0x00651e94) & 0xffff) = heap.u32(0x00651e72) + 0x47;
  heap.setU32(0x00651ea2, (heap.u32(0x00651e72) + 0x48) >>> 0);
  (heap.u32(0x00651ea4) & 0xffff) = heap.u32(0x00651e72) + 0x5f;
  heap.setU32(0x00651eb2, (heap.u32(0x00651e72) + 0x60) >>> 0);
  (heap.u32(0x00651eb4) & 0xffff) = heap.u32(0x00651e72) + 0x77;
  heap.setU32(0x00651eba, (0x5e9f) >>> 0);
  heap.setU32(0x00651ebe, (0x3ae) >>> 0);
  heap.setU32(0x00651e7a, (0x5e9b) >>> 0);
  heap.setU32(0x00651e7e, (0x3aa) >>> 0);
  if ((heap.u32((__addr_DAT_0087c41c) + (uVar20) * 4) >>> 0x1c & 1) != 0) {
    if ((heap.u32(0x0065229a) == '\x04') || (sVar7 = heap.u32(0x00651e72), sVar9 = heap.u32(0x00651e74), sVar16 = heap.u32(0x00651e82), sVar2 = heap.u32(0x00651e84), sVar17 = heap.u32(0x00651e92), sVar4 = heap.u32(0x00651e94), sVar5 = heap.u32(0x00651ea2), sVar6 = heap.u32(0x00651ea4), heap.u32(0x0065229a) == '\n')) {
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
      sVar7 = heap.u32(0x00651eb2);
      sVar9 = heap.u32(0x00651eb4);
      sVar16 = heap.u32(0x00651e72);
      sVar2 = heap.u32(0x00651e74);
      sVar17 = heap.u32(0x00651e82);
      sVar4 = heap.u32(0x00651e84);
      sVar5 = heap.u32(0x00651e92);
      sVar6 = heap.u32(0x00651e94);
      heap.setU32(0x00651eb2, (heap.u32(0x00651ea2)) >>> 0);
      (heap.u32(0x00651eb4) & 0xffff) = heap.u32(0x00651ea4);
    }
    (heap.u32(0x00651ea4) & 0xffff) = sVar6;
    heap.setU32(0x00651ea2, (sVar5) >>> 0);
    (heap.u32(0x00651e94) & 0xffff) = sVar4;
    heap.setU32(0x00651e92, (sVar17) >>> 0);
    (heap.u32(0x00651e84) & 0xffff) = sVar2;
    heap.setU32(0x00651e82, (sVar16) >>> 0);
    (heap.u32(0x00651e74) & 0xffff) = sVar9;
    heap.setU32(0x00651e72, (sVar7) >>> 0);
    sVar6 = heap.u32(0x00651ea4);
    sVar5 = heap.u32(0x00651ea2);
    sVar4 = heap.u32(0x00651e94);
    sVar17 = heap.u32(0x00651e92);
    sVar2 = heap.u32(0x00651e84);
    sVar16 = heap.u32(0x00651e82);
    sVar9 = heap.u32(0x00651e74);
    sVar7 = heap.u32(0x00651e72);
    if ((heap.u32(0x0065229a) == '\b') || (heap.u32(0x0065229a) == '\x12')) {
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
      (heap.u32(0x00651ea4) & 0xffff) = heap.u32(0x00651eb4);
      UNLOCK();
      LOCK();
      (heap.u32(0x00651e94) & 0xffff) = sVar6;
      UNLOCK();
      LOCK();
      (heap.u32(0x00651e84) & 0xffff) = sVar4;
      UNLOCK();
      LOCK();
      (heap.u32(0x00651e74) & 0xffff) = sVar2;
      UNLOCK();
      (heap.u32(0x00651eb4) & 0xffff) = sVar9;
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
  if ((heap.u32((__addr_DAT_005f5b78 + uVar20 * 8)) & 0x1000) == 0) {
    if (heap.u32(0x006522a6) == 'c') {
      LAB_005d1b40: heap.setU32(0x00651dea, (0x653) >>> 0);
      heap.setU32(0x006522a9, ('\x01') >>> 0);
      heap.setU32(0x00651eda, (0x655) >>> 0);
      heap.setU32(0x00651ede, (0x657) >>> 0);
      heap.setU32(0x00651eee, (0x657) >>> 0);
      heap.setU32(0x00651efe, (0x657) >>> 0);
    } else {
      if (heap.u32(0x006522a6) != 'd') {
        if (heap.u32(0x00652294) == 0x73) {
          /* goto LAB_005d1b40 */ throw new Error("goto LAB_005d1b40 not supported");
        }
        if (heap.u32(0x00652294) != 0x74) {
          if ((heap.u32((__addr_DAT_0087c41c) + (uVar20) * 4) >>> 6 & 1) != 0) {
            heap.setU32(0x00651ed0, (2) >>> 0);
            heap.setU32(0x00651ef0, (2) >>> 0);
            heap.setU32(0x00651ee0, (2) >>> 0);
          }
          /* goto LAB_005d1c4c */ throw new Error("goto LAB_005d1c4c not supported");
        }
      }
      heap.setU32(0x00651dea, (0x654) >>> 0);
      heap.setU32(0x006522a9, ('\x02') >>> 0);
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
    heap.u32((unaff_ESI + 0x18)) = heap.u32((unaff_ESI + 0x18)) | 0x600000;
  } else {
    heap.setU32(0x00651dea, (0x5d2) >>> 0);
    heap.setU32(0x00651eda, (0x5ea5) >>> 0);
    heap.setU32(0x00651efa, (0x5ea6) >>> 0);
    heap.setU32(0x00651ede, (0x5d3) >>> 0);
    heap.setU32(0x00651efe, (0x5d4) >>> 0);
    heap.setU32(0x00651ed0, (2) >>> 0);
    heap.setU32(0x00651ef0, (2) >>> 0);
  }
  LAB_005d1c4c: uVar8 = heap.u32((unaff_ESI + 0x14)) & 0x7d80003f;
  heap.setU32(0x00651f00, (0) >>> 0);
  heap.setU32(0x00651f10, (2) >>> 0);
  (heap.u32(0x00651f90) & 0xff) = 0;
  heap.setU32(0x00651f30, (2) >>> 0);
  (heap.u32(0x00651f40) & 0xff) = 2;
  if ((heap.u32((__addr_DAT_005f5b78 + uVar20 * 8)) & 0x100) != 0) {
    (heap.u32(0x00651f40) & 0xff) = 0;
    heap.setU32(0x00651f30, (0) >>> 0);
  }
  if (heap.u32(0x00652288) == 4) {
    heap.setU32(0x00651f00, (2) >>> 0);
    heap.setU32(0x00651f10, (0) >>> 0);
    (heap.u32(0x00651f40) & 0xff) = 0;
    heap.setU32(0x00651f30, (0) >>> 0);
    (heap.u32(0x00651f90) & 0xff) = 2;
    LAB_005d1d15: iVar12 = 9;
    if (((((heap.u32(0x00652294) != 0) && (iVar12 = 8, heap.u32(0x00652294) != 1)) && (iVar12 = 10, heap.u32(0x00652294) != 2)) && (((iVar12 = 7, heap.u32(0x00652294) != 3 && (iVar12 = 0xb, heap.u32(0x00652294) != 4)) && ((iVar12 = 6, heap.u32(0x00652294) != 5 && ((iVar12 = 0xc, heap.u32(0x00652294) != 6 && (iVar12 = 0x19, heap.u32(0x00652294) != 7)))))))) && (iVar12 = 0x1f, heap.u32(0x00652294) != 8)) {
      iVar12 = 0xd;
    }
    iVar10 = 0xe;
    if ((((heap.u32(0x00652295) != '\b') && (heap.u32(0x00652295) != '\n')) && (iVar10 = 0xf, heap.u32(0x00652295) != '\x06')) && (((iVar10 = 0x11, heap.u32(0x00652295) != '\x02' && (iVar10 = 0x12, heap.u32(0x00652295) != '\x04')) && (heap.u32(0x00652295) != '\x12')))) {
      iVar10 = 0x10;
    }
    uVar8 = uVar8 | 1 << iVar12 | 1 << iVar10;
    if ((heap.u32((__addr_DAT_005f5b78 + uVar20 * 8)) & 0x1000) == 0) {
      if (heap.u32(0x006522a9) == '\0') {
        iVar12 = 0x14;
        if ((heap.u32(0x00652296) != '\x02') && (iVar12 = 0x15, heap.u32(0x00652296) != '\0')) {
          iVar12 = 0x16;
        }
        /* goto LAB_005d1dba */ throw new Error("goto LAB_005d1dba not supported");
      }
    } else {
      iVar12 = 0x14;
      if (heap.u32(0x00652298) != '\0') {
        iVar12 = 0x16;
      }
      LAB_005d1dba: uVar8 = uVar8 | 1 << iVar12;
    }
    if ((heap.u32(0x00652297) & 1) != 0) {
      uVar8 = uVar8 | 0x80000;
    }
  } else {
    if (heap.u32(0x00652288) == 5) {
      heap.setU32(0x00651f10, (0) >>> 0);
      (heap.u32(0x00651f40) & 0xff) = 0;
      heap.setU32(0x00651f30, (0) >>> 0);
      /* goto LAB_005d1d15 */ throw new Error("goto LAB_005d1d15 not supported");
    }
    if (heap.u32(0x00652288) == 1) {
      heap.setU32(0x00651f00, (2) >>> 0);
      (heap.u32(0x00651f40) & 0xff) = 0;
      /* goto LAB_005d1d15 */ throw new Error("goto LAB_005d1d15 not supported");
    }
    if (heap.u32(0x00652288) == 2) {
      heap.setU32(0x00651f00, (2) >>> 0);
      heap.setU32(0x00651f30, (0) >>> 0);
      /* goto LAB_005d1d15 */ throw new Error("goto LAB_005d1d15 not supported");
    }
  }
  heap.u32((unaff_ESI + 0x14)) = uVar8;
  FUN_005e43de(heap);
  LAB_005d1dd2: return CONCAT44(in_EDX, in_EAX);
} finally {
    heap.freeFrame(52);
  }
}
