
void FUN_0042fbc6(void)

{
  int iVar1;
  
  FUN_005d3b30();
  DAT_005f8d35 = 1;
  iVar1 = FUN_004083e1(&DAT_0099aa88);
  if (iVar1 != -1) {
    DAT_005f88a4 = iVar1;
    FUN_0042f6b3();
    FUN_0042f6a8();
    FUN_0042f74a();
    FUN_0042fa3a();
    iVar1 = FUN_00408387(DAT_005f88a4);
    if ((iVar1 != 0) && (DAT_005f88af == '\0')) {
      FUN_005e6028();
      return;
    }
  }
  return;
}

