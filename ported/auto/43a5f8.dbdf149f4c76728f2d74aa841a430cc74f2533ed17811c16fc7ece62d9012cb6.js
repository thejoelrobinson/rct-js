// @manual — do not regenerate.
// NO decompiled C exists for this function: 0x43a5f8 is an extra entry
// (lifter/extra-entries.json, FUN_extra_peepstate_43a5f8) Ghidra never split
// out. Hand-transcribed from asm:
//   python3 tools/disasm-va.py 0x43a5f8 0x43a73f
//
// FUN_0043a5f8 — peep-state handler for state 6 ("queuing" in OpenRCT2's
// numbering): entry 6 of the peep-state vtable PTR_0062d4ac (DATASEG
// 0x62d4ac; this fn's pointer sits at 0x62d4c4). Reached ONLY via the
// dispatch tail of FUN_00439822:
//   0x439906: movzx edi, byte [esi+0x2b]   ; peep state
//   0x43990a: jmp dword [edi*4 + 0x62d4ac]
// (no E8/E9 sites target 0x43a5f8 anywhere in .text/CODESEG). Entry
// contract: ESI = peep sprite ptr, EDI = state index (always 6 here, so
// EDI != 0 at entry — load-bearing, see the ZF note below). The harness
// simulates the final ret.
//
// Body: 1-in-16 subtick gate + tile-element presence check (call 0x439219);
// if the peep's queue path element is gone, unlink from the ride queue
// (0x43e792) and ret. Otherwise: if the ride ([esi+0x68], stride 0x260)
// status byte [0x887441+ride*0x260] != 1 (not open) → unlink + window
// invalidate pair 0x44142c/0x441452 + state ← 1. If sub-state [esi+0x2c]
// == 0xa (at queue front / moving): run the walking core 0x43c751, then —
// when no action is active ([esi+0x71] >= 0xfe) — impatience behaviour
// keyed on time-in-queue [esi+0x7a]: item-headed peeps ([esi+0x2d] in
// {0xc,0xd,0x13,0xf,0x11,0xe,0x15}, every 0x40 ticks) start action 1;
// empty-handed peeps roll rand gates at 0x7d0 (action 1) and 0xdac
// (thought 0x12 via 0x440fe3, ah = ride); past 0x10cc with happiness
// [esi+0x3a] <= 0x41, rand < 0x888 → give up: toggle [esi+0x1e] bit 0x10,
// invalidate (0x5e53ca), queue-unlink (0x43e792), state ← 1. If sub-state
// != 0xa and next-in-queue [esi+0x74] == 0xffff → destination reset
// ([esi+0x36]=0, state ← 2, [esi+0x2c]=0).
//
// ALL callees are delegated through callNative (raw interpreter on the
// bridge cpu, full register file synced in and back out) — byte-identical
// to the truth leg by construction. 0x43e792 has a painter-bridge eip hook
// (bounded queue-unlink JS); it fires identically on both legs.
//
// ZF-across-call at 0x43a5fd (`call 0x439219; jne 0x43a609`): 0x439219 has
// exactly three exits —
//   0x439232 ret: cmp al,bl NOT equal → ZF=0, edi unchanged (= entry 6)
//   0x439282 xor edi,edi; ret          → ZF=1, edi=0   (element gone)
//   0x439285 or edi,edi;  ret          → ZF=(edi==0), edi = found element
//            ptr (a real heap address, never 0)
// so exit-ZF == (exit-edi == 0) HOLDS ONLY IF entry edi != 0. That
// assumption broke in production (439822.js had dropped the dispatch's
// `movzx edi, state` — since restored), so the port now branches on the
// REAL exit ZF left on the bridge cpu by callNative (see the body), with
// the edi inference kept only as a no-cpu fallback.
//
// Register-exactness notes (validated vs interp via tools/_lockstep-auto.mjs):
//   - 0x43a609 movzx edi,[esi+0x68]; imul edi,edi,0x260 — full-register
//     write (movzx zero-extends), happens on every jne-taken path.
//   - 0x43a6ff mov al,0x12 / 0x43a701 mov ah,[esi+0x68] are PARTIAL writes
//     on top of 0x5df40c's exit eax (bits 16-31 preserved).
//   - esi is re-read live (regs.esi) before every heap access: callNative
//     syncs the callee's exit register file back, exactly like the binary.
//   - exit regs on every path = the last callee's interpreter exit file
//     (synced by callNative) plus the explicit writes above — no other reg
//     writes exist in the body (cmp/test only).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callNative } from "../../runtime/painter-bridge.js";
import { state } from "../../runtime/win32/context.js";

// 0x43a62d..0x43a649 — "give up queuing": toggle sprite direction-ish bit
// 0x10 in [esi+0x1e], invalidate, unlink from the queue chain, invalidate
// ride windows, state <- 1. Reached straight-line (sub-state != 0xa, next
// != 0xffff) and via the back-edge jb at 0x43a720.
function giveUpQueuing(heap) {
  const s0 = regs.esi >>> 0;
  heap.setU8((s0 + 0x1e) >>> 0, heap.u8((s0 + 0x1e) >>> 0) ^ 0x10); // xor byte [esi+0x1e],0x10
  callNative(0x5e53ca, []);                       // invalidate sprite bbox
  callNative(0x43e792, []);                       // queue-bucket unlink (eip-hooked)
  callNative(0x44142c, []);                       // ride-window invalidate (pre)
  heap.setU8(((regs.esi >>> 0) + 0x2b) >>> 0, 1); // mov byte [esi+0x2b],1  (state <- 1)
  callNative(0x441452, []);                       // ride-window invalidate (post)
  // 0x43a649: ret
}

export function FUN_0043a5f8(heap) {
  // 0x43a5f8: call 0x439219 (subtick gate + tile-element presence check)
  callNative(0x439219, []);
  // 0x43a5fd: jne 0x43a609 — branch on the REAL exit ZF, which callNative
  // leaves live on the bridge cpu (all three 0x439219 exits set it as their
  // last ALU op: cmp al,bl / xor edi,edi / or edi,edi). The original
  // "exit-ZF == (exit-edi == 0)" inference was WRONG in production: it
  // assumed entry edi != 0 (the binary's dispatch loads edi = state = 6),
  // but the live JS dispatcher (439822.js) had dropped that register-init,
  // so the gate-skip exit (edi unchanged) returned edi = 0 and this port
  // mis-took the element-gone unlink path while the binary's jne entered
  // the main body (caught by the 30-tick lockstep, mis-call #21; both the
  // dispatcher init and this branch are fixed — belt and braces).
  const zfGone = state.__painterCpu ? state.__painterCpu.eflags.ZF === 1
                                    : (regs.edi >>> 0) === 0;
  if (zfGone) {
    // element gone: 0x43a5ff call 0x43e792 ; 0x43a604 jmp 0x43a73e (ret)
    callNative(0x43e792, []);
    return;
  }

  // 0x43a609: movzx edi,[esi+0x68] ; 0x43a60d: imul edi,edi,0x260
  regs.edi = (heap.u8(((regs.esi >>> 0) + 0x68) >>> 0) * 0x260) >>> 0;
  const rideOff = regs.edi >>> 0;

  // 0x43a613: cmp byte [edi+0x887441],1 ; jne 0x43a64a
  if (heap.u8((rideOff + 0x887441) >>> 0) !== 1) {
    // ride not open: unlink + invalidate pair + state <- 1 (0x43a64a..0x43a65d)
    callNative(0x43e792, []);
    callNative(0x44142c, []);
    heap.setU8(((regs.esi >>> 0) + 0x2b) >>> 0, 1);
    callNative(0x441452, []);
    return;                                        // 0x43a65d: ret
  }

  // 0x43a61c: cmp byte [esi+0x2c],0xa ; je 0x43a65e
  if (heap.u8(((regs.esi >>> 0) + 0x2c) >>> 0) === 0xa) {
    // === 0x43a65e: at queue front / moving — run the walking core ===
    callNative(0x43c751, []);
    // 0x43a663: cmp byte [esi+0x71],0xfe ; jb 0x43a726 (action active -> ret)
    if (heap.u8(((regs.esi >>> 0) + 0x71) >>> 0) < 0xfe) return;

    // 0x43a66d: cmp byte [esi+0x2d],0 ; je 0x43a6c3
    if (heap.u8(((regs.esi >>> 0) + 0x2d) >>> 0) !== 0) {
      // --- carrying an item ---
      // 0x43a673: test word [esi+0x7a],0x3f ; jne 0x43a709
      if ((heap.u16(((regs.esi >>> 0) + 0x7a) >>> 0) & 0x3f) === 0) {
        // 0x43a67f..0x43a6a7: item-type chain -> je 0x43a6ab
        const t = heap.u8(((regs.esi >>> 0) + 0x2d) >>> 0);
        if (t === 0xc || t === 0xd || t === 0x13 || t === 0xf ||
            t === 0x11 || t === 0xe || t === 0x15) {
          // 0x43a6ab: start action 1 (consume item while waiting)
          const s = regs.esi >>> 0;
          heap.setU8((s + 0x71) >>> 0, 1);   // mov byte [esi+0x71],1
          heap.setU8((s + 0x72) >>> 0, 0);   // mov byte [esi+0x72],0
          heap.setU8((s + 0x70) >>> 0, 0);   // mov byte [esi+0x70],0
          callNative(0x43c60b, []);          // action-sprite refresh
          callNative(0x5e53ca, []);          // invalidate
          // 0x43a6c1: jmp 0x43a709
        }
        // 0x43a6a9: jmp 0x43a709
      }
    } else {
      // --- empty-handed: impatience rand gates ---
      // 0x43a6c3: cmp word [esi+0x7a],0x7d0 ; jb 0x43a6ec
      if (heap.u16(((regs.esi >>> 0) + 0x7a) >>> 0) >= 0x7d0) {
        callNative(0x5df40c, []);            // rand -> eax
        // 0x43a6d0: cmp ax,0x77 ; ja 0x43a6ec
        if ((regs.eax & 0xffff) <= 0x77) {
          const s = regs.esi >>> 0;
          heap.setU8((s + 0x71) >>> 0, 1);
          heap.setU8((s + 0x72) >>> 0, 0);
          heap.setU8((s + 0x70) >>> 0, 0);
          callNative(0x43c60b, []);
          callNative(0x5e53ca, []);
        }
      }
      // 0x43a6ec: cmp word [esi+0x7a],0xdac ; jb 0x43a709
      if (heap.u16(((regs.esi >>> 0) + 0x7a) >>> 0) >= 0xdac) {
        callNative(0x5df40c, []);            // rand -> eax
        // 0x43a6f9: cmp ax,0x5d ; ja 0x43a709
        if ((regs.eax & 0xffff) <= 0x5d) {
          // 0x43a6ff: mov al,0x12 ; 0x43a701: mov ah,[esi+0x68]  (PARTIAL)
          regs.eax = ((regs.eax & 0xffff0000) |
                      (heap.u8(((regs.esi >>> 0) + 0x68) >>> 0) << 8) |
                      0x12) >>> 0;
          callNative(0x440fe3, []);          // insert peep thought
        }
      }
    }

    // === 0x43a709 join ===
    // cmp word [esi+0x7a],0x10cc ; jb 0x43a726 (ret)
    if (heap.u16(((regs.esi >>> 0) + 0x7a) >>> 0) < 0x10cc) return;
    // 0x43a711: cmp byte [esi+0x3a],0x41 ; ja 0x43a726 (happy enough -> ret)
    if (heap.u8(((regs.esi >>> 0) + 0x3a) >>> 0) > 0x41) return;
    callNative(0x5df40c, []);                // rand -> eax
    // 0x43a71c: cmp ax,0x888 ; jb 0x43a62d (give up) ; else 0x43a726 ret
    if ((regs.eax & 0xffff) >= 0x888) return;
    giveUpQueuing(heap);
    return;
  }

  // 0x43a622: cmp word [esi+0x74],0xffff ; je 0x43a727
  if (heap.u16(((regs.esi >>> 0) + 0x74) >>> 0) === 0xffff) {
    // 0x43a727: end of queue chain — destination reset, state <- 2
    heap.setU8(((regs.esi >>> 0) + 0x36) >>> 0, 0); // mov byte [esi+0x36],0
    callNative(0x44142c, []);
    heap.setU8(((regs.esi >>> 0) + 0x2b) >>> 0, 2); // state <- 2
    callNative(0x441452, []);
    heap.setU8(((regs.esi >>> 0) + 0x2c) >>> 0, 0); // sub-state <- 0
    return;                                          // 0x43a73d: ret
  }

  // fall through to 0x43a62d
  giveUpQueuing(heap);
}
