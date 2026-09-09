// @manual — do not regenerate.
//
// FUN_extra_paint_4238b4 — vertical-supports painter (binary
// 0x4238b4..0x423c53). Called per wall/track element that needs support
// posts under it — in the current chain ~230 calls/tick from the JS
// 0x444e08 wall-painter port via runFunction (~30 interpreter
// steps/call, 6,924 steps/tick: the #2 interpreter consumer after the
// 43c751 port). ported/auto/4238b4.js (the auto-translation) has
// goto-truncation early-returns and is not dispatched on this path.
//
// Transcribed from the capstone disassembly. Structure:
//   1. gates: [0x991f8c]&8 (no-supports render mode), [0x991f2b]&1
//      (support base height known). [0x5f4949] (painted-anything flag)
//      is zeroed BEFORE the first gate branches, like the binary.
//   2. si = ([0x991f28]+0xf)&0xfff0 (base height, rounded up to 16);
//      dx -= si (borrow → CF=1 error exit); dx >>= 4 = segment count.
//   3. slope bits cl=[0x991f2a]: 0x20 → 431bb8 slope piece; 0x10 →
//      steep pair (two 432204 calls, image [edi*8+0x5f43d2] +
//      [slope&0x1f]-keyed offset, si += 0x20); low nibble → single
//      432204 slope piece (si += 0x10). Zero steep image falls back to
//      the 431bb8 slope piece.
//   4. main loop: double-height (0x20) segments via [edi*8+0x5f43cc]
//      (ah=0x1c, or 0x17 on the final pair) when si is 0x20-aligned and
//      >1 segment remains and si+0x10 != [0x991f2c] (the supports-clip
//      ceiling); else single (0x10) segments via [edi*8+0x5f43ce]
//      (ah=0xc, or 7 on the last).
//   5. top piece (entry ax != 0): table row [(ax-1)*8 + 0x5f4444..b]
//      stages the bbox globals/registers; attach variant (row flag +6
//      and [0x99a4f0] != 0) goes through PTR [0x4328e0 + rot*4]
//      (interpreter-delegated — cold) and chains the slot into the
//      attach parent's +0x1c link; plain variant through PTR 0x432204.
//
// The PTR 0x432204 / 0x431bb8 rotation allocator calls go to the
// existing JS bodies (paintBody432204 / paintBody431bb8) — exactly the
// calls that made this painter hot. Registers are staged on cpu.regs
// with the binary's 8/16-bit subregister discipline; the push/pop
// blocks around each paint call are mirrored with explicit
// save/restore so the callee's allocator write-back (eax/ebx/ecx/ebp
// evolution) survives like the binary's.
//
// Exit fidelity: esi/edx restored to entry (binary pops), al =
// [0x5f4949] with eax's upper bytes = entry, flags from `and bx,bx`
// (CF=0) on the normal exits or the failing 16-bit SUB + STC on the
// below-base error exit. The JS 444e08 caller reads dx after the call;
// the lockstep compares all of eax/ecx/edx/ebx/esi/edi/ebp + CF/ZF/SF/OF.
//
// Wired via setEipHook(0x4238b4) (installPainterBridge), so the
// existing runFunction call sites — the JS 444e08 port and any
// interpreter-resident callers — route through this body without
// changes. __forceInterp4238b4 keeps the original bytes reachable for
// the oracles.
//
// Oracle: tools/_lockstep-4238b4.mjs (write-set + exit regs + flags
// per call, interpreter kept live) + painter-port-oracle.mjs dual soak
// (FORCE_INTERP=4238b4).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { clearEipHook, setEipHook as _setEipHook } from "../../harness/x86.js";
import { paintBody432204 } from "./extra_paint_432204.js";
import { paintBody431bb8 } from "./extra_paint_431bb8.js";

const lo8 = (cpu, r, v) => { cpu.regs[r] = ((cpu.regs[r] & 0xffffff00) | (v & 0xff)) >>> 0; };
const hi8 = (cpu, r, v) => { cpu.regs[r] = ((cpu.regs[r] & 0xffff00ff) | ((v & 0xff) << 8)) >>> 0; };
const lo16 = (cpu, r, v) => { cpu.regs[r] = ((cpu.regs[r] & 0xffff0000) | (v & 0xffff)) >>> 0; };
const sx8 = (v) => ((v << 24) >> 24);

// Flags of a 16-bit `sub dst, src` whose result is r (borrow case → the
// jb-taken error exit; STC then re-asserts CF=1).
function sub16FlagsBorrow(cpu, a, b) {
  const r = (a - b) & 0xffff;
  cpu.eflags.CF = 1;
  cpu.eflags.ZF = r === 0 ? 1 : 0;
  cpu.eflags.SF = (r >>> 15) & 1;
  cpu.eflags.OF = (((a ^ b) & (a ^ r)) >>> 15) & 1;
}

// Flags of the `and bx,bx` at the normal exits.
function andBxFlags(cpu) {
  const bx = cpu.regs.ebx & 0xffff;
  cpu.eflags.CF = 0;
  cpu.eflags.OF = 0;
  cpu.eflags.ZF = bx === 0 ? 1 : 0;
  cpu.eflags.SF = (bx >>> 15) & 1;
}

/**
 * JS body. Always handles the call (the only interpreter delegation is
 * the cold 0x4328e0 attach-allocator inside the top-piece path).
 */
export function paintSupports4238b4(heap, cpu, runFunction) {
  const eax0 = cpu.regs.eax >>> 0;
  const edx0 = cpu.regs.edx >>> 0;
  const esi0 = cpu.regs.esi >>> 0;
  const edi0 = cpu.regs.edi >>> 0;
  const ebp0 = cpu.regs.ebp >>> 0;

  heap.setU8(0x5f4949, 0);
  if ((heap.u16(0x991f8c) & 8) !== 0) {
    // 423c41
    lo8(cpu, "eax", heap.u8(0x5f4949));
    andBxFlags(cpu);
    return true;
  }
  // push edx; push esi; push eax
  if ((heap.u8(0x991f2b) & 1) === 0) {
    // 423c3e: pops restore everything
    lo8(cpu, "eax", heap.u8(0x5f4949));
    andBxFlags(cpu);
    return true;
  }
  let si = (heap.u16(0x991f28) + 0xf) & 0xfff0;
  lo16(cpu, "esi", si);
  let dx = cpu.regs.edx & 0xffff;
  if (dx < si) {
    // 423c4a: below the support base — error exit, CF=1
    sub16FlagsBorrow(cpu, dx, si);
    cpu.regs.edx = edx0; cpu.regs.esi = esi0; cpu.regs.eax = eax0;   // pops
    lo8(cpu, "eax", heap.u8(0x5f4949));
    cpu.eflags.CF = 1;                                               // stc
    return true;
  }
  dx = (dx - si) & 0xffff;
  dx = (dx >>> 4) & 0xffff;
  lo16(cpu, "edx", dx);
  const slope = heap.u8(0x991f2a);
  lo8(cpu, "ecx", slope);

  // Paint-call helper: mirrors `mov ebp,[0x991f88]; call [ebp*4 + table]`
  // with the binary's push edx/edi/ebp/esi … pop esi/ebp/edi/edx framing.
  // The staging happens between save and call; eax/ebx/ecx keep the
  // callee's exit values (binary doesn't restore them).
  const rotVal = () => heap.u32(0x991f88) >>> 0;

  let toSlope30 = (slope & 0x20) !== 0;
  let toMain = false;

  if (!toSlope30 && (slope & 0x10) !== 0) {
    // === steep pair (42390e) ===
    if (dx < 2) {
      sub16FlagsBorrow(cpu, dx, 2);
      cpu.regs.edx = edx0; cpu.regs.esi = esi0; cpu.regs.eax = eax0;
      lo8(cpu, "eax", heap.u8(0x5f4949));
      cpu.eflags.CF = 1;
      return true;
    }
    dx = (dx - 2) & 0xffff;
    lo16(cpu, "edx", dx);
    // push edx, edi, ebp, esi
    const sD = cpu.regs.edx >>> 0, sDi = cpu.regs.edi >>> 0,
          sBp = cpu.regs.ebp >>> 0, sSi = cpu.regs.esi >>> 0;
    cpu.regs.ebx = heap.u16(0x5f43d2 + edi0 * 8);
    if ((cpu.regs.ebx >>> 0) === 0) {
      // 4239d1: no steep image — slope piece instead
      cpu.regs.esi = sSi; cpu.regs.ebp = sBp; cpu.regs.edi = sDi; cpu.regs.edx = sD;
      si = (si + 0x20) & 0xffff;
      lo16(cpu, "esi", si);
      toSlope30 = true;
    } else {
      cpu.regs.ecx = (cpu.regs.ecx & 0x1f) >>> 0;
      lo16(cpu, "ebx", (cpu.regs.ebx + heap.u16(0x5f45c4 + cpu.regs.ecx * 2)) & 0xffff);
      lo16(cpu, "edx", si);
      cpu.regs.ebx = (cpu.regs.ebx | ebp0) >>> 0;
      const img2 = cpu.regs.ebx >>> 0;                  // push ebx
      lo8(cpu, "eax", 0); lo8(cpu, "ecx", 0);
      lo16(cpu, "edi", 0x20); lo16(cpu, "esi", 0x20);
      hi8(cpu, "eax", 0xb);
      heap.setU16(0x99a4e8, 0);
      heap.setU16(0x99a4ea, 0);
      heap.setU16(0x99a4ec, (si + 2) & 0xffff);
      lo16(cpu, "edx", si);                             // dx +2 then -2 = si
      cpu.regs.ebp = rotVal();
      paintBody432204(heap, cpu, cpu.regs.ebp & 3);
      cpu.regs.ebx = ((img2 + 4) >>> 0);                // pop ebx; add ebx,4
      lo16(cpu, "edx", (si + 0x10) & 0xffff);
      lo8(cpu, "eax", 0); lo8(cpu, "ecx", 0);
      lo16(cpu, "edi", 0x20); lo16(cpu, "esi", 0x20);
      hi8(cpu, "eax", 0xb);
      heap.setU16(0x99a4e8, 0);
      heap.setU16(0x99a4ea, 0);
      heap.setU16(0x99a4ec, (si + 0x12) & 0xffff);
      lo16(cpu, "edx", (si + 0x10) & 0xffff);
      cpu.regs.ebp = rotVal();
      paintBody432204(heap, cpu, cpu.regs.ebp & 3);
      cpu.regs.esi = sSi; cpu.regs.ebp = sBp; cpu.regs.edi = sDi; cpu.regs.edx = sD;
      heap.setU8(0x5f4949, 1);
      si = (si + 0x20) & 0xffff;
      lo16(cpu, "esi", si);
      toMain = true;
    }
  }

  if (!toMain && !toSlope30 && (slope & 0xf) !== 0) {
    // === single slope piece (423a20) ===
    if (dx < 1) {
      sub16FlagsBorrow(cpu, dx, 1);
      cpu.regs.edx = edx0; cpu.regs.esi = esi0; cpu.regs.eax = eax0;
      lo8(cpu, "eax", heap.u8(0x5f4949));
      cpu.eflags.CF = 1;
      return true;
    }
    dx = (dx - 1) & 0xffff;
    lo16(cpu, "edx", dx);
    const sD = cpu.regs.edx >>> 0, sDi = cpu.regs.edi >>> 0,
          sBp = cpu.regs.ebp >>> 0, sSi = cpu.regs.esi >>> 0;
    cpu.regs.ebx = heap.u16(0x5f43d2 + edi0 * 8);
    if ((cpu.regs.ebx >>> 0) === 0) {
      // 4239db: fall back to the slope piece, half height
      cpu.regs.esi = sSi; cpu.regs.ebp = sBp; cpu.regs.edi = sDi; cpu.regs.edx = sD;
      si = (si + 0x10) & 0xffff;
      lo16(cpu, "esi", si);
      toSlope30 = true;
    } else {
      cpu.regs.ecx = (cpu.regs.ecx & 0x1f) >>> 0;
      lo16(cpu, "ebx", (cpu.regs.ebx + heap.u16(0x5f45c4 + cpu.regs.ecx * 2)) & 0xffff);
      lo16(cpu, "edx", si);
      cpu.regs.ebx = (cpu.regs.ebx | ebp0) >>> 0;
      lo8(cpu, "eax", 0); lo8(cpu, "ecx", 0);
      lo16(cpu, "edi", 0x20); lo16(cpu, "esi", 0x20);
      hi8(cpu, "eax", 0xb);
      heap.setU16(0x99a4e8, 0);
      heap.setU16(0x99a4ea, 0);
      heap.setU16(0x99a4ec, (si + 2) & 0xffff);
      lo16(cpu, "edx", si);
      cpu.regs.ebp = rotVal();
      paintBody432204(heap, cpu, cpu.regs.ebp & 3);
      cpu.regs.esi = sSi; cpu.regs.ebp = sBp; cpu.regs.edi = sDi; cpu.regs.edx = sD;
      si = (si + 0x10) & 0xffff;
      lo16(cpu, "esi", si);
      heap.setU8(0x5f4949, 1);
      toMain = true;
    }
  }

  if (toSlope30) {
    // === 4239e3: 431bb8 slope piece at si-2, ah=0 ===
    const sD = cpu.regs.edx >>> 0, sDi = cpu.regs.edi >>> 0,
          sBp = cpu.regs.ebp >>> 0, sSi = cpu.regs.esi >>> 0;
    lo16(cpu, "edx", (si - 2) & 0xffff);
    cpu.regs.ebx = (heap.u16(0x5f43d0 + edi0 * 8) | ebp0) >>> 0;
    lo8(cpu, "eax", 0); lo8(cpu, "ecx", 0);
    lo16(cpu, "edi", 0x20); lo16(cpu, "esi", 0x20);
    hi8(cpu, "eax", 0);
    cpu.regs.ebp = rotVal();
    paintBody431bb8(heap, cpu, cpu.regs.ebp & 3);
    cpu.regs.esi = sSi; cpu.regs.ebp = sBp; cpu.regs.edi = sDi; cpu.regs.edx = sD;
    heap.setU8(0x5f4949, 1);
  }

  // === main loop (423a9a): vertical post segments ===
  while (dx !== 0) {
    // push edx, edi, ebp, esi — [esp+0xc] = dx at loop entry
    const sD = cpu.regs.edx >>> 0, sDi = cpu.regs.edi >>> 0,
          sBp = cpu.regs.ebp >>> 0, sSi = cpu.regs.esi >>> 0;
    let single = true;
    if ((si & 0x10) === 0 && dx > 1) {
      const paintAt = si;
      si = (si + 0x10) & 0xffff;
      lo16(cpu, "edx", paintAt);
      lo16(cpu, "esi", si);
      if (si !== heap.u16(0x991f2c)) {
        // === double-height segment (423ac4) ===
        cpu.regs.ebx = (heap.u16(0x5f43cc + edi0 * 8) | ebp0) >>> 0;
        hi8(cpu, "eax", dx === 2 ? 0x17 : 0x1c);        // cmp [esp+0xc],2
        lo8(cpu, "eax", 0); lo8(cpu, "ecx", 0);
        lo16(cpu, "edi", 0x20); lo16(cpu, "esi", 0x20);
        cpu.regs.ebp = rotVal();
        paintBody431bb8(heap, cpu, cpu.regs.ebp & 3);
        cpu.regs.esi = sSi; cpu.regs.ebp = sBp; cpu.regs.edi = sDi; cpu.regs.edx = sD;
        si = ((sSi & 0xffff) + 0x20) & 0xffff;
        lo16(cpu, "esi", si);
        heap.setU8(0x5f4949, 1);
        dx = (dx - 2) & 0xffff;
        lo16(cpu, "edx", dx);
        single = false;
      }
      // else: je 423b0d — single segment with dx = old si
    } else {
      lo16(cpu, "edx", si);                             // 423b0a: mov dx,si
    }
    if (single) {
      // === single-height segment (423b0d) ===
      cpu.regs.ebx = (heap.u16(0x5f43ce + edi0 * 8) | ebp0) >>> 0;
      hi8(cpu, "eax", dx === 1 ? 7 : 0xc);              // cmp [esp+0xc],1
      lo8(cpu, "eax", 0); lo8(cpu, "ecx", 0);
      lo16(cpu, "edi", 0x20); lo16(cpu, "esi", 0x20);
      cpu.regs.ebp = rotVal();
      paintBody431bb8(heap, cpu, cpu.regs.ebp & 3);
      cpu.regs.esi = sSi; cpu.regs.ebp = sBp; cpu.regs.edi = sDi; cpu.regs.edx = sD;
      si = ((sSi & 0xffff) + 0x10) & 0xffff;
      lo16(cpu, "esi", si);
      heap.setU8(0x5f4949, 1);
      dx = (dx - 1) & 0xffff;
      lo16(cpu, "edx", dx);
    }
  }

  // === top piece (423b53): pop eax (entry value) ===
  cpu.regs.eax = eax0;
  if ((eax0 & 0xffff) !== 0) {
    // push edx, edi, ebp
    const sD = cpu.regs.edx >>> 0, sDi = cpu.regs.edi >>> 0, sBp = cpu.regs.ebp >>> 0;
    const row = ((eax0 & 0xffff) - 1) & 0xffff;         // dec ax; and eax,0xffff
    cpu.regs.eax = row;
    cpu.regs.ebx = heap.u16(0x5f442c + sDi * 2);
    if ((cpu.regs.ebx & 0xffff) !== 0 && heap.u8(0x5f444b + row * 8) !== 0) {
      cpu.regs.ebx = ((cpu.regs.ebx + row) | sBp) >>> 0;
      lo16(cpu, "edx", si);
      let di = heap.u8(0x5f4444 + row * 8);
      lo16(cpu, "edi", di);
      heap.setU16(0x99a4e8, di);
      di = heap.u8(0x5f4445 + row * 8);
      lo16(cpu, "edi", di);
      heap.setU16(0x99a4ea, di);
      di = (sx8(heap.u8(0x5f4446 + row * 8)) + si) & 0xffff;
      lo16(cpu, "edi", di);
      heap.setU16(0x99a4ec, di);
      lo16(cpu, "edi", heap.u8(0x5f4447 + row * 8));
      lo16(cpu, "esi", heap.u8(0x5f4448 + row * 8));
      if (heap.u8(0x5f444a + row * 8) !== 0 && heap.u32(0x99a4f0) !== 0) {
        // attach variant — PTR [0x4328e0 + rot*4], interpreter-delegated
        hi8(cpu, "eax", heap.u8(0x5f4449 + row * 8));
        heap.setU8(0x5f4949, 1);
        lo8(cpu, "eax", 0); lo8(cpu, "ecx", 0);
        cpu.regs.ebp = rotVal();
        const target = heap.u32(0x4328e0 + (cpu.regs.ebp >>> 0) * 4) >>> 0;
        const sESP = cpu.regs.esp >>> 0, sEIP = cpu.regs.eip >>> 0, sCD = cpu.callDepth;
        runFunction(cpu, target, { stackTop: sESP, limit: 5_000_000 });
        cpu.regs.esp = sESP; cpu.regs.eip = sEIP; cpu.callDepth = sCD;
        if (!cpu.eflags.CF) {
          cpu.regs.edi = heap.u32(0x99a4f0) >>> 0;
          heap.setU32(cpu.regs.edi + 0x1c, cpu.regs.ebp >>> 0);
        }
      } else {
        // plain variant — PTR 0x432204
        hi8(cpu, "eax", heap.u8(0x5f4449 + row * 8));
        lo8(cpu, "eax", 0); lo8(cpu, "ecx", 0);
        cpu.regs.ebp = rotVal();
        paintBody432204(heap, cpu, cpu.regs.ebp & 3);
        heap.setU8(0x5f4949, 1);
      }
    }
    cpu.regs.ebp = sBp; cpu.regs.edi = sDi; cpu.regs.edx = sD;   // pops
  }
  // DONE (423c33): pop esi; pop edx
  cpu.regs.esi = esi0;
  cpu.regs.edx = edx0;
  lo8(cpu, "eax", heap.u8(0x5f4949));
  andBxFlags(cpu);
  return true;
}

/** Install the eip hook so every runFunction / native CALL into 0x4238b4
 * routes through the JS body. Mirrors install444e08Hook's framing. */
export function install4238b4Hook(cpu, runFunction, setEipHook, heap) {
  const hookFn = (c) => {
    const entryESP = c.regs.esp >>> 0;
    const entryEIP = c.regs.eip >>> 0;
    const entryCD = c.callDepth;
    let handled = false;
    if (!globalThis.__forceInterp4238b4) {
      try {
        handled = paintSupports4238b4(heap, c, runFunction);
      } catch (e) {
        if (!install4238b4Hook._warned) {
          install4238b4Hook._warned = true;
          if (typeof console !== "undefined") {
            console.warn(`[4238b4 port] JS body threw, falling back: ${(e.message || e).slice(0, 160)}`);
          }
        }
        handled = false;
      }
    }
    c.regs.esp = entryESP;
    c.regs.eip = entryEIP;
    c.callDepth = entryCD;
    if (!handled) {
      clearEipHook(0x004238b4);
      try {
        const sESP = c.regs.esp >>> 0, sEIP = c.regs.eip >>> 0, sCD = c.callDepth;
        runFunction(c, 0x004238b4, { stackTop: sESP, limit: 50_000_000 });
        c.regs.esp = sESP; c.regs.eip = sEIP; c.callDepth = sCD;
      } finally {
        _setEipHook(0x004238b4, hookFn);
      }
    }
  };
  _setEipHook(0x004238b4, hookFn);
}
