// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function _strncpy(heap, _Dest, _Source, _Count) {
  let uVar1 = 0;
  let uVar2 = 0;
  let cVar3 = 0;
  let uVar4 = 0;
  if (_Count == 0) {
    return _Dest;
  }
  puVar5 = _Dest;
  if ((_Source & 3) != 0) {
    while (true) {
      uVar4 = heap.u32(_Source);
      _Source = (_Source + 1);
      heap.u32(puVar5) = uVar4;
      puVar5 = (puVar5 + 1);
      _Count = _Count - 1;
      if (_Count == 0) {
        return _Dest;
      }
      if (uVar4 == '\0') {
        break;
      }
      if ((_Source & 3) == 0) {
        uVar4 = _Count >>> 2;
        /* goto joined_r0x004134fe */ throw new Error("goto joined_r0x004134fe not supported");
      }
    }
    do {
      if ((puVar5 & 3) == 0) {
        uVar4 = _Count >>> 2;
        cVar3 = '\0';
        if (uVar4 == 0) {
          /* goto LAB_0041353b */ throw new Error("goto LAB_0041353b not supported");
        }
        /* goto LAB_004135a9 */ throw new Error("goto LAB_004135a9 not supported");
      }
      heap.u32(puVar5) = '\0';
      puVar5 = (puVar5 + 1);
      _Count = _Count - 1;
    } while (_Count != 0);
    return _Dest;
  }
  uVar4 = _Count >>> 2;
  if (uVar4 != 0) {
    do {
      uVar1 = heap.u32(_Source);
      uVar2 = heap.u32(_Source);
      _Source = (_Source + 4);
      if (((uVar1 ^ 0xffffffff ^ uVar1 + 0x7efefeff) & 0x81010100) != 0) {
        if (uVar2 == '\0') {
          heap.u32(puVar5) = 0;
          joined_r0x004135a5: while (true) {
            uVar4 = uVar4 - 1;
            puVar5 = puVar5 + 1;
            if (uVar4 == 0) {
              break;
            }
            LAB_004135a9: heap.u32(puVar5) = 0;
          }
          cVar3 = '\0';
          _Count = _Count & 3;
          if (_Count != 0) {
            /* goto LAB_0041353b */ throw new Error("goto LAB_0041353b not supported");
          }
          return _Dest;
        }
        if ((uVar2 >>> 8) == '\0') {
          heap.u32(puVar5) = uVar2 & 0xff;
          /* goto joined_r0x004135a5 */ throw new Error("goto joined_r0x004135a5 not supported");
        }
        if ((uVar2 & 0xff0000) == 0) {
          heap.u32(puVar5) = uVar2 & 0xffff;
          /* goto joined_r0x004135a5 */ throw new Error("goto joined_r0x004135a5 not supported");
        }
        if ((uVar2 & 0xff000000) == 0) {
          heap.u32(puVar5) = uVar2;
          /* goto joined_r0x004135a5 */ throw new Error("goto joined_r0x004135a5 not supported");
        }
      }
      heap.u32(puVar5) = uVar2;
      puVar5 = puVar5 + 1;
      uVar4 = uVar4 - 1;
      joined_r0x004134fe: 
    } while (uVar4 != 0);
    _Count = _Count & 3;
    if (_Count == 0) {
      return _Dest;
    }
  }
  do {
    cVar3 = heap.u32(_Source);
    _Source = (_Source + 1);
    heap.u32(puVar5) = cVar3;
    puVar5 = (puVar5 + 1);
    if (cVar3 == '\0') {
      while (_Count = _Count - 1, _Count != 0) {
        LAB_0041353b: heap.u32(puVar5) = cVar3;
        puVar5 = (puVar5 + 1);
      }
      return _Dest;
    }
    _Count = _Count - 1;
  } while (_Count != 0);
  return _Dest;
}
