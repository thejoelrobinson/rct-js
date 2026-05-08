
void FUN_009bb766(void)

{
  byte in_CL;
  int unaff_EBX;
  uint uVar1;
  byte *pbVar2;
  undefined1 *puVar3;
  
  pbVar2 = (byte *)(&DAT_008dc0b4)[unaff_EBX * 4];
  puVar3 = &DAT_005f2000 + (uint)*(ushort *)(&DAT_008dc0bc + unaff_EBX * 0x10) * 4;
  uVar1 = (uint)*(ushort *)(&DAT_008dc0b8 + unaff_EBX * 0x10);
  do {
    *puVar3 = (char)((ushort)((ushort)*pbVar2 * (ushort)in_CL) >> 8);
    puVar3[1] = (char)((ushort)((ushort)pbVar2[1] * (ushort)in_CL) >> 8);
    puVar3[2] = (char)((ushort)((ushort)pbVar2[2] * (ushort)in_CL) >> 8);
    pbVar2 = pbVar2 + 3;
    puVar3 = puVar3 + 4;
    uVar1 = uVar1 - 1;
  } while (uVar1 != 0);
  FUN_00405cc0(&DAT_005f2000,10,0xec);
  return;
}

