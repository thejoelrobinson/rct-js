// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/415210.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetModuleFileNameA, GetStdHandle, WriteFile } from "../../runtime/win32.js";
import { FUN_004175f0 } from "./4175f0.js";
export function FUN_00415210(heap, param_1) {
  const __sp = heap.allocFrame(432);
  const __addr_DAT_005ec470 = __sp + 0;
  const __addr_PTR_LOOP_005ec500 = __sp + 4;
  const __addr_local_1a8 = __sp + 8;
  const __addr_local_1a4 = __sp + 12;
  const __addr_acStack_140 = __sp + 112;
  const __addr_local_104 = __sp + 172;
  try {
  let cVar1 = 0;
  let DVar3 = 0;
  let hFile = 0;
  let iVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let iVar8 = 0;
  ppuVar2 = __addr_DAT_005ec470;
  iVar8 = 0;
  do {
    if (param_1 == heap.u32(ppuVar2)) {
      break;
    }
    ppuVar2 = ppuVar2 + 2;
    iVar8 = iVar8 + 1;
  } while (ppuVar2 < __addr_PTR_LOOP_005ec500);
  if (param_1 == heap.u32((__addr_DAT_005ec470) + (iVar8 * 2) * 4)) {
    if ((heap.u32(0x005efeb4) == 1) || ((heap.u32(0x005efeb4) == 0 && (heap.u32(0x005ec264) == 1)))) {
      if ((heap.u32(0x005f3e60) == 0) || (hFile = heap.u32((heap.u32(0x005f3e60) + 0x10)), hFile == 0xffffffff)) {
        hFile = GetStdHandle(heap, 0xfffffff4);
      }
      pcVar7 = heap.u32((iVar8 * 8 + 0x5ec474));
      uVar5 = 0xffffffff;
      pcVar9 = pcVar7;
      do {
        if (uVar5 == 0) {
          break;
        }
        uVar5 = uVar5 - 1;
        cVar1 = heap.u32(pcVar9);
        pcVar9 = pcVar9 + 1;
      } while (cVar1 != '\0');
      WriteFile(heap, hFile, pcVar7, ~uVar5 - 1, __addr_local_1a8, 0x0);
    } else {
      if (param_1 != 0xfc) {
      DVar3 = GetModuleFileNameA(heap, 0x0, __addr_local_104, 0x104);
      if (DVar3 == 0) {
        pcVar7 = "<program name unknown>";
        pCVar10 = __addr_local_104;
        for (iVar4 = 5; iVar4 != 0; iVar4 = iVar4 + -1) {
          heap.u32(pCVar10) = heap.u32(pcVar7);
          pcVar7 = pcVar7 + 4;
          pCVar10 = pCVar10 + 4;
        }
        heap.u32(pCVar10) = heap.u32(pcVar7);
        heap.u32(pCVar10 + (2) * 4) = heap.u32(pcVar7 + (2) * 4);
      }
      uVar5 = 0xffffffff;
      pcVar7 = __addr_local_104;
      pcVar9 = __addr_local_104;
      do {
        if (uVar5 == 0) {
          break;
        }
        uVar5 = uVar5 - 1;
        cVar1 = heap.u32(pcVar9);
        pcVar9 = pcVar9 + 1;
      } while (cVar1 != '\0');
      if (0x3c < ~uVar5) {
        uVar5 = 0xffffffff;
        pcVar7 = __addr_local_104;
        do {
          if (uVar5 == 0) {
            break;
          }
          uVar5 = uVar5 - 1;
          cVar1 = heap.u32(pcVar7);
          pcVar7 = pcVar7 + 1;
        } while (cVar1 != '\0');
        pcVar7 = __addr_acStack_140 + ~uVar5;
        _strncpy(pcVar7, "...", 3);
      }
      pcVar9 = "Runtime Error!\n\nProgram: ";
      pcVar11 = __addr_local_1a4;
      for (iVar4 = 6; iVar4 != 0; iVar4 = iVar4 + -1) {
        heap.u32(pcVar11) = heap.u32(pcVar9);
        pcVar9 = pcVar9 + 4;
        pcVar11 = pcVar11 + 4;
      }
      heap.u32(pcVar11) = heap.u32(pcVar9);
      uVar5 = 0xffffffff;
      do {
        pcVar9 = pcVar7;
        if (uVar5 == 0) {
          break;
        }
        uVar5 = uVar5 - 1;
        pcVar9 = pcVar7 + 1;
        cVar1 = heap.u32(pcVar7);
        pcVar7 = pcVar9;
      } while (cVar1 != '\0');
      uVar5 = ~uVar5;
      iVar4 = -1;
      pcVar7 = __addr_local_1a4;
      do {
        pcVar11 = pcVar7;
        if (iVar4 == 0) {
          break;
        }
        iVar4 = iVar4 + -1;
        pcVar11 = pcVar7 + 1;
        cVar1 = heap.u32(pcVar7);
        pcVar7 = pcVar11;
      } while (cVar1 != '\0');
      pcVar7 = pcVar9 + -uVar5;
      pcVar9 = pcVar11 + -1;
      for (uVar6 = uVar5 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
        heap.u32(pcVar9) = heap.u32(pcVar7);
        pcVar7 = pcVar7 + 4;
        pcVar9 = pcVar9 + 4;
      }
      for (uVar5 = uVar5 & 3; uVar5 != 0; uVar5 = uVar5 - 1) {
        heap.u32(pcVar9) = heap.u32(pcVar7);
        pcVar7 = pcVar7 + 1;
        pcVar9 = pcVar9 + 1;
      }
      uVar5 = 0xffffffff;
      pcVar7 = "\n\n";
      do {
        pcVar9 = pcVar7;
        if (uVar5 == 0) {
          break;
        }
        uVar5 = uVar5 - 1;
        pcVar9 = pcVar7 + 1;
        cVar1 = heap.u32(pcVar7);
        pcVar7 = pcVar9;
      } while (cVar1 != '\0');
      uVar5 = ~uVar5;
      iVar4 = -1;
      pcVar7 = __addr_local_1a4;
      do {
        pcVar11 = pcVar7;
        if (iVar4 == 0) {
          break;
        }
        iVar4 = iVar4 + -1;
        pcVar11 = pcVar7 + 1;
        cVar1 = heap.u32(pcVar7);
        pcVar7 = pcVar11;
      } while (cVar1 != '\0');
      pcVar7 = pcVar9 + -uVar5;
      pcVar9 = pcVar11 + -1;
      for (uVar6 = uVar5 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
        heap.u32(pcVar9) = heap.u32(pcVar7);
        pcVar7 = pcVar7 + 4;
        pcVar9 = pcVar9 + 4;
      }
      for (uVar5 = uVar5 & 3; uVar5 != 0; uVar5 = uVar5 - 1) {
        heap.u32(pcVar9) = heap.u32(pcVar7);
        pcVar7 = pcVar7 + 1;
        pcVar9 = pcVar9 + 1;
      }
      uVar5 = 0xffffffff;
      pcVar7 = heap.u32((iVar8 * 8 + 0x5ec474));
      do {
        pcVar9 = pcVar7;
        if (uVar5 == 0) {
          break;
        }
        uVar5 = uVar5 - 1;
        pcVar9 = pcVar7 + 1;
        cVar1 = heap.u32(pcVar7);
        pcVar7 = pcVar9;
      } while (cVar1 != '\0');
      uVar5 = ~uVar5;
      iVar8 = -1;
      pcVar7 = __addr_local_1a4;
      do {
        pcVar11 = pcVar7;
        if (iVar8 == 0) {
          break;
        }
        iVar8 = iVar8 + -1;
        pcVar11 = pcVar7 + 1;
        cVar1 = heap.u32(pcVar7);
        pcVar7 = pcVar11;
      } while (cVar1 != '\0');
      pcVar7 = pcVar9 + -uVar5;
      pcVar9 = pcVar11 + -1;
      for (uVar6 = uVar5 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
        heap.u32(pcVar9) = heap.u32(pcVar7);
        pcVar7 = pcVar7 + 4;
        pcVar9 = pcVar9 + 4;
      }
      for (uVar5 = uVar5 & 3; uVar5 != 0; uVar5 = uVar5 - 1) {
        heap.u32(pcVar9) = heap.u32(pcVar7);
        pcVar7 = pcVar7 + 1;
        pcVar9 = pcVar9 + 1;
      }
      FUN_004175f0(heap, __addr_local_1a4, "Microsoft Visual C++ Runtime Library");
      return;
    }
    }
  }
  return;
} finally {
    heap.freeFrame(432);
  }
}
