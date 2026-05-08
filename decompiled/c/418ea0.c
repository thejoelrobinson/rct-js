
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

undefined4 FUN_00418ea0(uint param_1)

{
  if ((param_1 < DAT_005f3f60) &&
     ((*(byte *)((&DAT_005f3e60)[(int)param_1 >> 5] + 4 + (param_1 & 0x1f) * 8) & 1) != 0)) {
    return *(undefined4 *)((&DAT_005f3e60)[(int)param_1 >> 5] + (param_1 & 0x1f) * 8);
  }
  _DAT_005efec0 = 9;
  _DAT_005efec4 = 0;
  return 0xffffffff;
}

