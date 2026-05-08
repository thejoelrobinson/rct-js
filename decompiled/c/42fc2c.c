
uint FUN_0042fc2c(void)

{
  uint uVar1;
  bool bVar2;
  
  DAT_005f8d35 = 1;
  uVar1 = FUN_004083b5(&DAT_0099aa88);
  bVar2 = uVar1 != 0xffffffff;
  if (uVar1 != 0xffffffff) {
    DAT_005f88a4 = uVar1;
    FUN_0042fb22();
    if (bVar2) {
      uVar1 = FUN_00408387(DAT_005f88a4);
    }
    else {
      FUN_0042f96d();
      FUN_0042f98e();
      FUN_00408387(DAT_005f88a4);
      uVar1 = (uint)(DAT_00656b3b >> 2);
      if (DAT_00656b3b >> 2 == 0) {
        return 0;
      }
    }
  }
  return uVar1;
}

