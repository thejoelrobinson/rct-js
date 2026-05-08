
/* WARNING: Globals starting with '_' overlap smaller symbols at the same address */

void FUN_004308c3(void)

{
  char cVar1;
  char *pcVar2;
  char *pcVar3;
  char *pcVar4;
  
  pcVar2 = &DAT_00000016;
  FUN_0042f239();
  pcVar3 = &DAT_0099aa88;
  do {
    cVar1 = *pcVar2;
    *pcVar3 = cVar1;
    pcVar2 = pcVar2 + 1;
    pcVar3 = pcVar3 + 1;
  } while (cVar1 != '\0');
  pcVar3 = &DAT_005f8fb3;
  pcVar2 = &DAT_0099a888;
  do {
    pcVar4 = pcVar2;
    cVar1 = *pcVar3;
    *pcVar4 = cVar1;
    pcVar3 = pcVar3 + 1;
    pcVar2 = pcVar4 + 1;
  } while (cVar1 != '*');
  pcVar2 = &DAT_005f888e;
  do {
    cVar1 = *pcVar2;
    *pcVar4 = cVar1;
    pcVar2 = pcVar2 + 1;
    pcVar4 = pcVar4 + 1;
  } while (cVar1 != '\0');
  FUN_0042ee93();
  _DAT_0099fb78 = _DAT_0099fb78 & 0xffdfffff;
  FUN_00430113();
  DAT_005f8897 = 1;
  return;
}

