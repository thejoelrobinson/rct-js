
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_004269da(void)

{
  uint uVar1;
  
  DAT_008d7ea4 = 0;
  DAT_0087c3ac = 0x309;
  DAT_0087c3c2 = 0x8000;
  DAT_0087cba5._0_1_ = 0x18;
  DAT_0087cba5._1_1_ = 6;
  DAT_0087cba5._2_1_ = 0xe;
  _DAT_0087c3bc = 0;
  DAT_0087c81c = 0;
  DAT_0087cba0 = 0;
  _DAT_0087c81e = 0;
  DAT_0087c3d6 = 0;
  DAT_0087cc88 = 0;
  DAT_0087d0c4 = 0;
  DAT_0087d0c6 = 0;
  DAT_0087c3d7 = 1;
  DAT_0087ccca = 0xff;
  DAT_0087cccc = 0xffffffff;
  uVar1 = 0;
  do {
    (&DAT_0087d0da)[uVar1] = 0;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 0x14);
  DAT_0087ccd0 = 0xffffffff;
  DAT_0087ccd5 = 0xfffffffe;
  DAT_0087ccda = 0xfffffffd;
  FUN_00443f5c();
  uVar1 = 0;
  do {
    *(undefined4 *)((int)&DAT_0087c3dc + uVar1) = 0;
    uVar1 = uVar1 + 4;
  } while (uVar1 < 8);
  uVar1 = 0;
  do {
    *(undefined4 *)((int)&DAT_0087cba5 + uVar1 * 4 + 3) = 0xffffffff;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 0x38);
  DAT_0087c3c0 = 100;
  DAT_0087c3ca = 0xffff;
  DAT_0087c3d0 = 0xffff;
  FUN_00426b08();
  DAT_0087c3dc = 0xffffffff;
  DAT_0087c3e0 = 0x1ffff;
  uVar1 = 0;
  do {
    *(undefined4 *)(&DAT_0087c3fc + uVar1 * 4) = 0xffffffff;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 8);
  return;
}

