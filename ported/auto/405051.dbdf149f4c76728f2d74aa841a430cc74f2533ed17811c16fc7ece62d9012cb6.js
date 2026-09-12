// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/405051.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { RegCloseKey, RegCreateKeyExA, RegFlushKey, RegOpenKeyExA, RegSetValueExA } from "../../runtime/win32.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00413170 } from "./413170.js";
import { FUN_00413180 } from "./413180.js";
export function FUN_00405051(heap, param_1, param_2, param_3, param_4, param_5) {
  const __sp = heap.allocFrame(218);
  const __addr_local_d3 = __sp + 9;
  const __addr_local_40 = __sp + 156;
  const __addr_local_d4 = __sp + 8;
  const __addr_local_3c = __sp + 160;
  const __addr_local_54 = __sp + 136;
  const __addr_local_50 = __sp + 140;
  const __addr_local_4c = __sp + 144;
  const __addr_local_38 = __sp + 164;
  const __addr_local_18 = __sp + 196;
  const __addr_local_14 = __sp + 200;
  const __addr_local_10 = __sp + 204;
  const __addr_local_c = __sp + 208;
  const __addr_local_8 = __sp + 212;
  const __addr_local_48 = __sp + 148;
  const __addr_local_47 = __sp + 149;
  const __addr_local_43 = __sp + 153;
  const __addr_local_41 = __sp + 155;
  const __addr_local_24 = __sp + 184;
  const __addr_local_20 = __sp + 188;
  const __addr_local_1c = __sp + 192;
  const __addr_local_6 = __sp + 214;
  try {
  let LVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let pcVar4 = 0;
  let puVar5 = 0;
  heap.setU32(__addr_local_18, ((0x005ebd10 & 0xffffffff)) >>> 0);
  heap.setU32(__addr_local_14, ((((0x005ebd10) >>> 32) & 0xffffffff)) >>> 0);
  heap.setU32(__addr_local_10, ((((0x005ebd10) >>> 64) & 0xffffffff)) >>> 0);
  heap.setU32(__addr_local_c, ((((0x005ebd10) >>> 96) & 0xffffffff)) >>> 0);
  heap.setU32(__addr_local_8, ((((0x005ebd10) >>> 128) & 0xffff)) >>> 0);
  heap.setU32(__addr_local_6, (0) >>> 0);
  heap.setU32(__addr_local_d4, (heap.u32(0x005ebd24)) >>> 0);
  puVar5 = ((__addr_local_d3) >>> 0);
  for (iVar3 = ((0x1f) >>> 0); iVar3 != 0; iVar3 = (((iVar3 + -1) >>> 0)) >>> 0) {
    heap.setU32(puVar5, (0) & 0xffffffff);
    puVar5 = ((puVar5 + ((1) * 4)) >>> 0);
  }
  heap.setU16(puVar5, (0) & 0xffff);
  heap.setU8((((puVar5) | 0) + 2), (0) & 0xff);
  pcVar4 = ((0x005ebd28) >>> 0);
  puVar5 = ((__addr_local_38) >>> 0);
  for (iVar3 = ((5) >>> 0); iVar3 != 0; iVar3 = (((iVar3 + -1) >>> 0)) >>> 0) {
    heap.setU32(puVar5, (heap.u32(pcVar4)) & 0xffffffff);
    pcVar4 = ((pcVar4 + 4) >>> 0);
    puVar5 = ((puVar5 + ((1) * 4)) >>> 0);
  }
  heap.setU32(__addr_local_24, (0) >>> 0);
  heap.setU32(__addr_local_20, (0) >>> 0);
  heap.setU32(__addr_local_1c, (0) >>> 0);
  heap.setU32(__addr_local_54, ((0x005ebd3c & 0xffffffff)) >>> 0);
  heap.setU32(__addr_local_50, ((((0x005ebd3c) >>> 32) & 0xffffffff)) >>> 0);
  heap.setU32(__addr_local_4c, ((((0x005ebd3c) >>> 64) & 0xffffffff)) >>> 0);
  heap.setU32(__addr_local_48, (heap.u32(0x005ebd3c + (0xc) * 4)) >>> 0);
  heap.setU32(__addr_local_47, (0) >>> 0);
  heap.setU32(__addr_local_43, (0) >>> 0);
  heap.setU32(__addr_local_41, (0) >>> 0);
  LVar1 = ((RegOpenKeyExA(heap, ((0x80000002) | 0), __addr_local_18, 0, 0xf003f, __addr_local_40)) >>> 0);
  if (LVar1 == 0) {
    RegCloseKey(heap, heap.u32(__addr_local_40));
    (regs.eax = FUN_00413170(heap, __addr_local_d4, __addr_local_18));
    (regs.eax = FUN_00413180(heap, __addr_local_d4, param_1));
    LVar1 = ((RegCreateKeyExA(heap, ((0x80000002) | 0), __addr_local_d4, 0, ((0x0) | 0), 0, 0xf003f, ((0x0) | 0), __addr_local_40, __addr_local_3c)) >>> 0);
    if (LVar1 == 0) {
      LVar1 = ((RegSetValueExA(heap, heap.u32(__addr_local_40), ((0x0) | 0), 0, 1, param_2, 1)) >>> 0);
      if (LVar1 == 0) {
        RegCloseKey(heap, heap.u32(__addr_local_40));
        (regs.eax = FUN_00413170(heap, __addr_local_d4, __addr_local_18));
        (regs.eax = FUN_00413180(heap, __addr_local_d4, param_2));
        LVar1 = ((RegCreateKeyExA(heap, ((0x80000002) | 0), __addr_local_d4, 0, ((0x0) | 0), 0, 0xf003f, ((0x0) | 0), __addr_local_40, __addr_local_3c)) >>> 0);
        if (LVar1 == 0) {
          LVar1 = ((RegSetValueExA(heap, heap.u32(__addr_local_40), ((0x0) | 0), 0, 1, param_3, 1)) >>> 0);
          if (LVar1 == 0) {
            (regs.eax = FUN_00413180(heap, __addr_local_d4, __addr_local_38));
            LVar1 = ((RegCreateKeyExA(heap, ((0x80000002) | 0), __addr_local_d4, 0, ((0x0) | 0), 0, 0xf003f, ((0x0) | 0), __addr_local_40, __addr_local_3c)) >>> 0);
            if (LVar1 == 0) {
              LVar1 = ((RegSetValueExA(heap, heap.u32(__addr_local_40), ((0x0) | 0), 0, 1, param_4, 4)) >>> 0);
              if (LVar1 == 0) {
                RegCloseKey(heap, heap.u32(__addr_local_40));
                (regs.eax = FUN_00413170(heap, __addr_local_d4, __addr_local_18));
                (regs.eax = FUN_00413180(heap, __addr_local_d4, param_2));
                (regs.eax = FUN_00413180(heap, __addr_local_d4, __addr_local_54));
                LVar1 = ((RegCreateKeyExA(heap, ((0x80000002) | 0), __addr_local_d4, 0, ((0x0) | 0), 0, 0xf003f, ((0x0) | 0), __addr_local_40, __addr_local_3c)) >>> 0);
                if (LVar1 == 0) {
                  LVar1 = ((RegSetValueExA(heap, heap.u32(__addr_local_40), ((0x0) | 0), 0, 1, param_5, 4)) >>> 0);
                  if (LVar1 == 0) {
                    RegCloseKey(heap, heap.u32(__addr_local_40));
                    LVar1 = ((RegFlushKey(heap, ((0x80000002) | 0))) >>> 0);
                    if (LVar1 == 0) {
                      uVar2 = ((1) >>> 0);
                    } else {
                      uVar2 = ((0) >>> 0);
                    }
                  } else {
                    uVar2 = ((0) >>> 0);
                  }
                } else {
                  uVar2 = ((0) >>> 0);
                }
              } else {
                uVar2 = ((0) >>> 0);
              }
            } else {
              uVar2 = ((0) >>> 0);
            }
          } else {
            uVar2 = ((0) >>> 0);
          }
        } else {
          uVar2 = ((0) >>> 0);
        }
      } else {
        uVar2 = ((0) >>> 0);
      }
    } else {
      uVar2 = ((0) >>> 0);
    }
  } else {
    uVar2 = ((0) >>> 0);
  }
  return uVar2;
} finally {
    heap.freeFrame(218);
  }
}
