// @manual — do not regenerate.
// Source: hand-disassembled from binary/rct.exe @ 0x5e48a7.
//
// Per-widget render handler reached via the jump table at 0x5e452c
// inside FUN_005e4400 (the widget-array walker). The table dispatches
// on `byte [ebp]` (widget type), and entries 0x00, 0x04 and 0x05 all
// land here — these are the "image" / sprite-blit widgets.
//
// Calling convention (carries over from FUN_005e4400's loop body):
//   ESI = window struct pointer (window+0x20/0x22 = origin x/y)
//   EBP = pointer to the current 16-byte widget record:
//           +0x00: u8 widget type
//           +0x01: u8 color / palette index
//           +0x02: i16 left
//           +0x04: i16 right
//           +0x06: i16 top
//           +0x08: i16 bottom
//           +0x0a: i32 image index (-1 = no image, this widget paints
//                  nothing; large negative = indirect image-table
//                  lookup at [0x9a161c + 4*(ebx&0xffff)])
//   EDI = clip rect (used by the loop body, not directly here)
//
// Globals consulted:
//   [0x9a13f8] u16 — last-set "color/palette" byte (stashed on entry)
//   [0x9a13e0] u32 — bit 0 = "indirect / dialog mode" (skip blit, use
//     special outline path 0x5e48ce). Cleared on most widgets.
//   [0x9a13e4] u16 — primary hover-state countdown
//   [0x9a13e6] u16 — secondary hover-state countdown
//   [0x9a13e8] u32 — "highlight" bitmask (bit 0 = active)
//
// The full body covers 0x5e48a7..0x5e5300 (the shared epilogue +
// final `ret`). Most of that volume handles other widget types via
// fall-through tail-merge from sibling jump-table entries (0x5e48f9,
// 0x5e4b8c, 0x5e4ace, 0x5e4d0c, 0x5e5127, etc.). When we are entered
// at 0x5e48a7 specifically — widget type 0/4/5 — only the path
// through 0x5e48a7..f4 and the sibling-shared 0x5e496e..5e4ac9 are
// reachable on the no-flag fast path. We port those, plus the
// "indirect image-table" branch at 0x5e49cf because real widgets use
// it (toolbar buttons in particular).
//
// Minimum-viable port (precedent: 429f6c.js). We leave the
// dialog-mode/special-render branch (the [0x9a13e0]&1 path at
// 0x5e4a25+) as a TODO — that path renders the "stamped" dialog-
// frame variant which only triggers when the parent window is in
// a specific draw state; the normal in-game render hits the fast
// path.

import { regs } from "../../runtime/regs.js";
import { FUN_009b438b } from "./9b438b.js";
import { FUN_005e0e07 } from "./5e0e07.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_005e48a7(heap) {
  const ebp = regs.ebp >>> 0;
  const esi = regs.esi >>> 0;

  // 0x5e48a7..ac: stash the widget's color/palette byte to the global
  // "current sprite palette" slot. Downstream blit helpers read this.
  const colorByte = heap.u8(ebp + 1) & 0xff;
  heap.setU16(0x009a13f8, colorByte);

  // 0x5e48b2..b8: image index = -1 sentinel means "no sprite", skip
  // straight to the shared epilogue (we model that as just returning).
  let ebx = heap.u32(ebp + 0x0a) >>> 0;
  if (ebx === 0xffffffff) {
    return;
  }

  // 0x5e48be..c8: dialog-mode gate. Bit 0 of [0x9a13e0] selects the
  // "stamped frame" alternate rendering path (0x5e48ce / 0x5e4a25).
  // Real in-game widgets hit the !flag branch; only certain dialog
  // refreshes set the flag.
  const dialogFlag = (heap.u32(0x009a13e0) & 0x1) !== 0;
  if (dialogFlag) {
    // TODO: port the dialog-mode/stamped-frame branch at 0x5e48ce..f4
    // (handles `byte [ebp]==6` only; types 0/4/5 fall straight to
    // exit via the `jne 0x5e52a7` at 0x5e48d2). For types 0/4/5
    // there is effectively no work — return.
    return;
  }

  // 0x5e496e..77: compute screen-space anchor for the sprite.
  // cx = ebp+2 (widget left)  + esi+0x20 (window origin x)
  // dx = ebp+6 (widget top)   + esi+0x22 (window origin y)
  let cx = (heap.u16(ebp + 2) + heap.u16(esi + 0x20)) & 0xffff;
  let dx = (heap.u16(ebp + 6) + heap.u16(esi + 0x22)) & 0xffff;

  // 0x5e497e..98e: if widget type is 3/5/6, conditionally pick the
  // "pressed / highlighted" sprite variant by adding 1 to the image
  // index. Triggered when the hover-state matches this widget (both
  // countdowns nonzero AND the highlight bit is set).
  const wtype = heap.u8(ebp) & 0xff;
  if (wtype === 0x03 || wtype === 0x05 || wtype === 0x06) {
    const highlightBit = (heap.u32(0x009a13e8) & 0x1) !== 0;
    const hover1 = heap.u16(0x009a13e4) !== 0;
    const hover2 = heap.u16(0x009a13e6) !== 0;
    // The asm short-circuits: skip if (highlightBit), else require
    // (hover1 != 0 && hover2 != 0). When BOTH hovers are set and
    // highlight is clear → bump to the "pressed" variant.
    if (!highlightBit && hover1 && hover2) {
      ebx = (ebx + 1) >>> 0;
    }
  }

  // 0x5e49b1..bd: re-check the dialog flag (already 0 on this path) —
  // and at 0x5e49bf branch on ebx's sign bit. Positive ebx → direct
  // image index; negative → indirect lookup in the image-pointer table
  // at 0x9a161c (used by toolbar buttons: the widget stores -N and the
  // real image comes from a per-tool state array).
  if ((ebx & 0x80000000) !== 0) {
    // 0x5e49cf..a04: indirect image-table path.
    // ebx = ebx & 0xffff (the low word is an index)
    // ebp_ptr = [0x9a161c + 4*ebx]  (struct pointer)
    // ebx = movzx word [ebp_ptr]    (first u16 of struct = base image)
    // Then on hover-state, possibly bump ebx by either word [ebp_ptr+2]
    // or word [ebp_ptr + 6 + 2*(((cx + [0x9a1618]) >> 2) % word[ebp_ptr+4])]
    // (a small animation/strip selector).
    const tableIdx = ebx & 0xffff;
    const structPtr = heap.u32(0x009a161c + 4 * tableIdx) >>> 0;
    let imgIdx = heap.u16(structPtr) & 0xffff;

    // 0x5e49e0..a04: hover-state animation pick (skipped if the
    // highlight bit is set or either hover countdown is zero).
    const highlightBit = (heap.u32(0x009a13e8) & 0x1) !== 0;
    const hover1 = heap.u16(0x009a13e4) !== 0;
    const hover2 = heap.u16(0x009a13e6) !== 0;
    if (!highlightBit && hover1 && hover2) {
      // 0x5e4a06..23: compute an animation-strip offset.
      // eax = movzx(cx) + [0x9a1618]; eax >>= 2;
      // edx:eax / word[ebp_ptr+4]  → dx = remainder
      // ebx = word[ebp_ptr + 6 + 2*dx]
      const divisor = heap.u16(structPtr + 4) & 0xffff;
      if (divisor !== 0) {
        const numerator = ((cx & 0xffff) + (heap.u32(0x009a1618) >>> 0)) >>> 2;
        const rem = numerator % divisor;
        imgIdx = heap.u16(structPtr + 6 + 2 * rem) & 0xffff;
      } else {
        // div-by-zero in the real CPU would fault; mirror by skipping
        // the override and keeping the base image.
      }
    }
    // 0x5e49c3: call sprite-blit helper. Args via registers:
    //   ebx = image index, ecx = x, edx = y, esi = window-struct ptr
    //   ebp = the (loaded) struct pointer — but FUN_009b438b actually
    //         reads ebp from regs as the palette/flags byte.
    regs.ebx = imgIdx >>> 0;
    regs.ecx = cx;
    regs.edx = dx;
    regs.esi = esi;
    regs.ebp = structPtr >>> 0;
    FUN_009b438b(heap);
    return;
  }

  // 0x5e49c3..ca: positive ebx → direct sprite-blit call.
  // Args via registers: ebx = image index, ecx = x, edx = y,
  // esi = window-struct ptr, ebp = widget-record ptr (palette byte
  // is at [ebp+1] which the blit helper consults).
  regs.ebx = ebx >>> 0;
  regs.ecx = cx;
  regs.edx = dx;
  regs.esi = esi;
  regs.ebp = ebp >>> 0;
  FUN_009b438b(heap);

  // Silence the lint about FUN_005e0e07 — it's imported for parity
  // with the dialog-mode branch we may flesh out later. (Until then
  // we reference it once so the dispatcher doesn't tree-shake it.)
  void FUN_005e0e07;

  // 0x5e52a7..58: the shared per-widget epilogue updates global
  // hover-state counters (`add ebp,0x10` / `dec [0x9a13e4]` /
  // `dec [0x9a13e6]` / `shr [0x9a13e8]` / `shr [0x9a13e0]`). In the
  // real binary that runs *between widgets* inside FUN_005e4400's
  // loop. The JS port of FUN_005e4400 only invokes us once per call
  // via callIndirect and then returns, so the loop is broken at the
  // JS level — these mutations are not the responsibility of this
  // function in the ported control flow. (If hover state ever needs
  // re-shifting per widget, that's a fix in FUN_005e4400, not here.)
}
