
undefined4 FUN_0040d709(int param_1,undefined4 param_2)

{
  undefined4 uVar1;
  int iVar2;
  
  if (*(int *)(&DAT_005ebfe8 + param_1 * 4) == 0) {
    uVar1 = 0;
  }
  else {
    iVar2 = (**(code **)(**(int **)(&DAT_005ebfe8 + param_1 * 4) + 0x40))
                      (*(undefined4 *)(&DAT_005ebfe8 + param_1 * 4),param_2);
    if (iVar2 == 0) {
      uVar1 = 1;
    }
    else {
      uVar1 = 0;
    }
  }
  return uVar1;
}

