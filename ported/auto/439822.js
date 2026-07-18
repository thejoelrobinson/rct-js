// @manual — do not regenerate.
// Hand-port replaces auto-translation. See decompiled/c/439822.c.
// Source disasm: objdump -d binary/rct.exe --start-address=0x439822 --stop-address=0x439912
//
// The Ghidra C output got the algorithm structure right but the
// translator emitted three classes of broken code:
// 1. ALL byte increment ops were emitted as `heap.setU32(p, heap.i8(p)+1)`.
//    The binary uses addb / incb, not addl / incl. setU32 corrupts the 3
//    neighbouring bytes — including 0xb4, 0xb5, etc., which are read by
//    the next loop iteration (0xb0+uVar6*4), causing the loop to behave
//    very differently from the original.
// 2. `goto LAB_00439857` was lowered as "early-return" instead of a loop
//    restart. That path resets the queue-segment and resumes the
//    outer loop from idx 0 — silently bailing leaves the sprite in an
//    inconsistent state.
// 3. `pcVar2 = unaff_ESI + …; setU32(pcVar2, heap.i8(pcVar2)+1)` — the
//    read is i8 (sign-extended), so a wraparound to 0 in a signed byte
//    can flip sign and produce nonsense for the next branch check.
//
// All field offsets are byte-sized fields off a sprite record (see
// e.g. 0xb0…0xc0 in FUN_00440b00 family). Indices uVar6 = 0..4.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { CARRY1 } from "../../runtime/ghidra-builtins.js";
import { callIndirect } from "../../runtime/win32/context.js";
import { regs } from "../../runtime/regs.js";

export function FUN_00439822(heap) {
  const unaff_ESI = regs.esi >>> 0;

  // Block predicated on `0x2e(%esi) != 1` (binary 0x439822-0x439826):
  // if equal, jump straight to the tail at 0x4398f1.
  if (heap.i8((unaff_ESI + 0x2e) >>> 0) !== 1) {
    // Aging counter at 0xad/0xae (binary 0x43982c-0x439847).
    if (heap.i8((unaff_ESI + 0xad) >>> 0) !== -1) {
      const ae = (heap.u16((unaff_ESI + 0xae) >>> 0) + 1) & 0xffff;
      heap.setU16((unaff_ESI + 0xae) >>> 0, ae);
      if (ae > 0x2cf) {
        heap.setU8((unaff_ESI + 0xad) >>> 0, 0xff);
      }
    }

    // Walk five 4-byte queue slots at 0xb0,0xb4,0xb8,0xbc,0xc0.
    // ECX = uVar6 = idx; EBP = iVar9 (count of cVar4==1 entries
    // processed this pass); EDI = uVar7 (saved idx for cVar4==0).
    let uVar6 = 0;
    let iVar9 = 0; // ebp
    let uVar7 = 0xffffffff; // edi (signed -1)
    let restart = true;
    while (restart) {
      restart = false;
      while (uVar6 < 5) {
        const slotB0 = (unaff_ESI + 0xb0 + uVar6 * 4) >>> 0;
        const slotB2 = (unaff_ESI + 0xb2 + uVar6 * 4) >>> 0;
        const slotB3 = (unaff_ESI + 0xb3 + uVar6 * 4) >>> 0;

        if (heap.i8(slotB0) === -1) {
          break; // breaks out of the inner while; outer falls through
        }
        // cmpb $0x1 + je/jb — the je tests equality, jb tests unsigned <,
        // so read as unsigned byte (0..0xff).
        const cVar4 = heap.u8(slotB2) & 0xff;
        if (cVar4 === 1) {
          // Binary 0x4398cd: ebp++; incb 0xb3; cmp <= 0xdb (jb resumes loop);
          // else byte 0xb3 → 0; incb 0xb2; ebp--.
          iVar9 = (iVar9 + 1) >>> 0;
          const next = (heap.u8(slotB3) + 1) & 0xff;
          heap.setU8(slotB3, next);
          if (next > 0xdb) {
            heap.setU8(slotB3, 0);
            heap.setU8(slotB2, (heap.u8(slotB2) + 1) & 0xff);
            iVar9 = (iVar9 - 1) >>> 0;
          }
        } else if (cVar4 === 0) {
          // Binary 0x43986b jb 0x4398ae: signed cVar4 < 1 → mov %ecx,%edi.
          uVar7 = uVar6 >>> 0;
        } else {
          // cVar4 > 1: addb 1, 0xb3; jae 0x4398b0 (no carry → just inc).
          // If carry (byte wrapped to 0), incb 0xb2; if 0xb2 >= 0x1c then
          // reset-and-restart.
          const before = heap.u8(slotB3);
          const after = (before + 1) & 0xff;
          heap.setU8(slotB3, after);
          if (after === 0) {
            // carry (byte add wrapped from 0xff -> 0)
            const b2 = (heap.u8(slotB2) + 1) & 0xff;
            heap.setU8(slotB2, b2);
            if (b2 > 0x1b) {
              heap.setU8((unaff_ESI + 0x45) >>> 0, heap.u8((unaff_ESI + 0x45) >>> 0) | 1);
              // For uVar7 = uVar6..3: copy queue slot[+1] down to slot[+0].
              // Binary 0x43988c-0x4398a4: edx=ecx; while edx!=4 { 0xb0+edx*4 = 0xb4+edx*4; edx++ }; 0xb0+edx*4 = -1.
              let uVar7Local = uVar6 >>> 0;
              while (uVar7Local !== 4) {
                heap.setU32(
                  (unaff_ESI + 0xb0 + uVar7Local * 4) >>> 0,
                  heap.u32((unaff_ESI + 0xb4 + uVar7Local * 4) >>> 0) >>> 0,
                );
                uVar7Local = (uVar7Local + 1) >>> 0;
              }
              // 0x4398a4: movb $-0x1, 0xb0(%esi,%edx,4) at edx==4.
              heap.setU8((unaff_ESI + 0xc0) >>> 0, 0xff);
              // 0x4398ac: jmp 0x439857 — restart inner loop. The binary
              // does NOT reset ECX/EBP/EDI here; ECX (uVar6) stays at K
              // so the just-shifted slot is reexamined. iVar9 and uVar7
              // keep their accumulated values (the C-decompile's
              // `iVar9 = iVar8; uVar7 = uVar10;` at top of do-while
              // captures them but also leaves them in place).
              restart = true;
              break;
            }
          }
        }
        uVar6 = (uVar6 + 1) >>> 0;
      }
      if (restart) continue;
      // After loop body break or natural exit: post-loop check at 0x4398b6.
      // orl %ebp, %ebp; jne 0x4398f1 → if iVar9 != 0 skip the recovery.
      if (iVar9 === 0 && uVar7 !== 0xffffffff) {
        heap.setU8((unaff_ESI + 0xb2 + uVar7 * 4) >>> 0, 1);
        heap.setU8((unaff_ESI + 0x45) >>> 0, heap.u8((unaff_ESI + 0x45) >>> 0) | 1);
      }
    }
  }

  // Tail (0x4398f1): animate the bobble counter at 0x73.
  let bVar5 = heap.u8((unaff_ESI + 0x38) >>> 0);
  if ((heap.u16((unaff_ESI + 0xc8) >>> 0) & 2) !== 0) {
    bVar5 = (bVar5 >>> 1) & 0xff;
  }
  const pbVar1 = (unaff_ESI + 0x73) >>> 0;
  const bVar3 = heap.u8(pbVar1);
  heap.setU8(pbVar1, (bVar3 + bVar5) & 0xff);
  if (!CARRY1(bVar3, bVar5)) {
    return;
  }
  // Jumptable PTR_LAB_0062d4ac[0x2b(%esi)] — indirect call.
  // 0x439906: movzx edi, byte [esi+0x2b] — the binary loads the state index
  // into EDI before the jmp, so every state handler enters with edi = state.
  // The auto-translation dropped this register-init (the F2/call-site class),
  // leaving stale edi at handler entry — harmless while every handler ran in
  // the interpreter (the real bodies re-derive what they need), but a JS
  // handler that models the entry contract (e.g. 43a5f8's edi-based ZF
  // inference before it was switched to reading the cpu ZF) sees garbage.
  // Restore the contract.
  const stateIdx = heap.u8((unaff_ESI + 0x2b) >>> 0);
  regs.edi = stateIdx >>> 0;
  return (regs.eax = callIndirect(
    heap,
    heap.u32((0x0062d4ac + stateIdx * 4) >>> 0),
  ));
}
