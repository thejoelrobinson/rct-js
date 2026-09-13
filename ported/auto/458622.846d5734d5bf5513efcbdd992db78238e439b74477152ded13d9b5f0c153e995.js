// @manual — do not regenerate.
// Source: transcribed from binary/rct.exe @ 0x458622..0x458677.
//
// FUN_00458622 — draw a formatted string CENTRED on CX.
//   BX = string id, ESI = argument block, CX/DX = centre position,
//   AL = colour, EDI = DPI.
//
// The auto-translation dropped every register argument: it called
// FUN_00458bcf(heap) with no `movzx eax,bx` / `mov ecx,esi` / `mov edi,buffer`
// setup, and omitted the measure-and-centre step entirely. That was harmless
// only because FUN_00458bcf was itself a do-nothing stub; once that was ported
// the garbage string id fed a garbage template pointer into the format loop and
// the frame went 85.7% divergent.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_00458a7c } from "./458a7c.js";
import { FUN_009ba943 } from "./9ba943.js";

const BUF = 0x0099a888;

export function FUN_00458622(heap) {
  // 0x458626..0x45862c — push ax/cx/dx/edi.
  const ax0 = regs.eax >>> 0, cx0 = regs.ecx >>> 0;
  const dx0 = regs.edx >>> 0, edi0 = regs.edi >>> 0;

  regs.edi = BUF;                                   // 0x45862d
  regs.eax = regs.ebx & 0xffff;                     // 0x458632 movzx eax, bx
  regs.ecx = regs.esi >>> 0;                        // 0x458635 mov ecx, esi
  FUN_00458bcf(heap);                               // 0x458637

  regs.esi = BUF;                                   // 0x45863c
  heap.setU16(0x00971e84, 0xe0);                    // 0x458641
  FUN_00458a7c(heap);                               // 0x45864b — cx = width
  const width = regs.ecx & 0xffff;                  // 0x458656 mov bx, cx

  // 0x458651 `cmp cx, bp / ja` compares against BP = 0xffff, so it can never
  // be taken; the early-out at 0x458670 is dead code.
  regs.edi = edi0; regs.edx = dx0; regs.eax = ax0;  // 0x458659..0x45865e
  regs.ebx = (width >>> 1) & 0xffff;                // 0x458660..0x458662
  regs.ecx = ((cx0 & 0xffff0000) | (((cx0 & 0xffff) - (width >>> 1)) & 0xffff)) >>> 0;
  regs.esi = BUF;
  FUN_009ba943(heap);                               // 0x458668
  regs.ebx = width;                                 // 0x45866d pop bx
  return regs.eax;
}
