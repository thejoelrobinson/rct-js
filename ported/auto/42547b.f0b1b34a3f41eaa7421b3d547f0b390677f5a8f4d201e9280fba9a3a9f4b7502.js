// @manual — do not regenerate.
//
// FUN_0042547b — tile probe at (ax,cx), the sibling of FUN_00425432 with an
// extra height test (binary 0x42547b..0x4254dd). Same contract, same two
// translator defects: no exit flags, and a WORD store emitted as setU32.
//
//   0x4254db  and eax, eax ; ret   -> CF=0   tile is OK
//   0x4254d7  stc          ; ret   -> CF=1   tile is not (and [0x991efc]=0x6a9)
//
// The control flow around the height test is inverted relative to how it
// reads: BOTH height comparisons JUMP to the success exit and the
// fall-through lands on the failure path.
//
//   0x4254ae  test byte [esi+7], 0x20 ; jne 0x4254da   -> success
//   0x4254b4  test byte [esi+7], 0x10 ; je  0x4254cd   -> failure
//   0x4254ba  push edx
//   0x4254bb  shr  dx, 2                               ; 16-bit shift
//   0x4254bf  cmp  dl, [esi+2] ; jb 0x4254d9           -> success
//   0x4254c4  sub  dl, 4
//   0x4254c7  cmp  dl, [esi+2] ; ja 0x4254d9           -> success
//   0x4254cc  pop edx                                  ; falls into failure
//   0x4254cd  pop esi / mov word [0x991efc],0x6a9 / stc / ret
//   0x4254d9  pop edx / pop esi / and eax,eax / ret
//
// EDX and ESI are push/pop'd on every path, so both are preserved; EAX is
// never written. See ADDENDUM 175.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";

export function FUN_0042547b(heap) {
  const ax = regs.eax & 0xffff;
  const cx = regs.ecx & 0xffff;
  const succeed = () => {
    regs.cf = 0; regs.of = 0;                            // and eax, eax
    regs.zf = (regs.eax >>> 0) === 0 ? 1 : 0;
    regs.sf = (regs.eax >>> 0) >>> 31;
    return regs.eax >>> 0;
  };

  if (ax <= 0xfff && cx <= 0xfff) {                      // 0x42547c, 0x425482 (ja)
    const rolled = ((cx << 7) | (cx >>> 9)) & 0xffff;    // rol si, 7
    const ored = (rolled | ax) & 0xffff;                 // or si, ax
    const idx = ((ored >>> 5) | (ored << 11)) & 0xffff;  // ror si, 5
    let p = heap.u32(0x00971ef4 + idx * 4) >>> 0;        // 0x42549a
    while ((heap.u8(p) & 0x3c) !== 0) p = (p + 8) >>> 0; // 0x4254a1..0x4254ac
    const flags = heap.u8((p + 7) >>> 0);
    if ((flags & 0x20) !== 0) return succeed();          // 0x4254ae jne
    if ((flags & 0x10) !== 0) {                          // 0x4254b4 je -> failure
      const limit = heap.u8((p + 2) >>> 0);
      const dl = ((regs.edx & 0xffff) >>> 2) & 0xff;     // shr dx, 2 (16-bit)
      if (dl < limit) return succeed();                  // 0x4254c2 jb
      if (((dl - 4) & 0xff) > limit) return succeed();    // 0x4254ca ja
    }
  }
  heap.setU16(0x00991efc, 0x6a9);                        // 0x4254ce (WORD, not dword)
  regs.cf = 1;                                           // 0x4254d7 stc
  return regs.eax >>> 0;
}
