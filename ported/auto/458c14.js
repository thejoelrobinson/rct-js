// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/458c14.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_00458f0f } from "./458f0f.js";
import { FUN_00458f25 } from "./458f25.js";
import { FUN_00458f53 } from "./458f53.js";
import { FUN_0045905e } from "./45905e.js";
import { FUN_0045917b } from "./45917b.js";
export function FUN_00458c14(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let bVar3 = 0;
  let uVar4 = 0;
  let in_ECX = regs.ecx >>> 0;
  let extraout_ECX = 0;
  let extraout_ECX_00 = 0;
  let extraout_ECX_01 = 0;
  let extraout_ECX_02 = 0;
  let extraout_ECX_03 = 0;
  let extraout_ECX_04 = 0;
  let extraout_ECX_05 = 0;
  let extraout_ECX_06 = 0;
  let extraout_ECX_07 = 0;
  let extraout_ECX_08 = 0;
  let extraout_ECX_09 = 0;
  let extraout_ECX_10 = 0;
  let extraout_ECX_11 = 0;
  let extraout_ECX_12 = 0;
  let extraout_ECX_13 = 0;
  let extraout_ECX_14 = 0;
  let extraout_ECX_15 = 0;
  let ppuVar5 = 0;
  let pcVar6 = 0;
  let pbVar7 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let pbVar8 = 0;
  let pbVar9 = 0;
  let unaff_EDI = regs.edi >>> 0;
  switchD_00458c5d_default: {
  code_r0x00458c14: while (true) {
    bVar3 = ((heap.u8(unaff_ESI)) & 0xff);
    pbVar8 = ((unaff_ESI + 1) >>> 0);
    if (0x1f < bVar3) {
      break;
    }
    if (bVar3 == 0) {
      heap.setU32(unaff_EDI, (0) & 0xffffffff);
      return;
    }
    if (bVar3 < 5) {
      LAB_00458c4a: heap.setU32(unaff_EDI, (bVar3) & 0xffffffff);
      unaff_EDI = ((unaff_EDI + 1) >>> 0);
      bVar3 = ((heap.u8(pbVar8)) & 0xff);
      pbVar8 = ((pbVar8 + 1) >>> 0);
    } else {
      if (0x10 < bVar3) {
      if (0x16 < bVar3) {
        heap.setU32(unaff_EDI, (bVar3) & 0xffffffff);
        heap.setU8((unaff_EDI + (1)), (heap.u8(pbVar8)) & 0xff);
        unaff_EDI = ((unaff_EDI + 2) >>> 0);
        bVar3 = ((heap.u8(unaff_ESI + (2))) & 0xff);
        pbVar8 = ((unaff_ESI + 3) >>> 0);
      }
      heap.setU32(unaff_EDI, (bVar3) & 0xffffffff);
      unaff_EDI = ((unaff_EDI + 1) >>> 0);
      bVar3 = ((heap.u8(pbVar8)) & 0xff);
      pbVar8 = ((pbVar8 + 1) >>> 0);
      /* goto LAB_00458c4a — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458c14/LAB_00458c4a"); return 0;
    }
    }
    heap.setU32(unaff_EDI, (bVar3) & 0xffffffff);
    unaff_EDI = ((unaff_EDI + 1) >>> 0);
    unaff_ESI = ((pbVar8) >>> 0);
  }
  switch (bVar3) {
    case 0x7b:
      (regs.eax = 0x1, regs.edi = 0xc, regs.eax = FUN_0045905e(heap));
      in_ECX = ((extraout_ECX) >>> 0);
      unaff_ESI = ((pbVar8) >>> 0);
      /* goto code_r0x00458c14 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458c14/code_r0x00458c14"); return 0;
    case 0x7c:
      (regs.eax = FUN_00458f53(heap));
      in_ECX = ((extraout_ECX_00) >>> 0);
      unaff_ESI = ((pbVar8) >>> 0);
      /* goto code_r0x00458c14 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458c14/code_r0x00458c14"); return 0;
    case 0x7d:
      (regs.eax = FUN_0045917b(heap));
      in_ECX = ((extraout_ECX_01) >>> 0);
      unaff_ESI = ((pbVar8) >>> 0);
      /* goto code_r0x00458c14 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458c14/code_r0x00458c14"); return 0;
    case 0x7e:
      (regs.eax = 0x1, regs.edi = 0xc, regs.eax = FUN_0045905e(heap));
      in_ECX = ((extraout_ECX_02) >>> 0);
      unaff_ESI = ((pbVar8) >>> 0);
      /* goto code_r0x00458c14 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458c14/code_r0x00458c14"); return 0;
    case 0x7f:
      (regs.eax = FUN_00458f53(heap));
      in_ECX = ((extraout_ECX_03) >>> 0);
      unaff_ESI = ((pbVar8) >>> 0);
      /* goto code_r0x00458c14 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458c14/code_r0x00458c14"); return 0;
    case 0x80:
      (regs.eax = callIndirect(heap, heap.u32((0x00458dfc) + (heap.u8(0x005f8da1) & 0x7f) * 4)));
      in_ECX = ((extraout_ECX_08) >>> 0);
      unaff_ESI = ((pbVar8) >>> 0);
      /* goto code_r0x00458c14 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458c14/code_r0x00458c14"); return 0;
    case 0x81:
      (regs.eax = callIndirect(heap, heap.u32((0x00458e40) + (heap.u8(0x005f8da1) & 0x7f) * 4)));
      in_ECX = ((extraout_ECX_09) >>> 0);
      unaff_ESI = ((pbVar8) >>> 0);
      /* goto code_r0x00458c14 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458c14/code_r0x00458c14"); return 0;
    case 0x82:
      (regs.eax = FUN_00458bcf(heap));
      in_ECX = ((extraout_ECX_12) >>> 0);
      unaff_ESI = ((pbVar8) >>> 0);
      /* goto code_r0x00458c14 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458c14/code_r0x00458c14"); return 0;
    case 0x83:
      unaff_ESI = ((unaff_ESI + 3) >>> 0);
      (regs.eax = FUN_00458bcf(heap));
      in_ECX = ((extraout_ECX_13) >>> 0);
      /* goto code_r0x00458c14 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458c14/code_r0x00458c14"); return 0;
    case 0x84:
      pbVar9 = ((heap.u32(in_ECX)) >>> 0);
      in_ECX = ((in_ECX + ((2) * 2)) >>> 0);
      pbVar7 = ((unaff_EDI) >>> 0);
      do {
        unaff_EDI = ((pbVar7) >>> 0);
        bVar3 = ((heap.u8(pbVar9)) & 0xff);
        heap.setU32(unaff_EDI, (bVar3) & 0xffffffff);
        pbVar9 = ((pbVar9 + 1) >>> 0);
        unaff_ESI = ((pbVar8) >>> 0);
        pbVar7 = ((unaff_EDI + 1) >>> 0);
      } while (bVar3 != 0);
      /* goto code_r0x00458c14 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458c14/code_r0x00458c14"); return 0;
    case 0x85:
      (regs.eax = FUN_00458f25(heap));
      in_ECX = ((extraout_ECX_14) >>> 0);
      unaff_ESI = ((pbVar8) >>> 0);
      /* goto code_r0x00458c14 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458c14/code_r0x00458c14"); return 0;
    case 0x86:
      (regs.eax = FUN_00458f0f(heap));
      in_ECX = ((extraout_ECX_15) >>> 0);
      unaff_ESI = ((pbVar8) >>> 0);
      /* goto code_r0x00458c14 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458c14/code_r0x00458c14"); return 0;
    case 0x87:
      if (heap.u8(0x005f8d60) == 0) {
        (regs.eax = 0x1, regs.edi = 0xc, regs.eax = FUN_0045905e(heap));
        ppuVar5 = ((0x0064015b) >>> 0);
        in_ECX = ((extraout_ECX_10) >>> 0);
        pbVar9 = ((unaff_EDI) >>> 0);
      } else {
        (regs.eax = 0x1, regs.edi = 0xc, regs.eax = FUN_0045905e(heap));
        ppuVar5 = ((0x0064015f) >>> 0);
        in_ECX = ((extraout_ECX_11) >>> 0);
        pbVar9 = ((unaff_EDI) >>> 0);
      }
      break;
    case 0x88:
      in_ECX = ((in_ECX + ((1) * 2)) >>> 0);
      unaff_ESI = ((pbVar8) >>> 0);
      /* goto code_r0x00458c14 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458c14/code_r0x00458c14"); return 0;
    case 0x89:
      in_ECX = ((in_ECX + ((-1) * 2)) >>> 0);
      unaff_ESI = ((pbVar8) >>> 0);
      /* goto code_r0x00458c14 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458c14/code_r0x00458c14"); return 0;
    case 0x8a:
      if (heap.u16(in_ECX) / 0x3c != 0) {
        (regs.eax = FUN_00458f53(heap, heap.u16(in_ECX) % 0x3c));
        pbVar7 = ((0x00640176) >>> 0);
        pbVar9 = ((unaff_EDI) >>> 0);
        do {
          unaff_EDI = ((pbVar9) >>> 0);
          bVar3 = ((heap.u8(pbVar7)) & 0xff);
          heap.setU32(unaff_EDI, (bVar3) & 0xffffffff);
          pbVar7 = ((pbVar7 + 1) >>> 0);
          pbVar9 = ((unaff_EDI + 1) >>> 0);
        } while (bVar3 != 0);
      }
      (regs.eax = FUN_00458f53(heap));
      ppuVar5 = ((0x0064017b) >>> 0);
      in_ECX = ((extraout_ECX_07) >>> 0);
      pbVar9 = ((unaff_EDI) >>> 0);
      break;
    case 0x8b:
      uVar2 = ((heap.u16(in_ECX) / 0x3c) & 0xffff);
      if (uVar2 != 0) {
        uVar4 = ((((uVar2) >>> 0)) >>> 0);
        (regs.eax = FUN_00458f53(heap, uVar4, heap.u16(in_ECX) % 0x3c));
        pcVar6 = ((0x0064016a) >>> 0);
        pbVar9 = ((unaff_EDI) >>> 0);
        if (uVar4 == 1) {
          pcVar6 = ((0x00640164) >>> 0);
        }
        do {
          unaff_EDI = ((pbVar9) >>> 0);
          bVar3 = ((heap.i8(pcVar6)) & 0xff);
          heap.setU32(unaff_EDI, (bVar3) & 0xffffffff);
          pcVar6 = ((pcVar6 + 1) >>> 0);
          pbVar9 = ((unaff_EDI + 1) >>> 0);
        } while (bVar3 != 0);
      }
      (regs.eax = FUN_00458f53(heap));
      ppuVar5 = ((0x00640171) >>> 0);
      in_ECX = ((extraout_ECX_06) >>> 0);
      pbVar9 = ((unaff_EDI) >>> 0);
      break;
    case 0x8c:
      if (heap.u8(0x005f8d60) == 0) {
        (regs.eax = 0x1, regs.edi = 0xc, regs.eax = FUN_0045905e(heap));
        ppuVar5 = ((0x00640180) >>> 0);
        in_ECX = ((extraout_ECX_04) >>> 0);
        pbVar9 = ((unaff_EDI) >>> 0);
      } else {
        (regs.eax = 0x1, regs.edi = 0xc, regs.eax = FUN_0045905e(heap));
        ppuVar5 = ((0x00640183) >>> 0);
        in_ECX = ((extraout_ECX_05) >>> 0);
        pbVar9 = ((unaff_EDI) >>> 0);
      }
      break;
    case 0x8d:
      heap.setU32(unaff_EDI, (0x17) & 0xffffffff);
      uVar1 = ((heap.u32(in_ECX)) >>> 0);
      in_ECX = ((in_ECX + ((2) * 2)) >>> 0);
      heap.setU32((unaff_EDI + 1), (uVar1) & 0xffffffff);
      unaff_EDI = ((unaff_EDI + 5) >>> 0);
      unaff_ESI = ((pbVar8) >>> 0);
      /* goto code_r0x00458c14 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458c14/code_r0x00458c14"); return 0;
    default:
      break switchD_00458c5d_default;
  }
  do {
    unaff_EDI = ((pbVar9) >>> 0);
    bVar3 = ((heap.u8(ppuVar5)) & 0xff);
    heap.setU32(unaff_EDI, (bVar3) & 0xffffffff);
    ppuVar5 = (((((ppuVar5) >>> 0) + 1)) >>> 0);
    unaff_ESI = ((pbVar8) >>> 0);
    pbVar9 = ((unaff_EDI + 1) >>> 0);
  } while (bVar3 != 0);
  /* goto code_r0x00458c14 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458c14/code_r0x00458c14"); return 0;
  }
  heap.setU32(unaff_EDI, (bVar3) & 0xffffffff);
  unaff_EDI = ((unaff_EDI + 1) >>> 0);
  unaff_ESI = ((pbVar8) >>> 0);
  /* goto code_r0x00458c14 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00458c14/code_r0x00458c14"); return 0;
}
