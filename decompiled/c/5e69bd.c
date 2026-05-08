
void FUN_005e69bd(void)

{
  int iVar1;
  int unaff_ESI;
  undefined1 uVar2;
  
  uVar2 = DAT_009a0128 == -1;
  if ((bool)uVar2) {
    return;
  }
  FUN_005e3b2b();
  if (!(bool)uVar2) {
    if (DAT_009a0118 == 1) {
      uVar2 = DAT_009a0120 == 2;
      if (!(bool)uVar2) {
        FUN_005e6a55();
        FUN_005e3b2b();
        (**(code **)(unaff_ESI + 4))();
        FUN_005e698a();
        return;
      }
    }
    else {
      iVar1 = FUN_00403a92();
      uVar2 = 0;
      if (iVar1 == 1) {
        return;
      }
    }
  }
  FUN_005e3b2b();
  if (!(bool)uVar2) {
    (**(code **)(unaff_ESI + 4))();
  }
  FUN_005e698a();
  return;
}

