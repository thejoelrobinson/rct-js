
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

ushort FUN_00426b73(void)

{
  ushort uVar1;
  ushort uVar2;
  uint uVar3;
  byte *pbVar4;
  
  pbVar4 = &DAT_00887420;
  uVar3 = 0;
  DAT_0087d0c6 = 0;
  do {
    if ((((*pbVar4 != 0xff) && (pbVar4[0x21] == 1)) && ((*(ushort *)(pbVar4 + 2) & 0x80) == 0)) &&
       ((*(ushort *)(pbVar4 + 2) & 0x400) == 0)) {
      uVar3 = uVar3 + (byte)(&DAT_005f5d07)[(uint)*pbVar4 * 8];
      if (*(short *)(pbVar4 + 0xf6) != -1) {
        if (-1 < (short)(*(short *)(pbVar4 + 0xf6) - *(short *)(pbVar4 + 0xe8))) {
          DAT_0087d0c6 = DAT_0087d0c6 + (*(short *)(pbVar4 + 0xf6) - *(short *)(pbVar4 + 0xe8)) * 2;
        }
      }
    }
    pbVar4 = pbVar4 + 0x260;
  } while (pbVar4 < &DAT_008ad1c0);
  if (0xffff < uVar3) {
    uVar3 = 0xffff;
  }
  uVar1 = DAT_0087cc88 - 200;
  if (DAT_0087cc88 < 200) {
    uVar1 = 0;
  }
  if (0x289 < uVar1) {
    uVar1 = 0x28a;
  }
  uVar1 = uVar1 + 0x32;
  if ((ushort)uVar3 < (ushort)(DAT_0087c81c + _DAT_0087c81e)) {
    uVar1 = uVar1 >> 2;
  }
  if (2000 < (ushort)(DAT_0087c81c + _DAT_0087c81e)) {
    uVar1 = uVar1 >> 2;
  }
  uVar2 = uVar1;
  if (DAT_0087d0c6 < DAT_0087c3c0) {
    uVar2 = uVar1 >> 2;
    if (DAT_0087d0c6 < DAT_0087c3c0 >> 1) {
      uVar2 = uVar1 >> 4;
    }
  }
  uVar3 = 0;
  do {
    if ((&DAT_0087d738)[uVar3 * 2] != 0) {
      if (((&DAT_0087d73a)[uVar3 * 2] == 0) || ((&DAT_0087d73a)[uVar3 * 2] == 5)) {
        uVar2 = uVar2 - (uVar2 >> 2);
      }
      else {
        uVar2 = uVar2 + (uVar2 >> 2);
      }
    }
    uVar3 = uVar3 + 1;
  } while (uVar3 < 4);
  return uVar2;
}

