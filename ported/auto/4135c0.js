// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/4135c0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_004135c0(heap, _Dst, _Val, _Size) {
  let uVar1 = 0;
  let uVar2 = 0;
  let sVar3 = 0;
  let puVar4 = 0;
  if (_Size == 0) {
    return _Dst;
  }
  uVar1 = ((_Val & 0xff) >>> 0);
  puVar4 = ((_Dst) >>> 0);
  if (3 < _Size) {
    uVar2 = ((-((_Dst) | 0) & 3) >>> 0);
    sVar3 = ((_Size) >>> 0);
    if (uVar2 != 0) {
      sVar3 = ((_Size - uVar2) >>> 0);
      do {
        heap.setU8(puVar4, (((_Val) & 0xff)) & 0xff);
        puVar4 = (((((puVar4) | 0) + 1)) >>> 0);
        uVar2 = ((uVar2 - 1) >>> 0);
      } while (uVar2 != 0);
    }
    uVar1 = ((uVar1 * 0x1010101) >>> 0);
    _Size = ((sVar3 & 3) >>> 0);
    uVar2 = ((sVar3 >>> 2) >>> 0);
    if (uVar2 != 0) {
      for (; uVar2 != 0; uVar2 = (((uVar2 - 1) >>> 0)) >>> 0) {
        heap.setU32(puVar4, (uVar1) & 0xffffffff);
        puVar4 = ((puVar4 + ((1) * 4)) >>> 0);
      }
      if (_Size == 0) {
        return _Dst;
      }
    }
  }
  do {
    heap.setI8(puVar4, (((uVar1) << 24 >> 24)) & 0xff);
    puVar4 = (((((puVar4) | 0) + 1)) >>> 0);
    _Size = ((_Size - 1) >>> 0);
  } while (_Size != 0);
  return _Dst;
}
