// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/0.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../runtime/heap.js").Heap} Heap */

export function _strrchr(heap, _Str, _Ch) {
  let cVar1 = 0;
  let iVar2 = 0;
  iVar2 = -1;
  do {
    pcVar4 = _Str;
    if (iVar2 == 0) {
      break;
    }
    iVar2 = iVar2 + -1;
    pcVar4 = _Str + 1;
    cVar1 = heap.u32(_Str);
    _Str = pcVar4;
  } while (cVar1 != '\0');
  iVar2 = -(iVar2 + 1);
  pcVar4 = pcVar4 + -1;
  do {
    pcVar3 = pcVar4;
    if (iVar2 == 0) {
      break;
    }
    iVar2 = iVar2 + -1;
    pcVar3 = pcVar4 + -1;
    cVar1 = heap.u32(pcVar4);
    pcVar4 = pcVar3;
  } while (_Ch != cVar1);
  pcVar3 = pcVar3 + 1;
  if (heap.u32(pcVar3) != _Ch) {
    pcVar3 = 0x0;
  }
  return pcVar3;
}
