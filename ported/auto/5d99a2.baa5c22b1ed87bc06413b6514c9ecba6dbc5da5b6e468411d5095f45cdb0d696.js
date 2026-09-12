// @manual — do not regenerate.
// NO decompiled C exists for this function: 0x5d99a2 is vehicle status 1
// ("waiting for passengers at station"), slot 1 of the per-vehicle state
// dispatch vtable PTR_LAB_005d97b4, reached from the sprite-update walk in
// FUN_005d94b6 (`call [edi*4+0x5d97b4]`, edi = [esi+0x50]). Hand-transcribed
// from asm:
//   python3 tools/disasm-va.py 0x5d99a2 0x5d9c95   (own body; 0x5d9c95 is
//   vtable slot 2's body, not part of this fn)
// Shared tails: 0x5db333 = `call 0x5e53ca ; ret`, 0x5db338 = `ret`.
//
// Entry contract (staged by FUN_005d94b6 at 0x5d951f..0x5d952c):
//   ESI = vehicle sprite ptr (pool 0x743b94, stride 0x100)
//   DL  = ride status byte [rideOff+0x887424], DH = [esi+0x51] sub-state
//   EDI = [esi+0x50] (the fn re-derives edi = [esi+0x30]*0x260 itself)
// The harness's simulated ret performs the final `ret`.
//
// Structure — a dh-dispatched sequencer (all three arms bounded):
//   dh==0 (0x5d99b7): arrive-at-station — call 0x5d89c0 (exit CF), claim the
//     station boarding slot [station+rideOff+0x88745e], sub-state<-1,
//     wait-timer [esi+0xc0]<-0, tail 0x5db333 (0x5e53ca invalidate).
//   dh==1 (0x5d9a0a): the HOT path (~65 interp steps/call, 2 calls/tick in
//     sc21; 100% of organic crossings over a 120-tick probe — see ADDENDUM
//     72): saturating-inc wait timer, clear [esi+0x48] bit 4, sum the car
//     chain's peep/next-free-seat/mass bytes ([car+0xb3/b4/b2]) into
//     [0x65e6b4/b5/b6], then the depart-decision ladder (min/max-wait,
//     leave-if-another-train-arrives scan over the 12 train slots, load
//     fraction) optionally setting [esi+0x48] bit 4, and the full-load gate.
//     Trains that stay waiting exit via the plain ret at 0x5db338 — NO
//     sub-calls at all on this path. The rare depart continuation at
//     0x5d9bd8 (slot release, sub-state 2 / abort to state 6, call
//     0x5db5d7) runs via the embedded interpreter from a CHECKPOINT (below).
//   dh else (0x5d9c5c): post-boarding transition — call 0x5d88ec (exit CF),
//     state<-2, bit-2 mirror of the ride's synchronise-with-adjacent flag,
//     call 0x5db5d7, ret.
//
// Routing (the 444e08 orchestrator pattern — the guard lives INSIDE the fn
// because the lockstep oracle invokes it directly, bypassing wiring):
//   - dh==1 up to the depart gate: pure JS (the organically-hit path).
//   - dh==1 depart continuation: embedded interp from checkpoint 0x5d9bd8.
//     The only live-in register there is ESI (0x5d9bd8 immediately
//     re-derives edi and writes ecx before reading them; verified by
//     disasm), but ALL tracked registers are staged anyway so callee stack
//     spills (0x5db5d7's pushal) are byte-identical to the truth leg.
//   - dh!=1: embedded interp from the entry (byte-exact real bytes; these
//     arms have 0 organic crossings in sc21 soaks).
//
// Register exactness on the JS path (exit registers feed the caller's
// resume at 0x5d9533, which does partial-width writes over them):
//   - `xor ax,ax` / `xor cl,cl` are 16-/8-bit (upper halves of entry
//     eax/ecx preserved); al/ah/cl/ch tracked through the byte sums and the
//     load-fraction shifts; ah is CLOBBERED by the other-train scan
//     ([other+0x50] / [other+0x4b]) exactly as in the binary.
//   - `mov bp,...` / `movzx bp,...` are 16-bit dests (upper half of the
//     live ebp preserved); `movzx ebp,...` full-width — mirrored per-site.
//   - ebx is written only by the other-train scan (exit value 0xc, or the
//     matching slot index); otherwise entry ebx flows through.
//   - edx/esi are never written.
//
// Oracle: ADDR=0x5d99a2 FORCE=__forceInterp5d99a2 tools/_lockstep-auto.mjs.
// Depart-path coverage needs POKE=743c48=0,744848=0 (zero the two trains'
// [car+0xb4] next-free-seat byte so the full-load gate al==[0x65e6b5]
// passes) — organic soaks never depart (peeps don't board ride 0 in sc21).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { getEipHook, setEipHook, clearEipHook, step } from "../../harness/x86.js";

const ADDR = 0x5d99a2;

// Byte-exact interpreter run of the real binary body from `startEip` on the
// current cpu state, with any eip hook at ADDR lifted (in the lockstep
// oracle that is the oracle's own hook; in production it is this port's
// installJsFnEipHook wrapper). Stop rule: halt AT the top-level ret
// (esp==entry && opcode C3/C2) and let the harness's simulated ret perform
// it (the ADDENDUM 59 oracle-integrity rule).
function runInterpFrom(heap, cpu, startEip) {
  const self = getEipHook(ADDR);
  if (self) clearEipHook(ADDR);
  const entryEsp = cpu.regs.esp >>> 0;
  cpu.regs.eip = startEip >>> 0;
  let n = 0;
  try {
    while (!((cpu.regs.esp >>> 0) === entryEsp && (cpu.regs.eip >>> 0) < heap.bytes.length
             && (heap.u8(cpu.regs.eip >>> 0) === 0xc3 || heap.u8(cpu.regs.eip >>> 0) === 0xc2))) {
      if (!step(cpu)) break;
      if (++n > 50_000_000) throw new Error("5d99a2: interp fallback step limit");
    }
  } finally {
    if (self) setEipHook(ADDR, self);
  }
}

// Mirror translator cells -> cpu, run the embedded interpreter from
// startEip, reposition the cpu for the harness's simulated ret (the 444e08
// finally-reposition pattern), and sync exit registers back.
function interpLeg(heap, startEip) {
  const cpu = state.__painterCpu;
  if (!cpu) throw new Error("5d99a2: painter-bridge cpu not installed");
  cpu.regs.eax = regs.eax >>> 0; cpu.regs.ebx = regs.ebx >>> 0;
  cpu.regs.ecx = regs.ecx >>> 0; cpu.regs.edx = regs.edx >>> 0;
  cpu.regs.esi = regs.esi >>> 0; cpu.regs.edi = regs.edi >>> 0;
  cpu.regs.ebp = regs.ebp >>> 0;
  if (typeof regs.esp === "number") cpu.regs.esp = regs.esp >>> 0;
  const entryEsp = cpu.regs.esp >>> 0;
  const entryEip = cpu.regs.eip >>> 0;
  const entryCD = cpu.callDepth;
  try {
    runInterpFrom(heap, cpu, startEip);
  } finally {
    cpu.regs.esp = entryEsp;
    cpu.regs.eip = entryEip;
    cpu.callDepth = entryCD;
  }
  regs.eax = cpu.regs.eax >>> 0; regs.ebx = cpu.regs.ebx >>> 0;
  regs.ecx = cpu.regs.ecx >>> 0; regs.edx = cpu.regs.edx >>> 0;
  regs.esi = cpu.regs.esi >>> 0; regs.edi = cpu.regs.edi >>> 0;
  regs.ebp = cpu.regs.ebp >>> 0;
}

const bumpPath = (p) => {
  const m = globalThis.__dbg5d99a2;
  if (m) m.set(p, (m.get(p) || 0) + 1);
};

export function FUN_005d99a2(heap) {
  const dh = (regs.edx >>> 8) & 0xff;
  if (dh !== 1) {
    // dh==0 arrive / dh>=2 post-boarding — cold arms, byte-exact real bytes.
    bumpPath(dh === 0 ? "interpDh0" : "interpDhElse");
    interpLeg(heap, ADDR);
    return;
  }

  // ---- dh==1: waiting-for-passengers (pure JS transcription) ----
  bumpPath("jsDh1");
  const esi = regs.esi >>> 0;
  heap.setU32((esi + 0x28) >>> 0, 0);                          // accel <- 0
  const edi = (heap.u8((esi + 0x30) >>> 0) * 0x260) >>> 0;     // ride offset

  // 0x5d9a0a: inc word [esi+0xc0], saturating at 0xffff
  let timer = (heap.u16((esi + 0xc0) >>> 0) + 1) & 0xffff;
  if (timer === 0) timer = 0xffff;                             // jne/dec pair
  heap.setU16((esi + 0xc0) >>> 0, timer);
  // and word [esi+0x48],0xffef — clear the depart-ready bit
  heap.setU16((esi + 0x48) >>> 0, heap.u16((esi + 0x48) >>> 0) & 0xffef);

  // xor ax,ax ; xor cl,cl (16-/8-bit: upper halves preserved)
  let al = 0, ah = 0;
  let cl = 0, ch = (regs.ecx >>> 8) & 0xff;
  let ebx = regs.ebx >>> 0;
  // mov bp,[esi+0xa] (16-bit dest)
  let ebp = (((regs.ebp & 0xffff0000) >>> 0) | heap.u16((esi + 0xa) >>> 0)) >>> 0;

  // 0x5d9a28 car-chain sum: al+=peeps, ah+=next-free-seat, cl+=mass byte
  {
    let bp = ebp & 0xffff;
    let carPtr = 0;
    do {
      carPtr = ((bp << 8) + 0x743b94) >>> 0;                   // movzx/shl/add (full ebp)
      al = (al + heap.u8((carPtr + 0xb3) >>> 0)) & 0xff;
      ah = (ah + heap.u8((carPtr + 0xb4) >>> 0)) & 0xff;
      cl = (cl + heap.u8((carPtr + 0xb2) >>> 0)) & 0xff;
      bp = heap.u16((carPtr + 0x3e) >>> 0);                    // mov bp (16-bit)
    } while (bp !== 0xffff);
    ebp = (((carPtr & 0xffff0000) >>> 0) | 0xffff) >>> 0;
  }
  heap.setU8(0x65e6b4, al);                                    // total peeps
  heap.setU8(0x65e6b5, ah);                                    // total next-free-seat
  cl &= 0x7f;
  heap.setU8(0x65e6b6, cl);                                    // total mass (&0x7f)

  // 0x5d9a64: movzx ebp, ride type (full width)
  ebp = heap.u8((edi + 0x887420) >>> 0) >>> 0;
  const typeFlags = heap.u32((ebp * 8 + 0x5f5b78) >>> 0) >>> 0;

  // Depart-decision ladder. go: "" = keep falling, "set" -> 0x5d9ba2
  // (or [esi+0x48],0x10), "full" -> 0x5d9ba7 (skip the bit set).
  let go = "";
  if (!(typeFlags & 0x800)) {
    // 0x5d9a78: cmp word [esi+0xc0],0x14 ; jb FULLCHECK
    if (heap.u16((esi + 0xc0) >>> 0) < 0x14) go = "full";
  } else if (heap.u8(0x65e6b4) === 0) {
    // 0x5d9a93 (only when typeFlags&0x800): no peeps aboard -> FULLCHECK
    go = "full";
  }
  if (go === "" && (typeFlags & 0x4000) !== 0) {
    const dep = heap.u8((edi + 0x887496) >>> 0);
    if (dep & 0x40) {
      // 0x5d9ab6: minimum-wait gate (movzx bp/imul bp are 16-bit dests;
      // ebp upper half is 0 here from the full-width ride-type movzx)
      const bp16 = (heap.u8((edi + 0x88749e) >>> 0) * 0x20) & 0xffff;
      ebp = (((ebp & 0xffff0000) >>> 0) | bp16) >>> 0;
      if (bp16 > heap.u16((esi + 0xc0) >>> 0)) go = "full";    // ja
    }
    if (go === "" && (dep & 0x80) !== 0) {
      // 0x5d9ad8: maximum-wait gate
      const bp16 = (heap.u8((edi + 0x88749f) >>> 0) * 0x20) & 0xffff;
      ebp = (((ebp & 0xffff0000) >>> 0) | bp16) >>> 0;
      if (bp16 < heap.u16((esi + 0xc0) >>> 0)) go = "set";     // jb
    }
  }
  if (go === "") {
    const dep = heap.u8((edi + 0x887496) >>> 0);
    if (dep & 0x10) {
      // 0x5d9afc: leave-when-another-train-arrives — scan the 12 train
      // slots for a different train in status 6/0 at the same station.
      // ah is clobbered here exactly as in the binary.
      ebx = 0;
      for (; ebx < 0xc; ebx++) {
        const bp16 = heap.u16((edi + ebx * 2 + 0x88747e) >>> 0);
        ebp = (((ebp & 0xffff0000) >>> 0) | bp16) >>> 0;       // mov bp (16-bit)
        if (bp16 === 0xffff) continue;
        if (bp16 === heap.u16((esi + 0xa) >>> 0)) continue;
        const other = ((bp16 << 8) + 0x743b94) >>> 0;          // movzx ebp (full)
        ebp = other;
        ah = heap.u8((other + 0x50) >>> 0);                    // mov ah,[ebp+0x50]
        if (ah === 6 || ah === 0) {
          ah = heap.u8((other + 0x4b) >>> 0);                  // mov ah,[ebp+0x4b]
          if (ah === heap.u8((esi + 0x4b) >>> 0)) { go = "set"; break; }
        }
      }
    }
    if (go === "") {
      // 0x5d9b37: load-fraction gate
      ebp = heap.u8((edi + 0x887420) >>> 0) >>> 0;             // movzx ebp (full)
      if (!(typeFlags & 0x4000) || !(heap.u8((edi + 0x887496) >>> 0) & 8)) {
        go = "set";
      } else {
        al = heap.u8(0x65e6b4);
        cl = heap.u8(0x65e6b6);
        ah = heap.u8((edi + 0x887496) >>> 0) & 7;              // load fraction 0..4
        if (al === cl) go = "set";
        else if (ah === 3) go = "full";
        else {
          // mov ch,cl ; shr ch,1 ; add ch,cl ; shr ch,1 (~3/4 of cl);
          // je skips the compare when the SECOND shr result is 0
          ch = cl >> 1;
          ch = ((ch + cl) & 0xff) >> 1;
          if (ch !== 0 && al >= ch) go = "set";
          if (go === "") {
            if (ah === 2) go = "full";
            else {
              cl = cl >> 1;                                    // half
              if (cl !== 0 && al >= cl) go = "set";
              if (go === "") {
                if (ah === 1) go = "full";
                else {
                  cl = cl >> 1;                                // quarter
                  if (cl !== 0 && al >= cl) go = "set";
                  // 0x5d9b99: cmp ah,0 ; je FULL — AND THEN 0x5d9b9e:
                  // or al,al ; je FULL. TWO independent ways to reach the
                  // ready path; only the fallthrough (ah!=0 AND al!=0) sets
                  // the bit. Dropping the `or al,al` test cost 30/60 lockstep
                  // calls (ah=4, al=0: JS set the bit, binary did not).
                  if (go === "") go = (ah === 0 || al === 0) ? "full" : "set";
                }
              }
            }
          }
        }
      }
    }
  }
  // 0x5d9ba2 SETBIT4
  if (go === "set") heap.setU16((esi + 0x48) >>> 0, heap.u16((esi + 0x48) >>> 0) | 0x10);

  // 0x5d9ba7 FULLCHECK
  al = heap.u8(0x65e6b4);
  const syncOut = () => {
    regs.eax = (((regs.eax & 0xffff0000) >>> 0) | (ah << 8) | al) >>> 0;
    regs.ecx = (((regs.ecx & 0xffff0000) >>> 0) | (ch << 8) | cl) >>> 0;
    regs.ebx = ebx >>> 0;
    regs.ebp = ebp >>> 0;
    regs.edi = edi >>> 0;
    // edx/esi never written
  };
  if (al !== heap.u8(0x65e6b5)) { syncOut(); return; }         // jne -> ret (keep waiting)

  // 0x5d9bb8: single-train + not-closing rides need the ready bit
  if (heap.u8((edi + 0x887441) >>> 0) === 1
      && !(heap.u16((edi + 0x887422) >>> 0) & 0x80)) {
    if (!(heap.u16((esi + 0x48) >>> 0) & 0x10)) { syncOut(); return; } // je -> ret
  }

  // 0x5d9bd8 — depart continuation (slot release, sub-state 2 / abort to
  // state 6, call 0x5db5d7): CHECKPOINT into the embedded interpreter.
  // Only ESI is live-in there, but all tracked registers are staged (via
  // syncOut) so callee stack spills match the truth leg byte-for-byte.
  bumpPath("interpDepart");
  syncOut();
  interpLeg(heap, 0x5d9bd8);
}
