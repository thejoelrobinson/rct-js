// @manual — do not regenerate.
// Source: transcribed from binary/rct.exe @ 0x458c14..0x458c63.
//
// FUN_00458c14 — the body of RCT's format_string: walk a template, copy
// literal bytes, pass control codes (< 0x20) through with their parameter
// bytes, and expand format codes (0x7b..0x8d) through the jumptable at
// 0x458a78.
//
//   ESI = template, EDI = output cursor, ECX = argument block.
//
// The format codes are NOT functions: `0x458c5d jmp [eax*4 + 0x458a78]` JUMPS
// to them and each one tail-jumps back to 0x458c14 to continue the walk —
// exactly the shape of the widget jumptable at 0x5e452c (ADDENDUM 143). The
// 250-line auto-translation modelled them as calls and lost the register flow;
// measured with tools/_fmtoracle.mjs it emitted ONE byte and stopped for every
// string id tested (0/11 matched the binary). With this port: 10/11, the one
// mismatch being an artifact of that tool's synthetic argument block feeding a
// garbage nested string id.
//
// Codes that are not transcribed run the real bytes for THAT CODE ONLY, via
// `hookOnce` on 0x458c14 so the handler's tail-jump unwinds to runFunction's
// sentinel instead of continuing the walk inside the interpreter.

/** @typedef {import("../../runtime/heap.js").Heap} Heap */

import { regs } from "../../runtime/regs.js";
import { callNative, hookOnce } from "../../runtime/painter-bridge.js";
import { FUN_00458bcf } from "./458bcf.js";

const JUMPTABLE = 0x00458a78;

function formatCurrencyTenths(heap, value, output) {
  const signed = value | 0;
  const magnitude = signed < 0 ? -signed : value >>> 0;
  let cursor = output >>> 0;
  if (signed < 0) {
    heap.setU8(cursor, 0x2d);
    cursor = (cursor + 1) >>> 0;
  }
  heap.setU8(cursor, 0xa5);
  cursor = (cursor + 1) >>> 0;

  const magnitudeDigits = String(magnitude);
  const digits = magnitude === 0 ? "0" : `${magnitudeDigits}0`;
  const firstGroup = digits.length % 3 || 3;
  for (let index = 0; index < digits.length; index++) {
    if (index !== 0 && index % 3 === firstGroup % 3) {
      heap.setU8(cursor, 0x2c);
      cursor = (cursor + 1) >>> 0;
    }
    heap.setU8(cursor, digits.charCodeAt(index));
    cursor = (cursor + 1) >>> 0;
  }
  heap.setU8(cursor, 0);

  regs.eax = magnitudeDigits.charCodeAt(magnitudeDigits.length - 1) >>> 0;
  let bl = 0x30;
  for (let index = 0; index < magnitudeDigits.length; index++) bl |= magnitudeDigits.charCodeAt(index);
  const bh = 0x30 + (Math.floor(magnitude / 10) % 10);
  // Full-width on purpose, and NOT a copy of the sibling below. This handler
  // is dispatched at 0x458df0 through `mov bl,[0x5f8da1]` / `and ebx, 0x7f` —
  // a DWORD and — so EBX's upper half is already zero on entry and the
  // formatter's `mov bl` / `mov bh` leave it that way. The sibling
  // formatGroupedSignedWord is reached without that mask and must preserve.
  // (Changed to preserve here on a bad hunch during ADDENDUM 176 and reverted:
  // the tooltip failure it was chasing was oracle contamination, not this.)
  regs.ebx = ((bh << 8) | bl) >>> 0;
  return cursor >>> 0;
}

function formatGroupedSignedWord(heap, value, output) {
  const signed = (value << 16) >> 16;
  const magnitude = signed < 0 ? -signed : signed;
  let cursor = output >>> 0;
  if (signed < 0) {
    heap.setU8(cursor, 0x2d);
    cursor = (cursor + 1) >>> 0;
  }

  const digits = String(magnitude);
  const firstGroup = digits.length % 3 || 3;
  for (let index = 0; index < digits.length; index++) {
    if (index !== 0 && index % 3 === firstGroup % 3) {
      heap.setU8(cursor, 0x2c);
      cursor = (cursor + 1) >>> 0;
    }
    heap.setU8(cursor, digits.charCodeAt(index));
    cursor = (cursor + 1) >>> 0;
  }
  heap.setU8(cursor, 0);

  let bl = heap.u8(0x00642fb8);
  for (let index = 0; index + 1 < digits.length; index++) bl |= digits.charCodeAt(index);
  const bh = 0x30 + (Math.floor(magnitude / 10) % 10);
  regs.eax = digits.charCodeAt(digits.length - 1) >>> 0;
  regs.ebx = ((regs.ebx & 0xffff0000) | (bh << 8) | bl) >>> 0;
  return cursor >>> 0;
}

export function FUN_00458c14(heap) {
  let esi = regs.esi >>> 0;
  let edi = regs.edi >>> 0;
  let ecx = regs.ecx >>> 0;

  for (;;) {
    const al = heap.u8(esi);                       // 0x458c14
    regs.eax = ((regs.eax & 0xffffff00) | al) >>> 0;
    esi = (esi + 1) >>> 0;

    if (al > 0x1f) {                               // 0x458c17
      if (al >= 0x7b && al < 0x8e) {               // 0x458c1b / 0x458c1f
        // The nested formats below RE-ENTER the format loop (0x82 and 0x83 via
        // 0x458bcf, 0x85 via 0x458f25's `call 0x458c14` at 0x458f4b). They
        // cannot use the interpreter fallback: the hookOnce below is armed on
        // 0x458c14 to catch a handler's TAIL-JUMP and cannot tell that from a
        // legitimate nested CALL — it would terminate the inner format before
        // it emitted anything. (Measured: string 0x776 came out empty instead
        // of "March, Year 5,135".) So they are transcribed here.
        if (al === 0x7e || al === 0x80 || al === 0x82 || al === 0x83 || al === 0x85) {
          if (al === 0x7e) {
            const value = heap.u16(ecx); ecx = (ecx + 2) >>> 0;
            edi = formatGroupedSignedWord(heap, value, edi);
            continue;
          }
          if (al === 0x80) {
            const value = heap.u32(ecx); ecx = (ecx + 4) >>> 0;
            if ((heap.u8(0x005f8da1) & 0x7f) === 4) {
              edi = formatCurrencyTenths(heap, value, edi);
            } else {
              regs.esi = esi; regs.edi = edi; regs.ecx = ecx;
              regs.eax = value;
              const selector = heap.u8(0x005f8da1) & 0x7f;
              regs.ebx = selector;
              const addr = heap.u32((0x00458dfc + selector * 4) >>> 0) >>> 0;
              hookOnce(0x00458c14, () => {}, () => { callNative(addr, []); });
              esi = regs.esi >>> 0; edi = regs.edi >>> 0; ecx = regs.ecx >>> 0;
            }
            continue;
          }
          if (al === 0x85) {
            // 0x458edf + 0x458f25 — the packed month/year value.
            const v = heap.u16(ecx); ecx = (ecx + 2) >>> 0;
            heap.setU16(0x00642fc2, ((v >>> 3) + 1) & 0xffff);   // 0x458f28
            heap.setU16(0x00642fc4, v & 7);                      // 0x458f2e
            regs.esi = 0x00640185; regs.ecx = 0x00642fc2;        // 0x458f41
            regs.edi = edi;
            FUN_00458c14(heap);                                  // 0x458f4b
            edi = regs.edi >>> 0;            // ecx/esi are restored by the pops
          } else {
            // 0x458ea4 (arg) / 0x458ecd (inline) — a nested string id. Only ESI
            // is preserved across the call (`push esi` / `pop esi`).
            let id;
            if (al === 0x82) { id = heap.u16(ecx); ecx = (ecx + 2) >>> 0; }
            else { id = heap.u16(esi); esi = (esi + 2) >>> 0; }
            regs.eax = id; regs.ecx = ecx; regs.edi = edi;
            FUN_00458bcf(heap);
            edi = regs.edi >>> 0; ecx = regs.ecx >>> 0;
          }
          continue;
        }
        // 0x458c58: `and eax,0xff; jmp [eax*4 + 0x458a78]`
        regs.esi = esi; regs.edi = edi; regs.ecx = ecx;
        regs.eax = al;
        const addr = heap.u32((JUMPTABLE + al * 4) >>> 0) >>> 0;
        hookOnce(0x00458c14, () => {}, () => { callNative(addr, []); });
        esi = regs.esi >>> 0; edi = regs.edi >>> 0; ecx = regs.ecx >>> 0;
        continue;
      }
      heap.setU8(edi, al);                         // 0x458c23
      edi = (edi + 1) >>> 0;
      continue;
    }

    if (al === 0) {                                // 0x458c28
      heap.setU8(edi, 0);                          // 0x458c55 — edi is NOT advanced
      // 0x458c28 `or al, al` is the last flag-setting instruction before the
      // ret, and AL is zero on this path by definition. Setting these matters
      // only once the function carries an eip hook with syncFlags: the hook
      // writes regs' flag cells back to the cpu, so leaving them alone hands
      // the caller the ENTRY flags instead of the exit ones (ADDENDUM 176).
      regs.zf = 1; regs.cf = 0; regs.sf = 0; regs.of = 0;
      break;
    }

    // 0x458c2c..0x458c53 — a control code and its inline parameter bytes.
    //   1..4      -> 1 parameter byte
    //   5..0x10   -> none
    //   0x11..0x16-> 2
    //   0x17..0x1f-> 4
    heap.setU8(edi, al);
    edi = (edi + 1) >>> 0;
    const params = al <= 4 ? 1 : al <= 0x10 ? 0 : al <= 0x16 ? 2 : 4;
    for (let i = 0; i < params; i++) {
      heap.setU8(edi, heap.u8(esi));
      esi = (esi + 1) >>> 0;
      edi = (edi + 1) >>> 0;
    }
  }

  regs.esi = esi; regs.edi = edi; regs.ecx = ecx;
  return regs.eax;
}
