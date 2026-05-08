// Validate runtime/ghidra-builtins.js against the semantics defined in
// Ghidra's decompiler (Decompiler/source/ghidra_help/decompile.htm).
//
// We test:
//   - CONCATxx: bit composition matches mask + shift
//   - CARRYx: matches a reference unsigned-overflow oracle
//   - SBORROWx: matches reference signed-subtract OF after a-b
//   - SCARRYx: matches reference signed-add OF after a+b
//
// Reference oracles use BigInt to avoid double-precision quirks.

import { describe, it, expect } from "vitest";
import fc from "fast-check";

import {
  CONCAT11, CONCAT12, CONCAT13, CONCAT14,
  CONCAT21, CONCAT22, CONCAT24,
  CONCAT31, CONCAT44,
  CARRY1, CARRY2, CARRY4,
  SBORROW2, SBORROW4,
  SCARRY2, SCARRY4,
  LOCK, RtlUnwind, Arguments, ExceptionList,
} from "../../runtime/ghidra-builtins.js";

const u8  = fc.integer({ min: 0, max: 0xff });
const u16 = fc.integer({ min: 0, max: 0xffff });
const u24 = fc.integer({ min: 0, max: 0xffffff });
const u32 = fc.integer({ min: 0, max: 0xffffffff });

describe("CONCAT helpers", () => {
  it("CONCAT11 == ((hi&0xff)<<8) | (lo&0xff)", () => {
    fc.assert(fc.property(u8, u8, (h, l) => CONCAT11(h, l) === (((h & 0xff) << 8) | (l & 0xff))));
  });
  it("CONCAT12 == ((hi&0xff)<<16) | (lo&0xffff)", () => {
    fc.assert(fc.property(u8, u16, (h, l) =>
      CONCAT12(h, l) === ((((h & 0xff) << 16) | (l & 0xffff)) >>> 0)));
  });
  it("CONCAT13 == ((hi&0xff)<<24) | (lo&0xffffff)", () => {
    fc.assert(fc.property(u8, u24, (h, l) =>
      CONCAT13(h, l) === ((((h & 0xff) << 24) | (l & 0xffffff)) >>> 0)));
  });
  it("CONCAT14 == hi*2^32 + lo (40-bit)", () => {
    fc.assert(fc.property(u8, u32, (h, l) =>
      CONCAT14(h, l) === (h & 0xff) * 0x100000000 + (l >>> 0)));
  });
  it("CONCAT21 == ((hi&0xffff)<<8) | (lo&0xff)", () => {
    fc.assert(fc.property(u16, u8, (h, l) =>
      CONCAT21(h, l) === ((((h & 0xffff) << 8) | (l & 0xff)) >>> 0)));
  });
  it("CONCAT22 == ((hi&0xffff)<<16) | (lo&0xffff)", () => {
    fc.assert(fc.property(u16, u16, (h, l) =>
      CONCAT22(h, l) === ((((h & 0xffff) << 16) | (l & 0xffff)) >>> 0)));
  });
  it("CONCAT24 == hi*2^32 + lo (48-bit)", () => {
    fc.assert(fc.property(u16, u32, (h, l) =>
      CONCAT24(h, l) === (h & 0xffff) * 0x100000000 + (l >>> 0)));
  });
  it("CONCAT31 packs 24+8 into 32", () => {
    fc.assert(fc.property(u24, u8, (h, l) => {
      const expected = ((((h & 0xffffff) << 8) >>> 0) | (l & 0xff)) >>> 0;
      return CONCAT31(h, l) === expected;
    }));
  });
  it("CONCAT44 == hi*2^32 + lo (Number, lossy beyond 53 bits)", () => {
    // Test only with hi values that don't push us past 53 mantissa bits.
    fc.assert(fc.property(fc.integer({ min: 0, max: 0xfffff }), u32, (h, l) =>
      CONCAT44(h, l) === (h >>> 0) * 0x100000000 + (l >>> 0)));
  });
});

describe("CARRY helpers — unsigned overflow flag for a+b", () => {
  it("CARRY1 fires iff a+b > 0xff", () => {
    fc.assert(fc.property(u8, u8, (a, b) =>
      CARRY1(a, b) === ((((a & 0xff) + (b & 0xff)) > 0xff) ? 1 : 0)));
  });
  it("CARRY2 fires iff a+b > 0xffff", () => {
    fc.assert(fc.property(u16, u16, (a, b) =>
      CARRY2(a, b) === ((((a & 0xffff) + (b & 0xffff)) > 0xffff) ? 1 : 0)));
  });
  it("CARRY4 fires iff a+b > 0xffffffff (BigInt oracle)", () => {
    fc.assert(fc.property(u32, u32, (a, b) => {
      const sum = BigInt(a >>> 0) + BigInt(b >>> 0);
      return CARRY4(a, b) === (sum > 0xffffffffn ? 1 : 0);
    }));
  });
});

// Reference impls of the OF flag for SUB / ADD using BigInt for clarity.
function refSborrow(a, b, bits) {
  const mask = (1n << BigInt(bits)) - 1n;
  const signBit = 1n << BigInt(bits - 1);
  const sa = BigInt(a) & mask, sb = BigInt(b) & mask;
  const r = (sa - sb) & mask;
  return (((sa ^ sb) & (sa ^ r)) & signBit) !== 0n ? 1 : 0;
}
function refScarry(a, b, bits) {
  const mask = (1n << BigInt(bits)) - 1n;
  const signBit = 1n << BigInt(bits - 1);
  const sa = BigInt(a) & mask, sb = BigInt(b) & mask;
  const r = (sa + sb) & mask;
  return ((~(sa ^ sb) & (sa ^ r)) & signBit) !== 0n ? 1 : 0;
}

describe("SBORROW — signed overflow flag for a-b", () => {
  it("SBORROW2 matches reference (16-bit)", () => {
    fc.assert(fc.property(u16, u16, (a, b) => SBORROW2(a, b) === refSborrow(a, b, 16)));
  });
  it("SBORROW4 matches reference (32-bit)", () => {
    fc.assert(fc.property(u32, u32, (a, b) => SBORROW4(a, b) === refSborrow(a, b, 32)));
  });
});

describe("SCARRY — signed overflow flag for a+b", () => {
  it("SCARRY2 matches reference (16-bit)", () => {
    fc.assert(fc.property(u16, u16, (a, b) => SCARRY2(a, b) === refScarry(a, b, 16)));
  });
  it("SCARRY4 matches reference (32-bit)", () => {
    fc.assert(fc.property(u32, u32, (a, b) => SCARRY4(a, b) === refScarry(a, b, 32)));
  });
});

describe("placeholder helpers", () => {
  it("LOCK is a no-op returning undefined", () => {
    expect(LOCK()).toBe(undefined);
  });
  it("RtlUnwind is a no-op returning undefined", () => {
    expect(RtlUnwind()).toBe(undefined);
  });
  it("Arguments returns 0", () => {
    expect(Arguments()).toBe(0);
  });
  it("ExceptionList returns 0", () => {
    expect(ExceptionList()).toBe(0);
  });
});
