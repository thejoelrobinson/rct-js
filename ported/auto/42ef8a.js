// @manual — do not regenerate.
//
// Source: decompiled/c/42ef8a.c — the master asset-load loop.
//
// Iterates file index 0..0x16 (0..22), for each: builds path via 0x42f239
// (which reads the index from regs.ebx) and opens via 0x4083b5. Closes
// the handle immediately after open — purpose is to validate all assets
// are present and to populate filename caches. On failure, tries an
// alternate path; on second failure, hits the "missing-files" popup
// (which we skip).
//
// The auto-translated version had three broken backward gotos
// (LAB_0042f06b loop, LAB_0042f134 close, LAB_0042f13f increment) which
// caused the function to return after the first iteration — leaving 22
// of 23 files unopened and the asset table empty.

import { regs } from "../../runtime/regs.js";
import { FUN_004039bc } from "./4039bc.js";
import { FUN_00405653 } from "./405653.js";
import { FUN_00405949 } from "./405949.js";
import { FUN_00408387 } from "./408387.js";
import { FUN_004083b5 } from "./4083b5.js";
import { FUN_0042f199 } from "./42f199.js";
import { FUN_0042f1d3 } from "./42f1d3.js";
import { FUN_0042f239 } from "./42f239.js";
import { FUN_00458bcf } from "./458bcf.js";
import { FUN_005df472 } from "./5df472.js";

// Build "<prefix><suffix>\0" at dst by copying NUL-terminated prefix from
// `prefixAddr`, then appending NUL-terminated suffix from `suffixAddr`.
// Used to recreate 42ef8a's path-concatenation loops without registry data.
function _buildPath(heap, dst, prefixAddr, suffixAddr) {
  let w = dst;
  if (prefixAddr) {
    while (true) {
      const c = heap.u8(prefixAddr++);
      if (c === 0) break;
      heap.setU8(w++, c);
    }
  }
  while (true) {
    const c = heap.u8(suffixAddr++);
    heap.setU8(w++, c);
    if (c === 0) break;
  }
}

export function FUN_0042ef8a(heap) {
  // Try registry path probe; on miss, zero the path bufs (binary's behaviour).
  const iVar2_probe = FUN_00405653(heap, 0x005f8540, 0x005f8850) >>> 0;
  if (iVar2_probe === 0) {
    heap.setU32(0x005f8648, 0);
    heap.setU32(0x005f874c, 0);
    heap.setU32(0x005f8540, 0);
  } else {
    // Path-build chain (string copies). Skip — only matters if registry hit.
    // (Original C does several do-while string concatenations here.)
  }
  // Always populate the four path-pattern buffers (registry hit or miss).
  // Downstream functions (FUN_0042fdf4 Track enumeration, FUN_0042eae0
  // Scenarios-dir scan) walk DAT_005f8fb3 byte-by-byte looking for the '*'
  // wildcard char that the binary's path-concatenation embeds. With empty
  // strings these loops never terminate — runInit's pre-tick FUN_004385d8
  // call hangs in FUN_0042fdf4's first do-while (cVar1 stays 0, never == 42).
  // In the registry-hit case the binary built these as
  // "<install>\Scenarios\*.SC4" etc.; with no install dir the wildcard
  // suffix alone is a valid "search current dir" pattern for our VFS-backed
  // FindFirstFileA. Source-string addresses come from rct.exe's .rdata:
  //   0x005f8fa5 = "\Saved Games\"
  //   0x005f90b4 = "\Scenarios\*.SC4"
  //   0x005f91c6 = "\Tracks\*.TD4"
  // (and DAT_005f8648 is the empty install-dir, so prefix is "").
  _buildPath(heap, 0x005f8da3, 0x005f8648, 0x005f8648 /* just NUL */);
  // For 5f8da3 we want "\\\0" (single backslash terminator like the binary
  // appends when prefix is empty). Reset and write that explicitly.
  heap.setU8(0x005f8da3, 0x5c);
  heap.setU8(0x005f8da3 + 1, 0);
  _buildPath(heap, 0x005f8ea4, 0x005f8648, 0x005f8fa5);
  _buildPath(heap, 0x005f8fb3, 0x005f8648, 0x005f90b4);
  _buildPath(heap, 0x005f90c5, 0x005f8648, 0x005f91c6);
  FUN_0042f199(heap);
  if ((FUN_00405949(heap, 0x005f886b) >>> 0) !== 0) {
    FUN_005df472(heap);
    return 0;
  }
  // Outer "missing-files" retry loop (binary's `do { ... } while(true)`).
  // Max 2 iterations: first attempt + retry after popup. Safety cap = 3.
  let outerIters = 0;
  outer: while (true) {
    if (++outerIters > 3) return 0;
    let uVar3 = 0;
    // Inner: iterate file indices 0..0x16.
    for (uVar3 = 0; uVar3 <= 0x16; uVar3++) {
      // (&DAT_005f851c)[uVar3] is a BYTE array — single-byte write per index.
      // Ghidra emitted `(uint *)`-style indexing which would be a 4-byte
      // write that clobbers the missing-files flag at 0x005f8533 when
      // uVar3 == 5 (0x5f8530..3 = 4 bytes covers 0x5f8533).
      heap.setU8(0x005f851c + uVar3, 0);
      regs.ebx = uVar3 >>> 0;          // 42f239 reads ebx for the index
      FUN_0042f239(heap);
      let iVar2 = FUN_004083b5(heap, uVar3) | 0;
      if (iVar2 !== -1) {
        FUN_00408387(heap, iVar2);    // close handle
        continue;                      // → LAB_0042f13f → next iteration
      }
      // First-attempt failed. Try alternate path (set flag, retry).
      if (uVar3 === 0x12) continue;    // file 0x12 has no alt
      heap.setU8(0x005f851c + uVar3, 1);
      regs.ebx = uVar3 >>> 0;
      FUN_0042f239(heap);
      iVar2 = FUN_004083b5(heap, uVar3) | 0;
      if (iVar2 !== -1) {
        FUN_00408387(heap, iVar2);
        continue;
      }
      // Both attempts failed → missing-files popup path.
      if (heap.u8(0x005f8533) !== 0) {
        FUN_005df472(heap);
        return 0;
      }
      heap.setU8(0x005f8533, 1);
      FUN_00458bcf(heap);
      FUN_00458bcf(heap);
      // Copy 005f874c → 0099aa88 (string).
      let s = 0x005f874c, d = 0x0099aa88;
      while (true) {
        const c = heap.u8(s);
        heap.setU8(d, c);
        if (c === 0) break;
        s = (s + 1) >>> 0; d = (d + 1) >>> 0;
      }
      FUN_004039bc(heap, 0x0099a888, 0x0099a988, 0x0099aa88);
      // Copy 0099aa88 → 005f874c.
      s = 0x0099aa88; d = 0x005f874c;
      while (true) {
        const c = heap.u8(s);
        heap.setU8(d, c);
        if (c === 0) break;
        s = (s + 1) >>> 0; d = (d + 1) >>> 0;
      }
      // Restart outer loop with new path.
      continue outer;
    }
    // All 23 files opened (or skipped). Set palette params + jump out.
    heap.setU8(0x005f8d5f, 0);
    if (heap.u32(0x005f14fc) > 0x1000000) {
      heap.setU8(0x005f8d5f, 1);
      if (heap.u32(0x005f14fc) > 0x2000000) {
        heap.setU8(0x005f8d5f, 2);
      }
    }
    heap.setU8(0x005f8d5d, heap.u32(0x0063297d + heap.u8(0x005f8d5f) * 4) & 0xff);
    heap.setU8(0x005f8d5e, heap.u32(0x00632980 + heap.u8(0x005f8d5f) * 4) & 0xff);
    regs.eax = 3;
    return FUN_0042f1d3(heap);
  }
}
