
undefined8 FUN_005e0c7e(void)

{
  undefined4 in_EAX;
  undefined4 in_EDX;
  int unaff_ESI;
  bool bVar1;
  
  bVar1 = true;
  FUN_005e3b2b();
  if (bVar1) {
    FUN_005e3c3c();
    *(undefined **)(unaff_ESI + 0x1c) = &DAT_0099fd70;
    *(uint *)(unaff_ESI + 0xc) = *(uint *)(unaff_ESI + 0xc) | 0x34;
    FUN_005e412c();
  }
  return CONCAT44(in_EDX,in_EAX);
}

