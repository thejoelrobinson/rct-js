
undefined4 FUN_0040a579(int param_1,int param_2)

{
  undefined4 uVar1;
  
  if ((DAT_005ebf5c == 0) && (DAT_005ebf60 == 0)) {
    if ((*(int *)(param_1 + 0x80) == 0) || (*(int *)(param_2 + 0x80) == 0)) {
      uVar1 = 0;
    }
    else {
      DAT_005ebf5c = *(int *)(param_1 + 0x80);
      DAT_005ebf60 = *(int *)(param_2 + 0x80);
      uVar1 = 1;
    }
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}

