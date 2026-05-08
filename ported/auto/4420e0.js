// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4420e0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

import { FUN_0042dfd1 } from "./42dfd1.js";
import { FUN_0043c60b } from "./43c60b.js";
import { FUN_0043c65e } from "./43c65e.js";
import { FUN_00452fce } from "./452fce.js";
import { FUN_005df40c } from "./5df40c.js";
export function FUN_004420e0(heap) {
  let bVar1 = 0;
  let in_EAX = 0;
  let extraout_ECX = 0;
  let unaff_ESI = 0;
  let uVar2 = 0;
  if (heap.u32((unaff_ESI + 0x2d)) == '\x10') {
    uVar2 = FUN_005df40c(heap);
    if (uVar2 < 0x148) {
      if ((ushort)(uVar2 >>> 0x10) < 0x3334) {
        FUN_00452fce(heap, (uVar2 >>> 0x20), extraout_ECX, 1, uVar2 >>> 0x10);
      }
      if (heap.u32((unaff_ESI + 0xe)) != -0x8000) {
        FUN_0042dfd1(heap);
      }
      heap.u32((unaff_ESI + 0xca)) = heap.u32((unaff_ESI + 0xca)) & 0xfffe;
      heap.u32((unaff_ESI + 0x45)) = heap.u32((unaff_ESI + 0x45)) | 8;
    }
  }
  if ((heap.u32(0x008d7eb6) == '\0') || ((heap.u32((unaff_ESI + 0xca)) >>> 4 & 1) == 0)) {
    if ((heap.u32((unaff_ESI + 0xca)) >>> 8 & 1) == 0) {
      if ((heap.u32((unaff_ESI + 0xca)) >>> 7 & 1) == 0) {
        if ((heap.u32((unaff_ESI + 0xca)) >>> 0xd & 1) == 0) {
          if ((heap.u32((unaff_ESI + 0xca)) >>> 6 & 1) == 0) {
            if ((heap.u32((unaff_ESI + 0xca)) >>> 5 & 1) == 0) {
              if ((heap.u32((unaff_ESI + 0xca)) >>> 9 & 1) == 0) {
                if (heap.u32((unaff_ESI + 0xca)) < 0) {
                  bVar1 = 0x15;
                } else {
                  if ((heap.u32((unaff_ESI + 0xca)) & 1) == 0) {
                  if (heap.u32((unaff_ESI + 0x3c)) < 0xab) {
                    if (heap.u32((unaff_ESI + 0x3c)) < 0x8d) {
                      if ((heap.u32((unaff_ESI + 0x38)) < 0x41) && (heap.u32((unaff_ESI + 0x3a)) < 0x80)) {
                        bVar1 = 0x17;
                      } else {
                        if ((heap.u32((unaff_ESI + 0x38)) < 0x51) && (heap.u32((unaff_ESI + 0x3a)) < 0x80)) {
                        bVar1 = 0x16;
                      } else {
                        if (heap.u32((unaff_ESI + 0x40)) < 0xdd) {
                        bVar1 = 0;
                      } else {
                        bVar1 = 0x1a;
                      }
                      }
                      }
                    } else {
                      bVar1 = 0x18;
                    }
                  } else {
                    bVar1 = 0x19;
                  }
                } else {
                  bVar1 = 0x10;
                }
                }
              } else {
                bVar1 = 0x11;
              }
            } else {
              bVar1 = 0xf;
            }
          } else {
            bVar1 = 0xe;
          }
        } else {
          bVar1 = 0x13;
        }
      } else {
        bVar1 = 0xd;
      }
    } else {
      bVar1 = 0xc;
    }
  } else {
    bVar1 = 0x12;
  }
  if (bVar1 != heap.u32((unaff_ESI + 0x2d))) {
    heap.u32((unaff_ESI + 0x2d)) = bVar1;
    heap.u32((unaff_ESI + 0x70)) = 0;
    heap.u32((unaff_ESI + 0xe0)) = 0;
    if (heap.u32((unaff_ESI + 0x71)) < 0xfe) {
      heap.u32((unaff_ESI + 0x71)) = 0xff;
    }
    heap.u32((unaff_ESI + 200)) = heap.u32((unaff_ESI + 200)) & 0xfffd;
    if ((heap.u32((0x0062d564) + (bVar1) * 4) & 1) != 0) {
      heap.u32((unaff_ESI + 200)) = heap.u32((unaff_ESI + 200)) | 2;
    }
    heap.u32((unaff_ESI + 0x6e)) = 0xff;
    FUN_0043c60b(heap);
    if (heap.u32((unaff_ESI + 0x2b)) == '\b') {
      heap.u32((unaff_ESI + 0x71)) = 0xfe;
      heap.u32((unaff_ESI + 0x6f)) = 7;
      FUN_0043c65e(heap);
    }
  }
  return in_EAX;
}
