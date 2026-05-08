
void FUN_00452fce(void)

{
  short in_AX;
  byte bVar1;
  ushort in_CX;
  uint uVar2;
  ushort in_DX;
  byte *pbVar3;
  int unaff_EBX;
  int iVar4;
  short unaff_BP;
  short *psVar5;
  
  if ((DAT_006326bd & 1) != 0) {
    DAT_00632405 = 0;
    if (unaff_EBX == 0x8001) {
      pbVar3 = (byte *)(&DAT_00971ef4)
                       [(ushort)((ushort)((in_DX & 0xffe0) << 7 | in_DX >> 9 | in_CX & 0xffe0) >> 5
                                | (in_DX >> 9) << 0xb)];
      bVar1 = *pbVar3;
      while ((bVar1 & 0x3c) != 0) {
        pbVar3 = pbVar3 + 8;
        bVar1 = *pbVar3;
      }
      if (unaff_BP < (short)((ushort)pbVar3[2] * 4 + -5)) {
        DAT_00632405 = 10;
      }
                    /* WARNING: Could not recover jumptable at 0x00453045. Too many branches */
                    /* WARNING: Treating indirect jump as call */
      (*(code *)(&PTR_LAB_0045304c)[DAT_00991f88])();
      return;
    }
    psVar5 = &DAT_00632608;
    bVar1 = 0;
    do {
      if (*psVar5 == -1) {
        *psVar5 = in_AX;
        psVar5 = psVar5 + 1;
        if (unaff_EBX == 0x8000) {
          iVar4 = 0;
        }
        else {
          uVar2 = (uint)DAT_00971ed6;
          if (uVar2 < 0x40) {
            uVar2 = 0x40;
          }
          iVar4 = (unaff_EBX << 0x10) / (int)uVar2 + -0x8000 >> 4;
        }
        if (DAT_005f8d59 == '\0') {
          iVar4 = 0;
        }
        FUN_004077b3();
        FUN_00407c42(psVar5,0,0,iVar4,0);
        return;
      }
      psVar5 = psVar5 + 0xb;
      bVar1 = bVar1 + 1;
    } while (bVar1 < DAT_005f8d5e);
  }
  return;
}

