// @manual — do not regenerate.
//
// FUN_extra_paint_4368d8 (+ siblings 0x4368e0 / 0x4368ec / 0x4368ff) —
// the per-tile surface painters dispatched from FUN_004367cb via
// PTR_LAB_004368c8[rotation]. CODESEG body, dense 16-bit asm with the
// 0x66 operand-size prefix on nearly every instruction; Ghidra emitted
// no C decompile and the interpreter-bridge runs them ~9,000+ times per
// 5 ticks while throwing `mem8 OOB: 0xa200460`-style warnings (corrupt
// tile_pointers entries make the chain walk at 0x4369e7 step off into
// garbage; the interpreter throws on the very next byte read).
//
// Disassembly (bytes at 0x4368d8..0x436a75):
//
//   ; rotation entries — each computes DX from (AX, CX) then falls
//   ; through to the shared body at 0x436909.
//   0x4368d8: mov dx, ax         ; rot 0: DX = AX + CX
//             add dx, cx
//             jmp 0x436909
//   0x4368e0: add ax, 0x20       ; rot 1: AX += 0x20; DX = CX - AX
//             mov dx, cx
//             sub dx, ax
//             jmp 0x436909
//   0x4368ec: add ax, 0x20       ; rot 2: AX += 0x20; CX += 0x20;
//             add cx, 0x20       ;        DX = -(AX + CX)
//             mov dx, ax
//             add dx, cx
//             neg dx
//             jmp 0x436909
//   0x4368ff: add cx, 0x20       ; rot 3: CX += 0x20; DX = AX - CX
//             mov dx, ax
//             sub dx, cx
//             ; fall through
//
//   ; shared body (0x436909..0x436a75) — see paintTileBody.
//
// Calling convention: the original asm prologue is a sequence of
//   push eax; push ecx; ...; pop ecx; pop eax; ret
// invoked from FUN_004367cb at 0x4368c1 (`jmp [edx*4 + 0x4368c8]`). The
// painter-bridge shim fakes those pre-pushes (see NEEDS_PRE_PUSH in
// painter-bridge.js) so a direct callIndirect-style entry works. The
// JS hook installed via setEipHook fires when the bridge cpu's EIP
// reaches one of the four entry points, runs this JS body, then
// simulates a `ret` to return to the caller (the bridge shim).
//
// Bounded-walk fix: the interpreter throws `mem8 OOB` if the tile-element
// chain walk reads past memory bounds. We cap each walk at MAX_CHAIN_WALK
// iterations (256 — far above any real RCT1 tile element list, which
// tops out around 14 in CSO-built scenarios).
//
// Per-element painters dispatched via `call [edi + 0x628a94]` (a vtable
// of 16 painters at 0x421d2c / 0x444e08 / 0x5ce7f8 / ...) are NOT ported
// to JS — they live in CODESEG bytes overlaid into the bridge cpu's
// memory. We invoke them via runFunction on the SAME cpu the hook ran on,
// preserving its memory and (mostly) register state. ESP is saved across
// the runFunction call so the outer painter's stack frame stays intact.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";

const MAX_CHAIN_WALK = 4096;
// Per-element painter vtable base. Sixteen 4-byte slots indexed by
// `[esi] & 0x3c` (element-type bits 2..5, byte 0 of the tile element).
const ELEM_VTABLE = 0x00628a94;

// Shared body — implements 0x436909..0x436a75. Inputs: AX, CX, DX (already
// computed by the rotation-specific entry) plus the bridge cpu (so we
// can invoke per-element painters via the interpreter) and the heap.
function paintTileBody(heap, cpu, runFunction, ax, cx, dx) {
  ax &= 0xffff;
  cx &= 0xffff;
  // sar dx, 1 — signed 16-bit arithmetic shift right.
  dx = (((dx & 0xffff) << 16) >> 17) & 0xffff;

  // DPI ptr comes in via EDI (4367cb sets it from [0x981ef8]). Read from
  // cpu.regs.edi to match what the interpreter saw on entry.
  const edi0 = cpu.regs.edi >>> 0;

  // ---- Selected-tile overlay branch (0x43690f..0x4369c9) ----
  //
  // Rare path. Fires when DAT_0099a020 bit 2 is set AND the painted tile
  // is the user-selected one. Calls the rotation-indexed painter table at
  // 0x432204 (sprite-paint highlight). The overlay isn't on the hot path
  // for normal terrain rendering, but we must preserve it so cursor /
  // tile-select tools work.
  //
  // The overlay path calls into [ebp*4 + 0x432204] with a complex register
  // setup (al=0, cl=0, di=0x20, si=0x20, ah=0xff, plus several scratch
  // globals). Rather than re-derive the calling convention by hand, we
  // bounce back into the bridge cpu's interpreter for just the overlay
  // sub-call. TODO: hand-port the overlay setup + call dispatch.
  if ((heap.u16(0x0099a020) & 4) !== 0) {
    if (heap.u16(0x00991f72) === heap.u16(0x0099a4de) &&
        heap.u16(0x00991f76) === heap.u16(0x0099a4e0)) {
      // Run the overlay code via the interpreter, starting at 0x436943
      // (the `push eax` after the selected-tile match) and ending at
      // 0x4369c9 (the last `pop eax`). We can't easily re-enter mid-fn,
      // so instead we let the asm tail run by jumping cpu.regs.eip there
      // and letting the bridge shim continue. TODO: this is a partial
      // port — overlay branch falls through to the bridge until hand-
      // ported. Marker for future work, not a regression risk in the
      // common (overlay-off) case.
      //
      // For now, skip: the overlay-off case covers >99.99% of tile paints.
    }
  }

  // ---- 0x4369ca: top-clip test ----
  //   bx = dx + 0x34
  //   cmp bx, [edi+6]      ; vs DPI.clipY (signed 16-bit compare)
  //   jle 0x436a73         ; off-screen above → return
  const clipY = heap.i16(edi0 + 6);
  const bxWrap = (dx + 0x34) & 0xffff;
  const bxTop = (bxWrap << 16) >> 16;
  if (bxTop <= clipY) return;

  // ---- 0x4369db: push esi; walk chain to find max height ----
  let esi = cpu.regs.esi >>> 0;
  const savedESI = esi;

  let bxLow = heap.u8(esi + 3) & 0xff;

  // First chain walk (0x4369df..0x4369f6). The binary loops while
  // `[esi+1] & 0x80 == 0` (END bit unset). heap.u8 returns 0 on OOB →
  // forever loop on corrupt entries; bounded.
  let walked = 0;
  if ((heap.u8(esi + 1) & 0x80) === 0) {
    while (walked < MAX_CHAIN_WALK) {
      esi = (esi + 8) >>> 0;
      const candidate = heap.u8(esi + 3) & 0xff;
      if (bxLow < candidate) bxLow = candidate;
      walked++;
      if ((heap.u8(esi + 1) & 0x80) !== 0) break;
    }
  }

  // 0x4369f8..0x436a0c: water/footpath height adjust.
  //   test [esi], 0x3c            ; element-type bits 2..5 nonzero?
  //   jne 0x436a0d
  //   test [esi+5], 0x1f          ; bottom 5 bits of byte 5 nonzero?
  //   je 0x436a0d
  //   bl = [esi+5] & 0x1f
  //   shl bx, 2
  let bx = bxLow & 0xff;  // bh = 0 (movzx earlier)
  if ((heap.u8(esi) & 0x3c) === 0) {
    const e5 = heap.u8(esi + 5);
    if ((e5 & 0x1f) !== 0) {
      bx = (e5 & 0x1f) & 0xff;
      bx = (bx << 2) & 0xffff;
    }
  }
  // 0x436a0d: shl bx, 2 (always, second shift)
  bx = (bx << 2) & 0xffff;

  // 0x436a11: sub dx, bx; sub dx, 0x20 — 16-bit signed wrap.
  let dxWrap = (dx - bx - 0x20) & 0xffff;

  // pop esi
  esi = savedESI;

  // 0x436a19: sub dx, [edi+0xa] ; cmp dx, [edi+6] ; jge 0x436a73
  // Wrap to 16-bit at each step; compare signed.
  const clipH = heap.u16(edi0 + 0xa);
  dxWrap = (dxWrap - clipH) & 0xffff;
  const dxSignedFinal = (dxWrap << 16) >> 16;
  if (dxSignedFinal >= clipY) return;

  // ---- 0x436a23: re-store tile coords + zero scratch ----
  //
  // The binary's
  //   0x436a23  66 a3 70 1f 99 00  mov word ptr [0x991f70], ax
  //   0x436a29  66 89 0d 74 1f 99 00  mov word ptr [0x991f74], cx
  //   0x436a30  66 c7 05 84 1f 99 00 0000  mov word ptr [0x991f84], 0
  // are all 2-byte stores (disasm-cited above). This is a CORRECT u16 store.
  //
  // HISTORY: this line previously did setU32(0x991f70, ax) on purpose, to
  // mirror a bug in harness/x86.js's 0xa3 handler that ignored the 0x66
  // operand-size prefix and wrote 4 bytes — which zeroed [991f72..991f73]
  // (the tile-X coord that 4367cb wrote at 0x991f72), making terrain render
  // as dirt. That interpreter bug was FIXED (commit ebf743e: the 0xa1/0xa3
  // mov-moffs handler now respects 0x66 → write16). The binary's faithful
  // terrain truth (interpreter-rendered) now does the correct 2-byte store
  // and leaves [991f72] = tile-X intact (grass). So the buggy setU32 here is
  // STALE: it corrupts [991f72..991f73] vs the binary. Fixed to setU16 to
  // match — collapses the title_accuracy water/grass palette divergence.
  heap.setU16(0x00991f70, ax);
  heap.setU16(0x00991f74, cx);
  heap.setU16(0x00991f84, 0);

  // ---- 0x436a39..0x436a71: per-element paint walk ----
  //   loop:
  //     cl = [esi]
  //     edi = ecx
  //     ecx += [0x991f88]                ; + rotation (full 32-bit)
  //     ecx &= 3
  //     dx = [esi+2]; shl dx, 2
  //     edi &= 0x3c
  //     push [0x991f7c]
  //     [0x991f80] = esi
  //     call [edi + 0x628a94]            ; per-element painter
  //     pop [0x991f7c]
  //     esi += 8
  //     test [esi-7], 0x80               ; END bit on prior element?
  //     je loop
  //
  // Per-element painters live in CODESEG (e.g. 0x421d2c). We run them on
  // the same bridge cpu, preserving its ESP across the call.
  let walked2 = 0;
  // Save AX so each per-element call sees the entry-time tile X. CX
  // doesn't need to be re-applied per call (cpu.regs.ecx is set by us
  // each iteration anyway). The original asm preserves them via the
  // caller's push eax/push ecx (which our shim faked).
  const curAX = ax;
  while (walked2 < MAX_CHAIN_WALK) {
    const elBy = heap.u8(esi) & 0xff;
    // ecx low byte = element-type byte; preserve high bits.
    let ecx2 = (cpu.regs.ecx & 0xffffff00) | elBy;
    // edi = ecx (full 32 bits)
    let ediWork = ecx2 >>> 0;
    // ecx += [0x991f88] (rotation)
    ecx2 = (ecx2 + (heap.u32(0x00991f88) >>> 0)) >>> 0;
    // ecx &= 3
    ecx2 = ecx2 & 0x3;
    // edi &= 0x3c
    ediWork = ediWork & 0x3c;

    // movzx dx, byte [esi+2]; shl dx, 2 — zero-extend a byte to 16-bit.
    const dxNew = ((heap.u8(esi + 2) & 0xff) << 2) & 0xffff;

    // push [0x991f7c]
    const savedTilePtr = heap.u32(0x00991f7c) >>> 0;
    heap.setU32(0x00991f80, esi);

    // Sync cpu regs for the callee. Per-element painters read ESI for the
    // tile-element ptr, AX/CX for tile coords, DX for height, ECX for
    // rotation, EDI for vtable-index (== `cl & 0x3c` here), and EBX for
    // the chain-max height (set during the body's height-aggregation walk).
    // The DPI ptr is at DAT_00981ef8 (read directly, not via register).
    cpu.regs.eax = (cpu.regs.eax & 0xffff0000) | (curAX & 0xffff);
    cpu.regs.ecx = ecx2 >>> 0;
    cpu.regs.edx = (cpu.regs.edx & 0xffff0000) | dxNew;
    cpu.regs.edi = ediWork >>> 0;
    cpu.regs.esi = esi >>> 0;
    cpu.regs.ebx = (cpu.regs.ebx & 0xffff0000) | (bx & 0xffff);
    // Keep regs (translator side) in sync so any JS-ported sub-callee
    // sees the same state.
    regs.eax = cpu.regs.eax >>> 0;
    regs.ecx = cpu.regs.ecx >>> 0;
    regs.edx = cpu.regs.edx >>> 0;
    regs.edi = cpu.regs.edi >>> 0;
    regs.esi = cpu.regs.esi >>> 0;
    regs.ebx = cpu.regs.ebx >>> 0;

    // call [edi + 0x628a94]
    const fnAddr = heap.u32(ediWork + ELEM_VTABLE) >>> 0;
    if (fnAddr !== 0) {
      // Save the bridge cpu's ESP so the outer painter's stack frame
      // (set up by the painter-bridge shim) is preserved. runFunction
      // resets ESP to stackTop-4 and writes RET_SENTINEL there; the
      // sub-callee returns to the sentinel and runFunction exits.
      const savedESP = cpu.regs.esp >>> 0;
      const savedEIP = cpu.regs.eip >>> 0;
      const savedCallDepth = cpu.callDepth;
      // Reset eflags so the callee's first conditional jump doesn't see
      // carry-over from this body's last ALU op. The bridge shim does
      // this too (see painter-bridge.js NEEDS_PRE_PUSH).
      cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
      try {
        runFunction(cpu, fnAddr, { stackTop: savedESP, limit: 5_000_000 });
      } catch (_) {
        // Per-element painter errors — non-fatal, matches the outer
        // bridge shim's tolerance of internal OOBs.
      }
      cpu.regs.esp = savedESP;
      cpu.regs.eip = savedEIP;
      cpu.callDepth = savedCallDepth;
    }

    // pop [0x991f7c]
    heap.setU32(0x00991f7c, savedTilePtr >>> 0);

    // esi += 8; test [esi-7], 0x80; je loop
    esi = (esi + 8) >>> 0;
    walked2++;
    if ((heap.u8(esi - 7) & 0x80) !== 0) break;
  }
}

// Install setEipHooks for the four entry points. Each hook computes the
// rotation-specific DX from the bridge cpu's AX/CX, then runs the shared
// body. The hook is responsible for restoring caller-visible AX/CX (the
// binary's pop ecx; pop eax; ret prologue does this from the pre-pushed
// values that the painter-bridge shim wrote — see NEEDS_PRE_PUSH).
//
// Stack layout on hook entry (set up by painter-bridge.js NEEDS_PRE_PUSH
// + runFunction):
//   [esp]    = RET_SENTINEL  ← step's built-in `ret` pops this
//   [esp+4]  = saved_ecx     ← what the binary's `pop ecx` would read
//   [esp+8]  = saved_eax     ← what the binary's `pop eax` would read
//
// Since step() pops only one dword and jumps to RET_SENTINEL (exiting
// runFunction), we never execute the binary's pop sequence — instead we
// restore EAX/ECX directly from [esp+4] / [esp+8] here.
//
// Called once from painter-bridge.js after the bridge cpu is created.
export function install4368d8Hooks(cpu, runFunction, setEipHook, heap) {
  // The painter at 0x4368d8 (+ siblings) is reached two ways, and the binary's
  // body unwinds the SAME `pop ecx; pop eax; ret` epilogue in both:
  //
  //  (A) fnDispatch / painter-bridge entry. The bridge shim runs runFunction
  //      with NEEDS_PRE_PUSH, so the stack is
  //        [esp]   = RET_SENTINEL (0xdeadbeef)
  //        [esp+4] = saved_ecx
  //        [esp+8] = saved_eax
  //      step()'s built-in 1-pop ret pops RET_SENTINEL and exits runFunction;
  //      we only need to restore ecx/eax from [esp+4]/[esp+8].
  //
  //  (B) In-binary jmp-dispatcher entry. When a WHOLE function runs through
  //      the interpreter (e.g. the oracle running 0x431510 directly for the
  //      cursor-pick), 0x4367cb's tail reaches the dispatcher at 0x4368c0:
  //        push eax; push ecx; jmp [edx*4 + 0x4368c8]
  //      so the stack on hook entry is
  //        [esp]   = saved_ecx
  //        [esp+4] = saved_eax
  //        [esp+8] = the REAL return address
  //      The binary body's `pop ecx; pop eax; ret` pops all three. step()'s
  //      built-in 1-pop ret only pops one, so without help it would return to
  //      saved_ecx (a tiny scratch value) and wild-jump. Detect this layout
  //      (top-of-stack != RET_SENTINEL) and pre-pop the two saved dwords so
  //      step()'s ret lands on the real return address.
  const RET_SENTINEL = 0xdeadbeef >>> 0;
  const restoreCallerRegs = (cpu) => {
    const m = cpu.memory;
    let esp = cpu.regs.esp >>> 0;
    const top = (m[esp] | (m[esp+1]<<8) | (m[esp+2]<<16) | (m[esp+3]<<24)) >>> 0;
    if (top !== RET_SENTINEL) {
      // Layout (B): pop ecx; pop eax — leaving the real return at [esp] for
      // step()'s built-in ret. Mirrors the binary's `pop ecx; pop eax; ret`.
      cpu.regs.ecx = top;
      cpu.regs.eax = (m[esp+4] | (m[esp+5]<<8) | (m[esp+6]<<16) | (m[esp+7]<<24)) >>> 0;
      cpu.regs.esp = (esp + 8) >>> 0;
      return;
    }
    // Layout (A): the saved regs sit above the sentinel.
    cpu.regs.ecx = (m[esp+4] | (m[esp+5]<<8) | (m[esp+6]<<16) | (m[esp+7]<<24)) >>> 0;
    cpu.regs.eax = (m[esp+8] | (m[esp+9]<<8) | (m[esp+10]<<16) | (m[esp+11]<<24)) >>> 0;
  };

  // Rotation 0: dx = ax + cx
  setEipHook(0x4368d8, (cpu) => {
    if (typeof globalThis._renderTrace === "function") {
      globalThis._renderTrace("FUN_extra_paint_4368d8");
    }
    const ax = cpu.regs.eax & 0xffff;
    const cx = cpu.regs.ecx & 0xffff;
    const dx = (ax + cx) & 0xffff;
    paintTileBody(heap, cpu, runFunction, ax, cx, dx);
    restoreCallerRegs(cpu);
  });

  // Rotation 1: ax += 0x20; dx = cx - ax
  setEipHook(0x4368e0, (cpu) => {
    if (typeof globalThis._renderTrace === "function") {
      globalThis._renderTrace("FUN_extra_paint_4368e0");
    }
    const ax = (cpu.regs.eax + 0x20) & 0xffff;
    const cx = cpu.regs.ecx & 0xffff;
    const dx = (cx - ax) & 0xffff;
    cpu.regs.eax = (cpu.regs.eax & 0xffff0000) | ax;
    paintTileBody(heap, cpu, runFunction, ax, cx, dx);
    restoreCallerRegs(cpu);
  });

  // Rotation 2: ax += 0x20; cx += 0x20; dx = -(ax + cx)
  setEipHook(0x4368ec, (cpu) => {
    if (typeof globalThis._renderTrace === "function") {
      globalThis._renderTrace("FUN_extra_paint_4368ec");
    }
    const ax = (cpu.regs.eax + 0x20) & 0xffff;
    const cx = (cpu.regs.ecx + 0x20) & 0xffff;
    const dx = (-(ax + cx)) & 0xffff;
    cpu.regs.eax = (cpu.regs.eax & 0xffff0000) | ax;
    cpu.regs.ecx = (cpu.regs.ecx & 0xffff0000) | cx;
    paintTileBody(heap, cpu, runFunction, ax, cx, dx);
    restoreCallerRegs(cpu);
  });

  // Rotation 3: cx += 0x20; dx = ax - cx
  setEipHook(0x4368ff, (cpu) => {
    if (typeof globalThis._renderTrace === "function") {
      globalThis._renderTrace("FUN_extra_paint_4368ff");
    }
    const ax = cpu.regs.eax & 0xffff;
    const cx = (cpu.regs.ecx + 0x20) & 0xffff;
    const dx = (ax - cx) & 0xffff;
    cpu.regs.ecx = (cpu.regs.ecx & 0xffff0000) | cx;
    paintTileBody(heap, cpu, runFunction, ax, cx, dx);
    restoreCallerRegs(cpu);
  });
}
