
undefined4 FUN_00436634(void)

{
  byte *pbVar1;
  int iVar2;
  undefined4 in_EAX;
  int iVar3;
  undefined4 uVar4;
  int iVar5;
  uint uVar7;
  undefined4 *puVar8;
  int iVar6;
  
  DAT_00991f34 = 4;
  FUN_00404ba4(DAT_009a1560);
  iVar3 = FUN_004083e1(s_LandTemp_TMP_00628af7);
  if (iVar3 == -1) {
    uVar4 = FUN_005df431();
    return uVar4;
  }
  uVar7 = 0;
  do {
    iVar2 = (&DAT_00971ef4)[uVar7];
    iVar6 = iVar2;
    do {
      iVar5 = iVar6 + 8;
      pbVar1 = (byte *)(iVar6 + 1);
      iVar6 = iVar5;
    } while ((*pbVar1 & 0x80) == 0);
    iVar5 = iVar5 - iVar2;
    FUN_00408342(iVar3,iVar2,iVar5,uVar7,iVar2,iVar5);
    uVar7 = uVar7 + 1;
  } while (uVar7 < 0x4000);
  FUN_00408387(iVar3);
  puVar8 = &DAT_006e3b90;
  for (iVar3 = 0x18000; iVar3 != 0; iVar3 = iVar3 + -1) {
    *puVar8 = 0;
    puVar8 = puVar8 + 1;
  }
  iVar3 = FUN_004083b5(s_LandTemp_TMP_00628af7);
  if (iVar3 == -1) {
    uVar4 = FUN_005df431();
    return uVar4;
  }
  FUN_00408276(iVar3,&DAT_006e3b90,0x60000);
  FUN_00408387(iVar3);
  FUN_0040840d(s_LandTemp_TMP_00628af7);
  FUN_00436558();
  return in_EAX;
}

