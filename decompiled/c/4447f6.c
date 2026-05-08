
undefined4 FUN_004447f6(void)

{
  undefined4 in_EAX;
  uint uVar1;
  
  uVar1 = ((uint)((int)&DAT_0070093a - DAT_0087c3b4) >> 5 |
          ((int)&DAT_0070093a - DAT_0087c3b4) * 0x8000000) - DAT_0087c3b8;
  uVar1 = (uVar1 >> 7 | uVar1 * 0x2000000) + DAT_0087d0c8;
  DAT_0087d79c = uVar1 >> 3 | uVar1 * 0x20000000;
  return in_EAX;
}

