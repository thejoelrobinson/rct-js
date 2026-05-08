// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/414940.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { FreeEnvironmentStringsA, FreeEnvironmentStringsW, GetEnvironmentStrings, GetEnvironmentStringsW, WideCharToMultiByte } from "../../runtime/win32.js";
import { FUN_004133c0 } from "./4133c0.js";
import { FUN_00413470 } from "./413470.js";
export function FUN_00414940(heap) {
  let cVar1 = 0;
  let WVar2 = 0;
  let iVar5 = 0;
  let cbMultiByte = 0;
  let lpMultiByteStr = 0;
  let pCVar6 = 0;
  let uVar8 = 0;
  let pCVar9 = 0;
  let lpWideCharStr = 0;
  let pCVar10 = 0;
  lpWideCharStr = 0x0;
  pCVar9 = 0x0;
  if (heap.u32(0x005f0018) == 0) {
    lpWideCharStr = GetEnvironmentStringsW(heap);
    if (lpWideCharStr == 0x0) {
      pCVar9 = GetEnvironmentStrings(heap);
      if (pCVar9 == 0x0) {
        return 0x0;
      }
      heap.setU32(0x005f0018, (2) >>> 0);
    } else {
      heap.setU32(0x005f0018, (1) >>> 0);
    }
  }
  if (heap.u32(0x005f0018) == 1) {
    if ((lpWideCharStr != 0x0) || (lpWideCharStr = GetEnvironmentStringsW(heap), lpWideCharStr != 0x0)) {
      WVar2 = heap.u32(lpWideCharStr);
      pWVar3 = lpWideCharStr;
      while (WVar2 != L'\0') {
        do {
          pWVar4 = pWVar3;
          pWVar3 = pWVar4 + 1;
        } while (heap.u32(pWVar3) != L'\0');
        pWVar3 = pWVar4 + 2;
        WVar2 = heap.u32(pWVar3);
      }
      iVar5 = (pWVar3 - lpWideCharStr >>> 1) + 1;
      cbMultiByte = WideCharToMultiByte(heap, 0, 0, lpWideCharStr, iVar5, 0x0, 0, 0x0, 0x0);
      if ((cbMultiByte != 0) && (lpMultiByteStr = FUN_004133c0(heap, cbMultiByte), lpMultiByteStr != 0x0)) {
        iVar5 = WideCharToMultiByte(heap, 0, 0, lpWideCharStr, iVar5, lpMultiByteStr, cbMultiByte, 0x0, 0x0);
        if (iVar5 == 0) {
          FUN_00413470(heap, lpMultiByteStr);
          lpMultiByteStr = 0x0;
        }
        FreeEnvironmentStringsW(heap, lpWideCharStr);
        return lpMultiByteStr;
      }
      FreeEnvironmentStringsW(heap, lpWideCharStr);
      return 0x0;
    }
  } else {
    if ((heap.u32(0x005f0018) == 2) && ((pCVar9 != 0x0 || (pCVar9 = GetEnvironmentStrings(heap), pCVar9 != 0x0)))) {
    cVar1 = heap.u32(pCVar9);
    pCVar6 = pCVar9;
    while (cVar1 != '\0') {
      do {
        pCVar10 = pCVar6;
        pCVar6 = pCVar10 + 1;
      } while (heap.u32(pCVar10 + (1) * 4) != '\0');
      pCVar6 = pCVar10 + 2;
      cVar1 = heap.u32(pCVar10 + (2) * 4);
    }
    pCVar6 = pCVar6 + (1 - pCVar9);
    pCVar7 = FUN_004133c0(heap, pCVar6);
    if (pCVar7 != 0x0) {
      pCVar10 = pCVar9;
      pCVar11 = pCVar7;
      for (uVar8 = pCVar6 >>> 2; uVar8 != 0; uVar8 = uVar8 - 1) {
        heap.u32(pCVar11) = heap.u32(pCVar10);
        pCVar10 = pCVar10 + 4;
        pCVar11 = pCVar11 + 4;
      }
      for (uVar8 = pCVar6 & 3; uVar8 != 0; uVar8 = uVar8 - 1) {
        heap.u32(pCVar11) = heap.u32(pCVar10);
        pCVar10 = pCVar10 + 1;
        pCVar11 = pCVar11 + 1;
      }
      FreeEnvironmentStringsA(heap, pCVar9);
      return pCVar7;
    }
    FreeEnvironmentStringsA(heap, pCVar9);
    return 0x0;
  }
  }
  return 0x0;
}
