// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b35b4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_009b35fa } from "./9b35fa.js";
import { FUN_009b37b8 } from "./9b37b8.js";
import { FUN_009b38bc } from "./9b38bc.js";
import { FUN_009b3bf1 } from "./9b3bf1.js";
import { FUN_009b3d13 } from "./9b3d13.js";
import { FUN_009b3e87 } from "./9b3e87.js";
export function FUN_009b35b4(heap) {
  let bVar1 = 0;
  let sVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar3 = 0;
  let in_CX = regs.ecx & 0xffff;
  let in_DX = regs.edx & 0xffff;
  let sVar4 = 0;
  let sVar5 = 0;
  let sVar6 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let pbVar9 = 0;
  let pbVar10 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let pbVar11 = 0;
  heap.setU8(0x0099c164, (0) & 0xff);
  heap.setU32(0x009a2000, (0) >>> 0);
  if ((unaff_EBX & 0x20000000) != 0) {
    heap.setU32(0x009a2000, (0x20000000) >>> 0);
    in_EAX = ((heap.u32((0x008dc0b4) + (heap.i32((0x009aa06c + ((unaff_EBX & 0xbfffffff) >>> 0x11 & 0x7f) * 4)) * 4) * 4)) >>> 0);
    heap.setU32(0x009a200c, (in_EAX) >>> 0);
  }
  uVar7 = ((unaff_EBX & 0x1ffff) >>> 0);
  iVar8 = ((uVar7 * 0x10) >>> 0);
  if (heap.i16((unaff_EDI + 0xe)) == 0) {
    pbVar9 = ((heap.u32((0x008dc0b4) + (uVar7 * 4) * 4)) >>> 0);
    uVar7 = ((heap.u32((0x008dc0b8 + iVar8))) >>> 0);
    heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + iVar8))) >>> 0);
    heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + iVar8))) >>> 0);
    sVar5 = (((((heap.u32(0x009a2018) >>> 0x10)) << 16 >> 16)) & 0xffff);
    heap.setU32(0x009a2014, (((uVar7) << 16 >> 16)) >>> 0);
    heap.setU32(0x009a2016, ((((uVar7 >>> 0x10)) << 16 >> 16)) >>> 0);
    heap.setU32(0x009a2010, (pbVar9) >>> 0);
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    if ((heap.u32(0x009a201c) & 4) != 0) {
      uVar3 = ((CONCAT22(sVar5, heap.u32(0x009a2016))) >>> 0);
      heap.setU32(0x009a2020, (0) >>> 0);
      heap.setU32(0x009a202c, (heap.u32(0x009a2016)) >>> 0);
      sVar2 = (((in_DX + sVar5) - heap.i16((unaff_EDI + 6))) & 0xffff);
      if (sVar2 < 0) {
        heap.setU32(0x009a202c, (heap.u32(0x009a2016) + sVar2) >>> 0);
        if (heap.u32(0x009a202c) < 0) {
          heap.setU8(0x0099c164, (0) & 0xff);
          heap.setU32(0x009a2020, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a202c) == 0) {
          heap.setU8(0x0099c164, (0) & 0xff);
          heap.setU32(0x009a2020, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a2020, (-sVar2) >>> 0);
        sVar2 = ((0) & 0xffff);
      }
      sVar6 = ((heap.u32(0x009a202c)) & 0xffff);
      sVar4 = ((sVar2 + heap.u32(0x009a202c) + -1) & 0xffff);
      if ((sVar4 == 0 || (((sVar2 + heap.u32(0x009a202c))) << 16 >> 16) < 1) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar4) >>> 0), heap.u32(0x009a202c) != 0 && sVar4 <= sVar6)) {
        uVar3 = ((CONCAT22(sVar5, heap.u32(0x009a2014))) >>> 0);
        heap.setU32(0x009a2024, (0) >>> 0);
        heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
        sVar5 = (((in_CX + heap.u32(0x009a2018)) - heap.i16((unaff_EDI + 4))) & 0xffff);
        if (sVar5 < 0) {
          heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
          if (heap.u32(0x009a2028) < 0) {
            heap.setU8(0x0099c164, (0) & 0xff);
            heap.setU32(0x009a2024, (0) >>> 0);
            return uVar3;
          }
          if (heap.u32(0x009a2028) == 0) {
            heap.setU8(0x0099c164, (0) & 0xff);
            heap.setU32(0x009a2024, (0) >>> 0);
            return uVar3;
          }
          heap.setU32(0x009a2024, (-((sVar5) | 0)) >>> 0);
          sVar5 = ((0) & 0xffff);
        }
        sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
        sVar6 = ((sVar5 + heap.u32(0x009a2028) + -1) & 0xffff);
        if ((sVar6 == 0 || (((sVar5 + heap.u32(0x009a2028))) << 16 >> 16) < 1) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0), heap.u32(0x009a2028) != 0 && sVar6 <= sVar2)) {
          uVar3 = (((regs.eax = FUN_009b38bc(heap))) >>> 0);
          uVar7 = ((heap.u32(0x009a2014)) >>> 0);
        }
      }
      heap.setU32(0x009a2014, (uVar7) >>> 0);
      return uVar3;
    }
    uVar3 = ((CONCAT22(sVar5, heap.u32(0x009a2016))) >>> 0);
    heap.setU32(0x009a202c, (heap.u32(0x009a2016)) >>> 0);
    sVar5 = (((in_DX + sVar5) - heap.i16((unaff_EDI + 6))) & 0xffff);
    if (sVar5 < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a2016) + sVar5) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        heap.setU8(0x0099c164, (0) & 0xff);
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        heap.setU8(0x0099c164, (0) & 0xff);
        return uVar3;
      }
      uVar3 = (((uVar7 & 0xffff) * ((0) >>> 0) - sVar5 & 0xffff) >>> 0);
      sVar5 = ((0) & 0xffff);
    }
    sVar2 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar6 = ((sVar5 + heap.u32(0x009a202c) + -1) & 0xffff);
    if ((sVar6 == 0 || (((sVar5 + heap.u32(0x009a202c))) << 16 >> 16) < 1) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar6) >>> 0), heap.u32(0x009a202c) != 0 && sVar6 <= sVar2)) {
      uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a202e, (0) >>> 0);
      sVar5 = (((in_CX + heap.u32(0x009a2018)) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar5 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU8(0x0099c164, (0) & 0xff);
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU8(0x0099c164, (0) & 0xff);
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a202e, (-sVar5) >>> 0);
        sVar5 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar6 = ((sVar5 + heap.u32(0x009a2028) + -1) & 0xffff);
      if (sVar6 != 0 && 0 < (((sVar5 + heap.u32(0x009a2028))) << 16 >> 16)) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar2 < sVar6) {
          heap.setU8(0x0099c164, (0) & 0xff);
          return uVar3;
        }
        heap.setU32(0x009a202e, (heap.u32(0x009a202e) + sVar6) >>> 0);
      }
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar5 = ((heap.u32(0x009a2016) * heap.u32(0x009a2014)) & 0xffff);
        pbVar11 = ((0x009a2032) >>> 0);
        while (sVar5 != 0) {
          bVar1 = ((heap.u8(pbVar9)) & 0xff);
          uVar7 = ((((bVar1) >>> 0)) >>> 0);
          if (((bVar1) << 24 >> 24) < 0) {
            pbVar10 = ((pbVar9 + 1) >>> 0);
            sVar5 = ((sVar5 - ((0) & 0xffff) - (((bVar1) << 24 >> 24) >>> 3)) & 0xffff);
            pbVar9 = ((pbVar9 + 2) >>> 0);
            pbVar10 = ((pbVar11 + -((CONCAT11(bVar1, heap.u8(pbVar10)) & 0x7ff) >>> 0)) >>> 0);
            for (uVar7 = ((((0) >>> 0) - (((bVar1) << 24 >> 24) >>> 3)) >>> 0); uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU32(pbVar11, (heap.u8(pbVar10)) & 0xffffffff);
              pbVar10 = ((pbVar10 + 1) >>> 0);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          } else {
            sVar5 = ((sVar5 - ((bVar1) & 0xffff)) & 0xffff);
            for (; pbVar9 = ((pbVar9 + 1) >>> 0), uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU32(pbVar11, (heap.u8(pbVar9)) & 0xffffffff);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          }
        }
        uVar7 = (((regs.eax = FUN_009b37b8(heap))) >>> 0);
        return uVar7;
      }
      uVar3 = (((regs.eax = FUN_009b37b8(heap))) >>> 0);
      uVar7 = ((heap.u32(0x009a2014)) >>> 0);
    }
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    return uVar3;
  }
  if (heap.i16((unaff_EDI + 0xe)) != 1) {
    uVar7 = (((regs.eax = FUN_009b3e87(heap))) >>> 0);
    return uVar7;
  }
  if ((heap.u16((0x008dc0c0 + iVar8)) & 0x20) != 0) {
    heap.setU8(0x0099c164, (0) & 0xff);
    return in_EAX;
  }
  if ((heap.u16((0x008dc0c0 + iVar8)) & 0x10) != 0) {
    heap.setI16((unaff_EDI + 0xe), (heap.i16((unaff_EDI + 0xe)) + -1) & 0xffff);
    heap.setI16((unaff_EDI + 4), (heap.i16((unaff_EDI + 4)) >>> 1) & 0xffff);
    heap.setI16((unaff_EDI + 6), (heap.i16((unaff_EDI + 6)) >>> 1) & 0xffff);
    uVar7 = (((regs.eax = FUN_009b35fa(heap))) >>> 0);
    heap.setI16((unaff_EDI + 0xe), (heap.i16((unaff_EDI + 0xe)) + 1) & 0xffff);
    heap.setI16((unaff_EDI + 4), (heap.i16((unaff_EDI + 4)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 6), (heap.i16((unaff_EDI + 6)) << 1) & 0xffff);
    return uVar7;
  }
  pbVar9 = ((heap.u32((0x008dc0b4) + (uVar7 * 4) * 4)) >>> 0);
  uVar7 = ((heap.u32((0x008dc0b8 + iVar8))) >>> 0);
  heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + iVar8))) >>> 0);
  heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + iVar8))) >>> 0);
  sVar5 = (((((heap.u32(0x009a2018) >>> 0x10)) << 16 >> 16)) & 0xffff);
  heap.setU32(0x009a2014, (((uVar7) << 16 >> 16)) >>> 0);
  heap.setU32(0x009a2016, ((((uVar7 >>> 0x10)) << 16 >> 16)) >>> 0);
  heap.setU32(0x009a2010, (pbVar9) >>> 0);
  heap.setU32(0x009a2014, (uVar7) >>> 0);
  if ((heap.u32(0x009a201c) & 4) != 0) {
    uVar3 = ((CONCAT22(sVar5, heap.u32(0x009a2016))) >>> 0);
    heap.setU32(0x009a2020, (0) >>> 0);
    if ((uVar7 & 0x10000) != 0) {
      uVar3 = ((CONCAT22(sVar5, heap.u32(0x009a2016) + -1)) >>> 0);
      if ((((heap.u32(0x009a2016) + -1)) << 16 >> 16) == 0) {
        heap.setU8(0x0099c164, (0) & 0xff);
        heap.setU32(0x009a2020, (0) >>> 0);
        return uVar3;
      }
      heap.setU32(0x009a2020, (1) >>> 0);
    }
    heap.setU32(0x009a202c, (((uVar3) << 16 >> 16)) >>> 0);
    sVar5 = (((in_DX + sVar5 & 0xfffe) - heap.i16((unaff_EDI + 6))) & 0xffff);
    if (sVar5 < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a202c) + sVar5) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        heap.setU8(0x0099c164, (0) & 0xff);
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        heap.setU8(0x0099c164, (0) & 0xff);
        return uVar3;
      }
      heap.setU32(0x009a2020, (heap.u32(0x009a2020) - sVar5) >>> 0);
      sVar5 = ((0) & 0xffff);
    }
    sVar2 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar6 = ((sVar5 + heap.u32(0x009a202c) + -1) & 0xffff);
    if ((sVar6 == 0 || (((sVar5 + heap.u32(0x009a202c))) << 16 >> 16) < 1) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar6) >>> 0), heap.u32(0x009a202c) != 0 && sVar6 <= sVar2)) {
      uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
      heap.setU32(0x009a2024, (0) >>> 0);
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      sVar5 = (((in_CX + heap.u32(0x009a2018) & 0xfffe) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar5 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU8(0x0099c164, (0) & 0xff);
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU8(0x0099c164, (0) & 0xff);
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a2024, (-((sVar5) | 0)) >>> 0);
        sVar5 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar6 = ((sVar5 + heap.u32(0x009a2028) + -1) & 0xffff);
      if ((sVar6 == 0 || (((sVar5 + heap.u32(0x009a2028))) << 16 >> 16) < 1) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0), heap.u32(0x009a2028) != 0 && sVar6 <= sVar2)) {
        uVar3 = (((regs.eax = FUN_009b3d13(heap))) >>> 0);
        uVar7 = ((heap.u32(0x009a2014)) >>> 0);
      }
    }
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    return uVar3;
  }
  sVar2 = ((heap.u32(0x009a2016)) & 0xffff);
  if ((uVar7 & 0x10000) != 0) {
    sVar2 = ((heap.u32(0x009a2016) + -1) & 0xffff);
  }
  uVar3 = ((CONCAT22(sVar5, sVar2)) >>> 0);
  if (sVar2 != 0) {
    sVar5 = (((in_DX + sVar5 & 0xfffe) - heap.i16((unaff_EDI + 6))) & 0xffff);
    heap.setU32(0x009a202c, (sVar2) >>> 0);
    if (sVar5 < 0) {
      heap.setU32(0x009a202c, (sVar2 + sVar5) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        heap.setU8(0x0099c164, (0) & 0xff);
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        heap.setU8(0x0099c164, (0) & 0xff);
        return uVar3;
      }
      uVar3 = (((uVar7 & 0xffff) * ((0) >>> 0) - sVar5 & 0xffff) >>> 0);
      sVar5 = ((0) & 0xffff);
    }
    sVar2 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar6 = ((sVar5 + heap.u32(0x009a202c) + -1) & 0xffff);
    if ((sVar6 == 0 || (((sVar5 + heap.u32(0x009a202c))) << 16 >> 16) < 1) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar6) >>> 0), heap.u32(0x009a202c) != 0 && sVar6 <= sVar2)) {
      uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a202e, (0) >>> 0);
      sVar5 = (((in_CX + heap.u32(0x009a2018) & 0xfffe) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar5 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU8(0x0099c164, (0) & 0xff);
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU8(0x0099c164, (0) & 0xff);
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a202e, (-sVar5) >>> 0);
        sVar5 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar6 = ((sVar5 + heap.u32(0x009a2028) + -1) & 0xffff);
      if (sVar6 != 0 && 0 < (((sVar5 + heap.u32(0x009a2028))) << 16 >> 16)) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar2 < sVar6) {
          heap.setU8(0x0099c164, (0) & 0xff);
          return uVar3;
        }
        heap.setU32(0x009a202e, (heap.u32(0x009a202e) + sVar6) >>> 0);
      }
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar5 = ((heap.u32(0x009a2016) * heap.u32(0x009a2014)) & 0xffff);
        pbVar11 = ((0x009a2032) >>> 0);
        while (sVar5 != 0) {
          bVar1 = ((heap.u8(pbVar9)) & 0xff);
          uVar7 = ((((bVar1) >>> 0)) >>> 0);
          if (((bVar1) << 24 >> 24) < 0) {
            pbVar10 = ((pbVar9 + 1) >>> 0);
            sVar5 = ((sVar5 - ((0) & 0xffff) - (((bVar1) << 24 >> 24) >>> 3)) & 0xffff);
            pbVar9 = ((pbVar9 + 2) >>> 0);
            pbVar10 = ((pbVar11 + -((CONCAT11(bVar1, heap.u8(pbVar10)) & 0x7ff) >>> 0)) >>> 0);
            for (uVar7 = ((((0) >>> 0) - (((bVar1) << 24 >> 24) >>> 3)) >>> 0); uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU32(pbVar11, (heap.u8(pbVar10)) & 0xffffffff);
              pbVar10 = ((pbVar10 + 1) >>> 0);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          } else {
            sVar5 = ((sVar5 - ((bVar1) & 0xffff)) & 0xffff);
            for (; pbVar9 = ((pbVar9 + 1) >>> 0), uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU32(pbVar11, (heap.u8(pbVar9)) & 0xffffffff);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          }
        }
        uVar7 = (((regs.eax = FUN_009b3bf1(heap))) >>> 0);
        return uVar7;
      }
      uVar3 = (((regs.eax = FUN_009b3bf1(heap))) >>> 0);
      uVar7 = ((heap.u32(0x009a2014)) >>> 0);
    }
  }
  heap.setU32(0x009a2014, (uVar7) >>> 0);
  return uVar3;
}
