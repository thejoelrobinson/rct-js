
undefined8 FUN_005d60fb(void)

{
  undefined4 in_EAX;
  undefined4 in_EDX;
  int unaff_ESI;
  
  DAT_0065d8cf = FUN_005d3b30();
  FUN_005e3f31();
  *(undefined **)(unaff_ESI + 0x1c) = &DAT_006521b8;
  *(uint *)(unaff_ESI + 0xc) = *(uint *)(unaff_ESI + 0xc) | 0x34;
  FUN_005e412c();
  *(undefined2 *)(unaff_ESI + 0x15a) = 0xffff;
  *(undefined2 *)(unaff_ESI + 0x15c) = 0xffff;
  FUN_005e6bcd();
  DAT_00652290 = 0;
  FUN_005e0c2f();
  FUN_00424db7();
  DAT_006522b0 = 0x80000000;
  DAT_006522b4 = 0xffff;
  DAT_006522b8 = 0;
  return CONCAT44(in_EDX,in_EAX);
}

