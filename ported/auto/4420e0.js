// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4420e0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_0042dfd1 } from "./42dfd1.js";
import { FUN_0043c60b } from "./43c60b.js";
import { FUN_0043c65e } from "./43c65e.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_004420e0(heap) {
  let bVar1 = 0;
  let in_EAX = regs.eax >>> 0;
  let extraout_ECX = 0;
  let unaff_ESI = regs.esi >>> 0;
  let uVar2 = 0;
  if (heap.i8((unaff_ESI + 0x2d)) == 16) {
    uVar2 = (((regs.eax = FUN_005df40c(heap))) >>> 0);
    if (((uVar2) & 0xffff) < 0x148) {
      if (((((uVar2) >>> 0) >>> 0x10) & 0xffff) < 0x3334) {
        (regs.eax = FUN_00452fce(heap, (((((uVar2) >>> 0) >>> 0x20)) >>> 0), extraout_ECX, 1, ((uVar2) >>> 0) >>> 0x10));
      }
      if (heap.i16((unaff_ESI + 0xe)) != -0x8000) {
        (regs.eax = FUN_0042dfd1(heap));
      }
      heap.setU16((unaff_ESI + 0xca), (heap.u16((unaff_ESI + 0xca)) & 0xfffe) & 0xffff);
      heap.setU8((unaff_ESI + 0x45), (heap.u8((unaff_ESI + 0x45)) | 8) & 0xff);
    }
  }
  if ((heap.u8(0x008d7eb6) == 0) || ((heap.u16((unaff_ESI + 0xca)) >>> 4 & 1) == 0)) {
    if ((heap.u16((unaff_ESI + 0xca)) >>> 8 & 1) == 0) {
      if ((heap.u16((unaff_ESI + 0xca)) >>> 7 & 1) == 0) {
        if ((heap.u16((unaff_ESI + 0xca)) >>> 0xd & 1) == 0) {
          if ((heap.u16((unaff_ESI + 0xca)) >>> 6 & 1) == 0) {
            if ((heap.u16((unaff_ESI + 0xca)) >>> 5 & 1) == 0) {
              if ((heap.u16((unaff_ESI + 0xca)) >>> 9 & 1) == 0) {
                if (heap.i16((unaff_ESI + 0xca)) < 0) {
                  bVar1 = ((0x15) & 0xff);
                } else {
                  if ((heap.u16((unaff_ESI + 0xca)) & 1) == 0) {
                  if (heap.u8((unaff_ESI + 0x3c)) < 0xab) {
                    if (heap.u8((unaff_ESI + 0x3c)) < 0x8d) {
                      if ((heap.u8((unaff_ESI + 0x38)) < 0x41) && (heap.u8((unaff_ESI + 0x3a)) < 0x80)) {
                        bVar1 = ((0x17) & 0xff);
                      } else {
                        if ((heap.u8((unaff_ESI + 0x38)) < 0x51) && (heap.u8((unaff_ESI + 0x3a)) < 0x80)) {
                        bVar1 = ((0x16) & 0xff);
                      } else {
                        if (heap.u8((unaff_ESI + 0x40)) < 0xdd) {
                        bVar1 = ((0) & 0xff);
                      } else {
                        bVar1 = ((0x1a) & 0xff);
                      }
                      }
                      }
                    } else {
                      bVar1 = ((0x18) & 0xff);
                    }
                  } else {
                    bVar1 = ((0x19) & 0xff);
                  }
                } else {
                  bVar1 = ((0x10) & 0xff);
                }
                }
              } else {
                bVar1 = ((0x11) & 0xff);
              }
            } else {
              bVar1 = ((0xf) & 0xff);
            }
          } else {
            bVar1 = ((0xe) & 0xff);
          }
        } else {
          bVar1 = ((0x13) & 0xff);
        }
      } else {
        bVar1 = ((0xd) & 0xff);
      }
    } else {
      bVar1 = ((0xc) & 0xff);
    }
  } else {
    bVar1 = ((0x12) & 0xff);
  }
  if (bVar1 != heap.u8((unaff_ESI + 0x2d))) {
    heap.setU8((unaff_ESI + 0x2d), (bVar1) & 0xff);
    heap.setU8((unaff_ESI + 0x70), (0) & 0xff);
    heap.setU8((unaff_ESI + 0xe0), (0) & 0xff);
    if (heap.u8((unaff_ESI + 0x71)) < 0xfe) {
      heap.setU8((unaff_ESI + 0x71), (0xff) & 0xff);
    }
    heap.setU16((unaff_ESI + 200), (heap.u16((unaff_ESI + 200)) & 0xfffd) & 0xffff);
    if ((heap.u32((0x0062d564) + (bVar1) * 4) & 1) != 0) {
      heap.setU16((unaff_ESI + 200), (heap.u16((unaff_ESI + 200)) | 2) & 0xffff);
    }
    heap.setU8((unaff_ESI + 0x6e), (0xff) & 0xff);
    (regs.eax = FUN_0043c60b(heap));
    if (heap.i8((unaff_ESI + 0x2b)) == 8) {
      heap.setU8((unaff_ESI + 0x71), (0xfe) & 0xff);
      heap.setU8((unaff_ESI + 0x6f), (7) & 0xff);
      (regs.eax = FUN_0043c65e(heap));
    }
  }
  return in_EAX;
}
