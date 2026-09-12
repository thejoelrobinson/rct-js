// @manual — do not regenerate.
// Source: decompiled/c/5d8c79.c
// Fix: byte-pointer RMW (`*pbVar = *pbVar <op> N`) was emitted as setU32;
// replaced with setU8 to avoid trailing-byte corruption.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005d9220 } from "./5d9220.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_005d8c79(heap) {
  let puVar1 = 0;
  let bVar2 = 0;
  let sVar3 = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let uVar6 = 0;
  let extraout_DX = 0;
  let sVar7 = 0;
  let pbVar8 = 0;
  let bVar9 = 0;
  let cVar10 = 0;
  let uVar11 = 0;
  let puVar12 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let unaff_EDI = regs.edi >>> 0;
  LAB_005d90f1: {
  if (heap.i8((unaff_ESI + 0x50)) == 7) {
    heap.setU16((((0x00887422) | 0) + unaff_EDI), (heap.u16((((0x00887422) | 0) + unaff_EDI)) | 2) & 0xffff);
    heap.setU16((((0x00887422) | 0) + unaff_EDI), (heap.u16((((0x00887422) | 0) + unaff_EDI)) | 8) & 0xffff);
    heap.setU16((((0x00887422) | 0) + unaff_EDI), (heap.u16((((0x00887422) | 0) + unaff_EDI)) & 0xfffb) & 0xffff);
    heap.setU16((unaff_ESI + 0x48), (heap.u16((unaff_ESI + 0x48)) & 0xffdf) & 0xffff);
    return (regs.eax = FUN_005e5301(heap));
  }
  bVar9 = ((heap.u32((0x008874b1) + (unaff_EDI) * 4) + 1) & 0xff);
  if (0x1f < bVar9) {
    bVar9 = ((0) & 0xff);
  }
  heap.setU32(((0x008874b1) + (unaff_EDI) * 4), (bVar9) & 0xffffffff);
  uVar4 = ((heap.u32((unaff_ESI + 0x28))) >>> 0);
  if (((uVar4) | 0) < 0) {
    uVar4 = ((-uVar4) >>> 0);
  }
  if (heap.u32((0x008874a8 + unaff_EDI)) < uVar4) {
    heap.setU32((0x008874a8 + unaff_EDI), (uVar4) & 0xffffffff);
  }
  bVar2 = ((heap.u32((0x008874b0) + (unaff_EDI) * 4)) & 0xff);
  if ((bVar9 == 0) && (0x8000 < uVar4)) {
    heap.setU32((0x008874ac + unaff_EDI), (heap.i32((0x008874ac + unaff_EDI)) + uVar4) & 0xffffffff);
    heap.setI16((0x008874c4 + ((bVar2) >>> 0) * 2 + unaff_EDI), (heap.i16((0x008874c4 + ((bVar2) >>> 0) * 2 + unaff_EDI)) + 1) & 0xffff);
  }
  iVar5 = (((heap.i32((unaff_ESI + 0x2c)) + heap.i32((unaff_ESI + 0x28)) >>> 10) * 0x2a) >>> 0);
  if ((-1 < (iVar5 | 0)) && (heap.i8((unaff_ESI + 0xce)) == 0)) {
    heap.setI32((0x008874b4 + ((bVar2) >>> 0) * 4 + unaff_EDI), (heap.i32((0x008874b4 + ((bVar2) >>> 0) * 4 + unaff_EDI)) + iVar5) & 0xffffffff);
  }
  if ((heap.u32((0x005f5b78 + heap.u32(((0x00887420) >>> 0) + (heap.u32((unaff_ESI + 0x30)) * 0x260) * 4) * 8)) & 0x80) != 0) {
    sVar3 = (((regs.eax = FUN_005d9220(heap))) & 0xffff);
    sVar3 = (((((sVar3 + heap.i16((0x008874d2 + unaff_EDI)))) << 16 >> 16) >>> 1) & 0xffff);
    sVar7 = (((((extraout_DX + heap.i16((0x008874d4 + unaff_EDI)))) << 16 >> 16) >>> 1) & 0xffff);
    heap.setI16((0x008874d2 + unaff_EDI), (sVar3) & 0xffff);
    heap.setI16((0x008874d4 + unaff_EDI), (sVar7) & 0xffff);
    if (heap.i16((0x008874cc + unaff_EDI)) < sVar3) {
      heap.setI16((0x008874cc + unaff_EDI), (sVar3) & 0xffff);
    }
    if (sVar3 < heap.i16((0x008874ce + unaff_EDI))) {
      heap.setI16((0x008874ce + unaff_EDI), (sVar3) & 0xffff);
    }
    if (sVar7 < 0) {
      sVar7 = ((-sVar7) & 0xffff);
    }
    if (heap.i16((0x008874d0 + unaff_EDI)) < sVar7) {
      heap.setI16((0x008874d0 + unaff_EDI), (sVar7) & 0xffff);
    }
  }
  sVar3 = ((CONCAT11((((heap.u16((unaff_ESI + 0x3a)) >>> 5)) << 24 >> 24), (((heap.u16((unaff_ESI + 0x38)) >>> 5)) << 24 >> 24))) & 0xffff);
  uVar6 = ((heap.u16((unaff_ESI + 0x3c)) >>> 2) & 0xffff);
  uVar4 = ((((uVar6) >>> 0)) >>> 0);
  cVar10 = ((((uVar6) << 24 >> 24)) & 0xff);
  if ((cVar10 == heap.u32((0x008874ef) + (unaff_EDI) * 4)) && (sVar3 == heap.i16((0x008874dc + unaff_EDI)))) {
    break LAB_005d90f1;
  }
  heap.setI16((0x008874dc + unaff_EDI), (sVar3) & 0xffff);
  heap.setU32(((0x008874ef) + (unaff_EDI) * 4), (cVar10) & 0xffffffff);
  uVar6 = ((heap.u16((unaff_ESI + 0x36)) >>> 2) & 0xffff);
  if ((heap.u16((unaff_ESI + 0x48)) & 1) == 0) {
    heap.setU32((0x008874d8 + unaff_EDI), (heap.u32((0x008874d8 + unaff_EDI)) & 0xffffffbf) & 0xffffffff);
  } else {
    puVar1 = (((0x008874d8 + unaff_EDI)) >>> 0);
    uVar4 = ((heap.u32(puVar1)) >>> 0);
    heap.setU32(puVar1, (heap.u32(puVar1) | 0x40) & 0xffffffff);
    if ((uVar4 >>> 6 & 1) == 0) {
      pbVar8 = ((0x008874e5 + unaff_EDI) >>> 0);
      bVar9 = ((heap.u8(pbVar8)) & 0xff);
      heap.setU8(pbVar8, (heap.u8(pbVar8) + 0x40) & 0xff);
      if (0xbf < bVar9) {
        heap.setU32(((0x008874e5) + (unaff_EDI) * 4), (heap.u32((0x008874e5) + (unaff_EDI) * 4) + -0x40) & 0xffffffff);
      }
    }
  }
  if (uVar6 == 0x71) {
    heap.setU32(((0x008874a5) + (unaff_EDI) * 4), (heap.u32((0x008874a5) + (unaff_EDI) * 4) | 0x20) & 0xffffffff);
  }
  if (uVar6 == 0x70) {
    heap.setU32(((0x008874a5) + (unaff_EDI) * 4), (heap.u32((0x008874a5) + (unaff_EDI) * 4) | 0x40) & 0xffffffff);
  }
  if (uVar6 == 0x78) {
    heap.setU32(((0x008874a5) + (unaff_EDI) * 4), (heap.u32((0x008874a5) + (unaff_EDI) * 4) | 0x80) & 0xffffffff);
  }
  if ((uVar6 == 0x75) && (0xaffff < heap.i32((unaff_ESI + 0x28)))) {
    heap.setU32(((0x008874a5) + (unaff_EDI) * 4), (heap.u32((0x008874a5) + (unaff_EDI) * 4) | 0x20) & 0xffffffff);
  }
  uVar6 = ((heap.u16((0x00652309 + ((uVar6) >>> 0) * 2))) & 0xffff);
  uVar4 = ((heap.u32((0x008874d8 + unaff_EDI))) >>> 0);
  if ((uVar4 & 2) == 0) {
    if ((uVar4 & 4) == 0) {
      if ((uVar6 & 2) != 0) {
        heap.setU32((0x008874d8 + unaff_EDI), (heap.u32((0x008874d8 + unaff_EDI)) | 2) & 0xffffffff);
        heap.setU16((0x008874de + unaff_EDI), (heap.u16((0x008874de + unaff_EDI)) & 0x7ff) & 0xffff);
        if ((uVar6 & 8) != 0) {
          heap.setU32((0x008874d8 + unaff_EDI), (heap.u32((0x008874d8 + unaff_EDI)) | 8) & 0xffffffff);
        }
        if ((uVar6 & 0x10) != 0) {
          heap.setU32((0x008874d8 + unaff_EDI), (heap.u32((0x008874d8 + unaff_EDI)) | 0x10) & 0xffffffff);
        }
      }
      if ((uVar6 & 4) != 0) {
        heap.setU32((0x008874d8 + unaff_EDI), (heap.u32((0x008874d8 + unaff_EDI)) | 4) & 0xffffffff);
        heap.setU16((0x008874de + unaff_EDI), (heap.u16((0x008874de + unaff_EDI)) & 0x7ff) & 0xffff);
        if ((uVar6 & 8) != 0) {
          heap.setU32((0x008874d8 + unaff_EDI), (heap.u32((0x008874d8 + unaff_EDI)) | 8) & 0xffffffff);
        }
        if ((uVar6 & 0x10) != 0) {
          heap.setU32((0x008874d8 + unaff_EDI), (heap.u32((0x008874d8 + unaff_EDI)) | 0x10) & 0xffffffff);
        }
      }
    } else {
      if ((uVar6 & 4) == 0) {
        /* goto LAB_005d8e62 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d8c79/LAB_005d8e62"); return 0;
      }
      heap.setI16((0x008874de + unaff_EDI), (heap.i16((0x008874de + unaff_EDI)) + 0x800) & 0xffff);
    }
  } else {
    if ((uVar6 & 2) == 0) {
    LAB_005d8e62: heap.setU32((0x008874d8 + unaff_EDI), (heap.u32((0x008874d8 + unaff_EDI)) & 0xfffffff9) & 0xffffffff);
    heap.setU32((0x008874d8 + unaff_EDI), (heap.u32((0x008874d8 + unaff_EDI)) & 0xffffffe7) & 0xffffffff);
    puVar12 = (((0x008874e0 + unaff_EDI)) >>> 0);
    if (((uVar4 & 8) == 0) && (puVar12 = (((0x008874e2 + unaff_EDI)) >>> 0), (uVar4 & 0x10) == 0)) {
      puVar12 = (((0x008874de + unaff_EDI)) >>> 0);
    }
    uVar11 = ((heap.u16((0x008874de + unaff_EDI)) >>> 0xb) & 0xffff);
    if (uVar11 == 0) {
      uVar11 = ((heap.u16(puVar12) & 0x1f) & 0xffff);
      if (uVar11 != 0x1f) {
        uVar11 = ((uVar11 + 1) & 0xffff);
      }
      heap.setU32(puVar12, (heap.u16(puVar12) & 0xffe0) & 0xffffffff);
      heap.setU32(puVar12, (heap.u16(puVar12) | uVar11) & 0xffffffff);
    } else {
      if (uVar11 == 1) {
      uVar11 = ((heap.u16(puVar12) & 0xe0) & 0xffff);
      if (uVar11 != 0xe0) {
        uVar11 = ((uVar11 + 0x20) & 0xffff);
      }
      heap.setU32(puVar12, (heap.u16(puVar12) & 0xff1f) & 0xffffffff);
      heap.setU32(puVar12, (heap.u16(puVar12) | uVar11) & 0xffffffff);
    } else {
      if ((uVar11 == 2) || ((uVar4 & 0x10) == 0)) {
      uVar11 = ((heap.u16(puVar12) & 0x700) & 0xffff);
      if (uVar11 != 0x700) {
        uVar11 = ((uVar11 + 0x100) & 0xffff);
      }
      heap.setU32(puVar12, (heap.u16(puVar12) & 0xf8ff) & 0xffffffff);
      heap.setU32(puVar12, (heap.u16(puVar12) | uVar11) & 0xffffffff);
    } else {
      uVar11 = ((heap.u16(puVar12) & 0xf800) & 0xffff);
      if (uVar11 != 0xf800) {
        uVar11 = ((uVar11 + 0x800) & 0xffff);
      }
      heap.setU32(puVar12, (heap.u16(puVar12) & 0x7ff) & 0xffffffff);
      heap.setU32(puVar12, (heap.u16(puVar12) | uVar11) & 0xffffffff);
    }
    }
    }
  } else {
    heap.setI16((0x008874de + unaff_EDI), (heap.i16((0x008874de + unaff_EDI)) + 0x800) & 0xffff);
  }
  }
  if ((uVar4 & 0x20) == 0) {
    if (((uVar6 & 0x20) != 0) && (-1 < (heap.i32((unaff_ESI + 0x28)) | 0))) {
      heap.setU32((0x008874d8 + unaff_EDI), (heap.u32((0x008874d8 + unaff_EDI)) & 0xffffff7f) & 0xffffffff);
      heap.setU32((0x008874d8 + unaff_EDI), (heap.u32((0x008874d8 + unaff_EDI)) | 0x20) & 0xffffffff);
      bVar9 = ((heap.u32((0x008874e5) + (unaff_EDI) * 4) & 0x3f) & 0xff);
      if (bVar9 != 0x3f) {
        bVar9 = ((bVar9 + 1) & 0xff);
      }
      heap.setU32(((0x008874e5) + (unaff_EDI) * 4), (heap.u32((0x008874e5) + (unaff_EDI) * 4) & 0xc0) & 0xffffffff);
      heap.setU32(((0x008874e5) + (unaff_EDI) * 4), (heap.u32((0x008874e5) + (unaff_EDI) * 4) | bVar9) & 0xffffffff);
      heap.setU32(((0x008874e6) + (unaff_EDI) * 4), ((((heap.u16((unaff_ESI + 0x12)) >>> 2)) << 24 >> 24)) & 0xffffffff);
      uVar4 = ((uVar4 & 0xffffff7f) >>> 0);
    }
  } else {
    if ((heap.i32((unaff_ESI + 0x28)) < 0) || ((uVar6 & 0x20) == 0)) {
    heap.setU32((0x008874d8 + unaff_EDI), (heap.u32((0x008874d8 + unaff_EDI)) & 0xffffffdf) & 0xffffffff);
    bVar9 = ((((heap.u16((unaff_ESI + 0x12)) >>> 2) & 0xff)) & 0xff);
    cVar10 = ((bVar9 - heap.u32((0x008874e6) + (unaff_EDI) * 4)) & 0xff);
    if ((bVar9 < heap.u32(((0x008874e6) & 0xff) + (unaff_EDI) * 4) || cVar10 == 0) && (bVar9 = ((-cVar10) & 0xff), heap.u32(((0x008874e7) & 0xff) + (unaff_EDI) * 4) < bVar9)) {
      heap.setU32(((0x008874e7) + (unaff_EDI) * 4), (bVar9) & 0xffffffff);
    }
  }
  }
  if ((uVar4 & 0x80) == 0) {
    if (((uVar6 & 0x40) != 0) && (heap.i32((unaff_ESI + 0x28)) < 1)) {
      heap.setU32((0x008874d8 + unaff_EDI), (heap.u32((0x008874d8 + unaff_EDI)) & 0xffffffdf) & 0xffffffff);
      heap.setU32((0x008874d8 + unaff_EDI), (heap.u32((0x008874d8 + unaff_EDI)) | 0x80) & 0xffffffff);
      bVar9 = ((heap.u32((0x008874e5) + (unaff_EDI) * 4) & 0x3f) & 0xff);
      if (bVar9 != 0x3f) {
        bVar9 = ((bVar9 + 1) & 0xff);
      }
      heap.setU32(((0x008874e5) + (unaff_EDI) * 4), (heap.u32((0x008874e5) + (unaff_EDI) * 4) & 0xc0) & 0xffffffff);
      heap.setU32(((0x008874e5) + (unaff_EDI) * 4), (heap.u32((0x008874e5) + (unaff_EDI) * 4) | bVar9) & 0xffffffff);
      heap.setU32(((0x008874e6) + (unaff_EDI) * 4), ((((heap.u16((unaff_ESI + 0x12)) >>> 2)) << 24 >> 24)) & 0xffffffff);
    }
  } else {
    if ((0 < heap.i32((unaff_ESI + 0x28))) || ((uVar6 & 0x40) == 0)) {
    heap.setU32((0x008874d8 + unaff_EDI), (heap.u32((0x008874d8 + unaff_EDI)) & 0xffffff7f) & 0xffffffff);
    bVar9 = ((((heap.u16((unaff_ESI + 0x12)) >>> 2) & 0xff)) & 0xff);
    cVar10 = ((bVar9 - heap.u32((0x008874e6) + (unaff_EDI) * 4)) & 0xff);
    if ((bVar9 < heap.u32(((0x008874e6) & 0xff) + (unaff_EDI) * 4) || cVar10 == 0) && (bVar9 = ((-cVar10) & 0xff), heap.u32(((0x008874e7) & 0xff) + (unaff_EDI) * 4) < bVar9)) {
      heap.setU32(((0x008874e7) + (unaff_EDI) * 4), (bVar9) & 0xffffffff);
    }
  }
  }
  if ((uVar6 & 0x80) != 0) {
    bVar9 = ((heap.u32((0x008874e4) + (unaff_EDI) * 4) & 0x1f) & 0xff);
    if (bVar9 != 0x1f) {
      bVar9 = ((bVar9 + 1) & 0xff);
    }
    heap.setU32(((0x008874e4) + (unaff_EDI) * 4), (heap.u32((0x008874e4) + (unaff_EDI) * 4) & 0xe0) & 0xffffffff);
    heap.setU32(((0x008874e4) + (unaff_EDI) * 4), (heap.u32((0x008874e4) + (unaff_EDI) * 4) | bVar9) & 0xffffffff);
  }
  if ((uVar6 & 0x800) != 0) {
    bVar9 = ((heap.u32((0x008874a5) + (unaff_EDI) * 4) & 0x1f) & 0xff);
    if (bVar9 != 0x1f) {
      bVar9 = ((bVar9 + 1) & 0xff);
    }
    heap.setU32(((0x008874a5) + (unaff_EDI) * 4), (heap.u32((0x008874a5) + (unaff_EDI) * 4) & 0xe0) & 0xffffffff);
    heap.setU32(((0x008874a5) + (unaff_EDI) * 4), (heap.u32((0x008874a5) + (unaff_EDI) * 4) | bVar9) & 0xffffffff);
  }
  }
  if (heap.u16((unaff_ESI + 0xe)) != 0x8000) {
    uVar6 = ((heap.u16((unaff_ESI + 0x10)) >>> 9) & 0xffff);
    pbVar8 = ((heap.u32((0x00971ef4) + ((((((heap.u16((unaff_ESI + 0x10)) & 0xffe0) << 7 | uVar6 | heap.u16((unaff_ESI + 0xe)) & 0xffe0) & 0xffff) >>> 5 | uVar6 << 0xb) & 0xffff)) * 4)) >>> 0);
    bVar9 = ((heap.u8(pbVar8)) & 0xff);
    while ((bVar9 & 0x3c) != 0) {
      pbVar8 = ((pbVar8 + 8) >>> 0);
      bVar9 = ((heap.u8(pbVar8)) & 0xff);
    }
    if (heap.u16((unaff_ESI + 0x12)) < ((((heap.u8(pbVar8 + (2))) & 0xffff) * 4) & 0xffff)) {
      if ((uVar4 & 1) == 0) {
        heap.setU32((0x008874d8 + unaff_EDI), (heap.u32((0x008874d8 + unaff_EDI)) | 1) & 0xffffffff);
        bVar9 = ((heap.u32((0x008874ee) + (unaff_EDI) * 4) & 0x1f) & 0xff);
        if (bVar9 != 0x1f) {
          bVar9 = ((bVar9 + 1) & 0xff);
        }
        heap.setU32(((0x008874ee) + (unaff_EDI) * 4), (heap.u32((0x008874ee) + (unaff_EDI) * 4) & 0xe0) & 0xffffffff);
        heap.setU32(((0x008874ee) + (unaff_EDI) * 4), (heap.u32((0x008874ee) + (unaff_EDI) * 4) | bVar9) & 0xffffffff);
        if (heap.i8((unaff_ESI + 0x1f)) != 0) {
          heap.setU32(((0x008874ee) + (unaff_EDI) * 4), (heap.u32((0x008874ee) + (unaff_EDI) * 4) | 0x20) & 0xffffffff);
        }
        if (heap.i8((unaff_ESI + 0x20)) != 0) {
          heap.setU32(((0x008874ee) + (unaff_EDI) * 4), (heap.u32((0x008874ee) + (unaff_EDI) * 4) | 0x40) & 0xffffffff);
        }
      }
      iVar5 = (((heap.i32((unaff_ESI + 0x2c)) + heap.i32((unaff_ESI + 0x28)) >>> 10) * 0x2a) >>> 0);
      if (iVar5 < 0) {
        return;
      }
      heap.setI32((0x008874e8 + unaff_EDI), (heap.i32((0x008874e8 + unaff_EDI)) + iVar5) & 0xffffffff);
      return;
    }
  }
  heap.setU32((0x008874d8 + unaff_EDI), (heap.u32((0x008874d8 + unaff_EDI)) & 0xfffffffe) & 0xffffffff);
  return;
}
