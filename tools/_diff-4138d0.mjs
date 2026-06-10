import { readFileSync } from "node:fs";
const R='/sessions/cool-festive-fermat/mnt/rct-js';
const { runOriginal } = await import(R+'/harness/emulator.js');
const { Heap } = await import(R+'/runtime/heap.js');
const { FUN_004138d0 } = await import(R+'/ported/auto/4138d0.js');
const dataBin = readFileSync(R+'/decompiled/data.bin');
const BUF=0x700000, ARGS=0x701800; // args sit inside the seeded region
const cases=[
  ['fwd-aligned', BUF, BUF+0x100, 64],
  ['fwd-unaligned', BUF+1, BUF+0x103, 37],
  ['overlap-back', BUF+8, BUF, 64],
  ['overlap-fwd', BUF, BUF+4, 32],
  ['tiny1', BUF, BUF+0x50, 1], ['tiny2', BUF, BUF+0x50, 2], ['tiny3', BUF, BUF+0x50, 3],
  ['len0', BUF, BUF+0x50, 0],
  ['big-unrolled', BUF, BUF+0x400, 0x183],
];
let ok=true;
for (const [name,dst,src,len] of cases){
  const PAGE=0x1000, pages=new Map();
  function poke(a,v){ const p=Math.floor(a/PAGE);
    if(!pages.has(p)){ const base=p*PAGE,b=new Uint8Array(PAGE);
      for(let i=0;i<PAGE;i++) b[i]= base+i<dataBin.length?dataBin[base+i]:0; pages.set(p,b);}
    pages.get(p)[a%PAGE]=v; }
  for(let i=0;i<0x800;i++) poke(BUF-0x20+i, (i*7+13)&0xff);
  for(const [j,v] of [[0,dst],[1,src],[2,len]].map(([j,v])=>[j,v>>>0]))
    for(let b=0;b<4;b++) poke(ARGS+j*4+b, (v>>>(b*8))&0xff);
  const res=runOriginal({funcAddr:0x4138d0,
    init:{ pages:[...pages.entries()].map(([page,b])=>({page,bytes:b})), stackTop: ARGS },
    limit:500000, returnMemory:true });
  // JS side
  const total=Math.max(dataBin.length+8*1024*1024, 0xa00000);
  const memory=new Uint8Array(total); memory.set(dataBin,0);
  const heap=new Heap(memory,total);
  for(let i=0;i<0x800;i++) heap.setU8(BUF-0x20+i,(i*7+13)&0xff);
  const ret=FUN_004138d0(heap,dst,src,len)>>>0;
  let diffs=0, first=null;
  for(let a=BUF-0x20;a<BUF+0x800;a++) if(res.memory[a]!==memory[a]){diffs++; if(first===null)first=a;}
  const retOk=(res.regs.eax>>>0)===ret;
  if(diffs===0&&retOk) console.log('PASS',name);
  else { ok=false; console.log('FAIL',name,'diffs',diffs, first!==null?('first@0x'+first.toString(16)+' i=0x'+res.memory[first].toString(16)+' j=0x'+memory[first].toString(16)):'', 'ret',retOk?'ok':(res.regs.eax>>>0).toString(16)+' vs '+ret.toString(16)); }
}
process.exit(ok?0:1);
