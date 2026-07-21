// Bridge that lets state.fnDispatch invoke functions Ghidra couldn't recover
// (the rotation-painter jumptable targets in CODESEG). For each painter
// address, registers a shim that:
//   1. Builds a cpu over heap.bytes (shared memory — writes flow back).
//   2. Mirrors the translator-side `regs` (runtime/regs.js) into cpu.regs.
//   3. Runs the function via the x86 interpreter, which handles the 0x66
//      operand-size prefix that's pervasive in these painters (the static
//      lifter mis-decodes 0x66 on register opcodes — see run.js's blanket
//      drop). The interpreter is the byte-equal oracle, so this is safe.
//   4. Mirrors cpu.regs back into `regs` so the caller's expectations match
//      the binary's calling convention (eax = return value, esi/edi/ebp
//      callee-preserved, etc.).
//
// The painter set comes from lifter/extra-entries.json — the 20 functions
// whose addresses we extracted from the 5 rotation jumptables (PTR_LAB_
// 00431bb8 / 00432204 / 00434e98 / 00436b40 / 005e5874). Each table is
// indexed by DAT_00991f88 (camera rotation, 0..3).

import { makeCpu, runFunction, step, setEipHook, clearEipHook, getEipHook, setShimInvoker } from "../harness/x86.js";
import { loadPEFromBytes } from "../harness/loader.js";
import { getShim, invokeShim } from "../harness/shims.js";
import { regs } from "./regs.js";
import { state } from "./win32/context.js";
import { FUN_00444927 } from "../ported/auto/444927.js";
import { FUN_00452fce } from "../ported/auto/452fce.js";
// Gameplay port: award block 0 ("tidiest park") of the award dispatcher
// 0x429502 — reached via its internal `jmp [ebx*4+0x429544]` (ebx=0).
import { FUN_extra_award_429560 } from "../ported/auto/extra_award_429560.js";
import { FUN_004415e6 } from "../ported/auto/4415e6.js";
// Paint port: peep sprite painter — unlabeled binary fn (no decompiled C),
// entry 1 of the sprite-type paint dispatch table at 0x6309a0; reached only
// via FUN_00444820's callIndirect. See ported/auto/439178.js (ADDENDUM 58).
import { FUN_00439178 } from "../ported/auto/439178.js";
// Paint port: vehicle sprite painter — unlabeled binary fn (no decompiled C),
// entry 0 of the sprite-type paint dispatch table at 0x6309a0; sibling of
// 0x439178 with the same two reach paths. Untranscribed special shapes/tails
// are routed to the interp shim via the js5d7503CanHandle pre-flight guard.
import { FUN_005d7503, js5d7503CanHandle } from "../ported/auto/5d7503.js";
// ADDENDUM 61 trio — asm-transcribed @manual bodies, wired as eip hooks:
// tile-corner setter (mid-block label), peep-state 6 (queuing) handler,
// peep-state 4 dispatcher. See installJsFnEipHook below.
import { FUN_00422a90 } from "../ported/auto/422a90.js";
import { FUN_0043a5f8 } from "../ported/auto/43a5f8.js";
import { FUN_0043a74b } from "../ported/auto/43a74b.js";
// Entrance-element painter (vtable slot 4 of PTR_LAB_00628a94), ADDENDUM 63.
import { FUN_004254e0, js4254e0CanHandle } from "../ported/auto/4254e0.js";
// Peep ride sub-state 9 handler (0x62d50c[9], via the 43a74b bridge), ADD 64.
import { FUN_0043c2ec } from "../ported/auto/43c2ec.js";
// Sprite bbox invalidate (dirty-grid marking), ADDENDUM 65. The @manual JS
// (rewritten from asm; the Ghidra C dropped the clamp loop) has long been in
// the fnDispatch map for JS callers — this hook makes the in-binary `call
// 0x5e53ca` sites and the callNative bridges fast-path it too.
import { FUN_005e53ca } from "../ported/auto/5e53ca.js";
// Two more validated-but-unhooked @manual ports (the ADD-65 class): the
// peep tile z-height helper and the vehicle breakdown-eligibility check,
// both reached via callNative from live JS (peepwalk / 5da274) — ADD 66.
import { FUN_0043d38b } from "../ported/auto/43d38b.js";
import { FUN_005ddcbe } from "../ported/auto/5ddcbe.js";
// Popcount of [0x87c3dc]+[0x87c3e0] -> AX (auto-translation, validated by
// tools/_lockstep-4314ed.mjs since ADDENDUM 18; never hooked) — ADD 66.
import { FUN_004314ed } from "../ported/auto/4314ed.js";
// Peep-state 13 handler (leaving through the park exit), ADDENDUM 68.
import { FUN_0043a3a8 } from "../ported/auto/43a3a8.js";
// Map-animation handlers (vtable 0x628ab0, dispatched from FUN_00436508 with
// AX=x CX=y DL=z; exit CF=1 dequeues): type 0 ride entrance, type 1 path
// queue banner — ADDENDUM 71.
import { FUN_004264f6 } from "../ported/auto/4264f6.js";
import { FUN_00449178 } from "../ported/auto/449178.js";
// Vehicle status 1 "waiting for passengers" (vtable PTR_LAB_005d97b4 slot 1);
// hot dh==1 arm in JS, other arms via its own embedded interp — ADDENDUM 72.
import { FUN_005d99a2 } from "../ported/auto/5d99a2.js";
// Window event proc registered at 0x429960 (event {1,2,3,4,7,8,9,a,b} arms
// unported → embedded interp; the soak only ever sends the unhandled
// fall-through event 0x12) — ADDENDUM 73.
import { FUN_0042a830 } from "../ported/auto/42a830.js";
// Tooltip/hover dwell-timer tick; only the soak's single observed path is JS,
// every other shape routes to the fn's embedded interp — ADDENDUM 74.
import { FUN_005e2b52 } from "../ported/auto/5e2b52.js";
// Tooltip show/refresh — the 0x5e3652 callee the 5e2b52 port callNatives;
// batch-oracle CLEAN 30/30 (tools/_lockstep-batch.mjs, ADDENDUM 83).
import { FUN_005e3652 } from "../ported/auto/5e3652.js";
// Peep ride sub-state 8 "walk to boarding position" (0x62d50c[8], sibling of
// 43c2ec sub-state 9); reached via 43a74b's tail-jmp — ADDENDUM 86.
import { FUN_0043c210 } from "../ported/auto/43c210.js";
// Gameplay port: ride/vehicle per-sprite update, vtable slot 4 of
// PTR_LAB_005d97b4 — reached via the sprite-update walk's `call [edi*4+0x5d97b4]`.
import { FUN_005da274_js } from "../ported/auto/extra_vehicle_5da274.js";
import { FUN_005dbeeb_js } from "../ported/auto/extra_vehicle_5dbeeb.js";
import { install4368d8Hooks } from "../ported/auto/extra_paint_4368d8.js";
import { install421d2cHook } from "../ported/auto/extra_paint_421d2c.js";
// Phase R+12: hand-port scaffold for fence/wall per-element painter (stub).
import { install444e08Hook } from "../ported/auto/extra_paint_444e08.js";
// Full-fn wall-painter orchestrator (ADDENDUM 60): jsMain (the validated
// paintBody444e08) + jsBanner (banner walls, previously interp-only) +
// predicate-routed embedded-interp fallbacks (shade/door/scroll-text).
import { FUN_00444e08 } from "../ported/auto/444e08.js";
import { install4238b4Hook } from "../ported/auto/extra_paint_4238b4.js";
// Phase R+12b: hand-port for small-scenery per-element painter.
import { install5ce7f8Hook } from "../ported/auto/extra_paint_5ce7f8.js";
// Phase R+14: hand-port for base-tile rotation sub-painter (PTR_LAB_00431bb8).
import { install431bb8Hooks } from "../ported/auto/extra_paint_431bb8.js";
// Workstream A1 (2026-06-10): hand-port for the SECOND rotation paint-slot
// allocator table (PTR_LAB_00432204) — called inline from the interpreter
// bodies of 0x5dff38 (fence), 0x444e08 (wall), the 42094b/420502 cold
// tails, and the small-scenery sub-painters. See extra_paint_432204.js.
import { install432204Hooks, install432e90Hooks } from "../ported/auto/extra_paint_432204.js";
// Workstream A1 (2026-06-10): corner-fence per-element painter (vtable
// slot 5 of PTR_LAB_00628a94) — ranked #3 in the painter soak.
import { install5dff38Hook } from "../ported/auto/extra_paint_5dff38.js";
// Phase R+14b: hand-port for palette-swizzle helper #1 of 4 called from
// the tail of 0x421d2c (terrain painter).
import { install420d9cHook } from "../ported/auto/extra_paint_420d9c.js";
// Phase R+14c: hand-port for palette-swizzle helper #2 of 4 (sibling of
// 0x420d9c, called immediately after it from 0x421d2c's tail).
import { install420f4cHook } from "../ported/auto/extra_paint_420f4c.js";
// Phase R+14d: hand-port for palette-swizzle helper #3 of 4 (0x420502).
import { install420502Hook } from "../ported/auto/extra_paint_420502.js";
// Phase R+14e: hand-port for palette-swizzle helper #4 of 4 (0x42094b) —
// sibling of 0x420d9c with role-swapped EBX/EDI table indexing.
import { install42094bHook } from "../ported/auto/extra_paint_42094b.js";

// Node-only fs/path/url accessors. Top-level-await dynamic imports so the
// browser (which has no `node:` scheme) can still load this module — the
// imports reject and we leave the helpers null. Browser callers must pass
// opts.exeBytes + opts.painterAddresses to installPainterBridge instead.
let _nodeFs = null, _nodePath = null, _nodeUrl = null;
try { _nodeFs   = await import("node:fs");   } catch (_) {}
try { _nodePath = await import("node:path"); } catch (_) {}
try { _nodeUrl  = await import("node:url");  } catch (_) {}

function nodeReadExtraEntries() {
  if (!_nodeFs || !_nodePath || !_nodeUrl) return null;
  const here = _nodePath.dirname(_nodeUrl.fileURLToPath(import.meta.url));
  const path = _nodePath.resolve(here, "..", "lifter", "extra-entries.json");
  return JSON.parse(_nodeFs.readFileSync(path, "utf8"));
}

function nodeReadExe() {
  if (!_nodeFs || !_nodePath || !_nodeUrl) return null;
  const here = _nodePath.dirname(_nodeUrl.fileURLToPath(import.meta.url));
  return _nodeFs.readFileSync(_nodePath.resolve(here, "..", "binary", "rct.exe"));
}

function loadPainterAddresses(opts) {
  if (Array.isArray(opts?.painterAddresses)) return opts.painterAddresses;
  const json = opts?.extraEntriesJson || nodeReadExtraEntries();
  if (!json) return [];
  return json
    .filter((x) => x.addr !== undefined)
    .map((x) => (typeof x.addr === "string" ? parseInt(x.addr, 16) : x.addr));
}

// Overlay the .text and CODESEG byte ranges from rct.exe into `memory`.
// tools/extract-data.js strips these from data.bin (translator and lifter
// don't need them), but the painter bridge runs the *interpreter* — it
// needs the raw bytes at the painter addresses + any CODESEG callees,
// plus the rotation-jumptable contents at 0x431bb8 / 0x432204 / 0x434e98
// / 0x436b40 / 0x005e5874 (which sit inside CODESEG).
export function overlayCodeSections(memory, exeBytes) {
  const pe = loadPEFromBytes(exeBytes);
  let copied = 0;
  for (const s of pe.sections) {
    if (s.name !== ".text" && s.name !== "CODESEG") continue;
    const dst = pe.imageBase + s.virtualAddress;
    const len = Math.min(s.sizeOfRawData, s.virtualSize);
    memory.set(pe.memory.subarray(dst, dst + len), dst);
    copied += len;
  }
  return copied;
}

export function installPainterBridge(heap, opts = {}) {
  const memory = heap.bytes;

  // Load code-section bytes. In Node we can read rct.exe directly. In the
  // browser, callers must pass `opts.exeBytes` (a Uint8Array of rct.exe).
  let exeBytes = opts.exeBytes;
  if (!exeBytes) {
    try { exeBytes = nodeReadExe(); } catch (_) {}
    if (!exeBytes) {
      if (typeof console !== "undefined") {
        console.warn(`[painter-bridge] no rct.exe available; painters will not run`);
      }
      return 0;
    }
  }
  const codeBytes = overlayCodeSections(memory, exeBytes);
  if (typeof console !== "undefined") {
    console.log(`[painter-bridge] overlaid ${codeBytes.toLocaleString()} code bytes from rct.exe`);
  }

  const cpu = makeCpu(memory);
  // Painters that wild-jump into low memory (e.g. a NULL slot in a sprite-class
  // vtable like 0x628a94[15]=0) should bail cleanly instead of executing
  // 70 000+ zero-byte instructions before some downstream OOB aborts the tick.
  cpu.bailOnWildJump = true;
  // Expose the fully-equipped bridge cpu (shim-invoker + eip-hooks installed
  // below) so diagnostics can run whole binary functions faithfully through the
  // interpreter — e.g. tools/oracle-diff-tick.js oracle-diffs the gameplay sim
  // (FUN_004385d8) vs the JS port to find the first divergent tick.
  state.__painterCpu = cpu;

  // Register a shim invoker for the bridge cpu. When the interpreter's EIP
  // lands in SHIM_BASE (>= 0xF0000000), it dispatches to this function. We
  // need this for two reasons:
  //
  //   (1) Painters legitimately CALL Win32 imports (KERNEL32 timing helpers,
  //       USER32 cursor helpers, etc.). Without an invoker the interpreter
  //       throws and the bridge's per-painter try/catch turns each into a
  //       `shim invoked but no invoker registered` warning.
  //
  //   (2) Painters occasionally compute a bogus CALL target that lands in
  //       SHIM_BASE but doesn't correspond to any registered IAT entry (e.g.
  //       0x5d7503 the peep painter, which after Phase R+7 lifted sprite
  //       coverage from 1/31 → 31/31, fires ~12 times per tick and produces
  //       one warning per tick with eip=0xfff9a6f0, a value that's not in the
  //       static IAT [0xF0000000..0xF0000338] or the dynamic-sentinel range
  //       [0xF1000000+]. The "return address" pushed for that call also lands
  //       in DATASEG (0x6f8cd0) — so the control flow has already gone off
  //       the rails before the CALL fires. Following the bogus return would
  //       just let the interpreter walk into data and throw a different
  //       opcode error on the next step (empirically `unsupported 0x8f /3`).
  //
  //       Rather than crashing the entire painter run, silently treat unknown
  //       sentinels as a bridge-only `WildShimError` and let the painter-shim
  //       try/catch below recognize it and stay silent. The 11/12 healthy
  //       peep invocations continue to render; pixel counts and palette
  //       diversity are unaffected (the bad peep was producing nothing
  //       useful either way).
  setShimInvoker((c, sentinel) => {
    const spec = getShim(sentinel);
    if (spec) {
      // Real IAT entry — delegate to the standard invoker, which handles
      // arg unpacking, eax write-back, and stdcall esp adjustment.
      invokeShim(c, sentinel);
      return;
    }
    // Unknown sentinel — bail out of runFunction. Throw a tagged error the
    // outer try/catch can swallow silently.
    const err = new Error(`wild shim eip=0x${sentinel.toString(16)}`);
    err._wildShim = true;
    throw err;
  });

  // Install a JS hook for FUN_00444927 (sprite tile-grid relink + bbox).
  // When a bridge-shim runs binary code that CALLs 0x444927 (e.g. the per-sprite
  // update vtable target at 0x5da274), the interpreter's chain-walk loop at
  // 0x444985 deadlocks because the bridge-cpu's bucket-chain state diverges
  // from what the binary expects (the chain index at sprite+0xa is a stride-1
  // u16 that the JS hand-port computes correctly while the bridge cpu may
  // observe a not-yet-relinked state when called mid-update). Replace the
  // entire native call with the JS hand-port, which already handles all four
  // rotation branches inline and writes the post-relink bbox to esi+0x16..0x1c.
  // The hook syncs cpu.regs ↔ regs so the hand-port reads the right inputs.
  setEipHook(0x444927, (cpu) => {
    // Sync cpu → regs so FUN_00444927 reads bridge-cpu's register state.
    regs.eax = cpu.regs.eax >>> 0;
    regs.ecx = cpu.regs.ecx >>> 0;
    regs.edx = cpu.regs.edx >>> 0;
    regs.ebx = cpu.regs.ebx >>> 0;
    regs.esi = cpu.regs.esi >>> 0;
    regs.edi = cpu.regs.edi >>> 0;
    regs.ebp = cpu.regs.ebp >>> 0;
    try { FUN_00444927(heap); } catch (e) { /* hand-port errors are non-fatal */ }
    // Sync back regs → cpu. The hand-port only writes regs.eax (the return
    // value) — but the binary's 0x444927 prologue saves eax/ecx/edi and the
    // epilogue restores them. Mirror that by leaving cpu.regs.eax/ecx/edi
    // unchanged from their pre-call values (they're already in cpu.regs from
    // before this hook fired). Sync only the writeable regs back.
    cpu.regs.edx = regs.edx >>> 0;
    cpu.regs.ebx = regs.ebx >>> 0;
    cpu.regs.esi = regs.esi >>> 0;
    cpu.regs.ebp = regs.ebp >>> 0;
  });

  // Install a JS hook for FUN_0043e792 (peep queue-bucket unlink) — same
  // divergence class as the 0x444927 hook above, but for the ride-queue
  // chains (head u16 at [0x887472 + ride*0x260 + station*2], next at
  // sprite+0x74). When a bridged peep-state handler (0x43a5f8 et al)
  // CALLs 0x43e792 natively and the victim sprite is not on its bucket's
  // chain (bridge-cpu state observed mid-update, or queue membership
  // de-synced by a JS-side caller), the native walk at 0x43e7ca spins
  // until the 50M step cap — multi-second wasted ticks. The JS hand-port
  // (ported/auto/43e792.js, byte-equal per tools/_diff-43e792.mjs) runs
  // the same logic; here we bound the walk and skip the splice when the
  // chain is provably corrupt (the binary would hang on such state, so
  // bounding only changes behaviour where the baseline is already lost).
  setEipHook(0x43e792, (cpu) => {
    const esi = cpu.regs.esi >>> 0;
    const ride = heap.u8((esi + 0x68) >>> 0);
    const station = heap.u8((esi + 0x69) >>> 0);
    const rideOff = ride * 0x260;
    const own = heap.u16((esi + 0xa) >>> 0);
    const cntAddr = (0x0088747a + rideOff + station) >>> 0;
    heap.setU8(cntAddr, (heap.u8(cntAddr) - 1) & 0xff);
    const headAddr = (0x00887472 + rideOff + station * 2) >>> 0;
    const next = heap.u16((esi + 0x74) >>> 0);
    let cur = heap.u16(headAddr);
    if (cur === own) {
      heap.setU16(headAddr, next);
      return;
    }
    for (let steps = 0; cur !== 0xffff && steps < 5000; steps++) {
      const rec = (0x00743b94 + cur * 0x100) >>> 0;
      const n = heap.u16((rec + 0x74) >>> 0);
      if (n === own) {
        heap.setU16((rec + 0x74) >>> 0, next);
        return;
      }
      cur = n;
    }
    if (typeof console !== "undefined" && !globalThis.__q792warned) {
      globalThis.__q792warned = true;
      console.warn(`[painter-bridge] 43e792-hook: sprite ${own} not on ride ${ride} st ${station} queue chain — splice skipped (corrupt chain; warn-once)`);
    }
  });

  // Install JS hooks for the per-tile surface painters at PTR_LAB_004368c8
  // (0x4368d8 / 0x4368e0 / 0x4368ec / 0x4368ff). The native body throws
  // `mem8 OOB: 0xa200460` warnings when the tile-element chain walk at
  // 0x4369e7 hits a corrupt tile_pointers entry (esi walks off into
  // 0xa2000000-range garbage); the bridge catches the throw but the
  // warnings clog logs and the interpreter runs these ~9,000+ times per
  // 5 ticks. The JS port uses a bounded chain walk and stays in JS for
  // the hot loop, dispatching per-element painters via runFunction on
  // the same bridge cpu to preserve the CODESEG-only callees' behaviour.
  install4368d8Hooks(cpu, runFunction, setEipHook, heap);

  // Install JS hook for FUN_extra_paint_421d2c (terrain surface per-element
  // painter at PTR_LAB_00628a94[0]). Dispatched from the per-element loop in
  // 0x4368d8's body; Phase R+11 profiler showed it consuming ~65% of per-
  // tick wall time (954 calls/tick × ~200µs each in the interpreter). The
  // JS port handles the hot path inline (preamble + palette swizzle + base-
  // tile sub-painter dispatch) and falls back to `runFunction` for cold
  // tails (slope-extra, cliff-edge, corner-heights jumptable). Sub-painter
  // dispatches into PTR_LAB_00431bb8 still go through the bridge.
  install421d2cHook(cpu, runFunction, setEipHook, heap);

  // Install a JS hook for FUN_00452fce (sound-queue / pan helper). Called
  // from the LMB-down handler at 0x5e2b52 (CODESEG, runs in the bridge cpu)
  // with EAX=event-class, EBX=screen coord or 0x8001. The native body falls
  // through to a DirectSound vtable call via DAT_005ec05c+0xc — whose slot
  // contains a synthetic proc address (0x10100xxx range, registered by
  // runtime/win32/dsound.js). The bridge cpu can't execute synthetic addrs,
  // so it OOBs with `mem8 OOB: 0x10100098`. The JS port routes the same
  // call through callIndirect, which looks up the synthetic addr in
  // state.fnDispatch and dispatches to the real JS DirectSound impl.
  setEipHook(0x452fce, (cpu) => {
    regs.eax = cpu.regs.eax >>> 0;
    regs.ecx = cpu.regs.ecx >>> 0;
    regs.edx = cpu.regs.edx >>> 0;
    regs.ebx = cpu.regs.ebx >>> 0;
    regs.esi = cpu.regs.esi >>> 0;
    regs.edi = cpu.regs.edi >>> 0;
    regs.ebp = cpu.regs.ebp >>> 0;
    try { FUN_00452fce(heap); } catch (e) { /* hand-port errors are non-fatal */ }
    // Native 0x452fce prologue pushes ecx/edx/edi/esi/ebp (asm 0x452fe2-6,
    // before the 0x8001 branch test) and the epilogue at 0x4531aa pops them
    // back, so all five are callee-preserved. The JS port only writes to
    // regs.eax via internal callIndirect side-effects — leave cpu's saved
    // regs unchanged. Sync nothing back: cpu.regs already holds the entry
    // values for ecx/edx/edi/esi/ebp, and eax is also unchanged (the asm
    // doesn't preserve eax, but the C decompile's path writes nothing
    // meaningful to eax that the caller observes here).
  });

  // ######################################################################
  // Phase R+12 (agent A77) — fence/wall per-element painter scaffold.
  // ######################################################################
  // FUN_extra_paint_444e08 — vtable slot 1 of PTR_LAB_00628a94 (fence/wall
  // elements). Dispatched from FUN_extra_paint_4368d8's per-element loop
  // alongside 0x421d2c (terrain). Profile (Phase R+11) ranks it the second-
  // hottest per-element painter: 232 calls/tick × ~166 µs each = ~38 ms/tick
  // (13 % of per-tick wall time).
  //
  // Phase R+12 ships only the install scaffold: hook + recursion-safe
  // fallback (clearEipHook + re-install around runBodyFrom). The JS body
  // is a STUB that always returns false, so behaviour is byte-equal to no
  // hook (verified via title_replay hash comparison: stub mode and
  // hook-disabled mode produce identical frame hashes).
  //
  // The full hand-port is documented in extra_paint_444e08.js's header
  // (preamble + sub-painter dispatch + tail step-loop) and is non-trivial
  // due to the 0x44635d sub-dispatcher sprawl reached via the door/banner
  // tail jumptable. Follow-up phase (R+12.next) will swap the stub for the
  // real port; the scaffold here lets that swap be a single-file change.
  // REPLACED (ADDENDUM 60) by the full-fn orchestrator FUN_00444e08: the old
  // install444e08Hook covered non-banner walls with a blind try/fallback;
  // the orchestrator routes by the same predicates the binary branches on
  // (shade/door/banner/scroll-text, all entry-state-only) — banner walls now
  // run as JS, cold paths run byte-exactly in the embedded interpreter with
  // this hook lifted. The fn stages from the translator reg cells and leaves
  // the cpu positioned for the harness's simulated ret (its own finally), so
  // this wrapper only stages regs and calls it. __forceInterp444e08 = native
  // step-through (the dual-soak lever), same top-level-ret stop rule as the
  // 0x5d7503 hook (stop at esp==entry && opcode C3/C2, don't execute it).
  setEipHook(0x444e08, (c) => {
    if (typeof globalThis._renderTrace === "function") globalThis._renderTrace("FUN_00444e08");
    if (globalThis.__forceInterp444e08) {
      const self = getEipHook(0x444e08);
      clearEipHook(0x444e08);
      const limit = globalThis.__painterStepLimit || 50_000_000;
      const espEntry = c.regs.esp >>> 0;
      try {
        c.regs.eip = 0x444e08;
        let n = 0;
        while (!((c.regs.esp >>> 0) === espEntry && (c.regs.eip >>> 0) < heap.bytes.length
                 && (heap.u8(c.regs.eip >>> 0) === 0xc3 || heap.u8(c.regs.eip >>> 0) === 0xc2))) {
          if (!step(c) || ++n > limit) break;
        }
      } finally { setEipHook(0x444e08, self); }
      return;
    }
    regs.eax = c.regs.eax >>> 0; regs.ecx = c.regs.ecx >>> 0; regs.edx = c.regs.edx >>> 0;
    regs.ebx = c.regs.ebx >>> 0; regs.esi = c.regs.esi >>> 0; regs.edi = c.regs.edi >>> 0;
    regs.ebp = c.regs.ebp >>> 0; regs.esp = c.regs.esp >>> 0;
    try { FUN_00444e08(heap); } catch (e) {
      if (!globalThis.__warned444e08Orch) {
        globalThis.__warned444e08Orch = true;
        if (typeof console !== "undefined") console.warn(`[painter-bridge] 444e08 orchestrator threw: ${(e.message || e).slice(0, 160)}`);
      }
    }
  });

  // FUN_extra_paint_4238b4 — vertical-supports painter, called per
  // wall/track element (the JS 444e08 port reaches it via runFunction;
  // the eip hook routes that — and any interpreter-resident caller —
  // through the JS body). Ranked #2 interpreter consumer (6,924
  // steps/tick) after the 444e08 port landed. Interpreter reachable
  // behind __forceInterp4238b4 for the oracles
  // (tools/_lockstep-4238b4.mjs, FORCE_INTERP=4238b4 dual soak).
  install4238b4Hook(cpu, runFunction, setEipHook, heap);

  // ====================================================================
  // Gameplay port — award dispatcher block 0 ("tidiest park"), 0x429560.
  // ====================================================================
  // The award dispatcher 0x429502 selects an award index `ebx` and does
  // `jmp [ebx*4+0x429544]` INSIDE the interpreter; for ebx=0 (the only
  // case the scenario soak ever dispatches) that lands on 0x429560. An
  // eip hook here lets the JS hand-port win over the interpreter for that
  // crossing. The block ends in a plain `ret` (0x42989f) back to the
  // dispatcher's caller (0x45abe4: `call 0x429502; ret`), so the
  // dispatcher's call frame is intact on the stack when we arrive — the
  // hook must NOT disturb it. The JS body delegates its two callees
  // (0x42c711 award-news, 0x5e5301 sound/news) through callNative, which
  // runs runFunction on THIS cpu and therefore clobbers cpu.regs.esp/eip;
  // we snapshot/restore esp around the body so runFunction's post-hook
  // `ret` simulation pops the dispatcher's real return address. The other
  // six award blocks (0x4295e5..0x4297cb) stay in the interpreter (no
  // hook) — unexercised by the soak. Oracle: tools/_lockstep-429560.mjs
  // (calls=N memMis=0); interpreter reachable behind __forceInterp429560.
  setEipHook(0x429560, (c) => {
    if (globalThis.__forceInterp429560) {
      // Re-run the real bytes once. We arrive here with c.regs.eip == 0x429560
      // and the caller's frame (its return address) already on the stack — the
      // harness will simulate exactly ONE `ret` after this hook returns. So we
      // single-step the real block bytes but STOP at its own `ret` (0x42989f)
      // without executing it, leaving the frame untouched: the harness's ret
      // then consumes the caller's address, identical to the JS-body path.
      // Clear+reinstall the hook so the step loop decodes the real 0x429560
      // bytes instead of re-entering us.
      const self = getEipHook(0x429560);
      clearEipHook(0x429560);
      const limit = globalThis.__painterStepLimit || 50_000_000;
      try {
        c.regs.eip = 0x429560;
        let n = 0;
        while ((c.regs.eip >>> 0) !== 0x42989f) {
          if (!step(c) || ++n > limit) break;
        }
      } finally {
        setEipHook(0x429560, self);
      }
      return;
    }
    const savedEsp = c.regs.esp >>> 0;
    regs.eax = c.regs.eax >>> 0;
    regs.ecx = c.regs.ecx >>> 0;
    regs.edx = c.regs.edx >>> 0;
    regs.ebx = c.regs.ebx >>> 0;
    regs.esi = c.regs.esi >>> 0;
    regs.edi = c.regs.edi >>> 0;
    regs.ebp = c.regs.ebp >>> 0;
    try { FUN_extra_award_429560(heap); } catch (e) { /* hand-port errors are non-fatal */ }
    // callNative inside the body reset cpu.esp/eip; restore the dispatcher
    // frame so the post-hook ret simulation pops the right address.
    c.regs.esp = savedEsp;
    c.regs.eax = regs.eax >>> 0;
    c.regs.ecx = regs.ecx >>> 0;
    c.regs.edx = regs.edx >>> 0;
    c.regs.ebx = regs.ebx >>> 0;
    c.regs.esi = regs.esi >>> 0;
    c.regs.edi = regs.edi >>> 0;
    c.regs.ebp = regs.ebp >>> 0;
  });

  // ====================================================================
  // Gameplay port — peep ride-list / direction-cache update, 0x4415e6.
  // ====================================================================
  // The top remaining interpreter consumer (~3791 steps/tick, ADDENDUM 46).
  // Byte-exact JS port landed over 10 slices (ADDENDUM 47-54), validated by
  // tools/_lockstep-auto.mjs ADDR=0x4415e6 (memMis=0); its callee 0x44189c
  // (peep A* ride-search, incl. recursion + edi-threaded pruning) is also
  // memMis=0. The function ends in a plain `ret` (0x441890) back to its caller,
  // so the call frame is intact when we arrive — the harness simulates exactly
  // ONE `ret` after the hook returns. The JS body's callees (FUN_0044189c,
  // FUN_005df40c) are pure JS (no callNative), so cpu.esp isn't clobbered;
  // snapshot/restore it anyway for symmetry with the other gameplay hooks.
  // Interpreter reachable behind __forceInterp4415e6 (clear-hook / step-to-ret).
  setEipHook(0x4415e6, (c) => {
    if (globalThis.__forceInterp4415e6) {
      const self = getEipHook(0x4415e6);
      clearEipHook(0x4415e6);
      const limit = globalThis.__painterStepLimit || 50_000_000;
      try {
        c.regs.eip = 0x4415e6;
        let n = 0;
        while ((c.regs.eip >>> 0) !== 0x441890) { if (!step(c) || ++n > limit) break; }
      } finally { setEipHook(0x4415e6, self); }
      return;
    }
    const savedEsp = c.regs.esp >>> 0;
    regs.eax = c.regs.eax >>> 0; regs.ecx = c.regs.ecx >>> 0; regs.edx = c.regs.edx >>> 0;
    regs.ebx = c.regs.ebx >>> 0; regs.esi = c.regs.esi >>> 0; regs.edi = c.regs.edi >>> 0;
    regs.ebp = c.regs.ebp >>> 0;
    try { FUN_004415e6(heap); } catch (e) { /* hand-port errors are non-fatal */ }
    c.regs.esp = savedEsp;
    c.regs.eax = regs.eax >>> 0; c.regs.ecx = regs.ecx >>> 0; c.regs.edx = regs.edx >>> 0;
    c.regs.ebx = regs.ebx >>> 0; c.regs.esi = regs.esi >>> 0; c.regs.edi = regs.edi >>> 0;
    c.regs.ebp = regs.ebp >>> 0;
  });

  // ====================================================================
  // Gameplay port — ride/vehicle per-sprite update, 0x5da274.
  // ====================================================================
  // PTR_LAB_005d97b4 vtable slot 4, reached from the sprite-update walk at
  // 0x5d952c (`call dword [edi*4 + 0x5d97b4]`, edi = [esi+0x50] = 4) INSIDE
  // the interpreter. An eip hook here lets the JS hand-port win that
  // crossing. The function ends in a plain `ret` (0x5db338) back to the
  // dispatcher, so the dispatcher's call frame is intact when we arrive —
  // the harness simulates exactly ONE `ret` after the hook returns. The JS
  // body delegates its 6 callees through callNative, which runs runFunction
  // on THIS cpu and clobbers cpu.regs.esp/eip; snapshot/restore esp around
  // the body so the post-hook ret pops the dispatcher's real return address.
  // Oracle: tools/_lockstep-5da274.mjs (calls=N memMis=0); the interpreter
  // is reachable behind __forceInterp5da274 (clear-hook / step-to-ret).
  setEipHook(0x5da274, (c) => {
    if (globalThis.__forceInterp5da274) {
      // Re-run the real bytes once, stopping at the body's own `ret`
      // (0x5db338) WITHOUT executing it — the harness's post-hook ret then
      // consumes the dispatcher's address, identical to the JS-body path.
      const self = getEipHook(0x5da274);
      clearEipHook(0x5da274);
      const limit = globalThis.__painterStepLimit || 50_000_000;
      try {
        c.regs.eip = 0x5da274;
        let n = 0;
        while ((c.regs.eip >>> 0) !== 0x5db338) {
          if (!step(c) || ++n > limit) break;
        }
      } finally {
        setEipHook(0x5da274, self);
      }
      return;
    }
    const savedEsp = c.regs.esp >>> 0;
    regs.eax = c.regs.eax >>> 0;
    regs.ecx = c.regs.ecx >>> 0;
    regs.edx = c.regs.edx >>> 0;
    regs.ebx = c.regs.ebx >>> 0;
    regs.esi = c.regs.esi >>> 0;
    regs.edi = c.regs.edi >>> 0;
    regs.ebp = c.regs.ebp >>> 0;
    try { FUN_005da274_js(heap); } catch (e) { /* hand-port errors are non-fatal */ }
    // callNative inside the body reset cpu.esp/eip; restore the dispatcher
    // frame so the post-hook ret simulation pops the right address.
    c.regs.esp = savedEsp;
    c.regs.eax = regs.eax >>> 0;
    c.regs.ecx = regs.ecx >>> 0;
    c.regs.edx = regs.edx >>> 0;
    c.regs.ebx = regs.ebx >>> 0;
    c.regs.esi = regs.esi >>> 0;
    c.regs.edi = regs.edi >>> 0;
    c.regs.ebp = regs.ebp >>> 0;
  });

  // FUN_005dbeeb — vehicle mode-flag query, callee of 0x5da274 (reached via
  // callNative(0x5dbeeb) -> runFunction -> this eip hook). The JS body
  // (extra_vehicle_5dbeeb.js) returns true if it fully handled the call in JS,
  // or false to FALL BACK to the interpreter (it returns false BEFORE any side
  // effect, so the fallback re-run is clean). __forceInterp5dbeeb forces the
  // interp leg (oracle control). Single exit ret at 0x5dcd3f. STATUS: the JS
  // body currently always falls back (the type-55 arm is still being
  // transcribed) — so this is byte-neutral. Oracle: tools/_lockstep-5dbeeb.mjs.
  const runInterp5dbeeb = (c) => {
    const self = getEipHook(0x5dbeeb);
    clearEipHook(0x5dbeeb);
    const limit = globalThis.__painterStepLimit || 50_000_000;
    try {
      c.regs.eip = 0x5dbeeb;
      let n = 0;
      while ((c.regs.eip >>> 0) !== 0x5dcd3f) { if (!step(c) || ++n > limit) break; }
    } finally { setEipHook(0x5dbeeb, self); }
  };
  setEipHook(0x5dbeeb, (c) => {
    if (globalThis.__forceInterp5dbeeb) { runInterp5dbeeb(c); return; }
    const savedEsp = c.regs.esp >>> 0;
    regs.eax = c.regs.eax >>> 0; regs.ecx = c.regs.ecx >>> 0; regs.edx = c.regs.edx >>> 0;
    regs.ebx = c.regs.ebx >>> 0; regs.esi = c.regs.esi >>> 0; regs.edi = c.regs.edi >>> 0;
    regs.ebp = c.regs.ebp >>> 0;
    // FUN returns: false = fall back from 0x5dbeeb; true = fully handled in JS;
    // a NUMBER X = HYBRID — the JS body ran the byte-exact prefix [0x5dbeeb,X)
    // and left regs binary-exact at X; run the interpreter suffix [X,0x5dcd3f).
    let result = false;
    try { result = FUN_005dbeeb_js(heap); } catch (e) { result = false; }
    if (result === false) { c.regs.esp = savedEsp; runInterp5dbeeb(c); return; }
    c.regs.esp = savedEsp;
    c.regs.eax = regs.eax >>> 0; c.regs.ecx = regs.ecx >>> 0; c.regs.edx = regs.edx >>> 0;
    c.regs.ebx = regs.ebx >>> 0; c.regs.esi = regs.esi >>> 0; c.regs.edi = regs.edi >>> 0;
    c.regs.ebp = regs.ebp >>> 0;
    if (typeof result === "number") {
      const self = getEipHook(0x5dbeeb);
      clearEipHook(0x5dbeeb);
      const limit = globalThis.__painterStepLimit || 50_000_000;
      try {
        c.regs.eip = result >>> 0;
        let n = 0;
        while ((c.regs.eip >>> 0) !== 0x5dcd3f) { if (!step(c) || ++n > limit) break; }
      } finally { setEipHook(0x5dbeeb, self); }
    }
  });

  // ====================================================================
  // Phase R+12b region — small-scenery per-element painter hand-port.
  // ====================================================================
  // FUN_extra_paint_5ce7f8 — vtable slot 2 of PTR_LAB_00628a94 (small
  // scenery: trees, lamps, benches, fences, etc.). Dispatched from
  // FUN_extra_paint_4368d8's per-element loop alongside 0x421d2c (terrain)
  // and 0x444e08 (wall). Phase R+11 profiler showed it consuming ~3.5% of
  // per-tick wall time (71 calls/tick × ~28 µs each ≈ 2 ms/tick). The JS
  // port handles the hot prologue inline (skip-bit-0x20 branch, scenery-
  // def fields, sprite-flags dword writes, sub-painter dispatch via
  // DAT_5f6274[class][subtype][rotation]) and falls back to runFunction for
  // cold inputs ([0x991f8c] & 0x20 set, or an unregistered scenery class /
  // subtype). The actual scenery sub-painters at 4eb***/4ec***/4ed*** still
  // run through the bridge cpu via a manual step-loop — those CODESEG
  // painters have no JS port, and they explicitly read the pushed-esi
  // slot via `mov (%esp), %esi` so the stack layout must match exactly.
  install5ce7f8Hook(cpu, runFunction, setEipHook, heap);

  // ######################################################################
  // Phase R+14 region — base-tile rotation sub-painter hand-port (PTR_LAB_00431bb8).
  // ######################################################################
  // The four-entry rotation jumptable at 0x431bb8 (entries 0x431bc8 /
  // 0x431d4b / 0x431edc / 0x43206f) is invoked from extra_paint_421d2c's
  // hot path via `runFunction(cpu, [4*ebp + 0x431bb8])`. It's the LARGEST
  // interpreter-fallback consumer when the cb9==0 sprite-update gate
  // opens (see tools/probe-cb9-slowpath.js header + Phase R+13a diag):
  // each call runs ~80 0x66-prefixed insns through harness/x86.js step()
  // at ~200µs/call × 954 calls/tick ≈ 190 ms/tick.
  //
  // The painter is a paint-slot allocator: it computes a 48-byte slot at
  // DAT_005f96e8, fills bbox + sprite-anchor fields, links the slot into
  // the bucket-hash at DAT_006284ec[di] (di = clamped y-bucket index), and
  // advances DAT_005f96e8 by 0x30. All four rotation variants share the
  // body — only the (di, si, ax, cx) pre-add and bbox-X2/Y2 transforms
  // differ. The hand-port implements all four faithfully; no cold branches
  // fall back to interp (the only "abort" is allocator-full, which we
  // mirror silently).
  install431bb8Hooks(cpu, runFunction, setEipHook, heap);

  // ######################################################################
  // Workstream A1 (2026-06-10) — second rotation paint-slot allocator
  // (PTR_LAB_00432204: 0x432214 / 0x4323b8 / 0x43256d / 0x432727).
  // ######################################################################
  // Sibling of 431bb8, but invoked from per-element painters that still run
  // in the bridge interpreter (0x5dff38 fence ×4/call, 0x444e08 wall,
  // 42094b/420502 cold tails). The 2026-06-10 scenario soak ranked those
  // callers as 4 of the top-5 interpreter step consumers; this table's
  // ~65-insn body executed inline is the bulk of their cost. Full-path
  // port (no cold fallback); register write-back per exit path because the
  // interpreter callers resume on cpu.regs after the auto-ret.
  install432204Hooks(cpu, runFunction, setEipHook, heap);
  // The ATTACH variant table (PTR_LAB_00432e90) — same body, parent-link
  // tail; called twice per wall paint from 0x444e08's interpreter body.
  install432e90Hooks(cpu, runFunction, setEipHook, heap);

  // Workstream A1 (2026-06-10) — corner-fence painter 0x5dff38 (vtable
  // slot 5). Full-path port; its four paint-slot dispatches go straight to
  // the JS paintBody432204. See extra_paint_5dff38.js for the disasm map
  // and oracle evidence.
  install5dff38Hook(cpu, runFunction, setEipHook, heap);

  // ######################################################################
  // Phase R+14b region — palette-swizzle helper #1 of 4 (0x421d2c tail).
  // ######################################################################
  // FUN_extra_paint_420d9c is the first of four CODESEG-only helpers
  // dispatched at 0x4225c0..0x4225cf in FUN_extra_paint_421d2c's tail
  // (the palette-swizzle block). Sibling helpers (0x420f4c / 0x420502 /
  // 0x42094b) remain on the interpreter path until separately ported.
  //
  // The hand-port covers:
  //   - the bounds-check + tile-pointer chain walk (hot)
  //   - the al/ah/cl/ch compare → either early-return or push-to-paint-ring
  //     via FUN_00433b76 (hot — title scene with [0x991f8c]&1==0)
  //
  // Cold fallback to runFunction (with clearEipHook recursion guard):
  //   - the [0x991f8c]&1 branch (multi-call rotation-painter loop at
  //     0x420e4c..0x420f17). Never fires on title (profile: f8c=0x900).
  install420d9cHook(cpu, runFunction, setEipHook, heap);

  // Phase R+14c region — palette-swizzle helper #2 of 4 (0x420f4c).
  // ######################################################################
  // Structurally near-identical to 0x420d9c — same bounds check, same
  // chain walk, same FUN_00433b76 cold-bit-clear path. Differences: map-
  // offset tables (0x5f4694/0x5f4696 instead of 0x5f4684/0x5f4686) and
  // cl/ah table swap in the shared tail (0x420f4c uses 0x5f46a4 for cl,
  // 0x5f46e4 for ah; 0x420d9c uses 0x5f46e4 for cl, 0x5f46a4 for ah).
  install420f4cHook(cpu, runFunction, setEipHook, heap);

  // ######################################################################
  // Phase R+14d region — palette-swizzle helper #3 of 4 (0x420502).
  // ######################################################################
  // The hand-port covers:
  //   - bounds-check + tile-pointer chain walk (hot)
  //   - al/ah/cl/ch compare → early-return path at 0x420943
  //     (hot — title scene with f8c=0x900 takes this exit dominantly)
  // Cold fallback: queue-rotate + rotation-painter dispatch loop at
  // 0x4205a3+. Preserves byte-equality.
  install420502Hook(cpu, runFunction, setEipHook, heap);

  // ######################################################################
  // Phase R+14e region — palette-swizzle helper #4 of 4 (0x42094b).
  // ######################################################################
  // FUN_extra_paint_42094b is the fourth and final palette-swizzle helper
  // dispatched at 0x4225c0..0x4225cf in FUN_extra_paint_421d2c's tail. With
  // this hook installed, ALL 5 CODESEG callees of 0x421d2c (the rotation
  // sub-painter 0x431bb8 plus the four palette-swizzle helpers 0x420d9c /
  // 0x420f4c / 0x420502 / 0x42094b) are JS-native — closing the perf cluster
  // that opens when the cb9==0 sprite-update gate fires.
  //
  // Body skeleton is sibling-identical to 0x420d9c (entry CL/DL/EBX, bounds
  // check on (ax,bp) against 0x1000, tile-pointer chain walk on
  // [0x971ef4+4*idx], al/ah/cl/ch compare against entry DL/DH plus per-EBX
  // / per-EDI table adds), but two specifics differ:
  //   - per-rotation X/Y offset tables: 0x5f4674 / 0x5f4676 (not 0x5f4684 /
  //     0x5f4686 which 420d9c uses)
  //   - tail table-indexing role-swap: this helper indexes EBX into the
  //     A4/04 tables and EDI into the C4/E4 tables (opposite of 420d9c).
  //
  // The hand-port covers:
  //   - the bounds-check + tile-pointer chain walk (hot)
  //   - the al/ah/cl/ch compare → early-return path at 0x420d94 (hot —
  //     title scene with f8c=0x900 takes this exit dominantly)
  //
  // Cold fallback to runFunction (with clearEipHook recursion guard):
  //   - the al>ah || cl>ch branch (multi-call paint-dispatch loop at
  //     0x4209ec..0x420d92 — dispatches via [4*rot+0x431bb8] AND
  //     [4*rot+0x432204] while rotating the DAT_999fdc..DAT_99a01c scratch
  //     ring on each iteration; modeling the ring rotation in JS is more
  //     work than the rest of the body combined, so fall back for safety).
  install42094bHook(cpu, runFunction, setEipHook, heap);

  // Carve a private stack region from the top of memory. The translator
  // uses heap.allocFrame() which decrements heap.sp from memory.byteLength
  // down; reserve the top 64 KB exclusively for the painter cpu's ESP.
  const STACK_REGION = 64 * 1024;
  const STACK_TOP = memory.byteLength;
  heap.sp = Math.min(heap.sp, STACK_TOP - STACK_REGION);

  const painters = loadPainterAddresses(opts);
  // Some "painter" addresses are NOT standalone functions — they're internal
  // jump labels of a larger function whose dispatcher prologue does
  // `push eax; push ecx; jmp [edx*4 + tbl]` (where edx = camera-rotation
  // index from DAT_00991f88). The painter body assumes those 2 saves are
  // already on the stack and unwinds them with `pop ecx; pop eax; ret` at
  // its tail. When the bridge invokes the painter directly with a fresh
  // RET_SENTINEL-only stack, the trailing 2 pops read past stackTop and
  // mem32 throws OOB at addr = mem.length (= 0x4ac4000 for default 64MB
  // heap). Affected jumptables: PTR_LAB_004368c8 (4 painters @ 0x4368d8/
  // 0x4368e0/0x4368ec/0x4368ff, common epilogue at 0x436a73) and
  // PTR_LAB_00436a8c (4 painters @ 0x436a9c/0x436aa4/0x436ab0/0x436ac3,
  // common epilogue at 0x436b27). Pre-push two dwords so the epilogue
  // unwinds cleanly back to RET_SENTINEL.
  const NEEDS_PRE_PUSH = new Set([
    0x4368d8, 0x4368e0, 0x4368ec, 0x4368ff,
    0x436a9c, 0x436aa4, 0x436ab0, 0x436ac3,
  ]);
  let bridged = 0;
  for (const addr of painters) {
    const prePush = NEEDS_PRE_PUSH.has(addr) ? 2 : 0;
    state.fnDispatch.set(addr, function _paintShim(_heap, ..._args) {
      // Sync translator regs → cpu.regs. We sync the integer GPRs; eflags
      // and FPU aren't expected to be live across the call boundary.
      cpu.regs.eax = regs.eax >>> 0;
      cpu.regs.ecx = regs.ecx >>> 0;
      cpu.regs.edx = regs.edx >>> 0;
      cpu.regs.ebx = regs.ebx >>> 0;
      cpu.regs.esi = regs.esi >>> 0;
      cpu.regs.edi = regs.edi >>> 0;
      cpu.regs.ebp = regs.ebp >>> 0;
      // Reset eflags and FPU state to avoid cross-call contamination. runFunction
      // only resets esp/eip/callDepth — without this, a conditional jump in the
      // first instructions of the next painter inherits CF/ZF/SF/OF from the
      // previous painter's last ALU op, leading to taken/not-taken paths the
      // binary would never hit. Empirically, leaving eflags dirty pushed EAX
      // into a value that addressed 0x4ac4000 (just past heap end) in 0x4368d8.
      cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
      cpu.fpuTop = 0; cpu.fpuTags = 0xffff; cpu.fpuSw = 0;
      // Pre-push saved regs for jump-target painters (see NEEDS_PRE_PUSH
      // above). Lower stackTop by 8 and write the 2 expected dword slots:
      // memory layout (low → high): [RET_SENTINEL][saved_ecx][saved_eax].
      // We seed with the current EAX/ECX so if the painter accidentally
      // reads them via mov-from-mem they get sane values; the pop sequence
      // restores EAX/ECX to these same values, then ret pops RET_SENTINEL.
      let stackTop = STACK_TOP;
      if (prePush) {
        stackTop = STACK_TOP - 8;
        // [stackTop+0..3] = saved ecx, [stackTop+4..7] = saved eax.
        const m = memory;
        const ax = cpu.regs.eax >>> 0, cx = cpu.regs.ecx >>> 0;
        m[stackTop+0] = cx & 0xff; m[stackTop+1] = (cx>>>8)&0xff; m[stackTop+2] = (cx>>>16)&0xff; m[stackTop+3] = (cx>>>24)&0xff;
        m[stackTop+4] = ax & 0xff; m[stackTop+5] = (ax>>>8)&0xff; m[stackTop+6] = (ax>>>16)&0xff; m[stackTop+7] = (ax>>>24)&0xff;
      }
      try {
        const __steps = runFunction(cpu, addr, { stackTop, limit: globalThis.__painterStepLimit || 50_000_000 });
        // Optional step accounting for the painter-ranking probe. Off unless a
        // probe installs the accumulator map; zero cost in production.
        if (globalThis.__painterSteps) {
          const m = globalThis.__painterSteps;
          const cur = m.get(addr) || { steps: 0, calls: 0 };
          cur.steps += (__steps || 0); cur.calls += 1;
          m.set(addr, cur);
        }
      } catch (e) {
        // Probe-controlled tick unwind (painter-ranking) must propagate, not
        // be swallowed as a painter error.
        if (e && e.__painterDone) throw e;
        // _wildShim is raised by the shim invoker above when a painter
        // computes a bogus CALL target into SHIM_BASE that doesn't match
        // any registered IAT/dynamic sentinel. The painter has already
        // gone off the rails; bail silently rather than logging.
        if (e && e._wildShim) {
          // intentionally silent — see setShimInvoker comment above.
        } else if (typeof console !== "undefined") {
          // cpu.regs.eip still points at (or near) the faulting instruction
          // when a mem* OOB unwinds — invaluable for localizing which
          // instruction inside a bridged function went off the rails.
          console.warn(`[painter-bridge] 0x${addr.toString(16)}: ${(e.message || e).slice(0, 160)} @eip=0x${(cpu.regs.eip >>> 0).toString(16)}`);
        }
      }
      // Sync back. eax holds the return value per Win32/cdecl.
      regs.eax = cpu.regs.eax >>> 0;
      regs.ecx = cpu.regs.ecx >>> 0;
      regs.edx = cpu.regs.edx >>> 0;
      regs.ebx = cpu.regs.ebx >>> 0;
      regs.esi = cpu.regs.esi >>> 0;
      regs.edi = cpu.regs.edi >>> 0;
      regs.ebp = cpu.regs.ebp >>> 0;
      return regs.eax;
    });
    bridged++;
  }

  // 0x439178 — the PEEP sprite painter (@manual JS, ADDENDUM 58). An unlabeled
  // binary fn (no decompiled C) reached via TWO paths (audit finding, ADD.58):
  //   rot 0:   JS chain — 0x436b50 JS override → FUN_00444820 (JS) →
  //            callIndirect through the sprite-type table at 0x6309a0 →
  //            fnDispatch. Covered by the override below.
  //   rot 1-3: interp chain — 0x436bc3/0x436c3d/0x436cb3 run natively; their
  //            in-binary `call 0x444820` → `call [0x6309a0+type*4]` never
  //            consults fnDispatch. Covered by the eip hook below.
  // Both stay behind __forceInterp439178 (the dual-soak differential lever).
  // The fnDispatch wrapper must return regs.eax: the caller does
  // `regs.eax = callIndirect(...)`, and the interp shim returns the synced-back
  // eax — returning undefined here would NaN-poison regs.eax.
  {
    const interpShim439178 = state.fnDispatch.get(0x439178);
    state.fnDispatch.set(0x439178, function _js439178(_heap, ..._args) {
      if (globalThis.__forceInterp439178) {
        if (interpShim439178) return interpShim439178(_heap, ..._args);
        // No shim to fall back to (painter list omitted 0x439178) — a forced-
        // interp differential would silently compare JS against JS. Warn once.
        if (!globalThis.__warned439178NoShim) {
          globalThis.__warned439178NoShim = true;
          if (typeof console !== "undefined") console.warn("[painter-bridge] __forceInterp439178 set but no interp shim exists — running the JS port");
        }
      }
      FUN_00439178(heap);
      return regs.eax >>> 0;
    });
  }

  // eip hook for the interp-native path (camera rotations 1-3, see above).
  // Same template as 0x4415e6/0x5da274: the fn is entered by a real in-binary
  // `call`, so the caller's return address is on the stack and the harness
  // simulates exactly ONE `ret` after the hook returns. The JS body's inner
  // callIndirect → _paintShim runs runFunction on THIS cpu and clobbers
  // esp/eip — snapshot/restore esp around the body so the post-hook ret pops
  // the real return address. Body's own ret = 0x439218 (step-to-ret fallback).
  setEipHook(0x439178, (c) => {
    if (globalThis.__forceInterp439178) {
      const self = getEipHook(0x439178);
      clearEipHook(0x439178);
      const limit = globalThis.__painterStepLimit || 50_000_000;
      try {
        c.regs.eip = 0x439178;
        let n = 0;
        while ((c.regs.eip >>> 0) !== 0x439218) { if (!step(c) || ++n > limit) break; }
      } finally { setEipHook(0x439178, self); }
      return;
    }
    const savedEsp = c.regs.esp >>> 0;
    regs.eax = c.regs.eax >>> 0; regs.ecx = c.regs.ecx >>> 0; regs.edx = c.regs.edx >>> 0;
    regs.ebx = c.regs.ebx >>> 0; regs.esi = c.regs.esi >>> 0; regs.edi = c.regs.edi >>> 0;
    regs.ebp = c.regs.ebp >>> 0;
    try { FUN_00439178(heap); } catch (e) { /* hand-port errors are non-fatal */ }
    c.regs.esp = savedEsp;
    c.regs.eax = regs.eax >>> 0; c.regs.ecx = regs.ecx >>> 0; c.regs.edx = regs.edx >>> 0;
    c.regs.ebx = regs.ebx >>> 0; c.regs.esi = regs.esi >>> 0; c.regs.edi = regs.edi >>> 0;
    c.regs.ebp = regs.ebp >>> 0;
  });

  // 0x5d7503 — the VEHICLE sprite painter (@manual JS), sprite-type 0 of the
  // 0x6309a0 dispatch table — the sibling of 0x439178 above, with the same
  // two reach paths (rot-0 JS chain via FUN_00444820's callIndirect; interp-
  // native chain at rotations 1-3) and the same dual-wire. Differences:
  //   - the JS body transcribes only the generic handler (57/64 shape
  //     indices) + the trivial pop-esi shapes; special shapes (7/31/34/44/63)
  //     and special tails (2/20/44/45) throw. js5d7503CanHandle routes those
  //     sprites to the interpreter from the START — the guard must run
  //     BEFORE the body because the unhandled-TAIL throw only fires after
  //     the paint calls landed (catch-and-rerun would double-paint).
  //   - 0x5d7503 IS in the painter list, so interpShim5d7503 always exists.
  // Both paths stay behind __forceInterp5d7503 (the dual-soak lever).
  {
    const interpShim5d7503 = state.fnDispatch.get(0x5d7503);
    state.fnDispatch.set(0x5d7503, function _js5d7503(_heap, ..._args) {
      if (globalThis.__forceInterp5d7503 || !js5d7503CanHandle(heap, regs.esi >>> 0)) {
        if (interpShim5d7503) return interpShim5d7503(_heap, ..._args);
        if (!globalThis.__warned5d7503NoShim) {
          globalThis.__warned5d7503NoShim = true;
          if (typeof console !== "undefined") console.warn("[painter-bridge] 0x5d7503 wants the interp shim (forced or unhandled shape) but none exists — running the JS port");
        }
      }
      FUN_005d7503(heap);
      return regs.eax >>> 0;
    });
  }

  // eip hook for the interp-native path (camera rotations 1-3). Same esp-
  // snapshot template as 0x439178 above. The native-fallback stop rule
  // differs from 439178's fixed ret address: the untranscribed paths
  // (0x5d8453, tails 0x5d77a6/783c/78a4) exit through rets whose addresses
  // aren't catalogued, so stop when esp is back at its entry value AND the
  // next opcode is a bare `ret` (0xC3) — that is precisely the top-level
  // return about to execute (inner calls/pushes always hold esp below the
  // entry value; push-ret jump idioms sit 4 below). The harness then
  // simulates the actual ret, exactly as for a hook that ran the JS body.
  setEipHook(0x5d7503, (c) => {
    if (globalThis.__forceInterp5d7503 || !js5d7503CanHandle(heap, c.regs.esi >>> 0)) {
      const self = getEipHook(0x5d7503);
      clearEipHook(0x5d7503);
      const limit = globalThis.__painterStepLimit || 50_000_000;
      const espEntry = c.regs.esp >>> 0;
      try {
        c.regs.eip = 0x5d7503;
        let n = 0;
        while (!((c.regs.esp >>> 0) === espEntry && (c.regs.eip >>> 0) < heap.bytes.length && heap.u8(c.regs.eip >>> 0) === 0xc3)) {
          if (!step(c) || ++n > limit) break;
        }
      } finally { setEipHook(0x5d7503, self); }
      return;
    }
    const savedEsp = c.regs.esp >>> 0;
    regs.eax = c.regs.eax >>> 0; regs.ecx = c.regs.ecx >>> 0; regs.edx = c.regs.edx >>> 0;
    regs.ebx = c.regs.ebx >>> 0; regs.esi = c.regs.esi >>> 0; regs.edi = c.regs.edi >>> 0;
    regs.ebp = c.regs.ebp >>> 0;
    try { FUN_005d7503(heap); } catch (e) { /* hand-port errors are non-fatal */ }
    c.regs.esp = savedEsp;
    c.regs.eax = regs.eax >>> 0; c.regs.ecx = regs.ecx >>> 0; c.regs.edx = regs.edx >>> 0;
    c.regs.ebx = regs.ebx >>> 0; c.regs.esi = regs.esi >>> 0; c.regs.edi = regs.edi >>> 0;
    c.regs.ebp = regs.ebp >>> 0;
  });

  // Shared eip-hook template for regs-based JS fn bodies (the 439178/5d7503
  // wire, factored): stage the translator reg cells from the cpu, run the JS
  // body, sync back; the harness's simulated ret then performs the fn's
  // `ret`. Correct for EVERY entry mode — real in-binary call/jmp reach AND
  // runFunction/runBodyFrom sentinel frames AND native fallthrough — because
  // each wired body is ret-terminated on every path, so at entry [esp] is
  // always exactly the slot its own `ret` would pop. __force<hex> = native
  // step-through (the dual-soak differential lever; top-level-ret stop rule:
  // halt at esp==entry && opcode C3/C2, let the harness's ret perform it).
  // onThrow: "interp" reruns the body natively — only valid when the JS
  // throws before any non-idempotent write; "warn" warns once and continues.
  // canHandle (optional): (heap, c) => bool pre-flight guard — false routes
  // the call to the native step-through (for bodies with unported cold arms,
  // the 5d7503/444e08 pattern).
  const installJsFnEipHook = (addr, jsFn, forceFlag, onThrow, canHandle) => {
    const stepThroughNative = (c) => {
      const self = getEipHook(addr);
      clearEipHook(addr);
      const limit = globalThis.__painterStepLimit || 50_000_000;
      const espEntry = c.regs.esp >>> 0;
      try {
        c.regs.eip = addr >>> 0;
        let n = 0;
        while (!((c.regs.esp >>> 0) === espEntry && (c.regs.eip >>> 0) < heap.bytes.length
                 && (heap.u8(c.regs.eip >>> 0) === 0xc3 || heap.u8(c.regs.eip >>> 0) === 0xc2))) {
          if (!step(c) || ++n > limit) break;
        }
      } finally { setEipHook(addr, self); }
    };
    setEipHook(addr, (c) => {
      if (globalThis[forceFlag] || (canHandle && !canHandle(heap, c))) { stepThroughNative(c); return; }
      const savedEsp = c.regs.esp >>> 0;
      regs.eax = c.regs.eax >>> 0; regs.ecx = c.regs.ecx >>> 0; regs.edx = c.regs.edx >>> 0;
      regs.ebx = c.regs.ebx >>> 0; regs.esi = c.regs.esi >>> 0; regs.edi = c.regs.edi >>> 0;
      regs.ebp = c.regs.ebp >>> 0;
      // esp too: a body with an embedded-interp fallback (4254e0) must run
      // the real bytes on the CURRENT stack, not a stale regs.esp.
      regs.esp = savedEsp;
      try {
        // Auto-translated bodies RETURN their eax (the callIndirect
        // convention: callers do `regs.eax = fn(heap)`); @manual bodies set
        // regs directly and return undefined (or their eax, equivalently).
        // Discarding the return value broke 0x4314ed (a popcount RETURNED
        // in AX — caller read stale eax; caught by the generic lockstep's
        // eaxMis and a diverged dual-soak).
        const ret = jsFn(heap);
        if (typeof ret === "number") regs.eax = ret >>> 0;
      } catch (e) {
        if (onThrow === "interp") { c.regs.esp = savedEsp; stepThroughNative(c); return; }
        const warned = `__warned_${addr.toString(16)}`;
        if (!globalThis[warned]) {
          globalThis[warned] = true;
          if (typeof console !== "undefined") console.warn(`[painter-bridge] 0x${addr.toString(16)} JS body threw: ${(e.message || e).slice(0, 160)}`);
        }
      }
      c.regs.esp = savedEsp;
      c.regs.eax = regs.eax >>> 0; c.regs.ecx = regs.ecx >>> 0; c.regs.edx = regs.edx >>> 0;
      c.regs.ebx = regs.ebx >>> 0; c.regs.esi = regs.esi >>> 0; c.regs.edi = regs.edi >>> 0;
      c.regs.ebp = regs.ebp >>> 0;
    });
  };

  // 0x422a90 — tile-corner-heights setter dispatch, a mid-block label of the
  // unlabeled 0x421d2c terrain body. Reached via extra_paint_421d2c's
  // runBodyFrom(0x00422a90) cliff branch AND by native fallthrough at
  // 0x422a89 during runBodyFrom(0x004225e9) runs — in both cases [esp] holds
  // the slot the case body's own `ret` would pop (sentinel resp. the real
  // return address), so the simulated ret is exact. The body's only throw is
  // an out-of-range ebx (garbage jumptable target); its only prior write is
  // an idempotent OR, so an interp rerun is byte-safe.
  installJsFnEipHook(0x422a90, FUN_00422a90, "__forceInterp422a90", "interp");

  // 0x43a5f8 — peep-state 6 (queuing) handler, vtable PTR_0062d4ac[6],
  // reached only via FUN_00439822's dispatch tail `jmp [edi*4+0x62d4ac]`
  // (in-binary; [esp] there = 439822's caller's return address, which is
  // exactly where the handler's ret goes). All callees run via callNative.
  installJsFnEipHook(0x43a5f8, FUN_0043a5f8, "__forceInterp43a5f8", "warn");

  // 0x43a74b — peep-state 4 dispatcher (movzx sub-state + tail-jmp into the
  // 0x62d50c handler family, bridged via callNative). Same reach as 43a5f8.
  installJsFnEipHook(0x43a74b, FUN_0043a74b, "__forceInterp43a74b", "warn");

  // 0x4254e0 — ENTRANCE-element per-tile painter (vtable slot 4 of
  // PTR_LAB_00628a94, dispatched from FUN_extra_paint_4368d8; ADDENDUM 63).
  // JS covers ride EXITS (case 1) and park-entrance SIDE POSTS (case 2,
  // e5lo 1/2); the fn routes ride entrances (case 0), the park-sign middle
  // (runs the 458bcf/458a7c/45a95d string trio — real bodies must run) and
  // the shade-overlay arm through its embedded interpreter INTERNALLY (the
  // 444e08-orchestrator pattern), so the lockstep oracle exercises the same
  // routing production does.
  installJsFnEipHook(0x4254e0, FUN_004254e0, "__forceInterp4254e0", "warn");

  // 0x43c2ec — peep ride sub-state 9 (walk to platform), entry 9 of the
  // 0x62d50c sub-state table, reached via the 43a74b bridge's callNative
  // tail-jmp (and natively wherever the table dispatch runs raw). A
  // sequencer over five callNative-delegated callees with two CF-across-call
  // branches read from the live cpu flags (ADDENDUM 64).
  installJsFnEipHook(0x43c2ec, FUN_0043c2ec, "__forceInterp43c2ec", "warn");

  // 0x5e53ca — sprite bbox invalidate (pushal/popal: preserves every GP reg;
  // no caller reads its exit flags). ~124 interp steps/call from the native
  // `call 0x5e53ca` sites and the 43a5f8/43c2ec callNative bridges (ADD 65).
  installJsFnEipHook(0x5e53ca, FUN_005e53ca, "__forceInterp5e53ca", "warn");

  // 0x43d38b — peep tile z-height helper (@manual JS rewritten from asm,
  // ADDENDUM ~58-era; lockstep-validated 123 calls memMis=0 eaxMis=0). The
  // (bl&0x18)!=0 arm tail-calls the 0x423677 slope LUT via callNative inside
  // the JS. Reached via callNative from the peepwalk JS AND native call
  // sites; was ~219 interp steps/tick unhooked (ADDENDUM 66).
  installJsFnEipHook(0x43d38b, FUN_0043d38b, "__forceInterp43d38b", "warn");

  // 0x5ddcbe — vehicle breakdown-eligibility check (@manual JS; lockstep
  // 48 calls memMis=0; caller discards exit regs). Was ~64 steps/tick.
  installJsFnEipHook(0x5ddcbe, FUN_005ddcbe, "__forceInterp5ddcbe", "warn");

  // 0x4314ed — popcount of two dword globals returned in AX (~194 interp
  // steps/tick via callNative from the 424e0f sim step). Auto-translation,
  // bespoke-oracle-validated since ADD 18; hook added in ADD 66.
  installJsFnEipHook(0x4314ed, FUN_004314ed, "__forceInterp4314ed", "warn");

  // 0x43a3a8 — peep-state 13 (leaving via the park exit): walking-core /
  // exit-march sequencer with one CF-across-call branch (ADDENDUM 68).
  installJsFnEipHook(0x43a3a8, FUN_0043a3a8, "__forceInterp43a3a8", "warn");

  // 0x5d99a2 — vehicle status 1 "waiting for passengers", vtable slot 1 of
  // PTR_LAB_005d97b4 (the sprite-update walk's per-state dispatch; slot 4 is
  // the wired extra_vehicle_5da274). The organically-hot dh==1 arm runs as
  // pure JS; the dh!=1 arms and the rare depart continuation route through
  // the fn's OWN embedded-interp fallback (444e08 orchestrator pattern), so
  // no wiring-level guard is needed here (ADDENDUM 72).
  installJsFnEipHook(0x5d99a2, FUN_005d99a2, "__forceInterp5d99a2", "warn");

  // 0x42a830 — window event proc: JS handles the unhandled-event
  // fall-through (the only shape the soak produces, ~19 interp steps/call);
  // matched events route through the fn's own embedded interp (ADDENDUM 73).
  installJsFnEipHook(0x42a830, FUN_0042a830, "__forceInterp42a830", "warn");

  // 0x5e2b52 — tooltip/hover dwell timer (input subsystem). The JS covers the
  // dwell-accumulate path (the only shape the gameplay soak produces); the
  // cx 1/3 arms, the widget block (16-bit div + indirect call [esi+4]) and
  // the already-hovered branch route through its embedded interp (ADD 74).
  installJsFnEipHook(0x5e2b52, FUN_005e2b52, "__forceInterp5e2b52", "warn");

  // 0x5e3652 — tooltip show/refresh (batch-oracle CLEAN 30/30; no caller
  // consumes its exit flags — the 5e2b52 site proceeds unconditionally).
  installJsFnEipHook(0x5e3652, FUN_005e3652, "__forceInterp5e3652", "warn");

  // 0x43c210 — peep ride sub-state 8 (walk to boarding position); a
  // callNative sequencer with one CF-across-call branch, hands off to
  // sub-state 9 (43c2ec) at exit (ADDENDUM 86).
  installJsFnEipHook(0x43c210, FUN_0043c210, "__forceInterp43c210", "warn");

  // 0x4264f6 / 0x449178 — map-animation type-0 (ride entrance) and type-1
  // (path queue banner) handlers, entries 0/1 of the 0x628ab0 vtable,
  // reached via FUN_00436508's callIndirect (no fnDispatch JS => _paintShim
  // runFunction => these entry hooks). Exit CF is the caller's dequeue
  // contract — both bodies set the painter cpu's eflags exactly as the
  // binary's exit ops (stc resp. and eax,eax) leave them (ADDENDUM 71).
  installJsFnEipHook(0x4264f6, FUN_004264f6, "__forceInterp4264f6", "warn");
  installJsFnEipHook(0x449178, FUN_00449178, "__forceInterp449178", "warn");

  // 0x43a73f — peep states 2 AND 7 share this 2-instruction sub-state
  // dispatcher; it is byte-for-byte the same `movzx edi,[esi+0x2c] ;
  // jmp [edi*4+0x62d50c]` as 0x43a74b, so the same JS bridge body serves
  // both addresses (ADDENDUM 68).
  installJsFnEipHook(0x43a73f, FUN_0043a74b, "__forceInterp43a73f", "warn");

  // Generic native call with STACK arguments (cdecl, caller-cleans) —
  // for delegating translated functions that take JS stack params (the
  // plain _paintShim only covers regs-based conventions). Args are
  // written at [stackTop], [stackTop+4], ... and runFunction puts
  // RET_SENTINEL at [stackTop-4], exactly the layout a `push args; call`
  // sequence leaves. Caller-cleanup means nothing to pop afterwards —
  // the wrapper's stack is discarded wholesale.
  _callNativeImpl = (addr, args) => {
    cpu.regs.eax = regs.eax >>> 0;
    cpu.regs.ecx = regs.ecx >>> 0;
    cpu.regs.edx = regs.edx >>> 0;
    cpu.regs.ebx = regs.ebx >>> 0;
    cpu.regs.esi = regs.esi >>> 0;
    cpu.regs.edi = regs.edi >>> 0;
    cpu.regs.ebp = regs.ebp >>> 0;
    cpu.eflags.CF = 0; cpu.eflags.ZF = 0; cpu.eflags.SF = 0; cpu.eflags.OF = 0;
    cpu.fpuTop = 0; cpu.fpuTags = 0xffff; cpu.fpuSw = 0;
    const stackTop = (STACK_TOP - 0x40) >>> 0; // room for args + slack
    for (let i = 0; i < args.length; i++) {
      const v = args[i] >>> 0, a = stackTop + i * 4;
      memory[a] = v & 0xff; memory[a + 1] = (v >>> 8) & 0xff;
      memory[a + 2] = (v >>> 16) & 0xff; memory[a + 3] = (v >>> 24) & 0xff;
    }
    try {
      runFunction(cpu, addr >>> 0, { stackTop, limit: globalThis.__painterStepLimit || 50_000_000 });
    } catch (e) {
      if (e && e.__painterDone) throw e;
      if (!(e && e._wildShim) && typeof console !== "undefined") {
        console.warn(`[painter-bridge] callNative 0x${(addr >>> 0).toString(16)}: ${(e.message || e).slice(0, 160)} @eip=0x${(cpu.regs.eip >>> 0).toString(16)}`);
      }
    }
    regs.eax = cpu.regs.eax >>> 0;
    regs.ecx = cpu.regs.ecx >>> 0;
    regs.edx = cpu.regs.edx >>> 0;
    regs.ebx = cpu.regs.ebx >>> 0;
    regs.esi = cpu.regs.esi >>> 0;
    regs.edi = cpu.regs.edi >>> 0;
    regs.ebp = cpu.regs.ebp >>> 0;
    return regs.eax;
  };

  return bridged;
}

// callNative(addr, args) — run a CODESEG function through the bridge
// interpreter with cdecl STACK arguments. Available after
// installPainterBridge has run (i.e. after createRuntime).
let _callNativeImpl = null;
export function callNative(addr, args = []) {
  if (!_callNativeImpl) {
    throw new Error("painter-bridge callNative: bridge not installed (createRuntime first)");
  }
  return _callNativeImpl(addr, args);
}
