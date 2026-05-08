
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_00406d10(void)

{
  int iVar1;
  undefined4 uVar2;
  uint local_14;
  undefined4 local_10;
  undefined4 local_c;
  undefined4 local_8;
  
  for (local_14 = 0; local_14 < 0x100; local_14 = local_14 + 1) {
    (&DAT_005f1180)[local_14] = 0;
  }
  SystemParametersInfoA(3,0,&local_10,0);
  _DAT_005f1148 = local_10;
  _DAT_005f114c = local_c;
  _DAT_005f1144 = local_8;
  _DAT_005f1150 = GetSystemMetrics(0x17);
  _DAT_005f1158 = GetKeyboardType(0);
  _DAT_005f115c = GetKeyboardType(1);
  _DAT_005f1160 = GetKeyboardType(2);
  DAT_005ebef4 = 0;
  DAT_005ebf04 = 0;
  DAT_005ebf08 = 0;
  DAT_005ebee4 = 0;
  DAT_005ebee8 = 0;
  DAT_005f1140 = 0;
  _DAT_005f1154 = 0;
  _memset(&DAT_005f1284,4,0);
  DAT_005f1288 = 0;
  iVar1 = DirectInputCreateA(DAT_005f1398,0x500,&DAT_005ebef8,0);
  if (iVar1 == 0) {
    iVar1 = (**(code **)(*DAT_005ebef8 + 0xc))(DAT_005ebef8,&DAT_005e7cc0,&DAT_005ebefc,0);
    if ((iVar1 == 0) &&
       (iVar1 = (**(code **)(*DAT_005ebefc + 0x2c))(DAT_005ebefc,&DAT_0041b170), iVar1 == 0)) {
      FUN_00406fca();
      DAT_005f1140 = 1;
    }
    iVar1 = (**(code **)(*DAT_005ebef8 + 0xc))(DAT_005ebef8,&DAT_005e7cb0,&DAT_005ebf00,0);
    if ((iVar1 == 0) &&
       (iVar1 = (**(code **)(*DAT_005ebf00 + 0x2c))(DAT_005ebf00,&DAT_0041b0e0), iVar1 == 0)) {
      FUN_0040704d();
      _DAT_005f1154 = 1;
    }
    uVar2 = 1;
  }
  else {
    uVar2 = 0;
  }
  return uVar2;
}

