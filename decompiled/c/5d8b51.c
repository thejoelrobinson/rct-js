
void FUN_005d8b51(void)

{
  int unaff_ESI;
  int unaff_EDI;
  
  *(ushort *)((int)&DAT_00887422 + unaff_EDI) = *(ushort *)((int)&DAT_00887422 + unaff_EDI) | 4;
  *(ushort *)((int)&DAT_00887422 + unaff_EDI) = *(ushort *)((int)&DAT_00887422 + unaff_EDI) & 0xfff7
  ;
  *(ushort *)(unaff_ESI + 0x48) = *(ushort *)(unaff_ESI + 0x48) | 0x20;
  *(undefined4 *)(&DAT_008874a8 + unaff_EDI) = 0;
  *(undefined4 *)(&DAT_008874ac + unaff_EDI) = 0;
  (&DAT_008874b0)[unaff_EDI] = 0;
  (&DAT_008874b1)[unaff_EDI] = 0;
  *(undefined2 *)(&DAT_008874cc + unaff_EDI) = 100;
  *(undefined2 *)(&DAT_008874ce + unaff_EDI) = 100;
  *(undefined2 *)(&DAT_008874d0 + unaff_EDI) = 0;
  *(undefined2 *)(&DAT_008874d2 + unaff_EDI) = 100;
  *(undefined2 *)(&DAT_008874d4 + unaff_EDI) = 0;
  *(undefined4 *)(&DAT_008874d8 + unaff_EDI) = 0;
  *(undefined2 *)(&DAT_008874dc + unaff_EDI) = 0xffff;
  (&DAT_008874ef)[unaff_EDI] = 0xff;
  *(undefined2 *)(&DAT_008874de + unaff_EDI) = 0;
  *(undefined2 *)(&DAT_008874e0 + unaff_EDI) = 0;
  *(undefined2 *)(&DAT_008874e2 + unaff_EDI) = 0;
  (&DAT_008874e4)[unaff_EDI] = 0;
  (&DAT_008874e5)[unaff_EDI] = 0;
  *(undefined4 *)(&DAT_008874e8 + unaff_EDI) = 0;
  *(undefined2 *)(&DAT_008874ec + unaff_EDI) = 0;
  (&DAT_008874ee)[unaff_EDI] = 0;
  (&DAT_008874e7)[unaff_EDI] = 0;
  (&DAT_008874a5)[unaff_EDI] = 0;
  *(undefined4 *)(&DAT_008874b4 + unaff_EDI) = 0;
  *(undefined2 *)(&DAT_008874c4 + unaff_EDI) = 0;
  *(undefined4 *)(&DAT_008874b8 + unaff_EDI) = 0;
  *(undefined2 *)(&DAT_008874c6 + unaff_EDI) = 0;
  *(undefined4 *)(&DAT_008874bc + unaff_EDI) = 0;
  *(undefined2 *)(&DAT_008874c8 + unaff_EDI) = 0;
  *(undefined4 *)(&DAT_008874c0 + unaff_EDI) = 0;
  *(undefined2 *)(&DAT_008874ca + unaff_EDI) = 0;
  FUN_005e5301();
  return;
}

