// @manual — do not regenerate.
//
// Source: decompiled/c/5e3874.c — widget hit-test for the focused window.
//
// Disassembly (0x5e3874-0x5e3923):
//   push ecx; push ebp; push eax; push ebx
//   mov edi, 0xffffffff; mov ax, 0xffff
//   call [esi]            ; slot's "init" callback (preserves regs)
//   pop ebx; pop eax       ; restore click coords (ax=x, bx=y)
//   mov edi, [esi+0x1c]   ; edi = widget descriptor array
//   push edi
//   xor edx, edx           ; edx = widget index (0..)
//   mov ebp, 0xffffffff    ; ebp = last hit (or -1 if none)
// LAB_005e3890:
//   mov cl, [edi]          ; widget class
//   cmp cl, 0x15; jz EOL  ; class 0x15 = end-of-list sentinel
//   cmp cl, 0x00; jz next ; class 0 = invisible, skip
//   bt [esi+0x10], edx; jc next  ; disabled bit set, skip
//   ; bounds test (ax, bx) vs widget rect, all coords +window's [esi+0x20/0x22]
//   ; if hit: mov [esp], edi; mov ebp, edx
// LAB_005e38db (next):
//   inc edx; add edi, 0x10; jmp LAB_005e3890
// LAB_005e38e1 (EOL):
//   pop edi
//   mov edx, ebp           ; edx = last-hit widget index (or -1)
//   cmp edx, -1; jz done
//   cmp byte [edi], 0x0B  ; if hit class 0x0B, advance to next widget
//   jnz done
//   add edi, 0x10; inc edx
// done:
//   pop ebp; pop ecx; ret
//
// Previous hand-port was a stub that walked some linked list and never
// set EDX. The native click dispatch chain (5e2225 → 5e3874 → 5e2b52)
// requires EDX = widget index for the LMB-down branch in 5e2b52 (which
// then dispatches `mov bp, 3; jmp [esi+4]` for the widget click action).
// Without a proper widget hit-test, all clicks bail at `cmp edx, -1; jz`.

import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { hitTestWidgetExact, runSelectionEntry } from "./extra_ui_selection.js";

export function FUN_005e3874(heap) {
  if (globalThis.__realStartup || state.executionMode === "pure-js") return runSelectionEntry(heap, 0x5e3874, hitTestWidgetExact);
  const esi = regs.esi >>> 0;
  if (esi === 0) {
    // No focused window — set edx = -1 (no hit).
    regs.edx = 0xffffffff >>> 0;
    return;
  }
  // Sign-extend click coords to 16-bit. asm: `cmp ax, cx; jl/jg` is signed.
  const ax = (regs.eax << 16) >> 16;
  const bx = (regs.ebx << 16) >> 16;
  // Note: x86 calls [esi] (slot's init/invalidate callback) here with
  // ax=edi=-1. That callback can recurse into the toolbar's paint proc
  // which expects a fully-set-up CPU stack — bridging it from our JS
  // 5e3874 caller leaves EDI/EAX as -1 and crashes the painter-bridge
  // interpreter (mem8 OOB at 0xffffffff). Skip the call: the slot init
  // is a "redraw-needed" hint and not load-bearing for the hit-test
  // result. If a downstream path depends on the side effects, port the
  // callback's relevant subset separately.
  // Widget array at [esi+0x1c].
  const widgetBase = heap.u32(esi + 0x1c) >>> 0;
  if (widgetBase === 0) {
    regs.edx = 0xffffffff >>> 0;
    return;
  }
  // Window origin (signed 16-bit).
  const wx = (heap.u16(esi + 0x20) << 16) >> 16;
  const wy = (heap.u16(esi + 0x22) << 16) >> 16;
  // Disabled bitmap at [esi+0x10] (32-bit dword).
  const disabledMask = heap.u32(esi + 0x10) >>> 0;
  let lastHit = -1;                 // ebp in x86 — last matching widget index
  let lastHitDescriptor = 0;        // [esp] in x86 — the widget desc ptr
  // Cap iterations to avoid runaway if [edi] never reads 0x15.
  for (let idx = 0; idx < 256; idx++) {
    const wDesc = (widgetBase + idx * 0x10) >>> 0;
    const cls = heap.u8(wDesc);
    if (cls === 0x15) break;        // end sentinel
    if (cls === 0x00) continue;     // invisible
    if (idx < 32 && (disabledMask & (1 << idx)) !== 0) continue;  // disabled
    // Widget rect (signed 16-bit, window-relative).
    const lx = ((heap.u16(wDesc + 0x2) << 16) >> 16) + wx;
    const rx = ((heap.u16(wDesc + 0x4) << 16) >> 16) + wx;
    const ty = ((heap.u16(wDesc + 0x6) << 16) >> 16) + wy;
    const by = ((heap.u16(wDesc + 0x8) << 16) >> 16) + wy;
    if (ax < lx || ax > rx) continue;
    if (bx < ty || bx > by) continue;
    // Hit: track as the latest match (x86 doesn't break — it keeps going
    // so the LAST hit wins, matching z-order with later widgets on top).
    lastHit = idx;
    lastHitDescriptor = wDesc;
  }
  if (lastHit === -1) {
    regs.edx = 0xffffffff >>> 0;
    // asm: when no hit, EDI = widget array start (from `pop edi` at 5e38e1
    // which popped the value pushed at 5e3888 = widgetBase).
    regs.edi = widgetBase >>> 0;
    return;
  }
  // asm 0x5e38e9: if hit-widget class is 0x0B, advance to next widget.
  // (Class 0x0B is a "group/container" wrapper; the actual click target
  // is the widget immediately after it.)
  if (heap.u8(lastHitDescriptor) === 0x0B) {
    lastHit += 1;
    lastHitDescriptor = (lastHitDescriptor + 0x10) >>> 0;
  }
  regs.edx = lastHit >>> 0;
  // asm: EDI = hit widget descriptor pointer (used by caller's
  // `mov cl, [edi]` and `mov bp, [edi+...]` to read widget metadata).
  regs.edi = lastHitDescriptor >>> 0;
}
