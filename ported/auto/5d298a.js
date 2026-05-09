// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/5d298a.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT31 } from "../../runtime/ghidra-builtins.js";
export function FUN_005d298a(heap) {
  let uVar1 = 0;
  let uVar2 = 0;
  let cVar3 = 0;
  let cVar5 = 0;
  let sVar4 = 0;
  let bVar7 = 0;
  let uVar6 = 0;
  let cVar8 = 0;
  let sVar9 = 0;
  let cVar10 = 0;
  let iVar11 = 0;
  LAB_005d30ff: {
  sVar9 = ((CONCAT11(heap.u8(0x00652295), heap.u8(0x0065229a))) & 0xffff);
  sVar4 = ((CONCAT11(heap.u8(0x00652296), heap.u8(0x00652299))) & 0xffff);
  if (heap.u8(0x00652288) == 2) {
    sVar9 = ((CONCAT11(heap.u8(0x0065229a), heap.u8(0x00652295))) & 0xffff);
    sVar4 = ((CONCAT11(heap.u8(0x00652299), heap.u8(0x00652296))) & 0xffff);
  }
  uVar2 = ((heap.u16(0x00652294)) & 0xffff);
  if (heap.u8(0x00652294) == 0xff) {
    return 0xff;
  }
  cVar8 = ((((sVar9) << 24 >> 24)) & 0xff);
  cVar10 = (((((((sVar9) & 0xffff) >>> 8)) << 24 >> 24)) & 0xff);
  cVar5 = (((((((sVar4) & 0xffff) >>> 8)) << 24 >> 24)) & 0xff);
  if (heap.u8(0x00652294) == 0) {
    cVar3 = ((((sVar4) << 24 >> 24)) & 0xff);
    if (heap.u8(0x00652290) < 4) {
      if (cVar8 == cVar10) {
        if (cVar8 == 0) {
          if (cVar3 == cVar5) {
            uVar1 = ((0) >>> 0);
            if ((cVar3 != 0) && (uVar1 = ((0x20) >>> 0), cVar3 != 2)) {
              uVar1 = ((0x21) >>> 0);
            }
          } else {
            if (cVar3 == 0) {
            uVar1 = ((0x12) >>> 0);
            if (cVar5 != 2) {
              uVar1 = ((0x13) >>> 0);
            }
          } else {
            if (cVar5 != 0) {
              return 0;
            }
            uVar1 = ((0x14) >>> 0);
            if (cVar3 != 2) {
              uVar1 = ((0x15) >>> 0);
            }
          }
          }
          break LAB_005d30ff;
        }
        uVar1 = ((4) >>> 0);
        if ((((cVar8 == 2) || (uVar1 = ((5) >>> 0), cVar8 == 4)) || (uVar1 = ((10) >>> 0), cVar8 == 6)) || ((uVar1 = ((0xb) >>> 0), cVar8 == 8 || (uVar1 = ((0x7e) >>> 0), cVar8 == 10)))) {
          break LAB_005d30ff;
        }
        uVar1 = ((0x7f) >>> 0);
        cVar10 = ((cVar8) & 0xff);
      } else {
        if (((cVar8 == 18) && (uVar1 = ((0x81) >>> 0), cVar10 == 8)) || ((cVar8 == 10 && (uVar1 = ((0x82) >>> 0), cVar10 == 4)))) {
          break LAB_005d30ff;
        }
        uVar1 = ((0xe) >>> 0);
        if (cVar8 != 8) {
          if (cVar8 == 6) {
            uVar1 = ((0xd) >>> 0);
            if (cVar10 != 8) {
              if (cVar10 != 0) {
                return 0;
              }
              uVar1 = ((0xf) >>> 0);
              if ((cVar5 != 0) && (uVar1 = ((0x1e) >>> 0), cVar5 != 2)) {
                uVar1 = ((0x1f) >>> 0);
              }
            }
            break LAB_005d30ff;
          }
          if (cVar8 == 0) {
            if (cVar10 == 6) {
              uVar1 = ((0xc) >>> 0);
              if ((cVar3 != 0) && (uVar1 = ((0x1c) >>> 0), cVar3 != 2)) {
                uVar1 = ((0x1d) >>> 0);
              }
            } else {
              uVar1 = ((0x3e) >>> 0);
              if ((cVar10 != 4) && (uVar1 = ((0x40) >>> 0), cVar10 != 8)) {
                if (cVar10 != 2) {
                  return 0;
                }
                uVar1 = ((6) >>> 0);
                if ((cVar3 != 0) && (uVar1 = ((0x18) >>> 0), cVar3 != 2)) {
                  uVar1 = ((0x19) >>> 0);
                }
              }
            }
            break LAB_005d30ff;
          }
          uVar1 = ((8) >>> 0);
          if (cVar8 == 4) {
            if (((cVar10 != 2) && (uVar1 = ((0x3f) >>> 0), cVar10 != 0)) && (uVar1 = ((0x80) >>> 0), cVar10 != 10)) {
              return 0;
            }
            break LAB_005d30ff;
          }
          uVar1 = ((7) >>> 0);
          if (cVar10 != 4) {
            uVar1 = ((9) >>> 0);
            if (cVar10 != 0) {
              return 0;
            }
            if ((cVar5 != 0) && (uVar1 = ((0x1a) >>> 0), cVar5 != 2)) {
              uVar1 = ((0x1b) >>> 0);
            }
            break LAB_005d30ff;
          }
          joined_r0x005d2d01: if (cVar8 != 2) {
            return uVar2;
          }
          break LAB_005d30ff;
        }
        if ((cVar10 == 6) || (uVar1 = ((0x41) >>> 0), cVar10 == 0)) {
          break LAB_005d30ff;
        }
        uVar1 = ((0x83) >>> 0);
      }
      if (cVar10 != 18) {
        return 0;
      }
      break LAB_005d30ff;
    }
    if (cVar8 == cVar10) {
      if (cVar8 == 0) {
        if (cVar3 == cVar5) {
          uVar1 = ((0x8d) >>> 0);
          if ((cVar3 != 0) && (uVar1 = ((0xaa) >>> 0), cVar3 != 2)) {
            uVar1 = ((0xab) >>> 0);
          }
        } else {
          if (cVar3 == 0) {
          uVar1 = ((0x9e) >>> 0);
          if (cVar5 != 2) {
            uVar1 = ((0x9f) >>> 0);
          }
        } else {
          if (cVar5 != 0) {
            return 0;
          }
          uVar1 = ((0xa0) >>> 0);
          if (cVar3 != 2) {
            uVar1 = ((0xa1) >>> 0);
          }
        }
        }
      } else {
        uVar1 = ((0x8e) >>> 0);
        if ((((cVar8 != 2) && (uVar1 = ((0x8f) >>> 0), cVar8 != 4)) && (uVar1 = ((0x94) >>> 0), cVar8 != 6)) && (uVar1 = ((0x95) >>> 0), cVar8 != 8)) {
          return 0;
        }
      }
      break LAB_005d30ff;
    }
    if ((cVar8 == 18) && (cVar10 == 8)) {
      return 0;
    }
    if ((cVar8 == 10) && (cVar10 == 4)) {
      return 0;
    }
    uVar1 = ((0x98) >>> 0);
    if (cVar8 == 8) {
      if (cVar10 == 6) {
        break LAB_005d30ff;
      }
      uVar1 = ((0x9d) >>> 0);
      cVar5 = ((cVar10) & 0xff);
    } else {
      if (cVar8 == 6) {
        uVar1 = ((0x97) >>> 0);
        if (cVar10 != 8) {
          if (cVar10 != 0) {
            return 0;
          }
          uVar1 = ((0x99) >>> 0);
          if ((cVar5 != 0) && (uVar1 = ((0xa8) >>> 0), cVar5 != 2)) {
            uVar1 = ((0xa9) >>> 0);
          }
        }
        break LAB_005d30ff;
      }
      if (cVar8 == 0) {
        if (cVar10 == 6) {
          uVar1 = ((0x96) >>> 0);
          if ((cVar3 != 0) && (uVar1 = ((0xa6) >>> 0), cVar3 != 2)) {
            uVar1 = ((0xa7) >>> 0);
          }
        } else {
          uVar1 = ((0x9a) >>> 0);
          if ((cVar10 != 4) && (uVar1 = ((0x9c) >>> 0), cVar10 != 8)) {
            if (cVar10 != 2) {
              return 0;
            }
            uVar1 = ((0x90) >>> 0);
            if ((cVar3 != 0) && (uVar1 = ((0xa2) >>> 0), cVar3 != 2)) {
              uVar1 = ((0xa3) >>> 0);
            }
          }
        }
        break LAB_005d30ff;
      }
      uVar1 = ((0x92) >>> 0);
      if (cVar8 != 4) {
        uVar1 = ((0x91) >>> 0);
        if (cVar10 != 4) {
          uVar1 = ((0x93) >>> 0);
          if (cVar10 != 0) {
            return 0;
          }
          if ((cVar5 != 0) && (uVar1 = ((0xa4) >>> 0), cVar5 != 2)) {
            uVar1 = ((0xa5) >>> 0);
          }
          break LAB_005d30ff;
        }
        /* goto joined_r0x005d2d01 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d298a/joined_r0x005d2d01"); return 0;
      }
      if (cVar10 == 2) {
        break LAB_005d30ff;
      }
      uVar1 = ((0x9b) >>> 0);
      cVar5 = ((cVar10) & 0xff);
    }
  } else {
    if (heap.u8(0x00652294) == 1) {
      if (cVar8 != cVar10) {
        return 1;
      }
      if (cVar8 == 4) {
        return 1;
      }
      if (cVar8 == 8) {
        return 1;
      }
      uVar1 = ((0x24) >>> 0);
      if (((cVar10 != 6) && (uVar1 = ((0x22) >>> 0), cVar10 != 2)) && (uVar1 = ((0x10) >>> 0), cVar5 != 0)) {
        uVar1 = ((0x16) >>> 0);
      }
      break LAB_005d30ff;
    }
    if (heap.u8(0x00652294) < 3) {
      if (cVar8 != cVar10) {
        return uVar2;
      }
      if (cVar8 == 4) {
        return uVar2;
      }
      if (cVar8 == 8) {
        return uVar2;
      }
      uVar1 = ((0x25) >>> 0);
      if (((cVar10 != 6) && (uVar1 = ((0x23) >>> 0), cVar10 != 2)) && (uVar1 = ((0x11) >>> 0), cVar5 != 0)) {
        uVar1 = ((0x17) >>> 0);
      }
      break LAB_005d30ff;
    }
    if (heap.u8(0x00652294) == 3) {
      if (cVar8 != cVar10) {
        return 3;
      }
      uVar1 = ((0x61) >>> 0);
      if (((cVar10 != 8) && (uVar1 = ((0x5f) >>> 0), cVar10 != 4)) && ((uVar1 = ((0x30) >>> 0), cVar10 != 6 && ((uVar1 = ((0x2e) >>> 0), cVar10 != 2 && (uVar1 = ((0x2a) >>> 0), cVar5 != 0)))))) {
        uVar1 = ((0x2c) >>> 0);
      }
      break LAB_005d30ff;
    }
    if (heap.u8(0x00652294) < 5) {
      if (cVar8 != cVar10) {
        return uVar2;
      }
      uVar1 = ((0x62) >>> 0);
      if ((((cVar10 != 8) && (uVar1 = ((0x60) >>> 0), cVar10 != 4)) && (uVar1 = ((0x31) >>> 0), cVar10 != 6)) && ((uVar1 = ((0x2f) >>> 0), cVar10 != 2 && (uVar1 = ((0x2b) >>> 0), cVar5 != 0)))) {
        uVar1 = ((0x2d) >>> 0);
      }
      break LAB_005d30ff;
    }
    if (heap.u8(0x00652294) == 5) {
      if (cVar8 != cVar10) {
        return 5;
      }
      if (cVar8 == 2) {
        return 5;
      }
      if (cVar8 == 6) {
        return 5;
      }
      uVar1 = ((0x61) >>> 0);
      if ((cVar10 == 8) || (uVar1 = ((0x5f) >>> 0), cVar10 == 4)) {
        break LAB_005d30ff;
      }
      uVar1 = ((0x32) >>> 0);
    } else {
      if (heap.u8(0x00652294) != 6) {
        if (heap.u8(0x00652294) < 8) {
          bVar7 = ((heap.u8(0x00652290)) & 0xff);
          if (heap.u8(0x00652288) == 2) {
            bVar7 = ((heap.u8(0x00652290) ^ 4) & 0xff);
          }
          if ((bVar7 & 4) == 0) {
            if (cVar8 != cVar10) {
              return uVar2;
            }
            if (cVar8 == 4) {
              return uVar2;
            }
            if (cVar8 == 8) {
              return uVar2;
            }
            if (cVar10 == 6) {
              return uVar2;
            }
            if (cVar10 == 2) {
              return uVar2;
            }
            uVar1 = ((0x85) >>> 0);
            if (cVar5 != 0) {
              uVar1 = ((0x89) >>> 0);
            }
          } else {
            if (cVar8 != cVar10) {
              return uVar2;
            }
            if (cVar8 == 4) {
              return uVar2;
            }
            if (cVar8 == 8) {
              return uVar2;
            }
            if (cVar10 == 6) {
              return uVar2;
            }
            if (cVar10 == 2) {
              return uVar2;
            }
            uVar1 = ((0x87) >>> 0);
            if (cVar5 != 0) {
              uVar1 = ((0x8b) >>> 0);
            }
          }
          break LAB_005d30ff;
        }
        if (heap.u8(0x00652294) == 8) {
          bVar7 = ((heap.u8(0x00652290)) & 0xff);
          if (heap.u8(0x00652288) == 2) {
            bVar7 = ((heap.u8(0x00652290) ^ 4) & 0xff);
          }
          if ((bVar7 & 4) == 0) {
            if (cVar8 != cVar10) {
              return 8;
            }
            if (cVar8 == 4) {
              return 8;
            }
            if (cVar8 == 8) {
              return 8;
            }
            if (cVar10 == 6) {
              return 8;
            }
            if (cVar10 == 2) {
              return 8;
            }
            uVar1 = ((0x86) >>> 0);
            if (cVar5 != 0) {
              uVar1 = ((0x8a) >>> 0);
            }
          } else {
            if (cVar8 != cVar10) {
              return 8;
            }
            if (cVar8 == 4) {
              return 8;
            }
            if (cVar8 == 8) {
              return 8;
            }
            if (cVar10 == 6) {
              return 8;
            }
            if (cVar10 == 2) {
              return 8;
            }
            uVar1 = ((0x88) >>> 0);
            if (cVar5 != 0) {
              uVar1 = ((0x8c) >>> 0);
            }
          }
          break LAB_005d30ff;
        }
        bVar7 = ((heap.u8(0x00652294) - 0x10) & 0xff);
        uVar1 = ((bVar7) >>> 0);
        if (((bVar7 == 1) || (bVar7 == 0x26)) || (bVar7 == 0x27)) {
          if (sVar9 != 0) {
            return uVar2;
          }
          if (sVar4 != 0) {
            return uVar2;
          }
          break LAB_005d30ff;
        }
        if ((bVar7 != 0x28) && (bVar7 != 0x29)) {
          break LAB_005d30ff;
        }
        if (sVar4 != 0) {
          return uVar2;
        }
        if (heap.u8(0x00652288) == 2) {
          if (cVar10 != 6) {
            return uVar2;
          }
          break LAB_005d30ff;
        }
        /* goto joined_r0x005d2d01 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005d298a/joined_r0x005d2d01"); return 0;
      }
      if (cVar8 != cVar10) {
        return 6;
      }
      if (cVar8 == 2) {
        return 6;
      }
      if (cVar8 == 6) {
        return 6;
      }
      uVar1 = ((0x62) >>> 0);
      if ((cVar10 == 8) || (uVar1 = ((0x60) >>> 0), cVar10 == 4)) {
        break LAB_005d30ff;
      }
      uVar1 = ((0x33) >>> 0);
    }
  }
  if (cVar5 != 0) {
    return uVar2;
  }
  }
  uVar6 = ((CONCAT31(uVar1, heap.u8(0x00652289))) >>> 0);
  if (((heap.u32((0x005f5b78 + heap.u32(((0x00887420) >>> 0) + (((heap.u8(0x00652289)) >>> 0) * 0x260) * 4) * 8)) & 0x1000) != 0) && (heap.u8(0x00652298) != 0)) {
    uVar6 = ((heap.u32(((0x00656498) >>> 0) + (uVar1) * 4) << 8) >>> 0);
  }
  iVar11 = (((uVar6 >>> 8) * 10) >>> 0);
  uVar2 = ((heap.u8(0x0065228a)) & 0xffff);
  if (heap.u8(0x00652288) == 2) {
    sVar4 = ((heap.i16((0x00653efd + iVar11))) & 0xffff);
    switch (((heap.u8(0x00652290) ^ 2) - heap.u32((0x00653ef8) + (iVar11) * 4)) + heap.u32((0x00653ef7) + (iVar11) * 4) & 3) {
      case 0:
        sVar4 = ((-heap.i16((0x00653efd + iVar11))) & 0xffff);
        break;
      case 1:
        sVar4 = ((-heap.i16((0x00653eff + iVar11))) & 0xffff);
        break;
      case 3:
        sVar4 = ((heap.i16((0x00653eff + iVar11))) & 0xffff);
    }
    uVar2 = ((sVar4 + heap.u8(0x0065228a)) & 0xffff);
  }
  if ((((heap.u32(((0x0087c41c) >>> 0) + (heap.u32(((0x00887420) & 0xff) + (((heap.u8(0x00652289)) >>> 0) * 0x260) * 4)) * 4) >>> 5 & 1) == 0) && ((heap.u16((0x00652309 + (uVar6 >>> 8) * 2)) & 0x2000) != 0)) || ((heap.u16((0x00652309 + (uVar6 >>> 8) * 2)) & 0x1000) == 0)) {
    heap.setU8(0x00652297, (heap.u8(0x00652297) & 0xfe) & 0xff);
  }
  return uVar2;
}
