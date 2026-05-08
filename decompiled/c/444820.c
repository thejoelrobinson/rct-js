
void FUN_00444820(void)

{
  ushort uVar1;
  byte *pbVar2;
  ushort in_AX;
  ushort in_CX;
  uint uVar3;
  int iVar4;
  
  if (((*(ushort *)(DAT_00981ef8 + 0xe) < 2) && (in_AX < 0x1000)) && (in_CX < 0x1000)) {
    uVar1 = (&DAT_00991f8e)[(ushort)((in_AX & 0xfe0) << 2 | in_CX >> 5)];
    pbVar2 = DAT_00991f80;
    while (DAT_00991f80 = pbVar2, uVar1 != 0xffff) {
      uVar3 = (uint)uVar1;
      iVar4 = uVar3 * 0x100;
      DAT_00991f80 = &DAT_00743b94 + iVar4;
      DAT_00991f78._0_1_ = 2;
      if (((*(short *)(&DAT_00743bac + iVar4) <
            (short)(*(short *)(DAT_00981ef8 + 6) + *(short *)(DAT_00981ef8 + 10))) &&
          (*(short *)(DAT_00981ef8 + 6) < *(short *)(&DAT_00743bb0 + iVar4))) &&
         ((*(short *)(&DAT_00743baa + iVar4) <
           (short)(*(short *)(DAT_00981ef8 + 4) + *(short *)(DAT_00981ef8 + 8)) &&
          (*(short *)(DAT_00981ef8 + 4) < *(short *)(&DAT_00743bae + iVar4))))) {
        DAT_00991f70 = (&DAT_00743ba2)[uVar3 * 0x80];
        DAT_00991f74 = (&DAT_00743ba4)[uVar3 * 0x80];
        (*(code *)(&PTR_LAB_006309a0)[*DAT_00991f80])();
        pbVar2 = DAT_00991f80;
      }
      DAT_00991f80 = pbVar2;
      pbVar2 = DAT_00991f80;
      uVar1 = (&DAT_00743b96)[uVar3 * 0x80];
    }
  }
  return;
}

