
undefined4 FUN_00407e33(int *param_1,undefined4 param_2)

{
  undefined4 uVar1;
  int iVar2;
  
  if (*param_1 == 0) {
    uVar1 = 0;
  }
  else {
    iVar2 = (**(code **)(*(int *)*param_1 + 0x3c))(*param_1,param_2);
    if (iVar2 == 0) {
      uVar1 = 1;
    }
    else {
      uVar1 = 0;
    }
  }
  return uVar1;
}

