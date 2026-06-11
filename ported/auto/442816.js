// @manual — do not regenerate.
// Source: binary 0x442816..0x442866 (capstone disasm); decompiled/c/442816.c
// is mistyped. Hand-port (2026-06-11) replacing the earlier partially-fixed
// translation, which still carried three corruptions (catalogued in
// PORTING-ROADMAP.md ADDENDUM 3):
//   - `dec byte [esi+0xc6]` lowered as heap.setU32 → smeared sign-extension
//     bytes over [esi+0xc7..0xc9] (CLAUDE.md bug class #1);
//   - dropped the `mov al,0x17; mov ah,[esi+0xc5]` staging before
//     FUN_00440fe3 (the thought got a stale id/arg);
//   - dropped the `mov bx,[esi+0xa]; mov ax,0xc97` staging before
//     FUN_005e5301 (the sound event got garbage ids) and the pushal/popal
//     framing around it.
//
// Semantics: heading-to-ride timer. [esi+0xc5] = target ride (0xff =
// none). At counter values 0x1e/0x3c queue the "heading to ride X"
// thought (440fe3, al=0x17 ah=ride) and knock happiness down 0x1e. When
// the counter hits 0, clear the target and fire sound event 0xc97.
//
// Register effects mirror the binary: 440fe3 exits with eax = staged ax
// zero-extended (its `and eax,0xffff` insert tail) and preserves the
// rest; the 5e5301 block is pushal/popal.
//
// Oracle: tools/_lockstep-statrio.mjs (whole-heap per-call compare vs
// the interpreter, interpreter result kept live).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00440fe3 } from "./440fe3.js";
import { FUN_005e5301 } from "./5e5301.js";

function saveRegs() {
  return { eax: regs.eax, ecx: regs.ecx, edx: regs.edx, ebx: regs.ebx,
           esi: regs.esi, edi: regs.edi, ebp: regs.ebp };
}
function restoreRegs(s) {
  regs.eax = s.eax; regs.ecx = s.ecx; regs.edx = s.edx; regs.ebx = s.ebx;
  regs.esi = s.esi; regs.edi = s.edi; regs.ebp = s.ebp;
}

export function FUN_00442816(heap) {
  const esi = regs.esi >>> 0;
  if (heap.u8(esi + 0xc5) === 0xff) return;
  const c6 = heap.u8(esi + 0xc6);
  if (c6 === 0x1e || c6 === 0x3c) {
    // mov al,0x17; mov ah,[esi+0xc5]; call 440fe3 — the hand-ported
    // 440fe3 leaves regs.eax = the displaced thought-queue dword and
    // preserves everything else, exactly like the binary.
    regs.eax = ((regs.eax & 0xffff0000) | (heap.u8(esi + 0xc5) << 8) | 0x17) >>> 0;
    FUN_00440fe3(heap);
    const v = heap.u8(esi + 0x3b);
    heap.setU8(esi + 0x3b, v < 0x1e ? 0 : v - 0x1e);
  }
  const nv = (heap.u8(esi + 0xc6) - 1) & 0xff;            // dec BYTE
  heap.setU8(esi + 0xc6, nv);
  if (nv !== 0) return;
  heap.setU8(esi + 0xc5, 0xff);
  {                                                       // pushal … 5e5301 … popal
    const s = saveRegs();
    regs.ebx = ((regs.ebx & 0xffff0000) | heap.u16(esi + 0xa)) >>> 0;
    regs.eax = ((regs.eax & 0xffff0000) | 0xc97) >>> 0;
    FUN_005e5301(heap);
    restoreRegs(s);
  }
}
