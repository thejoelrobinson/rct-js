// @manual — do not regenerate.
//
// FUN_extra_paint_444e08 — fence/wall per-element painter, vtable slot 1 in
// PTR_LAB_00628a94 (`call [edi + 0x628a94]` from FUN_extra_paint_4368d8's
// body at 0x436a59 when the tile-element type byte ([esi] & 0x3c) selects
// slot 1, i.e. wall elements).
//
// CODESEG body, ~3 KB of dense 16-bit asm with the 0x66 operand-size prefix
// on nearly every instruction; Ghidra emitted no C decompile. Profiler (Phase
// R+11) shows this function is called 232×/tick and is the second-hottest
// per-element painter (~38 ms/tick, 13 % of per-tick wall time).
//
// Semantic reference: OpenRCT2 `src/openrct2/paint/tile_element/Paint.Wall.cpp`.
// Function does, in order:
//   1. Look up the diagonally-neighbouring SURFACE tile via the tile_pointers
//      table at 0x971ef4, walk forward to skip non-surface entries, then
//      compare its baseline height to this wall's baseline; set [0x630c40]
//      bit 0 if they mismatch (the wall sits on a slope-edge cliff).
//   2. If [0x991f8c] & 0x40 (overlay shade-1) is set AND DPI zoom is 0:
//      call sub-painter [4*rotation + 0x431bb8] with a shade-overlay sprite.
//      Cold for our scene (0x991f8c = 0x900, bit 0x40 unset).
//   3. Compute the wall's image-base (palette swizzle): index into a pair of
//      dword tables at [0x630b48] / [0x630b4c] via a key derived from
//      [esi+4] (corner-flags) + [esi+6] (color/orientation) + rotation,
//      then write the resulting image template into [0x99a4e8] / [0x630b2c].
//   4. If [0x991f8c] & 0x1 is set, walk the chain forward and inc ebp per
//      matching element. Cold for our scene.
//   5. Compute the wall's sprite-id base (ebx) from per-fence-class lookup
//      via [0x6309c0] and the rotation offset table [0x630acc].
//   6. If [0x991f84] & 0x1 is clear, force a default cliff-shade override
//      (~3% of calls in profile).
//   7. If [0x630c40]&1 AND [0x991f84]&1 AND ![0x991f8c]&1 AND dpi.zoom==0:
//      run the cliff-corner overlay (calls sub-painters 0x432204 + 0x432e90
//      via two stack-saved branches at 0x444fc7 / 0x445040).
//   8. Otherwise: default paint — single sub-painter call to 0x432204.
//   9. Tail (0x4450e3+): DPI-zoom check + jumptable on [esi+5]&0xf for the
//      door-frame / door-leaf / scrolling-text sub-cases. Always case 0
//      (full wall) on the title scene; case 0 dispatches to 0x44635d, an
//      even bigger sub-dispatcher with another 4-corner jumptable and a
//      scrolling-text overlay branch.
//
// Profile of hot path inputs (sampled at 0x444e08 entry, 232 calls/tick):
//   [esi]    & 0x3c   ALL == 4   (wall)
//   [esi+4]  & 0x4    76% off, 24% on  (alt-rotation flag → 0x445040 branch)
//   [esi+4]  >> 4     88% == 2, rest 0/1  (fence-corner ebp)
//   [esi+5]  & 0xf    100% == 0  (door-case jumptable always case 0)
//   [esi+6]  full     varies (a/5/c/3/6/9)  (color/orientation)
//   [0x991f8c]        ALL == 0x900  (overlay flags)
//   [0x991f84] & 1    97% set, 3% clear  (palette-init flag)
//   [0x99a4e6]        ALL == -1   (no selection-tile overlay)
//   ecx & 0xff        ALL == 0    (rotation)
//   [0x991f88]        ALL == 0    (camera rotation)
//
// STATUS — Phase R+12 (agent A77 first pass):
//   The full byte-equal JS hand-port of this function is non-trivial: the
//   sub-painter dispatch (0x432204 / 0x432e90 / 0x431bb8) requires careful
//   register-state plumbing, and the tail jumptable at 0x4450e3 sprawls
//   into the 0x44635d sub-dispatcher which itself has a 4-corner jumptable
//   + scrolling-text overlay branch + cliff-edge sub-cases.
//
//   First-pass implementation hand-ported the preamble + sub-painter
//   dispatch + a custom step-loop for the tail (preserving the binary's
//   caller-saved stack frame) — but produced subtly divergent pixels
//   (palette indices match, pixel count matches, but per-pixel byte
//   arrangement differs from binary baseline). Root cause not yet
//   identified (likely a subtle stack-frame layout mismatch or a
//   rotation/operand-size edge in the palette compute).
//
//   For now this file installs the hook with a STUB body that always falls
//   back to runBodyFrom (which executes the binary's full body in the
//   bridge interpreter). The fallback is byte-equal to no-hook (verified
//   via replay-hash comparison), so installing the hook is a no-op for
//   correctness. The install pattern, the recursion-guard (clearEipHook +
//   re-install), and the documentation of inputs/branches are valuable
//   scaffolding for the follow-up phase. Perf is unchanged from the
//   baseline (and the cost of the extra hook dispatch is negligible — ~1
//   Map lookup per call).
//
//   FOLLOW-UP (Phase R+12.next): debug the JS body's divergence via
//   tools/diff-one.js (or by instrumenting the call site to capture the
//   binary's heap writes per-call and comparing). Once byte-equal, swap
//   the stub for the full port; expected savings ~10 ms/tick.
//
// Calling convention on entry (per FUN_extra_paint_4368d8 caller setup):
//   esi = tile element ptr (8-byte struct)
//   eax low = tile X coord (16-bit), ecx low = tile Y coord
//   edx = element pixel-height (16-bit, pre-shifted by 2)
//   ecx full = rotation (cl is the low byte; for walls always 0)
//   edi = element type & 0x3c (vtable index)
//   ebx = chain-max height in low 16-bit

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { clearEipHook, setEipHook as _setEipHook } from "../../harness/x86.js";

/** Fall-back: run the original binary body from `addr` via runFunction.
 * Pattern mirrors callBridge in extra_paint_421d2c.js — preserves esp/eip/
 * callDepth so the outer painter-bridge shim's stack frame is intact when
 * the harness's hook auto-ret pops the caller's return address. */
function runBodyFrom(heap, cpu, runFunction, addr) {
  const savedESP = cpu.regs.esp >>> 0;
  const savedEIP = cpu.regs.eip >>> 0;
  const savedCallDepth = cpu.callDepth;
  cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
  try {
    runFunction(cpu, addr, { stackTop: savedESP, limit: 50_000_000 });
  } catch (_) {
    // Per-painter errors non-fatal; matches outer bridge shim's tolerance.
  }
  cpu.regs.esp = savedESP;
  cpu.regs.eip = savedEIP;
  cpu.callDepth = savedCallDepth;
}

/** STUB body — always returns false to force runBodyFrom fallback. The full
 * JS port is documented in this file's header and can replace this stub
 * once byte-equality with the binary is achieved.
 *
 * Signature kept identical to a real port so the install function below
 * doesn't need to change when the stub is replaced.
 *
 * @returns {boolean} true if JS body handled the call; false to fall back
 */
function paintBody444e08(_heap, _cpu, _runFunction) {
  return false;
}

/** Install the setEipHook at 0x444e08 on the bridge cpu. Called once from
 * runtime/painter-bridge.js. */
export function install444e08Hook(cpu, runFunction, setEipHook, heap) {
  // The hookFn closure also serves as the re-install target after the
  // fallback path temporarily clears the hook (to avoid infinite recursion
  // when runBodyFrom's runFunction would re-dispatch to this same hook).
  const hookFn = (cpu) => {
    if (typeof globalThis._renderTrace === "function") {
      globalThis._renderTrace("FUN_extra_paint_444e08");
    }
    // Save entry esp/eip/callDepth so the harness's hook auto-ret-after-hook
    // (which pops [esp] and jumps there) pops the caller's return address
    // cleanly. The auto-ret cooperates with the outer painter-bridge shim's
    // RET_SENTINEL placement.
    const entryESP = cpu.regs.esp >>> 0;
    const entryEIP = cpu.regs.eip >>> 0;
    const entryCallDepth = cpu.callDepth;
    let handled = false;
    try {
      handled = paintBody444e08(heap, cpu, runFunction);
    } catch (e) {
      if (!install444e08Hook._warned) {
        install444e08Hook._warned = true;
        if (typeof console !== "undefined") {
          console.warn(`[444e08 port] JS body threw, falling back: ${(e.message || e).slice(0, 160)}`);
        }
      }
      handled = false;
    }
    cpu.regs.esp = entryESP;
    cpu.regs.eip = entryEIP;
    cpu.callDepth = entryCallDepth;
    if (!handled) {
      // Recursion-safe fallback: clear our hook before runBodyFrom so the
      // inner runFunction actually decodes the binary bytes at 0x444e08
      // (rather than re-entering this hook). Re-install after.
      clearEipHook(0x00444e08);
      try {
        runBodyFrom(heap, cpu, runFunction, 0x00444e08);
      } finally {
        _setEipHook(0x00444e08, hookFn);
      }
    }
  };
  setEipHook(0x00444e08, hookFn);
}
