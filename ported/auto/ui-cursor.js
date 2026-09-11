// @manual — original rct.exe 0x5e6078..0x5e613d.
import { regs } from '../../runtime/regs.js';
import { compare, logic, word, resumeUiNative } from './extra_ui_state.js';
import { hitTestWindowExact, hitTestWidgetExact } from './extra_ui_selection.js';
import { FUN_00404ba4 } from './404ba4.js';

function invokeDefault(heap, address) {
  if (address === 0x5e3ace) return hitTestWindowExact(heap);
  if (address === 0x5e3874) return hitTestWidgetExact(heap);
  if (address === 0x404ba4) { regs.eax = FUN_00404ba4(heap, heap.u32(regs.esp + 4)); return; }
  return resumeUiNative(heap, address);
}

export function updateCursorExact(heap, invoke = invokeDefault) {
  const push = value => { regs.esp = (regs.esp - 4) >>> 0; heap.setU32(regs.esp, value); };
  const pop = () => { const value = heap.u32(regs.esp); regs.esp = (regs.esp + 4) >>> 0; return value; };
  const call = (address, ret) => { push(ret); invoke(heap, address); regs.esp = (regs.esp + 4) >>> 0; };
  regs.edx = 0;
  heap.setU16(0x5f54f0, 0xffff);
  push(regs.edx); call(0x5e3ace, 0x5e608c); regs.edx = pop();
  push(regs.eax); push(regs.ebx);
  logic(regs.esi >>> 0, 32);
  let resize = !!regs.zf;
  if (!regs.zf) {
    push(regs.edx); call(0x5e3874, 0x5e6099);
    compare(regs.edx & 0xffff, 0xffff); regs.edx = pop();
    if (!regs.zf) {
      compare(heap.u8(regs.edi), 12, 8);
      resize = !regs.zf;
      if (regs.zf) {
        regs.cf = heap.u32(0x991f30) >>> 3 & 1;
        if (regs.cf) regs.edx = ((regs.edx & 0xffffff00) | heap.u8(0x991f5b)) >>> 0;
        else {
          push(regs.edx); call(0x5e613e, 0x5e60bd); regs.edx = pop();
          for (const kind of [2, 8, 3]) { compare(regs.ebx & 255, kind, 8); if (regs.zf) break; }
          if (regs.zf) regs.edx = ((regs.edx & 0xffffff00) | 3) >>> 0;
        }
      }
    }
  }
  if (resize) {
    compare(heap.u8(regs.edi), 1, 8);
    if (regs.zf) {
      logic(heap.u16(regs.esi + 0x32) & 0x80);
      if (!regs.zf) {
        word('ecx', heap.u16(regs.esi + 0x20) + heap.u16(regs.esi + 0x24) - 19);
        compare(regs.eax & 0xffff, regs.ecx & 0xffff);
        if (regs.sf === regs.of) {
          word('ecx', heap.u16(regs.esi + 0x22) + heap.u16(regs.esi + 0x26) - 19);
          compare(regs.ebx & 0xffff, regs.ecx & 0xffff);
          if (regs.sf === regs.of) regs.edx = 5;
        }
      }
    }
  }
  regs.ebx = pop(); regs.eax = pop();
  push(regs.eax); push(regs.ebx); push(regs.edx);
  call(0x5e65cf, 0x5e610f);
  regs.edx = pop(); regs.ebx = pop(); regs.eax = pop();
  compare(heap.u8(0x991f36), 8, 8);
  if (regs.zf) regs.edx = 5;
  compare(regs.edx & 255, heap.u8(0x991f34), 8);
  if (!regs.zf) {
    heap.setU8(0x991f34, regs.edx);
    push(heap.u32(0x9a1550 + regs.edx * 4)); call(0x404ba4, 0x5e613a);
    const before = regs.esp >>> 0;
    regs.esp = (before + 4) >>> 0;
    regs.cf = before > 0xfffffffb ? 1 : 0;
    regs.zf = regs.esp === 0 ? 1 : 0; regs.sf = regs.esp >>> 31;
    regs.of = ((~(before ^ 4) & (before ^ regs.esp)) >>> 31) & 1;
  }
  return regs.eax >>> 0;
}
