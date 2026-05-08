
void FUN_0042d678(void)

{
  ushort uVar1;
  
  uVar1 = DAT_0087c39a;
  while (uVar1 != 0xffff) {
    uVar1 = (&DAT_00743b98)[(uint)uVar1 * 0x80];
    FUN_0042db0f();
  }
  return;
}

