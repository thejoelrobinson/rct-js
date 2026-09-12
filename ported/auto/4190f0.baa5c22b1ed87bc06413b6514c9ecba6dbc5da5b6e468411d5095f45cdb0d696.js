// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4190f0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { undefined3 } from "../../runtime/win32.js";
import { CONCAT22, CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00416f60 } from "./416f60.js";
import { FUN_00418ff0 } from "./418ff0.js";
import { FUN_00419f50 } from "./419f50.js";
export function FUN_004190f0(heap, param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  const __sp = heap.allocFrame(43);
  const __addr_local_2c = __sp + 0;
  const __addr_local_1c = __sp + 16;
  const __addr_local_26 = __sp + 6;
  const __addr_local_22 = __sp + 10;
  const __addr_local_5 = __sp + 39;
  try {
  let cVar1 = 0;
  let bVar2 = 0;
  let bVar3 = 0;
  let bVar4 = 0;
  let bVar5 = 0;
  let bVar6 = 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let uVar9 = 0;
  let bVar10 = 0;
  let pbVar11 = 0;
  let pbVar12 = 0;
  let uVar13 = 0;
  let pbVar14 = 0;
  let local_60 = 0;
  let local_5c = 0;
  let local_54 = 0;
  let local_50 = 0;
  let local_4c = 0;
  let local_48 = 0;
  let local_30 = 0;
  let uStack_2a = 0;
  let uStack_28 = 0;
  LAB_00419694: {
  local_5c = ((__addr_local_1c) >>> 0);
  iVar8 = ((0) >>> 0);
  uVar13 = ((0) >>> 0);
  uVar7 = ((0) & 0xffff);
  local_4c = ((1) >>> 0);
  local_54 = ((0) >>> 0);
  bVar2 = ((false) & 0xff);
  bVar4 = ((false) & 0xff);
  bVar3 = ((false) & 0xff);
  bVar5 = ((false) & 0xff);
  bVar6 = ((false) & 0xff);
  local_48 = ((0) >>> 0);
  local_60 = ((0) >>> 0);
  local_30 = ((0) >>> 0);
  local_50 = ((param_3) >>> 0);
  for (pbVar11 = ((param_3) >>> 0); (((bVar10 = ((heap.u8(pbVar11)) & 0xff), bVar10 == 0x20 || (bVar10 == 9)) || (bVar10 == 10)) || (pbVar14 = ((param_3) >>> 0), bVar10 == 0xd)); pbVar11 = (((pbVar11 + 1) >>> 0)) >>> 0) {
  
  }
  do {
    bVar10 = ((heap.u8(pbVar11)) & 0xff);
    pbVar12 = ((pbVar11 + 1) >>> 0);
    param_3 = ((CONCAT31((((param_3) >>> 8) & 0xffffffff), bVar10)) >>> 0);
    switch (iVar8) {
      case 0:
        if ((48 < ((bVar10) << 24 >> 24)) && (((bVar10) << 24 >> 24) < 58)) {
          iVar8 = ((3) >>> 0);
          /* goto LAB_004195c2 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/LAB_004195c2"); return 0;
        }
        if (bVar10 == heap.u32(0x005ee758)) {
          iVar8 = ((5) >>> 0);
        } else {
          if (bVar10 == 0x2b) {
          iVar8 = ((2) >>> 0);
          uVar7 = ((0) & 0xffff);
        } else {
          if (bVar10 == 0x2d) {
          iVar8 = ((2) >>> 0);
          uVar7 = ((0x8000) & 0xffff);
        } else {
          if (bVar10 != 0x30) {
            /* goto switchD_004193b2_caseD_2c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/switchD_004193b2_caseD_2c"); return 0;
          }
          iVar8 = ((1) >>> 0);
        }
        }
        }
        break;
      case 1:
        bVar2 = ((true) & 0xff);
        if ((48 < ((bVar10) << 24 >> 24)) && (((bVar10) << 24 >> 24) < 58)) {
          iVar8 = ((3) >>> 0);
          /* goto LAB_004195c2 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/LAB_004195c2"); return 0;
        }
        if (bVar10 == heap.u32(0x005ee758)) {
          iVar8 = ((4) >>> 0);
        } else {
          switch (bVar10) {
            case 0x2b:
            case 0x2d:
              /* goto switchD_004193b2_caseD_2b — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/switchD_004193b2_caseD_2b"); return 0;
            default:
              /* goto switchD_004193b2_caseD_2c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/switchD_004193b2_caseD_2c"); return 0;
            case 0x30:
              switchD_00419226_caseD_30: iVar8 = ((1) >>> 0);
              break;
            case 0x44:
            case 0x45:
            case 100:
            case 0x65:
              /* goto switchD_004193b2_caseD_44 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/switchD_004193b2_caseD_44"); return 0;
          }
        }
        break;
      case 2:
        if ((48 < ((bVar10) << 24 >> 24)) && (((bVar10) << 24 >> 24) < 58)) {
          iVar8 = ((3) >>> 0);
          /* goto LAB_004195c2 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/LAB_004195c2"); return 0;
        }
        if (bVar10 == heap.u32(0x005ee758)) {
          iVar8 = ((5) >>> 0);
        } else {
          if (bVar10 == 0x30) {
            /* goto switchD_00419226_caseD_30 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/switchD_00419226_caseD_30"); return 0;
          }
          iVar8 = ((10) >>> 0);
          pbVar12 = ((pbVar14) >>> 0);
        }
        break;
      case 3:
        while (true) {
          bVar2 = ((true) & 0xff);
          if (heap.u32(0x005ee754) < 2) {
            uVar9 = ((((heap.u32(heap.u32(0x005ee548) + ((((param_3) >>> 0) & 0xff) * 2) * 4)) & 0xff) & 4) >>> 0);
          } else {
            uVar9 = (((regs.eax = FUN_00416f60(heap, ((param_3) >>> 0) & 0xff, 4))) >>> 0);
          }
          if (uVar9 == 0) {
            break;
          }
          if (uVar13 < 0x19) {
            uVar13 = ((uVar13 + 1) >>> 0);
            heap.setU32(local_5c, (bVar10 - 0x30) & 0xffffffff);
            bVar10 = ((heap.u8(pbVar12)) & 0xff);
            local_5c = ((local_5c + 1) >>> 0);
            param_3 = ((CONCAT31((((param_3) >>> 8) & 0xffffffff), bVar10)) >>> 0);
            pbVar12 = ((pbVar12 + 1) >>> 0);
          } else {
            bVar10 = ((heap.u8(pbVar12)) & 0xff);
            local_60 = ((local_60 + 1) >>> 0);
            param_3 = ((CONCAT31((((param_3) >>> 8) & 0xffffffff), bVar10)) >>> 0);
            pbVar12 = ((pbVar12 + 1) >>> 0);
          }
        }
        local_54 = ((uVar13) >>> 0);
        if (bVar10 != heap.u32(0x005ee758)) {
          switch (bVar10) {
            case 0x2b:
            case 0x2d:
              /* goto switchD_004193b2_caseD_2b — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/switchD_004193b2_caseD_2b"); return 0;
            case 0x44:
            case 0x45:
            case 100:
            case 0x65:
              /* goto switchD_004193b2_caseD_44 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/switchD_004193b2_caseD_44"); return 0;
          }
          switchD_004193b2_caseD_2c: iVar8 = ((10) >>> 0);
          /* goto LAB_004195c2 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/LAB_004195c2"); return 0;
        }
        iVar8 = ((4) >>> 0);
        break;
      case 4:
        bVar4 = ((true) & 0xff);
        if (uVar13 == 0) {
          while (bVar10 == 0x30) {
            bVar10 = ((heap.u8(pbVar12)) & 0xff);
            local_60 = ((local_60 + -1) >>> 0);
            pbVar12 = ((pbVar12 + 1) >>> 0);
            (function(){ throw new Error("c-to-js: unhandled LHS form field_expression in FUN_004190f0"); })();
            param_3 = ((CONCAT31((((param_3) >>> 8) & 0xffffffff), bVar10)) >>> 0);
          }
        }
        while (true) {
          bVar2 = ((true) & 0xff);
          if (heap.u32(0x005ee754) < 2) {
            uVar9 = ((((heap.u32(heap.u32(0x005ee548) + ((((param_3) >>> 0) & 0xff) * 2) * 4)) & 0xff) & 4) >>> 0);
          } else {
            uVar9 = (((regs.eax = FUN_00416f60(heap, ((param_3) >>> 0) & 0xff, 4))) >>> 0);
          }
          if (uVar9 == 0) {
            break;
          }
          if (uVar13 < 0x19) {
            uVar13 = ((uVar13 + 1) >>> 0);
            heap.setU32(local_5c, (bVar10 - 0x30) & 0xffffffff);
            local_5c = ((local_5c + 1) >>> 0);
            local_60 = ((local_60 + -1) >>> 0);
          }
          bVar10 = ((heap.u8(pbVar12)) & 0xff);
          pbVar12 = ((pbVar12 + 1) >>> 0);
          param_3 = ((CONCAT31((((param_3) >>> 8) & 0xffffffff), bVar10)) >>> 0);
        }
        local_54 = ((uVar13) >>> 0);
        switch (bVar10) {
          case 0x2b:
          case 0x2d:
            switchD_004193b2_caseD_2b: bVar2 = ((true) & 0xff);
            pbVar12 = ((pbVar12 + -1) >>> 0);
            iVar8 = ((0xb) >>> 0);
            break;
          default:
            /* goto switchD_004193b2_caseD_2c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/switchD_004193b2_caseD_2c"); return 0;
          case 0x44:
          case 0x45:
          case 100:
          case 0x65:
            switchD_004193b2_caseD_44: bVar2 = ((true) & 0xff);
            iVar8 = ((6) >>> 0);
        }
        break;
      case 5:
        bVar4 = ((true) & 0xff);
        if (heap.u32(0x005ee754) < 2) {
          uVar9 = ((((heap.u32(heap.u32(0x005ee548) + (((bVar10) >>> 0) * 2) * 4)) & 0xff) & 4) >>> 0);
        } else {
          uVar9 = (((regs.eax = FUN_00416f60(heap, bVar10, 4))) >>> 0);
        }
        if (uVar9 == 0) {
          iVar8 = ((10) >>> 0);
          pbVar12 = ((pbVar14) >>> 0);
        } else {
          iVar8 = ((4) >>> 0);
          pbVar12 = ((pbVar11) >>> 0);
        }
        break;
      case 6:
        pbVar11 = ((pbVar11 + -1) >>> 0);
        pbVar14 = ((pbVar11) >>> 0);
        local_50 = ((pbVar11) >>> 0);
        if ((48 < ((bVar10) << 24 >> 24)) && (((bVar10) << 24 >> 24) < 58)) {
          iVar8 = ((9) >>> 0);
          /* goto LAB_004195c2 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/LAB_004195c2"); return 0;
        }
        if (bVar10 == 0x2b) {
          LAB_004195b6: iVar8 = ((7) >>> 0);
          pbVar14 = ((pbVar11) >>> 0);
          local_50 = ((pbVar11) >>> 0);
        } else {
          if (bVar10 != 0x2d) {
            /* goto LAB_004194a6 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/LAB_004194a6"); return 0;
          }
          LAB_004195a7: iVar8 = ((7) >>> 0);
          local_4c = ((-1) >>> 0);
          pbVar14 = ((pbVar11) >>> 0);
          local_50 = ((pbVar11) >>> 0);
        }
        break;
      case 7:
        if ((48 < ((bVar10) << 24 >> 24)) && (((bVar10) << 24 >> 24) < 58)) {
          iVar8 = ((9) >>> 0);
          /* goto LAB_004195c2 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/LAB_004195c2"); return 0;
        }
        LAB_004194a6: if (bVar10 == 0x30) {
          iVar8 = ((8) >>> 0);
        } else {
          iVar8 = ((10) >>> 0);
          pbVar12 = ((pbVar14) >>> 0);
        }
        break;
      case 8:
        bVar3 = ((true) & 0xff);
        while (bVar10 == 0x30) {
          bVar10 = ((heap.u8(pbVar12)) & 0xff);
          pbVar12 = ((pbVar12 + 1) >>> 0);
        }
        if ((((bVar10) << 24 >> 24) < 49) || (57 < ((bVar10) << 24 >> 24))) {
          /* goto switchD_004193b2_caseD_2c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/switchD_004193b2_caseD_2c"); return 0;
        }
        iVar8 = ((9) >>> 0);
        LAB_004195c2: pbVar12 = ((pbVar12 + -1) >>> 0);
        break;
      case 9:
        bVar3 = ((true) & 0xff);
        local_48 = ((0) >>> 0);
        while (true) {
          if (heap.u32(0x005ee754) < 2) {
            uVar13 = ((((heap.u32(heap.u32(0x005ee548) + ((((param_3) >>> 0) & 0xff) * 2) * 4)) & 0xff) & 4) >>> 0);
          } else {
            uVar13 = (((regs.eax = FUN_00416f60(heap, ((param_3) >>> 0) & 0xff, 4))) >>> 0);
          }
          if (uVar13 == 0) {
            /* goto LAB_0041952a — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/LAB_0041952a"); return 0;
          }
          local_48 = ((((bVar10) << 24 >> 24) + -0x30 + local_48 * 10) >>> 0);
          if (0x1450 < local_48) {
            break;
          }
          bVar10 = ((heap.u8(pbVar12)) & 0xff);
          pbVar12 = ((pbVar12 + 1) >>> 0);
          param_3 = ((CONCAT31((((param_3) >>> 8) & 0xffffffff), bVar10)) >>> 0);
        }
        local_48 = ((0x1451) >>> 0);
        LAB_0041952a: while (true) {
          if (heap.u32(0x005ee754) < 2) {
            uVar13 = ((((heap.u32(heap.u32(0x005ee548) + ((((param_3) >>> 0) & 0xff) * 2) * 4)) & 0xff) & 4) >>> 0);
          } else {
            uVar13 = (((regs.eax = FUN_00416f60(heap, ((param_3) >>> 0) & 0xff, 4))) >>> 0);
          }
          if (uVar13 == 0) {
            break;
          }
          bVar10 = ((heap.u8(pbVar12)) & 0xff);
          pbVar12 = ((pbVar12 + 1) >>> 0);
          param_3 = ((CONCAT31((((param_3) >>> 8) & 0xffffffff), bVar10)) >>> 0);
        }
        iVar8 = ((10) >>> 0);
        pbVar12 = ((pbVar12 + -1) >>> 0);
        uVar13 = ((local_54) >>> 0);
        pbVar14 = ((local_50) >>> 0);
        break;
      case 0xb:
        if (param_7 == 0) {
          /* goto switchD_004193b2_caseD_2c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/switchD_004193b2_caseD_2c"); return 0;
        }
        if (bVar10 == 0x2b) {
          /* goto LAB_004195b6 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/LAB_004195b6"); return 0;
        }
        if (bVar10 == 0x2d) {
          /* goto LAB_004195a7 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004190f0/LAB_004195a7"); return 0;
        }
        iVar8 = ((10) >>> 0);
        pbVar12 = ((pbVar11) >>> 0);
        pbVar14 = ((pbVar11) >>> 0);
        local_50 = ((pbVar11) >>> 0);
    }
    pbVar11 = ((pbVar12) >>> 0);
  } while (iVar8 != 10);
  heap.setU32(param_2, (((pbVar12) | 0)) & 0xffffffff);
  if (bVar2) {
    if (0x18 < uVar13) {
      if (4 < heap.u32(__addr_local_5)) {
        heap.setU32(__addr_local_5, (heap.u32(__addr_local_5) + 1) >>> 0);
      }
      local_5c = ((local_5c + -1) >>> 0);
      local_60 = ((local_60 + 1) >>> 0);
      uVar13 = ((0x18) >>> 0);
    }
    if (uVar13 == 0) {
      heap.setU32(__addr_local_2c, (0) >>> 0);
      heap.setU32(__addr_local_22, (0) >>> 0);
      param_3 = ((0x0) >>> 0);
      pbVar11 = ((0x0) >>> 0);
      break LAB_00419694;
    }
    cVar1 = ((heap.i8(local_5c + (-1))) & 0xff);
    while (cVar1 == 0) {
      uVar13 = ((uVar13 - 1) >>> 0);
      local_60 = ((local_60 + 1) >>> 0);
      cVar1 = ((heap.i8(local_5c + (-2))) & 0xff);
      local_5c = ((local_5c + -1) >>> 0);
    }
    (regs.eax = FUN_00418ff0(heap, __addr_local_1c, uVar13, __addr_local_2c));
    if (local_4c < 0) {
      local_48 = ((-local_48) >>> 0);
    }
    local_48 = ((local_48 + local_60) >>> 0);
    if (!bVar3) {
      local_48 = ((local_48 + param_5) >>> 0);
    }
    if (!bVar4) {
      local_48 = ((local_48 - param_6) >>> 0);
    }
    if (local_48 < 0x1451) {
      if (-0x1451 < local_48) {
        (regs.eax = FUN_00419f50(heap, __addr_local_2c, local_48, param_4));
        pbVar11 = ((CONCAT22(uStack_28, uStack_2a)) >>> 0);
        param_3 = ((heap.u32(__addr_local_26)) >>> 0);
        break LAB_00419694;
      }
      bVar6 = ((true) & 0xff);
    } else {
      bVar5 = ((true) & 0xff);
    }
  }
  heap.setU32(__addr_local_2c, (((param_3) & 0xffff)) >>> 0);
  pbVar11 = ((param_3) >>> 0);
  heap.setU32(__addr_local_22, (heap.u32(__addr_local_2c)) >>> 0);
  }
  if (bVar2) {
    if (bVar5) {
      pbVar11 = ((0x0) >>> 0);
      heap.setU32(__addr_local_22, (0x7fff) >>> 0);
      param_3 = ((0x80000000) >>> 0);
      heap.setU32(__addr_local_2c, (0) >>> 0);
      local_30 = ((2) >>> 0);
    } else {
      if (bVar6) {
      heap.setU32(__addr_local_2c, (0) >>> 0);
      heap.setU32(__addr_local_22, (0) >>> 0);
      param_3 = ((0x0) >>> 0);
      pbVar11 = ((0x0) >>> 0);
      local_30 = ((1) >>> 0);
    }
    }
  } else {
    heap.setU32(__addr_local_2c, (0) >>> 0);
    heap.setU32(__addr_local_22, (0) >>> 0);
    param_3 = ((0x0) >>> 0);
    pbVar11 = ((0x0) >>> 0);
    local_30 = ((4) >>> 0);
  }
  heap.setU32(param_1, (heap.u32(__addr_local_2c)) & 0xffffffff);
  heap.setU32((param_1 + ((1) * 2)), (pbVar11) & 0xffffffff);
  heap.setU32((param_1 + ((3) * 2)), (param_3) & 0xffffffff);
  heap.setU16((param_1 + (5) * 2), (heap.u32(__addr_local_22) | uVar7) & 0xffff);
  return local_30;
} finally {
    heap.freeFrame(43);
  }
}
