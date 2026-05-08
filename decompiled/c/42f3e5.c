
void FUN_0042f3e5(void)

{
  int iVar1;
  undefined2 extraout_CX;
  short sVar2;
  int unaff_ESI;
  bool bVar3;
  
  if (DAT_008dbed2 != -1) {
    FUN_005d3b30();
    FUN_00436634();
    FUN_00444b4a();
    FUN_00444b0a();
    FUN_0042fc92();
    sVar2 = 0;
    bVar3 = false;
    DAT_008ad1c2 = FUN_005e68e2();
    DAT_008ad1c6 = extraout_CX;
    if (!bVar3) {
      iVar1 = *(int *)(unaff_ESI + 8);
      DAT_008ad1c2 = (*(ushort *)(iVar1 + 0xc) >> 1) + *(short *)(iVar1 + 8);
      sVar2 = (*(ushort *)(iVar1 + 0xe) >> 1) + *(short *)(iVar1 + 10);
      DAT_008ad1c6 = CONCAT11((undefined1)DAT_00991f88,*(undefined1 *)(iVar1 + 0x10));
    }
    DAT_005f8d35 = 0;
    DAT_008ad1c4 = sVar2;
    iVar1 = FUN_004083e1(&DAT_0099aa88);
    if (iVar1 != -1) {
      DAT_005f88a4 = iVar1;
      FUN_0042f6b3();
      FUN_0042f6a8();
      FUN_0042f74a();
      FUN_0042fa02();
      iVar1 = FUN_00408387(DAT_005f88a4);
      if ((iVar1 != 0) && (DAT_005f88af == '\0')) {
        FUN_005e6028();
        DAT_0099a4fe = 0;
        return;
      }
    }
  }
  return;
}

