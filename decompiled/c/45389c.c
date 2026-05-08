
void FUN_0045389c(void)

{
  undefined *puVar1;
  undefined *puVar2;
  
  DAT_006325b0 = &DAT_006325b4;
  puVar2 = DAT_009a1164;
  do {
    puVar1 = puVar2 + -0x178;
    if (puVar1 < &DAT_009a013c) {
      DAT_006323fc = 0xffffffff;
      DAT_006325b0 = &DAT_006325b4;
      return;
    }
    DAT_006323fc = *(int *)(puVar2 + -0x170);
    puVar2 = puVar1;
  } while ((DAT_006323fc == 0) || ((*(ushort *)(DAT_006323fc + 0x12) & 0x800) == 0));
  DAT_00632404 = 0;
  if ((*(char *)(DAT_006323fc + 0x10) != '\0') &&
     (DAT_00632404 = 0x1e, *(char *)(DAT_006323fc + 0x10) != '\x01')) {
    DAT_00632404 = 0x3c;
  }
  DAT_00632400 = puVar1;
  return;
}

