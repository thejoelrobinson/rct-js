
void FUN_0057b232(int param_1)

{
  undefined1 *puVar1;
  char in_AL;
  char in_CL;
  short in_DX;
  int iVar2;
  int unaff_ESI;
  
  puVar1 = DAT_00991f80;
  iVar2 = (uint)*(byte *)(param_1 + 7) * 0x260;
  if (((&DAT_00887497)[iVar2] == '\0') || ((byte)unaff_ESI < (byte)(&DAT_00887498)[iVar2])) {
    DAT_00651d10 = (undefined1 *)0xffffffff;
    if (((&DAT_00887422)[(uint)*(byte *)(param_1 + 7) * 0x130] & 1) != 0) {
      DAT_00651d10 = (undefined1 *)(int)(short)*(ushort *)(&DAT_0088747e + unaff_ESI * 2 + iVar2);
      if (DAT_00651d10 != (undefined1 *)0xffffffff) {
        DAT_00651d10 = &DAT_00743b94 +
                       (uint)*(ushort *)(&DAT_0088747e + unaff_ESI * 2 + iVar2) * 0x100;
        DAT_00991f78._0_1_ = 2;
        DAT_00991f80 = DAT_00651d10;
      }
    }
    DAT_0099a4e8 = in_AL + -10;
    DAT_0099a4ea = in_CL + -10;
    DAT_0099a4ec = in_DX + 3;
    (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])(0x14,0x14,in_DX + 3);
    if ((DAT_00651d10 != (undefined1 *)0xffffffff) && (DAT_00651d10[0xb3] != '\0')) {
      (*(code *)(&PTR_LAB_00432e90)[DAT_00991f88])();
    }
  }
  DAT_00991f80 = puVar1;
  DAT_00991f78._0_1_ = 3;
  return;
}

