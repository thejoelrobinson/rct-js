
undefined4 FUN_0040dba3(int *param_1,int param_2,int param_3)

{
  int iVar1;
  undefined4 local_14;
  void *local_10;
  int local_c;
  size_t local_8;
  
  if ((((param_1 != (int *)0x0) && (param_2 != 0)) && (param_3 != 0)) &&
     (iVar1 = (**(code **)(*param_1 + 0x2c))
                        (param_1,0,param_3,&local_10,&local_8,&local_14,&local_c,0), -1 < iVar1)) {
    _memset(local_10,0,local_8);
    FUN_004138d0(local_10,param_2,local_8);
    if (local_c != 0) {
      FUN_004138d0(local_14,local_8 + param_2,local_c);
    }
    (**(code **)(*param_1 + 0x4c))(param_1,local_10,local_8,local_14,local_c);
    return 1;
  }
  return 0;
}

