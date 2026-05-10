// @manual — do not regenerate.
// Source: decompiled/c/9bbff8.c
//
// FUN_009bbff8 walks the viewport list (entries at &DAT_009a013c .. DAT_009a1164,
// stride 0x178 bytes per entry) and calls FUN_009bc041 once per viewport. The
// callee FUN_009bc041 is register-passed: it reads
//
//   AX  = uVar1 (DAT_0099fb80)                    — clip-rect x_min
//   BX  = uVar3 (DAT_0099fb82)                    — clip-rect y_min
//   DX  = uVar2 (DAT_0099fb80 + DAT_0099fb84)     — clip-rect x_max
//   BP  = uVar4 (DAT_0099fb82 + DAT_0099fb86)     — clip-rect y_max
//   ESI = puVar5                                  — current viewport pointer
//
// (verified by disassembling rct.exe @ 0x9bbff8: `mov ax,[0x99fb80]`,
//  `mov bx,[0x99fb82]`, `mov dx,[0x99fb84]`, `mov bp,[0x99fb86]`,
//  `add dx,ax`, `add bp,bx`, `mov esi,0x9a013c`, then push eax/ebx/edx/ebp
//  around the call to 0x9bc041, then pop, `add esi,0x178`, loop.)
//
// The auto-translator (a) didn't set ESI inside the loop, (b) emitted the
// callee's args via the ABI-position calling convention even though the
// callee actually reads from the register file, (c) read AX/BX/DX/BP as
// 32-bit DAT u32 values when the binary issues 16-bit `mov ax,...` —
// the four DATs (0x99fb80..0x99fb87) are packed 16-bit slots so the u32
// read leaks the next slot's low byte into the high byte of the value
// we'd push.
//
// Hand-port matches the binary exactly: read each DAT as u16, set
// regs.eax/edx/ebx/ebp to the 16-bit values per iteration, set regs.esi
// to the iterator, then call FUN_009bc041(heap) with no positional args
// (the callee reads regs).
//
// Also: the binary's `mov [0x9b2280], eax` happens BEFORE the AX clobber,
// so DAT_009b2280 receives the proc pointer that the caller (FUN_009bbfb3)
// loaded into EAX from `*(int *)(0x9b22f0 + DAT_008d7eb6 * 4)`. Preserved.

import { regs } from "../../runtime/regs.js";
import { FUN_009bc041 } from "./9bc041.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_009bbff8(heap) {
  // EAX on entry = caller-loaded proc pointer (see FUN_009bbfb3).
  const procPtr = regs.eax >>> 0;
  heap.setU32(0x009b2280, procPtr);

  // 16-bit clip-rect corners — exactly like `mov ax,[...]` in the binary.
  const ax = heap.u16(0x0099fb80) & 0xffff;          // x_min
  const bx = heap.u16(0x0099fb82) & 0xffff;          // y_min
  const dx = (heap.u16(0x0099fb84) + ax) & 0xffff;   // x_max
  const bp = (heap.u16(0x0099fb86) + bx) & 0xffff;   // y_max

  const end = heap.u32(0x009a1164) >>> 0;
  // Defensive: the writers (5e3f31/5e3c3c) start with end=0 until 5e0d60
  // initialises the list base. Guard against an uninitialised end.
  if (end === 0) return;

  for (let puVar5 = 0x009a013c >>> 0; puVar5 < end; puVar5 = (puVar5 + 0x178) >>> 0) {
    // The callee reads in_AX / in_DX / unaff_BX / unaff_BP / unaff_ESI.
    // Set the 16-bit halves explicitly each iteration; the binary pushes
    // EAX/EBX/EDX/EBP around the call, so the upper halves are preserved
    // — keep that behaviour by ORing into the existing high 16 bits.
    regs.eax = (regs.eax & 0xffff0000) | ax;
    regs.ebx = (regs.ebx & 0xffff0000) | bx;
    regs.edx = (regs.edx & 0xffff0000) | dx;
    regs.ebp = (regs.ebp & 0xffff0000) | bp;
    regs.esi = puVar5 >>> 0;
    FUN_009bc041(heap);
    // Callee may have trashed EAX. Don't write back; next iter resets the
    // four registers from local consts anyway.
  }
}
