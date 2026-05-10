// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413c90.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetModuleFileNameA, _abort, _strncat, _strncpy, builtin_strncpy, swi } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004170f0 } from "./4170f0.js";
import { FUN_00417240 } from "./417240.js";
import { FUN_00417280 } from "./417280.js";
import { FUN_00417420 } from "./417420.js";
import { FUN_004175f0 } from "./4175f0.js";
import { FUN_00417680 } from "./417680.js";
export function FUN_00413c90(heap, param_1, param_2) {
  const __sp = heap.allocFrame(1596);
  const __addr_acStackY_356 = __sp + 0;
  const __addr_local_324 = __sp + 16;
  const __addr_local_220 = __sp + 276;
  try {
  let cVar1 = 0;
  let pcVar2 = 0;
  let DVar3 = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let uVar6 = 0;
  let pcVar7 = 0;
  let pcVar8 = 0;
  let pCVar9 = 0;
  let pcVar10 = 0;
  let pcVar11 = 0;
  let uStackY_348 = 0;
  let puStackY_344 = 0;
  let pcStackY_340 = 0;
  if ((heap.u32(0x005efeb4) == 1) || ((heap.u32(0x005efeb4) == 0 && (heap.u32(0x005ec264) == 1)))) {
    if ((heap.u32(0x005ee7ac) & 0x10c) == 0) {
      pcStackY_340 = ((0x005ee7a0) >>> 0);
      puStackY_344 = ((0x414199) >>> 0);
      (regs.eax = FUN_00417280(heap));
    }
    pcStackY_340 = ((0x005ec2a0) >>> 0);
    puStackY_344 = ((0x005ee7a0) >>> 0);
    uStackY_348 = ((0x4141b7) >>> 0);
    (regs.eax = FUN_00417240(heap));
    (regs.eax = FUN_004170f0(heap));
  } else {
    builtin_strncpy(heap, __addr_local_220, "Assertion failed!", 0x12);
    uVar4 = ((0xffffffff) >>> 0);
    pcVar7 = ((heap.u32(0x005ec2d0)) >>> 0);
    do {
      pcVar8 = ((pcVar7) >>> 0);
      if (uVar4 == 0) {
        break;
      }
      uVar4 = ((uVar4 - 1) >>> 0);
      pcVar8 = ((pcVar7 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar8) >>> 0);
    } while (cVar1 != 0);
    uVar4 = ((~uVar4) >>> 0);
    iVar5 = ((-1) >>> 0);
    pcVar7 = ((__addr_local_220) >>> 0);
    do {
      pcVar11 = ((pcVar7) >>> 0);
      if (iVar5 == 0) {
        break;
      }
      iVar5 = ((iVar5 + -1) >>> 0);
      pcVar11 = ((pcVar7 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar11) >>> 0);
    } while (cVar1 != 0);
    pcVar7 = ((pcVar8 + -uVar4) >>> 0);
    pcVar8 = ((pcVar11 + -1) >>> 0);
    for (uVar6 = ((uVar4 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.u32(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 4) >>> 0);
      pcVar8 = ((pcVar8 + 4) >>> 0);
    }
    for (uVar4 = ((uVar4 & 3) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.i8(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 1) >>> 0);
      pcVar8 = ((pcVar8 + 1) >>> 0);
    }
    uVar4 = ((0xffffffff) >>> 0);
    pcVar7 = (("Program: ") >>> 0);
    do {
      pcVar8 = ((pcVar7) >>> 0);
      if (uVar4 == 0) {
        break;
      }
      uVar4 = ((uVar4 - 1) >>> 0);
      pcVar8 = ((pcVar7 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar8) >>> 0);
    } while (cVar1 != 0);
    uVar4 = ((~uVar4) >>> 0);
    iVar5 = ((-1) >>> 0);
    pcVar7 = ((__addr_local_220) >>> 0);
    do {
      pcVar11 = ((pcVar7) >>> 0);
      if (iVar5 == 0) {
        break;
      }
      iVar5 = ((iVar5 + -1) >>> 0);
      pcVar11 = ((pcVar7 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar11) >>> 0);
    } while (cVar1 != 0);
    pcVar7 = ((pcVar8 + -uVar4) >>> 0);
    pcVar8 = ((pcVar11 + -1) >>> 0);
    for (uVar6 = ((uVar4 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.u32(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 4) >>> 0);
      pcVar8 = ((pcVar8 + 4) >>> 0);
    }
    for (uVar4 = ((uVar4 & 3) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.i8(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 1) >>> 0);
      pcVar8 = ((pcVar8 + 1) >>> 0);
    }
    pcStackY_340 = ((0x413d6a) >>> 0);
    DVar3 = ((GetModuleFileNameA(heap, ((0x0) | 0), __addr_local_324, 0x104)) >>> 0);
    if (DVar3 == 0) {
      pcVar7 = (("<program name unknown>") >>> 0);
      pCVar9 = ((__addr_local_324) >>> 0);
      for (iVar5 = ((5) >>> 0); iVar5 != 0; iVar5 = (((iVar5 + -1) >>> 0)) >>> 0) {
        heap.setU32(pCVar9, (heap.u32(pcVar7)) & 0xffffffff);
        pcVar7 = ((pcVar7 + 4) >>> 0);
        pCVar9 = ((pCVar9 + ((4) * 4)) >>> 0);
      }
      heap.setU16(pCVar9, (heap.u16(pcVar7)) & 0xffff);
      heap.setI32((pCVar9 + (2) * 4), (heap.i8(pcVar7 + (2))) & 0xffffffff);
    }
    uVar4 = ((0xffffffff) >>> 0);
    pcVar7 = ((__addr_local_324) >>> 0);
    pcVar8 = ((__addr_local_324) >>> 0);
    do {
      if (uVar4 == 0) {
        break;
      }
      uVar4 = ((uVar4 - 1) >>> 0);
      cVar1 = ((heap.i8(pcVar8)) & 0xff);
      pcVar8 = ((pcVar8 + 1) >>> 0);
    } while (cVar1 != 0);
    if (0x3c < ~uVar4 + 10) {
      uVar4 = ((0xffffffff) >>> 0);
      pcVar7 = ((__addr_local_324) >>> 0);
      do {
        if (uVar4 == 0) {
          break;
        }
        uVar4 = ((uVar4 - 1) >>> 0);
        cVar1 = ((heap.i8(pcVar7)) & 0xff);
        pcVar7 = ((pcVar7 + 1) >>> 0);
      } while (cVar1 != 0);
      pcVar7 = ((__addr_acStackY_356 + ~uVar4) >>> 0);
      pcStackY_340 = ((0x413dca) >>> 0);
      _strncpy(heap, pcVar7, heap.u32(0x005ec2c8), 3);
    }
    uVar4 = ((0xffffffff) >>> 0);
    do {
      pcVar8 = ((pcVar7) >>> 0);
      if (uVar4 == 0) {
        break;
      }
      uVar4 = ((uVar4 - 1) >>> 0);
      pcVar8 = ((pcVar7 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar8) >>> 0);
    } while (cVar1 != 0);
    uVar4 = ((~uVar4) >>> 0);
    iVar5 = ((-1) >>> 0);
    pcVar7 = ((__addr_local_220) >>> 0);
    do {
      pcVar11 = ((pcVar7) >>> 0);
      if (iVar5 == 0) {
        break;
      }
      iVar5 = ((iVar5 + -1) >>> 0);
      pcVar11 = ((pcVar7 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar11) >>> 0);
    } while (cVar1 != 0);
    pcVar7 = ((pcVar8 + -uVar4) >>> 0);
    pcVar8 = ((pcVar11 + -1) >>> 0);
    for (uVar6 = ((uVar4 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.u32(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 4) >>> 0);
      pcVar8 = ((pcVar8 + 4) >>> 0);
    }
    for (uVar4 = ((uVar4 & 3) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.i8(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 1) >>> 0);
      pcVar8 = ((pcVar8 + 1) >>> 0);
    }
    uVar4 = ((0xffffffff) >>> 0);
    pcVar7 = ((heap.u32(0x005ec2cc)) >>> 0);
    do {
      pcVar8 = ((pcVar7) >>> 0);
      if (uVar4 == 0) {
        break;
      }
      uVar4 = ((uVar4 - 1) >>> 0);
      pcVar8 = ((pcVar7 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar8) >>> 0);
    } while (cVar1 != 0);
    uVar4 = ((~uVar4) >>> 0);
    iVar5 = ((-1) >>> 0);
    pcVar7 = ((__addr_local_220) >>> 0);
    do {
      pcVar11 = ((pcVar7) >>> 0);
      if (iVar5 == 0) {
        break;
      }
      iVar5 = ((iVar5 + -1) >>> 0);
      pcVar11 = ((pcVar7 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar11) >>> 0);
    } while (cVar1 != 0);
    pcVar7 = ((pcVar8 + -uVar4) >>> 0);
    pcVar8 = ((pcVar11 + -1) >>> 0);
    for (uVar6 = ((uVar4 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.u32(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 4) >>> 0);
      pcVar8 = ((pcVar8 + 4) >>> 0);
    }
    for (uVar4 = ((uVar4 & 3) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.i8(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 1) >>> 0);
      pcVar8 = ((pcVar8 + 1) >>> 0);
    }
    uVar4 = ((0xffffffff) >>> 0);
    pcVar7 = (("File: ") >>> 0);
    do {
      pcVar8 = ((pcVar7) >>> 0);
      if (uVar4 == 0) {
        break;
      }
      uVar4 = ((uVar4 - 1) >>> 0);
      pcVar8 = ((pcVar7 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar8) >>> 0);
    } while (cVar1 != 0);
    uVar4 = ((~uVar4) >>> 0);
    iVar5 = ((-1) >>> 0);
    pcVar7 = ((__addr_local_220) >>> 0);
    do {
      pcVar11 = ((pcVar7) >>> 0);
      if (iVar5 == 0) {
        break;
      }
      iVar5 = ((iVar5 + -1) >>> 0);
      pcVar11 = ((pcVar7 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar11) >>> 0);
    } while (cVar1 != 0);
    pcVar7 = ((pcVar8 + -uVar4) >>> 0);
    pcVar8 = ((pcVar11 + -1) >>> 0);
    for (uVar6 = ((uVar4 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.u32(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 4) >>> 0);
      pcVar8 = ((pcVar8 + 4) >>> 0);
    }
    for (uVar4 = ((uVar4 & 3) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.i8(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 1) >>> 0);
      pcVar8 = ((pcVar8 + 1) >>> 0);
    }
    uVar4 = ((0xffffffff) >>> 0);
    pcVar7 = ((param_2) >>> 0);
    do {
      if (uVar4 == 0) {
        break;
      }
      uVar4 = ((uVar4 - 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar7 + 1) >>> 0);
    } while (cVar1 != 0);
    if (~uVar4 + 7 < 0x3d) {
      uVar4 = ((0xffffffff) >>> 0);
      do {
        pcVar7 = ((param_2) >>> 0);
        if (uVar4 == 0) {
          break;
        }
        uVar4 = ((uVar4 - 1) >>> 0);
        pcVar7 = ((param_2 + 1) >>> 0);
        cVar1 = ((heap.i8(param_2)) & 0xff);
        param_2 = ((pcVar7) >>> 0);
      } while (cVar1 != 0);
      uVar4 = ((~uVar4) >>> 0);
      iVar5 = ((-1) >>> 0);
      pcVar8 = ((__addr_local_220) >>> 0);
      do {
        pcVar11 = ((pcVar8) >>> 0);
        if (iVar5 == 0) {
          break;
        }
        iVar5 = ((iVar5 + -1) >>> 0);
        pcVar11 = ((pcVar8 + 1) >>> 0);
        cVar1 = ((heap.i8(pcVar8)) & 0xff);
        pcVar8 = ((pcVar11) >>> 0);
      } while (cVar1 != 0);
      pcVar7 = ((pcVar7 + -uVar4) >>> 0);
      pcVar8 = ((pcVar11 + -1) >>> 0);
      for (uVar6 = ((uVar4 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
        heap.setU32(pcVar8, (heap.u32(pcVar7)) & 0xffffffff);
        pcVar7 = ((pcVar7 + 4) >>> 0);
        pcVar8 = ((pcVar8 + 4) >>> 0);
      }
    } else {
      pcStackY_340 = ((0x413e7a) >>> 0);
      _strncat(heap, __addr_local_220, param_2, 0x31);
      uVar4 = ((0xffffffff) >>> 0);
      pcVar7 = ((heap.u32(0x005ec2c8)) >>> 0);
      do {
        pcVar8 = ((pcVar7) >>> 0);
        if (uVar4 == 0) {
          break;
        }
        uVar4 = ((uVar4 - 1) >>> 0);
        pcVar8 = ((pcVar7 + 1) >>> 0);
        cVar1 = ((heap.i8(pcVar7)) & 0xff);
        pcVar7 = ((pcVar8) >>> 0);
      } while (cVar1 != 0);
      uVar4 = ((~uVar4) >>> 0);
      iVar5 = ((-1) >>> 0);
      pcVar7 = ((__addr_local_220) >>> 0);
      do {
        pcVar11 = ((pcVar7) >>> 0);
        if (iVar5 == 0) {
          break;
        }
        iVar5 = ((iVar5 + -1) >>> 0);
        pcVar11 = ((pcVar7 + 1) >>> 0);
        cVar1 = ((heap.i8(pcVar7)) & 0xff);
        pcVar7 = ((pcVar11) >>> 0);
      } while (cVar1 != 0);
      pcVar7 = ((pcVar8 + -uVar4) >>> 0);
      pcVar8 = ((pcVar11 + -1) >>> 0);
      for (uVar6 = ((uVar4 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
        heap.setU32(pcVar8, (heap.u32(pcVar7)) & 0xffffffff);
        pcVar7 = ((pcVar7 + 4) >>> 0);
        pcVar8 = ((pcVar8 + 4) >>> 0);
      }
    }
    for (uVar4 = ((uVar4 & 3) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.i8(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 1) >>> 0);
      pcVar8 = ((pcVar8 + 1) >>> 0);
    }
    uVar4 = ((0xffffffff) >>> 0);
    pcVar7 = ((heap.u32(0x005ec2cc)) >>> 0);
    do {
      pcVar8 = ((pcVar7) >>> 0);
      if (uVar4 == 0) {
        break;
      }
      uVar4 = ((uVar4 - 1) >>> 0);
      pcVar8 = ((pcVar7 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar8) >>> 0);
    } while (cVar1 != 0);
    uVar4 = ((~uVar4) >>> 0);
    iVar5 = ((-1) >>> 0);
    pcVar7 = ((__addr_local_220) >>> 0);
    do {
      pcVar11 = ((pcVar7) >>> 0);
      if (iVar5 == 0) {
        break;
      }
      iVar5 = ((iVar5 + -1) >>> 0);
      pcVar11 = ((pcVar7 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar11) >>> 0);
    } while (cVar1 != 0);
    pcVar7 = ((pcVar8 + -uVar4) >>> 0);
    pcVar8 = ((pcVar11 + -1) >>> 0);
    for (uVar6 = ((uVar4 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.u32(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 4) >>> 0);
      pcVar8 = ((pcVar8 + 4) >>> 0);
    }
    for (uVar4 = ((uVar4 & 3) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.i8(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 1) >>> 0);
      pcVar8 = ((pcVar8 + 1) >>> 0);
    }
    uVar4 = ((0xffffffff) >>> 0);
    pcVar7 = (("Line: ") >>> 0);
    do {
      pcVar8 = ((pcVar7) >>> 0);
      if (uVar4 == 0) {
        break;
      }
      uVar4 = ((uVar4 - 1) >>> 0);
      pcVar8 = ((pcVar7 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar8) >>> 0);
    } while (cVar1 != 0);
    uVar4 = ((~uVar4) >>> 0);
    iVar5 = ((-1) >>> 0);
    pcVar7 = ((__addr_local_220) >>> 0);
    do {
      pcVar11 = ((pcVar7) >>> 0);
      if (iVar5 == 0) {
        break;
      }
      iVar5 = ((iVar5 + -1) >>> 0);
      pcVar11 = ((pcVar7 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar11) >>> 0);
    } while (cVar1 != 0);
    pcVar7 = ((pcVar8 + -uVar4) >>> 0);
    pcVar8 = ((pcVar11 + -1) >>> 0);
    for (uVar6 = ((uVar4 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.u32(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 4) >>> 0);
      pcVar8 = ((pcVar8 + 4) >>> 0);
    }
    for (uVar4 = ((uVar4 & 3) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.i8(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 1) >>> 0);
      pcVar8 = ((pcVar8 + 1) >>> 0);
    }
    iVar5 = ((-1) >>> 0);
    pcVar7 = ((__addr_local_220) >>> 0);
    do {
      if (iVar5 == 0) {
        break;
      }
      iVar5 = ((iVar5 + -1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar7 + 1) >>> 0);
    } while (cVar1 != 0);
    pcStackY_340 = ((0x413f58) >>> 0);
    (regs.eax = FUN_00417680(heap));
    pcVar7 = ((heap.u32(0x005ec2d0)) >>> 0);
    uVar4 = ((0xffffffff) >>> 0);
    pcVar8 = ((heap.u32(0x005ec2d0)) >>> 0);
    do {
      pcVar11 = ((pcVar8) >>> 0);
      if (uVar4 == 0) {
        break;
      }
      uVar4 = ((uVar4 - 1) >>> 0);
      pcVar11 = ((pcVar8 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar8)) & 0xff);
      pcVar8 = ((pcVar11) >>> 0);
    } while (cVar1 != 0);
    uVar4 = ((~uVar4) >>> 0);
    iVar5 = ((-1) >>> 0);
    pcVar8 = ((__addr_local_220) >>> 0);
    do {
      pcVar10 = ((pcVar8) >>> 0);
      if (iVar5 == 0) {
        break;
      }
      iVar5 = ((iVar5 + -1) >>> 0);
      pcVar10 = ((pcVar8 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar8)) & 0xff);
      pcVar8 = ((pcVar10) >>> 0);
    } while (cVar1 != 0);
    pcVar8 = ((pcVar11 + -uVar4) >>> 0);
    pcVar11 = ((pcVar10 + -1) >>> 0);
    for (uVar6 = ((uVar4 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar11, (heap.u32(pcVar8)) & 0xffffffff);
      pcVar8 = ((pcVar8 + 4) >>> 0);
      pcVar11 = ((pcVar11 + 4) >>> 0);
    }
    for (uVar4 = ((uVar4 & 3) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar11, (heap.i8(pcVar8)) & 0xffffffff);
      pcVar8 = ((pcVar8 + 1) >>> 0);
      pcVar11 = ((pcVar11 + 1) >>> 0);
    }
    uVar4 = ((0xffffffff) >>> 0);
    pcVar8 = (("Expression: ") >>> 0);
    do {
      pcVar11 = ((pcVar8) >>> 0);
      if (uVar4 == 0) {
        break;
      }
      uVar4 = ((uVar4 - 1) >>> 0);
      pcVar11 = ((pcVar8 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar8)) & 0xff);
      pcVar8 = ((pcVar11) >>> 0);
    } while (cVar1 != 0);
    uVar4 = ((~uVar4) >>> 0);
    iVar5 = ((-1) >>> 0);
    pcVar8 = ((__addr_local_220) >>> 0);
    do {
      pcVar10 = ((pcVar8) >>> 0);
      if (iVar5 == 0) {
        break;
      }
      iVar5 = ((iVar5 + -1) >>> 0);
      pcVar10 = ((pcVar8 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar8)) & 0xff);
      pcVar8 = ((pcVar10) >>> 0);
    } while (cVar1 != 0);
    pcVar8 = ((pcVar11 + -uVar4) >>> 0);
    pcVar11 = ((pcVar10 + -1) >>> 0);
    for (uVar6 = ((uVar4 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar11, (heap.u32(pcVar8)) & 0xffffffff);
      pcVar8 = ((pcVar8 + 4) >>> 0);
      pcVar11 = ((pcVar11 + 4) >>> 0);
    }
    for (uVar4 = ((uVar4 & 3) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar11, (heap.i8(pcVar8)) & 0xffffffff);
      pcVar8 = ((pcVar8 + 1) >>> 0);
      pcVar11 = ((pcVar11 + 1) >>> 0);
    }
    uVar4 = ((0xffffffff) >>> 0);
    pcVar8 = ((param_1) >>> 0);
    do {
      if (uVar4 == 0) {
        break;
      }
      uVar4 = ((uVar4 - 1) >>> 0);
      cVar1 = ((heap.i8(pcVar8)) & 0xff);
      pcVar8 = ((pcVar8 + 1) >>> 0);
    } while (cVar1 != 0);
    uVar6 = ((0xffffffff) >>> 0);
    pcVar8 = ((__addr_local_220) >>> 0);
    do {
      if (uVar6 == 0) {
        break;
      }
      uVar6 = ((uVar6 - 1) >>> 0);
      cVar1 = ((heap.i8(pcVar8)) & 0xff);
      pcVar8 = ((pcVar8 + 1) >>> 0);
    } while (cVar1 != 0);
    if (~uVar4 + ~uVar6 + 0xae < 0x21d) {
      uVar4 = ((0xffffffff) >>> 0);
      do {
        pcVar8 = ((param_1) >>> 0);
        if (uVar4 == 0) {
          break;
        }
        uVar4 = ((uVar4 - 1) >>> 0);
        pcVar8 = ((param_1 + 1) >>> 0);
        cVar1 = ((heap.i8(param_1)) & 0xff);
        param_1 = ((pcVar8) >>> 0);
      } while (cVar1 != 0);
      uVar4 = ((~uVar4) >>> 0);
      iVar5 = ((-1) >>> 0);
      pcVar11 = ((__addr_local_220) >>> 0);
      do {
        pcVar10 = ((pcVar11) >>> 0);
        if (iVar5 == 0) {
          break;
        }
        iVar5 = ((iVar5 + -1) >>> 0);
        pcVar10 = ((pcVar11 + 1) >>> 0);
        cVar1 = ((heap.i8(pcVar11)) & 0xff);
        pcVar11 = ((pcVar10) >>> 0);
      } while (cVar1 != 0);
      pcVar8 = ((pcVar8 + -uVar4) >>> 0);
      pcVar11 = ((pcVar10 + -1) >>> 0);
      for (uVar6 = ((uVar4 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
        heap.setU32(pcVar11, (heap.u32(pcVar8)) & 0xffffffff);
        pcVar8 = ((pcVar8 + 4) >>> 0);
        pcVar11 = ((pcVar11 + 4) >>> 0);
      }
      for (uVar4 = ((uVar4 & 3) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
        heap.setU32(pcVar11, (heap.i8(pcVar8)) & 0xffffffff);
        pcVar8 = ((pcVar8 + 1) >>> 0);
        pcVar11 = ((pcVar11 + 1) >>> 0);
      }
    } else {
      uVar4 = ((0xffffffff) >>> 0);
      pcVar7 = ((__addr_local_220) >>> 0);
      do {
        if (uVar4 == 0) {
          break;
        }
        uVar4 = ((uVar4 - 1) >>> 0);
        cVar1 = ((heap.i8(pcVar7)) & 0xff);
        pcVar7 = ((pcVar7 + 1) >>> 0);
      } while (cVar1 != 0);
      pcStackY_340 = ((0x41400c) >>> 0);
      _strncat(heap, __addr_local_220, param_1, 0x169 - (~uVar4 - 1));
      uVar4 = ((0xffffffff) >>> 0);
      pcVar7 = ((heap.u32(0x005ec2c8)) >>> 0);
      do {
        pcVar8 = ((pcVar7) >>> 0);
        if (uVar4 == 0) {
          break;
        }
        uVar4 = ((uVar4 - 1) >>> 0);
        pcVar8 = ((pcVar7 + 1) >>> 0);
        cVar1 = ((heap.i8(pcVar7)) & 0xff);
        pcVar7 = ((pcVar8) >>> 0);
      } while (cVar1 != 0);
      uVar4 = ((~uVar4) >>> 0);
      iVar5 = ((-1) >>> 0);
      pcVar7 = ((__addr_local_220) >>> 0);
      do {
        pcVar11 = ((pcVar7) >>> 0);
        if (iVar5 == 0) {
          break;
        }
        iVar5 = ((iVar5 + -1) >>> 0);
        pcVar11 = ((pcVar7 + 1) >>> 0);
        cVar1 = ((heap.i8(pcVar7)) & 0xff);
        pcVar7 = ((pcVar11) >>> 0);
      } while (cVar1 != 0);
      pcVar8 = ((pcVar8 + -uVar4) >>> 0);
      pcVar11 = ((pcVar11 + -1) >>> 0);
      for (uVar6 = ((uVar4 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
        heap.setU32(pcVar11, (heap.u32(pcVar8)) & 0xffffffff);
        pcVar8 = ((pcVar8 + 4) >>> 0);
        pcVar11 = ((pcVar11 + 4) >>> 0);
      }
      for (uVar4 = ((uVar4 & 3) >>> 0); pcVar7 = ((heap.u32(0x005ec2d0)) >>> 0), uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
        heap.setU32(pcVar11, (heap.i8(pcVar8)) & 0xffffffff);
        pcVar8 = ((pcVar8 + 1) >>> 0);
        pcVar11 = ((pcVar11 + 1) >>> 0);
      }
    }
    uVar4 = ((0xffffffff) >>> 0);
    pcVar8 = ((pcVar7) >>> 0);
    do {
      pcVar11 = ((pcVar8) >>> 0);
      if (uVar4 == 0) {
        break;
      }
      uVar4 = ((uVar4 - 1) >>> 0);
      pcVar11 = ((pcVar8 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar8)) & 0xff);
      pcVar8 = ((pcVar11) >>> 0);
    } while (cVar1 != 0);
    uVar4 = ((~uVar4) >>> 0);
    iVar5 = ((-1) >>> 0);
    pcVar8 = ((__addr_local_220) >>> 0);
    do {
      pcVar10 = ((pcVar8) >>> 0);
      if (iVar5 == 0) {
        break;
      }
      iVar5 = ((iVar5 + -1) >>> 0);
      pcVar10 = ((pcVar8 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar8)) & 0xff);
      pcVar8 = ((pcVar10) >>> 0);
    } while (cVar1 != 0);
    pcVar8 = ((pcVar11 + -uVar4) >>> 0);
    pcVar11 = ((pcVar10 + -1) >>> 0);
    for (uVar6 = ((uVar4 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar11, (heap.u32(pcVar8)) & 0xffffffff);
      pcVar8 = ((pcVar8 + 4) >>> 0);
      pcVar11 = ((pcVar11 + 4) >>> 0);
    }
    for (uVar4 = ((uVar4 & 3) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar11, (heap.i8(pcVar8)) & 0xffffffff);
      pcVar8 = ((pcVar8 + 1) >>> 0);
      pcVar11 = ((pcVar11 + 1) >>> 0);
    }
    uVar4 = ((0xffffffff) >>> 0);
    pcVar8 = (("For information on how your program can cause an assertion\nfailure, see the Visual C++ documentation on asserts") >>> 0);
    do {
      pcVar11 = ((pcVar8) >>> 0);
      if (uVar4 == 0) {
        break;
      }
      uVar4 = ((uVar4 - 1) >>> 0);
      pcVar11 = ((pcVar8 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar8)) & 0xff);
      pcVar8 = ((pcVar11) >>> 0);
    } while (cVar1 != 0);
    uVar4 = ((~uVar4) >>> 0);
    iVar5 = ((-1) >>> 0);
    pcVar8 = ((__addr_local_220) >>> 0);
    do {
      pcVar10 = ((pcVar8) >>> 0);
      if (iVar5 == 0) {
        break;
      }
      iVar5 = ((iVar5 + -1) >>> 0);
      pcVar10 = ((pcVar8 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar8)) & 0xff);
      pcVar8 = ((pcVar10) >>> 0);
    } while (cVar1 != 0);
    pcVar8 = ((pcVar11 + -uVar4) >>> 0);
    pcVar11 = ((pcVar10 + -1) >>> 0);
    for (uVar6 = ((uVar4 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar11, (heap.u32(pcVar8)) & 0xffffffff);
      pcVar8 = ((pcVar8 + 4) >>> 0);
      pcVar11 = ((pcVar11 + 4) >>> 0);
    }
    for (uVar4 = ((uVar4 & 3) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar11, (heap.i8(pcVar8)) & 0xffffffff);
      pcVar8 = ((pcVar8 + 1) >>> 0);
      pcVar11 = ((pcVar11 + 1) >>> 0);
    }
    uVar4 = ((0xffffffff) >>> 0);
    do {
      pcVar8 = ((pcVar7) >>> 0);
      if (uVar4 == 0) {
        break;
      }
      uVar4 = ((uVar4 - 1) >>> 0);
      pcVar8 = ((pcVar7 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar8) >>> 0);
    } while (cVar1 != 0);
    uVar4 = ((~uVar4) >>> 0);
    iVar5 = ((-1) >>> 0);
    pcVar7 = ((__addr_local_220) >>> 0);
    do {
      pcVar11 = ((pcVar7) >>> 0);
      if (iVar5 == 0) {
        break;
      }
      iVar5 = ((iVar5 + -1) >>> 0);
      pcVar11 = ((pcVar7 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar11) >>> 0);
    } while (cVar1 != 0);
    pcVar7 = ((pcVar8 + -uVar4) >>> 0);
    pcVar8 = ((pcVar11 + -1) >>> 0);
    for (uVar6 = ((uVar4 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.u32(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 4) >>> 0);
      pcVar8 = ((pcVar8 + 4) >>> 0);
    }
    for (uVar4 = ((uVar4 & 3) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.i8(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 1) >>> 0);
      pcVar8 = ((pcVar8 + 1) >>> 0);
    }
    uVar4 = ((0xffffffff) >>> 0);
    pcVar7 = (("(Press Retry to debug the application - JIT must be enabled)") >>> 0);
    do {
      pcVar8 = ((pcVar7) >>> 0);
      if (uVar4 == 0) {
        break;
      }
      uVar4 = ((uVar4 - 1) >>> 0);
      pcVar8 = ((pcVar7 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar8) >>> 0);
    } while (cVar1 != 0);
    uVar4 = ((~uVar4) >>> 0);
    iVar5 = ((-1) >>> 0);
    pcVar7 = ((__addr_local_220) >>> 0);
    do {
      pcVar11 = ((pcVar7) >>> 0);
      if (iVar5 == 0) {
        break;
      }
      iVar5 = ((iVar5 + -1) >>> 0);
      pcVar11 = ((pcVar7 + 1) >>> 0);
      cVar1 = ((heap.i8(pcVar7)) & 0xff);
      pcVar7 = ((pcVar11) >>> 0);
    } while (cVar1 != 0);
    pcVar7 = ((pcVar8 + -uVar4) >>> 0);
    pcVar8 = ((pcVar11 + -1) >>> 0);
    for (uVar6 = ((uVar4 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.u32(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 4) >>> 0);
      pcVar8 = ((pcVar8 + 4) >>> 0);
    }
    for (uVar4 = ((uVar4 & 3) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
      heap.setU32(pcVar8, (heap.i8(pcVar7)) & 0xffffffff);
      pcVar7 = ((pcVar7 + 1) >>> 0);
      pcVar8 = ((pcVar8 + 1) >>> 0);
    }
    pcStackY_340 = ((0x414147) >>> 0);
    iVar5 = (((regs.eax = FUN_004175f0(heap))) >>> 0);
    if (iVar5 == 3) {
      (regs.eax = FUN_00417420(heap));
      __exit(3);
    }
    if (iVar5 == 4) {
      pcVar2 = ((swi(heap, 3)) >>> 0);
      return (regs.eax = callIndirect(heap, pcVar2));
    }
    if (iVar5 == 5) {
      return;
    }
  }
  _abort(heap);
} finally {
    heap.freeFrame(1596);
  }
}
