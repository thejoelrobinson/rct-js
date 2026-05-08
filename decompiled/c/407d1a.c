
undefined4 FUN_00407d1a(int *param_1)

{
  undefined4 uVar1;
  int iVar2;
  
  if (*param_1 == 0) {
    uVar1 = 0;
  }
  else {
    iVar2 = (**(code **)(*(int *)*param_1 + 0x48))(*param_1);
    if (iVar2 == 0) {
      uVar1 = 1;
    }
    else {
      uVar1 = 0;
    }
  }
  return uVar1;
}

