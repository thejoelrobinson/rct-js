// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4134c0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004134c0(heap, _Dest, _Source, _Count) {
  let uVar1 = 0;
  let uVar2 = 0;
  let cVar3 = 0;
  let uVar4 = 0;
  let puVar5 = 0;
  if (_Count == 0) {
    return _Dest;
  }
  puVar5 = ((_Dest) >>> 0);
  if ((((_Source) >>> 0) & 3) != 0) {
    while (true) {
      uVar4 = ((heap.u32(_Source)) >>> 0);
      _Source = (((((_Source) | 0) + 1)) >>> 0);
      heap.setI8(puVar5, (((uVar4) << 24 >> 24)) & 0xff);
      puVar5 = (((((puVar5) | 0) + 1)) >>> 0);
      _Count = ((_Count - 1) >>> 0);
      if (_Count == 0) {
        return _Dest;
      }
      if (((uVar4) << 24 >> 24) == 0) {
        break;
      }
      if ((((_Source) >>> 0) & 3) == 0) {
        uVar4 = ((_Count >>> 2) >>> 0);
        /* goto joined_r0x004134fe — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004134c0/joined_r0x004134fe"); return 0;
      }
    }
    do {
      if ((((puVar5) >>> 0) & 3) == 0) {
        uVar4 = ((_Count >>> 2) >>> 0);
        cVar3 = ((0) & 0xff);
        if (uVar4 == 0) {
          heap.setI8(puVar5, (cVar3) & 0xff);
          puVar5 = (((((puVar5) | 0) + 1)) >>> 0);
          return _Dest;
        }
        /* goto LAB_004135a9 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004134c0/LAB_004135a9"); return 0;
      }
      heap.setI8(puVar5, (0) & 0xff);
      puVar5 = (((((puVar5) | 0) + 1)) >>> 0);
      _Count = ((_Count - 1) >>> 0);
    } while (_Count != 0);
    return _Dest;
  }
  uVar4 = ((_Count >>> 2) >>> 0);
  if (uVar4 != 0) {
    do {
      uVar1 = ((heap.u32(_Source)) >>> 0);
      uVar2 = ((heap.u32(_Source)) >>> 0);
      _Source = (((((_Source) | 0) + 4)) >>> 0);
      if (((uVar1 ^ 0xffffffff ^ uVar1 + 0x7efefeff) & 0x81010100) != 0) {
        if (((uVar2) << 24 >> 24) == 0) {
          heap.setU32(puVar5, (0) & 0xffffffff);
          joined_r0x004135a5: while (true) {
            uVar4 = ((uVar4 - 1) >>> 0);
            puVar5 = ((puVar5 + ((1) * 4)) >>> 0);
            if (uVar4 == 0) {
              break;
            }
            LAB_004135a9: heap.setU32(puVar5, (0) & 0xffffffff);
          }
          cVar3 = ((0) & 0xff);
          _Count = ((_Count & 3) >>> 0);
          if (_Count != 0) {
            heap.setI8(puVar5, (cVar3) & 0xff);
            puVar5 = (((((puVar5) | 0) + 1)) >>> 0);
            return _Dest;
          }
          return _Dest;
        }
        if ((((uVar2 >>> 8)) << 24 >> 24) == 0) {
          heap.setU32(puVar5, (uVar2 & 0xff) & 0xffffffff);
          /* goto joined_r0x004135a5 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004134c0/joined_r0x004135a5"); return 0;
        }
        if ((uVar2 & 0xff0000) == 0) {
          heap.setU32(puVar5, (uVar2 & 0xffff) & 0xffffffff);
          /* goto joined_r0x004135a5 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004134c0/joined_r0x004135a5"); return 0;
        }
        if ((uVar2 & 0xff000000) == 0) {
          heap.setU32(puVar5, (uVar2) & 0xffffffff);
          /* goto joined_r0x004135a5 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_004134c0/joined_r0x004135a5"); return 0;
        }
      }
      heap.setU32(puVar5, (uVar2) & 0xffffffff);
      puVar5 = ((puVar5 + ((1) * 4)) >>> 0);
      uVar4 = ((uVar4 - 1) >>> 0);
      joined_r0x004134fe: ;
    } while (uVar4 != 0);
    _Count = ((_Count & 3) >>> 0);
    if (_Count == 0) {
      return _Dest;
    }
  }
  do {
    cVar3 = ((((heap.u32(_Source)) << 24 >> 24)) & 0xff);
    _Source = (((((_Source) | 0) + 1)) >>> 0);
    heap.setI8(puVar5, (cVar3) & 0xff);
    puVar5 = (((((puVar5) | 0) + 1)) >>> 0);
    if (cVar3 == 0) {
      while (_Count = ((_Count - 1) >>> 0), _Count != 0) {
        LAB_0041353b: heap.setI8(puVar5, (cVar3) & 0xff);
        puVar5 = (((((puVar5) | 0) + 1)) >>> 0);
      }
      return _Dest;
    }
    _Count = ((_Count - 1) >>> 0);
  } while (_Count != 0);
  return _Dest;
}
