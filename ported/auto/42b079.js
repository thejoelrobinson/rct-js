// @manual — do not regenerate.
// Source: hand-disassembled from binary/rct.exe @ 0x42b079.
//
// Window proc installed by FUN_004298a0 (MainOpen) for the main game-
// viewport window. EBP at WindowCreate time = 0x42b079 → stored at
// window+0x0 → invoked indirectly by FUN_005e3f31's epilogue
// (see 5e3f31.js line 120: callIndirect(heap, heap.u32(puVar3), ...)).
//
// THIS IS THE WINDOW PROC THAT WAS MISSING — without a JS function at
// 0x42b079, the indirect call from 5e3f31 would log:
//   [callIndirect] no JS function at 0x42b079 — returning 0
// at boot.
//
// Disassembly:
//   0042b079  cmp edi, -1
//   0042b07c  jnz 0x431615        ; full event-dispatch body
//   0042b082  ret                 ; EDI == -1 → no-op (initial open)
//
// At boot, MainOpen invokes 5e3f31, which invokes this once with EDI=-1
// (initial create), so the no-op branch fires. Once the message loop
// dispatches a real event, EDI != -1 and execution falls into 0x431615
// — the giant 1500+ byte viewport-paint quadtree splitter.
//
// The 0x431615 body is the recursive viewport paint splitter. Outline:
//   0x431615..35  entry: load rect (edi+4..a) → ax,bx,dx,bp ; esi=window->viewport
//                 (window+8) ; call body 0x431636 ; ret
//   0x431636..ec  recursive splitter — clips the dirty rect to the viewport,
//                 quadrants too-tall regions, accumulates 0x180-tall slabs,
//                 tail-calls 0x4316f3 for each leaf
//   0x4316f3..   inner paint: shifts rect into world coords, calls
//                 9b30bc (clip-fill), 431b6f (init paint slot ring),
//                 436b2a (terrain dispatch), 433bae (sprite z-sort),
//                 433e1c (sprite blit)
//
// Min-viable port: when EDI != -1, fall through to the painter setup.
// The recursive splitter body (0x431636..ec) is too large to hand-port
// cleanly in one pass. Instead we (a) read the viewport pointer from
// window+8, (b) compute the screen rect, (c) blit a background-coloured
// fill via 9b30f1 to give the viewport area visible color, then (d)
// invoke the inner paint chain helpers (431b6f, 436b2a, 433bae, 433e1c)
// — they're already ported and will write any sprite-list entries that
// the world state has produced. The rect-quadtree splitter is bypassed,
// which may produce incorrect tile boundaries for very tall viewports
// but is fine for the 640x480 title-screen viewport.

import { regs } from "../../runtime/regs.js";
import { FUN_009b30f1 } from "./9b30f1.js";
import { FUN_009b30bc } from "./9b30bc.js";
import { FUN_00431b6f } from "./431b6f.js";
import { FUN_00436b2a } from "./436b2a.js";
import { FUN_00433bae } from "./433bae.js";
import { FUN_00433e1c } from "./433e1c.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0042b079(heap) {
  // 0x42b079..7c: branch on phase sentinel.
  if ((regs.edi >>> 0) !== 0xffffffff) {
    // 0x42b07c → 0x431615..0x431ad6 — viewport paint dispatch.
    //
    // Entry-side preserves esi (the window struct), then:
    //   mov esi, [esi+8]    — esi = viewport struct pointer
    //   call 0x431636       — recursive paint
    //   pop esi             — restore window
    const windowPtr = regs.esi >>> 0;
    const viewportPtr = heap.u32(windowPtr + 8) >>> 0;

    // 0x9b2280's caller (9bc041) put the screen-coord clip rect into
    // (ax, bx) = (x, y) and (cx, dx) = (w, h). Convert to inclusive corners.
    const clipX = regs.eax & 0xffff;
    const clipY = regs.ebx & 0xffff;
    const clipW = regs.ecx & 0xffff;
    const clipH = regs.edx & 0xffff;
    const rightInc  = ((clipX + clipW - 1) & 0xffff) >>> 0;
    const bottomInc = ((clipY + clipH - 1) & 0xffff) >>> 0;

    // Skip if no viewport (window+8 = 0 means viewport not yet attached).
    if (viewportPtr === 0) {
      regs.esi = windowPtr;
      return;
    }

    // 0x431839..4f: viewport background fill — 0x0a0a0a0a colour pattern
    // when [0x991f8c] & 1 (a debug flag); else just the surrounding code.
    // Always do a base fill so the world area gets a visible color.
    regs.eax = clipX;
    regs.ebx = rightInc;
    regs.ecx = clipY;
    regs.edx = bottomInc;
    regs.ebp = 0x0a;  // sprite/op id 10 = solid fill (sky base)
    FUN_009b30f1(heap);

    // If the debug "force grid colour" flag is set, also blit it.
    if ((heap.u16(0x00991f8c) & 1) !== 0) {
      regs.eax = clipX;
      regs.ebx = rightInc;
      regs.ecx = clipY;
      regs.edx = bottomInc;
      regs.ebp = 0x0a0a0a0a >>> 0;
      FUN_009b30bc(heap);
    }

    // 0x43184f..69: initialize paint-slot ring + run sprite-list passes.
    //   mov dword [0x5f96e0], 0x6284ac   ; ring base
    //   mov dword [0x981ef8], edi        ; current paint context
    //   mov ebp, 0x5f96ec
    //   call 0x431b6f                    ; reset paint slot ring
    //   call 0x436b2a                    ; terrain-dispatch
    //   call 0x433bae                    ; sprite z-sort
    //   call 0x433e1c                    ; sprite blit
    heap.setU32(0x005f96e0, 0x006284ac);
    heap.setU32(0x00981ef8, viewportPtr);

    regs.ebp = 0x005f96ec;
    FUN_00431b6f(heap);

    FUN_00436b2a(heap);
    FUN_00433bae(heap);
    FUN_00433e1c(heap);

    // 0x431878..b0: peep/guest-overlay paint. [0x8d7eb4] indexes a
    // dword table at 0x628a3c; if != -1 do an overlay sprite blit.
    // Skipped in the minimum-viable port — peep overlays are rarely
    // visible at the title screen and the path needs more analysis.

    regs.esi = windowPtr;
    return;
  }
  // EDI == -1: initial open path is a single ret (no setup needed —
  // FUN_005e3f31 has already populated all the relevant window fields).
  return;
}
