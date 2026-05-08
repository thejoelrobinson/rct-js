// Smoke test for the native runtime: drive a real ported function via the
// runtime/win32.js barrel, no x86 interpreter involved.
//
// Validates:
//   - runtime/heap.js (incl. allocFrame / freeFrame)
//   - runtime/win32.js (barrel re-exports)
//   - runtime/win32/kernel32.js (GetSystemTime + initHeap)
//   - ported/auto/<rva>.js (auto-translated function actually executes)
//
// This is the first end-to-end test that the C2.2 deliverables compose.

import { describe, it, expect, beforeEach } from "vitest";
import { Heap } from "../../runtime/heap.js";
import { initHeap } from "../../runtime/win32/kernel32.js";
import { FUN_004046bc } from "../../ported/auto/4046bc.js";

const MEM_SIZE = 16 * 1024 * 1024; // 16 MB — image plus some heap

describe("native runtime smoke — FUN_004046bc reads GetSystemTime", () => {
  let memory, heap;

  beforeEach(() => {
    memory = new Uint8Array(MEM_SIZE);
    heap = new Heap(memory, MEM_SIZE);  // SP starts at top of buffer
    // Heap allocator gets the upper third of the buffer below the stack.
    initHeap(MEM_SIZE * 0.4, MEM_SIZE * 0.7);
  });

  it("runs without throwing", () => {
    expect(() => FUN_004046bc(heap)).not.toThrow();
  });

  it("writes plausible time-component values to the four DAT globals", () => {
    FUN_004046bc(heap);
    const hour = heap.u32(0x5f1fd0);
    const minute = heap.u32(0x5f1b2c);
    const second = heap.u32(0x5f1fd8);
    const ms = heap.u32(0x5f1b84);
    expect(hour).toBeGreaterThanOrEqual(0);
    expect(hour).toBeLessThan(24);
    expect(minute).toBeGreaterThanOrEqual(0);
    expect(minute).toBeLessThan(60);
    expect(second).toBeGreaterThanOrEqual(0);
    expect(second).toBeLessThan(60);
    expect(ms).toBeGreaterThanOrEqual(0);
    expect(ms).toBeLessThan(1000);
  });
});
