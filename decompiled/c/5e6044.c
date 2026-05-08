
void FUN_005e6044(void)

{
  int unaff_ESI;
  undefined1 in_ZF;
  
  if ((DAT_00991f30 >> 3 & 1) != 0) {
    FUN_005e3b2b();
    if ((bool)in_ZF) {
      FUN_005e687d();
    }
    else {
      (**(code **)(unaff_ESI + 4))();
    }
  }
  return;
}

