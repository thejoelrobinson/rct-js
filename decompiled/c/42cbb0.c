
undefined8 FUN_0042cbb0(void)

{
  undefined4 in_EAX;
  int in_ECX;
  undefined4 in_EDX;
  char *pcVar1;
  
  for (pcVar1 = &DAT_008d7eb8; *pcVar1 != '\0'; pcVar1 = pcVar1 + 0x10c) {
    if ((((char)in_EAX == *pcVar1) && (in_ECX == *(int *)(pcVar1 + 2))) &&
       (pcVar1[1] = pcVar1[1] | 1, pcVar1 == &DAT_008d7eb8)) {
      FUN_005e5301();
    }
  }
  for (pcVar1 = &DAT_008d8a3c; *pcVar1 != '\0'; pcVar1 = pcVar1 + 0x10c) {
    if (((char)in_EAX == *pcVar1) && (in_ECX == *(int *)(pcVar1 + 2))) {
      pcVar1[1] = pcVar1[1] | 1;
      FUN_005e5301();
    }
  }
  return CONCAT44(in_EDX,in_EAX);
}

