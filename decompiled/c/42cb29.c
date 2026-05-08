
undefined8 FUN_0042cb29(void)

{
  undefined4 in_EAX;
  undefined4 in_EDX;
  undefined2 *puVar1;
  char *pcVar2;
  
  if (DAT_008d7eb8 != '\0') {
    pcVar2 = &DAT_008d8a3c;
    do {
      if (*pcVar2 == '\0') goto LAB_0042cb65;
      pcVar2 = pcVar2 + 0x10c;
    } while (pcVar2 < &DAT_008dbe94);
    pcVar2 = &DAT_008d8a3c;
    do {
      *(undefined2 *)pcVar2 = *(undefined2 *)(pcVar2 + 0x10c);
      pcVar2 = pcVar2 + 2;
    } while (pcVar2 < &DAT_008dbd88);
LAB_0042cb65:
    puVar1 = (undefined2 *)&DAT_008d7eb8;
    do {
      *(undefined2 *)pcVar2 = *puVar1;
      puVar1 = puVar1 + 1;
      pcVar2 = pcVar2 + 2;
    } while (puVar1 < &DAT_008d7fc4);
    if (pcVar2 < &DAT_008dbe94) {
      *pcVar2 = '\0';
    }
    FUN_005e5301();
    puVar1 = (undefined2 *)&DAT_008d7eb8;
    do {
      *puVar1 = puVar1[0x86];
      puVar1 = puVar1 + 1;
    } while (puVar1 < &DAT_008d8930);
  }
  return CONCAT44(in_EDX,in_EAX);
}

