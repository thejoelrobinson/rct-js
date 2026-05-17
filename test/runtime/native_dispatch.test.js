// Native dispatch chain end-to-end test (toolbar click → per-tick input
// dispatch → widget handler → state mutation).
//
// Expected chain (per .claude/scratch/agent-42a830-findings.md):
//   WM_LBUTTONDOWN → WndProc 0x403d79 → enqueue event in ring buffer
//   per-tick FUN_004385d8 → FUN_004270f2 → FUN_005e38f5 (dequeue loop)
//   → FUN_005e1fdd → FUN_005e2225 → FUN_005e3ace (window hit-test)
//   → slot+4 (toolbar = 0x42a830) → 0x42b083 (per-widget dispatch)
//   → 0x426f56 (game-cmd dispatch) → 0x427247 (XOR DAT_0099c169)
//
// Current state (this test): the chain DOES NOT fire end-to-end via runTick.
// Two distinct blockers exist:
//   1. Without skipFadeIn: 4385d8 short-circuits at fade-counter 0x10..0x5f
//      (line 169 `if (DAT_005f8da2 != 0x60) break LAB_00438a0d`), so neither
//      FUN_004270f2 nor any of the input-chain functions are reached.
//   2. With skipFadeIn (or after the counter naturally reaches 0x60 ~74 ticks
//      in, which fires FUN_0042f3a2 and lands in the post-fade body): the
//      very next tick blows up in FUN_005e13d2 (paint-tree clipper) with
//      "Maximum call stack size exceeded" — the Ghidra-translated recursion
//      doesn't preserve the register-state args (in_AX/DX/BX/BP/ESI) across
//      each recursive call, so the loop never terminates.
//
// This test pins those blockers so progress is detectable. When the chain
// becomes self-driving, replace the `expect(...).toBe(0)` checks below with
// `toBe(1)` for pause/rotate widgets.

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

  it("input chain (FUN_005e2225/5e3ace/5e38f5/4270f2) never fires via runTick today — BLOCKER", () => {
    // Because runTick blows up in 5e13d2 BEFORE reaching the input chain,
    // none of these are called. When the 5e13d2 bug is fixed and the chain
    // becomes self-driving, this test should be flipped to expect >0 for
    // each chain function (4270f2 → 5e38f5 → 5e1fdd → 5e2225 → 5e3ace).
    expect(counts.get(0x4270f2) ?? 0).toBe(0);
    expect(counts.get(0x5e38f5) ?? 0).toBe(0);
    expect(counts.get(0x5e1fdd) ?? 0).toBe(0);
    expect(counts.get(0x5e2225) ?? 0).toBe(0);
    expect(counts.get(0x5e3ace) ?? 0).toBe(0);
    // And the pause flag the chain would XOR remains 0.
    expect(runtime.heap.u8(0x0099c169)).toBe(0);
  });

  // The bridge_42a830 test demonstrates the *handler* works when called
  // directly with the right register state. The remaining gap is just
  // upstream (5e13d2 → 5e1653 → 4270f2 → 5e38f5 → 5e1fdd → 5e2225 → 5e3ace).
  it("0x42a830 IS registered and ready (bridge present) — only the upstream chain is broken", () => {
    expect(state.fnDispatch.has(0x42a830)).toBe(true);
    expect(typeof state.fnDispatch.get(0x42a830)).toBe("function");
  });
});
