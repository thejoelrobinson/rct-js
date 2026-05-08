
undefined4 FUN_0041124f(undefined4 param_1,undefined4 param_2)

{
  int iVar1;
  undefined4 local_54;
  undefined4 local_50;
  undefined1 local_4c [52];
  undefined1 local_18 [20];
  
  if ((((DAT_005ec160 != 0) && (DAT_005ec15c != 0)) && (DAT_005ec158 != (int *)0x0)) &&
     (iVar1 = (**(code **)(*DAT_005ec158 + 0x60))(DAT_005ec158,DAT_005ec170,param_2,param_1),
     iVar1 == 0)) {
    FUN_00413170(&DAT_005ec174,param_1);
    FUN_00413170(&DAT_005ec1a8,param_2);
    local_54 = 0x1000;
    local_50 = DAT_005ec170;
    FUN_00413170(local_4c,param_1);
    FUN_00413170(local_18,param_2);
    FUN_00411324(0,&local_54,0x50);
    return 1;
  }
  return 0;
}

