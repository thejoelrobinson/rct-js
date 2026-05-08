
void FUN_0042f199(void)

{
  char cVar1;
  char *pcVar2;
  char *pcVar3;
  char *pcVar4;
  
  pcVar2 = &DAT_005f8ea4;
  pcVar3 = &DAT_005f91d9;
  do {
    pcVar4 = pcVar3;
    cVar1 = *pcVar2;
    *pcVar4 = cVar1;
    pcVar2 = pcVar2 + 1;
    pcVar3 = pcVar4 + 1;
  } while (cVar1 != '\0');
  if (DAT_008dbe94 != '\0') {
    pcVar3 = &DAT_008dbe94;
    do {
      pcVar2 = pcVar4;
      cVar1 = *pcVar3;
      *pcVar2 = cVar1;
      pcVar3 = pcVar3 + 1;
      pcVar4 = pcVar2 + 1;
    } while (cVar1 != '\0');
    *(undefined4 *)pcVar2 = DAT_005f92db;
    pcVar2[4] = '\0';
  }
  return;
}

