
undefined8 FUN_00441596(void)

{
  byte bVar1;
  char cVar2;
  int in_EAX;
  undefined4 in_EDX;
  char *pcVar3;
  byte *pbVar4;
  char *pcVar5;
  
  pcVar3 = (&PTR_DAT_006302d8)[in_EAX];
  FUN_00458bcf();
  for (pbVar4 = &DAT_0099a888; bVar1 = *pbVar4, bVar1 != 0; pbVar4 = pbVar4 + 1) {
    if ((0x60 < bVar1) && (bVar1 < 0x7b)) {
      *pbVar4 = *pbVar4 - 0x20;
    }
  }
  pcVar5 = &DAT_0099a888;
  do {
    cVar2 = *pcVar3;
    if ((char)(cVar2 + '\x01') != *pcVar5) {
      return CONCAT44(in_EDX,in_EAX);
    }
    pcVar5 = pcVar5 + 1;
    pcVar3 = pcVar3 + 1;
  } while (cVar2 != -1);
  return CONCAT44(in_EDX,in_EAX);
}

