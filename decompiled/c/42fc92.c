
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_0042fc92(void)

{
  char cVar1;
  char *pcVar2;
  char *pcVar3;
  
  _DAT_0087d794 = 0x1a697;
  _DAT_0087d750 = DAT_005eee38;
  pcVar2 = &DAT_005eee40;
  DAT_005eee7f = 0;
  pcVar3 = &DAT_0087d754;
  do {
    cVar1 = *pcVar2;
    *pcVar3 = cVar1;
    pcVar2 = pcVar2 + 1;
    pcVar3 = pcVar3 + 1;
  } while (cVar1 != '\0');
  return;
}

