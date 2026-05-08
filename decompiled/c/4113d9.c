
undefined4 FUN_004113d9(uint *param_1,undefined4 param_2,undefined4 *param_3)

{
  uint uVar1;
  int iVar2;
  undefined4 uVar3;
  undefined1 local_18 [4];
  undefined4 local_14;
  int local_10;
  int local_c;
  undefined4 local_8;
  
  if (((DAT_005ec160 != 0) && (DAT_005ec15c != 0)) && (DAT_005ec158 != (int *)0x0)) {
    local_14 = 0x200;
    local_10 = 1;
    do {
      local_c = (**(code **)(*DAT_005ec158 + 0x54))
                          (DAT_005ec158,&local_8,local_18,1,param_1,&param_2);
      if (local_c == 0) {
        uVar1 = *param_1;
        if (uVar1 < 0x32) {
          if (uVar1 == 0x31) {
            DAT_005ec1c4 = 1;
          }
          else if (uVar1 == 3) {
            DAT_005ec1c0 = FUN_00410e47(param_1[2],param_1 + 3,param_1 + 0x10);
          }
          else {
            if (uVar1 != 5) goto LAB_00411516;
            FUN_00410eee(param_1[1]);
            DAT_005ec1c0 = 1;
          }
        }
        else if (uVar1 == 0x1000) {
          iVar2 = FUN_00410f7e(param_1[1]);
          if (iVar2 != 0) {
            FUN_00413170(iVar2 + 4,param_1 + 2);
            FUN_00413170(iVar2 + 0x38,param_1 + 0xf);
            DAT_005ec1c0 = 1;
          }
        }
        else {
LAB_00411516:
          local_10 = 0;
        }
      }
    } while ((local_10 != 0) && (local_c == 0));
    if (local_c == 0) {
      if (param_3 == (undefined4 *)0x0) {
        return param_2;
      }
      uVar3 = FUN_00410f7e(local_8);
      *param_3 = uVar3;
      return param_2;
    }
  }
  return 0;
}

