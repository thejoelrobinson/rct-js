
undefined8 FUN_00424c0e(void)

{
  undefined4 in_EAX;
  undefined4 in_EDX;
  int unaff_ESI;
  bool bVar1;
  
  bVar1 = true;
  FUN_005e3b2b();
  if (bVar1) {
    FUN_005e3c3c();
    *(undefined **)(unaff_ESI + 0x1c) = &DAT_005f4000;
    *(uint *)(unaff_ESI + 0xc) = *(uint *)(unaff_ESI + 0xc) | 0xfff4;
    FUN_005e412c();
    DAT_005f4102 = 0xff;
    DAT_005f4101 = 0xff;
  }
  return CONCAT44(in_EDX,in_EAX);
}

