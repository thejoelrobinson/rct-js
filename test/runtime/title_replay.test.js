// TAS-style frame-hash replay test. Boots the runtime, runs a scripted tick
// sequence, and asserts the back-buffer hashes match the committed fixture.
//
// Any rendering-chain change that mutates visible pixels will fail this
// test. To intentionally update the fixture (after verifying the new pixels
// are correct): `node tools/capture-replay-hashes.js`.

import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { bootAndHash } from "../../tools/lib/replay-runner.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../..");

describe("title-screen frame-hash replay", () => {
  // 5 minutes is generous — full 30-tick boot completes in <20s on this
  // machine, but we don't want CI flakes on slower runners.
  it("back-buffer hashes match the committed fixture", async () => {
    const fixture = JSON.parse(readFileSync(
      resolve(ROOT, "test/fixtures/title-screen-replay.json"), "utf8"));
    const tickSamples = Object.keys(fixture.ticks).map((s) => parseInt(s, 10)).sort((a, b) => a - b);

    const { ticks } = await bootAndHash({ tickSamples });

    for (const t of tickSamples) {
      expect(ticks[t], `tick ${t} hash`).toBe(fixture.ticks[t]);
    }
  }, 300_000);
});
