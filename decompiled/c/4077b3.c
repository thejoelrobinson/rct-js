
undefined4 FUN_004077b3(int param_1,undefined4 *param_2,int param_3,int param_4)

{
  int iVar1;
  undefined4 local_38 [2];
  undefined4 local_30;
  undefined4 local_24;
  int *local_20;
  undefined4 local_1c;
  uint local_18;
  undefined4 local_14;
  undefined4 local_10;
  undefined4 local_c;
  int local_8;
  
  local_1c = 0;
  local_18 = 0;
  local_14 = 0;
  local_10 = 0;
  local_c = 0;
  local_24 = 0;
  local_20 = (int *)FUN_0040dc6f();
  while( true ) {
    if (local_20 == (int *)0x0) {
      local_8 = FUN_0040de9c(param_1);
      if (local_8 != 0) {
        iVar1 = FUN_0040db5e(local_8,&local_c,&local_24,&local_14);
        if (iVar1 != 0) {
          local_1c = 0x14;
          local_18 = 0x10002;
          if (param_3 != 0) {
            if (param_3 == 2) {
              local_18 = 0x10012;
            }
            else if (param_3 == 3) {
              local_18 = 0x101f2;
            }
            else {
              local_18 = 0x100e2;
            }
          }
          if (DAT_005ebf14 != 0) {
            local_18 = local_18 | 0x4000;
          }
          if (param_4 != 0) {
            local_18 = local_18 | 8;
          }
          iVar1 = (**(code **)(*DAT_005ec05c + 0xc))(DAT_005ec05c,&local_1c,param_2,0);
          if (iVar1 == 0) {
            iVar1 = FUN_0040dba3(*param_2,local_24,local_14);
            if (iVar1 != 0) {
              param_2[2] = param_3;
              param_2[1] = param_1;
              local_38[0] = 0x14;
              (**(code **)(*(int *)*param_2 + 0xc))(*param_2,local_38);
              param_2[3] = local_30;
              FUN_0040dcaf(param_2);
              return 1;
            }
            (**(code **)(*(int *)*param_2 + 8))(*param_2);
            *param_2 = 0;
          }
        }
        *param_2 = 0;
      }
      return 0;
    }
    if (((*local_20 != 0) && (local_20[1] == param_1)) &&
       (iVar1 = FUN_004079d3(param_2,local_20), iVar1 != 0)) break;
    local_20 = (int *)FUN_0040dc84(local_20);
  }
  return 1;
}

