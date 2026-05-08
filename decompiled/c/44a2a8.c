
undefined8 FUN_0044a2a8(void)

{
  byte *pbVar1;
  byte bVar2;
  byte bVar3;
  undefined4 in_EAX;
  int iVar4;
  int extraout_ECX;
  int extraout_ECX_00;
  undefined4 in_EDX;
  int unaff_ESI;
  int iVar5;
  bool bVar6;
  bool bVar7;
  
  iVar4 = -1;
  while ((byte)(iVar4 + 1) < *(byte *)(unaff_ESI + 0x78)) {
    iVar5 = (uint)*(ushort *)(unaff_ESI + 0x5e + (iVar4 + 1) * 2) * 0x100;
    *(ushort *)(&DAT_00743bdc + iVar5) = *(ushort *)(&DAT_00743bdc + iVar5) & 0xffbf;
    bVar2 = (&DAT_00743bc5)[iVar5];
    bVar3 = FUN_005df40c();
    (&DAT_00743c56)[iVar5] = ((bVar3 & 0xf) - 8) + (&DAT_005f7109)[(uint)bVar2 * 8];
    iVar4 = extraout_ECX;
    if ((&DAT_00743c47)[iVar5] != '\0') {
      bVar6 = 0xff8bc46b < (uint)*(ushort *)(&DAT_00743be6 + iVar5) << 8;
      FUN_00441596();
      bVar7 = false;
      if (bVar6) {
        pbVar1 = &DAT_00743c56 + iVar5;
        bVar7 = 0xdc < *pbVar1;
        *pbVar1 = *pbVar1 + 0x23;
      }
      FUN_00441596();
      bVar6 = false;
      if (bVar7) {
        pbVar1 = &DAT_00743c56 + iVar5;
        bVar6 = 0xe6 < *pbVar1;
        *pbVar1 = *pbVar1 + 0x19;
      }
      FUN_00441596();
      bVar7 = false;
      if (bVar6) {
        pbVar1 = &DAT_00743c56 + iVar5;
        bVar7 = 200 < *pbVar1;
        *pbVar1 = *pbVar1 + 0x37;
      }
      FUN_00441596();
      bVar6 = false;
      if (bVar7) {
        pbVar1 = &DAT_00743c56 + iVar5;
        bVar6 = 0xf1 < *pbVar1;
        *pbVar1 = *pbVar1 + 0xe;
      }
      FUN_00441596();
      iVar4 = extraout_ECX_00;
      if (bVar6) {
        (&DAT_00743c56)[iVar5] = 9;
      }
    }
  }
  return CONCAT44(in_EDX,in_EAX);
}

