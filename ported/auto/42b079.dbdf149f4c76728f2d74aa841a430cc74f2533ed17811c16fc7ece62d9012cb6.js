// @manual — do not regenerate.
// Source: hand-disassembled from binary/rct.exe @ 0x42b079.
//
// Window proc installed by FUN_004298a0 (MainOpen) for the main game-
// viewport window. EBP at WindowCreate time = 0x42b079 → stored at
// window+0x0 → invoked indirectly by FUN_005e3f31's epilogue
// (see 5e3f31.js line 120: callIndirect(heap, heap.u32(puVar3), ...)).
//
// Disassembly:
//   0042b079  cmp edi, -1
//   0042b07c  jnz 0x431615        ; full event-dispatch body
//   0042b082  ret                 ; EDI == -1 → no-op (initial open)
//
// At boot, MainOpen invokes 5e3f31, which invokes this once with EDI=-1
// (initial create), so the no-op branch fires. Once the message loop
// dispatches a real event, EDI != -1 and execution falls into 0x431615
// — the viewport paint dispatch.
//
// 0x431615 disassembly (33 bytes — verified from the rom):
//   56              push esi                ; preserve window ptr
//   66 8b 47 04     mov ax,  [edi+4]        ; clip x  (DPI x  field)
//   66 8b 5f 06     mov bx,  [edi+6]        ; clip y  (DPI y  field)
//   66 8b 57 08     mov dx,  [edi+8]        ; clip w  (DPI w  field)
//   66 8b 6f 0a     mov bp,  [edi+0xa]      ; clip h  (DPI h  field)
//   66 03 d0        add dx,  ax             ; dx = right_exclusive  = x + w
//   66 03 eb        add bp,  bx             ; bp = bottom_exclusive = y + h
//   8b 76 08        mov esi, [esi+8]        ; esi = window->viewport
//   e8 02 00 00 00  call 0x431636           ; recursive splitter (calls 0x4316f3)
//   5e              pop esi                 ; restore window ptr
//   c3              ret
//
// The DPI struct layout (populated by FUN_009bb9f5 + initialized to 0):
//   +0   bits     (u32)
//   +4   x        (s16, default 0)
//   +6   y        (s16, default 0)
//   +8   w        (s16, 640 at boot)
//   +0xa h        (s16, 480 at boot)
//   +0xc pitch    (s16)
//   +0xe zoom    (u8)
//
// 0x431636 is a clip/quadtree splitter that ultimately tail-calls
// FUN_004316f3 with the same AX/BX/DX/BP/ESI/EDI register convention.
// For the 640x480 title viewport (no off-screen overflow), the splitter
// is effectively a no-op — it just forwards the rect. We skip it and
// call FUN_004316f3 directly to avoid going through the translator's
// 0x431636 (which is auto-generated and may have artifacts).
//
// FUN_004316f3 is the inner-paint dispatcher: it sets DAT_00991f8c
// (flag) + DAT_005f96c0..ce (the paint-iteration globals: tile-row
// start, slab origin), then iterates 0x20-wide strips across the clip
// rect, calling the paint chain (431b6f → 436b2a → 433bae → 433e1c)
// for each strip with the proper context.

import { regs } from "../../runtime/regs.js";
import { FUN_004316f3 } from "./4316f3.js";
import { FUN_extra_paint_431636 } from "./extra_paint_431636.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_0042b079(heap) {
  // 0x42b079..7c: branch on phase sentinel.
  if ((regs.edi >>> 0) === 0xffffffff) {
    // EDI == -1: initial open path is a single ret (no setup needed —
    // FUN_005e3f31 has already populated all the relevant window fields).
    return;
  }
  // 0x42b07c → 0x431615.
  const windowPtr = regs.esi >>> 0;
  const dpiPtr    = regs.edi >>> 0;

  // 0x431615..2c: push esi ; load clip rect from DPI ; mov esi, [esi+8].
  // Read the rect bytes directly from the DPI struct, matching the binary
  // — the harness preset regs.eax/ebx/ecx/edx are *also* (0, 0, 640, 480)
  // for the title viewport, but the real instruction reads from [edi+4..0xa],
  // so we do the same to track the binary 1:1.
  const clipX = heap.u16(dpiPtr + 0x4);          // ax = x
  const clipY = heap.u16(dpiPtr + 0x6);          // bx = y
  const clipW = heap.u16(dpiPtr + 0x8);          // dx = w (then add ax)
  const clipH = heap.u16(dpiPtr + 0xa);          // bp = h (then add bx)
  const rightEx  = (clipX + clipW) & 0xffff;     // dx = right exclusive
  const bottomEx = (clipY + clipH) & 0xffff;     // bp = bottom exclusive

  const viewportPtr = heap.u32(windowPtr + 8) >>> 0;
  if (viewportPtr === 0) {
    // Window has no attached viewport yet (window+8 = 0) — nothing to paint.
    regs.esi = windowPtr;
    return;
  }

  // Set registers exactly as 0x431615 would have done before the call to
  // 0x431636 (which we skip — the splitter is a clip/quadrant wrapper that
  // for the single 640x480 title viewport just forwards the rect to 4316f3).
  regs.eax = clipX;
  regs.ebx = clipY;
  regs.edx = rightEx;
  regs.ebp = bottomEx;
  regs.esi = viewportPtr;
  regs.edi = dpiPtr;

  // 0x431629: `call 0x431636` — the clip splitter. This used to call 4316f3
  // directly on the reasoning that the splitter is a no-op for a full-screen
  // rect. It is not a no-op: it is where the SCREEN-space clip the paint
  // dispatcher supplies is converted to the WORLD-space rect 4316f3 expects
  // (and where tall bands are split). See extra_paint_431636.js.
  //
  // GATED (CLAUDE.md's gating pattern): runtime/harness.js's legacy synthetic
  // pump — the only painter on the !__realStartup path, and the one the frozen
  // sc21 soak (canary 7b14266) was captured through — hands 42b079 a DPI whose
  // clip is ALREADY in world coordinates, precisely because this conversion was
  // missing. Running the splitter there would convert twice. Retire the gate
  // when the legacy pump goes.
  if (globalThis.__realStartup) {
    FUN_extra_paint_431636(heap);
  } else {
    FUN_004316f3(heap);
  }

  // 0x431634: pop esi — restore the window struct pointer for the caller
  // (the wndProc dispatcher in 5e3f31 doesn't actually rely on this since
  // it has its own state, but mirror the binary).
  regs.esi = windowPtr;
  return;
}
