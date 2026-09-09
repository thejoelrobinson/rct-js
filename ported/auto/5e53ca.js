// @manual — do not regenerate.
// Source: decompiled/c/5e53ca.c — but Ghidra's C was BADLY incomplete (it dropped
// the entire per-entry clamp loop and the ax/bx/dx/bp register setup before the
// call 0x5e117d), so this is rewritten from the 0x5e53ca disassembly.
//
// FUN_005e53ca: for each viewport window in the table at 0x9a121c whose rect
// overlaps the sprite's bbox ([esi+0x16/0x18]=lo, [esi+0x1a/0x1c]=hi), clamp the
// bbox to the window, transform it into the window's dirty-grid coordinates
// (sub origin, sar by the window's zoom [esi+0x10], add grid base), and call
// 0x5e117d to mark the overlapped dirty cells. `pushal`/`popal` => preserves ALL
// registers. The auto-translation (faithful to the wrong C) never set up the
// call's registers, so production marked NO dirty cells on overlapping sprites —
// wrong on every overlapping call (tools/_lockstep-auto.mjs ADDR=0x5e53ca).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_005e117d } from "./5e117d.js";

const s16 = (v) => (v << 16) >> 16;

export function FUN_005e53ca(heap) {
  // 0x5e53ca pushal — snapshot every GP register; popal restores them at the ret.
  const E = {
    eax: regs.eax >>> 0, ecx: regs.ecx >>> 0, edx: regs.edx >>> 0, ebx: regs.ebx >>> 0,
    esi: regs.esi >>> 0, edi: regs.edi >>> 0, ebp: regs.ebp >>> 0,
  };
  const spr = E.esi;
  const ax = heap.u16(spr + 0x16);                          // 0x5e53cb mov ax,[esi+0x16]
  const bx = heap.u16(spr + 0x18);                          // 0x5e53cf mov bx,[esi+0x18]
  if (ax !== 0x8000) {                                      // 0x5e53d3 cmp ax,0x8000 ; je ret
    const dx = heap.u16(spr + 0x1a);                        // 0x5e53dd mov dx,[esi+0x1a]
    const bp = heap.u16(spr + 0x1c);                        // 0x5e53e1 mov bp,[esi+0x1c]
    for (let edi = 0x009a121c; ; edi = (edi + 4) >>> 0) {   // 0x5e53e5 edi=0x9a121c ; 0x5e548c edi+=4
      const ent = heap.u32(edi) >>> 0;                      // 0x5e53ea mov esi,[edi]
      if (ent === 0) break;                                  // 0x5e53ec or esi,esi ; je ret
      if (heap.u8(ent + 0x10) >= 2) continue;                // 0x5e53f4 cmp [esi+0x10],2 ; jae next (unsigned)
      if (s16(dx) <= s16(heap.u16(ent + 8))) continue;       // 0x5e53ff cmp dx,[esi+8]  ; jle next
      if (s16(bp) <= s16(heap.u16(ent + 0xa))) continue;     // 0x5e5409 cmp bp,[esi+0xa]; jle next
      const di0 = (heap.u16(ent + 8) + heap.u16(ent + 0xc)) & 0xffff; // 0x5e540f di=[esi+8]+[esi+0xc]
      if (s16(ax) >= s16(di0)) continue;                     // 0x5e5417 cmp ax,di ; jge next
      // clamp the bbox to this window (copies — ax/bx/dx/bp are loop invariants,
      // restored each iteration by the binary's push/pop).
      let cax = ax, cdx = dx, cbx = bx, cbp = bp;
      if (s16(cax) < s16(heap.u16(ent + 8))) cax = heap.u16(ent + 8);   // 0x5e541e cmp ax,[esi+8]; jge; else ax=[esi+8]
      if (s16(cdx) > s16(di0)) cdx = di0;                    // 0x5e5428 cmp dx,di ; jle; else dx=di
      const di1 = (heap.u16(ent + 0xa) + heap.u16(ent + 0xe)) & 0xffff; // 0x5e5430 di=[esi+0xa]+[esi+0xe]
      if (s16(cbx) >= s16(di1)) continue;                    // 0x5e5438 cmp bx,di ; jge 0x5e5489 (skip call)
      if (s16(cbx) < s16(heap.u16(ent + 0xa))) cbx = heap.u16(ent + 0xa); // 0x5e543f cmp bx,[esi+0xa]; jge; else bx=[esi+0xa]
      if (s16(cbp) > s16(di1)) cbp = di1;                    // 0x5e544a cmp bp,di ; jle; else bp=di
      const cl = heap.u8(ent + 0x10) & 0x1f;                 // 0x5e5452 cl=[esi+0x10] (zoom; <2 here)
      const o8 = heap.u16(ent + 8), oa = heap.u16(ent + 0xa), b4 = heap.u16(ent + 4), b6 = heap.u16(ent + 6);
      cax = (((s16((cax - o8) & 0xffff)) >> cl) + b4) & 0xffff;  // 0x5e5455 sub; 0x5e5465 sar; 0x5e5471 add
      cbx = (((s16((cbx - oa) & 0xffff)) >> cl) + b6) & 0xffff;  // 0x5e5459/68/75
      cdx = (((s16((cdx - o8) & 0xffff)) >> cl) + b4) & 0xffff;  // 0x5e545d/6b/79
      cbp = (((s16((cbp - oa) & 0xffff)) >> cl) + b6) & 0xffff;  // 0x5e5461/6e/7d
      // 0x5e5481 call 0x5e117d — reads ax/bx/dx/bp (transformed coords); esi=ent, cl set.
      regs.eax = (E.eax & 0xffff0000) | cax;
      regs.ebx = (E.ebx & 0xffff0000) | cbx;
      regs.edx = (E.edx & 0xffff0000) | cdx;
      regs.ebp = (E.ebp & 0xffff0000) | cbp;
      regs.ecx = (E.ecx & 0xffffff00) | heap.u8(ent + 0x10);
      regs.esi = ent;
      FUN_005e117d(heap);
    }
  }
  // 0x5e5494 popal — restore all GP regs to their entry values.
  regs.eax = E.eax; regs.ecx = E.ecx; regs.edx = E.edx; regs.ebx = E.ebx;
  regs.esi = E.esi; regs.edi = E.edi; regs.ebp = E.ebp;
  return E.eax;
}
