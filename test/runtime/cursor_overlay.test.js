// Cursor overlay: presentFrame() draws a sprite at inputState.cursorX/Y on
// top of the main DIB blit. Without this overlay, the cursor is invisible
// even though GetCursorPos returns the live coords (the native render path
// for the cursor sprite isn't reached in our harness).
//
// Test strategy: build a synthetic 640x480 DDraw surface in a fake heap,
// register a fake palette, mount a mock canvas/ctx, and call presentFrame
// twice with two distinct cursor coords. Assert that:
//   1. presentFrame returns true (a frame was drawn)
//   2. the pixel at (cursorX, cursorY) differs from the empty-surface
//      baseline — i.e. the overlay drew something
//   3. moving the cursor changes which pixel is "lit"

import { describe, it, expect, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { presentFrame, _resetCursorCache } from "../../runtime/canvas.js";
import { state, setRuntimeContext } from "../../runtime/win32/context.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");

// Minimal mock canvas/ctx capturing putImageData output. createImageData
// returns a fresh ImageData-shaped object so presentFrame can write into it.
function makeMockCanvas(w, h) {
  const canvas = { width: w, height: h };
  let lastImageData = null;
  const ctx = {
    createImageData(W, H) {
      return { width: W, height: H, data: new Uint8ClampedArray(W * H * 4) };
    },
    putImageData(img /* x, y */) {
      // Keep the final blit so the test can sample pixels.
      lastImageData = img;
    },
    get _last() { return lastImageData; },
  };
  return { canvas, ctx, getLast: () => lastImageData };
}

// Pixel sampler for a flat RGBA buffer at (x, y).
function pixelAt(img, x, y) {
  const off = (y * img.width + x) * 4;
  return [img.data[off], img.data[off + 1], img.data[off + 2], img.data[off + 3]];
}

describe("cursor overlay in presentFrame", () => {
  let heap;
  const W = 640, H = 480;
  const surfAddr = 0x100;
  const surfSize = W * H;

  beforeEach(() => {
    _resetCursorCache();
    // Reset shared state — clear surfaces from prior tests.
    state.ddrawSurfaces.clear();
    state.dibSections.length = 0;
    state.capturedPalette = null;

    // Build a synthetic 640x480 8-bit surface filled with palette index 5
    // (something non-zero so it survives the "isPrimary" filter).
    const memory = new Uint8Array(surfAddr + surfSize + 16);
    memory.fill(5, surfAddr, surfAddr + surfSize);
    heap = { bytes: memory };

    state.ddrawSurfaces.set(surfAddr, {
      width: W, height: H, pitch: W, bytes: surfAddr, isPrimary: true,
    });

    // Wire VFS so the cursor sprite can decode. Load real csg1 assets if
    // available; otherwise the fallback path (5x5 white square) still
    // satisfies the "pixel changed" assertion.
    const vfs = new Map();
    try {
      vfs.set("csg1.dat", readFileSync(resolve(ROOT, "web/assets/csg1.dat")));
      vfs.set("csg1i.dat", readFileSync(resolve(ROOT, "web/assets/csg1i.dat")));
    } catch (_) { /* fall back to placeholder cursor */ }
    setRuntimeContext({ vfs });

    // Provide a deterministic palette where index 5 (background) is distinct
    // from indices the cursor sprite is likely to use, and 0xfe (fallback) is
    // pure white. This lets the test detect any overlay write.
    const pal = new Uint8ClampedArray(256 * 4);
    for (let i = 0; i < 256; i++) {
      pal[i * 4] = (i * 7) & 0xff;
      pal[i * 4 + 1] = (i * 13) & 0xff;
      pal[i * 4 + 2] = (i * 19) & 0xff;
      pal[i * 4 + 3] = 255;
    }
    pal[0xfe * 4] = 255; pal[0xfe * 4 + 1] = 255; pal[0xfe * 4 + 2] = 255;
    pal[5 * 4] = 35; pal[5 * 4 + 1] = 91; pal[5 * 4 + 2] = 95; // background
    state.capturedPalette = pal;

    // Install fresh inputState (the real one is mounted by runtime/input.js
    // at module load — here we attach directly to bypass DOM.)
    state.inputState = { cursorX: 0, cursorY: 0, keysDown: new Uint8Array(256), mouseButtons: 0 };
  });

  it("returns true and draws the surface to the canvas", () => {
    const { canvas, ctx, getLast } = makeMockCanvas(W, H);
    state.inputState.cursorX = 100;
    state.inputState.cursorY = 50;
    const ok = presentFrame(heap, canvas, ctx);
    expect(ok).toBe(true);
    const img = getLast();
    expect(img).not.toBeNull();
    expect(img.width).toBe(W);
    expect(img.height).toBe(H);

    // Background pixel far from the cursor should reflect palette[5].
    const bg = pixelAt(img, 400, 400);
    expect([bg[0], bg[1], bg[2]]).toEqual([35, 91, 95]);
  });

  it("overlays a visible cursor at (cursorX, cursorY)", () => {
    const { canvas, ctx, getLast } = makeMockCanvas(W, H);
    state.inputState.cursorX = 100;
    state.inputState.cursorY = 50;
    presentFrame(heap, canvas, ctx);
    const img = getLast();

    // Scan a small neighbourhood around the cursor — sprite hotspot offset
    // moves the actual blit a few pixels relative to (cursorX, cursorY),
    // and the fallback square is 5x5 centered on it. Either way SOMETHING
    // in this window must differ from the uniform background.
    const bgR = 35, bgG = 91, bgB = 95;
    let changed = 0;
    for (let dy = -32; dy <= 32; dy++) {
      for (let dx = -32; dx <= 32; dx++) {
        const x = 100 + dx, y = 50 + dy;
        if (x < 0 || x >= W || y < 0 || y >= H) continue;
        const [r, g, b] = pixelAt(img, x, y);
        if (r !== bgR || g !== bgG || b !== bgB) changed++;
      }
    }
    expect(changed).toBeGreaterThan(0);
  });

  it("moving the cursor moves the overlay", () => {
    const { canvas, ctx, getLast } = makeMockCanvas(W, H);
    const bgR = 35, bgG = 91, bgB = 95;

    function countChangedNear(img, cx, cy, radius = 32) {
      let n = 0;
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const x = cx + dx, y = cy + dy;
          if (x < 0 || x >= W || y < 0 || y >= H) continue;
          const [r, g, b] = pixelAt(img, x, y);
          if (r !== bgR || g !== bgG || b !== bgB) n++;
        }
      }
      return n;
    }

    // First pose: cursor at (100, 50). Sprite lights pixels near there.
    state.inputState.cursorX = 100;
    state.inputState.cursorY = 50;
    presentFrame(heap, canvas, ctx);
    const img1 = getLast();
    const nearOld_1 = countChangedNear(img1, 100, 50);
    expect(nearOld_1).toBeGreaterThan(0);

    // Reset the surface for frame 2 — presentFrame reads heap.bytes fresh,
    // but the overlay above modified _imageData; subsequent presentFrame
    // overwrites it via the row loop, so we don't have to clear it.
    state.inputState.cursorX = 500;
    state.inputState.cursorY = 300;
    presentFrame(heap, canvas, ctx);
    const img2 = getLast();

    // Pixels near the OLD location should now be background again (no
    // sprite there anymore — surface is uniform, overlay moved away).
    const nearOld_2 = countChangedNear(img2, 100, 50);
    expect(nearOld_2).toBe(0);

    // Pixels near the NEW location should now be lit.
    const nearNew_2 = countChangedNear(img2, 500, 300);
    expect(nearNew_2).toBeGreaterThan(0);
  });
});
