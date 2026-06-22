// @manual — do not regenerate.
// measureStringWidth. The Ghidra C (decompiled/c/458a7c.c) is WRONG: it recovered
// only the esi-walk skeleton as `void(void)` and DROPPED everything that matters —
// the cx pixel-width accumulation, the ebx font setup, the inline-sprite/escape-code
// handling, and the cx (ecx) RETURN VALUE. The auto-translation therefore measured
// nothing, never advanced esi, and never returned a width. Rewritten faithfully from
// the asm (0x458a7c–0x458b04, tools/disasm-va.py).
//
// Inputs:  esi = string ptr; word [0x971e84] = current font index.
// Outputs: ecx low word = total pixel width (minus 1); esi = end-of-string ptr;
//          ebx = last font set (incidental scratch); eax = 0.
// Width table: byte [0x99a508 + font + (char-0x20)] per printable char; the escape
// codes select fonts (7→0x1c0, 8→0x2a0, 9→0xe0, 0xa→0), skip params (1-4:+1 byte;
// 0x11-0x16:+2; 0x18-0x1f:+4; 0x17: inline sprite, +4 bytes, width word [imageId*16+0x8dc0b8]).
// Validated: tools/_lockstep-auto.mjs ADDR=0x458a7c → memMis=0 esiMis=0 ecxMis=0.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";

export function FUN_00458a7c(heap) {
  let esi = regs.esi >>> 0;
  let eax = 0;                                 // xor eax,eax
  let ebx = heap.u16(0x00971e84) >>> 0;        // movzx ebx, word [0x971e84]
  let cx = 0;                                  // xor cx,cx — 16-bit width accumulator
  while (true) {
    eax = (eax & 0xffffff00) | heap.u8(esi);   // mov al,[esi]
    esi = (esi + 1) >>> 0;                      // inc esi
    const al = eax & 0xff;
    if (al === 0) break;                        // or al,al; je done
    if (al < 0x20) {                            // sub al,0x20; jb 0x458aa7 (control code)
      if (al <= 4) {                            // codes 1..4: skip 1 param byte
        esi = (esi + 1) >>> 0;
      } else if (al === 7) {                    // select font 0x1c0
        ebx = 0x1c0;
      } else if (al === 8) {                    // select font 0x2a0
        ebx = 0x2a0;
      } else if (al === 9) {                    // select font 0xe0
        ebx = 0xe0;
      } else if (al === 0xa) {                  // select font 0 (xor ebx,ebx)
        ebx = 0;
      } else if (al === 0x17) {                 // inline sprite — width word [imageId*16+0x8dc0b8]
        eax = heap.u32(esi) & 0x1ffff;          // mov eax,[esi]; and eax,0x1ffff
        esi = (esi + 4) >>> 0;                  // add esi,4
        eax = (eax << 4) >>> 0;                 // shl eax,4
        cx = (cx + heap.u16((eax + 0x008dc0b8) >>> 0)) & 0xffff;  // add cx,word [eax+0x8dc0b8]
        eax = 0;                                // xor eax,eax
      } else if (al <= 0x10) {                  // codes 5,6,0xb..0x10: zero-width, no param
        /* loop */
      } else if (al <= 0x16) {                  // codes 0x11..0x16: skip 2 param bytes
        esi = (esi + 2) >>> 0;
      } else {                                  // codes 0x18..0x1f: skip 4 param bytes
        esi = (esi + 4) >>> 0;
      }
      continue;                                 // jmp 0x458a88
    }
    // printable: add cl,[ebx+eax+0x99a508]; adc ch,0  (eax = char-0x20, high bytes 0)
    eax = (eax & 0xffffff00) | ((al - 0x20) & 0xff);
    cx = (cx + heap.u8((ebx + (eax & 0xff) + 0x0099a508) >>> 0)) & 0xffff;
  }
  if (cx !== 0) cx = (cx - 1) & 0xffff;         // or cx,cx; je; dec cx
  regs.esi = esi >>> 0;
  regs.eax = 0;
  regs.ebx = ebx >>> 0;
  regs.ecx = ((regs.ecx & 0xffff0000) | (cx & 0xffff)) >>> 0;   // return width in cx
  return regs.eax >>> 0;
}
