// @manual — do not regenerate.
// NO decompiled C exists for this function: 0x439178 is an UNLABELED binary
// function Ghidra never split out (it sits just past FUN_00439135's ret at
// 0x439177; see PORTING-ROADMAP ADDENDUM 57/58). Hand-transcribed from asm:
//   python3 tools/disasm-va.py 0x439178 0x439219
//
// FUN_00439178 — the PEEP sprite painter (sprite-type 1 entry of the 4-entry
// paint dispatch table at DATASEG 0x6309a0: {0x5d7503 vehicle, 0x439178 peep,
// 0x42d69f, 0x42e001}). Reached ONLY indirectly: FUN_00444820 (the per-tile
// sprite-chain walker, @manual JS, live) does
//   callIndirect(heap, heap.u32(0x006309a0 + spriteType*4))
// per visible sprite. Entry contract (set up at 0x4448c0..0x4448e3):
//   ESI = sprite descriptor ptr        EBX = ((rot<<3) + [esi+0x1e]) & 0x1f
//   AX  = [esi+0x0e] (x)  CX = [esi+0x10] (y)  DX = [esi+0x12] (z)
//   EBP = sprite type (1)
//
// Body: compute the peep image id — direction (ebx>>3) + action-base dword
// from the peep image-type table ([0x62d640 + [esi+0x2d]*8] → [ptr +
// actionType*8]) + frame-offset*4, OR'd with tshirt/trousers colour-remap
// bits ([esi+0x30]<<17 | [esi+0x31]<<24) and flags 0xa0000000 — then set the
// paint-call registers (eax=0x0b00, ecx=0, di=1, si=1), zero the offset words
// [0x99a4e8/ea], store z+3 to [0x99a4ec], and tail-call the camera-rotation
// painter via [0x432204 + rot*4] (bridged with callIndirect, same as 444820).
//
// Special case at [esi+0x71]==0xfe: use [esi+0x6f] (next action sprite type)
// and force frame offset 0.
//
// Register-exactness notes (validated vs interp via tools/_lockstep-auto.mjs):
//   - `mov edi,[0x981ef8]` executes BEFORE the zoom/flag guards → edi = dpi
//     ptr even on the early-return paths.
//   - final eax before the paint call is deterministically 0x0b00: the movzx
//     value ≤ 0xff → shl 2 ≤ 0x3fc, then mov al,0 + mov ah,0xb clear bits 0-15
//     and bits 16+ were already 0.
//   - ecx ≤ 0xff (movzx) then mov cl,0 → ecx = 0.
//   - di=1 / si=1 are 16-bit writes: upper halves keep the table ptr / sprite
//     ptr. esi is push/pop'd around the call (restored to the sprite ptr).
//   - dx does `add dx,3` (stored to [0x99a4ec]) then `sub dx,3` → net edx
//     unchanged (16-bit wrap cancels in all cases).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";

export function FUN_00439178(heap) {
  // 0x439178: mov edi, [0x981ef8]   (unconditional — clobbers edi on all paths)
  const dpi = heap.u32(0x00981ef8) >>> 0;
  regs.edi = dpi;
  // 0x43917e: cmp word [edi+0xe], 2 ; je ret   (zoom exactly 2 skips; the
  // caller 444820 already gates zoom>=2, so this is belt-and-braces)
  if (heap.u16((dpi + 0xe) >>> 0) === 2) return;
  // 0x439189: test word [0x991f8c], 0x1000 ; jne ret  (invisible-peeps flag)
  if ((heap.u16(0x00991f8c) & 0x1000) !== 0) return;

  const sprite = regs.esi >>> 0;                       // 0x439198: push esi
  let eax = heap.u8((sprite + 0x70) >>> 0);            // frame offset
  // movzx edi,[esi+0x2d] ; mov edi,[edi*8+0x62d640]   (image-type entry ptr)
  let edi = heap.u32((0x0062d640 + heap.u8((sprite + 0x2d) >>> 0) * 8) >>> 0) >>> 0;
  // tshirt<<17 | trousers<<24 colour-remap bits
  const remap = ((heap.u8((sprite + 0x30) >>> 0) << 17) | (heap.u8((sprite + 0x31) >>> 0) << 24)) >>> 0;
  let ebx = (regs.ebx >>> 3) >>> 0;                    // 0x4391b8: shr ebx,3 (direction)
  let ecx = heap.u8((sprite + 0x6e) >>> 0);            // action sprite type
  if (heap.u8((sprite + 0x71) >>> 0) === 0xfe) {       // cmp [esi+0x71],0xfe
    ecx = heap.u8((sprite + 0x6f) >>> 0);              // next action sprite type
    eax = 0;                                           // xor eax,eax
  }
  ebx = (ebx + heap.u32((edi + ecx * 8) >>> 0)) >>> 0; // add ebx,[edi+ecx*8]
  ebx = (ebx + ((eax << 2) >>> 0)) >>> 0;              // shl eax,2 ; add ebx,eax
  ebx = (ebx | remap | 0xa0000000) >>> 0;              // or ebx,ebp ; or ebx,0xa0000000

  heap.setU16(0x0099a4e8, 0);
  heap.setU16(0x0099a4ea, 0);
  heap.setU16(0x0099a4ec, ((regs.edx & 0xffff) + 3) & 0xffff); // z+3
  const rot = heap.u32(0x00991f88) >>> 0;              // camera rotation

  // Paint-call register file (asm 0x4391db..0x4391e7 + 0x43920a)
  regs.eax = 0x0b00;                                   // al=0, ah=0xb
  regs.ecx = 0;                                        // cl=0 (ecx was ≤0xff)
  regs.ebx = ebx;                                      // image id
  regs.edi = ((edi & 0xffff0000) | 1) >>> 0;           // di=1
  regs.esi = ((sprite & 0xffff0000) | 1) >>> 0;        // si=1
  regs.ebp = rot;                                      // mov ebp,[0x991f88]
  // edx: net unchanged (add dx,3 / sub dx,3 cancel)

  // 0x439210: call [ebp*4 + 0x432204] — rotation painter (JS if wired, else
  // the _paintShim runs it in the interpreter; same bridging as FUN_00444820).
  // Capture the return into regs.eax (translator convention — audit lens 2):
  // behavior-equal today (_paintShim syncs eax back anyway) but required if a
  // plain translated JS fn is ever wired at a 0x432204 slot.
  regs.eax = callIndirect(heap, heap.u32((0x00432204 + rot * 4) >>> 0)) >>> 0;

  regs.esi = sprite;                                   // 0x439217: pop esi
}
