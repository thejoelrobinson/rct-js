
undefined2 FUN_005e68e2(void)

{
  undefined2 in_AX;
  undefined *puVar1;
  
  puVar1 = &DAT_009a013c;
  while( true ) {
    if (DAT_009a1164 <= puVar1) {
      return in_AX;
    }
    if (puVar1[0x174] == '\0') break;
    puVar1 = puVar1 + 0x178;
  }
  return in_AX;
}

