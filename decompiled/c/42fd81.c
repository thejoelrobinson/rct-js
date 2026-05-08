
int FUN_0042fd81(void)

{
  int iVar1;
  bool bVar2;
  
  DAT_005f8d35 = 1;
  iVar1 = FUN_004083b5(&DAT_0099aa88);
  bVar2 = iVar1 != -1;
  if (iVar1 != -1) {
    DAT_005f88a4 = iVar1;
    FUN_0042fa5f();
    if (!bVar2) {
      FUN_0042f96d();
      FUN_0042f98e();
      iVar1 = FUN_00408387(DAT_005f88a4);
      DAT_0099fe00 = 0;
      if (DAT_0087d79c == 0) {
        iVar1 = FUN_004447f6();
      }
      return iVar1;
    }
    iVar1 = FUN_00408387(DAT_005f88a4);
  }
  return iVar1;
}

