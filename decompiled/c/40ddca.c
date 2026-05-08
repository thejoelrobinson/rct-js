
undefined4 FUN_0040ddca(int *param_1)

{
  int iVar1;
  undefined4 local_20;
  undefined4 local_1c;
  undefined4 local_18;
  undefined4 local_14;
  undefined4 local_10;
  undefined4 local_c;
  int local_8;
  
  local_1c = 0;
  local_18 = 0;
  local_14 = 0;
  local_10 = 0;
  local_c = 0;
  local_20 = 0;
  if (*param_1 != 0) {
    (**(code **)(*(int *)*param_1 + 0x50))(*param_1);
    local_8 = FUN_0040de9c(param_1[1]);
    if (((local_8 != 0) && (iVar1 = FUN_0040db5e(local_8,&local_c,&local_20,&local_14), iVar1 != 0))
       && (iVar1 = FUN_0040dba3(*param_1,local_20,param_1[3]), iVar1 != 0)) {
      return 1;
    }
  }
  return 0;
}

