// @manual — do not regenerate.
// HAND-FIX (Phase R+4, RLE byte-store): translator emitted heap.setU32(ptr, byte & 0xffffffff)
// for C-source `*pbVar = *src;` where pbVar is a byte-pointer in RLE-decode/blitter loops.
// Each iteration advances ptr by 1 but the setU32 was writing 4 bytes — corrupting the next
// 3 bytes in the row with zero, then they get overwritten by subsequent iterations EXCEPT
// for the last 3 bytes of each run which stayed zero, and the 3 bytes immediately past the
// run end which also got zeroed. In the RLE-decompress scratchpad at 0x9a2032, downstream
// back-references then copied that corruption into the visible sprite. Fixed by switching
// the per-pixel write to heap.setU8(..., ... & 0xff).
// Auto-translated from Ghidra C by tools/c-to-js/translate.js.
// Source: decompiled/c/9b64ea.c
// Edit by hand only after diff-test passes — re-running the translator will overwrite.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CONCAT22 } from "../../runtime/ghidra-builtins.js";
import { regs } from "../../runtime/regs.js";
export function FUN_009b64ea(heap) {
  let bVar1 = 0;
  let iVar2 = 0;
  let bVar3 = 0;
  let in_EAX = regs.eax >>> 0;
  let uVar4 = 0;
  let uVar5 = 0;
  let sVar6 = 0;
  let uVar9 = 0;
  let uVar7 = 0;
  let iVar8 = 0;
  let in_EDX = regs.edx >>> 0;
  let unaff_EBX = regs.ebx >>> 0;
  let uVar10 = 0;
  let unaff_EBP = regs.ebp >>> 0;
  let unaff_ESI = regs.esi >>> 0;
  let pbVar11 = 0;
  let unaff_EDI = regs.edi >>> 0;
  let pbVar12 = 0;
  iVar2 = ((heap.u32(0x009a200c)) >>> 0);
  bVar3 = ((((((in_EAX) >>> 0) >>> 8) & 0xff)) & 0xff);
  sVar6 = ((((in_EDX) << 16 >> 16)) & 0xffff);
  if ((unaff_EBX & 0x20000000) == 0) {
    if ((unaff_EBX & 0x40000000) == 0) {
      // ---- 0x9b65f4..0x9b6668, transcribed --------------------------------
      // Plain (unremapped) half-scale row blit. The translation read the
      // visible width at [0x9a2028] as a DWORD in four places; the binary
      // uses `mov bx, word ptr [0x9a2028]`, and 0x9a202a is a SEPARATE live
      // 16-bit field (see the note in ported/auto/9b35fa.js). So
      // `heap.u32(0x009a2028) >>> 1` produced a destination column count of
      // (width | field202a << 16) >> 1 — millions instead of tens — and the
      // inner `heap.setU8(edi++, …)` loop ran straight across the heap,
      // corrupting the peep array until randomWalk in
      // extra_guestmotion_43d5a0.js spun forever on out-of-bounds guests.
      //
      // The 4x-unrolled body was also lowered with a `goto LAB_009b661e` that
      // the translator turned into `return 0`, so any row whose column count
      // was not a multiple of 4 abandoned the whole blit mid-row. Both are
      // fixed here by transcribing the loop as the binary writes it.
      //
      // Isolated by substitution: running this function's real bytes while
      // keeping the JS clip values makes zoom 1 complete, and routing only
      // the RLE sibling 0x9b6863 to native does not.
      if ((heap.u16(0x009a201c) & 1) == 0) {
        return regs.eax;
      }
      let ah = (bVar3 >>> 1) & 0xff;                   // 0x9b65fb shr ah,1
      if (ah === 0) return regs.eax;                   // 0x9b65fd je
      let bx = heap.u16(0x009a2028);                   // 0x9b65f4 mov bx,word[…]
      let edx = in_EDX >>> 0;                          // movsx edx,[0x9a202e]
      edx = (edx + ((bx + edx) & 0xffff)) >>> 0;       // 0x9b65ff..0x9b6608
      const odd = bx & 1;                              // 0x9b660a..0x9b660d
      bx = bx >>> 1;                                   // 0x9b6611 shr bx,1
      if (bx === 0) return regs.eax;                   // 0x9b6614 je
      edx = (edx + odd) >>> 0;                         // 0x9b6616 add edx,ecx
      const cols = bx >>> 0;                           // 0x9b6618 movzx ebx,bx
      let esi = unaff_ESI >>> 0;
      let edi = unaff_EDI >>> 0;
      do {
        let n = cols;                                  // 0x9b661b mov cx,bx
        while (n !== 0) {                              // 0x9b661e..0x9b665c
          const v = heap.u8(esi) & 0xff;
          esi = (esi + 2) >>> 0;                       // source steps by 2 (half scale)
          if (v !== 0) heap.setU8(edi, v);             // transparent index 0 is skipped
          edi = (edi + 1) >>> 0;
          n--;
        }
        edi = (edi - cols) >>> 0;                      // 0x9b665e sub edi,ebx
        esi = (esi + edx) >>> 0;                       // 0x9b6660 add esi,edx
        edi = (edi + (unaff_EBP >>> 0)) >>> 0;         // 0x9b6662 add edi,ebp
        ah = (ah - 1) & 0xff;                          // 0x9b6664 dec ah
      } while (ah !== 0);                              // 0x9b6666 jne
      return regs.eax;
    } else {
      if (((heap.u32(0x009a201c) & 1) != 0) && (bVar3 >>> 1 != 0)) {
      uVar4 = ((heap.u32(0x009a2028) + sVar6) & 0xffff);
      uVar5 = ((heap.u32(0x009a2028) & 1) & 0xffff);
      if (heap.u32(0x009a2028) >>> 1 != 0) {
        // SPILL FIX (ADDENDUM 172 audit): the binary stores this field with a
        // SIXTEEN-bit `mov word ptr`, which Ghidra modelled as a dword
        // read-modify-write. CONCAT22 places its FIRST argument in the HIGH
        // half, so the emitted setU32 wrote the low word into the adjacent
        // field. That is what corrupted the heap through 0x9a202a in
        // ported/auto/9b64ea.js; same shape, same consequence.
        heap.setU16(0x009a2028, (heap.u16(0x009a2028) >>> 1) & 0xffff);
        iVar8 = (((((bVar3 >>> 1) - 1) >>> 0) << 0x10) >>> 0);
        do {
          iVar8 = ((CONCAT22((((((iVar8) >>> 0) >>> 0x10)) << 16 >> 16), heap.u32(0x009a2028))) >>> 0);
          do {
            if (heap.u8(unaff_ESI) != 0) {
              heap.setU8(unaff_EDI, (heap.u8((heap.u32(unaff_EDI) + iVar2))) & 0xff);
            }
            pbVar12 = ((unaff_EDI + 1) >>> 0);
            sVar6 = ((((iVar8) << 16 >> 16)) & 0xffff);
            uVar9 = ((((((iVar8) >>> 0) >>> 0x10) & 0xffff)) & 0xffff);
            iVar8 = ((CONCAT22(uVar9, sVar6 + -1)) >>> 0);
            pbVar11 = ((unaff_ESI + 2) >>> 0);
            if ((((sVar6 + -1)) << 16 >> 16) == 0) {
              break;
            }
            if (heap.u8(unaff_ESI + (2)) != 0) {
              heap.setU8(pbVar12, (heap.u8((heap.u32(pbVar12) + iVar2))) & 0xff);
            }
            pbVar12 = ((unaff_EDI + 2) >>> 0);
            iVar8 = ((CONCAT22(uVar9, sVar6 + -2)) >>> 0);
            pbVar11 = ((unaff_ESI + 4) >>> 0);
            if ((((sVar6 + -2)) << 16 >> 16) == 0) {
              break;
            }
            pbVar11 = ((unaff_ESI + 6) >>> 0);
            if (heap.u8(unaff_ESI + (4)) != 0) {
              heap.setU8(pbVar12, (heap.u8((heap.u32(pbVar12) + iVar2))) & 0xff);
            }
            pbVar12 = ((unaff_EDI + 3) >>> 0);
            iVar8 = ((CONCAT22(uVar9, sVar6 + -3)) >>> 0);
            if ((((sVar6 + -3)) << 16 >> 16) == 0) {
              break;
            }
            unaff_ESI = ((unaff_ESI + 8) >>> 0);
            if (heap.u8(pbVar11) != 0) {
              heap.setU8(pbVar12, (heap.u8((heap.u32(pbVar12) + iVar2))) & 0xff);
            }
            unaff_EDI = ((unaff_EDI + 4) >>> 0);
            iVar8 = ((CONCAT22(uVar9, sVar6 + -4)) >>> 0);
            pbVar11 = ((unaff_ESI) >>> 0);
            pbVar12 = ((unaff_EDI) >>> 0);
          } while ((((sVar6 + -4)) << 16 >> 16) != 0);
          unaff_ESI = ((pbVar11 + in_EDX + ((uVar4) >>> 0) + ((uVar5) >>> 0)) >>> 0);
          unaff_EDI = ((pbVar12 + (unaff_EBP - heap.u32(0x009a2028))) >>> 0);
          // 0x9b65eb / 0x9b6703: `sub ecx, 0x10000` then `jns <loop top>` —
          // the loop runs while the row counter stays non-negative and returns
          // on the SIGN bit. The translation kept iVar8 coerced with `>>> 0`,
          // so `iVar8 < 0` is unreachable and both of these loops never
          // terminate. Test bit 31 explicitly, which is what `js` reads.
          iVar8 = ((iVar8 + -0x10000) >>> 0);
          if ((iVar8 | 0) < 0) {
            return;
          }
        } while (true);
      }
    }
    }
  } else {
    // ---- 0x9b666a..0x9b670b, transcribed ---------------------------------
    // Remapped half-scale row blit (sprite flag 0x20000000). This is the
    // branch that actually runs at zoom 1 — 828 calls against 73 for the
    // plain one — and it is where the corruption came from.
    //
    // 0x9b668e is `mov word ptr [0x9a2028], bx`: a SIXTEEN-bit store of the
    // halved width. Ghidra modelled it as a dword read-modify-write and the
    // translation emitted
    //     setU32(0x9a2028, CONCAT22(u16(0x9a2028), u32(0x9a2028) >>> 1))
    // which puts the width into the HIGH half — that is, straight into
    // 0x9a202a, a separate live field the binary never writes at all (the
    // same spill ported/auto/9b35fa.js documents from oracle evidence).
    //
    // It matters because 0x9b66f9 is `sub edi, DWORD ptr [0x9a2028]`, and the
    // binary can use a dword there precisely because 0x9a202a stays zero.
    // With the spill, [0x9a2028] read 0x00020002, so every row rewound the
    // destination by 131,074 bytes instead of 2 and the blit wrote across the
    // heap — corrupting the peep array until randomWalk in
    // extra_guestmotion_43d5a0.js spun forever on out-of-bounds guests.
    if ((heap.u16(0x009a201c) & 1) == 0) {
      return regs.eax;
    }
    let ah = (bVar3 >>> 1) & 0xff;                       // 0x9b6671 shr ah,1
    if (ah === 0) return regs.eax;                       // 0x9b6673 je
    let bx = heap.u16(0x009a2028);                       // 0x9b666a mov bx,word
    let edx = in_EDX >>> 0;
    edx = (edx + ((bx + edx) & 0xffff)) >>> 0;           // 0x9b6675..0x9b667e
    const odd = bx & 1;                                  // 0x9b6680..0x9b6683
    bx = bx >>> 1;                                       // 0x9b6687 shr bx,1
    if (bx === 0) return regs.eax;                       // 0x9b668a je
    edx = (edx + odd) >>> 0;                             // 0x9b668c add edx,ecx
    heap.setU16(0x009a2028, bx);                         // 0x9b668e mov WORD
    const table = heap.u32(0x009a200c) >>> 0;            // 0x9b6699 remap table
    let rows = ((ah & 0xff) - 1) | 0;                    // movzx cx,ah / dec cx / shl ecx,0x10
    let esi = unaff_ESI >>> 0;
    let edi = unaff_EDI >>> 0;
    do {
      let n = heap.u16(0x009a2028);                      // 0x9b66a6 mov cx,word
      while (n !== 0) {                                  // 0x9b66ad..0x9b66f7
        const idx = heap.u8(esi) & 0xff;
        esi = (esi + 2) >>> 0;                           // source steps by 2
        const v = heap.u8((idx + table) >>> 0) & 0xff;   // 0x9b66b2 mov al,[eax+ebx]
        if (v !== 0) heap.setU8(edi, v);                 // index 0 is transparent
        edi = (edi + 1) >>> 0;
        n--;
      }
      edi = (edi - (heap.u32(0x009a2028) >>> 0)) >>> 0;  // 0x9b66f9 sub edi,DWORD
      esi = (esi + edx) >>> 0;                           // 0x9b66ff add esi,edx
      edi = (edi + (unaff_EBP >>> 0)) >>> 0;             // 0x9b6701 add edi,ebp
      rows -= 1;                                         // 0x9b6703 sub ecx,0x10000
    } while (rows >= 0);                                 // 0x9b6709 jns
    return regs.eax;
  }
  return;
}
