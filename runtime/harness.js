// runtime/harness.js — native runtime entry point.
//
// Loads the binary's data sections into a Heap (no rct.exe at runtime),
// wires the VFS, populates state.fnDispatch with all 1214 ported
// functions, and calls FUN_00401000(heap) — the binary's WinMain-equivalent.
//
// Used both by the browser (web/main.js → here) and the native-boot
// smoke test (tools/native-boot.js → here).

import { Heap } from "./heap.js";
import { initHeap } from "./win32/kernel32.js";
import { state, setRuntimeContext } from "./win32/context.js";
import { dispatch as portedDispatch } from "../ported/auto/_dispatch.js";

/**
 * @param {object} opts
 * @param {Uint8Array} opts.dataBin    decompiled/data.bin contents (sparse PE image)
 * @param {Map<string, Uint8Array>} [opts.vfs]   filename(lowercase) → bytes
 * @param {object} [opts.canvas]       optional <canvas> element
 * @param {number} [opts.heapBase]     where to start the runtime heap (default: end of dataBin)
 * @param {number} [opts.heapSize]     heap size (default: 64 MB)
 * @returns {{ heap: Heap, run: () => any }}
 */
export function createRuntime(opts) {
  const { dataBin } = opts;
  const heapBase = opts.heapBase ?? dataBin.length;
  const heapSize = opts.heapSize ?? 64 * 1024 * 1024;
  const stackSize = 1 * 1024 * 1024;
  const totalSize = heapBase + heapSize + stackSize;

  // Allocate the full address space at once. Binary's data lives at the
  // bottom (positioned at its virtual addresses), runtime allocator above,
  // stack at the top (grows down).
  const memory = new Uint8Array(totalSize);
  memory.set(dataBin, 0);

  const heap = new Heap(memory, totalSize);
  initHeap(heapBase, heapBase + heapSize);

  // Populate the dispatch map for DispatchMessageA / SendMessageA.
  state.fnDispatch.clear();
  for (const [addr, fn] of portedDispatch) state.fnDispatch.set(addr, fn);

  // Wire browser-side resources (or stubs in node).
  setRuntimeContext({
    vfs: opts.vfs || new Map(),
    canvas: opts.canvas || null,
  });

  return {
    heap,
    run() {
      const entry = portedDispatch.get(0x401000);
      if (!entry) throw new Error("FUN_00401000 not in dispatch table");
      return entry(heap);
    },
  };
}
