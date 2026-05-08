
undefined4 FUN_0042f239(void)

{
  char cVar1;
  char *pcVar2;
  undefined4 in_EAX;
  int unaff_EBX;
  char *pcVar3;
  char *pcVar4;
  
  pcVar3 = &DAT_005f8648;
  if ((&DAT_005f851c)[unaff_EBX] != '\0') {
    pcVar3 = &DAT_005f874c;
  }
  pcVar2 = &DAT_005f831a;
  do {
    pcVar4 = pcVar2;
    cVar1 = *pcVar3;
    *pcVar4 = cVar1;
    pcVar3 = pcVar3 + 1;
    pcVar2 = pcVar4 + 1;
  } while (cVar1 != '\0');
  pcVar3 = (&PTR_s_Data_CSG1_DAT_005f8174)[unaff_EBX];
  if (pcVar4[-1] != '\\') {
    *pcVar4 = '\\';
    pcVar4 = pcVar4 + 1;
  }
  do {
    cVar1 = *pcVar3;
    *pcVar4 = cVar1;
    pcVar3 = pcVar3 + 1;
    pcVar4 = pcVar4 + 1;
  } while (cVar1 != '\0');
  return in_EAX;
}

