// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/405051.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { RegCloseKey, RegCreateKeyExA, RegFlushKey, RegOpenKeyExA, RegSetValueExA } from "../runtime/win32.js";
import { FUN_00413170 } from "./413170.js";
import { FUN_00413180 } from "./413180.js";
export function FUN_00405051(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(56);
  const __addr_local_d3 = __sp + 0;
  const __addr_local_40 = __sp + 4;
  const __addr_local_d4 = __sp + 8;
  const __addr_local_3c = __sp + 12;
  const __addr_local_54 = __sp + 16;
  const __addr_local_50 = __sp + 20;
  const __addr_local_4c = __sp + 24;
  const __addr_local_38 = __sp + 28;
  const __addr_local_18 = __sp + 36;
  const __addr_local_14 = __sp + 40;
  const __addr_local_10 = __sp + 44;
  const __addr_local_c = __sp + 48;
  const __addr_local_8 = __sp + 52;
  try {
  let LVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let local_48 = 0;
  let local_47 = 0;
  let local_43 = 0;
  let local_41 = 0;
  let local_24 = 0;
  let local_20 = 0;
  let local_1c = 0;
  let local_6 = 0;
  heap.setU32(__addr_local_18, ((0x005ebd10 & 0xffffffff)) >>> 0);
  heap.setU32(__addr_local_14, ((((0x005ebd10) >>> 32) & 0xffffffff)) >>> 0);
  heap.setU32(__addr_local_10, ((((0x005ebd10) >>> 64) & 0xffffffff)) >>> 0);
  heap.setU32(__addr_local_c, ((((0x005ebd10) >>> 96) & 0xffffffff)) >>> 0);
  heap.setU32(__addr_local_8, ((((0x005ebd10) >>> 128) & 0xffff)) >>> 0);
  local_6 = 0;
  heap.setU32(__addr_local_d4, (heap.u32(0x005ebd24)) >>> 0);
  puVar5 = __addr_local_d3;
  for (iVar3 = 0x1f; iVar3 != 0; iVar3 = iVar3 + -1) {
    heap.u32(puVar5) = 0;
    puVar5 = puVar5 + 1;
  }
  heap.u32(puVar5) = 0;
  heap.u32((puVar5 + 2)) = 0;
  pcVar4 = 0x005ebd28;
  puVar5 = __addr_local_38;
  for (iVar3 = 5; iVar3 != 0; iVar3 = iVar3 + -1) {
    heap.u32(puVar5) = heap.u32(pcVar4);
    pcVar4 = pcVar4 + 4;
    puVar5 = puVar5 + 1;
  }
  local_24 = 0;
  local_20 = 0;
  local_1c = 0;
  heap.setU32(__addr_local_54, ((0x005ebd3c & 0xffffffff)) >>> 0);
  heap.setU32(__addr_local_50, ((((0x005ebd3c) >>> 32) & 0xffffffff)) >>> 0);
  heap.setU32(__addr_local_4c, ((((0x005ebd3c) >>> 64) & 0xffffffff)) >>> 0);
  local_48 = heap.u32(0x005ebd3c + (0xc) * 4);
  local_47 = 0;
  local_43 = 0;
  local_41 = 0;
  LVar1 = RegOpenKeyExA(heap, 0x80000002, __addr_local_18, 0, 0xf003f, __addr_local_40);
  if (LVar1 == 0) {
    RegCloseKey(heap, heap.u32(__addr_local_40));
    FUN_00413170(heap, __addr_local_d4, __addr_local_18);
    FUN_00413180(heap, __addr_local_d4, param_1);
    LVar1 = RegCreateKeyExA(heap, 0x80000002, __addr_local_d4, 0, 0x0, 0, 0xf003f, 0x0, __addr_local_40, __addr_local_3c);
    if (LVar1 == 0) {
      LVar1 = RegSetValueExA(heap, heap.u32(__addr_local_40), 0x0, 0, 1, param_2, 1);
      if (LVar1 == 0) {
        RegCloseKey(heap, heap.u32(__addr_local_40));
        FUN_00413170(heap, __addr_local_d4, __addr_local_18);
        FUN_00413180(heap, __addr_local_d4, param_2);
        LVar1 = RegCreateKeyExA(heap, 0x80000002, __addr_local_d4, 0, 0x0, 0, 0xf003f, 0x0, __addr_local_40, __addr_local_3c);
        if (LVar1 == 0) {
          LVar1 = RegSetValueExA(heap, heap.u32(__addr_local_40), 0x0, 0, 1, param_3, 1);
          if (LVar1 == 0) {
            FUN_00413180(heap, __addr_local_d4, __addr_local_38);
            LVar1 = RegCreateKeyExA(heap, 0x80000002, __addr_local_d4, 0, 0x0, 0, 0xf003f, 0x0, __addr_local_40, __addr_local_3c);
            if (LVar1 == 0) {
              LVar1 = RegSetValueExA(heap, heap.u32(__addr_local_40), 0x0, 0, 1, param_4, 4);
              if (LVar1 == 0) {
                RegCloseKey(heap, heap.u32(__addr_local_40));
                FUN_00413170(heap, __addr_local_d4, __addr_local_18);
                FUN_00413180(heap, __addr_local_d4, param_2);
                FUN_00413180(heap, __addr_local_d4, __addr_local_54);
                LVar1 = RegCreateKeyExA(heap, 0x80000002, __addr_local_d4, 0, 0x0, 0, 0xf003f, 0x0, __addr_local_40, __addr_local_3c);
                if (LVar1 == 0) {
                  LVar1 = RegSetValueExA(heap, heap.u32(__addr_local_40), 0x0, 0, 1, param_5, 4);
                  if (LVar1 == 0) {
                    RegCloseKey(heap, heap.u32(__addr_local_40));
                    LVar1 = RegFlushKey(heap, 0x80000002);
                    if (LVar1 == 0) {
                      uVar2 = 1;
                    } else {
                      uVar2 = 0;
                    }
                  } else {
                    uVar2 = 0;
                  }
                } else {
                  uVar2 = 0;
                }
              } else {
                uVar2 = 0;
              }
            } else {
              uVar2 = 0;
            }
          } else {
            uVar2 = 0;
          }
        } else {
          uVar2 = 0;
        }
      } else {
        uVar2 = 0;
      }
    } else {
      uVar2 = 0;
    }
  } else {
    uVar2 = 0;
  }
  return uVar2;
} finally {
    heap.freeFrame(56);
  }
}
