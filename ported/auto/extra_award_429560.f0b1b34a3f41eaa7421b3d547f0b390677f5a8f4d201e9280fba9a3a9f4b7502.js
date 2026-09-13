// @manual — do not regenerate.
//
// FUN_extra_award_429560 — award-eligibility scan, block 0 of the award
// dispatcher 0x429502 (`jmp [ebx*4 + 0x429544]`, ebx = award index). This
// is award index 0 ("tidiest park": grant when few untidy/vandalised
// guests relative to the guest count). It is the only award block the
// title/scenario soak ever dispatches (the other six 0x4295e5..0x4297cb
// stay bridged, unexercised); it was the top remaining per-call
// interpreter consumer (~1183 steps/call, 1 call/tick) reached entirely
// inside the x86 interpreter via the dispatcher's indirect jump.
//
// CODESEG body: block 0x429560..0x4295e0 + the two SHARED tails it falls
// into — grant 0x429837..0x429876 and decay 0x429877..0x42989f (ret). No
// Ghidra C (it's an extra entry). Transcribed instruction-by-instruction
// from the capstone disassembly (CODESEG file off = va-0x41c000+0x1a600).
//
// Structure (verified):
//   block 0 @0x429560:
//     for i in 0..3: award_timer[i] = u16[0x87d738 + i*4],
//                    award_type[i]  = u16[0x87d73a + i*4]
//       if timer != 0 && type == 1  -> goto decay (award already active)
//     dx = 0   (count of untidy/vandal/sick guests)
//     si = u16[0x87c398]  (guest sprite list head; -1 = none)
//     while si != -1:
//       p = (si<<8) + 0x743b94
//       if u8[p+0x2e]==0 && u8[p+0x2a]==0 && u8[p+0xb2]<=5:
//         t = u8[p+0xb0]; if t in {0x1a,0x1f,0x21}: dx++
//       si = u16[p+4]
//     threshold = u16[0x87c81c] >> 4   (guest count / 16)
//     if dx <= threshold -> goto decay (not enough → no award)
//     else               -> goto grant
//   grant @0x429837:
//     for i in 0..3: if award_timer[i]==0 -> slot=i; goto fill
//     goto decay  (no free slot)
//     fill: award_timer[i]=5; award_type[i]=bx(award index)
//           al=8; ecx=0; bx += 0xb2a; call 0x42c711   (post award news item)
//           al=0x1b; bx=0; call 0x5e5301              (sound/news event)
//           (falls through to decay)
//   decay @0x429877:
//     for i in 0..3: if award_timer[i]!=0:
//                      if --award_timer[i] == 0: al=0x1b; bx=0; call 0x5e5301
//     ret
//
// award_timer[i] = u16[0x87d738 + i*4]  (stride 4, four entries)
// award_type[i]  = u16[0x87d73a + i*4]
//
// The two callees (0x42c711 award-news, 0x5e5301 sound/news event) read
// register args (al/ecx/bx and al/bx respectively) and have many other
// callers; they're delegated through the bridge interpreter (callNative)
// with registers staged binary-exactly so the port can't introduce a
// translator-bug divergence in them. The register threading between the
// two calls (mov al,/mov bx, are byte/word writes that PRESERVE the
// surrounding halves) is modeled exactly on the shared `regs` object.
//
// Oracle: tools/_lockstep-429560.mjs — per-call whole-heap + exit-register
// compare vs the interpreter from identical entry state (calls=N
// memMis=0); dual whole-heap soak (tools/_dualsoak-429560.mjs, JS vs
// __forceInterp429560) byte-identical. Title + gameplay accuracy gates
// stay 0/307200.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callNative } from "../../runtime/painter-bridge.js";

const AWARD_TIMER = 0x0087d738; // u16[i*4]
const AWARD_TYPE = 0x0087d73a;  // u16[i*4]
const GUEST_HEAD = 0x0087c398;  // u16
const PEEP_BASE = 0x00743b94;
const GUEST_COUNT = 0x0087c81c; // u16

// Shared grant tail (0x429837): try to claim a free award slot for award
// index `awardIndex` (= entry ebx), then post the news item + event.
// Always falls through to the decay tail.
function grant(heap, awardIndex) {
  let slot = -1;
  for (let i = 0; i < 4; i++) {
    if (heap.u16(AWARD_TIMER + i * 4) === 0) { slot = i; break; }
  }
  if (slot >= 0) {
    heap.setU16(AWARD_TIMER + slot * 4, 5);
    heap.setU16(AWARD_TYPE + slot * 4, awardIndex & 0xffff);

    // mov al,8 ; xor ecx,ecx ; add bx,0xb2a ; call 0x42c711
    regs.eax = (regs.eax & 0xffffff00) | 0x08;
    regs.ecx = 0;
    regs.ebx = (regs.ebx & 0xffff0000) | ((awardIndex + 0xb2a) & 0xffff);
    callNative(0x42c711, []);

    // mov al,0x1b ; mov bx,0 ; call 0x5e5301
    regs.eax = (regs.eax & 0xffffff00) | 0x1b;
    regs.ebx = regs.ebx & 0xffff0000;
    callNative(0x5e5301, []);
  }
  decay(heap);
}

// Shared decay tail (0x429877): age every active award; fire the event
// when one expires.
function decay(heap) {
  for (let i = 0; i < 4; i++) {
    const a = AWARD_TIMER + i * 4;
    const t = heap.u16(a);
    if (t === 0) continue;
    const nt = (t - 1) & 0xffff;
    heap.setU16(a, nt);
    if (nt === 0) {
      // mov al,0x1b ; mov bx,0 ; call 0x5e5301
      regs.eax = (regs.eax & 0xffffff00) | 0x1b;
      regs.ebx = regs.ebx & 0xffff0000;
      callNative(0x5e5301, []);
    }
  }
}

/**
 * Award block 0 ("tidiest park").
 * @param {Heap} heap
 */
export function FUN_extra_award_429560(heap) {
  const awardIndex = regs.ebx & 0xffff; // dispatcher set ebx = award index (0)

  // Entry gate: this award is already active in some slot → decay only.
  for (let i = 0; i < 4; i++) {
    if (heap.u16(AWARD_TIMER + i * 4) === 0) continue;
    if (heap.u16(AWARD_TYPE + i * 4) === 1) { decay(heap); return; }
  }

  // Count untidy/vandalising/sick guests (peep type 0x1a/0x1f/0x21) that
  // are alive (+0x2e == 0), not in a ride (+0x2a == 0), low energy band
  // (+0xb2 <= 5).
  let count = 0;
  let si = heap.u16(GUEST_HEAD);
  while (si !== 0xffff) {
    const p = ((si << 8) + PEEP_BASE) >>> 0;
    if (heap.u8(p + 0x2e) === 0 && heap.u8(p + 0x2a) === 0 && heap.u8(p + 0xb2) <= 5) {
      const t = heap.u8(p + 0xb0);
      if (t === 0x1a || t === 0x1f || t === 0x21) count = (count + 1) & 0xffff;
    }
    si = heap.u16(p + 4);
  }

  const threshold = (heap.u16(GUEST_COUNT) >>> 4) & 0xffff;
  if (count <= threshold) {
    decay(heap);
  } else {
    grant(heap, awardIndex);
  }
}
