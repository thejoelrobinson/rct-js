// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/417730.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

export function FUN_00417730(heap, _Dest, _Source, _Count) {
  let bVar1 = 0;
  let uVar2 = 0;
  let uVar3 = 0;
  let uVar4 = 0;
  let puVar5 = 0;
  let puVar6 = 0;
  LAB_0041779b: {
  LAB_0041778b: {
  puVar5 = ((_Dest) >>> 0);
  if (_Count == 0) {
    return _Dest;
  }
  do {
    if ((((puVar5) >>> 0) & 3) == 0) {
      /* goto LAB_0041775a — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00417730/LAB_0041775a"); return 0;
    }
    uVar4 = ((heap.u32(puVar5)) >>> 0);
    puVar5 = (((((puVar5) >>> 0) + 1)) >>> 0);
  } while (((uVar4) & 0xff) != 0);
  break LAB_0041778b;
  while (true) {
    if ((uVar4 & 0xff0000) == 0) {
      puVar6 = (((((puVar6) >>> 0) + 2)) >>> 0);
      break LAB_0041779b;
    }
    if ((uVar4 & 0xff000000) == 0) {
      break;
    }
    LAB_0041775a: do {
      puVar6 = ((puVar5) >>> 0);
      puVar5 = ((puVar6 + ((1) * 4)) >>> 0);
    } while (((heap.u32(puVar6) ^ 0xffffffff ^ heap.u32(puVar6) + 0x7efefeff) & 0x81010100) == 0);
    uVar4 = ((heap.u32(puVar6)) >>> 0);
    if (((uVar4) << 24 >> 24) == 0) {
      break LAB_0041779b;
    }
    if ((((uVar4 >>> 8)) << 24 >> 24) == 0) {
      puVar6 = (((((puVar6) >>> 0) + 1)) >>> 0);
      break LAB_0041779b;
    }
  }
  }
  puVar6 = (((((puVar5) >>> 0) + -1)) >>> 0);
  }
  if ((((_Source) >>> 0) & 3) == 0) {
    uVar3 = ((_Count >>> 2) >>> 0);
  } else {
    do {
      bVar1 = ((heap.u8(_Source)) & 0xff);
      uVar4 = ((((bVar1) >>> 0)) >>> 0);
      _Source = (((((_Source) >>> 0) + 1)) >>> 0);
      if (bVar1 == 0) {
        /* goto LAB_004177ea — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00417730/LAB_004177ea"); return 0;
      }
      heap.setU8(puVar6, (bVar1) & 0xff);
      puVar6 = (((((puVar6) >>> 0) + 1)) >>> 0);
      _Count = ((_Count - 1) >>> 0);
      if (_Count == 0) {
        /* goto LAB_004177e0 — unsupported, early-return */ if (typeof globalThis._gotoWarn !== 'undefined') globalThis._gotoWarn("FUN_00417730/LAB_004177e0"); return 0;
      }
    } while ((((_Source) >>> 0) & 3) != 0);
    uVar3 = ((_Count >>> 2) >>> 0);
  }
  do {
    if (uVar3 == 0) {
      for (uVar4 = ((_Count & 3) >>> 0); uVar4 != 0; uVar4 = (((uVar4 - 1) >>> 0)) >>> 0) {
        uVar3 = ((heap.u32(_Source)) >>> 0);
        _Source = (((((_Source) >>> 0) + 1)) >>> 0);
        heap.setU8(puVar6, (((uVar3) & 0xff)) & 0xff);
        puVar6 = (((((puVar6) >>> 0) + 1)) >>> 0);
        if (((uVar3) & 0xff) == 0) {
          return _Dest;
        }
      }
      LAB_004177e0: heap.setU8(puVar6, (0) & 0xff);
      return _Dest;
    }
    uVar2 = ((heap.u32(_Source)) >>> 0);
    uVar4 = ((heap.u32(_Source)) >>> 0);
    _Source = (((((_Source) >>> 0) + 4)) >>> 0);
    if (((uVar2 ^ 0xffffffff ^ uVar2 + 0x7efefeff) & 0x81010100) != 0) {
      if (((uVar4) << 24 >> 24) == 0) {
        LAB_004177ea: heap.setU8(puVar6, (((uVar4) & 0xff)) & 0xff);
        return _Dest;
      }
      if ((((uVar4 >>> 8)) << 24 >> 24) == 0) {
        heap.setI16(puVar6, (((uVar4) << 16 >> 16)) & 0xffff);
        return _Dest;
      }
      if ((uVar4 & 0xff0000) == 0) {
        heap.setI16(puVar6, (((uVar4) << 16 >> 16)) & 0xffff);
        heap.setU8((((puVar6) >>> 0) + 2), (0) & 0xff);
        return _Dest;
      }
      if ((uVar4 & 0xff000000) == 0) {
        heap.setU32(puVar6, (uVar4) & 0xffffffff);
        return _Dest;
      }
    }
    heap.setU32(puVar6, (uVar4) & 0xffffffff);
    puVar6 = ((puVar6 + ((1) * 4)) >>> 0);
    uVar3 = ((uVar3 - 1) >>> 0);
  } while (true);
}
