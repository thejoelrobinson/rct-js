
uint FUN_0041ffd2(void)

{
  uint uVar1;
  
  uVar1 = (uint)DAT_008ae980;
  if (uVar1 != 0) {
    uVar1 = uVar1 + 10;
  }
  if (0x14 < uVar1) {
    uVar1 = 0x14;
  }
  return uVar1 * 0x28000 >> 0x10;
}

