
undefined8 FUN_004292b0(void)

{
  undefined4 in_EDX;
  byte *pbVar1;
  int local_1c;
  
  local_1c = 0;
  pbVar1 = &DAT_00887420;
  do {
    if ((*pbVar1 != 0xff) && (*(ushort *)(pbVar1 + 0xf6) != 0xffff)) {
      local_1c = local_1c +
                 ((uint)(ushort)(*(short *)(pbVar1 + 0xd4) + *(short *)(pbVar1 + 0xd6) +
                                 *(short *)(pbVar1 + 0xd8) + *(short *)(pbVar1 + 0xda) +
                                 *(short *)(pbVar1 + 0xdc) + *(short *)(pbVar1 + 0xde) +
                                 *(short *)(pbVar1 + 0xe0) + *(short *)(pbVar1 + 0xe2) +
                                 *(short *)(pbVar1 + 0xe4) + *(short *)(pbVar1 + 0xe6)) +
                 (uint)(byte)(&DAT_005f5d07)[(uint)*pbVar1 * 8] * 4) *
                 (uint)*(ushort *)(pbVar1 + 0xf6);
    }
    pbVar1 = pbVar1 + 0x260;
  } while (pbVar1 < &DAT_008ad1c0);
  return CONCAT44(in_EDX,local_1c + (uint)DAT_0087c81c * 0x1e);
}

