// @manual — do not regenerate.
//
// FUN_005d94b6 — vehicle sound-parameter updater (binary
// 0x5d94b6..0x5d97b3). Called per vehicle sprite from the sprite-update
// loop (ported/auto/5d74b4.js). Previously interpreter-delegated whole
// (the old auto-translation had 4 goto-truncation early-returns);
// ranked #2 gameplay interpreter consumer after the 43d5a0 port
// (~3.9k steps/tick).
//
// Hand-ported from the capstone disassembly (decompiled/c/5d94b6.c is
// the cross-check; its extraout_DL/DH plumbing around FUN_005df40c is
// the usual decompiler artifact). Structure:
//
//   1. [esi+0x48]&0x20 → 0x5d8c79 (crash-sound path — cold,
//      interpreter-delegated via callNative; the binary continues on
//      the callee's exit EDI, mirrored here).
//   2. ride state gate: [ride+0x887422]&0xc0 → [0x65e6b7] =
//      [ride+0x88755c]; ride-type flags [0x5f7104] bits 8/0x2000 (+
//      spline state [esi+0x1f]==2, velocity <= 0x20000) can set the
//      vehicle flag [esi+0x48]|=0x80.
//   3. per-sound-type vtable PTR [0x5d97b4 + [esi+0x50]*4] with
//      dl=[ride+0x887424], dh=[esi+0x51] (engine sound state machines
//      — interpreter-delegated via callNative; exit registers, notably
//      BL, stay live exactly like the binary: the friction path below
//      only assigns BL when |velocity| >= 0x10000).
//   4. friction sound: |velocity| >= 0x10000 → id [0x5f72ec+type*4],
//      volume bl = 0xd0 + ((|v|-0x10000)>>15) saturated to 0xff.
//   5. scream sound: style [0x5f72ee+type*4]==3 → launched-coaster
//      random scream (velocity >= 0x40000, RNG <= 0x5555 → id 0x12);
//      else ride-type flag 0x10 → train mass sum over the [+0x3e]
//      chain, |velocity| >= 0x2c000, rider-animation scan
//      ([sprite+0x1f] bands by sign), RNG-vs-mass gate, scream table
//      pick (0x65e9d8 / 0x65e9e1 / 0x65e9dc for styles 0/1/2); cached
//      in [esi+0xcc] (0xfe = "rolled no scream", reported as 0xff).
//   6. channel blend at [esi+0xbb] (friction) and [esi+0xbd] (scream):
//      same id → vol += 0xf capped at the target (8-bit carry → cap);
//      different id → vol -= 9 until < 0x50, then switch to the new id
//      at cap>>2 (cap 0xff stays 0xff).
//   7. pan [esi+0xbf] = clamp((velocity>>14) * sin-table
//      [0x65e674+[esi+0x1e]*2] >> 14, -0x7f..0x7f).
//
// Wired as the direct JS export (the 5d74b4 caller imports it);
// __forceInterp5d94b6 falls back to the painter-bridge shim that
// previously handled every call. The __lockstep5d94b6 seam is the
// per-call oracle wrap point (tools/_lockstep-5d94b6.mjs).
//
// Oracle: tools/_lockstep-5d94b6.mjs (whole-heap per-call compare vs
// the interpreter, interpreter kept live) +
// tools/painter-port-oracle.mjs dual soak (FORCE_INTERP=5d94b6).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { callNative } from "../../runtime/painter-bridge.js";

const lo16 = (r, v) => { regs[r] = ((regs[r] & 0xffff0000) | (v & 0xffff)) >>> 0; };
const lo8 = (r, v) => { regs[r] = ((regs[r] & 0xffffff00) | (v & 0xff)) >>> 0; };
const hi8 = (r, v) => { regs[r] = ((regs[r] & 0xffff00ff) | ((v & 0xff) << 8)) >>> 0; };
const s16 = (v) => (v << 16) >> 16;

// One channel blend step (5d9707 / 5d9744 are the same template with
// (target dl, cap bl) / (target dh, cap bh)). Returns the stored word.
function blendChannel(heap, addr, target, cap) {
  const cur = heap.u16(addr);
  let al = cur & 0xff, ah = (cur >>> 8) & 0xff;
  let fresh = false;
  if (al === 0xff) {
    fresh = true;
  } else if (al === target) {
    const sum = ah + 0xf;
    ah = sum > 0xff ? cap : sum & 0xff;                   // add ah,0xf; jae / mov ah,cap
    if (ah > cap) ah = cap;                               // cmp ah,cap; jbe / mov
  } else if (ah < 9) {
    fresh = true;                                         // sub ah,9 borrows
  } else {
    ah = (ah - 9) & 0xff;
    if (ah < 0x50) fresh = true;                          // cmp ah,0x50; jae store
  }
  if (fresh) {
    al = target;
    ah = cap === 0xff ? 0xff : cap >>> 2;
  }
  heap.setU16(addr, (ah << 8) | al);
  return (ah << 8) | al;
}

export function soundParams5d94b6(heap) {
  const esi = regs.esi >>> 0;                             // vehicle sprite ptr
  regs.edi = (heap.u8(esi + 0x30) * 0x260) >>> 0;         // ride offset
  if ((heap.u16(esi + 0x48) & 0x20) !== 0) {
    callNative(0x5d8c79, []);                             // cold crash-sound path
  }
  const rideOff = regs.edi >>> 0;                         // binary continues on edi
  heap.setU8(0x65e6b7, 0xff);
  if ((heap.u16(rideOff + 0x887422) & 0xc0) !== 0) {
    const al = heap.u8(rideOff + 0x88755c);
    lo8("eax", al);
    heap.setU8(0x65e6b7, al);
    regs.edx = heap.u8(esi + 0x31);                       // movzx
    const tf = heap.u16(regs.edx * 8 + 0x5f7104);
    if ((tf & 8) !== 0 && al === 0) {
      if ((tf & 0x2000) === 0 ||
          (heap.u8(esi + 0x1f) === 2 && (heap.u32(esi + 0x28) | 0) <= 0x20000)) {
        heap.setU16(esi + 0x48, heap.u16(esi + 0x48) | 0x80);
      }
    }
  }
  // per-sound-type handler (engine sound state machine)
  lo8("edx", heap.u8(rideOff + 0x887424));
  hi8("edx", heap.u8(esi + 0x51));
  regs.edi = heap.u8(esi + 0x50);                         // movzx
  callNative(heap.u32(0x5d97b4 + regs.edi * 4) >>> 0, []);

  const ax = heap.u16(esi + 0xb8);
  lo16("eax", ax);
  const type = heap.u8(esi + 0x31);
  regs.ebp = type >>> 0;                                  // movzx
  let dl = 0xff;
  lo8("edx", dl);
  let bl = regs.ebx & 0xff;                               // handler's exit BL (binary)
  const vel = heap.u32(esi + 0x28) | 0;
  const av = (vel < 0 ? -vel : vel) >>> 0;                // or/jns/neg
  regs.ecx = av;
  if (av >= 0x10000) {
    dl = heap.u8(type * 4 + 0x5f72ec);
    lo8("edx", dl);
    regs.ecx = ((av - 0x10000) >>> 0) >>> 0xf;
    const sum = 0xd0 + (regs.ecx & 0xff);
    bl = sum > 0xff ? 0xff : sum;                         // add bl,cl; jae / 0xff
    lo8("ebx", bl);
  }

  let dh = 0;                                             // scream sound id
  let bh;                                                 // scream volume cap
  let screamPath = false;
  const style = heap.u8(type * 4 + 0x5f72ee);

  scream: {
    if (style === 3) {
      dh = heap.u8(esi + 0xcc);
      hi8("edx", dh);
      if ((heap.u32(0x88741c) & 0x7f) !== 0) { screamPath = true; break scream; }
      if (vel < 0x40000) break scream;                    // jl 5d96ef
      if (heap.u8(esi + 0xcc) !== 0xff) break scream;
      const sA = regs.eax >>> 0;                          // push eax
      callNative(0x5df40c, []);                           // RNG (raw bytes)
      if ((regs.eax & 0xffff) <= 0x5555) {
        dh = 0x12;
        hi8("edx", dh);
        regs.eax = sA;                                    // pop eax (5d969b)
        heap.setU8(esi + 0xcc, dh);
      } else {
        regs.eax = sA;                                    // pop eax (5d95ad)
      }
      screamPath = true; break scream;                    // jmp 5d96a2
    }
    if ((heap.u16(type * 8 + 0x5f7104) & 0x10) === 0) break scream;
    // train mass sum over the [+0x3e] chain (starts at self)
    let ch = 0;
    let p = esi;
    for (;;) {
      regs.edi = p >>> 0;
      ch = (ch + heap.u8(p + 0xb3)) & 0xff;
      const nxt = heap.u16(p + 0x3e);
      lo16("edi", nxt);
      if (nxt === 0xffff) break;
      p = ((nxt << 8) + 0x743b94) >>> 0;
    }
    regs.ecx = ((regs.ecx & 0xffff00ff) | (ch << 8)) >>> 0;
    if (ch === 0) break scream;
    let found = false;
    if (vel >= 0) {
      if (vel < 0x2c000) break scream;
      let idx = heap.u16(esi + 0xa);
      for (;;) {
        const sp = ((idx << 8) + 0x743b94) >>> 0;
        regs.edi = sp;
        const cl = heap.u8(sp + 0x1f);
        lo8("ecx", cl);
        if ((cl >= 5 && cl <= 8) || (cl >= 0x11 && cl <= 0x17)) { found = true; break; }
        idx = heap.u16(sp + 0x3e);
        if (idx === 0xffff) break;
      }
    } else {
      if (vel > -0x2c000) break scream;
      let idx = heap.u16(esi + 0xa);
      for (;;) {
        const sp = ((idx << 8) + 0x743b94) >>> 0;
        regs.edi = sp;
        const cl = heap.u8(sp + 0x1f);
        lo8("ecx", cl);
        if ((cl >= 1 && cl <= 4) || (cl >= 9 && cl <= 0xf)) { found = true; break; }
        idx = heap.u16(sp + 0x3e);
        if (idx === 0xffff) break;
      }
    }
    if (!found) break scream;
    // 5d963a: scream selection
    dh = heap.u8(esi + 0xcc);
    hi8("edx", dh);
    if (dh !== 0xff) { screamPath = true; break scream; }
    const sA = regs.eax >>> 0;                            // push eax
    callNative(0x5df40c, []);                             // RNG (raw bytes)
    const rnd = regs.eax >>> 0;
    if (((rnd >>> 8) & 0xf) > ch) {
      dh = 0xfe;                                          // 5d9668
    } else if (style === 0) {
      dh = heap.u8((((rnd & 0xff) * 4) >>> 8) + 0x65e9d8);   // mul ah; movzx eax,ah
    } else if (style === 1) {
      dh = heap.u8((((rnd & 0xff) * 5) >>> 8) + 0x65e9e1);
    } else if (style === 2) {
      dh = heap.u8((((rnd & 0xff) * 5) >>> 8) + 0x65e9dc);
    } else {
      dh = 0xfe;                                          // 5d9668
    }
    hi8("edx", dh);
    regs.eax = sA;                                        // pop eax (5d969b)
    heap.setU8(esi + 0xcc, dh);
    screamPath = true;
  }

  if (screamPath) {
    // 5d96a2
    if (dh === 0xfe) { dh = 0xff; hi8("edx", dh); }
    bh = 0xff;
  } else {
    // 5d96ef: no scream this tick
    heap.setU8(esi + 0xcc, 0xff);
    dh = heap.u8(type * 4 + 0x5f72ed);
    hi8("edx", dh);
    bh = 0xf3;
    if ((ax & 2) === 0) { dh = 0xff; hi8("edx", dh); }
  }
  hi8("ebx", bh);

  // 5d9707: blend both channels
  lo16("eax", blendChannel(heap, esi + 0xbb, dl, bl));
  lo16("eax", blendChannel(heap, esi + 0xbd, dh, bh));

  // 5d9781: pan
  regs.ebx = (heap.i16(0x65e674 + heap.u8(esi + 0x1e) * 2) | 0) >>> 0;   // movsx
  const pan = Math.imul(vel >> 14, regs.ebx | 0) >> 14;
  regs.eax = pan >>> 0;
  if (s16(pan & 0xffff) < -0x7f) lo16("eax", 0xff81);
  else if (s16(pan & 0xffff) > 0x7f) lo16("eax", 0x7f);
  heap.setU8(esi + 0xbf, regs.eax & 0xff);
  return regs.eax;
}

export function FUN_005d94b6(heap) {
  if (globalThis.__forceInterp5d94b6) {
    const bridged = state.fnDispatch.get(0x5d94b6);
    if (!bridged || bridged === FUN_005d94b6) {
      throw new Error("FUN_005d94b6 force-interp: no painter-bridge shim registered");
    }
    return bridged(heap);
  }
  const seam = globalThis.__lockstep5d94b6;
  if (seam) return seam(heap);
  return soundParams5d94b6(heap);
}
