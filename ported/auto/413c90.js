// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413c90.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetModuleFileNameA } from "../runtime/win32.js";
import { FUN_004170f0 } from "./4170f0.js";
import { FUN_00417240 } from "./417240.js";
import { FUN_00417280 } from "./417280.js";
import { FUN_00417420 } from "./417420.js";
import { FUN_004175f0 } from "./4175f0.js";
import { FUN_00417680 } from "./417680.js";
export function FUN_00413c90(heap, param_1, param_2) {
  const __sp = heap.allocFrame(820);
  const __addr_DAT_005ee7a0 = __sp + 0;
  const __addr_acStackY_356 = __sp + 4;
  const __addr_local_324 = __sp + 20;
  const __addr_local_220 = __sp + 280;
  try {
  let cVar1 = 0;
  let DVar3 = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let uVar6 = 0;
  let uStackY_348 = 0;
  if ((heap.u32(0x005efeb4) == 1) || ((heap.u32(0x005efeb4) == 0 && (heap.u32(0x005ec264) == 1)))) {
    if ((heap.u32(0x005ee7ac) & 0x10c) == 0) {
      pcStackY_340 = __addr_DAT_005ee7a0;
      puStackY_344 = 0x414199;
      FUN_00417280(heap);
    }
    pcStackY_340 = 0x005ec2a0;
    puStackY_344 = __addr_DAT_005ee7a0;
    uStackY_348 = 0x4141b7;
    FUN_00417240(heap);
    FUN_004170f0(heap);
  } else {
    builtin_strncpy(__addr_local_220, "Assertion failed!", 0x12);
    uVar4 = 0xffffffff;
    pcVar7 = heap.u32(0x005ec2d0);
    do {
      pcVar8 = pcVar7;
      if (uVar4 == 0) {
        break;
      }
      uVar4 = uVar4 - 1;
      pcVar8 = pcVar7 + 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar8;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar7 = __addr_local_220;
    do {
      pcVar11 = pcVar7;
      if (iVar5 == 0) {
        break;
      }
      iVar5 = iVar5 + -1;
      pcVar11 = pcVar7 + 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar11;
    } while (cVar1 != '\0');
    pcVar7 = pcVar8 + -uVar4;
    pcVar8 = pcVar11 + -1;
    for (uVar6 = uVar4 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 4;
      pcVar8 = pcVar8 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar7 = "Program: ";
    do {
      pcVar8 = pcVar7;
      if (uVar4 == 0) {
        break;
      }
      uVar4 = uVar4 - 1;
      pcVar8 = pcVar7 + 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar8;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar7 = __addr_local_220;
    do {
      pcVar11 = pcVar7;
      if (iVar5 == 0) {
        break;
      }
      iVar5 = iVar5 + -1;
      pcVar11 = pcVar7 + 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar11;
    } while (cVar1 != '\0');
    pcVar7 = pcVar8 + -uVar4;
    pcVar8 = pcVar11 + -1;
    for (uVar6 = uVar4 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 4;
      pcVar8 = pcVar8 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    pcStackY_340 = 0x413d6a;
    DVar3 = GetModuleFileNameA(heap, 0x0, __addr_local_324, 0x104);
    if (DVar3 == 0) {
      pcVar7 = "<program name unknown>";
      pCVar9 = __addr_local_324;
      for (iVar5 = 5; iVar5 != 0; iVar5 = iVar5 + -1) {
        heap.u32(pCVar9) = heap.u32(pcVar7);
        pcVar7 = pcVar7 + 4;
        pCVar9 = pCVar9 + 4;
      }
      heap.u32(pCVar9) = heap.u32(pcVar7);
      heap.u32(pCVar9 + (2) * 4) = heap.u32(pcVar7 + (2) * 4);
    }
    uVar4 = 0xffffffff;
    pcVar7 = __addr_local_324;
    pcVar8 = __addr_local_324;
    do {
      if (uVar4 == 0) {
        break;
      }
      uVar4 = uVar4 - 1;
      cVar1 = heap.u32(pcVar8);
      pcVar8 = pcVar8 + 1;
    } while (cVar1 != '\0');
    if (0x3c < ~uVar4 + 10) {
      uVar4 = 0xffffffff;
      pcVar7 = __addr_local_324;
      do {
        if (uVar4 == 0) {
          break;
        }
        uVar4 = uVar4 - 1;
        cVar1 = heap.u32(pcVar7);
        pcVar7 = pcVar7 + 1;
      } while (cVar1 != '\0');
      pcVar7 = __addr_acStackY_356 + ~uVar4;
      pcStackY_340 = 0x413dca;
      _strncpy(pcVar7, heap.u32(0x005ec2c8), 3);
    }
    uVar4 = 0xffffffff;
    do {
      pcVar8 = pcVar7;
      if (uVar4 == 0) {
        break;
      }
      uVar4 = uVar4 - 1;
      pcVar8 = pcVar7 + 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar8;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar7 = __addr_local_220;
    do {
      pcVar11 = pcVar7;
      if (iVar5 == 0) {
        break;
      }
      iVar5 = iVar5 + -1;
      pcVar11 = pcVar7 + 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar11;
    } while (cVar1 != '\0');
    pcVar7 = pcVar8 + -uVar4;
    pcVar8 = pcVar11 + -1;
    for (uVar6 = uVar4 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 4;
      pcVar8 = pcVar8 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar7 = heap.u32(0x005ec2cc);
    do {
      pcVar8 = pcVar7;
      if (uVar4 == 0) {
        break;
      }
      uVar4 = uVar4 - 1;
      pcVar8 = pcVar7 + 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar8;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar7 = __addr_local_220;
    do {
      pcVar11 = pcVar7;
      if (iVar5 == 0) {
        break;
      }
      iVar5 = iVar5 + -1;
      pcVar11 = pcVar7 + 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar11;
    } while (cVar1 != '\0');
    pcVar7 = pcVar8 + -uVar4;
    pcVar8 = pcVar11 + -1;
    for (uVar6 = uVar4 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 4;
      pcVar8 = pcVar8 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar7 = "File: ";
    do {
      pcVar8 = pcVar7;
      if (uVar4 == 0) {
        break;
      }
      uVar4 = uVar4 - 1;
      pcVar8 = pcVar7 + 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar8;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar7 = __addr_local_220;
    do {
      pcVar11 = pcVar7;
      if (iVar5 == 0) {
        break;
      }
      iVar5 = iVar5 + -1;
      pcVar11 = pcVar7 + 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar11;
    } while (cVar1 != '\0');
    pcVar7 = pcVar8 + -uVar4;
    pcVar8 = pcVar11 + -1;
    for (uVar6 = uVar4 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 4;
      pcVar8 = pcVar8 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar7 = param_2;
    do {
      if (uVar4 == 0) {
        break;
      }
      uVar4 = uVar4 - 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 1;
    } while (cVar1 != '\0');
    if (~uVar4 + 7 < 0x3d) {
      uVar4 = 0xffffffff;
      do {
        pcVar7 = param_2;
        if (uVar4 == 0) {
          break;
        }
        uVar4 = uVar4 - 1;
        pcVar7 = param_2 + 1;
        cVar1 = heap.u32(param_2);
        param_2 = pcVar7;
      } while (cVar1 != '\0');
      uVar4 = ~uVar4;
      iVar5 = -1;
      pcVar8 = __addr_local_220;
      do {
        pcVar11 = pcVar8;
        if (iVar5 == 0) {
          break;
        }
        iVar5 = iVar5 + -1;
        pcVar11 = pcVar8 + 1;
        cVar1 = heap.u32(pcVar8);
        pcVar8 = pcVar11;
      } while (cVar1 != '\0');
      pcVar7 = pcVar7 + -uVar4;
      pcVar8 = pcVar11 + -1;
      for (uVar6 = uVar4 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
        heap.u32(pcVar8) = heap.u32(pcVar7);
        pcVar7 = pcVar7 + 4;
        pcVar8 = pcVar8 + 4;
      }
    } else {
      pcStackY_340 = 0x413e7a;
      _strncat(__addr_local_220, param_2, 0x31);
      uVar4 = 0xffffffff;
      pcVar7 = heap.u32(0x005ec2c8);
      do {
        pcVar8 = pcVar7;
        if (uVar4 == 0) {
          break;
        }
        uVar4 = uVar4 - 1;
        pcVar8 = pcVar7 + 1;
        cVar1 = heap.u32(pcVar7);
        pcVar7 = pcVar8;
      } while (cVar1 != '\0');
      uVar4 = ~uVar4;
      iVar5 = -1;
      pcVar7 = __addr_local_220;
      do {
        pcVar11 = pcVar7;
        if (iVar5 == 0) {
          break;
        }
        iVar5 = iVar5 + -1;
        pcVar11 = pcVar7 + 1;
        cVar1 = heap.u32(pcVar7);
        pcVar7 = pcVar11;
      } while (cVar1 != '\0');
      pcVar7 = pcVar8 + -uVar4;
      pcVar8 = pcVar11 + -1;
      for (uVar6 = uVar4 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
        heap.u32(pcVar8) = heap.u32(pcVar7);
        pcVar7 = pcVar7 + 4;
        pcVar8 = pcVar8 + 4;
      }
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar7 = heap.u32(0x005ec2cc);
    do {
      pcVar8 = pcVar7;
      if (uVar4 == 0) {
        break;
      }
      uVar4 = uVar4 - 1;
      pcVar8 = pcVar7 + 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar8;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar7 = __addr_local_220;
    do {
      pcVar11 = pcVar7;
      if (iVar5 == 0) {
        break;
      }
      iVar5 = iVar5 + -1;
      pcVar11 = pcVar7 + 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar11;
    } while (cVar1 != '\0');
    pcVar7 = pcVar8 + -uVar4;
    pcVar8 = pcVar11 + -1;
    for (uVar6 = uVar4 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 4;
      pcVar8 = pcVar8 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar7 = "Line: ";
    do {
      pcVar8 = pcVar7;
      if (uVar4 == 0) {
        break;
      }
      uVar4 = uVar4 - 1;
      pcVar8 = pcVar7 + 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar8;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar7 = __addr_local_220;
    do {
      pcVar11 = pcVar7;
      if (iVar5 == 0) {
        break;
      }
      iVar5 = iVar5 + -1;
      pcVar11 = pcVar7 + 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar11;
    } while (cVar1 != '\0');
    pcVar7 = pcVar8 + -uVar4;
    pcVar8 = pcVar11 + -1;
    for (uVar6 = uVar4 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 4;
      pcVar8 = pcVar8 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    iVar5 = -1;
    pcVar7 = __addr_local_220;
    do {
      if (iVar5 == 0) {
        break;
      }
      iVar5 = iVar5 + -1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 1;
    } while (cVar1 != '\0');
    pcStackY_340 = 0x413f58;
    FUN_00417680(heap);
    pcVar7 = heap.u32(0x005ec2d0);
    uVar4 = 0xffffffff;
    pcVar8 = heap.u32(0x005ec2d0);
    do {
      pcVar11 = pcVar8;
      if (uVar4 == 0) {
        break;
      }
      uVar4 = uVar4 - 1;
      pcVar11 = pcVar8 + 1;
      cVar1 = heap.u32(pcVar8);
      pcVar8 = pcVar11;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar8 = __addr_local_220;
    do {
      pcVar10 = pcVar8;
      if (iVar5 == 0) {
        break;
      }
      iVar5 = iVar5 + -1;
      pcVar10 = pcVar8 + 1;
      cVar1 = heap.u32(pcVar8);
      pcVar8 = pcVar10;
    } while (cVar1 != '\0');
    pcVar8 = pcVar11 + -uVar4;
    pcVar11 = pcVar10 + -1;
    for (uVar6 = uVar4 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      heap.u32(pcVar11) = heap.u32(pcVar8);
      pcVar8 = pcVar8 + 4;
      pcVar11 = pcVar11 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      heap.u32(pcVar11) = heap.u32(pcVar8);
      pcVar8 = pcVar8 + 1;
      pcVar11 = pcVar11 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar8 = "Expression: ";
    do {
      pcVar11 = pcVar8;
      if (uVar4 == 0) {
        break;
      }
      uVar4 = uVar4 - 1;
      pcVar11 = pcVar8 + 1;
      cVar1 = heap.u32(pcVar8);
      pcVar8 = pcVar11;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar8 = __addr_local_220;
    do {
      pcVar10 = pcVar8;
      if (iVar5 == 0) {
        break;
      }
      iVar5 = iVar5 + -1;
      pcVar10 = pcVar8 + 1;
      cVar1 = heap.u32(pcVar8);
      pcVar8 = pcVar10;
    } while (cVar1 != '\0');
    pcVar8 = pcVar11 + -uVar4;
    pcVar11 = pcVar10 + -1;
    for (uVar6 = uVar4 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      heap.u32(pcVar11) = heap.u32(pcVar8);
      pcVar8 = pcVar8 + 4;
      pcVar11 = pcVar11 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      heap.u32(pcVar11) = heap.u32(pcVar8);
      pcVar8 = pcVar8 + 1;
      pcVar11 = pcVar11 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar8 = param_1;
    do {
      if (uVar4 == 0) {
        break;
      }
      uVar4 = uVar4 - 1;
      cVar1 = heap.u32(pcVar8);
      pcVar8 = pcVar8 + 1;
    } while (cVar1 != '\0');
    uVar6 = 0xffffffff;
    pcVar8 = __addr_local_220;
    do {
      if (uVar6 == 0) {
        break;
      }
      uVar6 = uVar6 - 1;
      cVar1 = heap.u32(pcVar8);
      pcVar8 = pcVar8 + 1;
    } while (cVar1 != '\0');
    if (~uVar4 + ~uVar6 + 0xae < 0x21d) {
      uVar4 = 0xffffffff;
      do {
        pcVar8 = param_1;
        if (uVar4 == 0) {
          break;
        }
        uVar4 = uVar4 - 1;
        pcVar8 = param_1 + 1;
        cVar1 = heap.u32(param_1);
        param_1 = pcVar8;
      } while (cVar1 != '\0');
      uVar4 = ~uVar4;
      iVar5 = -1;
      pcVar11 = __addr_local_220;
      do {
        pcVar10 = pcVar11;
        if (iVar5 == 0) {
          break;
        }
        iVar5 = iVar5 + -1;
        pcVar10 = pcVar11 + 1;
        cVar1 = heap.u32(pcVar11);
        pcVar11 = pcVar10;
      } while (cVar1 != '\0');
      pcVar8 = pcVar8 + -uVar4;
      pcVar11 = pcVar10 + -1;
      for (uVar6 = uVar4 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
        heap.u32(pcVar11) = heap.u32(pcVar8);
        pcVar8 = pcVar8 + 4;
        pcVar11 = pcVar11 + 4;
      }
      for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
        heap.u32(pcVar11) = heap.u32(pcVar8);
        pcVar8 = pcVar8 + 1;
        pcVar11 = pcVar11 + 1;
      }
    } else {
      uVar4 = 0xffffffff;
      pcVar7 = __addr_local_220;
      do {
        if (uVar4 == 0) {
          break;
        }
        uVar4 = uVar4 - 1;
        cVar1 = heap.u32(pcVar7);
        pcVar7 = pcVar7 + 1;
      } while (cVar1 != '\0');
      pcStackY_340 = 0x41400c;
      _strncat(__addr_local_220, param_1, 0x169 - (~uVar4 - 1));
      uVar4 = 0xffffffff;
      pcVar7 = heap.u32(0x005ec2c8);
      do {
        pcVar8 = pcVar7;
        if (uVar4 == 0) {
          break;
        }
        uVar4 = uVar4 - 1;
        pcVar8 = pcVar7 + 1;
        cVar1 = heap.u32(pcVar7);
        pcVar7 = pcVar8;
      } while (cVar1 != '\0');
      uVar4 = ~uVar4;
      iVar5 = -1;
      pcVar7 = __addr_local_220;
      do {
        pcVar11 = pcVar7;
        if (iVar5 == 0) {
          break;
        }
        iVar5 = iVar5 + -1;
        pcVar11 = pcVar7 + 1;
        cVar1 = heap.u32(pcVar7);
        pcVar7 = pcVar11;
      } while (cVar1 != '\0');
      pcVar8 = pcVar8 + -uVar4;
      pcVar11 = pcVar11 + -1;
      for (uVar6 = uVar4 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
        heap.u32(pcVar11) = heap.u32(pcVar8);
        pcVar8 = pcVar8 + 4;
        pcVar11 = pcVar11 + 4;
      }
      for (uVar4 = uVar4 & 3; pcVar7 = heap.u32(0x005ec2d0), uVar4 != 0; uVar4 = uVar4 - 1) {
        heap.u32(pcVar11) = heap.u32(pcVar8);
        pcVar8 = pcVar8 + 1;
        pcVar11 = pcVar11 + 1;
      }
    }
    uVar4 = 0xffffffff;
    pcVar8 = pcVar7;
    do {
      pcVar11 = pcVar8;
      if (uVar4 == 0) {
        break;
      }
      uVar4 = uVar4 - 1;
      pcVar11 = pcVar8 + 1;
      cVar1 = heap.u32(pcVar8);
      pcVar8 = pcVar11;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar8 = __addr_local_220;
    do {
      pcVar10 = pcVar8;
      if (iVar5 == 0) {
        break;
      }
      iVar5 = iVar5 + -1;
      pcVar10 = pcVar8 + 1;
      cVar1 = heap.u32(pcVar8);
      pcVar8 = pcVar10;
    } while (cVar1 != '\0');
    pcVar8 = pcVar11 + -uVar4;
    pcVar11 = pcVar10 + -1;
    for (uVar6 = uVar4 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      heap.u32(pcVar11) = heap.u32(pcVar8);
      pcVar8 = pcVar8 + 4;
      pcVar11 = pcVar11 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      heap.u32(pcVar11) = heap.u32(pcVar8);
      pcVar8 = pcVar8 + 1;
      pcVar11 = pcVar11 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar8 = "For information on how your program can cause an assertion\nfailure, see the Visual C++ documentation on asserts";
    do {
      pcVar11 = pcVar8;
      if (uVar4 == 0) {
        break;
      }
      uVar4 = uVar4 - 1;
      pcVar11 = pcVar8 + 1;
      cVar1 = heap.u32(pcVar8);
      pcVar8 = pcVar11;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar8 = __addr_local_220;
    do {
      pcVar10 = pcVar8;
      if (iVar5 == 0) {
        break;
      }
      iVar5 = iVar5 + -1;
      pcVar10 = pcVar8 + 1;
      cVar1 = heap.u32(pcVar8);
      pcVar8 = pcVar10;
    } while (cVar1 != '\0');
    pcVar8 = pcVar11 + -uVar4;
    pcVar11 = pcVar10 + -1;
    for (uVar6 = uVar4 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      heap.u32(pcVar11) = heap.u32(pcVar8);
      pcVar8 = pcVar8 + 4;
      pcVar11 = pcVar11 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      heap.u32(pcVar11) = heap.u32(pcVar8);
      pcVar8 = pcVar8 + 1;
      pcVar11 = pcVar11 + 1;
    }
    uVar4 = 0xffffffff;
    do {
      pcVar8 = pcVar7;
      if (uVar4 == 0) {
        break;
      }
      uVar4 = uVar4 - 1;
      pcVar8 = pcVar7 + 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar8;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar7 = __addr_local_220;
    do {
      pcVar11 = pcVar7;
      if (iVar5 == 0) {
        break;
      }
      iVar5 = iVar5 + -1;
      pcVar11 = pcVar7 + 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar11;
    } while (cVar1 != '\0');
    pcVar7 = pcVar8 + -uVar4;
    pcVar8 = pcVar11 + -1;
    for (uVar6 = uVar4 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 4;
      pcVar8 = pcVar8 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    uVar4 = 0xffffffff;
    pcVar7 = "(Press Retry to debug the application - JIT must be enabled)";
    do {
      pcVar8 = pcVar7;
      if (uVar4 == 0) {
        break;
      }
      uVar4 = uVar4 - 1;
      pcVar8 = pcVar7 + 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar8;
    } while (cVar1 != '\0');
    uVar4 = ~uVar4;
    iVar5 = -1;
    pcVar7 = __addr_local_220;
    do {
      pcVar11 = pcVar7;
      if (iVar5 == 0) {
        break;
      }
      iVar5 = iVar5 + -1;
      pcVar11 = pcVar7 + 1;
      cVar1 = heap.u32(pcVar7);
      pcVar7 = pcVar11;
    } while (cVar1 != '\0');
    pcVar7 = pcVar8 + -uVar4;
    pcVar8 = pcVar11 + -1;
    for (uVar6 = uVar4 >>> 2; uVar6 != 0; uVar6 = uVar6 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 4;
      pcVar8 = pcVar8 + 4;
    }
    for (uVar4 = uVar4 & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
      heap.u32(pcVar8) = heap.u32(pcVar7);
      pcVar7 = pcVar7 + 1;
      pcVar8 = pcVar8 + 1;
    }
    pcStackY_340 = 0x414147;
    iVar5 = FUN_004175f0(heap);
    if (iVar5 == 3) {
      FUN_00417420(heap);
      __exit(3);
    }
    if (iVar5 == 4) {
      pcVar2 = swi(3);
      (heap.u32(pcVar2))();
      return;
    }
    if (iVar5 == 5) {
      return;
    }
  }
  _abort();
} finally {
    heap.freeFrame(820);
  }
}
