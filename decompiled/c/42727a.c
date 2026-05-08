
void FUN_0042727a(void)

{
  undefined4 *unaff_ESI;
  bool bVar1;
  
  bVar1 = true;
  FUN_005e5fcb();
  if (bVar1) {
    FUN_0042756b();
    unaff_ESI[0x57] = 0xffffffff;
  }
  *(undefined2 *)(unaff_ESI + 0x59) = 0;
  FUN_005e43de();
  unaff_ESI[7] = PTR_DAT_005f5084;
  unaff_ESI[3] = DAT_005f50d8;
  unaff_ESI[6] = DAT_005f50f4;
  *unaff_ESI = PTR_DAT_005f50a0;
  unaff_ESI[1] = PTR_LAB_005f50bc;
  unaff_ESI[5] = 0;
  FUN_005e412c();
  FUN_00428c0b();
  return;
}

