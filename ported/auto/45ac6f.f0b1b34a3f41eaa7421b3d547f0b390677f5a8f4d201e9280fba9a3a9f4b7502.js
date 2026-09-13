// @manual — do not regenerate.
//
// Hand-port of FUN_0045ac6f (RCT1 title-screen sprite-walker step). Ghidra's
// decompiler returned an empty body for this function, but its callers
// (FUN_0045abea, FUN_0045ac19) consume its register-side outputs (BL/BH/CL/CH
// and unchanged AL). The actual instructions, transcribed from binary/rct.exe
// at RVA 0x45ac6f (63 bytes of x86):
//
//   push esi
//   movzx esi, al                                ; ESI = caller's AL (sprite dir 0..7)
//   movzx ebx, byte ptr [008d7eaa]               ; track-set index
//   mov   cx,  word  ptr [006e3b80]              ; frame counter (low 16 bits)
//   mov   ebx, dword ptr [ebx*4 + 0064bc70]      ; -> sub-table of pointers
//   and   ecx, 7                                 ; modulo 8
//   mov   ecx, dword ptr [ebx + ecx*4]           ; -> "node" struct
//   mov   bl,  byte  ptr [ecx]                   ; node opcode/base
//   add   bl,  byte  ptr [esi*8 + 0064bea0]      ; + delta-table[esi].dx
//   mov   bh,  byte  ptr [esi*8 + 0064bea1]      ; delta-table[esi].dy
//   mov   cl,  byte  ptr [esi*8 + 0064bea2]      ; delta-table[esi].dz
//   mov   ch,  byte  ptr [esi*8 + 0064bea3]      ; delta-table[esi].sprite-id
//   pop esi
//   ret
//
// Note: AL is NOT touched, so the caller's `mov [008d7eae], al` after the
// call reads back the same AL the caller passed in. That's deliberate —
// FUN_0045abea passes AL=1 (always), FUN_0045ac19 passes AL = a randomly
// picked sprite-direction, and both rely on AL surviving the call.
//
// Register clobber model:
//   - EAX preserved (never written by this function)
//   - ESI/EDI/EBP preserved (ESI is push/pop'd; EDI/EBP untouched)
//   - EBX (full 32 bits) clobbered: `mov ebx, [...]` then BL/BH overwrites
//   - ECX (full 32 bits) clobbered: `mov ecx, [...]` then CL/CH overwrites
//
// IMPORTANT: We must NOT leak the upper bits of the loaded EBX/ECX into the
// register file. Other code paths (e.g. FUN_004298a0 → FUN_005e3f31) use
// `regs.eax` after unrelated calls and rely on the register file behaving
// like its real x86 counterpart for the bits the *Ghidra port* observes.
// Since callers of FUN_0045ac6f only ever read BL/BH/CL/CH (8-bit DATs at
// 0x008d7eb0..b6, 0xb1..b7), we narrow our reg writes to the low 16 bits
// only and leave the upper 16 bits of EBX/ECX as the caller had them.
// Matches the auto-port's prior behaviour for other sub-calls — the real
// x86 binary trashes the upper bits, but no JS port observes that.

import { regs } from "../../runtime/regs.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0045ac6f(heap) {
  // ESI = AL (low byte of EAX), zero-extended. Bounded 0..7 by the binary's
  // delta tables (0x64bea0 has 8 8-byte rows).
  const esi = regs.eax & 0xff;

  // ebx = ptr_table[ DAT_008d7eaa * 4 + 0x64bc70 ]
  const aaIdx = heap.u8(0x008d7eaa);
  const ebxBase = heap.u32(0x0064bc70 + aaIdx * 4) >>> 0;

  // ecx = (DAT_006e3b80 & 7); pointer-arithmetic modulo 8
  const cxMod8 = heap.u16(0x006e3b80) & 7;

  // ecx = node_ptr = sub_table[ebxBase + cxMod8*4]
  const nodePtr = heap.u32((ebxBase + cxMod8 * 4) >>> 0) >>> 0;

  // BL = [nodePtr] + [esi*8 + 0x0064bea0]
  // BH = [esi*8 + 0x0064bea1]
  // CL = [esi*8 + 0x0064bea2]
  // CH = [esi*8 + 0x0064bea3]
  const base = (0x0064bea0 + esi * 8) >>> 0;
  const bl = (heap.u8(nodePtr) + heap.u8(base)) & 0xff;
  const bh = heap.u8(base + 1) & 0xff;
  const cl = heap.u8(base + 2) & 0xff;
  const ch = heap.u8(base + 3) & 0xff;

  // Narrow the writes to the low 16 bits of EBX/ECX — see comment above.
  // Preserves upper 16 bits of these registers as the caller had them,
  // matching what the auto-translator's call-site convention assumes.
  regs.ebx = ((regs.ebx >>> 0) & 0xffff0000) | (bh << 8) | bl;
  regs.ecx = ((regs.ecx >>> 0) & 0xffff0000) | (ch << 8) | cl;
  // EAX explicitly preserved (Ghidra void-return convention does the same).
}
