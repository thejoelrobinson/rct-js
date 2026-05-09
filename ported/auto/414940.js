// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414940.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FreeEnvironmentStringsA, FreeEnvironmentStringsW, GetEnvironmentStrings, GetEnvironmentStringsW, WideCharToMultiByte } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004133c0 } from "./4133c0.js";
import { FUN_00413470 } from "./413470.js";
export function FUN_00414940(heap) {
  let cVar1 = 0;
  let WVar2 = 0;
  let pWVar3 = 0;
  let iVar5 = 0;
  let cbMultiByte = 0;
  let lpMultiByteStr = 0;
  let pCVar6 = 0;
  let pCVar7 = 0;
  let uVar8 = 0;
  let pCVar9 = 0;
  let lpWideCharStr = 0;
  let pCVar10 = 0;
  let pCVar11 = 0;
  let pWVar4 = 0;
  lpWideCharStr = ((0x0) >>> 0);
  pCVar9 = ((0x0) >>> 0);
  if (heap.u32(0x005f0018) == 0) {
    lpWideCharStr = ((GetEnvironmentStringsW(heap)) >>> 0);
    if (lpWideCharStr == 0x0) {
      pCVar9 = ((GetEnvironmentStrings(heap)) >>> 0);
      if (pCVar9 == 0x0) {
        return ((0x0) >>> 0);
      }
      heap.setU32(0x005f0018, (2) >>> 0);
    } else {
      heap.setU32(0x005f0018, (1) >>> 0);
    }
  }
  if (heap.u32(0x005f0018) == 1) {
    if ((lpWideCharStr != 0x0) || (lpWideCharStr = ((GetEnvironmentStringsW(heap)) >>> 0), lpWideCharStr != 0x0)) {
      WVar2 = ((heap.u32(lpWideCharStr)) >>> 0);
      pWVar3 = ((lpWideCharStr) >>> 0);
      while (WVar2 != 0) {
        do {
          pWVar4 = ((pWVar3) >>> 0);
          pWVar3 = ((pWVar4 + ((1) * 4)) >>> 0);
        } while (heap.i32(pWVar3) != 0);
        pWVar3 = ((pWVar4 + ((2) * 4)) >>> 0);
        WVar2 = ((heap.i32(pWVar3)) >>> 0);
      }
      iVar5 = (((((pWVar3) >>> 0) - ((lpWideCharStr) >>> 0) >>> 1) + 1) >>> 0);
      cbMultiByte = ((WideCharToMultiByte(heap, 0, 0, lpWideCharStr, iVar5, ((0x0) >>> 0), 0, ((0x0) >>> 0), ((0x0) >>> 0))) >>> 0);
      if ((cbMultiByte != 0) && (lpMultiByteStr = (((((regs.eax = FUN_004133c0(heap, cbMultiByte))) >>> 0)) >>> 0), lpMultiByteStr != ((0x0) >>> 0))) {
        iVar5 = ((WideCharToMultiByte(heap, 0, 0, lpWideCharStr, iVar5, lpMultiByteStr, cbMultiByte, ((0x0) >>> 0), ((0x0) >>> 0))) >>> 0);
        if (iVar5 == 0) {
          (regs.eax = FUN_00413470(heap, lpMultiByteStr));
          lpMultiByteStr = ((((0x0) >>> 0)) >>> 0);
        }
        FreeEnvironmentStringsW(heap, lpWideCharStr);
        return lpMultiByteStr;
      }
      FreeEnvironmentStringsW(heap, lpWideCharStr);
      return ((0x0) >>> 0);
    }
  } else {
    if ((heap.u32(0x005f0018) == 2) && ((pCVar9 != 0x0 || (pCVar9 = ((GetEnvironmentStrings(heap)) >>> 0), pCVar9 != 0x0)))) {
    cVar1 = ((heap.u32(pCVar9)) & 0xff);
    pCVar6 = ((pCVar9) >>> 0);
    while (cVar1 != 0) {
      do {
        pCVar10 = ((pCVar6) >>> 0);
        pCVar6 = ((pCVar10 + 1) >>> 0);
      } while (heap.u32(pCVar10 + (1) * 4) != 0);
      pCVar6 = ((pCVar10 + 2) >>> 0);
      cVar1 = ((heap.u32(pCVar10 + (2) * 4)) & 0xff);
    }
    pCVar6 = ((pCVar6 + (1 - ((pCVar9) >>> 0))) >>> 0);
    pCVar7 = (((regs.eax = FUN_004133c0(heap, pCVar6))) >>> 0);
    if (pCVar7 != 0x0) {
      pCVar10 = ((pCVar9) >>> 0);
      pCVar11 = ((pCVar7) >>> 0);
      for (uVar8 = ((((pCVar6) >>> 0) >>> 2) >>> 0); uVar8 != 0; uVar8 = (((uVar8 - 1) >>> 0)) >>> 0) {
        heap.setU32(pCVar11, (heap.u32(pCVar10)) & 0xffffffff);
        pCVar10 = ((pCVar10 + 4) >>> 0);
        pCVar11 = ((pCVar11 + ((4) * 4)) >>> 0);
      }
      for (uVar8 = ((((pCVar6) >>> 0) & 3) >>> 0); uVar8 != 0; uVar8 = (((uVar8 - 1) >>> 0)) >>> 0) {
        heap.setU32(pCVar11, (heap.u32(pCVar10)) & 0xffffffff);
        pCVar10 = ((pCVar10 + 1) >>> 0);
        pCVar11 = ((pCVar11 + ((1) * 4)) >>> 0);
      }
      FreeEnvironmentStringsA(heap, pCVar9);
      return pCVar7;
    }
    FreeEnvironmentStringsA(heap, pCVar9);
    return ((0x0) >>> 0);
  }
  }
  return ((0x0) >>> 0);
}
