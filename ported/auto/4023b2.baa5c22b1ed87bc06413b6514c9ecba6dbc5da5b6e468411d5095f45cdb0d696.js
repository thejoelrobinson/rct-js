// @manual — do not regenerate.
//
// Source: decompiled/c/4023b2.c — dirty-rect blit from game back-buffer
// (DAT_005f1fec) to a locked DDraw primary surface, gated by the per-tile
// dirty-flag table at DAT_005f2420.
//
// Why hand-ported: the auto-translator faithfully emitted the wrapper-struct
// reads but with cryptic `__addr_local_XX` names that obscured what was
// happening — and the task ticket flagged a suspected DDSURFACEDESC field-
// offset bug at line 62 (`heap.u32(__addr_local_bc)` was claimed to read
// `dwSize` instead of `lpSurface`).
//
// Audit result: the auto-translated offsets are CORRECT, but they are correct
// because the on-stack struct is NOT a raw DDSURFACEDESC — it is the 168-byte
// "lock wrapper" populated by FUN_00408f00 (= [0x005ebe58]) and
// FUN_00408f53 (= [0x005ebe5c]). The wrapper layout (confirmed against
// FUN_00408f53.c and the matching hand-port in 402027.js) is:
//
//   +0x00  lpSurface   (4 bytes — copied from desc.lpSurface)
//   +0x04  format flag (2 bytes — = 4)
//   +0x06  width       (2 bytes — copied from desc.dwWidth)
//   +0x08  height      (2 bytes — copied from desc.dwHeight)
//   +0x0a  isFlipped   (2 bytes — = 1)
//   +0x0c  isLocked    (2 bytes — = 1)
//   +0x10  pitch       (4 bytes — copied from desc.lPitch)
//   +0x14  embedded DDSURFACEDESC (108 bytes)
//   +0x80  lpSurfaceObj (4 bytes — IDirectDrawSurface pointer)
//
// Ghidra named the stack locals at `[ebp - 0xbc]`, `[ebp - 0xb6]`, and
// `[ebp - 0xac]`. Subtracting 0xbc from each gives the wrapper offsets
// 0x00 (lpSurface base), 0x06 (width), and 0x10 (pitch) — exactly the
// fields the auto-translator was already reading. No offset fix needed.
//
// Hand-port preserves behaviour and frame layout (allocFrame(184) so
// existing callers that introspect SP are unaffected) while renaming the
// reads to their actual semantics.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00402a00 } from "./402a00.js";
import { FUN_00402aa4 } from "./402aa4.js";

export function FUN_004023b2(heap) {
  const __sp = heap.allocFrame(184);
  // Wrapper struct lives at __sp + 0..0x84. Ghidra called these locals:
  //   local_bc = __sp + 0   (wrapper base; also = lpSurface AFTER lock)
  //   local_b6 = __sp + 6   (width, ushort — short-lived capture as local_c)
  //   local_ac = __sp + 16  (pitch, int)
  const __wrapper        = __sp + 0;
  const __addr_local_c   = __sp + 176;  // dead-after-write scratch slot
  const __addr_local_8   = __sp + 180;  // outer column-band counter
  const __addr_local_14  = __sp + 168;  // dirty-run column span
  const __addr_local_10  = __sp + 172;  // src-row leftover stride
  try {
    let iVar1 = 0;
    let puVar3 = 0;
    let puVar4 = 0;
    let iVar5 = 0;
    let local_fc = 0;
    let local_cc = 0;
    let local_c0 = 0;

    // FUN_00408f00 — zero+init wrapper, attach IDirectDrawSurface pointer.
    iVar1 = (regs.eax = callIndirect(heap, heap.u32(0x005ebe58), __wrapper)) >>> 0;
    if (iVar1 === 0) return 0;

    // FUN_00408f53 — Lock the attached surface; on success populates the
    // wrapper's leading fields (lpSurface @ +0, width @ +6, height @ +8,
    // pitch @ +0x10) from the returned DDSURFACEDESC.
    iVar1 = (regs.eax = callIndirect(heap, heap.u32(0x005ebe5c), __wrapper)) >>> 0;
    if (iVar1 === 0) return 0;

    // Per-mode entry check (FUN_00402a00). If it returns 0, Unlock and bail.
    iVar1 = (regs.eax = FUN_00402a00(heap)) >>> 0;
    if (iVar1 === 0) {
      regs.eax = callIndirect(heap, heap.u32(0x005ebe60), __wrapper);
      return 0;
    }

    // Snapshot wrapper.width into local_c. Original C declared local_c and
    // local_b6 as undefined2 (16-bit). Use u16 reads/writes to match.
    heap.setU16(__addr_local_c, heap.u16(__wrapper + 6));

    // Cached field reads — the wrapper's lpSurface and pitch are stable for
    // the duration of the locked region; pulling them into locals is purely
    // for readability (the auto-translator re-read them inside the loop body
    // and that is fine, just noisy).
    const dstBase  = heap.u32(__wrapper + 0x00);   // lpSurface
    const dstPitch = heap.u32(__wrapper + 0x10);   // lPitch
    const srcPitch = heap.u32(0x005f1ff4);
    const srcBase  = heap.u32(0x005f1fec);

    local_cc = 0x005f2420 >>> 0;
    // @manual HAND-FIX (painter-noise round 2): DAT_005f15c4 / DAT_005f1b34
    // are populated by WM_SIZE from CreateWindowExA, which the binary calls
    // with 800x600 dims (matches GetSystemMetrics/GetDeviceCaps). But the
    // runtime allocates back+primary surfaces at 640x480 (runtime/win32/
    // ddraw.js IDD_CreateSurface forces 640x480 for primary). With the raw
    // 800x600 bounds the inner copy loop reads source addresses up to
    // (600-1)*640+800 = 384,800 bytes past srcBase — well past the
    // 640*480=307,200-byte surface — and the OOB reads return whatever
    // heap garbage lives there (random byte patterns 0x70..0xa0), which
    // 4023b2 then writes into the FRONT surface as the chaotic top-22%
    // noise pattern observed in surface dumps. Clip the bounds locally to
    // the actual back-surface dimensions so the OOB reads never happen.
    // Mutating DAT_005f15c4/DAT_005f1b34 globally was tried and caused a
    // viewport-size cascade (the cache-invalidate path in 9bb9f5 triggers
    // a viewport resize on tick 2). The local clamp avoids that side
    // effect while still preventing the OOB reads/writes that produce
    // the visible noise.
    const __backW = heap.u32(0x005f2400) >>> 0;   // = 640
    const __backH = heap.u32(0x005f1ff0) >>> 0;   // = 480
    const __wBound = Math.min(heap.u32(0x005f15c4) >>> 0, __backW);
    const __hBound = Math.min(heap.u32(0x005f1b34) >>> 0, __backH);
    for (heap.setU32(__addr_local_8, 0);
         heap.u32(__addr_local_8) < __wBound;
         heap.setU32(__addr_local_8, (heap.u32(__addr_local_8) + 0x40) >>> 0)) {
      local_fc = 0;
      local_c0 = 0;
      while (iVar1 = local_c0 >>> 0, local_c0 < __hBound) {
        if (heap.u8((local_cc + local_fc) >>> 0) === 0) {
          local_fc = (local_fc + 0x14) >>> 0;
          local_c0 = (local_c0 + 8) >>> 0;
        } else {
          do {
            heap.setU8((local_cc + local_fc) >>> 0, 0);
            local_fc = (local_fc + 0x14) >>> 0;
            local_c0 = (local_c0 + 8) >>> 0;
            if (__hBound <= local_c0) break;
          } while (heap.u8((local_cc + local_fc) >>> 0) !== 0);

          heap.setU32(__addr_local_14, (local_c0 - iVar1) >>> 0);
          const col = heap.u32(__addr_local_8);
          puVar3 = (srcPitch * iVar1 + col + srcBase) >>> 0;
          puVar4 = (dstPitch * iVar1 + col + dstBase) >>> 0;
          heap.setU32(__addr_local_10, (srcPitch + -0x40) >>> 0);
          iVar1 = 0x10;
          iVar5 = heap.u32(__addr_local_14) >>> 0;
          do {
            for (; iVar1 !== 0; iVar1 = (iVar1 + -1) >>> 0) {
              heap.setU32(puVar4, heap.u32(puVar3) >>> 0);
              puVar3 = (puVar3 + 4) >>> 0;
              puVar4 = (puVar4 + 4) >>> 0;
            }
            puVar4 = (puVar4 + dstPitch + -0x40) >>> 0;
            puVar3 = (puVar3 + heap.u32(__addr_local_10)) >>> 0;
            iVar5 = (iVar5 + -1) >>> 0;
            iVar1 = 0x10;
          } while (iVar5 !== 0);
          heap.setU32(0x005f2404, (heap.u32(0x005f2404) + 1) >>> 0);
        }
      }
      local_cc = (local_cc + 1) >>> 0;
    }

    regs.eax = FUN_00402aa4(heap);
    regs.eax = callIndirect(heap, heap.u32(0x005ebe60), __wrapper);
    heap.setU32(0x005f1fe0, 3);
    return 1;
  } finally {
    heap.freeFrame(184);
  }
}
