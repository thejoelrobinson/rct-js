// Regression gate: a viewport mouse event must not trigger a runaway.
//
// FUN_005e613e (the cursor-pick "find nearest sprite under the cursor" routine,
// reached only on a viewport mouse event via 4385d8 -> 4270f2 -> 5e38f5 ->
// 5e6078 -> 5e613e) had a u16-as-u32 stride bug (same class as 4533d0): its
// sprite-linked-list walk read the next-index with `heap.u32(0x743b98 +
// i*0x80*4)` (byte offset i*0x200, DOUBLE the 0x100 sprite stride) so the walk
// never reached its 0xffff terminator — a single viewport click/move tick spun
// for minutes. Fixed to `heap.u16(0x743b98 + i*0x80*2)`. This test posts a
// viewport click and asserts the tick completes quickly (was: never returned).

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");

const VFS_FILES = [
  "csg1.dat", "csg1i.dat", "game.cfg", "kanji.dat", "tutorial.dat", "mp.dat",
  "css1.dat", "css2.dat", "css3.dat", "css4.dat", "css5.dat", "css6.dat",
  "css7.dat", "css8.dat", "css9.dat", "css11.dat", "css13.dat", "css14.dat",
  "css15.dat", "css17.dat", "sc21.sc4",
];
const VFS_PLACEHOLDERS = ["css10.dat", "css12.dat", "css16.dat", "tutl.dat"];

function packLParam(x, y) { return (((y & 0xffff) << 16) | (x & 0xffff)) >>> 0; }

describe("viewport click does not trigger the cursor-pick (5e613e) runaway", () => {
  let runtime, state, postWindowMessage;

  beforeAll(async () => {
    globalThis._renderTrace = () => {};
    globalThis._gotoWarn = () => {};
    const origWarn = console.warn;
    console.warn = (...args) => {
      const s = String(args[0] ?? "");
      if (s.startsWith("[painter-bridge]") || s.startsWith("[callIndirect]") ||
          s.startsWith("[harness]") || s.startsWith("[runtime/win32 stub]")) return;
      origWarn(...args);
    };

    const { createRuntime, skipFadeIn } = await import("../../runtime/harness.js");
    state = (await import("../../runtime/win32/context.js")).state;
    postWindowMessage = (await import("../../runtime/win32/user32.js")).postWindowMessage;

    const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
    const vfs = new Map();
    for (const n of VFS_FILES) {
      try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); } catch (_) {}
    }
    for (const n of VFS_PLACEHOLDERS) vfs.set(n.toLowerCase(), new Uint8Array(0));

    runtime = createRuntime({ dataBin, vfs });
    runtime.runInit();
    runtime.runTick();
    skipFadeIn(runtime.heap);
    // Repair the game-cmd jumptable wiped by the first runTick (mirrors
    // native_dispatch.test.js) so the input dispatch runs the real chain.
    const dv = new DataView(dataBin.buffer, dataBin.byteOffset, dataBin.byteLength);
    for (let i = 0; i < 49; i++) {
      runtime.heap.setU32(0x005f49a0 + i * 4, dv.getUint32(0x005f49a0 + i * 4, true));
    }
  }, 120_000);

  it("a runTick after a viewport mouse event completes quickly (no 5e613e spin)", () => {
    // Center of the viewport (rect 0,30,640,416) — a cursor-type-12 hover that
    // reaches 5e6078 -> 5e613e. Pre-fix this tick never returned (minutes).
    const hwnd = state.firstHwnd;
    postWindowMessage(hwnd, 0x0200, 0, packLParam(320, 240)); // WM_MOUSEMOVE
    postWindowMessage(hwnd, 0x0201, 1, packLParam(320, 240)); // WM_LBUTTONDOWN
    postWindowMessage(hwnd, 0x0202, 0, packLParam(320, 240)); // WM_LBUTTONUP
    const t0 = process.hrtime.bigint();
    try { runtime.runTick(); } catch (_) { /* painter-bridge noise is non-fatal */ }
    const ms = Number(process.hrtime.bigint() - t0) / 1e6;
    // Observed ~78ms after the fix; was minutes before. A generous bound that
    // unambiguously separates "fast" from the unterminated-walk runaway.
    expect(ms).toBeLessThan(5000);
  }, 60_000);
});
