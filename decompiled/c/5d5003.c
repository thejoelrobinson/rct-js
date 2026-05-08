
undefined8 FUN_005d5003(void)

{
  undefined4 in_EAX;
  undefined4 in_EDX;
  uint uVar1;
  int unaff_ESI;
  undefined1 in_ZF;
  
  FUN_005e3b2b();
  if (!(bool)in_ZF) {
    uVar1 = *(uint *)(unaff_ESI + 0x14) & 0xfffffe3f;
    if (DAT_00652288 == '\x06') {
      uVar1 = uVar1 | 0x40;
    }
    if (DAT_00652288 == '\a') {
      uVar1 = uVar1 | 0x80;
    }
    if (DAT_00652288 == '\b') {
      uVar1 = uVar1 | 0x100;
    }
    *(uint *)(unaff_ESI + 0x14) = uVar1;
    FUN_005e43de();
  }
  return CONCAT44(in_EDX,in_EAX);
}

