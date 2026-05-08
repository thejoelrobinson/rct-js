
undefined4 FUN_00410fc7(int param_1,undefined4 param_2,undefined4 param_3,byte param_4)

{
  undefined4 uVar1;
  
  if ((param_4 & 1) == 0) {
    if ((DAT_005ec15c == 0) || (DAT_005ec170 != param_1)) {
      uVar1 = FUN_00410e47(param_1,param_3,param_2);
    }
    else {
      uVar1 = 1;
    }
  }
  else {
    uVar1 = 1;
  }
  return uVar1;
}

