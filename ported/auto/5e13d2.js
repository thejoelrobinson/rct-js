// @manual — do not regenerate.
// Source: decompiled/c/5e13d2.c
//
// HAND-FIX (recursion register-state preservation):
// The Ghidra auto-translation reads `in_AX/in_DX/unaff_BX/unaff_BP/unaff_ESI`
// from `regs.eax/edx/ebx/ebp/esi` at function entry. The original x86 at
// 0x5e1426/0x5e1451/0x5e147d/0x5e14ab pushes those registers around each
// recursive call (and assigns the appropriate new DX or BP value before the
// call), then pops them back. The auto-translation did neither: it called
// `FUN_005e13d2(heap)` with whatever values happened to be in `regs` from
// prior work, so the recursion saw garbage inputs, never reached a base
// case, and overflowed the JS stack.
//
// Fix: before each recursive call, set regs.eax/edx/ebx/ebp/esi to match
// the binary's pre-call register state (see objdump 0x5e1420..0x5e14b0).
// After the call, the JS locals are already preserved (they're stack
// locals, untouched by the call); the regs object is reloaded only as
// needed for subsequent operations in this function (the auto-translated
// body that follows doesn't read regs directly).
//
// Per-site register modifications mirroring the binary:
//   Site 1 (line 30, AX < puVar11[0x66]):   dx = puVar11[0x66]              (movw 0x20(%edi),%dx)
//   Site 2 (line 35, sum < DX):              dx = puVar11[0x66]+puVar11[0x67] (movw %cx,%dx)
//   Site 3 (line 40, BX < puVar11[0x19a]):   bp = puVar11[0x19a]            (movw 0x22(%edi),%bp)
//   Site 4 (line 47, BP > sum):              bp = puVar11[0x19a]+puVar11[0x19e]

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_005e13d2(heap) {
  let puVar1 = 0;
  let iVar2 = 0;
  let sVar3 = 0;
  let sVar4 = 0;
  let sVar5 = 0;
  let sVar6 = 0;
  let sVar7 = 0;
  let in_AX = regs.eax & 0xffff;
  let sVar8 = 0;
  let sVar9 = 0;
  let in_DX = regs.edx & 0xffff;
  let unaff_BX = regs.ebx & 0xffff;
  let unaff_BP = regs.ebp & 0xffff;
  let unaff_ESI = regs.esi >>> 0;
  let puVar10 = 0;
  let puVar11 = 0;
  puVar10 = ((unaff_ESI) >>> 0);
  while (puVar11 = ((puVar10) >>> 0), sVar7 = ((heap.u32(0x0099fb98)) & 0xffff), sVar6 = ((heap.u32(0x0099fb96)) & 0xffff), sVar5 = ((heap.u32(0x0099fb94)) & 0xffff), sVar4 = ((heap.u32(0x0099fb92)) & 0xffff), sVar3 = ((heap.u32(0x0099fb90)) & 0xffff), iVar2 = ((heap.u32(0x0099fb8c)) >>> 0), puVar10 = ((puVar11 + ((0x5e) * 4)) >>> 0), puVar10 < heap.u32(0x009a1164)) {
    if ((((heap.i16((puVar11 + ((0x66) * 4))) < in_DX) && (heap.i16((((puVar11) | 0) + 0x19a)) < unaff_BP)) && (in_AX < (((heap.i16((puVar11 + ((0x66) * 4))) + heap.i16((puVar11 + ((0x67) * 4))))) << 16 >> 16))) && ((unaff_BX < (((heap.i16((((puVar11) | 0) + 0x19a)) + heap.i16((((puVar11) | 0) + 0x19e)))) << 16 >> 16) && ((heap.u16((((puVar11) | 0) + 0x1aa)) & 0x10) == 0)))) {
      if (in_AX < heap.i16((puVar11 + ((0x66) * 4)))) {
        // Site 1 (0x5e1426): movw 0x20(%edi),%dx ; pushw bx/dx/bp + pushl edi/esi ; call
        regs.eax = (in_AX) & 0xffff;
        regs.edx = (heap.i16((puVar11 + ((0x66) * 4)))) & 0xffff;
        regs.ebx = (unaff_BX) & 0xffff;
        regs.ebp = (unaff_BP) & 0xffff;
        regs.esi = (unaff_ESI) >>> 0;
        (regs.eax = FUN_005e13d2(heap));
        // pops restore bx/dx/bp/edi/esi; locals already hold those values.
        in_AX = ((heap.i16((puVar11 + ((0x66) * 4)))) & 0xffff);
        puVar10 = ((unaff_ESI) >>> 0);
      } else {
        if ((((heap.i16((puVar11 + ((0x66) * 4))) + heap.i16((puVar11 + ((0x67) * 4))))) << 16 >> 16) < in_DX) {
        // Site 2 (0x5e1451): movw %cx,%dx (cx = 0x66+0x67) ; pushw bx/dx/bp + pushl edi/esi ; call
        regs.eax = (in_AX) & 0xffff;
        regs.edx = ((heap.i16((puVar11 + ((0x66) * 4))) + heap.i16((puVar11 + ((0x67) * 4)))) & 0xffff);
        regs.ebx = (unaff_BX) & 0xffff;
        regs.ebp = (unaff_BP) & 0xffff;
        regs.esi = (unaff_ESI) >>> 0;
        (regs.eax = FUN_005e13d2(heap));
        in_AX = ((heap.i16((puVar11 + ((0x66) * 4))) + heap.i16((puVar11 + ((0x67) * 4)))) & 0xffff);
        puVar10 = ((unaff_ESI) >>> 0);
      } else {
        if (unaff_BX < heap.i16((((puVar11) | 0) + 0x19a))) {
        // Site 3 (0x5e147d): movw 0x22(%edi),%bp ; pushw ax/dx/bp + pushl edi/esi ; call
        regs.eax = (in_AX) & 0xffff;
        regs.edx = (in_DX) & 0xffff;
        regs.ebx = (unaff_BX) & 0xffff;
        regs.ebp = (heap.i16((((puVar11) | 0) + 0x19a))) & 0xffff;
        regs.esi = (unaff_ESI) >>> 0;
        (regs.eax = FUN_005e13d2(heap));
        unaff_BX = ((heap.i16((((puVar11) | 0) + 0x19a))) & 0xffff);
        puVar10 = ((unaff_ESI) >>> 0);
      } else {
        if (unaff_BP <= (((heap.i16((((puVar11) | 0) + 0x19a)) + heap.i16((((puVar11) | 0) + 0x19e)))) << 16 >> 16)) {
          return;
        }
        // Site 4 (0x5e14ab): movw %cx,%bp (cx = 0x19a+0x19e) ; pushw ax/dx/bp + pushl edi/esi ; call
        regs.eax = (in_AX) & 0xffff;
        regs.edx = (in_DX) & 0xffff;
        regs.ebx = (unaff_BX) & 0xffff;
        regs.ebp = ((heap.i16((((puVar11) | 0) + 0x19a)) + heap.i16((((puVar11) | 0) + 0x19e))) & 0xffff);
        regs.esi = (unaff_ESI) >>> 0;
        (regs.eax = FUN_005e13d2(heap));
        unaff_BX = ((heap.i16((((puVar11) | 0) + 0x19a)) + heap.i16((((puVar11) | 0) + 0x19e))) & 0xffff);
        puVar10 = ((unaff_ESI) >>> 0);
      }
      }
      }
    }
  }
  sVar9 = ((heap.i16((unaff_ESI + ((8) * 4)))) & 0xffff);
  if (in_AX < sVar9) {
    in_AX = ((sVar9) & 0xffff);
  }
  if ((((sVar9 + heap.i16((unaff_ESI + ((9) * 4))))) << 16 >> 16) < in_DX) {
    in_DX = ((sVar9 + heap.i16((unaff_ESI + ((9) * 4)))) & 0xffff);
  }
  sVar9 = ((heap.i16((((unaff_ESI) | 0) + 0x22))) & 0xffff);
  if (unaff_BX < sVar9) {
    unaff_BX = ((sVar9) & 0xffff);
  }
  sVar9 = ((sVar9 + heap.i16((((unaff_ESI) | 0) + 0x26))) & 0xffff);
  if (sVar9 < unaff_BP) {
    unaff_BP = ((sVar9) & 0xffff);
  }
  if ((in_DX <= in_AX) || (unaff_BP <= unaff_BX)) {
    return;
  }
  do {
    LAB_005e1637: {
    sVar9 = ((in_AX - sVar3) & 0xffff);
    heap.setU32(0x0099fb8c, (iVar2) >>> 0);
    heap.setU32(0x0099fb90, (sVar3) >>> 0);
    heap.setU32(0x0099fb94, (sVar5) >>> 0);
    heap.setU32(0x0099fb98, (sVar7) >>> 0);
    // HAND-FIX (goto-as-return): C has `goto LAB_005e1566` from the else-branch
    // (re-clip with the advanced x-window). The translator emitted `return 0`,
    // leaving the clip incomplete → the caller looped forever calling 5e13d2
    // (gameplay hang after ~150 ticks). Restructure the if/else as a labeled
    // while so the goto becomes `continue LAB_005e1566`; the clip body and its
    // `break LAB_005e1637` (which exits to the inner do-while) are unchanged.
    let _doClip = (sVar9 == 0 || in_AX < sVar3);
    LAB_005e1566: while (true) {
     if (_doClip) {
      sVar9 = ((heap.u32(0x0099fb94)) & 0xffff);
      sVar8 = (((heap.u32(0x0099fb90) + heap.u32(0x0099fb94)) - in_DX) & 0xffff);
      if (sVar8 != 0 && in_DX <= (((heap.u32(0x0099fb90) + heap.u32(0x0099fb94))) << 16 >> 16)) {
        heap.setU32(0x0099fb94, (heap.u32(0x0099fb94) - sVar8) >>> 0);
        if (heap.u32(0x0099fb94) == 0 || sVar9 < sVar8) {
          break LAB_005e1637;
        }
        heap.setU32(0x0099fb98, (heap.u32(0x0099fb98) + sVar8) >>> 0);
      }
      sVar9 = ((unaff_BX - sVar4) & 0xffff);
      heap.setU32(0x0099fb92, (sVar4) >>> 0);
      heap.setU32(0x0099fb96, (sVar6) >>> 0);
      if (sVar9 != 0 && sVar4 <= unaff_BX) {
        heap.setU32(0x0099fb92, (sVar4 + sVar9) >>> 0);
        heap.setU32(0x0099fb96, (sVar6 - sVar9) >>> 0);
        if (heap.u32(0x0099fb96) == 0 || sVar6 < sVar9) {
          break LAB_005e1637;
        }
        heap.setU32(0x0099fb8c, (heap.u32(0x0099fb8c) + ((heap.u32(0x0099fb94) + heap.u32(0x0099fb98)) >>> 0) * ((sVar9) | 0)) >>> 0);
      }
      sVar9 = ((heap.u32(0x0099fb96)) & 0xffff);
      sVar8 = (((heap.u32(0x0099fb92) + heap.u32(0x0099fb96)) - unaff_BP) & 0xffff);
      if ((sVar8 == 0 || (((heap.u32(0x0099fb92) + heap.u32(0x0099fb96))) << 16 >> 16) < unaff_BP) || (heap.setU32(0x0099fb96, (heap.u32(0x0099fb96) - sVar8) >>> 0), heap.u32(0x0099fb96) != 0 && sVar8 <= sVar9)) {
        heap.setU32(0x009a0129, (heap.u16((0x009a1517 + (heap.u8((heap.u32(unaff_ESI + (7) * 4) + 1)) & 0x7f) * 2))) >>> 0);
        (regs.eax = callIndirect(heap, heap.u32(unaff_ESI)));
        (regs.eax = callIndirect(heap, heap.u32(unaff_ESI)));
      }
      break;
     } else {
      heap.setU32(0x0099fb90, (sVar3 + sVar9) >>> 0);
      heap.setU32(0x0099fb94, (sVar5 - sVar9) >>> 0);
      if (heap.u32(0x0099fb94) != 0 && sVar9 <= sVar5) {
        heap.setU32(0x0099fb98, (sVar7 + sVar9) >>> 0);
        heap.setU32(0x0099fb8c, (iVar2 + sVar9) >>> 0);
        _doClip = true; continue LAB_005e1566;  // C: goto LAB_005e1566
      }
      break;
     }
    }
    }
    do {
      puVar10 = ((unaff_ESI + ((0x5e) * 4)) >>> 0);
      if (heap.u32(0x009a1164) <= puVar10) {
        heap.setU32(0x0099fb8c, (iVar2) >>> 0);
        heap.setU32(0x0099fb90, (sVar3) >>> 0);
        heap.setU32(0x0099fb92, (sVar4) >>> 0);
        heap.setU32(0x0099fb94, (sVar5) >>> 0);
        heap.setU32(0x0099fb96, (sVar6) >>> 0);
        heap.setU32(0x0099fb98, (sVar7) >>> 0);
        return;
      }
      puVar1 = (((((unaff_ESI) | 0) + 0x1aa)) >>> 0);
      unaff_ESI = ((puVar10) >>> 0);
    } while ((heap.u16(puVar1) & 0x10) == 0);
  } while (true);
}
