// @manual — do not regenerate.
// Source: decompiled/c/9b438b.c — sprite blit dispatcher. Same
// translator bug as 9b4457.js: `(char)bVar1 >> 3` rendered as `>>> 3`
// (unsigned) in RLE-decode loops. See 9b4457.js header for details.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT11, CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_009b4457 } from "./9b4457.js";
import { FUN_009b4660 } from "./9b4660.js";
import { FUN_009b4911 } from "./9b4911.js";
import { FUN_009b64ea } from "./9b64ea.js";
import { FUN_009b6863 } from "./9b6863.js";
import { FUN_009b8491 } from "./9b8491.js";
export function FUN_009b438b(heap) {
  let bVar1 = 0;
  let sVar2 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let in_CX = regs.ecx & 0xffff;
  let sVar5 = 0;
  let sVar6 = 0;
  let in_DX = regs.edx & 0xffff;
  let uVar7 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let iVar8 = 0;
  let pbVar9 = 0;
  let pbVar10 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let pbVar11 = 0;
  heap.setU32(0x009a2000, (unaff_EBX & 0x60000000) >>> 0);
  if (heap.u32(0x009a2000) != 0) {
    if ((unaff_EBX & 0x80000000) == 0) {
      uVar3 = ((unaff_EBX >>> 0x11 & 0x7f) >>> 0);
    } else {
      uVar3 = ((unaff_EBX >>> 0x11 & 0x7f) >>> 0);
      if (uVar3 != 0x27) {
        iVar8 = ((heap.u32((0x008dc0b4) + (heap.i32((0x009aa06c + uVar3 * 4)) * 4) * 4)) >>> 0);
        heap.setU32(0x009aa237, (heap.u32((iVar8 + 0xf3))) >>> 0);
        heap.setU32(0x009aa23b, (heap.u32((iVar8 + 0xf7))) >>> 0);
        heap.setU32(0x009aa23f, (heap.u32((iVar8 + 0xfb))) >>> 0);
        iVar8 = ((heap.u32((0x008dc0b4) + (heap.i32((0x009aa06c + (unaff_EBX >>> 0x18 & 0x1f) * 4)) * 4) * 4)) >>> 0);
        heap.setU32(0x009aa20e, (heap.u32((iVar8 + 0xf3))) >>> 0);
        heap.setU32(0x009aa212, (heap.u32((iVar8 + 0xf7))) >>> 0);
        heap.setU32(0x009aa216, (heap.u32((iVar8 + 0xfb))) >>> 0);
        heap.setU32(0x009a200c, (0x009aa144) >>> 0);
        uVar3 = (((regs.eax = FUN_009b4457(heap))) >>> 0);
        return uVar3;
      }
    }
    in_EAX = ((heap.u32((0x008dc0b4) + (heap.i32((0x009aa06c + uVar3 * 4)) * 4) * 4)) >>> 0);
    heap.setU32(0x009a200c, (in_EAX) >>> 0);
  }
  uVar3 = ((unaff_EBX & 0x1ffff) >>> 0);
  iVar8 = ((uVar3 * 0x10) >>> 0);
  if (heap.i16((unaff_EDI + 0xe)) == 0) {
    pbVar9 = ((heap.u32((0x008dc0b4) + (uVar3 * 4) * 4)) >>> 0);
    uVar3 = ((heap.u32((0x008dc0b8 + iVar8))) >>> 0);
    heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + iVar8))) >>> 0);
    heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + iVar8))) >>> 0);
    sVar5 = (((((heap.u32(0x009a2018) >>> 0x10)) << 16 >> 16)) & 0xffff);
    heap.setU32(0x009a2014, (((uVar3) << 16 >> 16)) >>> 0);
    heap.setU32(0x009a2016, ((((uVar3 >>> 0x10)) << 16 >> 16)) >>> 0);
    heap.setU32(0x009a2010, (pbVar9) >>> 0);
    heap.setU32(0x009a2014, (uVar3) >>> 0);
    if ((heap.u32(0x009a201c) & 4) != 0) {
      uVar4 = ((CONCAT22(sVar5, heap.u32(0x009a2016))) >>> 0);
      heap.setU32(0x009a2020, (0) >>> 0);
      heap.setU32(0x009a202c, (heap.u32(0x009a2016)) >>> 0);
      sVar5 = (((in_DX + sVar5) - heap.i16((unaff_EDI + 6))) & 0xffff);
      if (sVar5 < 0) {
        heap.setU32(0x009a202c, (heap.u32(0x009a2016) + sVar5) >>> 0);
        if (heap.u32(0x009a202c) < 0) {
          heap.setU32(0x009a2020, (0) >>> 0);
          return uVar4;
        }
        if (heap.u32(0x009a202c) == 0) {
          heap.setU32(0x009a2020, (0) >>> 0);
          return uVar4;
        }
        heap.setU32(0x009a2020, (-sVar5) >>> 0);
        sVar5 = ((0) & 0xffff);
      } else {
        uVar4 = (((((((heap.i16((unaff_EDI + 8)) + heap.i16((unaff_EDI + 0xc)))) << 16 >> 16)) | 0) * ((sVar5) | 0)) >>> 0);
      }
      sVar2 = ((heap.u32(0x009a202c)) & 0xffff);
      sVar6 = (((sVar5 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
      if ((sVar6 == 0 || (((sVar5 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar6) >>> 0), heap.u32(0x009a202c) != 0 && sVar6 <= sVar2)) {
        uVar4 = ((CONCAT22((((uVar4 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
        heap.setU32(0x009a2024, (0) >>> 0);
        heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
        sVar5 = (((in_CX + heap.u32(0x009a2018)) - heap.i16((unaff_EDI + 4))) & 0xffff);
        if (sVar5 < 0) {
          heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
          if (heap.u32(0x009a2028) < 0) {
            heap.setU32(0x009a2024, (0) >>> 0);
            return uVar4;
          }
          if (heap.u32(0x009a2028) == 0) {
            heap.setU32(0x009a2024, (0) >>> 0);
            return uVar4;
          }
          heap.setU32(0x009a2024, (-((sVar5) | 0)) >>> 0);
          sVar5 = ((0) & 0xffff);
        }
        sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
        sVar6 = (((sVar5 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
        if ((sVar6 == 0 || (((sVar5 + heap.u32(0x009a2028))) << 16 >> 16) < heap.i16((unaff_EDI + 8))) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0), heap.u32(0x009a2028) != 0 && sVar6 <= sVar2)) {
          heap.setU32(0x009a2030, (heap.i16((unaff_EDI + 8)) + heap.i16((unaff_EDI + 0xc))) >>> 0);
          uVar4 = (((regs.eax = FUN_009b4911(heap))) >>> 0);
          uVar3 = ((heap.u32(0x009a2014)) >>> 0);
        }
      }
      heap.setU32(0x009a2014, (uVar3) >>> 0);
      return uVar4;
    }
    uVar4 = ((CONCAT22(sVar5, heap.u32(0x009a2016))) >>> 0);
    heap.setU32(0x009a202c, (heap.u32(0x009a2016)) >>> 0);
    uVar7 = (((in_DX + sVar5) - heap.i16((unaff_EDI + 6))) & 0xffff);
    if (((uVar7) << 16 >> 16) < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a2016) + uVar7) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar4;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar4;
      }
      uVar4 = (((uVar3 & 0xffff) * ((0) >>> 0) - uVar7 & 0xffff) >>> 0);
      uVar7 = ((0) & 0xffff);
    } else {
      uVar4 = ((((heap.i16((unaff_EDI + 8)) + heap.i16((unaff_EDI + 0xc))) >>> 0) * ((uVar7) >>> 0)) >>> 0);
    }
    sVar5 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar2 = (((uVar7 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
    if ((sVar2 == 0 || (((uVar7 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar5)) {
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a2030, ((heap.i16((unaff_EDI + 8)) - heap.u32(0x009a2014)) + heap.i16((unaff_EDI + 0xc))) >>> 0);
      uVar4 = ((CONCAT22((((uVar4 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2030))) >>> 0);
      heap.setU32(0x009a202e, (0) >>> 0);
      sVar5 = (((in_CX + heap.u32(0x009a2018)) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar5 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar4;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar4;
        }
        heap.setU32(0x009a202e, (-sVar5) >>> 0);
        heap.setU32(0x009a2030, (heap.u32(0x009a2030) - sVar5) >>> 0);
        sVar5 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar6 = (((sVar5 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
      if (sVar6 != 0 && heap.i16((unaff_EDI + 8)) <= (((sVar5 + heap.u32(0x009a2028))) << 16 >> 16)) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar2 < sVar6) {
          return uVar4;
        }
        heap.setU32(0x009a202e, (heap.u32(0x009a202e) + sVar6) >>> 0);
        heap.setU32(0x009a2030, (heap.u32(0x009a2030) + sVar6) >>> 0);
      }
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar5 = ((heap.u32(0x009a2016) * heap.u32(0x009a2014)) & 0xffff);
        pbVar11 = ((0x009a2032) >>> 0);
        while (sVar5 != 0) {
          bVar1 = ((heap.u8(pbVar9)) & 0xff);
          uVar3 = ((((bVar1) >>> 0)) >>> 0);
          if (((bVar1) << 24 >> 24) < 0) {
            pbVar10 = ((pbVar9 + 1) >>> 0);
            sVar5 = ((sVar5 - ((0) & 0xffff) - (((bVar1) << 24 >> 24) >> 3)) & 0xffff);
            pbVar9 = ((pbVar9 + 2) >>> 0);
            pbVar10 = ((pbVar11 + -((CONCAT11(bVar1, heap.u8(pbVar10)) & 0x7ff) >>> 0)) >>> 0);
            for (uVar3 = ((((0) >>> 0) - (((bVar1) << 24 >> 24) >> 3)) >>> 0); uVar3 != 0; uVar3 = (((uVar3 - 1) >>> 0)) >>> 0) {
              heap.setU32(pbVar11, (heap.u8(pbVar10)) & 0xffffffff);
              pbVar10 = ((pbVar10 + 1) >>> 0);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          } else {
            sVar5 = ((sVar5 - ((bVar1) & 0xffff)) & 0xffff);
            for (; pbVar9 = ((pbVar9 + 1) >>> 0), uVar3 != 0; uVar3 = (((uVar3 - 1) >>> 0)) >>> 0) {
              heap.setU32(pbVar11, (heap.u8(pbVar9)) & 0xffffffff);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          }
        }
        uVar3 = (((regs.eax = FUN_009b4660(heap))) >>> 0);
        return uVar3;
      }
      uVar4 = (((regs.eax = FUN_009b4660(heap))) >>> 0);
      uVar3 = ((heap.u32(0x009a2014)) >>> 0);
    }
    heap.setU32(0x009a2014, (uVar3) >>> 0);
    return uVar4;
  }
  if (heap.i16((unaff_EDI + 0xe)) != 1) {
    uVar3 = (((regs.eax = FUN_009b8491(heap))) >>> 0);
    return uVar3;
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
    uVar3 = (((regs.eax = FUN_009b4457(heap))) >>> 0);
    heap.setI16((unaff_EDI + 0xe), (heap.i16((unaff_EDI + 0xe)) + 1) & 0xffff);
    heap.setI16((unaff_EDI + 4), (heap.i16((unaff_EDI + 4)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 6), (heap.i16((unaff_EDI + 6)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 8), (heap.i16((unaff_EDI + 8)) << 1) & 0xffff);
    heap.setI16((unaff_EDI + 10), (heap.i16((unaff_EDI + 10)) << 1) & 0xffff);
    return uVar3;
  }
  pbVar9 = ((heap.u32((0x008dc0b4) + (uVar3 * 4) * 4)) >>> 0);
  uVar3 = ((heap.u32((0x008dc0b8 + iVar8))) >>> 0);
  heap.setU32(0x009a2018, (heap.u32((0x008dc0bc + iVar8))) >>> 0);
  heap.setU32(0x009a201c, (heap.u32((0x008dc0c0 + iVar8))) >>> 0);
  sVar5 = (((((heap.u32(0x009a2018) >>> 0x10)) << 16 >> 16)) & 0xffff);
  heap.setU32(0x009a2014, (((uVar3) << 16 >> 16)) >>> 0);
  heap.setU32(0x009a2016, ((((uVar3 >>> 0x10)) << 16 >> 16)) >>> 0);
  heap.setU32(0x009a2010, (pbVar9) >>> 0);
  heap.setU32(0x009a2014, (uVar3) >>> 0);
  if ((heap.u32(0x009a201c) & 4) != 0) {
    uVar4 = ((CONCAT22(sVar5, heap.u32(0x009a2016))) >>> 0);
    heap.setU32(0x009a2020, (0) >>> 0);
    if ((uVar3 & 0x10000) != 0) {
      uVar4 = ((CONCAT22(sVar5, heap.u32(0x009a2016) + -1)) >>> 0);
      if ((((heap.u32(0x009a2016) + -1)) << 16 >> 16) == 0) {
        heap.setU32(0x009a2020, (0) >>> 0);
        return uVar4;
      }
      heap.setU32(0x009a2020, (1) >>> 0);
    }
    heap.setU32(0x009a202c, (((uVar4) << 16 >> 16)) >>> 0);
    uVar7 = (((in_DX + sVar5 & 0xfffe) - heap.i16((unaff_EDI + 6))) & 0xffff);
    if (((uVar7) << 16 >> 16) < 0) {
      heap.setU32(0x009a202c, (heap.u32(0x009a202c) + uVar7) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar4;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar4;
      }
      heap.setU32(0x009a2020, (heap.u32(0x009a2020) - uVar7) >>> 0);
      uVar7 = ((0) & 0xffff);
    } else {
      uVar4 = ((((((((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc)))) << 16 >> 16)) | 0) * (((((uVar7 >>> 1)) << 16 >> 16)) | 0)) >>> 0);
    }
    sVar5 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar2 = (((uVar7 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
    if ((sVar2 == 0 || (((uVar7 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar5)) {
      uVar4 = ((CONCAT22((((uVar4 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2014))) >>> 0);
      heap.setU32(0x009a2024, (0) >>> 0);
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      sVar5 = (((in_CX + heap.u32(0x009a2018) & 0xfffe) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar5 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar4;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a2024, (0) >>> 0);
          return uVar4;
        }
        heap.setU32(0x009a2024, (-((sVar5) | 0)) >>> 0);
        sVar5 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar6 = (((sVar5 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
      if ((sVar6 == 0 || (((sVar5 + heap.u32(0x009a2028))) << 16 >> 16) < heap.i16((unaff_EDI + 8))) || (heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0), heap.u32(0x009a2028) != 0 && sVar6 <= sVar2)) {
        heap.setU32(0x009a2030, ((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc))) >>> 0);
        uVar4 = (((regs.eax = FUN_009b6863(heap))) >>> 0);
        uVar3 = ((heap.u32(0x009a2014)) >>> 0);
      }
    }
    heap.setU32(0x009a2014, (uVar3) >>> 0);
    return uVar4;
  }
  sVar2 = ((heap.u32(0x009a2016)) & 0xffff);
  if ((uVar3 & 0x10000) != 0) {
    sVar2 = ((heap.u32(0x009a2016) + -1) & 0xffff);
  }
  uVar4 = ((CONCAT22(sVar5, sVar2)) >>> 0);
  if (sVar2 != 0) {
    uVar7 = (((in_DX + sVar5 & 0xfffe) - heap.i16((unaff_EDI + 6))) & 0xffff);
    if (((uVar7) << 16 >> 16) < 0) {
      heap.setU32(0x009a202c, (sVar2 + uVar7) >>> 0);
      if (heap.u32(0x009a202c) < 0) {
        return uVar4;
      }
      if (heap.u32(0x009a202c) == 0) {
        return uVar4;
      }
      uVar4 = (((uVar3 & 0xffff) * ((0) >>> 0) - uVar7 & 0xffff) >>> 0);
      uVar7 = ((0) & 0xffff);
    } else {
      uVar4 = (((((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc))) >>> 0) * ((uVar7 >>> 1) >>> 0)) >>> 0);
      heap.setU32(0x009a202c, (sVar2) >>> 0);
    }
    sVar5 = ((heap.u32(0x009a202c)) & 0xffff);
    sVar2 = (((uVar7 + heap.u32(0x009a202c)) - heap.i16((unaff_EDI + 10))) & 0xffff);
    if ((sVar2 == 0 || (((uVar7 + heap.u32(0x009a202c))) << 16 >> 16) < heap.i16((unaff_EDI + 10))) || (heap.setU32(0x009a202c, (heap.u32(0x009a202c) - sVar2) >>> 0), heap.u32(0x009a202c) != 0 && sVar2 <= sVar5)) {
      heap.setU32(0x009a2028, (heap.u32(0x009a2014)) >>> 0);
      heap.setU32(0x009a2030, ((heap.u16((unaff_EDI + 8)) >>> 1) + heap.i16((unaff_EDI + 0xc))) >>> 0);
      uVar4 = ((CONCAT22((((uVar4 >>> 0x10)) << 16 >> 16), heap.u32(0x009a2030))) >>> 0);
      heap.setU32(0x009a202e, (0) >>> 0);
      sVar5 = (((in_CX + heap.u32(0x009a2018) & 0xfffe) - heap.i16((unaff_EDI + 4))) & 0xffff);
      if (sVar5 < 0) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2014) + sVar5) >>> 0);
        if (heap.u32(0x009a2028) < 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar4;
        }
        if (heap.u32(0x009a2028) == 0) {
          heap.setU32(0x009a202e, (0) >>> 0);
          return uVar4;
        }
        heap.setU32(0x009a202e, (-sVar5) >>> 0);
        sVar5 = ((0) & 0xffff);
      }
      sVar2 = ((heap.u32(0x009a2028)) & 0xffff);
      sVar6 = (((sVar5 + heap.u32(0x009a2028)) - heap.i16((unaff_EDI + 8))) & 0xffff);
      if (sVar6 != 0 && heap.i16((unaff_EDI + 8)) <= (((sVar5 + heap.u32(0x009a2028))) << 16 >> 16)) {
        heap.setU32(0x009a2028, (heap.u32(0x009a2028) - sVar6) >>> 0);
        if (heap.u32(0x009a2028) == 0 || sVar2 < sVar6) {
          return uVar4;
        }
        heap.setU32(0x009a202e, (heap.u32(0x009a202e) + sVar6) >>> 0);
      }
      if ((heap.u32(0x009a201c) & 2) != 0) {
        sVar5 = ((heap.u32(0x009a2016) * heap.u32(0x009a2014)) & 0xffff);
        pbVar11 = ((0x009a2032) >>> 0);
        while (sVar5 != 0) {
          bVar1 = ((heap.u8(pbVar9)) & 0xff);
          uVar3 = ((((bVar1) >>> 0)) >>> 0);
          if (((bVar1) << 24 >> 24) < 0) {
            pbVar10 = ((pbVar9 + 1) >>> 0);
            sVar5 = ((sVar5 - ((0) & 0xffff) - (((bVar1) << 24 >> 24) >> 3)) & 0xffff);
            pbVar9 = ((pbVar9 + 2) >>> 0);
            pbVar10 = ((pbVar11 + -((CONCAT11(bVar1, heap.u8(pbVar10)) & 0x7ff) >>> 0)) >>> 0);
            for (uVar3 = ((((0) >>> 0) - (((bVar1) << 24 >> 24) >> 3)) >>> 0); uVar3 != 0; uVar3 = (((uVar3 - 1) >>> 0)) >>> 0) {
              heap.setU32(pbVar11, (heap.u8(pbVar10)) & 0xffffffff);
              pbVar10 = ((pbVar10 + 1) >>> 0);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          } else {
            sVar5 = ((sVar5 - ((bVar1) & 0xffff)) & 0xffff);
            for (; pbVar9 = ((pbVar9 + 1) >>> 0), uVar3 != 0; uVar3 = (((uVar3 - 1) >>> 0)) >>> 0) {
              heap.setU32(pbVar11, (heap.u8(pbVar9)) & 0xffffffff);
              pbVar11 = ((pbVar11 + 1) >>> 0);
            }
          }
        }
        uVar3 = (((regs.eax = FUN_009b64ea(heap))) >>> 0);
        return uVar3;
      }
      uVar4 = (((regs.eax = FUN_009b64ea(heap))) >>> 0);
      uVar3 = ((heap.u32(0x009a2014)) >>> 0);
    }
  }
  heap.setU32(0x009a2014, (uVar3) >>> 0);
  return uVar4;
}
