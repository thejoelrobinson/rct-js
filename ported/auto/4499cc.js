// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4499cc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CARRY1, CONCAT11, LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { FUN_0044a2a8 } from "./44a2a8.js";
import { FUN_004516de } from "./4516de.js";
import { FUN_0045174b } from "./45174b.js";
import { FUN_004519c9 } from "./4519c9.js";
import { FUN_0045389c } from "./45389c.js";
import { FUN_00453900 } from "./453900.js";
import { FUN_00453bf8 } from "./453bf8.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_005e585a } from "./5e585a.js";
import { FUN_005e59ec } from "./5e59ec.js";
export function FUN_004499cc(heap) {
  const __sp = heap.allocFrame(68);
  const __addr_DAT_00887420 = __sp + 0;
  const __addr_DAT_005f5b78 = __sp + 4;
  const __addr_DAT_005f66c8 = __sp + 8;
  const __addr_DAT_00743be4 = __sp + 12;
  const __addr_DAT_00743c62 = __sp + 16;
  const __addr_DAT_00743c47 = __sp + 20;
  const __addr_DAT_00743b9e = __sp + 24;
  const __addr_DAT_00743be6 = __sp + 28;
  const __addr_DAT_00743be5 = __sp + 32;
  const __addr_DAT_005f5e88 = __sp + 36;
  const __addr_DAT_0062d580 = __sp + 40;
  const __addr_DAT_005f5e89 = __sp + 44;
  const __addr_DAT_00743b94 = __sp + 48;
  const __addr_DAT_00743bc6 = __sp + 52;
  const __addr_DAT_00971ef4 = __sp + 56;
  const __addr_DAT_00631c74 = __sp + 60;
  const __addr_DAT_005f5658 = __sp + 64;
  try {
  let puVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let bVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let cVar10 = 0;
  let bVar11 = 0;
  let uVar9 = 0;
  let uVar12 = 0;
  let iVar13 = 0;
  let pbVar14 = 0;
  let pbVar15 = 0;
  let sVar16 = 0;
  let unaff_EDI = 0;
  FUN_0045389c(heap);
  pbVar14 = __addr_DAT_00887420;
  uVar6 = 0;
  do {
    if (heap.u32(pbVar14) != 0xff) {
      if ((heap.u32((__addr_DAT_005f5b78 + heap.u32(pbVar14) * 8)) & 0x80000) != 0) {
        if ((heap.u32(pbVar14 + (0x21) * 4) == 1) && ((heap.u32(pbVar14 + (0x76) * 4) & 0x20) != 0)) {
          if ((heap.u32((pbVar14 + 2)) & 0xc0) != 0) {
            if (heap.u32(pbVar14 + (0x13c) * 4) == 7) {
              if (((heap.u32(0x0088741c) & 7) == 0) && (heap.u32(pbVar14 + (0x15c) * 4) != 0xff)) {
                heap.setU32((pbVar14 + (0x15c) * 4), (heap.u32(pbVar14 + (0x15c) * 4) + 1) >>> 0);
              }
            } else {
              if (heap.u32(pbVar14 + (0x15c) * 4) != 0xff) {
                heap.setU32((pbVar14 + (0x15c) * 4), (heap.u32(pbVar14 + (0x15c) * 4) + 1) >>> 0);
              }
              if ((heap.u32(pbVar14 + (0x15c) * 4) == 0xff) && (heap.u32(pbVar14 + (0x13c) * 4) == 0)) {
                /* goto LAB_00449a8a */ throw new Error("goto LAB_00449a8a not supported");
              }
            }
          }
          if (heap.u32(pbVar14 + (0x10c) * 4) == 0xff) {
            pbVar15 = heap.u32((__addr_DAT_005f66c8 + heap.u32(pbVar14) * 4));
            bVar5 = FUN_005df40c(heap);
            heap.setU32((pbVar14 + (0x10c) * 4), (heap.u32(pbVar15 + (((bVar5 * heap.u32(pbVar15)) >>> 8) + 1) * 4)) >>> 0);
            heap.setU32((pbVar14 + (0x138) * 4), (0) >>> 0);
            heap.setU32((pbVar14 + (0x139) * 4), (0) >>> 0);
            heap.setU32((pbVar14 + (0x13a) * 4), (0) >>> 0);
            heap.setU32((pbVar14 + (0x13b) * 4), (0) >>> 0);
          }
        } else {
          LAB_00449a8a: heap.setU32((pbVar14 + (0x10c) * 4), (0xff) >>> 0);
        }
        if (heap.u32(pbVar14 + (0x10c) * 4) != 0xff) {
          bVar5 = heap.u32(pbVar14 + (0x10c) * 4);
          uVar4 = heap.u32((pbVar14 + 0x138));
          unaff_EDI = 0x5622;
          if ((heap.u32((pbVar14 + 2)) & 0xc0) != 0) {
            sVar16 = heap.u32(pbVar14 + (0x15c) * 4) * 0x46;
            if (heap.u32(pbVar14 + (0x13c) * 4) != 7) {
              sVar16 = heap.u32(pbVar14 + (0x15c) * 4) * -0x46;
            }
            unaff_EDI = (sVar16 + 0x5622);
          }
          FUN_00453900(heap);
          heap.setU32((pbVar14 + 0x138), (uVar4) >>> 0);
          heap.setU32((pbVar14 + (0x10c) * 4), (bVar5) >>> 0);
        }
      }
      if (heap.u32(pbVar14) != 0x14) {
        uVar12 = 0;
        LAB_00449b12: uVar9 = heap.u32((pbVar14 + uVar12 * 2 + 0x2a));
        if (uVar9 != 0xffff) {
          bVar5 = 0;
          if (heap.u32(pbVar14 + (4) * 4) == 0xc) {
            if ((heap.u32(pbVar14 + (0x21) * 4) != 0) && ((heap.u32((pbVar14 + 2)) & 0x480) == 0)) {
              if ((heap.u32((pbVar14 + 2)) & 0x10) == 0) {
                iVar8 = -1;
                do {
                  iVar8 = iVar8 + 1;
                  if (heap.u32(pbVar14 + (0x78) * 4) <= iVar8) {
                    uVar9 = FUN_0044a2a8(heap);
                    heap.setU32((pbVar14 + 2), (heap.u32((pbVar14 + 2)) | 0x10) >>> 0);
                    heap.setU32((pbVar14 + (0xfd) * 4), (heap.u32(pbVar14 + (0xfd) * 4) | 0xc) >>> 0);
                    /* goto LAB_00449ce9 */ throw new Error("goto LAB_00449ce9 not supported");
                  }
                } while ((heap.u32((__addr_DAT_00743be4) + (heap.u32((pbVar14 + iVar8 * 2 + 0x5e)) * 0x100) * 4) == '\x02') || (heap.u32((__addr_DAT_00743be4) + (heap.u32((pbVar14 + iVar8 * 2 + 0x5e)) * 0x100) * 4) == '\x03'));
              } else {
                iVar8 = -1;
                bVar5 = 0;
                do {
                  iVar8 = iVar8 + 1;
                  if (heap.u32(pbVar14 + (0x78) * 4) <= iVar8) {
                    /* goto LAB_00449ce9 */ throw new Error("goto LAB_00449ce9 not supported");
                  }
                  iVar13 = heap.u32((pbVar14 + iVar8 * 2 + 0x5e)) * 0x100;
                } while ((heap.u32((__addr_DAT_00743be4) + (iVar13) * 4) == '\x02') || (heap.u32((__addr_DAT_00743c62) + (iVar13) * 4) < heap.u32(pbVar14 + (0x80) * 4)));
                heap.setU32((pbVar14 + 2), (heap.u32((pbVar14 + 2)) & 0xffef) >>> 0);
                if (heap.u32((__addr_DAT_00743c47) + (iVar13) * 4) != '\0') {
                  heap.setU32((pbVar14 + 0x134), (heap.u32((__addr_DAT_00743b9e) + (heap.u32((__addr_DAT_00743be6 + iVar13)) * 0x80) * 4)) >>> 0);
                  heap.setU32((pbVar14 + (0xfd) * 4), (heap.u32(pbVar14 + (0xfd) * 4) | 0xc) >>> 0);
                }
              }
            }
          } else {
            if (heap.u32(pbVar14 + (4) * 4) == 0xd) {
            if ((heap.u32(pbVar14 + (0x21) * 4) != 0) && ((heap.u32((pbVar14 + 2)) & 0x480) == 0)) {
              if ((heap.u32((pbVar14 + 2)) & 0x10) == 0) {
                iVar8 = -1;
                do {
                  iVar8 = iVar8 + 1;
                  if (heap.u32(pbVar14 + (0x78) * 4) <= iVar8) {
                    heap.setU32((pbVar14 + 2), (heap.u32((pbVar14 + 2)) | 0x10) >>> 0);
                    heap.setU32((pbVar14 + (0xfd) * 4), (heap.u32(pbVar14 + (0xfd) * 4) | 0xc) >>> 0);
                    bVar5 = 1;
                    break;
                  }
                } while (heap.u32((__addr_DAT_00743be4) + (heap.u32((pbVar14 + iVar8 * 2 + 0x5e)) * 0x100) * 4) == '\x02');
              } else {
                iVar8 = -1;
                do {
                  iVar8 = iVar8 + 1;
                  if (heap.u32(pbVar14 + (0x78) * 4) <= iVar8) {
                    bVar5 = 1;
                    /* goto LAB_00449ceb */ throw new Error("goto LAB_00449ceb not supported");
                  }
                  bVar11 = ((heap.u32(pbVar14 + (0x80) * 4) * 0x20) >>> 8);
                } while ((heap.u32((__addr_DAT_00743c62) + (heap.u32((pbVar14 + iVar8 * 2 + 0x5e)) * 0x100) * 4) < bVar11) || ((bVar5 = (heap.u32(pbVar14 + (0x80) * 4) * 0x20), heap.u32((__addr_DAT_00743c62) + (heap.u32((pbVar14 + iVar8 * 2 + 0x5e)) * 0x100) * 4) <= bVar11 && (heap.u32((__addr_DAT_00743be5) + (heap.u32((pbVar14 + iVar8 * 2 + 0x5e)) * 0x100) * 4) < bVar5))));
                heap.setU32((pbVar14 + 2), (heap.u32((pbVar14 + 2)) & 0xffef) >>> 0);
              }
            }
          } else {
            if (((heap.u32((pbVar14 + 2)) & 0x480) == 0) && (heap.u32(pbVar14 + (0x21) * 4) != 0)) {
            uVar7 = CONCAT11(heap.u32(pbVar14 + (uVar12 + 0x3a) * 4), 1) & 0x7fff;
            bVar5 = uVar7;
            cVar10 = (uVar7 >>> 8);
            if (cVar10 != '\0') {
              if ((cVar10 != '\x7f') && ((heap.u32(0x0088741c) & 0x1f) == 0)) {
                heap.setU32((pbVar14 + (uVar12 + 0x3a) * 4), (heap.u32(pbVar14 + (uVar12 + 0x3a) * 4) - 1) >>> 0);
              }
              bVar5 = 0;
            }
          } else {
            bVar5 = 0;
            if (((heap.u32(pbVar14 + (uVar12 + 0x3a) * 4) & 0x7f) != 0) && (((heap.u32(pbVar14 + (uVar12 + 0x3a) * 4) & 0x7f) != 0x7f && ((heap.u32(0x0088741c) & 0x1f) == 0)))) {
              heap.setU32((pbVar14 + (uVar12 + 0x3a) * 4), (heap.u32(pbVar14 + (uVar12 + 0x3a) * 4) - 1) >>> 0);
            }
          }
          }
          }
          /* goto LAB_00449ceb */ throw new Error("goto LAB_00449ceb not supported");
        }
        /* goto LAB_00449d6a */ throw new Error("goto LAB_00449d6a not supported");
      }
      LAB_00449d74: heap.setU32((pbVar14 + 0xd2), (heap.u32((pbVar14 + 0xd2)) + 1) >>> 0);
      if (0x3bf < heap.u32((pbVar14 + 0xd2))) {
        heap.setU32((pbVar14 + (0xd2) * 4), (0) >>> 0);
        heap.setU32((pbVar14 + (0xd3) * 4), (0) >>> 0);
        LOCK();
        pbVar15 = pbVar14 + 0xd0;
        heap.setU32((pbVar15 + (0) * 4), (0) >>> 0);
        heap.setU32((pbVar15 + (1) * 4), (0) >>> 0);
        UNLOCK();
        LOCK();
        uVar2 = heap.u32((pbVar14 + 0xd4));
        heap.setU32((pbVar14 + 0xd4), (heap.u32(pbVar15)) >>> 0);
        UNLOCK();
        LOCK();
        uVar3 = heap.u32((pbVar14 + 0xd6));
        heap.setU32((pbVar14 + 0xd6), (uVar2) >>> 0);
        UNLOCK();
        LOCK();
        uVar2 = heap.u32((pbVar14 + 0xd8));
        heap.setU32((pbVar14 + 0xd8), (uVar3) >>> 0);
        UNLOCK();
        LOCK();
        uVar3 = heap.u32((pbVar14 + 0xda));
        heap.setU32((pbVar14 + 0xda), (uVar2) >>> 0);
        UNLOCK();
        LOCK();
        uVar2 = heap.u32((pbVar14 + 0xdc));
        heap.setU32((pbVar14 + 0xdc), (uVar3) >>> 0);
        UNLOCK();
        LOCK();
        uVar3 = heap.u32((pbVar14 + 0xde));
        heap.setU32((pbVar14 + 0xde), (uVar2) >>> 0);
        UNLOCK();
        LOCK();
        uVar2 = heap.u32((pbVar14 + 0xe0));
        heap.setU32((pbVar14 + 0xe0), (uVar3) >>> 0);
        UNLOCK();
        LOCK();
        uVar3 = heap.u32((pbVar14 + 0xe2));
        heap.setU32((pbVar14 + 0xe2), (uVar2) >>> 0);
        UNLOCK();
        LOCK();
        uVar2 = heap.u32((pbVar14 + 0xe4));
        heap.setU32((pbVar14 + 0xe4), (uVar3) >>> 0);
        UNLOCK();
        heap.setU32((pbVar14 + 0xe6), (uVar2) >>> 0);
        heap.setU32((pbVar14 + (0xfd) * 4), (heap.u32(pbVar14 + (0xfd) * 4) | 1) >>> 0);
        uVar12 = heap.u32((pbVar14 + 0xe8));
        if (heap.u32((__addr_DAT_005f5e88) + (heap.u32(pbVar14) * 4) * 4) != 0xff) {
          uVar12 = uVar12 - heap.u32((__addr_DAT_0062d580 + heap.u32((__addr_DAT_005f5e88) + (heap.u32(pbVar14) * 4) * 4) * 8));
          if (heap.u32((__addr_DAT_005f5e89) + (heap.u32(pbVar14) * 4) * 4) != 0xff) {
            uVar12 = ((uVar12 + heap.u32((pbVar14 + 0x144))) - heap.u32((__addr_DAT_0062d580 + heap.u32((__addr_DAT_005f5e89) + (heap.u32(pbVar14) * 4) * 4) * 8))) >>> 1;
          }
        }
        heap.setU32((pbVar14 + 0x160), ((heap.u32((pbVar14 + 0xd4)) + heap.u32((pbVar14 + 0xd6)) + heap.u32((pbVar14 + 0xd8)) + heap.u32((pbVar14 + 0xda)) + heap.u32((pbVar14 + 0xdc)) + heap.u32((pbVar14 + 0xde)) + heap.u32((pbVar14 + 0xe0)) + heap.u32((pbVar14 + 0xe2)) + heap.u32((pbVar14 + 0xe4)) + heap.u32((pbVar14 + 0xe6))) * 0xc * uVar12) >>> 0);
        heap.setU32((pbVar14 + (0xfd) * 4), (heap.u32(pbVar14 + (0xfd) * 4) | 2) >>> 0);
        if (heap.u32((pbVar14 + 0x132)) != 0xffff) {
          heap.setU32((pbVar14 + 0x164), (heap.u32((pbVar14 + 0x132)) * -0x10 + heap.u32((pbVar14 + 0x160))) >>> 0);
        }
      }
      if ((((heap.u32(pbVar14) == 0x12) && ((heap.u32((pbVar14 + 2)) & 1) != 0)) && (((heap.u32((pbVar14 + 2)) & 0x4c0) == 0 || (heap.u32(pbVar14 + (0x13c) * 4) != 0)))) && (uVar9 = heap.u32((pbVar14 + 0xf8)), uVar7 = uVar9 + heap.u32(pbVar14 + (0x80) * 4) * 0x800, heap.setU32((pbVar14 + 0xf8), (uVar7) >>> 0), uVar9 >>> 0xe != uVar7 >>> 0xe)) {
        FUN_005e59ec(heap);
        unaff_EDI = (heap.u32(pbVar14 + (0xef) * 4) << 2);
        FUN_005e59ec(heap);
      }
      if ((((heap.u32(0x0088741c) & 3) == 0) && (heap.u32(pbVar14) == 0x15)) && (heap.u32(pbVar14 + (0x10d) * 4) != 0)) {
        heap.setU32((pbVar14 + (0x126) * 4), (heap.u32(pbVar14 + (0x126) * 4) + 1) >>> 0);
        if (0x2f < heap.u32(pbVar14 + (0x126) * 4)) {
          heap.setU32((pbVar14 + (0x10d) * 4), (heap.u32(pbVar14 + (0x10d) * 4) - 1) >>> 0);
          unaff_EDI = __addr_DAT_00743b94 + heap.u32((pbVar14 + 0x10e)) * 0x100;
          heap.setU32((__addr_DAT_00743bc6 + heap.u32((pbVar14 + 0x10e)) * 0x100), (heap.u32((__addr_DAT_00743bc6 + heap.u32((pbVar14 + 0x10e)) * 0x100)) + 1) >>> 0);
        }
        uVar12 = 0;
        do {
          uVar9 = heap.u32((pbVar14 + uVar12 * 2 + 0x2a));
          if (uVar9 != 0xffff) {
            for (pbVar15 = heap.u32((__addr_DAT_00971ef4) + ((((uVar9 >>> 8) << 0xc | (uVar9 & 0xff) << 5) >>> 5 | (((uVar9 >>> 8) << 5) >>> 9) << 0xb)) * 4); ((heap.u32(pbVar15) & 0x3c) != 8 || (heap.u32(pbVar14 + (uVar12 + 0x32) * 4) != heap.u32(pbVar15 + (2) * 4))); pbVar15 = pbVar15 + 8) {
            
            }
            unaff_EDI = ((heap.u32(pbVar15) & 3) << 2 | heap.u32(0x00991f88));
            FUN_005e585a(heap, pbVar15);
          }
          uVar12 = uVar12 + 1;
        } while (uVar12 < 4);
      }
      if ((heap.u32(0x0088741c) & 0xff) == 0) {
        if ((heap.u32((pbVar14 + 2)) & 0x480) != 0) {
          heap.setU32((pbVar14 + (0x14c) * 4), (heap.u32(pbVar14 + (0x14c) * 4) + 1) >>> 0);
        }
        if ((heap.u32(0x0088741c) & 0x1fff) == 0) {
          bVar5 = heap.u32(pbVar14 + (0x14c) * 4) + heap.u32(pbVar14 + (0x14d) * 4) + heap.u32(pbVar14 + (0x14e) * 4) + heap.u32(pbVar14 + (0x14f) * 4) + heap.u32(pbVar14 + (0x150) * 4) + heap.u32(pbVar14 + (0x151) * 4) + heap.u32(pbVar14 + (0x152) * 4);
          bVar5 = (CONCAT11(CARRY1(bVar5, heap.u32(pbVar14 + (0x153) * 4)), bVar5 + heap.u32(pbVar14 + (0x153) * 4)) >>> 1);
          if (100 < bVar5) {
            bVar5 = 100;
          }
          heap.setU32((pbVar14 + (0x149) * 4), (bVar5) >>> 0);
          LOCK();
          bVar5 = heap.u32(pbVar14 + (0x14c) * 4);
          heap.setU32((pbVar14 + (0x14c) * 4), (0) >>> 0);
          UNLOCK();
          LOCK();
          bVar11 = heap.u32(pbVar14 + (0x14d) * 4);
          heap.setU32((pbVar14 + (0x14d) * 4), (bVar5) >>> 0);
          UNLOCK();
          LOCK();
          bVar5 = heap.u32(pbVar14 + (0x14e) * 4);
          heap.setU32((pbVar14 + (0x14e) * 4), (bVar11) >>> 0);
          UNLOCK();
          LOCK();
          bVar11 = heap.u32(pbVar14 + (0x14f) * 4);
          heap.setU32((pbVar14 + (0x14f) * 4), (bVar5) >>> 0);
          UNLOCK();
          LOCK();
          bVar5 = heap.u32(pbVar14 + (0x150) * 4);
          heap.setU32((pbVar14 + (0x150) * 4), (bVar11) >>> 0);
          UNLOCK();
          LOCK();
          bVar11 = heap.u32(pbVar14 + (0x151) * 4);
          heap.setU32((pbVar14 + (0x151) * 4), (bVar5) >>> 0);
          UNLOCK();
          LOCK();
          bVar5 = heap.u32(pbVar14 + (0x152) * 4);
          heap.setU32((pbVar14 + (0x152) * 4), (bVar11) >>> 0);
          UNLOCK();
          heap.setU32((pbVar14 + (0x153) * 4), (bVar5) >>> 0);
          heap.setU32((pbVar14 + (0xfd) * 4), (heap.u32(pbVar14 + (0xfd) * 4) | 0x10) >>> 0);
        }
        if (((heap.u32((pbVar14 + 2)) & 0x4c0) == 0) && (heap.u32(pbVar14 + (0x21) * 4) != 0)) {
          bVar5 = heap.u32(pbVar14 + (0x148) * 4);
          uVar7 = (heap.u32(0x006e3b80) - heap.u32((pbVar14 + 0x130))) >>> 3;
          uVar9 = 0;
          if (((uVar7 != 0) && (((uVar9 = (bVar5 >>> 3), uVar7 != 1 && (uVar9 = (bVar5 >>> 2), uVar7 != 2)) && (uVar9 = (bVar5 >>> 1), 4 < uVar7)))) && (uVar9 = bVar5, 7 < uVar7)) {
            uVar9 = bVar5 << 1;
          }
          pbVar15 = pbVar14 + 0x146;
          heap.setU32(pbVar15, (heap.u32(pbVar15) - (bVar5 + uVar9)) >>> 0);
          if (heap.u32(pbVar15) < 0) {
            heap.setU32((pbVar14 + (0x146) * 4), (0) >>> 0);
            heap.setU32((pbVar14 + (0x147) * 4), (0) >>> 0);
          }
          heap.setU32((pbVar14 + (0xfd) * 4), (heap.u32(pbVar14 + (0xfd) * 4) | 0x10) >>> 0);
          uVar9 = heap.u32((pbVar14 + 0x146));
          uVar12 = FUN_005df40c(heap);
          if (((uVar12 & 0xfffff) <= 0x6500 - uVar9) && (FUN_004516de(heap), 0x6500 - uVar9 != 0xffffffff)) {
            FUN_0045174b(heap);
          }
        }
      }
      if (((heap.u32((pbVar14 + 2)) & 0x1c0) != 0) && ((heap.u32(0x0088741c) >>> 1 & 0xff) == uVar6)) {
        FUN_004519c9(heap);
      }
      if ((heap.u32(0x0088741c) & 0x7ff) == 0) {
        pbVar15 = pbVar14 + 0x14b;
        heap.setU32(pbVar15, (heap.u32(pbVar15) + 1) >>> 0);
        if (heap.u32(pbVar15) == 0) {
          heap.setU32((pbVar14 + (0x14b) * 4), (heap.u32(pbVar14 + (0x14b) * 4) - 1) >>> 0);
        }
        if ((((heap.u32((__addr_DAT_00631c74) + (heap.u32(pbVar14 + (0x14a) * 4)) * 4) != 0) && (heap.u32((__addr_DAT_005f5658 + heap.u32(pbVar14) * 4)) != 0)) && (heap.u32((__addr_DAT_00631c74) + (heap.u32(pbVar14 + (0x14a) * 4)) * 4) <= heap.u32(pbVar14 + (0x14b) * 4))) && ((heap.u32((pbVar14 + 2)) & 0x5c0) == 0)) {
          heap.setU32((pbVar14 + 2), (heap.u32((pbVar14 + 2)) | 0x100) >>> 0);
          heap.setU32((pbVar14 + (0x13d) * 4), (1) >>> 0);
          uVar12 = 0;
          do {
            heap.setU32((pbVar14 + (0x140) * 4), (uVar12) >>> 0);
            if (heap.u32((pbVar14 + uVar12 * 2 + 0x4a)) != -1) {
              /* goto LAB_0044a22e */ throw new Error("goto LAB_0044a22e not supported");
            }
            uVar12 = uVar12 + 1;
          } while (uVar12 < 4);
          heap.setU32((pbVar14 + (0x140) * 4), (0) >>> 0);
        }
      }
    }
    LAB_0044a22e: pbVar14 = pbVar14 + 0x260;
    uVar6 = uVar6 + 1;
    if (0xfe < uVar6) {
      FUN_00453bf8(heap);
      return;
    }
  } while (true);
  LAB_00449ce9: bVar5 = 1;
  LAB_00449ceb: if (bVar5 == 0) {
    puVar1 = (pbVar14 + uVar12 + 0x3a);
    uVar7 = heap.u32(puVar1);
    heap.setU32(puVar1, (heap.u32(puVar1) & 0xff7f) >>> 0);
    if ((uVar7 >>> 7 & 1) == 0) {
      /* goto LAB_00449d6a */ throw new Error("goto LAB_00449d6a not supported");
    }
  } else {
    puVar1 = (pbVar14 + uVar12 + 0x3a);
    uVar7 = heap.u32(puVar1);
    heap.setU32(puVar1, (heap.u32(puVar1) | 0x80) >>> 0);
    if ((uVar7 >>> 7 & 1) != 0) {
      /* goto LAB_00449d6a */ throw new Error("goto LAB_00449d6a not supported");
    }
  }
  for (pbVar15 = heap.u32((__addr_DAT_00971ef4) + ((((uVar9 >>> 8) << 0xc | (uVar9 & 0xff) << 5) >>> 5 | (((uVar9 >>> 8) << 5) >>> 9) << 0xb)) * 4); ((heap.u32(pbVar15) & 0x3c) != 8 || (heap.u32(pbVar14 + (uVar12 + 0x32) * 4) != heap.u32(pbVar15 + (2) * 4))); pbVar15 = pbVar15 + 8) {
  
  }
  heap.setU32((pbVar15 + (5) * 4), (heap.u32(pbVar15 + (5) * 4) & 0x7f) >>> 0);
  if (bVar5 != 0) {
    heap.setU32((pbVar15 + (5) * 4), (heap.u32(pbVar15 + (5) * 4) | 0x80) >>> 0);
  }
  FUN_005e59ec(heap, pbVar15, unaff_EDI);
  LAB_00449d6a: uVar12 = uVar12 + 1;
  if (3 < uVar12) {
    /* goto LAB_00449d74 */ throw new Error("goto LAB_00449d74 not supported");
  }
  /* goto LAB_00449b12 */ throw new Error("goto LAB_00449b12 not supported");
} finally {
    heap.freeFrame(68);
  }
}
