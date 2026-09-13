// @manual — do not regenerate.
//
// Source: decompiled/c/408f53.c — DDraw "lock surface, populate wrapper"
// helper. Caller (FUN_004026ec, FUN_00402027, etc.) passes a 168-byte
// wrapper struct whose +0x80 holds the IDirectDrawSurface pointer; this
// fn locks that surface and copies the locked DDSURFACEDESC fields into
// the wrapper's leading slots so the caller can do per-pixel writes.
//
// Why hand-ported: Ghidra typed `param_1` as `int *` so `param_1 + 5`
// in C means byte+20 (= start of the embedded DDSURFACEDESC). Our
// translator emits raw `param_1 + 5` (byte+5) because pointer-arg
// scaling isn't applied to function parameters (only to local
// declarations) — which makes the IDDS_Lock shim fill the desc 15 bytes
// before its real location, leaving the wrapper fields untouched and
// downstream callers stuck in `do { ... } while (uVar4 != 0)` with
// uVar4=0 (underflows to 0xffffffff = infinite loop).

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";
import { FUN_00408d5d } from "./408d5d.js";

const DDERR_SURFACELOST = -0x7789fe3e | 0;

export function FUN_00408f53(heap, param_1) {
  // Wrapper layout (byte offsets, all reads via int-pointer arithmetic in C):
  //   +0x00  lpSurface (filled by us from desc.lpSurface)
  //   +0x04  flags (set to 4 on success)
  //   +0x06  width (lo16 of desc.dwWidth)
  //   +0x08  height (lo16 of desc.dwHeight)
  //   +0x0a  isFlippedFlag (set to 1 on success)
  //   +0x0c  isLocked sentinel (must be 0 on entry, set to 1 on success)
  //   +0x10  pitch (desc.lPitch)
  //   +0x14  start of DDSURFACEDESC (filled by Lock)
  //   +0x80  IDirectDrawSurface pointer (set by 408f00)

  if (heap.i16(param_1 + 12) !== 0) return 0;          // already locked
  const surface = heap.u32(param_1 + 0x80);
  if (surface === 0) return 0;                          // no surface attached

  let result;
  do {
    const lockFn = heap.u32(heap.i32(surface) + 100);   // vtable[0x64] = Lock
    result = (regs.eax = callIndirect(heap, lockFn, surface, 0, param_1 + 0x14, 1, 0)) | 0;
    if (result === DDERR_SURFACELOST) {
      const restored = (regs.eax = FUN_00408d5d(heap)) >>> 0;
      if (restored === 0) break;
    }
  } while (result === DDERR_SURFACELOST);

  if (result !== 0) return 0;

  // Copy desc fields into wrapper. Desc lives at param_1 + 0x14.
  // desc.dwHeight is at +0x08 (= byte +0x1c from param_1)
  // desc.dwWidth  is at +0x0C (= byte +0x20)
  // desc.lPitch   is at +0x10 (= byte +0x24)
  // desc.lpSurface is at +0x24 (= byte +0x38)
  const desc = param_1 + 0x14;
  heap.setU32(param_1 + 0x00, heap.u32(desc + 0x24));   // lpSurface
  heap.setU16(param_1 + 0x04, 4);                       // flags
  heap.setI16(param_1 + 0x06, heap.u32(desc + 0x0C) & 0xffff);  // width
  heap.setI16(param_1 + 0x08, heap.u32(desc + 0x08) & 0xffff);  // height
  heap.setU16(param_1 + 0x0a, 1);                       // isFlipped
  heap.setU32(param_1 + 0x10, heap.u32(desc + 0x10));   // pitch
  heap.setU16(param_1 + 0x0c, 1);                       // isLocked
  return 1;
}
