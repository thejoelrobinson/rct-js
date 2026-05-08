
undefined4 FUN_0040c93f(int param_1)

{
  int iVar1;
  
  if (*(int *)(&DAT_005f03a4 + param_1 * 0x16c) == 0) {
    iVar1 = FUN_00412dcd(&DAT_005f04c0 + param_1 * 0x16c,param_1 * 0x16c + 0x5f04c4,
                         param_1 * 0x16c + 0x5f04d8,*(undefined4 *)(&DAT_005f04b8 + param_1 * 0x16c)
                        );
    *(undefined4 *)(&DAT_005f04f8 + param_1 * 0x16c) =
         *(undefined4 *)(&DAT_005f04b8 + param_1 * 0x16c);
    if (iVar1 != 0) {
      return 0;
    }
  }
  else {
    if (*(int *)(&DAT_005f04c0 + param_1 * 0x16c) != 0) {
      FUN_004123ff(&DAT_005f04c0 + param_1 * 0x16c,&DAT_005f04bc + param_1 * 0x16c);
    }
    iVar1 = FUN_0040d0ac(param_1,param_1 * 0x16c + 0x5f03a8,
                         *(undefined4 *)(&DAT_005f04b0 + param_1 * 0x16c));
    if (iVar1 != 0) {
      return 0;
    }
    *(undefined4 *)(&DAT_005f0504 + param_1 * 0x16c) =
         *(undefined4 *)(&DAT_005f04b4 + param_1 * 0x16c);
    *(undefined4 *)(&DAT_005f04b8 + param_1 * 0x16c) =
         *(undefined4 *)(&DAT_005f04b0 + param_1 * 0x16c);
    *(undefined4 *)(&DAT_005f03a4 + param_1 * 0x16c) = 0;
  }
  return 1;
}

