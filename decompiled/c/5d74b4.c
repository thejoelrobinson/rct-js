
void FUN_005d74b4(void)

{
  uint uVar1;
  ushort uVar2;
  
  uVar1 = ((uint)((int)&DAT_0070093a - DAT_0087c3b4) >> 5 |
          ((int)&DAT_0070093a - DAT_0087c3b4) * 0x8000000) - DAT_0087c3b8;
  uVar1 = (uVar1 >> 7 | uVar1 * 0x2000000) + DAT_0087d0c8;
  uVar2 = DAT_0087c396;
  if ((uVar1 >> 3 | uVar1 * 0x20000000) == DAT_0087d79c) {
    while (uVar2 != 0xffff) {
      uVar2 = (&DAT_00743b98)[(uint)uVar2 * 0x80];
      FUN_005d94b6();
    }
  }
  return;
}

