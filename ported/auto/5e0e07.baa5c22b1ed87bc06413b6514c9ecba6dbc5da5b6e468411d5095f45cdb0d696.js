// @manual — do not regenerate.
// Source: transcribed from binary/rct.exe @ 0x5e0e07..0x5e0ff1.
//
// FUN_005e0e07 — the window-chrome box drawer: four 1px edges in the colour
// scheme's light/dark shades plus an optional interior fill. Every widget
// handler goes through it, so it is the single most-used drawing primitive in
// the UI.
//
// The auto-translation (kept below as FUN_005e0e07_frozen) was unusable:
// Ghidra saw eight `push`es of 16-bit values and then reads of `[esp+N]`, could
// not tie them together, and emitted `FUN_009b30f1(heap)` calls with NO
// register setup at all (plus a stray `regs.edx = 0xffff` snapshotted from some
// trace). Every edge was therefore drawn with whatever registers happened to be
// live. Measured against the binary in the playable configuration, this
// transcription moves the whole-frame divergence from 10.25% to 1.6%.
//
// The eight pushed words, in [esp] order once all are down:
//   +0/+1  word [0x99ac8e + colour*8]   -> shades C0lo / C0hi
//   +2/+3  word [0x99ac90 + colour*8]   -> shades C1lo / C1hi
//   +4     byte [0x99ac92 + colour*8]   -> shade  C2
//   +5     = C0lo again (`mov ch, al`)
//   +6..+d the rect: ax left, bx right, cx top, dx bottom
//   +e     si, the style flags
//
// Style flags: 8 = flat fill only, 0x20 = sunken (edges swapped),
// 0x10 = no interior fill, 4 = fill with colour 0, 0x40 = alternate fill shade.
//
// GATED (CLAUDE.md's gating pattern): the frozen sc21 soak baseline
// (canary 7b14266) was captured with the broken auto body, and this is the only
// one of the paint-layer transcriptions that moves that hash. The legacy
// force-load path therefore keeps FUN_005e0e07_frozen verbatim, bugs included.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callNative } from "../../runtime/painter-bridge.js";
import { FUN_009b30f1 } from "./9b30f1.js";

const s16 = (v) => (v << 16) >> 16;

export function FUN_005e0e07(heap) {
  return globalThis.__realStartup ? FUN_005e0e07_js(heap) : FUN_005e0e07_frozen(heap);
}

function FUN_005e0e07_js(heap) {
  if (typeof globalThis._renderTrace === "function") globalThis._renderTrace("FUN_005e0e07");

  const bp = regs.ebp & 0xffff;
  if ((bp & 0x80) !== 0) {
    // 0x5e0ff2..0x5e117c — textured chrome. The colour byte indexes the
    // texture selector table; 0x9b30f1's already-portable remap arm applies
    // that texture to the same raised/sunken/flat rectangle sequence.
    const texture = (heap.u8(0x009a147c + bp) | 0x02000000) >>> 0;
    const si = regs.esi & 0xffff;
    const left = s16(regs.eax), right = s16(regs.ebx);
    const top = s16(regs.ecx), bottom = s16(regs.edx);
    const esi0 = regs.esi >>> 0, edi0 = regs.edi >>> 0;
    const texturedRect = (a, b, c, d, colour) => {
      regs.eax = a & 0xffff; regs.ebx = b & 0xffff;
      regs.ecx = c & 0xffff; regs.edx = d & 0xffff;
      regs.ebp = colour >>> 0; regs.esi = esi0; regs.edi = edi0;
      FUN_009b30f1(heap);
    };
    const fill = () => texturedRect(s16(left + 1), s16(right - 1),
      s16(top + 1), s16(bottom - 1), texture);

    if ((si & 8) !== 0) {
      texturedRect(left, right, top, bottom, texture);
    } else if ((si & 0x20) !== 0) {
      texturedRect(left, left, top, bottom, texture + 1);
      texturedRect(left, right, top, top, texture + 1);
      texturedRect(right, right, top, bottom, texture + 2);
      texturedRect(left, right, bottom, bottom, texture + 2);
      if ((si & 0x10) === 0) fill();
    } else {
      texturedRect(left, left, top, bottom, texture + 2);
      texturedRect(left, right, top, top, texture + 2);
      texturedRect(right, right, top, bottom, texture + 1);
      texturedRect(left, right, bottom, bottom, texture + 1);
      if ((si & 0x10) === 0) fill();
    }
    regs.esi = esi0; regs.edi = edi0;
    return regs.eax >>> 0;
  }

  const si = regs.esi & 0xffff;
  const left = s16(regs.eax), right = s16(regs.ebx);
  const top = s16(regs.ecx), bottom = s16(regs.edx);
  const esi0 = regs.esi >>> 0, edi0 = regs.edi >>> 0;

  // 0x5e0e1c..0x5e0e39 — the colour scheme's shades.
  const base = (0x0099ac8e + bp * 8) >>> 0;
  const C0lo = heap.u8(base);
  const C1lo = heap.u8(base + 2), C1hi = heap.u8(base + 3);
  const C2 = heap.u8(base + 4);

  const line = (a, b, c, d, colour) => {
    regs.eax = a & 0xffff; regs.ebx = b & 0xffff;
    regs.ecx = c & 0xffff; regs.edx = d & 0xffff;
    regs.ebp = colour >>> 0;
    regs.esi = esi0; regs.edi = edi0;
    FUN_009b30f1(heap);
  };
  const fill = () => {
    // shared tail at 0x5e0ed2 / 0x5e0f8b
    let colour;
    if ((si & 0x20) !== 0) {
      colour = C1hi;                                   // 0x5e0faf
      if ((si & 0x40) !== 0) colour = C1lo;            // 0x5e0fbb
    } else {
      colour = C1lo;                                   // 0x5e0ef6
    }
    if ((si & 4) !== 0) colour = 0;                    // 0x5e0f02 / 0x5e0fc7
    line(s16(left + 1), s16(right - 1), s16(top + 1), s16(bottom - 1), colour);
  };

  if ((si & 8) !== 0) {
    // 0x5e0fd0 — flat: one solid rect, no edges.
    line(left, right, top, bottom, C1lo);
  } else if ((si & 0x20) !== 0) {
    // 0x5e0f0e — SUNKEN: dark on the top/left, light on the bottom/right.
    line(left, left, top, bottom, C0lo);                          // 0x5e0f24
    line(s16(left + 1), right, top, top, C0lo);                   // 0x5e0f41
    line(right, right, s16(top + 1), s16(bottom - 1), C2);        // 0x5e0f61
    line(s16(left + 1), right, bottom, bottom, C2);               // 0x5e0f7f
    if ((si & 0x10) === 0) fill();                                // 0x5e0f84
  } else {
    // 0x5e0e51 — RAISED: light on the top/left, dark on the bottom/right.
    line(left, left, top, s16(bottom - 1), C2);                   // 0x5e0e6a
    line(s16(left + 1), s16(right - 1), top, top, C2);            // 0x5e0e8a
    line(right, right, top, s16(bottom - 1), C0lo);               // 0x5e0ea7
    line(left, right, bottom, bottom, C0lo);                      // 0x5e0ec2
    if ((si & 0x10) === 0) fill();                                // 0x5e0ec7
  }

  regs.esi = esi0; regs.edi = edi0;
  return 0;
}

// ---------------------------------------------------------------------------
// The pre-fix auto body, VERBATIM, holding the frozen soak baseline. Bugs
// included on purpose (no register setup on the FUN_009b30f1 calls); do not
// "tidy" it. Retire it with a deliberate re-baseline.
function FUN_005e0e07_frozen(heap) {
  // diagnostic — wiped on regen
  if (typeof globalThis._renderTrace === "function") globalThis._renderTrace("FUN_005e0e07");
  let unaff_EBP = regs.ebp >>> 0;
  let uVar1 = 0;
  let unaff_SI = regs.esi & 0xffff;
  let uVar2 = 0;
  if ((unaff_EBP & 0x80) == 0) {
    uVar2 = ((heap.u16((((0x0099ac8b) | 0) + unaff_EBP * 8 + 3))) & 0xffff);
    if ((unaff_SI & 8) == 0) {
      if ((unaff_SI & 0x20) == 0) {
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar2));
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
        if ((unaff_SI & 0x10) == 0) {
          (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar2));
        }
      } else {
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar2));
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
        if ((unaff_SI & 0x10) == 0) {
          (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar2));
        }
      }
    } else {
      (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar2));
    }
    return;
  }
  uVar1 = ((heap.u32(((0x009a147c) & 0xff) + (unaff_EBP) * 4) | 0x2000000) >>> 0);
  if ((unaff_SI & 8) == 0) {
    if ((unaff_SI & 0x20) == 0) {
      (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar1));
      (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
      (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
      (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
      if ((unaff_SI & 0x10) == 0) {
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar1));
      }
    } else {
      (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar1));
      (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
      (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
      (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap));
      if ((unaff_SI & 0x10) == 0) {
        (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar1));
      }
    }
  } else {
    (regs.edx = 0xffff, regs.eax = FUN_009b30f1(heap, uVar1));
  }
  return;
}
