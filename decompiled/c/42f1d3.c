
undefined8 FUN_0042f1d3(void)

{
  undefined4 in_EAX;
  int iVar1;
  undefined4 in_EDX;
  char *pcVar2;
  char *pcVar3;
  char *pcVar4;
  char cVar5;
  
  pcVar2 = &DAT_005f874c;
  pcVar4 = &DAT_005f831a;
  do {
    pcVar3 = pcVar4;
    cVar5 = *pcVar2;
    *pcVar3 = cVar5;
    pcVar2 = pcVar2 + 1;
    pcVar4 = pcVar3 + 1;
    if (cVar5 == '\\') goto LAB_0042f1f0;
  } while (cVar5 != '\0');
  *pcVar3 = '\\';
LAB_0042f1f0:
  pcVar2 = s_Saved_Games_005f8898;
  do {
    cVar5 = *pcVar2;
    *pcVar4 = cVar5;
    pcVar2 = pcVar2 + 1;
    pcVar4 = pcVar4 + 1;
  } while (cVar5 != '\0');
  iVar1 = FUN_0040844b(&DAT_005f831a,&DAT_005f92e7);
  if (iVar1 != -1) {
    cVar5 = DAT_005f941c;
    FUN_00408490(iVar1);
    if (cVar5 == '~') {
      DAT_005f853c = DAT_005f853c + -1;
    }
  }
  return CONCAT44(in_EDX,in_EAX);
}

