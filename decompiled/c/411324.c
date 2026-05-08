
undefined4 FUN_00411324(undefined4 *param_1,undefined4 param_2,undefined4 param_3)

{
  int local_8;
  
  if (((DAT_005ec160 != 0) && (DAT_005ec15c != 0)) && (DAT_005ec158 != (int *)0x0)) {
    if (param_1 == (undefined4 *)0x0) {
      local_8 = (**(code **)(*DAT_005ec158 + 0x5c))
                          (DAT_005ec158,DAT_005ec170,0,DAT_005ec168,param_2,param_3);
    }
    else {
      local_8 = (**(code **)(*DAT_005ec158 + 0x5c))
                          (DAT_005ec158,DAT_005ec170,*param_1,DAT_005ec168,param_2,param_3);
    }
    if (local_8 == 0) {
      return 1;
    }
  }
  return 0;
}

