
void FUN_004365c3(void)

{
  byte *pbVar1;
  char *pcVar2;
  char *pcVar3;
  char *pcVar4;
  
  DAT_00743b90 = DAT_00743b90 + 1 & 0x3fff;
  pcVar4 = (char *)(&DAT_00971ef4)[DAT_00743b90];
  pcVar2 = pcVar4;
  do {
    pcVar3 = pcVar2;
    pcVar2 = pcVar3 + -8;
    if (pcVar2 < &DAT_006e3b90) break;
  } while (*pcVar2 == -1);
  if (pcVar3 != pcVar4) {
    (&DAT_00971ef4)[DAT_00743b90] = pcVar3;
    do {
      *(undefined4 *)pcVar3 = *(undefined4 *)pcVar4;
      *(undefined4 *)(pcVar3 + 4) = *(undefined4 *)(pcVar4 + 4);
      *pcVar4 = -1;
      pcVar4 = pcVar4 + 8;
      pbVar1 = (byte *)(pcVar3 + 1);
      pcVar3 = pcVar3 + 8;
      pcVar2 = DAT_00981ef4;
    } while ((*pbVar1 & 0x80) == 0);
    do {
      DAT_00981ef4 = pcVar2;
      pcVar2 = DAT_00981ef4 + -8;
    } while (DAT_00981ef4[-8] == -1);
  }
  return;
}

