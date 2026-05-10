// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/43e304.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT22, CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00440fe3 } from "./440fe3.js";
import { FUN_004413fa } from "./4413fa.js";
import { FUN_005e5301 } from "./5e5301.js";
export function FUN_0043e304(heap) {
  let uVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let in_DL = regs.edx & 0xff;
  let extraout_DL_00 = 0;
  let extraout_DL_01 = 0;
  let extraout_DL_02 = 0;
  let extraout_DL_03 = 0;
  let extraout_DL_04 = 0;
  let extraout_DL_05 = 0;
  let extraout_DL_06 = 0;
  let extraout_DL_07 = 0;
  let in_DH = (regs.edx >>> 8) & 0xff;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar6 = 0;
  let unaff_BP = regs.ebp & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  let uVar7 = 0;
  let iVar8 = 0;
  LAB_0043e76b: {
  LAB_0043e755: {
  uVar7 = ((((in_DL) >>> 0)) >>> 0);
  iVar8 = ((uVar7 * 0x260) >>> 0);
  uVar2 = ((in_EAX) >>> 0);
  if (((heap.u32((0x00887441) + (iVar8) * 4) != 1) || ((heap.u32((0x00887422) + (uVar7 * 0x130) * 4) & 0x80) != 0)) || ((heap.u16((unaff_ESI + 200)) & 1) != 0)) {
    break LAB_0043e76b;
  }
  unaff_EBX = ((heap.u32(((0x00887420) >>> 0) + (iVar8) * 4)) >>> 0);
  if ((heap.u32((0x005f5b78 + unaff_EBX * 8)) & 0x20000) == 0) {
    unaff_EBX = ((((in_DH) >>> 0)) >>> 0);
    if ((unaff_BP & 2) == 0) {
      LAB_0043e743: {
      if ((heap.u32((0x0088747a) + (iVar8 + unaff_EBX) * 4) | 0) != -1) {
        if ((unaff_BP & 1) == 0) {
          if ((heap.i16((0x00887472 + unaff_EBX * 2 + iVar8)) | 0) != -1) {
            break LAB_0043e743;
          }
        } else {
          uVar1 = ((heap.u16((0x00887472 + unaff_EBX * 2 + iVar8))) & 0xffff);
          uVar2 = ((((uVar1) >>> 0)) >>> 0);
          if (uVar1 != 0xffff) {
            uVar7 = ((((uVar1) >>> 0)) >>> 0);
            uVar1 = ((heap.u32((0x00743ba6) + (uVar7 * 0x80) * 4) - heap.i16((unaff_ESI + 0x12))) & 0xffff);
            if (((uVar1) << 16 >> 16) < 0) {
              uVar1 = ((-uVar1) & 0xffff);
            }
            uVar2 = ((((uVar1) >>> 0)) >>> 0);
            if (uVar1 < 7) {
              uVar1 = ((heap.u32((0x00743ba2) + (uVar7 * 0x80) * 4) - heap.i16((unaff_ESI + 0xe))) & 0xffff);
              if (((uVar1) << 16 >> 16) < 0) {
                uVar1 = ((-uVar1) & 0xffff);
              }
              uVar4 = ((heap.u32((0x00743ba4) + (uVar7 * 0x80) * 4) - heap.i16((unaff_ESI + 0x10))) & 0xffff);
              if (((uVar4) << 16 >> 16) < 0) {
                uVar4 = ((-uVar4) & 0xffff);
              }
              if (uVar1 < uVar4) {
                uVar1 = ((uVar4) & 0xffff);
              }
              uVar2 = ((((uVar1) >>> 0)) >>> 0);
              if ((uVar1 < 0xe) && ((10 < heap.u16((0x00743c0e + uVar7 * 0x100)) || (uVar1 < 8)))) {
                break LAB_0043e743;
              }
            }
          }
        }
        /* goto LAB_0043e3f1 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043e304/LAB_0043e3f1"); return 0;
      }
      }
      heap.setU32(((0x00887422) + (((in_DL) >>> 0) * 0x130) * 4), (heap.u32((0x00887422) + (((in_DL) >>> 0) * 0x130) * 4) | 0x200) & 0xffffffff);
    } else {
      LAB_0043e3f1: if (in_DL == heap.u8((unaff_ESI + 0xad))) {
        if (in_DL == heap.u8((unaff_ESI + 0xc5))) {
          heap.setU8((unaff_ESI + 0xc5), (0xff) & 0xff);
          (regs.eax = 0xc97, regs.eax = FUN_005e5301(heap, unaff_EBX, uVar2));
        }
        return in_EAX;
      }
      uVar7 = ((((in_DL) >>> 0)) >>> 0);
      iVar8 = ((uVar7 * 0x260) >>> 0);
      uVar2 = ((heap.u32(((0x00887508) >>> 0) + (uVar7 * 0x130) * 4)) >>> 0);
      if ((uVar2 != 0) && ((((heap.u16((unaff_ESI + 0xca)) >>> 0xe & 1) == 0 || (heap.i8((unaff_ESI + 0xf0)) != 1)) || (in_DL != heap.u8((unaff_ESI + 0xf1)))))) {
        if (heap.i32((unaff_ESI + 0xa0)) < 1) {
          LAB_0043e71f: if ((unaff_BP & 4) == 0) {
            uVar2 = (((regs.eax = FUN_00440fe3(heap))) >>> 0);
            in_DL = ((extraout_DL_06) & 0xff);
          }
          break LAB_0043e755;
        }
        if (heap.i32((unaff_ESI + 0xa0)) < ((uVar2) | 0)) {
          if ((unaff_BP & 4) == 0) {
            uVar2 = (((regs.eax = FUN_00440fe3(heap))) >>> 0);
            in_DL = ((extraout_DL_07) & 0xff);
          }
          if ((unaff_BP & 4) == 0) {
            heap.setU8((unaff_ESI + 0xad), (in_DL) & 0xff);
            heap.setU16((unaff_ESI + 0xae), (0) & 0xffff);
          }
          if (in_DL == heap.u8((unaff_ESI + 0xc5))) {
            heap.setU8((unaff_ESI + 0xc5), (0xff) & 0xff);
            (regs.eax = 0xc97, regs.eax = FUN_005e5301(heap, unaff_EBX, uVar2));
          }
          return in_EAX;
        }
      }
      if ((heap.u32((0x0088757e) + (iVar8) * 4) == 0) || (0xe0 < heap.u8((unaff_ESI + 0x3a)))) {
        if (in_DL == heap.u8((unaff_ESI + 0xc5))) {
          if (((heap.u32((0x00887510) + (uVar7 * 0x130) * 4) | 0) == -1) || (((heap.u32((0x00887512) + (uVar7 * 0x130) * 4)) << 16 >> 16) < 0x3e9)) {
            LAB_0043e52c: uVar1 = ((heap.u32((0x00887516) + (uVar7 * 0x130) * 4)) & 0xffff);
            if ((uVar1 == 0xffff) || ((((heap.u16((unaff_ESI + 0xca)) >>> 0xe & 1) != 0 && (heap.i8((unaff_ESI + 0xf0)) == 1)) && (in_DL == heap.u8((unaff_ESI + 0xf1)))))) {
              LAB_0043e598: if ((unaff_BP & 4) == 0) {
                uVar3 = (((regs.eax = FUN_004413fa(heap))) >>> 0);
                in_DL = ((extraout_DL_00) & 0xff);
                if (extraout_DL_00 == heap.u8((unaff_ESI + 0xc5))) {
                  heap.setU8((unaff_ESI + 0xc5), (0xff) & 0xff);
                  (regs.eax = 0xc97, regs.eax = FUN_005e5301(heap, CONCAT31((regs.eax = callIndirect(heap, int3, unaff_EBX >>> 8)), 1), uVar3));
                  in_DL = ((extraout_DL_01) & 0xff);
                }
              }
              heap.setU32(((0x00887422) + (((in_DL) >>> 0) * 0x130) * 4), (heap.u32((0x00887422) + (((in_DL) >>> 0) * 0x130) * 4) & 0xfdff) & 0xffffffff);
              return in_EAX;
            }
            if ((heap.u16((unaff_ESI + 200)) & 0x20) != 0) {
              uVar1 = ((uVar1 >>> 2) & 0xffff);
            }
            uVar2 = ((CONCAT22((((uVar2 >>> 0x10)) << 16 >> 16), uVar1)) >>> 0);
            uVar6 = ((((unaff_EBX >>> 0x10) & 0xffff)) & 0xffff);
            unaff_EBX = ((CONCAT22(uVar6, uVar1 << 1)) >>> 0);
            if (heap.u32(((0x00887508) & 0xffff) + (uVar7 * 0x130) * 4) <= ((uVar1 << 1) & 0xffff)) {
              unaff_EBX = ((CONCAT22(uVar6, uVar1 >>> 1)) >>> 0);
              if ((heap.u32(((0x00887508) & 0xffff) + (uVar7 * 0x130) * 4) <= uVar1 >>> 1) && ((unaff_BP & 4) == 0)) {
                (regs.eax = FUN_00440fe3(heap, uVar2));
                in_DL = (((regs.edx & 0xff)) & 0xff);
              }
              /* goto LAB_0043e598 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043e304/LAB_0043e598"); return 0;
            }
            if ((unaff_BP & 4) == 0) {
              (regs.eax = FUN_00440fe3(heap));
              if (0x3b < heap.u8((unaff_ESI + 0x3b))) {
                heap.setU8((unaff_ESI + 0x3b), (heap.u8((unaff_ESI + 0x3b)) - 0x10) & 0xff);
              }
              unaff_EBX = ((unaff_EBX & 0xffffff00) >>> 0);
              uVar2 = (((regs.eax = FUN_004413fa(heap))) >>> 0);
              in_DL = ((extraout_DL_03) & 0xff);
            }
            break LAB_0043e755;
          }
        } else {
          if ((heap.u32((0x00887510) + (uVar7 * 0x130) * 4) | 0) == -1) {
            /* goto LAB_0043e52c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043e304/LAB_0043e52c"); return 0;
          }
          if (heap.u8(0x008d7eb6) == 0) {
            uVar5 = ((heap.u32((unaff_ESI + 0x3a))) >>> 0);
            uVar2 = ((((heap.u8((unaff_ESI + 0x43)) >>> 4) >>> 0) * 100) >>> 0);
            if (1000 < uVar2) {
              uVar2 = ((1000) >>> 0);
            }
            unaff_EBX = (((heap.u8((unaff_ESI + 0x43)) & 0xf) * 100 - uVar5) >>> 0);
            uVar2 = ((uVar2 + uVar5) >>> 0);
            if ((((unaff_EBX) << 16 >> 16) <= ((heap.u32((0x00887512) + (uVar7 * 0x130) * 4)) << 16 >> 16)) && (((heap.u32((0x00887512) + (uVar7 * 0x130) * 4)) << 16 >> 16) <= ((uVar2) << 16 >> 16))) {
              uVar2 = ((heap.u8((unaff_ESI + 0x44)) & 3) >>> 0);
              unaff_EBX = ((heap.u16((0x0062d620 + uVar2 * 4)) - uVar5) >>> 0);
              uVar2 = ((heap.u16((0x0062d622 + uVar2 * 4)) + uVar5) >>> 0);
              if (heap.i16((0x00887514 + iVar8)) <= ((uVar2) << 16 >> 16)) {
                if ((0x8b < heap.u16((0x00887514 + iVar8))) && (0xa0 < heap.u8((unaff_ESI + 0x3c)))) {
                  break LAB_0043e76b;
                }
                /* goto LAB_0043e52c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043e304/LAB_0043e52c"); return 0;
              }
            }
          } else {
            uVar2 = ((CONCAT31((regs.eax = callIndirect(heap, (regs.eax = callIndirect(heap, int3, 0)), heap.u32(((0x00887508) & 0xffff) + (uVar7 * 0x130) * 4) >>> 8)), heap.u32(((0x008874e4) & 0xff) + (iVar8) * 4) >>> 5)) >>> 0);
            if (3 < heap.u32(((0x008874e4) & 0xff) + (iVar8) * 4) >>> 5) {
              /* goto LAB_0043e52c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043e304/LAB_0043e52c"); return 0;
            }
          }
        }
      }
      if ((unaff_BP & 4) == 0) {
        (regs.eax = FUN_00440fe3(heap));
        if (0x3f < heap.u8((unaff_ESI + 0x3b))) {
          heap.setU8((unaff_ESI + 0x3b), (heap.u8((unaff_ESI + 0x3b)) - 8) & 0xff);
        }
        unaff_EBX = ((unaff_EBX & 0xffffff00) >>> 0);
        uVar2 = (((regs.eax = FUN_004413fa(heap))) >>> 0);
        in_DL = ((extraout_DL_05) & 0xff);
      }
    }
  } else {
    LAB_0043e61a: {
    if (in_DL == heap.u8((unaff_ESI + 0xad))) {
      if (in_DL == heap.u8((unaff_ESI + 0xc5))) {
        heap.setU8((unaff_ESI + 0xc5), (0xff) & 0xff);
        (regs.eax = 0xc97, regs.eax = FUN_005e5301(heap, unaff_EBX, uVar2));
      }
      return in_EAX;
    }
    if ((heap.u32((0x005f5e88) + (unaff_EBX * 4) * 4) | 0) == -1) {
      if (heap.u8((unaff_ESI + 0x40)) < 0x46) {
        if (in_DL == heap.u8((unaff_ESI + 0xc5))) {
          heap.setU8((unaff_ESI + 0xc5), (0xff) & 0xff);
          (regs.eax = 0xc97, regs.eax = FUN_005e5301(heap, unaff_EBX, uVar2));
        }
        return in_EAX;
      }
      uVar1 = ((heap.u32((0x00887508) + (uVar7 * 0x130) * 4) * 0x28) & 0xffff);
      uVar2 = ((((uVar1) >>> 0)) >>> 0);
      if (((((uVar1 >>> 8)) << 24 >> 24) == 0) && (((uVar1) & 0xff) <= heap.u8((unaff_ESI + 0x40)))) {
        break LAB_0043e61a;
      }
      if ((unaff_BP & 4) == 0) {
        (regs.eax = FUN_00440fe3(heap));
        if (0x3b < heap.u8((unaff_ESI + 0x3b))) {
          heap.setU8((unaff_ESI + 0x3b), (heap.u8((unaff_ESI + 0x3b)) - 0x10) & 0xff);
        }
        unaff_EBX = ((0) >>> 0);
        uVar2 = (((regs.eax = FUN_004413fa(heap))) >>> 0);
        in_DL = ((extraout_DL_04) & 0xff);
      }
      break LAB_0043e755;
    }
    }
    uVar2 = ((heap.u32(((0x00887508) >>> 0) + (uVar7 * 0x130) * 4)) >>> 0);
    if (uVar2 == 0) {
      LAB_0043e63e: if (((unaff_BP & 4) == 0) && (uVar3 = (((regs.eax = FUN_004413fa(heap))) >>> 0), extraout_DL_02 == heap.i8((unaff_ESI + 0xc5)))) {
        heap.setU8((unaff_ESI + 0xc5), (0xff) & 0xff);
        (regs.eax = 0xc97, regs.eax = FUN_005e5301(heap, 1, uVar3));
      }
      return in_EAX;
    }
    if (heap.i32((unaff_ESI + 0xa0)) < 1) {
      /* goto LAB_0043e71f — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043e304/LAB_0043e71f"); return 0;
    }
    if (((uVar2) | 0) <= heap.i32((unaff_ESI + 0xa0))) {
      /* goto LAB_0043e63e — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0043e304/LAB_0043e63e"); return 0;
    }
    LAB_0043e731: if ((unaff_BP & 4) == 0) {
      uVar2 = (((regs.eax = FUN_00440fe3(heap))) >>> 0);
      in_DL = ((extraout_DL_07) & 0xff);
    }
  }
  }
  if ((unaff_BP & 4) == 0) {
    heap.setU8((unaff_ESI + 0xad), (in_DL) & 0xff);
    heap.setU16((unaff_ESI + 0xae), (0) & 0xffff);
  }
  }
  if (in_DL == heap.u8((unaff_ESI + 0xc5))) {
    heap.setU8((unaff_ESI + 0xc5), (0xff) & 0xff);
    (regs.eax = 0xc97, regs.eax = FUN_005e5301(heap, unaff_EBX, uVar2));
  }
  return in_EAX;
}
