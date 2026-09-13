// @manual — do not regenerate.
// Source: transcribed from binary/rct.exe @ 0x9ba943..0x9bacc6.
//
// FUN_009ba943 — RCT's string blitter: render a formatted string at CX/DX into
// the DPI at EDI, one glyph at a time through 0x9b4457, honouring the inline
// escape codes for font, colour, newline and inline sprites.
//
//   AL  = colour selector (0xfe / 0xff skip the colour setup entirely)
//   CX  = x, DX = y, ESI = string, EDI = DPI
//   word [0x971e84] = current font offset, word [0x971ef2] = style flags
//
// The auto-translation was unusable: its control flow is almost entirely the
// translator's soft "unsupported goto -> early return", so it bailed before
// drawing anything. Measured with tools/_drawstroracle.mjs it put ZERO non-zero
// pixels on the surface where the binary puts 371-537, and matched 0 of 5
// colours. This was the last thing standing between the all-JS paint path
// (__jsPaint) and parity — with the original bytes in its place the playable
// configuration measures 56 divergent pixels instead of 687.
//
// Ghidra's "function" at this address runs to 0x9bafe6, but 0x9bacc7 is a
// separate entry point; the body here ends at 0x9bacc5's `jmp 0x9bacae`.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callIndirect, state as runtimeState } from "../../runtime/win32/context.js";
import { FUN_009b438b } from "./9b438b.js";
import { FUN_009b4457 } from "./9b4457.js";

const s16 = (v) => (v << 16) >> 16;
const u16 = (v) => v & 0xffff;

const FONT = 0x00971e84;      // current font offset
const FLAGS = 0x00971ef2;     // style flags: 1 = palette set by code, 2 = shadow
const HOME_X = 0x009aa064;    // the x/y the string started at (newline home)
const HOME_Y = 0x009aa066;
const WIDTHS = 0x0099a508;    // per-glyph advance table, indexed by font + char
const PAL = 0x0099ac89;       // the 4-byte palette the blitters read via 0x9a200c

export function FUN_009ba943(heap) {
  if ((globalThis.__realStartup || runtimeState.executionMode === "pure-js") && runtimeState.promotedLiftedAddresses?.has(0x9ba943)) {
    return callIndirect(heap, 0x9ba943);
  }
  let eax = regs.eax >>> 0;
  let cx = s16(regs.ecx), dx = s16(regs.edx);
  let esi = regs.esi >>> 0;
  const edi = regs.edi >>> 0;

  const clipX = () => heap.i16(edi + 4), clipY = () => heap.i16(edi + 6);
  const clipW = () => heap.i16(edi + 8), clipH = () => heap.i16(edi + 0xa);

  if (globalThis.__DS && globalThis.__DS.length < 12) {
    const raw = [];
    for (let i = 0; i < 40; i++) { const c = heap.u8(esi + i); if (!c) break; raw.push(c >= 32 && c < 127 ? String.fromCharCode(c) : "\\x" + c.toString(16)); }
    globalThis.__DS.push(`al=0x${(eax & 0xff).toString(16)} cx=${cx} dx=${dx} font=0x${heap.u16(FONT).toString(16)} flags=0x${heap.u16(FLAGS).toString(16)} dpi[x=${heap.i16(edi+4)} y=${heap.i16(edi+6)} w=${heap.i16(edi+8)} h=${heap.i16(edi+0xa)}] "${raw.join("")}"`);
  }
  heap.setU16(HOME_X, u16(cx));                       // 0x9ba943
  heap.setU16(HOME_Y, u16(dx));

  let al = eax & 0xff;
  let setColour = true;
  if (al === 0xfe) setColour = false;                 // 0x9ba951
  else {
    // 0x9ba959..0x9ba99f — reject a string that cannot touch the clip at all.
    if (cx >= s16(clipX() + clipW())) return 0;
    if (s16(cx + 0x500) <= clipX()) return 0;
    if (dx >= s16(clipY() + clipH())) return 0;
    if (s16(dx + 0x1e0) <= clipY()) return 0;
    if (al === 0xff) setColour = false;               // 0x9ba99f
  }

  // 0x9ba9dc..0x9baa12 — resolve AL into the 4-byte palette at 0x99ac89.
  // The binary leaves EBP holding whatever its colour setup put there — the
  // palette-table base at 0x9ba9ec, or the colour index at 0x9ba9ca — and the
  // glyph blitter 0x9b4457 reads it. Not modelling this was worth 3,820 wrong
  // pixels on the one dirty column where the string starts left of the clip
  // (tools/_drawstroracle.mjs CLIP=64,446,64,34).
  let ebp = regs.ebp >>> 0;
  const applyColour = (code) => {
    if ((heap.u16(FLAGS) & 1) !== 0) return;          // 0x9ba9dc
    let a = code & 0xff;                              // 0x9ba9e7
    const tbl = heap.u32(0x0093a464) >>> 0;           // 0x9ba9ec
    ebp = tbl;
    a = heap.u32((tbl + a * 4) >>> 0) >>> 0;          // 0x9ba9f2
    if ((heap.u16(FLAGS) & 2) === 0) a = a & 0xffff00ff;  // 0x9baa01 `xor ah,ah`
    heap.setU32(PAL, a >>> 0);                        // 0x9baa03
    heap.setU32(0x009a200c, 0x0099ac88);
  };

  if (setColour) {
    heap.setU16(FLAGS, 0);                            // 0x9ba9a3
    const bit5 = (eax >>> 5) & 1;                     // 0x9ba9ac `btr ax, 5`
    eax = eax & ~0x20;
    if (bit5) heap.setU16(FLAGS, u16(heap.u16(FLAGS) | 2));
    if ((eax & 0x40) !== 0) {                         // 0x9ba9bb
      heap.setU16(FLAGS, u16(heap.u16(FLAGS) | 1));
      const idx = eax & 0x1f;
      ebp = idx >>> 0;                                // 0x9ba9ca `mov ebp, eax`
      const lo = heap.u8((0x0099ac8f + idx * 8) >>> 0);
      const hi = heap.u8((0x0099ac91 + idx * 8) >>> 0);
      heap.setU32(PAL, ((hi << 8) | lo) >>> 0);       // 0x9baa03 with ax = hi:lo
      heap.setU32(0x009a200c, 0x0099ac88);
    } else {
      applyColour(eax & 0xff);
    }
  }

  // ---- the walk -----------------------------------------------------------
  // Faithful to the binary's three entry labels. The row check at 0x9baa14 is
  // NOT per-character: the glyph and control-code paths all jump back to
  // 0x9baa36 (NEXT), and only the entry and the colour-code paths re-enter at
  // 0x9baa14. Getting that wrong makes `skipping` latch mid-line.
  const ROWCHECK = 0, NEXT = 1, SKIP = 2;
  let state = ROWCHECK;

  for (;;) {
    if (state === ROWCHECK) {                         // 0x9baa14
      if (s16(dx + 0x13) <= clipY()) { state = SKIP; continue; }
      if (s16(clipY() + clipH()) <= dx) { state = SKIP; continue; }
      state = NEXT;
    }

    if (state === SKIP) {                             // 0x9bacae
      al = heap.u8(esi); esi = (esi + 1) >>> 0;
      if (al >= 0x20) {                               // 0x9bacb1 `jb 0x9baa39`
        if (al >= 0x9c) continue;                     // 0x9bacb9
        if (al >= 0x8e) {                             // 0x9bacbd -> 0x9babe5
          applyColour((al - 0x8e) & 0xff);
          state = ROWCHECK; continue;
        }
        continue;                                     // 0x9bacc5
      }
      // al < 0x20 — re-enters the dispatch at 0x9baa39 and falls to the
      // control-code handling, whose handlers all `jmp 0x9baa36` (drawing).
      if (al === 0) return 0;
      state = NEXT;
    } else {
      al = heap.u8(esi); esi = (esi + 1) >>> 0;       // 0x9baa36
      if (al === 0) return 0;                         // 0x9baa3b
      if (al < 0x9c && al >= 0x8e) {                  // 0x9baa41
        applyColour((al - 0x8e) & 0xff);              // 0x9babe5 -> 0x9ba9dc
        state = ROWCHECK; continue;
      }
      if (al >= 0x20) {
        // 0x9baa49 — a printable glyph.
        const ch = (al - 0x20) & 0xff;
        if (cx >= s16(clipX() + clipW())) { state = SKIP; continue; }     // 0x9baa58
        const gi = u16(ch + heap.u16(FONT));
        const w = heap.u8((WIDTHS + gi) >>> 0);
        if (s16(cx + 0x1a) < clipX()) {               // 0x9baa69 -> 0x9baaa7
          cx = s16(cx + w);
          continue;
        }
        heap.setU32(0x009a2000, 0x20000000);          // 0x9baa88
        regs.ebx = (gi + 0x5a1e) >>> 0;               // 0x9baa82
        regs.ecx = u16(cx); regs.edx = u16(dx);
        regs.edi = edi; regs.esi = esi; regs.ebp = ebp;
        FUN_009b4457(heap);                           // 0x9baa92
        cx = s16(cx + w);                             // 0x9baa9f
        continue;
      }
      // al < 0x20 — control code, handled below.
    }

    // ---- control codes (0x9baabf); every handler returns to NEXT ---------
    state = NEXT;
    switch (al) {
      case 5:                                         // 0x9bab9b — big newline
      case 6: {                                       // 0x9bab65 — small newline
        cx = s16(heap.u16(HOME_X));
        dx = s16(dx + (al === 5 ? 0xa : 5));
        const font = heap.u16(FONT);
        if (font > 0xe0) {                            // `jbe` skips the rest
          dx = s16(dx - (al === 5 ? 4 : 2));
          if (font !== 0x1c0) dx = s16(dx + (al === 5 ? 0xc : 6));
        }
        break;
      }
      case 1: {                                       // 0x9babd1 — x offset
        const off = heap.u8(esi); esi = (esi + 1) >>> 0;
        cx = s16(heap.u16(HOME_X) + off);
        break;
      }
      case 0x11: {                                    // 0x9babec — x/y offset
        const lo = heap.u8(esi), hi = heap.u8(esi + 1);
        esi = (esi + 2) >>> 0;
        cx = s16(heap.u16(HOME_X) + lo);
        dx = s16(heap.u16(HOME_Y) + hi);
        break;
      }
      case 7: heap.setU16(FONT, 0x1c0); break;        // 0x9bac0f
      case 8: heap.setU16(FONT, 0x2a0); break;        // 0x9bac1d
      case 9: heap.setU16(FONT, 0xe0); break;         // 0x9bac39
      case 0xa: heap.setU16(FONT, 0); break;          // 0x9bac2b
      case 0xb: heap.setU16(FLAGS, u16(heap.u16(FLAGS) | 2)); break;      // 0x9bac47
      case 0xc: heap.setU16(FLAGS, u16(heap.u16(FLAGS) & 0xfffd)); break; // 0x9bac54
      case 2: {                                       // 0x9bac61 — palette from a sprite
        const n = heap.u8(esi); esi = (esi + 1) >>> 0;
        if ((heap.u16(FLAGS) & 1) !== 0) { state = ROWCHECK; break; }     // 0x9bac6e
        let a = heap.u32((0x009aa06c + n * 4) >>> 0) >>> 0;
        a = (a << 4) >>> 0;
        a = heap.u32((a + 0x008dc0b4) >>> 0) >>> 0;
        const v = heap.u8((a + 0xf9) >>> 0) & 0xff;   // 0x9bac84
        const ah = (heap.u16(FLAGS) & 2) !== 0 ? 1 : 0;                   // 0x9bac8a/0x9bac97
        heap.setU16(PAL, u16((ah << 8) | v));         // 0x9bac99 — a WORD store
        heap.setU32(0x009a200c, 0x0099ac88);
        state = ROWCHECK;                             // 0x9baca9
        break;
      }
      case 0x17: {                                    // 0x9bab20 — inline sprite
        const img = heap.u32(esi) >>> 0;
        esi = (esi + 4) >>> 0;
        if (cx >= s16(clipX() + clipW())) { state = SKIP; break; }        // 0x9bab2e
        const w = heap.u16(((((img & 0x1ffff) << 4) >>> 0) + 0x008dc0b8) >>> 0);
        regs.ebx = img;                               // 0x9bab34
        regs.ecx = u16(cx); regs.edx = u16(dx);
        regs.edi = edi; regs.esi = esi; regs.ebp = ebp;
        FUN_009b438b(heap);                           // 0x9bab4e
        cx = s16(cx + (w & 0xff));                    // 0x9bab5b `add cl, al`
        break;
      }
      default: break;                                 // 0x9bab1b — ignored
    }
  }
}
