// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4138d0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004138d0(heap, param_1, param_2, param_3) {
  let uVar1 = 0;
  let puVar2 = 0;
  switchD_00413905_caseD_0: {
  if ((param_2 < param_1) && (param_1 < (param_3 + ((param_2) >>> 0)))) {
    param_2 = ((((param_3 - 4) + ((param_2) >>> 0))) >>> 0);
    puVar2 = ((((param_3 - 4) + ((param_1) >>> 0))) >>> 0);
    if ((((puVar2) >>> 0) & 3) == 0) {
      uVar1 = ((param_3 >>> 2) >>> 0);
      param_3 = ((param_3 & 3) >>> 0);
      if (7 < uVar1) {
        for (; uVar1 != 0; uVar1 = (((uVar1 - 1) >>> 0)) >>> 0) {
          heap.setU32(puVar2, (heap.u32(param_2)) & 0xffffffff);
          param_2 = ((param_2 + ((-1) * 4)) >>> 0);
          puVar2 = ((puVar2 + ((-1) * 4)) >>> 0);
        }
        switch (param_3) {
          case 0:
            return param_1;
          case 2:
            /* goto switchD_00413a87_caseD_2 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413a87_caseD_2"); return 0;
          case 3:
            /* goto switchD_00413a87_caseD_3 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413a87_caseD_3"); return 0;
        }
        /* goto switchD_00413a87_caseD_1 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413a87_caseD_1"); return 0;
      }
    } else {
      switch (param_3) {
        case 0:
          /* goto switchD_00413a87_caseD_0 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413a87_caseD_0"); return 0;
        case 1:
          /* goto switchD_00413a87_caseD_1 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413a87_caseD_1"); return 0;
        case 2:
          /* goto switchD_00413a87_caseD_2 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413a87_caseD_2"); return 0;
        case 3:
          /* goto switchD_00413a87_caseD_3 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413a87_caseD_3"); return 0;
        default:
          uVar1 = ((param_3 - (((puVar2) >>> 0) & 3)) >>> 0);
          switch (((puVar2) >>> 0) & 3) {
            case 1:
              param_3 = ((uVar1 & 3) >>> 0);
              heap.setU8((((puVar2) >>> 0) + 3), (heap.u8((((param_2) >>> 0) + 3))) & 0xff);
              param_2 = (((((param_2) >>> 0) + -1)) >>> 0);
              uVar1 = ((uVar1 >>> 2) >>> 0);
              puVar2 = (((((puVar2) >>> 0) - 1)) >>> 0);
              if (7 < uVar1) {
                for (; uVar1 != 0; uVar1 = (((uVar1 - 1) >>> 0)) >>> 0) {
                  heap.setU32(puVar2, (heap.u32(param_2)) & 0xffffffff);
                  param_2 = ((param_2 + ((-1) * 4)) >>> 0);
                  puVar2 = ((puVar2 + ((-1) * 4)) >>> 0);
                }
                switch (param_3) {
                  case 0:
                    return param_1;
                  case 2:
                    /* goto switchD_00413a87_caseD_2 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413a87_caseD_2"); return 0;
                  case 3:
                    /* goto switchD_00413a87_caseD_3 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413a87_caseD_3"); return 0;
                }
                /* goto switchD_00413a87_caseD_1 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413a87_caseD_1"); return 0;
              }
              break;
            case 2:
              param_3 = ((uVar1 & 3) >>> 0);
              heap.setU8((((puVar2) >>> 0) + 3), (heap.u8((((param_2) >>> 0) + 3))) & 0xff);
              uVar1 = ((uVar1 >>> 2) >>> 0);
              heap.setU8((((puVar2) >>> 0) + 2), (heap.u8((((param_2) >>> 0) + 2))) & 0xff);
              param_2 = (((((param_2) >>> 0) + -2)) >>> 0);
              puVar2 = (((((puVar2) >>> 0) - 2)) >>> 0);
              if (7 < uVar1) {
                for (; uVar1 != 0; uVar1 = (((uVar1 - 1) >>> 0)) >>> 0) {
                  heap.setU32(puVar2, (heap.u32(param_2)) & 0xffffffff);
                  param_2 = ((param_2 + ((-1) * 4)) >>> 0);
                  puVar2 = ((puVar2 + ((-1) * 4)) >>> 0);
                }
                switch (param_3) {
                  case 0:
                    return param_1;
                  case 2:
                    /* goto switchD_00413a87_caseD_2 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413a87_caseD_2"); return 0;
                  case 3:
                    /* goto switchD_00413a87_caseD_3 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413a87_caseD_3"); return 0;
                }
                /* goto switchD_00413a87_caseD_1 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413a87_caseD_1"); return 0;
              }
              break;
            case 3:
              param_3 = ((uVar1 & 3) >>> 0);
              heap.setU8((((puVar2) >>> 0) + 3), (heap.u8((((param_2) >>> 0) + 3))) & 0xff);
              heap.setU8((((puVar2) >>> 0) + 2), (heap.u8((((param_2) >>> 0) + 2))) & 0xff);
              uVar1 = ((uVar1 >>> 2) >>> 0);
              heap.setU8((((puVar2) >>> 0) + 1), (heap.u8((((param_2) >>> 0) + 1))) & 0xff);
              param_2 = (((((param_2) >>> 0) + -3)) >>> 0);
              puVar2 = (((((puVar2) >>> 0) - 3)) >>> 0);
              if (7 < uVar1) {
                for (; uVar1 != 0; uVar1 = (((uVar1 - 1) >>> 0)) >>> 0) {
                  heap.setU32(puVar2, (heap.u32(param_2)) & 0xffffffff);
                  param_2 = ((param_2 + ((-1) * 4)) >>> 0);
                  puVar2 = ((puVar2 + ((-1) * 4)) >>> 0);
                }
                switch (param_3) {
                  case 0:
                    return param_1;
                  case 2:
                    /* goto switchD_00413a87_caseD_2 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413a87_caseD_2"); return 0;
                  case 3:
                    /* goto switchD_00413a87_caseD_3 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413a87_caseD_3"); return 0;
                }
                /* goto switchD_00413a87_caseD_1 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413a87_caseD_1"); return 0;
              }
          }
      }
    }
    switch (uVar1) {
      case 7:
        heap.setU32((puVar2 + (7 - uVar1) * 4), (heap.u32(param_2 + (7 - uVar1) * 4)) & 0xffffffff);
      case 6:
        heap.setU32((puVar2 + (6 - uVar1) * 4), (heap.u32(param_2 + (6 - uVar1) * 4)) & 0xffffffff);
      case 5:
        heap.setU32((puVar2 + (5 - uVar1) * 4), (heap.u32(param_2 + (5 - uVar1) * 4)) & 0xffffffff);
      case 4:
        heap.setU32((puVar2 + (4 - uVar1) * 4), (heap.u32(param_2 + (4 - uVar1) * 4)) & 0xffffffff);
      case 3:
        heap.setU32((puVar2 + (3 - uVar1) * 4), (heap.u32(param_2 + (3 - uVar1) * 4)) & 0xffffffff);
      case 2:
        heap.setU32((puVar2 + (2 - uVar1) * 4), (heap.u32(param_2 + (2 - uVar1) * 4)) & 0xffffffff);
      case 1:
        heap.setU32((puVar2 + (1 - uVar1) * 4), (heap.u32(param_2 + (1 - uVar1) * 4)) & 0xffffffff);
        param_2 = ((param_2 + ((-uVar1) * 4)) >>> 0);
        puVar2 = ((puVar2 + ((-uVar1) * 4)) >>> 0);
    }
    switch (param_3) {
      case 1:
        switchD_00413a87_caseD_1: heap.setU8((((puVar2) >>> 0) + 3), (heap.u8((((param_2) >>> 0) + 3))) & 0xff);
        return param_1;
      case 2:
        switchD_00413a87_caseD_2: heap.setU8((((puVar2) >>> 0) + 3), (heap.u8((((param_2) >>> 0) + 3))) & 0xff);
        heap.setU8((((puVar2) >>> 0) + 2), (heap.u8((((param_2) >>> 0) + 2))) & 0xff);
        return param_1;
      case 3:
        switchD_00413a87_caseD_3: heap.setU8((((puVar2) >>> 0) + 3), (heap.u8((((param_2) >>> 0) + 3))) & 0xff);
        heap.setU8((((puVar2) >>> 0) + 2), (heap.u8((((param_2) >>> 0) + 2))) & 0xff);
        heap.setU8((((puVar2) >>> 0) + 1), (heap.u8((((param_2) >>> 0) + 1))) & 0xff);
        return param_1;
    }
    switchD_00413a87_caseD_0: return param_1;
  }
  puVar2 = ((param_1) >>> 0);
  if ((((param_1) >>> 0) & 3) == 0) {
    uVar1 = ((param_3 >>> 2) >>> 0);
    param_3 = ((param_3 & 3) >>> 0);
    if (7 < uVar1) {
      for (; uVar1 != 0; uVar1 = (((uVar1 - 1) >>> 0)) >>> 0) {
        heap.setU32(puVar2, (heap.u32(param_2)) & 0xffffffff);
        param_2 = ((param_2 + ((1) * 4)) >>> 0);
        puVar2 = ((puVar2 + ((1) * 4)) >>> 0);
      }
      switch (param_3) {
        case 0:
          return param_1;
        case 2:
          /* goto switchD_00413905_caseD_2 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413905_caseD_2"); return 0;
        case 3:
          /* goto switchD_00413905_caseD_3 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413905_caseD_3"); return 0;
      }
      /* goto switchD_00413905_caseD_1 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413905_caseD_1"); return 0;
    }
  } else {
    switch (param_3) {
      case 0:
        break switchD_00413905_caseD_0;
      case 1:
        /* goto switchD_00413905_caseD_1 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413905_caseD_1"); return 0;
      case 2:
        /* goto switchD_00413905_caseD_2 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413905_caseD_2"); return 0;
      case 3:
        /* goto switchD_00413905_caseD_3 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413905_caseD_3"); return 0;
      default:
        uVar1 = (((param_3 - 4) + (((param_1) >>> 0) & 3)) >>> 0);
        switch (((param_1) >>> 0) & 3) {
          case 1:
            param_3 = ((uVar1 & 3) >>> 0);
            heap.setU8(param_1, (heap.u8(param_2)) & 0xff);
            heap.setU8((((param_1) >>> 0) + 1), (heap.u8((((param_2) >>> 0) + 1))) & 0xff);
            uVar1 = ((uVar1 >>> 2) >>> 0);
            heap.setU8((((param_1) >>> 0) + 2), (heap.u8((((param_2) >>> 0) + 2))) & 0xff);
            param_2 = (((((param_2) >>> 0) + 3)) >>> 0);
            puVar2 = (((((param_1) >>> 0) + 3)) >>> 0);
            if (7 < uVar1) {
              for (; uVar1 != 0; uVar1 = (((uVar1 - 1) >>> 0)) >>> 0) {
                heap.setU32(puVar2, (heap.u32(param_2)) & 0xffffffff);
                param_2 = ((param_2 + ((1) * 4)) >>> 0);
                puVar2 = ((puVar2 + ((1) * 4)) >>> 0);
              }
              switch (param_3) {
                case 0:
                  return param_1;
                case 2:
                  /* goto switchD_00413905_caseD_2 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413905_caseD_2"); return 0;
                case 3:
                  /* goto switchD_00413905_caseD_3 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413905_caseD_3"); return 0;
              }
              /* goto switchD_00413905_caseD_1 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413905_caseD_1"); return 0;
            }
            break;
          case 2:
            param_3 = ((uVar1 & 3) >>> 0);
            heap.setU8(param_1, (heap.u8(param_2)) & 0xff);
            uVar1 = ((uVar1 >>> 2) >>> 0);
            heap.setU8((((param_1) >>> 0) + 1), (heap.u8((((param_2) >>> 0) + 1))) & 0xff);
            param_2 = (((((param_2) >>> 0) + 2)) >>> 0);
            puVar2 = (((((param_1) >>> 0) + 2)) >>> 0);
            if (7 < uVar1) {
              for (; uVar1 != 0; uVar1 = (((uVar1 - 1) >>> 0)) >>> 0) {
                heap.setU32(puVar2, (heap.u32(param_2)) & 0xffffffff);
                param_2 = ((param_2 + ((1) * 4)) >>> 0);
                puVar2 = ((puVar2 + ((1) * 4)) >>> 0);
              }
              switch (param_3) {
                case 0:
                  return param_1;
                case 2:
                  /* goto switchD_00413905_caseD_2 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413905_caseD_2"); return 0;
                case 3:
                  /* goto switchD_00413905_caseD_3 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413905_caseD_3"); return 0;
              }
              /* goto switchD_00413905_caseD_1 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413905_caseD_1"); return 0;
            }
            break;
          case 3:
            param_3 = ((uVar1 & 3) >>> 0);
            heap.setU8(param_1, (heap.u8(param_2)) & 0xff);
            param_2 = (((((param_2) >>> 0) + 1)) >>> 0);
            uVar1 = ((uVar1 >>> 2) >>> 0);
            puVar2 = (((((param_1) >>> 0) + 1)) >>> 0);
            if (7 < uVar1) {
              for (; uVar1 != 0; uVar1 = (((uVar1 - 1) >>> 0)) >>> 0) {
                heap.setU32(puVar2, (heap.u32(param_2)) & 0xffffffff);
                param_2 = ((param_2 + ((1) * 4)) >>> 0);
                puVar2 = ((puVar2 + ((1) * 4)) >>> 0);
              }
              switch (param_3) {
                case 0:
                  return param_1;
                case 2:
                  /* goto switchD_00413905_caseD_2 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413905_caseD_2"); return 0;
                case 3:
                  /* goto switchD_00413905_caseD_3 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413905_caseD_3"); return 0;
              }
              /* goto switchD_00413905_caseD_1 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004138d0/switchD_00413905_caseD_1"); return 0;
            }
        }
    }
  }
  switch (uVar1) {
    case 7:
      heap.setU32((puVar2 + (uVar1 - 7) * 4), (heap.u32(param_2 + (uVar1 - 7) * 4)) & 0xffffffff);
    case 6:
      heap.setU32((puVar2 + (uVar1 - 6) * 4), (heap.u32(param_2 + (uVar1 - 6) * 4)) & 0xffffffff);
    case 5:
      heap.setU32((puVar2 + (uVar1 - 5) * 4), (heap.u32(param_2 + (uVar1 - 5) * 4)) & 0xffffffff);
    case 4:
      heap.setU32((puVar2 + (uVar1 - 4) * 4), (heap.u32(param_2 + (uVar1 - 4) * 4)) & 0xffffffff);
    case 3:
      heap.setU32((puVar2 + (uVar1 - 3) * 4), (heap.u32(param_2 + (uVar1 - 3) * 4)) & 0xffffffff);
    case 2:
      heap.setU32((puVar2 + (uVar1 - 2) * 4), (heap.u32(param_2 + (uVar1 - 2) * 4)) & 0xffffffff);
    case 1:
      heap.setU32((puVar2 + (uVar1 - 1) * 4), (heap.u32(param_2 + (uVar1 - 1) * 4)) & 0xffffffff);
      param_2 = ((param_2 + ((uVar1) * 4)) >>> 0);
      puVar2 = ((puVar2 + ((uVar1) * 4)) >>> 0);
  }
  switch (param_3) {
    case 1:
      switchD_00413905_caseD_1: heap.setU8(puVar2, (heap.u8(param_2)) & 0xff);
      return param_1;
    case 2:
      switchD_00413905_caseD_2: heap.setU8(puVar2, (heap.u8(param_2)) & 0xff);
      heap.setU8((((puVar2) >>> 0) + 1), (heap.u8((((param_2) >>> 0) + 1))) & 0xff);
      return param_1;
    case 3:
      switchD_00413905_caseD_3: heap.setU8(puVar2, (heap.u8(param_2)) & 0xff);
      heap.setU8((((puVar2) >>> 0) + 1), (heap.u8((((param_2) >>> 0) + 1))) & 0xff);
      heap.setU8((((puVar2) >>> 0) + 2), (heap.u8((((param_2) >>> 0) + 2))) & 0xff);
      return param_1;
  }
  }
  return param_1;
}
