
uint FUN_0041ff1d(void)

{
  uint uVar1;
  int unaff_EDI;
  
  uVar1 = *(byte *)(unaff_EDI + 0xce) & 0x1f;
  if (0xb < uVar1) {
    uVar1 = 0xb;
  }
  return uVar1 * 0xbd174 >> 0x10;
}

