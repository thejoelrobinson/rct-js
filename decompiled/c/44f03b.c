
uint FUN_0044f03b(void)

{
  uint uVar1;
  int unaff_ESI;
  bool bVar2;
  
  bVar2 = true;
  uVar1 = FUN_005e3b2b();
  if (!bVar2) {
    (&DAT_00631d0d)[(byte)(&DAT_005f5d05)[(uVar1 & 0xff) * 8]] = (char)uVar1;
    (**(code **)(unaff_ESI + 4))();
  }
  return uVar1;
}

