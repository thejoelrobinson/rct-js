// @manual — do not regenerate.
//
// FUN_0043d38b — peep tile z-height helper (the "z at (ax,cx)" computation
// called by the walking core's same-tile move, LAB_43c8b4, via
// callNative(0x43d38b)). ~217 interp steps/tick during gameplay; a callee of
// the 0x43c751 walking core.
//
// The Ghidra C (decompiled/c/43d38b.c) is badly incomplete: it dropped the
// ENTIRE base-height computation (`movzx dx,[esi+0x28]; shl dx,2`) and all
// four jump-table slope arms — its `switch` body is degenerate (every case
// returns, writing nothing). This file is transcribed instruction-by-
// instruction from the capstone disassembly instead (CODESEG file off =
// va-0x41c000+0x1a600).
//
// Disassembly (0x43d38b..0x43d403, four `ret` exits + one tail-jmp exit):
//   0x43d38b  mov  dl, [esi+0x29]        ; slope/flags byte
//   0x43d38e  mov  bl, dl
//   0x43d390  and  dl, 0x18
//   0x43d393  je   0x43d39a
//   0x43d395  jmp  0x423677              ; (bl&0x18)!=0 -> tail-call slope LUT
//   0x43d39a  movzx dx, byte [esi+0x28]  ; base height byte
//   0x43d39f  shl  dx, 2                 ; dx = base<<2
//   0x43d3a3  test bl, 4
//   0x43d3a6  je   0x43d403              ; (bl&4)==0 -> ret (dx = base only)
//   0x43d3a8  and  ebx, 3
//   0x43d3ab  jmp  [ebx*4 + 0x43d3b4]    ; slope-direction dispatch (0..3)
//   arm0 @0x43d3c4: bx=0x1f; bx-=ax; bx&=0x1f; bx>>=1; dx+=bx; ret
//   arm1 @0x43d3d6: bx=cx;   bx&=0x1f; bx>>=1; dx+=bx; ret
//   arm2 @0x43d3e4: bx=ax;   bx&=0x1f; bx>>=1; dx+=bx; ret
//   arm3 @0x43d3f2: bx=0x1f; bx-=cx; bx&=0x1f; bx>>=1; dx+=bx; ret
//   (the (bl&4)==0 target 0x43d403 is a plain `ret`)
//
// All slope math is 16-bit (mov bx,_ / shr bx,1 unsigned). The base store is
// `movzx dx` — it writes only the low 16 of edx, so the high 16 of the entry
// edx are preserved. `and ebx,3` clears the high bits of ebx before the arm
// `mov bx` writes the low 16. The function writes NO heap memory in the four-
// arm path; the only memory effects live behind the 0x423677 tail-call (a
// tile-element slope lookup that ends in `call [ebx*4+0x4236e0]; ret`), which
// is delegated to the interpreter via callNative so its heap effects +
// register exit (z in dx/eax) round-trip byte-exactly.
//
// ENTRY register state (from caller 0x43c8b4 / the 0x43c751 walking core):
//   esi = peep sprite base
//   ax  = target sub-tile x   (low 5 bits index the slope arms)
//   cx  = target sub-tile y
// EXIT: dx = interpolated z height (and via 0x423677, eax too). esi unchanged.
//
// Oracle: tools/_lockstep-43d38b.mjs (whole-heap per-call compare vs the
// interpreter, calls=N memMis=0); interpreter reachable behind
// __forceInterp43d38b (the eip-hook in painter-bridge.js installed by the
// oracle).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callNative } from "../../runtime/painter-bridge.js";

export function FUN_0043d38b(heap) {
  const esi = regs.esi >>> 0;

  // 0x43d38b: dl = [esi+0x29]; bl = dl
  const flags = heap.u8(esi + 0x29) & 0xff;

  // 0x43d390: and dl,0x18 ; je 0x43d39a ; jmp 0x423677
  if ((flags & 0x18) !== 0) {
    // tail-jmp to 0x423677 — its (dx/eax) result becomes ours. Stage esi
    // (its `this`) and the live ax/cx; the interpreter run leaves z in eax/dx.
    callNative(0x423677, []);
    return regs.eax;
  }

  // 0x43d39a: movzx dx,[esi+0x28] ; shl dx,2  — base height into LOW 16 of edx,
  // preserving the entry high 16 (movzx dx is a 16-bit write).
  const base = (heap.u8(esi + 0x28) & 0xff) << 2;        // fits in 16 bits
  let dx = base & 0xffff;

  // 0x43d3a3: test bl,4 ; je 0x43d403 (ret with dx = base)
  if ((flags & 4) !== 0) {
    // 0x43d3a8: and ebx,3 ; jmp [ebx*4 + 0x43d3b4]
    const ax = regs.eax & 0xffff;
    const cx = regs.ecx & 0xffff;
    let bx;
    switch (flags & 3) {
      case 0: // arm0 @0x43d3c4
        bx = (0x1f - ax) & 0xffff;
        break;
      case 1: // arm1 @0x43d3d6
        bx = cx & 0xffff;
        break;
      case 2: // arm2 @0x43d3e4
        bx = ax & 0xffff;
        break;
      default: // case 3, arm3 @0x43d3f2
        bx = (0x1f - cx) & 0xffff;
        break;
    }
    bx = (bx & 0x1f) >>> 1;                              // and bx,0x1f ; shr bx,1
    dx = (dx + bx) & 0xffff;                             // add dx,bx
  }

  // Write z back into the LOW 16 of edx (high 16 preserved, matching `movzx dx`).
  regs.edx = (regs.edx & 0xffff0000) | dx;
  return;
}
