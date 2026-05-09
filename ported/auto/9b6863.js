// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b6863.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
export function FUN_009b6863(heap) {
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
          LAB_009b7923: sVar7 = (((((uVar9 - heap.u32(0x009a2024))) << 16 >> 16)) & 0xffff);
          if (uVar9 - heap.u32(0x009a2024) == 0 || ((uVar9) >>> 0) < heap.u32(0x009a2024)) {
            uVar2 = ((uVar2 + sVar7) & 0xffff);
            if ((((uVar2) << 16 >> 16) < 0) || (uVar2 == 0)) {
              /* goto LAB_009b843f — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b6863/LAB_009b843f"); return 0;
            }
            sVar7 = ((0) & 0xffff);
          }
          sVar8 = (((sVar7 + uVar2) - heap.u32(0x009a2028)) & 0xffff);
          uVar4 = ((uVar2) & 0xffff);
          if (((sVar8 == 0 || (((sVar7 + uVar2)) << 16 >> 16) < heap.u32(0x009a2028)) || (uVar4 = ((uVar2 - sVar8) & 0xffff), uVar4 != 0 && sVar8 <= ((uVar2) << 16 >> 16))) && (uVar2 = ((((uVar4 + 1) & 0xffff) >>> 1) & 0xffff), uVar2 != 0)) {
            LOCK();
            UNLOCK();
            heap.setU32(0x009a200c, (puVar12) >>> 0);
            uVar1 = (((regs.eax = callIndirect(heap, heap.u32((0x009b7978) + (uVar2) * 4)))) & 0xff);
            return uVar1;
          }
        } else {
          uVar9 = ((((bVar5 + 1) >>> 0)) >>> 0);
          uVar2 = ((uVar2 - 1) & 0xffff);
          if (uVar2 != 0) {
            /* goto LAB_009b7923 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b6863/LAB_009b7923"); return 0;
          }
        }
        LAB_009b843f: if ((uVar3 & 0x80) != 0) {
          heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0);
          if (heap.u32(0x009a202c) == 0) {
            return 0;
          }
          do {
            uVar3 = ((heap.u16(puVar12)) & 0xffff);
            heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
            puVar12 = (((((puVar12) >>> 0) + (heap.u32(0x009aa032) & 0x7f) + 2)) >>> 0);
          } while ((uVar3 & 0x80) == 0);
          heap.setU32(0x009a202c, (sVar6 + -2) >>> 0);
          if (heap.u32(0x009a202c) == 0) {
            return 0;
          }
        }
      } while (true);
    }
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
        LAB_009b6991: sVar7 = (((((uVar9 - heap.u32(0x009a2024))) << 16 >> 16)) & 0xffff);
        if (uVar9 - heap.u32(0x009a2024) == 0 || ((uVar9) >>> 0) < heap.u32(0x009a2024)) {
          uVar2 = ((uVar2 + sVar7) & 0xffff);
          if ((((uVar2) << 16 >> 16) < 0) || (uVar2 == 0)) {
            /* goto LAB_009b7130 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b6863/LAB_009b7130"); return 0;
          }
          sVar7 = ((0) & 0xffff);
        }
        sVar8 = (((sVar7 + uVar2) - heap.u32(0x009a2028)) & 0xffff);
        uVar4 = ((uVar2) & 0xffff);
        if (((sVar8 == 0 || (((sVar7 + uVar2)) << 16 >> 16) < heap.u32(0x009a2028)) || (uVar4 = ((uVar2 - sVar8) & 0xffff), uVar4 != 0 && sVar8 <= ((uVar2) << 16 >> 16))) && (uVar2 = ((((uVar4 + 1) & 0xffff) >>> 1) & 0xffff), uVar2 != 0)) {
          LOCK();
          UNLOCK();
          heap.setU32(0x009a200c, (puVar12) >>> 0);
          uVar1 = (((regs.eax = callIndirect(heap, heap.u32((0x009b69e8) + (uVar2) * 4)))) & 0xff);
          return uVar1;
        }
      } else {
        uVar9 = ((((bVar5 + 1) >>> 0)) >>> 0);
        uVar2 = ((uVar2 - 1) & 0xffff);
        if (uVar2 != 0) {
          /* goto LAB_009b6991 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b6863/LAB_009b6991"); return 0;
        }
      }
      LAB_009b7130: if ((uVar3 & 0x80) != 0) {
        heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return 0;
        }
        do {
          uVar3 = ((heap.u16(puVar12)) & 0xffff);
          heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
          puVar12 = (((((puVar12) >>> 0) + (heap.u32(0x009aa032) & 0x7f) + 2)) >>> 0);
        } while ((uVar3 & 0x80) == 0);
        heap.setU32(0x009a202c, (sVar6 + -2) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return 0;
        }
      }
    } while (true);
  }
  if ((heap.u32(0x009a2000) & 0x40000000) != 0) {
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
        LAB_009b71bb: sVar7 = (((((uVar9 - heap.u32(0x009a2024))) << 16 >> 16)) & 0xffff);
        if (uVar9 - heap.u32(0x009a2024) == 0 || ((uVar9) >>> 0) < heap.u32(0x009a2024)) {
          uVar2 = ((uVar2 + sVar7) & 0xffff);
          if ((((uVar2) << 16 >> 16) < 0) || (uVar2 == 0)) {
            /* goto LAB_009b7898 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b6863/LAB_009b7898"); return 0;
          }
          sVar7 = ((0) & 0xffff);
        }
        sVar8 = (((sVar7 + uVar2) - heap.u32(0x009a2028)) & 0xffff);
        uVar4 = ((uVar2) & 0xffff);
        if (((sVar8 == 0 || (((sVar7 + uVar2)) << 16 >> 16) < heap.u32(0x009a2028)) || (uVar4 = ((uVar2 - sVar8) & 0xffff), uVar4 != 0 && sVar8 <= ((uVar2) << 16 >> 16))) && (uVar2 = ((((uVar4 + 1) & 0xffff) >>> 1) & 0xffff), uVar2 != 0)) {
          LOCK();
          UNLOCK();
          heap.setU32(0x009a200c, (puVar12) >>> 0);
          uVar1 = (((regs.eax = callIndirect(heap, heap.u32((0x009b7210) + (uVar2) * 4)))) & 0xff);
          return uVar1;
        }
      } else {
        uVar9 = ((((bVar5 + 1) >>> 0)) >>> 0);
        uVar2 = ((uVar2 - 1) & 0xffff);
        if (uVar2 != 0) {
          /* goto LAB_009b71bb — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b6863/LAB_009b71bb"); return 0;
        }
      }
      LAB_009b7898: if ((uVar3 & 0x80) != 0) {
        heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return 0;
        }
        do {
          uVar3 = ((heap.u16(puVar12)) & 0xffff);
          heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
          puVar12 = (((((puVar12) >>> 0) + (heap.u32(0x009aa032) & 0x7f) + 2)) >>> 0);
        } while ((uVar3 & 0x80) == 0);
        heap.setU32(0x009a202c, (sVar6 + -2) >>> 0);
        if (heap.u32(0x009a202c) == 0) {
          return 0;
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
      LAB_009b68b6: uVar10 = ((uVar9 - heap.u32(0x009a2024)) >>> 0);
      sVar6 = ((((uVar10) << 16 >> 16)) & 0xffff);
      if (uVar10 == 0 || ((uVar9) >>> 0) < heap.u32(0x009a2024)) {
        puVar14 = (((((puVar14) >>> 0) - uVar10)) >>> 0);
        uVar2 = ((uVar2 + sVar6) & 0xffff);
        if ((((uVar2) << 16 >> 16) < 0) || (uVar2 == 0)) {
          /* goto LAB_009b68fa — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b6863/LAB_009b68fa"); return 0;
        }
        sVar6 = ((0) & 0xffff);
        puVar15 = ((unaff_EDI) >>> 0);
      } else {
        puVar15 = ((unaff_EDI + (uVar10 >>> 1)) >>> 0);
      }
      sVar7 = (((sVar6 + uVar2) - heap.u32(0x009a2028)) & 0xffff);
      uVar3 = ((uVar2) & 0xffff);
      if ((sVar7 == 0 || (((sVar6 + uVar2)) << 16 >> 16) < heap.u32(0x009a2028)) || (uVar3 = ((uVar2 - sVar7) & 0xffff), uVar3 != 0 && sVar7 <= ((uVar2) << 16 >> 16))) {
        for (uVar3 = ((((uVar3 + 1) & 0xffff) >>> 1) & 0xffff); uVar3 != 0; uVar3 = (((uVar3 - 1) & 0xffff)) >>> 0) {
          in_AL = ((heap.u8(puVar14)) & 0xff);
          heap.setU32(puVar15, (in_AL) & 0xffffffff);
          puVar14 = ((puVar14 + ((1) * 2)) >>> 0);
          puVar15 = ((puVar15 + 1) >>> 0);
        }
      }
    } else {
      uVar9 = ((((bVar5 + 1) >>> 0)) >>> 0);
      puVar14 = (((((puVar12) >>> 0) + 3)) >>> 0);
      uVar2 = ((uVar2 - 1) & 0xffff);
      if (uVar2 != 0) {
        /* goto LAB_009b68b6 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_009b6863/LAB_009b68b6"); return 0;
      }
    }
    LAB_009b68fa: sVar6 = ((heap.u32(0x009a202c)) & 0xffff);
    puVar12 = ((puVar11) >>> 0);
    if ((heap.u32(0x009aa032) & 0x80) != 0) {
      unaff_EDI = ((unaff_EDI + heap.u32(0x009a2030)) >>> 0);
      heap.setU32(0x009a202c, (heap.u32(0x009a202c) + -1) >>> 0);
      if (heap.u32(0x009a202c) == 0) {
        return in_AL;
      }
      do {
        uVar3 = ((heap.u16(puVar11)) & 0xffff);
        heap.setU32(0x009aa032, (((uVar3) & 0xff)) >>> 0);
        puVar11 = (((((puVar11) >>> 0) + (heap.u32(0x009aa032) & 0x7f) + 2)) >>> 0);
      } while ((uVar3 & 0x80) == 0);
      heap.setU32(0x009a202c, (sVar6 + -2) >>> 0);
      puVar12 = ((puVar11) >>> 0);
      if (heap.u32(0x009a202c) == 0) {
        return in_AL;
      }
    }
  } while (true);
}
