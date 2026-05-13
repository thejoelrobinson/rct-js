// @manual — do not regenerate.
// Source: hand-disassembled from binary/rct.exe @ 0x429d41.
//
// Widget-event-dispatch proc for the bottom status-bar / toolbar window in
// the unscaled (in-game) layout. Installed at FUN_004298a0:175 — when
// MainOpen builds the bottom-toolbar window descriptor it stores EDX =
// 0x429d41 at window+0x4 as the "widget event proc" (companion to the
// paint proc 0x429f6c at window+0x0).
//
// Ghidra didn't recognize this as a function because the entry at
// 0x429d41 is a single forward `jmp 0x429f39` — the real body starts at
// 0x429f39 and is a BP-message-type switch. BP is the widget-event
// opcode the framework hands us; DX (when BP=1) is the widget index.
//
// Calling convention (matches the framework's widget proc ABI):
//   ESI = window struct pointer
//   EBP = event opcode:
//        1  → "widget click" — sub-dispatch on DX (widget index)
//        2  → "tool-pulldown / chart shift" (0x429df3 — chart history)
//        5  → "per-frame timer tick — flag-driven sfx" (0x429ec0)
//        6  → "animation tick — bump tool-tip counter" (0x429ea6,
//             falls through into the BP=5 body at 0x429ec0)
//        0x12 → "tooltip text resolution" (0x429e35 — picks sprite IDs
//               from AX = tooltip-widget index)
//        anything else → ret
//   EDX = widget id (only meaningful for the BP=1 click path)
//   AX  = tooltip widget id (only meaningful for the BP=0x12 path)
//
// All branches end in a single `ret` (with the click-path BP=1 sub-
// dispatch piggy-backing on `0x429f6b: ret` for its "no scenario" exit
// from msg 5 and msg 8). Function body covers 0x429d41 + the
// 0x429d46..0x429f6b range (the same address range as the paint proc's
// preamble — they share a code page but not control flow).

import { regs } from "../../runtime/regs.js";
import { FUN_0042cb29 } from "./42cb29.js";
import { FUN_0042cc19 } from "./42cc19.js";
import { FUN_004272de } from "./4272de.js";
import { FUN_00427377 } from "./427377.js";
import { FUN_00443e98 } from "./443e98.js";
import { FUN_0042d398 } from "./42d398.js";
import { FUN_00429c3d } from "./429c3d.js";
import { FUN_005e68e2 } from "./5e68e2.js";
import { FUN_005e18d4 } from "./5e18d4.js";
import { FUN_005e5301 } from "./5e5301.js";

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

// 0x429d46..0x429dc2: BP=1 "widget click" — DX is the widget index.
// Each case ends in `ret`; cases 5 and 8 may early-exit via 0x429f6b's
// shared `ret` when no scenario is loaded.
function handleWidgetClick(heap) {
  const dx = regs.edx & 0xffff;
  const esi = regs.esi >>> 0;

  // 0x429d46..6e: the DX dispatch ladder. Order in the asm is 7,8,6,4,3,2,5
  // but the semantics don't depend on test order.
  switch (dx) {
    // 0x429d71..80: msg 6 — "open finance / cash flow window" gated on
    // scenario loaded. If [0x8d7eb8]==0 just ret.
    case 6: {
      if (heap.u8(0x008d7eb8) === 0) return;
      FUN_0042cb29(heap);
      return;
    }

    // 0x429d81..93: msg 5 — "open something else (research?)" — same
    // scenario gate. The asm's `jne 0x429f6b` is a forward jump into the
    // shared `ret` at the end of the BP-switch; semantically it's just
    // an early return when scenario is not loaded.
    //
    // Wait — re-read: `cmp byte [0x8d7eb8], 0` / `jne 0x429f6b`. So when
    // the byte is NON-ZERO (scenario loaded) we jump to ret WITHOUT
    // calling FUN_0042cc19. Only when scenario is zero (NOT loaded) do
    // we fall through to call FUN_0042cc19. That's the opposite of
    // msg 6 — msg 5 is the "no-scenario" landing-strip handler (load
    // scenario dialog?).
    case 5: {
      if (heap.u8(0x008d7eb8) !== 0) return;
      FUN_0042cc19(heap);
      return;
    }

    // 0x429d94..9b: msg 4 — call FUN_004272de with ESI preserved.
    case 4: {
      regs.esi = esi;
      FUN_004272de(heap);
      regs.esi = esi;
      return;
    }

    // 0x429d9c..a3: msg 3 — call FUN_00427377 with ESI preserved.
    case 3: {
      regs.esi = esi;
      FUN_00427377(heap);
      regs.esi = esi;
      return;
    }

    // 0x429da4..ab: msg 2 — call FUN_00443e98 with ESI preserved.
    case 2: {
      regs.esi = esi;
      FUN_00443e98(heap);
      regs.esi = esi;
      return;
    }

    // 0x429dac..bf: msg 7 — research / scenario-state callback.
    //   bl  = byte [0x8d7eb8]   (scenario id)
    //   ecx = dword [0x8d7eba]  (scenario state flags)
    //   call FUN_0042d398
    case 7: {
      regs.ebx = ((regs.ebx & 0xffffff00) | heap.u8(0x008d7eb8)) >>> 0;
      regs.ecx = heap.u32(0x008d7eba) >>> 0;
      regs.esi = esi;
      FUN_0042d398(heap);
      regs.esi = esi;
      return;
    }

    // 0x429dc0..f2: msg 8 — "construct ride / open ride-pick window".
    //   if [0x8d7eb8] == 0  →  ret (no scenario)
    //   dl  = byte [0x8d7eb8]; ecx = dword [0x8d7eba]
    //   call FUN_00429c3d  (availability/lock query — same call shape
    //                       as the paint-proc state-init at 0x429fc0)
    //   if ax == 0x8000     →  ret (locked / unavailable)
    //   call FUN_005e68e2; if CF (jb taken) → ret
    //   call FUN_005e18d4
    case 8: {
      if (heap.u8(0x008d7eb8) === 0) return;
      regs.esi = esi;
      regs.edx = ((regs.edx & 0xffffff00) | heap.u8(0x008d7eb8)) >>> 0;
      regs.ecx = heap.u32(0x008d7eba) >>> 0;
      FUN_00429c3d(heap);
      const ax = regs.eax & 0xffff;
      if (ax === 0x8000) {
        regs.esi = esi;
        return;
      }
      // The asm reads the carry flag from FUN_005e68e2's return.
      // FUN_005e68e2 communicates "available" via CF; mirror by
      // exposing it on regs.cf (the runtime's flag convention).
      FUN_005e68e2(heap);
      if ((regs.cf >>> 0) !== 0) {
        regs.esi = esi;
        return;
      }
      FUN_005e18d4(heap);
      regs.esi = esi;
      return;
    }

    // 0x429d70: default — ret.
    default:
      return;
  }
}

// 0x429df3..0x429e34: BP=2 — "chart sample shift". Compares two
// parallel i16 arrays at [0x5f54f0] and [0x5f5518] (length 0x14 = 20
// entries). If they differ at any index, copies the live array
// (0x5f54f0) into the saved array (0x5f5518) and fires sound effect
// AX=0x682 BX=0 via FUN_005e5301 (probably the "stat tick" sfx).
function handleChartShift(heap) {
  // 0x429df3..0d: scan for first diff.
  let allEqual = true;
  for (let edi = 0; edi < 0x14; edi++) {
    const a = heap.u16(0x005f54f0 + 2 * edi) & 0xffff;
    const b = heap.u16(0x005f5518 + 2 * edi) & 0xffff;
    if (a !== b) {
      allEqual = false;
      break;
    }
  }
  // 0x429e0d: jmp 0x429e34 (ret) when scan ran to completion equal.
  if (allEqual) return;

  // 0x429e0f..26: copy live → saved.
  for (let edi = 0; edi < 0x14; edi++) {
    const a = heap.u16(0x005f54f0 + 2 * edi) & 0xffff;
    heap.setU16(0x005f5518 + 2 * edi, a);
  }

  // 0x429e27..33: fire sfx 0x682.
  regs.eax = (regs.eax & 0xffff0000) | 0x0682;
  regs.ebx = (regs.ebx & 0xffff0000) | 0x0000;
  FUN_005e5301(heap);
  // 0x429e34: ret
}

// 0x429e35..0x429ea5: BP=0x12 — "tooltip text resolution". AX is the
// tooltip-widget id; the routine writes the resolved sprite/string IDs
// to [0x971e86] (+ optionally [0x971e8a] / [0x971e88]) and returns
// AX=0 on success / unhandled.
function handleTooltipResolve(heap) {
  const ax = regs.eax & 0xffff;

  switch (ax) {
    // 0x429e48..57: widget 4 — copy word [0x87cc88] → [0x971e86].
    case 4: {
      const v = heap.u16(0x0087cc88) & 0xffff;
      heap.setU16(0x00971e86, v);
      regs.eax = regs.eax & 0xffff0000; // xor ax, ax
      return;
    }

    // 0x429e58..6f: widget 2 — copy dword [0x87d308] → [0x971e86],
    // then dword [0x87d514] → [0x971e8a].
    case 2: {
      heap.setU32(0x00971e86, heap.u32(0x0087d308) >>> 0);
      heap.setU32(0x00971e8a, heap.u32(0x0087d514) >>> 0);
      regs.eax = regs.eax & 0xffff0000;
      return;
    }

    // 0x429e70..a5: widget 9 — animated date/clock tooltip.
    //   bx = word [0x6e3b80] & 7              (day-of-week index 0..7)
    //   ax = word [0x6e3b82]                   (year/season counter)
    //   ax * word [2*ebx + 0x64bc60]  → dx:ax  (mul by month length?)
    //   ax = movzx(dl)                          (take high byte)
    //   bx = bx + 0x803                         (sprite-base for weekday)
    //   word [0x971e88] = bx
    //   ax = ax + 0x30a                         (sprite-base for month)
    //   word [0x971e86] = ax
    //   xor ax, ax
    case 9: {
      let bx = heap.u16(0x006e3b80) & 0x0007;
      const axIn = heap.u16(0x006e3b82) & 0xffff;
      const mulHi = heap.u16(0x0064bc60 + 2 * bx) & 0xffff;
      // 16-bit mul → 32-bit product; we want the high byte of the low word.
      const product = (axIn * mulHi) >>> 0;
      // After `mul word`, dx = product>>16, ax = product & 0xffff.
      // `movzx ax, dl` keeps the LOW byte of DX, i.e. (product>>16)&0xff.
      const dl = (product >>> 16) & 0xff;
      bx = (bx + 0x0803) & 0xffff;
      heap.setU16(0x00971e88, bx);
      const newAx = (dl + 0x030a) & 0xffff;
      heap.setU16(0x00971e86, newAx);
      regs.eax = regs.eax & 0xffff0000;
      return;
    }

    // 0x429e47: default — ret (AX left as-is, signalling "not handled").
    default:
      return;
  }
}

// 0x429ea6..0x429f38: BP=6 entry (animation tick) — increments the
// tool-tip animation counter at [esi + 0x168] (wrap at 0x18), then
// falls through into the BP=5 body which polls 5 "sfx pending" bits
// at [0x5f54ec] and fires the corresponding click/cash sound for each.
//
// The asm has the BP=6 head fall through into the BP=5 body, so we
// model it the same way with a `bp === 6` pre-amble.
function handleAnimationAndSfxTick(heap, bpIsAnim) {
  const esi = regs.esi >>> 0;

  if (bpIsAnim) {
    // 0x429ea6..bf: bump [esi+0x168], wrap at 0x18.
    let counter = heap.u16(esi + 0x168) & 0xffff;
    counter = (counter + 1) & 0xffff;
    if (counter >= 0x18) counter = 0;
    heap.setU16(esi + 0x168, counter);
    // falls through into 0x429ec0.
  }

  // 0x429ec0..f38: five `btr` / sfx-fire blocks on bits 0..4 of
  // word [0x5f54ec]. `btr` reads the bit into CF and clears it.
  // `jae` taken (CF=0) means the bit was already clear → skip the sfx.
  //
  // The 5 bits drive these sfx pairs:
  //   bit 0 → AX=0x182, BX=0      (button-click "thunk")
  //   bit 1 → AX=0xa82, BX=0      (cash register "ka-ching")
  //   bit 2 → AX=0x182, BX=0      (button-click "thunk")
  //   bit 3 → AX=0xa82, BX=0      (cash register "ka-ching")
  //   bit 4 → AX=0x182, BX=0      (button-click "thunk")
  const flags = heap.u16(0x005f54ec) & 0xffff;
  const sfx = [
    { bit: 0x01, ax: 0x0182 },
    { bit: 0x02, ax: 0x0a82 },
    { bit: 0x04, ax: 0x0182 },
    { bit: 0x08, ax: 0x0a82 },
    { bit: 0x10, ax: 0x0182 },
  ];
  let remaining = flags;
  for (const { bit, ax } of sfx) {
    if ((remaining & bit) !== 0) {
      remaining = (remaining & ~bit) & 0xffff;
      regs.eax = (regs.eax & 0xffff0000) | ax;
      regs.ebx = regs.ebx & 0xffff0000;
      FUN_005e5301(heap);
    }
  }
  // Persist the cleared bits back to memory.
  heap.setU16(0x005f54ec, remaining);
  // 0x429f38: ret
}

export function FUN_00429d41(heap) {
  // 0x429d41: jmp 0x429f39 — unconditional forward jump to the BP switch.
  // (The 0x429d46 dispatch ladder is only reachable via the BP==1 case
  // of that switch, never from 0x429d41 directly.)

  // 0x429f39..6b: outer BP-message-type switch.
  const bp = regs.ebp & 0xffff;

  // 0x429f39..3d: bp == 2 → chart-shift handler.
  if (bp === 2) {
    handleChartShift(heap);
    return;
  }
  // 0x429f43..47: bp == 1 → widget-click sub-dispatch (the 0x429d46 ladder).
  if (bp === 1) {
    handleWidgetClick(heap);
    return;
  }
  // 0x429f4d..51: bp == 5 → sfx-tick body only (no animation pre-amble).
  if (bp === 5) {
    handleAnimationAndSfxTick(heap, false);
    return;
  }
  // 0x429f57..5b: bp == 6 → animation pre-amble then sfx-tick.
  if (bp === 6) {
    handleAnimationAndSfxTick(heap, true);
    return;
  }
  // 0x429f61..65: bp == 0x12 → tooltip text resolution.
  if (bp === 0x12) {
    handleTooltipResolve(heap);
    return;
  }
  // 0x429f6b: ret (unknown opcode — no-op).
}
