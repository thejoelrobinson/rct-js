
undefined4 FUN_004070f8(void)

{
  undefined4 local_18;
  undefined4 local_14;
  byte local_c;
  byte local_b;
  byte local_a;
  byte local_9;
  int local_8;
  
  DAT_005ebee4 = 0;
  DAT_005f1280 = 0;
  DAT_005f128c = 0;
  if (DAT_005ebefc != (int *)0x0) {
    local_8 = (**(code **)(*DAT_005ebefc + 0x24))(DAT_005ebefc,0x10,&local_18);
    if (local_8 == 0) {
      DAT_005f128c = local_18;
      DAT_005f1280 = local_14;
      DAT_005f1284 = local_c;
      DAT_005f1285 = local_b;
      DAT_005f1286 = local_a;
      DAT_005f1287 = local_9;
      DAT_005f1288 = local_a | local_9 | local_c | local_b;
      DAT_005ebee4 = 1;
    }
    else if ((local_8 == -0x7ff8ffe2) || (local_8 == -0x7ff8fff4)) {
      FUN_00406fca();
    }
  }
  return DAT_005ebee4;
}

