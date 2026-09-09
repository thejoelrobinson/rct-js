// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/415c60.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { register0x00000010 } from "../../runtime/win32.js";
import { CONCAT31, CONCAT44 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004165f0 } from "./4165f0.js";
import { FUN_00416640 } from "./416640.js";
import { FUN_00416680 } from "./416680.js";
import { FUN_004166c0 } from "./4166c0.js";
import { FUN_004166e0 } from "./4166e0.js";
import { FUN_00416700 } from "./416700.js";
import { FUN_00417d10 } from "./417d10.js";
export function FUN_00415c60(heap, param_1, param_2, param_3) {
  const __sp = heap.allocFrame(576);
  const __addr_local_240 = __sp + 0;
  const __addr_param_3 = __sp + 4;
  const __addr_local_210 = __sp + 48;
  const __addr_uStack_1 = __sp + 12;
  const __addr_stack0x00000000 = __sp + 16;
  const __addr_local_23a = __sp + 6;
  const __addr_local_214 = __sp + 44;
  const __addr_local_200 = __sp + 64;
  const __addr_local_239 = __sp + 7;
  const __addr_local_238 = __sp + 8;
  const __addr_local_234 = __sp + 12;
  const __addr_local_230 = __sp + 16;
  const __addr_local_22c = __sp + 20;
  const __addr_local_228 = __sp + 24;
  const __addr_local_224 = __sp + 28;
  const __addr_local_220 = __sp + 32;
  const __addr_local_21c = __sp + 36;
  const __addr_local_218 = __sp + 40;
  const __addr_local_20c = __sp + 52;
  const __addr_local_204 = __sp + 60;
  heap.setU32(__addr_param_3, (param_3) >>> 0);
  try {
  let sVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let piVar4 = 0;
  let psVar5 = 0;
  let iVar6 = 0;
  let iVar7 = 0;
  let cVar8 = 0;
  let puVar9 = 0;
  let puVar10 = 0;
  let pcVar11 = 0;
  let iVar12 = 0;
  let uVar13 = 0;
  let lVar14 = 0;
  let local_24c = 0;
  let local_248 = 0;
  let local_244 = 0;
  heap.setU32(__addr_local_220, (0) >>> 0);
  puVar10 = ((0x0) >>> 0);
  heap.setU32(__addr_local_240, (0) >>> 0);
  cVar8 = ((heap.i8(param_2)) & 0xff);
  heap.setU32(__addr_local_21c, (CONCAT31((((heap.u32(__addr_local_21c)) >>> 8) & 0xffffffff), cVar8)) >>> 0);
  pcVar11 = ((param_2) >>> 0);
  do {
    if ((cVar8 == 0) || (param_2 = ((pcVar11 + 1) >>> 0), heap.u32(__addr_local_240) < 0)) {
      return heap.u32(__addr_local_240);
    }
    if ((cVar8 < 32) || (120 < cVar8)) {
      uVar2 = ((0) >>> 0);
    } else {
      uVar2 = ((((heap.u32("R6002\r\n- floating point not loaded\r\n" + (cVar8 + 0x24) * 4)) & 0xff) & 0xf) >>> 0);
    }
    heap.setU32(__addr_local_220, (((((heap.u32((0x005e7780) + (uVar2 * 8 + heap.u32(__addr_local_220)) * 4)) << 24 >> 24)) | 0) >>> 4) >>> 0);
    switch (heap.u32(__addr_local_220)) {
      case 0:
        switchD_00415cdd_caseD_0: heap.setU32(__addr_local_230, (0) >>> 0);
        if ((heap.u32(heap.u32(0x005ee548) + ((heap.u32(__addr_local_21c) & 0xff) * 2 + 1) * 4) & 0x80) != 0) {
          (regs.eax = FUN_004165f0(heap, ((cVar8) | 0), param_1, __addr_local_240));
          cVar8 = ((heap.i8(param_2)) & 0xff);
          param_2 = ((pcVar11 + 2) >>> 0);
        }
        (regs.eax = FUN_004165f0(heap, ((cVar8) | 0), param_1, __addr_local_240));
        break;
      case 1:
        heap.setU32(__addr_local_218, (0) >>> 0);
        heap.setU32(__addr_local_228, (0) >>> 0);
        heap.setU32(__addr_local_234, (0) >>> 0);
        heap.setU32(__addr_local_238, (0) >>> 0);
        local_24c = ((0) >>> 0);
        local_244 = ((-1) >>> 0);
        heap.setU32(__addr_local_230, (0) >>> 0);
        break;
      case 2:
        switch (cVar8) {
          case 32:
            local_24c = ((local_24c | 2) >>> 0);
            break;
          case 35:
            local_24c = ((local_24c | 0x80) >>> 0);
            break;
          case 43:
            local_24c = ((local_24c | 1) >>> 0);
            break;
          case 45:
            local_24c = ((local_24c | 4) >>> 0);
            break;
          case 48:
            local_24c = ((local_24c | 8) >>> 0);
        }
        break;
      case 3:
        if (cVar8 == 42) {
          heap.setU32(__addr_local_234, ((regs.eax = FUN_004166c0(heap, __addr_param_3))) >>> 0);
          if (heap.u32(__addr_local_234) < 0) {
            local_24c = ((local_24c | 4) >>> 0);
            heap.setU32(__addr_local_234, (-heap.u32(__addr_local_234)) >>> 0);
          }
        } else {
          heap.setU32(__addr_local_234, (cVar8 + -0x30 + heap.u32(__addr_local_234) * 10) >>> 0);
        }
        break;
      case 4:
        local_244 = ((0) >>> 0);
        break;
      case 5:
        if (cVar8 == 42) {
          local_244 = (((regs.eax = FUN_004166c0(heap, __addr_param_3))) >>> 0);
          if (local_244 < 0) {
            local_244 = ((-1) >>> 0);
          }
        } else {
          local_244 = ((cVar8 + -0x30 + local_244 * 10) >>> 0);
        }
        break;
      case 6:
        switch (cVar8) {
          case 73:
            if ((heap.i8(param_2) != 54) || (heap.i8(pcVar11 + (2)) != 52)) {
              heap.setU32(__addr_local_220, (0) >>> 0);
              /* goto switchD_00415cdd_caseD_0 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00415c60/switchD_00415cdd_caseD_0"); return 0;
            }
            param_2 = ((pcVar11 + 3) >>> 0);
            local_24c = ((local_24c | 0x8000) >>> 0);
            break;
          case 104:
            local_24c = ((local_24c | 0x20) >>> 0);
            break;
          case 108:
            local_24c = ((local_24c | 0x10) >>> 0);
            break;
          case 119:
            local_24c = ((local_24c | 0x800) >>> 0);
        }
        break;
      case 7:
        switch (cVar8) {
          case 67:
            if ((local_24c & 0x830) == 0) {
              local_24c = ((local_24c | 0x800) >>> 0);
            }
          case 99:
            if ((local_24c & 0x810) == 0) {
              heap.setU32((__addr_local_200 + (0) * 4), ((regs.eax = FUN_004166c0(heap, __addr_param_3))) & 0xffffffff);
              puVar10 = ((0x1) >>> 0);
            } else {
              uVar3 = (((regs.eax = FUN_00416700(heap, __addr_param_3))) >>> 0);
              puVar10 = (((regs.eax = FUN_00417d10(heap, __addr_local_200, uVar3))) >>> 0);
              if (((puVar10) | 0) < 0) {
                local_248 = ((__addr_local_200) >>> 0);
                heap.setU32(__addr_local_228, (1) >>> 0);
                break;
              }
            }
            local_248 = ((__addr_local_200) >>> 0);
            break;
          case 69:
          case 71:
            heap.setU32(__addr_local_218, (1) >>> 0);
            cVar8 = ((cVar8 + 32) & 0xff);
          case 101:
          case 102:
          case 103:
            local_248 = ((__addr_local_200) >>> 0);
            if (local_244 < 0) {
              local_244 = ((6) >>> 0);
            } else {
              if ((local_244 == 0) && (cVar8 == 103)) {
              local_244 = ((1) >>> 0);
            }
            }
            heap.setU32(__addr_local_210, (heap.u32(heap.u32(__addr_param_3))) >>> 0);
            heap.setU32(__addr_local_20c, (heap.u32(heap.u32(__addr_param_3) + (1) * 4)) >>> 0);
            heap.setU32(__addr_param_3, (heap.u32(__addr_param_3) + ((2) * 4)) >>> 0);
            (regs.eax = callIndirect(heap, heap.u32(0x005ee530), __addr_local_210, __addr_local_200, ((cVar8) | 0), local_244, heap.u32(__addr_local_218)));
            if (((local_24c & 0x80) != 0) && (local_244 == 0)) {
              (regs.eax = callIndirect(heap, heap.u32(0x005ee53c), __addr_local_200));
            }
            if ((cVar8 == 103) && ((local_24c & 0x80) == 0)) {
              (regs.eax = callIndirect(heap, heap.u32(0x005ee534), __addr_local_200));
            }
            uVar2 = ((local_24c | 0x40) >>> 0);
            if (heap.u32(__addr_local_200 + (0) * 4) == 45) {
              local_248 = (((__addr_local_200 + 1)) >>> 0);
              uVar2 = ((local_24c | 0x140) >>> 0);
            }
            local_24c = ((uVar2) >>> 0);
            uVar2 = ((0xffffffff) >>> 0);
            psVar5 = ((local_248) >>> 0);
            do {
              if (uVar2 == 0) {
                break;
              }
              uVar2 = ((uVar2 - 1) >>> 0);
              sVar1 = ((heap.i16(psVar5)) & 0xffff);
              psVar5 = (((((psVar5) | 0) + 1)) >>> 0);
            } while (((sVar1) << 24 >> 24) != 0);
            puVar10 = (((~uVar2 - 1)) >>> 0);
            break;
          case 83:
            if ((local_24c & 0x830) == 0) {
              local_24c = ((local_24c | 0x800) >>> 0);
            }
          case 115:
            iVar12 = ((0x7fffffff) >>> 0);
            if ((local_244 | 0) != -1) {
              iVar12 = ((local_244) >>> 0);
            }
            local_248 = (((regs.eax = FUN_004166c0(heap, __addr_param_3))) >>> 0);
            if ((local_24c & 0x810) == 0) {
              psVar5 = ((local_248) >>> 0);
              if (local_248 == 0x0) {
                psVar5 = ((heap.u32(0x005ee528)) >>> 0);
                local_248 = ((heap.u32(0x005ee528)) >>> 0);
              }
              for (; (iVar12 != 0 && (iVar12 = ((iVar12 + -1) >>> 0), ((heap.i16(psVar5)) << 24 >> 24) != 0)); psVar5 = ((((((psVar5) | 0) + 1)) >>> 0)) >>> 0) {
              
              }
              puVar10 = (((((psVar5) | 0) - ((local_248) | 0))) >>> 0);
            } else {
              if (local_248 == 0x0) {
                local_248 = ((heap.u32(0x005ee52c)) >>> 0);
              }
              heap.setU32(__addr_local_230, (1) >>> 0);
              for (psVar5 = ((local_248) >>> 0); (iVar12 != 0 && (iVar12 = ((iVar12 + -1) >>> 0), heap.i16(psVar5) != 0)); psVar5 = (((psVar5 + ((1) * 2)) >>> 0)) >>> 0) {
              
              }
              puVar10 = (((((psVar5) | 0) - ((local_248) | 0) >>> 1)) >>> 0);
            }
            break;
          case 88:
            /* goto switchD_00415ef1_caseD_58 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00415c60/switchD_00415ef1_caseD_58"); return 0;
          case 90:
            psVar5 = (((regs.eax = FUN_004166c0(heap, __addr_param_3))) >>> 0);
            if ((psVar5 == 0x0) || (local_248 = ((heap.u32((psVar5 + ((2) * 2)))) >>> 0), local_248 == 0x0)) {
              uVar2 = ((0xffffffff) >>> 0);
              local_248 = ((heap.u32(0x005ee528)) >>> 0);
              pcVar11 = ((heap.u32(0x005ee528)) >>> 0);
              do {
                if (uVar2 == 0) {
                  break;
                }
                uVar2 = ((uVar2 - 1) >>> 0);
                cVar8 = ((heap.i8(pcVar11)) & 0xff);
                pcVar11 = ((pcVar11 + 1) >>> 0);
              } while (cVar8 != 0);
              puVar10 = (((~uVar2 - 1)) >>> 0);
            } else {
              if ((local_24c & 0x800) == 0) {
              puVar10 = ((((heap.i16(psVar5)) | 0)) >>> 0);
              heap.setU32(__addr_local_230, (0) >>> 0);
            } else {
              heap.setU32(__addr_local_230, (1) >>> 0);
              puVar10 = (((((0) >>> 0) * psVar5 >>> 1)) >>> 0);
            }
            }
            break;
          case 100:
          case 105:
            heap.setU32(__addr_local_22c, (10) >>> 0);
            local_24c = ((local_24c | 0x40) >>> 0);
            /* goto LAB_00416227 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00415c60/LAB_00416227"); return 0;
          case 110:
            piVar4 = (((regs.eax = FUN_004166c0(heap, __addr_param_3))) >>> 0);
            if ((local_24c & 0x20) == 0) {
              heap.setU32(__addr_local_228, (1) >>> 0);
              heap.setU32(piVar4, (heap.u32(__addr_local_240)) & 0xffffffff);
            } else {
              heap.setU32(__addr_local_228, (1) >>> 0);
              heap.setU16(piVar4, (((heap.u32(__addr_local_240)) & 0xffff)) & 0xffff);
            }
            break;
          case 111:
            heap.setU32(__addr_local_22c, (8) >>> 0);
            if ((local_24c & 0x80) != 0) {
              local_24c = ((local_24c | 0x200) >>> 0);
            }
            /* goto LAB_00416227 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00415c60/LAB_00416227"); return 0;
          case 112:
            local_244 = ((8) >>> 0);
            switchD_00415ef1_caseD_58: heap.setU32(__addr_local_224, (7) >>> 0);
            LAB_004161e2: heap.setU32(__addr_local_22c, (0x10) >>> 0);
            if ((local_24c & 0x80) != 0) {
              heap.setU32(__addr_local_23a, (0x30) >>> 0);
              heap.setU32(__addr_local_239, (((heap.u32(__addr_local_224)) << 24 >> 24) + 81) >>> 0);
              heap.setU32(__addr_local_238, (2) >>> 0);
            }
            /* goto LAB_00416227 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00415c60/LAB_00416227"); return 0;
          case 117:
            heap.setU32(__addr_local_22c, (10) >>> 0);
            LAB_00416227: if ((local_24c & 0x8000) == 0) {
              if ((local_24c & 0x20) == 0) {
                if ((local_24c & 0x40) == 0) {
                  uVar2 = (((regs.eax = FUN_004166c0(heap, __addr_param_3))) >>> 0);
                  uVar13 = ((((uVar2) >>> 0)) >>> 0);
                } else {
                  iVar12 = (((regs.eax = FUN_004166c0(heap, __addr_param_3))) >>> 0);
                  uVar13 = ((((iVar12) >>> 0)) >>> 0);
                }
              } else {
                if ((local_24c & 0x40) == 0) {
                uVar2 = (((regs.eax = FUN_004166c0(heap, __addr_param_3))) >>> 0);
                uVar13 = ((((uVar2 & 0xffff) >>> 0)) >>> 0);
              } else {
                sVar1 = (((regs.eax = FUN_004166c0(heap, __addr_param_3))) & 0xffff);
                uVar13 = ((((((sVar1) | 0)) >>> 0)) >>> 0);
              }
              }
            } else {
              uVar13 = (((regs.eax = FUN_004166e0(heap, __addr_param_3))) >>> 0);
            }
            if ((((local_24c & 0x40) != 0) && (((uVar13) >>> 0) < 0x100000000)) && (((uVar13) >>> 0) < 0)) {
              uVar13 = ((CONCAT44(-((((uVar13 >>> 0x20)) | 0) + ((((uVar13) | 0) != 0) >>> 0)), -((uVar13) | 0))) >>> 0);
              local_24c = ((local_24c | 0x100) >>> 0);
            }
            iVar7 = (((((uVar13 >>> 0x20)) | 0)) >>> 0);
            iVar12 = ((((uVar13) | 0)) >>> 0);
            if ((local_24c & 0x8000) == 0) {
              iVar7 = ((0) >>> 0);
            }
            if (local_244 < 0) {
              local_244 = ((1) >>> 0);
            } else {
              local_24c = ((local_24c & 0xfffffff7) >>> 0);
            }
            local_248 = ((register0x00000010) >>> 0);
            lVar14 = ((CONCAT44(iVar7, iVar12)) >>> 0);
            if (iVar12 == 0 && iVar7 == 0) {
              heap.setU32(__addr_local_238, (0) >>> 0);
              lVar14 = ((CONCAT44(iVar7, iVar12)) >>> 0);
            }
            while (true) {
              iVar12 = ((heap.u32(__addr_local_22c)) >>> 0);
              psVar5 = (((((local_248) | 0) + -1)) >>> 0);
              iVar7 = ((local_244 + -1) >>> 0);
              if ((local_244 < 1) && (lVar14 == 0)) {
                break;
              }
              heap.setU32(__addr_local_204, (heap.u32(__addr_local_22c) >>> 0x1f) >>> 0);
              iVar6 = ((__aullrem(lVar14, heap.u32(__addr_local_22c), heap.u32(__addr_local_204))) >>> 0);
              iVar6 = ((iVar6 + 0x30) >>> 0);
              lVar14 = ((__aulldiv(lVar14, iVar12, heap.u32(__addr_local_204))) >>> 0);
              if (0x39 < iVar6) {
                iVar6 = ((iVar6 + heap.u32(__addr_local_224)) >>> 0);
              }
              heap.setI8(psVar5, (((iVar6) << 24 >> 24)) & 0xff);
              local_244 = ((iVar7) >>> 0);
              local_248 = ((psVar5) >>> 0);
            }
            puVar10 = ((__addr_uStack_1 + -((psVar5) | 0)) >>> 0);
            local_244 = ((iVar7) >>> 0);
            if (((local_24c & 0x200) != 0) && ((((heap.i16(local_248)) << 24 >> 24) != 48 || (puVar10 == 0x0)))) {
              puVar10 = ((__addr_stack0x00000000 + -((psVar5) | 0)) >>> 0);
              heap.setI8(psVar5, (48) & 0xff);
              local_248 = ((psVar5) >>> 0);
            }
            break;
          case 120:
            heap.setU32(__addr_local_224, (0x27) >>> 0);
            /* goto LAB_004161e2 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00415c60/LAB_004161e2"); return 0;
        }
        if (heap.u32(__addr_local_228) == 0) {
          LAB_004163bf: {
          if ((local_24c & 0x40) != 0) {
            if ((local_24c & 0x100) == 0) {
              if ((local_24c & 1) == 0) {
                if ((local_24c & 2) == 0) {
                  break LAB_004163bf;
                }
                heap.setU32(__addr_local_23a, (0x20) >>> 0);
              } else {
                heap.setU32(__addr_local_23a, (0x2b) >>> 0);
              }
            } else {
              heap.setU32(__addr_local_23a, (0x2d) >>> 0);
            }
            heap.setU32(__addr_local_238, (1) >>> 0);
          }
          }
          iVar12 = (((heap.u32(__addr_local_234) - heap.u32(__addr_local_238)) - ((puVar10) | 0)) >>> 0);
          if ((local_24c & 0xc) == 0) {
            (regs.eax = FUN_00416640(heap, 0x20, iVar12, param_1, __addr_local_240));
          }
          (regs.eax = FUN_00416680(heap, __addr_local_23a, heap.u32(__addr_local_238), param_1, __addr_local_240));
          if (((local_24c & 8) != 0) && ((local_24c & 4) == 0)) {
            (regs.eax = FUN_00416640(heap, 0x30, iVar12, param_1, __addr_local_240));
          }
          if ((heap.u32(__addr_local_230) == 0) || (psVar5 = ((local_248) >>> 0), puVar9 = ((puVar10) >>> 0), ((puVar10) | 0) < 1)) {
            (regs.eax = FUN_00416680(heap, local_248, puVar10, param_1, __addr_local_240));
          } else {
            do {
              puVar9 = ((puVar9 + -1) >>> 0);
              iVar7 = (((regs.eax = FUN_00417d10(heap, __addr_local_214, heap.i16(psVar5)))) >>> 0);
              if (iVar7 < 1) {
                break;
              }
              (regs.eax = FUN_00416680(heap, __addr_local_214, iVar7, param_1, __addr_local_240));
              psVar5 = ((psVar5 + ((1) * 2)) >>> 0);
            } while (puVar9 != 0x0);
          }
          if ((local_24c & 4) != 0) {
            (regs.eax = FUN_00416640(heap, 0x20, iVar12, param_1, __addr_local_240));
          }
        }
    }
    cVar8 = ((heap.i8(param_2)) & 0xff);
    heap.setU32(__addr_local_21c, (CONCAT31((((heap.u32(__addr_local_21c)) >>> 8) & 0xffffffff), cVar8)) >>> 0);
    pcVar11 = ((param_2) >>> 0);
  } while (true);
} finally {
    heap.freeFrame(576);
  }
}
