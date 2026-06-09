// @manual — do not regenerate.
// Source: decompiled/c/5e3ace.c
//
// Disassembly at 0x5e3874 (FUN_005e3874) shows `push ecx ... pop ecx; ret`,
// so ECX is preserved across the call. Ghidra's `extraout_ECX` therefore
// reflects the caller's incoming ECX (which we already track as in_ECX).
// Translator-emitted `let extraout_ECX = 0` defeated that — restore the
// `in_ECX = extraout_ECX` line's intent by sourcing it from in_ECX.
//
// Additionally: x86 5e3ace returns with ESI = slot_ptr on hit, ESI = 0 on
// miss (it's a hit-test that mutates ESI as a side effect). The caller
// (5e2225) dispatches to the input-mode table at 0x5e2248 (input mode 1 →
// 0x5e2b52), which reads ESI to find the focused window. Ghidra dropped
// the ESI-return because the C decompile shows the function as `void`,
// so the translator never wrote regs.esi. Without this, every dispatch
// to 5e2b52 sees ESI = stale junk and the LMB-down handler hits
// `or esi,esi; jz 0x5e2f9f` (which is just `ret`) — no widget action.
// Set regs.esi on each return path: puVar3 (hit) or 0 (miss).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT24 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_005e3874 } from "./5e3874.js";
export function FUN_005e3ace(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_stack0x00000000 = __sp + 0;
  try {
  let puVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let in_ECX = regs.ecx >>> 0;
  let extraout_ECX = in_ECX;
  let sVar2 = 0;
  let unaff_EBX = regs.ebx >>> 0;
  let unaff_EBP = regs.ebp >>> 0;
  let puVar3 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let uVar5 = 0;
  let puVar4 = 0;
  puVar1 = ((heap.u32(0x009a1164)) >>> 0);
  LAB_005e3ad4: do {
    do {
      do {
        puVar4 = ((puVar1) >>> 0);
        puVar3 = ((puVar4 + -0x178) >>> 0);
        if (puVar3 < 0x009a013c) {
          // asm 0x5e3b28: `xor esi, esi; ret` — no hit, ESI = 0.
          regs.esi = 0;
          return;
        }
        puVar1 = ((puVar3) >>> 0);
      } while ((((in_EAX) << 16 >> 16) < heap.i16((puVar4 + -0x158))) || ((((heap.i16((puVar4 + -0x158)) + heap.i16((puVar4 + -0x154)))) << 16 >> 16) <= ((in_EAX) << 16 >> 16)));
    } while ((((unaff_EBX) << 16 >> 16) < heap.i16((puVar4 + -0x156))) || (sVar2 = ((heap.i16((puVar4 + -0x156)) + heap.i16((puVar4 + -0x152))) & 0xffff), uVar5 = ((((CONCAT24(sVar2, in_EAX)) >>> 0)) >>> 0), sVar2 <= ((unaff_EBX) << 16 >> 16)));
    if ((heap.u16((puVar4 + -0x146)) & 0x20) != 0) {
      uVar5 = (((regs.eax = FUN_005e3874(heap, unaff_EDI))) >>> 0);
      in_EAX = ((((uVar5) >>> 0)) >>> 0);
      in_ECX = ((extraout_ECX) >>> 0);
      if (((((uVar5 >>> 0x20)) | 0) | 0) == -1) {
        /* goto LAB_005e3ad4 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_005e3ace/LAB_005e3ad4"); regs.esi = 0; return 0;
      }
    }
    in_EAX = ((((uVar5) >>> 0)) >>> 0);
    // x86 (asm 0x5e3b1A): `pusha; mov bp, 0x2; call [esi+4]; or esi, esi;
    // popa; jz LAB_005e3ace`. The wndProc dispatched at slot+4 (toolbar:
    // 0x42a830) reads BP as the event-class selector (2 = paint/hit-test
    // continuation for hit-target slots) and ESI as the slot pointer.
    // Ghidra/translator dropped both because they were never visible to
    // the C decompiler (puVar3 is passed positionally but the painter-
    // bridge propagates `regs.*`, not positional args).
    const _savedEbp = regs.ebp;
    const _savedEsi = regs.esi;
    regs.ebp = ((regs.ebp & 0xffff0000) | 2) >>> 0;
    regs.esi = puVar3 >>> 0;
    (regs.eax = callIndirect(heap, heap.u32((puVar4 + -0x174)), unaff_EDI, puVar3, unaff_EBP, __addr_stack0x00000000, unaff_EBX, (((uVar5 >>> 0x20)) | 0), in_ECX));
    // x86: `or esi, esi; popa; jz LAB_005e3ace`. Test the callee's ESI
    // BEFORE popa restores it. If the callee left ESI != 0, return with
    // ESI = slot ptr (puVar3). Otherwise loop and keep looking.
    const _calleeEsiNonZero = (regs.esi >>> 0) !== 0;
    regs.ebp = _savedEbp;
    regs.esi = _savedEsi;
    puVar1 = ((heap.u32(0x009a1164)) >>> 0);
    if (puVar3 != 0x0) {
      if (_calleeEsiNonZero) {
        // asm 0x5e3b27: `ret` with ESI = slot_ptr (restored by popa).
        regs.esi = puVar3 >>> 0;
        // The binary preserves the entry registers across the inner
        // `pusha ... call [esi+4] ... popa` (asm 0x5e3b1a..0x5e3b24), so on
        // this hit `ret` EAX == the entry screen-X (in_EAX). The translator
        // returned `undefined` here, which the caller 0x431510 read as EAX=0,
        // collapsing its clip-world-X math to the viewport origin and so the
        // 1x1 cursor-pick landed off the tile. Restore EAX = in_EAX.
        // Oracle: 0x5e3ace via the interpreter returns AX = input AX on a hit.
        regs.eax = in_EAX >>> 0;
        return in_EAX >>> 0;
      } else {
        // asm 0x5e3b25: `jz LAB_005e3ace` — callee says not a real hit,
        // loop again to the next slot. Don't return yet; reset puVar1 to
        // pool_end (already done above) and continue the outer do-while.
        continue LAB_005e3ad4;
      }
      return;
    }
  } while (true);
} finally {
    heap.freeFrame(4);
  }
}
