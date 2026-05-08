
byte FUN_00417ce0(uint param_1)

{
  if (DAT_005f3f60 <= param_1) {
    return 0;
  }
  return *(byte *)((&DAT_005f3e60)[(int)param_1 >> 5] + 4 + (param_1 & 0x1f) * 8) & 0x40;
}

