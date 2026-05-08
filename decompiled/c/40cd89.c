
undefined4 FUN_0040cd89(int param_1,undefined4 param_2,undefined4 param_3)

{
  int iVar1;
  undefined4 uVar2;
  undefined4 local_1c;
  uint local_18;
  undefined4 local_14;
  undefined4 local_c;
  int local_8;
  
  iVar1 = FUN_00411fd0(param_2,&DAT_005f04c0 + param_1 * 0x16c,&DAT_005f04bc + param_1 * 0x16c,
                       param_1 * 0x16c + 0x5f04d8);
  if (iVar1 == 0) {
    if (**(short **)(&DAT_005f04bc + param_1 * 0x16c) == 1) {
      iVar1 = FUN_00412dcd(&DAT_005f04c0 + param_1 * 0x16c,param_1 * 0x16c + 0x5f04c4,
                           param_1 * 0x16c + 0x5f04d8,param_3);
      if (iVar1 == 0) {
        *(uint *)(&DAT_005f04f0 + param_1 * 0x16c) =
             (uint)(*(int *)(*(int *)(&DAT_005f04bc + param_1 * 0x16c) + 8) * 0x78) / 100;
        _memset(&local_1c,0,0x14);
        local_1c = 0x14;
        local_18 = DAT_005ebfe0 | 0x100e0;
        local_14 = *(undefined4 *)(&DAT_005f04f0 + param_1 * 0x16c);
        local_c = *(undefined4 *)(&DAT_005f04bc + param_1 * 0x16c);
        local_8 = (**(code **)(*DAT_005ec05c + 0xc))
                            (DAT_005ec05c,&local_1c,&DAT_005ebfe8 + param_1 * 4,0);
        if (local_8 == 0) {
          *(undefined4 *)(&DAT_005f04ec + param_1 * 0x16c) =
               *(undefined4 *)(&DAT_005ebfe8 + param_1 * 4);
          *(undefined4 *)(&DAT_005f0508 + param_1 * 0x16c) = 0;
          *(undefined4 *)(&DAT_005f04fc + param_1 * 0x16c) = 0;
          *(undefined4 *)(&DAT_005f0504 + param_1 * 0x16c) = 1;
          FUN_0040cb41(param_1);
          *(undefined4 *)(&DAT_005f04f8 + param_1 * 0x16c) = param_3;
          *(undefined4 *)(&DAT_005f0500 + param_1 * 0x16c) = 0;
          uVar2 = 0;
        }
        else {
          uVar2 = 0xffffff9a;
        }
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

