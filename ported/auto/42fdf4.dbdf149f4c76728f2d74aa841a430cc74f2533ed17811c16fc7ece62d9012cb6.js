// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/42fdf4.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetNextWindow, FindNextFileA } from "../../runtime/win32.js";
import { CARRY4 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0040844b } from "./40844b.js";
import { FUN_00408490 } from "./408490.js";
import { FUN_0042f96d } from "./42f96d.js";
import { FUN_0042f98e } from "./42f98e.js";
import { FUN_0042fa5f } from "./42fa5f.js";
import { FUN_0042fd81 } from "./42fd81.js";
import { FUN_00430081 } from "./430081.js";
import { FUN_004300b7 } from "./4300b7.js";
import { FUN_004300ea } from "./4300ea.js";
import { FUN_00430113 } from "./430113.js";
import { FUN_004301a9 } from "./4301a9.js";
export function FUN_0042fdf4(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_stack0xfffffffc = __sp + 0;
  try {
  let cVar1 = 0;
  let sVar2 = 0;
  let uVar3 = 0;
  let iVar4 = 0;
  let pHVar5 = 0;
  let pHVar6 = 0;
  let pcVar7 = 0;
  let pcVar8 = 0;
  let uVar9 = 0;
  let puVar10 = 0;
  let pcVar11 = 0;
  let bVar12 = 0;
  let uVar13 = 0;
  LAB_0042ff6e: {
  LAB_0042ff47: {
  pcVar7 = ((0x005f8fb3) >>> 0);
  pcVar8 = ((0x0099aa88) >>> 0);
  do {
    pcVar11 = ((pcVar8) >>> 0);
    cVar1 = ((heap.i8(pcVar7)) & 0xff);
    heap.setU32(pcVar11, (cVar1) & 0xffffffff);
    pcVar7 = ((pcVar7 + 1) >>> 0);
    pcVar8 = ((pcVar11 + 1) >>> 0);
  } while (cVar1 != 42);
  pcVar8 = ((0x005f92e0) >>> 0);
  do {
    cVar1 = ((heap.i8(pcVar8)) & 0xff);
    heap.setU32(pcVar11, (cVar1) & 0xffffffff);
    pcVar8 = ((pcVar8 + 1) >>> 0);
    pcVar11 = ((pcVar11 + 1) >>> 0);
  } while (cVar1 != 0);
  iVar4 = (((regs.eax = FUN_004083b5(heap))) >>> 0);
  bVar12 = (((iVar4 | 0) != -1) & 0xff);
  if ((iVar4 | 0) != -1) {
    heap.setU8(0x005f8d35, (0) & 0xff);
    heap.setU32(0x005f88a4, (iVar4) >>> 0);
    (regs.eax = FUN_0042fa5f(heap));
    if (!bVar12) {
      (regs.eax = FUN_0042f96d(heap));
      (regs.eax = FUN_0042f98e(heap));
      (regs.eax = FUN_00408387(heap));
      uVar13 = ((0xfffffffb < __addr_stack0xfffffffc) & 0xff);
      (regs.eax = FUN_004301a9(heap));
      (regs.eax = FUN_004300ea(heap));
      if ((!uVar13) && (sVar2 = (((regs.eax = FUN_00430081(heap))) & 0xffff), sVar2 != heap.u8(0x0099fb6e))) {
        sVar2 = (((regs.eax = FUN_004300b7(heap))) & 0xffff);
        uVar3 = ((sVar2 - heap.u8(0x0099fb6e)) & 0xffff);
        if (((uVar3) << 16 >> 16) < 0) {
          uVar3 = ((-uVar3) & 0xffff);
        }
        if (0x78 < uVar3) {
          heap.setU8(0x0099fb6e, ((regs.eax = FUN_004300b7(heap))) & 0xff);
          heap.setU32(0x0099fb78, (0xffffffe0) >>> 0);
          break LAB_0042ff47;
        }
      }
      heap.setU8(0x0099fb6e, ((regs.eax = FUN_004300b7(heap))) & 0xff);
      uVar9 = ((0) >>> 0);
      iVar4 = ((0) >>> 0);
      pHVar5 = (((regs.eax = FUN_0040844b(heap, 0x005f8fb3, 0x005f92e7))) >>> 0);
      if (pHVar5 != 0xffffffff) {
        do {
          heap.setU32(0x005f9427, (pHVar5) >>> 0);
          bVar12 = ((CARRY4(uVar9, heap.u32(0x005f9307))) & 0xff);
          uVar9 = ((uVar9 + heap.u32(0x005f9307)) >>> 0);
          iVar4 = ((iVar4 + heap.u32(0x005f9303) + ((bVar12) >>> 0)) >>> 0);
          pHVar6 = ((GetNextWindow(heap, heap.u32(0x005f9427), 0x5f92e7)) >>> 0);
          pHVar5 = ((heap.u32(0x005f9427)) >>> 0);
        } while (pHVar6 == 0x1);
        (regs.eax = FUN_00408490(heap, heap.u32(0x005f9427)));
      }
      if ((uVar9 == heap.u8(0x0099fb70)) && (iVar4 == heap.u32(0x0099fb74))) {
        return;
      }
      break LAB_0042ff6e;
    }
    (regs.eax = FUN_00408387(heap));
    heap.setU8(0x0099fb6e, ((regs.eax = FUN_004300b7(heap))) & 0xff);
  }
  }
  uVar9 = ((0) >>> 0);
  do {
    heap.setU32(((0x0099e96c) + (uVar9) * 4), (0x80000000) & 0xffffffff);
    uVar9 = ((uVar9 + 1) >>> 0);
  } while (uVar9 < 0x80);
  puVar10 = ((0x0099eb6c) >>> 0);
  iVar4 = ((0x1000) >>> 0);
  do {
    heap.setU32(puVar10, (0) & 0xffffffff);
    puVar10 = ((puVar10 + 1) >>> 0);
    iVar4 = ((iVar4 + -1) >>> 0);
  } while (iVar4 != 0);
  }
  puVar10 = ((0x0099c16c) >>> 0);
  iVar4 = ((0x800) >>> 0);
  do {
    heap.setU32(puVar10, (0) & 0xffffffff);
    puVar10 = ((puVar10 + 1) >>> 0);
    iVar4 = ((iVar4 + -1) >>> 0);
  } while (iVar4 != 0);
  heap.setU8(0x0099fb70, (0) & 0xff);
  heap.setU32(0x0099fb74, (0) >>> 0);
  heap.setU8(0x0099fb6c, (0) & 0xff);
  // HAND-FIX (Task #17) — scenario-list enumeration. FOUR translator bugs kept
  // the scenario-select list empty; all four are corrected only when
  // `__realStartup` is set (see the gating note below):
  //   1. Ghidra dropped the &DAT_005f92e7 (WIN32_FIND_DATA buffer) argument at
  //      this FindFirstFileA call (0x42ff9a `push 0x5f92e7; push 0x5f8fb3`), so
  //      the found filename never landed at 0x5f9313 and the store loop copied
  //      an empty name.
  //   2. The loop's "get next file" is FindNextFileA — Ghidra mislabelled it
  //      GetNextWindow (rct.exe imports FindFirstFileA/FindNextFileA and does
  //      NOT import GetNextWindow at all), and our user32 GetNextWindow stub
  //      returns 0, so the loop always stopped after the FIRST file.
  //   3. `bVar12` (the loader's carry = "load failed") was hardcoded false, so
  //      a failed .SC4 still injected a stale [0x8dbed2]/[0x8dbe94] entry.
  //      FUN_0042fd81 now sets regs.cf explicitly; read it.
  //   4. The scenario id is a 16-bit read in the binary (`movzx ebx, word
  //      [0x8dbed2]`); the u32 read could pick up high-word garbage and index
  //      the name/id arrays out of bounds.
  //   5. FindClose was called without its handle argument.
  //
  // GATED behind an explicit opt-in (globalThis.__enumScenarios), NOT on by
  // default, for two independent reasons:
  //
  //  1. Gameplay baseline. FUN_0042fd81 (called per enumerated file below)
  //     RLE-decompresses each scenario into the WORLD buffer 0x6e3b80..0x8dc08c
  //     to read its name/id. The harness's legacy force-load path loads the
  //     gameplay park at runInit BEFORE the first tick runs this, so enumerating
  //     clobbers the loaded park mid-soak (observed: heap divergence + a runaway
  //     sim). The frozen sc21 gate (5b79d5b5) was captured with the broken-
  //     enumeration behaviour, so the default path keeps it byte-for-byte.
  //
  //  2. Title-screen fallout — RESOLVED (was: 1.4 BILLION heap ops/tick). While
  //     the .SC4 decompressor was under-filling the destination buffer, each
  //     enumerated park left GARBAGE in the world, which the title viewport then
  //     rendered and the sim scanned. With the decompressor fixed the buffer now
  //     ends up holding a complete, valid park, and title ticks cost the same
  //     with enumeration on as off (measured: 30 ticks in 91ms either way).
  //
  // So this is now ON for the real title path, and OFF only for the legacy
  // force-load path (reason 1). Verified: all 21 retail scenarios enumerate with
  // correct names and sequential ids — "Forest Frontiers"/0 ... "Thunder Rock"/20
  // — and the result is order-independent.
  const _enumFix = !!(globalThis.__realStartup || globalThis.__enumScenarios);
  pHVar5 = _enumFix
    ? (((regs.eax = FUN_0040844b(heap, 0x005f8fb3, 0x005f92e7))) >>> 0)
    : (((regs.eax = FUN_0040844b(heap, 0x005f8fb3))) >>> 0);
  if (pHVar5 != 0xffffffff) {
    do {
      heap.setU32(0x005f9427, (pHVar5) >>> 0);
      bVar12 = ((CARRY4(heap.u8(0x0099fb70), heap.u32(0x005f9307))) & 0xff);
      heap.setU8(0x0099fb70, (heap.u8(0x0099fb70) + heap.u32(0x005f9307)) & 0xff);
      heap.setU32(0x0099fb74, (heap.u32(0x0099fb74) + heap.u32(0x005f9303) + ((bVar12) >>> 0)) >>> 0);
      pcVar7 = ((0x005f8fb3) >>> 0);
      pcVar8 = ((0x0099aa88) >>> 0);
      do {
        pcVar11 = ((pcVar8) >>> 0);
        cVar1 = ((heap.i8(pcVar7)) & 0xff);
        heap.setU32(pcVar11, (cVar1) & 0xffffffff);
        pcVar7 = ((pcVar7 + 1) >>> 0);
        pcVar8 = ((pcVar11 + 1) >>> 0);
      } while (cVar1 != 42);
      pcVar8 = ((0x005f9313) >>> 0);
      do {
        cVar1 = ((heap.i8(pcVar8)) & 0xff);
        heap.setU32(pcVar11, (cVar1) & 0xffffffff);
        pcVar8 = ((pcVar8 + 1) >>> 0);
        pcVar11 = ((pcVar11 + 1) >>> 0);
        bVar12 = ((false) & 0xff);
      } while (cVar1 != 0);
      (regs.eax = FUN_0042fd81(heap));
      if (_enumFix) bVar12 = ((regs.cf) & 0xff);          // bug 3 (see above)
      const _scid = _enumFix ? heap.u16(0x008dbed2) : heap.u32(0x008dbed2);  // bug 4
      if ((!bVar12) && ((_scid < 0x28 || (99 < _scid)))) {
        uVar9 = ((_scid) >>> 0);
        pcVar7 = ((0x0099c96c + uVar9 * 0x40) >>> 0);
        pcVar8 = ((0x008dbe94) >>> 0);
        do {
          cVar1 = ((heap.i8(pcVar8)) & 0xff);
          heap.setU32(pcVar7, (cVar1) & 0xffffffff);
          pcVar8 = ((pcVar8 + 1) >>> 0);
          pcVar7 = ((pcVar7 + 1) >>> 0);
        } while (cVar1 != 0);
        pcVar7 = ((0x0099c16c + uVar9 * 0x10) >>> 0);
        pcVar8 = ((0x005f9313) >>> 0);
        do {
          cVar1 = ((heap.i8(pcVar8)) & 0xff);
          heap.setU32(pcVar7, (cVar1) & 0xffffffff);
          pcVar8 = ((pcVar8 + 1) >>> 0);
          pcVar7 = ((pcVar7 + 1) >>> 0);
        } while (cVar1 != 0);
        heap.setU8(0x0099fb6c, (heap.u8(0x0099fb6c) + 1) & 0xff);
      }
      pHVar6 = _enumFix                                   // bug 2 (see above)
        ? ((FindNextFileA(heap, heap.u32(0x005f9427), 0x5f92e7)) >>> 0)
        : ((GetNextWindow(heap, heap.u32(0x005f9427), 0x5f92e7)) >>> 0);
      pHVar5 = ((heap.u32(0x005f9427)) >>> 0);
    } while (pHVar6 == 0x1);
    (regs.eax = _enumFix                                  // bug 5 (see above)
      ? FUN_00408490(heap, heap.u32(0x005f9427))
      : FUN_00408490(heap));
  }
  return (regs.eax = FUN_00430113(heap));
} finally {
    heap.freeFrame(4);
  }
}
