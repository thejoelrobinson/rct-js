// Shared byte-addressable memory backing both ported JS and the x86 interpreter.
//
// Ported functions translated from Ghidra's C decompilation refer to globals by
// virtual address (e.g. DAT_006e3b88 → 0x6e3b88). They access memory through a
// `Heap` instance that wraps a Uint8Array. The interpreter uses the same
// underlying Uint8Array, so ported code and the interpreter share state — which
// is exactly what `tools/diff-test.js` needs for differential testing.
//
// Usage:
//   import { Heap } from "../runtime/heap.js";
//   const heap = new Heap(memory);  // memory is a Uint8Array
//   heap.u32(0x6e3b88);             // read uint32 at virtual address 0x6e3b88
//   heap.setU32(0x6e3b88, value);   // write uint32

export class Heap {
  /**
   * @param {Uint8Array} memory
   * @param {number} [stackTop] absolute address where the stack starts (grows down).
   *                           Defaults to the end of `memory`.
   */
  constructor(memory, stackTop) {
    this.bytes = memory;
    // DataView gives us little-endian unaligned reads/writes that match x86.
    this.view = new DataView(memory.buffer, memory.byteOffset, memory.byteLength);
    // Stack — used by ported functions to allocate frames for address-taken
    // locals so callees can read/write them through the shared heap.
    // Default: grow down from the end of the buffer.
    this.sp = stackTop !== undefined ? stackTop : memory.byteLength;
  }

  // Reads — all little-endian, unaligned-safe.
  u8 (a) { return this.view.getUint8(a); }
  i8 (a) { return this.view.getInt8(a); }
  u16(a) { return this.view.getUint16(a, true); }
  i16(a) { return this.view.getInt16(a, true); }
  u32(a) { return this.view.getUint32(a, true); }
  i32(a) { return this.view.getInt32(a, true); }

  // Writes.
  setU8 (a, v) { this.view.setUint8 (a, v & 0xff); }
  setI8 (a, v) { this.view.setInt8  (a, v & 0xff); }
  setU16(a, v) { this.view.setUint16(a, v & 0xffff, true); }
  setI16(a, v) { this.view.setInt16 (a, v & 0xffff, true); }
  setU32(a, v) { this.view.setUint32(a, v >>> 0, true); }
  setI32(a, v) { this.view.setInt32 (a, v | 0, true); }

  // Stack frame — allocate `n` bytes (rounded to 4) below the current SP and
  // return the new SP (the address of the lowest byte of the frame). The
  // returned region is zeroed, matching C local-variable semantics.
  // The caller is responsible for matching this with a freeFrame(n) on exit.
  allocFrame(n) {
    n = (n + 3) & ~3;
    this.sp -= n;
    this.bytes.fill(0, this.sp, this.sp + n);
    return this.sp;
  }
  freeFrame(n) {
    n = (n + 3) & ~3;
    this.sp += n;
  }
}
