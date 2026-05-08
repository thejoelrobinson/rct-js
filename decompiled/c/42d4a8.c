
void FUN_0042d4a8(void)

{
  char *pcVar1;
  int iVar2;
  
  FUN_0042f239();
  iVar2 = FUN_004083b5(0x13);
  if (iVar2 != -1) {
    DAT_005f5550 = iVar2;
    DAT_005f5554 = FUN_00408254(iVar2,0);
    FUN_00408387(DAT_005f5550);
    FUN_0042f239();
    iVar2 = FUN_004080e0(0x13,0,0);
    if (iVar2 != 0) {
      DAT_005f5554 = DAT_005f5554 + iVar2;
      DAT_005f554c = iVar2;
      DAT_005f5550 = iVar2;
      if (DAT_005f8d5b != '\x01') {
        FUN_005e698a();
        FUN_00452835();
        FUN_009bb4b4();
        DAT_005e9184 = 0;
        FUN_009bb9f5();
        FUN_009bb717();
        FUN_0045268c();
      }
      DAT_0099c16b = 1;
      iVar2 = -1;
      do {
        pcVar1 = &DAT_0043091b + iVar2;
        iVar2 = iVar2 + 1;
      } while (*pcVar1 != '\x02');
      FUN_0043054e();
      FUN_0042d56c();
    }
  }
  return;
}

