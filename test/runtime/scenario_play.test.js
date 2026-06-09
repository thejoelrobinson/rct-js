// enterScenarioPlay() enters genuine scenario-play without wiping the world.
//
// The harness's runInit loads the scenario (FUN_0042f4be) but leaves the
// play-mode bit (0x99a500 bit0) CLEARED, so the world is loaded-but-frozen.
// enterScenarioPlay() sets the play bit + opens the sprite-update gate
// (skipTitleIntro) WITHOUT calling the world-destructive FUN_00438a1f/444a79.
// This test asserts: the play bit is set, the loaded world is preserved (the
// sprite tile-grid at 0x991f8e is unchanged, owned terrain tiles still
// resolve), and the sim animates over ticks (sprite array evolves).

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

describe("enterScenarioPlay — genuine play without wiping the world", () => {
  let heap, runtime, before;

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

    const { createRuntime, skipFadeIn, enterScenarioPlay } = await import("../../runtime/harness.js");
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
    heap = runtime.heap;

    before = {
      gridCount: gridCount(),
      ownedTile: findOwnedTile(),
    };
    enterScenarioPlay(heap);
  }, 120_000);

  function gridCount() {
    let c = 0;
    for (let i = 0; i < 16384; i++) if (heap.u16(0x991f8e + i * 2) !== 0xffff) c++;
    return c;
  }
  function surfaceElem(tx, ty) {
    const head = heap.u32(0x00971ef4 + (tx + ty * 128) * 4);
    if (head < 0x6e3b90 || head > 0x8dc08c) return 0;
    let p = head;
    while ((heap.u8(p + 1) & 0x80) === 0 && (heap.u8(p) & 0x3c) !== 0) p += 8;
    return (heap.u8(p) & 0x3c) === 0 ? p : 0;
  }
  function findOwnedTile() {
    for (let y = 0; y < 256; y++) for (let x = 0; x < 128; x++) {
      const p = surfaceElem(x, y);
      if (p && (heap.u8(p + 7) & 0x20) && (heap.u8(p + 4) & 0x1f) === 0 && heap.u8(p + 3) >= 8) {
        return { x, y, surf: p };
      }
    }
    return null;
  }
  function spriteHash() {
    const b = heap.bytes; let x = 0x811c9dc5 >>> 0;
    for (let i = 0x743b94; i < 0x743b94 + 5000 * 0x100; i += 37) { x ^= b[i]; x = Math.imul(x, 0x01000193) >>> 0; }
    return x >>> 0;
  }

  it("sets the play-mode bit (0x99a500 & 1)", () => {
    expect(heap.u32(0x0099a500) & 1).toBe(1);
  });

  it("preserves the loaded world (sprite tile-grid not wiped, terrain still resolves)", () => {
    // The 0x991f8e bucket count must be unchanged — a careless 438a1f/444a79
    // would zero it (empty free-list).
    expect(gridCount()).toBe(before.gridCount);
    expect(before.ownedTile).not.toBeNull();
    // The same owned terrain tile must still resolve to a surface element.
    const p = surfaceElem(before.ownedTile.x, before.ownedTile.y);
    expect(p).toBe(before.ownedTile.surf);
  });

  it("the simulation animates over ticks (sprite array evolves) and stays fast", () => {
    const h0 = spriteHash();
    let maxMs = 0;
    for (let i = 0; i < 8; i++) {
      const t = process.hrtime.bigint();
      try { runtime.runTick(); } catch (_) { /* painter-bridge noise non-fatal */ }
      maxMs = Math.max(maxMs, Number(process.hrtime.bigint() - t) / 1e6);
    }
    expect(spriteHash()).not.toBe(h0); // the world is live, not frozen
    expect(maxMs).toBeLessThan(2000);  // no runaway in the stable window
  }, 60_000);
});
