// @manual — do not regenerate.
// Source: decompiled/c/42eae0.c
// Fix: Ghidra `(int3)X` is a 3-byte truncation cast; translator emitted
// `callIndirect(heap, int3, X)` — replaced with `(X & 0xffffff)`.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0040844b } from "./40844b.js";
import { FUN_00408490 } from "./408490.js";
import { FUN_00427108 } from "./427108.js";
import { FUN_0042edaa } from "./42edaa.js";
import { FUN_0042f4be } from "./42f4be.js";
import { FUN_0042fd81 } from "./42fd81.js";
import { FUN_0042fdf4 } from "./42fdf4.js";
import { FUN_00438a1f } from "./438a1f.js";
export function FUN_0042eae0(heap) {
  let pcVar1 = 0;
  let cVar2 = 0;
  let uVar3 = 0;
  let puVar4 = 0;
  let bVar5 = 0;
  let iVar6 = 0;
  let uVar7 = 0;
  let uVar8 = 0;
  let pbVar9 = 0;
  let pcVar10 = 0;
  let pbVar11 = 0;
  let pbVar12 = 0;
  let pcVar13 = 0;
  let puVar14 = 0;
  let pbVar15 = 0;
  let puVar16 = 0;
  let puVar17 = 0;
  let bVar18 = 0;
  pcVar10 = ((heap.u32(0x00628cb0)) >>> 0);
  if (heap.u32(0x00628cb0) == 0xffffffff) {
    if (((heap.u32(0x0099a500) & 1) != 0) && (heap.u8(0x005f8897) != 0)) {
      heap.setU8(0x005f8897, (0) & 0xff);
      (regs.eax = FUN_0042fdf4(heap));
      return (regs.eax = FUN_00438a1f(heap));
    }
    return;
  }
  heap.setU32(0x00628cb0, (0xffffffff) >>> 0);
  pcVar13 = ((0x005f841b) >>> 0);
  while (true) {
    if (heap.i8(pcVar10) == 0) {
      heap.setU32(0x00628cb0, (0xffffffff) >>> 0);
      return;
    }
    if (heap.i8(pcVar10) != 32) {
      break;
    }
    pcVar10 = ((pcVar10 + 1) >>> 0);
  }
  do {
    cVar2 = ((heap.i8(pcVar10)) & 0xff);
    heap.setU32(pcVar13, (cVar2) & 0xffffffff);
    pcVar10 = ((pcVar10 + 1) >>> 0);
    pcVar13 = ((pcVar13 + 1) >>> 0);
  } while (cVar2 != 0);
  iVar6 = (((regs.eax = FUN_0040844b(heap, 0x005f841b, 0x005f92e7))) >>> 0);
  if ((iVar6 | 0) != -1) {
    pcVar10 = ((0x005f841b) >>> 0);
    do {
      pcVar10 = ((pcVar10 + 1) >>> 0);
    } while (heap.i8(pcVar10) != 0);
    do {
      pcVar13 = ((pcVar10 + -1) >>> 0);
      if (pcVar13 == 0x005f841b) {
        break;
      }
      pcVar1 = ((pcVar10 + -2) >>> 0);
      pcVar10 = ((pcVar13) >>> 0);
    } while (heap.i8(pcVar1) != 92);
    pcVar10 = ((0x005f9313) >>> 0);
    do {
      cVar2 = ((heap.i8(pcVar10)) & 0xff);
      heap.setU32(pcVar13, (cVar2) & 0xffffffff);
      pcVar10 = ((pcVar10 + 1) >>> 0);
      pcVar13 = ((pcVar13 + 1) >>> 0);
    } while (cVar2 != 0);
    (regs.eax = FUN_00408490(heap, iVar6));
  }
  pbVar11 = ((0x005f841b) >>> 0);
  puVar16 = ((0x005f841b) >>> 0);
  do {
    puVar14 = (((((puVar16) | 0) + 1)) >>> 0);
    uVar8 = ((heap.u32(puVar16)) >>> 0);
    puVar16 = ((puVar14) >>> 0);
  } while (((uVar8) << 24 >> 24) != 0);
  do {
    puVar14 = (((((puVar14) | 0) + -1)) >>> 0);
    if (puVar14 < 0x005f841c) {
      return;
    }
  } while (heap.i8(puVar14) != 46);
  uVar8 = ((heap.u32(puVar14)) >>> 0);
  bVar5 = ((((uVar8) & 0xff)) & 0xff);
  if ((0x60 < bVar5) && (bVar5 < 0x7b)) {
    uVar8 = ((CONCAT31((uVar8 >>> 8) & 0xffffff, bVar5 - 0x20)) >>> 0);
  }
  uVar7 = ((uVar8 >>> 8 | uVar8 << 0x18) >>> 0);
  bVar5 = ((((uVar8 >>> 8) & 0xff)) & 0xff);
  if ((0x60 < bVar5) && (bVar5 < 0x7b)) {
    uVar7 = ((CONCAT31((uVar7 >>> 8) & 0xffffff, bVar5 - 0x20)) >>> 0);
  }
  uVar8 = ((uVar7 >>> 8 | uVar7 << 0x18) >>> 0);
  bVar5 = ((((uVar7 >>> 8) & 0xff)) & 0xff);
  if ((0x60 < bVar5) && (bVar5 < 0x7b)) {
    uVar8 = ((CONCAT31((uVar8 >>> 8) & 0xffffff, bVar5 - 0x20)) >>> 0);
  }
  uVar7 = ((uVar8 >>> 8 | uVar8 << 0x18) >>> 0);
  bVar5 = ((((uVar8 >>> 8) & 0xff)) & 0xff);
  if ((0x60 < bVar5) && (bVar5 < 0x7b)) {
    uVar7 = ((CONCAT31((uVar7 >>> 8) & 0xffffff, bVar5 - 0x20)) >>> 0);
  }
  uVar8 = ((uVar7 >>> 8 | uVar7 << 0x18) >>> 0);
  if (uVar8 == heap.u32(0x005f92db)) {
    heap.setU8(0x00628cb9, (0) & 0xff);
    pbVar12 = ((0x0099aa88) >>> 0);
    pbVar15 = ((0x005f91d9) >>> 0);
    do {
      bVar5 = ((heap.u8(pbVar11)) & 0xff);
      heap.setU32(pbVar12, (bVar5) & 0xffffffff);
      heap.setU32(pbVar15, (bVar5) & 0xffffffff);
      pbVar11 = ((pbVar11 + 1) >>> 0);
      pbVar12 = ((pbVar12 + 1) >>> 0);
      pbVar15 = ((pbVar15 + 1) >>> 0);
    } while (bVar5 != 0);
    (regs.eax = FUN_0042f4be(heap));
  } else {
    if (uVar8 == (((0x005f90b4) >>> 96) & 0xffffffff)) {
      heap.setU8(0x00628cb9, (0) & 0xff);
      pbVar15 = ((0x0099aa88) >>> 0);
      do {
        bVar5 = ((heap.u8(pbVar11)) & 0xff);
        heap.setU32(pbVar15, (bVar5) & 0xffffffff);
        pbVar11 = ((pbVar11 + 1) >>> 0);
        pbVar15 = ((pbVar15 + 1) >>> 0);
      } while (bVar5 != 0);
      do {
        pbVar15 = ((pbVar15 + -1) >>> 0);
        if (pbVar15 < 0x0099aa88) {
          (regs.eax = FUN_00438a1f(heap));
          return (regs.eax = FUN_00427108(heap));
        }
      } while (heap.u8(pbVar15) != 0x5c);
      pbVar12 = ((0x005f8fb3) >>> 0);
      pbVar11 = ((0x0099a888) >>> 0);
      do {
        pbVar9 = ((pbVar11) >>> 0);
        bVar5 = ((heap.u8(pbVar12)) & 0xff);
        heap.setU32(pbVar9, (bVar5) & 0xffffffff);
        pbVar12 = ((pbVar12 + 1) >>> 0);
        pbVar11 = ((pbVar9 + 1) >>> 0);
      } while (bVar5 != 0x2a);
      do {
        pbVar15 = ((pbVar15 + 1) >>> 0);
        bVar5 = ((heap.u8(pbVar15)) & 0xff);
        heap.setU32(pbVar9, (bVar5) & 0xffffffff);
        pbVar9 = ((pbVar9 + 1) >>> 0);
        bVar18 = ((false) & 0xff);
      } while (bVar5 != 0);
      (regs.eax = FUN_0042fd81(heap));
      if (bVar18) {
        return (regs.eax = FUN_00438a1f(heap));
      }
      (regs.eax = FUN_0042edaa(heap));
      if (!bVar18) {
        (regs.eax = FUN_0042fdf4(heap));
        (regs.eax = FUN_00438a1f(heap));
        return (regs.eax = FUN_00427108(heap));
      }
      LAB_0042ec7e: (regs.eax = FUN_00438a1f(heap));
      return (regs.eax = FUN_00427108(heap));
    }
    if ((uVar8 == (((0x005f91c6) >>> 72) & 0xffffffff)) || (uVar8 == heap.u32(0x005f91d4))) {
      heap.setU8(0x00628cb9, (0) & 0xff);
      pbVar15 = ((0x0099aa88) >>> 0);
      do {
        bVar5 = ((heap.u8(pbVar11)) & 0xff);
        heap.setU32(pbVar15, (bVar5) & 0xffffffff);
        pbVar11 = ((pbVar11 + 1) >>> 0);
        pbVar15 = ((pbVar15 + 1) >>> 0);
      } while (bVar5 != 0);
      do {
        pbVar11 = ((pbVar15) >>> 0);
        pbVar15 = ((pbVar11 + -1) >>> 0);
        if (pbVar15 < 0x0099aa88) {
          return (regs.eax = FUN_00427108(heap));
        }
      } while (heap.u8(pbVar15) != 0x5c);
      pbVar12 = ((0x005f90c5) >>> 0);
      pbVar15 = ((0x0099a888) >>> 0);
      do {
        bVar5 = ((heap.u8(pbVar12)) & 0xff);
        heap.setU32(pbVar15, (bVar5) & 0xffffffff);
        pbVar12 = ((pbVar12 + 1) >>> 0);
        pbVar9 = ((pbVar15) >>> 0);
        pbVar15 = ((pbVar15 + 1) >>> 0);
      } while (bVar5 != 0x2a);
      do {
        pbVar12 = ((pbVar11) >>> 0);
        pbVar15 = ((pbVar9) >>> 0);
        bVar5 = ((heap.u8(pbVar12)) & 0xff);
        heap.setU32(pbVar15, (bVar5) & 0xffffffff);
        uVar3 = (((((0x005f91c6) >>> 72) & 0xffffffff)) >>> 0);
        bVar18 = ((bVar5 < 0x2e) & 0xff);
        if (bVar5 == 0x2e) {
          break;
        }
        bVar18 = ((false) & 0xff);
        pbVar9 = ((pbVar15 + 1) >>> 0);
        pbVar11 = ((pbVar12 + 1) >>> 0);
      } while (bVar5 != 0);
      heap.setU32(pbVar15, ((((0x005f91c6) >>> 72) & 0xffffffff)) & 0xffffffff);
      heap.setU32(pbVar12, (uVar3) & 0xffffffff);
      heap.setU8((pbVar15 + (4)), (0) & 0xff);
      heap.setU8((pbVar12 + (4)), (0) & 0xff);
      (regs.eax = FUN_0042edaa(heap));
      if (bVar18) {
        LAB_0042ed71: return (regs.eax = FUN_00427108(heap));
      }
      puVar16 = ((0x0099aa88) >>> 0);
      do {
        uVar8 = ((heap.u32(puVar16)) >>> 0);
        puVar14 = (((((puVar16) | 0) + 1)) >>> 0);
        puVar16 = (((((puVar16) | 0) + 1)) >>> 0);
      } while (((uVar8) << 24 >> 24) != 0);
      do {
        puVar16 = ((puVar14) >>> 0);
        puVar14 = (((((puVar16) | 0) + -1)) >>> 0);
        if (puVar14 < 0x0099aa88) {
          /* goto LAB_0042ed71 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_0042eae0/LAB_0042ed71"); return 0;
        }
      } while (heap.i8(puVar14) != 92);
      pcVar10 = ((0x005f90c5) >>> 0);
      puVar14 = ((0x0099a888) >>> 0);
      do {
        cVar2 = ((heap.i8(pcVar10)) & 0xff);
        heap.setI8(puVar14, (cVar2) & 0xff);
        pcVar10 = ((pcVar10 + 1) >>> 0);
        puVar4 = ((puVar14) >>> 0);
        puVar14 = (((((puVar14) | 0) + 1)) >>> 0);
      } while (cVar2 != 42);
      do {
        puVar17 = ((puVar16) >>> 0);
        puVar14 = ((puVar4) >>> 0);
        cVar2 = ((((heap.u32(puVar17)) << 24 >> 24)) & 0xff);
        heap.setI8(puVar14, (cVar2) & 0xff);
        uVar8 = ((heap.u32(0x005f91d4)) >>> 0);
        if (cVar2 == 46) {
          break;
        }
        puVar4 = (((((puVar14) | 0) + 1)) >>> 0);
        puVar16 = (((((puVar17) | 0) + 1)) >>> 0);
      } while (cVar2 != 0);
      heap.setU32(puVar14, (heap.u32(0x005f91d4)) & 0xffffffff);
      heap.setU32(puVar17, (uVar8) & 0xffffffff);
      heap.setI8((puVar14 + ((1) * 4)), (0) & 0xff);
      heap.setI8((puVar17 + ((1) * 4)), (0) & 0xff);
      (regs.eax = FUN_0042edaa(heap));
      return (regs.eax = FUN_00427108(heap));
    }
  }
  return;
}
