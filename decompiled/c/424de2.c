
void FUN_00424de2(void)

{
  ushort *puVar1;
  ushort uVar2;
  int unaff_ESI;
  undefined1 in_CF;
  
  DAT_005f4948 = DAT_005f4948 + -1;
  if (((DAT_005f4948 == '\0') && (FUN_005e68e2(), !(bool)in_CF)) && (DAT_005f8d5c != '\x01')) {
    puVar1 = (ushort *)(*(int *)(unaff_ESI + 8) + 0x12);
    uVar2 = *puVar1;
    *puVar1 = *puVar1 & 0xfeff;
    if ((uVar2 >> 8 & 1) != 0) {
      FUN_005e43de();
    }
  }
  return;
}

