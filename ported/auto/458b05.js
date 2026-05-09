// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/458b05.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CARRY1, CONCAT11 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_00458b05(heap) {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let puVar6 = 0;
  let puVar7 = 0;
  let unaff_DI = regs.edi & 0xffff;
  uVar5 = ((((heap.u32(0x00971e84)) >>> 0)) >>> 0);
  uVar4 = ((heap.u32(((0x0099a516) & 0xffff) + (uVar5) * 4) * -3 + unaff_DI) & 0xffff);
  uVar3 = ((0) & 0xffff);
  puVar7 = ((unaff_ESI) >>> 0);
  while (true) {
    puVar6 = ((puVar7) >>> 0);
    bVar1 = ((heap.u8(puVar6)) & 0xff);
    puVar7 = (((((puVar6) >>> 0) + 1)) >>> 0);
    if (bVar1 == 0) {
      return 0;
    }
    uVar2 = ((((bVar1 - 0x20) >>> 0)) >>> 0);
    if (0x1f < bVar1) {
      break;
    }
    if (bVar1 < 5) {
      if (bVar1 == 1) {
        uVar3 = ((heap.u16(puVar7)) & 0xffff);
        puVar7 = (((((puVar6) >>> 0) + 2)) >>> 0);
      } else {
        puVar7 = (((((puVar6) >>> 0) + 2)) >>> 0);
      }
    } else {
      if (bVar1 == 7) {
      uVar5 = ((0x1c0) >>> 0);
      LAB_00458bba: uVar4 = ((heap.u32(((0x0099a516) & 0xffff) + (uVar5) * 4) * -3 + unaff_DI) & 0xffff);
    } else {
      if (bVar1 == 8) {
        uVar5 = ((0x2a0) >>> 0);
        /* goto LAB_00458bba — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458b05/LAB_00458bba"); return 0;
      }
      if (bVar1 == 9) {
        uVar5 = ((0xe0) >>> 0);
        /* goto LAB_00458bba — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458b05/LAB_00458bba"); return 0;
      }
      if (bVar1 == 10) {
        uVar5 = ((0) >>> 0);
        /* goto LAB_00458bba — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458b05/LAB_00458bba"); return 0;
      }
      if (0x10 < bVar1) {
        if (bVar1 == 0x17) {
          uVar2 = ((heap.u32(puVar7)) >>> 0);
          puVar7 = (((((puVar6) >>> 0) + 5)) >>> 0);
          uVar3 = ((uVar3 + heap.i16((0x008dc0b8 + (uVar2 & 0x1ffff) * 0x10))) & 0xffff);
          uVar2 = ((0) >>> 0);
          LAB_00458b39: if (unaff_DI < uVar3) {
            heap.setU32(unaff_ESI, (0x2e2e2e) & 0xffffffff);
            return uVar2;
          }
          if (uVar3 <= uVar4) {
            unaff_ESI = ((puVar7) >>> 0);
          }
        } else {
          puVar7 = (((((puVar6) >>> 0) + 3)) >>> 0);
          if (0x16 < bVar1) {
            puVar7 = (((((puVar6) >>> 0) + 5)) >>> 0);
          }
        }
      }
    }
    }
  }
  uVar3 = ((CONCAT11((((uVar3 >>> 8)) << 24 >> 24) + CARRY1(((uVar3) & 0xff), heap.u32((0x0099a508) + (uVar2 + uVar5) * 4)), ((uVar3) & 0xff) + heap.u32((0x0099a508) + (uVar2 + uVar5) * 4))) & 0xffff);
  /* goto LAB_00458b39 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458b05/LAB_00458b39"); return 0;
}
