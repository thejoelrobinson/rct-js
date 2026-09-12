// @manual — do not regenerate. 440143..44030f: peep status text and arguments.
// EAX carries a sprite index on entry and its byte-sized state on exit.
import { regs as r } from "../../runtime/regs.js";
const SIMPLE = new Map([[0x44015b,0x5bc],[0x440169,0x5bc],[0x440227,0x5c2],[0x440235,0x5c3],
 [0x440243,0x5bc],[0x440251,0x5c4],[0x44025f,0x5c5],[0x44026d,0x5c7],[0x44027b,0x5c6],
 [0x440289,0x5bc],[0x440294,0x5bc],[0x4402ec,0x5bc]]);
export function peepStatus(heap) {
 const word=(n,v)=>{r[n]=((r[n]&0xffff0000)|(v&65535))>>>0;};
 const logic=v=>{r.cf=r.of=r.sf=0;r.zf=+(v===0);};
 const cmp8=(a,b)=>{const v=(a-b)&255;r.cf=+(a<b);r.zf=+(v===0);r.sf=v>>>7;r.of=((a^b)&(a^v))>>>7&1;};
 const simple=id=>{word('ebx',id);word('ecx',0);r.edx=0;logic(0);};
 const saved=r.esi>>>0;r.esi=0x743b94+(r.eax&65535)*256;logic(r.esi);
 r.eax=heap.u8(r.esi+0x2b);
 let target=heap.u32(0x62d44c+r.eax*4);
 if(target===0x4401f0) {
   const ride=heap.u8(r.esi+0xc5);cmp8(ride,255);
   if(ride===255){simple(0x5bc);r.esi=saved;return r.eax;}
   target=0x4401cd;
 }
 if(target===0x44029f) {
   const substate=heap.u8(r.esi+0x2c);cmp8(substate,1);
   if(substate<2){simple(substate===0?0x5bc:0x6db);r.esi=saved;return r.eax;}
 }
 if(SIMPLE.has(target))simple(SIMPLE.get(target));
 else {
   const labels=new Map([[0x440177,0x5bf],[0x4401ad,0x5c1],[0x4401cd,0x5bd],
     [0x440207,0x5be],[0x44029f,0x6d9],[0x4402cf,0x6da],[0x4402f1,0x79b]]);
   if(!labels.has(target))throw new Error(`invalid peep status ${r.eax} target 0x${target.toString(16)}`);
   r.edx=heap.u8(r.esi+(target===0x4401cd?0xc5:0x68))*0x260;r.cf=r.of=0;
   if(target===0x440177) {
     word('ebx',0x5bf);r.ecx=heap.u8(r.edx+0x887420);
     const value=heap.u32(0x5f5b78+r.ecx*8)&0x400000;logic(value);
     if(value){word('ebx',0x5c0);r.zf=r.sf=r.of=0;}
   }
   word('ecx',heap.u16(r.edx+0x887442));r.edx=heap.u32(r.edx+0x887444);
   if(target!==0x440177)word('ebx',labels.get(target));
 }
 r.esi=saved;return r.eax>>>0;
}
