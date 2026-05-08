
void FUN_005dfc0c(void)

{
  ushort *puVar1;
  undefined *puVar2;
  
  FUN_005e5b80();
  puVar2 = DAT_009a1164;
  while (&DAT_009a013c <= puVar2 + -0x178) {
    puVar1 = (ushort *)(puVar2 + -0x146);
    puVar2 = puVar2 + -0x178;
    if ((*puVar1 & 3) == 0) {
      FUN_005e5bd8();
      puVar2 = DAT_009a1164;
    }
  }
  return;
}

