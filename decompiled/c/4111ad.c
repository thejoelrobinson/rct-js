
undefined4 FUN_004111ad(undefined4 param_1,undefined4 param_2)

{
  int iVar1;
  undefined4 uVar2;
  
  if ((DAT_005ec158 == (int *)0x0) || (DAT_005ec160 == 0)) {
    uVar2 = 0;
  }
  else {
    iVar1 = (**(code **)(*DAT_005ec158 + 0x14))(DAT_005ec158,&DAT_005ec170,param_1,param_2,0);
    if (iVar1 == 0) {
      FUN_00413170(&DAT_005ec1a8,param_1);
      FUN_00413170(&DAT_005ec174,param_2);
      DAT_005ec15c = 1;
      uVar2 = 1;
    }
    else {
      uVar2 = 0;
    }
  }
  return uVar2;
}

