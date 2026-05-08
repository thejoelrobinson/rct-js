
undefined4 FUN_0040d0ac(int param_1,undefined4 param_2,undefined4 param_3)

{
  int iVar1;
  undefined4 uVar2;
  
  iVar1 = FUN_00411fd0(param_2,&DAT_005f04c0 + param_1 * 0x16c,&DAT_005f04bc + param_1 * 0x16c,
                       param_1 * 0x16c + 0x5f04d8);
  if (iVar1 == 0) {
    if (**(short **)(&DAT_005f04bc + param_1 * 0x16c) == 1) {
      iVar1 = FUN_00412dcd(&DAT_005f04c0 + param_1 * 0x16c,param_1 * 0x16c + 0x5f04c4,
                           param_1 * 0x16c + 0x5f04d8,param_3);
      if (iVar1 == 0) {
        *(undefined4 *)(&DAT_005f04f8 + param_1 * 0x16c) = param_3;
        uVar2 = 0;
      }
      else {
        FUN_004123ff(&DAT_005f04c0 + param_1 * 0x16c,&DAT_005f04bc + param_1 * 0x16c);
        uVar2 = 0xffffff99;
      }
    }
    else {
      FUN_004123ff(&DAT_005f04c0 + param_1 * 0x16c,&DAT_005f04bc + param_1 * 0x16c);
      uVar2 = 0xffffff9b;
    }
  }
  else {
    uVar2 = 0xffffff9c;
  }
  return uVar2;
}

