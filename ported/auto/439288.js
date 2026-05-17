// @manual — do not regenerate.
// Source: decompiled/c/439288.c
// Fix: byte-pointer RMW (`*pbVar = *pbVar <op> N`) was emitted as setU32;
// replaced with setU8 to avoid trailing-byte corruption.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0043c60b } from "./43c60b.js";
import { FUN_0043de68 } from "./43de68.js";
import { FUN_0043e0dd } from "./43e0dd.js";
import { FUN_00440fe3 } from "./440fe3.js";
import { FUN_004420e0 } from "./4420e0.js";
import { FUN_00442290 } from "./442290.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e5301 } from "./5e5301.js";
import { FUN_005e53ca } from "./5e53ca.js";
export function FUN_00439288(heap) {
  let pbVar1 = 0;
  let pcVar2 = 0;
  let bVar3 = 0;
  let in_AL = regs.eax & 0xff;
  let bVar4 = 0;
  let bVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let in_EDX = regs.edx >>> 0;
  let extraout_EDX = 0;
  let extraout_EDX_00 = 0;
  let uVar8 = 0;
  let cVar9 = 0;
  let uVar10 = 0;
  let iVar11 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let puVar12 = 0;
  let bVar13 = 0;
  let in_stack_00000020 = 0;
  LAB_004396f1: {
  if (heap.i8((unaff_ESI + 0x2e)) == 1) {
    if (heap.i8((unaff_ESI + 0x2f)) == 2) {
      in_AL = ((0x14) & 0xff);
      if (heap.i8((unaff_ESI + 0x2b)) != 10) {
        in_AL = ((3) & 0xff);
      }
      if (in_AL != heap.u8((unaff_ESI + 0x2d))) {
        heap.setU8((unaff_ESI + 0x2d), (in_AL) & 0xff);
        heap.setU8((unaff_ESI + 0x70), (0) & 0xff);
        heap.setU8((unaff_ESI + 0xe0), (0) & 0xff);
        if (heap.u8((unaff_ESI + 0x71)) < 0xfe) {
          heap.setU8((unaff_ESI + 0x71), (0xff) & 0xff);
        }
        heap.setU16((unaff_ESI + 200), (heap.u16((unaff_ESI + 200)) & 0xfffd) & 0xffff);
        if ((heap.u32((0x0062d564) + (in_AL) * 4) & 1) != 0) {
          heap.setU16((unaff_ESI + 200), (heap.u16((unaff_ESI + 200)) | 2) & 0xffff);
        }
        heap.setU8((unaff_ESI + 0x6e), (0xff) & 0xff);
        in_AL = (((regs.eax = FUN_0043c60b(heap))) & 0xff);
      }
    }
    return in_AL;
  }
  if ((in_EDX & 0x1ff) != (heap.u32(0x0088741c) & 0x1ff)) {
    break LAB_004396f1;
  }
  if (heap.u8(0x006e2b76) != -0x75416211) {
    return in_stack_00000020;
  }
  if (heap.i8((unaff_ESI + 0xf3)) != 0) {
    heap.setI8((unaff_ESI + 0xf3), (heap.i8((unaff_ESI + 0xf3)) + -1) & 0xff);
  }
  if ((((heap.i8((unaff_ESI + 0x2b)) == 8) || (heap.i8((unaff_ESI + 0x2b)) == 5)) && (heap.setI8((unaff_ESI + 0xf2), (heap.i8((unaff_ESI + 0xf2)) + 1) & 0xff), 0x11 < heap.u8((unaff_ESI + 0xf2)))) && (heap.setU8((unaff_ESI + 0xf2), (0) & 0xff), heap.i16((unaff_ESI + 0xe)) != -0x8000)) {
    (regs.eax = FUN_00442290(heap));
  }
  uVar10 = ((0) >>> 0);
  (regs.eax = FUN_004420e0(heap));
  if ((heap.i8((unaff_ESI + 0x2b)) == 3) || (heap.i8((unaff_ESI + 0x2b)) == 7)) {
    pcVar2 = (((unaff_ESI + 0xe2)) >>> 0);
    heap.setU32(pcVar2, (heap.i8(pcVar2) + 1) & 0xffffffff);
    if (heap.i8(pcVar2) == 0) {
      heap.setI8((unaff_ESI + 0xe2), (heap.i8((unaff_ESI + 0xe2)) + -1) & 0xff);
    }
    if ((heap.u16((unaff_ESI + 200)) & 0x100) != 0) {
      (regs.eax = FUN_00440fe3(heap));
    }
    if (0xe < heap.u8((unaff_ESI + 0xe2))) {
      pbVar1 = (((unaff_ESI + 0x3b)) >>> 0);
      bVar4 = ((heap.u8(pbVar1)) & 0xff);
      heap.setU8(pbVar1, (heap.u8(pbVar1) - 5) & 0xff);
      if (bVar4 < 5) {
        heap.setU8((unaff_ESI + 0x3b), (0) & 0xff);
      }
      if (0x15 < heap.u8((unaff_ESI + 0xe2))) {
        uVar10 = ((heap.u32(((0x00887420) >>> 0) + (heap.u32((unaff_ESI + 0x68)) * 0x260) * 4)) >>> 0);
        (regs.eax = FUN_00440fe3(heap));
      }
    }
  }
  if ((((heap.i8((unaff_ESI + 0x2a)) == 0) && (heap.i8((unaff_ESI + 0x2b)) == 5)) && ((heap.i8((unaff_ESI + 0x2f)) == 0 && ((((heap.u16((unaff_ESI + 200)) & 1) == 0 && ((heap.i8((unaff_ESI + 0xc5)) | 0) == -1)) && (4 < ((heap.u32(0x006e3b84) - heap.i32((unaff_ESI + 0xa8))) >>> 0) >>> 0xb)))))) && ((regs.eax = FUN_0043e0dd(heap)), (heap.i8((unaff_ESI + 0xc5)) | 0) == -1)) {
    pbVar1 = (((unaff_ESI + 0x3b)) >>> 0);
    bVar4 = ((heap.u8(pbVar1)) & 0xff);
    heap.setU8(pbVar1, (heap.u8(pbVar1) + 0x80) & 0xff);
    if (bVar4 < 0x80) {
      heap.setU8((unaff_ESI + 0x3b), (0) & 0xff);
    }
    LAB_004395c4: heap.setU8((unaff_ESI + 0xc5), (0xff) & 0xff);
    if ((heap.u16((unaff_ESI + 200)) & 1) == 0) {
      heap.setU8((unaff_ESI + 0xc6), (0xfe) & 0xff);
      heap.setU16((unaff_ESI + 200), (heap.u16((unaff_ESI + 200)) | 1) & 0xffff);
      LAB_004395f0: uVar7 = (((regs.eax = FUN_00440fe3(heap))) >>> 0);
      (regs.eax = FUN_005e5301(heap, uVar10, uVar7));
      heap.setU8((unaff_ESI + 0xf4), (0) & 0xff);
    } else {
      if (0x3b < heap.u8((unaff_ESI + 0xc6))) {
      /* goto LAB_004395f0 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00439288/LAB_004395f0"); return 0;
    }
    }
    LAB_00439611: if (2 < heap.u8((unaff_ESI + 0x3e))) {
      heap.setI8((unaff_ESI + 0x3e), (heap.i8((unaff_ESI + 0x3e)) + -2) & 0xff);
      pbVar1 = (((unaff_ESI + 0x39)) >>> 0);
      bVar4 = ((heap.u8(pbVar1)) & 0xff);
      heap.setU8(pbVar1, (heap.u8(pbVar1) + 2) & 0xff);
      if (0xfd < bVar4) {
        heap.setU8((unaff_ESI + 0x39), (0xff) & 0xff);
      }
      pcVar2 = (((unaff_ESI + 0x40)) >>> 0);
      cVar9 = ((heap.i8(pcVar2)) & 0xff);
      heap.setU32(pcVar2, (heap.i8(pcVar2) + 1) & 0xffffffff);
      if ((cVar9 | 0) == -1) {
        heap.setU8((unaff_ESI + 0x40), (0xff) & 0xff);
      }
    }
    LAB_0043965b: bVar4 = ((heap.u8((unaff_ESI + 0x3b))) & 0xff);
    uVar10 = ((((bVar4) >>> 0)) >>> 0);
    if (0x7f < bVar4) {
      uVar10 = ((((bVar4 - 2) >>> 0)) >>> 0);
    }
  } else {
    uVar6 = (((regs.eax = FUN_005df40c(heap))) & 0xffff);
    uVar8 = ((extraout_EDX) >>> 0);
    if (uVar6 < 0x3f1) {
      (regs.eax = FUN_0043e0dd(heap));
      uVar8 = ((extraout_EDX_00) >>> 0);
    }
    uVar10 = ((heap.u32(0x0088741c) & 0x3ff) >>> 0);
    if ((uVar8 & 0x3ff) == uVar10) {
      if (heap.i8((unaff_ESI + 0x2a)) == 0) {
        if ((heap.i8((unaff_ESI + 0x2b)) == 5) || (heap.i8((unaff_ESI + 0x2b)) == 8)) {
          puVar12 = ((0x0062927c) >>> 0);
          if ((heap.u16((unaff_ESI + 200)) & 1) == 0) {
            if ((heap.u8((unaff_ESI + 0x38)) < 0x47) && (heap.u8((unaff_ESI + 0x3a)) < 0x80)) {
              heap.setU32(0x0062927c, (0x13) >>> 0);
              puVar12 = ((0x0062927d) >>> 0);
            }
            if ((heap.u8((unaff_ESI + 0x3e)) < 0xb) && ((heap.u16((unaff_ESI + 0xca)) & 0xa3e0) == 0)) {
              heap.setU32(puVar12, (0x14) & 0xffffffff);
              puVar12 = ((puVar12 + 1) >>> 0);
            }
            if ((heap.u8((unaff_ESI + 0x3f)) < 0x1a) && ((heap.u16((unaff_ESI + 0xca)) & 0xa3e0) == 0)) {
              heap.setU32(puVar12, (0x15) & 0xffffffff);
              puVar12 = ((puVar12 + 1) >>> 0);
            }
            if (0x9f < heap.u8((unaff_ESI + 0x40))) {
              heap.setU32(puVar12, (0x16) & 0xffffffff);
              puVar12 = ((puVar12 + 1) >>> 0);
            }
          } else {
            heap.setU32(0x0062927c, (9) >>> 0);
            puVar12 = ((0x0062927d) >>> 0);
          }
          if (puVar12 + -0x62927c != 0x0) {
            bVar4 = (((regs.eax = FUN_005df40c(heap))) & 0xff);
            uVar10 = ((((CONCAT11(0xff, heap.u32((0x0062927c) + (((((bVar4) & 0xffff) * ((puVar12 + -0x62927c) & 0xffff)) & 0xffff) >>> 8) * 4))) >>> 0)) >>> 0);
            (regs.eax = FUN_00440fe3(heap));
            cVar9 = ((((uVar10) << 24 >> 24)) & 0xff);
            if (((cVar9 == 20) || (cVar9 == 21)) || (cVar9 == 22)) {
              (regs.eax = FUN_0043de68(heap));
            }
          }
        }
      }
    } else {
      if (0x8b < heap.u8((unaff_ESI + 0x3c))) {
      (regs.eax = FUN_00440fe3(heap));
    }
    }
    cVar9 = ((heap.i8((unaff_ESI + 0x2b))) & 0xff);
    if (((cVar9 == 5) || (cVar9 == 13)) || (cVar9 == 14)) {
      LAB_00439576: if (0x20 < heap.u8((unaff_ESI + 0x39))) {
        heap.setI8((unaff_ESI + 0x39), (heap.i8((unaff_ESI + 0x39)) + -2) & 0xff);
      }
      if ((20 < heap.u8(0x008d7eb0)) && (4 < heap.u8((unaff_ESI + 0x3f)))) {
        heap.setI8((unaff_ESI + 0x3f), (heap.i8((unaff_ESI + 0x3f)) + -1) & 0xff);
      }
      if ((heap.i8((unaff_ESI + 0x2a)) != 0) || (((heap.u16((unaff_ESI + 200)) & 1) == 0 && ((((0x36 < heap.u8((unaff_ESI + 0x38)) && (0x2c < heap.u8((unaff_ESI + 0x3a)))) && (0x31 < heap.u32((unaff_ESI + 0xa0)))) || (uVar6 = (((regs.eax = FUN_005df40c(heap))) & 0xffff), 0xccc < uVar6)))))) {
        /* goto LAB_00439611 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00439288/LAB_00439611"); return 0;
      }
      /* goto LAB_004395c4 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00439288/LAB_004395c4"); return 0;
    }
    if (cVar9 != 8) {
      if (cVar9 == 6) {
        if (1999 < heap.u16((unaff_ESI + 0x7a))) {
          pbVar1 = (((unaff_ESI + 0x3b)) >>> 0);
          bVar4 = ((heap.u8(pbVar1)) & 0xff);
          heap.setU8(pbVar1, (heap.u8(pbVar1) - 4) & 0xff);
          if (bVar4 < 4) {
            heap.setU8((unaff_ESI + 0x3b), (0) & 0xff);
          }
        }
        /* goto LAB_00439611 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00439288/LAB_00439611"); return 0;
      }
      if (cVar9 == 7) {
        if ((heap.i8((unaff_ESI + 0x2c)) == 17) || (heap.i8((unaff_ESI + 0x2c)) == 15)) {
          /* goto LAB_00439576 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00439288/LAB_00439576"); return 0;
        }
      }
      /* goto LAB_0043965b — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00439288/LAB_0043965b"); return 0;
    }
    if (heap.u8((unaff_ESI + 0x39)) < 0x88) {
      heap.setI8((unaff_ESI + 0x39), (heap.i8((unaff_ESI + 0x39)) + 5) & 0xff);
    }
    if (4 < heap.u8((unaff_ESI + 0x3f))) {
      heap.setI8((unaff_ESI + 0x3f), (heap.i8((unaff_ESI + 0x3f)) + -4) & 0xff);
      pbVar1 = (((unaff_ESI + 0x40)) >>> 0);
      bVar4 = ((heap.u8(pbVar1)) & 0xff);
      heap.setU8(pbVar1, (heap.u8(pbVar1) + 3) & 0xff);
      if (0xfc < bVar4) {
        heap.setU8((unaff_ESI + 0x40), (0xff) & 0xff);
      }
    }
    if (0x31 < heap.u8((unaff_ESI + 0x3d))) {
      heap.setI8((unaff_ESI + 0x3d), (heap.i8((unaff_ESI + 0x3d)) + -6) & 0xff);
      /* goto LAB_00439611 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00439288/LAB_00439611"); return 0;
    }
  }
  heap.setI8((unaff_ESI + 0x3b), (((uVar10) << 24 >> 24) + 1) & 0xff);
  cVar9 = ((heap.u8((unaff_ESI + 0x3d)) - 2) & 0xff);
  if (heap.u8((unaff_ESI + 0x3d)) < 2) {
    cVar9 = ((0) & 0xff);
  }
  heap.setI8((unaff_ESI + 0x3d), (cVar9) & 0xff);
  if (heap.u8((unaff_ESI + 0x38)) < 0x33) {
    pbVar1 = (((unaff_ESI + 0x3b)) >>> 0);
    bVar4 = ((heap.u8(pbVar1)) & 0xff);
    heap.setU8(pbVar1, (heap.u8(pbVar1) - 2) & 0xff);
    if (bVar4 < 2) {
      heap.setU8((unaff_ESI + 0x3b), (0) & 0xff);
    }
  }
  if (heap.u8((unaff_ESI + 0x3e)) < 0xb) {
    pcVar2 = (((unaff_ESI + 0x3b)) >>> 0);
    cVar9 = ((heap.i8(pcVar2)) & 0xff);
    heap.setU32(pcVar2, (heap.i8(pcVar2) + -1) & 0xffffffff);
    if (cVar9 == 0) {
      heap.setU8((unaff_ESI + 0x3b), (0) & 0xff);
    }
  }
  if (heap.u8((unaff_ESI + 0x3f)) < 0xb) {
    pcVar2 = (((unaff_ESI + 0x3b)) >>> 0);
    cVar9 = ((heap.i8(pcVar2)) & 0xff);
    heap.setU32(pcVar2, (heap.i8(pcVar2) + -1) & 0xffffffff);
    if (cVar9 == 0) {
      heap.setU8((unaff_ESI + 0x3b), (0) & 0xff);
    }
  }
  if (0xc2 < heap.u8((unaff_ESI + 0x40))) {
    pcVar2 = (((unaff_ESI + 0x3b)) >>> 0);
    cVar9 = ((heap.i8(pcVar2)) & 0xff);
    heap.setU32(pcVar2, (heap.i8(pcVar2) + -1) & 0xffffffff);
    if (cVar9 == 0) {
      heap.setU8((unaff_ESI + 0x3b), (0) & 0xff);
    }
  }
  if (((heap.i8((unaff_ESI + 0x2b)) == 5) && (0x7f < heap.u8((unaff_ESI + 0x3d)))) && ((bVar4 = (((regs.eax = FUN_005df40c(heap))) & 0xff), bVar4 <= ((heap.i8((unaff_ESI + 0x3c)) + 0x80) & 0xff) >>> 1 && (0xfd < heap.u8((unaff_ESI + 0x71)))))) {
    heap.setU8((unaff_ESI + 0x71), (8) & 0xff);
    heap.setU8((unaff_ESI + 0x72), (0) & 0xff);
    heap.setU8((unaff_ESI + 0x70), (0) & 0xff);
    (regs.eax = FUN_0043c60b(heap));
    (regs.eax = FUN_005e53ca(heap));
  }
  }
  if ((heap.i8((unaff_ESI + 0x42)) != 0) && (heap.i8((unaff_ESI + 0x2b)) != 3)) {
    pbVar1 = (((unaff_ESI + 0x42)) >>> 0);
    bVar4 = ((heap.u8(pbVar1)) & 0xff);
    heap.setU8(pbVar1, (heap.u8(pbVar1) - 3) & 0xff);
    if (bVar4 < 3) {
      heap.setU8((unaff_ESI + 0x42), (0) & 0xff);
    }
    iVar11 = ((0x3e) >>> 0);
    if ((heap.u16((unaff_ESI + 0xca)) & 0xa3c0) == 0) {
      iVar11 = ((0x3f) >>> 0);
    }
    pbVar1 = (((iVar11 + unaff_ESI)) >>> 0);
    bVar4 = ((heap.u8(pbVar1)) & 0xff);
    heap.setU8(pbVar1, (heap.u8(pbVar1) + 7) & 0xff);
    if (0xf8 < bVar4) {
      heap.setU8((iVar11 + unaff_ESI), (0xff) & 0xff);
    }
    if (iVar11 == 0x3e) {
      pbVar1 = (((unaff_ESI + 0x3f)) >>> 0);
      bVar4 = ((heap.u8(pbVar1)) & 0xff);
      heap.setU8(pbVar1, (heap.u8(pbVar1) - 3) & 0xff);
      if (bVar4 < 3) {
        heap.setU8((unaff_ESI + 0x3f), (0) & 0xff);
      }
      pbVar1 = (((unaff_ESI + 0x40)) >>> 0);
      bVar4 = ((heap.u8(pbVar1)) & 0xff);
      heap.setU8(pbVar1, (heap.u8(pbVar1) + 2) & 0xff);
      if (0xfd < bVar4) {
        heap.setU8((unaff_ESI + 0x40), (0xff) & 0xff);
      }
    }
    if (heap.i8((unaff_ESI + 0x42)) == 0) {
      iVar11 = ((0) >>> 0);
      bVar13 = (((heap.u16((unaff_ESI + 0xca)) & 0xa3e0) != 0) & 0xff);
      if (bVar13) {
        for (; ((heap.u16((unaff_ESI + 0xca)) & 0xa3e0) >>> iVar11 & 1) == 0; iVar11 = (((iVar11 + 1) >>> 0)) >>> 0) {
        
        }
      }
      if (bVar13) {
        pbVar1 = (((unaff_ESI + 0xca + (((((((iVar11) & 0xffff)) << 16 >> 16)) | 0) >>> 3))) >>> 0);
        heap.setU8(pbVar1, (heap.u8(pbVar1) & ~(1 << (((iVar11) & 0xffff) & 7))) & 0xff);
        bVar4 = ((heap.u32((0x0062d610) + (iVar11) * 4)) & 0xff);
        if (bVar4 != 0xff) {
          pbVar1 = (((unaff_ESI + 0xca + (((((((bVar4) & 0xffff)) << 16 >> 16)) | 0) >>> 3))) >>> 0);
          heap.setU8(pbVar1, (heap.u8(pbVar1) | 1 << (bVar4 & 7)) & 0xff);
        }
        heap.setU8((unaff_ESI + 0x45), (heap.u8((unaff_ESI + 0x45)) | 8) & 0xff);
        (regs.eax = FUN_004420e0(heap));
      }
    }
  }
  bVar4 = ((heap.u8((unaff_ESI + 0x38))) & 0xff);
  bVar3 = ((heap.u8((unaff_ESI + 0x39))) & 0xff);
  if (bVar4 < bVar3) {
    bVar5 = ((bVar4 + 4) & 0xff);
    if (0xfb < bVar4) {
      bVar5 = ((0xff) & 0xff);
    }
    if (bVar3 < bVar5) {
      bVar5 = ((bVar3) & 0xff);
    }
  } else {
    bVar5 = ((bVar4 - 2) & 0xff);
    if (((bVar4 - 2) & 0xff) < bVar3) {
      bVar5 = ((bVar3) & 0xff);
    }
  }
  if (bVar5 < 0x20) {
    bVar5 = ((0x20) & 0xff);
  }
  if (0x80 < bVar5) {
    bVar5 = ((0x80) & 0xff);
  }
  if (bVar5 != bVar4) {
    heap.setU8((unaff_ESI + 0x38), (bVar5) & 0xff);
    heap.setU8((unaff_ESI + 0x45), (heap.u8((unaff_ESI + 0x45)) | 4) & 0xff);
  }
  bVar4 = ((heap.u8((unaff_ESI + 0x3a))) & 0xff);
  bVar3 = ((heap.u8((unaff_ESI + 0x3b))) & 0xff);
  if (bVar4 < bVar3) {
    bVar5 = ((bVar4 + 4) & 0xff);
    if (0xfb < bVar4) {
      bVar5 = ((0xff) & 0xff);
    }
    if (bVar3 < bVar5) {
      bVar5 = ((bVar3) & 0xff);
    }
  } else {
    bVar5 = ((bVar4 - 4) & 0xff);
    if (bVar4 < 4) {
      bVar5 = ((0) & 0xff);
    }
    if (bVar5 < bVar3) {
      bVar5 = ((bVar3) & 0xff);
    }
  }
  if (bVar5 != bVar4) {
    heap.setU8((unaff_ESI + 0x3a), (bVar5) & 0xff);
    heap.setU8((unaff_ESI + 0x45), (heap.u8((unaff_ESI + 0x45)) | 2) & 0xff);
  }
  bVar4 = ((heap.u8((unaff_ESI + 0x3c))) & 0xff);
  bVar3 = ((heap.u8((unaff_ESI + 0x3d))) & 0xff);
  if (bVar4 < bVar3) {
    bVar5 = ((bVar4 + 4) & 0xff);
    if (0xfb < bVar4) {
      bVar5 = ((0xff) & 0xff);
    }
    if (bVar3 < bVar5) {
      bVar5 = ((bVar3) & 0xff);
    }
  } else {
    bVar5 = ((bVar4 - 4) & 0xff);
    if (bVar4 < 4) {
      bVar5 = ((0) & 0xff);
    }
    if (bVar5 < bVar3) {
      bVar5 = ((bVar3) & 0xff);
    }
  }
  if (bVar5 != bVar4) {
    heap.setU8((unaff_ESI + 0x3c), (bVar5) & 0xff);
    heap.setU8((unaff_ESI + 0x45), (heap.u8((unaff_ESI + 0x45)) | 2) & 0xff);
  }
  return bVar5;
}
