
void FUN_00443e98(void)

{
  undefined4 *unaff_ESI;
  bool bVar1;
  
  bVar1 = true;
  FUN_005e5fcb();
  if (bVar1) {
    FUN_00443ef0();
  }
  *(undefined2 *)(unaff_ESI + 0x59) = 0;
  FUN_005e43de();
  unaff_ESI[7] = PTR_DAT_00630704;
  unaff_ESI[3] = DAT_00630740;
  unaff_ESI[6] = DAT_00630754;
  *unaff_ESI = PTR_DAT_00630718;
  unaff_ESI[1] = PTR_LAB_0063072c;
  unaff_ESI[5] = 0;
  FUN_00443e92();
  FUN_005e412c();
  return;
}

