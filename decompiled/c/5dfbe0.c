
void FUN_005dfbe0(void)

{
  ushort *puVar1;
  undefined *puVar2;
  
  FUN_005e5b80();
  puVar2 = DAT_009a1164;
  do {
    if (puVar2 + -0x178 < &DAT_009a013c) {
      return;
    }
    puVar1 = (ushort *)(puVar2 + -0x146);
    puVar2 = puVar2 + -0x178;
  } while ((*puVar1 & 3) != 0);
  FUN_005e5bd8();
  return;
}

