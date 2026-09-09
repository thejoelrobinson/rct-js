// @manual — do not regenerate.
// NO decompiled C exists for this function: 0x449178 is the map-animation
// type-1 handler (path QUEUE BANNER), entry 1 of the map-animation vtable at
// DATASEG 0x628ab0, dispatched from FUN_00436508's per-queue-entry
// `call [ebp*4 + 0x628ab0]`. Hand-transcribed from asm:
//   python3 tools/disasm-va.py 0x449178 0x4491eb
//
// Entry (the 436508 map-animation convention): AX = x, CX = y, DL = z (base
// height byte), EBP = animation type (1). Exit CF is the caller's contract:
// CF=1 (`stc`, no matching element found in the tile chain) → the caller
// dequeues the animation entry (`jb` at 0x43652f); CF=0 (`and eax,eax`) →
// keep animating.
//
// Body: quadtile hash si = ror16(rol16(cx,7) | ax, 5) indexes the tile
// pointer map [0x971ef4]; walk the element chain (stride 8, [elem+1]&0x80 =
// last) for a PATH element ((b0&0x3c)==4) at base z == dl with
// [e+4]&0xf0 == 0 and the queue-banner bit [e+4]&8 set. Found: banner
// direction bl = (b0>>6 + camera rot [0x991f88]) & 3; when it faces the
// camera (bl 1/2) invalidate the banner's height band via `call 0x5e585a`
// (implicit args DI = z*4+0x10, SI = z*4+0x1e; edi/esi saved by push/pop —
// the callee clobbers them).
//
// Register exactness: esi is fully overwritten (movzx after the 16-bit hash
// ops, then the walk); bl is a byte write on the LIVE ebx at every z-matching
// element; `mov si,di` inside the found block is a 16-bit write on the live
// element-ptr esi. Exit flags are part of the contract and are set on the
// painter cpu exactly as the binary's last ALU op leaves them:
//   not-found: test [esi-7],0x80 (nonzero => ZF=0, SF=1) ; stc  => CF=1
//   found:     and eax,eax => CF=0 OF=0 ZF/SF from eax
//
// Oracle: ADDR=0x449178 FORCE=__forceInterp449178 tools/_lockstep-auto.mjs.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { callNative } from "../../runtime/painter-bridge.js";

const setFlags = (f) => { const c = state.__painterCpu; if (c) Object.assign(c.eflags, f); };

export function FUN_00449178(heap) {
  const ax = regs.eax & 0xffff, cx = regs.ecx & 0xffff, dl = regs.edx & 0xff;
  let v = (((cx << 7) | (cx >>> 9)) & 0xffff) | ax;       // mov si,cx ; rol si,7 ; or si,ax
  v = ((v >>> 5) | (v << 11)) & 0xffff;                   // ror si,5 ; movzx esi,si
  let esi = heap.u32((0x00971ef4 + v * 4) >>> 0) >>> 0;   // tile first element

  for (;;) {                                              // 0x449190
    if (dl === heap.u8((esi + 2) >>> 0)) {
      const t = heap.u8(esi) & 0x3c;                      // mov bl,[esi] ; and bl,0x3c
      regs.ebx = ((regs.ebx & 0xffffff00) | t) >>> 0;
      if (t === 4                                         // path element
          && (heap.u8((esi + 4) >>> 0) & 0xf0) === 0
          && (heap.u8((esi + 4) >>> 0) & 8) !== 0) break; // queue banner → FOUND
    }
    esi = (esi + 8) >>> 0;                                // 0x4491ab
    if ((heap.u8((esi - 7) >>> 0) & 0x80) !== 0) {        // last-element flag
      regs.esi = esi;
      setFlags({ CF: 1, ZF: 0, SF: 1, OF: 0 });           // test 0x80 ; stc
      return;                                             // CF=1 → dequeue
    }
  }

  // FOUND 0x4491b6
  const bl = ((heap.u8(esi) >>> 6) + heap.u8(0x00991f88)) & 3; // shr 6 ; add rot ; and 3
  regs.ebx = ((regs.ebx & 0xffffff00) | bl) >>> 0;
  regs.esi = esi;
  if (bl !== 0 && bl !== 3) {                             // faces the camera
    const savedEdi = regs.edi >>> 0, savedEsi = esi;      // push edi ; push esi
    const di0 = (heap.u8((esi + 2) >>> 0) << 2) & 0xffff; // movzx di,[esi+2] ; shl di,2
    regs.esi = ((esi & 0xffff0000) | ((di0 + 0x1e) & 0xffff)) >>> 0; // mov si,di ; add si,0x1e
    regs.edi = ((regs.edi & 0xffff0000) | ((di0 + 0x10) & 0xffff)) >>> 0; // add di,0x10
    callNative(0x5e585a, []);                             // height-band invalidate
    regs.esi = savedEsi; regs.edi = savedEdi;             // pop esi ; pop edi
  }
  setFlags({ CF: 0, OF: 0,                                // and eax,eax
             ZF: (regs.eax >>> 0) === 0 ? 1 : 0, SF: (regs.eax >>> 31) & 1 });
}
