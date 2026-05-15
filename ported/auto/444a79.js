// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/444a79.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

// HAND-FIX (Phase M, stride bug): the translator emitted setU32 for several
// stores that the binary actually performs at 16-bit or 8-bit widths
// (0x66 0x89 prefix = WORD mov, plain c6 = BYTE mov). Most impactful is
// line `heap.setU32(0x0087c394, uVar2)` at the top of the free-list build:
// the binary writes `mov WORD [0x0087c394], cx` which only touches 2 bytes.
// The 5 neighbouring list-head WORDs at 0x0087c396..0x0087c39e were
// pre-seeded to 0xffff (empty-list sentinels) by the loop above. setU32
// clobbers 0x0087c396 to 0, making sprite-category-1's list head point at
// sprite 0 instead of "empty", which corrupts every subsequent sprite
// allocation. Binary disassembly proof at 0x444acd:
//   66 89 0d 94 c3 87 00     mov WORD [0x0087c394], cx
//   ...
//   66 c7 05 a0 c3 87 00     mov WORD [0x0087c3a0], 0x1388
// Other narrow stores fixed for fidelity:
//   - 0x00444a79 head:  `66 c7 05 c0 d1 8a 00 00 00` = WORD [0x008ad1c0], 0
//   - 0x004044ab9 loop: `c6 06 ff`                  = BYTE [esi], 0xff

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00444b4a } from "./444b4a.js";
export function FUN_00444a79(heap) {
  let puVar1 = 0;
  let uVar2 = 0;
  let iVar3 = 0;
  let uVar4 = 0;
  let puVar5 = 0;
  let puVar6 = 0;
  let puVar7 = 0;
  heap.setU16(0x008ad1c0, 0);
  puVar6 = ((0x00743b94) >>> 0);
  for (iVar3 = ((320000) >>> 0); iVar3 != 0; iVar3 = (((iVar3 + -1) >>> 0)) >>> 0) {
    heap.setU32(puVar6, (0) & 0xffffffff);
    puVar6 = ((puVar6 + ((1) * 4)) >>> 0);
  }
  uVar4 = ((0) >>> 0);
  do {
    heap.setU16((((0x0087c394) | 0) + uVar4), (0xffff) & 0xffff);
    heap.setU16((((0x0087c3a0) | 0) + uVar4), (0) & 0xffff);
    uVar4 = ((uVar4 + 2) >>> 0);
  } while (uVar4 < 0xc);
  uVar2 = ((0) & 0xffff);
  puVar1 = ((0x00743b94) >>> 0);
  puVar7 = ((0xffffffff) >>> 0);
  do {
    puVar5 = ((puVar1) >>> 0);
    heap.setU8(puVar5, 0xff);
    heap.setU16((puVar5 + 10), (uVar2) & 0xffff);
    heap.setU16((puVar5 + 4), (0xffff) & 0xffff);
    heap.setU8((puVar5 + (8)), (0) & 0xff);
    if (puVar7 == 0xffffffff) {
      heap.setU16((puVar5 + 6), (0xffff) & 0xffff);
      heap.setU16(0x0087c394, uVar2 & 0xffff);
    } else {
      heap.setU16((puVar5 + 6), (heap.u16((puVar7 + 10))) & 0xffff);
      heap.setU16((puVar7 + 4), (uVar2) & 0xffff);
    }
    uVar2 = ((uVar2 + 1) & 0xffff);
    puVar1 = ((puVar5 + 0x100) >>> 0);
    puVar7 = ((puVar5) >>> 0);
  } while (uVar2 < 5000);
  heap.setU16(0x0087c3a0, 5000);
  return (regs.eax = FUN_00444b4a(heap));
}
