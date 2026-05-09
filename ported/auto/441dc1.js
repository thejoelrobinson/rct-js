// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/441dc1.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { ram0x00971e88 } from "../../runtime/win32.js";
import { CONCAT22, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0043fdfb } from "./43fdfb.js";
import { FUN_00441ffd } from "./441ffd.js";
export function FUN_00441dc1(heap) {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let cVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let uVar9 = 0;
  let uVar10 = 0;
  let uVar11 = 0;
  let iVar12 = 0;
  let puVar13 = 0;
  let iVar14 = 0;
  let uVar15 = 0;
  code_r0x00441fbb: {
  uVar9 = ((((heap.u8(0x0062d2ff)) >>> 0)) >>> 0);
  if ((uVar9 != heap.u32(0x0062d2f6)) || ((heap.u32(0x00629408) == 0 && ((heap.u32(0x006e3b84) & 0xffffff00) != heap.u32(0x00629404))))) {
    heap.setU32(0x00629408, (0x140) >>> 0);
    heap.setU32(0x0062940a, (0) >>> 0);
    heap.setU32(0x00629404, (heap.u32(0x006e3b84) & 0xffffff00) >>> 0);
    heap.setU32(0x0062d2f6, (uVar9) >>> 0);
    for (uVar10 = ((heap.u32(0x0087c398)) & 0xffff); uVar11 = ((heap.u32(0x0087c398)) & 0xffff), uVar10 != 0xffff; uVar10 = (((heap.u32((0x00743b98) + (((uVar10) >>> 0) * 0x80) * 4)) & 0xffff)) >>> 0) {
      iVar12 = ((((uVar10) >>> 0) * 0x100) >>> 0);
      if ((heap.u32((0x00743bc2) + (iVar12) * 4) == 0) && (heap.u32((0x00743bbe) + (iVar12) * 4) == 0)) {
        heap.setU16((0x00743ba0 + iVar12), (heap.u16((0x00743ba0 + iVar12)) | 0x100) & 0xffff);
      }
    }
    for (; uVar5 = ((heap.u32(0x0062940a)) >>> 0), uVar11 != 0xffff; uVar11 = (((heap.u32((0x00743b98) + (((uVar11) >>> 0) * 0x80) * 4)) & 0xffff)) >>> 0) {
      iVar12 = ((((uVar11) >>> 0) * 0x100) >>> 0);
      puVar13 = ((0x00743b94 + iVar12) >>> 0);
      if (((heap.u32((0x00743bc2) + (iVar12) * 4) == 0) && (heap.u32((0x00743bbe) + (iVar12) * 4) == 0)) && ((heap.u16((0x00743ba0 + iVar12)) & 0x100) != 0)) {
        if (0xef < heap.u32(0x0062940a)) {
          return;
        }
        heap.setU32(0x0062940a, (heap.u32(0x0062940a) + 1) >>> 0);
        heap.setU32(((0x00629c7e) + (uVar5) * 4), (1) & 0xffffffff);
        heap.setU16((0x00743ba0 + iVar12), (heap.u16((0x00743ba0 + iVar12)) & 0xfeff) & 0xffff);
        (regs.eax = FUN_00441ffd(heap));
        heap.setU32(0x0062d2de, (CONCAT22(heap.i16(0x00971e86), ((uVar9) << 16 >> 16))) >>> 0);
        heap.setU32((0x006294fe + uVar5 * 8), (heap.u32(0x0062d2de)) & 0xffffffff);
        heap.setU32(0x0062d2e2, (ram0x00971e88) >>> 0);
        heap.setI32((0x00629502 + uVar5 * 8), (ram0x00971e88) & 0xffffffff);
        cVar6 = ((((uVar5) << 24 >> 24)) & 0xff);
        heap.setU32(((0x0062940e) + (uVar5) * 4), (cVar6) & 0xffffffff);
        (regs.eax = FUN_0043fdfb(heap));
        heap.setU32(((0x00629e5e) + (uVar5 * 0x38) * 4), (cVar6 + 93) & 0xffffffff);
        iVar12 = ((uVar5 * 0x38 + 1) >>> 0);
        while (heap.u16((puVar13 + 4)) != 0xffff) {
          iVar14 = ((heap.u32((puVar13 + 4)) * 0x100) >>> 0);
          puVar13 = ((0x00743b94 + iVar14) >>> 0);
          if (((heap.u32((0x00743bc2) + (iVar14) * 4) == 0) && (heap.u32((0x00743bbe) + (iVar14) * 4) == 0)) && ((heap.u16((0x00743ba0 + iVar14)) & 0x100) != 0)) {
            (regs.eax = FUN_00441ffd(heap));
            if (((((uVar9) << 16 >> 16) == heap.i16(0x0062d2de)) && (heap.i16(0x00971e86) == heap.u16(0x62d2e0))) && (ram0x00971e88 == heap.u32(0x0062d2e2))) {
              heap.setU32(((0x00629c7e) + (uVar5) * 4), (heap.u32((0x00629c7e) + (uVar5) * 4) + 1) & 0xffffffff);
              heap.setU16((0x00743ba0 + iVar14), (heap.u16((0x00743ba0 + iVar14)) & 0xfeff) & 0xffff);
              if (heap.u32(((0x00629c7e) & 0xffff) + (uVar5) * 4) < 0x38) {
                (regs.eax = FUN_0043fdfb(heap));
                heap.setU32(((0x00629e5e) + (iVar12) * 4), (cVar6 + 93) & 0xffffffff);
                iVar12 = ((iVar12 + 1) >>> 0);
              }
            }
          }
        }
        if (heap.i16(0x0062d2de) != 0) {
          uVar15 = ((0) >>> 0);
          LAB_00441fad: if (uVar15 < uVar5) {
            if (heap.u32(((0x00629c7e) & 0xffff) + (uVar5) * 4) <= heap.u32(((0x00629c7e) & 0xffff) + (uVar15) * 4)) {
              break code_r0x00441fbb;
            }
            uVar9 = ((heap.u32(((0x0062940e) >>> 0) + (uVar5) * 4)) >>> 0);
            uVar7 = ((heap.u32((0x006294fe + uVar5 * 8))) >>> 0);
            uVar8 = ((heap.u32((0x00629502 + uVar5 * 8))) >>> 0);
            uVar10 = ((heap.u32((0x00629c7e) + (uVar5) * 4)) & 0xffff);
            do {
              LOCK();
              uVar2 = ((heap.u32((0x00629c7e) + (uVar15) * 4)) & 0xffff);
              heap.setU32(((0x00629c7e) + (uVar15) * 4), (uVar10) & 0xffffffff);
              UNLOCK();
              LOCK();
              uVar3 = ((heap.u32((0x006294fe + uVar15 * 8))) >>> 0);
              heap.setU32((0x006294fe + uVar15 * 8), (uVar7) & 0xffffffff);
              UNLOCK();
              LOCK();
              uVar4 = ((heap.u32((0x00629502 + uVar15 * 8))) >>> 0);
              heap.setU32((0x00629502 + uVar15 * 8), (uVar8) & 0xffffffff);
              UNLOCK();
              LOCK();
              bVar1 = ((heap.u32((0x0062940e) + (uVar15) * 4)) & 0xff);
              heap.setU32(((0x0062940e) + (uVar15) * 4), (((uVar9) & 0xff)) & 0xffffffff);
              uVar9 = ((((bVar1) >>> 0)) >>> 0);
              UNLOCK();
              uVar15 = ((uVar15 + 1) >>> 0);
              uVar7 = ((uVar3) >>> 0);
              uVar8 = ((uVar4) >>> 0);
              uVar10 = ((uVar2) & 0xffff);
            } while (uVar15 <= uVar5);
          }
          /* goto LAB_00441ff3 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00441dc1/LAB_00441ff3"); return 0;
        }
        heap.setU32(0x0062940a, (heap.u32(0x0062940a) - 1) >>> 0);
      }
      LAB_00441ff3: ;
    }
  }
  return;
  }
  uVar15 = ((uVar15 + 1) >>> 0);
  /* goto LAB_00441fad — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00441dc1/LAB_00441fad"); return 0;
}
