// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/45ab15.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042913a } from "./42913a.js";
import { FUN_00429249 } from "./429249.js";
import { FUN_00429361 } from "./429361.js";
import { FUN_004294a2 } from "./4294a2.js";
import { FUN_00429502 } from "./429502.js";
import { FUN_0042e9e5 } from "./42e9e5.js";
import { FUN_004314c5 } from "./4314c5.js";
import { FUN_00442516 } from "./442516.js";
import { FUN_0044290a } from "./44290a.js";
import { FUN_00443f36 } from "./443f36.js";
import { FUN_0044408f } from "./44408f.js";
import { FUN_004440ac } from "./4440ac.js";
import { FUN_0044470e } from "./44470e.js";
import { FUN_0044a246 } from "./44a246.js";
import { FUN_00451d6e } from "./451d6e.js";
import { FUN_0045818d } from "./45818d.js";
export function FUN_0045ab15(heap) {
  let sVar1 = 0;
  let uVar2 = 0;
  let bVar3 = 0;
  if ((((((heap.u32(0x006e3b82) + 4) >>> 0) * (0) * (0x0064bc60 + (heap.u32(0x006e3b80) & 7) * 2) >>> 0x10)) << 24 >> 24) != (((heap.u32(0x006e3b82) * (0) * (0x0064bc60 + (heap.u32(0x006e3b80) & 7) * 2) >>> 0x10)) << 24 >> 24)) {
    (regs.eax = FUN_0044470e(heap));
    (regs.eax = FUN_0044290a(heap));
  }
  if (0xffee < ((heap.u32(0x006e3b82) << 2) & 0xffff)) {
    (regs.eax = FUN_0045818d(heap));
    (regs.eax = FUN_004314c5(heap));
    (regs.eax = FUN_0044408f(heap));
    (regs.eax = FUN_004440ac(heap));
    (regs.eax = FUN_00442516(heap));
    (regs.eax = FUN_00451d6e(heap));
    uVar2 = (((heap.u32(0x006e3b80) & 7) == 0) & 0xff);
    if ((heap.u32(0x006e3b80) & 7) < 2) {
      sVar1 = ((100) & 0xffff);
      do {
        (regs.eax = FUN_0042e9e5(heap));
        if (!uVar2) {
          break;
        }
        sVar1 = ((sVar1 + -1) & 0xffff);
      } while (sVar1 != 0);
    }
    (regs.eax = FUN_0042913a(heap));
    (regs.eax = FUN_00429249(heap));
  }
  // THE IN-GAME CALENDAR. Binary 0x45aba8-0x45abcd:
  //   mov ax, WORD [0x6e3b82]      ; day-progress within the month
  //   shl ax, 1 / add ax, 8 / jae  ; carry here calls 0x44a246
  //   add WORD [0x6e3b82], 4       ; day advances 4 per sim step
  //   jae  done                    ; NO carry -> same month
  //   inc WORD [0x6e3b80]          ; carry out of 16 bits -> MONTH++
  //   or  WORD [0x5f54ec], 2
  //
  // So a month is exactly 65536/4 = 16,384 sim steps, and the rollover is the
  // 16-BIT carry out of 0x6e3b82. Ghidra emitted 32-bit reads and stores, which
  // broke this three ways at once:
  //   1. `u32(0x6e3b82)` spans 0x6e3b82-0x6e3b85, so it reads the day word OR'd
  //      with the low half of the tick counter at 0x6e3b84 (~86541 at load).
  //      The guard `0xfffb < that` is then permanently TRUE, so the month
  //      incremented EVERY TICK instead of every 16,384 — measured as 0x6e3b80
  //      going 2500 -> 5000 over 2500 ticks.
  //   2. `setU32(0x6e3b82, ...)` writes four bytes and so CORRUPTS the sim tick
  //      counter at 0x6e3b84 on every sim step.
  //   3. The day counter never wrapped at 16 bits, so it could never carry
  //      legitimately.
  // This is why ADDENDUM 115's attempt to read 0x6e3b80 as a month saw it
  // advancing +1 per tick and concluded, wrongly, that it was not the month.
  sVar1 = ((heap.u16(0x006e3b82) * 2 + 8) & 0xffff);
  if (0xfff7 < ((heap.u16(0x006e3b82) * 2) & 0xffff)) {
    sVar1 = (((regs.eax = FUN_0044a246(heap))) & 0xffff);
  }
  bVar3 = ((0xfffb < heap.u16(0x006e3b82)) & 0xff);
  heap.setU16(0x006e3b82, (heap.u16(0x006e3b82) + 4) & 0xffff);
  if (bVar3) {
    heap.setU16(0x006e3b80, (heap.u16(0x006e3b80) + 1) & 0xffff);
    // 0x45abcd: `66 83 0d ec 54 5f 00 02` = or WORD ptr [0x5f54ec], 2
    heap.setU16(0x005f54ec, (heap.u16(0x005f54ec) | 2) & 0xffff);
    (regs.eax = FUN_00443f36(heap));
    (regs.eax = FUN_00429361(heap));
    (regs.eax = FUN_004294a2(heap));
    sVar1 = (((regs.eax = FUN_00429502(heap))) & 0xffff);
  }
  return sVar1;
}
