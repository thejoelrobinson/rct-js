// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4190f0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT22, CONCAT31 } from "../runtime/win32.js";
import { FUN_00416f60 } from "./416f60.js";
import { FUN_00418ff0 } from "./418ff0.js";
import { FUN_00419f50 } from "./419f50.js";
export function FUN_004190f0(heap, param_1, param_2, param_3, param_4, param_5, param_6, param_7) {
  const __sp = heap.allocFrame(28);
  const __addr_local_2c = __sp + 0;
  const __addr_local_1c = __sp + 4;
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
  let uVar13 = 0;
  let local_60 = 0;
  let local_54 = 0;
  let local_4c = 0;
  let local_48 = 0;
  let local_30 = 0;
  let uStack_2a = 0;
  let uStack_28 = 0;
  let local_22 = 0;
  let local_5 = 0;
  local_5c = __addr_local_1c;
  iVar8 = 0;
  uVar13 = 0;
  uVar7 = 0;
  local_4c = 1;
  local_54 = 0;
  bVar2 = false;
  bVar4 = false;
  bVar3 = false;
  bVar5 = false;
  bVar6 = false;
  local_48 = 0;
  local_60 = 0;
  local_30 = 0;
  local_50 = param_3;
  for (pbVar11 = param_3; (((bVar10 = heap.u32(pbVar11), bVar10 == 0x20 || (bVar10 == 9)) || (bVar10 == 10)) || (pbVar14 = param_3, bVar10 == 0xd)); pbVar11 = pbVar11 + 1) {
  
  }
  do {
    bVar10 = heap.u32(pbVar11);
    pbVar12 = pbVar11 + 1;
    param_3 = CONCAT31(heap, (((param_3) >>> 8) & 0xffffffff), bVar10);
    switch (iVar8) {
      case 0:
        if (('0' < bVar10) && (bVar10 < ':')) {
          iVar8 = 3;
          /* goto LAB_004195c2 */ throw new Error("goto LAB_004195c2 not supported");
        }
        if (bVar10 == heap.u32(0x005ee758)) {
          iVar8 = 5;
        } else {
          if (bVar10 == 0x2b) {
          iVar8 = 2;
          uVar7 = 0;
        } else {
          if (bVar10 == 0x2d) {
          iVar8 = 2;
          uVar7 = 0x8000;
        } else {
          if (bVar10 != 0x30) {
            /* goto switchD_004193b2_caseD_2c */ throw new Error("goto switchD_004193b2_caseD_2c not supported");
          }
          iVar8 = 1;
        }
        }
        }
        break;
      case 1:
        bVar2 = true;
        if (('0' < bVar10) && (bVar10 < ':')) {
          iVar8 = 3;
          /* goto LAB_004195c2 */ throw new Error("goto LAB_004195c2 not supported");
        }
        if (bVar10 == heap.u32(0x005ee758)) {
          iVar8 = 4;
        } else {
          switch (bVar10) {
            case 0x2b:
            case 0x2d:
              /* goto switchD_004193b2_caseD_2b */ throw new Error("goto switchD_004193b2_caseD_2b not supported");
            default:
              /* goto switchD_004193b2_caseD_2c */ throw new Error("goto switchD_004193b2_caseD_2c not supported");
            case 0x30:
              switchD_00419226_caseD_30: iVar8 = 1;
              break;
            case 0x44:
            case 0x45:
            case 100:
            case 0x65:
              /* goto switchD_004193b2_caseD_44 */ throw new Error("goto switchD_004193b2_caseD_44 not supported");
          }
        }
        break;
      case 2:
        if (('0' < bVar10) && (bVar10 < ':')) {
          iVar8 = 3;
          /* goto LAB_004195c2 */ throw new Error("goto LAB_004195c2 not supported");
        }
        if (bVar10 == heap.u32(0x005ee758)) {
          iVar8 = 5;
        } else {
          if (bVar10 == 0x30) {
            /* goto switchD_00419226_caseD_30 */ throw new Error("goto switchD_00419226_caseD_30 not supported");
          }
          iVar8 = 10;
          pbVar12 = pbVar14;
        }
        break;
      case 3:
        while (true) {
          bVar2 = true;
          if (heap.u32(0x005ee754) < 2) {
            uVar9 = heap.u32(heap.u32(0x005ee548) + ((param_3 & 0xff) * 2) * 4) & 4;
          } else {
            uVar9 = FUN_00416f60(heap, param_3 & 0xff, 4);
          }
          if (uVar9 == 0) {
            break;
          }
          if (uVar13 < 0x19) {
            uVar13 = uVar13 + 1;
            heap.u32(local_5c) = bVar10 - 0x30;
            bVar10 = heap.u32(pbVar12);
            local_5c = local_5c + 1;
            param_3 = CONCAT31(heap, (((param_3) >>> 8) & 0xffffffff), bVar10);
            pbVar12 = pbVar12 + 1;
          } else {
            bVar10 = heap.u32(pbVar12);
            local_60 = local_60 + 1;
            param_3 = CONCAT31(heap, (((param_3) >>> 8) & 0xffffffff), bVar10);
            pbVar12 = pbVar12 + 1;
          }
        }
        local_54 = uVar13;
        if (bVar10 != heap.u32(0x005ee758)) {
          switch (bVar10) {
            case 0x2b:
            case 0x2d:
              /* goto switchD_004193b2_caseD_2b */ throw new Error("goto switchD_004193b2_caseD_2b not supported");
            case 0x44:
            case 0x45:
            case 100:
            case 0x65:
              /* goto switchD_004193b2_caseD_44 */ throw new Error("goto switchD_004193b2_caseD_44 not supported");
          }
          switchD_004193b2_caseD_2c: iVar8 = 10;
          /* goto LAB_004195c2 */ throw new Error("goto LAB_004195c2 not supported");
        }
        iVar8 = 4;
        break;
      case 4:
        bVar4 = true;
        if (uVar13 == 0) {
          while (bVar10 == 0x30) {
            bVar10 = heap.u32(pbVar12);
            local_60 = local_60 + -1;
            pbVar12 = pbVar12 + 1;
            (((param_3) >>> 8) & 0xffffffff) = (undefined3)(param_3 >>> 8);
            param_3 = CONCAT31(heap, (((param_3) >>> 8) & 0xffffffff), bVar10);
          }
        }
        while (true) {
          bVar2 = true;
          if (heap.u32(0x005ee754) < 2) {
            uVar9 = heap.u32(heap.u32(0x005ee548) + ((param_3 & 0xff) * 2) * 4) & 4;
          } else {
            uVar9 = FUN_00416f60(heap, param_3 & 0xff, 4);
          }
          if (uVar9 == 0) {
            break;
          }
          if (uVar13 < 0x19) {
            uVar13 = uVar13 + 1;
            heap.u32(local_5c) = bVar10 - 0x30;
            local_5c = local_5c + 1;
            local_60 = local_60 + -1;
          }
          bVar10 = heap.u32(pbVar12);
          pbVar12 = pbVar12 + 1;
          param_3 = CONCAT31(heap, (((param_3) >>> 8) & 0xffffffff), bVar10);
        }
        local_54 = uVar13;
        switch (bVar10) {
          case 0x2b:
          case 0x2d:
            switchD_004193b2_caseD_2b: bVar2 = true;
            pbVar12 = pbVar12 + -1;
            iVar8 = 0xb;
            break;
          default:
            /* goto switchD_004193b2_caseD_2c */ throw new Error("goto switchD_004193b2_caseD_2c not supported");
          case 0x44:
          case 0x45:
          case 100:
          case 0x65:
            switchD_004193b2_caseD_44: bVar2 = true;
            iVar8 = 6;
        }
        break;
      case 5:
        bVar4 = true;
        if (heap.u32(0x005ee754) < 2) {
          uVar9 = heap.u32(heap.u32(0x005ee548) + (bVar10 * 2) * 4) & 4;
        } else {
          uVar9 = FUN_00416f60(heap, bVar10, 4);
        }
        if (uVar9 == 0) {
          iVar8 = 10;
          pbVar12 = pbVar14;
        } else {
          iVar8 = 4;
          pbVar12 = pbVar11;
        }
        break;
      case 6:
        pbVar11 = pbVar11 + -1;
        pbVar14 = pbVar11;
        local_50 = pbVar11;
        if (('0' < bVar10) && (bVar10 < ':')) {
          iVar8 = 9;
          /* goto LAB_004195c2 */ throw new Error("goto LAB_004195c2 not supported");
        }
        if (bVar10 == 0x2b) {
          LAB_004195b6: iVar8 = 7;
          pbVar14 = pbVar11;
          local_50 = pbVar11;
        } else {
          if (bVar10 != 0x2d) {
            /* goto LAB_004194a6 */ throw new Error("goto LAB_004194a6 not supported");
          }
          LAB_004195a7: iVar8 = 7;
          local_4c = -1;
          pbVar14 = pbVar11;
          local_50 = pbVar11;
        }
        break;
      case 7:
        if (('0' < bVar10) && (bVar10 < ':')) {
          iVar8 = 9;
          /* goto LAB_004195c2 */ throw new Error("goto LAB_004195c2 not supported");
        }
        LAB_004194a6: if (bVar10 == 0x30) {
          iVar8 = 8;
        } else {
          iVar8 = 10;
          pbVar12 = pbVar14;
        }
        break;
      case 8:
        bVar3 = true;
        while (bVar10 == 0x30) {
          bVar10 = heap.u32(pbVar12);
          pbVar12 = pbVar12 + 1;
        }
        if ((bVar10 < '1') || ('9' < bVar10)) {
          /* goto switchD_004193b2_caseD_2c */ throw new Error("goto switchD_004193b2_caseD_2c not supported");
        }
        iVar8 = 9;
        LAB_004195c2: pbVar12 = pbVar12 + -1;
        break;
      case 9:
        bVar3 = true;
        local_48 = 0;
        while (true) {
          if (heap.u32(0x005ee754) < 2) {
            uVar13 = heap.u32(heap.u32(0x005ee548) + ((param_3 & 0xff) * 2) * 4) & 4;
          } else {
            uVar13 = FUN_00416f60(heap, param_3 & 0xff, 4);
          }
          if (uVar13 == 0) {
            /* goto LAB_0041952a */ throw new Error("goto LAB_0041952a not supported");
          }
          local_48 = bVar10 + -0x30 + local_48 * 10;
          if (0x1450 < local_48) {
            break;
          }
          bVar10 = heap.u32(pbVar12);
          pbVar12 = pbVar12 + 1;
          param_3 = CONCAT31(heap, (((param_3) >>> 8) & 0xffffffff), bVar10);
        }
        local_48 = 0x1451;
        LAB_0041952a: while (true) {
          if (heap.u32(0x005ee754) < 2) {
            uVar13 = heap.u32(heap.u32(0x005ee548) + ((param_3 & 0xff) * 2) * 4) & 4;
          } else {
            uVar13 = FUN_00416f60(heap, param_3 & 0xff, 4);
          }
          if (uVar13 == 0) {
            break;
          }
          bVar10 = heap.u32(pbVar12);
          pbVar12 = pbVar12 + 1;
          param_3 = CONCAT31(heap, (((param_3) >>> 8) & 0xffffffff), bVar10);
        }
        iVar8 = 10;
        pbVar12 = pbVar12 + -1;
        uVar13 = local_54;
        pbVar14 = local_50;
        break;
      case 0xb:
        if (param_7 == 0) {
          /* goto switchD_004193b2_caseD_2c */ throw new Error("goto switchD_004193b2_caseD_2c not supported");
        }
        if (bVar10 == 0x2b) {
          /* goto LAB_004195b6 */ throw new Error("goto LAB_004195b6 not supported");
        }
        if (bVar10 == 0x2d) {
          /* goto LAB_004195a7 */ throw new Error("goto LAB_004195a7 not supported");
        }
        iVar8 = 10;
        pbVar12 = pbVar11;
        pbVar14 = pbVar11;
        local_50 = pbVar11;
    }
    pbVar11 = pbVar12;
  } while (iVar8 != 10);
  heap.u32(param_2) = pbVar12;
  if (bVar2) {
    if (0x18 < uVar13) {
      if ('\x04' < local_5) {
        local_5 = local_5 + '\x01';
      }
      local_5c = local_5c + -1;
      local_60 = local_60 + 1;
      uVar13 = 0x18;
    }
    if (uVar13 == 0) {
      heap.setU32(__addr_local_2c, (0) >>> 0);
      local_22 = 0;
      param_3 = 0x0;
      pbVar11 = 0x0;
      /* goto LAB_00419694 */ throw new Error("goto LAB_00419694 not supported");
    }
    cVar1 = heap.u32(local_5c + (-1) * 4);
    while (cVar1 == '\0') {
      uVar13 = uVar13 - 1;
      local_60 = local_60 + 1;
      cVar1 = heap.u32(local_5c + (-2) * 4);
      local_5c = local_5c + -1;
    }
    FUN_00418ff0(heap, __addr_local_1c, uVar13, __addr_local_2c);
    if (local_4c < 0) {
      local_48 = -local_48;
    }
    local_48 = local_48 + local_60;
    if (!bVar3) {
      local_48 = local_48 + param_5;
    }
    if (!bVar4) {
      local_48 = local_48 - param_6;
    }
    if (local_48 < 0x1451) {
      if (-0x1451 < local_48) {
        FUN_00419f50(heap, __addr_local_2c, local_48, param_4);
        pbVar11 = CONCAT22(heap, uStack_28, uStack_2a);
        param_3 = local_26;
        /* goto LAB_00419694 */ throw new Error("goto LAB_00419694 not supported");
      }
      bVar6 = true;
    } else {
      bVar5 = true;
    }
  }
  heap.setU32(__addr_local_2c, (param_3) >>> 0);
  pbVar11 = param_3;
  local_22 = heap.u32(__addr_local_2c);
  LAB_00419694: if (bVar2) {
    if (bVar5) {
      pbVar11 = 0x0;
      local_22 = 0x7fff;
      param_3 = 0x80000000;
      heap.setU32(__addr_local_2c, (0) >>> 0);
      local_30 = 2;
    } else {
      if (bVar6) {
      heap.setU32(__addr_local_2c, (0) >>> 0);
      local_22 = 0;
      param_3 = 0x0;
      pbVar11 = 0x0;
      local_30 = 1;
    }
    }
  } else {
    heap.setU32(__addr_local_2c, (0) >>> 0);
    local_22 = 0;
    param_3 = 0x0;
    pbVar11 = 0x0;
    local_30 = 4;
  }
  heap.u32(param_1) = heap.u32(__addr_local_2c);
  heap.u32((param_1 + 1)) = pbVar11;
  heap.u32((param_1 + 3)) = param_3;
  heap.u32(param_1 + (5) * 4) = local_22 | uVar7;
  return local_30;
} finally {
    heap.freeFrame(28);
  }
}
