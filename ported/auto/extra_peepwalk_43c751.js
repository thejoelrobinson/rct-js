// @manual — do not regenerate.
//
// FUN_extra_peepwalk_43c751 — peep walking-movement core (binary
// 0x43c751..0x43d38a). Called from the walking-state handler 0x439b86
// (JS port extra_peepstate_439b86.js) and, natively, from other bridged
// peep-state handlers. Previously interpreter-delegated whole
// (callNative); ranked #1 gameplay interpreter consumer after the
// painter campaign (8,674 steps/tick, ~434 steps/call).
//
// ported/auto/43c751.js is a parse-fail throw stub (the 707-line Ghidra
// C never translated, and contains known decompilation artifacts —
// _DAT overlap warnings, extraout plumbing). This port is transcribed
// from the capstone disassembly (CODESEG file off = va-0x41c000+0x1a600),
// NOT from the C. Structure:
//
//   1. queue-follow gate ([esi+0x2b]==6): distance to the peep ahead
//      ([esi+0x74] sprite) — close enough → stand in place (43c84c),
//      with the direction-quadrant jumptable at 0x43c80c.
//   2. movement step via 43c49e (inlined below as step43c49e: advance
//      x/y one step toward [esi+0x32/34], walk-frame animation, action
//      animation incl. the vomit effect block). CF=0 = target reached →
//      dispatch the per-peep-type motion handler PTR [0x62d3fc + type*4]
//      (0x43d5a0 guest / 0x4565f8 staff — interpreter-delegated, CF and
//      registers round-tripped via callNative + state.__painterCpu).
//   3. same-tile move → 43c8b4 (43d38b z-fixup, delegated + 5e53ca /
//      444927 / 5e53ca, JS).
//   4. tile-crossing: map-edge check, tile-element scan for PATH (4) /
//      TRACK (8, walk-in shops) / ENTRANCE (0x10) in the height window
//      [z/4-5 .. z/4+1]; fall-off-path branch via 423677 (surface
//      height, delegated) + 425432 (inlined).
//   5. PATH entry (43cfd3): vandalism flag, 42547b walkability check
//      (inlined), queue join via 43e304 (delegated, CF consumed),
//      ride/queue bookkeeping (xchg head + count + [esi+0x74] chain),
//      and the guest perception block (vandalism/crowd/litter thought
//      trio with the 0x991f8e sprite-quadrant scan).
//   6. TRACK entry: walk-in shop ride-type flag 0x20000; pay path adds
//      [0x887508+ride*0x260] to ride takings + 4405f3 (delegated).
//   7. ENTRANCE entry: park entrance flag bits in [0x62d3f4]; ride
//      entrance queue join; park gate pay logic ([0x87c3c0] fee,
//      voucher bits [esi+0xca]&0x4000) with the pay-gate path scan.
//
// REGISTER FIDELITY: the binary's exact register dataflow (incl. 16-bit
// ops preserving high halves) is mirrored on the shared `regs` cells via
// lo8/hi8/lo16 — delegated callees (43e304, motion handlers, 43d38b,
// 423677, 42e062, 452fce, 42c711, 4405f3) receive and return their
// binary-exact register state through callNative's round-trip; CF comes
// from state.__painterCpu.eflags.CF. JS callees whose binary bodies
// preserve all GPRs (5e53ca pushal, 444927 push eax/ecx/edi, 44142c
// push edi, 441452 push eax/ebx, 43c60b, 43e792, 440fe3 push ecx/ebx,
// 5e5301) run under callPreserved so translated-JS regs pollution can't
// leak. 5df40c (RNG) clobbers eax only, by design.
//
// All exits of the binary function set CF=1 (stc; ret) — callers branch
// on the [0x62d3f4] bits, not CF.
//
// Oracle: tools/_lockstep-43c751.mjs (whole-heap per-call compare vs the
// interpreter, interpreter result kept live) + the
// tools/painter-port-oracle.mjs dual soak (FORCE_INTERP=43c751).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { callNative } from "../../runtime/painter-bridge.js";
import { FUN_0044142c } from "./44142c.js";
import { FUN_00441452 } from "./441452.js";
import { FUN_005df40c } from "./5df40c.js";
import { FUN_0043c60b } from "./43c60b.js";
import { FUN_00444927 } from "./444927.js";
import { FUN_0043e792 } from "./43e792.js";
import { FUN_005e5301 } from "./5e5301.js";
import { FUN_00440fe3 } from "./440fe3.js";
import { FUN_extra_guestmotion_43d5a0 } from "./extra_guestmotion_43d5a0.js";

function rol16(v, n) { n &= 15; return ((v << n) | (v >>> (16 - n))) & 0xffff; }
function ror16(v, n) { n &= 15; return ((v >>> n) | (v << (16 - n))) & 0xffff; }
function abs16(v) { v &= 0xffff; return (v & 0x8000) ? (0x10000 - v) & 0xffff : v; }
function s16(v) { return (v << 16) >> 16; }
const lo16 = (r, v) => { regs[r] = ((regs[r] & 0xffff0000) | (v & 0xffff)) >>> 0; };
const lo8 = (r, v) => { regs[r] = ((regs[r] & 0xffffff00) | (v & 0xff)) >>> 0; };
const hi8 = (r, v) => { regs[r] = ((regs[r] & 0xffff00ff) | ((v & 0xff) << 8)) >>> 0; };

const cpuCF = () => (state.__painterCpu && state.__painterCpu.eflags.CF) ? 1 : 0;

function snapRegs() {
  return { eax: regs.eax, ecx: regs.ecx, edx: regs.edx, ebx: regs.ebx,
           esi: regs.esi, edi: regs.edi, ebp: regs.ebp };
}
function restoreRegs(s) {
  regs.eax = s.eax; regs.ecx = s.ecx; regs.edx = s.edx; regs.ebx = s.ebx;
  regs.esi = s.esi; regs.edi = s.edi; regs.ebp = s.ebp;
}

// Run a JS callee whose binary preserves all GPRs.
function callPreserved(heap, fn) {
  const s = snapRegs();
  const ret = fn(heap);
  restoreRegs(s);
  return ret;
}

// RNG: binary clobbers eax only (push ebx … pop ebx). FUN_005df40c
// stages its result on regs.eax and has NO JS return value — the
// original `regs.eax = callPreserved(...)` piped undefined into eax,
// zeroing every RNG draw on the vomit/perception paths (latent: those
// paths stayed cold in the 43c751 lockstep soak). Caught by the
// 43d5a0 port's lockstep oracle, which draws RNG on every call.
function rand32(heap) {
  const s = snapRegs();
  FUN_005df40c(heap);
  const v = regs.eax >>> 0;
  restoreRegs(s);
  regs.eax = v;
  return v;
}

// === 0x5e53ca — invalidate the sprite's screen bbox in every visible
// window (pushal/popal in the binary: NO register effects). NOT routed
// through ported/auto/5e53ca.js: that translation calls FUN_005e117d
// without staging the rect registers it reads (the clipped screen rect
// the binary computes at 0x5e541c..0x5e547d), so it marks a stale
// dirty-grid rect. The faithful implementation lives in
// extra_invalidate.js (shared with the 43c60b / 5e5301 hand-fixes).
import { invalidateSpriteBbox as invalidateSprite } from "./extra_invalidate.js";

// === inline 0x425432 — "can stand on surface at (ax,cx)?" CF=1 blocked.
// Clobbers nothing (esi pushed/popped in binary); writes [0x991efc]=0x6a9
// on the blocked exit.
function check425432(heap) {
  const ax = regs.eax & 0xffff, cx = regs.ecx & 0xffff;
  if (ax <= 0xfff && cx <= 0xfff) {
    let p = heap.u32(0x971ef4 + ror16(rol16(cx, 7) | ax, 5) * 4) >>> 0;
    while ((heap.u8(p) & 0x3c) !== 0) p = (p + 8) >>> 0;
    if ((heap.u8(p + 7) & 0x20) !== 0) return 0;
  }
  heap.setU16(0x991efc, 0x6a9);
  return 1;
}

// === inline 0x42547b — "can walk at (ax,cx) height dx?" CF=1 blocked.
// Same write-on-fail; preserves edx (binary push/pop).
function check42547b(heap) {
  const ax = regs.eax & 0xffff, cx = regs.ecx & 0xffff, dx = regs.edx & 0xffff;
  if (ax <= 0xfff && cx <= 0xfff) {
    let p = heap.u32(0x971ef4 + ror16(rol16(cx, 7) | ax, 5) * 4) >>> 0;
    while ((heap.u8(p) & 0x3c) !== 0) p = (p + 8) >>> 0;
    if ((heap.u8(p + 7) & 0x20) !== 0) return 0;          // owned land → OK
    if ((heap.u8(p + 7) & 0x10) !== 0) {                  // construction rights
      const h = heap.u8(p + 2);
      const dl = (dx >>> 2) & 0xff;
      if (dl < h) return 0;
      if (((dl - 4) & 0xff) > h) return 0;
      // within the rights band → blocked
    }
  }
  heap.setU16(0x991efc, 0x6a9);
  return 1;
}

// === inline 0x43c49e — advance one movement/animation step. Returns CF:
// 1 = stepped (ax/cx = new coords), 0 = target point reached. Mirrors the
// binary's exit register state exactly (the CF=0 exit feeds the motion
// handler's entry registers).
function step43c49e(heap) {
  const esi = regs.esi >>> 0;
  heap.setU8(0x6293d8, heap.u8(esi + 0x70));
  lo8("eax", heap.u8(esi + 0x70));
  if (heap.u8(esi + 0x71) === 0xfe) heap.setU8(esi + 0x71, 0xff);
  // 43c4b0: deltas to the target point [esi+0x32/0x34]
  const dxw = (heap.u16(esi + 0xe) - heap.u16(esi + 0x32)) & 0xffff;
  const dyw = (heap.u16(esi + 0x10) - heap.u16(esi + 0x34)) & 0xffff;
  const adx = abs16(dxw), ady = abs16(dyw);
  const sum = (adx + ady) & 0xffff;
  lo16("eax", dxw); lo16("ebx", adx); lo16("ecx", dyw); lo16("edx", ady); lo16("ebp", sum);
  if (heap.u8(esi + 0x71) >= 0xfe) {
    // walking animation
    lo16("edi", heap.u8(esi + 0x36));
    if (sum <= (regs.edi & 0xffff)) return 0;             // 43c556: target reached, CF=0
    // pick direction (43c4e6)
    let dir;
    if (adx >= ady) dir = (dxw & 0x8000) ? 0x10 : 0;
    else dir = (dyw & 0x8000) ? 8 : 0x18;
    regs.ebx = dir >>> 0;                                 // mov ebx, imm32
    heap.setU8(esi + 0x1e, dir);
    regs.ebx = dir >>> 1;
    lo16("eax", (heap.u16(esi + 0xe) + heap.u16(0x629264 + regs.ebx)) & 0xffff);
    lo16("ecx", (heap.u16(esi + 0x10) + heap.u16(0x629266 + regs.ebx)) & 0xffff);
    // walk-frame advance (43c526)
    regs.ebx = heap.u8(esi + 0xe0);
    regs.edi = heap.u8(esi + 0x2d);
    regs.ebx = (regs.ebx + 1) >>> 0;
    regs.edi = heap.u32(0x62d640 + regs.edi * 8) >>> 0;
    regs.edx = heap.u8(esi + 0x6e);
    regs.edi = heap.u32(regs.edi + regs.edx * 8 + 4) >>> 0;
    if (!((regs.ebx & 0xff) < heap.u8(regs.edi))) regs.ebx = 0;
    heap.setU8(esi + 0xe0, regs.ebx & 0xff);
    lo8("ebx", heap.u8(regs.edi + regs.ebx + 1));
    heap.setU8(esi + 0x70, regs.ebx & 0xff);
    return 1;                                             // 43c554: stc
  }
  // 43c559: action animation in progress
  regs.edi = heap.u8(esi + 0x2d);
  regs.edx = heap.u8(esi + 0x6e);
  regs.edi = heap.u32(0x62d640 + regs.edi * 8) >>> 0;
  regs.edi = heap.u32(regs.edi + regs.edx * 8 + 4) >>> 0;
  heap.setU8(esi + 0x72, (heap.u8(esi + 0x72) + 1) & 0xff);
  regs.ebx = heap.u8(esi + 0x72);
  lo8("ebx", heap.u8(regs.edi + regs.ebx + 1));
  if ((regs.ebx & 0xff) === 0xff) {
    // 43c5ef: action finished
    heap.setU8(esi + 0x70, 0);
    heap.setU8(esi + 0x71, 0xff);
    callPreserved(heap, FUN_0043c60b);
  } else {
    heap.setU8(esi + 0x70, regs.ebx & 0xff);
    if (heap.u8(esi + 0x71) === 8 && heap.u8(esi + 0x72) === 0xf) {
      // 43c58b: vomit frame — stat hits + effect sprite + retch sound
      heap.setU8(esi + 0x3e, heap.u8(esi + 0x3e) >>> 1);
      heap.setU8(esi + 0x3d, heap.u8(esi + 0x3d) >>> 1);
      const v = heap.u8(esi + 0x3c);
      heap.setU8(esi + 0x3c, v < 0x1e ? 0 : v - 0x1e);
      heap.setU8(esi + 0x45, heap.u8(esi + 0x45) | 4);
      {                                                   // pushal … 42e062 … popal
        const s = snapRegs();
        lo16("eax", heap.u16(esi + 0xe));
        lo16("ecx", heap.u16(esi + 0x10));
        lo16("edx", heap.u16(esi + 0x12));
        regs.ebx = heap.u8(esi + 0x1e);
        lo16("ebp", (heap.u16(esi + 0xa) & 1) + 0);
        callNative(0x42e062, []);
        restoreRegs(s);
      }
      {                                                   // pushal … 452fce … popal
        const s = snapRegs();
        rand32(heap);
        regs.eax = ((regs.eax & 3) + 0x18) >>> 0;
        lo16("ecx", heap.u16(esi + 0xe));
        lo16("edx", heap.u16(esi + 0x10));
        lo16("ebp", heap.u16(esi + 0x12));
        regs.ebx = 0x8001;
        callNative(0x452fce, []);
        restoreRegs(s);
      }
    }
  }
  // 43c5fc
  invalidateSprite(heap);
  lo16("eax", heap.u16(esi + 0xe));
  lo16("ecx", heap.u16(esi + 0x10));
  return 1;                                               // 43c609: stc
}

// LAB_43c992 — reverse direction, target = own tile center.
function turnAround(heap, esi) {
  heap.setU8(esi + 0x78, heap.u8(esi + 0x78) ^ 2);
  const ax = ((heap.u16(esi + 0xe) & 0xffe0) + 0x10) & 0xffff;
  const cx = ((heap.u16(esi + 0x10) & 0xffe0) + 0x10) & 0xffff;
  lo16("eax", ax); lo16("ecx", cx);
  heap.setU16(esi + 0x32, ax);
  heap.setU16(esi + 0x34, cx);
  heap.setU8(esi + 0x36, 5);
  return regs.eax;                                        // stc; ret
}

// LAB_43c8b4 — move sprite to (ax,cx) with recomputed z.
function moveSprite(heap) {
  callNative(0x43d38b, []);                               // dx = z at (ax,cx)
  invalidateSprite(heap);
  callPreserved(heap, FUN_00444927);
  invalidateSprite(heap);
  return regs.eax;                                        // stc; ret
}

// LAB_43c84c — stand in place (queue follow: close enough to the peep
// ahead).
function queueStand(heap, esi) {
  if (heap.u8(esi + 0x71) < 0xfe) step43c49e(heap);
  if (heap.u8(esi + 0x71) === 0xff) {
    heap.setU8(esi + 0x71, 0xfe);
    heap.setU8(esi + 0x6f, 2);
    if (heap.u8(0x6293d9) !== 0xfe) invalidateSprite(heap);
  }
  return regs.eax;                                        // stc; ret
}

// 43d02c — leave the queue and go to state 1.
function leaveQueueState1(heap) {
  callPreserved(heap, FUN_0043e792);
  callPreserved(heap, FUN_0044142c);
  heap.setU8((regs.esi >>> 0) + 0x2b, 1);
  callPreserved(heap, FUN_00441452);
}

// push eax,ecx; step the target point one tile in the [esi+0x78]
// direction; [esi+0x36]=n; pop ecx,eax. (43cd66 / 43cdcc blocks.)
// Leaves edx = movzx [esi+0x78] like the binary.
function stepTarget(heap, esi, n) {
  const sA = regs.eax >>> 0, sC = regs.ecx >>> 0;
  regs.edx = heap.u8(esi + 0x78);
  lo16("eax", (heap.u16(esi + 0x32) + heap.u16(0x652478 + regs.edx * 4)) & 0xffff);
  lo16("ecx", (heap.u16(esi + 0x34) + heap.u16(0x65247a + regs.edx * 4)) & 0xffff);
  heap.setU16(esi + 0x32, regs.eax & 0xffff);
  heap.setU16(esi + 0x34, regs.ecx & 0xffff);
  heap.setU8(esi + 0x36, n);
  regs.ecx = sC; regs.eax = sA;
}

// pushal-wrapped 42c711 tracked-peep notification, ride-staged variant
// (43cefe / 43d0f4 blocks: bx=0x7cc; 43cb4a: 0x7cd/0x7ce by ride flag).
function notify42c711Ride(heap, esi, rideId, bxOrNull) {
  const s = snapRegs();
  heap.setU16(0x971e86, heap.u16(esi + 0x22));
  heap.setU32(0x971e88, heap.u32(esi + 0x9c));
  regs.edx = (rideId & 0xff) * 0x260;
  heap.setU16(0x971e8c, heap.u16(0x887442 + regs.edx));
  heap.setU32(0x971e8e, heap.u32(0x887444 + regs.edx));
  lo8("eax", 2);
  regs.ecx = heap.u16(esi + 0xa);
  if (bxOrNull === null) {
    // 43cb4a variant: 0x7cd, or 0x7ce when ride-type flag 0x400000
    lo16("ebx", 0x7cd);
    regs.edx = heap.u8(0x887420 + regs.edx);
    if ((heap.u32(0x5f5b78 + regs.edx * 8) & 0x400000) !== 0) lo16("ebx", 0x7ce);
  } else {
    lo16("ebx", bxOrNull);
  }
  callNative(0x42c711, []);
  restoreRegs(s);
}

// xchg-append self onto a ride queue chain (43d09d / 43ce9f / 43d097
// share this exact sequence). dlr = ride, dhr = station. Leaves
// regs.eax lo16 = old head, regs.edi = ride*0x260, regs.ebx = station.
function queueAppend(heap, esi, dlr, dhr) {
  lo16("eax", heap.u16(esi + 0xa));
  regs.edi = ((dlr & 0xff) * 0x260) >>> 0;
  regs.ebx = (dhr & 0xff) >>> 0;
  const slot = (0x887472 + regs.edi + regs.ebx * 2) >>> 0;
  const old = heap.u16(slot);
  heap.setU16(slot, regs.eax & 0xffff);                   // xchg
  lo16("eax", old);
  const cnt = (0x88747a + regs.edi + regs.ebx) >>> 0;
  heap.setU8(cnt, (heap.u8(cnt) + 1) & 0xff);
  heap.setU16(esi + 0x74, old);
}

// 43d165..43d37d — guest perception block (vandalism / crowding /
// litter thoughts). Entry regs: eax lo16 = masked new x, ecx lo16 =
// masked new y, edx lo16 = path element height byte.
function perceptionBlock(heap, esi) {
  let b = heap.u8(esi + 0xef);
  const sh = (b << 1) & 0x3f;
  lo8("ebx", sh);
  heap.setU8(esi + 0xef, (b & 0xc0) | sh);
  if (heap.u8(0x6293c9) !== 0) {
    heap.setU8(esi + 0xef, heap.u8(esi + 0xef) | 1);
    if ((heap.u8(esi + 0xef) & 0x3e) !== 0 && (heap.u8(esi + 0xef) & 0xc0) === 0) {
      const sA = regs.eax >>> 0, sC = regs.ecx >>> 0;     // push eax, push ecx
      if ((rand32(heap) & 0xffff) <= 0x2aaa) {
        lo8("eax", 0x21); hi8("eax", 0xff);
        FUN_00440fe3(heap);                               // thought: vandalism (exit eax = displaced dword, like the binary)
        const v = heap.u8(esi + 0x3b);
        heap.setU8(esi + 0x3b, v < 0x11 ? 0 : v - 0x11);
      }
      regs.ecx = sC; regs.eax = sA;                       // pop ecx, pop eax
      heap.setU8(esi + 0xef, heap.u8(esi + 0xef) | 0xc0);
    }
  }
  if ((heap.u8(esi + 0xef) & 0xc0) !== 0) {
    const sA = regs.eax >>> 0;                            // push eax
    const r = rand32(heap) & 0xffff;
    regs.eax = sA;                                        // pop eax
    if (r <= 0x1111) heap.setU8(esi + 0xef, (heap.u8(esi + 0xef) - 0x40) & 0xff);
  }
  // 43d1e5: quadrant index from masked coords
  regs.eax = (regs.eax & 0xfe0) >>> 0;
  lo16("ecx", (regs.ecx & 0xffff) >>> 5);
  regs.eax = (regs.eax << 2) >>> 0;
  lo16("edx", ((regs.edx & 0xffff) << 2) & 0xffff);
  lo16("eax", (regs.eax | (regs.ecx & 0xffff)) & 0xffff);
  const dxv = regs.edx & 0xffff;
  let di = heap.u16(0x991f8e + (regs.eax >>> 0) * 2);
  lo16("edi", di);
  regs.ecx = 0;
  let cl = 0, ch = 0, crowd = 0;
  while (di !== 0xffff) {
    const sp = ((di << 8) + 0x743b94) >>> 0;
    regs.edi = sp;
    const kind = heap.u8(sp);
    if (kind === 1) {
      if (heap.u8(sp + 0x2b) === 5) {
        const dz = abs16(heap.u16(sp + 0x12) - dxv);
        lo16("eax", dz);
        if (dz <= 0x10) crowd++;
      }
    } else if (kind === 3) {
      const dz = abs16(heap.u16(sp + 0x12) - dxv);
      lo16("eax", dz);
      if (dz <= 0x10) {
        cl = (cl + 1) & 0xff;
        if (heap.u8(sp + 1) <= 1) { cl = (cl - 1) & 0xff; ch = (ch + 1) & 0xff; }
      }
    }
    di = heap.u16(sp + 2);
    lo16("edi", di);
  }
  regs.ecx = (((crowd << 16) >>> 0) + ((ch << 8) | cl)) >>> 0;
  // crowd thought (43d266)
  if ((regs.ecx >>> 0) >= 0xa0000 && heap.u8(esi + 0x2b) === 5) {
    if ((rand32(heap) & 0xffff) <= 0x5555) {
      lo8("eax", 0x20); hi8("eax", 0xff);
      FUN_00440fe3(heap);                                 // thought: crowded (exit eax = displaced dword)
      const v = heap.u8(esi + 0x3b);
      heap.setU8(esi + 0x3b, v < 0xe ? 0 : v - 0xe);
    }
  }
  if (cl >= 3) cl = 3;
  if (ch >= 3) ch = 3;
  regs.ecx = ((regs.ecx & 0xffff0000) | (ch << 8) | cl) >>> 0;
  // 43d2a0: disgusting-litter perception counter at [esi+0xe3] (ch)
  litterCounter(heap, esi, 0xe3, ch, 0x1f);
  // 43d313: litter perception counter at [esi+0xe1] (cl)
  litterCounter(heap, esi, 0xe1, cl, 0x1a);
}

function litterCounter(heap, esi, off, count, thoughtId) {
  let al = heap.u8(esi + off);
  const ah = al & 0xc0;
  al = ((((al & 0xf) << 2) | count) | ah) & 0xff;
  heap.setU8(esi + off, al);
  lo8("eax", al); hi8("eax", ah);
  if (ah !== 0) {
    if ((rand32(heap) & 0xffff) <= 0x1111) {
      heap.setU8(esi + off, (heap.u8(esi + off) - 0x40) & 0xff);
    }
    return;
  }
  const sum = (al & 3) + ((al >> 2) & 3) + ((al >> 4) & 3);
  if (sum >= 3) {
    if ((rand32(heap) & 0xffff) <= 0x2aaa) {
      lo8("eax", thoughtId); hi8("eax", 0xff);
      FUN_00440fe3(heap);                                 // exit eax = displaced dword, like the binary
      const v = heap.u8(esi + 0x3b);
      heap.setU8(esi + 0x3b, v < 0x11 ? 0 : v - 0x11);
      heap.setU8(esi + off, heap.u8(esi + off) | 0xc0);
    }
  }
}

// 43ccb4 — pay gate not found / not active: spawn-exit bookkeeping.
function exitGateFail(heap, esi) {
  heap.setU8(esi + 0x2b, 0xe);
  heap.setU8(esi + 0x37, 1);
  heap.setU16(0x87c81e, (heap.u16(0x87c81e) - 1) & 0xffff);
  callPreserved(heap, FUN_00441452);
  return turnAround(heap, esi);
}

export function FUN_extra_peepwalk_43c751(heap) {
  const esi = regs.esi >>> 0;                             // peep sprite ptr
  heap.setU16(0x62d3f4, 0);
  const entryAction = heap.u8(esi + 0x71);
  lo8("eax", entryAction);
  heap.setU8(0x6293d9, entryAction);
  if (entryAction === 0xfe) heap.setU8(esi + 0x71, 0xff);

  // === queue-follow gate (43c76a) ===
  if (heap.u8(esi + 0x2b) === 6) {
    heap.setU16(esi + 0x7a, (heap.u16(esi + 0x7a) + 1) & 0xffff);
    const lead = heap.u16(esi + 0x74);
    lo16("edx", lead);
    if (lead !== 0xffff) {
      regs.edi = ((lead << 8) + 0x743b94) >>> 0;
      const lp = regs.edi;
      const adx = abs16(heap.u16(lp + 0xe) - heap.u16(esi + 0xe));
      const ady = abs16(heap.u16(lp + 0x10) - heap.u16(esi + 0x10));
      const adz = abs16(heap.u16(lp + 0x12) - heap.u16(esi + 0x12));
      lo16("eax", adx); lo16("ecx", ady); lo16("edx", adz);
      if (adz <= 0xa) {
        let ax = adx, cx = ady;
        if (ax < cx) { const t = ax; ax = cx; cx = t; }   // xchg cx,ax
        cx = (cx >>> 1) & 0xffff;
        ax = (ax + cx) & 0xffff;
        lo16("eax", ax); lo16("ecx", cx);
        if (ax <= 7) return queueStand(heap, esi);
        let near = true;
        if (ax >= 0xd) {
          regs.eax = (heap.u32(lp + 0xe) & 0xffe0ffe0) >>> 0;
          regs.ebx = (heap.u32(esi + 0xe) & 0xffe0ffe0) >>> 0;
          if (regs.eax !== regs.ebx) near = false;        // different tile
        }
        if (near) {
          const dirB = heap.u8(lp + 0x1e);
          lo8("eax", dirB);
          if (dirB === heap.u8(esi + 0x1e)) {
            regs.eax = (dirB >> 3) & 3;                   // shr al,3; and eax,3
            switch (regs.eax) {
              case 0:
                lo16("eax", heap.u16(esi + 0xe));
                if (s16(heap.u16(esi + 0xe)) < s16(heap.u16(lp + 0xe))) return queueStand(heap, esi);
                break;
              case 1:
                lo16("eax", heap.u16(esi + 0x10));
                if (s16(heap.u16(esi + 0x10)) > s16(heap.u16(lp + 0x10))) return queueStand(heap, esi);
                break;
              case 2:
                lo16("eax", heap.u16(esi + 0xe));
                if (s16(heap.u16(esi + 0xe)) > s16(heap.u16(lp + 0xe))) return queueStand(heap, esi);
                break;
              case 3:
                lo16("eax", heap.u16(esi + 0x10));
                if (s16(heap.u16(esi + 0x10)) < s16(heap.u16(lp + 0x10))) return queueStand(heap, esi);
                break;
            }
          }
        }
      }
    }
  }

  // === LAB_43c875: movement step ===
  let cf = step43c49e(heap);
  if (!cf) {
    // target point reached → per-type motion handler picks the next one
    heap.setU16(0x62d3f4, heap.u16(0x62d3f4) | 1);
    regs.ebx = heap.u8(esi + 0x2e);
    const handler = heap.u32(0x62d3fc + regs.ebx * 4) >>> 0;
    if (handler === 0x43d5a0 && !globalThis.__forceInterp43d5a0) {
      // guest motion handler — JS port (extra_guestmotion_43d5a0.js);
      // sets CF on the painter cpu like the callNative path. The
      // __lockstep43d5a0 seam is the per-call oracle wrap point
      // (tools/_lockstep-43d5a0.mjs).
      (globalThis.__lockstep43d5a0 || FUN_extra_guestmotion_43d5a0)(heap);
    } else {
      callNative(handler, []);
    }
    if (cpuCF()) return regs.eax;                         // 43c898: stc; ret
    cf = step43c49e(heap);
    if (!cf) return regs.eax;                             // 43c898: stc; ret
  }

  // === LAB_43c89a: stepped to (ax,cx) ===
  lo16("ebx", regs.eax & 0xffe0);
  lo16("edx", regs.ecx & 0xffe0);
  const mx = regs.ebx & 0xffff, my = regs.edx & 0xffff;   // masked tile coords
  if (mx === heap.u16(esi + 0x24) && my === heap.u16(esi + 0x26)) {
    return moveSprite(heap);                              // same tile → 43c8b4
  }
  const nx = regs.eax & 0xffff, ny = regs.ecx & 0xffff;   // unmasked new coords
  if (s16(nx) < 0x20 || s16(ny) < 0x20 || nx > 0xfdf || ny > 0xfdf) {
    // 43c9bc: walked to the map edge
    if (heap.u8(esi + 0x2a) === 1) heap.setU16(0x62d3f4, heap.u16(0x62d3f4) | 2);
    return turnAround(heap, esi);
  }

  // === tile-crossing element scan (43c8f3) ===
  const savedEAX = regs.eax >>> 0, savedECX = regs.ecx >>> 0;   // push eax; push ecx
  lo16("eax", mx); lo16("ecx", my);
  lo16("edx", ror16(rol16(my, 7) | mx, 5));
  regs.edi = heap.u32(0x971ef4 + (regs.edx & 0xffff) * 4) >>> 0;
  // height window dl..dh from z/4
  const zq = (heap.u16(esi + 0x12) >>> 2) & 0xffff;
  let wlo = zq & 0xff;
  const whi = (wlo + 1) & 0xff;
  wlo = wlo >= 5 ? wlo - 5 : 0;
  lo8("edx", wlo); hi8("edx", whi);

  let edi = regs.edi;
  for (;;) {
    regs.edi = edi;
    const t = heap.u8(edi) & 0x3c;
    lo8("ebx", t);
    const h = heap.u8(edi + 2);
    const inWindow = wlo <= h && whi >= h;

    if (t === 4 && inWindow) {
      // ===== PATH found (43cfd3) =====
      return pathEntry(heap, esi, edi, savedEAX, savedECX);
    }

    if (t === 8 && inWindow) {
      // ===== TRACK: walk-in shop check (43c9fc) =====
      const s7 = snapRegs();                              // push eax..ebp (7 regs)
      const ride = heap.u8(edi + 7);
      regs.ebp = (ride * 0x260) >>> 0;
      const rideOff = regs.ebp;
      regs.ebx = heap.u8(0x887420 + rideOff);
      if ((heap.u32(0x5f5b78 + regs.ebx * 8) & 0x20000) !== 0) {
        const bail992 = () => {                           // 43cbbe
          restoreRegs(s7);
          regs.ecx = savedECX; regs.eax = savedEAX;       // pop ecx; pop eax
          return turnAround(heap, esi);
        };
        if (heap.u8(esi + 0x2e) !== 0) return bail992();
        heap.setU8(esi + 0xf4, 0);
        if (heap.u8(0x887441 + rideOff) !== 1) return bail992();
        lo8("ebx", ride);
        if (ride === heap.u8(esi + 0x79)) return bail992();
        regs.ebx = heap.u8(0x887420 + rideOff);
        if ((heap.u32(0x5f5b78 + regs.ebx * 8) & 0x200000) === 0) {
          // 43ca63: no-queue walk-in shop (toilets &c) → state 0x11
          lo8("ebx", ride);
          if (ride === heap.u8(esi + 0xc5)) heap.setU8(esi + 0xc5, 0xff);
          lo8("ebx", heap.u8(0x6293d8));
          heap.setU8(esi + 0x70, heap.u8(0x6293d8));
          callPreserved(heap, FUN_0044142c);
          lo8("edx", heap.u8(edi + 7));
          heap.setU8(esi + 0x68, heap.u8(edi + 7));
          heap.setU8(esi + 0x2b, 0x11);
          heap.setU8(esi + 0x2c, 0);
          callPreserved(heap, FUN_00441452);
          restoreRegs(s7);
          regs.ecx = savedECX; regs.eax = savedEAX;       // pop ecx; pop eax
          return regs.eax;                                // 43ca9f: stc; ret
        }
        // 43caa1: queued shop → try to join the queue
        heap.setU8(esi + 0xf4, 0);
        const svD = regs.edx >>> 0, svBp = regs.ebp >>> 0;    // push edx; push ebp
        lo8("edx", heap.u8(edi + 7)); hi8("edx", 0);
        lo16("ebp", 0);
        callNative(0x43e304, []);
        const joined = cpuCF();
        regs.ebp = svBp; regs.edx = svD;                  // pop ebp; pop edx
        if (!joined) return bail992();
        regs.edi = (heap.u8(((regs.edi >>> 0)) + 7) * 0x260) >>> 0;
        const ro = regs.edi;
        regs.ebx = (((heap.u16(0x887508 + ro) << 16) >> 16) >>> 0);   // movsx
        if (regs.ebx !== 0) {
          heap.setU32(0x887524 + ro, (heap.u32(0x887524 + ro) + regs.ebx) >>> 0);
          heap.setU8(0x88751d + ro, heap.u8(0x88751d + ro) | 2);
          heap.setU8(0x99c167, 0x14);
          heap.setU32(0x6293b0, 0xe6);
          callNative(0x4405f3, []);
        }
        restoreRegs(s7);                                  // pop ebp..eax (7 regs)
        lo16("eax", (regs.eax + 0x10) & 0xffff);
        lo16("ecx", (regs.ecx + 0x10) & 0xffff);
        heap.setU16(esi + 0x32, regs.eax & 0xffff);
        heap.setU16(esi + 0x34, regs.ecx & 0xffff);
        heap.setU8(esi + 0x36, 3);
        callPreserved(heap, FUN_0044142c);
        regs.edx = heap.u8(((regs.edi >>> 0)) + 7);       // movzx edx, [edi+7]
        heap.setU8(esi + 0x68, regs.edx & 0xff);
        heap.setU8(esi + 0x2b, 7);
        heap.setU8(esi + 0x2c, 0x13);
        callPreserved(heap, FUN_00441452);
        heap.setU8(esi + 0xe2, 0);
        regs.edx = ((regs.edx & 0xff) * 0x260) >>> 0;
        heap.setU16(0x8874f0 + regs.edx, (heap.u16(0x8874f0 + regs.edx) + 1) & 0xffff);
        if ((heap.u16(esi + 0xc8) & 8) !== 0) {
          notify42c711Ride(heap, esi, heap.u8(esi + 0x68), null);   // 0x7cd/0x7ce
        }
        regs.ecx = savedECX; regs.eax = savedEAX;         // pop ecx; pop eax
        return regs.eax;                                  // 43cbb0: stc; ret
      }
      // 43cbb2: not a walk-in shop — pops, re-check as bl==8 vs 0x10
      // (never matches), i.e. just advance.
      restoreRegs(s7);
    }

    if (t === 0x10 && inWindow) {
      // ===== ENTRANCE (43c9cc) =====
      regs.ecx = savedECX; regs.eax = savedEAX;           // pop ecx; pop eax (first!)
      return entranceEntry(heap, esi, edi);
    }

    const last = (heap.u8(edi + 1) & 0x80) !== 0;
    edi = (edi + 8) >>> 0;
    if (last) break;
  }

  // === end of chain (43c968): maybe step off the path onto terrain ===
  regs.ecx = savedECX; regs.eax = savedEAX;               // pop ecx; pop eax
  callNative(0x423677, []);                               // dx = surface height at (ax,cx)
  const dz = abs16((regs.edx & 0xffff) - heap.u16(esi + 0x12));
  lo16("edx", dz);
  if (dz <= 3 || (heap.u8(esi + 0x2e) === 1 && dz <= 0x20)) {
    // 43cf4b: walk off the path
    heap.setU8(esi + 0x79, 0xff);
    if (heap.u8(esi + 0x2b) === 6) {
      callPreserved(heap, FUN_0043e792);
      callPreserved(heap, FUN_0044142c);
      heap.setU8(esi + 0x2b, 1);
      callPreserved(heap, FUN_00441452);
    }
    // 43cf68
    const sA = regs.eax >>> 0, sC = regs.ecx >>> 0;       // push eax; push ecx
    lo16("eax", regs.eax & 0xffe0);
    lo16("ecx", regs.ecx & 0xffe0);
    const blocked = check425432(heap);
    regs.ecx = sC; regs.eax = sA;                         // pop ecx; pop eax
    if (blocked) return turnAround(heap, esi);
    lo16("ebx", regs.eax & 0xffe0);
    lo16("edx", regs.ecx & 0xffe0);
    const bx = regs.ebx & 0xffff, dxm = regs.edx & 0xffff;
    lo16("edi", ror16(rol16(dxm, 7) | bx, 5));
    regs.edi = heap.u32(0x971ef4 + (regs.edi & 0xffff) * 4) >>> 0;
    let p = regs.edi;
    while ((heap.u8(p) & 0x3c) !== 0) p = (p + 8) >>> 0;
    regs.edi = p;
    if ((heap.u8(p + 5) & 0x1f) !== 0) return turnAround(heap, esi);   // water
    heap.setU16(esi + 0x24, bx);
    heap.setU16(esi + 0x26, dxm);
    lo8("edx", heap.u8(p + 2));
    heap.setU8(esi + 0x29, 8);
    heap.setU8(esi + 0x28, heap.u8(p + 2));
    return moveSprite(heap);                              // jmp 43c8b4
  }
  return turnAround(heap, esi);
}

// ===== PATH element entry (0x43cfd3) =====
// Entry regs: eax lo16 = masked x, ecx lo16 = masked y, edi = element.
function pathEntry(heap, esi, edi, savedEAX, savedECX) {
  const dl5 = heap.u8(edi + 5);
  lo8("edx", dl5);
  heap.setU8(0x6293c9, 0);
  regs.edx = (dl5 & 0xf) >>> 0;                           // and edx,0xf
  if ((heap.u8(0x630cb7 + (dl5 & 0xf)) & 0x20) !== 0) heap.setU8(0x6293c9, 1);
  lo16("edx", (heap.u8(edi + 2) << 2) & 0xffff);
  const blocked = check42547b(heap);
  // jae 43d00c
  if (blocked ? heap.u8(esi + 0x2a) === 0 : heap.u8(esi + 0x2a) === 1) {
    regs.ecx = savedECX; regs.eax = savedEAX;             // 43d090: pop ecx; pop eax
    return turnAround(heap, esi);
  }
  // 43d012
  if (heap.u8(esi + 0x2e) !== 0 || (heap.u8(edi + 4) & 0xf0) !== 0) {
    // 43d01e: staff, or a sloped path element
    heap.setU8(esi + 0x79, 0xff);
    if (heap.u8(esi + 0x2b) === 6) leaveQueueState1(heap);
  } else if (heap.u8(edi + 7) === 0xff) {
    // 43d044: queue path with no ride
    heap.setU8(esi + 0x79, 0xff);
  } else if (heap.u8(esi + 0x2b) === 6) {
    // 43d053: already queuing
    lo8("edx", heap.u8(edi + 7));
    if (heap.u8(edi + 7) !== heap.u8(esi + 0x68)) leaveQueueState1(heap);
  } else {
    // 43d066: queue path for ride [edi+7]
    lo8("edx", heap.u8(edi + 7));
    if (heap.u8(edi + 7) !== heap.u8(esi + 0x79)) {
      heap.setU8(esi + 0xf4, 0);
      hi8("edx", (dl5 & 0x70) >>> 4);
      lo16("ebp", 1);                                     // mov bp,1
      callNative(0x43e304, []);
      if (!cpuCF()) {
        heap.setU8(esi + 0x79, regs.edx & 0xff);
        regs.ecx = savedECX; regs.eax = savedEAX;         // 43d090
        return turnAround(heap, esi);
      }
      // 43d097: joined the queue
      const sA = regs.eax >>> 0, sC = regs.ecx >>> 0, sDi = regs.edi >>> 0;
      const dlr = regs.edx & 0xff, dhr = (regs.edx >>> 8) & 0xff;
      heap.setU8(esi + 0x79, dlr);
      queueAppend(heap, esi, dlr, dhr);
      callPreserved(heap, FUN_0044142c);
      heap.setU8(esi + 0x68, dlr);
      heap.setU8(esi + 0x69, regs.ebx & 0xff);
      heap.setU8(esi + 0x2b, 6);
      heap.setU8(esi + 0xf5, 0);
      callPreserved(heap, FUN_00441452);
      heap.setU8(esi + 0x2c, 0xa);
      heap.setU8(esi + 0x36, 2);
      heap.setU16(esi + 0x7a, 0);
      if ((heap.u16(esi + 0xc8) & 8) !== 0) {
        notify42c711Ride(heap, esi, dlr, 0x7cc);
      }
      regs.edi = sDi; regs.ecx = sC; regs.eax = sA;       // pop edi; pop ecx; pop eax
    }
  }
  // 43d142: common path-entry tail
  lo16("edx", heap.u8(edi + 2));
  lo8("ebx", heap.u8(edi + 4));
  heap.setU16(esi + 0x24, regs.eax & 0xffff);
  heap.setU16(esi + 0x26, regs.ecx & 0xffff);
  lo8("ebx", heap.u8(edi + 4) & 7);
  heap.setU8(esi + 0x28, regs.edx & 0xff);
  heap.setU8(esi + 0x29, heap.u8(edi + 4) & 7);
  if (heap.u8(esi + 0x2e) === 0) perceptionBlock(heap, esi);
  // 43d384: pop ecx; pop eax; jmp 43c8b4
  regs.ecx = savedECX; regs.eax = savedEAX;
  return moveSprite(heap);
}

// ===== ENTRANCE element entry (0x43c9cc, after pop ecx/pop eax) =====
function entranceEntry(heap, esi, edi) {
  if (heap.u8(edi + 4) === 1) {
    // park entrance marker for the motion handler
    heap.setU16(0x62d3f4, heap.u16(0x62d3f4) | 4);
    heap.setU32(0x62d3f6, edi);
  }
  if (heap.u8(edi + 4) === 0) {
    // ===== ride entrance (43ce52) =====
    if (heap.u8(esi + 0x2e) !== 0) {
      heap.setU8(esi + 0x79, 0xff);                       // 43c9f6
      return turnAround(heap, esi);
    }
    if (heap.u8(esi + 0x2b) === 6) {
      heap.setU8(esi + 0x2c, 0xb);
      lo8("edx", heap.u8(0x6293d8));
      heap.setU8(esi + 0x70, heap.u8(0x6293d8));
      return regs.eax;                                    // 43ce6f: stc; ret
    }
    lo8("edx", heap.u8(edi + 7));
    if (heap.u8(edi + 7) === heap.u8(esi + 0x79)) return turnAround(heap, esi);
    heap.setU8(esi + 0xf4, 0);
    hi8("edx", (heap.u8(edi + 5) & 0x70) >>> 4);
    lo16("ebp", 0);                                       // xor bp,bp
    callNative(0x43e304, []);
    if (!cpuCF()) {
      heap.setU8(esi + 0x79, regs.edx & 0xff);
      return turnAround(heap, esi);
    }
    // 43ce9f: joined the ride queue at the entrance
    lo8("ebx", heap.u8(0x6293d8));
    heap.setU8(esi + 0x70, heap.u8(0x6293d8));
    const dlr = regs.edx & 0xff, dhr = (regs.edx >>> 8) & 0xff;
    heap.setU8(esi + 0x79, dlr);
    queueAppend(heap, esi, dlr, dhr);
    callPreserved(heap, FUN_0044142c);
    heap.setU8(esi + 0x68, dlr);
    heap.setU8(esi + 0x69, regs.ebx & 0xff);
    heap.setU8(esi + 0x2b, 6);
    heap.setU8(esi + 0xf5, 0);
    callPreserved(heap, FUN_00441452);
    heap.setU8(esi + 0x2c, 0xb);
    heap.setU16(esi + 0x7a, 0);
    if ((heap.u16(esi + 0xc8) & 8) !== 0) {
      notify42c711Ride(heap, esi, dlr, 0x7cc);
    }
    return regs.eax;                                      // 43cf49: stc; ret
  }
  if (heap.u8(edi + 4) !== 2) {
    heap.setU8(esi + 0x79, 0xff);                         // 43c9f6
    return turnAround(heap, esi);
  }

  // ===== park gate (43cbcc) =====
  if (heap.u8(esi + 0x2e) !== 0) return turnAround(heap, esi);
  if ((heap.u8(edi + 5) & 0xf) !== 0) return turnAround(heap, esi);
  const gateDir = heap.u8(edi) & 3;
  lo8("edx", gateDir);
  if (gateDir !== heap.u8(esi + 0x78)) {
    lo8("edx", gateDir ^ 2);
    if ((gateDir ^ 2) !== heap.u8(esi + 0x78)) return turnAround(heap, esi);
    // ===== 43cda7: entering the park through the gate =====
    if (heap.u8(esi + 0x2b) !== 5) return turnAround(heap, esi);
    if ((heap.u16(esi + 0xc8) & 1) === 0 && (heap.u32(0x87c3bc) & 1) !== 0) {
      return turnAround(heap, esi);
    }
    stepTarget(heap, esi, 9);
    lo16("edx", heap.u16(esi + 0x12));
    invalidateSprite(heap);
    callPreserved(heap, FUN_00444927);
    invalidateSprite(heap);
    callPreserved(heap, FUN_0044142c);
    heap.setU8(esi + 0x2b, 0xe);
    callPreserved(heap, FUN_00441452);
    heap.setU8(esi + 0x37, 0);
    if ((heap.u16(esi + 0xc8) & 8) !== 0) {
      // pushal staging, no ride fields, bx=0x7d0 (43ce28)
      const s = snapRegs();
      heap.setU16(0x971e86, heap.u16(esi + 0x22));
      heap.setU32(0x971e88, heap.u32(esi + 0x9c));
      lo8("eax", 2);
      regs.ecx = heap.u16(esi + 0xa);
      lo16("ebx", 0x7d0);
      callNative(0x42c711, []);
      restoreRegs(s);
    }
    return regs.eax;                                      // 43ce50: stc; ret
  }
  // same direction as the gate: leaving the park (43cbfb)
  if (heap.u8(esi + 0x2b) !== 0xd) return turnAround(heap, esi);
  if ((heap.u32(0x87c3bc) & 1) === 0) return exitGateFail(heap, esi);
  // 43cc15: pay-gate path scan from the spawn-gate globals
  {
    const sA = regs.eax >>> 0, sB = regs.ebx >>> 0,
          sC = regs.ecx >>> 0, sD = regs.edx >>> 0;       // push eax,ebx,ecx,edx
    const gd = heap.u8(0x87c3c8);
    regs.ebx = gd;
    const ax2 = (heap.u16(0x87c3c2) + heap.u16(0x652478 + gd * 4)) & 0xffff;
    const cx2 = (heap.u16(0x87c3c4) + heap.u16(0x65247a + gd * 4)) & 0xffff;
    lo16("eax", ax2);
    lo16("ecx", ror16(rol16(cx2, 7) | ax2, 5));
    regs.ebx = heap.u32(0x971ef4 + (regs.ecx & 0xffff) * 4) >>> 0;
    const dl3 = (heap.u16(0x87c3c6) >>> 2) & 0xff;
    lo8("edx", dl3); hi8("edx", gd);
    let p = regs.ebx >>> 0;
    let found = false;
    for (;;) {
      regs.ebx = p;
      if ((heap.u8(p) & 0x3c) === 4 && (heap.u8(p + 4) >>> 4) !== 0) {
        const f = heap.u8(p + 4);
        if ((f & 4) === 0) {
          lo8("eax", heap.u8(p + 2));
          if (dl3 === heap.u8(p + 2)) { found = true; break; }
        } else if ((f & 3) === gd) {
          lo8("eax", f & 3);
          if (dl3 === heap.u8(p + 2)) { found = true; break; }
        } else if (((f & 3) ^ 2) === gd) {
          lo8("eax", (heap.u8(p + 2) + 4) & 0xff);
          if (((heap.u8(p + 2) + 4) & 0xff) === dl3) { found = true; break; }
        }
      }
      const last = (heap.u8(p + 1) & 0x80) !== 0;
      p = (p + 8) >>> 0;
      if (last) break;
    }
    regs.edx = sD; regs.ecx = sC; regs.ebx = sB; regs.eax = sA;   // pops
    if (!found) return exitGateFail(heap, esi);
  }
  // 43cccd: pay the entrance fee and enter
  if (heap.u16(0x87c3c0) !== 0) {
    const sB = regs.ebx >>> 0;                            // push ebx
    regs.ebx = heap.u16(0x87c3c0);
    if ((heap.u16(esi + 0xca) & 0x4000) !== 0) {
      if (heap.u8(esi + 0xf0) === 2) {
        regs.ebx = regs.ebx >>> 1;                        // half-price voucher
        heap.setU16(esi + 0xca, heap.u16(esi + 0xca) & 0xbfff);
        heap.setU8(esi + 0x45, heap.u8(esi + 0x45) | 8);
      }
      if (heap.u8(esi + 0xf0) === 0) {
        regs.ebx = 0;                                     // free-entry voucher
        heap.setU16(esi + 0xca, heap.u16(esi + 0xca) & 0xbfff);
        heap.setU8(esi + 0x45, heap.u8(esi + 0x45) | 8);
      }
    }
    if ((regs.ebx >>> 0) > (heap.u32(esi + 0xa0) >>> 0)) {
      regs.ebx = sB;                                      // pop ebx
      return turnAround(heap, esi);                       // can't afford
    }
    heap.setU32(0x87d720, (heap.u32(0x87d720) + regs.ebx) >>> 0);
    heap.setU8(0x99c167, 0x10);
    heap.setU32(0x6293b0, 0xe4);
    callNative(0x4405f3, []);
    regs.ebx = sB;                                        // pop ebx
    heap.setU16(esi + 0xc8, heap.u16(esi + 0xc8) | 0x20);
  }
  heap.setU32(0x87d71c, (heap.u32(0x87d71c) + 1) >>> 0);
  {                                                       // push eax,ebx; sound; pops
    const sA = regs.eax >>> 0, sB = regs.ebx >>> 0;
    lo8("eax", 0x1b);
    lo16("ebx", 0);
    callPreserved(heap, FUN_005e5301);
    regs.ebx = sB; regs.eax = sA;
  }
  heap.setU8(esi + 0x37, 1);
  stepTarget(heap, esi, 7);
  lo16("edx", heap.u16(esi + 0x12));
  invalidateSprite(heap);
  callPreserved(heap, FUN_00444927);
  invalidateSprite(heap);
  return regs.eax;                                        // 43cda5: stc; ret
}
