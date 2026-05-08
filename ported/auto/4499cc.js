// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4499cc.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CARRY1, CONCAT11, LOCK, UNLOCK } from "../runtime/win32.js";
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
  let sVar16 = 0;
  FUN_0045389c(heap);
  pbVar14 = 0x00887420;
  uVar6 = 0;
  do {
    if (heap.u32(pbVar14) != 0xff) {
      if ((heap.u32((0x005f5b78 + (uint) * pbVar14 * 8)) & 0x80000) != 0) {
        if ((heap.u32(pbVar14 + (0x21) * 4) == 1) && ((heap.u32(pbVar14 + (0x76) * 4) & 0x20) != 0)) {
          if ((heap.u32((pbVar14 + 2)) & 0xc0) != 0) {
            if (heap.u32(pbVar14 + (0x13c) * 4) == 7) {
              if (((heap.u32(0x0088741c) & 7) == 0) && (heap.u32(pbVar14 + (0x15c) * 4) != 0xff)) {
                heap.u32(pbVar14 + (0x15c) * 4) = heap.u32(pbVar14 + (0x15c) * 4) + 1;
              }
            } else {
              if (heap.u32(pbVar14 + (0x15c) * 4) != 0xff) {
                heap.u32(pbVar14 + (0x15c) * 4) = heap.u32(pbVar14 + (0x15c) * 4) + 1;
              }
              if ((heap.u32(pbVar14 + (0x15c) * 4) == 0xff) && (heap.u32(pbVar14 + (0x13c) * 4) == 0)) {
                /* goto LAB_00449a8a */ throw new Error("goto LAB_00449a8a not supported");
              }
            }
          }
          if (heap.u32(pbVar14 + (0x10c) * 4) == 0xff) {
            pbVar15 = heap.u32((0x005f66c8 + (uint) * pbVar14 * 4));
            bVar5 = FUN_005df40c(heap);
            heap.u32(pbVar14 + (0x10c) * 4) = heap.u32(pbVar15 + (((ushort)(bVar5 * (ushort) * pbVar15) >>> 8) + 1) * 4);
            heap.u32(pbVar14 + (0x138) * 4) = 0;
            heap.u32(pbVar14 + (0x139) * 4) = 0;
            heap.u32(pbVar14 + (0x13a) * 4) = 0;
            heap.u32(pbVar14 + (0x13b) * 4) = 0;
          }
        } else {
          LAB_00449a8a: heap.u32(pbVar14 + (0x10c) * 4) = 0xff;
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
            unaff_EDI = (uint)(ushort)(sVar16 + 0x5622);
          }
          FUN_00453900(heap);
          heap.u32((pbVar14 + 0x138)) = uVar4;
          heap.u32(pbVar14 + (0x10c) * 4) = bVar5;
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
                    heap.u32((pbVar14 + 2)) = heap.u32((pbVar14 + 2)) | 0x10;
                    heap.u32(pbVar14 + (0xfd) * 4) = heap.u32(pbVar14 + (0xfd) * 4) | 0xc;
                    /* goto LAB_00449ce9 */ throw new Error("goto LAB_00449ce9 not supported");
                  }
                } while ((heap.u32((0x00743be4) + ((uint) * (pbVar14 + iVar8 * 2 + 0x5e) * 0x100) * 4) == '\x02') || (heap.u32((0x00743be4) + ((uint) * (pbVar14 + iVar8 * 2 + 0x5e) * 0x100) * 4) == '\x03'));
              } else {
                iVar8 = -1;
                bVar5 = 0;
                do {
                  iVar8 = iVar8 + 1;
                  if (heap.u32(pbVar14 + (0x78) * 4) <= iVar8) {
                    /* goto LAB_00449ce9 */ throw new Error("goto LAB_00449ce9 not supported");
                  }
                  iVar13 = (uint) * (pbVar14 + iVar8 * 2 + 0x5e) * 0x100;
                } while ((heap.u32((0x00743be4) + (iVar13) * 4) == '\x02') || (heap.u32((byte)(0x00743c62) + (iVar13) * 4) < heap.u32(pbVar14 + (0x80) * 4)));
                heap.u32((pbVar14 + 2)) = heap.u32((pbVar14 + 2)) & 0xffef;
                if (heap.u32((0x00743c47) + (iVar13) * 4) != '\0') {
                  heap.u32((pbVar14 + 0x134)) = heap.u32((0x00743b9e) + ((uint) * (0x00743be6 + iVar13) * 0x80) * 4);
                  heap.u32(pbVar14 + (0xfd) * 4) = heap.u32(pbVar14 + (0xfd) * 4) | 0xc;
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
                    heap.u32((pbVar14 + 2)) = heap.u32((pbVar14 + 2)) | 0x10;
                    heap.u32(pbVar14 + (0xfd) * 4) = heap.u32(pbVar14 + (0xfd) * 4) | 0xc;
                    bVar5 = 1;
                    break;
                  }
                } while (heap.u32((0x00743be4) + ((uint) * (pbVar14 + iVar8 * 2 + 0x5e) * 0x100) * 4) == '\x02');
              } else {
                iVar8 = -1;
                do {
                  iVar8 = iVar8 + 1;
                  if (heap.u32(pbVar14 + (0x78) * 4) <= iVar8) {
                    bVar5 = 1;
                    /* goto LAB_00449ceb */ throw new Error("goto LAB_00449ceb not supported");
                  }
                  bVar11 = (byte)((ushort)(heap.u32(pbVar14 + (0x80) * 4) * 0x20) >>> 8);
                } while ((heap.u32((byte)(0x00743c62) + ((uint) * (pbVar14 + iVar8 * 2 + 0x5e) * 0x100) * 4) < bVar11) || ((bVar5 = (byte)(heap.u32(pbVar14 + (0x80) * 4) * 0x20), heap.u32((byte)(0x00743c62) + ((uint) * (pbVar14 + iVar8 * 2 + 0x5e) * 0x100) * 4) <= bVar11 && (heap.u32((byte)(0x00743be5) + ((uint) * (pbVar14 + iVar8 * 2 + 0x5e) * 0x100) * 4) < bVar5))));
                heap.u32((pbVar14 + 2)) = heap.u32((pbVar14 + 2)) & 0xffef;
              }
            }
          } else {
            if (((heap.u32((pbVar14 + 2)) & 0x480) == 0) && (heap.u32(pbVar14 + (0x21) * 4) != 0)) {
            uVar7 = CONCAT11(heap, heap.u32(pbVar14 + (uVar12 + 0x3a) * 4), 1) & 0x7fff;
            bVar5 = uVar7;
            cVar10 = (uVar7 >>> 8);
            if (cVar10 != '\0') {
              if ((cVar10 != '\x7f') && ((heap.u32(0x0088741c) & 0x1f) == 0)) {
                heap.u32(pbVar14 + (uVar12 + 0x3a) * 4) = heap.u32(pbVar14 + (uVar12 + 0x3a) * 4) - 1;
              }
              bVar5 = 0;
            }
          } else {
            bVar5 = 0;
            if (((heap.u32(pbVar14 + (uVar12 + 0x3a) * 4) & 0x7f) != 0) && (((heap.u32(pbVar14 + (uVar12 + 0x3a) * 4) & 0x7f) != 0x7f && ((heap.u32(0x0088741c) & 0x1f) == 0)))) {
              heap.u32(pbVar14 + (uVar12 + 0x3a) * 4) = heap.u32(pbVar14 + (uVar12 + 0x3a) * 4) - 1;
            }
          }
          }
          }
          /* goto LAB_00449ceb */ throw new Error("goto LAB_00449ceb not supported");
        }
        /* goto LAB_00449d6a */ throw new Error("goto LAB_00449d6a not supported");
      }
      LAB_00449d74: heap.u32((pbVar14 + 0xd2)) = heap.u32((pbVar14 + 0xd2)) + 1;
      if (0x3bf < heap.u32((pbVar14 + 0xd2))) {
        heap.u32(pbVar14 + (0xd2) * 4) = 0;
        heap.u32(pbVar14 + (0xd3) * 4) = 0;
        LOCK(heap);
        pbVar15 = pbVar14 + 0xd0;
        heap.u32(pbVar15 + (0) * 4) = 0;
        heap.u32(pbVar15 + (1) * 4) = 0;
        UNLOCK(heap);
        LOCK(heap);
        uVar2 = heap.u32((pbVar14 + 0xd4));
        heap.u32((pbVar14 + 0xd4)) = heap.u32(pbVar15);
        UNLOCK(heap);
        LOCK(heap);
        uVar3 = heap.u32((pbVar14 + 0xd6));
        heap.u32((pbVar14 + 0xd6)) = uVar2;
        UNLOCK(heap);
        LOCK(heap);
        uVar2 = heap.u32((pbVar14 + 0xd8));
        heap.u32((pbVar14 + 0xd8)) = uVar3;
        UNLOCK(heap);
        LOCK(heap);
        uVar3 = heap.u32((pbVar14 + 0xda));
        heap.u32((pbVar14 + 0xda)) = uVar2;
        UNLOCK(heap);
        LOCK(heap);
        uVar2 = heap.u32((pbVar14 + 0xdc));
        heap.u32((pbVar14 + 0xdc)) = uVar3;
        UNLOCK(heap);
        LOCK(heap);
        uVar3 = heap.u32((pbVar14 + 0xde));
        heap.u32((pbVar14 + 0xde)) = uVar2;
        UNLOCK(heap);
        LOCK(heap);
        uVar2 = heap.u32((pbVar14 + 0xe0));
        heap.u32((pbVar14 + 0xe0)) = uVar3;
        UNLOCK(heap);
        LOCK(heap);
        uVar3 = heap.u32((pbVar14 + 0xe2));
        heap.u32((pbVar14 + 0xe2)) = uVar2;
        UNLOCK(heap);
        LOCK(heap);
        uVar2 = heap.u32((pbVar14 + 0xe4));
        heap.u32((pbVar14 + 0xe4)) = uVar3;
        UNLOCK(heap);
        heap.u32((pbVar14 + 0xe6)) = uVar2;
        heap.u32(pbVar14 + (0xfd) * 4) = heap.u32(pbVar14 + (0xfd) * 4) | 1;
        uVar12 = (uint) * (pbVar14 + 0xe8);
        if (heap.u32((0x005f5e88) + ((uint) * pbVar14 * 4) * 4) != 0xff) {
          uVar12 = uVar12 - heap.u32((0x0062d580 + heap.u32((uint)(byte)(0x005f5e88) + ((uint) * pbVar14 * 4) * 4) * 8));
          if (heap.u32((0x005f5e89) + ((uint) * pbVar14 * 4) * 4) != 0xff) {
            uVar12 = ((uVar12 + heap.u32((pbVar14 + 0x144))) - (uint) * (0x0062d580 + heap.u32((uint)(byte)(0x005f5e89) + ((uint) * pbVar14 * 4) * 4) * 8)) >>> 1;
          }
        }
        heap.u32((pbVar14 + 0x160)) = (uint)(ushort)(heap.u32((pbVar14 + 0xd4)) + heap.u32((pbVar14 + 0xd6)) + heap.u32((pbVar14 + 0xd8)) + heap.u32((pbVar14 + 0xda)) + heap.u32((pbVar14 + 0xdc)) + heap.u32((pbVar14 + 0xde)) + heap.u32((pbVar14 + 0xe0)) + heap.u32((pbVar14 + 0xe2)) + heap.u32((pbVar14 + 0xe4)) + heap.u32((pbVar14 + 0xe6))) * 0xc * uVar12;
        heap.u32(pbVar14 + (0xfd) * 4) = heap.u32(pbVar14 + (0xfd) * 4) | 2;
        if (heap.u32((pbVar14 + 0x132)) != 0xffff) {
          heap.u32((pbVar14 + 0x164)) = (uint) * (pbVar14 + 0x132) * -0x10 + heap.u32((pbVar14 + 0x160));
        }
      }
      if ((((heap.u32(pbVar14) == 0x12) && ((heap.u32((pbVar14 + 2)) & 1) != 0)) && (((heap.u32((pbVar14 + 2)) & 0x4c0) == 0 || (heap.u32(pbVar14 + (0x13c) * 4) != 0)))) && (uVar9 = heap.u32((pbVar14 + 0xf8)), uVar7 = uVar9 + heap.u32(pbVar14 + (0x80) * 4) * 0x800, heap.u32((pbVar14 + 0xf8)) = uVar7, uVar9 >>> 0xe != uVar7 >>> 0xe)) {
        FUN_005e59ec(heap);
        unaff_EDI = (heap.u32(pbVar14 + (0xef) * 4) << 2);
        FUN_005e59ec(heap);
      }
      if ((((heap.u32(0x0088741c) & 3) == 0) && (heap.u32(pbVar14) == 0x15)) && (heap.u32(pbVar14 + (0x10d) * 4) != 0)) {
        heap.u32(pbVar14 + (0x126) * 4) = heap.u32(pbVar14 + (0x126) * 4) + 1;
        if (0x2f < heap.u32(pbVar14 + (0x126) * 4)) {
          heap.u32(pbVar14 + (0x10d) * 4) = heap.u32(pbVar14 + (0x10d) * 4) - 1;
          unaff_EDI = 0x00743b94 + (uint) * (pbVar14 + 0x10e) * 0x100;
          heap.u32((0x00743bc6 + (uint) * (pbVar14 + 0x10e) * 0x100)) = heap.u32((0x00743bc6 + (uint) * (pbVar14 + 0x10e) * 0x100)) + 1;
        }
        uVar12 = 0;
        do {
          uVar9 = heap.u32((pbVar14 + uVar12 * 2 + 0x2a));
          if (uVar9 != 0xffff) {
            for (pbVar15 = heap.u32((0x00971ef4) + ((ushort)((ushort)((uVar9 >>> 8) << 0xc | (uVar9 & 0xff) << 5) >>> 5 | ((ushort)((uVar9 >>> 8) << 5) >>> 9) << 0xb)) * 4); ((heap.u32(pbVar15) & 0x3c) != 8 || (heap.u32(pbVar14 + (uVar12 + 0x32) * 4) != heap.u32(pbVar15 + (2) * 4))); pbVar15 = pbVar15 + 8) {
            
            }
            unaff_EDI = ((heap.u32(pbVar15) & 3) << 2 | heap.u32(0x00991f88));
            FUN_005e585a(heap, pbVar15);
          }
          uVar12 = uVar12 + 1;
        } while (uVar12 < 4);
      }
      if ((heap.u32(0x0088741c) & 0xff) == 0) {
        if ((heap.u32((pbVar14 + 2)) & 0x480) != 0) {
          heap.u32(pbVar14 + (0x14c) * 4) = heap.u32(pbVar14 + (0x14c) * 4) + 1;
        }
        if ((heap.u32(0x0088741c) & 0x1fff) == 0) {
          bVar5 = heap.u32(pbVar14 + (0x14c) * 4) + heap.u32(pbVar14 + (0x14d) * 4) + heap.u32(pbVar14 + (0x14e) * 4) + heap.u32(pbVar14 + (0x14f) * 4) + heap.u32(pbVar14 + (0x150) * 4) + heap.u32(pbVar14 + (0x151) * 4) + heap.u32(pbVar14 + (0x152) * 4);
          bVar5 = (byte)(CONCAT11(heap, CARRY1(heap, bVar5, heap.u32(pbVar14 + (0x153) * 4)), bVar5 + heap.u32(pbVar14 + (0x153) * 4)) >>> 1);
          if (100 < bVar5) {
            bVar5 = 100;
          }
          heap.u32(pbVar14 + (0x149) * 4) = bVar5;
          LOCK(heap);
          bVar5 = heap.u32(pbVar14 + (0x14c) * 4);
          heap.u32(pbVar14 + (0x14c) * 4) = 0;
          UNLOCK(heap);
          LOCK(heap);
          bVar11 = heap.u32(pbVar14 + (0x14d) * 4);
          heap.u32(pbVar14 + (0x14d) * 4) = bVar5;
          UNLOCK(heap);
          LOCK(heap);
          bVar5 = heap.u32(pbVar14 + (0x14e) * 4);
          heap.u32(pbVar14 + (0x14e) * 4) = bVar11;
          UNLOCK(heap);
          LOCK(heap);
          bVar11 = heap.u32(pbVar14 + (0x14f) * 4);
          heap.u32(pbVar14 + (0x14f) * 4) = bVar5;
          UNLOCK(heap);
          LOCK(heap);
          bVar5 = heap.u32(pbVar14 + (0x150) * 4);
          heap.u32(pbVar14 + (0x150) * 4) = bVar11;
          UNLOCK(heap);
          LOCK(heap);
          bVar11 = heap.u32(pbVar14 + (0x151) * 4);
          heap.u32(pbVar14 + (0x151) * 4) = bVar5;
          UNLOCK(heap);
          LOCK(heap);
          bVar5 = heap.u32(pbVar14 + (0x152) * 4);
          heap.u32(pbVar14 + (0x152) * 4) = bVar11;
          UNLOCK(heap);
          heap.u32(pbVar14 + (0x153) * 4) = bVar5;
          heap.u32(pbVar14 + (0xfd) * 4) = heap.u32(pbVar14 + (0xfd) * 4) | 0x10;
        }
        if (((heap.u32((pbVar14 + 2)) & 0x4c0) == 0) && (heap.u32(pbVar14 + (0x21) * 4) != 0)) {
          bVar5 = heap.u32(pbVar14 + (0x148) * 4);
          uVar7 = (ushort)(heap.u32(0x006e3b80) - heap.u32((pbVar14 + 0x130))) >>> 3;
          uVar9 = 0;
          if (((uVar7 != 0) && (((uVar9 = (ushort)(bVar5 >>> 3), uVar7 != 1 && (uVar9 = (ushort)(bVar5 >>> 2), uVar7 != 2)) && (uVar9 = (ushort)(bVar5 >>> 1), 4 < uVar7)))) && (uVar9 = bVar5, 7 < uVar7)) {
            uVar9 = bVar5 << 1;
          }
          pbVar15 = pbVar14 + 0x146;
          heap.u32(pbVar15) = heap.u32(pbVar15) - (bVar5 + uVar9);
          if (heap.u32(pbVar15) < 0) {
            heap.u32(pbVar14 + (0x146) * 4) = 0;
            heap.u32(pbVar14 + (0x147) * 4) = 0;
          }
          heap.u32(pbVar14 + (0xfd) * 4) = heap.u32(pbVar14 + (0xfd) * 4) | 0x10;
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
        heap.u32(pbVar15) = heap.u32(pbVar15) + 1;
        if (heap.u32(pbVar15) == 0) {
          heap.u32(pbVar14 + (0x14b) * 4) = heap.u32(pbVar14 + (0x14b) * 4) - 1;
        }
        if ((((heap.u32((0x00631c74) + (heap.u32(pbVar14 + (0x14a) * 4)) * 4) != 0) && (heap.u32((0x005f5658 + (uint) * pbVar14 * 4)) != 0)) && (heap.u32((byte)(0x00631c74) + (heap.u32(pbVar14 + (0x14a) * 4)) * 4) <= heap.u32(pbVar14 + (0x14b) * 4))) && ((heap.u32((pbVar14 + 2)) & 0x5c0) == 0)) {
          heap.u32((pbVar14 + 2)) = heap.u32((pbVar14 + 2)) | 0x100;
          heap.u32(pbVar14 + (0x13d) * 4) = 1;
          uVar12 = 0;
          do {
            heap.u32(pbVar14 + (0x140) * 4) = uVar12;
            if (heap.u32((pbVar14 + uVar12 * 2 + 0x4a)) != -1) {
              /* goto LAB_0044a22e */ throw new Error("goto LAB_0044a22e not supported");
            }
            uVar12 = uVar12 + 1;
          } while (uVar12 < 4);
          heap.u32(pbVar14 + (0x140) * 4) = 0;
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
    heap.u32(puVar1) = heap.u32(puVar1) & 0xff7f;
    if ((uVar7 >>> 7 & 1) == 0) {
      /* goto LAB_00449d6a */ throw new Error("goto LAB_00449d6a not supported");
    }
  } else {
    puVar1 = (pbVar14 + uVar12 + 0x3a);
    uVar7 = heap.u32(puVar1);
    heap.u32(puVar1) = heap.u32(puVar1) | 0x80;
    if ((uVar7 >>> 7 & 1) != 0) {
      /* goto LAB_00449d6a */ throw new Error("goto LAB_00449d6a not supported");
    }
  }
  for (pbVar15 = heap.u32((0x00971ef4) + ((ushort)((ushort)((uVar9 >>> 8) << 0xc | (uVar9 & 0xff) << 5) >>> 5 | ((ushort)((uVar9 >>> 8) << 5) >>> 9) << 0xb)) * 4); ((heap.u32(pbVar15) & 0x3c) != 8 || (heap.u32(pbVar14 + (uVar12 + 0x32) * 4) != heap.u32(pbVar15 + (2) * 4))); pbVar15 = pbVar15 + 8) {
  
  }
  heap.u32(pbVar15 + (5) * 4) = heap.u32(pbVar15 + (5) * 4) & 0x7f;
  if (bVar5 != 0) {
    heap.u32(pbVar15 + (5) * 4) = heap.u32(pbVar15 + (5) * 4) | 0x80;
  }
  FUN_005e59ec(heap, pbVar15, unaff_EDI);
  LAB_00449d6a: uVar12 = uVar12 + 1;
  if (3 < uVar12) {
    /* goto LAB_00449d74 */ throw new Error("goto LAB_00449d74 not supported");
  }
  /* goto LAB_00449b12 */ throw new Error("goto LAB_00449b12 not supported");
}
