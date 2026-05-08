
void FUN_00430113(void)

{
  char cVar1;
  int iVar2;
  char *pcVar3;
  char *pcVar4;
  char *pcVar5;
  
  FUN_0043018c();
  pcVar3 = &DAT_005f8fb3;
  pcVar4 = &DAT_0099aa88;
  do {
    pcVar5 = pcVar4;
    cVar1 = *pcVar3;
    *pcVar5 = cVar1;
    pcVar3 = pcVar3 + 1;
    pcVar4 = pcVar5 + 1;
  } while (cVar1 != '*');
  pcVar4 = &DAT_005f92e0;
  do {
    cVar1 = *pcVar4;
    *pcVar5 = cVar1;
    pcVar4 = pcVar4 + 1;
    pcVar5 = pcVar5 + 1;
  } while (cVar1 != '\0');
  DAT_005f8d35 = 0;
  iVar2 = FUN_004083e1(&DAT_0099aa88);
  if (iVar2 != -1) {
    DAT_005f88a4 = iVar2;
    FUN_0042f6b3();
    FUN_0042f6a8();
    FUN_0042f74a();
    FUN_0042fa02();
    FUN_00408387(DAT_005f88a4);
  }
  FUN_004301a9();
  return;
}

