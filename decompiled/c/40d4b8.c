
undefined4
FUN_0040d4b8(int param_1,undefined4 param_2,undefined4 param_3,undefined4 param_4,undefined4 param_5
            )

{
  *(undefined4 *)(&DAT_005f0504 + param_1 * 0x16c) = param_2;
  FUN_0040d709(param_1,param_4);
  FUN_0040d777(param_1,param_3);
  FUN_0040d69b(param_1,param_5);
  (**(code **)(**(int **)(&DAT_005ebfe8 + param_1 * 4) + 0x34))
            (*(undefined4 *)(&DAT_005ebfe8 + param_1 * 4),0);
  (**(code **)(**(int **)(&DAT_005ebfe8 + param_1 * 4) + 0x30))
            (*(undefined4 *)(&DAT_005ebfe8 + param_1 * 4),0,0,1);
  *(undefined4 *)(&DAT_005f03a0 + param_1 * 0x16c) = 1;
  return 1;
}

