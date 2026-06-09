// @manual — do not regenerate.
// HAND-PORT (Phase Track-C pick-blit): the translator emitted a hard parse-failure
// stub (`throw "function not translated"`) for FUN_009b38bc. This is the RLE-format
// 1x1 pick-blit leaf reached from FUN_009b35fa (the surface/zoom-0 path) — it walks
// the run-length-encoded row at the pick column and sets the hit flag DAT_0099c164=1
// iff the 1x1 pick X lands inside any run. Without it the BROWSER cursor-pick never
// registers a pixel hit and resolves 0 tiles.
//
// Ported directly from decompiled/c/9b38bc.c, cross-checked against the disassembly
// (0x9b38bc..0x9b39e3, painter seg VA->off = VA-0x408000):
//   movzx ebx,[0x9a2020]; movzx ebx,[esi+ebx*2]; add ebx,esi  => puVar5 = ESI + *(u16)(ESI+row*2)
//   loop: cx=*puVar5; [0x9aa032]=cl; cl&=0x7f (=count); dl=ch (=xstart); puVar5+=count+2;
//         edx = xstart - [0x9a2024] (pick X);  jle/js/je/jle clip math -> HIT sets [0x99c164]=1
// All THREE bodies (gate 0x20000000 / 0x40000000 / fall-through) are byte-identical
// run-scan logic differing only in return value (0 vs in_EAX), which the pick ignores
// (it reads only the DAT_0099c164 side-effect). Implemented as one shared scan.
//
// 16-bit signed semantics preserved exactly: uVar2 (count) and iVar4 (xstart-pickX)
// are compared as signed shorts; the HIT-test `sVar3<2 || (short)(sVar3-1) < uVar2`
// is the run-overlaps-the-1px-column check.
//
// Source: decompiled/c/9b38bc.c

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";

// 16-bit sign-extend helper
function s16(x) { return ((x & 0xffff) << 16) >> 16; }

export function FUN_009b38bc(heap) {
  const in_EAX = regs.eax >>> 0;
  const unaff_ESI = regs.esi >>> 0;

  // The three C branches (DAT_009a2000 & 0x20000000 / & 0x40000000 / else) all run
  // the identical run-scan over the same row; they differ only in the returned value
  // (0 for the two flag branches, in_EAX for the fall-through). The pick reads only
  // the DAT_0099c164 side-effect, so a single shared scan is byte-faithful.
  const flags = heap.u32(0x009a2000) >>> 0;
  const retVal = ((flags & 0x20000000) !== 0 || (flags & 0x40000000) !== 0) ? 0 : in_EAX;

  // puVar5 = ESI + *(u16*)(ESI + DAT_009a2020*2)
  let puVar5 = (unaff_ESI + (heap.u16(unaff_ESI + (heap.u16(0x009a2020) >>> 0) * 2) >>> 0)) >>> 0;
  const pickX = heap.u32(0x009a2024) | 0; // signed compare below

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const uVar1 = heap.u16(puVar5) & 0xffff;     // run header word
    heap.setU8(0x009aa032, uVar1 & 0xff);         // DAT_009aa032 = (byte)uVar1
    let uVar2 = (uVar1 & 0x7f) & 0xffff;          // count = low byte & 0x7f
    puVar5 = (puVar5 + uVar2 + 2) >>> 0;          // advance past this run
    const xstart = (uVar1 >>> 8) & 0xffff;        // high byte = run start X
    let iVar4 = (xstart - pickX) | 0;             // signed (xstart - pickX)

    let hit = false;
    if (iVar4 === 0 || (xstart | 0) < pickX) {
      // iVar4 <= 0 path
      uVar2 = (uVar2 + s16(iVar4)) & 0xffff;
      if (s16(uVar2) >= 0 && uVar2 !== 0) {
        // iVar4 = 0; goto HIT-test
        const sVar3 = (0 + s16(uVar2)) & 0xffff;
        if (s16(sVar3) < 2 || s16(sVar3 - 1) < s16(uVar2)) hit = true;
      }
      // else: fall through to the last-run check (no HIT-test)
    } else {
      // iVar4 > 0 path -> HIT-test
      const sVar3 = (s16(iVar4) + s16(uVar2)) & 0xffff;
      if (s16(sVar3) < 2 || s16(sVar3 - 1) < s16(uVar2)) hit = true;
    }

    if (hit) {
      heap.setU8(0x0099c164, 1);
      regs.eax = retVal >>> 0;
      return retVal >>> 0;
    }

    if ((uVar1 & 0x80) !== 0) {
      regs.eax = retVal >>> 0;
      return retVal >>> 0;
    }
  }
}
