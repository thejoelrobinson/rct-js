// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/413800.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00413800(heap, _Str, _Ch) {
  let cVar1 = 0;
  let iVar2 = 0;
  let pcVar3 = 0;
  let pcVar4 = 0;
  iVar2 = ((-1) >>> 0);
  do {
    pcVar4 = ((_Str) >>> 0);
    if (iVar2 == 0) {
      break;
    }
    iVar2 = ((iVar2 + -1) >>> 0);
    pcVar4 = ((_Str + 1) >>> 0);
    cVar1 = ((heap.u32(_Str)) & 0xff);
    _Str = ((pcVar4) >>> 0);
  } while (cVar1 != 0);
  iVar2 = ((-(iVar2 + 1)) >>> 0);
  pcVar4 = ((pcVar4 + -1) >>> 0);
  do {
    pcVar3 = ((pcVar4) >>> 0);
    if (iVar2 == 0) {
      break;
    }
    iVar2 = ((iVar2 + -1) >>> 0);
    pcVar3 = ((pcVar4 + -1) >>> 0);
    cVar1 = ((heap.i8(pcVar4)) & 0xff);
    pcVar4 = ((pcVar3) >>> 0);
  } while (((_Ch) << 24 >> 24) != cVar1);
  pcVar3 = ((pcVar3 + 1) >>> 0);
  if (heap.i8(pcVar3) != ((_Ch) << 24 >> 24)) {
    pcVar3 = ((0x0) >>> 0);
  }
  return pcVar3;
}
