
bool FUN_0040d26c(int param_1,undefined4 param_2)

{
  int iVar1;
  
  iVar1 = FUN_0040cd89(param_1,param_2,0);
  if (iVar1 == 0) {
    (**(code **)(**(int **)(&DAT_005ebfe8 + param_1 * 4) + 0x34))
              (*(undefined4 *)(&DAT_005ebfe8 + param_1 * 4),0);
    (**(code **)(**(int **)(&DAT_005ebfe8 + param_1 * 4) + 0x30))
              (*(undefined4 *)(&DAT_005ebfe8 + param_1 * 4),0,0,1);
    *(undefined4 *)(&DAT_005f03a0 + param_1 * 0x16c) = 1;
  }
  return iVar1 == 0;
}

