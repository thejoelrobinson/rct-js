// Native-boot regression: confirms FUN_00401000 reaches its main game loop
// without throwing — i.e. the entry function, FUN_00402bd5 (init),
// FUN_00401120 (more init), and registry probing all succeed, and the
// outer `while (FUN_00403c2a()) { FUN_00402bef(); FUN_004385d8(); ... }`
// loop is reachable.
//
// We can't run FUN_00401000 directly because FUN_004385d8 (the binary's
// main game tick) runs indefinitely without a WM_QUIT message. Instead
// we exercise each step the entry calls before that, plus FUN_00403c2a
// which is the message-pump check.

import { describe, it, expect, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { createRuntime } from "../../runtime/harness.js";
import { dispatch } from "../../ported/auto/_dispatch.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../..");
const dataBin = readFileSync(resolve(ROOT, "decompiled/data.bin"));

let runtime;
beforeEach(() => {
  runtime = createRuntime({ dataBin });
});

describe("native boot regression", () => {
  it("FUN_00402bd5 (early init) returns cleanly", () => {
    const fn = dispatch.get(0x402bd5);
    expect(fn).toBeDefined();
    expect(() => fn(runtime.heap)).not.toThrow();
  });

  it("FUN_00401120 (init pass 2) returns cleanly", () => {
    const fn = dispatch.get(0x401120);
    expect(fn).toBeDefined();
    expect(() => fn(runtime.heap, 0)).not.toThrow();
  });

  it("FUN_00403c2a (message pump probe) returns cleanly", () => {
    const fn = dispatch.get(0x403c2a);
    expect(fn).toBeDefined();
    let result;
    expect(() => { result = fn(runtime.heap); }).not.toThrow();
    expect(typeof result).not.toBe("undefined");
  });

  it("dispatch table is fully populated", () => {
    expect(dispatch.size).toBe(1227);
    // Sanity: FUN_00401000 is at the top
    expect(dispatch.has(0x401000)).toBe(true);
    expect(dispatch.has(0x4385d8)).toBe(true);
    expect(dispatch.has(0x5df40c)).toBe(true);
  });
});
