// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/418810.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00418810(heap, param_1, param_2, param_3) {
  let uVar1 = 0;
  if ((param_2 < param_1) && (param_1 < (param_3 + param_2))) {
    param_2 = ((param_3 - 4) + param_2);
    puVar2 = ((param_3 - 4) + param_1);
    if ((puVar2 & 3) == 0) {
      uVar1 = param_3 >>> 2;
      param_3 = param_3 & 3;
      if (7 < uVar1) {
        for (; uVar1 != 0; uVar1 = uVar1 - 1) {
          heap.u32(puVar2) = heap.u32(param_2);
          param_2 = param_2 + -1;
          puVar2 = puVar2 + -1;
        }
        switch (param_3) {
          case 0:
            return param_1;
          case 2:
            /* goto switchD_004189c7_caseD_2 */ throw new Error("goto switchD_004189c7_caseD_2 not supported");
          case 3:
            /* goto switchD_004189c7_caseD_3 */ throw new Error("goto switchD_004189c7_caseD_3 not supported");
        }
        /* goto switchD_004189c7_caseD_1 */ throw new Error("goto switchD_004189c7_caseD_1 not supported");
      }
    } else {
      switch (param_3) {
        case 0:
          /* goto switchD_004189c7_caseD_0 */ throw new Error("goto switchD_004189c7_caseD_0 not supported");
        case 1:
          /* goto switchD_004189c7_caseD_1 */ throw new Error("goto switchD_004189c7_caseD_1 not supported");
        case 2:
          /* goto switchD_004189c7_caseD_2 */ throw new Error("goto switchD_004189c7_caseD_2 not supported");
        case 3:
          /* goto switchD_004189c7_caseD_3 */ throw new Error("goto switchD_004189c7_caseD_3 not supported");
        default:
          uVar1 = param_3 - (puVar2 & 3);
          switch (puVar2 & 3) {
            case 1:
              param_3 = uVar1 & 3;
              heap.u32((puVar2 + 3)) = heap.u32((param_2 + 3));
              param_2 = (param_2 + -1);
              uVar1 = uVar1 >>> 2;
              puVar2 = (puVar2 - 1);
              if (7 < uVar1) {
                for (; uVar1 != 0; uVar1 = uVar1 - 1) {
                  heap.u32(puVar2) = heap.u32(param_2);
                  param_2 = param_2 + -1;
                  puVar2 = puVar2 + -1;
                }
                switch (param_3) {
                  case 0:
                    return param_1;
                  case 2:
                    /* goto switchD_004189c7_caseD_2 */ throw new Error("goto switchD_004189c7_caseD_2 not supported");
                  case 3:
                    /* goto switchD_004189c7_caseD_3 */ throw new Error("goto switchD_004189c7_caseD_3 not supported");
                }
                /* goto switchD_004189c7_caseD_1 */ throw new Error("goto switchD_004189c7_caseD_1 not supported");
              }
              break;
            case 2:
              param_3 = uVar1 & 3;
              heap.u32((puVar2 + 3)) = heap.u32((param_2 + 3));
              uVar1 = uVar1 >>> 2;
              heap.u32((puVar2 + 2)) = heap.u32((param_2 + 2));
              param_2 = (param_2 + -2);
              puVar2 = (puVar2 - 2);
              if (7 < uVar1) {
                for (; uVar1 != 0; uVar1 = uVar1 - 1) {
                  heap.u32(puVar2) = heap.u32(param_2);
                  param_2 = param_2 + -1;
                  puVar2 = puVar2 + -1;
                }
                switch (param_3) {
                  case 0:
                    return param_1;
                  case 2:
                    /* goto switchD_004189c7_caseD_2 */ throw new Error("goto switchD_004189c7_caseD_2 not supported");
                  case 3:
                    /* goto switchD_004189c7_caseD_3 */ throw new Error("goto switchD_004189c7_caseD_3 not supported");
                }
                /* goto switchD_004189c7_caseD_1 */ throw new Error("goto switchD_004189c7_caseD_1 not supported");
              }
              break;
            case 3:
              param_3 = uVar1 & 3;
              heap.u32((puVar2 + 3)) = heap.u32((param_2 + 3));
              heap.u32((puVar2 + 2)) = heap.u32((param_2 + 2));
              uVar1 = uVar1 >>> 2;
              heap.u32((puVar2 + 1)) = heap.u32((param_2 + 1));
              param_2 = (param_2 + -3);
              puVar2 = (puVar2 - 3);
              if (7 < uVar1) {
                for (; uVar1 != 0; uVar1 = uVar1 - 1) {
                  heap.u32(puVar2) = heap.u32(param_2);
                  param_2 = param_2 + -1;
                  puVar2 = puVar2 + -1;
                }
                switch (param_3) {
                  case 0:
                    return param_1;
                  case 2:
                    /* goto switchD_004189c7_caseD_2 */ throw new Error("goto switchD_004189c7_caseD_2 not supported");
                  case 3:
                    /* goto switchD_004189c7_caseD_3 */ throw new Error("goto switchD_004189c7_caseD_3 not supported");
                }
                /* goto switchD_004189c7_caseD_1 */ throw new Error("goto switchD_004189c7_caseD_1 not supported");
              }
          }
      }
    }
    switch (uVar1) {
      case 7:
        heap.u32(puVar2 + (7 - uVar1) * 4) = heap.u32(param_2 + (7 - uVar1) * 4);
      case 6:
        heap.u32(puVar2 + (6 - uVar1) * 4) = heap.u32(param_2 + (6 - uVar1) * 4);
      case 5:
        heap.u32(puVar2 + (5 - uVar1) * 4) = heap.u32(param_2 + (5 - uVar1) * 4);
      case 4:
        heap.u32(puVar2 + (4 - uVar1) * 4) = heap.u32(param_2 + (4 - uVar1) * 4);
      case 3:
        heap.u32(puVar2 + (3 - uVar1) * 4) = heap.u32(param_2 + (3 - uVar1) * 4);
      case 2:
        heap.u32(puVar2 + (2 - uVar1) * 4) = heap.u32(param_2 + (2 - uVar1) * 4);
      case 1:
        heap.u32(puVar2 + (1 - uVar1) * 4) = heap.u32(param_2 + (1 - uVar1) * 4);
        param_2 = param_2 + -uVar1;
        puVar2 = puVar2 + -uVar1;
    }
    switch (param_3) {
      case 1:
        switchD_004189c7_caseD_1: heap.u32((puVar2 + 3)) = heap.u32((param_2 + 3));
        return param_1;
      case 2:
        switchD_004189c7_caseD_2: heap.u32((puVar2 + 3)) = heap.u32((param_2 + 3));
        heap.u32((puVar2 + 2)) = heap.u32((param_2 + 2));
        return param_1;
      case 3:
        switchD_004189c7_caseD_3: heap.u32((puVar2 + 3)) = heap.u32((param_2 + 3));
        heap.u32((puVar2 + 2)) = heap.u32((param_2 + 2));
        heap.u32((puVar2 + 1)) = heap.u32((param_2 + 1));
        return param_1;
    }
    switchD_004189c7_caseD_0: return param_1;
  }
  puVar2 = param_1;
  if ((param_1 & 3) == 0) {
    uVar1 = param_3 >>> 2;
    param_3 = param_3 & 3;
    if (7 < uVar1) {
      for (; uVar1 != 0; uVar1 = uVar1 - 1) {
        heap.u32(puVar2) = heap.u32(param_2);
        param_2 = param_2 + 1;
        puVar2 = puVar2 + 1;
      }
      switch (param_3) {
        case 0:
          return param_1;
        case 2:
          /* goto switchD_00418845_caseD_2 */ throw new Error("goto switchD_00418845_caseD_2 not supported");
        case 3:
          /* goto switchD_00418845_caseD_3 */ throw new Error("goto switchD_00418845_caseD_3 not supported");
      }
      /* goto switchD_00418845_caseD_1 */ throw new Error("goto switchD_00418845_caseD_1 not supported");
    }
  } else {
    switch (param_3) {
      case 0:
        /* goto switchD_00418845_caseD_0 */ throw new Error("goto switchD_00418845_caseD_0 not supported");
      case 1:
        /* goto switchD_00418845_caseD_1 */ throw new Error("goto switchD_00418845_caseD_1 not supported");
      case 2:
        /* goto switchD_00418845_caseD_2 */ throw new Error("goto switchD_00418845_caseD_2 not supported");
      case 3:
        /* goto switchD_00418845_caseD_3 */ throw new Error("goto switchD_00418845_caseD_3 not supported");
      default:
        uVar1 = (param_3 - 4) + (param_1 & 3);
        switch (param_1 & 3) {
          case 1:
            param_3 = uVar1 & 3;
            heap.u32(param_1) = heap.u32(param_2);
            heap.u32((param_1 + 1)) = heap.u32((param_2 + 1));
            uVar1 = uVar1 >>> 2;
            heap.u32((param_1 + 2)) = heap.u32((param_2 + 2));
            param_2 = (param_2 + 3);
            puVar2 = (param_1 + 3);
            if (7 < uVar1) {
              for (; uVar1 != 0; uVar1 = uVar1 - 1) {
                heap.u32(puVar2) = heap.u32(param_2);
                param_2 = param_2 + 1;
                puVar2 = puVar2 + 1;
              }
              switch (param_3) {
                case 0:
                  return param_1;
                case 2:
                  /* goto switchD_00418845_caseD_2 */ throw new Error("goto switchD_00418845_caseD_2 not supported");
                case 3:
                  /* goto switchD_00418845_caseD_3 */ throw new Error("goto switchD_00418845_caseD_3 not supported");
              }
              /* goto switchD_00418845_caseD_1 */ throw new Error("goto switchD_00418845_caseD_1 not supported");
            }
            break;
          case 2:
            param_3 = uVar1 & 3;
            heap.u32(param_1) = heap.u32(param_2);
            uVar1 = uVar1 >>> 2;
            heap.u32((param_1 + 1)) = heap.u32((param_2 + 1));
            param_2 = (param_2 + 2);
            puVar2 = (param_1 + 2);
            if (7 < uVar1) {
              for (; uVar1 != 0; uVar1 = uVar1 - 1) {
                heap.u32(puVar2) = heap.u32(param_2);
                param_2 = param_2 + 1;
                puVar2 = puVar2 + 1;
              }
              switch (param_3) {
                case 0:
                  return param_1;
                case 2:
                  /* goto switchD_00418845_caseD_2 */ throw new Error("goto switchD_00418845_caseD_2 not supported");
                case 3:
                  /* goto switchD_00418845_caseD_3 */ throw new Error("goto switchD_00418845_caseD_3 not supported");
              }
              /* goto switchD_00418845_caseD_1 */ throw new Error("goto switchD_00418845_caseD_1 not supported");
            }
            break;
          case 3:
            param_3 = uVar1 & 3;
            heap.u32(param_1) = heap.u32(param_2);
            param_2 = (param_2 + 1);
            uVar1 = uVar1 >>> 2;
            puVar2 = (param_1 + 1);
            if (7 < uVar1) {
              for (; uVar1 != 0; uVar1 = uVar1 - 1) {
                heap.u32(puVar2) = heap.u32(param_2);
                param_2 = param_2 + 1;
                puVar2 = puVar2 + 1;
              }
              switch (param_3) {
                case 0:
                  return param_1;
                case 2:
                  /* goto switchD_00418845_caseD_2 */ throw new Error("goto switchD_00418845_caseD_2 not supported");
                case 3:
                  /* goto switchD_00418845_caseD_3 */ throw new Error("goto switchD_00418845_caseD_3 not supported");
              }
              /* goto switchD_00418845_caseD_1 */ throw new Error("goto switchD_00418845_caseD_1 not supported");
            }
        }
    }
  }
  switch (uVar1) {
    case 7:
      heap.u32(puVar2 + (uVar1 - 7) * 4) = heap.u32(param_2 + (uVar1 - 7) * 4);
    case 6:
      heap.u32(puVar2 + (uVar1 - 6) * 4) = heap.u32(param_2 + (uVar1 - 6) * 4);
    case 5:
      heap.u32(puVar2 + (uVar1 - 5) * 4) = heap.u32(param_2 + (uVar1 - 5) * 4);
    case 4:
      heap.u32(puVar2 + (uVar1 - 4) * 4) = heap.u32(param_2 + (uVar1 - 4) * 4);
    case 3:
      heap.u32(puVar2 + (uVar1 - 3) * 4) = heap.u32(param_2 + (uVar1 - 3) * 4);
    case 2:
      heap.u32(puVar2 + (uVar1 - 2) * 4) = heap.u32(param_2 + (uVar1 - 2) * 4);
    case 1:
      heap.u32(puVar2 + (uVar1 - 1) * 4) = heap.u32(param_2 + (uVar1 - 1) * 4);
      param_2 = param_2 + uVar1;
      puVar2 = puVar2 + uVar1;
  }
  switch (param_3) {
    case 1:
      switchD_00418845_caseD_1: heap.u32(puVar2) = heap.u32(param_2);
      return param_1;
    case 2:
      switchD_00418845_caseD_2: heap.u32(puVar2) = heap.u32(param_2);
      heap.u32((puVar2 + 1)) = heap.u32((param_2 + 1));
      return param_1;
    case 3:
      switchD_00418845_caseD_3: heap.u32(puVar2) = heap.u32(param_2);
      heap.u32((puVar2 + 1)) = heap.u32((param_2 + 1));
      heap.u32((puVar2 + 2)) = heap.u32((param_2 + 2));
      return param_1;
  }
  switchD_00418845_caseD_0: return param_1;
}
