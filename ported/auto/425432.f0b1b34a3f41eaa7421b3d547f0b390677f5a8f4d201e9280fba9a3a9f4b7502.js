// @manual — do not regenerate.
//
// FUN_00425432 — "is the tile at (ax,cx) buildable/walkable" map probe
// (binary 0x425432..0x42547a). Called from the terrain and construction
// paths; 0x42547b immediately below it is a near-identical sibling.
//
// The auto-translation was heap- and EAX-exact but WROTE NO FLAGS, and this
// function's entire result is the carry flag:
//
//   0x42546c  and eax, eax ; ret          -> CF=0   tile is OK
//   0x425479  stc          ; ret          -> CF=1   tile is not
//
// tools/_lockstep-batch.mjs measured CF wrong on 122 of 122 calls (ADDENDUM
// 175). It also had `mov word ptr [0x991efc], 0x6a9` as a setU32 — the
// 16-bit-store-as-dword-RMW class audited in ADDENDUM 173. That one did not
// show up as memMis here only because the neighbouring word already held
// zero in the soaked state; it is a latent corruption either way.
//
// Disassembly:
//   0x425432  push esi
//   0x425433  cmp  ax, 0xfff        ; ja  0x42546f
//   0x425439  cmp  cx, 0xfff        ; ja  0x42546f
//   0x425440  mov  si, cx / rol si,7 / or si,ax / ror si,5
//   0x42544e  movzx esi, si
//   0x425451  mov  esi, [esi*4 + 0x971ef4]      ; tile-element list head
//   0x425458  test byte [esi], 0x3c ; je 0x425465
//   0x42545d  add  esi, 8 / test byte [esi],0x3c / jne 0x42545d
//   0x425465  test byte [esi+7], 0x20 ; je 0x42546f
//   0x42546b  pop esi / and eax,eax / ret       ; CF=0
//   0x42546f  pop esi / mov word [0x991efc],0x6a9 / stc / ret  ; CF=1
//
// ESI is push/pop'd, so it is preserved; EAX is untouched throughout.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";

export function FUN_00425432(heap) {
  const ax = regs.eax & 0xffff;
  const cx = regs.ecx & 0xffff;

  if (ax <= 0xfff && cx <= 0xfff) {                      // 0x425433, 0x425439 (ja)
    const rolled = ((cx << 7) | (cx >>> 9)) & 0xffff;    // 0x42544c rol si, 7
    const ored = (rolled | ax) & 0xffff;                 // 0x425447 or si, ax
    const idx = ((ored >>> 5) | (ored << 11)) & 0xffff;  // 0x42544a ror si, 5
    let p = heap.u32(0x00971ef4 + idx * 4) >>> 0;        // 0x425451
    while ((heap.u8(p) & 0x3c) !== 0) p = (p + 8) >>> 0; // 0x425458..0x425463
    if ((heap.u8((p + 7) >>> 0) & 0x20) !== 0) {         // 0x425465
      // 0x42546c  and eax, eax — clears CF/OF, sets ZF/SF from the unchanged EAX.
      regs.cf = 0;
      regs.of = 0;
      regs.zf = (regs.eax >>> 0) === 0 ? 1 : 0;
      regs.sf = (regs.eax >>> 0) >>> 31;
      return regs.eax >>> 0;
    }
  }
  heap.setU16(0x00991efc, 0x6a9);                        // 0x425470 (WORD, not dword)
  regs.cf = 1;                                           // 0x425479 stc
  return regs.eax >>> 0;
}
