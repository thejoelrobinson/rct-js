// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function _strncat(heap, _Dest, _Source, _Count) {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  puVar5 = _Dest;
  if (_Count == 0) {
    return _Dest;
  }
  do {
    if ((puVar5 & 3) == 0) {
      /* goto LAB_0041775a */ throw new Error("goto LAB_0041775a not supported");
    }
    uVar4 = heap.u32(puVar5);
    puVar5 = (puVar5 + 1);
  } while (uVar4 != 0);
  /* goto LAB_0041778b */ throw new Error("goto LAB_0041778b not supported");
  while (true) {
    if ((uVar4 & 0xff0000) == 0) {
      puVar6 = (puVar6 + 2);
      /* goto LAB_0041779b */ throw new Error("goto LAB_0041779b not supported");
    }
    if ((uVar4 & 0xff000000) == 0) {
      break;
    }
    LAB_0041775a: do {
      puVar6 = puVar5;
      puVar5 = puVar6 + 1;
    } while (((heap.u32(puVar6) ^ 0xffffffff ^ heap.u32(puVar6) + 0x7efefeff) & 0x81010100) == 0);
    uVar4 = heap.u32(puVar6);
    if (uVar4 == '\0') {
      /* goto LAB_0041779b */ throw new Error("goto LAB_0041779b not supported");
    }
    if ((uVar4 >>> 8) == '\0') {
      puVar6 = (puVar6 + 1);
      /* goto LAB_0041779b */ throw new Error("goto LAB_0041779b not supported");
    }
  }
  LAB_0041778b: puVar6 = (puVar5 + -1);
  LAB_0041779b: if ((_Source & 3) == 0) {
    uVar3 = _Count >>> 2;
  } else {
    do {
      bVar1 = (byte) * _Source;
      uVar4 = bVar1;
      _Source = (_Source + 1);
      if (bVar1 == 0) {
        /* goto LAB_004177ea */ throw new Error("goto LAB_004177ea not supported");
      }
      heap.u32(puVar6) = bVar1;
      puVar6 = (puVar6 + 1);
      _Count = _Count - 1;
      if (_Count == 0) {
        /* goto LAB_004177e0 */ throw new Error("goto LAB_004177e0 not supported");
      }
    } while ((_Source & 3) != 0);
    uVar3 = _Count >>> 2;
  }
  do {
    if (uVar3 == 0) {
      for (uVar4 = _Count & 3; uVar4 != 0; uVar4 = uVar4 - 1) {
        uVar3 = heap.u32(_Source);
        _Source = (_Source + 1);
        heap.u32(puVar6) = uVar3;
        puVar6 = (puVar6 + 1);
        if (uVar3 == 0) {
          return _Dest;
        }
      }
      LAB_004177e0: heap.u32(puVar6) = 0;
      return _Dest;
    }
    uVar2 = heap.u32(_Source);
    uVar4 = heap.u32(_Source);
    _Source = (_Source + 4);
    if (((uVar2 ^ 0xffffffff ^ uVar2 + 0x7efefeff) & 0x81010100) != 0) {
      if (uVar4 == '\0') {
        LAB_004177ea: heap.u32(puVar6) = uVar4;
        return _Dest;
      }
      if ((uVar4 >>> 8) == '\0') {
        heap.u32(puVar6) = uVar4;
        return _Dest;
      }
      if ((uVar4 & 0xff0000) == 0) {
        heap.u32(puVar6) = uVar4;
        heap.u32((puVar6 + 2)) = 0;
        return _Dest;
      }
      if ((uVar4 & 0xff000000) == 0) {
        heap.u32(puVar6) = uVar4;
        return _Dest;
      }
    }
    heap.u32(puVar6) = uVar4;
    puVar6 = puVar6 + 1;
    uVar3 = uVar3 - 1;
  } while (true);
}
