// Native dispatch chain end-to-end test (toolbar click → per-tick input
// dispatch → widget handler → state mutation).
//
// Chain (now self-driving end-to-end):
//   WM_LBUTTONDOWN → WndProc 0x403d79 → enqueue in ring buffer
//   per-tick FUN_004385d8 → FUN_004270f2 → FUN_005e38f5 (dequeue loop)
//   → FUN_005e1fdd → FUN_005e2225 → FUN_005e3ace (window hit-test)
//   → slot+4 (toolbar = 0x42a830) → 5e2b52 (CODESEG LMB handler, bridge cpu)
//   → 452fce (bridged via setEipHook to JS port) → widget-action dispatch
//   → 0x426f56 (game-cmd dispatch) → 0x427247 (XOR DAT_0099c169 = pause flag)
//
// Historical blockers (all resolved):
//   1. Boot fade-in counter (DAT_005f8da2): use skipFadeIn() helper.
//   2. 5e13d2 stack overflow: fixed by hand-port preserving register state
//      across recursive calls (commit d59f6ff) + PTR_LAB_005f49a0 wipe fix.
//   3. 5 register side-effect bugs in 4385d8/5e1fdd/5e3ace/5e2225/5e3874:
//      fixed in commit c4cb89f.
//   4. 0x10100xxx OOB in 5e2b52's call to 452fce (synthetic DSound vtable
//      addr unexecutable by bridge cpu): fixed in commit c449072 with a
//      setEipHook routing the call through the JS port.
//
// The final test below asserts pause toggles 0 → 1 after one tick.

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

describe("native dispatch chain (WM_LBUTTONDOWN → toolbar widget action)", () => {
  let runtime, state, dataBin, dispatch;
  // Per-function call counters wrapped into ported/auto/_dispatch.js BEFORE
  // harness import — gives us visibility into the binary's tick path.
  const counts = new Map();

  beforeAll(async () => {
    globalThis._renderTrace = () => {};
    globalThis._gotoWarn = () => {};
    // Suppress painter-bridge spam.
    const origWarn = console.warn;
    console.warn = (...args) => {
      const s = String(args[0] ?? "");
      if (s.startsWith("[painter-bridge]") || s.startsWith("[callIndirect]") ||
          s.startsWith("[harness]") || s.startsWith("[runtime/win32 stub]")) return;
      origWarn(...args);
    };

    const dispMod = await import("../../ported/auto/_dispatch.js");
    dispatch = dispMod.dispatch;

    const watch = [
      0x4385d8, 0x4270f2, 0x5e38f5, 0x5e2225, 0x5e3ace, 0x5e1fdd, 0x5e1f70,
      0x5e1653, 0x42a830, 0x42b076, 0x42b079, 0x426f56, 0x427247,
    ];
    for (const addr of watch) {
      const fn = dispatch.get(addr);
      if (typeof fn !== "function") continue;
      counts.set(addr, 0);
      dispatch.set(addr, function (...args) {
        counts.set(addr, counts.get(addr) + 1);
        return fn.apply(this, args);
      });
    }

    const { createRuntime, skipFadeIn } = await import("../../runtime/harness.js");
    const ctx = await import("../../runtime/win32/context.js");
    state = ctx.state;

    dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));
    const vfs = new Map();
    for (const n of VFS_FILES) {
      try { vfs.set(n.toLowerCase(), readFileSync(resolve(ROOT, "web/assets", n))); }
      catch (_) { /* placeholder */ }
    }
    for (const n of VFS_PLACEHOLDERS) vfs.set(n.toLowerCase(), new Uint8Array(0));

    runtime = createRuntime({ dataBin, vfs });
    runtime.runInit();
    runtime.runTick();
    skipFadeIn(runtime.heap);

    // Re-copy 16 dwords of PTR_LAB_005f49a0 from data.bin to repair the
    // game-cmd jumptable wiped during the first runTick (see
    // .claude/scratch/agent-42a830-findings.md). Without this the indirect
    // call inside 0x426f56 dereferences null.
    const dv = new DataView(dataBin.buffer, dataBin.byteOffset, dataBin.byteLength);
    for (let i = 0; i < 16; i++) {
      const v = dv.getUint32(0x005f49a0 + i * 4, true);
      runtime.heap.setU32(0x005f49a0 + i * 4, v);
    }
  }, 120_000);

  it("toolbar slot exists in the pool with wndProc=0x42afb5 and handler=0x42a830", () => {
    const POOL_START = 0x009a013c;
    const POOL_END_PTR = 0x009a1164;
    const SLOT_STRIDE = 0x178;
    const poolEnd = runtime.heap.u32(POOL_END_PTR);
    let toolbar = 0;
    for (let s = POOL_START; s < poolEnd; s += SLOT_STRIDE) {
      if (runtime.heap.u32(s) === 0x42afb5) { toolbar = s; break; }
    }
    expect(toolbar).toBeGreaterThan(0);
    expect(runtime.heap.u32(toolbar + 4)).toBe(0x42a830);
  });

  it("posting WM_LBUTTONDOWN + one message-pump tick enqueues into the ring buffer (DAT_005f1cc0)", async () => {
    // postWindowMessage only appends to state.messageQueue (the JS-side
    // queue). The binary's ring buffer at DAT_005f1cc0 is populated by
    // WndProc 0x403d79 when runTick's message-pump (FUN_00403c2a) dispatches
    // the JS-side message. So the head only advances after a runTick — even
    // though that runTick blows up in 5e13d2, the message-pump phase runs
    // BEFORE 4385d8 reaches the paint code, so the enqueue lands.
    const { postWindowMessage } = await import("../../runtime/win32/user32.js");
    const headBefore = runtime.heap.u32(0x005e91e4);
    postWindowMessage(state.firstHwnd, 0x0201, 1, packLParam(10, 10));
    // Pump the message via runTick. It will throw later in the paint code,
    // but the message-pump (403c2a) runs FIRST and enqueues the click.
    try { runtime.runTick(); } catch (_) { /* expected: 5e13d2 stack overflow */ }
    const headAfter = runtime.heap.u32(0x005e91e4);
    expect(headAfter).toBe(headBefore + 1);
    // The most-recent entry should have x=10, y=10, type=1 (LMB-down).
    const slot = 0x005f1cc0 + ((headAfter - 1) & 0x3f) * 0xc;
    expect(runtime.heap.i32(slot)).toBe(10);
    expect(runtime.heap.i32(slot + 4)).toBe(10);
    expect(runtime.heap.u32(slot + 8)).toBe(1);
  });

  it("runTick after skipFadeIn no longer throws — 5e13d2 blow-up un-pinned", () => {
    // Was: pinned `Maximum call stack size exceeded` in FUN_005e13d2.
    // The 5e13d2 stack overflow stopped reproducing once two upstream
    // memory-corruption bugs were fixed (see
    // .claude/scratch/agent-ptr5f49a0-findings.md):
    //   - translator stride bug in ported/auto/40179d.js
    //   - dirty-bitmap over-fill bound in runtime/harness.js
    // Both were clobbering DATASEG globals around 0x5f4xxx — including
    // PTR_LAB_005f49a0 (the game-cmd jumptable) — and altering the
    // dispatch path through the paint code such that 5e13d2's
    // register-state recursion ran away.
    //
    // With those fixed runTick completes. The downstream input chain
    // (next test) still does not fire end-to-end, so the click → action
    // chain remains incomplete — but no longer because of 5e13d2.
    let threw = null;
    try { runtime.runTick(); } catch (e) { threw = e; }
    expect(threw).toBeNull();
  });

  it("0x42a830 IS registered and ready (bridge present)", () => {
    expect(state.fnDispatch.has(0x42a830)).toBe(true);
    expect(typeof state.fnDispatch.get(0x42a830)).toBe("function");
  });

  it("LBUTTONDOWN + LBUTTONUP on toolbar pause widget → toggles pause flag (0x0099c169) — full native chain", async () => {
    // Native input dispatch chain end-to-end:
    //   WM_LBUTTONDOWN + UP → 4385d8 → 4270f2 → 5e38f5 → 5e1fdd → 5e2225
    //   → 5e3ace hit-test → 0x42a830 toolbar widget dispatch → 5e2b52
    //   (CODESEG LMB handler) → 452fce (bridged via setEipHook) → widget-
    //   action dispatch → 0x426f56 game-cmd → 0x427247 (XOR DAT_0099c169).
    //
    // Unblocked by commit c449072 (bridge 452fce via JS port) on top of
    // c4cb89f (5 register side-effects in 4385d8/5e1fdd/5e3ace/5e2225/5e3874).
    //
    // Requires BOTH LMB-down and LMB-up: 5e2b52 sets a pressed-state on
    // down; the widget action fires when 5e2b52 sees LMB-up over the same
    // widget. One tick after posting both is enough.
    const { postWindowMessage } = await import("../../runtime/win32/user32.js");
    const pauseBefore = runtime.heap.u8(0x0099c169);
    postWindowMessage(state.firstHwnd, 0x0201, 1, packLParam(10, 10));
    postWindowMessage(state.firstHwnd, 0x0202, 0, packLParam(10, 10));
    try { runtime.runTick(); } catch (_) { /* painter-bridge noise non-fatal */ }
    const pauseAfter = runtime.heap.u8(0x0099c169);
    expect(pauseBefore).toBe(0);
    expect(pauseAfter).toBe(1);
  });
});
