
void FUN_00439135(void)

{
  uint uVar1;
  ushort uVar2;
  
  uVar1 = 0;
  uVar2 = DAT_0087c398;
  while (uVar2 != 0xffff) {
    uVar2 = (&DAT_00743b98)[(uint)uVar2 * 0x80];
    if ((uVar1 & 0x7f) == (DAT_0088741c & 0x7f)) {
      FUN_00439288();
    }
    FUN_00439822();
    uVar1 = uVar1 + 1;
  }
  return;
}

