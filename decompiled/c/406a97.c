
undefined4 FUN_00406a97(undefined4 param_1,undefined4 param_2,undefined4 param_3)

{
  int iVar1;
  
  if (DAT_005ebed8 != 0) {
    FUN_00406ce7();
  }
  DAT_005ebed8 = 0;
  DAT_005ebee0 = 0;
  DAT_005ebedc = 0;
  iVar1 = FUN_00410d3d(param_1);
  if ((iVar1 != 0) && (iVar1 = FUN_004111ad(param_3,param_2), iVar1 != 0)) {
    DAT_005ebed8 = 1;
    if (0 < DAT_005ec148) {
      DAT_005ebedc = 1;
      FUN_0041102c();
      DAT_005ebee0 = FUN_00411041();
    }
    return 1;
  }
  FUN_00406ce7();
  return 0;
}

