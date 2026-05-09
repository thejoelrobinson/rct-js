// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/415210.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetModuleFileNameA, GetStdHandle, WriteFile, _strncpy } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004175f0 } from "./4175f0.js";
export function FUN_00415210(heap, param_1) {
  const __sp = heap.allocFrame(1204);
  const __addr_local_1a8 = __sp + 0;
  const __addr_local_1a4 = __sp + 4;
  const __addr_acStack_140 = __sp + 104;
  const __addr_local_104 = __sp + 164;
  try {
  let cVar1 = 0;
  let ppuVar2 = 0;
  let DVar3 = 0;
  let hFile = 0;
  let iVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let pcVar7 = 0;
  let iVar8 = 0;
  let pcVar9 = 0;
  let pCVar10 = 0;
  let pcVar11 = 0;
  ppuVar2 = ((0x005ec470) >>> 0);
  iVar8 = ((0) >>> 0);
  do {
    if (param_1 == heap.u32(ppuVar2)) {
      break;
    }
    ppuVar2 = ((ppuVar2 + ((2) * 4)) >>> 0);
    iVar8 = ((iVar8 + 1) >>> 0);
  } while (ppuVar2 < 0x005ec500);
  if (param_1 == heap.u32((0x005ec470) + (iVar8 * 2) * 4)) {
    if ((heap.u32(0x005efeb4) == 1) || ((heap.u32(0x005efeb4) == 0 && (heap.u32(0x005ec264) == 1)))) {
      if ((heap.u32(0x005f3e60) == 0) || (hFile = ((heap.u32((heap.u32(0x005f3e60) + 0x10))) >>> 0), hFile == 0xffffffff)) {
        hFile = ((GetStdHandle(heap, 0xfffffff4)) >>> 0);
      }
      pcVar7 = ((heap.u32((iVar8 * 8 + 0x5ec474))) >>> 0);
      uVar5 = ((0xffffffff) >>> 0);
      pcVar9 = ((pcVar7) >>> 0);
      do {
        if (uVar5 == 0) {
          break;
        }
        uVar5 = ((uVar5 - 1) >>> 0);
        cVar1 = ((heap.i8(pcVar9)) & 0xff);
        pcVar9 = ((pcVar9 + 1) >>> 0);
      } while (cVar1 != 0);
      WriteFile(heap, hFile, pcVar7, ~uVar5 - 1, __addr_local_1a8, ((0x0) >>> 0));
    } else {
      if (param_1 != 0xfc) {
      DVar3 = ((GetModuleFileNameA(heap, ((0x0) >>> 0), __addr_local_104, 0x104)) >>> 0);
      if (DVar3 == 0) {
        pcVar7 = (("<program name unknown>") >>> 0);
        pCVar10 = ((__addr_local_104) >>> 0);
        for (iVar4 = ((5) >>> 0); iVar4 != 0; iVar4 = (((iVar4 + -1) >>> 0)) >>> 0) {
          heap.setU32(pCVar10, (heap.u32(pcVar7)) & 0xffffffff);
          pcVar7 = ((pcVar7 + 4) >>> 0);
          pCVar10 = ((pCVar10 + ((4) * 4)) >>> 0);
        }
        heap.setU16(pCVar10, (heap.u16(pcVar7)) & 0xffff);
        heap.setI32((pCVar10 + (2) * 4), (heap.i8(pcVar7 + (2))) & 0xffffffff);
      }
      uVar5 = ((0xffffffff) >>> 0);
      pcVar7 = ((__addr_local_104) >>> 0);
      pcVar9 = ((__addr_local_104) >>> 0);
      do {
        if (uVar5 == 0) {
          break;
        }
        uVar5 = ((uVar5 - 1) >>> 0);
        cVar1 = ((heap.i8(pcVar9)) & 0xff);
        pcVar9 = ((pcVar9 + 1) >>> 0);
      } while (cVar1 != 0);
      if (0x3c < ~uVar5) {
        uVar5 = ((0xffffffff) >>> 0);
        pcVar7 = ((__addr_local_104) >>> 0);
        do {
          if (uVar5 == 0) {
            break;
          }
          uVar5 = ((uVar5 - 1) >>> 0);
          cVar1 = ((heap.i8(pcVar7)) & 0xff);
          pcVar7 = ((pcVar7 + 1) >>> 0);
        } while (cVar1 != 0);
        pcVar7 = ((__addr_acStack_140 + ~uVar5) >>> 0);
        _strncpy(heap, pcVar7, "...", 3);
      }
      pcVar9 = (("Runtime Error!\n\nProgram: ") >>> 0);
      pcVar11 = ((__addr_local_1a4) >>> 0);
      for (iVar4 = ((6) >>> 0); iVar4 != 0; iVar4 = (((iVar4 + -1) >>> 0)) >>> 0) {
        heap.setU32(pcVar11, (heap.u32(pcVar9)) & 0xffffffff);
        pcVar9 = ((pcVar9 + 4) >>> 0);
        pcVar11 = ((pcVar11 + 4) >>> 0);
      }
      heap.setU16(pcVar11, (heap.u16(pcVar9)) & 0xffff);
      uVar5 = ((0xffffffff) >>> 0);
      do {
        pcVar9 = ((pcVar7) >>> 0);
        if (uVar5 == 0) {
          break;
        }
        uVar5 = ((uVar5 - 1) >>> 0);
        pcVar9 = ((pcVar7 + 1) >>> 0);
        cVar1 = ((heap.i8(pcVar7)) & 0xff);
        pcVar7 = ((pcVar9) >>> 0);
      } while (cVar1 != 0);
      uVar5 = ((~uVar5) >>> 0);
      iVar4 = ((-1) >>> 0);
      pcVar7 = ((__addr_local_1a4) >>> 0);
      do {
        pcVar11 = ((pcVar7) >>> 0);
        if (iVar4 == 0) {
          break;
        }
        iVar4 = ((iVar4 + -1) >>> 0);
        pcVar11 = ((pcVar7 + 1) >>> 0);
        cVar1 = ((heap.i8(pcVar7)) & 0xff);
        pcVar7 = ((pcVar11) >>> 0);
      } while (cVar1 != 0);
      pcVar7 = ((pcVar9 + -uVar5) >>> 0);
      pcVar9 = ((pcVar11 + -1) >>> 0);
      for (uVar6 = ((uVar5 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
        heap.setU32(pcVar9, (heap.u32(pcVar7)) & 0xffffffff);
        pcVar7 = ((pcVar7 + 4) >>> 0);
        pcVar9 = ((pcVar9 + 4) >>> 0);
      }
      for (uVar5 = ((uVar5 & 3) >>> 0); uVar5 != 0; uVar5 = (((uVar5 - 1) >>> 0)) >>> 0) {
        heap.setU32(pcVar9, (heap.i8(pcVar7)) & 0xffffffff);
        pcVar7 = ((pcVar7 + 1) >>> 0);
        pcVar9 = ((pcVar9 + 1) >>> 0);
      }
      uVar5 = ((0xffffffff) >>> 0);
      pcVar7 = (("\n\n") >>> 0);
      do {
        pcVar9 = ((pcVar7) >>> 0);
        if (uVar5 == 0) {
          break;
        }
        uVar5 = ((uVar5 - 1) >>> 0);
        pcVar9 = ((pcVar7 + 1) >>> 0);
        cVar1 = ((heap.i8(pcVar7)) & 0xff);
        pcVar7 = ((pcVar9) >>> 0);
      } while (cVar1 != 0);
      uVar5 = ((~uVar5) >>> 0);
      iVar4 = ((-1) >>> 0);
      pcVar7 = ((__addr_local_1a4) >>> 0);
      do {
        pcVar11 = ((pcVar7) >>> 0);
        if (iVar4 == 0) {
          break;
        }
        iVar4 = ((iVar4 + -1) >>> 0);
        pcVar11 = ((pcVar7 + 1) >>> 0);
        cVar1 = ((heap.i8(pcVar7)) & 0xff);
        pcVar7 = ((pcVar11) >>> 0);
      } while (cVar1 != 0);
      pcVar7 = ((pcVar9 + -uVar5) >>> 0);
      pcVar9 = ((pcVar11 + -1) >>> 0);
      for (uVar6 = ((uVar5 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
        heap.setU32(pcVar9, (heap.u32(pcVar7)) & 0xffffffff);
        pcVar7 = ((pcVar7 + 4) >>> 0);
        pcVar9 = ((pcVar9 + 4) >>> 0);
      }
      for (uVar5 = ((uVar5 & 3) >>> 0); uVar5 != 0; uVar5 = (((uVar5 - 1) >>> 0)) >>> 0) {
        heap.setU32(pcVar9, (heap.i8(pcVar7)) & 0xffffffff);
        pcVar7 = ((pcVar7 + 1) >>> 0);
        pcVar9 = ((pcVar9 + 1) >>> 0);
      }
      uVar5 = ((0xffffffff) >>> 0);
      pcVar7 = ((heap.u32((iVar8 * 8 + 0x5ec474))) >>> 0);
      do {
        pcVar9 = ((pcVar7) >>> 0);
        if (uVar5 == 0) {
          break;
        }
        uVar5 = ((uVar5 - 1) >>> 0);
        pcVar9 = ((pcVar7 + 1) >>> 0);
        cVar1 = ((heap.i8(pcVar7)) & 0xff);
        pcVar7 = ((pcVar9) >>> 0);
      } while (cVar1 != 0);
      uVar5 = ((~uVar5) >>> 0);
      iVar8 = ((-1) >>> 0);
      pcVar7 = ((__addr_local_1a4) >>> 0);
      do {
        pcVar11 = ((pcVar7) >>> 0);
        if (iVar8 == 0) {
          break;
        }
        iVar8 = ((iVar8 + -1) >>> 0);
        pcVar11 = ((pcVar7 + 1) >>> 0);
        cVar1 = ((heap.i8(pcVar7)) & 0xff);
        pcVar7 = ((pcVar11) >>> 0);
      } while (cVar1 != 0);
      pcVar7 = ((pcVar9 + -uVar5) >>> 0);
      pcVar9 = ((pcVar11 + -1) >>> 0);
      for (uVar6 = ((uVar5 >>> 2) >>> 0); uVar6 != 0; uVar6 = (((uVar6 - 1) >>> 0)) >>> 0) {
        heap.setU32(pcVar9, (heap.u32(pcVar7)) & 0xffffffff);
        pcVar7 = ((pcVar7 + 4) >>> 0);
        pcVar9 = ((pcVar9 + 4) >>> 0);
      }
      for (uVar5 = ((uVar5 & 3) >>> 0); uVar5 != 0; uVar5 = (((uVar5 - 1) >>> 0)) >>> 0) {
        heap.setU32(pcVar9, (heap.i8(pcVar7)) & 0xffffffff);
        pcVar7 = ((pcVar7 + 1) >>> 0);
        pcVar9 = ((pcVar9 + 1) >>> 0);
      }
      return (regs.eax = FUN_004175f0(heap, __addr_local_1a4, "Microsoft Visual C++ Runtime Library"));
    }
    }
  }
  return;
} finally {
    heap.freeFrame(1204);
  }
}
