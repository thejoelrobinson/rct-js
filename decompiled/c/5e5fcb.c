
undefined4 FUN_005e5fcb(void)

{
  undefined4 uVar1;
  int unaff_ESI;
  undefined1 in_ZF;
  
  uVar1 = FUN_005e3b2b();
  if (!(bool)in_ZF) {
    *(ushort *)(unaff_ESI + 0x32) = *(ushort *)(unaff_ESI + 0x32) | 0x600;
    FUN_005e43de();
    FUN_005e5c36();
  }
  return uVar1;
}

