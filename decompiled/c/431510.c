
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined2 FUN_00431510(void)

{
  byte bVar1;
  short *psVar2;
  short sVar3;
  short sVar4;
  undefined2 in_DX;
  ushort uVar5;
  short unaff_BX;
  int unaff_ESI;
  
  DAT_00628910 = 0;
  _DAT_0062891c = in_DX;
  sVar3 = FUN_005e3ace();
  if ((unaff_ESI != 0) && (psVar2 = *(short **)(unaff_ESI + 8), psVar2 != (short *)0x0)) {
    sVar4 = sVar3 - psVar2[2];
    DAT_00628904 = sVar3;
    DAT_00628906 = unaff_BX;
    if ((psVar2[2] <= sVar3) &&
       (((sVar4 < *psVar2 && (sVar3 = unaff_BX - psVar2[3], psVar2[3] <= unaff_BX)) &&
        (sVar3 < psVar2[1])))) {
      bVar1 = *(byte *)(psVar2 + 8);
      DAT_005f96ce = (ushort)bVar1;
      uVar5 = -1 << (bVar1 & 0x1f);
      DAT_005f96c4 = (sVar4 << (bVar1 & 0x1f)) + psVar2[4] & uVar5;
      DAT_005f96c6 = (sVar3 << (bVar1 & 0x1f)) + psVar2[5] & uVar5;
      DAT_005f96da = 1;
      DAT_005f96d8 = 1;
      DAT_005f96e0 = &DAT_006284ac;
      DAT_00981ef8 = &DAT_005f96d0;
      DAT_005f96d4 = DAT_005f96c4;
      DAT_005f96d6 = DAT_005f96c6;
      DAT_005f96de = DAT_005f96ce;
      FUN_00431b6f(psVar2);
      FUN_00436b2a();
      FUN_00433bae();
      FUN_00433f20();
    }
  }
  return DAT_00628914;
}

