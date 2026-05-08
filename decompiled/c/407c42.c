
undefined4
FUN_00407c42(int *param_1,int param_2,undefined4 param_3,undefined4 param_4,undefined4 param_5)

{
  undefined4 uVar1;
  undefined4 local_8;
  
  local_8 = 0;
  if (*param_1 == 0) {
    uVar1 = 0;
  }
  else {
    FUN_00407d75(param_1,param_5);
    FUN_00407dd4(param_1,param_4);
    FUN_00407e33(param_1,param_3);
    if (param_2 == 0) {
      local_8 = (**(code **)(*(int *)*param_1 + 0x30))(*param_1,0,0,0);
    }
    else if (param_2 == 1) {
      local_8 = (**(code **)(*(int *)*param_1 + 0x30))(*param_1,0,0,1);
    }
    if (local_8 == 0) {
      uVar1 = 1;
    }
    else {
      uVar1 = 0;
    }
  }
  return uVar1;
}

