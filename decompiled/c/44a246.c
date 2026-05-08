
void FUN_0044a246(void)

{
  uint uVar1;
  char *pcVar2;
  
  DAT_0099c163 = DAT_008d7ea4;
  pcVar2 = &DAT_00887420;
  uVar1 = 0;
  do {
    if (*pcVar2 != -1) {
      if ((pcVar2[0x21] != '\0') && (*(ushort *)(pcVar2 + 0x132) != 0xffff)) {
        *(uint *)(pcVar2 + 0x104) = *(int *)(pcVar2 + 0x104) - (uint)*(ushort *)(pcVar2 + 0x132);
        pcVar2[0xfd] = pcVar2[0xfd] | 2;
        DAT_0099c167 = 4;
        FUN_004429db();
      }
      if (pcVar2[0x15e] != '\0') {
        pcVar2[0x15e] = pcVar2[0x15e] + -1;
      }
    }
    pcVar2 = pcVar2 + 0x260;
    uVar1 = uVar1 + 1;
  } while (uVar1 < 0xff);
  return;
}

