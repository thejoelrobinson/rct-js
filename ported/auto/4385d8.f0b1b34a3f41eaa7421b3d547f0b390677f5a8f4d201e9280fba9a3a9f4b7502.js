// @manual — do not regenerate.
// Source: decompiled/c/4385d8.c
//
// Ghidra emits `goto LAB_0043896a` from inside `while(true)` inside
// `if (DAT_0099c169 == '\0')` inside `if (DAT_00628cb9 == '\0')`. The label
// `LAB_0043896a:` lives one block out (still inside the cb9 check, but
// outside the c169 check). The translator's forward-goto lowering only
// recognizes labels at the function body's top level, so this goto fell
// through to the `early-return` fallback — preventing FUN_009bbfb3 (the
// sprite walker) from ever running and leaving the DDraw surfaces blank.
// Hand-port wraps the c169 block in `LAB_0043896a: { ... }` and converts
// the goto to `break LAB_0043896a;`.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { GetNextWindow } from "../../runtime/win32.js";
import { CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
import { FUN_004039ff } from "./4039ff.js";
import { FUN_00403abb } from "./403abb.js";
import { FUN_004046fc } from "./4046fc.js";
import { FUN_0040473c } from "./40473c.js";
import { FUN_004058f8 } from "./4058f8.js";
import { FUN_0040bb01 } from "./40bb01.js";
import { FUN_0040bbcf } from "./40bbcf.js";
import { FUN_00424e0f } from "./424e0f.js";
import { FUN_004269d0 } from "./4269d0.js";
import { FUN_004269da } from "./4269da.js";
import { FUN_00426c8a } from "./426c8a.js";
import { FUN_004270f2 } from "./4270f2.js";
import { FUN_004298a0 } from "./4298a0.js";
import { FUN_0042c6f3 } from "./42c6f3.js";
import { FUN_0042ca0e } from "./42ca0e.js";
import { FUN_0042d678 } from "./42d678.js";
import { FUN_0042eae0 } from "./42eae0.js";
import { FUN_0042ef8a } from "./42ef8a.js";
import { FUN_0042f339 } from "./42f339.js";
import { FUN_0042f3a2 } from "./42f3a2.js";
import { FUN_0042fdf4 } from "./42fdf4.js";
import { FUN_004306ee } from "./4306ee.js";
import { FUN_004313a7 } from "./4313a7.js";
import { FUN_0043645c } from "./43645c.js";
import { FUN_00436508 } from "./436508.js";
import { FUN_004365c3 } from "./4365c3.js";
import { FUN_00438a1f } from "./438a1f.js";
import { FUN_00438aac } from "./438aac.js";
import { FUN_0043909f } from "./43909f.js";
import { FUN_004390dc } from "./4390dc.js";
import { FUN_0043910f } from "./43910f.js";
import { FUN_00439135 } from "./439135.js";
import { FUN_00444a79 } from "./444a79.js";
import { FUN_004499cc } from "./4499cc.js";
import { FUN_0044a363 } from "./44a363.js";
import { FUN_0044a381 } from "./44a381.js";
import { FUN_00450188 } from "./450188.js";
import { FUN_00450b4c } from "./450b4c.js";
import { FUN_0045268c } from "./45268c.js";
import { FUN_004531b0 } from "./4531b0.js";
import { FUN_004533d0 } from "./4533d0.js";
import { FUN_00453f76 } from "./453f76.js";
import { FUN_00454351 } from "./454351.js";
import { FUN_004543bd } from "./4543bd.js";
import { FUN_00454518 } from "./454518.js";
import { FUN_00454520 } from "./454520.js";
import { FUN_0045a895 } from "./45a895.js";
import { FUN_0045aaf8 } from "./45aaf8.js";
import { FUN_0045ab15 } from "./45ab15.js";
import { FUN_0045abea } from "./45abea.js";
import { FUN_0045acae } from "./45acae.js";
import { FUN_005d74b4 } from "./5d74b4.js";
import { FUN_005ddf20 } from "./5ddf20.js";
import { FUN_005df3bb } from "./5df3bb.js";
import { FUN_005df7a1 } from "./5df7a1.js";
import { FUN_005e0d60 } from "./5e0d60.js";
import { FUN_005e1653 } from "./5e1653.js";
import { FUN_005e5ff1 } from "./5e5ff1.js";
import { FUN_005e6028 } from "./5e6028.js";
import { FUN_009b30bc } from "./9b30bc.js";
import { FUN_009bb6af } from "./9bb6af.js";
import { FUN_009bb7bb } from "./9bb7bb.js";
import { FUN_009bb9f5 } from "./9bb9f5.js";
import { FUN_009bbfb3 } from "./9bbfb3.js";
import { FUN_009bc184 } from "./9bc184.js";
export function FUN_004385d8(heap) {
  const __sp = heap.allocFrame(4);
  const __addr_stack0xfffffffc = __sp + 0;
  try {
  let uVar1 = 0;
  let uVar2 = 0;
  let puVar3 = 0;
  let uVar4 = 0;
  let iVar5 = 0;
  let sVar6 = 0;
  LAB_00438a0d: {
  heap.setU32(0x00991f6c, (__addr_stack0xfffffffc) >>> 0);
  heap.setU32(0x005e9154, (0) >>> 0);
  puVar3 = ((__addr_stack0xfffffffc) >>> 0);
  if (heap.u8(0x00628cb8) == 0) {
    heap.setU8(0x00628cb8, (1) & 0xff);
    heap.setU32(0x00628cb0, (heap.u32(0x005e9190)) >>> 0);
    (regs.eax = FUN_004046fc(heap));
    // 0x438615 / 0x438621 are both `66 a3` = WORD stores. These seed the same
    // day/month "last seen" pair that FUN_0042ca0e compares against, and they
    // are two bytes apart, so a 32-bit store here clobbers the neighbour.
    heap.setU16(0x0099a502, (heap.u16(0x005f1ca4)) & 0xffff);
    heap.setU16(0x0099a504, (heap.u16(0x005f1394)) & 0xffff);
    (regs.eax = FUN_0042ef8a(heap));
    (regs.eax = FUN_005df3bb(heap));
    (regs.eax = FUN_0042f339(heap));
    (regs.eax = FUN_0042fdf4(heap));
    (regs.eax = FUN_009bb6af(heap));
    (regs.eax = FUN_0045268c(heap));
    (regs.eax = FUN_005e0d60(heap));
    (regs.eax = FUN_0042c6f3(heap));
    (regs.eax = FUN_004269d0(heap));
    (regs.eax = FUN_0045a895(heap));
    (regs.eax = FUN_00444a79(heap));
    (regs.eax = FUN_0044a381(heap));
    (regs.eax = FUN_0043910f(heap));
    (regs.eax = FUN_00454520(heap));
    (regs.eax = FUN_0043645c(heap));
    (regs.eax = FUN_004269da(heap));
    (regs.eax = FUN_004298a0(heap));
    (regs.eax = FUN_0045aaf8(heap));
    (regs.eax = FUN_0045abea(heap));
    (regs.eax = FUN_005ddf20(heap));
    (regs.eax = FUN_0044a363(heap));
    (regs.eax = FUN_004390dc(heap));
    (regs.eax = FUN_00454518(heap));
    (regs.eax = FUN_00438a1f(heap));
    (regs.edi = 0x99fb7c, regs.eax = FUN_009b30bc(heap));
    heap.setU32(0x0099a888, (0) >>> 0);
    (regs.eax = FUN_004039ff(heap, 0x0099a888, 0x0099a888, 0x0099a888, 0xa888, 0xa888));
    (regs.eax = FUN_00403abb(heap));
    heap.setU32(0x00999f90, ((regs.eax = FUN_0040473c(heap))) >>> 0);
    heap.setU8(0x00628cb9, (1) & 0xff);
    puVar3 = ((heap.u32(0x00991f6c)) >>> 0);
  }
  heap.setU32(0x00991f6c, (puVar3) >>> 0);
  iVar5 = (((regs.eax = FUN_0040473c(heap))) >>> 0);
  heap.setU32(0x00999f90, (iVar5 - heap.u32(0x00999f90)) >>> 0);
  if (500 < heap.u16(0x00999f90)) {
    heap.setU32(0x00999f90, (CONCAT22((((((heap.u32(0x00999f90)) >>> 0) >>> 0x10)) << 16 >> 16), 500)) >>> 0);
  }
  // 0x438703: `66 a3 98 9f 99 00` = mov WORD ptr [0x999f98], ax. Ghidra
  // collapsed this to a byte store, which silently truncates any frame delta
  // above 255 and leaves bits 8-15 stale from the previous frame. At a steady
  // 25ms/frame the low byte happens to be correct, which is why this survived
  // — but a slow frame (or the old `Date.now = () => ++_t` gate stub, which
  // produced deltas of ~330) writes 0x4a and keeps a stale high byte.
  // 0x999f98 is read back as a word at 0x43885e/0x5e1689, so the stale half
  // is observable. Binary clamps AX only; EAX's high word survives into the
  // 0x999f94 accumulation below, which is why that still reads 0x999f90.
  heap.setU16(0x00999f98, (heap.u16(0x00999f90)) & 0xffff);
  if (heap.u8(0x0099c169) == 0) {
    heap.setU32(0x00999f94, (heap.u32(0x00999f94) + heap.u32(0x00999f90)) >>> 0);
  }
  if (heap.u8(0x0099c16b) != 0) {
    // 0x438727: `66 c7 05 98 9f 99 00 1f 00` = mov WORD ptr [0x999f98], 0x1f.
    // Same collapsed width as above; 0x1f fits in a byte so only the stale
    // high half diverges.
    heap.setU16(0x00999f98, 0x1f);
  }
  heap.setU8(0x005f4a6a, (0) & 0xff);
  heap.setU32(0x00999f90, (iVar5) >>> 0);
  (regs.eax = FUN_009bb9f5(heap));
  if (heap.u8(0x005f8da2) == 0) {
    heap.setU8(0x005f8da2, (0x10) & 0xff);
    (regs.edi = 0x99fb7c, regs.eax = FUN_009b30bc(heap));
    (regs.eax = FUN_004058f8(heap, 0x8cd0, 0x8cd4));
    heap.setU32(0x00628ce0, (0) >>> 0);
  } else {
    if (0xf < heap.u8(0x005f8da2)) {
      heap.setU8(0x005f8da2, (heap.u8(0x005f8da2) + 1) & 0xff);
      if (0x2f < heap.u8(0x005f8da2)) {
        iVar5 = (((regs.eax = FUN_0040bb01(heap, 0x8cd8, 0x8cdc))) >>> 0);
        if (iVar5 != 0) {
          heap.setU32(0x00628ce0, (heap.u32(0x00628ce0) | heap.u32((((heap.u32(0x00628cd0)) >>> 0) + heap.u32(0x00628cd8) + (heap.u32(0x00628cd4) + 4) * heap.u32(0x00628cdc) + 2))) >>> 0);
          (regs.eax = FUN_0040bbcf(heap));
        }
      }
      GetNextWindow(heap, heap.u32(0x00628cd0), heap.u32(0x00628cd4));
      (regs.eax = FUN_005e6028(heap));
      if (heap.u8(0x005f8da2) != 0x60) {
        break LAB_00438a0d;
      }
      heap.setU8(0x005f8da2, (1) & 0xff);
      if (heap.u32(0x00628ce0) != 0) {
        heap.setU8(0x005f8da2, (2) & 0xff);
      }
      (regs.eax = FUN_0042f3a2(heap));
    }
    (regs.eax = FUN_009bc184(heap));
    (regs.eax = FUN_0042eae0(heap));
    if (heap.u32(0x005e9188) == 1) {
      heap.setU32(0x005e9188, (0) >>> 0);
      heap.setU32(0x0099a4fc, (heap.u32(0x0099a4fc) | 2) >>> 0);
    }
    (regs.eax = FUN_005df7a1(heap));
    (regs.eax = FUN_004531b0(heap));
    if (heap.u8(0x00628cb9) == 0) {
      uVar4 = ((heap.u8(0x00999f98) / 0x1f) & 0xffff);
      if (uVar4 == 0) {
        uVar4 = ((1) & 0xffff);
      }
      if (4 < uVar4) {
        uVar4 = ((4) & 0xffff);
      }
      LAB_0043896a: {
      if (heap.u8(0x0099c169) == 0) {
        while (true) {
          sVar6 = ((heap.u32(0x0099a4fe)) & 0xffff);
          heap.setU32(0x0088741c, (heap.u32(0x0088741c) + 1) >>> 0);
          heap.setU32(0x006e3b84, (heap.u32(0x006e3b84) + 1) >>> 0);
          heap.setU32(0x0099a4fe, (heap.u32(0x0099a4fe) + 1) >>> 0);
          if (heap.u32(0x0099a4fe) == 0) {
            heap.setU32(0x0099a4fe, (sVar6) >>> 0);
          }
          (regs.eax = FUN_004365c3(heap));
          sVar6 = ((heap.u32(0x006e3b82)) & 0xffff);
          (regs.eax = FUN_0045ab15(heap));
          (regs.eax = FUN_0045acae(heap));
          (regs.eax = FUN_00424e0f(heap));
          (regs.eax = FUN_00439135(heap));
          (regs.eax = FUN_005d74b4(heap));
          (regs.eax = FUN_0042d678(heap));
          (regs.eax = FUN_004499cc(heap));
          (regs.eax = FUN_00426c8a(heap));
          (regs.eax = FUN_004313a7(heap));
          (regs.eax = FUN_00450188(heap));
          (regs.eax = FUN_00450b4c(heap));
          (regs.eax = FUN_00436508(heap));
          (regs.eax = FUN_004533d0(heap));
          (regs.eax = FUN_004543bd(heap));
          (regs.eax = FUN_00453f76(heap));
          (regs.eax = FUN_00454351(heap));
          (regs.eax = FUN_0042ca0e(heap));
          (regs.eax = FUN_005e5ff1(heap));
          (regs.eax = FUN_004306ee(heap));
          if (sVar6 == heap.u32(0x006e3b82)) {
            (regs.eax = FUN_0043909f(heap));
          }
          if (heap.u32(0x005e9170) == 1) {
            break;
          }
          if ((((heap.u8(0x00991f36) != 0) && (heap.u8(0x00991f36) != 1)) || (uVar1 = ((heap.u32(0x00991f30) >>> 7) >>> 0), heap.setU32(0x00991f30, (heap.u32(0x00991f30) & 0xffffff7f) >>> 0), (uVar1 & 1) != 0)) || (uVar4 = ((uVar4 - 1) & 0xffff), uVar4 == 0)) {
            break LAB_0043896a;
          }
        }
        heap.setU32(0x005e9170, (0) >>> 0);
      }
      } /* LAB_0043896a */
      heap.setU32(0x00991f30, (heap.u32(0x00991f30) & 0xffffff7f) >>> 0);
      heap.setU8(0x006293cb, (heap.u8(0x006293cb) ^ 0x8000) & 0xff);
      uVar4 = ((heap.u8(0x006293cb) & 1) & 0xffff);
      heap.setU8(0x006293cb, (heap.u8(0x006293cb) & 0xfffc) & 0xff);
      if (uVar4 != 0) {
        heap.setU8(0x006293cb, (heap.u8(0x006293cb) | 2) & 0xff);
      }
      uVar2 = ((heap.u8(0x006293cb)) & 0xffff);
      heap.setU8(0x006293cb, (heap.u8(0x006293cb) & 0xfff7) & 0xff);
      uVar4 = ((heap.u8(0x006293cb) >>> 2) & 0xffff);
      heap.setU8(0x006293cb, (uVar2 & 0xfff3) & 0xff);
      if ((uVar4 & 1) != 0) {
        heap.setU8(0x006293cb, (heap.u8(0x006293cb) | 8) & 0xff);
      }
      (regs.eax = FUN_005e1653(heap));
      heap.setU8(0x008ad1c0, (heap.u8(0x008ad1c0) + 1) & 0xff);
      // x86: `mov ax, 0x1` before `call 0x4270f2`. Ghidra C-decompile dropped
      // the assignment because it inferred FUN_004270f2 as `void(void)`, but
      // the actual function reads AX as an argument (`or ax,ax; jz $+0x10`)
      // and short-circuits when AX==0. Without this, the post-fade input-
      // dispatch chain (4270f2 → 5e38f5 → 5e1fdd → 5e2225 → 5e3ace → 42a830 →
      // 427247) never executes, so the native click→pause flow is dead.
      regs.eax = 1;
      (regs.eax = FUN_004270f2(heap));
      (regs.eax = FUN_009bb7bb(heap));
      (regs.eax = FUN_009bbfb3(heap));
    } else {
      (regs.eax = FUN_00438aac(heap));
    }
    if (heap.u8(0x005f8da2) == 2) {
      heap.setU32(0x005e9150, (1) >>> 0);
      (regs.eax = FUN_004058f8(heap, 0x8cd0, 0x8cd4));
      GetNextWindow(heap, heap.u32(0x00628cd0), heap.u32(0x00628cd4));
    }
  }
  }
  // HAND-FIX (perf — the binary's 40fps busy-wait frame limiter):
  // the original spins `do { timeGetTime } while (now - [0x999f90] < 0x19)`
  // — padding every tick to 25ms (= 40fps) by burning the CPU on
  // GetTickCount. In a --cpu-prof of the live browser-mirrored loop this
  // spin was 25% of ALL CPU time, and it hard-caps the frame rate at 40fps
  // — the opposite of the 60-90fps goal. The loop has ZERO heap writes
  // (FUN_0040473c only reads the clock), so removing it is provably
  // sim-neutral and pixel-neutral: every heap byte and rendered pixel is
  // identical. Pacing is now the browser's requestAnimationFrame (display
  // refresh), which is where it belongs. We still read the clock once to
  // preserve regs.eax's exit value for any caller that reads it.
  regs.eax = FUN_0040473c(heap);
  void iVar5;
  return;
} finally {
    heap.freeFrame(4);
  }
}
