
void FUN_0045818d(void)

{
  ushort uVar1;
  
  DAT_0099c163 = DAT_008d7ea4;
  for (uVar1 = DAT_0087c398; uVar1 != 0xffff; uVar1 = (&DAT_00743b98)[(uint)uVar1 * 0x80]) {
    if ((&DAT_00743bc2)[(uint)uVar1 * 0x100] == '\x01') {
      DAT_0099c167 = 0x28;
      FUN_004429db();
    }
  }
  return;
}

