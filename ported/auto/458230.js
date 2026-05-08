// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/458230.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { CONCAT31 } from "../runtime/win32.js";
import { FUN_009b438b } from "./9b438b.js";
export function FUN_00458230(heap) {
  let cVar1 = 0;
  let bVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  let uVar5 = 0;
  let uVar6 = 0;
  let uVar7 = 0;
  let local_c = 0;
  let local_a = 0;
  let local_8 = 0;
  let local_6 = 0;
  let local_4 = 0;
  let local_2 = 0;
  pcVar9 = 0x0099a508;
  uVar6 = 0x5a1e;
  do {
    cVar1 = heap.u32((0x008dc0b8 + uVar6 * 0x10));
    uVar5 = uVar6;
    if ((0x5a78 < uVar5) && (uVar5 < 0x5a9d)) {
      cVar1 = '\0';
    }
    heap.u32(pcVar9) = cVar1;
    pcVar9 = pcVar9 + 1;
    uVar6 = (uint)(ushort)(uVar5 + 1);
  } while ((ushort)(uVar5 + 1) < 0x5afe);
  uVar6 = 0x5afe;
  do {
    cVar1 = heap.u32((0x008dc0b8 + uVar6 * 0x10));
    uVar5 = uVar6;
    if ((0x5b58 < uVar5) && (uVar5 < 0x5b7d)) {
      cVar1 = '\0';
    }
    heap.u32(pcVar9) = cVar1;
    pcVar9 = pcVar9 + 1;
    uVar6 = (uint)(ushort)(uVar5 + 1);
  } while ((ushort)(uVar5 + 1) < 0x5bde);
  uVar6 = 0x5bde;
  do {
    cVar1 = heap.u32((0x008dc0b8 + uVar6 * 0x10)) + '\x01';
    uVar5 = uVar6;
    if ((0x5c38 < uVar5) && (uVar5 < 0x5c5d)) {
      cVar1 = '\0';
    }
    heap.u32(pcVar9) = cVar1;
    pcVar9 = pcVar9 + 1;
    uVar6 = (uint)(ushort)(uVar5 + 1);
  } while ((ushort)(uVar5 + 1) < 0x5cbe);
  uVar6 = 0x5cbe;
  do {
    cVar1 = heap.u32((0x008dc0b8 + uVar6 * 0x10)) + '\x01';
    uVar5 = uVar6;
    if ((0x5d18 < uVar5) && (uVar5 < 0x5d3d)) {
      cVar1 = '\0';
    }
    heap.u32(pcVar9) = cVar1;
    pcVar9 = pcVar9 + 1;
    uVar6 = (uint)(ushort)(uVar5 + 1);
  } while ((ushort)(uVar5 + 1) < 0x5d9e);
  local_10 = local_50;
  local_c = 0;
  local_a = 0;
  local_8 = 8;
  local_6 = 8;
  local_4 = 0;
  local_2 = 0;
  uVar6 = 0;
  do {
    puVar8 = local_10;
    for (iVar4 = 0x10; iVar4 != 0; iVar4 = iVar4 + -1) {
      heap.u32(puVar8) = 0;
      puVar8 = puVar8 + 1;
    }
    FUN_009b438b(heap);
    uVar7 = 0;
    do {
      pcVar9 = (local_10 + uVar7);
      iVar4 = 8;
      uVar3 = 0;
      do {
        bVar2 = uVar3 + heap.u32(pcVar9);
        uVar3 = CONCAT31(heap, (int3)(uVar3 >>> 8), bVar2) >>> 1 | (uint)((bVar2 & 1) != 0) << 0x1f;
        pcVar9 = pcVar9 + 8;
        iVar4 = iVar4 + -1;
      } while (iVar4 != 0);
      heap.u32((0x006432d8) + (uVar6 * 8 + uVar7) * 4) = (uVar3 >>> 0x18);
      uVar7 = uVar7 + 1;
    } while (uVar7 < 8);
    uVar6 = uVar6 + 1;
  } while (uVar6 < 0xe0);
  puVar8 = 0x008dffb4;
  puVar10 = 0x006439ea;
  iVar4 = 0x10;
  do {
    heap.u32(puVar8) = puVar10;
    heap.u32((puVar8 + 1)) = 0x40;
    heap.u32((puVar8 + 6)) = 0x20;
    heap.u32(puVar10) = 0xffff;
    heap.u32((puVar10 + 7)) = 0;
    puVar8 = puVar8 + 4;
    puVar10 = puVar10 + 0x409;
    iVar4 = iVar4 + -1;
  } while (iVar4 != 0);
  return;
}
