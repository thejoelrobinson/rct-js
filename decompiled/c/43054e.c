
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0043054e(void)

{
  char cVar1;
  ushort uVar2;
  int iVar3;
  char *pcVar4;
  char *pcVar5;
  ushort in_AX;
  uint uVar6;
  byte bVar7;
  char *pcVar8;
  char *pcVar9;
  char *pcVar10;
  bool bVar11;
  
  uVar6 = FUN_0040473c();
  DAT_005f8534 = uVar6 ^ DAT_006e3b88;
  DAT_005f8538 = DAT_006e3b8c;
  FUN_005d3b30();
  pcVar8 = &DAT_0099c16c + (uint)in_AX * 0x10;
  pcVar4 = &DAT_005f8fb3;
  pcVar5 = &DAT_0099aa88;
  do {
    pcVar10 = pcVar5;
    pcVar9 = pcVar4;
    cVar1 = *pcVar9;
    *pcVar10 = cVar1;
    pcVar4 = pcVar9 + 1;
    pcVar5 = pcVar10 + 1;
  } while (cVar1 != '*');
  do {
    cVar1 = *pcVar8;
    *pcVar10 = cVar1;
    pcVar8 = pcVar8 + 1;
    pcVar10 = pcVar10 + 1;
    bVar11 = false;
  } while (cVar1 != '\0');
  FUN_0042fd81();
  if ((!bVar11) && (in_AX == DAT_008dbed2)) {
    FUN_00436558();
    FUN_00444b4a();
    _DAT_0099a500 = _DAT_0099a500 & 0xfffe;
    FUN_005e0d60();
    FUN_004298a0();
    FUN_005e68e2();
    iVar3 = *(int *)(pcVar9 + 9);
    pcVar9[0x16f] = -1;
    pcVar9[0x170] = -1;
    *(undefined2 *)(pcVar9 + 0x171) = DAT_008ad1c2;
    *(undefined2 *)(pcVar9 + 0x173) = DAT_008ad1c4;
    DAT_00991f88._0_1_ = (undefined1)((ushort)DAT_008ad1c6 >> 8);
    bVar7 = (char)DAT_008ad1c6 - *(char *)(iVar3 + 0x10);
    *(char *)(iVar3 + 0x10) = (char)DAT_008ad1c6;
    if (bVar7 != 0) {
      if ((char)bVar7 < '\0') {
        *(short *)(iVar3 + 0xc) = *(short *)(iVar3 + 0xc) >> (-bVar7 & 0x1f);
        *(short *)(iVar3 + 0xe) = *(short *)(iVar3 + 0xe) >> (-bVar7 & 0x1f);
      }
      else {
        *(short *)(iVar3 + 0xc) = *(short *)(iVar3 + 0xc) << (bVar7 & 0x1f);
        *(short *)(iVar3 + 0xe) = *(short *)(iVar3 + 0xe) << (bVar7 & 0x1f);
      }
    }
    uVar2 = *(ushort *)(iVar3 + 0xe);
    *(ushort *)(pcVar9 + 0x171) = *(short *)(pcVar9 + 0x171) - (*(ushort *)(iVar3 + 0xc) >> 1);
    *(ushort *)(pcVar9 + 0x173) = *(short *)(pcVar9 + 0x173) - (uVar2 >> 1);
    FUN_005e43de();
    FUN_005e16f7();
    FUN_004448fb();
    FUN_005ddf20();
    FUN_0042f199();
    DAT_006e3b88 = DAT_005f8534;
    DAT_006e3b8c = DAT_005f8538;
    FUN_004311e7();
    FUN_0042c6f3();
    if (DAT_0087d0d0 != '\0') {
      FUN_004274a9();
    }
    DAT_0087cc88 = FUN_00428ec0();
    DAT_0087d514 = FUN_004292b0();
    DAT_0087d724 = FUN_0042934f();
    FUN_005e6028();
    DAT_0099a4fe = 0;
    _DAT_0099a4f4 = 62000;
    return;
  }
  return;
}

