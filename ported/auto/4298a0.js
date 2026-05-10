// @manual — do not regenerate.
// Source: decompiled/c/4298a0.c, validated against rct.exe @ 0x4298a0.
//
// Ghidra's C decompile of MainOpen is very lossy: it dropped ALL of the
// register-arg setup that the binary does before each `call 5e3f31` /
// `call 5e429d` / `call 5e412c`. The auto-translator's caller-side
// register propagation can only see what's in the C, so it ends up
// inserting hardcoded snapshots from a runtime trace
// (e.g. `regs.eax = 0x1e0000, regs.ebx = 0xffc00000`). Those snapshot
// values aren't even *consistent* between calls — they're whatever
// happened to be in those registers in some sample run.
//
// The result was that the FIRST 5e3f31 call (window 0, the main game
// viewport) received EBX=0xffc00000 instead of `(screen_h - 64) << 16 |
// screen_w`. Inside 5e3f31:
//
//     mov [esi + 0x20], eax     ; window+0x20 = EAX  → view_x, view_y
//     mov [esi + 0x24], ebx     ; window+0x24 = EBX  → view_w, view_h
//
// so window 0's embedded viewport rect ended up at (0, 30, 0, 0xffc0)
// instead of (0, 30, 640, screen_h-64). With width=0, FUN_009bc041's
// x-extent cull killed every paint call, leaving the surface blank.
//
// Hand-ported below from the disassembly. The structure matches the
// binary line-for-line: each `call 5e3f31` is preceded by the same
// `mov eax, ...; mov bx, ...; shl ebx, 0x10; mov bx, ...` sequence
// that the binary uses to pack (y << 16 | x) into EAX and (h << 16 | w)
// into EBX. The non-register state writes (DAT globals, widget table
// pointers, flag-bit ORs) are kept verbatim from the C.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00429aff } from "./429aff.js";
import { FUN_005e3f31 } from "./5e3f31.js";
import { FUN_005e412c } from "./5e412c.js";
import { FUN_005e429d } from "./5e429d.js";

// Pack (high16 << 16) | (low16 & 0xffff) as a u32, matching x86's
// `shl reg, 0x10; mov reg16, low` sequence.
function pack16(hi, lo) {
  return (((hi & 0xffff) << 16) | (lo & 0xffff)) >>> 0;
}

export function FUN_004298a0(heap) {
  const screenW = heap.u16(0x00971ed6);  // [0x971ed6] = display width
  const screenH = heap.u16(0x00971ed8);  // [0x971ed8] = display height
  // Read scaledMode TWICE — the binary tests `[0x99a500] & 1` separately at
  // 4298b0 (guards EAX/EBX setup) and at 42994b (selects layout branch).
  // Ports of game code in between can mutate the flag, so we mirror the
  // binary's two-test structure.
  const scaledMode1 = (heap.u32(0x0099a500) & 1) !== 0;

  // 4298a0..4298d8 — set up DAT_005f5114 / DAT_005f5118 (max-coord cache).
  //   In unscaled mode: cache_h = screenH - 64 (room for top toolbar).
  //   In scaled mode:   cache_h = screenH (no toolbar reservation).
  let toolbarH;
  if (scaledMode1) {
    toolbarH = screenH & 0xffff;
  } else {
    toolbarH = (screenH - 0x40) & 0xffff;
  }
  heap.setU16(0x005f5118, toolbarH);
  heap.setU16(0x005f5114, screenW & 0xffff);

  // ---- call 1: main game viewport window --------------------------------
  // Binary @ 4298a0..4298ee:
  //   mov eax, 0x1e0000              ; eax = (30 << 16) | 0  → view_y=30, view_x=0
  //   mov bx, screenH; sub bx, 0x40
  //   [if scaled mode: mov eax, 0; mov bx, screenH]
  //   shl ebx, 0x10; mov bx, screenW ; ebx = ((h-toolbar) << 16) | w  → view_h, view_w
  //   mov ecx, 0x100                 ; window flags (input class)
  //   mov edx, 0x42b076              ; widget proc
  //   mov ebp, 0x42b079              ; window proc
  //   call 5e3f31                    ; create window
  let eax1, ebxLow1;
  if (scaledMode1) {
    eax1 = 0;
    ebxLow1 = screenH & 0xffff;
  } else {
    eax1 = 0x1e0000;
    ebxLow1 = (screenH - 0x40) & 0xffff;
  }
  regs.eax = eax1 >>> 0;
  regs.ebx = pack16(ebxLow1, screenW);
  regs.ecx = 0x100 >>> 0;
  regs.edx = 0x42b076 >>> 0;
  regs.ebp = 0x42b079 >>> 0;
  FUN_005e3f31(heap);
  // ESI now = newly-created window pointer (set by 5e3f31's epilogue).

  let esi = regs.esi >>> 0;
  heap.setU32(esi + 0x1c, 0x005f5110);

  // ---- viewport allocation for the main window --------------------------
  // Binary @ 4298fa..42990a:
  //   mov edx, 0x07ff07ff
  //   mov eax, [esi + 0x20]     ; reload view_x|view_y from window
  //   mov ebx, [esi + 0x24]     ; reload view_w|view_h
  //   mov ecx, 0x02000000        ; viewport flags / zoom
  //   call 5e429d
  regs.edx = 0x07ff07ff >>> 0;
  regs.eax = heap.u32(esi + 0x20);
  regs.ebx = heap.u32(esi + 0x24);
  regs.ecx = 0x02000000 >>> 0;
  regs.esi = esi;
  FUN_005e429d(heap);

  // ---- post-call writes (5e429d sets EDI = viewport ptr in the binary,
  //      via `mov edi, [esi+8]`-equivalent — but the C uses `unaff_EDI`
  //      and the disasm shows `or word [edi+0x12], 0x800`. The binary
  //      keeps EDI live across the call, but to match what 5e429d wrote
  //      to *(esi+8), read it back here.)
  const viewport = heap.u32(esi + 8) >>> 0;
  if (viewport) {
    heap.setU16(viewport + 0x12, (heap.u16(viewport + 0x12) | 0x800) & 0xffff);
  }

  // 429915..429942 — clear a bunch of input-state globals.
  heap.setU32(0x00991f88, 0);
  heap.setU8 (0x005f4948, 0);
  heap.setU8 (0x0099fde0, 0);
  heap.setU8 (0x006522aa, 0);
  heap.setU8 (0x005f494a, 0);
  heap.setU8 (0x005f494b, 0);
  heap.setU16(0x00630b28, 1);

  // ---- the rest of MainOpen: 2 (or 3) sibling windows for toolbars / chrome
  // The binary has two completely separate code paths (unscaled vs scaled)
  // because the toolbar layouts differ. Both end with `call 429aff` (the
  // post-layout pass that recomputes rect overrides for siblings).

  // Re-read mode flag for layout branch (matches binary 42994b).
  const scaledMode2 = (heap.u32(0x0099a500) & 1) !== 0;
  if (!scaledMode2) {
    // ---- call 2: top toolbar window ------------------------------------
    // Binary @ 42995a..42997a:
    //   mov ebx, 0x1e0000          ; ebx = (30 << 16) | 0 → h=30, w=0
    //   mov bx, [0x971ed6]          ; ebx = 0x001e_<width>
    //   mov eax, 0                  ; (0,0)
    //   mov ecx, 0x201
    //   mov edx, 0x42a830
    //   mov ebp, 0x42afb5
    //   call 5e3f31
    regs.eax = 0 >>> 0;
    regs.ebx = pack16(0x1e, screenW);
    regs.ecx = 0x201 >>> 0;
    regs.edx = 0x42a830 >>> 0;
    regs.ebp = 0x42afb5 >>> 0;
    FUN_005e3f31(heap);
    esi = regs.esi >>> 0;
    heap.setU32(esi + 0x1c, 0x005f5124);
    heap.setU32(esi + 0x0c, (heap.u32(esi + 0x0c) | 0xfffff) >>> 0);
    regs.esi = esi;
    FUN_005e412c(heap);

    // ---- call 3: bottom toolbar / status bar ---------------------------
    // Binary @ 429992..4299ba:
    //   mov ax, screenH; sub ax, 0x22; shl eax, 0x10
    //   mov ebx, 0x220000; mov bx, screenW
    //   mov ecx, 0x202; mov edx, 0x429d41; mov ebp, 0x429f6c
    //   call 5e3f31
    const yTop = (screenH - 0x22) & 0xffff;
    regs.eax = pack16(yTop, 0);
    regs.ebx = pack16(0x22, screenW);
    regs.ecx = 0x202 >>> 0;
    regs.edx = 0x429d41 >>> 0;
    regs.ebp = 0x429f6c >>> 0;
    FUN_005e3f31(heap);
    esi = regs.esi >>> 0;
    heap.setU32(esi + 0x1c, 0x005f5268);
    heap.setU32(esi + 0x0c, (heap.u32(esi + 0x0c) | 0x1fc) >>> 0);
    heap.setU16(esi + 0x168, 0);
    regs.esi = esi;
    FUN_005e412c(heap);

    regs.esi = esi;
    regs.eax = 0xffde0000 >>> 0;
    return (regs.eax = FUN_00429aff(heap));
  }

  // ---- scaled-mode branch (calls 2 & 3 differ) --------------------------
  // Binary @ 4299e1..429a4f.
  // Call 2: scenario list / SDL menu window
  let yScaled = (screenH - 0x66) & 0xffff;
  let xScaled = ((screenW - 0x148) >>> 1) & 0xffff;
  regs.eax = pack16(yScaled, xScaled);
  regs.ebx = pack16(0x148, 0x52);
  regs.ecx = 0x21d >>> 0;
  regs.edx = 0x429a65 >>> 0;
  regs.ebp = 0x429ad5 >>> 0;
  FUN_005e3f31(heap);
  esi = regs.esi >>> 0;
  heap.setU32(esi + 0x1c, 0x005f531c);
  heap.setU32(esi + 0x0c, (heap.u32(esi + 0x0c) | 0xf) >>> 0);
  regs.esi = esi;
  FUN_005e412c(heap);

  // Call 3: scenario detail / sub window
  const yScaled2 = (screenH - 0xc8) & 0xffff;
  regs.eax = pack16(yScaled2, 0);
  regs.ebx = pack16(0xc8, 0x85);
  regs.ecx = 0x227 >>> 0;
  regs.edx = 0x429ae1 >>> 0;
  regs.ebp = 0x429ae4 >>> 0;
  FUN_005e3f31(heap);
  esi = regs.esi >>> 0;
  heap.setU32(esi + 0x1c, 0x005f5360);
  regs.esi = esi;
  FUN_005e412c(heap);
  heap.setU16(esi + 0x32, (heap.u16(esi + 0x32) | 0x10) & 0xffff);

  regs.esi = esi;
  regs.eax = 0xffde0000 >>> 0;
  return (regs.eax = FUN_00429aff(heap));
}
