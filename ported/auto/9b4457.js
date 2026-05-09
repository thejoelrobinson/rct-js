// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b4457.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_009b4660 } from "./9b4660.js";
import { FUN_009b4911 } from "./9b4911.js";
import { FUN_009b64ea } from "./9b64ea.js";
import { FUN_009b6863 } from "./9b6863.js";
import { FUN_009b8491 } from "./9b8491.js";
export function FUN_009b4457(heap) {
  let bVar1 = 0;
  let sVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar3 = 0;
  let in_CX = regs.ecx & 0xffff;
  let sVar4 = 0;
  let sVar5 = 0;
  let in_DX = regs.edx & 0xffff;
  let uVar6 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let pbVar9 = 0;
  let pbVar10 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let pbVar11 = 0;
  uVar7 = ((unaff_EBX & 0x1ffff) >>> 0);
  iVar8 = ((uVar7 * 0x10) >>> 0);
  if (heap.i16((unaff_EDI + 0xe)) == 0) {
    pbVar9 = ((heap.u32((0x008dc0b4) + (uVar7 * 4) * 4)) >>> 0);
    uVar7 = ((heap.u32((0x008dc0b8 + iVar8))) >>> 0);
    heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + iVar8))) >>> 0);
    heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + iVar8))) >>> 0);
    sVar4 = (((((((heap.u32(0x009a2018)) >>> 0) >>> 0x10)) << 16 >> 16)) & 0xffff);
    heap.setU32(0x009a2014, (((uVar7) << 16 >> 16)) >>> 0);
    heap.setU32(0x009a2016, ((((uVar7 >>> 0x10)) << 16 >> 16)) >>> 0);
    heap.setU32(0x009a2010, (pbVar9) >>> 0);
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    if ((heap.u32(0x009a201c) & 4) != 0) {
      uVar3 = ((CONCAT22(sVar4, heap.u32(0x009a2016))) >>> 0);
      heap.setU32(0x009a2020, (0) >>> 0);
      heap.setU32(0x009a202c, (heap.u32(0x009a2016)) >>> 0);
      sVar4 = (((in_DX + sVar4) - heap.i16((unaff_EDI + 6))) & 0xffff);
      if (sVar4 < 0) {
        heap.setU32(0x009a202c, (heap.u32(0x009a2016) + sVar4) >>> 0);
        if (heap.u32(0x009a202c) < 0) {
          heap.setU32(0x009a2020, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a202c) == 0) {
          heap.setU32(0x009a2020, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a2020, (-sVar4) >>> 0);
        sVar4 = ((0) & 0xffff);
      } else {
        uVar3 = (((((((heap.i16((unaff_EDI + 8)) + heap.i16((unaff_EDI + 0xc)))) << 16 >> 16)) >>> 0) * ((sVar4) >>> 0)) >>> 0);
      }
      sVar2 = ((heap.u32(0x009a202c)) & 0xffff);
      sVar5 = (((sVar4 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
      if ((sVar5 == 0 || (((sVar4 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar5) >>> 0), heap.u32(0x009a202c) != 0 && sVar5 <= sVar2)) {
        uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
        heap.setU32(0x009a2024, (0) >>> 0);
        heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
        sVar4 = (((in_CX + heap.u32(0x009a2018)) - heap.i16((unaff_EDI + 4))) & 0xffff);
        if (sVar4 < 0) {
          heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar4) >>> 0);
          if (heap.u32(0x009a2028) < 0) {
            heap.setU32(0x009a2024, (0) >>> 0);
            return uVar3;
          }
          if (heap.u32(0x009a2028) == 0) {
            heap.setU32(0x009a2024, (0) >>> 0);
            return uVar3;
          }
          heap.setU32(0x009a2024, (-((sVar4) >>> 0)) >>> 0);
          sVar4 = ((0) & 0xffff);
        }
        sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
        sVar5 = (((sVar4 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
        if ((sVar5 == 0 || (((sVar4 + heap.u32(0x009a2028))) << 16 >> 16) < heap.i16((unaff_EDI + 8))) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0), heap.u32(0x009a2028) != 0 && sVar5 <= sVar2)) {
          heap.setU32(0x009a2030, (heap.i16((unaff_EDI + 8)) + heap.i16((unaff_EDI + 0xc))) >>> 0);
          uVar3 = (((regs.eax = FUN_009b4911(heap))) >>> 0);
          uVar7 = ((heap.u32(0x009a2014)) >>> 0);
        }
      }
      heap.setU32(0x009a2014, (uVar7) >>> 0);
      return uVar3;
    }
    uVar3 = ((CONCAT22(sVar4, heap.u32(0x009a2016))) >>> 0);
    heap.setU32(0x009a202c, (heap.u32(0x009a2016)) >>> 0);
    uVar6 = (((in_DX + sVar4) - heap.i16((unaff_EDI + 6))) & 0xffff);
    if (((uVar6) << 16 >> 16) < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a2016) + uVar6) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar3;
      }
      uVar3 = (((uVar7 & 0xffff) * ((0) >>> 0) - uVar6 & 0xffff) >>> 0);
      uVar6 = ((0) & 0xffff);
    } else {
      uVar3 = ((((heap.i16((unaff_EDI + 8)) + heap.i16((unaff_EDI + 0xc))) >>> 0) * ((uVar6) >>> 0)) >>> 0);
    }
    sVar4 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar2 = (((uVar6 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
    if ((sVar2 == 0 || (((uVar6 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar4)) {
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a2030, ((heap.i16((unaff_EDI + 8)) - heap.u32(0x009a2014)) + heap.i16((unaff_EDI + 0xc))) >>> 0);
      uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2030))) >>> 0);
      heap.setU32(0x009a202e, (0) >>> 0);
      sVar4 = (((in_CX + heap.u32(0x009a2018)) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar4 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar4) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a202e, (-sVar4) >>> 0);
        heap.setU32(0x009a2030, (heap.u32(0x009a2030) - sVar4) >>> 0);
        sVar4 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar5 = (((sVar4 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
      if (sVar5 != 0 && heap.i16((unaff_EDI + 8)) <= (((sVar4 + heap.u32(0x009a2028))) << 16 >> 16)) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar2 < sVar5) {
          return uVar3;
        }
        heap.setU32(0x009a202e, (heap.u32(0x009a202e) + sVar5) >>> 0);
        heap.setU32(0x009a2030, (heap.u32(0x009a2030) + sVar5) >>> 0);
      }
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar4 = ((heap.u32(0x009a2016) * heap.u32(0x009a2014)) & 0xffff);
        pbVar11 = ((0x009a2032) >>> 0);
        while (sVar4 != 0) {
          bVar1 = ((heap.u8(pbVar9)) & 0xff);
          uVar7 = ((((bVar1) >>> 0)) >>> 0);
          if (((bVar1) << 24 >> 24) < 0) {
            pbVar10 = ((pbVar9 + 1) >>> 0);
            sVar4 = ((sVar4 - ((0) & 0xffff) - (((bVar1) << 24 >> 24) >>> 3)) & 0xffff);
            pbVar9 = ((pbVar9 + 2) >>> 0);
            pbVar10 = ((pbVar11 + -((CONCAT11(bVar1, heap.u8(pbVar10)) & 0x7ff) >>> 0)) >>> 0);
            for (uVar7 = ((((0) >>> 0) - (((bVar1) << 24 >> 24) >>> 3)) >>> 0); uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU32(pbVar11, (heap.u8(pbVar10)) & 0xffffffff);
              pbVar10 = ((pbVar10 + 1) >>> 0);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          } else {
            sVar4 = ((sVar4 - ((bVar1) & 0xffff)) & 0xffff);
            for (; pbVar9 = ((pbVar9 + 1) >>> 0), uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU32(pbVar11, (heap.u8(pbVar9)) & 0xffffffff);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          }
        }
        uVar7 = (((regs.eax = FUN_009b4660(heap))) >>> 0);
        return uVar7;
      }
      uVar3 = (((regs.eax = FUN_009b4660(heap))) >>> 0);
      uVar7 = ((heap.u32(0x009a2014)) >>> 0);
    }
    heap.setU32(0x009a2014, (uVar7) >>> 0);
    return uVar3;
  }
  if (heap.i16((unaff_EDI + 0xe)) != 1) {
    uVar7 = (((regs.eax = FUN_009b8491(heap))) >>> 0);
    return uVar7;
  }
  if ((heap.u16((0x008dc0c0 + iVar8)) & 0x20) != 0) {
    return in_EAX;
  }
  if ((heap.u16((0x008dc0c0 + iVar8)) & 0x10) != 0) {
    heap.setI16((unaff_EDI + 0xe), (heap.i16((unaff_EDI + 0xe)) + -1) & 0xffff);
    heap.setI16((unaff_EDI + 4), (heap.i16((unaff_EDI + 4)) >>> 1) & 0xffff);
    heap.setI16((unaff_EDI + 6), (heap.i16((unaff_EDI + 6)) >>> 1) & 0xffff);
    heap.setI16((unaff_EDI + 8), (heap.i16((unaff_EDI + 8)) >>> 1) & 0xffff);
    heap.setI16((unaff_EDI + 10), (heap.i16((unaff_EDI + 10)) >>> 1) & 0xffff);
    uVar7 = (((regs.eax = FUN_009b4457(heap))) >>> 0);
    heap.setI16((unaff_EDI + 0xe), (heap.i16((unaff_EDI + 0xe)) + 1) & 0xffff);
    heap.setI16((unaff_EDI + 4), (heap.i16((unaff_EDI + 4)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 6), (heap.i16((unaff_EDI + 6)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 8), (heap.i16((unaff_EDI + 8)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 10), (heap.i16((unaff_EDI + 10)) << 1) & 0xffff);
    return uVar7;
  }
  pbVar9 = ((heap.u32((0x008dc0b4) + (uVar7 * 4) * 4)) >>> 0);
  uVar7 = ((heap.u32((0x008dc0b8 + iVar8))) >>> 0);
  heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + iVar8))) >>> 0);
  heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + iVar8))) >>> 0);
  sVar4 = (((((((heap.u32(0x009a2018)) >>> 0) >>> 0x10)) << 16 >> 16)) & 0xffff);
  heap.setU32(0x009a2014, (((uVar7) << 16 >> 16)) >>> 0);
  heap.setU32(0x009a2016, ((((uVar7 >>> 0x10)) << 16 >> 16)) >>> 0);
  heap.setU32(0x009a2010, (pbVar9) >>> 0);
  heap.setU32(0x009a2014, (uVar7) >>> 0);
  if ((heap.u32(0x009a201c) & 4) != 0) {
    uVar3 = ((CONCAT22(sVar4, heap.u32(0x009a2016))) >>> 0);
    heap.setU32(0x009a2020, (0) >>> 0);
    if ((uVar7 & 0x10000) != 0) {
      uVar3 = ((CONCAT22(sVar4, heap.u32(0x009a2016) + -1)) >>> 0);
      if ((((heap.u32(0x009a2016) + -1)) << 16 >> 16) == 0) {
        heap.setU32(0x009a2020, (0) >>> 0);
        return uVar3;
      }
      heap.setU32(0x009a2020, (1) >>> 0);
    }
    heap.setU32(0x009a202c, (((uVar3) << 16 >> 16)) >>> 0);
    uVar6 = (((in_DX + sVar4 & 0xfffe) - heap.i16((unaff_EDI + 6))) & 0xffff);
    if (((uVar6) << 16 >> 16) < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a202c) + uVar6) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar3;
      }
      heap.setU32(0x009a2020, (heap.u32(0x009a2020) - uVar6) >>> 0);
      uVar6 = ((0) & 0xffff);
    } else {
      uVar3 = ((((((((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc)))) << 16 >> 16)) >>> 0) * (((((uVar6 >>> 1)) << 16 >> 16)) >>> 0)) >>> 0);
    }
    sVar4 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar2 = (((uVar6 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
    if ((sVar2 == 0 || (((uVar6 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar4)) {
      uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
      heap.setU32(0x009a2024, (0) >>> 0);
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      sVar4 = (((in_CX + heap.u32(0x009a2018) & 0xfffe) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar4 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar4) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a2024, (-((sVar4) >>> 0)) >>> 0);
        sVar4 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar5 = (((sVar4 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
      if ((sVar5 == 0 || (((sVar4 + heap.u32(0x009a2028))) << 16 >> 16) < heap.i16((unaff_EDI + 8))) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0), heap.u32(0x009a2028) != 0 && sVar5 <= sVar2)) {
        heap.setU32(0x009a2030, ((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc))) >>> 0);
        uVar3 = (((regs.eax = FUN_009b6863(heap))) >>> 0);
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
  uVar3 = ((CONCAT22(sVar4, sVar2)) >>> 0);
  if (sVar2 != 0) {
    uVar6 = (((in_DX + sVar4 & 0xfffe) - heap.i16((unaff_EDI + 6))) & 0xffff);
    if (((uVar6) << 16 >> 16) < 0) {
      heap.setU32(0x009a202c, (sVar2 + uVar6) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar3;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar3;
      }
      uVar3 = (((uVar7 & 0xffff) * ((0) >>> 0) - uVar6 & 0xffff) >>> 0);
      uVar6 = ((0) & 0xffff);
    } else {
      uVar3 = (((((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc))) >>> 0) * ((uVar6 >>> 1) >>> 0)) >>> 0);
      heap.setU32(0x009a202c, (sVar2) >>> 0);
    }
    sVar4 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar2 = (((uVar6 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
    if ((sVar2 == 0 || (((uVar6 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar4)) {
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a2030, ((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc))) >>> 0);
      uVar3 = ((CONCAT22((((uVar3 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2030))) >>> 0);
      heap.setU32(0x009a202e, (0) >>> 0);
      sVar4 = (((in_CX + heap.u32(0x009a2018) & 0xfffe) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar4 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar4) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar3;
        }
        heap.setU32(0x009a202e, (-sVar4) >>> 0);
        sVar4 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar5 = (((sVar4 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
      if (sVar5 != 0 && heap.i16((unaff_EDI + 8)) <= (((sVar4 + heap.u32(0x009a2028))) << 16 >> 16)) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar5) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar2 < sVar5) {
          return uVar3;
        }
        heap.setU32(0x009a202e, (heap.u32(0x009a202e) + sVar5) >>> 0);
      }
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar4 = ((heap.u32(0x009a2016) * heap.u32(0x009a2014)) & 0xffff);
        pbVar11 = ((0x009a2032) >>> 0);
        while (sVar4 != 0) {
          bVar1 = ((heap.u8(pbVar9)) & 0xff);
          uVar7 = ((((bVar1) >>> 0)) >>> 0);
          if (((bVar1) << 24 >> 24) < 0) {
            pbVar10 = ((pbVar9 + 1) >>> 0);
            sVar4 = ((sVar4 - ((0) & 0xffff) - (((bVar1) << 24 >> 24) >>> 3)) & 0xffff);
            pbVar9 = ((pbVar9 + 2) >>> 0);
            pbVar10 = ((pbVar11 + -((CONCAT11(bVar1, heap.u8(pbVar10)) & 0x7ff) >>> 0)) >>> 0);
            for (uVar7 = ((((0) >>> 0) - (((bVar1) << 24 >> 24) >>> 3)) >>> 0); uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU32(pbVar11, (heap.u8(pbVar10)) & 0xffffffff);
              pbVar10 = ((pbVar10 + 1) >>> 0);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          } else {
            sVar4 = ((sVar4 - ((bVar1) & 0xffff)) & 0xffff);
            for (; pbVar9 = ((pbVar9 + 1) >>> 0), uVar7 != 0; uVar7 = (((uVar7 - 1) >>> 0)) >>> 0) {
              heap.setU32(pbVar11, (heap.u8(pbVar9)) & 0xffffffff);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          }
        }
        uVar7 = (((regs.eax = FUN_009b64ea(heap))) >>> 0);
        return uVar7;
      }
      uVar3 = (((regs.eax = FUN_009b64ea(heap))) >>> 0);
      uVar7 = ((heap.u32(0x009a2014)) >>> 0);
    }
  }
  heap.setU32(0x009a2014, (uVar7) >>> 0);
  return uVar3;
}
