// @manual — do not regenerate.
// Source: decompiled/c/5e38f5.c
//
// Ghidra emits a `short extraout_CX` local that the original x86 leaves in
// CX after each `FUN_005e1fdd` call (the event-type code: 0 = no event,
// 1 = LMB-down, 2 = RMB-down, 3 = LMB-up, 4 = mouse-move/other). The
// translator emits `let extraout_CX = 0` (never written), so the inner
// `while(true)` dequeue loop hits `if (extraout_CX == 0) break;` on the
// first iteration and bails before any `FUN_005e2225` dispatch fires —
// which means the per-tick input chain never delivers clicks to widgets.
//
// Hand-port reads CX from `regs.ecx` (low 16 bits, sign-extended) after
// FUN_005e1fdd, mirroring the x86's `mov cx, ...; ret` pattern. The
// matching hand-port in `5e1fdd.js` writes `regs.ecx` at every return.
//
// Confirmed against disassembly at 0x5e205b-0x5e2186 (capstone) and the
// caller in 5e38f5 at 0x5e3920 onward.
//
// SECOND FIX (live cursor-pick): the dispatch tail at 0x5e39a4-0x5e39b6 keeps
// the clamped cursor x in EAX and y in EBX live across the 5e2225/5e6078 calls
// (push eax; push ebx; call; pop ebx; pop eax — twice). Ghidra lowered these
// register args as ignored positional JS params, and 5e2225 clobbers regs.eax,
// so the hover-pick (5e6078 -> 5e613e) saw eax=0 and resolved at (0, y) — off
// the map. Restore regs.eax/regs.ebx before EACH call (see the inline note).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { int3 } from "../../runtime/win32.js";
import { CONCAT31 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00426f56 } from "./426f56.js";
import { FUN_005e1f70 } from "./5e1f70.js";
import { FUN_005e1fdd } from "./5e1fdd.js";
import { FUN_005e2225 } from "./5e2225.js";
import { FUN_005e39c6 } from "./5e39c6.js";
import { FUN_005e6044 } from "./5e6044.js";
import { FUN_005e6078 } from "./5e6078.js";
export function FUN_005e38f5(heap) {
  let uVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let extraout_CX = 0;
  let unaff_EBX = regs.ebx >>> 0;
  uVar1 = ((heap.u32(0x0099a4fc) >>> 1) & 0xffff);
  heap.setU32(0x0099a4fc, (heap.u32(0x0099a4fc) & 0xfffd) >>> 0);
  if ((uVar1 & 1) != 0) {
    unaff_EBX = ((CONCAT31((regs.eax = callIndirect(heap, int3, unaff_EBX >>> 8)), 1)) >>> 0);
    in_EAX = (((regs.eax = FUN_00426f56(heap))) >>> 0);
  }
  if (heap.u8(0x00971ef0) != 0) {
    (regs.eax = FUN_005e39c6(heap));
    (regs.eax = FUN_005e1f70(heap));
    while (true) {
      in_EAX = (((regs.eax = FUN_005e1fdd(heap))) >>> 0);
      // x86: 5e1fdd leaves event-type in CX. Read the low 16 bits and
      // sign-extend to match `short extraout_CX` in Ghidra C.
      extraout_CX = ((regs.ecx << 16) >> 16);
      if (extraout_CX == 0) {
        break;
      }
      if ((((heap.u32(0x0099a500) & 1) == 0) || (heap.u8(0x00628cb9) == 0)) || (extraout_CX != 1)) {
        (regs.eax = FUN_005e2225(heap));
      } else {
        heap.setU8(0x00628cb9, (-2) & 0xff);
      }
    }
    // HAND-FIX: pick up the LIVE cursor Y that 0x5e1fdd left in EBX.
    // DISASM 0x5e2030/0x5e209d-0x5e20a2: in the no-event path 0x5e1fdd does
    // `mov eax, [0x99fdf4]` (cursor X) AND `mov ebx, [0x99fdf8]` (cursor Y),
    // then returns cx=0 so this loop breaks. The binary then uses the live EBX
    // at 0x5e3964 onward (the clamp `or ebx,ebx ... cmp bx,[0x971ed8]` and the
    // `push ebx` before 5e2225/5e6078/5e6044). Ghidra typed EBX as
    // `unaff_EBX` (captured at entry) and the translator never refreshed it
    // from the 0x5e1fdd result — so the cursor Y handed to the tool-update was
    // the STALE entry EBX (garbage from the previous call), and the armed land
    // tool's per-tick auto-resolve (5e6044 -> 0x42aa65 -> 0x43424f) picked at
    // (x, garbageY) -> off the owned map. The ported 5e1fdd.js already writes
    // regs.ebx in the no-event branch; mirror the binary by reading it back.
    //
    // SCOPE: refresh the y ONLY for the 5e6044 tool-update call (the armed
    // path, bit3 set, which dispatches to the land tile-resolve). The 5e2225
    // hit-test and 5e6078 hover-pick are deliberately left on the original
    // stale-EBX value: the JS ports of that UNARMED hover chain (5e6078 ->
    // 5e613e) carry compensating Ghidra-typing quirks, and feeding them the
    // corrected y makes the JS divergence surface as a 0x99fdf4 cursor-cache
    // wipe (the binary leaves it at the true x; verified via the bridge oracle).
    // The armed auto-resolve never enters that hover branch (5e6078 line 46
    // `if (bit3==0)` is false), so scoping the refresh to 5e6044 keeps the
    // unarmed cursor cache byte-faithful while fixing the armed pick. The live
    // cursor Y that 5e6044 needs is exactly regs.ebx (= [0x99fdf8]); capture it
    // here before the 5e2225/5e6078 calls below clobber the register.
    const liveCursorY = regs.ebx >>> 0;
    if ((heap.u32(0x00991f30) >>> 5 & 1) != 0) {
      (regs.eax = FUN_005e2225(heap, unaff_EBX));
      return in_EAX;
    }
    if (in_EAX != 0x80000000) {
      if (((in_EAX) | 0) < 0) {
        in_EAX = ((0) >>> 0);
      }
      if (heap.u32(0x00971ed6) <= ((in_EAX) & 0xffff)) {
        in_EAX = ((((heap.u32(0x00971ed6) - 1) >>> 0)) >>> 0);
      }
      if (((unaff_EBX) | 0) < 0) {
        unaff_EBX = ((0) >>> 0);
      }
      if (heap.u32(0x00971ed8) <= ((unaff_EBX) & 0xffff)) {
        unaff_EBX = ((((heap.u32(0x00971ed8) - 1) >>> 0)) >>> 0);
      }
      // DISASM 0x5e39a4-0x5e39b6 (capstone): the clamped x (EAX=in_EAX) and y
      // (EBX=unaff_EBX) are LIVE registers across ALL THREE calls —
      //   0x5e39a4 push eax; push ebx; call 0x5e2225; pop ebx; pop eax  ; hit-test
      //   0x5e39ad push eax; push ebx; call 0x5e6078; pop ebx; pop eax  ; hover-pick
      //   0x5e39b6 call 0x5e6044                                        ; tool-update
      // i.e. 5e2225, 5e6078 AND 5e6044 read the cursor x in EAX and y in EBX.
      // The push/pop pairs keep x,y live across 5e2225 and 5e6078; after the
      // last `pop ebx; pop eax` (0x5e39b4-b5) eax/ebx STILL hold the cursor when
      // `call 0x5e6044` (0x5e39b6) runs — 5e6044's tool-update dispatches to the
      // armed land tool's resolve (0x42aa65 -> single-tile 0x43424f / area
      // 0x434efd), which reads the cursor x in EAX and y in EBX to drive the
      // pick FUN_00431510. The Ghidra C lowered the register args as positional
      // JS params (FUN_005e6078(unaff_EBX, in_EAX)), which the ported fns ignore
      // — they read regs.eax / regs.ebx. Worse, the intervening calls clobber
      // regs.eax/regs.ebx, so without restoring them the live cursor-pick
      // resolved at (0, y) — off the map — and a viewport drag never picked a
      // tile. FIX: mirror the asm by loading regs.eax=in_EAX, regs.ebx=unaff_EBX
      // before EACH of the THREE calls. (The 5e6044 restore on line 102 below
      // was the missing one — 5e2225/5e6078 were already restored, but 5e6044
      // got the stale post-5e6078 registers, so the armed land tool's per-tick
      // auto-resolve never populated the drag rect at [0x99a020].)
      regs.eax = in_EAX >>> 0; regs.ebx = unaff_EBX >>> 0;
      (regs.eax = FUN_005e2225(heap, unaff_EBX, in_EAX));
      regs.eax = in_EAX >>> 0; regs.ebx = unaff_EBX >>> 0;
      (regs.eax = FUN_005e6078(heap, unaff_EBX, in_EAX));
      regs.eax = in_EAX >>> 0; regs.ebx = liveCursorY >>> 0;
      in_EAX = (((regs.eax = FUN_005e6044(heap))) >>> 0);
    }
  }
  return in_EAX;
}
