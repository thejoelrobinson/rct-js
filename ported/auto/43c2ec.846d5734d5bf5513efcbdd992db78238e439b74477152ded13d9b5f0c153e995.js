// @manual — do not regenerate.
// NO decompiled C exists for this function: 0x43c2ec is the peep RIDE
// sub-state 9 handler ("walk to ride platform / approach"), entry 9 of the
// state-4 sub-state table at DATASEG 0x62d50c (see ported/auto/43a74b.js,
// which bridges the table's tail-jmp). Hand-transcribed from asm:
//   python3 tools/disasm-va.py 0x43c2ec 0x43c383   (own body; 0x43c383 is
//   the NEXT table entry's body, not part of this fn)
//
// Entry contract: ESI = peep sprite ptr (EDI = sub-state from the 43a74b
// movzx). The harness simulates the final ret.
//
// Body — a sequencer over five callees, all delegated via callNative (raw
// interpreter on the bridge cpu, full register file synced in/out):
//   call 0x43c49e            ; movement-toward-target step -> exit CF
//   jae ARRIVED              ; CF=0 -> reached the target point
//   ; still moving:
//   call 0x5e53ca            ; sprite bbox invalidate
//   cmp bp,0x10 ; jb LOW     ; bp = 43c49e's exit z-delta (low16 of ebp)
//   ; bp >= 0x10 (on/above platform): dx = platform-height word —
//   ;   ([station+rideOff+0x887452]<<2) + [ [rideType]*8 + 0x5f5d04 ]
//   ;   (16-bit adds; movzx dx/bx are 16-bit dests, upper edx preserved)
//   call 0x444927 ; call 0x5e53ca ; ret       (relink at platform height)
//   LOW: push eax ; al=0 ; call 0x43c698 ; pop eax   (sub-position helper)
//   dx = [esi+0x12] ; call 0x444927 ; call 0x5e53ca
//   ; NO ret here — the LOW path FALLS THROUGH into ARRIVED (0x43c34d has
//   ; no terminator; the first port returned here, caught by lockstep)
//   ARRIVED (0x43c34e, jae target AND LOW fallthrough): rideOff = [esi+0x68]*0x260
//   test [rideOff+0x887422],0x20 ; je DONE    ; ride flag: on-ride photo
//     al=3 ; ah=[esi+0x68] ; movzx ecx,word [rideOff+0x887564] (FULL ecx)
//     push edi ; call 0x441a10 ; pop edi      ; charge/award -> exit CF
//     jb DONE ; inc dword [rideOff+0x887578]  ; CF=0 -> count the photo
//   DONE: [esi+0x2c] = 0x12 ; ret             ; next sub-state
//
// Flag-across-call notes (the 43a5f8 lesson applied): both conditional
// branches read the CALLEE's exit CF, taken live from
// state.__painterCpu.eflags.CF after callNative (the interpreter leaves the
// callee's exit flags on the cpu; no inference from registers).
//
// Register exactness:
//   - [esi+0x68]/imul and the two movzx-into-full-registers (edi/ecx) are
//     full 32-bit writes; movzx dx/bx are 16-bit (upper halves preserved,
//     replicated by masking the LIVE regs values);
//   - eax around 0x43c698 is push/pop'd (al=0 is a byte write on the live
//     eax first); everywhere else exit regs = last callee's exit file;
//   - edi is push/pop'd around 0x441a10 (restored to rideOff).
//
// Oracle: ADDR=0x43c2ec tools/_lockstep-auto.mjs (organic crossings ~1/tick
// in sc21) behind __forceInterp43c2ec.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { callNative } from "../../runtime/painter-bridge.js";

const cpuCF = () => (state.__painterCpu ? state.__painterCpu.eflags.CF : 0);

export function FUN_0043c2ec(heap) {
  // 0x43c2ec: call 0x43c49e (movement step) ; jae 0x43c34e
  callNative(0x43c49e, []);
  if (cpuCF() !== 0) {
    // ---- CF=1: stepped this tick ----
    callNative(0x5e53ca, []);                                  // invalidate
    // cmp bp,0x10 ; jb 0x43c337 — unsigned, on the live bp (43c49e's exit
    // z-delta, passed through 5e53ca exactly as in the binary).
    if ((regs.ebp & 0xffff) >= 0x10) {
      // still well below/above: relink at platform height and RET (0x43c336)
      const esi = regs.esi >>> 0;
      const rideOff = (heap.u8((esi + 0x68) >>> 0) * 0x260) >>> 0;
      regs.edi = rideOff;
      const station = heap.u8((esi + 0x69) >>> 0);
      regs.ebx = station >>> 0;                                // movzx ebx (full)
      let dx = (heap.u8((station + rideOff + 0x887452) >>> 0) << 2) & 0xffff;
      const rideType = heap.u8((rideOff + 0x887420) >>> 0);
      regs.ebx = rideType >>> 0;                               // movzx ebx (full)
      const bx2 = heap.u8((rideType * 8 + 0x5f5d04) >>> 0);
      regs.ebx = ((regs.ebx & 0xffff0000) | bx2) >>> 0;        // movzx bx (16-bit)
      dx = (dx + bx2) & 0xffff;                                // add dx,bx
      regs.edx = ((regs.edx & 0xffff0000) | dx) >>> 0;
      callNative(0x444927, []);                                // sprite relink
      callNative(0x5e53ca, []);
      return;                                                  // 0x43c336 ret
    }
    // ---- 0x43c337: within 0x10 of the platform — final positioning, then
    // FALL THROUGH into the arrival block (NO ret at 0x43c34d; the first
    // port version returned here — caught by the 60-tick lockstep, 2/34
    // memMis with [esi+0x2c] stuck at 9). ----
    const savedEax = regs.eax >>> 0;                           // push eax
    regs.eax = (regs.eax & 0xffffff00) >>> 0;                  // mov al,0
    callNative(0x43c698, []);
    regs.eax = savedEax;                                       // pop eax
    regs.edx = ((regs.edx & 0xffff0000)
              | heap.u16(((regs.esi >>> 0) + 0x12) >>> 0)) >>> 0; // mov dx,[esi+0x12]
    callNative(0x444927, []);
    callNative(0x5e53ca, []);
    // falls through
  }

  // ---- ARRIVED @0x43c34e (jae target AND fallthrough from 0x43c337) ----
  const esi = regs.esi >>> 0;
  const rideOff = (heap.u8((esi + 0x68) >>> 0) * 0x260) >>> 0;
  regs.edi = rideOff;                                          // movzx+imul (full)
  if ((heap.u16((rideOff + 0x887422) >>> 0) & 0x20) !== 0) {
    // on-ride-photo flag: al=3; ah=ride; ecx=price word; call 0x441a10
    regs.eax = ((regs.eax & 0xffff0000) | (heap.u8((esi + 0x68) >>> 0) << 8) | 3) >>> 0;
    regs.ecx = heap.u16((rideOff + 0x887564) >>> 0) >>> 0;     // movzx ecx (FULL)
    const savedEdi = regs.edi >>> 0;                           // push edi
    callNative(0x441a10, []);
    regs.edi = savedEdi;                                       // pop edi
    if (cpuCF() === 0) {                                       // jb DONE not taken
      const a = (savedEdi + 0x887578) >>> 0;
      heap.setU32(a, (heap.u32(a) + 1) >>> 0);                 // inc dword
    }
  }
  heap.setU8(((regs.esi >>> 0) + 0x2c) >>> 0, 0x12);           // sub-state <- 0x12
  // 0x43c382 ret
}
