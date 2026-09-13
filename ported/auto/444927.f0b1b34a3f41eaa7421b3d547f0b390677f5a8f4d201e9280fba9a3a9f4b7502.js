// @manual — do not regenerate.
// Source: decompiled/c/444927.c, hand-fixed for two interrelated bugs.
//
// FUN_00444927 — sprite tile-grid relink + bbox recompute. Called for
// each sprite whose position changed (typically from FUN_004448fb during
// scenario post-load, or from per-tick movement code). Three params in
// registers:
//   AX  = in_AX  — sprite's new x (or 0x8000 = "delete" sentinel)
//   ECX = in_ECX — sprite's new y (low 16 used)
//   DX  = in_DX  — sprite's new z (low 16 used)
//   ESI         — pointer to the 256-byte sprite_desc slot
//
// Bugs in the auto-port that this hand-port fixes:
//
//   1. The indirect jump at 0x4449bb (`jmp [edi*4 + 0x4449c4]`) into one
//      of 4 rotation-specific arithmetic blocks (0x4449d4 / 4449e8 /
//      0x4449fc / 0x444a10) was emitted by Ghidra as a function-pointer
//      call (per its "WARNING: Could not recover jumptable at 0x4449bb"
//      / "Treating indirect jump as call" comments). The translator
//      passed that through as a `callIndirect`. callIndirect routes via
//      state.fnDispatch — which the painter-bridge populated with shims
//      for those 4 addresses (they're listed in lifter/extra-entries.
//      json as PTR_LAB_004449c4 entries). Each shim sets up its own cpu
//      stack with one RET_SENTINEL slot.
//
//      But the 4 blocks are NOT functions — they're inline continuations
//      that share FUN_00444927's stack frame. The prologue at 0x444927
//      pushed eax/ecx/edi; the shared epilogue at 0x444a22..0x444a55
//      pops edi/ecx/eax after the bbox math. Entered via shim, the pops
//      hit the lone sentinel and then walk off the heap → mem32 OOB at
//      memory.byteLength (= 0x4ac4000 with the current heap size).
//      The OOB throw was caught by the painter-bridge shim, but the
//      register-restore values were garbage — so the post-epilogue
//      writes to esi+0x0e/0x10/0x12 (the sprite's position field)
//      received uninitialised data. liveSprites carried wrong bboxes
//      (sprite[7] type=17 bbox=0x1111x4 = "deadbeef-pattern garbage").
//
//      Fix: inline the 4 rotation blocks + the shared epilogue here.
//      All ops in those blocks use 0x66 (16-bit operand size) prefixes,
//      so the math is signed 16-bit. The lifted version in generated/
//      all.js shows them as 32-bit because the static lifter drops 0x66
//      (per painter-bridge.js's note about blanket-drop) — reconstruct
//      16-bit semantics from the raw disassembly.
//
//   2. The auto-port's tile-grid linked-list walker has the recurring
//      u16-vs-u32 translator bug. DAT_00991f8e is a u16[] (tile-grid
//      chain heads), and the sprite chain pointers at sprite_desc+2 and
//      +0x80-stride-into-next are u16. The translator emitted u32 reads
//      and 4-byte strides — same class as 444820 and 444b4a.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { LOCK, UNLOCK } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";

// 16-bit signed truncation: input is a Number, result in [-32768, 32767].
const s16 = (v) => ((v & 0xffff) << 16) >> 16;
// Arithmetic shift right of a signed 16-bit value — matches x86 `sar cx, 1`.
const sar16 = (v) => s16(v) >> 1;

export function FUN_00444927(heap) {
  const in_AX  = regs.eax & 0xffff;
  const in_ECX = regs.ecx & 0xffff;
  const in_DX  = regs.edx & 0xffff;
  const esi    = regs.esi >>> 0;

  // --- Upper half (0x44492a..0x4449b3): compute uVar2/uVar3 = new/old
  //     tile-grid hash. If they differ, relink the sprite from the old
  //     chain into the new chain head. The hash is a 14-bit value
  //     formed from the upper bits of x + lower bits of y. ---
  let uVar2;
  if (in_AX === 0x8000) {
    uVar2 = 0x4000;
  } else {
    uVar2 = (((in_AX & 0xfe0) << 2) | ((in_ECX >>> 5) & 0x7ff)) & 0x3fff;
  }

  let uVar3;
  const old_x = heap.u16(esi + 0xe);
  const old_y = heap.u16(esi + 0x10);
  if (old_x === 0x8000) {
    uVar3 = 0x4000;
  } else {
    uVar3 = (((old_x & 0xfe0) << 2) | (old_y >>> 5)) & 0x3fff;
  }

  if (uVar2 !== uVar3) {
    // Walk the old chain to find the predecessor of `esi`, then relink.
    // Tile-grid heads at DAT_00991f8e (u16[]); sprite chain pointer at
    // sprite_desc+2 (u16, indexes the next sprite slot by 256-byte stride).
    let puVar4 = (0x00991f8e + uVar3 * 2) >>> 0;
    while ((0x00743b94 + heap.u16(puVar4) * 0x100) !== esi) {
      puVar4 = (0x00743b96 + heap.u16(puVar4) * 0x100) >>> 0;
    }
    heap.setU16(puVar4, heap.u16(esi + 2));
    LOCK();
    const uVar1 = heap.u16(0x00991f8e + uVar2 * 2);
    // HAND-FIX: C is `(&DAT_00991f8e)[uVar2] = *(undefined2*)(unaff_ESI + 10)` —
    // the new chain head becomes the sprite's OWN index (sprite_index lives at
    // esi+0xa), inserting esi at the head. The prior hand-port read esi+2 (the
    // sprite's NEXT pointer) instead, so esi was never inserted → the tile-grid
    // chain corrupted and a later walk (lines above) couldn't find its sprite and
    // span forever (the tick-~21 gameplay hang).
    heap.setU16(0x00991f8e + uVar2 * 2, heap.u16(esi + 0xa));
    UNLOCK();
    heap.setU16(esi + 2, uVar1);
  }

  // --- Sentinel path (0x4449a3..0x4449b3): if in_AX == 0x8000, mark
  //     the sprite as "off-map" and return. The non-sentinel path
  //     continues to the indirect-jump fanout below. ---
  if (in_AX === 0x8000) {
    heap.setU16(esi + 0x16, 0x8000);
    heap.setU16(esi + 0x0e, 0x8000);
    heap.setI16(esi + 0x10, s16(in_ECX));
    heap.setU16(esi + 0x12, in_DX);
    return (regs.eax = 0);
  }

  // --- Rotation-specific bbox math (was: indirect jump at 0x4449bb
  //     into one of 4 inline blocks at 0x4449d4 / e8 / fc / a10). All
  //     ops 16-bit signed. After the block, ax/cx hold values ready
  //     for the shared epilogue at 0x444a22. ---
  const rotation = heap.u8(0x00991f88) & 3;
  let ax, cx;
  const sAX = s16(in_AX);
  const sCX = s16(in_ECX);
  const sDX = s16(in_DX);

  if (rotation === 0) {
    // 0x4449d4: mov di,ax; neg ax; add ax,cx; add cx,di; sar cx,1; sub cx,dx
    ax = s16(sCX - sAX);
    cx = s16(sar16(sCX + sAX) - sDX);
  } else if (rotation === 1) {
    // 0x4449e8: neg ax; mov di,ax; sub ax,cx; add cx,di; sar cx,1; sub cx,dx
    ax = s16(-sAX - sCX);
    cx = s16(sar16(sCX - sAX) - sDX);
  } else if (rotation === 2) {
    // 0x4449fc: mov di,ax; sub ax,cx; neg cx; sub cx,di; sar cx,1; sub cx,dx
    ax = s16(sAX - sCX);
    cx = s16(sar16(-sCX - sAX) - sDX);
  } else {
    // 0x444a10: mov di,ax; add ax,cx; neg cx; add cx,di; sar cx,1; sub cx,dx
    ax = s16(sAX + sCX);
    cx = s16(sar16(sAX - sCX) - sDX);
  }

  // --- Shared epilogue at 0x444a22..0x444a4f: load sprite half-widths
  //     from esi+0x14 (x-half-width), esi+0x09 (y-half-width-low), and
  //     esi+0x15 (y-half-width-high), and store the screen bbox at
  //     esi+0x16/0x18/0x1a/0x1c. ---
  const di14 = heap.u8(esi + 0x14);
  const di9  = heap.u8(esi + 0x09);
  const a15  = heap.u8(esi + 0x15);

  heap.setI16(esi + 0x16, s16(ax - di14));   // bbox left
  heap.setI16(esi + 0x1a, s16(ax + di14));   // bbox right
  heap.setI16(esi + 0x18, s16(cx - di9));    // bbox top
  heap.setI16(esi + 0x1c, s16(cx + a15));    // bbox bottom

  // --- Post-pop writes at 0x444a56..0x444a5e: write the prologue-saved
  //     ax/cx/dx back to esi+0x0e/0x10/0x12. In the binary these come
  //     from the prologue's `push eax/ecx/edi` being popped at 0x444a53;
  //     here we use the in_AX/in_ECX/in_DX we saved at function entry. ---
  heap.setU16(esi + 0x0e, in_AX);
  heap.setI16(esi + 0x10, s16(in_ECX));
  heap.setU16(esi + 0x12, in_DX);

  return (regs.eax = 0);
}
