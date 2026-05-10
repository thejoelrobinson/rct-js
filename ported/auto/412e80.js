// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/412e80.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetCommandLineA, GetModuleHandleA, GetStartupInfoA, GetVersion } from "../../runtime/win32.js";
import { ExceptionList } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00402e9b } from "./402e9b.js";
import { FUN_00413050 } from "./413050.js";
import { FUN_004141e0 } from "./4141e0.js";
import { FUN_00414210 } from "./414210.js";
import { FUN_00414540 } from "./414540.js";
import { FUN_004145a0 } from "./4145a0.js";
import { FUN_00414690 } from "./414690.js";
import { FUN_00414940 } from "./414940.js";
import { FUN_00414f80 } from "./414f80.js";
import { FUN_00414f90 } from "./414f90.js";
import { FUN_00415190 } from "./415190.js";
export function FUN_00412e80(heap) {
  const __sp = heap.allocFrame(136);
  const __addr_stack0xffffff88 = __sp + 0;
  const __addr_local_14 = __sp + 84;
  const __addr_local_60 = __sp + 8;
  const __addr_local_1c = __sp + 76;
  const __addr_local_8 = __sp + 96;
  try {
  let bVar1 = 0;
  let DVar2 = 0;
  let iVar3 = 0;
  let uVar4 = 0;
  let pHVar5 = 0;
  let pbVar6 = 0;
  let uVar8 = 0;
  let puStack_10 = 0;
  let puStack_c = 0;
  let pbVar7 = 0;
  heap.setU32(__addr_local_8, (0xffffffff) >>> 0);
  puStack_c = ((0x005e7390) >>> 0);
  puStack_10 = ((0x00413268) >>> 0);
  heap.setU32(__addr_local_14, (ExceptionList) >>> 0);
  heap.setU32(__addr_local_1c, (__addr_stack0xffffff88) >>> 0);
  void (__addr_local_14) /* assign to ExceptionList elided (SEH not modelled) */;
  DVar2 = ((GetVersion(heap)) >>> 0);
  heap.setU32(0x005efed8, (DVar2 >>> 8 & 0xff) >>> 0);
  heap.setU32(0x005efed4, (DVar2 & 0xff) >>> 0);
  heap.setU32(0x005efed0, (heap.u32(0x005efed4) * 0x100 + heap.u32(0x005efed8)) >>> 0);
  heap.setU32(0x005efecc, (DVar2 >>> 0x10) >>> 0);
  iVar3 = (((regs.eax = FUN_00415190(heap))) >>> 0);
  if (iVar3 == 0) {
    (regs.eax = FUN_00413050(heap, 0x1c));
  }
  heap.setU32(__addr_local_8, (0) >>> 0);
  (regs.eax = FUN_00414f90(heap));
  (regs.eax = FUN_00414f80(heap));
  heap.setU8(0x005f3f70, (GetCommandLineA(heap)) & 0xff);
  heap.setU32(0x005efeac, ((regs.eax = FUN_00414940(heap))) >>> 0);
  if ((heap.u32(0x005efeac) == 0) || (heap.u8(0x005f3f70) == 0x0)) {
    (regs.eax = FUN_00414210(heap, 0xffffffff));
  }
  (regs.eax = FUN_00414690(heap));
  (regs.eax = FUN_004145a0(heap));
  (regs.eax = FUN_004141e0(heap));
  pbVar6 = ((heap.u8(0x005f3f70)) >>> 0);
  if (heap.u32(heap.u8(0x005f3f70)) == 0x22) {
    while (true) {
      pbVar7 = ((pbVar6) >>> 0);
      pbVar6 = ((pbVar7 + 1) >>> 0);
      bVar1 = ((heap.u8(pbVar6)) & 0xff);
      if ((bVar1 == 0x22) || (bVar1 == 0)) {
        break;
      }
      iVar3 = (((regs.eax = FUN_00414540(heap, bVar1))) >>> 0);
      if (iVar3 != 0) {
        pbVar6 = ((pbVar7 + 2) >>> 0);
      }
    }
    if (heap.u8(pbVar6) == 0x22) {
      pbVar6 = ((pbVar7 + 2) >>> 0);
    }
  } else {
    for (; 0x20 < heap.u8(pbVar6); pbVar6 = (((pbVar6 + 1) >>> 0)) >>> 0) {
    
    }
  }
  for (; (heap.u8(pbVar6) != 0 && (heap.u8(pbVar6) < 0x21)); pbVar6 = (((pbVar6 + 1) >>> 0)) >>> 0) {
  
  }
  heap.setU32((__addr_local_60 + 4), (0) >>> 0);
  GetStartupInfoA(heap, __addr_local_60);
  if ((heap.u32((__addr_local_60 + 4)) & 1) == 0) {
    uVar4 = ((10) >>> 0);
  } else {
    uVar4 = (((((heap.u32(__addr_local_60)) >>> 384) & 0xffffffff) & 0xffff) >>> 0);
  }
  uVar8 = ((0) >>> 0);
  pHVar5 = ((GetModuleHandleA(heap, ((0x0) | 0))) >>> 0);
  uVar8 = (((regs.eax = FUN_00402e9b(heap, pHVar5, uVar8, pbVar6, uVar4))) >>> 0);
  (regs.eax = FUN_00414210(heap, uVar8));
  void (heap.u32(__addr_local_14)) /* assign to ExceptionList elided (SEH not modelled) */;
  return;
} finally {
    heap.freeFrame(136);
  }
}
