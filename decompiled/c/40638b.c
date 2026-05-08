
undefined4 FUN_0040638b(undefined4 param_1)

{
  undefined4 uVar1;
  
  if (DAT_005ebe44 == 0) {
    DAT_005ebe48 = (*DAT_005ebe78)(param_1);
    if (DAT_005ebe48 == 0) {
      uVar1 = 0;
    }
    else {
      DAT_005ebe4c = 0;
      DAT_005f12b0 = param_1;
      DAT_005ebe44 = 1;
      uVar1 = 1;
    }
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}

