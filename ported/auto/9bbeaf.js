// @manual - do not regenerate.
//
// Hand-ported from rct.exe disassembly at VA 0x9bbeaf (CodeSeg) - Ghidra
// did not lift this; it is a thin wrapper called only via the indirect
// table DAT_009b22f0 (slot 1) when DAT_008d7eb6 selects this style.
//
// The wrapper uses DAT_006e3b84 (the global frame counter) to derive
// per-frame offsets that scroll/animate the sprite. It does TWO sprite
// draws per call into FUN_009bbdc2, with these per-call setups:
//
//   call 1: edi = -frame      + 8  + eax    (X destination)
//           esi = -(frame*3+7) + 0  + ebx    (Y destination)
//           ebp = 0                          (sprite-stream slot 0)
//   call 2: edi = -frame      + 0x18 + eax
//           esi = -(frame*4+13) + 0 + ebx
//           ebp = 0
//
// EAX/EBX/ECX/EDX from the caller (FUN_009bc041) are preserved across each
// call via push/pop. Returns nothing meaningful.
//
// Disassembly:
//   009BBEAF push eax / push ebx / push ecx / push edx
//   009BBEB3 mov edi,[0x6e3b84]      ; frame counter
//   009BBEB9 neg edi
//   009BBEBB add edi,0x8
//   009BBEBE mov esi,[0x6e3b84]
//   009BBEC4 imul esi,esi,0x3
//   009BBEC7 add esi,0x7
//   009BBECA neg esi
//   009BBECC add edi,eax
//   009BBECE add esi,ebx
//   009BBED0 xor ebp,ebp
//   009BBED2 call 0x9bbdc2
//   009BBED7 pop edx / pop ecx / pop ebx / pop eax
//   009BBEDB push eax / push ebx / push ecx / push edx
//   009BBEDF mov edi,[0x6e3b84]
//   009BBEE5 neg edi
//   009BBEE7 add edi,0x18
//   009BBEEA mov esi,[0x6e3b84]
//   009BBEF0 imul esi,esi,0x4
//   009BBEF3 add esi,0xd
//   009BBEF6 neg esi
//   009BBEF8 add edi,eax
//   009BBEFA add esi,ebx
//   009BBEFC xor ebp,ebp
//   009BBEFE call 0x9bbdc2
//   009BBF03 pop edx / pop ecx / pop ebx / pop eax
//   009BBF07 ret

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { FUN_009bbdc2 } from "./9bbdc2.js";

export function FUN_009bbeaf(heap) {
  const eax = regs.eax >>> 0;
  const ebx = regs.ebx >>> 0;
  const ecx = regs.ecx >>> 0;
  const edx = regs.edx >>> 0;
  const frame = heap.u32(0x6e3b84) >>> 0;

  // call 1
  regs.eax = eax;
  regs.ebx = ebx;
  regs.ecx = ecx;
  regs.edx = edx;
  regs.edi = ((-frame + 8 + eax) >>> 0);
  regs.esi = ((-(Math.imul(frame, 3) + 7) + ebx) >>> 0);
  regs.ebp = 0;
  FUN_009bbdc2(heap);

  // call 2
  regs.eax = eax;
  regs.ebx = ebx;
  regs.ecx = ecx;
  regs.edx = edx;
  regs.edi = ((-frame + 0x18 + eax) >>> 0);
  regs.esi = ((-(Math.imul(frame, 4) + 13) + ebx) >>> 0);
  regs.ebp = 0;
  FUN_009bbdc2(heap);

  // Restore caller-saved regs (final pop sequence).
  regs.eax = eax;
  regs.ebx = ebx;
  regs.ecx = ecx;
  regs.edx = edx;
  return 0;
}
