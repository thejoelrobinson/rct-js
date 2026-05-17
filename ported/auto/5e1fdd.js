// @manual — do not regenerate.
// Source: decompiled/c/5e1fdd.c
//
// Ghidra lost the CX side-effect from this function. The original x86
// returns x-coord in EAX, y-coord in EBX, AND event-type in CX. The
// caller (FUN_005e38f5) reads CX via `extraout_CX` to dispatch the
// per-tick input loop. The naive translation initializes
// `let extraout_CX = 0` and breaks the dispatch loop immediately.
//
// This hand-port writes `regs.ecx` at every return, matching the x86
// `mov cx, ...; ret` pattern. CX values per asm (confirmed via capstone
// at 0x5e1fdd-0x5e2224):
//   live mode  (puVar2 != 0, 0x99c16b != 1): CX = type-code from queue
//       slot+8: type=1→cx=1 (LMB-down), type=2→cx=3 (LMB-up),
//       type=3→cx=2 (RMB-down), else→cx=4 (mouse-move/other).
//   playback   (puVar2 != 0, 0x99c16b == 1): CX = first u16 from replay
//       stream (the event-type field as recorded).
//   no event   (puVar2 == 0): CX = 0.
//   end-of-stream / cleanup paths: CX = 4 or 0 per asm.
//
// Also note: Ghidra's `uVar3 = *puVar2;` at the live-mode path elides the
// x86's intermediate `[edi+8]` (type) read. We preserve the JS behavior
// (uVar3 = slot[0] = x) so the EAX return matches, and additionally peek
// slot+8 to derive CX.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_00403b39 } from "./403b39.js";
import { FUN_00403bd8 } from "./403bd8.js";
import { FUN_0042d56c } from "./42d56c.js";
import { FUN_0042d60a } from "./42d60a.js";
import { FUN_0042d637 } from "./42d637.js";

// Map live-mode queue type field to CX event-type code (asm 0x5e205b-77).
function _typeToCx(type) {
  if (type === 1) return 1;
  if (type === 2) return 3;
  if (type === 3) return 2;
  return 4;
}

// Helper: write low 16 of value into regs.ecx without disturbing high bits
// the way `mov cx, imm16` would. We model regs.ecx as the full 32-bit
// register; CX is the low 16. Callers in 5e38f5 read `(regs.ecx<<16)>>16`.
function _setCx(v) {
  regs.ecx = ((regs.ecx & 0xffff0000) | (v & 0xffff)) >>> 0;
}

// Helper: x86 `movzx ebx, ax` after `mov ebx, [edi+4]` — write 32-bit
// EBX with the y-coord. Used by the live-mode path (asm 0x5e207C
// `mov ebx, [edi+4]`) and the queue-end clamp (0x5e3992-3 `mov bx, ...`).
function _setEbx(v) { regs.ebx = (v >>> 0); }

export function FUN_005e1fdd(heap) {
  let sVar1 = 0;
  let puVar2 = 0;
  let uVar3 = 0;
  if ((heap.u32(0x00991f30) >>> 5 & 1) == 0) {
    if (heap.u8(0x0099c16b) == 1) {
      puVar2 = (((regs.eax = FUN_00403bd8(heap))) >>> 0);
      if (puVar2 == 0x0) {
        uVar3 = (((regs.eax = FUN_0042d60a(heap))) >>> 0);
        puVar2 = (((uVar3 & 0xffff)) >>> 0);
      } else {
        (regs.eax = FUN_0042d56c(heap));
      }
    } else {
      puVar2 = (((regs.eax = FUN_00403bd8(heap))) >>> 0);
    }
    if (heap.u8(0x0099c16b) == 2) {
      (regs.eax = FUN_0042d637(heap));
    }
    if (puVar2 == 0x0) {
      uVar3 = ((heap.u32(0x0099fdf4)) >>> 0);
      if (heap.u32(0x0099fdf4) == 0x80000000) {
        _setCx(0);
        return 0;
      }
      // Falls through to clamp + return uVar3=DAT_0099fdf4. asm sets cx=0
      // here (0x5e20a8) before the clamp/ret.
      // asm 0x5e20A2: `mov ebx, [0x99fdf8]` — y-coord from no-event cache.
      _setEbx(heap.u32(0x0099fdf8));
      _setCx(0);
    } else {
      if (heap.u8(0x0099c16b) == 1) {
        // Playback mode: 3 u16 reads from replay stream.
        // x86: call 42d60a; mov cx, ax; call 42d60a; movzx ebx, ax;
        //      call 42d60a; movzx eax, ax; xchg ebx, eax.
        // First call → CX (event type), second → EBX (y), third → EAX (x).
        // After `xchg ebx, eax` the second-call result is in EAX (returned)
        // and the third-call result is in EBX.
        const _first = ((regs.eax = FUN_0042d60a(heap)) & 0xffff);
        _setCx(_first);
        const _second = (((regs.eax = FUN_0042d60a(heap))) >>> 0) & 0xffff;
        const _third = (((regs.eax = FUN_0042d60a(heap))) >>> 0) & 0xffff;
        // After xchg ebx, eax: EAX = _second, EBX = _third (matches asm).
        uVar3 = _second;
        _setEbx(_third);
      } else {
        // Live mode: read queue slot at puVar2. Layout {x@+0, y@+4, type@+8}.
        // x86 derives EAX from [edi] (=x), EBX from [edi+4] (=y), and CX
        // from a switch on [edi+8] (=type).
        const _type = (heap.u32((puVar2 + 8) >>> 0)) >>> 0;
        _setCx(_typeToCx(_type));
        uVar3 = ((heap.u32(puVar2)) >>> 0);
        // asm 0x5e207C: `mov ebx, [edi+4]` — y-coord from queue slot.
        // Without this, the downstream hit-test in FUN_005e3ace reads stale
        // EBX from the caller chain and the click never lands on any window.
        _setEbx(heap.u32((puVar2 + 4) >>> 0));
        if (heap.u8(0x0099c16b) == 2) {
          (regs.eax = FUN_0042d637(heap));
          uVar3 = (((regs.eax = FUN_0042d637(heap))) >>> 0);
          (regs.eax = FUN_0042d637(heap));
        }
      }
    }
    if (((uVar3) | 0) < 0) {
      uVar3 = ((0) >>> 0);
    }
    if (heap.u32(0x00971ed6) <= ((uVar3) & 0xffff)) {
      uVar3 = ((((heap.u32(0x00971ed6) - 1) >>> 0)) >>> 0);
    }
    // asm 0x5e208C-D0: clamp EBX to [0, DAT_00971ed8 - 1] before ret. Without
    // this the y-coord can be negative or out-of-bounds for the hit-test.
    let _y = regs.ebx >>> 0;
    if (((_y) | 0) < 0) _y = 0;
    if (heap.u32(0x00971ed8) <= (_y & 0xffff)) _y = (heap.u32(0x00971ed8) - 1) >>> 0;
    _setEbx(_y);
    return uVar3;
  }
  // BT branch taken: bit 5 of [0x991f30] is set.
  if (heap.u8(0x0099c16b) == 1) {
    sVar1 = (((regs.eax = FUN_0042d60a(heap))) & 0xffff);
    if (sVar1 == 0) {
      // goto LAB_005e21c0 — asm ends in `mov cx, 4; ret`.
      _setCx(4);
      if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005e1fdd/LAB_005e21c0");
      return 0;
    }
  } else {
    if (heap.u8(0x0099c16b) == 2) {
      (regs.eax = FUN_0042d637(heap));
    }
    if (heap.u32(0x005ebee4) == 0) {
      _setCx(4);
      if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005e1fdd/LAB_005e21c0");
      return 0;
    }
  }
  if (heap.u8(0x0099c16b) == 1) {
    uVar3 = (((regs.eax = FUN_0042d60a(heap))) >>> 0);
    if ((uVar3 & 0x80) == 0) {
      LAB_005e21c0: (regs.eax = FUN_00403b39(heap));
      heap.setU32(0x00991f30, (heap.u32(0x00991f30) & 0xffffffdf) >>> 0);
      if (heap.u8(0x0099c16b) != 1) {
        uVar3 = ((heap.u32(0x005f128c)) >>> 0);
        if (heap.u8(0x0099c16b) == 2) {
          uVar3 = (((regs.eax = FUN_0042d637(heap))) >>> 0);
          (regs.eax = FUN_0042d637(heap));
        }
        heap.setU32(0x0099fdf4, (0x80000000) >>> 0);
        _setCx(4); // asm 0x5e2220
        return uVar3;
      }
      sVar1 = (((regs.eax = FUN_0042d60a(heap))) & 0xffff);
      (regs.eax = FUN_0042d60a(heap));
      heap.setU32(0x0099fdf4, (0x80000000) >>> 0);
      _setCx(4); // asm 0x5e21f1
      return ((sVar1) | 0);
    }
  } else {
    if (heap.u8(0x0099c16b) == 2) {
      (regs.eax = FUN_0042d637(heap));
    }
    if ((heap.u32(0x005f1288) & 0x80) == 0) {
      _setCx(4);
      if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005e1fdd/LAB_005e21c0");
      return 0;
    }
  }
  if (heap.u8(0x0099c16b) != 1) {
    uVar3 = ((heap.u32(0x005f128c)) >>> 0);
    if (heap.u8(0x0099c16b) == 2) {
      uVar3 = (((regs.eax = FUN_0042d637(heap))) >>> 0);
      (regs.eax = FUN_0042d637(heap));
    }
    heap.setU32(0x005f128c, (0) >>> 0);
    heap.setU32(0x005f1280, (0) >>> 0);
    _setCx(0); // asm 0x5e21bb
    return uVar3;
  }
  sVar1 = (((regs.eax = FUN_0042d60a(heap))) & 0xffff);
  (regs.eax = FUN_0042d60a(heap));
  heap.setU32(0x005f128c, (0) >>> 0);
  heap.setU32(0x005f1280, (0) >>> 0);
  _setCx(0); // asm 0x5e2182
  return ((sVar1) | 0);
}
