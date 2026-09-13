// @manual — do not regenerate.
import { regs } from "../../runtime/regs.js";
import { state } from "../../runtime/win32/context.js";
import { callNative } from "../../runtime/painter-bridge.js";
import { markDirtyRect } from "./extra_invalidate.js";
import { FUN_005e5bd8 } from "./5e5bd8.js";
import { FUN_005e687d } from "./5e687d.js";

function compare(left, right, width = 16) {
  const mask = width === 8 ? 0xff : 0xffff;
  left &= mask;
  right &= mask;
  const result = (left - right) & mask;
  regs.cf = left < right ? 1 : 0;
  regs.zf = result === 0 ? 1 : 0;
  regs.sf = result >>> (width - 1);
  regs.of = ((left ^ right) & (left ^ result)) >>> (width - 1) & 1;
}

function toolMatches(heap) {
  regs.cf = heap.u32(0x991f30) >>> 3 & 1;
  if (!regs.cf) { regs.cf = 1; return false; }
  compare(heap.u8(0x991f5a), 1, 8);
  if (!regs.zf) { regs.cf = 1; return false; }
  compare(heap.u16(0x991f5c), 9);
  regs.cf = regs.zf ? 0 : 1;
  return regs.zf === 1;
}

function invalidateWindow(heap) {
  const window = regs.esi >>> 0;
  regs.cf = 0; regs.of = 0; regs.zf = window === 0 ? 1 : 0; regs.sf = window >>> 31;
  if (!window) return;
  const left = Math.max(0, heap.i16(window + 0x20));
  const top = Math.max(0, heap.i16(window + 0x22));
  const right = Math.min(heap.i16(0x971ed6), (heap.u16(window + 0x20) + heap.u16(window + 0x24)) << 16 >> 16);
  const bottom = Math.min(heap.i16(0x971ed8), (heap.u16(window + 0x22) + heap.u16(window + 0x26)) << 16 >> 16);
  compare(left, right);
  if (left >= right) return;
  compare(top, bottom);
  if (top >= bottom) return;
  markDirtyRect(heap, left, top, right, bottom);
  regs.cf = 0; regs.zf = 1; regs.sf = 0; regs.of = 0;
}

// 0x5e0cbc `je 0x5e5bd8` is a TAIL JUMP; 0x5e0cd6 and 0x5e0d23 are `call`
// followed immediately by `ret`. Either way 0x5e0cb6 hands its caller the
// callee's EAX and flags, so the three sites share this helper.
//
// These were the last two callNative crossings on the toolbar path. They now
// run the JS ports under the real startup (and in pure-JS mode): the
// interpreter's own 0x5e5bd8 raises two nested dispatch errors when a window
// closes during gameplay, which is what failed the live gates at tick 33.
// The interpreter path is kept for the frozen/oracle configuration, where
// test/runtime/toolbar_5e0cb6.test.js differentials it against the binary.
const JS_LIFECYCLE = new Map([[0x5e5bd8, FUN_005e5bd8], [0x5e687d, FUN_005e687d]]);

// The window pool: 11 slots of 0x178 from 0x9a013c, with the live end in
// 0x9a1164. 0x5e5bd8 dereferences [ESI+4] as this window's event proc, so ESI
// has to be a slot in it.
const POOL = 0x009a013c;
const POOL_END = 0x009a1164;

function inWindowPool(heap, window) {
  return window >= POOL && window < (heap.u32(POOL_END) >>> 0) && (window - POOL) % 0x178 === 0;
}

function lifecycle(heap, address) {
  if (globalThis.__realStartup || state.executionMode === "pure-js") {
    // 0x5e0cb6 is reached from 0x5e5ff1's event-6 walk, whose translation does
    // not yet supply ESI (see the measurements in ported/auto/5e5ff1.js). ESI
    // is therefore whatever the previous call left — 0x704460 in the playable
    // run — and closing through it reads a garbage event proc (0x10003) and
    // corrupts the pool. The binary cannot reach 0x5e5bd8 with a non-pool ESI,
    // so decline the close instead of acting on one.
    //
    // Remove this guard together with __exactWindowEvents: once 0x5e5ff1
    // passes the real window pointer, the condition is unreachable.
    if (address === 0x5e5bd8 && !inWindowPool(heap, regs.esi >>> 0)) {
      if (globalThis.__staleWindowCloses) globalThis.__staleWindowCloses.push(regs.esi >>> 0);
      return;
    }
    const implementation = JS_LIFECYCLE.get(address);
    if (implementation) { regs.eax = implementation(heap) >>> 0; return; }
  }
  callNative(address, []);
  for (const flag of ["CF", "ZF", "SF", "OF", "DF"]) regs[flag.toLowerCase()] = state.__painterCpu.eflags[flag] | 0;
}

export function FUN_005e0cb6(heap) {
  compare(regs.ebp, 1);
  if (regs.zf) {
    compare(regs.edx, 2);
    if (regs.zf) lifecycle(heap, 0x5e5bd8);
    else {
      compare(regs.edx, 4);
      if (regs.zf) {
        const size = (heap.u16(0x5f54e8) - 1) & 0xffff;
        heap.setU16(0x5f54e8, (size << 16 >> 16) < 1 ? 1 : size);
        invalidateWindow(heap);
      } else {
        compare(regs.edx, 5);
        if (regs.zf) {
          const size = (heap.u16(0x5f54e8) + 1) & 0xffff;
          heap.setU16(0x5f54e8, (size << 16 >> 16) > 5 ? 5 : size);
          invalidateWindow(heap);
        }
      }
    }
  } else {
    compare(regs.ebp, 0);
    if (regs.zf) {
      if (toolMatches(heap)) lifecycle(heap, 0x5e687d);
    } else {
      compare(regs.ebp, 6);
      if (regs.zf && !toolMatches(heap)) lifecycle(heap, 0x5e5bd8);
    }
  }
  return regs.eax >>> 0;
}
