
void FUN_00431100(void)

{
  undefined4 *unaff_ESI;
  bool bVar1;
  
  bVar1 = true;
  FUN_005e5fcb();
  if (bVar1) {
    FUN_0043115d();
    FUN_004312bf();
  }
  *(undefined2 *)(unaff_ESI + 0x59) = 1;
  FUN_005e43de();
  unaff_ESI[7] = PTR_DAT_005f967c;
  unaff_ESI[3] = DAT_005f9694;
  unaff_ESI[6] = DAT_005f969c;
  *unaff_ESI = PTR_LAB_005f9684;
  unaff_ESI[1] = PTR_LAB_005f968c;
  unaff_ESI[5] = 0;
  FUN_004310fa();
  FUN_005e412c();
  return;
}

