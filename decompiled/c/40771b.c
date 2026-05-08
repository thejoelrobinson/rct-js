
undefined4 FUN_0040771b(undefined4 param_1)

{
  undefined4 uVar1;
  
  if (DAT_005ec050 == 0) {
    DAT_005ec050 = FUN_004080e0(param_1,0,0);
    if (DAT_005ec050 == 0) {
      uVar1 = 0;
    }
    else {
      uVar1 = 1;
    }
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}

