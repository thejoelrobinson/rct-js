// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/415c60.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT31, CONCAT44 } from "../runtime/win32.js";
import { FUN_004165f0 } from "./4165f0.js";
import { FUN_00416640 } from "./416640.js";
import { FUN_00416680 } from "./416680.js";
import { FUN_004166c0 } from "./4166c0.js";
import { FUN_004166e0 } from "./4166e0.js";
import { FUN_00416700 } from "./416700.js";
import { FUN_00417d10 } from "./417d10.js";
export function FUN_00415c60(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(544);
  const __addr_DAT_005e7780 = __sp + 0;
  const __addr_local_240 = __sp + 4;
  const __addr_param_3 = __sp + 8;
  const __addr_local_210 = __sp + 12;
  const __addr_uStack_1 = __sp + 16;
  const __addr_stack0x00000000 = __sp + 20;
  const __addr_local_23a = __sp + 24;
  const __addr_local_214 = __sp + 28;
  const __addr_local_200 = __sp + 32;
  heap.setU32(__addr_param_3, (param_3) >>> 0);
  try {
  let sVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let iVar6 = 0;
  let iVar7 = 0;
  let cVar8 = 0;
  let iVar12 = 0;
  let uVar13 = 0;
  let lVar14 = 0;
  let local_24c = 0;
  let local_244 = 0;
  let local_239 = 0;
  let local_238 = 0;
  let local_234 = 0;
  let local_230 = 0;
  let local_22c = 0;
  let local_228 = 0;
  let local_224 = 0;
  let local_220 = 0;
  let local_21c = 0;
  let local_218 = 0;
  let local_20c = 0;
  let local_204 = 0;
  local_220 = 0;
  puVar10 = 0x0;
  heap.setU32(__addr_local_240, (0) >>> 0);
  cVar8 = heap.u32(param_2);
  local_21c = CONCAT31(heap, (((local_21c) >>> 8) & 0xffffffff), cVar8);
  pcVar11 = param_2;
  do {
    if ((cVar8 == '\0') || (param_2 = pcVar11 + 1, heap.u32(__addr_local_240) < 0)) {
      return heap.u32(__addr_local_240);
    }
    if ((cVar8 < ' ') || ('x' < cVar8)) {
      uVar2 = 0;
    } else {
      uVar2 = heap.u32("R6002\r\n- floating point not loaded\r\n" + (cVar8 + 0x24) * 4) & 0xf;
    }
    local_220 = heap.u32((__addr_DAT_005e7780) + (uVar2 * 8 + local_220) * 4) >>> 4;
    switch (local_220) {
      case 0:
        switchD_00415cdd_caseD_0: local_230 = 0;
        if ((heap.u32(heap.u32(0x005ee548) + ((local_21c & 0xff) * 2 + 1) * 4) & 0x80) != 0) {
          FUN_004165f0(heap, cVar8, param_1, __addr_local_240);
          cVar8 = heap.u32(param_2);
          param_2 = pcVar11 + 2;
        }
        FUN_004165f0(heap, cVar8, param_1, __addr_local_240);
        break;
      case 1:
        local_218 = 0;
        local_228 = 0;
        local_234 = 0;
        local_238 = 0;
        local_24c = 0;
        local_244 = -1;
        local_230 = 0;
        break;
      case 2:
        switch (cVar8) {
          case ' ':
            local_24c = local_24c | 2;
            break;
          case '#':
            local_24c = local_24c | 0x80;
            break;
          case '+':
            local_24c = local_24c | 1;
            break;
          case '-':
            local_24c = local_24c | 4;
            break;
          case '0':
            local_24c = local_24c | 8;
        }
        break;
      case 3:
        if (cVar8 == '*') {
          local_234 = FUN_004166c0(heap, __addr_param_3);
          if (local_234 < 0) {
            local_24c = local_24c | 4;
            local_234 = -local_234;
          }
        } else {
          local_234 = cVar8 + -0x30 + local_234 * 10;
        }
        break;
      case 4:
        local_244 = 0;
        break;
      case 5:
        if (cVar8 == '*') {
          local_244 = FUN_004166c0(heap, __addr_param_3);
          if (local_244 < 0) {
            local_244 = -1;
          }
        } else {
          local_244 = cVar8 + -0x30 + local_244 * 10;
        }
        break;
      case 6:
        switch (cVar8) {
          case 'I':
            if ((heap.u32(param_2) != '6') || (heap.u32(pcVar11 + (2) * 4) != '4')) {
              local_220 = 0;
              /* goto switchD_00415cdd_caseD_0 */ throw new Error("goto switchD_00415cdd_caseD_0 not supported");
            }
            param_2 = pcVar11 + 3;
            local_24c = local_24c | 0x8000;
            break;
          case 'h':
            local_24c = local_24c | 0x20;
            break;
          case 'l':
            local_24c = local_24c | 0x10;
            break;
          case 'w':
            local_24c = local_24c | 0x800;
        }
        break;
      case 7:
        switch (cVar8) {
          case 'C':
            if ((local_24c & 0x830) == 0) {
              local_24c = local_24c | 0x800;
            }
          case 'c':
            if ((local_24c & 0x810) == 0) {
              heap.u32(__addr_local_200 + (0) * 4) = FUN_004166c0(heap, __addr_param_3);
              puVar10 = 0x1;
            } else {
              uVar3 = FUN_00416700(heap, __addr_param_3);
              puVar10 = FUN_00417d10(heap, __addr_local_200, uVar3);
              if (puVar10 < 0) {
                local_248 = __addr_local_200;
                local_228 = 1;
                break;
              }
            }
            local_248 = __addr_local_200;
            break;
          case 'E':
          case 'G':
            local_218 = 1;
            cVar8 = cVar8 + ' ';
          case 'e':
          case 'f':
          case 'g':
            local_248 = __addr_local_200;
            if (local_244 < 0) {
              local_244 = 6;
            } else {
              if ((local_244 == 0) && (cVar8 == 'g')) {
              local_244 = 1;
            }
            }
            heap.setU32(__addr_local_210, (heap.u32(heap.u32(__addr_param_3))) >>> 0);
            local_20c = heap.u32(heap.u32(__addr_param_3) + (1) * 4);
            heap.setU32(__addr_param_3, (heap.u32(__addr_param_3) + 2) >>> 0);
            (heap.u32(heap.u32(0x005ee530)))(__addr_local_210, __addr_local_200, cVar8, local_244, local_218);
            if (((local_24c & 0x80) != 0) && (local_244 == 0)) {
              (heap.u32(heap.u32(0x005ee53c)))(__addr_local_200);
            }
            if ((cVar8 == 'g') && ((local_24c & 0x80) == 0)) {
              (heap.u32(heap.u32(0x005ee534)))(__addr_local_200);
            }
            uVar2 = local_24c | 0x40;
            if (heap.u32(__addr_local_200 + (0) * 4) == '-') {
              local_248 = (__addr_local_200 + 1);
              uVar2 = local_24c | 0x140;
            }
            local_24c = uVar2;
            uVar2 = 0xffffffff;
            psVar5 = local_248;
            do {
              if (uVar2 == 0) {
                break;
              }
              uVar2 = uVar2 - 1;
              sVar1 = heap.u32(psVar5);
              psVar5 = (psVar5 + 1);
            } while (sVar1 != '\0');
            puVar10 = (~uVar2 - 1);
            break;
          case 'S':
            if ((local_24c & 0x830) == 0) {
              local_24c = local_24c | 0x800;
            }
          case 's':
            iVar12 = 0x7fffffff;
            if (local_244 != -1) {
              iVar12 = local_244;
            }
            local_248 = FUN_004166c0(heap, __addr_param_3);
            if ((local_24c & 0x810) == 0) {
              psVar5 = local_248;
              if (local_248 == 0x0) {
                psVar5 = heap.u32(0x005ee528);
                local_248 = heap.u32(0x005ee528);
              }
              for (; (iVar12 != 0 && (iVar12 = iVar12 + -1, heap.u32(psVar5) != '\0')); psVar5 = (psVar5 + 1)) {
              
              }
              puVar10 = (psVar5 - local_248);
            } else {
              if (local_248 == 0x0) {
                local_248 = heap.u32(0x005ee52c);
              }
              local_230 = 1;
              for (psVar5 = local_248; (iVar12 != 0 && (iVar12 = iVar12 + -1, heap.u32(psVar5) != 0)); psVar5 = psVar5 + 1) {
              
              }
              puVar10 = (psVar5 - local_248 >>> 1);
            }
            break;
          case 'X':
            /* goto switchD_00415ef1_caseD_58 */ throw new Error("goto switchD_00415ef1_caseD_58 not supported");
          case 'Z':
            psVar5 = FUN_004166c0(heap, __addr_param_3);
            if ((psVar5 == 0x0) || (local_248 = heap.u32((psVar5 + 2)), local_248 == 0x0)) {
              uVar2 = 0xffffffff;
              local_248 = heap.u32(0x005ee528);
              pcVar11 = heap.u32(0x005ee528);
              do {
                if (uVar2 == 0) {
                  break;
                }
                uVar2 = uVar2 - 1;
                cVar8 = heap.u32(pcVar11);
                pcVar11 = pcVar11 + 1;
              } while (cVar8 != '\0');
              puVar10 = (~uVar2 - 1);
            } else {
              if ((local_24c & 0x800) == 0) {
              puVar10 = heap.u32(psVar5);
              local_230 = 0;
            } else {
              local_230 = 1;
              puVar10 = ((uint)(int) * psVar5 >>> 1);
            }
            }
            break;
          case 'd':
          case 'i':
            local_22c = 10;
            local_24c = local_24c | 0x40;
            /* goto LAB_00416227 */ throw new Error("goto LAB_00416227 not supported");
          case 'n':
            piVar4 = FUN_004166c0(heap, __addr_param_3);
            if ((local_24c & 0x20) == 0) {
              local_228 = 1;
              heap.u32(piVar4) = heap.u32(__addr_local_240);
            } else {
              local_228 = 1;
              heap.u32(piVar4) = heap.u32(__addr_local_240);
            }
            break;
          case 'o':
            local_22c = 8;
            if ((local_24c & 0x80) != 0) {
              local_24c = local_24c | 0x200;
            }
            /* goto LAB_00416227 */ throw new Error("goto LAB_00416227 not supported");
          case 'p':
            local_244 = 8;
            switchD_00415ef1_caseD_58: local_224 = 7;
            LAB_004161e2: local_22c = 0x10;
            if ((local_24c & 0x80) != 0) {
              heap.setU32(__addr_local_23a, (0x30) >>> 0);
              local_239 = local_224 + 'Q';
              local_238 = 2;
            }
            /* goto LAB_00416227 */ throw new Error("goto LAB_00416227 not supported");
          case 'u':
            local_22c = 10;
            LAB_00416227: if ((local_24c & 0x8000) == 0) {
              if ((local_24c & 0x20) == 0) {
                if ((local_24c & 0x40) == 0) {
                  uVar2 = FUN_004166c0(heap, __addr_param_3);
                  uVar13 = uVar2;
                } else {
                  iVar12 = FUN_004166c0(heap, __addr_param_3);
                  uVar13 = iVar12;
                }
              } else {
                if ((local_24c & 0x40) == 0) {
                uVar2 = FUN_004166c0(heap, __addr_param_3);
                uVar13 = (ulonglong)(uVar2 & 0xffff);
              } else {
                sVar1 = FUN_004166c0(heap, __addr_param_3);
                uVar13 = sVar1;
              }
              }
            } else {
              uVar13 = FUN_004166e0(heap, __addr_param_3);
            }
            if ((((local_24c & 0x40) != 0) && (uVar13 < 0x100000000)) && (uVar13 < 0)) {
              uVar13 = CONCAT44(heap, -((uVar13 >>> 0x20) + (uint)(uVar13 != 0)), -uVar13);
              local_24c = local_24c | 0x100;
            }
            iVar7 = (uVar13 >>> 0x20);
            iVar12 = uVar13;
            if ((local_24c & 0x8000) == 0) {
              iVar7 = 0;
            }
            if (local_244 < 0) {
              local_244 = 1;
            } else {
              local_24c = local_24c & 0xfffffff7;
            }
            local_248 = register0x00000010;
            lVar14 = CONCAT44(heap, iVar7, iVar12);
            if (iVar12 == 0 && iVar7 == 0) {
              local_238 = 0;
              lVar14 = CONCAT44(heap, iVar7, iVar12);
            }
            while (true) {
              iVar12 = local_22c;
              psVar5 = (local_248 + -1);
              iVar7 = local_244 + -1;
              if ((local_244 < 1) && (lVar14 == 0)) {
                break;
              }
              local_204 = local_22c >>> 0x1f;
              iVar6 = __aullrem(lVar14, local_22c, local_204);
              iVar6 = iVar6 + 0x30;
              lVar14 = __aulldiv(lVar14, iVar12, local_204);
              if (0x39 < iVar6) {
                iVar6 = iVar6 + local_224;
              }
              heap.u32(psVar5) = iVar6;
              local_244 = iVar7;
              local_248 = psVar5;
            }
            puVar10 = __addr_uStack_1 + -psVar5;
            local_244 = iVar7;
            if (((local_24c & 0x200) != 0) && ((heap.u32(local_248) != '0' || (puVar10 == 0x0)))) {
              puVar10 = __addr_stack0x00000000 + -psVar5;
              heap.u32(psVar5) = '0';
              local_248 = psVar5;
            }
            break;
          case 'x':
            local_224 = 0x27;
            /* goto LAB_004161e2 */ throw new Error("goto LAB_004161e2 not supported");
        }
        if (local_228 == 0) {
          if ((local_24c & 0x40) != 0) {
            if ((local_24c & 0x100) == 0) {
              if ((local_24c & 1) == 0) {
                if ((local_24c & 2) == 0) {
                  /* goto LAB_004163bf */ throw new Error("goto LAB_004163bf not supported");
                }
                heap.setU32(__addr_local_23a, (0x20) >>> 0);
              } else {
                heap.setU32(__addr_local_23a, (0x2b) >>> 0);
              }
            } else {
              heap.setU32(__addr_local_23a, (0x2d) >>> 0);
            }
            local_238 = 1;
          }
          LAB_004163bf: iVar12 = (local_234 - local_238) - puVar10;
          if ((local_24c & 0xc) == 0) {
            FUN_00416640(heap, 0x20, iVar12, param_1, __addr_local_240);
          }
          FUN_00416680(heap, __addr_local_23a, local_238, param_1, __addr_local_240);
          if (((local_24c & 8) != 0) && ((local_24c & 4) == 0)) {
            FUN_00416640(heap, 0x30, iVar12, param_1, __addr_local_240);
          }
          if ((local_230 == 0) || (psVar5 = local_248, puVar9 = puVar10, puVar10 < 1)) {
            FUN_00416680(heap, local_248, puVar10, param_1, __addr_local_240);
          } else {
            do {
              puVar9 = puVar9 + -1;
              iVar7 = FUN_00417d10(heap, __addr_local_214, heap.u32(psVar5));
              if (iVar7 < 1) {
                break;
              }
              FUN_00416680(heap, __addr_local_214, iVar7, param_1, __addr_local_240);
              psVar5 = psVar5 + 1;
            } while (puVar9 != 0x0);
          }
          if ((local_24c & 4) != 0) {
            FUN_00416640(heap, 0x20, iVar12, param_1, __addr_local_240);
          }
        }
    }
    cVar8 = heap.u32(param_2);
    local_21c = CONCAT31(heap, (((local_21c) >>> 8) & 0xffffffff), cVar8);
    pcVar11 = param_2;
  } while (true);
} finally {
    heap.freeFrame(544);
  }
}
