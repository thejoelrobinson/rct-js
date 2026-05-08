
void FUN_0042f283(void)

{
  char cVar1;
  char *pcVar2;
  char *pcVar3;
  
  FUN_00458bcf();
  pcVar2 = &DAT_005f8ea4;
  pcVar3 = &DAT_0099aa88;
  do {
    cVar1 = *pcVar2;
    *pcVar3 = cVar1;
    pcVar2 = pcVar2 + 1;
    pcVar3 = pcVar3 + 1;
  } while (cVar1 != '\0');
  FUN_00458bcf();
  FUN_004528a0();
  FUN_0040871f(1,&DAT_0099a888,&DAT_0099aa88,&DAT_005f92da,&DAT_0099a988);
  FUN_004528c4();
  return;
}

