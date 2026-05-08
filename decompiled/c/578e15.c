
void FUN_00578e15(int param_1)

{
  undefined1 *puVar1;
  char in_AL;
  char in_CL;
  short in_DX;
  
  puVar1 = DAT_00991f80;
  DAT_0099a4ec = in_DX + 3;
  if ((((&DAT_00887422)[(uint)*(byte *)(param_1 + 7) * 0x130] & 1) != 0) &&
     (*(ushort *)(&DAT_0088747e + (uint)*(byte *)(param_1 + 7) * 0x260) != 0xffff)) {
    DAT_00991f80 = &DAT_00743b94 +
                   (uint)*(ushort *)(&DAT_0088747e + (uint)*(byte *)(param_1 + 7) * 0x260) * 0x100;
    DAT_00991f78._0_1_ = 2;
  }
  DAT_0099a4e8 = in_AL + 0x10;
  DAT_0099a4ea = in_CL + 0x10;
  (*(code *)(&PTR_LAB_00432204)[DAT_00991f88])();
  DAT_00991f80 = puVar1;
  DAT_00991f78._0_1_ = 3;
  return;
}

