// @manual — do not regenerate.
// NO decompiled C exists for this function: 0x4264f6 is the map-animation
// type-0 handler (RIDE ENTRANCE), entry 0 of the map-animation vtable at
// DATASEG 0x628ab0, dispatched from FUN_00436508's per-queue-entry
// `call [ebp*4 + 0x628ab0]`. Hand-transcribed from asm:
//   python3 tools/disasm-va.py 0x4264f6 0x42654e
//
// Entry (the 436508 map-animation convention): AX = x, CX = y, DL = z (base
// height byte), EBP = animation type (0). Exit CF is the caller's contract:
// CF=1 (`stc`, no matching element in the tile chain) → dequeue the
// animation (`jb` at 0x43652f); CF=0 (`and eax,eax`) → keep animating.
//
// Body: same quadtile hash as its sibling 0x449178
// (si = ror16(rol16(cx,7) | ax, 5) into the tile pointer map [0x971ef4]);
// walk the element chain for an ENTRANCE element ((b0&0x3c)==0x10) at base
// z == dl with [e+4] == 0 (ride entrance subtype). Found: invalidate the
// entrance's height band via `call 0x5e585a` (implicit args
// DI = z*4+0x28, SI = z*4+0x38; edi/esi saved by push/pop around the call).
//
// Register exactness / exit flags: identical conventions to 449178.js —
// esi fully overwritten, bl byte-written on the live ebx at every z match,
// `mov si,di` is a 16-bit write on the live element ptr; exit flags set on
// the painter cpu (not-found: test/stc => CF=1 ZF=0 SF=1; found:
// and eax,eax => CF=0 OF=0 ZF/SF from eax).
//
// Oracle: ADDR=0x4264f6 FORCE=__forceInterp4264f6 tools/_lockstep-auto.mjs.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { callNative } from "../../runtime/painter-bridge.js";

const setFlags = (f) => { const c = state.__painterCpu; if (c) Object.assign(c.eflags, f); };

export function FUN_004264f6(heap) {
  const ax = regs.eax & 0xffff, cx = regs.ecx & 0xffff, dl = regs.edx & 0xff;
  let v = (((cx << 7) | (cx >>> 9)) & 0xffff) | ax;       // mov si,cx ; rol si,7 ; or si,ax
  v = ((v >>> 5) | (v << 11)) & 0xffff;                   // ror si,5 ; movzx esi,si
  let esi = heap.u32((0x00971ef4 + v * 4) >>> 0) >>> 0;   // tile first element

  for (;;) {                                              // 0x42650e
    if (dl === heap.u8((esi + 2) >>> 0)) {
      const t = heap.u8(esi) & 0x3c;                      // mov bl,[esi] ; and bl,0x3c
      regs.ebx = ((regs.ebx & 0xffffff00) | t) >>> 0;
      if (t === 0x10                                      // entrance element
          && heap.u8((esi + 4) >>> 0) === 0) break;       // ride entrance → FOUND
    }
    esi = (esi + 8) >>> 0;                                // 0x426523
    if ((heap.u8((esi - 7) >>> 0) & 0x80) !== 0) {        // last-element flag
      regs.esi = esi;
      setFlags({ CF: 1, ZF: 0, SF: 1, OF: 0 });           // test 0x80 ; stc
      return;                                             // CF=1 → dequeue
    }
  }

  // FOUND 0x42652e
  regs.esi = esi;
  const savedEdi = regs.edi >>> 0, savedEsi = esi;        // push edi ; push esi
  const di0 = (heap.u8((esi + 2) >>> 0) << 2) & 0xffff;   // movzx di,[esi+2] ; shl di,2
  regs.esi = ((esi & 0xffff0000) | ((di0 + 0x38) & 0xffff)) >>> 0; // mov si,di ; add si,0x38
  regs.edi = ((regs.edi & 0xffff0000) | ((di0 + 0x28) & 0xffff)) >>> 0; // add di,0x28
  callNative(0x5e585a, []);                               // height-band invalidate
  regs.esi = savedEsi; regs.edi = savedEdi;               // pop esi ; pop edi
  setFlags({ CF: 0, OF: 0,                                // and eax,eax
             ZF: (regs.eax >>> 0) === 0 ? 1 : 0, SF: (regs.eax >>> 31) & 1 });
}
