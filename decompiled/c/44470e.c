
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0044470e(void)

{
  int iVar1;
  int iVar2;
  ushort uVar3;
  int iVar4;
  char *pcVar5;
  
  iVar1 = DAT_0087d304;
  LOCK();
  DAT_0087d304 = 0;
  UNLOCK();
  iVar2 = 0;
  for (uVar3 = DAT_0087c398; uVar3 != 0xffff; uVar3 = (&DAT_00743b98)[(uint)uVar3 * 0x80]) {
    iVar4 = (uint)uVar3 * 0x100;
    if ((&DAT_00743bc2)[iVar4] == '\x01') {
      iVar2 = iVar2 - (uint)*(ushort *)(&DAT_00632f4c + (uint)(byte)(&DAT_00743bc3)[iVar4] * 2);
    }
  }
  iVar2 = (iVar2 - *(int *)(&DAT_005f96a4 + (uint)DAT_0087c3d7 * 4)) - DAT_0087c3b8 / 600;
  pcVar5 = &DAT_00887420;
  do {
    if (((*pcVar5 != -1) && (pcVar5[0x21] != '\0')) && (*(ushort *)(pcVar5 + 0x132) != 0xffff)) {
      iVar2 = iVar2 + (uint)*(ushort *)(pcVar5 + 0x132) * -2;
    }
    pcVar5 = pcVar5 + 0x260;
  } while (pcVar5 < &DAT_008ad1c0);
  DAT_0087d308 = iVar1 * 7 + (iVar2 >> 2);
  DAT_0087d30c = DAT_0087d30c + DAT_0087d308;
  DAT_0087d310 = DAT_0087d310 + 1;
  FUN_005e5301();
  if ((ram0x005f8539 >> 0x18 & 1) != 0) {
    FUN_00426f56(pcVar5);
  }
  return;
}

