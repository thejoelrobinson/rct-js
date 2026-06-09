// Live browser-path viewport LAND-drag gate (Track C finale).
//
// Unlike viewport_build.test.js (which drives the cursor-pick FUN_00431510 and
// the game command FUN_00426f56 DIRECTLY via the bridge cpu), this test drives
// the FULL live browser input path that web/main-native.js uses every frame:
//
//   postWindowMessage(WM_LBUTTONDOWN)            (the browser's input event)
//     -> runTick() -> message pump FUN_00403c2a  (PeekMessage/DispatchMessage)
//       -> binary WindowProc FUN_00403d79        (WM_LBUTTONDOWN 0x201)
//         -> FUN_00403454 enqueue                (internal ring at 0x5f1cc0)
//   next runTick() -> FUN_004385d8 -> FUN_004270f2 -> FUN_005e38f5
//     -> FUN_005e1fdd dequeue the ring event     (cursor x in EAX, y in EBX)
//       -> FUN_005e2225 dispatch / 5e6078 hover-pick / 5e6044 tool-update
//
// WHAT THIS GATES (the parts that are genuinely reachable in the scenario-play
// harness state):
//
//  1. The live message path is wired end to end: a posted WM_LBUTTONDOWN over
//     the viewport reaches the binary WindowProc, lands in the internal input
//     ring, and the NEXT tick's FUN_005e38f5 consumes it and engages the land
//     drag mode (DAT_00991f36: 1 -> 6). This is the live "mouse down on the map
//     starts a land drag" transition.
//
//  2. The live cursor X propagates to the hover-pick (the FUN_005e38f5 register
//     fix). The binary keeps the clamped cursor x in EAX and y in EBX live
//     across the 5e2225/5e6078 calls (disasm 0x5e39a4-0x5e39b6: push eax; push
//     ebx; call ...; pop ebx; pop eax). The Ghidra C lowered these register
//     args as ignored positional params, and 5e2225 clobbered regs.eax, so the
//     live cursor-pick previously resolved at (0, y) — off the map. After the
//     fix the cursor cache propagates the true x. Oracle-checked: the binary's
//     own 5e38f5 passes EAX=cursorX to 5e6078 (see project memory probe).
//
//  3. The land AREA command (cmd 0x13, handler 0x424ab0 — the corner-edge land
//     tool the live drag issues from the land-tool callback 0x42aeb7) mutates
//     the world surface bytes for the drag rect. The JS port FUN_00424ab0 is
//     byte-for-byte oracle-equal to the binary interpreter for the same
//     rect+op (see /tmp/cmd13-issue oracle probe, ORACLE MATCH). cmd 0x13
//     writes the per-corner STYLE bits (surface byte+4 / byte+5), not the base
//     height (byte+3) — base height is the cmd-1 single-tile op.
//
// NOT GATED (documented terminal blocker): the per-tick land-tool callback
// that RESOLVES the picked tile into the 0x99a020 rect globals (0x42aa65 /
// 0x42aeb7) lives in the in-game land WINDOW, which the sc21.sc4 title-demo
// (the only scenario the harness loads) never instantiates — there is no
// in-game land toolbar in this state. So a live drag engages the drag mode but
// the rect never auto-populates from the live pick. We therefore seed the rect
// from the proven cursor-pick tile and assert the cmd-0x13 world write via its
// live issuing register contract.

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

describe("live viewport LAND drag (full browser input path)", () => {
  let heap, cpu, regs, runFunction, state, postWindowMessage, runtime;

  beforeAll(async () => {
    globalThis._renderTrace = () => {};
    globalThis._gotoWarn = () => {};
    let _t = 1; const realNow = Date.now; globalThis.__realNow = realNow;
    Date.now = () => (_t += 16); // monotonic clock for deterministic ticks
    const origWarn = console.warn;
    console.warn = (...args) => {
      const s = String(args[0] ?? "");
      if (s.startsWith("[painter-bridge]") || s.startsWith("[callIndirect]") ||
          s.startsWith("[harness]") || s.startsWith("[runtime/win32")) return;
      origWarn(...args);
    };

    const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../../runtime/harness.js");
    state = (await import("../../runtime/win32/context.js")).state;
    regs = (await import("../../runtime/regs.js")).regs;
    runFunction = (await import("../../harness/x86.js")).runFunction;
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
    enterScenarioPlay(runtime.heap);
    const dv = new DataView(dataBin.buffer, dataBin.byteOffset, dataBin.byteLength);
    for (let i = 0; i < 49; i++) {
      runtime.heap.setU32(0x005f49a0 + i * 4, dv.getUint32(0x005f49a0 + i * 4, true));
    }
    runtime.heap.setU8(0x005f4a6a, 1);
    runtime.heap.setU8(0x0099c169, 0);
    heap = runtime.heap;
    cpu = state.__painterCpu;
    if (!state.inputState) state.inputState = { cursorX: 0, cursorY: 0, mouseButtons: 0, keysDown: [] };
  }, 120_000);

  function surfaceElem(tx, ty) {
    const head = heap.u32(0x00971ef4 + (tx + ty * 128) * 4);
    if (head < 0x6e3b90 || head > 0x8dc08c) return 0;
    let p = head;
    while ((heap.u8(p + 1) & 0x80) === 0 && (heap.u8(p) & 0x3c) !== 0) p += 8;
    return (heap.u8(p) & 0x3c) === 0 ? p : 0;
  }

  it("a posted WM_LBUTTONDOWN over the viewport reaches the binary WindowProc, the internal ring, and engages the live land drag (mode 1->6)", () => {
    // Screen-rel viewport pick (196,92); the viewport sits at screenY=30, so the
    // absolute window cursor is (196,122).
    const SX = 196, SY = 122;
    const hwnd = state.firstHwnd;

    // Settle the cursor cache with a couple of WM_MOUSEMOVEs (the binary caches
    // the move position; the no-event 5e1fdd path reads it for the hover-pick).
    for (let i = 0; i < 2; i++) {
      state.inputState.cursorX = SX; state.inputState.cursorY = SY;
      postWindowMessage(hwnd, 0x0200, 0, packLParam(SX, SY));
      runtime.runTick();
    }
    // The cursor cache (0x99fdf4 / 0x99fdf8) now carries the TRUE x and y — this
    // exercises the FUN_005e38f5 register-propagation fix (x reaches the pick).
    expect(heap.u32(0x0099fdf4)).toBe(SX);
    expect(heap.u32(0x0099fdf8)).toBe(SY);

    // The drag must start from idle.
    expect(heap.u8(0x0099a4fc) & 0x100 ? 0 : heap.u8(0x00991f36)).toBeLessThanOrEqual(1);

    // Post the live LMB-down over the viewport and run one tick. The message
    // pump dispatches it to the binary WindowProc 0x403d79, which enqueues a
    // type-1 event into the internal ring at 0x5f1cc0; this same tick's
    // FUN_005e38f5 then dequeues it and engages the land drag.
    const ringHeadBefore = heap.u32(0x005e91e4);
    state.inputState.mouseButtons = 1;
    postWindowMessage(hwnd, 0x0201, 1, packLParam(SX, SY));
    const t0 = process.hrtime.bigint();
    runtime.runTick();
    const downMs = Number(process.hrtime.bigint() - t0) / 1e6;

    // The WindowProc enqueued the event into the binary's internal ring.
    const ringHeadAfter = heap.u32(0x005e91e4);
    expect(ringHeadAfter).not.toBe(ringHeadBefore);
    // The enqueued ring slot carries our cursor + type-1 (LMB-down).
    const slot = (0x005f1cc0 + ringHeadBefore * 0xc) >>> 0;
    expect(heap.u32(slot)).toBe(SX);          // x
    expect(heap.u32(slot + 4)).toBe(SY);      // y
    expect(heap.u32(slot + 8)).toBe(1);       // type 1 = LMB-down

    // FUN_005e38f5 consumed it and engaged the land drag mode (1 -> 6).
    expect(heap.u8(0x00991f36)).toBe(6);
    // The live click tick is fast (no runaway repaint/pick).
    expect(downMs).toBeLessThan(4000);
  }, 60_000);

  it("the land AREA command (cmd 0x13) issued by the live drag mutates the picked owned tile's surface bytes", () => {
    // The picked tile (the cursor-pick resolves screen (196,92) -> tile (35,72),
    // surface 0x6f6498, owned; verified byte-identically in viewport_build.test.js).
    const tx = 35, ty = 72;
    const elem = surfaceElem(tx, ty);
    expect(elem).toBe(0x6f6498);
    expect(heap.u8(elem + 7) & 0x20).toBe(0x20); // land-owned

    // cmd 0x13 is a no-op when the requested corner style equals the tile's
    // current style — so choose dl/dh that DIFFER from whatever the tile holds
    // now (the prior live-down test shares this runtime and may have nudged the
    // styles). This keeps the assertion deterministic across test order.
    const curDl = (heap.u8(elem + 5) >>> 5) & 7;
    const curDh = (heap.u8(elem + 4) >>> 5) & 7;
    const dl = (curDl + 1) & 7;   // corner-A style, guaranteed != current
    const dh = (curDh + 2) & 7;   // corner-B style, guaranteed != current

    // Seed the drag rect the way the land-tool callback 0x42aeb7 does after a
    // live pick: [0x99a020] bit0 = valid, the rect = tile..tile (1x1) in tile*32
    // units, and the corner-direction globals [0x5f4101]/[0x5f4102].
    heap.setU16(0x0099a020, 1);
    heap.setU16(0x0099a022, tx * 32);        // x1 (ax)
    heap.setU16(0x0099a026, ty * 32);        // y1 (cx)
    heap.setU16(0x0099a024, tx * 32);        // x2 (di)
    heap.setU16(0x0099a028, ty * 32);        // y2 (bp)
    heap.setU8(0x005f4102, dl);              // dl = corner-A style
    heap.setU8(0x005f4101, dh);              // dh = corner-B style
    heap.setU8(0x0099c169, 0);
    heap.setU32(0x0087c3bc, heap.u32(0x0087c3bc) & ~4); // clear construction-suppress
    // Re-arm the audio-trap gate (the live ticks consume [0x5f4a6a]); cmd 0x13
    // calls the sound emitter 0x452fce gated by `cmp [0x5f4a6a],1`, and the
    // bridge's 0x452fce hook underflows the stack at this depth — so we keep it
    // >=1 to let 0x426f56's inc skip the audio call (see project memory).
    heap.setU8(0x005f4a6a, 1);

    const before = [];
    for (let i = 0; i < 8; i++) before.push(heap.u8(elem + i));

    // Drive the live issuing site 0x42aeb7 (reads [0x99a020] bit0, sets
    // dl/dh/bl/esi, calls 0x426f56 -> cmd 0x13 -> handler 0x424ab0). This is the
    // exact register contract the land-tool down/drag handler uses; FUN_00424ab0
    // (the JS port) is byte-for-byte oracle-equal to the binary for this path.
    for (const k of ["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp"]) { regs[k] = 0; cpu.regs[k] = 0; }
    cpu.eflags.CF = cpu.eflags.ZF = cpu.eflags.SF = cpu.eflags.OF = 0;
    cpu.fpuTop = 0; cpu.fpuTags = 0xffff; cpu.fpuSw = 0;
    const t0 = process.hrtime.bigint();
    runFunction(cpu, 0x42aeb7, { stackTop: heap.bytes.byteLength - 0x1000, limit: 80_000_000 });
    const cmdMs = Number(process.hrtime.bigint() - t0) / 1e6;

    const after = [];
    for (let i = 0; i < 8; i++) after.push(heap.u8(elem + i));

    // cmd 0x13 changes the per-corner STYLE bits (byte+4 high-3 / byte+5 high-3),
    // not the base height (byte+3). Assert a surface byte changed for the rect.
    const changed = before.some((b, i) => b !== after[i]);
    expect(changed).toBe(true);
    // Specifically the corner-style bytes were written (dl -> byte+5, dh -> byte+4).
    expect((heap.u8(elem + 5) >>> 5) & 7).toBe(dl); // dl written to byte+5 high bits
    expect((heap.u8(elem + 4) >>> 5) & 7).toBe(dh); // dh written to byte+4 high bits
    expect(cmdMs).toBeLessThan(4000);
  }, 60_000);

  // ============================================================================
  // The full faithful chain: arm the land tool the SCENARIO-PLAY-TOOLBAR way,
  // then a live per-tick hover AUTO-RESOLVES the cursor tile into the drag rect,
  // and the binary's own down-engage handler BUILDS from that auto-resolved rect.
  //
  // Unlike the test above (which SEEDS the rect at [0x99a020]), this drives the
  // binary's own per-tick tool-update to POPULATE the rect from the live cursor
  // pick — the genuine "drag over the map auto-targets the tile" behaviour.
  // ============================================================================
  function findSlot(cls) {
    const end = heap.u32(0x009a1164) >>> 0;
    for (let s = 0x009a013c; s < end; s += 0x178) {
      if (heap.u8(s + 0x174) === cls) return s >>> 0;
    }
    return 0;
  }
  function runBridge(addr, setup = {}) {
    for (const k of ["eax", "ebx", "ecx", "edx", "esi", "edi", "ebp"]) {
      const v = (setup[k] ?? 0) >>> 0; regs[k] = v; cpu.regs[k] = v;
    }
    cpu.eflags.CF = cpu.eflags.ZF = cpu.eflags.SF = cpu.eflags.OF = 0;
    cpu.fpuTop = 0; cpu.fpuTags = 0xffff; cpu.fpuSw = 0;
    runFunction(cpu, addr, { stackTop: heap.bytes.byteLength - 0x1000, limit: 80_000_000 });
  }
  // Idempotent faithful arm. The vitest runtime is shared across `it`s, so guard
  // against double-arming: re-running MainOpen duplicates windows, and clicking
  // the land button while it is ALREADY armed TOGGLES the tool OFF (0x42b375's
  // already-active fast path -> deactivate 0x5e687d). Build the play toolbar +
  // land window only once, and only click the land button when the tool is not
  // yet active.
  function armLandTool() {
    heap.setU8(0x005f4a6a, 1);
    if (findSlot(1) === 0) runBridge(0x004298a0, {});      // build the play toolbar once
    const toolbarSlot = findSlot(1);
    const alreadyArmed = ((heap.u32(0x00991f30) >>> 3) & 1) === 1 &&
                         heap.u8(0x00991f5a) === 1 && heap.u16(0x00991f5c) === 8;
    if (!alreadyArmed) {
      heap.setU8(0x005f4a6a, 1);
      runBridge(0x0042a830, { ebp: 1, edx: 8, esi: toolbarSlot });
    }
    return toolbarSlot;
  }

  it("the SCENARIO-PLAY toolbar land button faithfully opens the land window and arms the tool", () => {
    // Build the in-game toolbar (FUN_004298a0) with the land button, then click
    // it the binary's own way: FUN_0042a830 with BP=1 (button-press), DX=8 (land
    // tool), ESI=the class-1 toolbar slot. That routes through 0x42b375 ->
    // setActiveTool 0x5e680e + the land-window-open 0x424c0e.
    const toolbarSlot = armLandTool();
    expect(toolbarSlot).not.toBe(0);

    // The land tool is armed: [0x991f30] bit3 (tool active), tool-window class
    // [0x991f5a] = 1 (the toolbar that owns the per-tick update callback), tool
    // id [0x991f5c] = 8, brush [0x5f54e8] = 1, corner-style defaults 0xff/0xff.
    expect((heap.u32(0x00991f30) >>> 3) & 1).toBe(1);
    expect(heap.u8(0x00991f5a)).toBe(1);
    expect(heap.u16(0x00991f5c)).toBe(8);
    expect(heap.u16(0x005f54e8)).toBe(1);
    expect(heap.u8(0x005f4101)).toBe(0xff);
    expect(heap.u8(0x005f4102)).toBe(0xff);

    // The land window (class 0x15) is now open ON-SCREEN with its build/event
    // callback (slot+4 = 0x424c57) and wndProc 0x424d32 — the subsystem the
    // title-demo lacked, now present so the per-tick tool path is complete.
    const landSlot = findSlot(0x15);
    expect(landSlot).not.toBe(0);
    expect(heap.u32(landSlot + 4) >>> 0).toBe(0x00424c57);
    expect(heap.i16(landSlot + 0x22)).toBeGreaterThanOrEqual(0); // y on-screen (not y~600)
  }, 60_000);

  it("a live per-tick hover AUTO-RESOLVES the cursor tile into the drag rect, and the down-engage handler BUILDS from it (a surface byte changes)", () => {
    // (Re)arm faithfully — beforeAll's runtime is shared across `it`s, so make
    // this self-contained (idempotent: won't toggle an already-armed tool off).
    armLandTool();
    expect((heap.u32(0x00991f30) >>> 3) & 1).toBe(1);

    const hwnd = state.firstHwnd;
    const SX = 196, SY = 122; // window-absolute; viewport at screenY=30 -> rel (196,92)

    // Clear the rect, then drive a LIVE per-tick hover: post WM_MOUSEMOVE over
    // the viewport and runTick. The per-tick input chain FUN_005e38f5 ->
    // FUN_005e6044 (the armed tool-update; ported, oracle-validated) -> the land
    // tool's resolve 0x42aa65 -> single/area pick 0x43424f/0x434efd ->
    // FUN_00431510 cursor-pick RESOLVES the cursor tile into the drag rect at
    // [0x99a020] (bit0 = valid, +2..+0xa = the tile rect). The harness's
    // synthetic paint pump would otherwise overflow the adjacent marker buffer
    // into the rect; runtime/harness.js snapshots+restores it, so the resolved
    // rect SURVIVES the tick — exactly as the binary's single-pass paint leaves
    // it for the next input pass to consume.
    heap.setU16(0x0099a020, 0);
    let maxTickMs = 0;
    for (let i = 0; i < 4; i++) {
      state.inputState.cursorX = SX; state.inputState.cursorY = SY;
      postWindowMessage(hwnd, 0x0200, 0, packLParam(SX, SY));
      heap.setU8(0x005f4a6a, 1);
      const t0 = process.hrtime.bigint();
      runtime.runTick();
      maxTickMs = Math.max(maxTickMs, Number(process.hrtime.bigint() - t0) / 1e6);
    }
    // Per-tick wall-time guard: the live hover/pick tick stays fast.
    expect(maxTickMs).toBeLessThan(4000);

    // The live per-tick pick AUTO-RESOLVED the cursor tile into the rect — no
    // seeding. bit0 is set and the rect carries a real owned tile.
    expect(heap.u16(0x0099a020) & 1).toBe(1);
    const tx = heap.u16(0x0099a022) >> 5;
    const ty = heap.u16(0x0099a026) >> 5;
    const elem = surfaceElem(tx, ty);
    expect(elem).not.toBe(0);
    expect(heap.u8(elem + 7) & 0x20).toBe(0x20); // the resolved tile is land-owned

    // BUILD from the AUTO-RESOLVED rect through the binary's own LMB-down ->
    // drag-engage handler FUN_005e2f0e (the exact handler the live WM_LBUTTONDOWN
    // reaches via FUN_005e2225's input-mode dispatch: mode 1 -> 0x5e2b52 ->
    // 0x5e2d13 widget-type 0xc -> 0x5e2f0e). It sets mode 6 and calls the tool
    // callback BP=8 -> 0x42aeb7, which issues land cmd 0x13 (handler 0x424ab0)
    // from the resolved rect. Pick non-0xff corner styles so the build is a
    // visible change (0xff/0xff is the idempotent "level" default).
    heap.setU8(0x005f4102, 0); // corner-A style -> surface byte+5
    heap.setU8(0x005f4101, 0); // corner-B style -> surface byte+4
    heap.setU8(0x005f4a6a, 1);
    const before = [];
    for (let i = 0; i < 8; i++) before.push(heap.u8(elem + i));

    const t0 = process.hrtime.bigint();
    runBridge(0x005e2f0e, { eax: tx * 32, ebx: ty * 32 });
    const buildMs = Number(process.hrtime.bigint() - t0) / 1e6;

    const after = [];
    for (let i = 0; i < 8; i++) after.push(heap.u8(elem + i));

    // The drag ENGAGED (mode 6) and the cmd-0x13 build issued (it sets
    // [0x991f5b] = 2 after emitting) — a surface byte CHANGED on the
    // auto-resolved tile.
    expect(heap.u8(0x00991f36)).toBe(6);          // land drag engaged
    expect(heap.u8(0x00991f5b)).toBe(2);          // 0x42aeb7 issued the cmd
    const changed = before.some((b, i) => b !== after[i]);
    expect(changed).toBe(true);
    // cmd 0x13 with corner style 0 writes the corner-style bits of byte+5
    // (and byte+4); the resolved tile's byte+5 high-3 bits become 0.
    expect((heap.u8(elem + 5) >>> 5) & 7).toBe(0);
    expect(buildMs).toBeLessThan(4000);
  }, 60_000);
});
