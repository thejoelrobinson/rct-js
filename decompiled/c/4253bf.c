
void FUN_004253bf(void)

{
  ushort *puVar1;
  ushort uVar2;
  int unaff_ESI;
  undefined1 in_CF;
  
  DAT_005f494a = DAT_005f494a + -1;
  if ((DAT_005f494a == '\0') && (FUN_005e68e2(), !(bool)in_CF)) {
    puVar1 = (ushort *)(*(int *)(unaff_ESI + 8) + 0x12);
    uVar2 = *puVar1;
    *puVar1 = *puVar1 & 0xfdff;
    if ((uVar2 >> 9 & 1) != 0) {
      FUN_005e43de();
    }
  }
  return;
}

