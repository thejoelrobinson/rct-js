// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { GetCommandLineA, GetModuleHandleA, GetStartupInfoA, GetVersion } from "../runtime/win32.js";
import { ExceptionList } from "../runtime/ghidra-builtins.js";
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
export function entry(heap) {
  const __sp = heap.allocFrame(144);
  const __addr_DAT_005e7390 = __sp + 0;
  const __addr_LAB_00413268 = __sp + 4;
  const __addr_stack0xffffff88 = __sp + 8;
  const __addr_local_14 = __sp + 12;
  const __addr_local_60 = __sp + 16;
  try {
  let bVar1 = 0;
  let DVar2 = 0;
  let iVar3 = 0;
  let uVar4 = 0;
  let pHVar5 = 0;
  let uVar8 = 0;
  let local_8 = 0;
  local_8 = 0xffffffff;
  puStack_c = __addr_DAT_005e7390;
  puStack_10 = __addr_LAB_00413268;
  heap.setU32(__addr_local_14, (ExceptionList) >>> 0);
  local_1c = __addr_stack0xffffff88;
  ExceptionList = __addr_local_14;
  DVar2 = GetVersion(heap);
  heap.setU32(0x005efed8, (DVar2 >>> 8 & 0xff) >>> 0);
  heap.setU32(0x005efed4, (DVar2 & 0xff) >>> 0);
  heap.setU32(0x005efed0, (heap.u32(0x005efed4) * 0x100 + heap.u32(0x005efed8)) >>> 0);
  heap.setU32(0x005efecc, (DVar2 >>> 0x10) >>> 0);
  iVar3 = FUN_00415190(heap);
  if (iVar3 == 0) {
    FUN_00413050(heap, 0x1c);
  }
  local_8 = 0;
  FUN_00414f90(heap);
  FUN_00414f80(heap);
  heap.setU32(0x005f3f70, (GetCommandLineA(heap)) >>> 0);
  heap.setU32(0x005efeac, (FUN_00414940(heap)) >>> 0);
  if ((heap.u32(0x005efeac) == 0) || (heap.u32(0x005f3f70) == 0x0)) {
    FUN_00414210(heap, 0xffffffff);
  }
  FUN_00414690(heap);
  FUN_004145a0(heap);
  FUN_004141e0(heap);
  pbVar6 = heap.u32(0x005f3f70);
  if (heap.u32(heap.u32(0x005f3f70)) == 0x22) {
    while (true) {
      pbVar7 = pbVar6;
      pbVar6 = pbVar7 + 1;
      bVar1 = heap.u32(pbVar6);
      if ((bVar1 == 0x22) || (bVar1 == 0)) {
        break;
      }
      iVar3 = FUN_00414540(heap, bVar1);
      if (iVar3 != 0) {
        pbVar6 = pbVar7 + 2;
      }
    }
    if (heap.u32(pbVar6) == 0x22) {
      pbVar6 = pbVar7 + 2;
    }
  } else {
    for (; 0x20 < heap.u32(pbVar6); pbVar6 = pbVar6 + 1) {
    
    }
  }
  for (; (heap.u32(pbVar6) != 0 && (heap.u32(pbVar6) < 0x21)); pbVar6 = pbVar6 + 1) {
  
  }
  heap.u32((__addr_local_60 + 4)) = 0;
  GetStartupInfoA(heap, __addr_local_60);
  if ((heap.u32((__addr_local_60 + 4)) & 1) == 0) {
    uVar4 = 10;
  } else {
    uVar4 = (((heap.u32(__addr_local_60)) >>> 384) & 0xffffffff) & 0xffff;
  }
  uVar8 = 0;
  pHVar5 = GetModuleHandleA(heap, 0x0);
  uVar8 = FUN_00402e9b(heap, pHVar5, uVar8, pbVar6, uVar4);
  FUN_00414210(heap, uVar8);
  ExceptionList = heap.u32(__addr_local_14);
  return;
} finally {
    heap.freeFrame(144);
  }
}
