// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/40bc20.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { OutputDebugStringA, _memset } from "../../runtime/win32.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_0040c93f } from "./40c93f.js";
import { FUN_004122a3 } from "./4122a3.js";
import { FUN_004123ff } from "./4123ff.js";
export function FUN_0040bc20(heap) {
  const __sp = heap.allocFrame(60);
  const __addr_local_34 = __sp + 12;
  const __addr_local_3c = __sp + 4;
  const __addr_local_10 = __sp + 48;
  const __addr_local_2c = __sp + 20;
  const __addr_local_38 = __sp + 8;
  const __addr_local_14 = __sp + 44;
  const __addr_local_20 = __sp + 32;
  const __addr_local_18 = __sp + 40;
  const __addr_local_30 = __sp + 16;
  const __addr_local_28 = __sp + 24;
  const __addr_local_24 = __sp + 28;
  const __addr_local_1c = __sp + 36;
  const __addr_local_c = __sp + 52;
  const __addr_local_8 = __sp + 56;
  try {
  let iVar1 = 0;
  let in_stack_00000018 = 0;
  let local_40 = 0;
  heap.setU32(__addr_local_8, (0) >>> 0);
  (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((0x005f04ec + in_stack_00000018 * 0x16c))) + 0x24)), heap.u32((0x005f04ec + in_stack_00000018 * 0x16c)), __addr_local_20));
  if ((heap.u32(__addr_local_20 + (0) * 4) & 2) != 0) {
    heap.setU32(__addr_local_1c, ((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((0x005f04ec + in_stack_00000018 * 0x16c))) + 0x50)), heap.u32((0x005f04ec + in_stack_00000018 * 0x16c))))) >>> 0);
    if (heap.u32(__addr_local_1c) < 0) {
      return;
    }
    heap.setU32((0x005f04f4 + in_stack_00000018 * 0x16c), (0) & 0xffffffff);
    heap.setU32(__addr_local_8, (1) >>> 0);
  }
  (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((0x005f04ec + in_stack_00000018 * 0x16c))) + 0x10)), heap.u32((0x005f04ec + in_stack_00000018 * 0x16c)), __addr_local_34, __addr_local_18));
  if ((heap.u32((0x005f04f4 + in_stack_00000018 * 0x16c)) != heap.u32(__addr_local_34)) || (heap.u32(__addr_local_8) != 0)) {
    if ((heap.i32((0x005f0508 + in_stack_00000018 * 0x16c)) == 0) || (heap.i32((0x005f04fc + in_stack_00000018 * 0x16c)) != 0)) {
      if (heap.u32(__addr_local_34) < heap.u32((0x005f04f4 + in_stack_00000018 * 0x16c))) {
        heap.setU32(__addr_local_30, ((heap.i32((0x005f04f0 + in_stack_00000018 * 0x16c)) + heap.u32(__addr_local_34)) - heap.i32((0x005f04f4 + in_stack_00000018 * 0x16c))) >>> 0);
      } else {
        heap.setU32(__addr_local_30, (heap.u32(__addr_local_34) - heap.i32((0x005f04f4 + in_stack_00000018 * 0x16c))) >>> 0);
      }
      if (heap.u32(__addr_local_8) == 0) {
        heap.setU32(__addr_local_28, (heap.u32(__addr_local_30)) >>> 0);
      } else {
        heap.setU32(__addr_local_28, (((heap.i32((0x005f04f0 + in_stack_00000018 * 0x16c)) * 2) >>> 0) / 6) >>> 0);
      }
      heap.setU32((0x005f04f8 + in_stack_00000018 * 0x16c), (heap.i32((0x005f04f8 + in_stack_00000018 * 0x16c)) + heap.u32(__addr_local_30)) & 0xffffffff);
      if ((heap.i32((0x005f0508 + in_stack_00000018 * 0x16c)) == 0) || (heap.i32((0x005f04fc + in_stack_00000018 * 0x16c)) == 0)) {
        iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((0x005f04ec + in_stack_00000018 * 0x16c))) + 0x2c)), heap.u32((0x005f04ec + in_stack_00000018 * 0x16c)), heap.u32((0x005f04f4 + in_stack_00000018 * 0x16c)), heap.u32(__addr_local_28), __addr_local_3c, __addr_local_10, __addr_local_2c, __addr_local_38, 0))) >>> 0);
        if (iVar1 == 0) {
          if ((heap.u32(__addr_local_10) == 0) || (heap.i32((0x005f0500 + in_stack_00000018 * 0x16c)) != 0)) {
            if ((heap.u32(__addr_local_10) != 0) && (heap.i32((0x005f0500 + in_stack_00000018 * 0x16c)) != 0)) {
              _memset(heap, heap.u32(__addr_local_3c), -((heap.i16((heap.i32((0x005f04bc + in_stack_00000018 * 0x16c)) + 0xe)) == 8) >>> 0) & 0x80, heap.u32(__addr_local_10));
            }
          } else {
            heap.setU32(__addr_local_24, ((regs.eax = FUN_004122a3(heap, heap.u32((0x005f04c0 + in_stack_00000018 * 0x16c)), heap.u32(__addr_local_10), heap.u32(__addr_local_3c), in_stack_00000018 * 0x16c + 0x5f04c4, __addr_local_14))) >>> 0);
            if (heap.u32(__addr_local_14) < heap.u32(__addr_local_10)) {
              if (heap.i32((0x005f0504 + in_stack_00000018 * 0x16c)) == 0) {
                if (heap.i16((heap.i32((0x005f04bc + in_stack_00000018 * 0x16c)) + 0xe)) == 8) {
                  _memset(heap, (heap.u32(__addr_local_14) + ((heap.u32(__addr_local_3c)) >>> 0)), 0x80, heap.u32(__addr_local_10) - heap.u32(__addr_local_14));
                } else {
                  if (heap.i16((heap.i32((0x005f04bc + in_stack_00000018 * 0x16c)) + 0xe)) == 0x10) {
                  _memset(heap, (heap.u32(__addr_local_14) + ((heap.u32(__addr_local_3c)) >>> 0)), 0, heap.u32(__addr_local_10) - heap.u32(__addr_local_14));
                }
                }
                heap.setU32((0x005f0508 + in_stack_00000018 * 0x16c), (1) & 0xffffffff);
                if (heap.u32((0x005f04f4 + in_stack_00000018 * 0x16c)) < heap.u32(__addr_local_34)) {
                  heap.setU32((0x005f04fc + in_stack_00000018 * 0x16c), ((heap.i32((0x005f04f0 + in_stack_00000018 * 0x16c)) + heap.i32((0x005f04f4 + in_stack_00000018 * 0x16c))) - heap.u32(__addr_local_34)) & 0xffffffff);
                } else {
                  heap.setU32((0x005f04fc + in_stack_00000018 * 0x16c), (heap.i32((0x005f04f4 + in_stack_00000018 * 0x16c)) - heap.u32(__addr_local_34)) & 0xffffffff);
                }
              } else {
                heap.setU32(__addr_local_c, (heap.u32(__addr_local_3c)) >>> 0);
                local_40 = ((heap.u32(__addr_local_10)) >>> 0);
                do {
                  heap.setU32(__addr_local_c, ((((heap.u32(__addr_local_c)) >>> 0) + heap.u32(__addr_local_14))) >>> 0);
                  local_40 = ((local_40 - heap.u32(__addr_local_14)) >>> 0);
                  (regs.eax = FUN_0040c93f(heap, in_stack_00000018));
                  heap.setU32(__addr_local_24, ((regs.eax = FUN_004122a3(heap, heap.u32((0x005f04c0 + in_stack_00000018 * 0x16c)), local_40, heap.u32(__addr_local_c), in_stack_00000018 * 0x16c + 0x5f04c4, __addr_local_14))) >>> 0);
                } while (heap.u32(__addr_local_14) < local_40);
              }
            }
          }
          if ((heap.u32(__addr_local_38) == 0) || (heap.i32((0x005f0500 + in_stack_00000018 * 0x16c)) != 0)) {
            if ((heap.u32(__addr_local_2c) != 0x0) && ((heap.u32(__addr_local_38) != 0 && (heap.i32((0x005f0500 + in_stack_00000018 * 0x16c)) != 0)))) {
              _memset(heap, heap.u32(__addr_local_2c), -((heap.i16((heap.i32((0x005f04bc + in_stack_00000018 * 0x16c)) + 0xe)) == 8) >>> 0) & 0x80, heap.u32(__addr_local_38));
            }
          } else {
            heap.setU32(__addr_local_24, ((regs.eax = FUN_004122a3(heap, heap.u32((0x005f04c0 + in_stack_00000018 * 0x16c)), heap.u32(__addr_local_38), heap.u32(__addr_local_2c), in_stack_00000018 * 0x16c + 0x5f04c4, __addr_local_14))) >>> 0);
            if (heap.u32(__addr_local_14) < heap.u32(__addr_local_38)) {
              if (heap.i32((0x005f0504 + in_stack_00000018 * 0x16c)) == 0) {
                if (heap.i16((heap.i32((0x005f04bc + in_stack_00000018 * 0x16c)) + 0xe)) == 8) {
                  _memset(heap, (heap.u32(__addr_local_14) + ((heap.u32(__addr_local_2c)) >>> 0)), 0x80, heap.u32(__addr_local_38) - heap.u32(__addr_local_14));
                } else {
                  if (heap.i16((heap.i32((0x005f04bc + in_stack_00000018 * 0x16c)) + 0xe)) == 0x10) {
                  _memset(heap, (heap.u32(__addr_local_14) + ((heap.u32(__addr_local_2c)) >>> 0)), 0, heap.u32(__addr_local_38) - heap.u32(__addr_local_14));
                }
                }
                heap.setU32((0x005f0508 + in_stack_00000018 * 0x16c), (1) & 0xffffffff);
                if (heap.u32((0x005f04f4 + in_stack_00000018 * 0x16c)) < heap.u32(__addr_local_34)) {
                  heap.setU32((0x005f04fc + in_stack_00000018 * 0x16c), ((heap.i32((0x005f04f0 + in_stack_00000018 * 0x16c)) + heap.i32((0x005f04f4 + in_stack_00000018 * 0x16c))) - heap.u32(__addr_local_34)) & 0xffffffff);
                } else {
                  heap.setU32((0x005f04fc + in_stack_00000018 * 0x16c), (heap.i32((0x005f04f4 + in_stack_00000018 * 0x16c)) - heap.u32(__addr_local_34)) & 0xffffffff);
                }
              } else {
                heap.setU32(__addr_local_c, (heap.u32(__addr_local_2c)) >>> 0);
                local_40 = ((heap.u32(__addr_local_38)) >>> 0);
                do {
                  heap.setU32(__addr_local_c, ((((heap.u32(__addr_local_c)) >>> 0) + heap.u32(__addr_local_14))) >>> 0);
                  local_40 = ((local_40 - heap.u32(__addr_local_14)) >>> 0);
                  (regs.eax = FUN_0040c93f(heap, in_stack_00000018));
                  heap.setU32(__addr_local_24, ((regs.eax = FUN_004122a3(heap, heap.u32((0x005f04c0 + in_stack_00000018 * 0x16c)), local_40, heap.u32(__addr_local_c), in_stack_00000018 * 0x16c + 0x5f04c4, __addr_local_14))) >>> 0);
                } while (heap.u32(__addr_local_14) < local_40);
              }
            }
          }
          (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((0x005f04ec + in_stack_00000018 * 0x16c))) + 0x4c)), heap.u32((0x005f04ec + in_stack_00000018 * 0x16c)), heap.u32(__addr_local_3c), heap.u32(__addr_local_10), heap.u32(__addr_local_2c), heap.u32(__addr_local_38)));
          heap.setU32((0x005f04f4 + in_stack_00000018 * 0x16c), (heap.i32((0x005f04f4 + in_stack_00000018 * 0x16c)) + heap.u32(__addr_local_28)) & 0xffffffff);
          if (heap.u32((0x005f04f0 + in_stack_00000018 * 0x16c)) <= heap.u32((0x005f04f4 + in_stack_00000018 * 0x16c))) {
            heap.setI32((0x005f04f4 + in_stack_00000018 * 0x16c), (heap.i32((0x005f04f4 + in_stack_00000018 * 0x16c)) - heap.i32((0x005f04f0 + in_stack_00000018 * 0x16c))) & 0xffffffff);
          }
          if (heap.u32(__addr_local_8) != 0) {
            (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((0x005f04ec + in_stack_00000018 * 0x16c))) + 0x30)), heap.u32((0x005f04ec + in_stack_00000018 * 0x16c)), 0, 0, 1));
          }
        } else {
          OutputDebugStringA(heap, 0x005ec024);
        }
      } else {
        if (heap.u32((0x005f04fc + in_stack_00000018 * 0x16c)) < heap.u32(__addr_local_30)) {
          heap.setU32((0x005f04fc + in_stack_00000018 * 0x16c), (0) & 0xffffffff);
        } else {
          heap.setU32((0x005f04fc + in_stack_00000018 * 0x16c), (heap.i32((0x005f04fc + in_stack_00000018 * 0x16c)) - heap.u32(__addr_local_30)) & 0xffffffff);
        }
        iVar1 = (((regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((0x005f04ec + in_stack_00000018 * 0x16c))) + 0x2c)), heap.u32((0x005f04ec + in_stack_00000018 * 0x16c)), heap.u32((0x005f04f4 + in_stack_00000018 * 0x16c)), heap.u32(__addr_local_28), __addr_local_3c, __addr_local_10, __addr_local_2c, __addr_local_38, 0))) >>> 0);
        if (iVar1 == 0) {
          _memset(heap, heap.u32(__addr_local_3c), -((heap.i16((heap.i32((0x005f04bc + in_stack_00000018 * 0x16c)) + 0xe)) == 8) >>> 0) & 0x80, heap.u32(__addr_local_10));
          if ((heap.u32(__addr_local_2c) != 0x0) && (heap.u32(__addr_local_38) != 0)) {
            _memset(heap, heap.u32(__addr_local_2c), -((heap.i16((heap.i32((0x005f04bc + in_stack_00000018 * 0x16c)) + 0xe)) == 8) >>> 0) & 0x80, heap.u32(__addr_local_38));
          }
          (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((0x005f04ec + in_stack_00000018 * 0x16c))) + 0x4c)), heap.u32((0x005f04ec + in_stack_00000018 * 0x16c)), heap.u32(__addr_local_3c), heap.u32(__addr_local_10), heap.u32(__addr_local_2c), heap.u32(__addr_local_38)));
          heap.setU32((0x005f04f4 + in_stack_00000018 * 0x16c), (heap.i32((0x005f04f4 + in_stack_00000018 * 0x16c)) + heap.u32(__addr_local_28)) & 0xffffffff);
          if (heap.u32((0x005f04f0 + in_stack_00000018 * 0x16c)) <= heap.u32((0x005f04f4 + in_stack_00000018 * 0x16c))) {
            heap.setI32((0x005f04f4 + in_stack_00000018 * 0x16c), (heap.i32((0x005f04f4 + in_stack_00000018 * 0x16c)) - heap.i32((0x005f04f0 + in_stack_00000018 * 0x16c))) & 0xffffffff);
          }
        } else {
          OutputDebugStringA(heap, 0x005ebff8);
        }
      }
    } else {
      if ((heap.i32((0x005f0500 + in_stack_00000018 * 0x16c)) == 0) && (heap.setU32((0x005f0500 + in_stack_00000018 * 0x16c), (1) & 0xffffffff), heap.i32((0x005f03a4 + in_stack_00000018 * 0x16c)) == 0)) {
      heap.setU32((0x005f03a0 + in_stack_00000018 * 0x16c), (0) & 0xffffffff);
      if (heap.i32((0x005ebfe8 + in_stack_00000018 * 4)) != 0) {
        (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((0x005ebfe8 + in_stack_00000018 * 4))) + 0x48)), heap.u32((0x005ebfe8 + in_stack_00000018 * 4))));
        (regs.eax = callIndirect(heap, heap.u32((heap.u32(heap.u32((0x005ebfe8 + in_stack_00000018 * 4))) + 8)), heap.u32((0x005ebfe8 + in_stack_00000018 * 4))));
        heap.setU32((0x005ebfe8 + in_stack_00000018 * 4), (0) & 0xffffffff);
      }
      if (heap.i32((0x005f04c0 + in_stack_00000018 * 0x16c)) != 0) {
        (regs.eax = FUN_004123ff(heap, 0x005f04c0 + in_stack_00000018 * 0x16c, 0x005f04bc + in_stack_00000018 * 0x16c));
      }
    }
    }
  }
  return;
} finally {
    heap.freeFrame(60);
  }
}
