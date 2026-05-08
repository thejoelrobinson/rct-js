
undefined4 FUN_0040d7e5(int param_1,undefined4 param_2,undefined4 param_3,undefined4 param_4)

{
  *(undefined4 *)(&DAT_005f03a4 + param_1 * 0x16c) = 1;
  FUN_004138d0(param_1 * 0x16c + 0x5f03a8,param_2,0x104);
  *(undefined4 *)(&DAT_005f04ac + param_1 * 0x16c) = 0;
  *(undefined4 *)(&DAT_005f04b0 + param_1 * 0x16c) = param_4;
  *(undefined4 *)(&DAT_005f04b4 + param_1 * 0x16c) = param_3;
  *(undefined4 *)(&DAT_005f0504 + param_1 * 0x16c) = 1;
  return 1;
}

