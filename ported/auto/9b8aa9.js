// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b8aa9.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_009b8aa9(heap) {
  let in_AL = regs.eax & 0xff;
  let uVar1 = 0;
  let bVar5 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let sVar6 = 0;
  let sVar7 = 0;
  let sVar8 = 0;
  let uVar9 = 0;
  let uVar10 = 0;
  let uVar13 = 0;
  let puVar11 = 0;
  let puVar12 = 0;
  let unaff_ESI = regs.esi >>> 0;
  let puVar14 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let puVar15 = 0;
  uVar13 = ((((((heap.u32(0x009a2020)) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
  if ((heap.u32(0x009a2000) & 0x20000000) != 0) {
    if ((heap.u32(0x009a2000) & 0x40000000) != 0) {
      uVar1 = ((0) & 0xff);
      puVar12 = (((CONCAT22(uVar13, heap.u16((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI)) >>> 0);
      do {
        sVar6 = ((heap.u32(0x009a202c)) & 0xffff);
        uVar3 = ((heap.u16(puVar12)) & 0xffff);
        heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
        bVar5 = (((((uVar3 & 0xffffff7f) >>> 8) & 0xff)) & 0xff);
        uVar2 = ((((uVar3 & 0xffffff7f) & 0xffff)) & 0xffff);
        uVar9 = ((((bVar5) >>> 0)) >>> 0);
        puVar12 = (((((puVar12) >>> 0) + uVar2 + 2)) >>> 0);
        if ((uVar3 & 0x100) == 0) {
          LAB_009b9d09: uVar4 = ((uVar2) & 0xffff);
          if ((uVar9 & 2) != 0) {
            uVar9 = ((((((uVar9) << 16 >> 16) + 2) >>> 0)) >>> 0);
            uVar4 = ((uVar2 - 2) & 0xffff);
            if (uVar4 == 0 || ((uVar2) << 16 >> 16) < 2) {
              /* goto LAB_009ba89f — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b8aa9/LAB_009ba89f"); return 0;
            }
          }
          sVar7 = (((((uVar9 - heap.u32(0x009a2024))) << 16 >> 16)) & 0xffff);
          if (uVar9 - heap.u32(0x009a2024) == 0 || ((uVar9) >>> 0) < heap.u32(0x009a2024)) {
            uVar4 = ((uVar4 + sVar7) & 0xffff);
            if ((((uVar4) << 16 >> 16) < 0) || (uVar4 == 0)) {
              /* goto LAB_009ba89f — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b8aa9/LAB_009ba89f"); return 0;
            }
            sVar7 = ((0) & 0xffff);
          }
          sVar8 = (((sVar7 + uVar4) - heap.u32(0x009a2028)) & 0xffff);
          uVar2 = ((uVar4) & 0xffff);
          if (((sVar8 == 0 || (((sVar7 + uVar4)) << 16 >> 16) < heap.u32(0x009a2028)) || (uVar2 = ((uVar4 - sVar8) & 0xffff), uVar2 != 0 && sVar8 <= ((uVar4) << 16 >> 16))) && (uVar2 = ((((uVar2 + 3) & 0xffff) >>> 2) & 0xffff), uVar2 != 0)) {
            LOCK();
            UNLOCK();
            heap.setU32(0x009a200c, (puVar12) >>> 0);
            uVar1 = (((regs.eax = callIndirect(heap, heap.u32((0x009b9d78) + (uVar2) * 4)))) & 0xff);
            return uVar1;
          }
        } else {
          uVar9 = ((((bVar5 + 1) >>> 0)) >>> 0);
          uVar2 = ((uVar2 - 1) & 0xffff);
          if (uVar2 != 0) {
            /* goto LAB_009b9d09 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b8aa9/LAB_009b9d09"); return 0;
          }
        }
        LAB_009ba89f: if ((uVar3 & 0x80) != 0) {
          heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0);
          if (heap.u32(0x009a202c) == 0) {
            return uVar1;
          }
          do {
            uVar3 = ((heap.u16(puVar12)) & 0xffff);
            heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
            puVar12 = (((((puVar12) >>> 0) + (heap.u32(0x009aa032) & 0x7f) + 2)) >>> 0);
          } while ((uVar3 & 0x80) == 0);
          heap.setU32(0x009a202c, (sVar6 + -2) >>> 0);
          if (heap.u32(0x009a202c) == 0) {
            return uVar1;
          }
          do {
            uVar3 = ((heap.u16(puVar12)) & 0xffff);
            heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
            puVar12 = (((((puVar12) >>> 0) + (heap.u32(0x009aa032) & 0x7f) + 2)) >>> 0);
          } while ((uVar3 & 0x80) == 0);
          heap.setU32(0x009a202c, (sVar6 + -3) >>> 0);
          if (heap.u32(0x009a202c) == 0) {
            return uVar1;
          }
          do {
            uVar3 = ((heap.u16(puVar12)) & 0xffff);
            heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
            puVar12 = (((((puVar12) >>> 0) + (heap.u32(0x009aa032) & 0x7f) + 2)) >>> 0);
          } while ((uVar3 & 0x80) == 0);
          heap.setU32(0x009a202c, (sVar6 + -4) >>> 0);
          if (heap.u32(0x009a202c) == 0) {
            return uVar1;
          }
        }
      } while (true);
    }
    uVar1 = ((0) & 0xff);
    puVar12 = (((CONCAT22(uVar13, heap.u16((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI)) >>> 0);
    do {
      sVar6 = ((heap.u32(0x009a202c)) & 0xffff);
      uVar3 = ((heap.u16(puVar12)) & 0xffff);
      heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
      bVar5 = (((((uVar3 & 0xffffff7f) >>> 8) & 0xff)) & 0xff);
      uVar2 = ((((uVar3 & 0xffffff7f) & 0xffff)) & 0xffff);
      uVar9 = ((((bVar5) >>> 0)) >>> 0);
      puVar12 = (((((puVar12) >>> 0) + uVar2 + 2)) >>> 0);
      if ((uVar3 & 0x100) == 0) {
        LAB_009b8c41: uVar4 = ((uVar2) & 0xffff);
        if ((uVar9 & 2) != 0) {
          uVar9 = ((((((uVar9) << 16 >> 16) + 2) >>> 0)) >>> 0);
          uVar4 = ((uVar2 - 2) & 0xffff);
          if (uVar4 == 0 || ((uVar2) << 16 >> 16) < 2) {
            /* goto LAB_009b9458 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b8aa9/LAB_009b9458"); return 0;
          }
        }
        sVar7 = (((((uVar9 - heap.u32(0x009a2024))) << 16 >> 16)) & 0xffff);
        if (uVar9 - heap.u32(0x009a2024) == 0 || ((uVar9) >>> 0) < heap.u32(0x009a2024)) {
          uVar4 = ((uVar4 + sVar7) & 0xffff);
          if ((((uVar4) << 16 >> 16) < 0) || (uVar4 == 0)) {
            /* goto LAB_009b9458 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b8aa9/LAB_009b9458"); return 0;
          }
          sVar7 = ((0) & 0xffff);
        }
        sVar8 = (((sVar7 + uVar4) - heap.u32(0x009a2028)) & 0xffff);
        uVar2 = ((uVar4) & 0xffff);
        if (((sVar8 == 0 || (((sVar7 + uVar4)) << 16 >> 16) < heap.u32(0x009a2028)) || (uVar2 = ((uVar4 - sVar8) & 0xffff), uVar2 != 0 && sVar8 <= ((uVar4) << 16 >> 16))) && (uVar2 = ((((uVar2 + 3) & 0xffff) >>> 2) & 0xffff), uVar2 != 0)) {
          LOCK();
          UNLOCK();
          heap.setU32(0x009a200c, (puVar12) >>> 0);
          uVar1 = (((regs.eax = callIndirect(heap, heap.u32((0x009b8cb0) + (uVar2) * 4)))) & 0xff);
          return uVar1;
        }
      } else {
        uVar9 = ((((bVar5 + 1) >>> 0)) >>> 0);
        uVar2 = ((uVar2 - 1) & 0xffff);
        if (uVar2 != 0) {
          /* goto LAB_009b8c41 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b8aa9/LAB_009b8c41"); return 0;
        }
      }
      LAB_009b9458: if ((uVar3 & 0x80) != 0) {
        heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return uVar1;
        }
        do {
          uVar3 = ((heap.u16(puVar12)) & 0xffff);
          heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
          puVar12 = (((((puVar12) >>> 0) + (heap.u32(0x009aa032) & 0x7f) + 2)) >>> 0);
        } while ((uVar3 & 0x80) == 0);
        heap.setU32(0x009a202c, (sVar6 + -2) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return uVar1;
        }
        do {
          uVar3 = ((heap.u16(puVar12)) & 0xffff);
          heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
          puVar12 = (((((puVar12) >>> 0) + (heap.u32(0x009aa032) & 0x7f) + 2)) >>> 0);
        } while ((uVar3 & 0x80) == 0);
        heap.setU32(0x009a202c, (sVar6 + -3) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return uVar1;
        }
        do {
          uVar3 = ((heap.u16(puVar12)) & 0xffff);
          heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
          puVar12 = (((((puVar12) >>> 0) + (heap.u32(0x009aa032) & 0x7f) + 2)) >>> 0);
        } while ((uVar3 & 0x80) == 0);
        heap.setU32(0x009a202c, (sVar6 + -4) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return uVar1;
        }
      }
    } while (true);
  }
  if ((heap.u32(0x009a2000) & 0x40000000) != 0) {
    uVar1 = ((0) & 0xff);
    puVar12 = (((CONCAT22(uVar13, heap.u16((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI)) >>> 0);
    do {
      sVar6 = ((heap.u32(0x009a202c)) & 0xffff);
      uVar3 = ((heap.u16(puVar12)) & 0xffff);
      heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
      bVar5 = (((((uVar3 & 0xffffff7f) >>> 8) & 0xff)) & 0xff);
      uVar2 = ((((uVar3 & 0xffffff7f) & 0xffff)) & 0xffff);
      uVar9 = ((((bVar5) >>> 0)) >>> 0);
      puVar12 = (((((puVar12) >>> 0) + uVar2 + 2)) >>> 0);
      if ((uVar3 & 0x100) == 0) {
        LAB_009b9535: uVar4 = ((uVar2) & 0xffff);
        if ((uVar9 & 2) != 0) {
          uVar9 = ((((((uVar9) << 16 >> 16) + 2) >>> 0)) >>> 0);
          uVar4 = ((uVar2 - 2) & 0xffff);
          if (uVar4 == 0 || ((uVar2) << 16 >> 16) < 2) {
            /* goto LAB_009b9c2c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b8aa9/LAB_009b9c2c"); return 0;
          }
        }
        sVar7 = (((((uVar9 - heap.u32(0x009a2024))) << 16 >> 16)) & 0xffff);
        if (uVar9 - heap.u32(0x009a2024) == 0 || ((uVar9) >>> 0) < heap.u32(0x009a2024)) {
          uVar4 = ((uVar4 + sVar7) & 0xffff);
          if ((((uVar4) << 16 >> 16) < 0) || (uVar4 == 0)) {
            /* goto LAB_009b9c2c — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b8aa9/LAB_009b9c2c"); return 0;
          }
          sVar7 = ((0) & 0xffff);
        }
        sVar8 = (((sVar7 + uVar4) - heap.u32(0x009a2028)) & 0xffff);
        uVar2 = ((uVar4) & 0xffff);
        if (((sVar8 == 0 || (((sVar7 + uVar4)) << 16 >> 16) < heap.u32(0x009a2028)) || (uVar2 = ((uVar4 - sVar8) & 0xffff), uVar2 != 0 && sVar8 <= ((uVar4) << 16 >> 16))) && (uVar2 = ((((uVar2 + 3) & 0xffff) >>> 2) & 0xffff), uVar2 != 0)) {
          LOCK();
          UNLOCK();
          heap.setU32(0x009a200c, (puVar12) >>> 0);
          uVar1 = (((regs.eax = callIndirect(heap, heap.u32((0x009b95a4) + (uVar2) * 4)))) & 0xff);
          return uVar1;
        }
      } else {
        uVar9 = ((((bVar5 + 1) >>> 0)) >>> 0);
        uVar2 = ((uVar2 - 1) & 0xffff);
        if (uVar2 != 0) {
          /* goto LAB_009b9535 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b8aa9/LAB_009b9535"); return 0;
        }
      }
      LAB_009b9c2c: if ((uVar3 & 0x80) != 0) {
        heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return uVar1;
        }
        do {
          uVar3 = ((heap.u16(puVar12)) & 0xffff);
          heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
          puVar12 = (((((puVar12) >>> 0) + (heap.u32(0x009aa032) & 0x7f) + 2)) >>> 0);
        } while ((uVar3 & 0x80) == 0);
        heap.setU32(0x009a202c, (sVar6 + -2) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return uVar1;
        }
        do {
          uVar3 = ((heap.u16(puVar12)) & 0xffff);
          heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
          puVar12 = (((((puVar12) >>> 0) + (heap.u32(0x009aa032) & 0x7f) + 2)) >>> 0);
        } while ((uVar3 & 0x80) == 0);
        heap.setU32(0x009a202c, (sVar6 + -3) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return uVar1;
        }
        do {
          uVar3 = ((heap.u16(puVar12)) & 0xffff);
          heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
          puVar12 = (((((puVar12) >>> 0) + (heap.u32(0x009aa032) & 0x7f) + 2)) >>> 0);
        } while ((uVar3 & 0x80) == 0);
        heap.setU32(0x009a202c, (sVar6 + -4) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return uVar1;
        }
      }
    } while (true);
  }
  puVar12 = (((CONCAT22(uVar13, heap.u16((unaff_ESI + heap.u32(0x009a2020) * 2))) + unaff_ESI)) >>> 0);
  do {
    uVar3 = ((heap.u16(puVar12)) & 0xffff);
    heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
    puVar14 = ((puVar12 + ((1) * 2)) >>> 0);
    bVar5 = (((((uVar3 & 0xffffff7f) >>> 8) & 0xff)) & 0xff);
    uVar2 = ((((uVar3 & 0xffffff7f) & 0xffff)) & 0xffff);
    uVar9 = ((((bVar5) >>> 0)) >>> 0);
    puVar11 = (((((puVar14) >>> 0) + ((uVar2) >>> 0))) >>> 0);
    if ((uVar3 & 0x100) == 0) {
      LAB_009b8afc: uVar3 = ((uVar2) & 0xffff);
      if ((uVar9 & 2) != 0) {
        uVar9 = ((((((uVar9) << 16 >> 16) + 2) >>> 0)) >>> 0);
        puVar14 = ((puVar14 + ((1) * 2)) >>> 0);
        uVar3 = ((uVar2 - 2) & 0xffff);
        if (uVar3 == 0 || ((uVar2) << 16 >> 16) < 2) {
          /* goto LAB_009b8b54 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b8aa9/LAB_009b8b54"); return 0;
        }
      }
      uVar10 = ((uVar9 - heap.u32(0x009a2024)) >>> 0);
      sVar6 = ((((uVar10) << 16 >> 16)) & 0xffff);
      if (uVar10 == 0 || ((uVar9) >>> 0) < heap.u32(0x009a2024)) {
        puVar14 = (((((puVar14) >>> 0) - uVar10)) >>> 0);
        uVar3 = ((uVar3 + sVar6) & 0xffff);
        if ((((uVar3) << 16 >> 16) < 0) || (uVar3 == 0)) {
          /* goto LAB_009b8b54 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b8aa9/LAB_009b8b54"); return 0;
        }
        sVar6 = ((0) & 0xffff);
        puVar15 = ((unaff_EDI) >>> 0);
      } else {
        puVar15 = ((unaff_EDI + (uVar10 >>> 2)) >>> 0);
      }
      sVar7 = (((sVar6 + uVar3) - heap.u32(0x009a2028)) & 0xffff);
      uVar2 = ((uVar3) & 0xffff);
      if ((sVar7 == 0 || (((sVar6 + uVar3)) << 16 >> 16) < heap.u32(0x009a2028)) || (uVar2 = ((uVar3 - sVar7) & 0xffff), uVar2 != 0 && sVar7 <= ((uVar3) << 16 >> 16))) {
        for (uVar3 = ((((uVar2 + 3) & 0xffff) >>> 2) & 0xffff); uVar3 != 0; uVar3 = (((uVar3 - 1) & 0xffff)) >>> 0) {
          in_AL = ((heap.u8(puVar14)) & 0xff);
          heap.setU32(puVar15, (in_AL) & 0xffffffff);
          puVar14 = ((puVar14 + ((2) * 2)) >>> 0);
          puVar15 = ((puVar15 + 1) >>> 0);
        }
      }
    } else {
      uVar9 = ((((bVar5 + 1) >>> 0)) >>> 0);
      puVar14 = (((((puVar12) >>> 0) + 3)) >>> 0);
      uVar2 = ((uVar2 - 1) & 0xffff);
      if (uVar2 != 0) {
        /* goto LAB_009b8afc — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b8aa9/LAB_009b8afc"); return 0;
      }
    }
    LAB_009b8b54: sVar6 = ((heap.u32(0x009a202c)) & 0xffff);
    puVar12 = ((puVar11) >>> 0);
    if ((heap.u32(0x009aa032) & 0x80) != 0) {
      unaff_EDI = ((unaff_EDI + heap.u32(0x009a2030)) >>> 0);
      heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0);
      if (heap.u32(0x009a202c) == 0) {
        return in_AL;
      }
      do {
        uVar3 = ((heap.u16(puVar12)) & 0xffff);
        heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
        puVar12 = (((((puVar12) >>> 0) + (heap.u32(0x009aa032) & 0x7f) + 2)) >>> 0);
      } while ((uVar3 & 0x80) == 0);
      heap.setU32(0x009a202c, (sVar6 + -2) >>> 0);
      if (heap.u32(0x009a202c) == 0) {
        return in_AL;
      }
      do {
        uVar3 = ((heap.u16(puVar12)) & 0xffff);
        heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
        puVar12 = (((((puVar12) >>> 0) + (heap.u32(0x009aa032) & 0x7f) + 2)) >>> 0);
      } while ((uVar3 & 0x80) == 0);
      heap.setU32(0x009a202c, (sVar6 + -3) >>> 0);
      if (heap.u32(0x009a202c) == 0) {
        return in_AL;
      }
      do {
        uVar3 = ((heap.u16(puVar12)) & 0xffff);
        heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
        puVar12 = (((((puVar12) >>> 0) + (heap.u32(0x009aa032) & 0x7f) + 2)) >>> 0);
      } while ((uVar3 & 0x80) == 0);
      heap.setU32(0x009a202c, (sVar6 + -4) >>> 0);
      if (heap.u32(0x009a202c) == 0) {
        return in_AL;
      }
    }
  } while (true);
}
