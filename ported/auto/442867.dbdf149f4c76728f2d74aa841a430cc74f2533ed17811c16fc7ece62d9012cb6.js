// @manual — do not regenerate.
// Source: binary 0x442867..0x4428d5 (capstone disasm); decompiled/c/442867.c
// is mistyped. Hand-port (2026-06-11) replacing the earlier partially-fixed
// translation, which still carried four corruptions (catalogued in
// PORTING-ROADMAP.md ADDENDUM 3):
//   - `dec byte [esi+0xc6]` lowered as heap.setU32 → smeared sign-extension
//     bytes over [esi+0xc7..0xc9];
//   - dropped the al=0x1b/ah=0xff staging before FUN_00440fe3;
//   - the `[0x971e88] = dword [esi+0x9c]` tracked-peep staging write was
//     lowered as an assignment to the Ghidra artifact `unique0x00017200`
//     (a silent JS global — the heap write was LOST);
//   - dropped the al=2 / ecx=[esi+0xa] / bx=0x7ca staging before
//     FUN_0042c711, which was also called as raw translated JS instead of
//     the binary's pushal/popal framing (now interpreter-delegated via
//     callNative, like the other tracked-peep notification sites).
//
// Semantics: "lost" timer for tracked peeps ([esi+0xc8]&1). At counter
// values 1/0x1e/0x3c queue the "I'm lost" thought (440fe3, al=0x1b
// ah=0xff) and knock happiness down 0x1e. When the counter hits 0,
// rearm to 0x5a and emit tracked-peep notification 0x7ca (42c711) with
// the [0x971e86/88] staging block.
//
// Oracle: tools/_lockstep-statrio.mjs (whole-heap per-call compare vs
// the interpreter, interpreter result kept live).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callNative } from "../../runtime/painter-bridge.js";
import { FUN_00440fe3 } from "./440fe3.js";

function saveRegs() {
  return { eax: regs.eax, ecx: regs.ecx, edx: regs.edx, ebx: regs.ebx,
           esi: regs.esi, edi: regs.edi, ebp: regs.ebp };
}
function restoreRegs(s) {
  regs.eax = s.eax; regs.ecx = s.ecx; regs.edx = s.edx; regs.ebx = s.ebx;
  regs.esi = s.esi; regs.edi = s.edi; regs.ebp = s.ebp;
}

export function FUN_00442867(heap) {
  const esi = regs.esi >>> 0;
  if ((heap.u16(esi + 0xc8) & 1) === 0) return;
  const c6 = heap.u8(esi + 0xc6);
  if (c6 === 1 || c6 === 0x1e || c6 === 0x3c) {
    // al=0x1b, ah=0xff — 440fe3 (hand-port) leaves eax = displaced
    // thought-queue dword like the binary, preserves the rest.
    regs.eax = ((regs.eax & 0xffff0000) | 0xff1b) >>> 0;
    FUN_00440fe3(heap);
    const v = heap.u8(esi + 0x3b);
    heap.setU8(esi + 0x3b, v < 0x1e ? 0 : v - 0x1e);
  }
  const nv = (heap.u8(esi + 0xc6) - 1) & 0xff;            // dec BYTE
  heap.setU8(esi + 0xc6, nv);
  if (nv !== 0) return;
  heap.setU8(esi + 0xc6, 0x5a);
  {                                                       // pushal … 42c711 … popal
    const s = saveRegs();
    heap.setU16(0x971e86, heap.u16(esi + 0x22));
    heap.setU32(0x971e88, heap.u32(esi + 0x9c));
    regs.eax = ((regs.eax & 0xffffff00) | 2) >>> 0;       // mov al,2
    regs.ecx = heap.u16(esi + 0xa);                       // movzx ecx, word
    regs.ebx = ((regs.ebx & 0xffff0000) | 0x7ca) >>> 0;   // mov bx,0x7ca
    callNative(0x42c711, []);
    restoreRegs(s);
  }
}
