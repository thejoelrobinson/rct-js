
void FUN_0040a3da(void)

{
  int iVar1;
  bool bVar2;
  undefined4 local_74;
  undefined4 local_70;
  byte local_b;
  int *local_8;
  
  if (DAT_005ebf54 != 0) {
    if ((DAT_005f0950 < 2) || (DAT_005ebf4c != 0)) {
      DAT_005ebf4c = 1;
    }
    else {
      iVar1 = (**(code **)(*DAT_005ebf30 + 0x38))(DAT_005ebf30,&local_8);
      if (iVar1 == 0) {
        local_74 = 0x6c;
        local_70 = 1;
        iVar1 = (**(code **)(*local_8 + 0x58))(local_8,&local_74);
        if (iVar1 == 0) {
          bVar2 = (local_b & 2) == 0;
          if (bVar2) {
            FUN_004090e3();
          }
          DAT_005ebf50 = (uint)bVar2;
          DAT_005ebf4c = 1;
        }
      }
    }
  }
  return;
}

