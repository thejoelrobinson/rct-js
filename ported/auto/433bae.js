// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/433bae.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
export function FUN_00433bae(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let bVar7 = 0;
  let uVar8 = 0;
  let iVar9 = 0;
  let iVar10 = 0;
  let iVar11 = 0;
  let uVar12 = 0;
  iVar9 = ((heap.u32(0x005f96e8)) >>> 0);
  heap.setU32(0x005f96e8, (heap.u32(0x005f96e8) + 0x30) >>> 0);
  heap.setU32(0x005f96e4, (iVar9) >>> 0);
  heap.setU32((iVar9 + 0x20), (0) & 0xffffffff);
  uVar12 = ((heap.u32(0x006288ec)) >>> 0);
  if (heap.u32(0x006288ec) != 0xffffffff) {
    do {
      iVar10 = ((heap.u32((0x006284ec) + (uVar12) * 4)) >>> 0);
      if (iVar10 != 0) {
        heap.setI32((iVar9 + 0x20), (iVar10) & 0xffffffff);
        do {
          iVar9 = ((iVar10) >>> 0);
          iVar10 = ((heap.i32((iVar9 + 0x20))) >>> 0);
        } while (heap.i32((iVar9 + 0x20)) != 0);
      }
      uVar12 = ((uVar12 + 1) >>> 0);
      iVar10 = ((heap.u32(0x005f96e4)) >>> 0);
    } while (uVar12 <= heap.u32(0x006288f0));
    do {
      iVar9 = ((iVar10) >>> 0);
      iVar10 = ((heap.i32((iVar9 + 0x20))) >>> 0);
      uVar12 = ((heap.u32(0x006288ec)) >>> 0);
      if (iVar10 == 0) {
        /* goto LAB_00433d04 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00433bae/LAB_00433d04"); return 0;
      }
      uVar8 = ((heap.u16(0x006288ec)) & 0xffff);
    } while (heap.u16((iVar10 + 0x14)) < uVar8);
    heap.setU32(0x006288f4, (iVar9) >>> 0);
    while (iVar9 = ((heap.i32((iVar9 + 0x20))) >>> 0), iVar10 = ((heap.u32(0x006288f4)) >>> 0), iVar9 != 0) {
      uVar1 = ((heap.u16((iVar9 + 0x14))) & 0xffff);
      uVar6 = ((0) & 0xff);
      if (((uVar8 + 1) & 0xffff) < uVar1) {
        heap.setU8((iVar9 + 0x17), (0x80) & 0xff);
        iVar10 = ((heap.u32(0x006288f4)) >>> 0);
        break;
      }
      if (uVar1 == ((uVar8 + 1) & 0xffff)) {
        uVar6 = ((3) & 0xff);
      }
      if (uVar1 == uVar8) {
        uVar6 = ((3) & 0xff);
      }
      heap.setU8((iVar9 + 0x17), (uVar6) & 0xff);
    }
    while (iVar9 = ((iVar10) >>> 0), iVar10 = ((heap.i32((iVar9 + 0x20))) >>> 0), uVar12 = ((heap.u32(0x006288ec)) >>> 0), iVar10 != 0 && (bVar7 = ((heap.u8((iVar10 + 0x17)) & 0x81) & 0xff), -1 < (((bVar7) << 24 >> 24) | 0))) {
      if (bVar7 != 0) {
        heap.setU8((iVar10 + 0x17), (heap.u8((iVar10 + 0x17)) & 0xfe) & 0xff);
        uVar8 = ((heap.u16((iVar10 + 4))) & 0xffff);
        uVar1 = ((heap.u16((iVar10 + 6))) & 0xffff);
        uVar4 = ((heap.u32((iVar10 + 8))) >>> 0);
        uVar2 = ((heap.u16((iVar10 + 0xc))) & 0xffff);
        uVar3 = ((heap.u16((iVar10 + 0xe))) & 0xffff);
        heap.setU32(0x006288f8, (iVar9) >>> 0);
        while (iVar11 = ((iVar10) >>> 0), iVar9 = ((heap.i32((iVar11 + 0x20))) >>> 0), iVar10 = ((heap.u32(0x006288f8)) >>> 0), iVar9 != 0 && (bVar7 = ((heap.u8((iVar9 + 0x17)) & 0x82) & 0xff), iVar10 = ((heap.u32(0x006288f8)) >>> 0), -1 < (((bVar7) << 24 >> 24) | 0))) {
          iVar10 = ((iVar9) >>> 0);
          if ((bVar7 != 0) && (heap.u32((0x0062892c) + (CONCAT22((((heap.u32(0x00991f88) >>> 0x10)) << 16 >> 16), (((((heap.i16(0x00991f88) << 1 | ((uVar8 < heap.u16((iVar9 + 0xc))) & 0xffff)) << 1 | ((uVar1 < heap.u16((iVar9 + 0xe))) & 0xffff)) << 1 | ((((uVar4) & 0xffff) < heap.u16((iVar9 + 10))) & 0xffff)) << 1 | ((uVar2 < heap.u16((iVar9 + 4))) & 0xffff)) << 1 | ((uVar3 < heap.u16((iVar9 + 6))) & 0xffff)) << 1 | ((((((uVar4) >>> 0) >>> 0x10) & 0xffff) < heap.u16((iVar9 + 8))) & 0xffff))) * 4) != 0)) {
            heap.setU32((iVar11 + 0x20), (heap.u32((iVar9 + 0x20))) & 0xffffffff);
            LOCK();
            iVar10 = ((heap.i32((heap.u32(0x006288f8) + 0x20))) >>> 0);
            heap.setI32((heap.u32(0x006288f8) + 0x20), (iVar9) & 0xffffffff);
            UNLOCK();
            heap.setI32((iVar9 + 0x20), (iVar10) & 0xffffffff);
            iVar10 = ((iVar11) >>> 0);
          }
        }
      }
    }
    LAB_00433d04: uVar5 = ((uVar12) >>> 0);
    uVar12 = ((uVar5 + 1) >>> 0);
    iVar9 = ((heap.u32(0x005f96e4)) >>> 0);
    if (uVar12 < heap.u32(0x006288f0)) {
      do {
        iVar10 = ((iVar9) >>> 0);
        iVar9 = ((heap.i32((iVar10 + 0x20))) >>> 0);
        if (iVar9 == 0) {
          /* goto LAB_00433d04 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00433bae/LAB_00433d04"); return 0;
        }
      } while (heap.u16((iVar9 + 0x14)) < ((uVar12) & 0xffff));
      uVar8 = ((((uVar5) << 16 >> 16) + 2) & 0xffff);
      heap.setU32(0x006288f4, (iVar10) >>> 0);
      while (iVar10 = ((heap.i32((iVar10 + 0x20))) >>> 0), iVar9 = ((heap.u32(0x006288f4)) >>> 0), iVar10 != 0) {
        uVar1 = ((heap.u16((iVar10 + 0x14))) & 0xffff);
        bVar7 = ((0) & 0xff);
        if (uVar8 < uVar1) {
          heap.setU8((iVar10 + 0x17), (0x80) & 0xff);
          iVar9 = ((heap.u32(0x006288f4)) >>> 0);
          break;
        }
        if (uVar1 == uVar8) {
          bVar7 = ((3) & 0xff);
        }
        if (uVar1 == ((uVar12) & 0xffff)) {
          bVar7 = ((bVar7 | 1) & 0xff);
        }
        heap.setU8((iVar10 + 0x17), (bVar7) & 0xff);
      }
      while (iVar10 = ((iVar9) >>> 0), iVar9 = ((heap.i32((iVar10 + 0x20))) >>> 0), iVar9 != 0 && (bVar7 = ((heap.u8((iVar9 + 0x17)) & 0x81) & 0xff), -1 < (((bVar7) << 24 >> 24) | 0))) {
        if (bVar7 != 0) {
          heap.setU8((iVar9 + 0x17), (heap.u8((iVar9 + 0x17)) & 0xfe) & 0xff);
          uVar8 = ((heap.u16((iVar9 + 4))) & 0xffff);
          uVar1 = ((heap.u16((iVar9 + 6))) & 0xffff);
          uVar4 = ((heap.u32((iVar9 + 8))) >>> 0);
          uVar2 = ((heap.u16((iVar9 + 0xc))) & 0xffff);
          uVar3 = ((heap.u16((iVar9 + 0xe))) & 0xffff);
          heap.setU32(0x006288f8, (iVar10) >>> 0);
          while (iVar11 = ((iVar9) >>> 0), iVar10 = ((heap.i32((iVar11 + 0x20))) >>> 0), iVar9 = ((heap.u32(0x006288f8)) >>> 0), iVar10 != 0 && (bVar7 = ((heap.u8((iVar10 + 0x17)) & 0x82) & 0xff), iVar9 = ((heap.u32(0x006288f8)) >>> 0), -1 < (((bVar7) << 24 >> 24) | 0))) {
            iVar9 = ((iVar10) >>> 0);
            if ((bVar7 != 0) && (heap.u32((0x0062892c) + (CONCAT22((((heap.u32(0x00991f88) >>> 0x10)) << 16 >> 16), (((((heap.i16(0x00991f88) << 1 | ((uVar8 < heap.u16((iVar10 + 0xc))) & 0xffff)) << 1 | ((uVar1 < heap.u16((iVar10 + 0xe))) & 0xffff)) << 1 | ((((uVar4) & 0xffff) < heap.u16((iVar10 + 10))) & 0xffff)) << 1 | ((uVar2 < heap.u16((iVar10 + 4))) & 0xffff)) << 1 | ((uVar3 < heap.u16((iVar10 + 6))) & 0xffff)) << 1 | ((((((uVar4) >>> 0) >>> 0x10) & 0xffff) < heap.u16((iVar10 + 8))) & 0xffff))) * 4) != 0)) {
              heap.setU32((iVar11 + 0x20), (heap.u32((iVar10 + 0x20))) & 0xffffffff);
              LOCK();
              iVar9 = ((heap.i32((heap.u32(0x006288f8) + 0x20))) >>> 0);
              heap.setI32((heap.u32(0x006288f8) + 0x20), (iVar10) & 0xffffffff);
              UNLOCK();
              heap.setI32((iVar10 + 0x20), (iVar9) & 0xffffffff);
              iVar9 = ((iVar11) >>> 0);
            }
          }
        }
      }
      /* goto LAB_00433d04 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00433bae/LAB_00433d04"); return 0;
    }
  }
  return;
}
